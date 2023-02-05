port module DisplayTraits exposing (..)

import Browser
import Css
import Data.County exposing (County(..))
import Data.Mbbs exposing (mbbsData)
import Data.Traits exposing (Trait(..), traitsData)
import Element
import Element.Input as Input
import Html.Styled as Styled
import Html.Styled.Attributes as StyledAttribs
import Specs.TrendByTrait exposing (mkTrendByTraitSpec, CountyFilter(..))
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


trendByTraitSpec : Trait -> CountyFilter -> Spec
trendByTraitSpec =
    mkTrendByTraitSpec
        mbbsData
        traitsData


specs : Trait -> CountyFilter ->  Spec
specs trait =
    trendByTraitSpec trait


type alias Model =
    { selectedTrait : Trait
    , selectedCountyFilter : CountyFilter
    }


init : Model
init =
    { selectedTrait = WinterBiome
    , selectedCountyFilter = NoCountyFilter
    }


initSpec : Spec
initSpec =
    specs init.selectedTrait init.selectedCountyFilter



-- Update


type Msg
    = SelectTrait Trait
     | SelectCountyFilter CountyFilter


update : (Spec -> Cmd Msg) -> Msg -> Model -> ( Model, Cmd Msg )
update toPort msg model =
    case msg of
        SelectTrait opt ->
            ( { model | selectedTrait = opt }
            , toPort (specs opt model.selectedCountyFilter)
            )
        SelectCountyFilter opt ->
            ( { model | selectedCountyFilter = opt }
            , toPort (specs model.selectedTrait opt)
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
        countyFilter model = 
            Element.layout [] <|
                Element.column []
                    [ Input.radioRow
                        []
                        { onChange = SelectCountyFilter
                        , selected = Just model.selectedCountyFilter
                        , label = Input.labelLeft [] <| Element.text "Counties: "
                        , options =
                            [ Input.option NoCountyFilter <| Element.text "All"
                            , Input.option (FilterCounty Chatham) <| Element.text "Chatham"
                            , Input.option (FilterCounty Durham) <| Element.text "Durham"
                            , Input.option (FilterCounty Orange) <| Element.text "Orange"

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
            []
            [ Styled.fromUnstyled (countyFilter m) ]
        , Styled.div
            [ StyledAttribs.id "vegaViz" ]
            []
        ]


port vegaPort : Spec -> Cmd msg
