#------------------------------------------------------------------------------#
#  Prepare data for MBBS site
#
#------------------------------------------------------------------------------#

library(mbbs)
library(dplyr)
library(tidyr)
library(jsonlite)

#------------------------------------------------------------------------------#
#  Utility/model functions

# Helper function that returns string "failed"
# if an evaluated expression is an error
try_model <- function(expr) {
  options(warn = 2)
  m <- try(expr, silent = TRUE)
  if (is(m, "try-error")) {
    return(
      list(
        result = "failed"
      ))
  }
  options(warn = 1)
  list(
    result = "success",
    fit = m
  )
}

# Fit a GEE model on count by time
gee_model <- function(data, .formula) {
  try_model(geepack::geeglm(
    formula = .formula,
    # route is created in the data manipulaton step
    # It should be an integer vector.
    id      = route,
    corstr  = "ar1",
    family  = poisson(),
    data    = data))
}

extract_results <- function(fitted_model) {
  if (fitted_model$result == "failed") {
    fitted_model
  } else {
    m <- fitted_model$fit
  }

  out <-
  tibble(

    tidy_fit = list(broom::tidy(m)),
    estimates =
      list(tibble(
            year = min(m$data$year):max(m$data$year)
          ) %>%
          mutate(
            time = year - min(year),
            fitted = exp(predict(object = m,
                         newdata = data.frame(time = time)))
          ))

      ,
  ) %>%
  mutate(
    # Estimated rates of change
    log_rate     = tidy_fit[[1]]$estimate[tidy_fit[[1]]$term == "time"],
    log_rate_se  = tidy_fit[[1]]$std.error[tidy_fit[[1]]$term == "time"],
    rate         = exp(log_rate) - 1,
    rate_lo      = exp(log_rate - qnorm(.975) * log_rate_se) - 1,
    rate_hi      = exp(log_rate + qnorm(.975) * log_rate_se) - 1,
    significant  = !(rate_lo < 0 & rate_hi > 0),
  )

  list(
    result = fitted_model$result,
    values = out
  )
}

#------------------------------------------------------------------------------#
#  Data manipulations

pre_dt <-
  # Combine data from all 3 counties.
  # Data is exported from mbbs package.
  bind_rows(
    mbbs_orange,
    mbbs_chatham,
    mbbs_durham
  ) %>%
  # HARD CODED REMOVALS
  filter(
    # Remove Orange route 11 from 2012
    # due to uncharacteristically high counts
    # from a one-time observer
    !(year == 2012 & mbbs_county == "orange" & route_num == 11)

  ) %>%
  ungroup() %>%
  # Remove any observations for unclassified species,
  # such as (Hawk sp. or duck sp.)
  filter(
    !grepl("sp\\.", common_name)
  ) %>%
  # Summarize species counts by:
  # county year species route
  group_by(
    mbbs_county, year, common_name, sci_name, route_num
  ) %>%
  summarise(
    count = sum(count),
    .groups = "drop"
  ) %>%
  mutate(
    # The route number is not unique within the study
    # (only within a county).
    # Here's a hacky way to create distinct ID for routes
    # across counties.
    route = route_num + case_when(
      mbbs_county == "orange" ~ 0L,
      mbbs_county == "durham" ~ 20L,
      mbbs_county == "chatham" ~ 40L,
    )
  )

# Identify those species that were observed in:
# * at least 1 route
# * at least 3 years
analysis_species <-
  pre_dt %>%
  group_by(common_name, year) %>%
  summarise(dummy = (sum(count) > 0) * 1L, .groups = "drop") %>%
  group_by(common_name) %>%
  summarise(nyears = sum(dummy), .groups = "drop") %>%
  filter(nyears > 2) %>%
  select(common_name) %>%
  ungroup()

analysis_dt <-
  pre_dt %>%
  # filter down to just the analysis species
  right_join(
    analysis_species,
     by = "common_name"
  )  %>%
  # For each year that a route was run,
  # we need 0 count for those species that were *not* observed
  # in that route / year.
  complete(
    nesting(year, mbbs_county, route, route_num),
    nesting(common_name, sci_name),
    fill = list(count = 0)
  )

#------------------------------------------------------------------------------#
# Integrity Checks ####
# 1) There is no variation in the number of times that a species
#    is in the analysis_dt for each year.
#    E.g. adding in the zero counts didn't add spurious surveys.
invisible(assertthat::assert_that(
  analysis_dt %>%
    group_by(year, mbbs_county, common_name) %>%
    tally() %>%
    group_by(year, mbbs_county) %>%
    summarise(check = var(n) == 0, .groups = "drop") %>%
    pull(check) %>%
    all(),
  msg = "All routes should have the same number of records for all species."
))

invisible(assertthat::assert_that(
  identical(
    analysis_dt %>%
      distinct(year, mbbs_county, route_num) %>%
      group_by(year, mbbs_county) %>%
      tally() %>%
      arrange(year, mbbs_county, n),
     pre_dt %>%
      select(mbbs_county, year, route_num) %>%
      distinct() %>%
      group_by(year, mbbs_county) %>%
      tally() %>%
      arrange(year, mbbs_county, n)
  ),
  msg = c("The number of route-surveys for each year in the analysis_dt frame",
          "should equal the number of route-surveys-year counts in pre_dt")
))

#------------------------------------------------------------------------------#
# Estimate rates ####

model_dt <-
  analysis_dt %>%
  mutate(time = year - min(year)) %>%
  ungroup() %>%
  arrange(
    common_name, route
  ) %>%
  group_by(common_name, sci_name) %>%
  tidyr::nest() %>%
  mutate(
    # Results without including county in the model
    fit_nocounty = purrr::map(data, ~ gee_model(.x, .formula = count ~ time)),
    results_nocounty = purrr::map(fit_nocounty, extract_results),


    fit_county   = purrr::map(
      .x = data,
      .f = ~ gee_model(.x, .formula = count ~ time + mbbs_county)),

    results_county = purrr::map(
      .x = fit_county,
      .f = ~ {
        if (.x$result == "failed") {
          .x
        } else {
          m <- .x$fit
          out <-
            expand.grid(
            year = min(m$data$year):max(m$data$year),
            mbbs_county = unique(analysis_dt$mbbs_county)
          ) %>%
          mutate(
            time = year - min(year),
            fitted = exp(predict(object = m,
                         newdata = data.frame(time = time,
                                     mbbs_county = mbbs_county)))
          )
          list(result = .x$result, values = out)
        }
      }
    )

  )

# Final step
mbbs_results <-
  # Summarize by year and species,
  # taking the average across all routes surveyed that year.
  analysis_dt %>%
  group_by(year, common_name) %>%
  summarise(count = mean(count), .groups = "drop") %>%
  group_by(common_name) %>%
  tidyr::nest(data_grouped = c(year, count)) %>%
  left_join(
    model_dt, by = c("common_name")
  )

#------------------------------------------------------------------------------#
# Write data ####


## All counts
mbbs_results %>%
  select(common_name, sci_name, data) %>%
  tidyr::unnest(cols = data) %>%
  write.csv(
    file = "data/mbbs.csv",
    row.names = FALSE
  )


to_species_id <- function(x) {
 stringr::str_replace_all(x, "'", "") |>
 stringr::str_replace_all(" ", "") |>
 stringr::str_replace_all("-", "")
}

## Counts per species
mbbs_results %>%
  select(common_name, data) %>%
  {
    dt <- .
    purrr::walk2(
      .x = .$common_name,
      .y = .$data,
      .f = ~ {
          write.csv(
            .y,
            file = paste0("data/", to_species_id(.x), "-counts.csv"),
            row.names = FALSE
          )
        }
    )

  }
