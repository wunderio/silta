# ---------------------------------------------------------------------------
# Deployment: Azure AKS
#
# Differences from the GKE reference that matter when reading this diagram:
#   * two ingress options — keep Traefik behind an Azure Load Balancer for the
#     built-in cluster domain, and optionally route exposed customer domains
#     through an existing Application Gateway via AGIC;
#   * silta-shared can be Azure Blob through csi-rclone, or the azurefile-csi
#     driver for faster I/O and instant cross-pod consistency (case-insensitive
#     filenames, and the storage request is enforced);
#   * kubenet + Calico is required for NetworkPolicy support, and cannot be
#     changed after the cluster is created.
# ---------------------------------------------------------------------------

deploymentEnvironment "AKS" {

    deploymentNode "GitHub" "Source of truth and identity provider" "SaaS" {
        softwareSystemInstance github
    }

    deploymentNode "CircleCI Cloud" "Runs the pipeline for every push" "SaaS" {
        deploymentNode "Job executor" "Remote Docker executor" "silta-cicd container" {
            aksCli = containerInstance cli
            containerInstance orb
            containerInstance builderImage
        }
    }

    deploymentNode "Edge" "Public entry point for production domains" "Azure Front Door / CDN" {
        aksCdn = softwareSystemInstance cdn
    }

    deploymentNode "Microsoft Azure" "One subscription and resource group per cluster environment" "Azure" {

        aksDns = infrastructureNode "Azure DNS" "Zones for the cluster domain and customer domains." "Azure DNS"

        aksLb = infrastructureNode "Azure Load Balancer" "Standard L4 load balancer with a static public IP, fronting the Traefik ingress service for the built-in cluster domain." "Azure Load Balancer"

        aksAppGw = infrastructureNode "Application Gateway" "Optional L7 entry point for exposed customer domains, driven by the AGIC add-on watching in-cluster Ingress resources. Requires VNet peering, a route table association, and the gateway subnet allow-listed in nginx realipfrom, noauthips and the release NetworkPolicy." "Application Gateway + AGIC"

        aksAcr = infrastructureNode "Azure Container Registry" "Project images. CI authenticates with a service principal held in a CircleCI Context." "ACR"

        aksBlob = infrastructureNode "Azure Blob Storage" "Default backend for the silta-shared storage class via csi-rclone." "Blob Storage"

        aksFiles = infrastructureNode "Azure Files" "Alternative RWX backend via the azurefile-csi driver. Chosen for projects with many files; cannot be switched on an existing deployment." "Azure Files"

        aksDisk = infrastructureNode "Azure Disk" "Default block storage class for database and search volumes." "Azure Disk CSI"

        deploymentNode "AKS cluster" "kubenet networking with Calico network policy" "Kubernetes" {

            aksApi = infrastructureNode "Kubernetes API server" "Managed control plane. CI authenticates with a service principal (tenant, app id, password) from a CircleCI Context." "AKS control plane"

            deploymentNode "silta-cluster namespace" "Installed once per cluster from the silta-cluster chart" "Kubernetes namespace" {
                aksIngress = containerInstance ingressController
                containerInstance certManager
                aksCsi = containerInstance csiRclone
                containerInstance downscaler
                containerInstance deploymentRemover
                aksJump = containerInstance sshJumpServer
                containerInstance sshKeyServer
                containerInstance controllerSidecars
                containerInstance hubAgent
            }

            deploymentNode "Project namespace" "One namespace per repository" "Kubernetes namespace" {
                deploymentNode "Helm release" "One release per git branch, deployed with cluster.type=aks" "Helm 3" {
                    containerInstance varnish
                    aksNginx = containerInstance webserver
                    aksApp = containerInstance appRuntime
                    containerInstance shell
                    aksDb = containerInstance database
                    containerInstance searchEngine
                    containerInstance cacheStore
                    containerInstance mailTrap
                    aksJobs = containerInstance scheduledJobs
                    aksShared = containerInstance sharedFiles
                    containerInstance releasePolicy
                }
            }
        }
    }

    aksCdn -> aksLb "Forwards cache misses to the origin" "HTTPS"
    aksDns -> aksLb "Resolves built-in cluster hostnames to" "DNS"
    aksDns -> aksAppGw "Resolves exposed customer domains to, when the gateway is used" "DNS"
    aksLb -> aksIngress "Load balances inbound HTTP/HTTPS to" "TCP 80/443"
    aksAppGw -> aksNginx "Routes exposed-domain traffic straight to the release, bypassing Traefik" "HTTP"
    aksCli -> aksApi "Applies the Helm release through" "HTTPS"
    aksCli -> aksAcr "Pushes project images to" "HTTPS"
    aksAcr -> aksApp "Is pulled by the kubelet to start" "HTTPS"
    aksCsi -> aksBlob "Mounts containers as RWX volumes from" "rclone over HTTPS"
    aksFiles -> aksShared "Backs, when azurefile-csi is chosen over csi-rclone" "SMB"
    aksDisk -> aksDb "Provides block storage to" "CSI"
    aksJobs -> aksBlob "Writes nightly backups and reference data to" "rclone over HTTPS"
    aksJump -> aksLb "Is published through a separate frontend of" "TCP 22"
}
