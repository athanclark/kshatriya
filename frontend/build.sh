#! /bin/bash

pulp build && \
    psc-bundle output/**/*.js -m Main --main Main > index.js.tmp && \
    browserify index.js.tmp > index.js && \
    rm index.js.tmp
