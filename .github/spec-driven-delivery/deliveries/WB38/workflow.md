# WB38 — Delivery workflow

<!-- sdd-schema: delivery-workflow@2 -->

## Review attention

| ID / type | Canonical item | Important boundary | Reviewer |
| --- | --- | --- | --- |
| W01 / Attention | [Trial](../../live-trial.md) | Preparation only; drafts are not approved dependencies | Governance |
| W02 / Attention | [Route and manifest](#2-routing-and-delivery-manifest) | Systemic policy change needs complete control audit | Governance and tests |
| W03 / Attention | [Freshness](#3-dependencies-and-blockers) | Version binding and affected-dependency invalidation | Both |
| W04 / Attention | [Implementation plan](implementation-plan.md) | No READY or task start before package acceptance and fresh preflight | Both |
| W05 / Decision later | [Review boundary](#4-action-and-review-order) | One package acceptance after both reviewers pass | Owner |

## 1. Workflow control

| Field | Value |
| --- | --- |
| Delivery | WB38 — full-lifecycle playbook efficiency |
| State | DELIVERY_ACTIVE |
| Previous state | GATES_READY |
| Owner | Repository owner |
| Concluded whiteboard | [WB38-R03](../../solution-whiteboard.md) |
| Approved workflow handoff | [Accepted H02](handoff.md) |
| Consumed handoff version | WB38-H02 |
| Whiteboard conclusion version/date | WB38-R03; 2026-09-05 |
| Trigger mode | MANUAL_INVOCATION |
| Trigger identity/run ID | WB38-TRIGGER-01; 2026-09-05; owner manual invocation |
| Selected route | Route 3 — systemic design/policy gap |
| Manifest review state | APPROVED |
| Current artifact/gate | [T04 PR 49](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/49) |
| Current review phase | IMPLEMENTATION |
| Current review target ID | T04 |
| Current artifact review state | IN_REVIEW |
| Self-review state | SELF_REVIEW_PASSED |
| Self-review candidate revision | T04-R02 |
| Self-review evidence | [T04 self-review](T04-evidence.md) |
| Fresh-context review state | IN_REVIEW |
| Fresh-context review session ID | WB38-T04-S01 |
| Fresh-context assigned reviewers | /root/wb38_t04_r1, /root/wb38_t04_r2 |
| Fresh-context required approvals | 2 |
| Fresh-context approved reviewers | None |
| Fresh-context reviewed revision | None |
| Fresh-context review evidence | [T04 packet](../../reviews/WB38-T04-S01.md) |
| Human review state | NOT_STARTED |
| Human reviewed revision | None |
| Human review evidence | None |
| Implementation continuation mode | HUMAN_REVIEW_BEFORE_MERGE |
| Implementation mode authority | Owner current-policy choice; T04/T05 design and implementation approved after PR48 review |
| Implementation mode scope | T01, T02, T04, T05 |
| Implementation repository | `https://github.com/hhhhhusky777/spec-driven-delivery-playbook` |
| Implementation mode selected at | 2026-09-05T17:22:26+08:00 |
| Next action | Implement accepted T04 with one consolidated readiness check |
| Next action target IDs | T04 |
| Allowed write scope | config; scripts/sdd-lifecycle.mjs; tests/sdd-lifecycle.test.mjs; templates/workflows/sdd-delivery-workflow.md; templates/delivery/implementation-plan.md; templates/reviews/review-batch.md; docs/batch-review-and-recovery.md; README.md; CHANGELOG.md; examples; .github/spec-driven-delivery/deliveries/WB38; .github/spec-driven-delivery/reviews |
| Next action write targets | .github/spec-driven-delivery/deliveries/WB38; .github/spec-driven-delivery/reviews |
| Review mode | EXPLICIT_REVIEW |
| Review mode authority | Owner scoped live-trial approval; linked above |
| Automation boundary | Not applicable |
| Required automatic gates | Not applicable |
| Automatic gate result | NOT_APPLICABLE |
| Semantic decision introduced | YES |
| Automation exception | Scoped provisional preparation only |
| Automation audit record | No automatic execution or approval |
| Last routed | WB38-TRIGGER-01; 2026-09-05 |
| Draft version | WB38-W04 |

The accepted H02 handoff was consumed once as WB38-TRIGGER-01. Current control
fields and the final acceptance record supersede historical preparation wording.
Freshness is not approval. No source-policy change is active merely because
its proposed delivery has a plan.

## 2. Routing and delivery manifest

Governing authority: [registry](../../project-contracts.md),
[Contributing](../../../../CONTRIBUTING.md),
[quality policy](../../../../docs/documentation-quality-policy.md), then
[Template Governance](../../../../docs/template-governance.md).
The pinned templates are resolved by the verified runtime. The scoped trial
changes preparation cadence only.

Classification: systemic scope, high governance/security consequence, controlled
but externally consumed document compatibility, reversible through reviewed
revert but not erasure of published history. No product database, billing or
application API. Publication side effects require exact-head reconciliation.
Route 0 is insufficient; FULL planning and an existing-control audit are required.
No new architectural service is selected; a separate ADR is unnecessary.

<!-- sdd-section: delivery-manifest -->

| Order | Artifact ID | Artifact | Decision | Reason/trigger | Template or authority | Owner | Review owner | Review state/link |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | whiteboard | Accepted conclusion | REUSE | Owner accepted WB38-R03 | [Conclusion](../../solution-whiteboard.md) | Owner | Two WB38 reviewers and owner | APPROVED / WB38-S01 |
| 1 | handoff | Handoff | GENERATE | Normalize accepted requirements | [H02](handoff.md) | Coordinator | Two planning reviewers and owner | APPROVED / WB38-PLAN-S01 and final owner acceptance |
| 2 | workflow | Workflow manifest | GENERATE | Route systemic change | This document | Coordinator | Two planning reviewers and owner | APPROVED / WB38-PLAN-S01 and final owner acceptance |
| 3 | audit | Clause/assertion inventory | GENERATE | PG-01 through PG-04 affect existing controls | [Audit](control-audit.md) | Coordinator | Governance and tests | APPROVED / WB38-PLAN-S01 and final owner acceptance |
| 4 | plan | FULL implementation plan | GENERATE_FULL | Specify coherent changes and failure cases | [Plan](implementation-plan.md) | Coordinator | Governance and tests, then owner | APPROVED / WB38-PLAN-S01 and final owner acceptance |
| 4a | contracts | Proposed system contracts | GENERATE | Specify BC01-BC08 for implementation | [Contracts](design-contracts.md) | Coordinator | Two planning reviewers and owner | APPROVED / WB38-PLAN-S01 and final owner acceptance |
| 7 | adr | Separate ADR | SKIP | No new service or difficult-to-reverse architecture selected | Plan inline decisions | Owner | Planning reviewers | NOT_STARTED |
| 8 | runtime | Runtime fixes and pin upgrade | DEFER | Independent issues 33, 34 and 36; pin upgrade separately controlled | Whiteboard non-scope | Owner | Planning reviewers | NOT_STARTED |

Artifact decisions remain proposals until joint acceptance. Shared policy
changes are deliverables, not falsely active prerequisites. The audit and BC01-BC08 specify the proposed-adoption boundary for joint
acceptance. Global policy is not active before reviewed merge.

### Future output obligations

The readiness manifest above selects design inputs, not future implementation
results. The following required outputs remain in scope, unimplemented and
unapproved. Moving their representation does not defer their delivery or remove
their dependencies, owners or gates.

| Output ID | Obligation / owner | Required inputs or completed outputs | Satisfaction gate | Actual evidence |
| --- | --- | --- | --- | --- |
| policy | UPDATE_EXISTING policy/schema owners; maintainer | Accepted plan; BC01-BC08 and audit | T01 PR review and owner merge approval | NOT_STARTED |
| consumers | UPDATE_EXISTING templates, skills, guidance, examples; maintainer | policy changes within the coherent T01 unit | Same T01 PR review and owner merge approval | NOT_STARTED |
| T01-result | Core implementation; coordinator | Accepted T01 specification/context, plan, audit, contracts | T01 tests, PR reviews, owner merge and target verification | NOT_STARTED |
| T02-result | Publication helper; coordinator | T01 DONE/current, accepted T02 specification, plan, contracts | T02 tests/live evidence, PR reviews, owner merge and target verification | NOT_STARTED |
| record | GENERATE validation and closure packet; coordinator | T01-T05 terminal after amendment acceptance, integrated target verified | Two closure reviewers and owner acceptance | NOT_STARTED |

At their actual review/consumption boundaries, register produced output evidence
with its exact revision in the live dependency register before using it. Do not
replace task-specification IDs with output meanings. T01-result/T02-result
distinguish future results from the stable task IDs used for mode scope and PR
history. The plan owns T02's execution dependency on completed T01; current
specification inputs never certify that dependency complete. Closure remains
blocked until all task and target evidence exists.

## 3. Dependencies and blockers

<!-- sdd-section: artifact-dependencies -->

| Artifact ID | Artifact/link | Depends on | Consumed version | Current version | Change impact | Freshness | Blocked by |
| --- | --- | --- | --- | --- | --- | --- | --- |
| whiteboard | [Conclusion](../../solution-whiteboard.md) | None | WB38-R03 | WB38-R03 | CONTROL_ONLY | CURRENT | None |
| handoff | [Handoff](handoff.md) | whiteboard | WB38-H02 | WB38-H02 | CONTROL_ONLY | CURRENT | None |
| workflow | This document | handoff | WB38-W04 | WB38-W04 | CONTROL_ONLY | CURRENT | None |
| audit | [Control audit](control-audit.md) | whiteboard | WB38-A02 | WB38-A02 | CONTROL_ONLY | CURRENT | None |
| contracts | [BC01-BC08](design-contracts.md) | whiteboard | WB38-C01 | WB38-C01 | CONTROL_ONLY | CURRENT | None |
| plan | [Plan](implementation-plan.md) | workflow, audit, contracts | WB38-P04 | WB38-P04 | CONTROL_ONLY | CURRENT | None |
| adr | Not selected | None | None | None | CONTROL_ONLY | CURRENT | None |
| runtime | Deferred independent scope | None | None | None | CONTROL_ONLY | CURRENT | None |
| T01 | T01 specification and substantive context in plan | plan, audit, contracts | WB38-P04-T01-spec | WB38-P04-T01-spec | CONTROL_ONLY | CURRENT | None |
| T02 | T02 specification and substantive context in plan | T01, plan, contracts | WB38-P04-T02-spec | WB38-P04-T02-spec | CONTROL_ONLY | CURRENT | None |
| T03 | [Brief amendment](review-brief-amendment.md) | plan, contracts | 07a717ca2ad66f8758c28603bb60c8baeb6bfe54 | 07a717ca2ad66f8758c28603bb60c8baeb6bfe54 | CONTROL_ONLY | CURRENT | None |
| readiness-amendment | [Accepted contract](readiness-triage-amendment.md) | plan, contracts | 02fb0458da012bffd0be0fdb2c12ba0c46988809 | 02fb0458da012bffd0be0fdb2c12ba0c46988809 | CONTROL_ONLY | CURRENT | None |
| T04 | Accepted readiness specification | readiness-amendment, T01, T03 | 02fb0458da012bffd0be0fdb2c12ba0c46988809 | 02fb0458da012bffd0be0fdb2c12ba0c46988809 | CONTROL_ONLY | CURRENT | None |

Draft predecessor identities are H02/W04/A02/C01/P04. Freeze actual content hashes
before review; these labels alone are not immutable receipts. STALE here
explicitly prohibits consumption; the trial permits only preparation against
these known drafts. On material changes, invalidate transitive dependants;
unknown impact fails closed. Control-only bookkeeping preserves frozen content.

<!-- sdd-section: blocker-register -->

| Blocker ID | Evidence/unblock condition | Blocks | State | Owner |
| --- | --- | --- | --- | --- |

No unexpected external blocker. Incomplete planning and pending approval are
normal gates, not claims of missing user authority.

## 4. Action and review order

| Action | Scope | Gate / next boundary |
| --- | --- | --- |
| P01 preparation | Handoff, workflow, audit and plan as one provisional package | Complete audit/specification, exact hashes, required checks and self-review |
| P02 planning review | One coherent package, two fresh-context seats retained across rounds | Consolidated corrections then one owner acceptance table |
| P03 readiness | Record approved inputs and fresh pre-start evidence | Required implementation mode and context authority before T01 |
| T01 implementation | Core contracts/consumers/tests; task PR to feature branch | One planned full two-agent PR review; owner merge acceptance |
| T02 implementation | Optional publication helper after T01; task PR to feature branch | One planned full two-agent PR review; owner merge acceptance |
| C01 closure | Verified target, evidence, retrospective, record and archive plan | Combined closure review and owner acceptance |
| C02 mechanics | Only approved exact archive/link/reset/cleanup targets | Ordered verification; stop on mismatch or missing deletion authority |

No automatic action has executed. Current authorizations do not approve
future implementation, merge, archive, deletion, or runtime cutover.
Review findings and exact receipts remain in Git until the retention change
is separately effective; PR publication may supplement them now.

<!-- sdd-section: implementation-review-ledger -->

| Task/PR | Head and merge commit | Implementation mode/authority | Self-review | Fresh-context review | Required checks | Merge result | Human review | Findings/follow-up |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

## 5. Live delivery state and closure

<!-- sdd-section: delivery-state -->

| Field | Current value |
| --- | --- |
| Workflow state | DELIVERY_ACTIVE |
| Current artifact/task | T04 |
| Current artifact review | NOT_STARTED; T04 implementation |
| Last approved artifact | WB38-READINESS-R01; W04/P04 and checkpoint |
| Next ready action | Implement accepted T04 with one consolidated readiness check |
| Active blockers | None |
| Stale artifacts | None |
| Validation complete | No delivery validation |
| Validation remaining | T04/T05 amendment acceptance and implementation; final integrated validation and closure |
| Branch/PR | codex/task-46-phase-readiness; task PR not yet opened; target feature branch |
| Last updated | 2026-09-05 Asia/Shanghai |

Require all active tasks terminal and required evidence current before parent
validation. Resolve required post-merge human reviews before closure. Archive
the immutable conclusion and verify bidirectional record links before replacing
the working whiteboard; no deletion follows from this draft.

## 6. Change history

| Date | Event | Effect | Authority |
| --- | --- | --- | --- |
| 2026-09-05 | Prepared provisional H02/W01/A01/P01 package | No approval, consumption or execution transition | Owner scoped live trial |
| 2026-09-05 | W04 separates readiness inputs from future output obligations | Material representation amendment; all output duties preserved; no readiness transition yet | Owner approved correction; exact retained-seat review pending |

### Accepted-state reconciliation

Owner accepted the original merged planning package and exact W04/P04 readiness
amendment. Earlier draft/pending narrative describes preparation history; current
control tables and the R03 final acceptance record own live status. Normative
requirements and output obligations are unchanged. ROUTING follows the actual
AWAITING_HANDOFF state; subsequent transitions are recorded only as performed.

Readiness reconciliation traversed ROUTING -> MANIFEST_IN_REVIEW ->
ARTIFACTS_SELECTED -> ARTIFACT_GENERATING -> ARTIFACT_IN_REVIEW -> GATES_READY.
The unchanged lifecycle checker passed after each actual transition. Shared
exact acceptance supplies the selected prerequisite dispositions; future
outputs remain NOT_STARTED. Owner manual mode was recorded at GATES_READY.
