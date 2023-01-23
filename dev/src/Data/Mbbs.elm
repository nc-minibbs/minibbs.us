module Data.Mbbs exposing ( mbbsData )
{-| 
Exposes the MBBS data as a 
[VegaLite Data object](https://package.elm-lang.org/packages/gicentre/elm-vegalite/latest/VegaLite#2-specifying-the-data-to-visualize).
-}

import VegaLite exposing (..)

mbbsData : Data
mbbsData =
    dataFromUrl "./trends.csv"
        [ parse
            [ ( "year", foDate "%Y" )
            , ( "count", foNum )
            ]
        ]
