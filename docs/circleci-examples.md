---
id: circleci-conf-examples
title: CircleCI configuration examples
---

Our custom CircleCI Orb is located here: https://github.com/wunderio/silta-circleci/tree/master/orb

Below is a list of examples for common needs.
All examples are meant to be used in the `.circleci/.yml` file of your project.

## Run `npm install` from another location

We recommend putting your package.json in the Drupal root folder (one level above the web root),
but many existing projects still have package.json in the theme folder.
You can specify the path to your frontend folder by adding a parameter to the
existing `npm-install-build` command:

```yaml
- npm-install-build:
    path: web/themes/custom/mytheme
```

Note that this path is relative to the Drupal root, not to the project root.

## Run a different command to build the frontend

The default command for building the frontend is `npm run build`, assuming there will be a `build` key
in the `script` section of your package.json, which is recommended.

If you have another command that should be run you can specify it in the `npm-install-build` step:

```yaml
- npm-install-build:
    build-command: "compass compile --production"
```

## Use npm instead of yarn

Using `npm` is preferred over the user of `yarn`, and if it's not too much hassle it would be best to switch
for the sake of consistency.
In the meantime you can use the `yarn-install-build` step which works the same as `npm-install-build`

## Deploy sub-project from within the same repo

Having e.g. Storybook or other frontend application included in the base project codebase that require 
separate deployment can be easily done even using different chart.
For simple application (static) the simple chart can be used. Refer to simple examples with the following additions:

Tell build process (`under silta/simple-build-deploy`) where your application code can be found (related to repo root).

```yaml
codebase-build:
  - silta/npm-install-build:
      path: web/themes/custom/yourtheme/storybook
```

Under the same workflow docker also needs to be told the build context:

```yaml
image_build_steps:
  - silta/build-docker-image:
      dockerfile: 'silta/node.Dockerfile'
      path: './web/themes/custom/yourtheme/storybook'
      identifier: 'node'
```

Finally, give the deployment a release-suffix:

```yaml
release-suffix: storybook
```

The complete deployment workflow for the app should look something like this:

```yaml
- silta/simple-build-deploy: &build-deploy
    name: Storybook build & deploy
    context: silta_dev
    silta_config: silta/silta.yml,silta/silta-storybook.yml
    release-suffix: storybook
    codebase-build:
      - silta/npm-install-build:
          path: web/themes/custom/yourtheme/storybook
    image_build_steps:
      - silta/build-docker-image:
          dockerfile: 'silta/node.Dockerfile'
          path: './web/themes/custom/yourtheme/storybook'
          identifier: 'nginx'
    filters:
      branches:
        ignore: production

- silta/simple-build-deploy:
    # Extend the build-deploy configuration for the production environment.
    <<: *build-deploy
    name: Storybook build & deploy production
    context: silta_finland
    silta_config: silta/silta.yml,silta/silta-storybook.yml,silta/silta-storybook-prod.yml
    filters:
      branches:
        only: production
```

Note: you need to include the application specific silta_configs (here silta-storybook.yml and silta-storybook-prod.yml). 
You should also update the drupal specific deployment steps to include the appropriate silta-cms.yml files.

See [https://wunderio.github.io/silta/docs/silta-examples](silta-examples.md) for example on how to split the silta configuration part for this kind of setup.
There is also a more complex example in [https://github.com/wunderio/decoupled-project](decoupled-project -template)

