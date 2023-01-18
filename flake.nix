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

