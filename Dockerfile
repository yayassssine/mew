# ============================================
# Forever Valentine — Production Dockerfile
# PHP 8.3 + Apache + Symfony
# ============================================

FROM php:8.3-apache

# ---- Install system dependencies ----
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libicu-dev \
    libpq-dev \
    libzip-dev \
    zip \
    && docker-php-ext-install \
    intl \
    pdo \
    pdo_mysql \
    pdo_pgsql \
    zip \
    opcache \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# ---- Enable Apache mod_rewrite ----
RUN a2enmod rewrite

# ---- Configure Apache to serve from /public ----
ENV APACHE_DOCUMENT_ROOT=/var/www/html/public

RUN sed -ri -e 's!/var/www/html!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/sites-available/*.conf \
    && sed -ri -e 's!/var/www/!${APACHE_DOCUMENT_ROOT}!g' /etc/apache2/apache2.conf /etc/apache2/conf-available/*.conf

# Allow .htaccess overrides everywhere
RUN sed -i 's/AllowOverride None/AllowOverride All/g' /etc/apache2/apache2.conf

# Add FallbackResource so all routes go to index.php (backup for .htaccess)
RUN echo '<Directory /var/www/html/public>\n\
    AllowOverride All\n\
    FallbackResource /index.php\n\
</Directory>' >> /etc/apache2/apache2.conf

# ---- PHP production configuration ----
RUN mv "$PHP_INI_DIR/php.ini-production" "$PHP_INI_DIR/php.ini"

# OPcache settings for production
RUN echo "opcache.enable=1\n\
opcache.memory_consumption=256\n\
opcache.max_accelerated_files=20000\n\
opcache.validate_timestamps=0\n\
opcache.preload_user=www-data\n" > /usr/local/etc/php/conf.d/opcache-prod.ini

# ---- Install Composer ----
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ---- Set working directory ----
WORKDIR /var/www/html

# ---- Copy composer files first (for Docker cache) ----
COPY composer.json composer.lock ./

# ---- Set production environment BEFORE anything else ----
ENV APP_ENV=prod
ENV APP_DEBUG=0
ENV COMPOSER_ALLOW_SUPERUSER=1

# ---- Install dependencies (no dev) ----
RUN composer install --no-dev --optimize-autoloader --no-scripts --no-interaction

# ---- Copy the rest of the project ----
COPY . .

# ---- Override .env to force production ----
RUN echo "APP_ENV=prod" > .env.local

# ---- Run Symfony post-install scripts ----
RUN composer run-script post-install-cmd --no-interaction || true

# ---- Set permissions ----
RUN chown -R www-data:www-data var/ public/ \
    && chmod -R 775 var/

# ---- Copy entrypoint script ----
COPY docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# ---- Expose port (Render uses $PORT) ----
EXPOSE 80

# ---- Start ----
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["apache2-foreground"]
