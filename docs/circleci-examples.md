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
