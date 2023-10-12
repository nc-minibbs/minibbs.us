# minibbs.us website

## Editing the site content

Site content to be rendering by building the site
is in the `content` directory.
The published version of the site is in the `_site` directory;
you should not need to edit files in this directory.

### Adding an Elm package

Install a new [Elm package](https://package.elm-lang.org/) as usual:

```sh
elm install some-package
```

Then, since this project uses `nix` to manage dependencies,
run the following:

```sh
elm2nix convert > elm-srcs.nix # creates nix derivation from elm.json
elm2nix snapshot # updates registry.dat
```

See [`elm2nix` documentation](https://github.com/cachix/elm2nix)
for more info.

## Building the site

To render the site, use the `./scripts/build.sh` script.

## Deploy the site

The website is deployed via
[netlify](http://www.netlify.com)
from the `_site` folder on the `main` branch on GitHub.

## Get the latest `mbbs` data

The `mbbs` data used to build the visualizations
in this site is contained in the `mbbs` R package.

To be sure you're using the latest data,
update the `mbbs` package dependency by
changing the git commit hash for the `mbbsR` derivation in `flake.nix`.
