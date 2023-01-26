module Specs.TrendByTrait exposing ( mkTrendByTraitSpec )

import Data.Traits exposing (Trait, traitToString)
import String exposing (replace)
import VegaLite exposing (..)

mkTrendByTraitSpec : Data -> Data -> Trait -> Spec
mkTrendByTraitSpec countData traitData trait =
    let
        {-
           Define parameters for interactivity
        -}
        ps =
            params
                << param "countySelection"
                    [ paSelect sePoint [ seFields [ "mbbs_county" ],
                        seResolve seGlobal ]
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

        {-
           Define the primary layer's encoding
        -}
        enc =
            encoding
                << position X
                    [ pName "year"
                    , pTemporal
                    , pAxis [ axTitle "" ]
                    ]
                << position Y
                    [ pName "yBar"
                    , pQuant
                    , pAggregate opMean
                    , pAxis [ axTitle "Average Count per Route" ]
                    ]
                << color
                    [ mName "group"
                    , mTitle (replace "_" " " (traitToString trait))
                    , mNominal
                    ]
                << tooltips
                    [ [ tName "group"
                      , tTitle (replace "_" " " (traitToString trait))
                      ]
                    , [ tName "year"
                      , tTitle "Year"
                      , tTemporal
                      , tFormat "%Y"
                      ]
                    , [ tName "yBar"
                      , tTitle "Avg. count"
                      , tQuant
                      , tFormat ".2f"
                      , tAggregate opMean
                      ]
                    ]

        {-
           Define data transform and summaries
        -}
        trans =
            transform
                << lookup "common_name"
                    traitData
                    "english_common_name"
                    (luFieldsAs [(traitToString trait, "group")])
                -- Filter based on the selected county
                << filter (fiSelection "countySelection")
                -- Compute counts per species within each route/year
                -- This and the next sum could combined,
                -- but kept for clarity of the data summarizing steps.
                << aggregate
                    [ opAs opSum "count" "speciesCount" ]
                    [ "year"
                    , "group"
                    , "mbbs_county"
                    , "route"
                    , "common_name"
                    ]
                -- Compute counts of all species within each route/year.
                << aggregate
                    [ opAs opSum "speciesCount" "routeCount"
                    ]
                    [ "year"
                    , "group"
                    , "mbbs_county"
                    , "route"
                    ]
                -- Per year, compute both:
                -- * counts with a county
                -- * number of routes run within a county
                << aggregate
                    [ opAs opSum "routeCount" "countyCount"
                    , opAs opDistinct "route" "nRoutesRun"
                    ]
                    [ "year"
                    , "group"
                    , "mbbs_county"
                    ]
                -- Compute tallies per year (across counties)
                << aggregate
                    [ opAs opSum "countyCount" "yearCount"
                    , opAs opSum "nRoutesRun" "yearRoutes"
                    ]
                    [ "year"
                    , "group"
                    ]
                -- Compute yBar as
                --   total count in year
                -- / total routes run in year
                << calculateAs
                    """
                    datum.yearCount / datum.yearRoutes
                    """
                    "yBar"



    in
    toVegaLite
        [ countData
        , width 500
        , height 400
        , enc []
        , layer [
             -- The main line chart
              asSpec
                [ ps []
                , line []
                ]
             ,
            -- Transparent layer to make it easier to select tooltip
             asSpec
                [ 
                 line [ maStrokeWidth 15, maOpacity 0 ]
                ]

        ]
        , trans []
        ]
