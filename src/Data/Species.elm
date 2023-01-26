module Data.Species exposing (..)


type Species
    = AmericanCrow
    | CarolinaWren
    | EasternBluebird
    | NorthernBobwhite
    | NorthernCardinal
    | SummerTanager
    | WoodThrush


allSpecies : List Species
allSpecies =
    [ AmericanCrow
    , CarolinaWren
    , EasternBluebird
    , NorthernBobwhite
    , NorthernCardinal
    , SummerTanager
    , WoodThrush
    ]


speciesToString : Species -> String
speciesToString species =
    case species of
        AmericanCrow ->
            "American Crow"

        CarolinaWren ->
            "Carolina Wren"

        EasternBluebird ->
            "Eastern Bluebird"

        NorthernBobwhite ->
            "Northern Bobwhite"

        NorthernCardinal ->
            "Northern Cardinal"

        SummerTanager ->
            "Summer Tanager"

        WoodThrush ->
            "Wood Thrush"
