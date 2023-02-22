module Specs.SpeciesTrend exposing (..)

import Data.County exposing (..)
import Data.Species exposing (..)
import VegaLite exposing (..)
import Specs.SpecConfig exposing (..)


type RouteDetail
    = ShowRouteDetail
    | HideRouteDetail


mkSpeciesTrendSpec : Data -> RouteDetail -> CountyAggregation -> Species -> Spec
mkSpeciesTrendSpec countData routeDetail counties species =
    let
        withCountyAggregation combined split x =
            case counties of
                Combined ->
                    combined x

                Split ->
                    split x

        withRouteDetail show hide x =
            case routeDetail of
                ShowRouteDetail ->
                    show x

                HideRouteDetail ->
                    hide x

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
                        , mScale <|
                            categoricalDomainMap countyColorMap
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
                        -- Update y-axis title if route detail is hidden
                        (withRouteDetail 
                        (\x -> x)
                        ( (++) [ axTitle "Average Count" ])
                              ([ axGrid False] ))
                    ]
                << withCountyAggregation
                    (\x -> x)
                    (color
                        [ mName "mbbs_county"
                        , mTitle "County"
                        , mNominal
                        , mScale <|
                            categoricalDomainMap countyColorMap
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

        detailLayer =
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
            ]

        summaryLayer =
            [ asSpec
                [ encMean []
                , line [ maColor "gray" ]
                ]
            , asSpec
                [ encMean []
                , line [ maStrokeWidth 15, maOpacity 0 ]
                ]
            ]
    in
    toVegaLite
        [ countData 
        , mbbsVizConfig []
        , title (speciesToString species) []
        , trans []
        , layer (withRouteDetail ((++) detailLayer) (\x -> x) summaryLayer)
        ]
