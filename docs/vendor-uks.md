# Upcloud compatibility

Silta is mostly Upcloud compatible, there are some requirements for environments deployed to UKS cluster.

## Cluster requirements

- Load balancers are configured using json in annotations, see https://github.com/UpCloudLtd/uks-instructions/blob/main/ccm/README.md#customising-load-balancer-configuration
  - By default, they are in HTTP mode, which needs to be changed to TCP
  - Example configuration for ingress-nginx:
    ```yaml
    ingress-nginx:
      controller:
      admissionWebhooks:
        enabled: true
      autoscaling:
        enabled: false
      config:
        use-forwarded-headers: "true"
        compute-full-forwarded-for: "true"
        use-proxy-protocol: "true"
        real-ip-header: "proxy_protocol"
      service:
        type: LoadBalancer
      annotations:
      service.beta.kubernetes.io/upcloud-load-balancer-config: |
        {
          "name": "silta-ingress-1",
          "plan": "production-small",
          "frontends": [
            {
              "name": "https",
              "mode": "tcp",
              "port": 443
            },
            {
              "name": "http",
              "mode": "tcp",
              "port": 80
            }
          ],
          "backends": [
          {
            "name": "https",
            "properties": { "outbound_proxy_protocol": "v1"}
          },
          {
            "name": "http",
            "properties": { "outbound_proxy_protocol": "v1"}
          }
        ]
        }
    ```

- Creating an object storage and configuring rclone is quite well explained at https://upcloud.com/resources/tutorials/migrate-object-storage-rclone
  - Example configuration:
    ```yaml
    rclone:
      params:
        remote: s3
        remotePath: silta-shared
        s3-access-key-id: <ACCESS_KEY>
        s3-acl: private
        s3-endpoint: xyz.fi-hel2.upcloudobjects.com
        s3-provider: Other
        s3-region: fi-hel2
        s3-secret-access-key: <SECRET_KEY>
    ```

There are few more requirements listed on [silta-cluster chart page](https://github.com/wunderio/charts/tree/master/silta-cluster#requirements), those are common for all silta-cluster installations 


## Missing functionality

- Managed Docker image registry
- Managed NFS storage

## Deployment specifics

There is no extra configuration required for basic deployments. The only change would be `cluster.type` but it's normally overridden in CI pipeline.
