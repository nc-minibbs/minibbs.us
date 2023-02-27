port module DisplaySpeciesTable exposing (..)

import Browser
import Data.Species exposing (..)
import Html exposing (Html, div, input, text)
import Html.Attributes as Attr
import Html.Events exposing (onInput)
import Round
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
            (\x -> ( sparklineVegaID x, mkSparklineSpec x ))
            species



-- UPDATE


type Msg
    = SetQuery String
    | SetTableState Table.State


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    let
        filterSpeciesByQuery query =
            sparklines <|
                List.filter
                    (\z -> String.contains (String.toLower query) z.commonName)
                    allSpeciesRec

        filterSpeciesByState m =
            sparklines <|
                List.filter
                    (\z -> List.member z.commonName (List.map .species m.species))
                    allSpeciesRec
    in
    case msg of
        SetQuery newQuery ->
            ( { model | query = newQuery }
            , vegaPort (filterSpeciesByQuery newQuery)
            )

        SetTableState newState ->
            ( { model | tableState = newState }
            , vegaPort (filterSpeciesByState model)
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
    div
        []
        [ input [ Attr.placeholder "Search by Name", onInput SetQuery ] []
        , Table.view config tableState acceptableSpecies
        ]


type alias SpeciesTableEntry =
    { species : String
    , sparkLineID : String
    , rateOfChange : ( Float, Float )
    }


mkSparklineElement : String -> Table.HtmlDetails msg
mkSparklineElement x =
    Table.HtmlDetails
        []
        [ div [ Attr.id x ] [] ]


sparklineColumn : (data -> String) -> Table.Column data msg
sparklineColumn f =
    Table.veryCustomColumn
        { name = "Trend"
        , viewData = \data -> mkSparklineElement (f data)
        , sorter = unsortable
        }


rateColumn : (data -> ( Float, Float )) -> Column data msg
rateColumn f =
    Table.veryCustomColumn
        { name = " % Change per Year"
        , viewData = \data -> viewRate (f data)
        , sorter = Table.decreasingBy f
        }


viewRate : ( Float, Float ) -> Table.HtmlDetails msg
viewRate ( rate, pvalue ) =
    let
        col =
            if rate <= 0 && pvalue < 0.01 then
                Attr.style "color" "red"

            else if rate <= 0 && pvalue >= 0.01 && pvalue <= 0.05 then
                Attr.style "color" "lightcoral"

            else if rate > 0 && pvalue < 0.01 then
                Attr.style "color" "blue"

            else if rate > 0 && pvalue >= 0.01 && pvalue <= 0.05 then
                Attr.style "color" "lightblue"

            else
                Attr.style "color" "gray"
    in
    Table.HtmlDetails
        [ col
        , Attr.style "text-align" "right"
        ]
        [ text (Round.round 2 (rate * 100)) ]


config : Table.Config SpeciesTableEntry Msg
config =
    Table.config
        { toId = .species
        , toMsg = SetTableState
        , columns =
            [ Table.stringColumn "Name" .species
            , sparklineColumn .sparkLineID
            , rateColumn .rateOfChange
            ]
        }


sparklineVegaID : SpeciesRec -> String
sparklineVegaID s =
    s.id ++ "-sparkline"


speciesTable : List SpeciesTableEntry
speciesTable =
    List.map
        (\x ->
            SpeciesTableEntry
                x.commonName
                (sparklineVegaID x)
                ( x.rate, x.pvalue )
        )
        allSpeciesRec


port vegaPort : Spec -> Cmd msg
