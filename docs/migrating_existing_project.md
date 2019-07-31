# Migrating an existing Drupal project

We provide a script to convert existing Drupal projects by adding the required 
Silta configuration. The script also includes code to handle projects based
on the [WunderTools](https://github.com/wunderio/WunderTools/) template. To execute it, go to your project root, make sure you don't
have any uncommitted work and run the following command:

```
curl -s https://raw.githubusercontent.com/wunderio/silta/master/drupal-migrate.sh | bash
```

Have a look at the modifications made to your repository and commit them.
Finally, enable CircleCI for your project (see above for details).
