#!/bin/bash
fuser -k 3000/tcp

service redis_6379 start
cd ./oj-client
npm install
ng build --watch &
cd ../oj-server
npm install
node server.js


echo "=========================="
read -p "PRESS [ENTER] TO TERMINATE PROCESSES." PRESSKEY

fuser -k 3000/tcp
service redis_6379 stop
