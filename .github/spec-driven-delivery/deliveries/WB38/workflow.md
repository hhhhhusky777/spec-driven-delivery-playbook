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
| State | AWAITING_HANDOFF |
| Previous state | AWAITING_HANDOFF |
| Owner | Repository owner |
| Concluded whiteboard | [WB38-R03](../../solution-whiteboard.md) |
| Approved workflow handoff | Not approved; [provisional H02](handoff.md) |
| Consumed handoff version | None |
| Whiteboard conclusion version/date | WB38-R03; 2026-09-05 |
| Trigger mode | MANUAL_INVOCATION |
| Trigger identity/run ID | Not triggered |
| Selected route | Proposed Route 3 — systemic design/policy gap |
| Manifest review state | NOT_STARTED |
| Current artifact/gate | Provisional planning package |
| Current review phase | DESIGN |
| Current review target ID | workflow |
| Current artifact review state | IN_REVIEW |
| Self-review state | SELF_REVIEW_PASSED |
| Self-review candidate revision | WB38-PKG-R01 |
| Self-review evidence | [Package record](../../reviews/WB38-PLAN-S01.md) |
| Fresh-context review state | IN_REVIEW |
| Fresh-context review session ID | WB38-PLAN-S01 |
| Fresh-context assigned reviewers | /root/wb38_plan_r1, /root/wb38_plan_r2 |
| Fresh-context required approvals | 2 |
| Fresh-context approved reviewers | Not recorded |
| Fresh-context reviewed revision | Not recorded |
| Fresh-context review evidence | [Package record](../../reviews/WB38-PLAN-S01.md); pending receipts |
| Human review state | NOT_STARTED |
| Human reviewed revision | Not recorded |
| Human review evidence | Not recorded |
| Implementation continuation mode | NOT_SELECTED |
| Implementation mode authority | Not selected |
| Implementation mode scope | Not selected |
| Implementation repository | Not selected |
| Implementation mode selected at | Not selected |
| Next action | Joint exact-package review, consolidated corrections and owner acceptance |
| Next action target IDs | handoff, workflow, audit, contracts, plan |
| Allowed write scope | .github/spec-driven-delivery |
| Next action write targets | .github/spec-driven-delivery/deliveries/WB38 |
| Review mode | EXPLICIT_REVIEW |
| Review mode authority | Owner scoped live-trial approval; linked above |
| Automation boundary | Not applicable |
| Required automatic gates | Not applicable |
| Automatic gate result | NOT_APPLICABLE |
| Semantic decision introduced | YES |
| Automation exception | Scoped provisional preparation only |
| Automation audit record | No automatic execution or approval |
| Last routed | Not routed; provisional preparation on 2026-09-05 |
| Draft version | WB38-W02 |

The legacy lifecycle remains AWAITING_HANDOFF. The trial permits drafting the
combined package without pretending that routing or consumption occurred.
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
| 1 | handoff | Handoff | GENERATE | Normalize accepted requirements | [H02](handoff.md) | Coordinator | Two planning reviewers and owner | NOT_STARTED |
| 2 | workflow | Workflow manifest | GENERATE | Route systemic change | This document | Coordinator | Two planning reviewers and owner | NOT_STARTED |
| 3 | audit | Clause/assertion inventory | GENERATE | PG-01 through PG-04 affect existing controls | [Audit](control-audit.md) | Coordinator | Governance and tests | NOT_STARTED |
| 4 | plan | FULL implementation plan | GENERATE_FULL | Specify coherent changes and failure cases | [Plan](implementation-plan.md) | Coordinator | Governance and tests, then owner | NOT_STARTED |
| 4a | contracts | Proposed system contracts | GENERATE | Specify BC01-BC08 for implementation | [Contracts](design-contracts.md) | Coordinator | Two planning reviewers and owner | NOT_STARTED |
| 5 | policy | Existing policy/schema owners | UPDATE_EXISTING | Formalize PG-01 through PG-04 and G-04 | Audit source inventory | Maintainer | Two PR reviewers and owner | NOT_STARTED |
| 6 | consumers | Templates, skills, guidance, examples | UPDATE_EXISTING | Prevent contradictory cadence | Plan T01 | Maintainer | Two PR reviewers and owner | NOT_STARTED |
| 7 | adr | Separate ADR | SKIP | No new service or difficult-to-reverse architecture selected | Plan inline decisions | Owner | Planning reviewers | NOT_STARTED |
| 8 | runtime | Runtime fixes and pin upgrade | DEFER | Independent issues 33, 34 and 36; pin upgrade separately controlled | Whiteboard non-scope | Owner | Planning reviewers | NOT_STARTED |
| 9 | record | Validation and closure packet | GENERATE | Final evidence, retrospective and archive plan | Registry/archive contract | Coordinator | Two closure reviewers and owner | NOT_STARTED |

Artifact decisions remain proposals until joint acceptance. Shared policy
changes are deliverables, not falsely active prerequisites. The audit and BC01-BC08 specify the proposed-adoption boundary for joint
acceptance. Global policy is not active before reviewed merge.

## 3. Dependencies and blockers

<!-- sdd-section: artifact-dependencies -->

| Artifact ID | Artifact/link | Depends on | Consumed version | Current version | Change impact | Freshness | Blocked by |
| --- | --- | --- | --- | --- | --- | --- | --- |
| whiteboard | [Conclusion](../../solution-whiteboard.md) | None | WB38-R03 | WB38-R03 | CONTROL_ONLY | CURRENT | None |
| handoff | [Handoff](handoff.md) | whiteboard | None | WB38-H02 | MATERIAL | STALE | None |
| workflow | This document | handoff | None | WB38-W02 | MATERIAL | STALE | None |
| audit | [Control audit](control-audit.md) | whiteboard | None | WB38-A02 | MATERIAL | STALE | None |
| contracts | [BC01-BC08](design-contracts.md) | whiteboard | None | WB38-C01 | MATERIAL | STALE | None |
| plan | [Plan](implementation-plan.md) | workflow, audit, contracts | None | WB38-P02 | MATERIAL | STALE | None |
| policy | Proposed policy/schema change | plan | None | Not generated | UNKNOWN | STALE | None |
| consumers | Proposed consumers | policy | None | Not generated | UNKNOWN | STALE | None |
| adr | Not selected | None | None | None | CONTROL_ONLY | CURRENT | None |
| runtime | Deferred independent scope | None | None | None | CONTROL_ONLY | CURRENT | None |
| T01 | Core implementation unit | plan, audit, contracts | None | Not started | UNKNOWN | STALE | None |
| T02 | Publication helper | T01, plan, contracts | None | Not started | UNKNOWN | STALE | None |
| record | Future closure | T01, T02 | None | Not generated | UNKNOWN | STALE | None |

Draft predecessor identities are H02/W02/A02/C01/P02. Freeze actual content hashes
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
| Workflow state | AWAITING_HANDOFF |
| Current artifact/task | Complete proposed planning package |
| Current artifact review | IN_REVIEW; receipts pending |
| Last approved artifact | WB38-R03 whiteboard |
| Next ready action | Joint exact-package review |
| Active blockers | None |
| Stale artifacts | handoff, workflow, audit, contracts, plan, policy, consumers, T01, T02, record |
| Validation complete | No delivery validation |
| Validation remaining | Planning checks/review; all implementation and closure evidence |
| Branch/PR | codex/task-38-adoption-efficiency-design; no PR opened |
| Last updated | 2026-09-05 Asia/Shanghai |

Require all active tasks terminal and required evidence current before parent
validation. Resolve required post-merge human reviews before closure. Archive
the immutable conclusion and verify bidirectional record links before replacing
the working whiteboard; no deletion follows from this draft.

## 6. Change history

| Date | Event | Effect | Authority |
| --- | --- | --- | --- |
| 2026-09-05 | Prepared provisional H02/W01/A01/P01 package | No approval, consumption or execution transition | Owner scoped live trial |
