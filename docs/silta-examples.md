# silta.yml configuration examples

The default values are documented here: https://github.com/wunderio/charts/blob/master/drupal/values.yaml

Below is a list of examples for common needs. 
All examples are meant to be used in the `silta.yml` file of your project.

Also note that increasing resources will result in increased costs, so use sensible values.

## Allocate more storage for your database.
```yaml
mariadb:
  master:
    persistence:
      size: 2G
```
Note that storage can only be increased, not decreased.

## Allocate more storage for files
```yaml
mounts:
  public-files:
    storage: 2G
```
Note that storage can only be increased, not decreased.

## Mount Drupal public files in a different location
```yaml
mounts:
  public-files:
    mountPath: `/app/web/sites/my-other-location/files`
```

## Change how often the standard Drupal cron is executed
```yaml
php:
  cron:
    drupal:
      # Run every 5 minutes
      schedule: '*/5 * * * *'
```

## Run a custom cron job
```yaml
php:
  cron:
    my-custom-cron-job:
      # Run a custom drush command at midnight
      schedule: '0 0 * * *'
      command: 'drush my-custom-command'
```

## Add aditional environment variables
```yaml
php:
  env:
    MY_VARIABLE_NAME: 'theValueOfMyVariable'
```
 
## Changing basic auth username and password

```yaml
nginx:
  basicauth:
    credentials:
      username: hello
      password: My$ecretP4ssw0rd
```

## Enable elasticsearch
```yaml
elasticsearch:
  enabled: true
```

## Enable memcached
```yaml
memcached:
  enabled: true
```

## Sanitize a table that contains sensitive information
```yaml
gdprDump:
  my_table_name:
    my_field_name:
      formatter: name
```
Here `name` is the formatter type. See https://github.com/machbarmacher/gdpr-dump/#using-gdpr-replacements for additonal formatter types.

## Skip taking reference data dumps on each deployment
```yaml
referenceData:
  updateAfterDeployment: false
```
For some sites with a lot of files, taking a reference data dump after each deployment can cause the builds to time out. Disabling `updateAfterDeployment` means new environments will be created with reference data from the previous nightly dump.

## Sending e-mail
You can use any external smtp server. Here's an example for sparkpost.
```yaml
smtp:
  enabled: true
  address: smtp.sparkpostmail.com:587
  tls: true
  username: "SMTP_Injection"
  # Encrypt this password. See: docs/encrypting_sensitive_configuration.md
  password: "MYAPIKEY"
```
Note: To get the sparkpost API key, you have to [validate your domain](https://www.sparkpost.com/docs/getting-started/setting-up-domains/) first.

## Exposed domains and SSL certificates
Various `exposeDomains` examples for SSL certificate issuers. Same structure can be reused for release `ssl` parameter too. Note: You can also use `letsencrypt-staging` issuer to avoid hitting `letsencrypt` [rate limits](https://letsencrypt.org/docs/rate-limits/).
```
exposeDomains:

- name: example-nossl
  hostname: nossl.example.com

- name: example-letsencrypt
  hostname: ssl-le.example.com
  ssl:
    enabled: true
    issuer: letsencrypt

- name: example-custom
  hostname: ssl-custom.example.com
  ssl:
    enabled: true
    issuer: custom
    key: |
      -----BEGIN PRIVATE KEY-----
      MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQC1AnQnJXBJWw3A
      (..)
      N/a90beSt0vJ6Cy+jMCVQ0s=
      -----END PRIVATE KEY-----
    crt: |
      -----BEGIN CERTIFICATE-----
      MIIDPzCCAiegAwIBAgIUe0NEJnh4ffNBsdKzT5/PTlFRoQYwDQYJKoZIhvcNAQEL
      (..)
      jyj9OmdjZTJAwwqDdcs6TaRXxQ==
      -----END CERTIFICATE-----
```
