#!/bin/bash

echo "This script will convert your Drupal project to be compatible with Silta."
echo "Make sure you are in the git root of your project."

echo "Checking dependencies"
git --version
composer --version

mkdir -p .circleci

if [ -f drupal/composer.json ] && [ -f drupal/build.sh ]
then
  echo "This looks like a D8 Wundertools project."
  drupal_root="drupal"
  echo "Adding Wunderools CircleCI configuration"
  curl -s https://raw.githubusercontent.com/wunderio/Wundertools/master/.circleci/config.yml > .circleci/config.yml
else
  echo "Adding standard CircleCI configuration"
  curl -s https://raw.githubusercontent.com/wunderio/drupal-project/master/.circleci/config.yml > .circleci/config.yml

  # Try to detect the default path
  composer_path=`find . -name composer.json -not -path "*vendor*" -not -path "*modules*" -not -path "*core*" -not -path "*test*"`
  drupal_root_guess=`dirname $composer_path`

  while ! [[ $drupal_root ]] || ! [ -d $drupal_root ]
  do
    read -er -p "Where is the drupal root? $drupal_root_guess : " drupal_root

    if ! [[ $drupal_root ]]
    then
      drupal_root=$drupal_root_guess
    fi

    if ! [ -d $drupal_root ]
    then
      echo "The folder $drupal_root could not be found."
    fi
  done
fi

cd $drupal_root

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

if [ ! -f phpcs.xml ]; then
  echo "Adding our standard phpcs.xml"
  curl -s https://raw.githubusercontent.com/wunderio/drupal-project/master/phpcs.xml > phpcs.xml
else
  echo "Your existing phpcs configuration was kept."
fi

if [ ! -f .lando.yml ]; then
  echo "Adding our standard .lando.yml"
  curl -s https://raw.githubusercontent.com/wunderio/drupal-project/master/.lando.yml > .lando.yml
else
  echo "Your existing lando configuration was kept."
fi

if [ -f composer.json ]; then
  if grep -q drupal/elasticsearch_helper composer.json; then
    echo "Using Elasticsearch Helper."
    echo '
elasticsearch:
  enabled: true
  version: 5.6.14
' >> silta/silta.yml
  fi
else
  echo "You don't seem to be using composer, this is currently not supported out of the box."
fi

if ! grep -q "settings.lando.php" web/sites/default/settings.php
then
  echo '
/**
 * Lando configuration overrides.
 */
if (getenv("LANDO_INFO") && file_exists($app_root . "/" . $site_path . "/settings.lando.php")) {
  include $app_root . "/" . $site_path . "/settings.lando.php";
}
' >>  web/sites/default/settings.php
fi
curl -s https://raw.githubusercontent.com/wunderio/drupal-project/master/web/sites/default/settings.lando.php > web/sites/default/settings.lando.php

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

if find . -name core.extension.yml -not -path "*web*"
then
  echo "Configuration found"
fi

if [ ! -d config/sync ] && [ -n `find . -name core.extension.yml -not -path "*web/core*"` ] && ! grep -q drupalConfigPath silta/silta.yml
then
  echo "Setting up non-standard Drupal config folder location."
  DRUPAL_CONFIG_PATH=$(dirname `find . -name core.extension.yml -not -path "*web/core*"`)
  echo "php:" >> silta/silta.yml
  echo "  drupalConfigPath: ${DRUPAL_CONFIG_PATH//.\//}" >> silta/silta.yml
fi

if [[ -n `find . -name yarn.lock` ]]
then
  echo "You seem to be using yarn, this is still supported but we recommend switching to npm"
fi

if [ ! -f package.json ] && [[ -n $(find . -name package.json -not -path "*web/core*") ]]
then
  count=$(find . -name package.json -not -path "*web/core*" | wc -l | tr -d "[:space:]")
  if [ "$count" -ne 1 ]
  then
    echo "You have more than one package.json in your project, you will need to build each folder with individually configured circleci steps."
  fi

  PACKAGE_JSON=`find . -name package.json -not -path "*web/core*" | head -n 1`
  NPM_PATH=`dirname $PACKAGE_JSON`
  echo "Setting path to npm package.json.".
  sed -i -e "s/path: \. # Adjust to the location of your package.json/path: ${NPM_PATH//\//\/}/g" .circleci/config.yml
fi

# TODO: check drupal config folder location
# TODO: detect location of frontend with package.json
