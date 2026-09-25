# ---------------------------------------------------------------------------
# Silta Delivery Toolchain
#
# The part of Silta that runs *outside* the cluster. This is what turns a git
# push into a running environment. Everything here is versioned and published
# independently of any cluster.
# ---------------------------------------------------------------------------

toolchain = softwareSystem "Silta Delivery Toolchain" "The CI-side of Silta: the CircleCI orb, the silta CLI, the Helm charts, the base images and the documentation." {

    orb = container "CircleCI Orb" "Published as silta/silta. Defines the validate / build-deploy jobs and the reusable steps a project's .circleci/config.yml composes." "CircleCI orb (YAML)"

    cli = container "Silta CLI" "Single Go binary that carries the deployment logic: cluster login, image build and push, chart download and extension, release naming, helm upgrade, diff, cleanup and secret encryption." "Go"

    builderImage = container "CI builder image" "silta-cicd image used as the CircleCI executor. Ships docker, helm, kubectl, the cloud CLIs, composer, node and the Silta CLI." "Docker image"

    charts = container "Helm charts" "The drupal, frontend, simple and silta-cluster charts plus the shared silta-release library chart. The contract between a project and the platform." "Helm 3"

    chartRepo = container "Helm chart repository" "charts.wdr.io — public bucket-backed Helm repository serving packaged chart versions to CI." "Helm repository (GCS bucket)"

    baseImages = container "Silta base images" "Hardened runtime images: php-fpm, nginx, node, shell, mariadb, varnish, solr, redis, memcached, backup, proxy, splash and the operator sidecars." "Docker images"

    docsSite = container "Documentation site" "wunderio.github.io/silta — the developer-facing handbook for onboarding, configuration and troubleshooting." "Docusaurus"
}
