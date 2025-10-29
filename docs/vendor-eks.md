# Amazon Web Services compatibility

Silta is mostly AWS compatible, there are some requirements for environments deployed to EKS cluster.

## Cluster requirements

- Ingress-nginx as the Ingress choice
- Amazon VPC CNI plugin for NetworkPolicy
- Amazon EBS CSI Driver plugin for default storage class (gp2)

### Preparation steps

On new, empty cluster, before installing silta-cluster chart:

1. Install Amazon VPC CNI plugin (plugins are located in EKS -> cluster > Add-ons tab)
2. Install Amazon EBC CSI Driver plugin
3. Create and attach IAM role to worker nodes with these permissions:
   - AmazonEC2ContainerRegistryFullAccess
   - AmazonEC2FullAccess
   - AmazonEKSWorkerNodePolicy
   - AmazonElasticFileSystemFullAccess
   - AmazonS3FullAccess

#### S3 backend for csi-rclone

Create a custom policy, storage user, attach policy to storage user and acquire keys for it. 

Custom policy:
```yaml
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "s3:ListBucket",
        "s3:DeleteObject",
        "s3:GetObject",
        "s3:PutObject",
        "s3:PutObjectAcl"
      ],
      "Resource": [
        "arn:aws:s3:::BUCKET_NAME/*",
        "arn:aws:s3:::BUCKET_NAME"
      ]
    },
    {
      "Effect": "Allow",
      "Action": "s3:ListAllMyBuckets",
      "Resource": "arn:aws:s3:::*"
    }
  ]
}
```

csi-clone configuration:
```yaml
csi-rclone:
  enabled: true
  params:
    remote: s3
    remotePath: <bucket-name>
    s3-provider: AWS
    s3-endpoint: ""
    s3-region: <region>
    s3-access-key-id: <KEY-ID>
    s3-secret-access-key: <ACCESS-KEY>
    s3-acl: private
```
Note: `s3-endpoint` needs override due to minio endpoint in chart defaults.

### Silta-cluster chart requirements

Enabling proxy protocol over ingress-nginx, for passing client IP to pods:
```yaml
  ingress-nginx:
    controller:
      config:
        use-proxy-protocol: true
    service:
      annotations:
        "service.beta.kubernetes.io/aws-load-balancer-proxy-protocol": "*"
```

SSH uses NLB as ingress point. Apply these annotations:
```yaml
gitAuth:
  enabled: true
  scope: 'https://github.com/wunderio'
  annotations:
    "service.beta.kubernetes.io/aws-load-balancer-backend-protocol": "tcp"
    "service.beta.kubernetes.io/aws-load-balancer-connection-idle-timeout": "60"
    # "service.beta.kubernetes.io/aws-load-balancer-cross-zone-load-balancing-enabled": "true"
    "service.beta.kubernetes.io/aws-load-balancer-type": "nlb"
    # the length of the list must be equal to the number of subnets
    "service.beta.kubernetes.io/aws-load-balancer-eip-allocations": "<elastic IP id>"
    "service.beta.kubernetes.io/aws-load-balancer-subnets": "<subnet name here>,<subnet name here>,..."
    "service.beta.kubernetes.io/aws-load-balancer-nlb-target-type": "instance"
    "service.beta.kubernetes.io/aws-load-balancer-ip-address-type": "ipv4"
    "service.beta.kubernetes.io/aws-load-balancer-target-group-attributes": "stickiness.enabled=true,stickiness.type=source_ip,preserve_client_ip.enabled=true"
```
For NLB, it is required to have 1 Elastic IP per subnet (defined by Availability Zones)

EIP Allocation ID is in Network & Security -> Elastic IPs 

Subnet names are in VPC Dashboard -> Virtual Private Cloud -> Subnets

There are few more requirements listed on [silta-cluster chart page](https://github.com/wunderio/charts/tree/master/silta-cluster#requirements), those are common for all silta-cluster installations 

## Missing functionality

- NLB for HTTP/HTTPS ingress

## Deployment specifics

There is no extra configuration required for basic deployments. The only change would be `cluster.type` but it's normally overridden in CI pipeline.

Drupal, frontend and simple charts:
```yaml
cluster:
  type: aws
```
