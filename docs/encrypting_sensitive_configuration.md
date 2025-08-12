---
id: encrypting-sensitive-configuration
title: Encrypting sensitive configuration
---

Certain information such as access tokens, secret keys, passwords, certificates etc. is considered as sensitive data thus should not be committed to the repository as plain text.

Silta supports encryption/decryption of such information via [silta-cli](https://github.com/wunderio/silta-cli), furthermore, `silta-cli` can be used locally for encryption and during the build for decryption, thus making the process simple and consistent. Official documentation for managing secrets via `silta-cli` can be found in [silta_secrets.md](https://github.com/wunderio/silta-cli/blob/master/docs/silta_secrets.md)

## Encryption & decryption

To encrypt a file for secure storing within repository, `silta secrets encrypt` command is used. When used in Silta, encrypted files have to be decrypted to take effect. See the walkthrough example below.

### 1. Get the secret key
Please refer to the [Secret keys](#encryption-keys) section of this document.

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

Secret decryption is done in CircleCI jobs, two approaches are supported.

#### Approach 1: Via `decrypt_files` parameter

Caveats:
- `decrypt_files` is only supported in `silta/drupal-build-deploy`, `silta/drupal-build` and `silta/drupal-deploy` jobs, thus only the Drupal chart
- You can't specify a custom encryption key

Advantages:
- simpler configuration, no need to specify or generate a secret key - one defined in [CircleCI context](circleci-context.md) (`SECRET_KEY` env var) is used. Note that it's expected that secrets are encrypted with the same key locally (to get the key, refer to [encryption keys](#encryption-keys) section).

Usage:
```yaml
decrypt_files: path/to/encrypted/file
```
- `path/to/file` is relative to the build folder (root)

#### Approach 2 (recommended): Via `codebase-build` or `pre-release` parameter with a `decrypt-files` command in it

This approach has slightly more complex configuration however it also has more advantages:

- Allows specifying custom encryption keys
- Supported by all charts: 
  - Drupal (`silta/drupal-build`, `silta/drupal-deploy`, `silta/drupal-build-deploy` jobs). Note: use `pre-release` parameter in `silta/drupal-deploy`
  - Frontend (`silta/frontend-build-deploy` job)
  - Simple (`silta/simple-build-deploy` job)

Usage:
I.e., in `silta/drupal-build`:
```yaml
codebase-build:
- silta/decrypt-files:
    files: sso/saml.crt
    secret_key_env: MY_PROJECT_SECRET_KEY
```
Or, in `silta/drupal-deploy`:
```yaml
pre-release:
- silta/decrypt-files:
    files: silta/secrets
    secret_key_env: MY_PROJECT_SECRET_KEY
```

- Note: If you don't specify the `secret_key_env` parameter, default encryption key from CircleCI context will be used as described earlier.

---
_Note for projects using `silta/drupal-build` and `silta/drupal-deploy`_

If project uses separate jobs for build and deploy, the job you add the decryption to depends on the use-case:
- if secret needs to be decrypted during application runtime, i.e., TLS certificate for SSO integration, add it under `silta/drupal-build`
- if secret needs to be decrypted only during the deployment, i.e., Silta configuration file, add it under `silta/drupal-deploy`

You can always use `silta/drupal-build` but I could be storing decrypted secrets on the server without actual need for them to be there.

##### _Front-end and Simple charts_

Add following under the `codebase-build` section of either `frontend-build-deploy` or `simple-build-deploy` jobs:
```yaml
- silta/decrypt-files:
  files: path/to/encrypted/file
```
---
#### Decrypting existing secrets locally
1. Get the encryption key (refer to the [Secret keys](#encryption-keys) section of this document)
2. Run:
```shell
silta secrets decrypt --file /path/to/encrypted/file --secret-key <secret-key>
```
An alternative way is to save the secret key in a local environment variable on your machine and use it as a reference instead:
```shell
silta secrets decrypt --file /path/to/encrypted/file --secret-key-env ENV_VAR_NAME
```

Note that `silta secrets decrypt` decrypts the source file itself unless you specify the`--output-file` flag. I.e., if you would want to have both decrypted and encrypted secret versions locally, you can use something like this:
```shell
silta secrets decrypt --file /path/to/encrypted/file --output-file /path/to/encrypted/file.decrypted --secret-key-env ENV_VAR_NAME
```

Remember not to commit decrypted secret files!

## Encryption keys

### For new projects
It's strongly recommended to create project-specific encryption keys or even environment specific ones for better security. Here's a walkthrough on how to do it:
1. In CircleCI, click "Settings" button in the top-right corner of your project's overview page, then choose "Environment variables" from the sidebar on the left. Click "Add environment variable". Name it something like `MY_PROJECT_SECRET_KEY` and generate a secure random value for it, i.e. on Unix based systems you can use this command:
```shell
head -c 32 /dev/urandom | base64
```
2. Update your CircleCI configuration to use the newly created key, i.e., when using `silta/drupal-build`, add:
```yaml
codebase-build:
- silta/decrypt-files:
    files: path/to/file
    secret_key_env: MY_PROJECT_SECRET_KEY
```
3. Use the same key locally for encryption, i.e, store it as a local env var for convenience as described [here](#2-create-and-encrypt-the-secret-file)

A few notes:
- You can use this example when switching existing project to use a custom encryption key. Note that for things to work out you must first locally decrypt existing secrets using **the old secret key** and re-encrypt them with the new one.
- Projects can have multiple encryption keys, i.e, one for development, one for staging and another one for production environment. If you elect to go this path, make sure you use the correct keys when encrypting/decrypting secrets per environment.

### For existing projects

To get the encryption key from and existing project, follow the guide below.

1. Determine name of the CircleCI environment variable the project uses for decryption. This can be done by inspecting project's CircleCI configuration file and searching for `secret_key_env` references.
   - _Case 1: references are found, i.e., `secret_key_env: MY_PROJECT_SECRET_KEY`._ This indicates that project uses a custom encryption key stored in the env var with the specified name. In CircleCI, definition of this env var can be found under "Environment variables" section of the "Project settings" page.
   - Case 2: references are not found. This indicates that project uses the default encryption key stored in CircleCI's context as `SECRET_KEY` environment variable (reference to [Silta CircleCI orb](https://circleci.com/developer/orbs/orb/silta/silta#commands-decrypt-files)). Note that project can utilise multiple contexts, check for `context` information in your CircleCI config to see which one is in use. In CircleCI, definition of the environment variable can be found under "Organization settings -> Contexts -> <choose the correct context> -> "Environment variables"
2. As you probably noticed, values of the CircleCI environment variables are redacted when inspecting via UI and this is done due to security reasons. To get the actual value of the env var, you must SSH into a CircleCI environment.
3. In CircleCI, go to your project's pipelines page, find the last successful pipeline of the environment you need to get the encryption key for. Now find the job you're interested in and rerun if with SSH (from top-right corner choose "Rerun > Rerun job with SSH").
4. Wait for job to run until it's successful and is "Wait for SSH sessions". Use the SSH command from CircleCI's output, it should look something like this:
```shell
ssh -p 54782 50.19.60.152
```
5. After SSH'ing into CircleCI env, run the following command to get the encryption key value (replace MY_PROJECT_SECRET_KEY with the actual env var name):
```shell
printenv MY_PROJECT_SECRET_KEY
```
6. Securely store the value locally, i.e., as an environment variable, use it for local encryption/decryption of secrets.
