# Create a data set for a single species to toy with

source("site/R/0a_report_functions.R")
source("site/R/0b_model_functions.R")
source("site/R/1a_data_prep.R")

cardinal <-
  mbbs_results %>%
  filter(common_name == "Northern Cardinal")

write.csv(
  cardinal$data,
  file = "dev/cardinal.csv",
  row.names = FALSE
)
