## Basics

Full chain consists of 3 parts.   
`End-Entity (Server) Certificate:` This is your server's SSL/TLS certificate, also known as the end-entity certificate. It is the certificate that identifies your server's domain.  
`Intermediate Certificates:` These are the certificates of intermediate Certificate Authorities (CAs) that form the chain between your end-entity certificate and the root CA certificate. Intermediate certificates help build the trust chain between your certificate and a root CA. They are necessary because root CA certificates are typically not distributed widely due to security reasons.  
`Root CA Certificate:` This is the certificate of the root Certificate Authority. This certificate is the ultimate trust anchor in the chain. The root CA certificate establishes trust in the entire chain.  

You can have multiple Intermediate Certificates in chain.     
```yaml
exposeDomains:
  example-customcert:
    hostname: ssl-custom.example.com
    ssl:
      enabled: true
      issuer: custom
      key: |
        -----BEGIN RSA PRIVATE KEY-----
        <KEY>
        -----END RSA PRIVATE KEY-----
      crt: |
        -----BEGIN CERTIFICATE-----
        < DOMAIN CERTIFICATE >
        -----END CERTIFICATE-----
        -----BEGIN CERTIFICATE-----
        < INTERMEDIATE CERTIFICATE 1 >
        -----END CERTIFICATE-----
        -----BEGIN CERTIFICATE-----
        < INTERMEDIATE CERTIFICATE 2 >
        -----END CERTIFICATE-----
        -----BEGIN CERTIFICATE-----
        < INTERMEDIATE CERTIFICATE N >
        -----END CERTIFICATE-----        
        -----BEGIN CERTIFICATE-----
        < ROOT CA CERTIFICATE >
        -----END CERTIFICATE-----
```

## PFX to PEM
Extraction (legacy flag is required if older version of PKCS#12 was used to create PFX file):  
`openssl pkcs12 -legacy -in custom_cert.pfx -nocerts -nodes | sed -ne '/-BEGIN PRIVATE KEY-/,/-END PRIVATE KEY-/p' > private.key`  
`openssl pkcs12 -legacy -in custom_cert.pfx -cacerts -nokeys -chain | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > ca.crt`  
`openssl pkcs12 -legacy -in custom_cert.pfx -clcerts -nokeys | sed -ne '/-BEGIN CERTIFICATE-/,/-END CERTIFICATE-/p' > domain.crt`  

Creating full chain:
`cat domain.crt ca.crt > fullchain.crt`

You can also use [this script](../scripts/pfx-ready.sh).

## SSL certificate verification

You can verify full chain part:   
`openssl verify -CAfile fullchain.crt domain.crt`  
And then matching with private key  
`openssl x509 -noout -modulus -in fullchain.crt | openssl md5`  
`openssl rsa -noout -modulus -in private.key | openssl md5`  
Output values should match.

Testing certificate on live server can be done only on different cluster/environment.
*!NB Do not try to test it on Production cluster/environment where production hostname is in use already.*  
#### Steps to test SSL certificate on Development cluster
 * Make a new Git branch
 * Add SSL certificates domain to Exposed domains in `stila.yml`
 * Create secrets file, put relevant structure and encrypt it with cluster's secret key
 * Modify `.circleci/config.yml` to decrypt secret and use it in `silta_config` part
 * Push branch to trigger deployment  
 * Verify SSL certificate with `openssl s_client -connect [IP]:443 -servername [hostname]`. Expected result    
 `SSL handshake has read 7583 bytes and written 408 bytes Verification: OK`. If something is wrong You'll get  
 `Verification error: unable to verify the first certificate` and/or `Verify return code: 21 (unable to verify the first certificate)` 
 * You can also change `/etc/hosts` to resolve hostname and verify SSL certificate via browser
 * When everything looks good delete the testing branch and proceed with production release. 


## Tips

PEM strings can be encoded in different formats. Both cases are valid       
`-----BEGIN RSA PRIVATE KEY-----`      
`-----BEGIN PRIVATE KEY-----`  
`openssl` will take care of correct decoding. [List of all supported formats](https://git.openssl.org/?p=openssl.git;a=blob;f=include/openssl/pem.h;hb=HEAD#l35). 
