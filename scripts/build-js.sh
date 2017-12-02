#!/bin/bash
set -ev -o pipefail

$(npm bin)/browserify -t [ babelify ] client/javascript/app.js -g [ envify --NODE_ENV production ] -p bundle-collapser/plugin | $(npm bin)/uglifyjs -o public/generic/app.js