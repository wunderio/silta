## What changes between clouds

The application does not change. `cluster.type` changes, the credentials
change, and a handful of platform-level choices change with the provider.
These are the differences the four deployment views exist to make visible.

| | GKE | EKS | AKS | UKS |
| --- | --- | --- | --- | --- |
| Ingress | Traefik 3 | ingress-nginx | Traefik 3, optionally Application Gateway | ingress-nginx |
| Client IP | Preserved by the L4 LB | PROXY protocol | Preserved by the L4 LB | PROXY protocol v1 |
| RWX storage | csi-rclone over GCS | csi-rclone over S3 | csi-rclone over Blob, or azurefile-csi | csi-rclone over Object Storage |
| Block storage | GCE PD | EBS gp2 | Azure Disk | UKS volumes, 1Gi minimum |
| Registry | Artifact Registry | ECR | ACR | Self-hosted Harbor |
| Network policy | Native | Amazon VPC CNI | kubenet + Calico | Native |
| CDN | Fastly / Cloudflare | CloudFront | Front Door / CDN | Fastly / Cloudflare |

### Constraints that bite

**EKS** has no NLB path for HTTP/HTTPS ingress yet; PROXY protocol has to be
enabled in two places — the load balancer service annotation *and* the
ingress-nginx config — or client IPs silently become the load balancer's. The
SSH jump server needs one Elastic IP per subnet.

**AKS** requires kubenet plus Calico for NetworkPolicy, and that cannot be
changed after the cluster is created. Choosing `azurefile-csi` over csi-rclone
is also a one-way decision per deployment, and the filesystem is
case-insensitive. If an Application Gateway fronts the exposed domains, its
subnet must be allow-listed in three separate places: `nginx.realipfrom`,
`nginx.noauthips`, and the release NetworkPolicy — miss the first and basic
auth drops for every request.

**UKS** load balancers default to HTTP mode and must be declared in TCP mode
through a JSON annotation; the same annotation is where SSH source-IP
allow-listing lives. There is no managed registry, and the smallest volume the
platform will provision is 1Gi, which is larger than some chart defaults ask
for.

**GKE** is the reference platform, so it is the one where defaults and reality
agree. Clusters are route-based by default for backwards compatibility rather
than VPC-native, and `cluster.vpcNative` is set per cluster in CI.
