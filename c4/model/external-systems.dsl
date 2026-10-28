# ---------------------------------------------------------------------------
# External systems
#
# Everything Silta depends on but does not operate. Anything listed here is a
# supplier boundary: it is someone else's SLA.
#
# Exceptions, untagged and therefore not grey: the observability stack and
# Silta Hub are run by the Silta team, but sit outside the systems modelled
# in detail here.
# ---------------------------------------------------------------------------

github = softwareSystem "GitHub" "Hosts project repositories, the Silta charts, images and CLI sources. Also the identity provider for developer SSH, one of the OIDC providers for dashboard login, and the source of branch/PR webhooks." "External"

circleci = softwareSystem "CircleCI" "Cloud CI service that runs validation, build and deployment jobs. Holds the cluster and registry credentials in shared Contexts." "External"

cdn = softwareSystem "CDN" "Optional content delivery / edge layer in front of a production site: Fastly, AWS CloudFront or Cloudflare. Terminates TLS for the public domain and forwards cache misses to the cluster ingress." "External,Optional"

publicDns = softwareSystem "DNS" "Public DNS. Holds the wildcard record for the cluster domain and the customer's own domains." "External"

letsencrypt = softwareSystem "Let's Encrypt" "ACME certificate authority used by cert-manager to issue and renew certificates. Custom or CDN-managed certificates are the alternative." "External"

smtpRelay = softwareSystem "SMTP relay" "Transactional mail delivery for production environments. Non-production environments trap mail locally instead." "External"

imageRegistry = softwareSystem "Container registry" "Stores project images built by CI and the Silta base images. Google Artifact Registry / GCR, Amazon ECR, Azure ACR, Docker Hub or a self-hosted registry." "External"

objectStorage = softwareSystem "Cloud object storage" "Bucket storage backing the silta-shared storage class: public and private files, database backups and reference data. GCS, S3, Azure Blob/Files or UpCloud Object Storage." "External"

monitoring = softwareSystem "Observability stack" "Central log, event and metric storage on the silta-operations cluster. OpenTelemetry collectors in each cluster ship data through vmproxy, which tags it by project and scopes queries per user, into VictoriaMetrics and VictoriaLogs. Grafana on top." ""

hub = softwareSystem "Silta Hub" "Central service that collects image and service inventory and telemetry from clusters running the optional Hub agent, typically those the dashboard does not connect to directly. Internals are out of scope for this baseline." ""
