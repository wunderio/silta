---
id: key-components
title: Key components
--- 
## Github

All of our code is stored in Github within our organisation. All project-specific infrastructure
configuration is versioned in Git. We provide a default templates for
[Drupal projects](https://github.com/wunderio/drupal-project), [Customized services](https://github.com/wunderio/frontend-project) (Originally frontend project) and [Static pages](https://github.com/wunderio/simple-project), but any Docker-compatible application
is supported.

## CircleCI
CircleCI is a cloud-based CI solution that integrates with Github.
One of the great features is the possibility to use your own builder images,
we use our own called [circleci-builder](https://github.com/wunderio/circleci-builder).

We use CircleCi to check the repository for errors, build the codebase, build custom docker
images, push them to the registry and deploy a release of our Helm chart. The build process is based
on a config file located under `.circleci/config.yml` in the git repository.

To perform its duties, CircleCI needs certain credentials, for example to push to the docker image
registry or to interact with the Kubernetes master. These credentials are stored in a
[CircleCI Contexts](https://circleci.com/docs/2.0/contexts/) and are available to any repository
in our Github organisation.

## Kubernetes
[Kubernetes](https://kubernetes.io/) is an open source container orchestration platform supported by all major cloud hosting providers.

## Helm
[Helm](https://helm.sh/) is a package manager for Kubernetes. We published our own chart repository: https://github.com/wunderio/charts. The chart is referenced from the CircleCI configuration, and each repository can also override the default values to adapt the configuration.
