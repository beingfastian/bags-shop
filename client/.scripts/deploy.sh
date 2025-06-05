#!/bin/bash
set -e

echo "Deployment started..."

echo "RESET"
git reset --hard HEAD

# Pull the latest version of the app
git pull origin master
echo "New changes copied to server !"

echo "check NPM"
npm --v

echo "Installing Dependencies..."
npm install --force

echo "Creating Production Build..."
npm run build

echo "PM2 Reload"
pm2 reload bags-shop

echo "Deployment Finished!"