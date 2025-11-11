module Page.SpeciesTraits exposing (Model, Msg, init, toSpec, update, view)

import Data.County exposing (County(..))
import Data.Mbbs exposing (mbbsData)
import Data.Traits exposing (Trait(..), traitsData)
import Html exposing (..)
import Html.Attributes exposing (checked, class, id, name, type_)
import Html.Events exposing (onClick)
import Specs.TrendByTrait exposing (CountyFilter(..), mkTrendByTraitSpec)
import VegaLite exposing (Spec)


type alias Model =
    { selectedTrait : Trait
    , selectedCountyFilter : CountyFilter
    }


type Msg
    = SelectTrait Trait
    | SelectCountyFilter CountyFilter


init : ( Model, Cmd Msg )
init =
    ( { selectedTrait = WinterBiome
      , selectedCountyFilter = NoCountyFilter
      }
    , Cmd.none
    )


toSpec : Model -> Spec
toSpec model =
    mkTrendByTraitSpec
        mbbsData
        traitsData
        model.selectedTrait
        model.selectedCountyFilter


update : (Spec -> Cmd Msg) -> Msg -> Model -> ( Model, Cmd Msg )
update sendToVega msg model =
    case msg of
        SelectTrait trait ->
            let
                newModel =
                    { model | selectedTrait = trait }
            in
            ( newModel, sendToVega (toSpec newModel) )

        SelectCountyFilter filter ->
            let
                newModel =
                    { model | selectedCountyFilter = filter }
            in
            ( newModel, sendToVega (toSpec newModel) )


view : Model -> Html Msg
view model =
    div [ class "traits-page" ]
        [ h2 [] [ text "Explore Trends by Traits" ]
        , div [ class "controls" ]
            [ viewTraitRadio model
            , viewCountyRadio model
            ]
        , div [ id "traitsViz" ] []
        ]


viewTraitRadio : Model -> Html Msg
viewTraitRadio model =
    div [ class "control-group" ]
        [ label [] [ text "Trait: " ]
        , div []
            [ label []
                [ input
                    [ type_ "radio"
                    , name "trait"
                    , checked (model.selectedTrait == WinterBiome)
                    , onClick (SelectTrait WinterBiome)
                    ]
                    []
                , text " Winter Biome"
                ]
            , label []
                [ input
                    [ type_ "radio"
                    , name "trait"
                    , checked (model.selectedTrait == BreedingBiome)
                    , onClick (SelectTrait BreedingBiome)
                    ]
                    []
                , text " Breeding Biome"
                ]
            , label []
                [ input
                    [ type_ "radio"
                    , name "trait"
                    , checked (model.selectedTrait == Diet5Cat)
                    , onClick (SelectTrait Diet5Cat)
                    ]
                    []
                , text " Diet"
                ]
            ]
        ]


viewCountyRadio : Model -> Html Msg
viewCountyRadio model =
    div [ class "control-group" ]
        [ label [] [ text "Counties: " ]
        , div []
            [ label []
                [ input
                    [ type_ "radio"
                    , name "county"
                    , checked (model.selectedCountyFilter == NoCountyFilter)
                    , onClick (SelectCountyFilter NoCountyFilter)
                    ]
                    []
                , text " All"
                ]
            , label []
                [ input
                    [ type_ "radio"
                    , name "county"
                    , checked (model.selectedCountyFilter == FilterCounty Chatham)
                    , onClick (SelectCountyFilter (FilterCounty Chatham))
                    ]
                    []
                , text " Chatham"
                ]
            , label []
                [ input
                    [ type_ "radio"
                    , name "county"
                    , checked (model.selectedCountyFilter == FilterCounty Durham)
                    , onClick (SelectCountyFilter (FilterCounty Durham))
                    ]
                    []
                , text " Durham"
                ]
            , label []
                [ input
                    [ type_ "radio"
                    , name "county"
                    , checked (model.selectedCountyFilter == FilterCounty Orange)
                    , onClick (SelectCountyFilter (FilterCounty Orange))
                    ]
                    []
                , text " Orange"
                ]
            ]
        ]
