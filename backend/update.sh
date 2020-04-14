#!/bin/bash

PIP=pip3
if [ -z $(command -v $PIP) ]
then
    PIP=pip
fi
PYTHON=python3
if [ -z $(command -v $PYTHON) ]
then
    PYTHON=python
fi

if [ ! -d "env" ]
then
    $PYTHON -m venv env
fi
source env/bin/activate
$PIP install wheel
$PIP install black
$PIP install -r requirements.txt
