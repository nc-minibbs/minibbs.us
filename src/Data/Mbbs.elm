module Data.Mbbs exposing (..)

{-| Exposes the MBBS traits data as a
[VegaLite Data object](https://package.elm-lang.org/packages/gicentre/elm-vegalite/latest/VegaLite#2-specifying-the-data-to-visualize).
-}

import VegaLite exposing (..)

mbbsData : Data
mbbsData =
    dataFromUrl "./data/mbbs.csv"
        [ parse
            [ ( "year", foDate "%Y" )
            , ( "count", foNum )
            ]
        ]

