#!/bin/sh

# npm i
# npm i babel-preset-es2015 babel-preset-react
# npm i -g nodemon babel-cli

read -p "Please enter your Github email: " answer
git config --global user.email $answer
git config --global push.default simple

echo "Development environment deployed!"
