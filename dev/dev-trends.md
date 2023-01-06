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
cardinal : Data
cardinal = 
    dataFromUrl "./cardinal.csv"
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
        ps = 
            params 
                << param "countySelection" 
                    [ paSelect  sePoint [ seFields ["mbbs_county"] ] 
                    , paBindLegend ""
                    -- , paBind (ipSelect [ inDatumOptions [ str "", str "orange" ]] )
                    ]
        enc = 
            encoding
                << position X 
                    [ pName "year"
                    , pTemporal
                    , pAxis [ axTitle "" ] 
                    ]
                << position Y [ pName "count"
                , pAggregate opMean]
                
                << color 
                    [ 
                     mCondition (prParam "countySelection")
                        [ mName "mbbs_county"
                        , mNominal] 
                        [mStr "grey"]
                    ]
                << opacity [ mCondition (prParam "countySelection") 
                                [ mNum 1.0 ] 
                                [ mNum 0.2 ] ]

        in 
        toVegaLite 
            [ x
            , width 400
            , ps []
            , line []
            , enc []
            ] 
```

```elm { v }
chart : Spec
chart = 
    trendChart 
        cardinal
```

```elm { v interactive j }
chart2 : Spec
chart2 = 
    trendChart 
        cardinal
```

```elm {v interactive}
interactive : Spec
interactive =
    let
        data =
            dataFromUrl "https://gicentre.github.io/data/bicycleHiresLondon.csv" []
        ps =
            params
                << param "myBrush" [ paSelect seInterval [] ]
        encScatter =
            encoding
                << position X [ pName "NumberOfHires", pQuant ]
                << position Y [ pName "AvHireTime", pQuant ]
                << color
                    [ mCondition (prParam "myBrush")
                        [ mStr "rgb(76,120,168)" ]
                        [ mStr "lightgrey" ]
                    ]
        specScatter =
            asSpec [ width 300, height 150, ps [], encScatter [], circle [] ]
        trans =
            transform
                << filter (fiSelection "myBrush")
        encBars =
            encoding
                << position X
                    [ pName "AvHireTime"
                    , pScale [ scDomain (doNums [ 14, 27 ]) ]
                    , pQuant
                    ]
                << position Y
                    [ pAggregate opCount
                    , pScale [ scDomain (doMax 20) ]
                    ]
        specBars =
            asSpec [ width 300, height 120, trans [], encBars [], bar [ maSize 15 ] ]
    in
    toVegaLite [ data, vConcat [ specScatter, specBars ] ]
```