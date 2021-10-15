---
id: changing-webroot
title: Changing the webroot
--- 
By default, the webroot is configured to be in `/app/web`. This value can be changed in the Drupal chart, see example below.

*Drupal chart*:
```yaml
webRoot: /app/docroot
```

If you change this, make sure to check for any other references to `/app/web` or `web` in your project.

Some known references are:
- `public-files` mount in this the Drupal chart (values.yaml file)
- `silta/nginx.Dockerfile`
- `composer.json` & `composer.lock`
- `.dockerignore`
- `.gitignore`
- `.lando.yml`
- `grumphp.yml`
- `phpcs.xml`

In `.circleci/config.yml` you also need to add the following parameters and put
your webRoot directory name as the value, for example `web` or `docroot`:
- To `silta/drupal-validate` job, add parameter `web-root`
- To `silta/drupal-deploy-build` job, add parameter `nginx_build_context`
