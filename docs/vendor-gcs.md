# Google Cloud compatibility

Silta is fully GKE compatible since it's primarily used on it.

## Cluster requirements

Requirements are listed on [silta-cluster chart page](https://github.com/wunderio/charts/tree/master/silta-cluster#requirements), those are common for all silta-cluster installations. 

## Deployment specifics

There is no extra configuration required for basic deployments. The only change would be `cluster.type` but it's normally overridden in CI pipeline.

Drupal, frontend and simple charts:
```yaml
cluster:
  type: gke
```

## Google Cloud features 

### VPC native cluster

GKE clusters are [VPC native](https://cloud.google.com/kubernetes-engine/docs/concepts/alias-ips) the default now, but for compatibility reasons silta deployments are set to route-based mode by default now. This is normally overridden in CI, according to cluster.

```yaml
cluster:
  type: gke
  vpcNative: true
```

### GKE Ingress for HTTP(S) Load Balancing

Projects can define `exposeDomain` hosts and use [GKE Ingress Class](https://cloud.google.com/kubernetes-engine/docs/concepts/ingress)
```yaml
exposeDomains:
  example-gce-ingress:
    hostname: example.com
    # see ingress.gce definition. This can also be a custom ingress too.
    ingress: gce
    
ingress:
  gce:
    # Request a global static ip from cluster administrator first
    staticIpAddressName: custom-ip-name

nginx:
  # Reverse proxy IP's to trust with contents of X-Forwarded-For header 
  realipfrom: 
    # Load Balancer IP (static ip you were given)
    gce-lb-ip: 1.2.3.4/32;
```

### Cloud Armor

[Cloud Armor](https://cloud.google.com/kubernetes-engine/docs/how-to/ingress-features#cloud_armor) can only be used with GKE Ingress. Once enabled, You can define security policy (Cloud Armor policy) for Your service's backendConfig.

Silta uses "silta-ingress" security policy name by default, it can be adjusted.

```yaml
backendConfig:
  securityPolicy:
    name: "silta-ingress"
```
### Filestore

[Filestore](https://cloud.google.com/filestore) - add an alternate storageclass with a shared Filestore volume.<br/>
Public and private files can be stored on Google Filestore via NFS mount, providing higher i/o access than default storage. This option is useful for projects with lots of files served.<br/>
Have an exported share named `/main_share`.<br/>

Example configuration for **new deployments**.
```yaml
mounts:
  public-files:
    enabled: true
    storage: 1G
    mountPath: /app/web/sites/default/files
    storageClassName: nfs-shared
  private-files:
    enabled: true
    storage: 1G
    mountPath: /app/private
    storageClassName: nfs-shared
```

Full example on using the provisioned storageclass in **new and existing** projects [here](gcp_filestore_migration.md)