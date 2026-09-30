# ---------------------------------------------------------------------------
# Views
#
# Deployment views are the core of this baseline — one per supported cloud.
# The landscape, context and container views provide the model foundation and
# serve the non-technical and onboarding audiences.
#
# Component (L3) and dynamic views are deliberately absent from the baseline.
# ---------------------------------------------------------------------------

systemLandscape "landscape" "Everything Silta touches, and who touches it." {
    include *
    autolayout lr
}

systemContext silta "ctx-platform" "Silta Cluster Platform in context — what the cluster offers and what it depends on." {
    include *
    autolayout lr
}

systemContext projectApp "ctx-project" "A hosted project environment in context — the view to show a product owner." {
    include *
    autolayout lr
}

systemContext toolchain "ctx-toolchain" "The delivery toolchain in context — how a commit becomes a running environment." {
    include *
    autolayout lr
}

systemContext dashboard "ctx-dashboard" "The dashboard in context — self-service access to clusters." {
    include *
    autolayout lr
}

container silta "cnt-platform" "Shared cluster services installed by the silta-cluster chart." {
    include *
    autolayout tb
}

container projectApp "cnt-project" "Inside one Helm release: the containers that make up a single environment." {
    include *
    autolayout tb
}

container toolchain "cnt-toolchain" "The pieces of the delivery toolchain and how they hand off to each other." {
    include *
    autolayout lr
}

container dashboard "cnt-dashboard" "Inside the Silta Dashboard." {
    include *
    autolayout lr
}

deployment * "GKE" "dep-gke" "Deployment — Google Kubernetes Engine (reference platform)." {
    include *
    autolayout tb
}

deployment * "EKS" "dep-eks" "Deployment — Amazon EKS." {
    include *
    autolayout tb
}

deployment * "AKS" "dep-aks" "Deployment — Azure AKS." {
    include *
    autolayout tb
}

deployment * "UKS" "dep-uks" "Deployment — UpCloud UKS." {
    include *
    autolayout tb
}
