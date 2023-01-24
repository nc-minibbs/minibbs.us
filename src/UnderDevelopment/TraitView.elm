port module UnderDevelopment.TraitView exposing (elmToJS, main)

import Platform
import VegaLite exposing (..)


counts : Data
counts =
    dataFromUrl "./trends.csv"
        [ parse
            [ ( "year", foDate "%Y" )
            , ( "count", foNum )
            ]
        ]


trendChart : Data -> Spec
trendChart data =
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
        [ data
        , width 500
        , height 400
        , vConcat
            [ totalCountSpec
            , avgCountSpec
            , uniqueSpeciesSpec
            ]
        ]


mainTrends : Spec
mainTrends =
    trendChart counts



{- This list comprises the specifications to be provided to the Vega runtime.
   In this example, only a single spec 'helloWord' is provided.
-}


mbbsSpecs : Spec
mbbsSpecs =
    combineSpecs [ ( "mainTrends", mainTrends ) ]



{- ---------------------------------------------------------------------------
   The code below is boilerplate for creating a headless Elm module that opens
   an outgoing port to JavaScript and sends the Vega specs (mySpecs) to it.
   There should be no need to change this.
-}
-- https://package.elm-lang.org/packages/sporto/elm-select/latest/Select


main : Program () Spec msg
main =
    Platform.worker
        { init = always ( mbbsSpecs, elmToJS mbbsSpecs )
        , update = \_ model -> ( model, Cmd.none )
        , subscriptions = always Sub.none
        }


port elmToJS : Spec -> Cmd msg
