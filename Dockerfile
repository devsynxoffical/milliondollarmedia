FROM wordpress:php8.2-apache

# Keep only prefork MPM for mod_php.
RUN set -eux; \
    a2dismod mpm_event mpm_worker 2>/dev/null || true; \
    a2enmod mpm_prefork rewrite headers deflate expires

COPY docker/php-opcache.ini /usr/local/etc/php/conf.d/99-opcache.ini
COPY docker/apache-performance.conf /etc/apache2/conf-available/performance.conf
RUN a2enconf performance

COPY docker/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

COPY . /var/www/html/
RUN mkdir -p /var/www/html/wp-content/cache/page-cache && \
    chown -R www-data:www-data /var/www/html

CMD ["/usr/local/bin/start.sh"]
