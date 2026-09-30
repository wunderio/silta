## Overview

Silta is a hosting platform built on Kubernetes. It takes a git repository
with two configuration files in it — `.circleci/config.yml` and
`silta/silta.yml` — and gives every branch of that repository its own running
environment, complete with a database, storage, TLS and a URL.

Three things are worth understanding before reading any of the diagrams.

**A branch is an environment.** There is no fixed set of servers called "dev"
and "staging". Pushing a branch creates a Helm release; deleting the branch
deletes it again. Production is simply the release built from the `production`
branch, with extra values applied.

**The chart is the contract.** Projects do not describe infrastructure. They
override values in a Helm chart that the platform owns. That is why the same
project deploys unchanged to Google, AWS, Azure or UpCloud: the chart absorbs
the difference, and the CI pipeline only changes which credentials it uses.

**The cluster is shared, the release is isolated.** Ingress, certificates,
shared storage, SSH access and the cost-control automation are installed once
per cluster and serve every project in it. Each release is fenced off from its
neighbours by NetworkPolicies.

### Where the money goes, and who owns what

Non-production environments are scaled to zero when nobody is using them and
woken up by the next request that arrives. Retention is driven by branch name:
a `production` release is kept for years, `master` and `stage` for weeks, a
dependabot branch for an hour. This is the single largest reason a cluster can
host hundreds of preview environments.

The boundary of responsibility follows the diagrams: anything drawn in grey is
someone else's SLA — GitHub, CircleCI, the cloud provider, the CDN, the
certificate authority. Everything else is Silta's.
