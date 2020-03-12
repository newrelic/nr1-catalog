#!/bin/sh

# Exit if any subcommand fails
set -e 

# Setup node modules if needed
if [ -e node_modules/.bin/eslint ]; then
    setup=""
else
    echo "## Your environment is not ready yet. Installing modules..."
    if [ -f yarn.lock ]; then
        setup="yarn --non-interactive --silent --ignore-scripts --production=false &&"
    else
        if [ -f package-lock.json ]; then
            setup="NODE_ENV=development npm ci --ignore-scripts &&"
        else
            setup="NODE_ENV=development npm install --no-package-lock --ignore-scripts &&"
        fi
    fi
fi

if [ -z "$1" ]; then
    submodule_name="."
else
    submodule_name="$1"
fi

# if [ -z "$2" ]; then
#     glob="."
# else 
#     glob="$2"
# fi

echo "## Running eslint-check"

sh -c "cd $submodule_name ; $setup npm run eslint-check"
