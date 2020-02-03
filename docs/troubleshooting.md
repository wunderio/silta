
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

## Mariadb or Elasticsearch running out of disk space
Stateful applications like MariaDB or Elasticsearch store their data in volumes backed by Google Persistent Disks. It is possible to resize those disks (only increasing storage is supported), but this is not yet integrated with the process of updating a statefulset. You can change the requested size by setting the `volumeClaimTemplate` field in the silta.yml for the appropriate service (`mariadb` or `elasticsearch`), but the following workaround with access to the cluster is needed before deploying:

```
namespace="name-of-repository"
pvc="master-db-0" # Find this with kubectl get pvc -n $namespace
statefulset="master-db"

kubectl patch pvc -n $namespace $pvc -p '{"spec": {"resources": {"requests": {"storage": "2Gi"}}}}'
kubectl delete statefulset  -n $namespace --cascade=false $statefulset
```
