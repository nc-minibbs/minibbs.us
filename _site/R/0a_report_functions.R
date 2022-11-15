#------------------------------------------------------------------------------#
# Plotting and HTML functions used in the MBBS site
#------------------------------------------------------------------------------#

normalize_name <- function(x) {
  stringr::str_replace_all(x, " ", "_") |>
  stringr::str_replace_all("[\\(\\)\\.\\']", "")
}

plot_sparkline <- function(common_name) {
  cn <- normalize_name(common_name)
  htmltools::as.tags(
    htmltools::div(
      htmltools::div(id = glue::glue("{cn}_sparkline")),
      htmltools::tags$script(glue::glue(
      "vegaEmbed('#{cn}_sparkline', sparklineSpec('{cn}'), {{actions: false}});"))
    )
  )
}

create_details <- function(common_name, sci_name) {
  cn <- normalize_name(common_name)
  more_link <-
    sprintf("https://www.allaboutbirds.org/guide/%s", cn)

  htmltools::div(
    htmltools::p(
      htmltools::a(href = more_link, sci_name)
    ),
    htmltools::div(id = glue::glue("{cn}_trend")),
    htmltools::tags$script(glue::glue(
    "vegaEmbed('#{cn}_trend', speciesTrendSpec('{cn}'));"))
  )
}
