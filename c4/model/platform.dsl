# ---------------------------------------------------------------------------
# Silta Cluster Platform
#
# The shared services installed once per cluster by the silta-cluster Helm
# chart. Every project environment in the cluster depends on these; none of
# them are project-specific. Containers tagged "Optional" are enabled per
# cluster, not everywhere.
# ---------------------------------------------------------------------------

silta = softwareSystem "Silta Cluster Platform" "A Kubernetes cluster prepared by the silta-cluster chart: ingress, TLS, shared storage, SSH access, cost control and lifecycle automation shared by every project hosted in it." {

    ingressController = container "Ingress controller" "Terminates TLS and routes every inbound HTTP request to the right release. Traefik 3 by default; ingress-nginx on AWS and UpCloud; cloud-native ingress (GCE, Azure Application Gateway) where required." "Traefik 3 / ingress-nginx"

    certManager = container "cert-manager" "Requests, renews and stores TLS certificates. ClusterIssuers for Let's Encrypt production and staging, plus a self-signed issuer for preview environments." "cert-manager"

    csiRclone = container "csi-rclone driver" "Provides the silta-shared ReadWriteMany storage class by mounting cloud object storage into pods. The mechanism behind shared files, backups and reference data." "CSI driver (rclone)"

    minio = container "MinIO" "In-cluster S3-compatible object storage. Used when no managed bucket service is available or wanted." "MinIO" "Optional"

    nfsProvisioner = container "NFS subdir provisioner" "Alternative RWX storage class backed by a managed NFS share (Filestore, Azure Files, EFS)." "nfs-subdir-external-provisioner" "Optional"

    downscaler = container "Downscaler" "Scales idle non-production environments to zero on a schedule and wakes them back up on the first incoming request, via a placeholder proxy. The main cost-control mechanism. Retention rules are per branch-name pattern." "Go controller + wake-up proxy"

    deploymentRemover = container "Deployment remover" "Receives GitHub webhooks and deletes the Helm release, namespace resources and storage of branches that no longer exist." "Go service"

    sshJumpServer = container "SSH jump server" "Single SSH entry point into the cluster. Authorises developers against their GitHub organisation keys, then proxies them into the shell container of a specific release. Sessions can be recorded." "OpenSSH (sshd-gitauth)"

    sshKeyServer = container "SSH key server" "Serves the authorised-key set for the jump server, derived from GitHub organisation and outside-collaborator membership." "Go service"

    siltaProxy = container "Egress proxy" "HTTP forward proxy pinned to a node pool with a static outbound IP, so third parties can allow-list a single address for all outbound traffic from the cluster." "tinyproxy" "Optional"

    splash = container "Splash page" "Catch-all page served for cluster hostnames that do not match any release." "nginx" "Optional"

    inClusterRegistry = container "In-cluster registry" "Self-hosted image registry for clusters without a managed registry service." "Docker distribution" "Optional"

    controllerSidecars = container "Controller sidecars" "Kubernetes controller that manages sidecar lifecycle for jobs, so batch pods terminate cleanly." "Go controller"

    hubAgent = container "Silta Hub agent" "Reads cluster inventory (namespaces, releases, workloads) read-only and reports it to Silta Hub. Also drives scheduled release data synchronisation." "Go agent" "Optional"

    dbOperator = container "Percona XtraDB operator" "Manages clustered, replicated MySQL for environments that need more than the single-pod MariaDB." "percona-xtradb-cluster-operator" "Optional"
}
