# GKE Persistent Volume Migration & Snapshot Runbook

## Summary

This document details the procedure for migrating a GKE Persistent Volume (PV) provisioned with the legacy in-tree driver (`kubernetes.io/gce-pd`) to a modern CSI driver (`pd.csi.storage.gke.io`) with a target StorageClass (e.g. `premium-rwo` / `pd-ssd`), preserving all data and retaining the original PVC name to maintain Helm release consistency.

### Placeholders used in this runbook

| Placeholder | Meaning |
| --- | --- |
| `[namespace]` | Namespace of the workload |
| `[original-pvc-name]` | Existing PVC name (reused at the end) |
| `[statefulset-name]` | Workload StatefulSet |
| `[snapshot-name]` | Name for the GCP disk snapshot |
| `[new-disk-name]` | Name for the new `pd-ssd` disk |
| `[migrated-pv-name]` | Name for the new statically bound PV |
| `[original-pv-name]` | Original PV name (value of `$PV_NAME`) |
| `[gke-project-id]` | GCP project ID |
| `[gcp-zone]` | Zone of the disk (value of `$GCP_ZONE`) |
| `[disk-size]` | Disk size, e.g. `500Gi` |

---

## Migration Steps

### 1. Configure the Safety Net (Patch Reclaim Policy)

Patch the original PV's reclaim policy to `Retain` so that deleting the PVC in later steps will leave the underlying GCP disk untouched.

```bash
# 1. Identify the bound PV name
PV_NAME=$(kubectl get pvc [original-pvc-name] -n [namespace] -o jsonpath='{.spec.volumeName}')

# 2. Patch the PV reclaim policy to Retain
kubectl patch pv $PV_NAME -p '{"spec":{"persistentVolumeReclaimPolicy":"Retain"}}'
```

### 2. Scale Down Workload

Scale down the application workload to release volume locks and prevent active writes.

```bash
kubectl scale statefulset [statefulset-name] -n [namespace] --replicas=0
```

### 3. Take GCP Infrastructure Snapshot & Create New SSD Disk

Use `gcloud` to take a snapshot of the underlying persistent disk directly at the GCP compute layer, then create a new `pd-ssd` disk from it.

```bash
# 1. Identify the GCP disk name and zone
GCP_DISK_NAME=$(kubectl get pv $PV_NAME -o jsonpath='{.spec.gcePersistentDisk.pdName}')
GCP_ZONE=$(kubectl get pv $PV_NAME -o jsonpath='{.metadata.labels.topology\.kubernetes\.io/zone}')

# 2. Take the disk snapshot
gcloud compute disks snapshot $GCP_DISK_NAME \
    --snapshot-names=[snapshot-name] \
    --zone=$GCP_ZONE \
    --project=[gke-project-id]

# 3. Create the new pd-ssd disk from the snapshot
gcloud compute disks create [new-disk-name] \
    --source-snapshot=[snapshot-name] \
    --type=pd-ssd \
    --zone=$GCP_ZONE \
    --project=[gke-project-id]
```

> **Wait** until the new disk reports status `READY`:
>
> ```bash
> gcloud compute disks list --filter="name ~ [new-disk-name]"
> ```

### 4. Delete Original PVC

Remove the old PVC (the original disk remains protected by `Retain`).

```bash
kubectl delete pvc [original-pvc-name] -n [namespace]
```

### 5. Statically Bind New CSI PV and Recreate PVC

Apply a manifest declaring a statically bound `PersistentVolume` pointing to the newly created GCP disk, along with a matching `PersistentVolumeClaim` that reuses the original PVC name.

**`storage-migration.yaml`**

```yaml
apiVersion: v1
kind: PersistentVolume
metadata:
  name: [migrated-pv-name]
spec:
  capacity:
    storage: [disk-size]          # e.g. 500Gi
  accessModes:
    - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: premium-rwo
  csi:
    driver: pd.csi.storage.gke.io
    volumeHandle: projects/[gke-project-id]/zones/[gcp-zone]/disks/[new-disk-name]
    fsType: ext4
  nodeAffinity:
    required:
      nodeSelectorTerms:
        - matchExpressions:
            - key: topology.kubernetes.io/zone
              operator: In
              values:
                - [gcp-zone]
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: [original-pvc-name]
  namespace: [namespace]
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: premium-rwo
  volumeName: [migrated-pv-name]
  resources:
    requests:
      storage: [disk-size]        # e.g. 500Gi
```

Apply the manifest and scale up the StatefulSet to Bind it (as it waits for First Consumer):

```bash
kubectl apply -f storage-migration.yaml  
kubectl scale statefulset [statefulset-name] -n [namespace] --replicas=1
```

### 6. Run Deployment & Resume Workload

Remove StatefulSet orphaning to allow Helm to manage the new PVC and PV definitions cleanly.
```bash
# Orphan-delete the StatefulSet (leaves pods/PVC definitions clean for Helm)
kubectl delete statefulset [statefulset-name] -n [namespace] --cascade=orphan
```
Trigger CircleCI/CD pipeline to redeploy the workload with the new storage class and PV/PVC definitions.

---

## Rollback Plan (Using the Retained Original PV)

If restoring or mounting the new CSI volume fails, use this procedure to revert directly to the original untouched disk.

### 1. Delete the Failed New Resources

```bash
kubectl scale statefulset [statefulset-name] -n [namespace] --replicas=0
kubectl delete pvc [original-pvc-name] -n [namespace]
kubectl delete pv [migrated-pv-name]
```

### 2. Clear Claim Reference on Original PV

Because the original PVC was deleted, the retained original PV switches to state `Released`. Clear its old claim reference so Kubernetes makes it `Available` again.

```bash
kubectl patch pv $PV_NAME -p '{"spec":{"claimRef":null}}'
```

### 3. Statically Re-bind Original PV to Original PVC Name

**`rollback-pvc.yaml`**

```yaml
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: [original-pvc-name]
  namespace: [namespace]
spec:
  accessModes:
    - ReadWriteOnce
  storageClassName: standard      # Original storage class
  volumeName: [original-pv-name]  # Bound back to original $PV_NAME
  resources:
    requests:
      storage: [disk-size]        # e.g. 500Gi
```

```bash
kubectl apply -f rollback-pvc.yaml
kubectl scale statefulset [statefulset-name] -n [namespace] --replicas=1
```

Verify the PVC is bound to the original PV:
```bash
kubectl get pvc [original-pvc-name] -n [namespace]
kubectl get pv [original-pv-name] 
```

### 4. Run Deployment & Resume Workload

Edit storage type back to previous. 
Remove StatefulSet orphaning to allow Helm to manage the new PVC and PV definitions cleanly.
```bash
# Orphan-delete the StatefulSet (leaves pods/PVC definitions clean for Helm)
kubectl delete statefulset [statefulset-name] -n [namespace] --cascade=orphan
```
Trigger CircleCI/CD pipeline to redeploy the workload with the new storage class and PV/PVC definitions.