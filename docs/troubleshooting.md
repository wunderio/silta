
# CircleCI build issues

# Helm release fails due to existing resources
```
Error: kind PersistentVolume with the name "project-123--branchname-someresource" already exists in the cluster and wasn't defined in the previous release.
```
This error happens when a release that created a new resource failed.
The resource that is now in the way needs to be deleted, please ask someone with direct access to the cluster to do that.

# Issues with the deployed environments

## "upstream connect error" when connecting via HTTP
```
upstream connect error or disconnect/reset before headers
```
**What happened:** The application pod is in an unready state, so ambassador (the API gateway) is not sending traffic to it.

**What to do:** This could be because the deployment is not complete, or there is a problem with your application.
Check the deployment logs in CircleCI. Please contact the ops team if the issue persists.

## "Error: Connection refused" when connecting via SSH
```
channel 0: open failed: connect failed: Connection refused
stdio forwarding failed
ssh_exchange_identification: Connection closed by remote host
```

**What happened:** The `shell` pod is not done deploying.
**What to do:** Wait for a ten seconds and try again.

## Timeout without error when connecting via SSH

You are probably not logged into the VPN.

## username@X.X.X.X: Permission denied (publickey).

Reason: Authentication is based on your GitHub key, but there is trouble reading it.

Solution: Use the key explicitly using `-i [path_to_identity_file]` option:
```bash
ssh X.X.X.X -i ~/.ssh/keys/wunder-github.rsa 
```

## Mariadb or Elasticsearch running out of disk space
Stateful applications like MariaDB or Elasticsearch store their data in volumes backed by Google Persistent Disks. It is possible to resize those disks (only increasing storage is supported), but this is not yet integrated with the process of updating a statefulset. 
You can change the requested size by setting the `elasticsearch.volumeClaimTemplate.resources.requests.storage` or `mariadb.master.persistence.size` field in the `silta.yml` for the appropriate service (`mariadb` or `elasticsearch`):

MariaDB storage request (re-check correct values with mariadb subchart if needed):
```
mariadb:
  master:
    persistence:
      # Database storage disk space allocation
      # Request assistance from ops team after changing this on existing deployment.
      size: 5Gi
```
Elasticsearch storage request (re-check correct values with elasticsearch subchart if needed):
```
elasticsearch:
  volumeClaimTemplate:
    resources:
      requests:
        # Elasticsearch storage disk space allocation
        # Request assistance from ops team after changing this on existing deployment.
        storage: 5Gi
```
If the size is less than 5G, set it to 5G. If it's 5G or more, double the previous value.

Due to inability to patch immutable fields in mariadb statefulset, the next build will fail unless cluster administrator runs these commands manually:
```
namespace="name-of-repository"
pvc="data-master-mariadb-0" # Find this with kubectl get pvc -n $namespace
statefulset="master-mariadb"

kubectl patch pvc -n $namespace $pvc -p '{"spec": {"resources": {"requests": {"storage": "5Gi"}}}}'
kubectl delete statefulset  -n $namespace --cascade=orphan $statefulset
```

NOTE: If updating pvc size you are met with error:
```
error: persistentvolumeclaims "xxx-xxx" could not be patched: persistentvolumeclaims "xxx-xxx" is forbidden: only dynamically provisioned pvc can be resized and the storageclass that provisions the pvc must support resize
```
Check that Kubernetes is running at least v1.16 and then edit the corresponding storageclass, "standard" in this case:
```
kubectl patch storageclass standard -p '{"allowVolumeExpansion": true}'
```

## Drupal 7 migration

**Project uses make file for builds**  
Have something like this in .circleci/config.yml
```yaml
          codebase-build:
            - run:
                name: Build from makefile
                command: |
                  composer install
                  vendor/drush/drush/drush make ~/project/drupal/conf/site.make ~/project/drupal/web/
                  mkdir -p web/sites/all/modules
                  cp -r code/modules/custom web/sites/all/modules/
```

**Drush is missing**  
Add composer.json in Drupal folder
```json
{
    "require": {
        "drush/drush": "8.*"
    },
    "extra": {
        "installer-paths": {
            "web/": ["type:drupal-core"]
        }
    }
}
```

And then in .circleci/config.yml add
```yaml
                command: |
                  composer install
```

