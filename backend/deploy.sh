#!/bin/bash

ENV_VARS=("PF_API_SECRET" "SQLALCHEMY_DATABASE_URI")

cp app.yaml app.yaml.bak

for ENV_VAR in ${ENV_VARS[@]}
do
    if [ -z "${!ENV_VAR}" ]
    then
        echo "Error: Missing required environment variable ${ENV_VAR}. Use export ${ENV_VAR}=...value from slack channel..." 1>&2
        rm app.yaml
        mv app.yaml.bak app.yaml
        exit 1
    fi
    echo "  ${ENV_VAR}: ${!ENV_VAR}" >> app.yaml
done

gcloud app deploy
rm app.yaml
mv app.yaml.bak app.yaml
