module Specs.SpecConfig exposing (..)

import VegaLite exposing (..)

mbbsVizConfig : List LabelledSpec -> (VLProperty, Spec)
mbbsVizConfig =
  configure
      << configuration
          (coView [ 
              vicoBackground [ viewStroke Nothing ]
            -- Default height and width
            , vicoContinuousHeight 450
            , vicoContinuousWidth 600
          ])
      << configuration 
          (coAutosize [ asFit, asPadding, asResize ])
          -- configure left axis
      << configuration 
          ( coAxisLeft [ axcoLabelFontSize 12 
                       , axcoTitleFontSize 18
                       ] )
      << configuration 
          ( coAxisBottom [ axcoLabelFontSize 12 
                          , axcoTitleFontSize 18
                          ] )