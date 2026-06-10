#!/bin/bash
set -e

echo "Starte Deployment..."

cd /var/www/nextjs/houseghost.de

if [ ! -d ".git" ]; then
    echo "Klone Repository von GitHub..."
    cd /var/www/nextjs
    rm -rf houseghost.de
    git clone https://github.com/robinheinrich/houseghost.de.git houseghost.de
    cd houseghost.de
else
    echo "Aktualisiere Repository von GitHub..."
    git fetch origin
    git reset --hard origin/main
fi

echo "Installiere Dependencies..."
npm install

echo "Baue Projekt..."
npm run build

echo "Starte App neu..."
pm2 restart nextjs

echo "Deployment erfolgreich!"