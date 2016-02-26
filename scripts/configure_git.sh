#!/bin/sh

read -p "Please enter your Github email: " email
read -p "Please enter your Github username: " username
git config --global user.email $email
git config --global user.name $username
git config --global push.default simple

echo "Git configured."
