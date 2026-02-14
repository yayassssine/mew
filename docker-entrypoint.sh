#!/bin/bash
set -e

echo "Forever Valentine — Starting..."

# ---- Use Render's PORT if provided (defaults to 80) ----
if [ -n "$PORT" ]; then
    echo "Configuring Apache to listen on port $PORT"
    sed -i "s/Listen 80/Listen $PORT/" /etc/apache2/ports.conf
    sed -i "s/:80/:$PORT/" /etc/apache2/sites-available/000-default.conf
fi

# ---- Set permissions ----
chown -R www-data:www-data /var/www/html/var 2>/dev/null || true
chmod -R 775 /var/www/html/var 2>/dev/null || true

# ---- Clear and warm up cache ----
echo "Warming up cache..."
php bin/console cache:clear --env=prod --no-debug 2>&1 || true
php bin/console cache:warmup --env=prod --no-debug 2>&1 || true

# ---- Debug: show DATABASE_URL status ----
if [ -z "$DATABASE_URL" ]; then
    echo "WARNING: DATABASE_URL is NOT set! Database features will not work."
else
    echo "DATABASE_URL is set (starts with: ${DATABASE_URL:0:20}...)"
fi

# ---- Create database schema ----
echo "Setting up database schema..."
php bin/console doctrine:schema:update --force --no-interaction 2>&1 || echo "Schema update failed — check DATABASE_URL"

# ---- Seed memories if table is empty ----
echo "Checking for seed data..."
php bin/console app:seed-memories 2>&1 || echo "Seed failed — check database connection"

echo "Forever Valentine is ready!"

# ---- Start Apache ----
exec "$@"
