#! /usr/bin/env bash

nix build .#site 

cp -R result/ _site/