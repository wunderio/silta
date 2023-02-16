---
id: configuring-cdn
title: Configuring CDN
---


## CloudFront

You need to configure your matching [CloudFront](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/Introduction.html) domain name with `exposedDomain` directive:

```yaml
# silta.yml
exposedDomain:
  cloudfront:
    hostname: www.example.com # matching domain name configured in CloudFront
```

### Origin connection during Lets Encrypt certificate verification process

Eventually you want your CDN to use Silta origin using `https-only` [origin protocol policy](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-https-cloudfront-to-custom-origin.html).

However, it is important to understand that you may need to temporarly use `http-only` **during the phase of initial Lets Encrypt certificate verification process**. Also, during this phase, you want to disable all `https` to `http` redirects from CloudFront Cache behaviors and from `silta.yml`:

```yaml
# silta.yml (when using Lets Encrypt)
ingress:
  default:
    # Allow HTTP connections for CloudFront, when
    # Lets Encrypt verifies certs for the first time.
    redirect-https: false
```

*Note: If you don't allow `http` traffic, and your environment is issuing a certificate with Lets Encrypt for the first time, Silta provides temporarly self-signed certificate which will cause CloudFront to not trust the origin and causes 502 Bad Gateway error, thus failing the actual certificate verification process.*

#### Custom certificates
If you decide to use custom verified certificate, then you may configure everything directly to `https-only` and skip steps allowing `http` origin requests temporarly.

### Forwarding `Host` header
You want Drupal to generate URLs according to the domain and scheme that user is accessing the site.

Without forwarding `Host` header, Drupal would use its' Silta domain and scheme (for example `https://production.my-project.dev.wdr.io`) to generate content URL addresses.

To overcome this problem, **you must configure CloudFront to forward `Host` header to origin**.

To do this, apply cache policies under "Cache behaviors" tab and either:
  - [use managed cache policies](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/using-managed-origin-request-policies.html)
  - [create custom policy](https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/controlling-origin-requests.html#origin-request-create-origin-request-policy)

## Summary

![Summarized in a picture](./img/aws_cloudfront.png)
