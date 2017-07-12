#! /bin/bash

pulp build && psc-bundle output/**/*.js --main Main -m Main > index.js
