# minibbs.us website

## Editing the site content

Site content to be rendering by building the site
is in the `content` directory.
The published version of the site is in the `_site` directory;
you should not need to edit files in this directory.

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
update the `mbbs` package dependency:

```r
renv::install("nc-minibbs/mbbs@master")
```

Then update the `renv` lockfile:

```r
renv::snapshot()
```
