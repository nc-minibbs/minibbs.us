port module Displays.ByTrait exposing (..)

import Css
import Data.Mbbs exposing (mbbsData)
import Data.Traits exposing (Trait(..), traitsData)
import Element
import Element.Input as Input
import Html
import Html.Styled as Styled
import Html.Styled.Attributes as StyledAttribs
import Select exposing (..)
import Specs.TrendByTrait exposing (mkTrendByTraitSpec)
import VegaLite exposing (..)

trendByTraitSpec : Trait -> Spec
trendByTraitSpec =
    mkTrendByTraitSpec
        mbbsData
        traitsData

specs : Trait  -> Spec
specs trait  =
    combineSpecs
        [  ( "trendByTrait", trendByTraitSpec trait)
        ]

type alias Model =
    { selectedTrait : Trait
    }

init : Model
init =
    { selectedTrait = WinterBiome
    }

-- Update 
type Msg
    = SelectTrait Trait

update : Msg -> Model -> (Model, Cmd Msg)
update msg model = 
  case msg of 
      SelectTrait opt ->
        ( { model | selectedTrait = opt }
        ,  vegaLite (specs opt)
        )


traitRadio : Model -> Html.Html Msg
traitRadio model =
    Element.layout [] <|
        Element.column []
            [ Input.radioRow
                []
                { onChange = SelectTrait
                , selected = Just model.selectedTrait
                , label = Input.labelLeft [] <| Element.text "Counties:"
                , options =
                    [ Input.option WinterBiome <| Element.text "Winter Biome"
                    , Input.option Diet5Cat <| Element.text "Diet"
                    ]
                }
            ]


view : Model -> Styled.Html Msg
view m =
    Styled.div
        [ StyledAttribs.css
            [ Css.marginTop (Css.px 20)
            , Css.width (Css.pct 50)
            , Css.marginLeft Css.auto
            , Css.marginRight Css.auto
            ]
        ]
        [ Styled.div
            []
            [ Styled.fromUnstyled (traitRadio m) ]
        , Styled.div
            [ StyledAttribs.id "trendByTrait" ]
            []
        ]

port vegaLite : Spec -> Cmd msg