---
id: help-with-silta-dev
title: Helping with Silta development
---

First and foremost, help updating this docs directory.

## Development workflow

1. Each chart (drupal, frontend, simple) has respective project that uses the chart as subfolder under `/charts`. So adjustments to chart can be made on each commit. Check [.cirlceci/config.yml](https://github.com/wunderio/drupal-project-k8s/blob/master/.circleci/config.yml#L29) in Drupal chart to see how it's defined. So you make a PR for a specific chart (either [drupal-project-k8s](https://github.com/wunderio/drupal-project-k8s) or [frontend-project-k8s](https://github.com/wunderio/frontend-project-k8s) or [simple-project-k8s](https://github.com/wunderio/simple-project-k8s))
1. Someone from core dev team will review changes and accept or reject the PR. Once accepted by one of them, it can be merged to master.
1. Then there are 2 options:
   1. Time to time one of us diffs wunderio/charts/drupal to wunderio/drupal-project-k8s/charts/drupal and just copies over multiple changes in bulk and increments chart version in both repos, making them in sync again.
   1. You can make a copy of that accepted PR to wunderio/charts repo where it will be accepted again.

## Testing workflow

If you want to test a feature PR, you can do it like this:

1. Make a new branch from feature/myAwesomeThing -> feature/myAwesomeThing-test.
1. Enable the myAwesomeThing related functionality or apply new configuration related to the feature.
1. Commit the changes to the test branch and push to origin.
1. Check that functionality works as it should.
1. Write tests when possible and push them to the original feature branch or request the original author to add them.
1. Delete the test branch if everything works.


## Some tips and external documentation when working with HELM charts

[Helm template guide - control structures](https://helm.sh/docs/chart_template_guide/control_structures/)  
[Goland Sprig functions](http://masterminds.github.io/sprig/defaults.html)

To test charts locally You will need access to [Silta Dev cluster](https://intra.wunder.io/info/silta/silta-ops-manual) and Helm installed locally  
Most likely You will need to add Helm repos before testing.    
See example below.       
`helm repo add wunderio https://storage.googleapis.com/charts.wdr.io`  

Do dry-run with  
`helm upgrade --install test charts/drupal --dry-run --debug --values silta/silta.yml`  

