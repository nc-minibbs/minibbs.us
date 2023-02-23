module DisplaySpeciesTable exposing (..)

import Browser
import Data.Species exposing (..)
import Element exposing (..)
import Html exposing (Html, input)
import Html.Attributes exposing (placeholder)
import Html.Events exposing (onInput)
import Table 

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
    ( model, Cmd.none )


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
        [  el [] <| html <| input [ placeholder "Search by Name", onInput SetQuery ] []
        ,  el [] <| html <| Table.view config tableState acceptableSpecies 
        ]



type alias SpeciesEntry  =
    { species : String
    , sparkLine : Int -- Element Msg
    , rateOfChange : String -- Element Msg
    }

config : Table.Config SpeciesEntry Msg
config =
    Table.config
        { toId = .species
        , toMsg = SetTableState
        , columns =
            [ Table.stringColumn "Name" .species
            , Table.intColumn "Trend" .sparkLine
            , Table.stringColumn "Rate of Change" .rateOfChange
            ]
        }

speciesTable : List SpeciesEntry
speciesTable =
    List.map 
      (\x -> SpeciesEntry (speciesToString x)  0 "") 
      allSpecies
