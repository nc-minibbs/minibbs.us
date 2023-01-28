port module Main exposing (main, vegaLite)

import Data.County exposing (County(..), CountyAggregation(..))
import Data.Mbbs exposing (mbbsData)
import Data.Species exposing (Species(..), allSpecies, speciesToString)
import Data.Traits exposing (Trait(..), traitsData)
-- import Platform

import Browser
import Css
-- import Debug exposing (toString)
import Html exposing (Html, div)
-- import Html.Attributes exposing (id)
import Html.Styled as Styled exposing (Html, div)
import Html.Styled.Attributes as StyledAttribs
import Select exposing (..)
import Specs.ExampleTrends exposing (mkExampleTrendsSpec)
import Specs.SpeciesTrend exposing (mkSpeciesTrendSpec)
import Specs.TrendByTrait exposing (mkTrendByTraitSpec)
import VegaLite exposing (..)

import Element exposing (Element, el)
import Element.Input as Input
-- import Element.Font
-- import Element.Border

-- import Widget.Material as Material
-- import W.Styles
-- import W.InputRadio

exampleTrendsSpec : Spec
exampleTrendsSpec =
    mkExampleTrendsSpec
        mbbsData
        [ WoodThrush
        , NorthernBobwhite
        , EasternBluebird
        , SummerTanager
        ]


trendByTraitSpec : Spec
trendByTraitSpec =
    mkTrendByTraitSpec
        mbbsData
        traitsData
        WinterBiome


speciesTrendSpec : CountyAggregation -> Species -> Spec
speciesTrendSpec = 
    mkSpeciesTrendSpec 
        mbbsData    

specs : CountyAggregation -> Species -> Spec
specs x species =
    combineSpecs
        [ ( "exampleTrends", exampleTrendsSpec )
        , ( "trendByTrait", trendByTraitSpec )
        , ( "speciesTrend", speciesTrendSpec x species)
        ]


{-
-}

speciesToMenuItem : Species -> Select.MenuItem Species
speciesToMenuItem species =
    customMenuItem 
        { item = species
        , label = speciesToString species
        , view = Styled.text (speciesToString species)
        }



speciesMenuItems : List (Select.MenuItem Species)
speciesMenuItems =
    List.map 
        speciesToMenuItem
        allSpecies



{-
-}

type alias Model =
    { selectState : Select.State
    , items : List (Select.MenuItem Species)
    , selectedSpecies : Maybe Species
    , selectedItem : Maybe String
    , countyAggregation : CountyAggregation
    }


init : Model
init =
    { selectState =
        Select.initState (Select.selectIdentifier "SpeciesSelector")
    , items = speciesMenuItems
    , selectedSpecies = Nothing
    , selectedItem = Nothing
    , countyAggregation = Combined
    }


type Msg
    = SelectMsg (Select.Msg Species)
    | CountySwitch (CountyAggregation)


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SelectMsg sm ->
            let
                ( maybeAction, selectState, _ ) =
                    Select.update sm model.selectState

                updateSelectedItem =
                    case maybeAction of
                        Just (Select.Select i) ->
                            Just (speciesToString i)
                        Just (Select.InputChange s) ->
                                 Just s
                        _ -> model.selectedItem

                updateSelectedSpecies =
                    case maybeAction of
                        Just (Select.Select i) ->
                            Just i

                        Just Select.Clear ->
                            Nothing

                        _ ->
                            model.selectedSpecies

                specMsg =
                    case maybeAction of
                        Just (Select.Select s) ->
                            vegaLite (specs model.countyAggregation s)

                        _ ->
                            Cmd.none
            in
            ( { model
                | selectState = selectState
                , selectedItem = updateSelectedItem
                , selectedSpecies = updateSelectedSpecies
              }
            , specMsg
            )
        CountySwitch opt -> 
            ( { model | countyAggregation = opt }
            ,  case model.selectedSpecies of 
                Nothing -> Cmd.none
                Just s  -> vegaLite (specs opt s)
            )


countyRadio : Model -> Html.Html Msg
countyRadio model =
    Element.layout [] <|
        Element.column []
            [ Input.radioRow
                [ ]
                { onChange = CountySwitch
                , selected = Just model.countyAggregation
                , label = Input.labelLeft [] <| Element.text "Counties:"
                , options =
                    [ Input.option Combined <| Element.text "Combined"
                    , Input.option Split <| Element.text "Split"
                    ]
                }
            ]

view : Model -> Styled.Html Msg 
view m = 
    let
        selectedItem =
            case m.selectedItem of
                Just i ->
                    Just (Select.basicMenuItem { item = NorthernBobwhite, label = i })

                _ ->
                    Nothing

    in Styled.div
        [ StyledAttribs.css
            [ Css.marginTop (Css.px 20)
            , Css.width (Css.pct 50)
            , Css.marginLeft Css.auto
            , Css.marginRight Css.auto
            ]
        ]
        [   
        
         Styled.map SelectMsg <|
            Select.view
                (Select.single selectedItem
                    |> Select.state m.selectState
                    |> Select.menuItems m.items
                    |> Select.placeholder "Select a species"
                    -- |> Select.searchable True
                    -- |> Select.clearable True
                )
        , Styled.div 
            []
            [Styled.fromUnstyled (countyRadio m)]
        , Styled.div
            [ StyledAttribs.id "speciesTrend" ]
            []
        ]

main : Program () Model Msg
main =
    Browser.element
        { init = always ( init, Cmd.none )
        , view = view >> Styled.toUnstyled
        , update = update
        , subscriptions = \_ -> Sub.none
        }







port vegaLite : Spec -> Cmd msg
