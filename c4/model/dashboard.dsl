# ---------------------------------------------------------------------------
# Silta Dashboard
#
# The self-service window into the clusters. Notably, the dashboard is itself
# deployed as an ordinary Silta project — it has a silta.yml like any other.
# ---------------------------------------------------------------------------

dashboard = softwareSystem "Silta Dashboard" "Web application that lets developers and stakeholders see the environments in a cluster, read environment logs and events and manage their own cluster access, without kubectl or cluster-admin rights." {

    dashWeb = container "Dashboard SPA" "Single-page app listing clusters, projects, releases, and environment logs and events." "React"

    dashBackend = container "Dashboard backend" "Authenticates users against configured OIDC providers like GitHub, Google or others, holds sessions, talks to each cluster's API with a scoped service account, and provisions per-user cluster RBAC and CI access." "Go"

    dashSyncStorage = container "Sync storage service" "Holds the artefacts exchanged when data is synchronised between environments." "Go"

    dashSessions = container "Session store" "Session and account-mapping storage for the backend." "MongoDB" "Database"
}
