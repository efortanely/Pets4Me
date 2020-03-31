#!/bin/bash

if [ -z $(command -v deactivate) ]
then
    source env/bin/activate
    $*
    deactivate
else
    $*
fi
