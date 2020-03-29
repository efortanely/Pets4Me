#!/bin/bash

PYTHON=python3
if [ -z $(command -v $PYTHON) ]
then
    PYTHON=python
fi

source env/bin/activate
$PYTHON -m extensions.external_apis_test
deactivate
