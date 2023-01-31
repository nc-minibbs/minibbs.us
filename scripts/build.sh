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
  --template=site/template.html \
  --include-in-header=site/import-vega.html \
  --include-in-header=site/import-elm.html \
  --include-before-body=site/navbar.html \
  --include-after-body=site/index.js.html \
  --css=bootstrap.min.css \
  --standalone

pandoc site/results/index.md \
  --from=markdown \
  --to=html \
  --output=$OUTDIR/results/index.html \
  --template=site/template.html \
  --include-before-body=site/navbar.html \
  --css=bootstrap.min.css \
  --standalone


pandoc site/results/individual-species.md \
  --from=markdown \
  --to=html \
  --output=$OUTDIR/results/individual-species.html \
  --template=site/template.html \
  --include-in-header=site/import-vega.html \
  --include-in-header=site/results/individual-species-elm.html \
  --include-before-body=site/navbar.html \
  --include-after-body=site/results/individual-species.js.html \
  --css=bootstrap.min.css \
  --standalone

pandoc site/results/traits.md \
  --from=markdown \
  --to=html \
  --output=$OUTDIR/results/traits.html \
  --template=site/template.html \
  --include-in-header=site/import-vega.html \
  --include-in-header=site/results/traits-elm.html \
  --include-before-body=site/navbar.html \
  --include-after-body=site/results/traits.js.html \
  --css=bootstrap.min.css \
  --standalone


cp -r data/ $OUTDIR
cp site/bootstrap.min.css $OUTDIR