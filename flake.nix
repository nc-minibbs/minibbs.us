{
  description = "A flake for the minibbs.us site ";
  nixConfig = {
    bash-prompt = "minibbs.us> ";
  };
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-22.11";
    flake-utils.url = "github:numtide/flake-utils";
  };

  outputs = { self, nixpkgs, flake-utils }:
    flake-utils.lib.eachDefaultSystem (system: let
      pkgs = nixpkgs.legacyPackages.${system};
    in {


      packages = {
        # The elm bits were hacked from the code that
        #  elm2nix init produces
        site = pkgs.stdenv.mkDerivation {
          name = "site";
          src = ./.;

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
          let elmModules = 
            [ "DisplayTraits"
              "DisplayIndividualSpecies"
              "Home"
            ];
            pages = 
            [ "index"
              "procedures"
              "results/index"
              "results/individual-species"
              "results/traits"
            ];
          in 
          ''
          SRC=src
          mkdir -p $out/{js,data,css,results}

          cp -R $SRC/css/ $out/

          cp -R data/ $out/

          ${pkgs.lib.concatStrings (map (module : 
           '' 
            echo "compiling elm modules"
            ${pkgs.elmPackages.elm}/bin/elm make src/${module}.elm \
                --output=$out/js/${module}.js \
                --optimize

            ${pkgs.nodePackages.uglify-js}/bin/uglifyjs $out/js/${module}.js --compress 'pure_funcs="F2,F3,F4,F5,F6,F7,F8,F9,A2,A3,A4,A5,A6,A7,A8,A9",pure_getters,keep_fargs=false,unsafe_comps,unsafe' \
                | ${pkgs.nodePackages.uglify-js}/bin/uglifyjs  --mangle --output $out/js/${module}.min.js
           '') elmModules ) 
          
           }

          ${pkgs.lib.concatStrings (map (page : 
           '' 

          ${pkgs.pandoc}/bin/pandoc content/${page}.md \
              --from=markdown \
              --to=html \
              --output=$out/${page}.html \
              --template=$SRC/template.html \
              --include-before-body=$SRC/navbar.html \
              --css=/css/style.css \
              --css=/css/bootstrap.min.css \
              --standalone
           '') pages ) 
          
           }


          '';
        };
      };

      packages.default = self.packages.${system}.site;

      devShells.default =  pkgs.mkShell {
        nativeBuildInputs = [ pkgs.bashInteractive ];
        buildInputs = [
          # pkgs.openssl
          # pkgs.openssl.dev
          pkgs.rPackages.devtools
          pkgs.R
          pkgs.libpng
          pkgs.pandoc

          pkgs.updog # simple HTTP server for running HTTP server locally (for testing)
          
          pkgs.elm2nix
          pkgs.elmPackages.elm
          pkgs.elmPackages.elm-format
          pkgs.elmPackages.elm-analyse
          # pkgs.elmPackages.elm-live
          pkgs.nodejs
          pkgs.nodePackages.prettier
          
        ];
      }; 

    });
}

