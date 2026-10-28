# ---------------------------------------------------------------------------
# Styles
#
# Two signals carry most of the meaning here:
#   * grey  = outside Silta's control (someone else's SLA);
#   * dashed = optional, enabled per cluster or per project rather than always
#     present. Reading a diagram without knowing which boxes are optional is
#     the fastest way to misjudge what Silta actually gives you by default.
# ---------------------------------------------------------------------------

styles {

    element "Element" {
        color #ffffff
    }

    element "Person" {
        shape Person
        background #1b4965
        color #ffffff
    }

    element "Software System" {
        background #2a6f97
        color #ffffff
    }

    element "Container" {
        background #468faf
        color #ffffff
    }

    element "Component" {
        background #61a5c2
        color #ffffff
    }

    element "External" {
        background #8d99ae
        color #ffffff
    }

    element "Optional" {
        opacity 70
        border dashed
    }

    element "Database" {
        shape Cylinder
    }

    element "Deployment Node" {
        background #ffffff
        color #1b4965
        stroke #1b4965
    }

    element "Infrastructure Node" {
        background #c9d6df
        color #14213d
        shape RoundedBox
    }

    relationship "Relationship" {
        thickness 2
        color #55606e
    }
}

