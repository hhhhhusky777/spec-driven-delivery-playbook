# Review batch — `<batch ID>`

<!-- sdd-schema: review-batch@4 -->

Use only with explicit project authority. Read the
[batch contract](../../docs/batch-review-and-recovery.md) before preparing this
record. Replace instructional values; the template itself grants no authority.
A batch groups review, never approves future outputs or overrides phase gates.
For `CLOSURE`, inventory the final archive/reset/cleanup plan and expected live
control fields in this one package. If the owner also pre-authorizes a later
control receipt, record its strict scope in the linked workflow using the
[post-merge receipt contract](../../docs/batch-review-and-recovery.md#one-closure-review-and-a-bounded-post-merge-receipt).
The receipt is not another semantic review and cannot include unseen content.

## Control

| Field | Value |
| --- | --- |
| Batch ID | `<record actual value or None>` |
| Delivery ID | `<record actual value or None>` |
| Repository | `<record actual value or None>` |
| Phase | PLANNING |
| Implementation workflow | `None` |
| Owner | `<record actual value or None>` |
| Preparation authority | `<record actual value or None>` |
| Authority evidence | `<record actual value or None>` |
| Allowed paths | `<record actual value or None>` |
| Approval owner | `<record actual value or None>` |
| Expiry/end condition | `<record actual value or None>` |
| Authority status | CURRENT |
| State | PREPARING |
| Previous state | PREPARING |
| Resume state | None |
| Base revision | `<record actual value or None>` |
| Candidate revision | `<record actual value or None>` |
| PR | `<record actual value or None>` |
| Self-review state | NOT_STARTED |
| Self-review candidate revision | `<record actual value or None>` |
| Self-review evidence | `<record actual value or None>` |
| Fresh-context review state | NOT_STARTED |
| Fresh-context review session ID | `<record actual value or None>` |
| Fresh-context assigned reviewers | `<record actual value or None>` |
| Fresh-context required approvals | 2 |
| Fresh-context approved reviewers | `<record actual value or None>` |
| Fresh-context reviewed revision | `<record actual value or None>` |
| Fresh-context review evidence | `<record actual value or None>` |
| Human review state | NOT_STARTED |
| Human reviewed revision | `<record actual value or None>` |
| Human review evidence | `<record actual value or None>` |
| Checkpoint | `<record actual value or None>` |
| Transient retry limit | 2 |
| No-progress limit | 2 |
| Transient retry count | 0 |
| No-progress count | 0 |
| Unresolved finding IDs | `<record actual value or None>` |
| Next action | `<record actual value or None>` |
| Action owner | `<record actual value or None>` |
| Execution authority | `<record actual value or None>` |
| Inputs freshness | `<record actual value or None>` |
| Phase prerequisites | `<record actual value or None>` |
| Completion evidence | `<record actual value or None>` |
| Closure acceptance | `<record actual value or None>` |

## Exact artifact inventory

Paths are project-root-relative and inside Allowed paths. Reviewed hashes are
`git:` plus the full blob SHA-1 or `sha256:` plus the full SHA-256. The artifact
inventory and control map must be complete before IN_REVIEW. No symbolic label
substitutes for a content hash. Retain immutable prior acceptance evidence.

For control-only reconciliation, optional Reviewed snapshot and Control delta
evidence columns use the shared contract's exact snapshot comparison. Never
substitute an unverified snapshot or use it to mask normative changes.

| Artifact ID | Path | Candidate hash | Depends on | Required control IDs | Disposition | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| `<ID>` | `<path>` | `<algorithm:hash>` | `<IDs or None>` | `<control IDs>` | `<disposition>` | `<exact evidence>` |

## Required controls

| Control ID | Owning source | Satisfaction point | Evidence | Disposition |
| --- | --- | --- | --- | --- |
| `<ID>` | `<canonical source>` | `<gate/action>` | `<actual evidence>` | `<disposition>` |

## Checkpoint and history

On an exception, apply [triage and upstream reporting](../../docs/batch-review-and-recovery.md#exception-triage-and-upstream-reporting)
and add the [triage fields](exception-triage.md) to the canonical checkpoint.
Reporting has no separate retry budget and does not grant recovery authority.

Link one canonical checkpoint with action/input IDs, prior verified state,
failure class, persistent counters, affected IDs, valid/invalid evidence,
observed external effects/IDs, next action, owner and unblock condition.
Append findings and reconciliation events; do not reset budgets on restart.
Record scoped implementation mode authority in the owning workflow; this record
cannot grant it. Required human design, closure and upgrade acceptance remains.
