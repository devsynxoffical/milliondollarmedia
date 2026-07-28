#!/bin/bash
set -euo pipefail

PORT="${PORT:-8080}"

# php-apache image must use exactly one MPM module.
a2dismod mpm_event mpm_worker 2>/dev/null || true
a2enmod mpm_prefork rewrite headers 2>/dev/null || true

# Railway injects PORT dynamically at runtime.
sed -i "s/^Listen 80$/Listen ${PORT}/" /etc/apache2/ports.conf
if ! grep -q "^Listen ${PORT}" /etc/apache2/ports.conf; then
  echo "Listen ${PORT}" >> /etc/apache2/ports.conf
fi

sed -i "s/<VirtualHost \*:80>/<VirtualHost *:${PORT}>/" /etc/apache2/sites-available/000-default.conf

exec apache2-foreground
