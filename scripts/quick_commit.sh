#!/bin/sh

[ -z "$1" ] && echo "No argument supplied" && exit 1

git add . -A
git commit -m "$*"
git push
