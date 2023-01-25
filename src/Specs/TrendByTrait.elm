module Specs.TrendByTrait exposing ( mkTrendByTraitSpec )

import Data.Traits exposing (Trait, traitToString)
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
                << color
                    [ mName "group"
                    , mNominal
                    ]
                << tooltips
                    [ [ tName "group" ]
                    , [ tName "year", tTemporal, tFormat "%Y" ]
                    , [ tName "yHat", tQuant, tAggregate opSum ]
                    ]

        {-
           Define data transform and summaries
        -}
        trans0 =
            transform
                << lookup "common_name"
                    traitData
                    "english_common_name"
                    -- (luAs "traits")
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

        trans1 =
            trans0
                -- Compute yHat by
                -- weighting county counts by the proportion of routes run
                << calculateAs
                    """
                    if ( datum.mbbs_county == "orange",
                        datum.countyCount * 12 / datum.nRoutesRun,
                        if ( datum.mbbs_county == "chatham",
                             datum.countyCount * 14 / datum.nRoutesRun,
                             datum.countyCount * 8 / datum.nRoutesRun
                            )
                    )
                    """
                    "yHat"

        trans2 =
            trans0
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

        trans3 =
            transform
               <<
            lookup "common_name"
                    traitData
                    "english_common_name"
                    (luFieldsAs [(traitToString trait, "group")])
                -- Filter based on the selected county
                << filter (fiSelection "countySelection")
                -- Remove 0 counts
                << filter (fiExpr "datum.count > 0")
                << aggregate
                    [ opAs opDistinct "common_name" "nSpecies" ]
                    [ "year"
                    , "group"
                    ]

        totalCountSpec =
            asSpec
                [ width 500
                , height 400
                , (enc
                    << position Y
                        [ pName "yHat"
                        , pQuant
                        , pAggregate opSum
                        , pAxis [ axTitle "Total Counts" ]
                        ]
                  )
                    []
                , line []
                , ps []
                , trans1 []
                ]

        avgCountSpec =
            asSpec
                [ width 500
                , height 400
                , (enc
                    << position Y
                        [ pName "yBar"
                        , pQuant
                        , pAggregate opSum
                        , pAxis [ axTitle "Average Count per Route" ]
                        ]
                  )
                    []
                , line []
                , ps []
                , trans2 []
                ]

        uniqueSpeciesSpec =
            asSpec
                [ width 500
                , height 400
                , (enc
                    << position Y
                        [ pName "nSpecies"
                        , pQuant
                        -- , pAggregate opSum
                        , pAxis [ axTitle "Number of species observed" ]
                        ]
                  )
                    []
                , line []
                , ps []
                , trans3 []
                ]
    in
    toVegaLite
        [ countData
        , width 500
        , height 400
        , vConcat
            [ totalCountSpec
            , avgCountSpec
            , uniqueSpeciesSpec
            ]
        ]
