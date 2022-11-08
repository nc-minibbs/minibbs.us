# minibbs.us website

## Editing the site

Site content to be rendering by building the site
is in the `site` directory.
The published version of the site is in the `_site` directory;
you should not need to edit file in this directory.

To render just one webpage (ie: when editing), 
instead of hitting the 'knit' button do the following:

1. Run the 1a, 0a, 0b rscripts in the `R` directory
to load datasets and functions into your global environment.
2. Knit from the R console with `rmarkdown::render("your_doc.Rmd")`
instead of using the knit button.
The knit button won't reference files in your global environment
(which you've loaded in step 1)
but calling the `rmarkdown::render()` function from the console will.

## Building the site

To render the site, use the `render_site.R` script.
See [here](https://bookdown.org/yihui/rmarkdown/websites.html)
for more information about creating websites from Rmarkdown.

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

## Old MBBS site content

The `old-mbbs` directory contains the original (unedited) site files
provided by Haven Wiley.
These files were copied to `_site/old-mbbs`
so the site content is still accessible via the web,
but the files may be edited or removed over time.

