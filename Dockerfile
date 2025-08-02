# ------------------------------
# 1. Build Frontend (Vite)
# ------------------------------
FROM node:18 AS frontend

WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm ci

# Copy frontend source files
COPY resources resources
COPY vite.config.js ./
COPY tailwind.config.js ./
COPY public public

# Pass API URL and other VITE_* variables to Vite
ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

# Build frontend
RUN npm run build


# ------------------------------
# 2. Build Laravel Backend
# ------------------------------
FROM php:8.2-cli AS backend

# Install system dependencies & PHP extensions
RUN apt-get update && apt-get install -y \
    libpng-dev libonig-dev libxml2-dev libsqlite3-dev pkg-config zip unzip curl git \
 && docker-php-ext-configure pdo_sqlite \
 && docker-php-ext-install pdo pdo_mysql pdo_sqlite mbstring exif pcntl bcmath gd \
 && apt-get clean && rm -rf /var/lib/apt/lists/*

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set workdir
WORKDIR /var/www

# Copy all Laravel backend files
COPY . .

# Create SQLite database (if used)
RUN mkdir -p database && touch database/database.sqlite && chown -R www-data:www-data database

# Copy built frontend files into Laravel public/
COPY --from=frontend /app/public ./public

# Install PHP dependencies
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

# Fix permissions for Laravel storage and cache folders
RUN mkdir -p bootstrap/cache storage/framework/{views,cache,sessions} storage/logs \
 && chmod -R 775 storage bootstrap/cache database \
 && chown -R www-data:www-data storage bootstrap/cache database

# Expose port
EXPOSE 10000

# Run migrations and start server at runtime (not at build time)
CMD php artisan migrate --force && \
    php artisan receipts:migrate-to-base64 && \
    php artisan serve --host=0.0.0.0 --port=10000
