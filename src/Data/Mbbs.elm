module Data.Mbbs exposing (..)

{-| Exposes the MBBS data as a
[VegaLite Data object](https://package.elm-lang.org/packages/gicentre/elm-vegalite/latest/VegaLite#2-specifying-the-data-to-visualize).
-}

import VegaLite exposing (..)



-- Parse MBBS Count data
mbbsParse : String -> Data
mbbsParse file =
    dataFromUrl file
        [ parse
            [ ( "year", foDate "%Y" )
            , ( "count", foNum )
            ]
        ]


mbbsData : Data
mbbsData =
    mbbsParse "../data/mbbs.csv"
