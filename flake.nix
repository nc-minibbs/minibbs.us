{
  description = "The minibbs.us website";
  nixConfig = {
    bash-prompt = "minibbs.us> ";
  };
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-24.11";
    flake-utils.url = "github:numtide/flake-utils";
    gitignore = {
      url = "github:hercules-ci/gitignore.nix";
      # Use the same nixpkgs
      inputs.nixpkgs.follows = "nixpkgs";
    };
    mbbs.url = "github:nc-minibbs/mbbs?ref=5f8a81662f38221873edd2314aa4336c4c29f042";
  };

  outputs = { self, nixpkgs, flake-utils, gitignore, mbbs }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};

        mbbs-data = mbbs.packages.${system}.data;

        inherit (gitignore.lib) gitignoreSource;

      in
      {

        formatter = pkgs.nixpkgs-fmt;

        packages = {

          # The elm bits were hacked from the code that
          #  elm2nix init produces

          # See adding-an-elm-package in README
          site = pkgs.stdenv.mkDerivation {
            name = "site";
            src = gitignoreSource ./.;

            buildInputs = [
              pkgs.elmPackages.elm
              pkgs.pandoc
              pkgs.nodePackages.uglify-js
            ];

            buildPhase = pkgs.elmPackages.fetchElmDeps {
              elmPackages = import ./elm-srcs.nix;
              elmVersion = "0.19.1";
              registryDat = ./registry.dat;
            };

            installPhase =
              let
                SRC = "src";
                
                elmModules =
                  [
                    "DisplayTraits"
                    "DisplayIndividualSpecies"
                    "DisplaySpeciesTable"
                    "DisplayRouteDashboard"
                    "Home"
                  ];

                # FIXME: 
                # generate array of markdown files in content directory
                # rather than needed to specify them here.
                pages =
                  [
                    "index"
                    "procedures"
                    "results/index"
                    "results/individual-species"
                    "results/traits"
                    "results/route-dashboard"
                    "routes/orange-county"
                    "routes/chatham-county"
                    "routes/durham-county"
                  ];
              in
              ''
                
                mkdir -p $out/{js,data,css,results,routes}

                cp -R ${SRC}/img/ $out/
                cp -R ${SRC}/css/ $out/
                cp -R data/ $out/

                ${pkgs.lib.concatStrings (map (module : 
                 '' 
                  echo "compiling elm modules"
                  ${pkgs.elmPackages.elm}/bin/elm make ${SRC}/${module}.elm \
                      --output=$out/js/${module}.js \
                      --optimize

                  ${pkgs.nodePackages.uglify-js}/bin/uglifyjs $out/js/${module}.js \
                        --compress 'pure_funcs="F2,F3,F4,F5,F6,F7,F8,F9,A2,A3,A4,A5,A6,A7,A8,A9",pure_getters,keep_fargs=false,unsafe_comps,unsafe' \
                      | ${pkgs.nodePackages.uglify-js}/bin/uglifyjs  --mangle --output $out/js/${module}.min.js
                 '') elmModules ) 
          
                 }

                ${pkgs.lib.concatStrings (map (page : 
                 '' 

                ${pkgs.pandoc}/bin/pandoc content/${page}.md \
                    --from=markdown+link_attributes \
                    --to=html \
                    --output=$out/${page}.html \
                    --template=${SRC}/template.html \
                    --include-before-body=${SRC}/navbar.html \
                    --css=/css/bootstrap.min.css \
                    --standalone 
                 '') pages ) 
          
                 }
              '';
          };
        };

        packages.mbbs-data = mbbs-data;
        packages.default = self.packages.${system}.site;

        devShells.default = pkgs.mkShell {
          nativeBuildInputs = [ pkgs.bashInteractive ];
          buildInputs = [
            # MBBS
            mbbs-data

            # R stuff
            pkgs.R
            pkgs.rPackages.assertthat
            pkgs.rPackages.broom
            pkgs.rPackages.devtools
            pkgs.rPackages.dplyr
            pkgs.rPackages.geepack
            pkgs.rPackages.glue
            pkgs.rPackages.languageserver
            pkgs.rPackages.jsonlite
            pkgs.rPackages.readr
            pkgs.rPackages.stringr
            pkgs.rPackages.tidyr

            # Elm stuff
            pkgs.elm2nix
            pkgs.elmPackages.elm
            pkgs.elmPackages.elm-format
            pkgs.elmPackages.elm-analyse
            pkgs.elmPackages.elm-review
            pkgs.nodejs
            pkgs.nodePackages.prettier
            
            # Other stuff
            pkgs.libpng
            pkgs.pandoc

            # simple HTTP server for running HTTP server locally (for testing)
            pkgs.updog
          ];
        };

      });
}

