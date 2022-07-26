# Azure Services compatibility

Silta is AKS compatible, there are some requirements and special features available for environments deployed to Azure AKS cluster.

## Cluster requirements

- AKS network plugin = kubenet and network policy = calico (can't be changed after cluster is created) for Calico Network Policy support;
- Network CIDR should preferably be 10.x.y.z (default value). Changing is possible, will require deployment value tweaks;
- Microsoft.Storage subscription for azurefile-csi mounts (optional, if used)

There are few more requirements listed on [silta-cluster chart page](https://github.com/wunderio/charts/tree/master/silta-cluster#requirements), those are common for all silta-cluster installations 

## Deployment specifics

There is no extra configuration required for basic deployments. The only change would be `cluster.type` but it's normally overriden in CI pipeline.

Drupal, frontend and simple charts:
```yaml
cluster:
  type: aks
```

## Azure features 

### Azure Files

By default, silta is configured to provide shared storage mounts with [Minio](https://min.io/), locally hosted S3 compatible object storage provider. When [silta-cluster](https://github.com/wunderio/charts/tree/master/silta-cluster) is configured accordingly, the `silta-shared` storageClass will use [Microsoft Azure Blob Storage](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blobs-introduction) for shared mounts (backups, reference data, public and private file mounts).

Since AKS provides "[Azure Files](https://docs.microsoft.com/en-us/azure/storage/files/storage-files-introduction)" CSI storage driver with "[Read Write Many](https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes)" support, it's possible to swap "Azure Blob Storage" for "Azure Files". It provides slightly increased i/o performance and instant mounted data synchronization between backends. 

**Note: The "azurefile-csi" storage is case insensitive. There is no distinction between files called "Abc" and "ABC", it will rewrite the same file.**

Note 2: This is normally only needed only for projects with many files and many backends.

Note 3: You can't change this value for existing deployments. Deployment needs to be removed and redeployed.

To set up, override `silta-shared` storage class to "azurefile-csi" and double check "storage" value because this will be used and enforced now. If you make the reservation too small, You'll need to ask cluster administrator to [expand the storage value](https://github.com/wunderio/silta/blob/master/docs/troubleshooting.md#mariadb-or-elasticsearch-running-out-of-disk-space).

Minimal configuration (drupal chart):

```yaml
mounts:
  public-files:
    # check and override `storage` value according to project specifics
    storageClassName: azurefile-csi
    storage: 1G
  # don't forget to override private file storage if in use
  # private-files:
  #   storageClassName: azurefile-csi
```

This also allows replacing `storageClassName` for other mounts (i.e. backups, reference data), but it makes less sense to adjust them.

Troubleshooting: 
- It's possible that the azurefile-csi driver is not enabled. Ask cluster administrator to enable it.
```bash
# Register Microsoft.Storage subscription for azurefile-csi mounts
az provider register --namespace Microsoft.Storage
```
- Nginx open file cache prevents file removal

When the file is cached in nginx open_file_cache, it opens file handle and does not release until cache is valid or nginx process is stopped. This only happens on (Azure) filestore-csi filesystem at the moment.

```
[warning] unlink(/app/web/sites/default/files/css/css_8SwtpM_JE4c-Hmf7Tw_VTpfz1GvHbLy26YQw6w7XWms.css): No such file or directory FileSystem.php:124
[error]  Failed to unlink file 'public://css/css_8SwtpM_JE4c-Hmf7Tw_VTpfz1GvHbLy26YQw6w7XWms.css'.
In FileSystem.php line 340:
Failed to unlink file 'public://css/css_8SwtpM_JE4c-Hmf7Tw_VTpfz1GvHbLy26YQ2022-07-26T05:10:37.660255490Z   w6w7XWms.css'.
```

Solution is to disable nginx open_file_cache in silta configuration.

```yaml
nginx:
  open_file_cache:
    enabled: false
```

### Application Gateway

Silta provides a way to use existing [Azure Application Gateway](https://azure.microsoft.com/en-us/services/application-gateway/) for deployment URLs and exposed domains.

#### AKS cluster preparations
It would require Azure administrator to do few adjustments first (one time thing):

- Creating virtual network and subnetwork for Application Gateway
- Application Gateway and static ip that will be used for deployment DNS entries
- Bi-directional network peering for Application Gateway network and Kubernetes Cluster networks
- Enabling AGIC addon in Kubernetes Cluster so it monitors in-cluster ingress resources
- Associating the route table to Application Gateway's subnet

Related documentation bits:
- https://docs.microsoft.com/en-us/azure/application-gateway/tutorial-ingress-controller-add-on-existing
- https://azure.github.io/application-gateway-kubernetes-ingress/how-tos/networking/#with-kubenet

#### Deployment preparations

You will need to grant Application Gateway access to deployment

```yaml
nginx:
  # Allow Application Gateway network to access liveness probes
  noauthips:
    custom-azure-appgw: 172.30.1.0/24
  # Trust Application Gateway network to supply real ip via "x-forwarded-for" header. 
  # Ommiting this will remove basic auth for all requests (see `nginx.noauthips`)
  realipfrom: 
    custom-azure-appgw: 172.30.1.0/24
  
# Add NetworkPolicy exception for Application Gateway or it will timeout
silta-release:
  ingressAccess:
    CustomAzureAppGWAccess:
      from:
        - ipBlock:
            cidr: 172.30.1.0/24
```

Note: Replace `172.30.1.0/24` with the actual value. Ask cluster administrator the actual network address.

There are two options to use the Application Gateway:

1. Keeping existing load balancer (traefik) for default ingress class for deployment, leaving existing built-in domain as-is and only changing ingress class for `exposeDomains` domain (this is preferred):

Drupal chart:
```yaml
exposeDomains:
  example:
    hostname: example.com
    # "aks" is a generic key name that references ingress.[ingressname]. It does not mean anything.
    ingress: aks

ingress:
  aks:
    # This is the actual ingressClass name
    type: azure/application-gateway
    # Can add custom annotations to ingress. 
    # See: https://azure.github.io/application-gateway-kubernetes-ingress/annotations/
    # extraAnnotations:
      # appgw.ingress.kubernetes.io/ssl-redirect: true

```

2. Replacing default ingress class with Application Gateway. This will require additional DNS entry changes.
```yaml
exposeDomains:
  example:
    hostname: example.com

ingress:
  default:
    type: azure/application-gateway
```

Note: You can define [custom annotations](https://azure.github.io/application-gateway-kubernetes-ingress/annotations/) for ingress using `ingress.[ingressname].extraAnnotations`.
