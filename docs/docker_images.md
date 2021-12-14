---
id: docker-images
title: Docker images
---

## Base images

Base images for silta deployments available at https://eu.gcr.io/silta-images. Image source available at https://github.com/wunderio/silta-images

## Cluster tools

### sshd Gitauth
https://github.com/wunderio/sshd-gitauth

This image provides an SSH jumphost, a single point to log into the
Drupal shell containers.

### Silta-Splash
https://github.com/wunderio/silta-splash

A minimal image with general web assets served by nginx, used to serve simple responses such as default "project not found" page for Silta.

### Silta-deployment-remover
https://github.com/wunderio/silta-deployment-remover

This image provides a web server that can be configured to respond to certain requests from Github webhooks, so that silta environments are deleted automatically when the related branch is removed.

## Tools

### test images
https://github.com/wunderio/silta-test-codebase

This set of images are used when running automated test in place of the built
images from specific projects.
