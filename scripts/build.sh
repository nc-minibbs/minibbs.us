#! /usr/bin/env bash

SITEDIR=_site

elm make src/Main.elm \
  --output=$SITEDIR/js/main.js

pandoc site/index.md \
  --from=markdown \
  --to=html \
  --output=$SITEDIR/index.html \
  --standalone

cp -r data/ $SITEDIR/data