# Solution whiteboard — affected validation reruns (#142)

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `OPEN` |
| Need / issue | [#142](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/142) |
| Owner | Repository owner |
| Concluded design revision | `None` |
| Open owner decisions | Accept reviewed D01–D04 and FC01 before conclusion |

## Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| DR01 | Changes limited to a validation runner or test dependency should rerun affected validation without automatically discarding unrelated passed evidence. | Proposed; D01–D02 |
| DR02 | Product implementation changes or changes to a gate's inputs, contract, environment, or shared dependencies still require validation of that boundary. | Proposed; D01–D02 |
| DR03 | A failed gate stays red until a reviewed candidate passes it; prior failure evidence stays visible. | Proposed; D03 |
| DR04 | The reusable Guide and adopting project policy must agree, while project policy may be stricter. | Proposed; D04 |

## Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem | Current Guide wording invalidates all full validation after every final-candidate correction, including an isolated runner or test dependency repair. |
| Required outcome | Rerun every affected gate completely; reuse an unchanged passed gate only with evidence that its earlier result still applies. |
| In scope | Guide final-validation policy, consistent contributor/README/skill text, and contract checks. |
| Out of scope | Repairing #442's MinIO dependency, turning its red gate green, or changing project policy in this upstream delivery; project #451 owns synchronization. |

## Authority and context

| Source | Authority or relevant content | Freshness / verification |
| --- | --- | --- |
| Repository owner decision | Narrow exception for gate runner or test dependency changes; adjust Guide, then project policy. | Explicit conversation decision |
| [Contributing](../../CONTRIBUTING.md), [quality policy](../../docs/documentation-quality-policy.md), [workflow skill](../../skills/sdd-project-workflow/SKILL.md), [README](../../README.md) | Current exact-candidate review and final-validation rules. | Read at accepted `b3f13badb6e8b828f4185e6116939d51b5d3faeb` baseline |
| [Error handling](../../docs/error-handling.md) | Preserve failures and recover proportionally; do not restart unaffected work. | Read at baseline |

## Requirements and acceptance

| ID | Need or requirement | Priority | Acceptance signal | Source |
| --- | --- | --- | --- | --- |
| R01 | Limit the exception to gate runner or test dependency changes after final review. | Must | Eligibility and exclusion cases are clear. | Owner decision |
| R02 | Include execution path, inputs, fixtures, contract, environment, and shared dependencies in gate-impact assessment. | Must | All affected gates rerun fully; other passes carry explicit applicability evidence. | Owner decision; quality policy |
| R03 | Preserve failed evidence, required gates, exact-candidate reviews, and current hosted SHA status. | Must | A failed gate remains red until full affected-gate pass on a reviewed candidate. | Current Guide authorities |
| R04 | Keep canonical Guide text and contract tests consistent; project policy may be stricter. | Must | Focused and full applicable Guide checks pass. | Contribution/quality policies |

## Options, experiments, and tradeoffs

| ID | Option | Benefit | Cost / risk | Disposition |
| --- | --- | --- | --- | --- |
| O01 | Rerun all gates after every candidate byte change. | Simple. | Repeats unaffected expensive gates for isolated tooling repairs. | Rejected by owner scope decision. |
| O02 | Reuse all previous passes after any test-only change. | Fast. | Can hide changed fixtures, contracts, or shared dependencies. | Rejected as unsafe. |
| O03 | Reuse only evidenced unaffected passes for runner/dependency-only changes. | Removes unnecessary reruns while preserving all gate outcomes. | Requires a concise impact map in PR evidence. | Selected. |

## Decision log

| ID | Decision | Rationale / tradeoff | Owner / evidence |
| --- | --- | --- | --- |
| D01 | Reuse exception applies only when the correction changes gate runners or test dependencies without changing product implementation. | Honors the narrow requested scope. | Owner decision |
| D02 | Rerun every affected gate in full. A previous pass may be reused only if execution path, inputs, fixtures, contract, environment, and shared dependencies remain applicable, with evidence recorded in the PR. Uncertain boundaries count as affected. | Prevents stale evidence and hidden coupling. | R02; quality policy |
| D03 | Keep original failure evidence, exact-candidate reviewer approval, and required hosted status for the final SHA. A failed gate stays red until the reviewed candidate passes that gate in full. | Prevents green hunting and false merge readiness. | R03; current Guide |
| D04 | Reconcile Guide skill, quality policy, contributor text, README, and contract tests; leave project-specific adoption to #451. | Maintains one consistent upstream rule and local stricter authority. | R04; owner decision |

## Concluded design candidate

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| D01 | Narrow runner/dependency-only eligibility. | Product implementation or other changes use ordinary final-validation rules. | Positive and negative documentation contract cases. |
| D02 | Full rerun of affected gates; evidenced reuse of unaffected passed gates. | Ambiguous shared impact counts as affected. | Boundary examples and contract checks. |
| D03 | Failure history, review, and hosted exact-SHA checks remain binding. | No status laundering. | Failure/recovery examples and tests. |
| D04 | Canonical sources agree; project authority may be stricter. | #451 is separate downstream delivery. | Focused and full Guide checks. |

## Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| DR01 | D01, D02 | Accepted | Matches owner scope. |
| DR02 | D01, D02 | Accepted | Changed inputs cannot inherit stale passes. |
| DR03 | D03 | Accepted | Failure remains visible and binding. |
| DR04 | D04 | Accepted | Upstream and project authorities remain distinct. |

## Newly introduced fail-closed behaviors

| ID | Trigger | Required fail-closed response | Concrete example | Impact | Recovery / best next action | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- |
| FC01 | The author cannot demonstrate that a previously passed gate is unaffected by a runner/dependency-only change. | Do not reuse that gate's pass; keep final readiness blocked until it is rerun. | A shared test helper changes and the author cannot exclude E2E impact, so its old pass is not carried forward. | Extra validation time, with no unproven pass claimed. | The author maps the dependency with evidence or reruns the full E2E gate on the reviewed candidate, then presents the result. | Pending owner design acceptance |

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | D01–D04 define the narrow reuse exception and preserve all required review and gate outcomes. | `HUMAN_DECISION` |
| Important boundaries | This does not repair #442, waive its red gate, or modify project #451 yet. | `DISCLOSE` |
| Alternatives rejected | Blanket full reruns and blanket reuse of test-only passes. | `DISCLOSE` |
| Remaining gaps or risks | Shared dependencies require case-specific evidence; uncertainty requires a rerun. | `DISCLOSE` |
| Newly introduced fail-closed behavior | FC01: uncertain unaffected status blocks reuse; the author documents independence or reruns the gate. | `HUMAN_DECISION` |
| Decision requested | After two independent approvals, owner accepts D01–D04 and FC01 before conclusion. | `HUMAN_DECISION` |
