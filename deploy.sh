#!/bin/bash
cd /var/www/nextjs
git pull https://github.com/robinheinrich/houseghost.de
npm install
npm run build
pm2 restart 
echo "Deployment abgeschlossen!"
