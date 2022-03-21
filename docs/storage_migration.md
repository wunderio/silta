# Replace file storage with Google's Filestore volume.

This example will change storage for Drupal public files.
Repeat the same steps for other volumes, such as private files. 

## Changing storage for an existing environment:

1. Add a new location which uses the new storage. We will extend default values in https://github.com/wunderio/charts/blob/039f29d9d507813d40a182fa2320adfd6a3db06a/drupal/values.yaml#L355

```
mounts:
  public-files-filestore:
    enabled: true
    storage: 10G
    mountPath: /app/web/sites/default/files-new
    storageClassName: nfs-shared
```
2. Deploy

3. Copy public files from `/app/web/sites/default/files` to this new location, `/app/web/sites/default/files-new`

4. Map the new volume to public files location, disable the old volume.

```
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


## Changing storage for a new site, project:

1. Redefine the default public and private files volumes.
```
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
2. Deploy - this is your first deployment for the project.
<br><br>
### !! LIMITATIONS, PITFALLS
1. Do not delete the old public-files section, nor change their names. Kubernetes tracks the volumes by these names.
2. Do not change storage size after the first deployment.