#!/bin/bash

echo "This script will convert your Drupal project to be compatible with Silta."
echo "Make sure you are in the git root of your project."

echo "Checking dependencies"
git --version
composer --version


echo "Adding standard CircleCI configuration"
mkdir -p .circleci
curl -s https://raw.githubusercontent.com/wunderio/drupal-project/master/.circleci/config.yml > .circleci/config.yml

# Try to detect the default path
composer_path=`find . -name composer.json -not -path "*vendor*" -not -path "*modules*" -not -path "*core*" -not -path "*test*"`
drupal_root_guess=`dirname $composer_path`

while ! [[ $drupal_root ]] || ! [ -d $drupal_root ]
do
  read -er -p "Where is the drupal root? ($drupal_root_guess): " drupal_root

  if ! [[ $drupal_root ]]
  then
    drupal_root=$drupal_root_guess
  fi

  if ! [ -d $drupal_root ]
  then
    echo "The folder $drupal_root could not be found."
  fi
done

cd $drupal_root

echo "Adding Dockerfiles"
mkdir -p silta
curl -s https://raw.githubusercontent.com/wunderio/drupal-project/master/silta/nginx.Dockerfile > silta/nginx.Dockerfile
curl -s https://raw.githubusercontent.com/wunderio/drupal-project/master/silta/php.Dockerfile > silta/php.Dockerfile
curl -s https://raw.githubusercontent.com/wunderio/drupal-project/master/silta/shell.Dockerfile > silta/shell.Dockerfile

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
  echo "Adding up gdpr-dump to sanitize database dumps."
  composer require machbarmacher/gdpr-dump
  curl -s https://raw.githubusercontent.com/wunderio/drupal-project/master/web/gdpr.json > gdpr.json

  echo "Updating drush to version 9"
  composer require drush/drush:^9.0.0
else
  echo "You don't seem to be using composer, this is currently not supported out of the box."
fi

# TODO: update settings.php
# TODO: check drupal config folder location
# TODO: detect location of frontend with package.json

#read -e -p "Do you want to delete ansible configuration?"
