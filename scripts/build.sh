#! /usr/bin/env bash

nix build .#site 

cp -r result/ _site/