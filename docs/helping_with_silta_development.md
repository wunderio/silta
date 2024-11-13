---
id: help-with-silta-dev
title: Helping with Silta development
---

## Development workflow

Each chart (drupal, frontend, simple) has respective project that uses the chart as subfolder under `/charts`. So adjustments to chart can be made on each commit. Check [.cirlceci/config.yml](https://github.com/wunderio/drupal-project-k8s/blob/master/.circleci/config.yml#L29) in Drupal chart to see how it's defined. So you make a PR for a specific chart (either [drupal-project-k8s](https://github.com/wunderio/drupal-project-k8s) or [frontend-project-k8s](https://github.com/wunderio/frontend-project-k8s) or [simple-project-k8s](https://github.com/wunderio/simple-project-k8s))

### Testing

Before making a pull request you should install the unittest helm plugin:

```bash
helm plugin install https://github.com/quintush/helm-unittest
```

and run in on your updated chart:

```bash
helm unittest ./charts/drupal --helm3
```

To test charts locally You will need related helm repositories to be installed locally (see charts/chartname/Chart.yaml) and subcharts downloaded.

1. Adding helm repository:       
```bash
helm repo add wunderio https://storage.googleapis.com/charts.wdr.io
```

2. Download / rebuild the charts/ directory based on the Chart.lock file

```bash
helm dependency build charts/drupal
```

3. Dry-run chart and check kubernetes resource definitions for expected output
```bash
helm upgrade --install test charts/drupal --dry-run --debug --values silta/silta.yml
```

## Contribution

1. Someone from silta dev team will review changes and review the PR. Once accepted by one of them, it can be merged to master.
1. Once changes are merged to project there are 2 options:
   1. Silta developers diff wunderio/charts/drupal to wunderio/drupal-project-k8s/charts/drupal before next release by copying over multiple changes in bulk and increment chart version in both repos, making them in sync again.
   1. You can make a copy of that accepted PR to wunderio/charts repo where it will be accepted again.

If you want to test a feature PR:

1. Create a new branch from feature/myAwesomeThing -> feature/myAwesomeThing-test.
1. Enable the myAwesomeThing related functionality or apply new configuration related to the feature.
1. Commit the changes to the test branch and push to origin.
1. Check that functionality works as it should.
1. Write tests when possible and push them to the original feature branch or request the original author to add them.
1. Delete the test branch if everything works.

## Some tips and external documentation when working with HELM charts

[Helm template guide - control structures](https://helm.sh/docs/chart_template_guide/control_structures/)  
[Goland Sprig functions](http://masterminds.github.io/sprig/defaults.html)
