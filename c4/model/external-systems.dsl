# ---------------------------------------------------------------------------
# External systems
#
# Everything Silta depends on but does not operate. Anything listed here is a
# supplier boundary: it is someone else's SLA.
# ---------------------------------------------------------------------------

github = softwareSystem "GitHub" "Hosts project repositories, the Silta charts, images and CLI sources. Also the identity provider for developer SSH and dashboard login, and the source of branch/PR webhooks." "External"

circleci = softwareSystem "CircleCI" "Cloud CI service that runs validation, build and deployment jobs. Holds the cluster and registry credentials in shared Contexts." "External"

cdn = softwareSystem "CDN" "Optional content delivery / edge layer in front of a production site: Fastly, AWS CloudFront or Cloudflare. Terminates TLS for the public domain and forwards cache misses to the cluster ingress." "External,Optional"

publicDns = softwareSystem "DNS" "Public DNS. Holds the wildcard record for the cluster domain and the customer's own domains." "External"

letsencrypt = softwareSystem "Let's Encrypt" "ACME certificate authority used by cert-manager to issue and renew certificates. Custom or CDN-managed certificates are the alternative." "External"

smtpRelay = softwareSystem "SMTP relay" "Transactional mail delivery for production environments. Non-production environments trap mail locally instead." "External"

imageRegistry = softwareSystem "Container registry" "Stores project images built by CI and the Silta base images. Google Artifact Registry / GCR, Amazon ECR, Azure ACR, Docker Hub or a self-hosted registry." "External"

objectStorage = softwareSystem "Cloud object storage" "Bucket storage backing the silta-shared storage class: public and private files, database backups and reference data. GCS, S3, Azure Blob/Files or UpCloud Object Storage." "External"

monitoring = softwareSystem "Monitoring and metrics" "Cluster and application observability: VictoriaMetrics and Grafana, optionally Instana." "External"

codeAnalysis = softwareSystem "SonarQube" "Optional static analysis service invoked from the CI analyze job." "External"

hub = softwareSystem "Silta Hub" "Central service that collects cluster inventory and telemetry from every Silta cluster and coordinates release data synchronisation between environments. Internals are out of scope for this baseline." ""
