module Specs.RouteTrend exposing (..)

import Data.County exposing (..)
import Data.Route exposing (..)
import Specs.SpecConfig exposing (..)
import String exposing (fromInt)
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
                    [ pName "totalCount"
                    , pAggregate opSum
                    , pAxis
                        [ axTitle "Total Count"
                        , axGrid False
                        ]
                    ]
                << tooltips
                    [ [ tName "year"
                      , tTitle "Year"
                      , tTemporal
                      , tFormat "%Y"
                      ]
                    , [ tName "totalCount"
                      , tTitle "Total count"
                      , tQuant
                      , tFormat ".0f"
                      , tAggregate opSum
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
                    [ opAs opSum "count" "totalCount" ]
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
                , point [ maColor "gray" ]
                ]
            , asSpec
                [ enc []
                , line [ maStrokeWidth 15, maOpacity 0 ]
                ]
            ]
        ]
