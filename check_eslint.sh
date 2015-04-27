#!/bin/bash
find ./ -name "*.js" | grep -v bower_components | grep -v node_modules | xargs eslint

