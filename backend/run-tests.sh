#!/bin/bash

PYTHON=python3
if [ -z $(command -v $PYTHON) ]
then
    PYTHON=python
fi

source env/bin/activate
$PYTHON external_apis.test.py
deactivate
