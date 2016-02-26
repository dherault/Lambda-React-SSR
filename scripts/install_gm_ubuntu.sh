#!/bin/sh

while true; do
    read -p "Do you wish to install GraphickMagick ?" yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

sudo apt-get install -y zlib1g-dev
sudo apt-get install -y libpng-dev
sudo apt-get install -y libjpeg-dev
sudo apt-get install -y graphicsmagick

gm convert -list formats

echo "Installation complete."
