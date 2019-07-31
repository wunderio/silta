

# HTTP connection issues

## "upstream connect error"
```
upstream connect error or disconnect/reset before headers
```
**What happened:** The application pod is in an unready state, so ambassador (the API gateway) is not sending traffic to it.  

**What to do:** This could be because the deployment is not complete, or there is a problem with your application.
Check the deployment logs in CircleCI. Please contact the ops team if the issue persists.

# SSH connection issues

## Error: Connection refused
```
channel 0: open failed: connect failed: Connection refused
stdio forwarding failed
ssh_exchange_identification: Connection closed by remote host
```

**What happened:** The `shell` pod is not done deploying.
**What to do:** Wait for a ten seconds and try again.

## Timeout without error

You are probably not logged into the VPN.   