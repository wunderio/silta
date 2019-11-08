# Separate build-time configuration?

## The problem

The project/repo is deployed in one-cluster context.

The project has SSR and needs environment variables set DURING BUILD-TIME,
to generate static files to be served by webserver in the container.

Silta lack tools to provide build-time environment variables.

## The solution

Ideal solution would be to have `--build-arg` during container build.

Workaround consists of providing separate Dockerfiles depending on branch being deployed.

### `.circleci/config.yml`

This is not complete config, only relevant bits:

```
  version: 2
  build_test_deploy:
    jobs:

      - silta/frontend-build-deploy: &prod
          image_build_steps:
            - silta/build-docker-image:
                dockerfile: "silta/prod.Dockerfile"
                path: "."
                identifier: "node"
          silta_config: silta/silta.yml,silta/prod.yml
          filters:
            branches:
              only: master

      - silta/frontend-build-deploy:
          <<: *prod
          name: Silta build & deploy testing environment
          silta_config: silta/silta.yml,silta/test.yml
          image_build_steps:
            - silta/build-docker-image:
                dockerfile: "silta/test.Dockerfile"
                path: "."
                identifier: "node"
          filters:
            branches:
              ignore: master
```

* Need to provide two sections, one for `master` and other for non-`master` brances. This is specified in `filter` section.
* Need to specify separate `Dockerfiles` for each configuration. This is specified in `image_build_steps: -silta/build-docker-image:`. Notice that `path` and `identifier` need to be defined.
* Need to have separate `silta_config`. If many files are provided, that latter one just overrides specific values.
* Be aware of YML Anchors/References/Extend syntax: https://blog.daemonl.com/2016/02/yaml.html

### `silta/prod.yml` and `silta/test.yml`

```
services:
  node:
    env:
      ENVIRONMENT_TYPE: ...
      BACKEND_API_URL: ...
      NODE_ENV: ...
```

* That is the whole content of the file, not a fragment.
* This specifies environment variables for the runtime.

### `silta/prod.Dockerfile` and `silta/test.Dockerfile`

```
ENV ENVIRONMENT_TYPE=...
ENV BACKEND_API_URL=...
ENV NODE_ENV=...
```

* Both files are copies of each other, except environment variables.
* Here is possible to specify build-time variables.

### `silta/node.Dockerfile`

* Not needed anymore.
