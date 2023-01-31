# Generate species type
dt <- read.csv("data/mbbs.csv")

x <- sort(unique(dt$common_name))

# Union
cat(paste(x, collapse = "\n| "), "\n")

# All species
cat("[", paste(x, collapse = "\n, "), "]", "\n")

# toString
cat(paste(paste(x, paste0("\"", x, "\""), sep = " -> "), collapse = "\n"), "\n")
