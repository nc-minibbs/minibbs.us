module Data.Traits exposing (..)

{-| Exposes the species traties data as a
[VegaLite Data object](https://package.elm-lang.org/packages/gicentre/elm-vegalite/latest/VegaLite#2-specifying-the-data-to-visualize).
-}

import VegaLite exposing (dataFromUrl, Data)

traitsData : Data
traitsData =
    dataFromUrl "./data/NC_species_traits.csv" []