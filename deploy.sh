#!/usr/bin/env bash

# WARN: This script is not intended for everyone to use!

npm run deploy

git checkout gh-pages

cd external/Braavos_Blog || exit

hugo

mv public blog

mv blog ../../

cd ../../ || exit

git add blog

git commit -s -m "blog: Static files."

git push

git checkout main
