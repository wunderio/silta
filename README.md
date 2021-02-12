# Silta

Silta is a combination of open source tools and cloud services to provide a 
simple but flexible, self-service infrastructure for development teams, as well 
as a stable production hosting.

## Documentation

- [Online Docs 📔](https://wunderio.github.io/silta/)

### How it works
- [Key components](docs/key_components.md)
- [Request workflow](docs/request_workflow.md)
- [Deployment workflow](docs/deployment_workflow.md)
- [Docker images](docs/docker_images.md)

### Working with Silta
- [Creating a new project](docs/creating_a_new_project.md)
- [Migrating an existing project Drupal 8+](docs/migrating_existing_project.md)
- [Migrating an existing project Drupal 7](docs/migrating_drupal7_project.md)
- [Anatomy of a Silta project](docs/anatomy_of_a_silta_project.md)
- [CircleCI configuration examples](docs/circleci-examples.md)
- [silta.yml configuration examples](docs/silta-examples.md)
- [Encrypting sensitive configuration](docs/encrypting_sensitive_configuration.md)
- [Helping with Silta development](docs/helping_with_silta_development.md)
- [Troubleshooting](docs/troubleshooting.md)
- [Go-live checklist](docs/go-live-checklist.md)

## How it works in practice

All infrastructure configuration is based on Git, a deployment is triggered automatically when pushing code to Github. 
The Github status checks link to the CircleCI log output. 

Each branch is deployed to a dedicated environment based on its content. The URL of the 
environment can be found at the end of the CircleCI log output on a successful build.    


## FAQ

#### What does Silta mean?
It means "bridge" in Finnish.

#### Can I use Silta outside of Wunder?
Yes, our code is open. However, we haven't put special attention to this use case at this point.

#### Does Silta support multisite
This might be technically possible, but multisite setups provide little benefits in a container-based environment. 
Instead, it is recommended to trigger the deployment of multiple sites into dedicated environments from the same repository.