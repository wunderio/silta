# ---------------------------------------------------------------------------
# Project environment
#
# One Helm release = one environment = one git branch. A project namespace
# holds many of these side by side (production, master, and one per open
# feature branch), all built from the same chart with different values.
#
# This is the system client-specific workspaces extend most often: extra
# services, extra datastores, a different application runtime.
# ---------------------------------------------------------------------------

projectApp = softwareSystem "Project environment" "A single deployed environment of a hosted project — one Helm release of the drupal, frontend or simple chart, created per git branch and torn down with it." {

    varnish = container "Varnish" "HTTP cache in front of the web server. Off by default; enabled for production traffic where a CDN is not doing the caching." "Varnish" "Optional"

    webserver = container "Web server" "Serves static assets and public files, enforces basic auth on non-production environments, and hands dynamic requests to the application runtime." "nginx"

    waf = container "WAF agent" "Optional Signal Sciences agent running beside nginx to inspect requests." "Signal Sciences agent" "Optional"

    appRuntime = container "Application runtime" "The project's own code, baked into an image at build time. PHP-FPM for Drupal, Node.js for frontend projects, static content for simple projects." "PHP-FPM / Node.js"

    shell = container "Shell" "Long-running container with the same codebase and credentials as the runtime. The target of SSH sessions, drush commands and manual maintenance." "PHP CLI / drush"

    database = container "Database" "The application database. A single-pod MariaDB by default, a Percona XtraDB cluster or a managed cloud database for production-grade environments." "MariaDB / Percona XtraDB" "Database"

    searchEngine = container "Search engine" "Full-text index for the application." "Elasticsearch / Solr" "Optional,Database"

    cacheStore = container "Object cache" "Application-level cache backend." "Memcached / Redis" "Optional,Database"

    mailTrap = container "Mail trap" "Captures all outgoing mail in non-production environments so test content never reaches real recipients, and exposes a web UI to read it." "Mailpit / MailHog" "Optional"

    clamav = container "Virus scanner" "Scans uploaded files before they are accepted." "ClamAV" "Optional"

    scheduledJobs = container "Scheduled jobs" "CronJobs owned by the release: application cron, nightly database and file backups with retention, and reference-data refresh that seeds preview environments from a sanitised copy of a reference environment." "Kubernetes CronJob"

    sharedFiles = container "Shared file storage" "ReadWriteMany volumes on the silta-shared storage class: public files, private files, backups and reference data. Shared by every pod of the release." "PersistentVolumeClaim"

    releasePolicy = container "Release network policy" "NetworkPolicies from the silta-release library chart that isolate each release, allowing only the ingress controller, the jump server and explicitly listed peers in." "Kubernetes NetworkPolicy"
}
