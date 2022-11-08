#------------------------------------------------------------------------------#
#   TITLE: Render the minibbs.us website
#    DATE: 20190525
#    PROG: B. Saul
#    DESC: Render the minibbs.us website from .Rmd files
#------------------------------------------------------------------------------#

rmarkdown::render_site(input = "site")
