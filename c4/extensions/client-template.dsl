/**
 * Client workspace template.
 *
 * Copy this file into the client's repository, adjust the `extends` path (or
 * point it at a URL / published workspace), then delete the examples you do
 * not need. See extensions/README.md before you start.
 */
workspace extends ../workspace.dsl {

    name "Silta — <Client>"
    description "Client-specific C4 model, extending the Silta baseline."

    model {

        # --- The client's own systems -------------------------------------

        # crm = softwareSystem "Client CRM" "System of record for customer data." "External"
        # idp = softwareSystem "Client SSO" "Corporate identity provider used for editor login." "External"

        # --- Extra containers inside the hosted environment ----------------

        # !ref projectApp {
        #     queueWorker = container "Queue worker" "Processes asynchronous jobs from the application queue." "PHP CLI"
        # }
        # appRuntime -> queueWorker "Enqueues jobs for" "Redis"
        # appRuntime -> crm "Synchronises customer records with" "REST/HTTPS"
        # appRuntime -> idp "Authenticates editors against" "OIDC"

        # --- The client's real environments --------------------------------
        #
        # Extending a deployment environment defined in the baseline means
        # re-declaring it here with the same name and adding to it. Declaring
        # a new name gives the client a clean environment of their own.

        # deploymentEnvironment "Client production (GKE)" {
        #     deploymentNode "Google Cloud Platform" "client-prod project" "GCP" {
        #         infrastructureNode "Cloud SQL" "Managed MySQL replacing the in-cluster MariaDB." "Cloud SQL"
        #     }
        # }
    }

    views {

        # Client-specific views. Everything from the baseline is inherited, so
        # only add what the baseline does not already cover.

        # systemContext projectApp "ctx-client" "The hosted site and the client systems around it." {
        #     include *
        #     autolayout lr
        # }

        # deployment * "Client production (GKE)" "dep-client-prod" "Deployment — client production." {
        #     include *
        #     autolayout tb
        # }
    }
}
