# Archive and update contract

Status: ACTIVE through the accepted installation/archive contract. WB38 is
archived. WB62 is an archive candidate in PR #65 and becomes authoritative only
after its closure review, owner acceptance and merge.

| Delivery | Archived conclusion | Delivery record | State |
| --- | --- | --- | --- |
| WB38 | [Conclusion](WB38/solution-whiteboard.md) | [Record](../deliveries/WB38/record.md) | ARCHIVED |
| WB62 | [Conclusion candidate](WB62/solution-whiteboard.md) | [Record candidate](../deliveries/WB62/record.md) | IN_REVIEW / PR #65 |

After final merge and verification of the protected target, reconcile task,
plan, workflow, and review evidence. Finish post-merge human reviews before
closure. Preserve the concluded whiteboard in `archive/DELIVERY-ID/`, mark its
archived copy ARCHIVED, and link its delivery record bidirectionally. Verify
the copy and links before creating a new EMPTY working whiteboard. Never
overwrite accepted conclusions, decisions, or earlier evidence.

Historical reviewer receipts stay in Git; prospective review retention follows
[the adopted PR evidence contract](../../../docs/batch-review-and-recovery.md#pr-publication-and-retention).
Bulky logs follow the
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
