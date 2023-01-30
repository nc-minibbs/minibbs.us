#! /usr/bin/env bash

OUTDIR=_site

elm make src/DisplayTraits.elm \
  --output=$OUTDIR/js/displayTraits.js \
  --optimize

elm make src/DisplayIndividualSpecies.elm \
  --output=$OUTDIR/js/displayIndividualSpecies.js \
  --optimize

elm make src/Home.elm \
  --output=$OUTDIR/js/home.js \
  --optimize

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
  --standalone


pandoc site/results/individual-species.md \
  --from=markdown \
  --to=html \
  --output=$OUTDIR/results/individual-species.html \
  --include-in-header=site/import-vega.html \
  --include-in-header=site/results/individual-species-elm.html \
  --include-after-body=site/results/individual-species.js.html \
  --standalone

pandoc site/results/traits.md \
  --from=markdown \
  --to=html \
  --output=$OUTDIR/results/traits.html \
  --include-in-header=site/import-vega.html \
  --include-in-header=site/results/traits-elm.html \
  --include-after-body=site/results/traits.js.html \
  --standalone


cp -r data/ $OUTDIR