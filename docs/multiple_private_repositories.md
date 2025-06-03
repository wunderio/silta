# Documentation: Using Multiple Private Repositories with CircleCI and Silta

## Overview

This document outlines the process for configuring CircleCI to access multiple private GitHub repositories when building and deploying a project with Silta. This is particularly useful when your project depends on private packages or repositories that require separate authentication.

## Problem Statement

By default, CircleCI can only authenticate with a single GitHub repository using the default deploy key. When your project depends on multiple private repositories (e.g., through Composer dependencies), additional SSH keys must be configured to allow access to these repositories.

## Solution

We use CircleCI's SSH key management combined with SSH host aliases to allow Composer to authenticate with multiple private GitHub repositories.

## Prerequisites

- A CircleCI project connected to your GitHub repository
- Admin access to the GitHub repositories you need to access
- Basic understanding of SSH keys and Composer

## Step-by-Step Implementation

### 1. Generate SSH Key Pairs

For each private repository you need to access, generate a unique SSH key pair:

```bash
# Create a key for each private repository
ssh-keygen -t ed25519 -f ~/.ssh/repo1_key -C "circleci-repo1"
ssh-keygen -t ed25519 -f ~/.ssh/repo2_key -C "circleci-repo2"
```

### 2. Add Private Keys to CircleCI

For each key:

1. Go to your CircleCI project settings: `https://app.circleci.com/settings/project/github/[org]/[project]/ssh`
2. Click "Add SSH Key"
3. Enter a hostname alias (e.g., `github-repo1`, `github-repo2`) - these will be used in SSH config
4. Paste the private key content (from `~/.ssh/repo1_key`, `~/.ssh/repo2_key`, etc.)
5. Save the key
6. Note the fingerprint of each added key (displayed in the UI)

### 3. Add Public Keys to GitHub Repositories

For each private repository:

1. Go to the repository settings: `https://github.com/[org]/[repo-name]/settings/keys`
2. Click "Add deploy key"
3. Give it a descriptive title (e.g., "CircleCI Access")
4. Paste the public key content (from `~/.ssh/repo1_key.pub`, `~/.ssh/repo2_key.pub`, etc.)
5. Enable "Allow write access" if your build needs to push to the repository
6. Click "Add key"

### 4. Configure CircleCI Workflow

Update your `.circleci/config.yml` to use the SSH keys and configure the SSH client:

```yaml
jobs:
  build:
    steps:
      # Add all the SSH keys you registered
      - add_ssh_keys:
          fingerprints:
            - "SHA256:fingerprint_for_repo1_key"
            - "SHA256:fingerprint_for_repo2_key"
            
      # Configure SSH and update Composer references
      - run:
          name: Configure SSH for multiple repositories
          command: |
            # Configure SSH to use the correct keys for each host alias
            sed -i '/Host github-repo1/a\  HostName github.com' ~/.ssh/config
            sed -i '/Host github-repo2/a\  HostName github.com' ~/.ssh/config
            
            # Update repository URLs in composer files to use the host aliases
            sed -i 's|git@github.com:wunderio/repo1.git|git@github-repo1:wunderio/repo1.git|g' composer.json
            sed -i 's|git@github.com:wunderio/repo1.git|git@github-repo1:wunderio/repo1.git|g' composer.lock
            sed -i 's|git@github.com:wunderio/repo2.git|git@github-repo2:wunderio/repo2.git|g' composer.json
            sed -i 's|git@github.com:wunderio/repo2.git|git@github-repo2:wunderio/repo2.git|g' composer.lock
      
      # Continue with your build steps
      - run:
          name: Install dependencies
          command: composer install
```

## How It Works

1. **SSH Key Management**: CircleCI loads the specified SSH keys into the SSH agent.

2. **Host Aliases**: By configuring SSH host aliases (`github-repo1`, `github-repo2`), we create separate "virtual hosts" that all point to `github.com` but use different SSH keys.

3. **URL Rewriting**: We modify the repository URLs in `composer.json` and `composer.lock` to use these host aliases instead of the default `github.com`.

4. **Authentication**: When Composer tries to access a private repository, it uses the corresponding host alias, which triggers SSH to use the correct key for authentication.

## Troubleshooting

- **SSH Key Issues**: Verify that the fingerprints in your CircleCI config match the keys added in the CircleCI settings.
- **Access Denied**: Ensure the public keys are correctly added to each GitHub repository.
- **URL Rewriting**: Check that all repository URLs are correctly updated in both `composer.json` and `composer.lock`.

## Security Considerations

- Generate unique keys for each repository to limit the scope of access if a key is compromised.
- Regularly rotate SSH keys as part of your security practices.
- Only grant write access to repositories when absolutely necessary.

## Related Documentation

- [Silta Documentation](https://wunderio.github.io/silta/)
- [CircleCI SSH Key Management](https://circleci.com/docs/2.0/add-ssh-key/)
- [GitHub Deploy Keys](https://docs.github.com/en/developers/overview/managing-deploy-keys)