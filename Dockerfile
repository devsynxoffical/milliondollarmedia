FROM wordpress:php8.2-apache

# Keep only prefork MPM for mod_php.
RUN set -eux; \
    a2dismod mpm_event mpm_worker 2>/dev/null || true; \
    a2enmod mpm_prefork rewrite headers

COPY docker/start.sh /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh

COPY . /var/www/html/
RUN chown -R www-data:www-data /var/www/html

CMD ["/usr/local/bin/start.sh"]
