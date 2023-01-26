module Specs.SpeciesTrend exposing (..)

import Data.Species exposing (..)
import VegaLite exposing (..)


mkSpeciesTrendSpec : Data -> Species -> Spec
mkSpeciesTrendSpec countData species =
    let
        {-
           Define parameters for interactivity
        -}
        ps =
            params
                << param "countySelection"
                    [ paSelect sePoint [ seFields [ "mbbs_county" ] ]
                    , paBind
                        (ipSelect
                            [ inOptions
                                [ ""
                                , "orange"
                                , "chatham"
                                , "durham"
                                ]
                            ]
                        )
                    ]

        enc =
            encoding
                << position X
                    [ pName "year"
                    , pTemporal
                    , pAxis
                        [ axTitle ""
                        , axGrid False
                        ]
                    ]

        encRoutes =
            enc
                << position Y
                    [ pName "speciesCount"
                    , pQuant
                    , pAggregate opSum
                    , pAxis
                        [ axTitle "Count"
                        , axGrid False
                        ]
                    ]
                << detail [ dName "route" ]
                << tooltips
                    [ [ tName "mbbs_county"
                      , tTitle "County"
                      ]
                    , [ tName "route_num"
                      , tTitle "Route"
                      ]
                    , [ tName "year"
                      , tTitle "Year"
                      , tTemporal
                      , tFormat "%Y"
                      ]
                    , [ tName "speciesCount"
                      , tTitle "Count"
                      , tQuant
                      ]
                    ]

        encMean =
            enc
                << position Y
                    [ pName "speciesCount"
                    , pAggregate opMean
                    , pAxis
                        [ axGrid False
                        ]
                    ]
                << tooltips
                    [ [ tName "common_name"
                      , tTitle "Common name"

                      --   , tTitle (speciesToString species)
                      ]
                    , [ tName "year"
                      , tTitle "Year"
                      , tTemporal
                      , tFormat "%Y"
                      ]
                    , [ tName "speciesCount"
                      , tTitle "Avg. count"
                      , tQuant
                      , tFormat ".2f"
                      , tAggregate opMean
                      ]
                    ]

        trans =
            transform
                -- Filter based on the selected county
                << filter (fiSelection "countySelection")
                -- Filter to selected species
                << filter (fiEqual "common_name" (str (speciesToString species)))
                -- Aggregrate by route
                << aggregate
                    [ opAs opSum "count" "speciesCount" ]
                    [ "year"
                    , "common_name"
                    , "sci_name"
                    , "mbbs_county"
                    , "route"
                    , "route_num"
                    ]

        cfg =
            configure
                << configuration
                    (coView [ vicoBackground [ viewStroke Nothing ] ])
    in
    toVegaLite
        [ width 400
        , height 300
        , cfg []
        , title (speciesToString species) []
        , countData
        , trans []
        , layer
            [ asSpec
                [ encRoutes []
                , line
                    [ maColor "black"
                    , maOpacity 0.2
                    , maStrokeWidth 0.5
                    ]
                , ps []
                ]
            , asSpec
                [ encRoutes []
                , line
                    [ maOpacity 0.0
                    , maStrokeWidth 10
                    ]
                ]
            , asSpec
                [ encMean []
                , line [ maColor "gray" ]
                ]
            , asSpec
                [ encMean []
                , line [ maStrokeWidth 15, maOpacity 0 ]
                ]
            ]
        ]
