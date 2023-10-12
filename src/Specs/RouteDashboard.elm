module Specs.RouteDashboard exposing (..)

import Data.County exposing (..)
import Data.Route exposing (..)
import Specs.SpecConfig exposing (..)
import String exposing (fromInt)
import VegaLite exposing (..)


mkRouteDashboardSpec : Data -> Route -> Spec
mkRouteDashboardSpec countData route =
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

        encTotalCount =
            enc
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

        encSpeciesCount =
            enc
                << position Y
                    [ pName "speciesCount"
                    , pQuant
                    , pAxis
                        [ axTitle "Number of Species"
                        , axGrid False
                        ]
                    ]
                << tooltips
                    [ [ tName "year"
                      , tTitle "Year"
                      , tTemporal
                      , tFormat "%Y"
                      ]
                    , [ tName "speciesCount"
                      , tTitle "Number of Species"
                      , tQuant
                      , tFormat ".0f"
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
                -- Remove zero entries to get correct species count
                << filter (fiExpr "datum.count > 0")
                -- Aggregrate by route
                << aggregate
                    [ opAs opSum "count" "totalCount"
                    , opAs opDistinct "common_name" "speciesCount"
                    ]
                    [ "year"
                    , "mbbs_county"
                    , "route"
                    , "route_num"
                    ]

        totalSpec =
            asSpec
                [ layer
                    [ asSpec
                        [ encTotalCount []
                        , line [ maColor "gray" ]
                        ]
                    , asSpec
                        [ encTotalCount []
                        , point [ maColor "gray" ]
                        ]
                    , asSpec
                        [ encTotalCount []
                        , line [ maStrokeWidth 15, maOpacity 0 ]
                        ]
                    ]
                ]

        speciesSpec =
            asSpec
                [ layer
                    [ asSpec
                        [ encSpeciesCount []
                        , line [ maColor "gray" ]
                        ]
                    , asSpec
                        [ encSpeciesCount []
                        , point [ maColor "gray" ]
                        ]
                    , asSpec
                        [ encSpeciesCount []
                        , line [ maStrokeWidth 15, maOpacity 0 ]
                        ]
                    ]
                ]
    in
    toVegaLite
        [ countData
        , mbbsVizConfig
            (configuration
                (coView
                    [ vicoContinuousHeight 200
                    , vicoContinuousWidth 300
                    ]
                )
                []
            )
        , title (routeToTitle route) []
        , trans []
        , vConcat [ totalSpec, speciesSpec ]
        ]
