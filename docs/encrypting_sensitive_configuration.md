---
id: encrypting-sensitive-configuration
title: Encrypting sensitive configuration
---

Certain configuration items such as access tokens or secret keys are quite sensitive
and should not be committed to the repository in plain text. Silta supports decrypting certain files
during the build process.

We use `openssl` to encrypt files, but there are many versions available with incompatible ciphers.
We therefore recommend the following process:

- SSH into a CircleCI environment using "Rerun workflow > Rerun job with SSH" from the last build. Note that different environments might have different circleci contexts and hence - different encryption keys. Check your circleci config file for context information.
  You will get a command like (the actual IP and port changes for each build)
  ```bash
  ssh -p 64537 3.80.240.10
  ```
  If you have trouble getting in, please refer to `troubleshooting.md` SSH section.

- Create your file named `/tmp/secret_file`.

- Encrypt it with
  ```bash
  openssl aes-256-cbc -pbkdf2 -in /tmp/secret_file -out /tmp/encrypted_file -pass env:SECRET_KEY
  ```
  Make sure that the `-in` and `-out` parameters are not the same, or openssl will encrypt its own output.

- Now copy the encrypted file back to your local environment with
  ```bash
  scp -P 64537 3.80.240.10:/tmp/encrypted_file path/to/file
  ```
  The port and IP should be the same as the SSH instructions. Note that `-P` is uppercase for `scp`!

  You might get an error like "subsystem request failed on channel 0
  scp: Connection closed"
  Try to use -O as an argument, like this:
  ```bash
  scp -O -P 64537 3.80.240.10:/tmp/encrypted_file path/to/file
  ```

- Commit the encrypted file to git at the location where you want to have it.

- In your CircleCI configuration, add following 
  - *Drupal chart*: Add following under `silta/drupal-build-deploy`:
  ```yaml
  decrypt_files: path/to/file
  ```
  - *Drupal chart*: If using multiple secret files separate them with a comma (space separation work but is deprecated). For example:
  ```yaml
  decrypt_files: silta/secrets,silta/secrets-this,silta/secrets-that
  ```
  - *Frontend chart*: Add following under `codebase-build`:
  ```yaml
  - silta/decrypt-files:
      files: path/to/file
  ```
  - `path/to/file` is relative to the build folder (root)

- Your secret file can also contain an extension to the configuration in silta.yml, for example to set encrypted environment variables. To do that, add this to your `drupal-build-deploy` CircleCI job:
  ```yaml
  silta_config: silta/silta.yml,silta/secrets
  ```

- Push your code, the file will get decrypted in place at the build time.
  Check the CircleCI step "Decrypt secret files".

- Your secret file can be used as it is (for example, the private key to connect to another service).

## Example of secret environment variables

*Drupal chart*
```yaml
php:
  env:
    PAYMENT_GW_KEY: '1234567890qwertyuiop'
```

*Frontend chart*
```yaml
services:
  myservice:
    env:
      PAYMENT_GW_KEY: '1234567890qwertyuiop'
```

## Using a custom encryption key
For cases where you want to have your own encryption key, you can do that with the following steps:

- Create an environment variable in your CircleCI project.
Click the gear icon on a build page > Environment variables > Add Variable.
Use a name like `MYPROJECT_SECRET_KEY` and the value of your choice (preferably a strong key).
- Use the same step as above, but specify the environment variable to be used as the decryption key:
  ```yaml
  - silta/decrypt-files:
      files: path/to/file
      secret_key_env: MYPROJECT_SECRET_KEY
  ```


## Decrypting existing secrets file

Check the port and IP address by Rerunning the latest workflow in CircleCI: > Rerun job with SSH

Using the SSH port and IP address securely copy your silta/secrets file to CircleCI

```bash
scp -P 64537 silta/secrets 3.80.240.10:/tmp/encrypted_file
````

SSH to CircleCI using the correct port/IP you got from rerunning the job with SSH

```bash
ssh -p 64537 3.80.240.10
```

Run following command in CircleCI:

```bash
openssl aes-256-cbc -pbkdf2 -d -in /tmp/encrypted_file -out /tmp/decrypted_file -pass env:SECRET_KEY
```

Check `/tmp/decrypted_file` or scp it back to your local using
```bash
scp -P 64537 3.80.240.10:/tmp/decrypted_file silta/secrets_decrypted
```
