# Encrypting sensitive configuration

Certain configuration items such as access tokens or secret keys are quite sensitive
and should not be committed to the repository in plain text. Silta supports decrypting certain files 
during the build process.

We use `openssl` to encrypt files, but there are many versions available with incompatible ciphers. 
We therefore recommend the following process: 

- SSH into a CircleCI environment using "Rerun workflow > Rerun job with SSH" from the last build. Note that this has to be a deployment build (validation builds won't have the environment variable with the encryption key). 
  You will get a command like (the actual IP and port changes for each build) 
  ```bash
  ssh -p 64537 3.80.240.10
  ```
  If you have trouble getting in, please refer to `troubleshooting.md` SSH section.

- Create your file named `/tmp/secret_file`.

- Encrypt it with 
  ```
  openssl aes-256-cbc -pbkdf2 -in /tmp/secret_file -out /tmp/encrypted_file -pass env:SECRET_KEY
  ``` 
  Make sure that the `-in` and `-out` parameters are not the same, or openssl will encrypt its own output.

- Now copy the encrypted file back to your local environment with 
  ```bash
  scp -P 64537 3.80.240.10:/tmp/encrypted_file path/to/file
  ```
  The port and IP should be the same as the SSH instructions. Note that `-P` is uppercase for `scp`!

- Commit the encrypted file to git at the location where you want to have it.

- In your CircleCI configuration, add a build step to decrypt the file:
  ```
  - silta/decrypt-files:
      files: path/to/file
  ```
  Note that the path is relative to the build folder (where you have your composer.json).

- Push your code, the file will get decrypted in place at the build time. 
  Check the CircleCI step "Decrypt secret files".

- Your secret file can be used as it is (for example, the private key to connect to another service).

- Your secret file can also contain an extension to the configuration in silta.yml, 
  for example to set encrypted environment variables. To do that, add this to your `drupal-build-deploy` CircleCI job:
  ```
  silta_config: silta/silta.yml,silta/secrets
  ```

## Using a custom encryption key
For cases where you want to have your own encryption key, you can do that with the following steps:

- Create an environment variable in your CircleCI project.
Click the gear icon on a build page > Environment variables > Add Variable.
Use a name like `MYPROJECT_SECRET_KEY` and the value of your choice (preferably a strong key).
- Use the same step as above, but specify the environment variable to be used as the decryption key:
  ```
  - silta/decrypt-files:
      files: path/to/file
      secret_key_env: MYPROJECT_SECRET_KEY
  ```
