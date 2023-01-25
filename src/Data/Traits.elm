module Data.Traits exposing (..)

{-| Exposes the species traties data as a
[VegaLite Data object](https://package.elm-lang.org/packages/gicentre/elm-vegalite/latest/VegaLite#2-specifying-the-data-to-visualize).
-}

import VegaLite exposing (dataFromUrl, Data)

traitsData : Data
traitsData =
    dataFromUrl "../data/NC_species_traits.csv" []

type Trait =
      BreedingBiome
    | WinterBiome
    | Diet5Cat

{-|
Convert a Trait to the string corresponding to the field name in traitsData
-}
traitToString : Trait -> String
traitToString x = 
    case x of 
        BreedingBiome -> "Breeding_Biome"
        WinterBiome   -> "Winter_Biome"
        Diet5Cat      -> "Diet_5Cat"