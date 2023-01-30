#! /usr/bin/env bash

OUTDIR=_site

elm make src/Main.elm \
  --output=$OUTDIR/js/main.js

elm make src/Home.elm \
  --output=$OUTDIR/js/home.js

pandoc site/index.md \
  --from=markdown \
  --to=html \
  --output=$OUTDIR/index.html \
  --include-in-header=site/import-vega.html \
  --include-in-header=site/import-elm.html \
  --include-after-body=site/index.js.html \
  --standalone

pandoc site/results/index.md \
  --from=markdown \
  --to=html \
  --output=$OUTDIR/results/index.html \
  --include-in-header=site/import-vega.html \
  --include-in-header=site/results/import-elm.html \
  --include-after-body=site/results/index.js.html \
  --standalone


cp -r data/ $OUTDIR