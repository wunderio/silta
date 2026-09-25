# ---------------------------------------------------------------------------
# People
#
# Silta has three very different audiences, and the model keeps them separate
# on purpose: what a product owner needs from a diagram is not what an ops
# engineer needs.
# ---------------------------------------------------------------------------

siteVisitor = person "Site visitor" "Anonymous or authenticated end user of a site hosted on Silta." "External"

contentEditor = person "Content editor" "Creates and publishes content in the hosted application." "External"

projectDeveloper = person "Project developer" "Builds and maintains a project hosted on Silta. Owns the repository, .circleci/config.yml and silta/silta.yml." ""

partnerDeveloper = person "Partner developer" "Developer outside the platform team who needs to deploy, inspect and debug a project on Silta without cluster-admin rights." ""

siltaOps = person "Silta operations engineer" "Provisions clusters, installs the silta-cluster chart, manages shared services, CI credentials and cluster access." ""

productOwner = person "Product owner" "Non-technical stakeholder. Needs to understand which environments exist, how a change reaches production, and where the boundaries of responsibility lie." "External"
