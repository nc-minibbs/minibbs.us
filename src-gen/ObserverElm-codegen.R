#------------------------------------------------------------------------------#
#  Prepare observer data for display on MBBS site
# 
#------------------------------------------------------------------------------#

library(readr)
library(dplyr)
library(purrr)

observers <-
  readr::read_csv(
    file.path(
      system("nix path-info .#mbbs-data", intern = TRUE)[1],
      "surveys.csv"),
    col_types = cols(
      year  = col_integer(),
      route = col_factor(),
      obs1  = col_character(), 
      obs2  = col_character(),
      obs3  = col_character(),
      total_species   = col_skip(),
      total_abundance = col_skip(),
      date            = col_skip(),
    protocol_violation = col_logical())
  ) |>
  rowwise() |>
  mutate(
    observers = paste(sort(na.omit(c_across(starts_with("obs")))), collapse = " & ")
  ) |> 
  ungroup()
