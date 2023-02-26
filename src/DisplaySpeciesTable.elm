port module DisplaySpeciesTable exposing (..)

import Browser
import Data.Species exposing (..)
import Element exposing (..)
import Html exposing (Html, input)
import Html.Attributes  as Attr
import Html.Events exposing (onInput)
import Table exposing (..)

import VegaLite exposing (Spec)
import Specs.SparklineSpec exposing (mkSparklineSpec)
import VegaLite exposing (combineSpecs)

main : Program () Model Msg
main =
    Browser.element
        { init = \() -> init speciesTable 

        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }


type alias Model =
    { species : List SpeciesEntry 
    , tableState : Table.State
    , query : String
    }


init : List SpeciesEntry -> ( Model, Cmd Msg )
init species =
    let
        model =
            { species = species
            , tableState = Table.initialSort "Year"
            , query = ""
            }
    in
    ( model , vegaPort sparklines )


sparklines : Spec
sparklines = 
    combineSpecs <|
    List.map 
        (\x -> (sparklineVegaID x , mkSparklineSpec x ))
        allSpecies

-- UPDATE


type Msg
    = SetQuery String
    | SetTableState Table.State


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetQuery newQuery ->
            ( { model | query = newQuery }
            , Cmd.none
            )

        SetTableState newState ->
            ( { model | tableState = newState }
            , Cmd.none
            )

-- VIEW


view : Model -> Html Msg
view { species, tableState, query } =
    let
        lowerQuery =
            String.toLower query

        acceptableSpecies =
            List.filter (String.contains lowerQuery << String.toLower << .species) species
    in
    layout [] <|
      column [] <| 
        [  el [] <| html <| input [ Attr.placeholder "Search by Name", onInput SetQuery ] []
        ,  el [] <| html <| Table.view config tableState acceptableSpecies 
        ]



type alias SpeciesEntry  =
    { species : String
    , sparkLineID : String
    , rateOfChange : Float -- Element Msg
    }

mkSparklineElement : String -> Table.HtmlDetails msg
mkSparklineElement x =
    Table.HtmlDetails 
        [ ]
        [ layout [] <| Element.row [ htmlAttribute (Attr.id x)  ] [ el [] none] ]

sparklineColumn : (data -> String) -> Table.Column data msg 
sparklineColumn  f = 
    Table.veryCustomColumn 
        { name = "Trend"
        , viewData = \data -> mkSparklineElement (f data)
        , sorter = unsortable
        }

config : Table.Config SpeciesEntry Msg
config =
    Table.config
        { toId = .species
        , toMsg = SetTableState
        , columns =
            [ Table.stringColumn "Name" .species
            , sparklineColumn .sparkLineID
            , Table.floatColumn "Rate of Change" .rateOfChange
            ]
        }

sparklineVegaID : Species -> String 
sparklineVegaID s = 
   speciesToString s
  |> String.replace " " "" 
  |> String.replace "'" ""
  |> \x ->  x ++ "-sparkline"

speciesTable : List SpeciesEntry
speciesTable =
    List.map 
      (\x -> SpeciesEntry 
        (speciesToString x) 
        (sparklineVegaID x )
        0.0
        ) 
      allSpecies


port vegaPort : Spec -> Cmd msg