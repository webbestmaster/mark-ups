#!/usr/bin/env bash

pathToResult="./res/dist.zip"

echo "Zip dir"
zip -r -9 -q $pathToResult ./dist/

echo "Add zip file to git"
git add $pathToResult

echo "See into ${pathToResult}"