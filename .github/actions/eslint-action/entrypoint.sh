#!/bin/sh

# Exit if any subcommand fails
set -e 

if [ -z "$1" ]; then
    submodule_name="."
else
    submodule_name="$1"
fi

# Setup node modules if needed
if [ -e ./$submodule_name/node_modules/.bin/eslint ]; then
    setup=""
else
    echo "## Your environment is not ready yet. Installing modules..."
    if [ -f ./$submodule_name/yarn.lock ]; then
        setup="yarn --non-interactive --silent --ignore-scripts --production=false &&"
    else
        if [ -f ./$submodule_name/package-lock.json ]; then
            setup="NODE_ENV=development npm ci --ignore-scripts &&"
        else
            setup="NODE_ENV=development npm install --no-package-lock --ignore-scripts &&"
        fi
    fi
fi

# if [ -z "$2" ]; then
#     glob="."
# else 
#     glob="$2"
# fi

echo "## Running eslint-check"
echo "cd $submodule_name ; $setup npm run eslint-check"
sh -c "cd $submodule_name ; $setup npm run eslint-check"
