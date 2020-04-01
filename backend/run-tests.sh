#!/bin/bash

PYTHON=python3
if [ -z $(command -v $PYTHON) ]
then
    PYTHON=python
fi

source env/bin/activate
output="$($PYTHON -m unittest discover -p "*_test.py" 2>&1)"
echo "$output"
deactivate
failures="$(echo "$output" | grep FAILED)"

if [ -n "$failures" ]; then
  exit 1
fi
