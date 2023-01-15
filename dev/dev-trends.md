---
elm:
  dependencies:
    gicentre/elm-vegalite: latest
---

# Development of the primary trends visualization

```elm {l=hidden}
import VegaLite exposing (..)
```

In VSCode, press `Ctrl-k v` to open preview.

* [`elm-vegalite` docs](https://package.elm-lang.org/packages/gicentre/elm-vegalite/latest/VegaLite)

```elm {l}
counts : Data
counts = 
    dataFromUrl "./trends.csv"
      [ parse 
           [ ("year", foDate "%Y") 
           , ("count", foNum)
           ]

      ]
```

## Trend Visualization

```elm {l}
trendChart : Data -> Spec
trendChart data = 
    let 
    {-
        Define parameters for interactivity
    -}
        ps = 
            params 
                << param "countySelection" 
                    [ paSelect sePoint [ seFields ["mbbs_county"] ] 
                    , paBind 
                        (ipSelect 
                            [ inOptions 
                                [ ""
                                , "orange"
                                , "chatham"
                                , "durham"
                                ]] )
                    ]
                << param "aggregateMeasuure" 
                    [ paSelect sePoint [ ] 
                    , paBind 
                        (ipSelect 
                            [ inOptions 
                                [ "totalCount"
                                ]] )
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
                -- << position Y 
                --     [ pName "yBar"
                --     , pQuant    
                --     , pAggregate opSum
                --     , pAxis [ axTitle "Total Counts" ]
                --     ]
                << color 
                    [ mName "group"
                    , mNominal 
                    ]
                << tooltips 
                    [ [ tName "group"]
                    , [ tName "year", tTemporal, tFormat "%Y" ]
                    , [ tName "yHat", tQuant, tAggregate opSum ]
                    ]
    {-
        Define data transform and summaries 
    -}
        trans0 = transform
                -- Compute counts per species within each route/year
                -- This and the next sum could combined,
                -- but kept for clarity of the data summarizing steps.
                << aggregate
                    [ opAs opSum "count" "speciesCount"]
                    [ "year"
                    , "group"
                    , "mbbs_county"
                    , "route"
                    , "common_name"
                    ]
                -- Compute counts of all species within each route/year.
                << aggregate
                    [ opAs opSum "speciesCount" "routeCount" ]
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

        trans1 = trans0
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
        trans2 = trans0
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
                << filter (fiSelection "countySelection" )

        totalCountSpec = 
            asSpec [
              width 500
            , height 400
            , (enc << position Y 
                    [ pName "yHat"
                    , pQuant    
                    , pAggregate opSum
                    , pAxis [ axTitle "Total Counts" ]
                    ]) []
                    , line []
                    , ps []
                    , trans1 []
                 ]
        avgCountSpec = 
            asSpec [
              width 500
            , height 400
            , (enc << position Y 
                    [ pName "yBar"
                    , pQuant    
                    , pAggregate opSum
                    , pAxis [ axTitle "Average Count per Route" ]
                    ]) []
                    , line []
                    , ps []
                    , trans2 []
                 ]
        in 
        toVegaLite 
            [ data
            , width 500
            , height 400
            , vConcat [ 
                totalCountSpec 
              , avgCountSpec
              ]
            ] 
```

```elm { v }
chart : Spec
chart = 
    trendChart 
        counts
```

```elm { v interactive j }
chart2 : Spec
chart2 = 
    trendChart 
        counts
```
