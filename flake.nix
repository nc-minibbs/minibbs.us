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
            ];
          in 
          ''
          mkdir -p $out/_site/js

          ${pkgs.lib.concatStrings (map (module : 
           '' 
            echo "compiling elm modules"
            ${pkgs.elmPackages.elm}/bin/elm make src/${module}.elm \
                --output=$out/_site/js/${module}.js \
                --optimize
           '') elmModules ) 
          
           }

          ${pkgs.pandoc}/bin/pandoc site/index.md \
              --from=markdown \
              --to=html \
              --output=$out/index.html \
              --template=site/template.html \
              --include-in-header=site/import-vega.html \
              --include-in-header=site/import-elm.html \
              --include-before-body=site/navbar.html \
              --include-after-body=site/index.js.html \
              --css=/css/style.css \
              --css=/css/bootstrap.min.css \
              --standalone
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

