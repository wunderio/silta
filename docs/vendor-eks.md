# Amazon Web Services compatibility

Silta is mostly AWS compatible, there are some requirements for environments deployed to EKS cluster.

## Cluster requirements

- Calico service which helps enforcing namespace (project) network separation;

There are few more requirements listed on [silta-cluster chart page](https://github.com/wunderio/charts/tree/master/silta-cluster#requirements), those are common for all silta-cluster installations 


## Missing functionality

- ALB ingress

## Deployment specifics

There is no extra configuration required for basic deployments. The only change would be `cluster.type` but it's normally overridden in CI pipeline.

Drupal, frontend and simple charts:
```yaml
cluster:
  type: aws
```
