# Solution whiteboard — focused-test coverage and task-time attention

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `OPEN` |
| Need / issue | [#121](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/121) |
| Owner | Repository owner |
| Concluded design revision | `None` |
| Open owner decisions | `None` |

## Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| DR01 | A task runs focused tests for its changed files and lines; full applicable validation runs at the final merge-back gate. | accepted |
| DR02 | The plan should show which tests are deferred to the final gate and which coverage is still missing for all changed outcomes and material risks. | changed |
| DR03 | Increase the active-implementation attention boundary from 60 to 90 minutes per task, excluding interruptions, review, and external waits. | accepted |
| DR04 | At that boundary, explain expected work versus unexpected cases and whether remaining work protects the accepted outcome or is over-engineering. | accepted |
| DR05 | Do not make every task run the entire suite or duplicate PR evidence in the plan. | accepted |
| DR06 | Reviewer challenge: tie each coverage item to its owning task and allow justified plan-level correction of an obsolete test row without changing accepted design. | changed |
| DR07 | Owner correction at the human gate: a task may be `DONE` with required non-focused tests still missing if their addition is recorded for the final gate. | accepted |

## Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem | Focused test results alone may hide tests owed to the final gate or coverage that has not been implemented. The 60-minute attention stop can interrupt a proportionate task too early without explaining where time went. |
| Required outcome | At task completion, focused tests pass and missing non-focused tests are visibly assigned to the final gate. Before final merge review, add those tests; then complete the final candidate's review and full validation. A 90-minute active-time stop supplies a concise, useful over-engineering assessment. |
| In scope | Reusable implementation-plan template, canonical quality policy, workflow skill routing, concise README/Contributing links, focused regression tests. |
| Out of scope | New test framework, universal suite or coverage quota, extra status document, change to final-gate validation or reviewer/merge authority. |

## Authority and context

| Source | Authority or relevant content | Freshness / verification |
| --- | --- | --- |
| [Issue #121](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/121) and owner discussion | Requested outcomes, final-gate test addition, and 90-minute boundary | Issue updated to match latest explicit owner correction on 2026-09-23 |
| [Documentation Quality Policy](../../docs/documentation-quality-policy.md) | Canonical testing and owner-attention rule | Accepted base `55fd949`: one-hour stop and per-task required tests; revised design accepted on 2026-09-23 but policy draft not yet delivered |
| [Template Governance](../../docs/template-governance.md) | Three-document ownership and template design | Accepted base `55fd949` checked 2026-09-22 |
| [Contributing](../../CONTRIBUTING.md) and [workflow skill](../../skills/sdd-project-workflow/SKILL.md) | Delivery gates and agent routing | Accepted base `55fd949` checked; working-tree edits are unapproved drafts |
| [Adoption manifest](project-adoption-manifest.md) | Installed revision and project authorities | Upgrade candidate accepted by owner; runtime validated at `55fd9494bb7b96984114db27c0995a910da82f6b` |

## Concluded design

The owner accepted this design and final-gate FC01 on 2026-09-23.

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| D01 | The implementation plan's existing test/acceptance table is the single coverage inventory: owning task ID, changed outcome or material risk, test/scenario, whether coverage exists or is missing, and focused versus final-gate work. | Keep actual run evidence in the PR; no parallel test log. | Template can identify each task's focused proof and remaining final-gate test work without inventing a suite. |
| D02 | A task may be `DONE` after focused tests pass and its missing non-focused tests are recorded with an owner and final-gate obligation. At final readiness, reconcile all accepted changed outcomes and material risks against that inventory, including unrecorded gaps; before final candidate review, add needed tests, run affected focused checks, and have both retained reviewers inspect the changed candidate; then run full applicable validation on the reviewed exact head before human merge acceptance. | Both test creation and broad execution may be deferred, but neither may silently disappear or be represented as passed. Evidence-backed plan correction may remove an unnecessary row when accepted design is unchanged. | Task completion exposes known test debt; final merge candidate covers recorded and newly found gaps and has exact-head review and full validation evidence. |
| D03 | One task reaching 90 minutes of active implementation before planned review stops for owner attention with elapsed time, progress, expected versus unexpected work, over-engineering assessment, remaining work, and recommendation. | Do not count network/environment interruption, review, or external waits. The stop is not a quality shortcut. | Canonical rule and concise entry points agree; regressions reject stale 60-minute wording. |
| D04 | The quality policy owns detailed normative wording; the plan holds feature-specific coverage, workflow skill tells the agent how to apply it, and README/Contributing only summarize and link. | Preserve one canonical owner and no new durable artifact. | Cross-document checks find no conflicting boundary or duplicate policy. |

## Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale |
| --- | --- | --- | --- |
| DR01 | D01, D02 | changed | Keeps focused execution per task and full execution at final gate; non-focused test creation may also wait for final gate. |
| DR02 | D01, D02 | changed | One plan inventory makes omissions visible without blocking task `DONE` for deferred tests. |
| DR03 | D03 | accepted | Changes only the active-time threshold. |
| DR04 | D03, D04 | accepted | The stop evaluates value and complexity, rather than elapsed time alone. |
| DR05 | D01, D02, D04 | accepted | No new document, test framework, or premature full run. |
| DR06 | D01, D02 | changed | Task ownership is explicit; plan-level test correction remains agent-discretionary within accepted design. |
| DR07 | D02 | accepted | Task `DONE` needs a recorded obligation, not completed non-focused tests; final merge still requires their completion and proof. |

## Newly introduced fail-closed behaviors

| ID | Trigger | Required fail-closed response | Impact | Owner disposition |
| --- | --- | --- | --- | --- |
| FC01 | At final readiness, an accepted changed outcome or material risk has a required test missing from the candidate, whether already recorded or newly found during inventory reconciliation. | Do not present the candidate as merge-ready. Add and record the test, repeat affected focused checks and both retained reviews, then run full applicable validation on the exact reviewed head; correct an obsolete obligation with evidence if design is unchanged, or amend the design first if it changes. | Merge can be delayed, but task `DONE` is not blocked and omitted tests cannot silently pass the final gate. | Owner requested this final-gate boundary on 2026-09-23; formal disposition follows in the conclusion transition. |

## Human brief candidate

| Attention | Summary | Handling |
| --- | --- | --- |
| Decision requested | `None`; owner accepted revised D01–D04 and final-gate FC01 on 2026-09-23. | `NONE` |
| Important boundary | This deliberately replaces the accepted policy and skill wording that every task implements all required tests: task `DONE` may carry recorded non-focused test work to the final gate. No new status artifact or change to merge authority. | `DISCLOSE` |
| Remaining gap | `None`; both reviewers verified the changed test-placement boundary. | `NONE` |
