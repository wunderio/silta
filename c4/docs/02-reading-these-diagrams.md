## Reading these diagrams

The model is layered in the usual C4 way, and you can stop at whatever depth
answers your question.

| View | Answers |
| --- | --- |
| Landscape | Who touches Silta, and what Silta touches. |
| System context | What one part of Silta is for, and what it depends on. |
| Container | What that part is actually made of. |
| Deployment | Where those pieces run on a given cloud. |

Two visual conventions carry meaning:

- **Grey** means the element is outside Silta's control.
- **A dashed border** means the element is optional — enabled per cluster or
  per project, not present by default. Varnish, Elasticsearch, MinIO, the
  egress proxy and the in-cluster registry are all in this category. Reading a
  diagram without noticing the dashes is the quickest way to over-estimate
  what a stock Silta cluster gives you.

### Suggested route by audience

**Product owner or other non-technical stakeholder.** The landscape view, then
the project environment context view. Between them they show who is involved,
that every branch has a reviewable URL, and where the hand-off between the
agency, the platform and the cloud provider sits.

**Developer onboarding onto Silta.** The toolchain container view first — it
explains what actually happens between `git push` and a URL — then the project
environment container view, which is the thing your `silta.yml` configures.
The deployment view for your cluster's cloud comes last, when you need to know
why a file mount or an IP allow-list behaves the way it does.

**Partner developer.** Same route, plus the dashboard context view, since that
is how you get scoped access without anyone handing you cluster-admin rights.

**Operations engineer.** Start at the cluster platform container view, then go
straight to the deployment view for the cloud you are provisioning. The
vendor-specific notes at the top of each `deployment/*.dsl` file record the
constraints that are not visible in the boxes.
