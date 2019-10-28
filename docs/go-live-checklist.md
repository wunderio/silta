
# Go-live checklist

These are the Silta-specific steps that should be checked before going live. 
Note that this list does not include application-specific steps 
(for example making sure that the root account of the CMS is disabled).

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
- BasicAuth is disabled