#------------------------------------------------------------------------------#
#  Prepare analysis data from MBBS site
#------------------------------------------------------------------------------#

library(mbbs)
library(dplyr)
library(tidyr)
library(ggplot2)
library(sparkline)
library(DT)
library(ggiraph)


pre_dt <-
  # Combine data from all 3 counties
  bind_rows(
    mbbs_orange,
    mbbs_chatham,
    mbbs_durham
  ) %>%
  ungroup() %>%
  # Summarize species counts by:
  # county year species route
  group_by(
    mbbs_county, year, common_name, sci_name, tax_order, date, route_num
  ) %>%
  summarise(
    count = sum(count)
  ) %>%
  mutate(
    # The route number is not unique within the study
    # (only within a county).
    # Here's a silly way to create distinct ID for routes
    # across county
    county_factor = case_when(
      mbbs_county == "orange" ~ 1,
      mbbs_county == "durham" ~ 20,
      mbbs_county == "chatham" ~ 40,
    ),
    route = route_num + county_factor
  ) %>%
  ungroup()

# Identify those species that were observed in:
# * at least 1 routes
# * at least 3 years
analysis_species <-
  pre_dt %>%
  group_by(common_name, year) %>%
  summarise(dummy = (sum(count) > 0) * 1L) %>%
  group_by(common_name) %>%
  summarise(nyears = sum(dummy)) %>%
  filter(nyears > 2) %>%
  select(common_name) %>%
  ungroup()

# Create a dataset with the years
# that each survey route was observed.
# This is used to create the correct denominator in
# summmarizing counts.
survey <-
 pre_dt %>%
 select(mbbs_county, year, route_num) %>%
 distinct()

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
    nesting(year, date, mbbs_county, route, route_num),
    nesting(common_name, sci_name, tax_order),
    fill = list(count = 0)
  )
  
# Checks ####
# 1) There is no variation in the number of times that a species
#    is in the analysis_dt for each year.
#    E.g. adding in the zero counts didn't add spurious surveys.
invisible(assertthat::assert_that(
  analysis_dt %>%
    group_by(year, mbbs_county, common_name) %>%
    tally() %>%
    group_by(year, mbbs_county) %>%
    summarise(check = var(n) == 0) %>%
    pull(check) %>%
    all(),
  msg = "All routes should be the same number of records for all species."
))

invisible(assertthat::assert_that(
  identical(
    analysis_dt %>%
      distinct(year, mbbs_county, route_num) %>%
      group_by(year, mbbs_county) %>%
      tally() %>%
      arrange(year, mbbs_county, n),
    survey %>%
      group_by(year, mbbs_county) %>%
      tally() %>%
      arrange(year, mbbs_county, n)
  ),
  msg = c("The number of route-surveys for each year in the analysis_dt frame",
         "should equal the number of route-surveys-year counts in pre_dt")
))


# Summarize by year and species,
# taking the average across all routes surveyed that year.
analysis_dt_grouped <-
  analysis_dt %>%
  group_by(year, common_name) %>%
  summarise(count = mean(count)) %>%
  ungroup()

# Estimate rates
model_dt <-
  analysis_dt %>%
  mutate(time = year - min(year)) %>%
  group_by(common_name, sci_name) %>%
  tidyr::nest() %>%
  mutate(
    gee_model = purrr::map(data, ~ gee_model(.x)),
    log_rate  = purrr::map_dbl(
      .x = gee_model,
      .f = ~ .x$estimate[.x$term == "time"]
    ),
    log_rate_se  = purrr::map_dbl(
      .x = gee_model,
      .f = ~ .x$std.error[.x$term == "time"]
    ),
    rate         = exp(log_rate) - 1,
    rate_lo      = exp(log_rate - qt(.975, df = 11) * log_rate_se) - 1,
    rate_hi      = exp(log_rate + qt(.975, df = 11) * log_rate_se) - 1,
    significant  = !(rate_lo < 0 & rate_hi > 0)
  )

mbbs_results <-
  analysis_dt_grouped %>%
  # filter(
  #   common_name %in% c("Northern Cardinal", "Tufted Titmouse", "Wood Thrush")
  # ) %>%
  group_by(common_name) %>%
  tidyr::nest(.key = "data_grouped") %>% 
  left_join(
    model_dt, by = c("common_name")
  ) %>% 
  mutate(
    # lm             = purrr::map(data_grouped, ~ lm(count ~ year, data = .x)),
    # rate_of_change = purrr::map_dbl(lm, ~ coef(.x)[2]),
    # rate_of_change = round(rate_of_change, 3), 
    rate_color     = case_when(
      rate < 0 & significant  ~ "#d7191c",
      rate < 0 & !significant ~ "#fdae61",
      rate > 0 & !significant ~ "#abd9e9",
      rate > 0 & significant  ~ "#2c7bb6"
    ),
    rate  = purrr::map2_chr(
      .x = rate,
      .y = rate_color, 
      .f = ~ as.character(htmltools::span(
        class = "text-center",
        style = sprintf("color:%s", .y),
        round(.x, 3)))),
    sparkline      = purrr::map_chr(data_grouped, ~ plot_sparkline(.x$count)),
    details        = purrr::pmap(
      .l = list(x = common_name, y = sci_name),
      .f = function(x, y) { as.character(create_details(x, y)) }
    )
  )


# Write data for site

purrr::walk2(
  .x = mbbs_results$common_name,
  .y = mbbs_results$data,
  .f = ~
    write.csv(
      .y,
      file =
        paste0("data/",
              stringr::str_replace_all(.x, " ", "_"),
              ".csv"),
      row.names = FALSE
    )
)
