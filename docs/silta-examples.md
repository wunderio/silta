---
id: silta-examples
title: Silta examples
---

## silta.yml configuration examples

The default values are documented here:

- Drupal chart: https://github.com/wunderio/charts/blob/master/drupal/values.yaml
- Frontend chart: https://github.com/wunderio/charts/blob/master/frontend/values.yaml
- Simple chart: https://github.com/wunderio/charts/blob/master/simple/values.yaml

Below is a list of examples for common needs.
All examples are meant to be used in the `silta.yml` file of your project. Most of the examples work with both drupal chart and frontend chart, unless name is explicitly mentioned above the code snippet. Double-check with default value files for each chart - [drupal](https://github.com/wunderio/charts/blob/master/drupal/values.yaml) and [frontend](https://github.com/wunderio/charts/blob/master/frontend/values.yaml).

Also note that increasing resources will result in increased costs, so use sensible values.

## Allocate more storage for your database.

_Drupal chart_:

```yaml
mariadb:
  master:
    persistence:
      size: 2G
```

Note that storage can only be increased, not decreased.

Note 2: If you change it for existing deployment, You'll need to run special comands in cluster to expand the storage or deployment will fail (see [Mariadb or Elasticsearch running out of disk space](troubleshooting.md#mariadb-or-elasticsearch-running-out-of-disk-space) in troubleshooting page).

## Mount Drupal public files to a different location

_Drupal chart_:

```yaml
mounts:
  public-files:
    mountPath: `/app/web/sites/my-other-location/files`
```

## Enabling private files for drupal

There is a pre-built mount template for drupal private file storage in silta (check values.yaml), you just have to enable it

_Drupal chart_:

```yaml
mounts:
  private-files:
    enabled: true
```

Enabling this will mount shared storage to `/app/private` and set `$settings['file_private_path']` accordingly. See chart values for override parameters.

## Change how often the standard Drupal cron is executed

_Drupal chart_:

```yaml
php:
  cron:
    drupal:
      # Run every 5 minutes
      schedule: "*/5 * * * *"
```

## Deploy a custom service using frontend chart

While Frontend chart was originally meant to host NodeJS frontend projects, it also allows running custom docker images and optionally exposing them via nginx reverse proxy. These containers are called "services" in Frontend chart.

In this example, we are setting up two custom services - "mynodeservice" that will use a custom built image (see circleci configuration below) and "mongo" that will use prebuilt mongodb docker imageservice.

Note: This ".Values.services.mongo" service is not the same as ".Values.mongodb", it's just an example.

_Frontend chart_:

```yaml
services:
  mynodeservice:
    replicas: 1
    port: 3000
    env:
      VARIABLE: "VALUE"
    # Exposed at [hostname]/servicepath
    exposedRoute: "/servicepath"

  mongo:
    # Mongo image does not need to be built,
    # uses https://hub.docker.com/_/mongo
    image: mongo
    port: 27017
```

See `.Values.serviceDefaults` for service default values.

Service images are built at `.circleci/config.yaml`:

```yaml
workflows:
  build_deploy:
    jobs:
      - silta/frontend-build-deploy: &build-deploy
          image_build_steps:
            - silta/build-docker-image:
                dockerfile: "silta/mynodeservice.Dockerfile"
                path: "."
                identifier: "mynodeservice"
```

It is very important to understand kubernetes containers are stateless, the moment container gets restarted, it will reset the storage to contents of docker image. To persist some particular filesystem path, you need to define persistent storage at `.Values.mounts` and attach it to the service (this only applies to containers defined at `.Values.services` since other applications (`.Values.mongodb`, `.Values.mariadb`, etc.) have default configurations in chart that persist data).

In this example, we are setting up a custom "mongo" service that will use prebuilt mongodb docker imageservice.

Note: This ".Values.services.mongo" service is not the same as ".Values.mongodb", it's just an example.

_Frontend chart_:

```yaml
services:
  mongo:
    # Mongo image does not need to be built,
    # uses https://hub.docker.com/_/mongo
    image: mongo
    port: 27017
    mounts:
      - mongodb-data
    strategy:
      type: Recreate

mounts:
  mongodb-data:
    enabled: true
    storage: 5Gi
    mountPath: /data/db
    # GKE storage class
    storageClassName: standard
    accessModes: ReadWriteOnce
```

- `storageClassName` is only available on GKE. AWS and other cloud providers have different storageclasses, so it depends on cloud provider. There are several options and they differ by access (read / write) speed. `standard` is a safe choice.
- `accessModes` depends on storageClass. `standard` on GKE provides `ReadWriteOnce`. See https://kubernetes.io/docs/concepts/storage/persistent-volumes/#access-modes for more information
- `.Values.services.mongo.strategy.type: Recreate` is required for "read write once" type storage mounts, because they only allow mounting storage once, but default strategy for services is `RollingUpdate` and it would fail deployment. See https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#strategy for more information.

## Run a custom cron job

_Drupal chart_:

```yaml
php:
  cron:
    my-custom-cron-job:
      # Run a custom drush command at midnight
      schedule: "0 0 * * *"
      command: "drush my-custom-command"
```

_Frontend chart_:

```yaml
services:
  myservice:
    cron:
      my-custom-cron-job:
        # Run a custom command at midnight
        schedule: "0 0 * * *"
        command: "my-custom-command"
```

## Add additional environment variables

_Drupal chart_:

```yaml
php:
  env:
    MY_VARIABLE_NAME: "theValueOfMyVariable"
```

_Frontend chart_:

```yaml
services:
  myservice:
    env:
      MY_VARIABLE_NAME: "theValueOfMyVariable"
```

## Change basic auth username and password

_Drupal chart and Frontend chart_:

```yaml
nginx:
  basicauth:
    credentials:
      username: hello
      password: My$ecretP4ssw0rd
```

## Enable elasticsearch

_Drupal chart and Frontend chart_:

```yaml
elasticsearch:
  enabled: true
```

## Using plugins with Elasticsearch

**Create a custom elasticsearch dockerfile to silta/elasticsearch.Dockerfile:**

```
ARG ES_VERSION=7.17.0
FROM docker.elastic.co/elasticsearch/elasticsearch:${ES_VERSION}
ARG ES_VERSION

USER root

# Install Elasticsearch plugins
RUN elasticsearch-plugin install analysis-icu

USER elasticsearch
```

**Build the custom Elasticsearch image in CircleCI:**

When using `silta/drupal-build-deploy`:

```
      - silta/drupal-build-deploy:
          pre-release:
            - silta/build-docker-image:
                dockerfile: silta/elasticsearch.Dockerfile
                tag: with-plugins
                identifier: elasticsearch
                expose_image: false
```

When using `silta/frontend-build-deploy`:

```
      - silta/frontend-build-deploy:
          image_build_steps:
            - silta/build-docker-image:
                dockerfile: silta/elasticsearch.Dockerfile
                tag: with-plugins
                identifier: elasticsearch
                expose_image: false
```

**Use the custom elasticsearch image in your silta helm charts file:**

The container URL could be found in the CircleCI container build information.

```
elasticsearch:
  enabled: true
  image: <CONTAINER-URL>
  imageTag: 'with-plugins'
  imagePullPolicy: Always
```

## Enable memcached

_Drupal chart_:

```yaml
memcached:
  enabled: true
```
Adjust resources and arguments as needed
```
  resources:
    requests:
      cpu: 150m
      memory: 1200M
    limits:
      cpu: 250m
      memory: 1500M
  arguments:
    - /run.sh
    # MaxMemoryLimit, this should be less than the resources.limits.memory, or memcached will crash.
    - -m 1200
    # MaxItemSize
    - -I 16M
```

Modify settings.php file (example is from D9)
```
/**
 * Set the memcache server hostname when a memcached server is available.
 */
if (getenv("SILTA_CLUSTER") && getenv('MEMCACHED_HOST')) {
  $settings['memcache']['servers'] = [getenv('MEMCACHED_HOST') . ':11211' => 'default'];

  // Set the default cache backend to use memcache if memcache host is set and
  // if one of the memcache libraries was found. Cache backends should not be
  // set to memcache during installation. The existence of the memcache drupal
  // module should also be checked but this is not possible until this issue
  // has been fixed: https://www.drupal.org/project/drupal/issues/2766509
  if (!InstallerKernel::installationAttempted() && (class_exists('Memcache', FALSE) || class_exists('Memcached', FALSE))) {
    $settings['cache']['default'] = 'cache.backend.memcache';
  }

  /**
   * Memcache configuration.
   */
  if (class_exists('Memcached', FALSE)) {
    $settings['memcache']['extension'] = 'Memcached';
    // Memcached PECL Extension Support.
    $settings['memcache']['options'] = [
      // Enable compression for PHP 7.
      \Memcached::OPT_COMPRESSION => TRUE,
      \Memcached::OPT_DISTRIBUTION => \Memcached::DISTRIBUTION_CONSISTENT,
      // Decrease latency.
      \Memcached::OPT_TCP_NODELAY => TRUE,
    ];
  }
}
```
For D7 use
```
  if (getenv('MEMCACHED_HOST')) {
    if (class_exists('Memcache', FALSE) || class_exists('Memcached', FALSE)) {
      $conf['memcache_servers'] = [getenv('MEMCACHED_HOST') . ':11211' => 'default'];
    }
  }
```

## Using varnish

_Drupal chart_:

```yaml
varnish:
  enabled: true
```

If extra cookies are needed, they can be defined in a vcl_extra_cookies variable:

```yaml
varnish:
  vcl_extra_cookies: |
    if (req.http.Cookie ~ "extra_cookie_name") {
      return (pass);
    }
```

When varnish is enabled in silta config, drupal configuration needs to be adjusted, so purge can find the varnish server.

**Using [varnish](https://www.drupal.org/project/varnish) module:**

_You should consider using purge module instead_
No adjustments needed

**Using [varnish_purge](https://www.drupal.org/project/varnish_purge) module:**

1. Add varnish purger to purge settings.
2. Find purger configuration name. You can see it by hovering over the configuration link (i.e. `1b619ba479`). This will be Your `<PURGER_ID>`.
3. Put this snippet into your `settings.php` file:

```php
if (getenv('SILTA_CLUSTER') && getenv('VARNISH_ADMIN_HOST')) {
  $config['varnish_purger.settings.<PURGER_ID>']['hostname'] = trim(getenv('VARNISH_ADMIN_HOST'));
  $config['varnish_purger.settings.<PURGER_ID>']['port'] = '80';
}
```

Make sure to replace `<PURGER_ID>` with an actual id of purger configuration!

**Changing varnish default control-key value**

This can be done by adding `secret` variable.

```yaml
varnish:
  secret: "my-secret-key"
```

Please remember: best practice is to encrypt secrets.

**Changing varnish cache backend**

The current default cache backend is set to file storage. The setting is exposed in values file and can be changed. Here are few examples:

```yaml
varnish:
  resources:
    requests:
      memory: 768Mi
  # Memory allocated storage. Make sure to adjust varnish memory allocation too (see above)
  storageBackend: 'malloc,512m'
  # Disc allocated storage.
  storageBackend: 'file,/var/lib/varnish/varnish_storage.bin,512M'
```

## Using Redis

By default, redis service does not set max memory value. You can do it by setting flags:

```yaml
redis:
  enabled: true
  master:
    persistence:
      size: 2Gi
    extraFlags:
      - "--maxmemory-policy allkeys-lru"
      - "--maxmemory 1700mb"
```

## Skip taking reference data dumps on each deployment

_Drupal chart_:

```yaml
referenceData:
  updateAfterDeployment: false
```

For some sites with a lot of files, taking a reference data dump after each deployment can cause the builds to time out. Disabling `updateAfterDeployment` means new environments will be created with reference data from the previous nightly dump.

## Sending e-mail

Note: There is no e-mail handling for frontend chart. You must implement the smtp workflow via application.

If you just want to test email, you can use mailhog:

_Drupal chart_:

```yaml
mailhog:
  enabled: true
```

Mailhog access information will be printed in release notes.

For emails to be actually sent out of the cluster, you can use any external smtp server. Here's an example for sparkpost.

_Drupal chart_:

```yaml
smtp:
  enabled: true
  address: smtp.sparkpostmail.com:587 # or smtp.eu.sparkpost.com:587
  tls: true
  # When using smtp.office365.com:587 instead of sparkpost both tls and starttls need to be set to "YES".
  # tls: "YES"
  # starttls: "YES"
  username: "SMTP_Injection"
  # Encrypt this password. See: docs/encrypting_sensitive_configuration.md
  # Please note that when using smtp.office365.com:587, password may not contain following special characters =, :, or #
  password: "MYAPIKEY"
```

Note: To get the sparkpost API key, you have to [validate your domain](https://www.sparkpost.com/docs/getting-started/setting-up-domains/) first.

Note 2: Because of [long-standing bugs in the ssmtp package](https://serverfault.com/questions/826875/what-characters-are-illegal-in-password-in-ssmtp-conf), the smtp password cannot contain the special characters `#`, `=` or `:`.

If the `smtp` is configured and enabled, but it does not appear to send anything, make sure `mailhog` is not enabled.

## Domain names and SSL certificates

All environments are given a hostname by default. It is possible to attach a custom domain name to environment by configuring `exposeDomains` configuration parameter. All hostnames attached to environment are printed in release notes.

Note: You can also use `letsencrypt-staging` issuer to avoid hitting `letsencrypt` [rate limits](https://letsencrypt.org/docs/rate-limits/).

Note 2: For custom certificates it's advised to add CA root certificate to `exposeDomains[].ssl.crt` value. Having it under `exposeDomains[].ssl.ca` is not enough.

Note 3: Deploy `exposeDomains` entries only when DNS entries are changed or are soon to be changed. Otherwise, Letsencrypt validation might eventually get stuck due to retries.

Note 4: Put `exposeDomains` in a dedicated configuration yaml file, so only one environment (branch) would be assigned this hostname. Having multiple environments with the same domain will act as a round robin load balancer for all environments and unexpected responses might be returned.

_Drupal chart and Frontend chart_:

```yaml
exposeDomains:
  example-le:
    hostname: ssl-le.example.com
    ssl:
      enabled: true
      issuer: letsencrypt

  example-customcert:
    hostname: ssl-custom.example.com
    ssl:
      enabled: true
      issuer: custom
      # Encrypt key and certificate. See: docs/encrypting_sensitive_configuration.md
      ca: |
        -----BEGIN CERTIFICATE-----
        < CA CHAIN ROOT >
        -----END CERTIFICATE-----
        -----BEGIN CERTIFICATE-----
        < CA CHAIN RCA >
        -----END CERTIFICATE-----
        -----BEGIN CERTIFICATE-----
        < CA CERTIFICATE >
        -----END CERTIFICATE-----
      key: |
        -----BEGIN RSA PRIVATE KEY-----
        <KEY>
        -----END RSA PRIVATE KEY-----

      crt: |
        -----BEGIN CERTIFICATE-----
        < CERTIFICATE >
        -----END CERTIFICATE-----
        -----BEGIN CERTIFICATE-----
        < CA CHAIN ROOT >
        -----END CERTIFICATE-----
        -----BEGIN CERTIFICATE-----
        < CA CHAIN RCA >
        -----END CERTIFICATE-----
        -----BEGIN CERTIFICATE-----
        < CA CERTIFICATE >
        -----END CERTIFICATE-----
```

If you have same SSL certificate for multiple domains You can reuse `ssl` block. 
```yaml
exposeDomains:
  example-customcert: &shared-ssl
    ssl:
      [....]
  example-anothercert:
    <<: *shared-ssl
```


You don't need a custom static ip (via gce ingress) normally, but if Your project requires, here's how -

```yaml
exposeDomains:
  example-gce-ingress:
    hostname: gce-ingress.example.com
    # see ingress.gce definition. This can also be a custom ingress too.
    ingress: gce
    ssl:
      enabled: true
      issuer: letsencrypt

ingress:
  gce:
    # Request a global static ip from OPS team first
    staticIpAddressName: custom-ip-name

nginx:
  # Reverse proxy IP's to trust with contents of X-Forwarded-For header
  realipfrom:
    gke-internal: 10.0.0.0/8
    # Load Balancer IP (static ip you were given)
    gce-lb-ip: 1.2.3.4/32;

# Depending on the cluster type, You might need to enable this.
# A safe default is "false" (works in both cases), but "VPC Native"
# clusters work more correcly with cluster.vpcNative set to "true".
cluster:
  vpcNative: true
```

## Add redirects

Redirects can be relative to current domain or contain full domain for more targeted redirects when multiple external domains (`exposeDomains`) are attached to deployment, and you only need this redirect for a specific URL.

If you are scattering the redirect rules into separate yaml's, use keys (or the latter yaml will overwrite the whole `nginx.redirects` object) and the alphabetical order of keys will be respected in the nginx redirect map. Because of this, it's better to put everything in one file without keys, just descriptions and the order of the yaml will be respected.

Each redirect has `from` and `to` keys, and an optional `description` key, which does not do anything currently, it's a documentation comment for configuration maintainer.

#### `from`
By default, strings are matched using case-insensitive exact matching.

Regular expressions can be used by prefixing the value with `~` for a case-sensitive matching, or with `~*` for case-insensitive matching. Regular expressions can contain named and positional captures that can be referenced in the `to` value.

Make sure to use proper anchors (`^` and `$`) and character escaping in regular expressions, to get exactly the match you want and nothing extra.

- Bad example: `from: '~/old-page` matches any string containing `/old-page`, e.g. `/anypath/old-page` or `/old-page/anypath` or even `/valid/path?/old-page`.
- Good example: `from: ~^/old-page/.+\.html` matches specifically path `/old-page/*.html`.

#### `to`
Can include references to captured values from regular expressions, and special [nginx variables](http://nginx.org/en/docs/http/ngx_http_core_module.html#variables) like `$request_uri`or `$query_string`.

_Drupal chart and Frontend chart_:

```yaml
nginx:
  redirects:
    - description: 'Redirect exact path match to another path on same the domain.'
      from: '/old-page'
      to: '/new-page'
    - description: 'Redirect exact path match to another path on another the domain.'
      from: '/old-page'
      to: 'https://another-domain.example.com/new-page'
    - description: 'Redirect exact url match to another path on same the domain. Note: Matching using https does not work because of SSL/TLS offloading.'
      from: 'http://example.com/old-page'
      to: '/new-page'
    - description: 'Redirect all non-www requests to www, keeping the request path intact.'
      from: '~^http://example\.com'
      to: 'https://www.example.com$request_uri'
    - description: 'Redirect exact url, matching both www and non-www.'
      from: '~http://(www\.)?example\.com/old-page$'
      to: '/new-page'
    - description: 'Redirect case-insensitive url match.'
      from: '~*http://www\.example\.com/oLd-pAgE$'
      to: '/new-page'
    - description: 'Redirect regex match, using positional capturing groups.'
      from: '~^/old-articles/(.+)/view/(\d+)$'
      to: '/new-articles/$1/?article_id=$2'
    - description: 'Redirect regex match, using named capturing groups.'
      from: '~^/old-articles/(?<date>.+)/view/(?<id>\d+)$'
      to: '/new-articles/$date/?article_id=$id'

```

## Allowing cross-namespace / cross-deployment connections

Resources in Silta charts are protected by [Calico NetworkPolicy](https://projectcalico.docs.tigera.io/security/calico-network-policy) rules. Rules are defined in helm `.Values.silta-release.ingressAccess` configuration object. There are few default rules that deny access to all pods in deployment from other deployments, but it is also possible to add extra [NetworkPolicy rules] (https://projectcalico.docs.tigera.io/security/policy-rules) to selecively allow access to deployment resources.

Here are few examples:

1. Allowing access to pods from another namespace:

```yaml
silta-release:
  ingressAccess:
    # Allow Frontend access to Drupal via internal connection 
    allow-drupal:
      additionalPodSelector:
        app: drupal
      from:
        - namespaceSelector:
            matchLabels:
              name: frontend-ns
``` 

2. Allow direct elasticsearch access from frontend namespace 
```
silta-release:
  # Allow Frontend access to elasticsearch via internal connection 
  allowESaccess:
    additionalPodSelector:
      chart: elasticsearch
    from:
      - namespaceSelector:
          matchLabels:
              name: frontend-ns
```

3. Allow CIDR access to service (routed connection only, does not work with NAT'ted connections)
```yaml
silta-release:
  # Allow Azure Application Gateway to drupal service
  ingressAccess:
    CustomAzureAppGWAccess:
      from:
        - ipBlock:
            cidr: 1.2.3.4/5
```


## Add custom include files for nginx

Drupal chart builds nginx container using web/ folder as build context. This prevents files being included from outside the web folder and it's not a good idea to put config files under it.
To be able to add include files the build context needs to be changed from `web/` into `.` by passing `nginx_build_context: "."` to `drupal-docker-build` in `.circleci/config.yml`:

```yaml
jobs:
  - silta/drupal-docker-build:
      nginx_build_context: "."
```

Due root containing Drupal / shell container compatible .dockerignore file and for frontend there is a separate one inside the web/ folder this doesn't work anymore. Since version 19.03 Docker supports separate .dockerignore files for each Dockerfile. This requires Docker build to be made with BuildKit enabled. To enable BuildKit just pass the `DOCKER_BUILDKIT=1` to the build environment as an environment variable:

```yaml
environment:
  DOCKER_BUILDKIT: 1
```

The ignore file itself needs to be named the same as the Dockerfile with .dockerignore appended to the end and need to reside at the same place as the Dockerfile:

```bash
cp web/.gitignore silta/nginx.Dockerfile.dockerignore
```

Note: our validation checks if the .dockerignore is present under web/ so you can either leave it there or just add an empty file in it's place.
To make the image to build correctly in this new context you need to update the COPY command in the nginx.Dockerfile to copy `web` instead of `.` and also add COPY commands to any custom config files you want to be able to include:

```
COPY silta/nginx.serverextra.conf /etc/nginx

COPY web /app/web
```

Now you can include the config file in silta.yml like this:

```yaml
nginx:
  serverExtraConfig: |
    include nginx.serverextra.conf;
```

or if you `COPY` the file under `/etc/nginx/conf.d` they will be included automatically without the need to add them to silta.yml configs.

## Deploy sub-project from the same repo using simple chart

Having e.g. Storybook or other frontend application included in the base project codebase that require
separate deployment can be easily done even using different chart.
See [https://wunderio.github.io/silta/docs/circleci-conf-examples](circleci-examples.md) for the deployment setup part.

When using different charts (e.g. drupal and simple) you need to separate chart specific configurations to their own silta-\*.yml files if you want to share any configs between the application deployments (for example basic auth credentials). Best way to do it is to put only the shared configurations to the silta.yml file and have e.g. silta-cms.yml and silta-storybook.yml for application specific configurations.

## Add custom subcharts to deployment

1. In `silta` folder, create `extra_charts.yml` which contains list of subcharts to add.

Following examples add a redis subchart to drupal chart deployment.
```yaml
charts:
- name: redis
  version: 16.8.x
  repository: https://charts.bitnami.com/bitnami
  condition: redis.enabled
```


To use a local subchart, replace repository link with `file://<path>/<to>/<subchart>`


2. Add these 2 parameters to `drupal-build-deploy` CircleCI job:
```yaml
      - silta/drupal-build-deploy:
          source_chart: wunderio/drupal
          extension_file: silta/extra_charts.yml
```

3. If desired, modify variables for the subchart in `silta.yml` under the key of subcharts' name. For example above, it's `redis`.
```yaml
[..]
redis:
  enabled: true
  auth:
    password: test
```
*Sets redis password to test*

Notice the `condition` key in `extra_charts.yml` for the redis subchart. It makes it possible to deploy this subchart conditionally, when `redis: enabled` is passed in `silta.yml`. 

Delete the `condition: redis.enabled` line if you want this subchart installed in all your future deployments, regardless of settings in `silta.yml`.
