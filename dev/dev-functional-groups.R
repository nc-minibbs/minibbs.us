#read in functional groups database as it stands
functgroups <- read.csv("dev/dev-species-functional-groups.csv", header = TRUE)

#read in supplemental from Rosenberg et al. 2019 to get breeding habitat classification
habitat <- read.csv("dev/Rosenburg.et.al.2019.supplemental.s1.csv", header = TRUE)
#now let's trim down habitat to just what we need, we'll throw some options in there as well for further filters (ie: native, non-native)

habitat <- habitat %>% select(species, sci_name, Breeding.Biome, Migrate, native)

library(dplyr)

functgroups.hab <- left_join(functgroups, habitat, by = c('common_name' = 'species'))

#rewrite functional groups csv with the new information
write.csv(functgroups.hab, "dev/dev-species-functional-groups.csv")
