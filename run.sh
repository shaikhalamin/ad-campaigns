#!/bin/bash

echo "Stoping all container ..."
docker-compose down
echo "Env copying ..."
cp backend-api/.env.example backend-api/.env
echo "New docker-compose build started ..."
docker-compose up --build -d
echo "Composer dump-autoloading ...."
docker exec -it backend-container composer dump-autoload -o --no-scripts
echo "Installing php api dependecny ..."
docker exec -it backend-container composer install
echo "Applying api folder permission ..."
docker exec -it backend-container chown -R www-data:www-data storage bootstrap public
echo "Generating new api key ..."
docker exec -it backend-container php artisan key:generate
echo "Config clearing ..."
docker exec -it backend-container php artisan config:clear
echo "Cache clearing ..."
docker exec -it backend-container php artisan cache:clear
# echo "Migrating database ..."
# docker exec -it backend-container php artisan migrate:fresh
echo "PHP CS sniffing ...."
docker exec -it backend-container composer sniff
echo "PHP CS linting ..."
docker exec -it backend-container composer lint
