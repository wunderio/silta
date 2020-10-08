# Helping with Silta development

First and foremost, help updating this docs directory.

## Development workflow

1. Each chart (drupal, frontend, simple) has respective project that uses the chart as subfolder under `/charts`. So adjustments to chart can be made on each commit. Check [.cirlceci/config.yml](https://github.com/wunderio/drupal-project-k8s/blob/master/.circleci/config.yml#L29) in Drupal chart to see how it's defined. So you make a PR for a specific chart (either [drupal-project-k8s](https://github.com/wunderio/drupal-project-k8s) or [frontend-project-k8s](https://github.com/wunderio/frontend-project-k8s) or [simple-project-k8s](https://github.com/wunderio/simple-project-k8s))
1. Someone from core dev team will review changes and accept or reject the PR. Once accepted by one of them, it can be merged to master.
1. Then there are 2 options:
   1. Time to time one of us diffs wunderio/charts/drupal to wunderio/drupal-project-k8s/charts/drupal and just copies over multiple changes in bulk and increments chart version in both repos, making them in sync again.
   1. You can make a copy of that accepted PR to wunderio/charts repo where it will be accepted again.
