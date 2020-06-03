# silta.yml configuration examples

The default values are documented here: https://github.com/wunderio/charts/blob/master/drupal/values.yaml

Below is a list of examples for common needs.
All examples are meant to be used in the `silta.yml` file of your project. Most of examples work with both drupal chart and frontend chart, unless name is explicitly mentioned above the code snippet. Double-check with default value files for each chart - [drupal](https://github.com/wunderio/charts/blob/master/drupal/values.yaml) and [frontend](https://github.com/wunderio/charts/blob/master/frontend/values.yaml).

Also note that increasing resources will result in increased costs, so use sensible values.

## Allocate more storage for your database.

*Drupal chart*:
```yaml
mariadb:
  master:
    persistence:
      size: 2G
```
Note that storage can only be increased, not decreased.

## Mount Drupal public files to a different location

*Drupal chart*:
```yaml
mounts:
  public-files:
    mountPath: `/app/web/sites/my-other-location/files`
```

## Enabling private files for drupal
There is a pre-built mount template for drupal private file storage in silta (check values.yaml), you just have to enable it

*Drupal chart*:
```yaml
mounts:
  private-files:
    enabled: true
```
Enabling this will mount shared storage to `/app/private` and set `$settings['file_private_path']` accordingly. See chart values for override parameters.

## Change how often the standard Drupal cron is executed

*Drupal chart*:
```yaml
php:
  cron:
    drupal:
      # Run every 5 minutes
      schedule: '*/5 * * * *'
```

## Run a custom cron job

*Drupal chart*:
```yaml
php:
  cron:
    my-custom-cron-job:
      # Run a custom drush command at midnight
      schedule: '0 0 * * *'
      command: 'drush my-custom-command'
```

*Frontend chart*:
```yaml
services:
  myservice:
    cron:
      my-custom-cron-job:
        # Run a custom command at midnight
        schedule: '0 0 * * *'
        command: 'my-custom-command'
```

## Add aditional environment variables

*Drupal chart*:
```yaml
php:
  env:
    MY_VARIABLE_NAME: 'theValueOfMyVariable'
```

*Frontend chart*:
```yaml
services:
  myservice:
    env:
      MY_VARIABLE_NAME: 'theValueOfMyVariable'
```

## Changing basic auth username and password

*Drupal chart and Frontend chart*:
```yaml
nginx:
  basicauth:
    credentials:
      username: hello
      password: My$ecretP4ssw0rd
```

## Enable elasticsearch

*Drupal chart and Frontend chart*:
```yaml
elasticsearch:
  enabled: true
```

## Enable memcached

*Drupal chart*:
```yaml
memcached:
  enabled: true
```

## Sanitize a table that contains sensitive information

*Drupal chart*:
```yaml
gdprDump:
  my_table_name:
    my_field_name:
      formatter: name
```
Here `name` is the formatter type. See https://github.com/machbarmacher/gdpr-dump/#using-gdpr-replacements for additonal formatter types.

## Skip taking reference data dumps on each deployment

*Drupal chart*:
```yaml
referenceData:
  updateAfterDeployment: false
```
For some sites with a lot of files, taking a reference data dump after each deployment can cause the builds to time out. Disabling `updateAfterDeployment` means new environments will be created with reference data from the previous nightly dump.

## Sending e-mail

Note: There is no e-mail handling for frontend chart currently. You must implement the smtp workflow via application. 

If you just want to test email, you can use mailhog:

*Drupal chart*:
```
mailhog:
  enabled: true
```

For emails to be actually sent out of the cluster, You can use any external smtp server. Here's an example for sparkpost.

*Drupal chart*:
```yaml
smtp:
  enabled: true
  address: smtp.sparkpostmail.com:587 # or smtp.eu.sparkpost.com:587
  tls: true
  username: "SMTP_Injection"
  # Encrypt this password. See: docs/encrypting_sensitive_configuration.md
  password: "MYAPIKEY"
```
Note: To get the sparkpost API key, you have to [validate your domain](https://www.sparkpost.com/docs/getting-started/setting-up-domains/) first.

If the `smtp` is configured and enabled, but it does not appear to send anything, make sure `mailhog` is not enabled.

## Exposed domains and SSL certificates
Various `exposeDomains` examples for SSL certificate issuers. Same structure can be reused for release `ssl` parameter too. 
Note: You can also use `letsencrypt-staging` issuer to avoid hitting `letsencrypt` [rate limits](https://letsencrypt.org/docs/rate-limits/).
Note 2: For custom certificates it's advised to add CA root certificate to `exposeDomains[].ssl.crt` value. Having it under `exposeDomains[].ssl.ca` is not enough.

*Drupal chart and Frontend chart*:
```yaml
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
    # Encrypt key and certificate. See: docs/encrypting_sensitive_configuration.md
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

## Adding redirects
Redirects can be relative to current domain or contain full domain for more targeted redirects when multiple external domains (`exposeDomains`) are attached to deployment, and you only need this redirect for a specific URL. Redirect URL's can have regular expressions.

*Drupal chart*:
```yaml
nginx:
  redirects:
    - from: /test1 
      to: /
    - from: http://exact-matching.example.com/test2
      to: /test2-redirect
    - from: '~://partial-matching.example.com/test3$' 
      to: /test3-redirect
    - from: ~/test4$ 
      to: https://another-domain.example.com/test4-redirect
```
