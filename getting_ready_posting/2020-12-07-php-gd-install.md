```dockerfile
FROM php:7.4.13-apache

RUN apt-get update &&\ 
  apt-get upgrade -y 
  
RUN docker-php-ext-install mysqli 

# Install gd for generating captcha image
RUN apt-get update -y &&\
  apt-get install -y libpng-dev \
  zlib1g-dev \
  libzip-dev \
  libfreetype6-dev

RUN docker-php-ext-install zip

RUN docker-php-ext-install gd
```