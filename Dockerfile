FROM wordpress:php8.2-apache

# Enable rewrite for pretty permalinks.
RUN a2enmod rewrite

# Copy your existing WordPress site files.
COPY . /var/www/html

# Ensure Apache can read/write WordPress content.
RUN chown -R www-data:www-data /var/www/html
