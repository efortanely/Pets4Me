#!/bin/bash
if [ -z "$API_KEY" ]
then
    while getopts ":k:" option
    do
        case "${option}" in
            k ) API_KEY=$OPTARG
                ;;
            \?) echo "Invalid option: $OPTARG" 1>&2
                exit 1
                ;;
        esac
    done
    shift $((OPTIND -1))
    if [ -z "$API_KEY" ]
    then
        echo "-k arg required, or set API_KEY environment variable" 1>&2
        exit 1
    fi
fi
cp app.yaml app.yaml.bak
echo "  API_KEY: ${API_KEY}" >> app.yaml
gcloud app deploy
rm app.yaml
mv app.yaml.bak app.yaml
