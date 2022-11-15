// The spec was copied from
//dev/dev-visualizations.md

speciesTrendSpec = function(common_name) {
  var spec = 
  {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "width": 400,
    "data": {
      "url": "./data/" + common_name + ".csv",
      "format": {
        "parse": {
          "year": "date:'%Y'",
          "count": "number"
        }
      }
    },
    "layer": [
      {
        "encoding": {
          "x": {
            "field": "year",
            "type": "temporal",
            "axis": {
              "title": ""
            }
          },
          "y": {
            "field": "count",
            "type": "quantitative",
            "axis": {
              "title": "Count"
            }
          },
          "detail": {
            "field": "route"
          }
        },
        "mark": {
          "type": "line",
          "color": "black",
          "opacity": 0.2,
          "strokeWidth": 0.5
        }
      },
      {
        "encoding": {
          "x": {
            "field": "year",
            "type": "temporal",
            "axis": {
              "title": ""
            }
          },
          "y": {
            "field": "count",
            "aggregate": "mean"
          }
        },
        "mark": {
          "type": "line",
          "color": "gray"
        }
      }
    ],
    "transform": [
      {
        "filter": {
          "field": "mbbs_county",
          "oneOf": [
            "orange",
            "chatham",
            "durham"
          ]
        }
      }
    ]
  }
  
  return spec;
}
