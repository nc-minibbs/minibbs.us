#------------------------------------------------------------------------------#
#  Modeling Functions for MBBS results
#------------------------------------------------------------------------------#

# Helper function that returns string "failed"
# if an evaluated expression is an error
try_model <- function(expr) {
  options(warn = 2)
  m <- try(expr, silent = TRUE)
  if (is(m, "try-error")) {
    return("failed")
  }
  options(warn = 1)
  m
}

# Fit a GEE model on count by time
gee_model <- function(data) {
  m <- try_model(geepack::geeglm(
    formula = count ~ time,
    id      = route,
    corstr  = "independence",
    family  = poisson(),
    data    = data))
  ##
  broom::tidy(m)
}
