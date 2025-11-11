port module Main exposing (main)

import Browser
import Browser.Navigation as Nav
import Data.Route exposing (routeToTitle)
import Data.Species exposing (speciesToString)
import Html exposing (Html, a, button, div, h1, li, nav, span, text, ul)
import Html.Attributes as Attr exposing (class, href)
import Page.Home as Home
import Page.RouteDetail as RouteDetail
import Page.RouteList as RouteList
import Page.SpeciesDetail as SpeciesDetail
import Page.SpeciesTable as SpeciesTable
import Page.SpeciesTraits as SpeciesTraits
import Route exposing (Route(..))
import Url exposing (Url)
import VegaLite exposing (Spec)


{-| Port for sending Vega specs to JavaScript
-}
port vegaPort : { divId : String, spec : Spec } -> Cmd msg


{-| Port for getting data from Vega visualizations
-}
port speciesClicked : (String -> msg) -> Sub msg


subscriptions : Model -> Sub Msg
subscriptions _ =
    speciesClicked SpeciesClickedFromViz


{-| Main entry point
-}
main : Program () Model Msg
main =
    Browser.application
        { init = init
        , view = view
        , update = update
        , subscriptions = subscriptions
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
    , speciesTraitsModel : Maybe SpeciesTraits.Model
    , routeListModel : Maybe RouteList.Model
    , routeDetailModel : Maybe RouteDetail.Model
    }


{-| Application messages
-}
type Msg
    = LinkClicked Browser.UrlRequest
    | UrlChanged Url
    | HomeMsg Home.Msg
    | RouteListMsg RouteList.Msg
    | RouteDetailMsg RouteDetail.Msg
    | SpeciesTableMsg SpeciesTable.Msg
    | SpeciesDetailMsg SpeciesDetail.Msg
    | SpeciesTraitsMsg SpeciesTraits.Msg
    | SpeciesClickedFromViz String


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
            , routeDetailModel = Nothing
            , routeListModel = Nothing
            , speciesTableModel = Nothing
            , speciesDetailModel = Nothing
            , speciesTraitsModel = Nothing
            }
    in
    initCurrentPage model


{-| Initialize the page based on current route
-}
initCurrentPage : Model -> ( Model, Cmd Msg )
initCurrentPage model =
    -- Clear all page models first
    let
        clearedModel =
            { model
                | homeModel = Nothing
                , speciesTableModel = Nothing
                , speciesDetailModel = Nothing
            }
    in
    case model.route of
        Home ->
            let
                ( pageModel, pageCmd ) =
                    Home.init
            in
            ( { clearedModel | homeModel = Just pageModel }
            , Cmd.batch
                [ Cmd.map HomeMsg pageCmd
                , vegaPort { divId = "exampleTrends", spec = Home.toSpec pageModel }
                ]
            )

        RouteList ->
            let
                ( pageModel, pageCmd ) =
                    RouteList.init
            in
            ( { clearedModel | routeListModel = Just pageModel }
            , Cmd.map RouteListMsg pageCmd
            )

        RouteDetail route ->
            -- Replace placeholder with this
            let
                ( pageModel, pageCmd ) =
                    RouteDetail.init route
            in
            ( { clearedModel | routeDetailModel = Just pageModel }
            , Cmd.batch
                [ Cmd.map RouteDetailMsg pageCmd
                , vegaPort { divId = "routeViz", spec = RouteDetail.toSpec pageModel }
                ]
            )

        SpeciesDetail species ->
            let
                ( pageModel, pageCmd ) =
                    SpeciesDetail.init species
            in
            ( { clearedModel | speciesDetailModel = Just pageModel }
            , Cmd.batch
                [ Cmd.map SpeciesDetailMsg pageCmd
                , vegaPort { divId = "speciesDetail", spec = SpeciesDetail.toSpec pageModel }
                ]
            )

        SpeciesTable ->
            let
                ( pageModel, pageCmd ) =
                    SpeciesTable.init
            in
            ( { clearedModel | speciesTableModel = Just pageModel }
            , Cmd.batch
                [ Cmd.map SpeciesTableMsg pageCmd
                , vegaPort { divId = "sparklines", spec = SpeciesTable.toSpecs pageModel }
                ]
            )

        SpeciesTraits ->
            let
                ( pageModel, pageCmd ) =
                    SpeciesTraits.init
            in
            ( { clearedModel | speciesTraitsModel = Just pageModel }
            , Cmd.batch
                [ Cmd.map SpeciesTraitsMsg pageCmd
                , vegaPort { divId = "traitsViz", spec = SpeciesTraits.toSpec pageModel }
                ]
            )

        NotFound ->
            ( clearedModel, Cmd.none )


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
                            Home.update
                                (\spec -> vegaPort { divId = "exampleTrends", spec = spec })
                                subMsg
                                pageModel
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

        RouteListMsg subMsg ->
            case model.routeListModel of
                Just pageModel ->
                    let
                        ( newPageModel, pageCmd ) =
                            RouteList.update subMsg pageModel
                    in
                    ( { model | routeListModel = Just newPageModel }
                    , Cmd.map RouteListMsg pageCmd
                    )

                Nothing ->
                    ( model, Cmd.none )

        RouteDetailMsg subMsg ->
            -- Add this case
            case model.routeDetailModel of
                Just pageModel ->
                    let
                        ( newPageModel, pageCmd ) =
                            RouteDetail.update
                                (\spec -> vegaPort { divId = "routeViz", spec = spec })
                                subMsg
                                pageModel
                    in
                    ( { model | routeDetailModel = Just newPageModel }
                    , Cmd.map RouteDetailMsg pageCmd
                    )

                Nothing ->
                    ( model, Cmd.none )

        SpeciesTableMsg subMsg ->
            case model.speciesTableModel of
                Just pageModel ->
                    let
                        ( newPageModel, pageCmd ) =
                            SpeciesTable.update
                                (\spec -> vegaPort { divId = "sparklines", spec = spec })
                                subMsg
                                pageModel
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
                            SpeciesDetail.update
                                (\spec -> vegaPort { divId = "speciesDetail", spec = spec })
                                subMsg
                                pageModel
                    in
                    ( { model | speciesDetailModel = Just newPageModel }
                    , Cmd.map SpeciesDetailMsg pageCmd
                    )

                Nothing ->
                    ( model, Cmd.none )

        SpeciesTraitsMsg subMsg ->
            case model.speciesTraitsModel of
                Just pageModel ->
                    let
                        ( newPageModel, pageCmd ) =
                            SpeciesTraits.update
                                (\spec -> vegaPort { divId = "traitsViz", spec = spec })
                                subMsg
                                pageModel
                    in
                    ( { model | speciesTraitsModel = Just newPageModel }
                    , Cmd.map SpeciesTraitsMsg pageCmd
                    )

                Nothing ->
                    ( model, Cmd.none )

        SpeciesClickedFromViz speciesName ->
            case Data.Species.stringToSpecies speciesName of
                Just species ->
                    ( model
                    , Nav.pushUrl model.navKey
                        (Route.toHref (Route.SpeciesDetail species))
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
            "NC Mini Breeding Bird Survey"

        RouteList ->
            "NC MiniBBS - Routes"

        RouteDetail mbbs_route ->
            "NC MiniBBS - " ++ routeToTitle mbbs_route ++ " Dashboard"

        SpeciesTable ->
            "NC MiniBBS - Species"

        SpeciesDetail species ->
            "NC MiniBBS - " ++ speciesToString species

        SpeciesTraits ->
            "NC MiniBBS - Trends by Species Traits"

        NotFound ->
            "NC MiniBBS - Not Found"


{-| Render navigation bar
-}
viewNavigation : Html Msg
viewNavigation =
    nav [ class "navbar navbar-expand-lg bg-body-tertiary" ]
        [ div [ class "container-fluid" ]
            [ a [ class "navbar-brand", href (Route.toHref Home) ]
                [ text "Mini Breeding Bird Survey" ]
            , button
                [ class "navbar-toggler"
                , Attr.type_ "button"
                , Attr.attribute "data-bs-toggle" "collapse"
                , Attr.attribute "data-bs-target" "#navbarSupportedContent"
                , Attr.attribute "aria-controls" "navbarSupportedContent"
                , Attr.attribute "aria-expanded" "false"
                , Attr.attribute "aria-label" "Toggle navigation"
                ]
                [ span [ class "navbar-toggler-icon" ] [] ]
            , div [ class "collapse navbar-collapse", Attr.id "navbarSupportedContent" ]
                [ ul [ class "navbar-nav me-auto mb-2 mb-lg-0" ]
                    [ li [ class "nav-item" ]
                        [ a [ class "nav-link", href "/procedures.html" ]
                            [ text "Procedures" ]
                        ]
                    , li [ class "nav-item dropdown" ]
                        [ a
                            [ class "nav-link dropdown-toggle"
                            , href "#"
                            , Attr.attribute "role" "button"
                            , Attr.attribute "data-bs-toggle" "dropdown"
                            , Attr.attribute "aria-expanded" "false"
                            ]
                            [ text "Results" ]
                        , ul [ class "dropdown-menu" ]
                            [ li []
                                [ a [ class "dropdown-item", href (Route.toHref SpeciesTable) ]
                                    [ text "All Species" ]
                                ]
                            , li []
                                [ a [ class "dropdown-item", href (Route.toHref SpeciesTraits) ]
                                    [ text "Trends by Species Traits" ]
                                ]
                            , li []
                                [ a [ class "dropdown-item", href (Route.toHref RouteList) ]
                                    [ text "By Route" ]
                                ]
                            ]
                        ]
                    , li [ class "nav-item" ]
                        [ a
                            [ class "nav-link"
                            , href "https://docs.google.com/forms/d/e/1FAIpQLSdh5F7DVnqi3HxiB91lpBPp4n9dusD_oA752fHm2FHvBuc6_g/viewform"
                            ]
                            [ text "Participate" ]
                        ]
                    ]
                ]
            ]
        ]


{-| Render the current page
-}
viewPage : Model -> Html Msg
viewPage model =
    case model.route of
        Home ->
            case model.homeModel of
                Just pageModel ->
                    Html.map HomeMsg (Home.view pageModel)

                Nothing ->
                    text "Loading..."

        RouteList ->
            case model.routeListModel of
                Just pageModel ->
                    Html.map RouteListMsg (RouteList.view pageModel)

                Nothing ->
                    text "Loading..."

        RouteDetail _ ->
            case model.routeDetailModel of
                Just pageModel ->
                    Html.map RouteDetailMsg (RouteDetail.view pageModel)

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

        SpeciesTraits ->
            case model.speciesTraitsModel of
                Just pageModel ->
                    Html.map SpeciesTraitsMsg (SpeciesTraits.view pageModel)

                Nothing ->
                    text "Loading..."

        NotFound ->
            div []
                [ h1 [] [ text "Page Not Found" ]
                ]
