# Extending the baseline for a client

Do not copy `workspace.dsl`. Copy `client-template.dsl` into the client's own
repository and point it at this baseline. Everything in the base model —
people, cluster services, the shape of a release, all four deployment
environments — comes along, and the client workspace only carries what is
genuinely client-specific.

When the baseline changes (a new cluster service, a new cloud), client
workspaces inherit it on their next render. That is the whole point of keeping
the base free of client detail.

## What belongs in a client workspace

- The client's own software systems (the CRM, the commerce backend, the
  identity provider it federates with) and how the hosted environment talks
  to them.
- Extra containers inside the project environment: a queue worker, a search
  service the baseline does not model, a second application runtime.
- The actual environments the client runs, with real hostnames, real cluster
  names and real CDN configuration.
- Client-specific deployment nodes — a managed database instance, a VPN
  gateway, a partner's VPC peering.

## What does not

- Anything true of every Silta project. If you find yourself writing it twice
  for two clients, it belongs in this baseline instead.
- Secrets, keys, IP addresses that are not already public. A workspace is
  documentation, not a vault.

## Referencing base elements

`!ref` gets you a handle on something defined in the extended workspace, so
you can add relationships or nest new elements inside it:

```
!ref projectApp {
    queueWorker = container "Queue worker" "Processes asynchronous jobs." "PHP CLI"
}
```

Identifiers in the baseline are flat (`!identifiers flat`), so every name in
`model/` is directly addressable: `projectApp`, `appRuntime`, `ingressController`,
`cli`, and so on. Read `model/relationships.dsl` first — it is the single place
that shows how the base elements already connect.
