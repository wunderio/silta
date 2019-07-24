# Silta

Silta is a combination of open source tools and cloud services to provide a 
simple but flexible, self-service infrastructure for development teams, as well 
as a stable production hosting. 

## Key components

### Github
All of our code is stored in Github within our organisation. All project-specific infrastructure
configuration is versioned in Git. We provide a default template for 
[Drupal projects](https://github.com/wunderio/drupal-project), but any Docker-compatible application
is supported. 

### CircleCI
CircleCI is a cloud-based CI solution that integrates very nicely with Github. 
One of the great features is the possibility to use your own Docker images, 
we use our own called [circleci-builder](https://github.com/wunderio/circleci-builder).

We use CircleCi to check the repository for errors, build the codebase, create custom docker 
images, push them to the registry and deploy a release of our Helm chart. The build process is based 
on a config file located under `.circleci/config.yml` in the git repository.

To perform its duties, CircleCI needs certain credentials, for example to push to the docker image 
registry or to interact with the Kubernetes master. These credentials are stored in a 
[CircleCI Contexts](https://circleci.com/docs/2.0/contexts/) and are available to any repository
in our Github organisation.  

### Kubernetes
[Kubernetes](https://kubernetes.io/) is an open source container orchestration platform supported by all major cloud hosting providers.

### Helm
[Helm](https://helm.sh/) is a package manager for Kubernetes. We published our own chart repository: https://github.com/wunderio/charts. The chart is referenced from the CircleCI configuration, and each repository can also override the default values to adapt the configuration.

## Request workflow
![request workflow](https://github.com/wunderio/silta/raw/master/Silta%20request%20workflow.png)

## Deployment workflow
![deployment workflow](https://github.com/wunderio/silta/raw/master/Silta%20deployment%20workflow.png)

## How it works in practice

All infrastructure configuration is based on Git, a deployment is triggered automatically when pushing code to Github. 
The Github status indicator next to each commit links to the CircleCI log output. 

Each branch is deployed to a dedicated environment based on its content. The URL of the 
environment can be found at the end of the CircleCI log output on a successful build.    

## Creating a new Drupal project

- Make a copy of Wunder's [drupal-project](https://github.com/wunderio/drupal-project), and push it as a new repository within the wunderio Github organisation.
- Setup your project:
    - Run your project locally with [lando](https://docs.devwithlando.io): `lando start`
    - Install composer dependencies with `lando composer install` and commit composer.lock and generated files in the `web` folder.
    - Install javascript dependencies with `yarn install` and commit the yarn.lock file.
    - Install Drupal with `lando drush site-install` and export the default configuration with `lando drush config-export`. 
- Log in to CircleCI with your Github credentials, select "wunderio" and [enable your project](https://circleci.com/add-projects/gh/wunderio).
!!!
It's not clear now what it means actually to "enable your project". We should add more details here:
a) user might be a repo admin - then (s)he should get instructions how to enable CircleCI integration in project settings
b) user is a regular user;then (s)he should ask someone whi is a repo admin to enable CircleCI integration.
!!!
- Watch your project build, the CircleCI output has a link to your deployed environment.  

## Deploying an existing Drupal project
We provide a script to convert existing Drupal projects by adding the required 
Silta configuration. The script also includes code to handle projects based
on the [WunderTools](https://github.com/wunderio/WunderTools/) template. To execute it, go to your project root, make sure you don't
have any uncommitted work and run the following command:

```
curl -s https://raw.githubusercontent.com/wunderio/silta/master/drupal-migrate.sh | bash
```

Have a look at the modifications made to your repository and commit them.
Finally, enable CircleCI for your project (see above for details).

Make sure you added `drupal/silta/` directory, `drupal/web/sites/default/settings.silta.php` file and that you have appropriate changes in `settings.php` file: include `settings.silta.php` if it's silta cluster env.
("have a look at modifications made to your repo and commit them" sounds not enough clear. At least, I did not add any of those files, except `settings.silta.php`.)

`drupal/silta/` diriectory should contain following files: `nginx.Dockerfile  php.Dockerfile  shell.Dockerfile  silta-prod.yml  silta.yml`.

Also make sure you added into git `drupal/web/.dockerignore` file.

If your project does not have any `npm` dependency in core (meaning that there is no `package(-lock).json` file in project `drupal/` dir),
then you will need to remove `npm-install-build` step from `.circleci/config.yml`. Otherwise build will fail on install npm command.

Some projects might have custom npm configuration. Then README should provide a hint how to run `npm install` on build step in custom location.

## FAQ

#### What does Silta mean?
It means "bridge" in Finnish.

#### Can I use Silta outside of Wunder?
Yes, our code is open. However, we haven't put special attention to this use case at this point.
