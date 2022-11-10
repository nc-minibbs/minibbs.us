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

```elm {l r}
message : String
message =
    "Hello, world"
```

Top 5 programming languages according to the [TIOBE index](https://www.tiobe.com/tiobe-index).

```elm {v}
helloLitvis : Spec
helloLitvis =
    let
        data =
            dataFromColumns []
                << dataColumn "language" (strs [ "Java", "C", "C++", "Python", "C#" ])
                << dataColumn "rating" (nums [ 15.8, 13.6, 7.2, 5.8, 5.3 ])

        enc =
            encoding
                << position X
                    [ pName "language"
                    , pSort [ soByField "rating" opMean, soDescending ]
                    ]
                << position Y [ pName "rating", pQuant ]
    in
    toVegaLite [ data [], enc [], bar [] ]
```

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

```elm {l}
speciesChart : Data -> Spec
speciesChart x = 
    let 
        enc = 
            encoding
                << position X [ pName "year", pTemporal ]
                << position Y [ pName "count", pQuant ]
                << color [ mName "route"
                         , mNominal
                         , mScale [ scRange (raStrs ["gray"]) ]
                         , mLegend []
                         ]
                << strokeWidth 
                        [ mName "route"                        , mScale [ scRange (raNums [0.2])]
                        ]
                << opacity 
                        [ mName "route"
                        , mScale [ scRange (raNums [0.1])]
                        ]
        in 
        toVegaLite [ x , enc [], line [] ] 
```

```elm {v}
chart : Spec
chart = speciesChart cardinal
```
