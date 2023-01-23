module Data.Species exposing (..)

type Species
    = NorthernCardinal
    | AmericanCrow
    | CarolinaWren
    | NorthernBobwhite

allSpecies : List Species
allSpecies = [
      NorthernCardinal
    , AmericanCrow
    , CarolinaWren
    ]

speciesToString : Species -> String
speciesToString species = case species of
    NorthernCardinal -> "Northern Cardinal"
    AmericanCrow     -> "American Crow"
    CarolinaWren     -> "Carolina Wren"
    NorthernBobwhite -> "Northern Bobwhite"