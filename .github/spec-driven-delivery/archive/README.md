# Historical archive index

Status: compatibility history for deliveries completed under the v2-v4 archive
contract. New v5 deliveries use PR-owned evidence and verified reset instead of
creating another permanent per-delivery archive.

| Delivery | Archived conclusion | Delivery record | State |
| --- | --- | --- | --- |
| WB38 | [Conclusion](WB38/solution-whiteboard.md) | [Record](../deliveries/WB38/record.md) | ARCHIVED |

Existing archive entries remain readable compatibility evidence. Follow the
[current PR evidence and reset contract](../../../docs/batch-review-and-recovery.md#pr-publication-and-retention)
for new delivery closure; do not copy a concluded whiteboard or delivery record
into this index merely to retain review history.

Historical reviewer receipts stay in Git; prospective review retention follows
the current PR evidence contract above.
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
