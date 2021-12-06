---
id: troubleshooting
title: Troubleshooting and FAQ
sidebar_label: Troubleshooting
--- 

# Deployment issues

## Q: Helm release fails due to existing resources

Error:
> kind PersistentVolume with the name "project-123--branchname-someresource" already exists in the cluster and wasn't defined in the previous release.

A: This error happens when a release that created a new resource failed.
The resource that is now in the way needs to be deleted, please ask someone with direct access to the cluster to do that.

# Issues with the deployed environments

## Q: How to connect to silta ssh?

A: SSH connection information is available in your circleci release notes.

## Q: There is no connection information in deployment’s release notes!
A: SSH access is not enabled most likely.

## Q: How to enable ssh access to project?

A: See default values for the helm chart you are using for deployment.

## Q: "Error: Connection refused" when connecting via SSH

Error:
> channel 0: open failed: connect failed: Connection refused
stdio forwarding failed
ssh_exchange_identification: Connection closed by remote host

Possible causes:

- The `shell` pod is not done deploying. Wait for ten seconds and try again.

- There is no `shell` access in frontend chart by default, You need to enable it (`shell.enabled: true`) and use customized base images from https://eu.gcr.io/silta-images/node 

## Q: Timeout without error when connecting via SSH

Error:
> ssh: connect to host ssh.[cluster.domain] port 22: Operation timed out
ssh_exchange_identification: Connection closed by remote host

Possible causes: 

- SSH access is IP restricted, You are probably not logged into the VPN.
- SSH server just got restarted, wait couple minutes and try again

## Q: SSH connection asks for password or refuses connection
Error message:
> ssh www-admin@master-shell.projectname -J www-admin@ssh.[cluster.domain]
www-admin@master-shell.projecname's password:

Error message 2:
> channel 0: open failed: connect failed: Connection refused
stdio forwarding failed
kex_exchange_identification: Connection closed by remote host

Error message 3:
> channel 0: open failed: connect failed: Name does not resolve
stdio forwarding failed
kex_exchange_identification: Connection closed by remote host

Possible causes:

- Shell container might be in unready state. Check pod via kubectl or silta dashboard (internal tool). And ensure all pods are running. If not, wait.

- It’s possible your public key is not added to your github profile, make sure it is;

- You are not project contributor in github, make sure you can push commits to repo;

- Remove all occurrences of hostname (i.e. master-shell.projectname) from ~/.ssh/known_hosts

- If you have changed the `clusterDomain` value in your silta configuration file, you need to set `shell.gitAuth.keyserver.url` to `https://keys.[cluster.domain]/api/1/git-ssh-keys`. Otherwise [curl in public key download script](https://github.com/wunderio/silta-images/blob/master/shell/php-8.0/gitauth_keys.sh#L6) complains about broken certificate and the authentication does not work.

- The ssh jumphost domain may be incorrect. Normally You'd get a full connection url in release notes, but if part of the domain is masked (****), don't assume it to be silta.wdr.io. Actual domain replacement depends on the context (check TLDR answer for "Secret masking and ************" topic).

If all above fails ask OPS team to check ssh-keyserver.

## Q: SSH connection public key authentication failure

Error:
> username@X.X.X.X: Permission denied (publickey).

A: Authentication is based on your GitHub key, but there is trouble reading it. Use the key explicitly using `-i [path_to_identity_file]` option:
```bash
ssh X.X.X.X -i ~/.ssh/keys/wunder-github.rsa 
```

## Q: Silta website asks for password, what’s the password?

A: Password is printed in circleci build release notes.

## Q: How do i change/disable site password?

A: Check chart default values file, nginx.basicauth section. Check [silta ​examples](silta-examples.md) for example snippet. Make changes in silta.yml or silta-prod.yml accordingly. You can also whitelist ip addresses to skip password request (do this with caution). Check nginx.noauthips in chart defaults.

## Q: How to allow access only based on IP?

A: There is no built-in solution for silta, but You can add custom nginx configuration snippet to achieve it.

```yaml
nginx:
  locationExtraConfig: |
    allow 1.2.3.4/32;
    deny all;
```

## Mariadb or Elasticsearch running out of disk space

Error:
> The table ‘XYZ’ is full

Stateful applications like MariaDB or Elasticsearch store their data in persistent data volumes. It is possible to resize (expand) those disks (only increasing storage is supported), but this is not yet integrated with the process of updating a statefulset. 
You can change the requested size by setting the `elasticsearch.volumeClaimTemplate.resources.requests.storage` or `mariadb.master.persistence.size` field in the `silta.yml` for the appropriate service (`mariadb` or `elasticsearch`), but You also need ops interaction to patch the statefulset:

MariaDB storage request (re-check correct values with mariadb subchart if needed):
```yaml
mariadb:
  master:
    persistence:
      # Database storage disk space allocation
      # Request assistance from ops team after changing this on existing deployment.
      size: 5Gi
```
Elasticsearch storage request (re-check correct values with elasticsearch subchart if needed):
```yaml
elasticsearch:
  volumeClaimTemplate:
    resources:
      requests:
        # Elasticsearch storage disk space allocation
        # Request assistance from ops team after changing this on existing deployment.
        storage: 5Gi
```
If the size is less than 5Gi, set it to 5Gi. If it's 5Gi or more, double the previous value.

Due to inability to patch immutable fields in mariadb statefulset, the next build will fail unless cluster administrator runs these commands manually:
```bash
namespace="name-of-repository"
pvc="data-master-mariadb-0" # Find this with kubectl get pvc -n $namespace
statefulset="master-mariadb"

kubectl patch pvc -n $namespace $pvc -p '{"spec": {"resources": {"requests": {"storage": "5Gi"}}}}'
kubectl delete statefulset  -n $namespace --cascade=orphan $statefulset
```

NOTE: If updating pvc size you are met with error:

> error: persistentvolumeclaims "xxx-xxx" could not be patched: persistentvolumeclaims "xxx-xxx" is forbidden: only dynamically provisioned pvc can be resized and the storageclass that provisions the pvc must support resize

Check that Kubernetes is running at least v1.16 and then edit the corresponding storageclass, "standard" (google kubernetes engine only) in this case:
```bash
kubectl patch storageclass standard -p '{"allowVolumeExpansion": true}'
```

## Q: How to enable persistent storage for private files in drupal chart?

Sometimes you'd also get error like this:
> (changing permissions of 'private/': Operation not permitted)

A: There are good defaults for private files persistent storage already, You just have to enable it in silta.yml file. Check the mount defaults in chart defaults too.

Drupal chart:
```yaml
mounts:
  private-files:
    enabled: true
```

## Q: How do I enable backups?

A: Drupal chart: search "backup" in chart values file for the answer.

A: Frontend chart: Backups can be enabled via `backups.enabled: true` and it will back up mounts defined at `.Values.mounts`. There's also an option to run custom commands during backup using `services.yourservice.backup.command` (see services section in chart values.yml). Keep in mind that once the container stops, the data that is not stored on a persistent storage (backed up) will disappear.

## Q: How do i know backups work?

A: Backup process is done in a dedicated pod with a specific instructions to make a backup. Check backup pod output in silta dashboard (i.e. `production-backup-1590113220-n4m7p`). If the pod state is `Succeeded`, it's good. Check the logs too, you can see the backup content and size. The pod state is kept till the next backup is started.

## Q: How do i send e-mails?

A: Check silta documentation, "[Sending e-mail](silta-examples.md#sending-e-mail)" section

## Q: How do i create redirects?

A: Check silta documentation, "[Adding redirects](silta-examples.md#add-redirects)" section

## Q: What is the Elasticsearch host address?

A: Elasticsearch host address is available via `ELASTICSEARCH_HOST` environment variable.

## Q: Site keeps complaining about SSL certificate

Error:
> Warning: Potential Security Risk Ahead

A: The SSL certificate is broken/incorrect. There are multiple types of certificates:

- Custom certificates. Most frequent issue is that the CA certificate is not added to the bundle. Add it both to "tls.ca" and "tls.crt" fields. The order of certificates is server.crt -> intermediate.crt -> root.crt.

- Letsencrypt-staging. Unless You don't need it specifically, change it to "letsencrypt".

- Letsencrypt. One of possible causes, is, You added the exposeDomain long before DNS was actually changed and certificate issuer has timed out. Try to deploy the exposeDomains as close to DNS change as possible next time! Ask ops support to remove cert-manager challenge resource, so it recreates validation pod and it triggers repeated validation.

## Q: Deployment fails due to misconfigured memory assignments

Error log example #1:
> Warning  Failed                  45s (x4 over 101s)  kubelet, [node-id]  Error: failed to create containerd task: OCI runtime create failed: container_linux.go: 349: starting container process caused "process_linux.go:449: container init caused \"process_linux.go:415: setting cgroup config for procHooks process caused \\\"failed to write \\\\\\\"5\\\\\\\" to \\\\\\\"/sys/fs/cgroup/memory/kubepods/burstable/[pod-id]/php/memory.limit_in_bytes\\\\\\\": write /sys/fs/cgroup/memory/kubepods/burstable/[pod-id]/php/memory.limit_in_bytes: device or resource busy\\\"\"": unknown   

Event log example #2
> Failed to create pod sandbox: rpc error: code = Unknown desc = failed to create containerd task: OCI runtime create failed: container_linux.go:349: starting container process caused "process_linux.go:319: getting the final child's pid from pipe caused \"EOF\"": unknown

A: This happens due to misconfigured memory limits or requests. Most plausible cause, memory unit is "m" while it should be "M".
Note: cpu resources, however, are defined with lower case "m" (millicpu). More on kubernetes resource management (and "M" vs "Mi") here: https://kubernetes.io/docs/concepts/configuration/manage-resources-containers/

## Q: PHP FPM containers print "read-only file system" error on startup

Error:
> 2021/08/20 06:22:38 [ ERROR ] Error while parsing '/usr/local/etc/php-fpm.d/zz-custom.conf': open /usr/local/etc/php-fpm.d/zz-custom.conf: read-only file system

TLDR A: Can't make it go away.

A: There are customizations we need to inject into containers, but the way kubernetes works, is it only allows to map those template configuration files as read only which php does not like (complains about).There are couple ideas (hacks) in some issue queues that we tried and did not succeed, but there are few others that we might try again one day. Until then - there's that message. Related issue: https://github.com/kubernetes/kubernetes/issues/62099

## Q: How to encrypt sensitive information?

A: Use openssl as described in silta docs in "[Encrypting sensitive configuration](encrypting_sensitive_configuration.md)"

## Q: How to change the webroot for drupal chart?

By default, the webroot is configured to be in `/app/web`. This value can be changed in the Drupal chart, see example below.

Drupal chart:
```yaml
webRoot: /app/docroot
```

If you change this, make sure to check for any other references to `/app/web` or `web` in your project.

Some known references are:
- `public-files` mount in this the Drupal chart (values.yaml file)
- `silta/nginx.Dockerfile`
- `composer.json` & `composer.lock`
- `.dockerignore`
- `.gitignore`
- `.lando.yml`
- `grumphp.yml`
- `phpcs.xml`

You also need to add the following in `.circleci/config.yml` parameters and put your webRoot directory name as the value, for example `web` or `docroot`:
- Add parameter `web-root` to `silta/drupal-validate` job
- Add parameter `nginx_build_context` to `silta/drupal-deploy-build` job
