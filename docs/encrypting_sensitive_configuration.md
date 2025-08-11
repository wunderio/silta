---
id: encrypting-sensitive-configuration
title: Encrypting sensitive configuration
---

Certain information such as access tokens, secret keys, passwords, certificates etc. is considered as sensitive data thus should not be committed to the repository as plain text.

Silta supports encryption/decryption of such information via [silta-cli](https://github.com/wunderio/silta-cli), furthermore, `silta-cli` can be used locally for encryption and during the build for decryption, thus making the process simple and consistent. Official documentation for managing secrets via `silta-cli` can be found in [silta_secrets.md](https://github.com/wunderio/silta-cli/blob/master/docs/silta_secrets.md)

## Encryption

To encrypt a file for secure storing within repository, `silta secrets encrypt` command is used. When used in Silta, encrypted files have to be decrypted to take effect. See the walkthrough example below.


### 1. Get the secret key
Please refer to the [Secret keys](#secret-keys) section of this document.

### 2. Create and encrypt the secret file

`silta-cli` allows to encrypt any file, i.e. it can be Silta configuration file containing sensitive data like env vars or TLS certificates, an actual TLS certificate located at `/secrets/server.crt` or anything else. Once you have the file ready for encryption, run:
```shell
silta secrets encrypt --file /path/to/file --secret-key <secret-key>
```
An alternative way is to save the secret key in a local environment variable on your machine and use it as a reference instead:
```shell
silta secrets encrypt --file /path/to/file --secret-key-env ENV_VAR_NAME
```

Note that `silta secrets encrypt` encrypts the source file itself unless you use the`--output-file` flag.

### 3. Add decryption in CircleCI config file

##### _Drupal chart_

If project uses `silta/drupal-build-deploy` job, add this under the job:
```yaml
decrypt_files: path/to/encrypted/file
```
- `path/to/file` is relative to the build folder (root)

If project uses separate jobs for build and deploy (`silta/drupal-build`, `silta/drupal-deploy`), job you add the decryption under depends on the use-case:
- if secret needs to be decrypted during application runtime, i.e., TLS certificate for SSO integration, add it under `silta/drupal-build`
- if secret needs to be decrypted only during the deployment, i.e., Silta configuration file, add it under `silta/drupal-deploy`
---
##### _Front-end and Simple charts_

Add following under the `codebase-build` section of either `frontend-build-deploy` or `simple-build-deploy` jobs:
```yaml
- silta/decrypt-files:
  files: path/to/encrypted/file
```

## Secret keys

todo

## Decrypting existing secrets

todo