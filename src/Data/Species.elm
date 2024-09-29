{- 
Elm code generated by prepare_results.R
This file should not be modified except by code formatters.
-}
module Data.Species exposing (..) 


-- A record containing information and data about an individual species
type alias SpeciesRec =
    { species : Species
    , id : String
    , commonName : String
    , sciName : String
    , rate : Float
    , pvalue : Float
    } 


-- Enumeration of all species observed in MBBS.
type Species 
   = AcadianFlycatcher
   | AmericanCrow
   | AmericanGoldfinch
   | AmericanRedstart
   | AmericanRobin
   | BaldEagle
   | BaltimoreOriole
   | BarnSwallow
   | BarredOwl
   | BeltedKingfisher
   | BlackVulture
   | BlackandwhiteWarbler
   | BlackpollWarbler
   | BlueGrosbeak
   | BlueJay
   | BluegrayGnatcatcher
   | BlueheadedVireo
   | BroadwingedHawk
   | BrownThrasher
   | BrownheadedCowbird
   | BrownheadedNuthatch
   | CanadaGoose
   | CarolinaChickadee
   | CarolinaWren
   | CedarWaxwing
   | ChimneySwift
   | Chuckwillswidow
   | CliffSwallow
   | CommonGrackle
   | CommonYellowthroat
   | CoopersHawk
   | Dickcissel
   | DoublecrestedCormorant
   | DownyWoodpecker
   | EasternBluebird
   | EasternKingbird
   | EasternMeadowlark
   | EasternPhoebe
   | EasternScreechOwl
   | EasternTowhee
   | EasternWhippoorwill
   | EasternWoodPewee
   | EuropeanStarling
   | FieldSparrow
   | FishCrow
   | GrasshopperSparrow
   | GrayCatbird
   | GreatBlueHeron
   | GreatCrestedFlycatcher
   | GreatEgret
   | GreatHornedOwl
   | GreenHeron
   | HairyWoodpecker
   | HoodedWarbler
   | HornedLark
   | HouseFinch
   | HouseSparrow
   | HouseWren
   | IndigoBunting
   | KentuckyWarbler
   | Killdeer
   | LoggerheadShrike
   | LouisianaWaterthrush
   | Mallard
   | MourningDove
   | NorthernBobwhite
   | NorthernCardinal
   | NorthernFlicker
   | NorthernMockingbird
   | NorthernParula
   | NorthernRoughwingedSwallow
   | OrchardOriole
   | Osprey
   | Ovenbird
   | PileatedWoodpecker
   | PrairieWarbler
   | ProthonotaryWarbler
   | PurpleMartin
   | RedbelliedWoodpecker
   | RedeyedVireo
   | RedheadedWoodpecker
   | RedshoulderedHawk
   | RedtailedHawk
   | RedwingedBlackbird
   | RockPigeon
   | RubythroatedHummingbird
   | ScarletTanager
   | SharpshinnedHawk
   | SongSparrow
   | SummerTanager
   | TreeSwallow
   | TuftedTitmouse
   | TurkeyVulture
   | WarblingVireo
   | WhitebreastedNuthatch
   | WhiteeyedVireo
   | WildTurkey
   | WoodDuck
   | WoodThrush
   | YellowWarbler
   | YellowbilledCuckoo
   | YellowbreastedChat
   | YellowthroatedVireo
   | YellowthroatedWarbler 


-- All Species in a single list
allSpecies : List Species
allSpecies 
   = [ AcadianFlycatcher
    , AmericanCrow
    , AmericanGoldfinch
    , AmericanRedstart
    , AmericanRobin
    , BaldEagle
    , BaltimoreOriole
    , BarnSwallow
    , BarredOwl
    , BeltedKingfisher
    , BlackVulture
    , BlackandwhiteWarbler
    , BlackpollWarbler
    , BlueGrosbeak
    , BlueJay
    , BluegrayGnatcatcher
    , BlueheadedVireo
    , BroadwingedHawk
    , BrownThrasher
    , BrownheadedCowbird
    , BrownheadedNuthatch
    , CanadaGoose
    , CarolinaChickadee
    , CarolinaWren
    , CedarWaxwing
    , ChimneySwift
    , Chuckwillswidow
    , CliffSwallow
    , CommonGrackle
    , CommonYellowthroat
    , CoopersHawk
    , Dickcissel
    , DoublecrestedCormorant
    , DownyWoodpecker
    , EasternBluebird
    , EasternKingbird
    , EasternMeadowlark
    , EasternPhoebe
    , EasternScreechOwl
    , EasternTowhee
    , EasternWhippoorwill
    , EasternWoodPewee
    , EuropeanStarling
    , FieldSparrow
    , FishCrow
    , GrasshopperSparrow
    , GrayCatbird
    , GreatBlueHeron
    , GreatCrestedFlycatcher
    , GreatEgret
    , GreatHornedOwl
    , GreenHeron
    , HairyWoodpecker
    , HoodedWarbler
    , HornedLark
    , HouseFinch
    , HouseSparrow
    , HouseWren
    , IndigoBunting
    , KentuckyWarbler
    , Killdeer
    , LoggerheadShrike
    , LouisianaWaterthrush
    , Mallard
    , MourningDove
    , NorthernBobwhite
    , NorthernCardinal
    , NorthernFlicker
    , NorthernMockingbird
    , NorthernParula
    , NorthernRoughwingedSwallow
    , OrchardOriole
    , Osprey
    , Ovenbird
    , PileatedWoodpecker
    , PrairieWarbler
    , ProthonotaryWarbler
    , PurpleMartin
    , RedbelliedWoodpecker
    , RedeyedVireo
    , RedheadedWoodpecker
    , RedshoulderedHawk
    , RedtailedHawk
    , RedwingedBlackbird
    , RockPigeon
    , RubythroatedHummingbird
    , ScarletTanager
    , SharpshinnedHawk
    , SongSparrow
    , SummerTanager
    , TreeSwallow
    , TuftedTitmouse
    , TurkeyVulture
    , WarblingVireo
    , WhitebreastedNuthatch
    , WhiteeyedVireo
    , WildTurkey
    , WoodDuck
    , WoodThrush
    , YellowWarbler
    , YellowbilledCuckoo
    , YellowbreastedChat
    , YellowthroatedVireo
    , YellowthroatedWarbler ] 


-- All Species records in a single list
allSpeciesRec : List SpeciesRec
allSpeciesRec 
   = [ { species = AcadianFlycatcher
  , id = "AcadianFlycatcher" 
  , commonName = "Acadian Flycatcher"
  , sciName = "Empidonax virescens"
  , rate = 0.062416963088
  , pvalue =  0.000000000005
  }
  , { species = AmericanCrow
  , id = "AmericanCrow" 
  , commonName = "American Crow"
  , sciName = "Corvus brachyrhynchos"
  , rate = -0.007556336764
  , pvalue =  0.003091052731
  }
  , { species = AmericanGoldfinch
  , id = "AmericanGoldfinch" 
  , commonName = "American Goldfinch"
  , sciName = "Spinus tristis"
  , rate = -0.031001111675
  , pvalue =  0.000000213866
  }
  , { species = AmericanRedstart
  , id = "AmericanRedstart" 
  , commonName = "American Redstart"
  , sciName = "Setophaga ruticilla"
  , rate = -0.025829440073
  , pvalue =  0.500824858885
  }
  , { species = AmericanRobin
  , id = "AmericanRobin" 
  , commonName = "American Robin"
  , sciName = "Turdus migratorius"
  , rate = -0.021215384307
  , pvalue =  0.005595409184
  }
  , { species = BaldEagle
  , id = "BaldEagle" 
  , commonName = "Bald Eagle"
  , sciName = "Haliaeetus leucocephalus"
  , rate = 0.072706633946
  , pvalue =  0.266407913160
  }
  , { species = BaltimoreOriole
  , id = "BaltimoreOriole" 
  , commonName = "Baltimore Oriole"
  , sciName = "Icterus galbula"
  , rate = 0.000000000000
  , pvalue =  1.000000000000
  }
  , { species = BarnSwallow
  , id = "BarnSwallow" 
  , commonName = "Barn Swallow"
  , sciName = "Hirundo rustica"
  , rate = -0.023935290312
  , pvalue =  0.036394321298
  }
  , { species = BarredOwl
  , id = "BarredOwl" 
  , commonName = "Barred Owl"
  , sciName = "Strix varia"
  , rate = 0.031620291705
  , pvalue =  0.014381947439
  }
  , { species = BeltedKingfisher
  , id = "BeltedKingfisher" 
  , commonName = "Belted Kingfisher"
  , sciName = "Megaceryle alcyon"
  , rate = -0.063527052775
  , pvalue =  0.027170311036
  }
  , { species = BlackVulture
  , id = "BlackVulture" 
  , commonName = "Black Vulture"
  , sciName = "Coragyps atratus"
  , rate = 0.061240154853
  , pvalue =  0.009001289818
  }
  , { species = BlackandwhiteWarbler
  , id = "BlackandwhiteWarbler" 
  , commonName = "Black-and-white Warbler"
  , sciName = "Mniotilta varia"
  , rate = 0.050629532618
  , pvalue =  0.010267507426
  }
  , { species = BlackpollWarbler
  , id = "BlackpollWarbler" 
  , commonName = "Blackpoll Warbler"
  , sciName = "Setophaga striata"
  , rate = 0.000000000000
  , pvalue =  1.000000000000
  }
  , { species = BlueGrosbeak
  , id = "BlueGrosbeak" 
  , commonName = "Blue Grosbeak"
  , sciName = "Passerina caerulea"
  , rate = 0.008410619219
  , pvalue =  0.310971760666
  }
  , { species = BlueJay
  , id = "BlueJay" 
  , commonName = "Blue Jay"
  , sciName = "Cyanocitta cristata"
  , rate = -0.016851981361
  , pvalue =  0.001319944793
  }
  , { species = BluegrayGnatcatcher
  , id = "BluegrayGnatcatcher" 
  , commonName = "Blue-gray Gnatcatcher"
  , sciName = "Polioptila caerulea"
  , rate = 0.007845328853
  , pvalue =  0.178601386127
  }
  , { species = BlueheadedVireo
  , id = "BlueheadedVireo" 
  , commonName = "Blue-headed Vireo"
  , sciName = "Vireo solitarius"
  , rate = -0.055167349925
  , pvalue =  0.000125588342
  }
  , { species = BroadwingedHawk
  , id = "BroadwingedHawk" 
  , commonName = "Broad-winged Hawk"
  , sciName = "Buteo platypterus"
  , rate = -0.101844790280
  , pvalue =  0.000000000094
  }
  , { species = BrownThrasher
  , id = "BrownThrasher" 
  , commonName = "Brown Thrasher"
  , sciName = "Toxostoma rufum"
  , rate = 0.000386091252
  , pvalue =  0.952960994713
  }
  , { species = BrownheadedCowbird
  , id = "BrownheadedCowbird" 
  , commonName = "Brown-headed Cowbird"
  , sciName = "Molothrus ater"
  , rate = 0.009171839524
  , pvalue =  0.196336429822
  }
  , { species = BrownheadedNuthatch
  , id = "BrownheadedNuthatch" 
  , commonName = "Brown-headed Nuthatch"
  , sciName = "Sitta pusilla"
  , rate = 0.016778257157
  , pvalue =  0.245691476590
  }
  , { species = CanadaGoose
  , id = "CanadaGoose" 
  , commonName = "Canada Goose"
  , sciName = "Branta canadensis"
  , rate = -0.027534229137
  , pvalue =  0.217612714534
  }
  , { species = CarolinaChickadee
  , id = "CarolinaChickadee" 
  , commonName = "Carolina Chickadee"
  , sciName = "Poecile carolinensis"
  , rate = -0.000694755991
  , pvalue =  0.883426749943
  }
  , { species = CarolinaWren
  , id = "CarolinaWren" 
  , commonName = "Carolina Wren"
  , sciName = "Thryothorus ludovicianus"
  , rate = 0.007469176449
  , pvalue =  0.028528498261
  }
  , { species = CedarWaxwing
  , id = "CedarWaxwing" 
  , commonName = "Cedar Waxwing"
  , sciName = "Bombycilla cedrorum"
  , rate = -0.011679425416
  , pvalue =  0.508682216216
  }
  , { species = ChimneySwift
  , id = "ChimneySwift" 
  , commonName = "Chimney Swift"
  , sciName = "Chaetura pelagica"
  , rate = -0.035158784725
  , pvalue =  0.000001325939
  }
  , { species = Chuckwillswidow
  , id = "Chuckwillswidow" 
  , commonName = "Chuck-will's-widow"
  , sciName = "Antrostomus carolinensis"
  , rate = 0.010725359215
  , pvalue =  0.540944491112
  }
  , { species = CliffSwallow
  , id = "CliffSwallow" 
  , commonName = "Cliff Swallow"
  , sciName = "Petrochelidon pyrrhonota"
  , rate = 0.153939632730
  , pvalue =  0.000000000000
  }
  , { species = CommonGrackle
  , id = "CommonGrackle" 
  , commonName = "Common Grackle"
  , sciName = "Quiscalus quiscula"
  , rate = -0.058468854767
  , pvalue =  0.000000000014
  }
  , { species = CommonYellowthroat
  , id = "CommonYellowthroat" 
  , commonName = "Common Yellowthroat"
  , sciName = "Geothlypis trichas"
  , rate = -0.030055315338
  , pvalue =  0.000295532264
  }
  , { species = CoopersHawk
  , id = "CoopersHawk" 
  , commonName = "Cooper's Hawk"
  , sciName = "Accipiter cooperii"
  , rate = -0.005486926208
  , pvalue =  0.759671096874
  }
  , { species = Dickcissel
  , id = "Dickcissel" 
  , commonName = "Dickcissel"
  , sciName = "Spiza americana"
  , rate = 0.000000000000
  , pvalue =  1.000000000000
  }
  , { species = DoublecrestedCormorant
  , id = "DoublecrestedCormorant" 
  , commonName = "Double-crested Cormorant"
  , sciName = "Nannopterum auritum"
  , rate = 0.028352505006
  , pvalue =  0.211799712460
  }
  , { species = DownyWoodpecker
  , id = "DownyWoodpecker" 
  , commonName = "Downy Woodpecker"
  , sciName = "Dryobates pubescens"
  , rate = 0.008058327057
  , pvalue =  0.323202907413
  }
  , { species = EasternBluebird
  , id = "EasternBluebird" 
  , commonName = "Eastern Bluebird"
  , sciName = "Sialia sialis"
  , rate = 0.001377396412
  , pvalue =  0.718493786472
  }
  , { species = EasternKingbird
  , id = "EasternKingbird" 
  , commonName = "Eastern Kingbird"
  , sciName = "Tyrannus tyrannus"
  , rate = -0.018568702556
  , pvalue =  0.120779236972
  }
  , { species = EasternMeadowlark
  , id = "EasternMeadowlark" 
  , commonName = "Eastern Meadowlark"
  , sciName = "Sturnella magna"
  , rate = -0.025589106173
  , pvalue =  0.006489037101
  }
  , { species = EasternPhoebe
  , id = "EasternPhoebe" 
  , commonName = "Eastern Phoebe"
  , sciName = "Sayornis phoebe"
  , rate = 0.010800341487
  , pvalue =  0.048553020272
  }
  , { species = EasternScreechOwl
  , id = "EasternScreechOwl" 
  , commonName = "Eastern Screech-Owl"
  , sciName = "Megascops asio"
  , rate = 0.049644403140
  , pvalue =  0.382733190074
  }
  , { species = EasternTowhee
  , id = "EasternTowhee" 
  , commonName = "Eastern Towhee"
  , sciName = "Pipilo erythrophthalmus"
  , rate = -0.030524422088
  , pvalue =  0.000000000000
  }
  , { species = EasternWhippoorwill
  , id = "EasternWhippoorwill" 
  , commonName = "Eastern Whip-poor-will"
  , sciName = "Antrostomus vociferus"
  , rate = -0.047153412352
  , pvalue =  0.006958323816
  }
  , { species = EasternWoodPewee
  , id = "EasternWoodPewee" 
  , commonName = "Eastern Wood-Pewee"
  , sciName = "Contopus virens"
  , rate = -0.006912144822
  , pvalue =  0.200743013877
  }
  , { species = EuropeanStarling
  , id = "EuropeanStarling" 
  , commonName = "European Starling"
  , sciName = "Sturnus vulgaris"
  , rate = -0.031239294883
  , pvalue =  0.006817666214
  }
  , { species = FieldSparrow
  , id = "FieldSparrow" 
  , commonName = "Field Sparrow"
  , sciName = "Spizella pusilla"
  , rate = -0.043981130784
  , pvalue =  0.001564143031
  }
  , { species = FishCrow
  , id = "FishCrow" 
  , commonName = "Fish Crow"
  , sciName = "Corvus ossifragus"
  , rate = 0.062192440795
  , pvalue =  0.000000000000
  }
  , { species = GrasshopperSparrow
  , id = "GrasshopperSparrow" 
  , commonName = "Grasshopper Sparrow"
  , sciName = "Ammodramus savannarum"
  , rate = -0.004431046362
  , pvalue =  0.840173009063
  }
  , { species = GrayCatbird
  , id = "GrayCatbird" 
  , commonName = "Gray Catbird"
  , sciName = "Dumetella carolinensis"
  , rate = -0.011236358905
  , pvalue =  0.147920628678
  }
  , { species = GreatBlueHeron
  , id = "GreatBlueHeron" 
  , commonName = "Great Blue Heron"
  , sciName = "Ardea herodias"
  , rate = 0.016016159888
  , pvalue =  0.096552653997
  }
  , { species = GreatCrestedFlycatcher
  , id = "GreatCrestedFlycatcher" 
  , commonName = "Great Crested Flycatcher"
  , sciName = "Myiarchus crinitus"
  , rate = 0.037221074275
  , pvalue =  0.000000589194
  }
  , { species = GreatEgret
  , id = "GreatEgret" 
  , commonName = "Great Egret"
  , sciName = "Ardea alba"
  , rate = 0.000000000000
  , pvalue =  1.000000000000
  }
  , { species = GreatHornedOwl
  , id = "GreatHornedOwl" 
  , commonName = "Great Horned Owl"
  , sciName = "Bubo virginianus"
  , rate = -0.014249616809
  , pvalue =  0.662061349384
  }
  , { species = GreenHeron
  , id = "GreenHeron" 
  , commonName = "Green Heron"
  , sciName = "Butorides virescens"
  , rate = -0.048136250774
  , pvalue =  0.004724222668
  }
  , { species = HairyWoodpecker
  , id = "HairyWoodpecker" 
  , commonName = "Hairy Woodpecker"
  , sciName = "Dryobates villosus"
  , rate = -0.012607231129
  , pvalue =  0.491617550009
  }
  , { species = HoodedWarbler
  , id = "HoodedWarbler" 
  , commonName = "Hooded Warbler"
  , sciName = "Setophaga citrina"
  , rate = 0.028253758110
  , pvalue =  0.000034099640
  }
  , { species = HornedLark
  , id = "HornedLark" 
  , commonName = "Horned Lark"
  , sciName = "Eremophila alpestris"
  , rate = 0.000000000000
  , pvalue =  1.000000000000
  }
  , { species = HouseFinch
  , id = "HouseFinch" 
  , commonName = "House Finch"
  , sciName = "Haemorhous mexicanus"
  , rate = 0.001752616969
  , pvalue =  0.815605643286
  }
  , { species = HouseSparrow
  , id = "HouseSparrow" 
  , commonName = "House Sparrow"
  , sciName = "Passer domesticus"
  , rate = -0.076239504530
  , pvalue =  0.000003135456
  }
  , { species = HouseWren
  , id = "HouseWren" 
  , commonName = "House Wren"
  , sciName = "Troglodytes aedon"
  , rate = -0.041938001459
  , pvalue =  0.019795180012
  }
  , { species = IndigoBunting
  , id = "IndigoBunting" 
  , commonName = "Indigo Bunting"
  , sciName = "Passerina cyanea"
  , rate = -0.027148093084
  , pvalue =  0.000000004218
  }
  , { species = KentuckyWarbler
  , id = "KentuckyWarbler" 
  , commonName = "Kentucky Warbler"
  , sciName = "Geothlypis formosa"
  , rate = 0.033053108747
  , pvalue =  0.352946597919
  }
  , { species = Killdeer
  , id = "Killdeer" 
  , commonName = "Killdeer"
  , sciName = "Charadrius vociferus"
  , rate = -0.018898342622
  , pvalue =  0.203890001380
  }
  , { species = LoggerheadShrike
  , id = "LoggerheadShrike" 
  , commonName = "Loggerhead Shrike"
  , sciName = "Lanius ludovicianus"
  , rate = -0.001425979624
  , pvalue =  0.984128238619
  }
  , { species = LouisianaWaterthrush
  , id = "LouisianaWaterthrush" 
  , commonName = "Louisiana Waterthrush"
  , sciName = "Parkesia motacilla"
  , rate = 0.023137950255
  , pvalue =  0.248789976417
  }
  , { species = Mallard
  , id = "Mallard" 
  , commonName = "Mallard"
  , sciName = "Anas platyrhynchos"
  , rate = -0.040763225404
  , pvalue =  0.030066470505
  }
  , { species = MourningDove
  , id = "MourningDove" 
  , commonName = "Mourning Dove"
  , sciName = "Zenaida macroura"
  , rate = -0.011524346635
  , pvalue =  0.005092852218
  }
  , { species = NorthernBobwhite
  , id = "NorthernBobwhite" 
  , commonName = "Northern Bobwhite"
  , sciName = "Colinus virginianus"
  , rate = -0.116075469419
  , pvalue =  0.000000000452
  }
  , { species = NorthernCardinal
  , id = "NorthernCardinal" 
  , commonName = "Northern Cardinal"
  , sciName = "Cardinalis cardinalis"
  , rate = -0.004079677437
  , pvalue =  0.104551856431
  }
  , { species = NorthernFlicker
  , id = "NorthernFlicker" 
  , commonName = "Northern Flicker"
  , sciName = "Colaptes auratus"
  , rate = -0.043138385141
  , pvalue =  0.002014114708
  }
  , { species = NorthernMockingbird
  , id = "NorthernMockingbird" 
  , commonName = "Northern Mockingbird"
  , sciName = "Mimus polyglottos"
  , rate = -0.009689787584
  , pvalue =  0.029876333477
  }
  , { species = NorthernParula
  , id = "NorthernParula" 
  , commonName = "Northern Parula"
  , sciName = "Setophaga americana"
  , rate = 0.039456353676
  , pvalue =  0.003979443400
  }
  , { species = NorthernRoughwingedSwallow
  , id = "NorthernRoughwingedSwallow" 
  , commonName = "Northern Rough-winged Swallow"
  , sciName = "Stelgidopteryx serripennis"
  , rate = 0.010413042263
  , pvalue =  0.701785892439
  }
  , { species = OrchardOriole
  , id = "OrchardOriole" 
  , commonName = "Orchard Oriole"
  , sciName = "Icterus spurius"
  , rate = -0.019194718922
  , pvalue =  0.091785551098
  }
  , { species = Osprey
  , id = "Osprey" 
  , commonName = "Osprey"
  , sciName = "Pandion haliaetus"
  , rate = 0.065674724026
  , pvalue =  0.001396344412
  }
  , { species = Ovenbird
  , id = "Ovenbird" 
  , commonName = "Ovenbird"
  , sciName = "Seiurus aurocapilla"
  , rate = -0.001966148567
  , pvalue =  0.648059260680
  }
  , { species = PileatedWoodpecker
  , id = "PileatedWoodpecker" 
  , commonName = "Pileated Woodpecker"
  , sciName = "Dryocopus pileatus"
  , rate = 0.036080679389
  , pvalue =  0.010623191166
  }
  , { species = PrairieWarbler
  , id = "PrairieWarbler" 
  , commonName = "Prairie Warbler"
  , sciName = "Setophaga discolor"
  , rate = -0.040704981709
  , pvalue =  0.000000019019
  }
  , { species = ProthonotaryWarbler
  , id = "ProthonotaryWarbler" 
  , commonName = "Prothonotary Warbler"
  , sciName = "Protonotaria citrea"
  , rate = 0.035115209422
  , pvalue =  0.197738374264
  }
  , { species = PurpleMartin
  , id = "PurpleMartin" 
  , commonName = "Purple Martin"
  , sciName = "Progne subis"
  , rate = 0.014747016944
  , pvalue =  0.105316680399
  }
  , { species = RedbelliedWoodpecker
  , id = "RedbelliedWoodpecker" 
  , commonName = "Red-bellied Woodpecker"
  , sciName = "Melanerpes carolinus"
  , rate = 0.001801060611
  , pvalue =  0.628414199114
  }
  , { species = RedeyedVireo
  , id = "RedeyedVireo" 
  , commonName = "Red-eyed Vireo"
  , sciName = "Vireo olivaceus"
  , rate = -0.009028086540
  , pvalue =  0.109911185180
  }
  , { species = RedheadedWoodpecker
  , id = "RedheadedWoodpecker" 
  , commonName = "Red-headed Woodpecker"
  , sciName = "Melanerpes erythrocephalus"
  , rate = 0.012054072968
  , pvalue =  0.447217607680
  }
  , { species = RedshoulderedHawk
  , id = "RedshoulderedHawk" 
  , commonName = "Red-shouldered Hawk"
  , sciName = "Buteo lineatus"
  , rate = 0.054498050321
  , pvalue =  0.000000002114
  }
  , { species = RedtailedHawk
  , id = "RedtailedHawk" 
  , commonName = "Red-tailed Hawk"
  , sciName = "Buteo jamaicensis"
  , rate = 0.006506194663
  , pvalue =  0.633592290003
  }
  , { species = RedwingedBlackbird
  , id = "RedwingedBlackbird" 
  , commonName = "Red-winged Blackbird"
  , sciName = "Agelaius phoeniceus"
  , rate = -0.027527715166
  , pvalue =  0.015442063245
  }
  , { species = RockPigeon
  , id = "RockPigeon" 
  , commonName = "Rock Pigeon"
  , sciName = "Columba livia"
  , rate = -0.040506742246
  , pvalue =  0.040160940850
  }
  , { species = RubythroatedHummingbird
  , id = "RubythroatedHummingbird" 
  , commonName = "Ruby-throated Hummingbird"
  , sciName = "Archilochus colubris"
  , rate = -0.036325559694
  , pvalue =  0.000494933890
  }
  , { species = ScarletTanager
  , id = "ScarletTanager" 
  , commonName = "Scarlet Tanager"
  , sciName = "Piranga olivacea"
  , rate = -0.041516319863
  , pvalue =  0.000000002755
  }
  , { species = SharpshinnedHawk
  , id = "SharpshinnedHawk" 
  , commonName = "Sharp-shinned Hawk"
  , sciName = "Accipiter striatus"
  , rate = -0.058141446704
  , pvalue =  0.112647345210
  }
  , { species = SongSparrow
  , id = "SongSparrow" 
  , commonName = "Song Sparrow"
  , sciName = "Melospiza melodia"
  , rate = 0.032611479318
  , pvalue =  0.024446637753
  }
  , { species = SummerTanager
  , id = "SummerTanager" 
  , commonName = "Summer Tanager"
  , sciName = "Piranga rubra"
  , rate = 0.024321139906
  , pvalue =  0.000074735196
  }
  , { species = TreeSwallow
  , id = "TreeSwallow" 
  , commonName = "Tree Swallow"
  , sciName = "Tachycineta bicolor"
  , rate = 0.126636661899
  , pvalue =  0.000090287706
  }
  , { species = TuftedTitmouse
  , id = "TuftedTitmouse" 
  , commonName = "Tufted Titmouse"
  , sciName = "Baeolophus bicolor"
  , rate = 0.004040698117
  , pvalue =  0.283063563259
  }
  , { species = TurkeyVulture
  , id = "TurkeyVulture" 
  , commonName = "Turkey Vulture"
  , sciName = "Cathartes aura"
  , rate = 0.008597372334
  , pvalue =  0.603775512874
  }
  , { species = WarblingVireo
  , id = "WarblingVireo" 
  , commonName = "Warbling Vireo"
  , sciName = "Vireo gilvus"
  , rate = -0.178087306890
  , pvalue =  0.034466158876
  }
  , { species = WhitebreastedNuthatch
  , id = "WhitebreastedNuthatch" 
  , commonName = "White-breasted Nuthatch"
  , sciName = "Sitta carolinensis"
  , rate = 0.016660717994
  , pvalue =  0.068457319283
  }
  , { species = WhiteeyedVireo
  , id = "WhiteeyedVireo" 
  , commonName = "White-eyed Vireo"
  , sciName = "Vireo griseus"
  , rate = 0.068301642379
  , pvalue =  0.000000000179
  }
  , { species = WildTurkey
  , id = "WildTurkey" 
  , commonName = "Wild Turkey"
  , sciName = "Meleagris gallopavo"
  , rate = 0.068543505427
  , pvalue =  0.000056051406
  }
  , { species = WoodDuck
  , id = "WoodDuck" 
  , commonName = "Wood Duck"
  , sciName = "Aix sponsa"
  , rate = 0.025456512034
  , pvalue =  0.404133575086
  }
  , { species = WoodThrush
  , id = "WoodThrush" 
  , commonName = "Wood Thrush"
  , sciName = "Hylocichla mustelina"
  , rate = -0.060189716372
  , pvalue =  0.000000000000
  }
  , { species = YellowWarbler
  , id = "YellowWarbler" 
  , commonName = "Yellow Warbler"
  , sciName = "Setophaga petechia"
  , rate = 0.033053108747
  , pvalue =  0.345627042108
  }
  , { species = YellowbilledCuckoo
  , id = "YellowbilledCuckoo" 
  , commonName = "Yellow-billed Cuckoo"
  , sciName = "Coccyzus americanus"
  , rate = 0.012609296211
  , pvalue =  0.058628362088
  }
  , { species = YellowbreastedChat
  , id = "YellowbreastedChat" 
  , commonName = "Yellow-breasted Chat"
  , sciName = "Icteria virens"
  , rate = -0.037708435424
  , pvalue =  0.000000298040
  }
  , { species = YellowthroatedVireo
  , id = "YellowthroatedVireo" 
  , commonName = "Yellow-throated Vireo"
  , sciName = "Vireo flavifrons"
  , rate = -0.009290118390
  , pvalue =  0.509926994823
  }
  , { species = YellowthroatedWarbler
  , id = "YellowthroatedWarbler" 
  , commonName = "Yellow-throated Warbler"
  , sciName = "Setophaga dominica"
  , rate = 0.075417564988
  , pvalue =  0.000000000445
  } ] 


-- Convert species to its common name as a String.
speciesToString : Species -> String
speciesToString species =
    case species of 
      AcadianFlycatcher -> "Acadian Flycatcher"
      AmericanCrow -> "American Crow"
      AmericanGoldfinch -> "American Goldfinch"
      AmericanRedstart -> "American Redstart"
      AmericanRobin -> "American Robin"
      BaldEagle -> "Bald Eagle"
      BaltimoreOriole -> "Baltimore Oriole"
      BarnSwallow -> "Barn Swallow"
      BarredOwl -> "Barred Owl"
      BeltedKingfisher -> "Belted Kingfisher"
      BlackVulture -> "Black Vulture"
      BlackandwhiteWarbler -> "Black-and-white Warbler"
      BlackpollWarbler -> "Blackpoll Warbler"
      BlueGrosbeak -> "Blue Grosbeak"
      BlueJay -> "Blue Jay"
      BluegrayGnatcatcher -> "Blue-gray Gnatcatcher"
      BlueheadedVireo -> "Blue-headed Vireo"
      BroadwingedHawk -> "Broad-winged Hawk"
      BrownThrasher -> "Brown Thrasher"
      BrownheadedCowbird -> "Brown-headed Cowbird"
      BrownheadedNuthatch -> "Brown-headed Nuthatch"
      CanadaGoose -> "Canada Goose"
      CarolinaChickadee -> "Carolina Chickadee"
      CarolinaWren -> "Carolina Wren"
      CedarWaxwing -> "Cedar Waxwing"
      ChimneySwift -> "Chimney Swift"
      Chuckwillswidow -> "Chuck-will's-widow"
      CliffSwallow -> "Cliff Swallow"
      CommonGrackle -> "Common Grackle"
      CommonYellowthroat -> "Common Yellowthroat"
      CoopersHawk -> "Cooper's Hawk"
      Dickcissel -> "Dickcissel"
      DoublecrestedCormorant -> "Double-crested Cormorant"
      DownyWoodpecker -> "Downy Woodpecker"
      EasternBluebird -> "Eastern Bluebird"
      EasternKingbird -> "Eastern Kingbird"
      EasternMeadowlark -> "Eastern Meadowlark"
      EasternPhoebe -> "Eastern Phoebe"
      EasternScreechOwl -> "Eastern Screech-Owl"
      EasternTowhee -> "Eastern Towhee"
      EasternWhippoorwill -> "Eastern Whip-poor-will"
      EasternWoodPewee -> "Eastern Wood-Pewee"
      EuropeanStarling -> "European Starling"
      FieldSparrow -> "Field Sparrow"
      FishCrow -> "Fish Crow"
      GrasshopperSparrow -> "Grasshopper Sparrow"
      GrayCatbird -> "Gray Catbird"
      GreatBlueHeron -> "Great Blue Heron"
      GreatCrestedFlycatcher -> "Great Crested Flycatcher"
      GreatEgret -> "Great Egret"
      GreatHornedOwl -> "Great Horned Owl"
      GreenHeron -> "Green Heron"
      HairyWoodpecker -> "Hairy Woodpecker"
      HoodedWarbler -> "Hooded Warbler"
      HornedLark -> "Horned Lark"
      HouseFinch -> "House Finch"
      HouseSparrow -> "House Sparrow"
      HouseWren -> "House Wren"
      IndigoBunting -> "Indigo Bunting"
      KentuckyWarbler -> "Kentucky Warbler"
      Killdeer -> "Killdeer"
      LoggerheadShrike -> "Loggerhead Shrike"
      LouisianaWaterthrush -> "Louisiana Waterthrush"
      Mallard -> "Mallard"
      MourningDove -> "Mourning Dove"
      NorthernBobwhite -> "Northern Bobwhite"
      NorthernCardinal -> "Northern Cardinal"
      NorthernFlicker -> "Northern Flicker"
      NorthernMockingbird -> "Northern Mockingbird"
      NorthernParula -> "Northern Parula"
      NorthernRoughwingedSwallow -> "Northern Rough-winged Swallow"
      OrchardOriole -> "Orchard Oriole"
      Osprey -> "Osprey"
      Ovenbird -> "Ovenbird"
      PileatedWoodpecker -> "Pileated Woodpecker"
      PrairieWarbler -> "Prairie Warbler"
      ProthonotaryWarbler -> "Prothonotary Warbler"
      PurpleMartin -> "Purple Martin"
      RedbelliedWoodpecker -> "Red-bellied Woodpecker"
      RedeyedVireo -> "Red-eyed Vireo"
      RedheadedWoodpecker -> "Red-headed Woodpecker"
      RedshoulderedHawk -> "Red-shouldered Hawk"
      RedtailedHawk -> "Red-tailed Hawk"
      RedwingedBlackbird -> "Red-winged Blackbird"
      RockPigeon -> "Rock Pigeon"
      RubythroatedHummingbird -> "Ruby-throated Hummingbird"
      ScarletTanager -> "Scarlet Tanager"
      SharpshinnedHawk -> "Sharp-shinned Hawk"
      SongSparrow -> "Song Sparrow"
      SummerTanager -> "Summer Tanager"
      TreeSwallow -> "Tree Swallow"
      TuftedTitmouse -> "Tufted Titmouse"
      TurkeyVulture -> "Turkey Vulture"
      WarblingVireo -> "Warbling Vireo"
      WhitebreastedNuthatch -> "White-breasted Nuthatch"
      WhiteeyedVireo -> "White-eyed Vireo"
      WildTurkey -> "Wild Turkey"
      WoodDuck -> "Wood Duck"
      WoodThrush -> "Wood Thrush"
      YellowWarbler -> "Yellow Warbler"
      YellowbilledCuckoo -> "Yellow-billed Cuckoo"
      YellowbreastedChat -> "Yellow-breasted Chat"
      YellowthroatedVireo -> "Yellow-throated Vireo"
      YellowthroatedWarbler -> "Yellow-throated Warbler" 


-- Identify a Species by a string, maybe
stringToSpecies : String -> Maybe Species
stringToSpecies s =
    List.map (\x -> ( x, speciesToString x )) allSpecies
   |> List.filterMap
      (\( x, y ) -> if y == s then Just x else Nothing )
    |> List.head 


-- Get the SpeciesRec for a Species
lookupSpecies : Species -> Maybe SpeciesRec
lookupSpecies x = 
  List.filter (\r -> x == r.species) allSpeciesRec 
    |> List.head
