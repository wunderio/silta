/**
 * Silta — base C4 model.
 *
 * This workspace is the *platform baseline*. It describes Silta itself:
 * the delivery toolchain, the cluster services, the shape of a deployed
 * project environment, and how all of that lands on each supported cloud.
 *
 * It deliberately contains no client-specific detail. Client workspaces
 * extend this file instead of copying it — see extensions/README.md.
 */
workspace "Silta" "Base C4 architecture model of the Silta hosting platform." {

    !identifiers flat

    !docs docs

    model {
        !include model/people.dsl
        !include model/external-systems.dsl
        !include model/toolchain.dsl
        !include model/platform.dsl
        !include model/project-environment.dsl
        !include model/dashboard.dsl
        !include model/relationships.dsl

        !include deployment/gke.dsl
        !include deployment/eks.dsl
        !include deployment/aks.dsl
        !include deployment/uks.dsl
    }

    views {
        !include views/views.dsl
        !include views/styles.dsl
    }
}
