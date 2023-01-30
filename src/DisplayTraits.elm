port module DisplayTraits exposing (..)

import Browser
import Css
import Data.Mbbs exposing (mbbsData)
import Data.Traits exposing (Trait(..), traitsData)
import Element
import Element.Input as Input
import Html.Styled as Styled
import Html.Styled.Attributes as StyledAttribs
import Specs.TrendByTrait exposing (mkTrendByTraitSpec)
import VegaLite exposing (..)


main : Program () Model Msg
main =
    Browser.element
        { init =
            always
                ( init
                , vegaPort initSpec
                )
        , view = view >> Styled.toUnstyled
        , update = update vegaPort
        , subscriptions = \_ -> Sub.none
        }


trendByTraitSpec : Trait -> Spec
trendByTraitSpec =
    mkTrendByTraitSpec
        mbbsData
        traitsData


specs : Trait -> Spec
specs trait =
    trendByTraitSpec trait


type alias Model =
    { selectedTrait : Trait
    }


init : Model
init =
    { selectedTrait = WinterBiome
    }


initSpec : Spec
initSpec =
    specs init.selectedTrait



-- Update


type Msg
    = SelectTrait Trait


update : (Spec -> Cmd Msg) -> Msg -> Model -> ( Model, Cmd Msg )
update toPort msg model =
    case msg of
        SelectTrait opt ->
            ( { model | selectedTrait = opt }
            , toPort (specs opt)
            )


view : Model -> Styled.Html Msg
view m =
    let
        traitRadio model =
            Element.layout [] <|
                Element.column []
                    [ Input.radioRow
                        []
                        { onChange = SelectTrait
                        , selected = Just model.selectedTrait
                        , label = Input.labelLeft [] <| Element.text "Trait: "
                        , options =
                            [ Input.option WinterBiome <| Element.text "Winter Biome"
                            , Input.option BreedingBiome <| Element.text "Breeding Biome"
                            , Input.option Diet5Cat <| Element.text "Diet"
                            ]
                        }
                    ]
    in
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
            [ StyledAttribs.id "vegaViz" ]
            []
        ]

port vegaPort : Spec -> Cmd msg
