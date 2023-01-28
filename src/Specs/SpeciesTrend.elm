module Specs.SpeciesTrend exposing (..)

import Data.County exposing (..)
import Data.Species exposing (..)
import VegaLite exposing (..)


mkSpeciesTrendSpec : Data -> CountyAggregation -> Species -> Spec
mkSpeciesTrendSpec countData counties species =
    let
        withCountyAggregation combined split x =
            case counties of
                Combined ->
                    combined x

                Split ->
                    split x

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
                << withCountyAggregation
                    (\x -> x)
                    (color
                        [ mName "mbbs_county"
                        , mTitle "County"
                        , mNominal
                        ]
                    )
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
                << withCountyAggregation
                    (\x -> x)
                    (color
                        [ mName "mbbs_county"
                        , mTitle "County"
                        , mNominal
                        ]
                    )
                << withCountyAggregation
                    (\x -> x)
                    (detail [ dName "mbbs_county" ])
                << withCountyAggregation
                    (tooltips
                        [ [ tName "common_name"
                          , tTitle "Common name"
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
                    )
                    (tooltips
                        [ [ tName "mbbs_county"
                          , tTitle "County"
                          ]
                        , [ tName "common_name"
                          , tTitle "Common name"
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
                    )

        trans =
            transform
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
