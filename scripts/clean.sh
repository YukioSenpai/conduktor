  #!/bin/bash

set -e

# Clean tsc build
echo "Cleaning tsc artifacts"
yarn run -s tsc -b --clean >/dev/null 2>&1 || true

ROOT_DIR=$PWD

for p in coding-challenge;
do
cd "$ROOT_DIR/$p"
echo "Cleaning $p ..."
yarn clean >/dev/null 2>&1 || true
done

cd $ROOT_DIR
# Remove all node_modules
echo "Cleaning all node_modules and dist folders"
rm -rf coding-challenge/dist coding-challenge/.tsc coding-challenge/.tsbuildinfo
rm -rf node_modules coding-challenge/node_modules