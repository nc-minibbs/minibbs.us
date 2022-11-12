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

        enc = 
            encoding
                << position X 
                    [ pName "year"
                    , pTemporal
                    , pAxis [ axTitle ""] 
                    ]

        encCounts =
            enc
                << position Y 
                    [ pName "count"
                    , pQuant 
                    , pAxis [ axTitle "Count" ]
                    ]
                << detail [dName "route"]

        encMean = 
            enc 
                << position Y [ pName "count", pAggregate opMean]
        
        trans = transform 
                  << filter 
                    (fiOneOf "mbbs_county" (strs (List.map toStr c )))
        in 
        toVegaLite 
            [ width 400
            , x
            , layer [
                asSpec 
                    [ encCounts []
                    , line 
                        [ maColor "black"
                        , maOpacity 0.2
                        , maStrokeWidth 0.5
                        ]
                    ]
              , asSpec 
                    [ encMean []
                    , line [ maColor "gray" ] 
                    ]
            ]
            , trans [] 
            ] 
```

```elm { v j  }
chart : Spec
chart = 
    speciesChart 
        [Orange, Chatham, Durham]
        cardinal
```
