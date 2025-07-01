## Silta CircleCI Context variables

### Kubernetes cluster connection data
- `CLUSTER_NAME`: Used for kubernetes connection. Example: `silta`.
- `KUBECTL_CONFIG`: Optional when dashboard rbac autocreation is used. Otherwise required, contains kubectl config file contents.
- `KUBECONFIG`: Optional, defaults to `~/.kube/config`.
- `CLUSTER_TYPE`: Options: `aks`, `eks`, `minikube`, `microk8s`. Default value: `gke`.

**Cluster connection, GKE specifics**
- `USE_GKE_GCLOUD_AUTH_PLUGIN`: Mandatory for GKE clusters `<1.26`, set to `True`.

**Used for gcloud authentication when environment variables are available (when kubectl config is undefined)**
- `GCLOUD_PROJECT_NAME`: GCP project name. Example: `silta-test-123456`.
- `GCLOUD_COMPUTE_REGION`: Optional. Example: `europe-north1`.
- `GCLOUD_COMPUTE_ZONE`: Optional. Example: `europe-north1-a`.

**Cluster connection, AKS specifics**
- `AKS_RESOURCE_GROUP`: Example: `siltaResourceGroup`.
- `AKS_SP_APP_ID`: ServicePrincipal Application ID.
- `AKS_SP_PASSWORD`
- `AKS_TENANT_ID`

### Chart variables (drupal, simple, frontend)
- `CLUSTER_DOMAIN`: Used as base domain for deployments. Example: `silta-test.wdr.io`.
- `DB_ROOT_PASS`: MySQL DB password. Used on first deployment for account creation and for connection. Do not change after site is deployed!
- `DB_USER_PASS`: MySQL DB password. Used on first deployment for account creation and for connection. Do not change after site is deployed!
- `SECRET_KEY`: Used for secrets encryption. Do not change without re-encoding secrets with the new key or deployments will fail.
- `GITAUTH_USERNAME`: Used for getting list of allowed ssh keys. See `gitAuth.keyserver` [variables in `silta-cluster` chart](https://github.com/wunderio/charts/blob/master/silta-cluster/values.yaml) for more details.
- `GITAUTH_PASSWORD`: Used for getting list of allowed ssh keys. See `gitAuth.keyserver` [variables in `silta-cluster` chart](https://github.com/wunderio/charts/blob/master/silta-cluster/values.yaml) for more details.
- `VPN_IP`: Injected into nginx.noauthips variables for allowlisting basic auth requests.
- `VPC_NATIVE`: Adds vpc native (NEG) annotation for GKE clusters (cloud.google.com/neg). Set to `true` on GKE.

### Container image registry
- `IMAGE_REPO_HOST`: Example: `europe-north1-docker.pkg.dev`.
- `DOCKER_REPO_HOST`: Use `IMAGE_REPO_HOST` instead!
- `DOCKER_REPO_PROJ`: Example: `silta-test-123456/images`.
- `IMAGE_PULL_SECRET`: Optional. Allows passing base64 encoded docker registry secret to deployment.

**Image registry, GCR & AR specifics**
- `GOOGLE_APPLICATION_CREDENTIALS`: Example: `/home/circleci/gcp-service-key.json`.
- `GCLOUD_KEY_JSON`: Plaintext serviceaccount key, newlines replaced with "\n".
- `SILTA_USE_GCLOUD`: Force using gcloud cli for existing image lookups. Will be removed soon.

**Image registry, ACR specifics**
Note: This uses `az login` currently, change in progress.
- `AKS_RESOURCE_GROUP`: Example: `siltaResourceGroup`.
- `AKS_SP_APP_ID`: ServicePrincipal Application ID.
- `AKS_SP_PASSWORD`
- `AKS_TENANT_ID`

### Silta dashboard RBAC creation
- `SILTA_CLUSTER_ID`: Dashboard configuration machine name. Example: `silta_test`.
- `SILTA_DASHBOARD_URL`: Dashboard url. Basicauth in url (or proxy ip/cloud nat + whitelist). Example: `https://username:password@master.silta-dashboard.[cluster-domain]`.
- `SILTA_DASHBOARD_KEY`: Required for dashboard rbac creation, can be found in dashboard settings.
- `${SILTA_CLUSTER_ID}_KUBECTL_CONFIG`: Normally does not exist in context, but rather in project's environment variables. Variable is injected by Silta Dashboard.

### CircleCI connection proxy (optional)
Allows connecting to cluster via ssh jumphost. Does not work with all projects (some npm installs fail).
- `TUNNEL_USER_HOST`: ssh jumphost user. Example: `user@ssh.example.com`.
- `TUNNEL_PRIVATE_KEY`: Private key of jumphost user, replace newlines with \n.

### Deprecation list:
- `VPC_NATIVE`: Adds vpc native (NEG) annotation for GKE clusters (cloud.google.com/neg). This should be set to `true` in charts by default now since all new clusters are vpc native and all gke clusters we deal with are vpc native.
- `DOCKER_REPO_PROJ`: Implement `IMAGE_REPO_PROJ`, set this as a fallback.
- `SILTA_USE_GCLOUD`: Force using gcloud cli for existing image lookups. This can be removed since build images without gcloud are used by default now.

### Deprecated (if you see these in your context, You can remove them)
- `DOCKER_REPO_ORG`
- `DOCKER_REPO_URL`
- `DOCKER_PASSWORD`
- `DOCKER_USER`
- `GCLOUD_EMAIL`
- `GCLOUD_CLUSTER_NAME`
- `SLACK_ACCESS_TOKEN`
