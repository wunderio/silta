---
id: migrating-an-existing-drupal-project
title: Migrating an existing Drupal project
--- 
## General tips

- We automate as much as possible, but many projects have project-specific differences.
- When in doubt, ask for advice.
- Ask any questions in our #dev-silta slack channel.

## Step by step instructions

1. Make sure you have a clean, up-to-date checkout of your repository.

1. Create a new feature branch:

   ```bash
   git checkout -b feature/silta
   ```

1. Run the migration script from the project root:  
   For Drupal 8+  
   ```bash
   curl -s https://raw.githubusercontent.com/wunderio/silta/master/scripts/drupal-migrate.sh | bash
   ```
   For Drupal 7 with composer.json run      
   ```bash
   curl -s https://raw.githubusercontent.com/wunderio/silta/master/scripts/drupal7-migrate.sh | bash
   ```
   Please check [troubleshooting](troubleshooting.md) for other Drupal 7 cases  
   
   Migration script will create `.circleci/config.yml` file for CircleCI builds. You might need to adapt branch names or contexts.

   **Important**  
   Add this to silta.yml config if You use Drupal 7 
   ```yaml
   php:
     drupalCoreVersion: "7"
   ```

1. Read through the output of the script and check for any instructions to perform manual steps.

1. Check modifications made by the script with `git diff`. Pay particular attention to code that has been removed, we don't want to lose anything important.

1. Commit all changes and push them to Github. You should see a build starting automatically on CircleCI: https://circleci.com/gh/wunderio

1. If the build has errors, try to fix them until the build is green.

   - The `build-deploy` is the one that matters the most. The `validation` job can point out issues with your code would prevent it from running. However, you may decide to ignore phpcs errors for now.
   - Have a look at our [troubleshooting](troubleshooting.md) section.

1. The last step of the `build-deploy` contains information on how to access your newly created Silta environment.

   - You should be able to access the site at the given URL with the given basic authentication username and password.
   - The site is not yet installed, we'll do that in the next step.
   - You should also be able to access the environment using the provided SSH instructions.

1. Upload a database dump using the command provided in CircleCI output.
   You might need to log in via SSH and clear the caches, import configuration or run updates if your database dump is not in sync with the current codebase.
   At this point you should have a somewhat functioning environment accessible.

1. Create a pull request for your feature branch, have a peer review it, and merge it.
   CircleCI should automatically build the master environment.

1. Upload the database dump and the files to the master environment.
   This is the _reference environment_ by default, meaning that new environments
   will be created with a copy of this content.

1. Congratulations, your project is now up and running! Please share any issues you had or ideas for improvements.

## Drupal 7 migration tips

### Project uses make file for builds  
Have something like this in .circleci/config.yml
```yaml
codebase-build:
   - run:
      name: Build from makefile
      command: |
         composer install
         vendor/drush/drush/drush make ~/project/drupal/conf/site.make ~/project/drupal/web/
         mkdir -p web/sites/all/modules
         cp -r code/modules/custom web/sites/all/modules/
```

### Missing drush
Add composer.json in Drupal folder
```json
{
    "require": {
        "drush/drush": "8.*"
    },
    "extra": {
        "installer-paths": {
            "web/": ["type:drupal-core"]
        }
    }
}
```

And then in .circleci/config.yml add
```yaml
command: |
   composer install
```
