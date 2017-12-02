#!/usr/bin/env bash
set -ev

ESLINT="$(npm bin)/eslint --ignore-pattern test/**/*.jest.js"

$ESLINT client/javascripts/ --quiet
$ESLINT test
