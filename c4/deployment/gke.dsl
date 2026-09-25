# ---------------------------------------------------------------------------
# Deployment: Google Kubernetes Engine
#
# The reference platform. Silta is primarily run on GKE, so anything that is
# "default" in the charts is what you see here: Traefik ingress, csi-rclone
# over Cloud Storage, Artifact Registry, Let's Encrypt.
# ---------------------------------------------------------------------------

deploymentEnvironment "GKE" {

    deploymentNode "GitHub" "Source of truth and identity provider" "SaaS" {
        softwareSystemInstance github
    }

    deploymentNode "CircleCI Cloud" "Runs the pipeline for every push" "SaaS" {
        deploymentNode "Job executor" "Remote Docker executor, medium resource class" "silta-cicd container" {
            gkeOrb = containerInstance orb
            gkeCli = containerInstance cli
            containerInstance builderImage
        }
    }

    deploymentNode "Edge" "Public entry point for production domains" "Fastly / Cloudflare / Cloud CDN" {
        gkeCdn = softwareSystemInstance cdn
    }

    deploymentNode "Google Cloud Platform" "One GCP project per cluster environment" "GCP" {

        gkeDns = infrastructureNode "Cloud DNS" "Wildcard record for the cluster domain (*.<cluster>.silta.cloud) plus delegated customer domains." "Cloud DNS"

        gkeLb = infrastructureNode "Cloud Load Balancing" "Regional external L4 load balancer with a reserved static IP, fronting the ingress controller service. A global HTTP(S) load balancer is used instead when a project opts into the GCE ingress class." "Google Cloud Load Balancing"

        gkeSshLb = infrastructureNode "SSH load balancer" "Separate static IP publishing the jump server on port 22, with externalTrafficPolicy=Local to preserve client IPs." "Google Cloud Load Balancing"

        gkeAr = infrastructureNode "Artifact Registry" "Per-project image repositories written by CI and pulled by the kubelet via an imagePullSecret." "Artifact Registry / GCR"

        gkeGcs = infrastructureNode "Cloud Storage" "Buckets behind the silta-shared storage class — public files, private files, backups, reference data — and the public charts.wdr.io Helm repository." "GCS"

        gkeFilestore = infrastructureNode "Filestore" "Managed NFS share used where the nfs-subdir provisioner is preferred over csi-rclone." "Filestore"

        deploymentNode "GKE cluster" "Regional, VPC-native, with autoscaling node pools" "Kubernetes" {

            gkeApi = infrastructureNode "Kubernetes API server" "Managed control plane. CI authenticates to it with a service-account key held in a CircleCI Context." "GKE control plane"

            deploymentNode "silta-cluster namespace" "Installed once per cluster from the silta-cluster chart" "Kubernetes namespace" {
                gkeIngress = containerInstance ingressController
                containerInstance certManager
                gkeCsi = containerInstance csiRclone
                containerInstance downscaler
                gkeRemover = containerInstance deploymentRemover
                gkeJump = containerInstance sshJumpServer
                containerInstance sshKeyServer
                containerInstance splash
                containerInstance controllerSidecars
                gkeHubAgent = containerInstance hubAgent
            }

            deploymentNode "Static egress node pool" "Dedicated node pool whose nodes share one static outbound IP" "GKE node pool" {
                containerInstance siltaProxy
            }

            deploymentNode "Project namespace" "One namespace per repository" "Kubernetes namespace" {
                deploymentNode "Helm release" "One release per git branch — production, master and every open feature branch" "Helm 3" {
                    gkeVarnish = containerInstance varnish
                    gkeNginx = containerInstance webserver
                    gkeApp = containerInstance appRuntime
                    gkeShell = containerInstance shell
                    gkeDb = containerInstance database
                    containerInstance searchEngine
                    containerInstance cacheStore
                    containerInstance mailTrap
                    containerInstance clamav
                    gkeJobs = containerInstance scheduledJobs
                    gkeFiles = containerInstance sharedFiles
                    containerInstance releasePolicy
                }
            }

            deploymentNode "Operations namespace" "The dashboard is itself deployed as an ordinary Silta project, on the silta-operations cluster" "Kubernetes namespace" {
                containerInstance dashWeb
                gkeDashBackend = containerInstance dashBackend
                containerInstance dashSyncStorage
                containerInstance dashSessions
            }
        }
    }

    # Infrastructure relationships

    gkeCdn -> gkeLb "Forwards cache misses to the origin" "HTTPS"
    gkeDns -> gkeLb "Resolves cluster and project hostnames to" "DNS"
    gkeLb -> gkeIngress "Load balances inbound HTTP/HTTPS to" "TCP 80/443"
    gkeSshLb -> gkeJump "Publishes" "TCP 22"
    gkeCli -> gkeApi "Applies the Helm release through" "HTTPS"
    gkeCli -> gkeAr "Pushes project images to" "HTTPS"
    gkeAr -> gkeApp "Is pulled by the kubelet to start" "HTTPS"
    gkeCsi -> gkeGcs "Mounts buckets as RWX volumes from" "rclone over HTTPS"
    gkeFilestore -> gkeFiles "Backs, where NFS is preferred" "NFS"
    gkeJobs -> gkeGcs "Writes nightly backups and reference data to" "rclone over HTTPS"
    gkeDashBackend -> gkeApi "Reads workloads and streams logs through" "HTTPS"
}
