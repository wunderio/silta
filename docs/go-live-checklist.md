
# Go-live checklist

These are the Silta-specific steps that should be checked before going live.
Note that this list does not include application-specific steps
(for example making sure that the root account of the CMS is disabled).

The production environment only costs more when it requests additional resources.
We recommend setting up and using the production branch early in the project so any issues are
identified as soon as possible.

## Github
- Set up deletion protection for the master and production branches.
- Make sure the required people are added to the group which has access to the production CircleCI context.

## Resources
- Make sure all services have dedicated resources:
  - PHP / Javascript
  - MariaDB
  - Elasticsearch / Memcached / etc.
- Make sure relevant services are using autoscaling with at least two replicas
  for high availability.
- Do a basic load test to make sure that autoscaling works.

# Configuration
- NewRelic APM is configured
- Sparkpost key is set
- Backups are enabled
- Make sure the production static IP is set up if any whitelisting is needed for third-party integrations

# Web access
- Recommended: set up a `beta.example.com` domain that can be used to test the process of configuring DNS.
- Domain names are set in silta.yml, configured to use SSL with letsencrypt or custom certifcates
- Some time before switching the DNS, set the TTL of any existing DNS entries to be short, like 1 minute (cached DNS
entries can cause a variety of issues, like failing letsencrypt DNS challenges).
- BasicAuth is disabled
