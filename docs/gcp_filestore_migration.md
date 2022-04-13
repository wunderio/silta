# Replace file storage with Google's Filestore volume.

This example will change storage for Drupal public files.
Repeat the same steps for other volumes, such as private files. 

### !! LIMITATIONS, PITFALLS
1. Do not delete the old public-files section, nor change their names. Kubernetes tracks the volumes by these names.
2. Do not change storage size after the first deployment. You will end up in an error state: Ignoring the PVC: didn't find a plugin capable of expanding the volume; waiting for an external controller to process this PVC.
3. The provisioned storage limit is not enforced. The application can expand to use all the available storage regardless of the provisioned size.
If you run out of free space on volume, contact cluster administrator for its expansion.
4. The provisioned storage is not guaranteed. You may allocate more than the NFS share's total size. The share may also not have enough storage space left to actually accommodate the request.

## Changing storage for an existing environment:

1. Add a new location which uses the new storage. We will extend default values from https://github.com/wunderio/charts/blob/039f29d9d507813d40a182fa2320adfd6a3db06a/drupal/values.yaml#L355

```yaml
mounts:
  public-files-filestore:
    enabled: true
    storage: 10G
    mountPath: /app/web/sites/default/files-new
    storageClassName: nfs-shared
```
2. Deploy

3. Copy public files from `/app/web/sites/default/files` to this new location, `/app/web/sites/default/files-new`

4. Set permissions for the new directory and copied files
```bash
chown -R www-data:www-data /app/web/sites/default/files-new
```

5. Map the new volume to public files location, disable the old volume.

```yaml
mounts:
  public-files-filestore:
    enabled: true
    storage: 1G
    mountPath: /app/web/sites/default/files
    storageClassName: nfs-shared
  public-files:
    enabled: false
    mountPath: /app/web/sites/default/files-old
```

6. Add the original Drupal file paths as environment variables.
```yaml
php:
  env:
    PRIVATE_FILES_PATH: /app/private
    PUBLIC_FILES_PATH: /app/web/sites/default/files
```
7. Deploy

8. Check owners of the files directory, it should be www-data
```bash
ls -alh /app/web/sites/default/files
```
If some of the files are owned by root - rerun step 4, but for the files path
```bash
chown -R www-data:www-data /app/web/sites/default/files
```
## Changing storage for a new deployment, project:

1. Redefine the default public and private files volumes.
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
2. Deploy - this is your first deployment for the project or environment.
