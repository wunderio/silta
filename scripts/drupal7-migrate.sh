#!/bin/bash

echo "This script will convert your Drupal project to be compatible with Silta."
echo "Make sure you are in the git root of your project."

echo "Checking dependencies"
git --version
composer --version

mkdir -p .circleci

if [ -f drupal/composer.json ]
then
cat > .circleci/config.yml << EOF
version: 2.1

orbs:
  silta: silta/silta@1

workflows:
  version: 2
  commit:
    jobs:
      - silta/drupal-validate:
          name: validate
          drupal-root: drupal

      - silta/drupal-build-deploy: &build-deploy
          name: build-deploy
          drupal-root: drupal
          codebase-build:
            - run:
                name: Copy settings
                command: |
                  composer install -n --prefer-dist --ignore-platform-reqs --no-dev
                  mkdir -p web/sites/default
                  cp conf/settings.php web/sites/default/settings.php
          context: silta_dev
          filters:
            branches:
              ignore: production

      - silta/drupal-build-deploy:
          # Extend the build-deploy configuration for the production environment.
          <<: *build-deploy
          name: build-deploy-prod
          silta_config: silta/silta.yml,silta/silta-prod.yml
          context: silta_finland
          filters:
            branches:
              only: production
EOF
else
  echo "composer.json missing. Please create .circleci/config.yml yourself"
fi

if [ ! -d "drupal" ]
then
    echo "Could not find drupal/ directory. Please add docker and Silta files manually."
    exit
fi

cd drupal
echo "Adding Dockerfiles"
mkdir -p silta
curl -s https://raw.githubusercontent.com/wunderio/drupal-project/master/silta/nginx.Dockerfile > silta/nginx.Dockerfile
curl -s https://raw.githubusercontent.com/wunderio/drupal-project/master/silta/php.Dockerfile > silta/php.Dockerfile
curl -s https://raw.githubusercontent.com/wunderio/drupal-project/master/silta/shell.Dockerfile > silta/shell.Dockerfile

echo "Adding project-specific silta configuration file"
curl -s https://raw.githubusercontent.com/wunderio/drupal-project/master/silta/silta.yml > silta/silta.yml
curl -s https://raw.githubusercontent.com/wunderio/drupal-project/master/silta/silta-prod.yml > silta/silta-prod.yml

echo "Adding dockerignore files"
curl -s https://raw.githubusercontent.com/wunderio/drupal-project/master/.dockerignore > .dockerignore
curl -s https://raw.githubusercontent.com/wunderio/drupal-project/master/web/.dockerignore > web/.dockerignore

echo "Updating settings.php"
if ! grep -q "settings.silta.php" web/sites/default/settings.php
then
  echo '
/**
 * Silta cluster configuration overrides.
 */
if (getenv("SILTA_CLUSTER") && file_exists($app_root . "/" . $site_path . "/settings.silta.php")) {
  include $app_root . "/" . $site_path . "/settings.silta.php";
}
' >>  web/sites/default/settings.php
fi