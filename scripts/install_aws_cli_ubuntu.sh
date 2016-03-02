#!/bin/sh

while true; do
    read -p "Do you wish to install and configure the AWS CLI ?" yn
    case $yn in
        [Yy]* ) break;;
        [Nn]* ) exit;;
        * ) echo "Please answer yes or no.";;
    esac
done

sudo apt-get install -y python-pip
sudo pip install awscli
aws configure
