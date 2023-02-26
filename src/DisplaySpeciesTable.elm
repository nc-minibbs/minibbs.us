port module DisplaySpeciesTable exposing (..)

import Browser
import Data.Species exposing (..)
import Element exposing (..)
import Html exposing (Html, input)
import Html.Attributes as Attr
import Html.Events exposing (onInput)
import Specs.SparklineSpec exposing (mkSparklineSpec)
import Table exposing (..)
import VegaLite exposing (Spec, combineSpecs)


main : Program () Model Msg
main =
    Browser.element
        { init = \() -> init speciesTable
        , update = update
        , view = view
        , subscriptions = \_ -> Sub.none
        }


type alias Model =
    { species : List SpeciesTableEntry
    , tableState : Table.State
    , query : String
    }


init : List SpeciesTableEntry -> ( Model, Cmd Msg )
init species =
    let
        model =
            { species = species
            , tableState = Table.initialSort "Year"
            , query = ""
            }
    in
    ( model, vegaPort (sparklines allSpeciesRec) )


sparklines : List SpeciesRec -> Spec
sparklines species =
    combineSpecs <|
        List.map
            (\x -> ( sparklineVegaID x.species, mkSparklineSpec x ))
            species



-- UPDATE


type Msg
    = SetQuery String
    | SetTableState Table.State


filterSpeciesByQuery : List SpeciesTableEntry -> Spec
filterSpeciesByQuery x =
    let
        listedSpecies =
            List.map .species x
    in
    sparklines <|
        List.filter
            (\z -> List.member z.commonName listedSpecies)
            allSpeciesRec


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        SetQuery newQuery ->
            ( { model | query = newQuery }
            , vegaPort (filterSpeciesByQuery model.species)
            )

        SetTableState newState ->
            ( { model | tableState = newState }
            , vegaPort (filterSpeciesByQuery model.species)
            )



-- VIEW


view : Model -> Html Msg
view { species, tableState, query } =
    let
        lowerQuery =
            String.toLower query

        acceptableSpecies =
            List.filter
                (String.contains lowerQuery << String.toLower << .species)
                species
    in
    layout [] <|
        column [] <|
            [ el [] <| html <| input [ Attr.placeholder "Search by Name", onInput SetQuery ] []
            , el [] <| html <| Table.view config tableState acceptableSpecies
            ]


type alias SpeciesTableEntry =
    { species : String
    , sparkLineID : String
    , rateOfChange : Float
    }


mkSparklineElement : String -> Table.HtmlDetails msg
mkSparklineElement x =
    Table.HtmlDetails
        []
        [ layout [] <| Element.row [ htmlAttribute (Attr.id x) ] [ el [] none ] ]


sparklineColumn : (data -> String) -> Table.Column data msg
sparklineColumn f =
    Table.veryCustomColumn
        { name = "Trend"
        , viewData = \data -> mkSparklineElement (f data)
        , sorter = unsortable
        }


config : Table.Config SpeciesTableEntry Msg
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
    speciesToSpeciesID s ++ "-sparkline"


speciesTable : List SpeciesTableEntry
speciesTable =
    List.map
        (\x ->
            SpeciesTableEntry
                (speciesToString x)
                (sparklineVegaID x)
                0.0
        )
        allSpecies


port vegaPort : Spec -> Cmd msg
