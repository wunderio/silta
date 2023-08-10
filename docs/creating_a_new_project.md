---
id: creating-new-project
title: Creating a new project
---
## Drupal project guidelines

- Make a copy of Wunder's [drupal-project](https://github.com/wunderio/drupal-project), and push it as a new repository within the wunderio Github organisation.
- Setup your project:
    - Run your project locally with [lando](https://docs.devwithlando.io): `lando start` (follow local environment setup instructions at https://github.com/wunderio/drupal-project#setup)  
    - Install composer dependencies with `lando composer install` and commit composer.lock and generated files in the `web` folder. If Drupal adds additional database credentials in settings.php, these should not be committed and can be discarded.
    - Install javascript dependencies with `npm install` and commit the package-lock.json file.
    - Install Drupal with `lando drush site-install` and export the default configuration with `lando drush config-export`.
- Log in to CircleCI with your Github credentials, select "wunderio" and [enable your project](https://circleci.com/add-projects/gh/wunderio).
- Watch your project build, the CircleCI output has a link to your deployed environment.

## Frontend project guidelines

- Make a copy of Wunder's [frontend-project](https://github.com/wunderio/frontend-project), and push it as a new repository within the wunderio Github organisation.
- Log in to CircleCI with your Github credentials and [enable your project](https://circleci.com/docs/getting-started/).
- Watch your project build, the CircleCI output has a link to your deployed environment.
