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

3. Find and exec into the shell deployment to get root access
    ```bash
    kubectl --namespace=<namespace> get deployments | grep shell
    kubectl --namespace=<namespace> exec -it deployment/<shell deployment name> -- sh
    ```

4. Copy public files from the old location to the new one
    ```bash
    cp -rT /app/web/sites/default/files /app/web/sites/default/files-new
    ```

5. Set ownership and permissions for the new location
    ```bash
    chown -R www-data:www-data /app/web/sites/default/files-new
    chmod 770 /app/web/sites/default/files-new
    find /app/web/sites/default/files-new -type d -exec chmod 770 '{}' \;
    find /app/web/sites/default/files-new -type f -exec chmod 660 '{}' \;
    ```

6. Update the mount path for the new mount, disable the old one
    ```yaml
    mounts:
      public-files-filestore:
        enabled: true
        storage: 10G
        mountPath: /app/web/sites/default/files
        storageClassName: nfs-shared
      public-files:
        enabled: false
        mountPath: /app/web/sites/default/files-old
    ```

7. Add the original Drupal file paths as environment variables
    ```yaml
    php:
      env:
        PRIVATE_FILES_PATH: /app/private
        PUBLIC_FILES_PATH: /app/web/sites/default/files
    ```
   
8. To run PHP as user `www-data`, add this line in your `silta/php.Dockerfile` right after the `COPY` line
    ```dockerfile
    USER www-data
    ```
    Dockerfile example of a project
    ```dockerfile
    FROM eu.gcr.io/silta-images/php:8.0-fpm-v0.1
    
    COPY --chown=www-data:www-data . /app
    
    USER www-data
    ```

9. Deploy

10. Check owners of the files directory, it should be www-data
    ```bash
    ls -alh /app/web/sites/default/files
    ```
    If some of the files are owned by root - rerun step 5, but for the files path (not files-new)
    
11. Check that the public files path shows up correctly when running `drush status`.
    If it doesn't, make sure that it has not been overridden in settings.php file.

## Changing storage for a new deployment, project:

1. Redefine the default public and private files volumes.
```yaml
mounts:
  public-files:
    enabled: true
    storage: 10G
    mountPath: /app/web/sites/default/files
    storageClassName: nfs-shared
  private-files:
    enabled: true
    storage: 1G
    mountPath: /app/private
    storageClassName: nfs-shared
```
2. Deploy - this is your first deployment for the project or environment.
