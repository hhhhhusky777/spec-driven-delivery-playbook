# Delivery archive — issue #121 test coverage and task-time boundary

<!-- sdd: delivery-archive -->

| Field | Value |
| --- | --- |
| Issues | [#121](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/121) |
| Closing pull request | [#122](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/122) |

<!-- sdd: archived-whiteboard -->

## Solution whiteboard — focused-test coverage and task-time attention

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [#121](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/121) |
| Owner | Repository owner |
| Concluded design revision | `WB-121-1` |
| Open owner decisions | `None` |

### Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| DR01 | A task runs focused tests for its changed files and lines; full applicable validation runs at the final merge-back gate. | accepted |
| DR02 | The plan should show which tests are deferred to the final gate and which coverage is still missing for all changed outcomes and material risks. | changed |
| DR03 | Increase the active-implementation attention boundary from 60 to 90 minutes per task, excluding interruptions, review, and external waits. | accepted |
| DR04 | At that boundary, explain expected work versus unexpected cases and whether remaining work protects the accepted outcome or is over-engineering. | accepted |
| DR05 | Do not make every task run the entire suite or duplicate PR evidence in the plan. | accepted |
| DR06 | Reviewer challenge: tie each coverage item to its owning task and allow justified plan-level correction of an obsolete test row without changing accepted design. | changed |
| DR07 | Owner correction at the human gate: a task may be `DONE` with required non-focused tests still missing if their addition is recorded for the final gate. | accepted |

### Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem | Focused test results alone may hide tests owed to the final gate or coverage that has not been implemented. The 60-minute attention stop can interrupt a proportionate task too early without explaining where time went. |
| Required outcome | At task completion, focused tests pass and missing non-focused tests are visibly assigned to the final gate. Before final merge review, add those tests; then complete the final candidate's review and full validation. A 90-minute active-time stop supplies a concise, useful over-engineering assessment. |
| In scope | Reusable implementation-plan template, canonical quality policy, workflow skill routing, concise README/Contributing links, focused regression tests. |
| Out of scope | New test framework, universal suite or coverage quota, extra status document, change to final-gate validation or reviewer/merge authority. |

### Authority and context

| Source | Authority or relevant content | Freshness / verification |
| --- | --- | --- |
| [Issue #121](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/121) and owner discussion | Requested outcomes, final-gate test addition, and 90-minute boundary | Issue updated to match latest explicit owner correction on 2026-09-23 |
| [Documentation Quality Policy](../../../docs/documentation-quality-policy.md) | Canonical testing and owner-attention rule | Accepted base `55fd949`: one-hour stop and per-task required tests; revised design accepted on 2026-09-23 but policy draft not yet delivered |
| [Template Governance](../../../docs/template-governance.md) | Three-document ownership and template design | Accepted base `55fd949` checked 2026-09-22 |
| [Contributing](../../../CONTRIBUTING.md) and [workflow skill](../../../skills/sdd-project-workflow/SKILL.md) | Delivery gates and agent routing | Accepted base `55fd949` checked; working-tree edits are unapproved drafts |
| [Adoption manifest](../project-adoption-manifest.md) | Installed revision and project authorities | Upgrade candidate accepted by owner; runtime validated at `55fd9494bb7b96984114db27c0995a910da82f6b` |

### Concluded design

The owner accepted this design and final-gate FC01 on 2026-09-23.

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| D01 | The implementation plan's existing test/acceptance table is the single coverage inventory: owning task ID, changed outcome or material risk, test/scenario, whether coverage exists or is missing, and focused versus final-gate work. | Keep actual run evidence in the PR; no parallel test log. | Template can identify each task's focused proof and remaining final-gate test work without inventing a suite. |
| D02 | A task may be `DONE` after focused tests pass and its missing non-focused tests are recorded with an owner and final-gate obligation. At final readiness, reconcile all accepted changed outcomes and material risks against that inventory, including unrecorded gaps; before final candidate review, add needed tests, run affected focused checks, and have both retained reviewers inspect the changed candidate; then run full applicable validation on the reviewed exact head before human merge acceptance. | Both test creation and broad execution may be deferred, but neither may silently disappear or be represented as passed. Evidence-backed plan correction may remove an unnecessary row when accepted design is unchanged. | Task completion exposes known test debt; final merge candidate covers recorded and newly found gaps and has exact-head review and full validation evidence. |
| D03 | One task reaching 90 minutes of active implementation before planned review stops for owner attention with elapsed time, progress, expected versus unexpected work, over-engineering assessment, remaining work, and recommendation. | Do not count network/environment interruption, review, or external waits. The stop is not a quality shortcut. | Canonical rule and concise entry points agree; regressions reject stale 60-minute wording. |
| D04 | The quality policy owns detailed normative wording; the plan holds feature-specific coverage, workflow skill tells the agent how to apply it, and README/Contributing only summarize and link. | Preserve one canonical owner and no new durable artifact. | Cross-document checks find no conflicting boundary or duplicate policy. |

### Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale |
| --- | --- | --- | --- |
| DR01 | D01, D02 | changed | Keeps focused execution per task and full execution at final gate; non-focused test creation may also wait for final gate. |
| DR02 | D01, D02 | changed | One plan inventory makes omissions visible without blocking task `DONE` for deferred tests. |
| DR03 | D03 | accepted | Changes only the active-time threshold. |
| DR04 | D03, D04 | accepted | The stop evaluates value and complexity, rather than elapsed time alone. |
| DR05 | D01, D02, D04 | accepted | No new document, test framework, or premature full run. |
| DR06 | D01, D02 | changed | Task ownership is explicit; plan-level test correction remains agent-discretionary within accepted design. |
| DR07 | D02 | accepted | Task `DONE` needs a recorded obligation, not completed non-focused tests; final merge still requires their completion and proof. |

### Newly introduced fail-closed behaviors

| ID | Trigger | Required fail-closed response | Impact | Owner disposition |
| --- | --- | --- | --- | --- |
| FC01 | At final readiness, an accepted changed outcome or material risk has a required test missing from the candidate, whether already recorded or newly found during inventory reconciliation. | Do not present the candidate as merge-ready. Add and record the test, repeat affected focused checks and both retained reviews, then run full applicable validation on the exact reviewed head; correct an obsolete obligation with evidence if design is unchanged, or amend the design first if it changes. | Merge can be delayed, but task `DONE` is not blocked and omitted tests cannot silently pass the final gate. | Approved by owner on 2026-09-23. |

### Human brief candidate

| Attention | Summary | Handling |
| --- | --- | --- |
| Decision requested | `None`; owner accepted revised D01–D04 and final-gate FC01 on 2026-09-23. | `NONE` |
| Important boundary | This deliberately replaces the accepted policy and skill wording that every task implements all required tests: task `DONE` may carry recorded non-focused test work to the final gate. No new status artifact or change to merge authority. | `DISCLOSE` |
| Remaining gap | `None`; both reviewers verified the changed test-placement boundary. | `NONE` |

<!-- sdd: archived-implementation-plan -->

## Implementation Plan — issue #121 test coverage and task-time boundary

<!-- sdd: implementation-plan -->

This plan owns the active state for [issue #121](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/121). Review and run evidence belongs in the pull request.

### Delivery status

| Field | Value |
| --- | --- |
| State | `COMPLETE` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | Human review before merge |
| Delivery branch / target | `codex/deferred-test-coverage-draft` → `main` |
| Owner | Repository owner |
| Primary issue / need | [#121](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/121) |
| Concluded whiteboard | [WB-121-1 at freeze commit](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/blob/2b0d6f435a1c4c6be59f9d02cb786cffacbe966d/.github/spec-driven-delivery/solution-whiteboard.md) |
| Required reviewers | Same two retained feature-review sessions that approved and verified WB-121-1 |
| Last verified | T01 focused model tests 16/16 and both retained reviewer seats passed; final coverage reconciliation added D03 assessment proof and found no remaining required-test gap on 2026-09-23; full validation remains unrun and PR-owned |

### Governing inputs and delivery boundaries

| Source | Authority for this delivery |
| --- | --- |
| [WB-121-1 at freeze commit](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/blob/2b0d6f435a1c4c6be59f9d02cb786cffacbe966d/.github/spec-driven-delivery/solution-whiteboard.md) | D01–D04 and FC01; owner authorized the exact archive/reset transition after T01 review |
| [Documentation Quality Policy](../../../docs/documentation-quality-policy.md) and [Template Governance](../../../docs/template-governance.md) | Quality and template outcomes; this delivery replaces the existing per-task test-creation and 60-minute wording only as accepted in WB-121-1 |
| [Contributing](../../../CONTRIBUTING.md) and [workflow skill](../../../skills/sdd-project-workflow/SKILL.md) | Delivery routing, review, final validation, and human merge authority |
| [Adoption manifest](../project-adoption-manifest.md) | Installed playbook revision and stable project authorities; no feature status |

The outcome is a single, consistent coverage inventory in the implementation-plan template, focused test execution per task, and required non-focused test creation plus full applicable validation at the final gate. Task `DONE` may carry an explicit final-gate test obligation; it may not imply those tests ran. No new artifact, test framework, quota, or change to merge authority is authorized. Existing uncommitted wording drafted before WB-121-1 is not accepted by itself and must be reconciled to the frozen design.

### Test and acceptance contracts

This is the feature's coverage inventory, not a run log. The task ID identifies ownership; the PR will own actual check results. Reconcile every accepted changed outcome and material risk here again at final readiness, including omissions discovered then.

| Owning task | Design point / changed outcome or risk | Test or scenario | Coverage state | Work boundary |
| --- | --- | --- | --- | --- |
| T01 | D01–D02: template distinguishes focused proof, known missing tests, and final-gate obligations without blocking task `DONE` | Documentation-model assertions for coverage table and final-gate semantics | Implemented; focused test passed 16/16 | Focused task test |
| T01 | D03: 90-minute active-time stop, expected/unexpected work, over-engineering assessment, and exclusions are consistent | Documentation-model assertions for policy, skill, README, and Contributing | Implemented; final-gate gap correction adds assessment assertion; focused test passed 16/16 | Focused task test and final-gate correction |
| T01 | D04: one canonical detailed rule and brief links elsewhere | Documentation structure/link check for affected Markdown | Existing | Focused task check |
| Final gate | FC01: no required test gap survives, recorded or newly found | Reconciled D01–D04 and material risks against this inventory; D03 proof added; no other required test identified | Coverage addition complete; final candidate review and full validation pending | Final-gate work |
| Final gate | Exact-head full applicable validation | Repository documentation and test suite, including lifecycle and Mermaid checks | Existing; run evidence not yet available | Final-gate run after both retained reviewers approve the final head |

### Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| D01 | T01: extend existing plan-template coverage table with owning task and final-gate work | Focused model test and documentation structure | Aligned; no extra document |
| D02 | T01: align canonical policy and workflow guidance to permit recorded non-focused test creation at final gate; final-gate obligation reconciles all outcomes and gaps | Focused model test, exact-head reviews, then full applicable validation | Aligned; replaces current per-task creation wording |
| D03 | T01: change canonical active-time threshold to 90 minutes and require useful over-engineering assessment | Focused model test | Aligned; exclusions preserved |
| D04 | T01: keep detailed policy with short linked entry points; reconcile README, Contributing, and skill | Documentation checks and reviewer consistency inspection | Aligned |
| FC01 | Final gate: do not declare merge-ready while required test coverage is missing, recorded or newly found | Inventory reconciliation, affected focused checks, both retained reviews, full exact-head validation | Approved final-gate stop; does not block T01 `DONE` |

### Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | PR |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | `DONE` | `None` | Reusable template, canonical policy, workflow guidance, entry points, and focused regression tests consistently implement D01–D04 | Preserve frozen design, existing final-gate review/merge controls, no new artifact or quota | Focused tests passed; final gate added D03 assessment assertion and found no other required-test gap; full validation pending | [#122](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/122) |

### Task specifications and context receipts

#### T01 — reusable rule and coverage inventory

| Concern | Value |
| --- | --- |
| Outcome / non-scope | Implement D01–D04 and expose FC01 final-gate obligation; do not enforce test creation before task `DONE` |
| Source boundary | `templates/delivery/implementation-plan.md`, `docs/documentation-quality-policy.md`, `skills/sdd-project-workflow/SKILL.md`, `README.md`, `CONTRIBUTING.md`, affected tests |
| Consumed dependencies | WB-121-1 and manifest-pinned playbook revision `55fd9494bb7b96984114db27c0995a910da82f6b` |
| Critical obligations | Candidate wording must not claim deferred tests were implemented or run; no duplicate policy; preserve two retained reviewers and human merge authority |
| Required evidence | Focused tests and docs checks before task review; unrun final checks listed for final gate |
| Context receipt | Accepted source and current drafts read; draft's task-DONE test stop conflicts with WB-121-1 and must be corrected during T01 |
| Actual result | Draft's early task-DONE test stop removed; plan inventory, final-gate reconciliation, 90-minute rule, linked guidance, README diagram, and regression assertions updated. Focused model tests 16/16 and affected documentation/skill/runtime checks passed; both retained reviewers approved T01. Final-gate coverage correction added D03 assessment assertions; full validation remains PR-owned and unrun. |

### Final-gate and completion obligations

Before the final candidate review, reconcile accepted changed outcomes and material risks against the inventory, add any missing required tests, run affected focused checks, and return the exact candidate to the same two reviewers. After both approve, run full applicable validation on that exact head. Corrections invalidate affected reviews and checks as required by the [quality policy](../../../docs/documentation-quality-policy.md#review-and-human-brief). Human acceptance is required before merge. T01 focused checks passed as recorded above; full applicable validation remains unrun.

| Outcome | Required evidence | Current state |
| --- | --- | --- |
| D01–D04 and FC01 implemented | Candidate traceability to WB-121-1 and issue #121 | Candidate mapped; final review pending |
| Task-focused proof | Changed-file/line tests and affected documentation checks | Model test 16/16, Markdown lint, structure, lifecycle, Mermaid, skill validation, runtime validation, and diff check passed in T01 worktree |
| Deferred coverage resolved | Final reconciliation plus tests added or evidenced unnecessary | D03 assessment assertion added; no remaining required-test gap found; final candidate review pending |
| Final applicable validation | Exact-head full validation after both retained reviewer approvals | Unrun |
| Merge-ready canonical state | Manifest and reusable docs current in candidate; complete archive and reset authorized by owner after T01 review | Closing candidate under construction |
| Review and merge | PR-owned reviewer findings, human authority, merge, and target verification | T01 reviewers approved; final review, full validation, and human merge decision pending |

#### Delivery Definition of Done

The candidate preserves D01–D04 and FC01, contains the reviewed source and
regression changes, and records the final coverage inventory above. The
closing PR owns final reviewer, full-validation, human-merge, and target
verification facts; none is predicted here.

#### Planned versus actual outcome

| Design / task | Planned result | Actual evidence or deviation | Remaining obligation / owner |
| --- | --- | --- | --- |
| D01–D02 / T01 | One task-owned inventory and permitted final-gate test addition | Template, policy, skill, README, and focused tests updated; no task-DONE test stop | Final reviewer and exact-head full validation / PR |
| D03 / T01 | 90-minute attention boundary with over-engineering assessment | Canonical rule and focused assertions cover threshold, exclusions, and assessment | Final reviewer and exact-head full validation / PR |
| D04 / T01 | One canonical detailed rule with linked entry points | Policy owns detail; skill carries portable routing; README and Contributing link policy | Final consistency review / PR |
| FC01 / final gate | No required test missing at merge readiness | Inventory reconciled; D03 proof added; no further gap found | Final reviewer and exact-head full validation / PR |

#### Cleanup inventory

| Item | Keep, archive, remove, or reset | Ownership and evidence | Result |
| --- | --- | --- | --- |
| WB-121-1 and this plan | Archive together | Owner authorized closing transition after T01 review; closing PR #122 | Combined archive in candidate |
| Working whiteboard | Reset to `EMPTY` after complete archive | Owner authorized exact reset; frozen blob remains in Git and archive | Reset in closing candidate |
| Active plan | Remove after complete archive | This delivery owns it; PR #122 preserves history | Removed in closing candidate |
| Manifest and reusable guidance | Keep | Stable project authority, source changes in PR #122 | Preserved |
| Delivery worktree and merged branch | Remove after target verification | Owned by this delivery; do not disrupt other checkouts | Pending post-merge |

### Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and outcomes | T01 accepted; final gate found one D03 assertion gap and added it; no required-test gap remains | `DISCLOSE` |
| Design consistency | D01–D04 map to T01; FC01 maps to final gate; no new scope or status artifact | `DISCLOSE` |
| Important policy change | Replace the old per-task test-creation rule; task `DONE` may carry recorded non-focused test work to final gate | `DISCLOSE` |
| Validation | Focused model tests 16/16 and affected checks passed; final candidate review and full validation remain pending in PR #122 | `DISCLOSE` |
| Risks or open decisions | No design gap identified; closing candidate follows owner-authorized archive/reset boundary | `NONE` |
| Decision requested | Final human merge acceptance only after both retained reviewers and exact-head full validation pass | `HUMAN_DECISION` |
