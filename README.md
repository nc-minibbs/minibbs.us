# minibbs.us website repo

The website is deployed via [netlify](http://www.netlify.com) from the `_site` folder on the `master` branch.

The `old-mbbs` directory contains the original (unedited) site files provided by Haven. These files were copied to `_site/old-mbbs` so the site content is still accessible via the web, but the files may be edited or removed over time.

To render the site, use the `render_site.R` script. See [here](https://bookdown.org/yihui/rmarkdown/websites.html) for more information about creating websites from Rmarkdown.

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