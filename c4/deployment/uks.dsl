# ---------------------------------------------------------------------------
# Deployment: UpCloud UKS
#
# Differences from the GKE reference that matter when reading this diagram:
#   * the cluster and its network are provisioned by Terraform in this repo
#     set, not by a console;
#   * UpCloud load balancers default to HTTP mode and must be declared in TCP
#     mode with outbound PROXY protocol, through a JSON service annotation;
#     the same annotation carries the source-IP allow-list for SSH;
#   * there is no managed container registry — Harbor is self-hosted on top of
#     the object storage;
#   * managed MySQL is an option, but needs mysql_native_password;
#   * the smallest volume UKS will provision is 1Gi, so chart defaults that
#     request less must be raised.
# ---------------------------------------------------------------------------

deploymentEnvironment "UKS" {

    deploymentNode "GitHub" "Source of truth and identity provider" "SaaS" {
        softwareSystemInstance github
    }

    deploymentNode "CircleCI Cloud" "Runs the pipeline for every push" "SaaS" {
        deploymentNode "Job executor" "Remote Docker executor" "silta-cicd container" {
            uksCli = containerInstance cli
            containerInstance orb
            containerInstance builderImage
        }
    }

    deploymentNode "Edge" "Public entry point for production domains" "Fastly / Cloudflare" {
        uksCdn = softwareSystemInstance cdn
    }

    deploymentNode "UpCloud" "Provisioned by the silta_upcloud Terraform module" "UpCloud" {

        uksDns = infrastructureNode "DNS" "Zones for the cluster domain and customer domains, hosted externally." "DNS"

        uksLb = infrastructureNode "UpCloud Load Balancer" "Declared in TCP mode with outbound PROXY protocol v1 on both the HTTP and HTTPS frontends, so ingress-nginx can recover the client IP." "UpCloud Load Balancer"

        uksSshLb = infrastructureNode "UpCloud Load Balancer (SSH)" "Separate TCP frontend on port 22 carrying source-IP match rules that reject everything outside the VPN ranges." "UpCloud Load Balancer"

        uksRegistry = infrastructureNode "Harbor" "Self-hosted container registry — UpCloud has no managed registry service. Uses the object storage as its backend." "Harbor"

        uksObject = infrastructureNode "UpCloud Object Storage" "S3-compatible bucket behind the silta-shared storage class, configured in csi-rclone with s3-provider=Other and directory markers enabled." "Object Storage"

        uksBlock = infrastructureNode "UpCloud block storage" "Block volumes for database and search. Minimum provisionable size is 1Gi." "UKS storage class"

        uksManagedDb = infrastructureNode "Managed MySQL" "Optional managed database, replacing the in-cluster MariaDB. Requires the application user to use mysql_native_password." "UpCloud Managed Database" "Optional"

        deploymentNode "UKS cluster" "Managed Kubernetes, network created by Terraform" "Kubernetes" {

            uksApi = infrastructureNode "Kubernetes API server" "Managed control plane. CI authenticates with a kubeconfig held in a CircleCI Context." "UKS control plane"

            deploymentNode "silta-cluster namespace" "Installed once per cluster from the silta-cluster chart" "Kubernetes namespace" {
                uksIngress = containerInstance ingressController
                containerInstance certManager
                uksCsi = containerInstance csiRclone
                containerInstance downscaler
                containerInstance deploymentRemover
                uksJump = containerInstance sshJumpServer
                containerInstance sshKeyServer
                containerInstance controllerSidecars
                containerInstance hubAgent
            }

            deploymentNode "Project namespace" "One namespace per repository" "Kubernetes namespace" {
                deploymentNode "Helm release" "One release per git branch" "Helm 3" {
                    containerInstance varnish
                    uksNginx = containerInstance webserver
                    containerInstance waf
                    uksApp = containerInstance appRuntime
                    containerInstance shell
                    uksDb = containerInstance database
                    containerInstance searchEngine
                    containerInstance cacheStore
                    containerInstance mailTrap
                    uksJobs = containerInstance scheduledJobs
                    containerInstance sharedFiles
                    containerInstance releasePolicy
                }
            }
        }
    }

    uksCdn -> uksLb "Forwards cache misses to the origin" "HTTPS"
    uksDns -> uksLb "Resolves cluster and project hostnames to" "DNS"
    uksLb -> uksIngress "Load balances inbound HTTP/HTTPS to" "TCP + PROXY protocol v1"
    uksSshLb -> uksJump "Publishes, to allow-listed source IPs only" "TCP 22"
    uksCli -> uksApi "Applies the Helm release through" "HTTPS"
    uksCli -> uksRegistry "Pushes project images to" "HTTPS"
    uksRegistry -> uksApp "Is pulled by the kubelet to start" "HTTPS"
    uksCsi -> uksObject "Mounts the bucket as RWX volumes from" "rclone over HTTPS"
    uksBlock -> uksDb "Provides block storage to" "CSI"
    uksManagedDb -> uksApp "Replaces the in-cluster database for" "MySQL protocol"
    uksJobs -> uksObject "Writes nightly backups and reference data to" "rclone over HTTPS"
}
