
# Docker images

Here is a list of all the docker images used in the context of the Silta project.
Each of these images has a dedicated repository on Github and is built and published
automatically on DockerHub.

## Base images
These images are referenced in the project-specific files. 

### Drupal PHP-FPM
https://github.com/wunderio/drupal-php-fpm

This image provides a container running php-fpm with a configuration 
optimised for Drupal projects. The image doesn't contain any PHP code, 
this will be added by the project-specific Dockerfiles that extend this
image.

### Drupal Nginx
https://github.com/wunderio/drupal-nginx

This nginx image serves as a base for the project-specific nginx Dockerfile,
and is configured to serve static content and proxy requests to PHP-FPM.

## Drupal Shell
https://github.com/wunderio/drupal-shell

This image extends the Drupal PHP-FPM image and adds an ssh server configured
to allow access based on Github repository access. 

## Cluster tools

### sshd Gitauth
https://github.com/wunderio/sshd-gitauth

This image provides an SSH jumphost, a single point to log into the individual 
Drupal shell containers.

### Silta-Splash
https://github.com/wunderio/silta-splash

A minimal image with general web assets served by nginx, used to serve simple 
responses such as a protective default robots.txt and a default "project not found"
page for Silta.

### Silta-deployment-remover
https://github.com/wunderio/silta-deployment-remover

This image provides a web server that can be configured to respond to certain requests 
from Github webhooks, so that silta environments are deleted automatically when the
related branch is removed.
 

## Tools
### Silta-CircleCI
https://github.com/wunderio/silta-circleci

An extension of the default PHP+Node.js CircleCI image, with added support for commonly
used Drupal tools (drush, phpcs), as well as the Helm, Kubernetes and Google Cloud
tools required to interact with our cluster.

### test images
https://github.com/wunderio/silta-test-codebase

This set of images are used when running automated test in place of the built
images from specific projects.

