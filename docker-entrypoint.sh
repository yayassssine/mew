#!/bin/bash
set -e

echo "🌹 Forever Valentine — Starting..."

# ---- Use Render's PORT if provided (defaults to 80) ----
if [ -n "$PORT" ]; then
    echo "📌 Configuring Apache to listen on port $PORT"
    sed -i "s/Listen 80/Listen $PORT/" /etc/apache2/ports.conf
    sed -i "s/:80/:$PORT/" /etc/apache2/sites-available/000-default.conf
fi

# ---- Set permissions ----
chown -R www-data:www-data /var/www/html/var 2>/dev/null || true
chmod -R 775 /var/www/html/var 2>/dev/null || true

# ---- Clear and warm up cache ----
echo "🔧 Warming up cache..."
php bin/console cache:clear --env=prod --no-debug 2>/dev/null || true
php bin/console cache:warmup --env=prod --no-debug 2>/dev/null || true

# ---- Run database migrations ----
echo "🗄️ Running database migrations..."
php bin/console doctrine:migrations:migrate --no-interaction --allow-no-migration 2>/dev/null || echo "⚠️ Migration skipped (database may not be ready)"

# ---- Seed memories if table is empty ----
echo "💕 Checking for seed data..."
php bin/console app:seed-memories 2>/dev/null || echo "⚠️ Seed skipped (may already exist)"

echo "✅ Forever Valentine is ready!"

# ---- Start Apache ----
exec "$@"
