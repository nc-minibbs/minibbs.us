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
trendChart x = 
    let 
    {-
        Define parameters for interactivity
    -}
        ps = 
            params 
                << param "countySelection" 
                    [ paSelect  sePoint [ seFields ["mbbs_county"] ] 
                    -- , paBindLegend ""
                    , paBind 
                        (ipSelect 
                            [ inOptions 
                                [ ""
                                , "orange"
                                , "chatham"
                                , "durham"
                                ]] )
                    ]
    {-
    -}
        enc = 
            encoding
                << position X 
                    [ pName "year"
                    , pTemporal
                    , pAxis [ axTitle "" ] 
                    ]
                << position Y 
                    [ pName "yHat"
                    , pQuant    
                    , pAggregate opSum
                    , pAxis [ axTitle "Total Counts" ]
                    ]
                
                -- << color 
                --     [ mCondition (prParam "countySelection")
                --         [ mName "mbbs_county"
                --         , mNominal] 
                --         [mStr "grey"]
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
        trans = transform
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
                -- Finally, compute yHat by
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
                << filter (fiSelection  "countySelection" )
        in 
        toVegaLite 
            [ x
            , width 400
            , height 300
            , ps []
            , line []
            , enc []
            , trans []
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
