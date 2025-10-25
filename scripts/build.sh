#! /usr/bin/env bash

Rscript --vanilla src-gen/RouteElm-codegen.R
Rscript --vanilla src-gen/SpeciesElm-codegen.R

nix build .#site 
