// The spec was copied from
// dev/dev-visualizations.md

sparklineSpec = function(common_name) {
  var spec =
  {
    "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
    "config": {
      "view": {
        "stroke": null,
        "continuousHeight": 15,
        "continuousWidth": 80
      }
    },
    "data": {
      "url": "./data/" + common_name + ".csv",
      "format": {
        "parse": {
          "year": "date:'%Y'",
          "count": "number"
        }
      }
    },
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
    ],
    "encoding": {
      "x": {
        "field": "year",
        "type": "temporal",
        "axis": {
          "title": "",
          "ticks": false,
          "labels": false
        }
      },
      "y": {
        "field": "count",
        "aggregate": "mean",
        "axis": null
      }
    },
    "mark": {
      "type": "line",
      "color": "blue"
    }
  }
  
  return spec;
}
