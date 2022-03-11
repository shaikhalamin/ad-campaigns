#!/bin/bash

echo "Stoping all container ..."
docker-compose down
echo "Env copying ..."
cp backend-api/.env.example backend-api/.env
echo "New docker-compose build started ..."
docker-compose up --build -d
echo "Composer dump-autoloading ...."
docker exec -it backend-container composer dump-autoload -o
echo "Installing php api dependecny ..."
docker exec -it backend-container composer install
echo "Applying api folder permission ..."
docker exec -it backend-container chown -R www-data:www-data storage bootstrap public
echo "Generating new api key ..."
docker exec -it backend-container php artisan key:generate
echo "Config clearing ..."
docker exec -it backend-container php artisan config:clear

echo "PHP CS sniffing ...."
# docker exec -it backend-container composer sniff
# echo "PHP CS linting ..."
# docker exec -it backend-container composer lint

# echo "Testing api call ..."
# curl -d "number_one=9&number_two=14&operator=addition" -X POST http://localhost:9047/api/v1/compute -H "Accept: application/json"

# echo "Running unit test ...."
# docker exec -it backend-container ./vendor/bin/phpunit tests/Unit
# echo "Running feature test ...."
# docker exec -it backend-container ./vendor/bin/phpunit tests/Feature/EmojiCalculatorTest.php