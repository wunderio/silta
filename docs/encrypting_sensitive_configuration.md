# Encrypting sensitive configuration

Certain configuration items such as access tokens and other credentials are quite sensitive
and should not be committed to the repository in plain text. Silta supports providing an 
encrypted values file.

Project can override values and do file encryption using openssl.
The encryption key has to be identical to the one in the CircleCI context, which can also be found in LastPass. 

Decrypting the secret value file:

```sh
openssl enc -d -aes-256-cbc -pbkdf2 -in silta/secrets -out silta/secrets.dec
```

Encrypting the secret value file:

```sh
openssl aes-256-cbc -pbkdf2 -in silta/secrets.dec -out silta/secrets
```

Secret values can be attached to circleci `drupal-build-deploy` job like this

```sh
decrypt_files: silta/secrets
silta_config: silta/silta.yml,silta/secrets
```
