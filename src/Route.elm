module Route exposing (..)

import Data.Route as RTE exposing (slugToRoute)
import Data.Species exposing (Species, slugToSpecies, speciesSlug)
import Url exposing (Url)
import Url.Parser as Parser exposing ((</>), Parser, oneOf, s, top)


type Route
    = Home
    | SpeciesTable
    | SpeciesDetail Species
    | SpeciesTraits
    | RouteList
    | RouteDetail RTE.Route
    | NotFound


{-| Parse a URL into a Route
-}
fromUrl : Url -> Route
fromUrl url =
    Parser.parse parser url
        |> Maybe.withDefault NotFound


parser : Parser (Route -> a) a
parser =
    oneOf
        [ Parser.map Home top
        , Parser.map SpeciesTable (s "species")
        , Parser.map SpeciesDetail (s "species" </> speciesParser)
        , Parser.map SpeciesTraits (s "traits")
        , Parser.map RouteList (s "routes")
        , Parser.map RouteDetail (s "routes" </> routeParser)
        ]


{-| Custom parser that only accepts valid species slugs
-}
speciesParser : Parser (Species -> a) a
speciesParser =
    Parser.custom "SPECIES" <|
        \segment ->
            slugToSpecies segment


routeParser : Parser (RTE.Route -> a) a
routeParser =
    Parser.custom "ROUTE" <|
        \segment ->
            slugToRoute segment


{-| Convert a Route to an href string for use in links
-}
toHref : Route -> String
toHref route =
    case route of
        Home ->
            "/"

        SpeciesTable ->
            "/species"

        SpeciesDetail species ->
            "/species/" ++ speciesSlug species

        SpeciesTraits ->
            "/traits"

        RouteList ->
            "/routes"

        RouteDetail mbbs_route ->
            "/routes/" ++ RTE.routeSlug mbbs_route

        NotFound ->
            "/not-found"
