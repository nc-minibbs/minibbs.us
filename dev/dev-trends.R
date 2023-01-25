# Create a data set with multiple species to toy with

source("R/0a_report_functions.R")
source("R/0b_model_functions.R")
source("R/1a_data_prep.R")
# library(mbbs)
# library(dplyr)
dt <-
  mbbs_results %>%
  select(common_name, sci_name, data)
  # # Assign a random group of testing
  # mutate(
  #   group = sample(LETTERS[1:6], size = n(), replace = TRUE)
  # ) %>%


traits <-
  read.csv(file = "dev/NC_species_traits.csv") %>%
  select(
    common_name = english_common_name,
    group   = Diet.5Cat,
    # group      = BLFamilyEnglish,
    # group       = bird.group,
    # group = Breeding.Biome,
    # winter_biome   = Winter.Biome
  )

dt <- 
 dt %>%
#  left_join(
#   traits,
#   by = "common_name"
#  ) %>%
  tidyr::unnest(cols = c(data))


write.csv(
  dt,
  file = "dev/trends.csv",
  row.names = FALSE
)


dt %>%
 group_by(year, group, mbbs_county, route, common_name) %>%
 summarise(count = sum(count)) %>%
 group_by(year, group, mbbs_county, route) %>%
 summarise(count = sum(count)) %>%
 group_by(year, group, mbbs_county) %>%
 summarise(
      n_routes_run = length(unique(route))
    , count = sum(count)
 ) %>%
 mutate(
   yhat = case_when(
      mbbs_county == "orange" ~ count * 12 / n_routes_run
    , mbbs_county == "durham"   ~ count * 8  / n_routes_run
    , mbbs_county == "chatham"  ~ count * 14 / n_routes_run
    )
 ) %>% 
 View()
#  %>%
#  group_by(year, group) %>%
#  summarise(yhat = sum(yhat))
