# ------------------------------
# 1. Build Frontend (Vite)
# ------------------------------
FROM node:18 AS frontend

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY resources resources
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY public public

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm run build


# ------------------------------
# 2. Build Laravel Backend
# ------------------------------
FROM php:8.2-cli AS backend

RUN apt-get update && apt-get install -y \
    libpng-dev libonig-dev libxml2-dev libsqlite3-dev pkg-config zip unzip curl git \
 && docker-php-ext-configure pdo_sqlite \
 && docker-php-ext-install pdo pdo_mysql pdo_sqlite mbstring exif pcntl bcmath gd \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

WORKDIR /var/www

COPY . .

RUN mkdir -p database && touch database/database.sqlite && chown -R www-data:www-data database

COPY --from=frontend /app/public ./public

RUN composer install --no-dev --no-interaction --prefer-dist --optimize-autoloader

# Ensure cache directories exist
RUN mkdir -p bootstrap/cache storage/framework/{views,cache,sessions} storage/logs \
 && chmod -R 775 storage bootstrap/cache database \
 && chown -R www-data:www-data storage bootstrap/cache database

EXPOSE 10000

CMD mkdir -p bootstrap/cache storage/framework/{views,cache,sessions} storage/logs && \
    chmod -R 775 storage bootstrap/cache database && \
    chown -R www-data:www-data storage bootstrap/cache database && \
    php artisan config:clear && \
    php artisan cache:clear && \
    php artisan view:clear && \
    php artisan optimize && \
    php artisan migrate --force && \
    php artisan receipts:migrate-to-base64 && \
    php artisan serve --host=0.0.0.0 --port=10000
