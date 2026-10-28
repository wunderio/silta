# ---------------------------------------------------------------------------
# Deployment: Amazon EKS
#
# Differences from the GKE reference that matter when reading this diagram:
#   * ingress-nginx replaces Traefik, and the ingress ELB speaks the PROXY
#     protocol so the real client IP survives;
#   * csi-rclone points at an S3 bucket with a dedicated IAM user;
#   * EBS gp2 is the default block storage class, EFS the optional RWX one;
#   * the SSH jump server needs one Elastic IP per subnet on its NLB;
#   * there is no NLB path for HTTP/HTTPS ingress yet — this is a known gap.
# ---------------------------------------------------------------------------

deploymentEnvironment "EKS" {

    deploymentNode "GitHub" "Source of truth and identity provider" "SaaS" {
        softwareSystemInstance github
    }

    deploymentNode "CircleCI Cloud" "Runs the pipeline for every push" "SaaS" {
        deploymentNode "Job executor" "Remote Docker executor" "silta-cicd container" {
            eksCli = containerInstance cli
            containerInstance orb
            containerInstance builderImage
        }
    }

    deploymentNode "Edge" "Public entry point for production domains" "Amazon CloudFront" {
        eksCdn = softwareSystemInstance cdn
    }

    deploymentNode "Amazon Web Services" "One AWS account per cluster environment" "AWS" {

        eksDns = infrastructureNode "Route 53" "Hosted zones for the cluster domain and customer domains." "Route 53"

        eksLb = infrastructureNode "Elastic Load Balancer" "Fronts the ingress-nginx controller. PROXY protocol is enabled on both the service annotation and the controller config so client IPs reach the pods." "ELB"

        eksSshLb = infrastructureNode "Network Load Balancer" "TCP passthrough for the SSH jump server, with source-IP stickiness, client-IP preservation and one Elastic IP allocation per subnet." "NLB"

        eksEcr = infrastructureNode "Elastic Container Registry" "Project images. CI authenticates with 'aws ecr get-login-password'; nodes pull via an instance role." "ECR"

        eksS3 = infrastructureNode "S3" "Bucket behind the silta-shared storage class, accessed by a dedicated IAM user with a least-privilege bucket policy." "S3"

        eksEbs = infrastructureNode "EBS (gp2)" "Default block storage class for database and search volumes, provisioned by the Amazon EBS CSI driver add-on." "EBS"

        eksEfs = infrastructureNode "EFS" "Managed NFS, used where the nfs-subdir provisioner is preferred over csi-rclone." "EFS" "Optional"

        deploymentNode "EKS cluster" "Amazon VPC CNI for NetworkPolicy, EBS CSI driver add-on, IAM role attached to the worker nodes" "Kubernetes" {

            eksApi = infrastructureNode "Kubernetes API server" "Managed control plane. CI authenticates with AWS credentials from a CircleCI Context." "EKS control plane"

            deploymentNode "silta-cluster namespace" "Installed once per cluster from the silta-cluster chart" "Kubernetes namespace" {
                eksIngress = containerInstance ingressController
                containerInstance certManager
                eksCsi = containerInstance csiRclone
                containerInstance downscaler
                containerInstance deploymentRemover
                eksJump = containerInstance sshJumpServer
                containerInstance sshKeyServer
                containerInstance controllerSidecars
                containerInstance hubAgent
            }

            deploymentNode "Project namespace" "One namespace per repository" "Kubernetes namespace" {
                deploymentNode "Helm release" "One release per git branch, deployed with cluster.type=aws" "Helm 3" {
                    containerInstance varnish
                    eksNginx = containerInstance webserver
                    containerInstance waf
                    eksApp = containerInstance appRuntime
                    containerInstance shell
                    eksDb = containerInstance database
                    containerInstance searchEngine
                    containerInstance cacheStore
                    containerInstance mailTrap
                    eksJobs = containerInstance scheduledJobs
                    eksFiles = containerInstance sharedFiles
                    containerInstance releasePolicy
                }
            }
        }
    }

    eksCdn -> eksLb "Forwards cache misses to the origin" "HTTPS"
    eksDns -> eksLb "Resolves cluster and project hostnames to" "DNS"
    eksLb -> eksIngress "Load balances inbound HTTP/HTTPS to" "TCP + PROXY protocol"
    eksSshLb -> eksJump "Publishes" "TCP 22"
    eksCli -> eksApi "Applies the Helm release through" "HTTPS"
    eksCli -> eksEcr "Pushes project images to" "HTTPS"
    eksEcr -> eksApp "Is pulled by the kubelet to start" "HTTPS"
    eksCsi -> eksS3 "Mounts the bucket as RWX volumes from" "rclone over HTTPS"
    eksEbs -> eksDb "Provides block storage to" "CSI"
    eksEfs -> eksFiles "Backs, where NFS is preferred" "NFS"
    eksJobs -> eksS3 "Writes nightly backups and reference data to" "rclone over HTTPS"
}
