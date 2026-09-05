# Archive and update contract

Status: PROPOSED in the installation batch. No delivery has been archived.

After final merge and verification of the protected target, reconcile task,
plan, workflow, and review evidence. Finish post-merge human reviews before
closure. Preserve the concluded whiteboard in `archive/DELIVERY-ID/`, mark its
archived copy ARCHIVED, and link its delivery record bidirectionally. Verify
the copy and links before creating a new EMPTY working whiteboard. Never
overwrite accepted conclusions, decisions, or earlier evidence.

Concise records and reviewer receipts stay in Git. Bulky logs follow the
[quality policy](../../../docs/documentation-quality-policy.md#11-project-tooling-test-strategy)
retention rules. No raw credentials, machine-local paths, or private data are
archived. Cleanup removes only installer-owned runtime after delivery closure.

Maintainer owns drift review, quarterly and on upstream/security changes,
broken evidence links, or process failures. Re-enter using the manifest pin.
Upgrades use `./install-sdd.sh --upgrade` only between tasks, record the
assessment under `upgrades/`, and retain the active pin until reviewed
migration validation and owner cutover. Rollback reverts only the accepted
integration change through review; preserve existing project authorities and
historical records. No upstream update is adopted automatically.
