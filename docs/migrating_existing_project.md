---
id: migrating-an-existing-drupal-project
title: Migrating an existing Drupal project
--- 
## General tips

- We automate as much as possible, but many projects have project-specific differences.
- When in doubt, ask for advice.
- Ask any questions in our #dev-silta slack channel.

## Step by step instructions

1. Set up the project on CircleCI:

   - Make sure that you have admin permissions for the project repository on Github.
   - Log in with your Github credentials at https://circleci.com
   - Choose the right organisation and go to "Add Projects": https://circleci.com/add-projects/gh/wunderio
   - Find your project on the list and click on "set up project" (or "Follow project" if the project is already using CircleCI).

1. Make sure you have a clean, up-to-date checkout of your repository.

1. Create a new feature branch:

   ```
   git checkout -b feature/silta
   ```

1. Run the migration script from the project root:  
   For Drupal 8+  
   ```
   curl -s https://raw.githubusercontent.com/wunderio/silta/master/scripts/drupal-migrate.sh | bash
   ```
   For Drupal 7 with composer.json run      
   ```
   curl -s https://raw.githubusercontent.com/wunderio/silta/master/scripts/drupal7-migrate.sh | bash
   ```
   Please check [troubleshooting](troubleshooting.md) for other Drupal 7 cases  
   
   **Important**  
   Add to silta.yml config  
   ```
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
