#!/bin/sh

npm i -g nodemon babel-cli npm-check-updates serverless

read -p "Please enter your Github email: " answer
git config --global user.email $answer
git config --global push.default simple

echo "Development environment deployed!"
