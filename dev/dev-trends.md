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
                    [ paSelect  sePoint [ seFields ["group"] ] 
                    , paBindLegend ""
                    -- , paBind (ipSelect [ inOptions [  "",  "orange" ]] )
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
                    [ pName "bar", pQuant    
                    , pAggregate opMean]
                
                << color 
                    [ 
                     mCondition (prParam "countySelection")
                        [ mName "group"
                        , mNominal] 
                        [mStr "grey"]
                    -- , [ mName "mbbs_county", mNominal ]
                    ]
                << opacity [ mCondition (prParam "countySelection") 
                                [ mNum 1.0 ] 
                                [ mNum 0.2 ] ]
                << tooltips 
                    [ [ tName "group"]
                    , [ tName "year" ]
                    ]
        trans = transform
                -- Tally counts of each species with each year/county
                << joinAggregate
                    [ opAs opSum "count" "speciesCount"]
                    [ wiGroupBy ["year", "common_name"] ]
                << joinAggregate
                    [ opAs opMean "speciesCount" "bar" ]
                    [ wiGroupBy ["year", "mbbs_county", "group"] ]
        in 
        toVegaLite 
            [ x
            , width 400
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
