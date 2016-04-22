#!/usr/bin/env bash
# Provisioning script for the authentication challenge

# removes prompts because it's an automated script
export DEBIAN_FRONTEND=noninteractive

# suppress erroneous error messages from dpkg-preconfigure
rm /etc/apt/apt.conf.d/70debconf

# update the package index 
apt-get update

# install software-properties-common
# (gets us add-apt-repository command)
apt-get install -y software-properties-common

# update the package database, -E passes the environment variables
sudo -E apt-get update

# install git, -y flag provides yes immediately without prompting the user
sudo -E apt-get install -y git

# install Node.js v4.x
curl -sL https://deb.nodesource.com/setup_4.x | sudo -E bash - 
sudo -E apt-get install -y nodejs

# install build-essential for Node modules with native code
sudo -E apt-get install -y build-essential

#allow Node.js servers to bind to low ports.
sudo -E apt-get install -y chase
sudo -E apt-get install -y libcap2-bin
sudo -E setcap cap_net_bind_service=+ep $(chase $(which node))

# install MariaDB 10.1
apt-key adv --recv-keys --keyserver hkp://keyserver.ubuntu.com:80 0xcbcb082a1bb943db
add-apt-repository 'deb [arch=amd64,i386] http://sfo1.mirrors.digitalocean.com/mariadb/repo/10.1/ubuntu trusty main'
apt-get update
apt-get install -y mariadb-server

# install the typings utility for installing
# Visual Studio Code typings files
# gives statement completion and parameter hinting
sudo -E npm install -g typings --loglevel error

# get latest version of redis
sudo add-apt-repository -y ppa:rwky/redis
sudo apt-get update
sudo apt-get install -y redis-server
