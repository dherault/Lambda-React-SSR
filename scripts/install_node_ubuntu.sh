#!/bin/sh

while true; do
    read -p "Do you wish to install Node v4 ?" yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash -
sudo apt-get install -y build-essential nodejs

