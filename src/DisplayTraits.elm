port module DisplayTraits exposing (..)

import Browser
import Data.County exposing (County(..))
import Data.Mbbs exposing (mbbsData)
import Data.Traits exposing (Trait(..), traitsData)
import Element exposing (..)
import Element.Input as Input
import Html exposing (..)
import Html.Attributes as Attr
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
        , view = view -- >> Styled.toUnstyled
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



view : Model -> Html Msg
view m =
    let
        traitRadio model =
            Input.radioRow
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
        countyFilter model = 
            Input.radioRow
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
                    
    in
    layout [] <| 
        Element.column [] 
            [ el [] ( traitRadio m )
            , el [] ( countyFilter m )
            , el [htmlAttribute (Attr.id "vegaViz")] (Element.text "") 
            ] 


port vegaPort : Spec -> Cmd msg
