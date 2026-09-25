# ---------------------------------------------------------------------------
# Relationships
#
# Kept in one file so the flow of the platform can be read end to end, and so
# client workspaces have a single place to look before adding their own.
# ---------------------------------------------------------------------------

# --- People -> systems -----------------------------------------------------

siteVisitor -> cdn "Requests pages from" "HTTPS"
siteVisitor -> projectApp "Requests pages from, when no CDN is in front" "HTTPS"
contentEditor -> projectApp "Creates and publishes content in" "HTTPS"

projectDeveloper -> github "Pushes code, silta.yml and encrypted values to" "Git over SSH"
projectDeveloper -> circleci "Watches and re-runs pipelines in" "HTTPS"
projectDeveloper -> dashboard "Inspects environments and reads logs in" "HTTPS"
projectDeveloper -> sshJumpServer "Opens a shell session in an environment through" "SSH"
projectDeveloper -> docsSite "Learns how to configure a project from" "HTTPS"

partnerDeveloper -> github "Pushes to the project repository in" "Git over SSH"
partnerDeveloper -> dashboard "Requests and uses scoped cluster access via" "HTTPS"
partnerDeveloper -> docsSite "Onboards onto the platform using" "HTTPS"
partnerDeveloper -> sshJumpServer "Opens a shell session in an environment through" "SSH"

productOwner -> projectApp "Reviews a branch preview environment before release" "HTTPS"
productOwner -> dashboard "Sees which environments exist and what state they are in" "HTTPS"

siltaOps -> silta "Installs and operates the silta-cluster release in" "Helm / kubectl"
siltaOps -> dashboard "Grants and revokes developer cluster access in" "HTTPS"
siltaOps -> circleci "Maintains the shared credential Contexts in" "HTTPS"
siltaOps -> monitoring "Watches cluster health in" "HTTPS"

# --- Toolchain: how a commit becomes an environment ------------------------

github -> circleci "Triggers a pipeline on push" "Webhook / HTTPS"
github -> deploymentRemover "Notifies of deleted branches and closed pull requests" "Webhook / HTTPS"

circleci -> orb "Resolves the pipeline definition from" "CircleCI orb registry"
circleci -> builderImage "Runs every job inside" "Docker"
orb -> cli "Delegates all build and deployment steps to" "Shell"
builderImage -> cli "Bundles" ""

cli -> github "Checks out the project codebase from" "Git over HTTPS"
cli -> imageRegistry "Builds and pushes the project images to" "Docker Registry API"
cli -> chartRepo "Downloads and optionally extends the packaged chart from" "HTTPS"
cli -> codeAnalysis "Submits scan results to, in the analyze job" "HTTPS"
cli -> silta "Authenticates against the cluster and applies the release with" "Kubernetes API / Helm"
cli -> projectApp "Creates, upgrades and deletes the environment's Helm release" "Helm 3"

charts -> chartRepo "Are packaged and published to" "CI"
charts -> projectApp "Define every resource of" "Helm templating"
charts -> silta "Define the shared services of" "Helm templating"
baseImages -> imageRegistry "Are published to" "CI"
baseImages -> appRuntime "Are the base layer of" "Docker"

# --- Request path ----------------------------------------------------------

cdn -> ingressController "Forwards cache misses to the cluster origin" "HTTPS"
publicDns -> ingressController "Resolves cluster and project hostnames to the load balancer of" "DNS"
ingressController -> varnish "Routes requests to, when the cache is enabled" "HTTP"
ingressController -> webserver "Routes requests to" "HTTP"
varnish -> webserver "Forwards cache misses to" "HTTP"
webserver -> appRuntime "Passes dynamic requests to" "FastCGI / HTTP"
webserver -> sharedFiles "Serves public files from" "Filesystem"
webserver -> waf "Mirrors requests to the inspection sidecar" "Unix socket"

appRuntime -> database "Reads from and writes to" "MySQL protocol"
appRuntime -> cacheStore "Caches rendered data in" "Memcached / Redis protocol"
appRuntime -> searchEngine "Indexes into and queries" "HTTP"
appRuntime -> sharedFiles "Reads and writes uploaded files in" "Filesystem"
appRuntime -> clamav "Scans uploads with" "TCP"
appRuntime -> mailTrap "Sends mail to, in non-production environments" "SMTP"
appRuntime -> smtpRelay "Sends mail through, in production" "SMTP"
appRuntime -> siltaProxy "Makes outbound calls through, when a fixed egress IP is required" "HTTP CONNECT"
appRuntime -> monitoring "Exposes metrics and logs to" "HTTP"

# --- Inside a release ------------------------------------------------------

shell -> database "Runs drush, SQL and migrations against" "MySQL protocol"
shell -> sharedFiles "Reads and writes files in" "Filesystem"
scheduledJobs -> database "Dumps, sanitises and restores" "MySQL protocol"
scheduledJobs -> sharedFiles "Writes backups and reference data to" "Filesystem"
scheduledJobs -> appRuntime "Runs application cron in" "HTTP / CLI"
releasePolicy -> webserver "Restricts inbound traffic to" "NetworkPolicy"

# --- Cluster services -> environments --------------------------------------

certManager -> letsencrypt "Requests and renews certificates from" "ACME HTTP-01"
certManager -> ingressController "Supplies TLS certificates to" "Kubernetes secret"
csiRclone -> objectStorage "Mounts buckets as ReadWriteMany volumes from" "rclone"
csiRclone -> sharedFiles "Provisions" "CSI"
minio -> csiRclone "Serves as the S3 backend for, when no managed bucket service is used" "S3"
nfsProvisioner -> sharedFiles "Provisions, as an alternative to csi-rclone" "NFS"
downscaler -> projectApp "Scales idle environments to zero and wakes them on the next request" "Kubernetes API"
deploymentRemover -> projectApp "Deletes the release, its resources and its storage when the branch is gone" "Kubernetes API / Helm"
sshJumpServer -> shell "Proxies authorised developer sessions into" "SSH"
sshJumpServer -> sshKeyServer "Fetches the authorised key set from" "HTTPS"
sshKeyServer -> github "Reads organisation members and their public keys from" "GitHub API"
inClusterRegistry -> appRuntime "Supplies images to, on clusters without a managed registry" "Docker Registry API"
splash -> ingressController "Answers unmatched hostnames behind" "HTTP"
controllerSidecars -> scheduledJobs "Terminates sidecars of, so batch pods can complete" "Kubernetes API"
dbOperator -> database "Provisions and reconciles clustered" "Kubernetes API"
hubAgent -> hub "Reports cluster inventory and telemetry to" "HTTPS"
hubAgent -> projectApp "Triggers scheduled data synchronisation jobs in" "Kubernetes API"

# --- Dashboard -------------------------------------------------------------

dashWeb -> dashBackend "Calls" "JSON/HTTPS"
dashBackend -> dashSessions "Stores sessions and account mappings in" "MongoDB wire protocol"
dashBackend -> dashSyncStorage "Stores and retrieves synchronisation artefacts in" "HTTPS"
dashBackend -> github "Authenticates users and reads organisation membership from" "OAuth 2.0"
dashBackend -> circleci "Provisions project access credentials in" "CircleCI API"
dashBackend -> silta "Reads workloads, logs and events from, with a scoped service account" "Kubernetes API"
dashBackend -> projectApp "Streams container logs of" "Kubernetes API"
