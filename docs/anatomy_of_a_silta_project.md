---
id: anatomy-of-silta
title: Silta project build process
---

A silta project requires two main configuration files, which give you the possibility to customize the behavior according to your requirements:

- A [CircleCI configuration file](#CircleCI-configuration). This defines how the application is built and tested.
- A [Silta configuration file](#Silta-configuration). This defines how the environment running your application is provisioned.

## CircleCI configuration

This file is located in the project root at `.circleci/config.yml` and uses the official [CircleCI](https://circleci.com/docs/2.0/configuration-reference/) structure. Here is the default content:

```yaml
version: 2.1

orbs:
  silta: silta/silta@0.1

workflows:
  version: 2
  commit:
    jobs:
      - silta/drupal-validate:
          name: validate
          post-validation:
            - run: echo "You can add additional validation here!"

      - silta/drupal-build-deploy: &build-deploy
          name: build-deploy
          codebase-build:
            - silta/drupal-composer-install
            - silta/npm-install-build
          context: global_nonprod
          filters:
            branches:
              ignore: production

      - silta/drupal-build-deploy:
          # Extend the build-deploy configuration for the production environment.
          <<: *build-deploy
          name: build-deploy-prod
          silta_config: silta/silta.yml,silta/silta-prod.yml
          context: global_nonprod
          filters:
            branches:
              only: production

```

There are quite a few things going on, let's go through them one by one.

```yaml
version: 2.1
```
We use version 2.1 of the CircleCI API. If your project configured to use an older version, CircleCI will complain.

```yaml
orbs:
  silta: silta/silta@0.1
```
CircleCI has a packaging system called [orbs](https://circleci.com/docs/2.0/orb-intro/#section=configuration). 
We have published our own orb called `silta/silta`, which enables you to use predefined jobs and commands.

```yaml
workflows:
  version: 2
  commit:
    jobs:
```
This is just the standard CircleCI declaration of what jobs are executed, and in what order.

```yaml
- silta/drupal-validate:
  name: validate
  post-validation:
    - run: echo "You can add additional validation here!"
```
The validation job checks your codebase for things that can be done without a running environment, like `phpcs`.
You can adjust the phpcs configuration by editing phpcs.xml in your repository. 
You can also add additional validation, like `eslint` by adding custom steps in the 
`post-validation` section.

```yaml
- silta/drupal-build-deploy: &build-deploy
  name: build-deploy
  codebase-build:
    - silta/drupal-composer-install
    - silta/npm-install-build
  context: global_nonprod
  filters:
    branches:
      ignore: production
```
This is the main build and deployment job (we run them together to keep things simple and fast). 
The `&build-deploy` is a yaml reference so we can reuse this content later on.

`drupal-build-deploy` job is used for drupal chart deployments, there are more predefined jobs (i.e. `silta/frontend-build-deploy`, `silta/simple-build-deploy`)for other deployment tasks. 

The `codebase-build` parameter lets you specify how your project is built: by default we use two custom steps to 
get php dependencies with composer and frontend dependencies with npm. 

The `context` parameter gives your project access to certain environment variables. 
In our case, these contain the credentials to connect to a specific kubernetes cluster.  

The `filters` section indicates that this job should not be run for the `production` branch.
This branch has a dedicated job configuration as we will see below.

```yaml
- silta/drupal-build-deploy:
  # Extend the build-deploy configuration for the production environment.
  <<: *build-deploy
  name: build-deploy-prod
  silta_config: silta/silta.yml,silta/silta-prod.yml
  context: global_nonprod
  filters:
    branches:
      only: production
```
This job reuses the previous job, it runs only for the production branch with the following differences:

- It has a different name.
- It uses one additional silta configuration configuration file which contains production-specific configuration.
- It can potentially deploy to a different cluster using different credentials.

## Silta-configuration

The Silta configuration file is located in the Drupal root at `silta/silta.yml`, it is an instance of a Helm values file.
It overrides the default values of our Helm chart (https://github.com/wunderio/charts/blob/master/drupal/values.yaml) 
and uses the same structure.

Here is a list of [sample configuration changes](silta-examples.md) for common requirements.

## Additional files

There are a few additional files that often won't need to be modified but which play an important role.

### Dockerfiles
The `silta` folder contains three Dockerfiles for nginx, php and the shell container. 
All of them are built simply by copying the codebase into the base docker image.

It would be possible to make modifications to the containers by modifying these Dockerfiles, or even to use different base images. 
However, while this is very powerful it is quite likely that there is a better way to fulfill your needs using configuration. 

### .dockerignore
There are two `.dockerignore` files, one in the Drupal root (for the php and shell containers), and one in the web root (for nginx). 
These specify which files should be ignored when creating project-specific Docker images, improving build time, image size and security. 

### Silta production configuration
This file is located in `silta/silta.prod.yml` and provides an additional level of override specifically for the production envrionment.

### settings.silta.php
This file is actually not part of the repository, but gets mounted into the running container (replacing any existing file with that name).
It loads the database credential and additional Silta-specific configuration. You don't need to modify it (you can't), but you need to make sure
that it gets included from your settings.php.

### Lando configuration file
This file is not actually needed to deploy a project to Silta, but it configures the project for
usage in local developemnt environments with Lando. Silta doesn't specify how you should run your code locally, but Lando and Silta have compatible of working.

There is no plan to consolidate Silta and Lando, as they have very different requirements (for example Lando mounts the codebase as a volume, whereas Silta copies it into dedicated Docker images). 

### phpcs.xml
This file is also not required for Silta, but we use phpcs for validation by default.
