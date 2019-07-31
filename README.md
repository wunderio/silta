# Silta

Silta is a combination of open source tools and cloud services to provide a 
simple but flexible, self-service infrastructure for development teams, as well 
as a stable production hosting.

## Documentation

- [Key components](docs/key_components.md)
- [Docker images](docs/docker_images.md)
- [Creating a new project](docs/creating_a_new_project.md)
- [Mgrating an existing project](docs/migrating_existing_project.md)



## Request workflow
![request workflow](docs/img/Silta%20request%20workflow.png)

## Deployment workflow
![deployment workflow](docs/img/Silta%20deployment%20workflow.png)

## How it works in practice

All infrastructure configuration is based on Git, a deployment is triggered automatically when pushing code to Github. 
The Github status indicator next to each commit links to the CircleCI log output. 

Each branch is deployed to a dedicated environment based on its content. The URL of the 
environment can be found at the end of the CircleCI log output on a successful build.    


## FAQ

#### What does Silta mean?
It means "bridge" in Finnish.

#### Can I use Silta outside of Wunder?
Yes, our code is open. However, we haven't put special attention to this use case at this point.
