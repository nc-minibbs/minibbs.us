---
elm:
  dependencies:
    gicentre/elm-vegalite: latest
---

# Development of species line chart

```elm {l=hidden}
import VegaLite exposing (..)
```

In VSCode, press `Ctrl-k v` to open preview.

* [`elm-vegalite` docs](https://package.elm-lang.org/packages/gicentre/elm-vegalite/latest/VegaLite)

```elm {r l}
cardinal : Data
cardinal = 
    dataFromUrl "./cardinal.csv"
      [ parse 
           [ ("year", foDate "%Y") 
           , ("count", foNum)
           ]

      ]
```

```elm {r l}
type County = Chatham | Durham | Orange

toStr : County -> String
toStr x = case x of 
   Chatham -> "chatham"
   Durham -> "durham"
   Orange -> "orange"
```

```elm {l}
speciesChart : (List County) -> Data -> Spec
speciesChart c x = 
    let 

        ps = params
             << param "county" 
                [ paSelect sePoint [seFields ["mbbs_county"]] 
                , paBindLegend "click"
                ]

        enc = 
            encoding
                << position X [ pName "year", pTemporal ]

        encCounts =
            enc
                << position Y [ pName "count", pQuant ]
                << color [ mName "route"
                         , mNominal
                         , mScale [ scRange (raStrs ["black"]) ]
                         , mLegend []
                         ]
                << strokeWidth 
                        [ mName "route"                        
                        , mScale [ scRange (raNums [0.5, 0.5])]
                        ]
                << opacity 
                        [ mName "route"
                        , mScale [ scRange (raNums [0.25, 0.25])]
                        ]
        encMean = 
            enc 
                << position Y [ pName "count", pAggregate opMean]
                -- << color [ mAggregate opMean
                --          , mScale [ scRange (raStrs ["black"]) ]]

        
        trans = transform 
                --  << filter (fiExpr "datum.mbbs_county == county")
                  << filter 
                    (fiOneOf "mbbs_county" (strs (List.map toStr c )))
        in 
        toVegaLite 
            [ width 400
            , x
            -- , ps []
            , layer [
                asSpec [encCounts [], line [] ]
              , asSpec [encMean [], line [] ]
            ]
            , trans [] 
            ] 
```

```elm {v}
chart : Spec
chart = 
    speciesChart 
        [Orange, Chatham, Durham]
        cardinal
```
