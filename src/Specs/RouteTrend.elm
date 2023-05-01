module Specs.RouteTrend exposing (..)

import Data.County exposing (..)
import Data.Route exposing (..)
import String exposing (fromInt)
import Specs.SpecConfig exposing (..)
import VegaLite exposing (..)




mkRouteTrendSpec : Data -> Route -> Spec
mkRouteTrendSpec countData route =
    let

        enc =
            encoding
                << position X
                    [ pName "year"
                    , pTemporal
                    , pAxis
                        [ axTitle ""
                        , axGrid False
                        , axTickCount (niTickCount 5)
                        ]
                    ]
                << position Y
                    [ pName "total"
                    , pAggregate opSum
                    ]
                << tooltips
                    [ [ tName "year"
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
                << filter 
                    (fiCompose 
                       (and 
                          (fiEqual "mbbs_county" (str (countyToString route.county)) |> fiOp)
                          (fiEqual "route_num" (str (fromInt route.number)) |> fiOp)
                        )
                       )
                    
                -- Aggregrate by route
                << aggregate
                    [ opAs opSum "count" "total" ]
                    [ "year"
                    , "mbbs_county"
                    , "route"
                    , "route_num"
                    ]


    in
    toVegaLite
        [ countData
        , mbbsVizConfig []
        , title (routeToString route) []
        , trans []
        , layer 
           [ asSpec
                [ enc []
                , line [ maColor "gray" ]
                ]
            , asSpec
                [ enc []
                , line [ maStrokeWidth 15, maOpacity 0 ]
                ]
            ]
        ]
