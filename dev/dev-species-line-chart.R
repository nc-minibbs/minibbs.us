# Create a data set for a single species to toy with

source("R/0a_report_functions.R")
source("R/0b_model_functions.R")
source("R/1a_data_prep.R")

cardinal <-
  analysis_dt %>%
  filter(common_name == "Northern Cardinal") %>%
  select(year, mbbs_county, route, count)

write.csv(
  cardinal,
  file = "dev/cardinal.csv",
  row.names = FALSE
)
