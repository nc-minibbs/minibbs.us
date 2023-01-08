# Create a data set with multiple species to toy with

source("site/R/0a_report_functions.R")
source("site/R/0b_model_functions.R")
source("site/R/1a_data_prep.R")

dt <-
  mbbs_results %>%
  select(common_name, sci_name, data) %>%
  # Assign a random group of testing
  mutate(
    group = sample(LETTERS[1:6], size = n(), replace = TRUE)
  ) %>%
  tidyr::unnest(cols = c(data))

write.csv(
  dt,
  file = "dev/trends.csv",
  row.names = FALSE
)
