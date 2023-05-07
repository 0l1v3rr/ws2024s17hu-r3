# Dockerfile for PHP/Laravel development

FROM webdevops/php-nginx-dev:8.2
WORKDIR /app
RUN useradd -rm -d /app -s /bin/bash -g root -G sudo -u 1001 competitor 
RUN echo 'competitor:asdQWE123' | chpasswd