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
images, push them to the registry and instruct Kontena to deploy our stack. The build process is based 
on a config file located under `.circleci/config.yml` in the git repository.

To perform its duties, CircleCI needs certain credentials, for example to push to the docker image 
registry or to interact with the Kontena master. These credentials are stored in the 
[CircleCI Contexts](https://circleci.com/docs/2.0/contexts/) `dev_wdr_io` and are available to any repository
in our Github organisation.  

### Kontena (for now)
Kontena is an open source container orchestration platform, as well as a hosted 
service which also includes a docker image registry which we currently use. Kontena worker nodes are regular
servers and can be located anywhere.

In Kontena, each application is described as a "stack" using a [kontena.yml file](https://kontena.io/docs/using-kontena/stack-file.html) 
which is located in the git repository. The stack file provided by the Drupal template is sufficient 
for a standard Drupal project, but you might need to adapt it to add services such as Elasticsearch.

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
- Watch your project build, the CircleCI output has a link to your   

## Deploying an existing WunderTools project
Get a copy of the WunderTools repository next to your project repository and copy the required files:
```
cp -R ../WunderTools/.circleci .
cp -R ../WunderTools/drupal/kontena.yml drupal/
cp -R ../WunderTools/drupal/Dockerfile drupal/
cp -R ../WunderTools/drupal/.dockerignore drupal/
cp -R ../WunderTools/drupal/web/Dockerfile drupal/web/
cp -R ../WunderTools/drupal/web/.dockerignore drupal/web/
```

Make sure your settings.php includes the following lines after the usual database credentials:

```
$databases['default']['default'] = [
  'database' =>  getenv('DB_NAME'),
  'username' => getenv('DB_USER'),
  'password' => getenv('DB_PASSWORD'),
  'host' => getenv('DB_HOST'),
  'port' => '3306',
  'driver' => 'mysql',
  'prefix' => '',
  'collation' => 'utf8mb4_general_ci',
];

```

Finally, enable CircleCI for your project (see above for details).

## FAQ

#### What does Silta mean?
It means "bridge" in Finnish.

#### Can I use Silta outside of Wunder?
Yes, there is nothing proprietary about Silta. However, we haven't put special attention to this use case at this point.