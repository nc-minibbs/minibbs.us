port module Main exposing (main)

import Browser
import Browser.Navigation as Nav
import Data.Species exposing (speciesToString)
import Html exposing (Html, div, text, nav, a, h1)
import Html.Attributes exposing (href, class)
import Page.Home as Home
import Page.SpeciesDetail as SpeciesDetail
import Page.SpeciesTable as SpeciesTable
import Route exposing (Route(..))
import Url exposing (Url)
import VegaLite exposing (Spec)


{-| Port for sending Vega specs to JavaScript
-}
port vegaPort : Spec -> Cmd msg


{-| Main entry point
-}
main : Program () Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = \_ -> Sub.none
        , onUrlChange = UrlChanged
        , onUrlRequest = LinkClicked
        }


{-| Application model
-}
type alias Model =
    { route : Route
    , navKey : Nav.Key
    , homeModel : Maybe Home.Model
    , speciesTableModel : Maybe SpeciesTable.Model
    , speciesDetailModel : Maybe SpeciesDetail.Model
    }


{-| Application messages
-}
type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url
    | HomeMsg Home.Msg
    | SpeciesTableMsg SpeciesTable.Msg
    | SpeciesDetailMsg SpeciesDetail.Msg


{-| Initialize the application
-}
init : () -> Url -> Nav.Key -> ( Model, Cmd Msg )
init _ url navKey =
    let
        route =
            Route.fromUrl url

        model =
            { route = route
            , navKey = navKey
            , homeModel = Just Home.Model
            , speciesTableModel = Nothing
            , speciesDetailModel = Nothing
            }
    in
    initCurrentPage model


{-| Initialize the page based on current route
-}
initCurrentPage : Model -> ( Model, Cmd Msg )
initCurrentPage model =
    case model.route of

        Home ->
            let
                ( pageModel, pageCmd ) =
                    Home.init
            in
            ( { model | homeModel = Just pageModel }
            , Cmd.batch
                [ Cmd.map HomeMsg pageCmd
                , vegaPort (Home.toSpec pageModel)
                ]
            )

        SpeciesTable ->
            let
                ( pageModel, pageCmd ) =
                    SpeciesTable.init
            in
            ( { model | speciesTableModel = Just pageModel }
            , Cmd.batch
                [ Cmd.map SpeciesTableMsg pageCmd
                , vegaPort (SpeciesTable.toSpecs pageModel)
                ]
            )

        SpeciesDetail species ->
            let
                ( pageModel, pageCmd ) =
                    SpeciesDetail.init species
            in
            ( { model | speciesDetailModel = Just pageModel }
            , Cmd.batch
                [ Cmd.map SpeciesDetailMsg pageCmd
                , vegaPort (SpeciesDetail.toSpec pageModel)
                ]
            )

        NotFound ->
            ( model, Cmd.none )


{-| Update the application
-}
update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        HomeMsg subMsg ->
            case model.homeModel of
                Just pageModel ->
                    let
                        ( newPageModel, pageCmd ) =
                            Home.update vegaPort subMsg pageModel
                    in
                    ( { model | homeModel = Just newPageModel }
                    , Cmd.map HomeMsg pageCmd
                    )

                Nothing ->
                    ( model, Cmd.none )


        LinkClicked urlRequest ->
            case urlRequest of
                Browser.Internal url ->
                    -- Internal link - use pushUrl for SPA navigation
                    ( model, Nav.pushUrl model.navKey (Url.toString url) )

                Browser.External href ->
                    -- External link - use browser navigation
                    ( model, Nav.load href )

        UrlChanged url ->
            let
                newRoute =
                    Route.fromUrl url
            in
            initCurrentPage { model | route = newRoute }

        SpeciesTableMsg subMsg ->
            case model.speciesTableModel of
                Just pageModel ->
                    let
                        ( newPageModel, pageCmd ) =
                            SpeciesTable.update vegaPort subMsg pageModel
                    in
                    ( { model | speciesTableModel = Just newPageModel }
                    , Cmd.map SpeciesTableMsg pageCmd
                    )

                Nothing ->
                    ( model, Cmd.none )

        SpeciesDetailMsg subMsg ->
            case model.speciesDetailModel of
                Just pageModel ->
                    let
                        ( newPageModel, pageCmd ) =
                            SpeciesDetail.update vegaPort subMsg pageModel
                    in
                    ( { model | speciesDetailModel = Just newPageModel }
                    , Cmd.map SpeciesDetailMsg pageCmd
                    )

                Nothing ->
                    ( model, Cmd.none )


{-| Render the application
-}
view : Model -> Browser.Document Msg
view model =
    { title = pageTitle model.route
    , body =
        [ viewNavigation
        , div [ class "container" ] [ viewPage model ]
        ]
    }


{-| Get page title based on route
-}
pageTitle : Route -> String
pageTitle route =
    case route of
        Home -> 
            "NC Mini BBS"
        
        SpeciesTable ->
            "NC Mini BBS - Species"

        SpeciesDetail species ->
            "NC Mini BBS - " ++ speciesToString species

        NotFound ->
            "NC Mini BBS - Not Found"


{-| Render navigation bar
-}
viewNavigation : Html Msg
viewNavigation =
    nav [ class "navbar" ]
        [ a [ href "/" ] [ text "Home" ]
        , a [ href (Route.toHref SpeciesTable) ] [ text "Species" ]
        ]


{-| Render the current page
-}
viewPage : Model -> Html Msg
viewPage model =
    case model.route of
        Home -> case model.homeModel of
                Just pageModel ->
                    Html.map HomeMsg (Home.view pageModel)

                Nothing ->
                    text "Loading..."
        SpeciesTable ->
            case model.speciesTableModel of
                Just pageModel ->
                    Html.map SpeciesTableMsg (SpeciesTable.view pageModel)

                Nothing ->
                    text "Loading..."

        SpeciesDetail _ ->
            case model.speciesDetailModel of
                Just pageModel ->
                    Html.map SpeciesDetailMsg (SpeciesDetail.view pageModel)

                Nothing ->
                    text "Loading..."

        NotFound ->
            div []
                [ h1 [] [ text "Page Not Found" ]
                , a [ href (Route.toHref SpeciesTable) ] [ text "View all species" ]
                ]