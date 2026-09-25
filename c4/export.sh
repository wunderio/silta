#!/usr/bin/env bash
# Export every view to a diagram format.
#
#   ./export.sh              # mermaid, into export/
#   ./export.sh plantuml     # any format the exporter supports
#
# Formats: mermaid, plantuml, c4plantuml, dot, websequencediagrams, ilograph, json
set -euo pipefail

format="${1:-mermaid}"
outdir="${2:-export}"

mkdir -p "$outdir"
docker run --rm \
  --user "$(id -u):$(id -g)" \
  -v "$PWD:/workspace" -w /workspace \
  structurizr/structurizr \
  export --workspace workspace.dsl --format "$format" --output "$outdir"

echo "Exported $(find "$outdir" -type f | wc -l) diagrams to $outdir/ as $format."
