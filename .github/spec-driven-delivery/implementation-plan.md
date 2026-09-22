# Implementation Plan — issue #121 test coverage and task-time boundary

<!-- sdd: implementation-plan -->

This plan owns the active state for [issue #121](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/121). Review and run evidence belongs in the pull request.

## Delivery status

| Field | Value |
| --- | --- |
| State | `VALIDATING` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | Human review before merge |
| Delivery branch / target | `codex/deferred-test-coverage-draft` → `main` |
| Owner | Repository owner |
| Primary issue / need | [#121](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/121) |
| Concluded whiteboard | [WB-121-1](solution-whiteboard.md), freeze commit `2b0d6f435a1c4c6be59f9d02cb786cffacbe966d` |
| Required reviewers | Same two retained feature-review sessions that approved and verified WB-121-1 |
| Last verified | T01 focused model tests 16/16; Markdown lint, structure, lifecycle, Mermaid, skill validation, runtime validation, and diff checks passed on 2026-09-23; final full validation unrun |

## Governing inputs and delivery boundaries

| Source | Authority for this delivery |
| --- | --- |
| [WB-121-1](solution-whiteboard.md) | D01–D04 and FC01; no whiteboard byte may change without prior human-authorized amendment |
| [Documentation Quality Policy](../../docs/documentation-quality-policy.md) and [Template Governance](../../docs/template-governance.md) | Quality and template outcomes; this delivery replaces the existing per-task test-creation and 60-minute wording only as accepted in WB-121-1 |
| [Contributing](../../CONTRIBUTING.md) and [workflow skill](../../skills/sdd-project-workflow/SKILL.md) | Delivery routing, review, final validation, and human merge authority |
| [Adoption manifest](project-adoption-manifest.md) | Installed playbook revision and stable project authorities; no feature status |

The outcome is a single, consistent coverage inventory in the implementation-plan template, focused test execution per task, and required non-focused test creation plus full applicable validation at the final gate. Task `DONE` may carry an explicit final-gate test obligation; it may not imply those tests ran. No new artifact, test framework, quota, or change to merge authority is authorized. Existing uncommitted wording drafted before WB-121-1 is not accepted by itself and must be reconciled to the frozen design.

## Test and acceptance contracts

This is the feature's coverage inventory, not a run log. The task ID identifies ownership; the PR will own actual check results. Reconcile every accepted changed outcome and material risk here again at final readiness, including omissions discovered then.

| Owning task | Design point / changed outcome or risk | Test or scenario | Coverage state | Work boundary |
| --- | --- | --- | --- | --- |
| T01 | D01–D02: template distinguishes focused proof, known missing tests, and final-gate obligations without blocking task `DONE` | Documentation-model assertions for coverage table and final-gate semantics | Implemented; focused test passed 16/16 | Focused task test |
| T01 | D03: 90-minute active-time stop and exclusions are consistent | Documentation-model assertions for policy, skill, README, and Contributing | Implemented; focused test passed 16/16 | Focused task test |
| T01 | D04: one canonical detailed rule and brief links elsewhere | Documentation structure/link check for affected Markdown | Existing | Focused task check |
| Final gate | FC01: no required test gap survives, recorded or newly found | Reconcile D01–D04 and material risks against this inventory; add any required non-focused test before final candidate review | No specific missing non-focused test identified yet; reassess after T01 | Final-gate work |
| Final gate | Exact-head full applicable validation | Repository documentation and test suite, including lifecycle and Mermaid checks | Existing; run evidence not yet available | Final-gate run after both retained reviewers approve the final head |

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| D01 | T01: extend existing plan-template coverage table with owning task and final-gate work | Focused model test and documentation structure | Aligned; no extra document |
| D02 | T01: align canonical policy and workflow guidance to permit recorded non-focused test creation at final gate; final-gate obligation reconciles all outcomes and gaps | Focused model test, exact-head reviews, then full applicable validation | Aligned; replaces current per-task creation wording |
| D03 | T01: change canonical active-time threshold to 90 minutes and require useful over-engineering assessment | Focused model test | Aligned; exclusions preserved |
| D04 | T01: keep detailed policy with short linked entry points; reconcile README, Contributing, and skill | Documentation checks and reviewer consistency inspection | Aligned |
| FC01 | Final gate: do not declare merge-ready while required test coverage is missing, recorded or newly found | Inventory reconciliation, affected focused checks, both retained reviews, full exact-head validation | Approved final-gate stop; does not block T01 `DONE` |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | PR |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | `DONE` | `None` | Reusable template, canonical policy, workflow guidance, entry points, and focused regression tests consistently implement D01–D04 | Preserve frozen design, existing final-gate review/merge controls, no new artifact or quota | Focused tests for changed files/lines passed; no specific missing non-focused test identified yet; final gate must reconcile again | `None` |

### T01 — reusable rule and coverage inventory

| Concern | Value |
| --- | --- |
| Outcome / non-scope | Implement D01–D04 and expose FC01 final-gate obligation; do not enforce test creation before task `DONE` |
| Source boundary | `templates/delivery/implementation-plan.md`, `docs/documentation-quality-policy.md`, `skills/sdd-project-workflow/SKILL.md`, `README.md`, `CONTRIBUTING.md`, affected tests |
| Consumed dependencies | WB-121-1 and manifest-pinned playbook revision `55fd9494bb7b96984114db27c0995a910da82f6b` |
| Critical obligations | Candidate wording must not claim deferred tests were implemented or run; no duplicate policy; preserve two retained reviewers and human merge authority |
| Required evidence | Focused tests and docs checks before task review; unrun final checks listed for final gate |
| Context receipt | Accepted source and current drafts read; draft's task-DONE test stop conflicts with WB-121-1 and must be corrected during T01 |
| Actual result | Draft's early task-DONE test stop removed; plan inventory, final-gate reconciliation, 90-minute rule, linked guidance, README diagram, and regression assertions updated. Focused model tests 16/16 and affected documentation/skill/runtime checks passed; reviewer and full-gate evidence pending. |

## Final-gate and completion obligations

Before the final candidate review, reconcile accepted changed outcomes and material risks against the inventory, add any missing required tests, run affected focused checks, and return the exact candidate to the same two reviewers. After both approve, run full applicable validation on that exact head. Corrections invalidate affected reviews and checks as required by the [quality policy](../../docs/documentation-quality-policy.md#review-and-human-brief). Human acceptance is required before merge. No current focused or final test result is claimed by this plan.

| Outcome | Required evidence | Current state |
| --- | --- | --- |
| D01–D04 and FC01 implemented | Candidate traceability to WB-121-1 and issue #121 | Pending |
| Task-focused proof | Changed-file/line tests and affected documentation checks | Model test 16/16, Markdown lint, structure, lifecycle, Mermaid, skill validation, runtime validation, and diff check passed in T01 worktree |
| Deferred coverage resolved | Final reconciliation plus tests added or evidenced unnecessary | Pending |
| Final applicable validation | Exact-head full validation after both retained reviewer approvals | Unrun |
| Merge-ready canonical state | Manifest and reusable docs current in candidate; whiteboard archived/reset only with prior human authorization at closing boundary | Pending |
| Review and merge | PR-owned reviewer findings, human authority, merge, and target verification | Pending |

## Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and outcomes | T01 candidate completes template, rule/guidance, and focused regressions; final gate still reconciles coverage and runs full validation | `DISCLOSE` |
| Design consistency | D01–D04 map to T01; FC01 maps to final gate; no new scope or status artifact | `DISCLOSE` |
| Important policy change | Replace the old per-task test-creation rule; task `DONE` may carry recorded non-focused test work to final gate | `DISCLOSE` |
| Validation | T01 focused model tests 16/16 and affected documentation/skill/runtime checks passed; full validation unrun | `DISCLOSE` |
| Risks or open decisions | No design gap identified; exact-candidate reviewer assessment and final-gate reconciliation pending | `AGENT_ACTION` |
| Decision requested | Review the T01 candidate after both retained reviewers finish; merge authority is not yet requested | `HUMAN_DECISION` |
