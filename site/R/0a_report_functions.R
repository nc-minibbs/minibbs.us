#------------------------------------------------------------------------------#
# Plotting and HTML functions used in the MBBS site
#------------------------------------------------------------------------------#

plot_sparkline <- function(x){
  as.character(htmltools::as.tags(
    sparkline::sparkline(
      x,
      fillColor = FALSE,
      normalRangeMin = -diff(range(x)) * 0.09,
      normalRangeMax =  diff(range(x)) * 0.09,
      spotColor      = FALSE,
      minSpotColor   = FALSE,
      maxSpotColor   = FALSE
    )))
}

create_details <- function(common_name, sci_name) {

  cn <- stringr::str_replace_all(common_name, " ", "_")
  more_link <-
    sprintf("https://www.allaboutbirds.org/guide/%s",cn)

  htmltools::div(
    htmltools::p(
      htmltools::a(href = more_link, sci_name)
    ),
    htmltools::div(id = glue::glue("{cn}_trend")),
    htmltools::tags$script(glue::glue(
    "vegaEmbed('#{cn}_trend', speciesTrendSpec('{cn}'));"))
  )
}