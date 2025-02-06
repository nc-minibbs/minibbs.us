module Specs.ExampleTrends exposing (..)

import Data.Species exposing (Species, speciesToString)
import Specs.SpecConfig exposing (..)
import VegaLite exposing (..)


{-| Defines the Vega-Lite specs
for the site's landing page.

First argument is the data to use for the visualization.
Second arguments is a list of species to include on the plot.

-}
mkExampleTrendsSpec : Data -> List Species -> Spec
mkExampleTrendsSpec data species =
    let
        {-
           Define the vizulation's encoding
        -}
        enc =
            encoding
                << color
                    [ mName "common_name"
                    , mNominal
                    , mLegend []
                    ]

        lineEnc =
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
                    [ pName "avgCount"
                    , pQuant
                    , pAxis
                        [ axTitle "Average Count per Route"
                        , axGrid False

                        -- , axTitleAngle 270
                        -- , axTitleAnchor anEnd
                        ]
                    ]
                << tooltips
                    [ [ tName "common_name"
                      , tTitle "Common name"
                      ]
                    , [ tName "sci_name"
                      , tTitle "Scientific name"
                      ]
                    , [ tName "year"
                      , tTitle "Year"
                      , tTemporal
                      , tFormat "%Y"
                      ]
                    , [ tName "avgCount"
                      , tTitle "Average Count"
                      , tQuant
                      , tFormat ".2f"
                      ]
                    ]

        labelEnc =
            encoding
                << position X
                    [ pName "year"
                    , pAggregate opMax
                    , pTemporal
                    ]
                << position Y
                    [ pName "avgCount"
                    , pQuant
                    , pAggregate (opArgMax (Just "year"))
                    ]
                << text
                    [ tName "common_name"
                    , tAggregate (opArgMax (Just "year"))
                    ]

        {-
           Define data transform and summaries
        -}
        trans =
            transform
                -- Filter to the selected species
                << filter (fiOneOf "common_name" (strs (List.map speciesToString species)))
                -- Compute counts per species within each route/year
                -- This and the next sum could combined,
                -- but kept for clarity of the data summarizing steps.
                << aggregate
                    [ opAs opSum "count" "speciesCount" ]
                    [ "year"
                    , "county"
                    , "route"
                    , "common_name"
                    , "sci_name"
                    ]
                -- Compute counts of all species within each route/year.
                << aggregate
                    [ opAs opSum "speciesCount" "routeCount"
                    ]
                    [ "year"
                    , "county"
                    , "route"
                    , "common_name"
                    , "sci_name"
                    ]
                -- Per year, compute both:
                -- * counts with a county
                -- * number of routes run within a county
                << aggregate
                    [ opAs opSum "routeCount" "countyCount"
                    , opAs opDistinct "route" "nRoutesRun"
                    ]
                    [ "year"
                    , "county"
                    , "common_name"
                    , "sci_name"
                    ]
                -- Compute tallies per year (across counties)
                << aggregate
                    [ opAs opSum "countyCount" "yearCount"
                    , opAs opSum "nRoutesRun" "yearRoutes"
                    ]
                    [ "year"
                    , "common_name"
                    , "sci_name"
                    ]
                -- Compute yBar as
                --   total count in year
                -- / total routes run in year
                << calculateAs
                    """
                    datum.yearCount / datum.yearRoutes
                    """
                    "avgCount"
    in
    toVegaLite
        [ data
        , mbbsVizConfig []
        , enc []
        , layer
            [ -- The main line chart
              asSpec
                [ lineEnc []
                , line []
                ]

            -- Transparent layer to make it easier to select tooltip
            , asSpec
                [ lineEnc []
                , line [ maStrokeWidth 12, maOpacity 0 ]
                ]

            -- Textual Labels for each line
            , asSpec
                [ labelEnc []
                , circle []
                , textMark
                    [ maAlign haLeft
                    , maDx 1.5
                    ]
                ]
            ]
        , trans []
        ]
