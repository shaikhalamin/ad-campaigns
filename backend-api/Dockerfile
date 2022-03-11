FROM php:8.0-fpm

WORKDIR /var/www/html

RUN apt-get update && apt-get install -y zlib1g-dev libicu-dev libzip-dev zip unzip
RUN docker-php-ext-install zip
RUN docker-php-ext-install intl opcache pdo pdo_mysql

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY composer.json ./
COPY composer.lock ./

COPY . .

EXPOSE 8000
EXPOSE 9000