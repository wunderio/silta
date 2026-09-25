# Silta — C4 architecture model

A base-level C4 model of the Silta platform, written in
[Structurizr DSL](https://docs.structurizr.com/dsl). One model, thirteen
views, no client-specific detail — client workspaces extend this one rather
than forking it.

## Run it locally

Docker is the only prerequisite — nothing is installed on your machine.

```bash
cd c4 && docker compose up
```

Then open <http://localhost:8080>. You land on the workspace: diagrams on one
tab, the prose from `docs/` on another.

Structurizr re-reads `workspace.dsl` on every page load, so the loop is edit a
`.dsl` file, refresh the browser. No restart, no rebuild.

`Ctrl-C` to stop, or `docker compose down` from another terminal.

### If you prefer plain docker

```bash
docker run -it --rm -p 8080:8080 \
  --user "$(id -u):$(id -g)" \
  -v "$PWD:/usr/local/structurizr" \
  structurizr/structurizr local
```

### Two things that will otherwise catch you out

**Use `structurizr/structurizr local`, not `structurizr/lite`.** As of 2026 the
`lite` image is a stub that prints a migration notice and exits 0. The
container disappears before it binds the port, so the symptom is a connection
refused on 8080 that looks like a networking problem and is not one.

**The `--user` mapping matters.** Running writes `workspace.json` and
`.structurizr/` into this folder. Without it they are created as root and you
will need sudo to delete them. Both are gitignored; `workspace.json` is where
hand-tuned diagram layouts live, so if you ever drop `autolayout` from a view
and arrange it by hand, un-ignore it and commit it.

## Export it

```bash
./export.sh              # Mermaid, into export/
./export.sh plantuml     # or plantuml, c4plantuml, dot, json, ...
```

## Check it

```bash
docker run --rm -v "$PWD:/workspace" -w /workspace structurizr/structurizr validate --workspace workspace.dsl
```

## What is in here

| Path | |
| --- | --- |
| `workspace.dsl` | Entry point. Includes everything else. |
| `model/people.dsl` | The six audiences the model is drawn for. |
| `model/external-systems.dsl` | Everything Silta depends on but does not operate. |
| `model/toolchain.dsl` | The CI-side of Silta: orb, CLI, charts, images, docs. |
| `model/platform.dsl` | Shared cluster services from the `silta-cluster` chart. |
| `model/project-environment.dsl` | The containers inside one Helm release. |
| `model/dashboard.dsl` | The Silta Dashboard. |
| `model/relationships.dsl` | Every relationship, in one readable file. |
| `deployment/*.dsl` | One deployment environment per cloud: GKE, EKS, AKS, UKS. |
| `views/views.dsl` | View definitions. |
| `views/styles.dsl` | Element and relationship styling. |
| `docs/` | Prose rendered next to the diagrams by Structurizr. |
| `extensions/` | How to build a client workspace on top of this one. |

## Views

**Landscape** — everything and everyone, one page.

**System context** (4) — the cluster platform, a project environment, the
delivery toolchain, the dashboard.

**Container** (4) — the same four, opened up.

**Deployment** (4) — GKE, EKS, AKS and UKS. These are the point of the
baseline: same model, four different infrastructure realities.

Component-level (L3) and dynamic views are not in the baseline yet. The
deployment pipeline and the HTTP request path are the two obvious candidates —
both are currently only documented as PNGs on the docs site.

## Conventions

- Grey elements are outside Silta's control.
- Dashed borders mean optional — enabled per cluster or per project.
- Identifiers are flat, so every element in `model/` is directly addressable
  from a client workspace.

## Sources

The model was derived from the sibling Silta repositories — `charts`,
`silta-circleci`, `silta-cli`, `silta-dashboard`, `silta-images`,
`wunder-silta-cluster`, `fastly-terraform` — and from the documentation in
`../docs`, published at <https://wunderio.github.io/silta>.

It is hand-written, not generated. When those repositories change, this model
has to be changed with them.

It deliberately sits outside `../docs`: that directory is the Docusaurus
source, where every `.md` file becomes a published page. A Structurizr
workspace is not a set of pages, so it lives here instead.
