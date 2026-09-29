# Solution whiteboard — affected validation reruns (#142)

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [#142](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/142) |
| Owner | Repository owner |
| Concluded design revision | `8cd91fc688f81965d73f6517b6709a96fae3881a` |
| Open owner decisions | `None` |

## Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| DR01 | After any final-candidate correction, only a gate whose inputs changed loses its prior full-validation result. | Changed |
| DR02 | Gate inputs include exercised product code, runner, dependencies, fixtures, configuration, and environment; uncertain overlap requires full validation. | Changed |
| DR03 | A failed gate stays red until a reviewed candidate passes it; prior failure evidence stays visible. | Accepted |
| DR04 | Define the rule once in the quality policy; other Guide surfaces point to it. Record reused evidence and reviewer agreement without adding a new classification tool. Project policy may be stricter. | Changed |

## Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem | Current Guide wording invalidates all full validation after every final-candidate correction, even where some gates' inputs are demonstrably unchanged. |
| Required outcome | Rerun each gate whose inputs changed. Reuse an unaffected passed gate only when its prior exact head and unchanged-input rationale are recorded and both retained reviewers confirm the mapping. |
| In scope | One canonical Guide rule, linked contributor/README/skill guidance, PR evidence state `reused from <sha>`, explanatory example and counterexample, and contract checks. |
| Out of scope | Repairing #442's MinIO dependency, turning its red gate green, or changing project policy in this upstream delivery; project #451 owns synchronization. |

## Authority and context

| Source | Authority or relevant content | Freshness / verification |
| --- | --- | --- |
| Repository owner decision | Adopt rewritten #142 scope: any final-candidate correction uses affected-gate input analysis; adjust Guide, then project policy. | Explicit 2026-09-29 conversation decision after reviewing [#142](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/142) |
| [Issue #142](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/142) | Defines desired rule, evidence state, example/counterexample, canonical ownership, and exclusions. | Read from GitHub issue page on 2026-09-29 |
| [Contributing](../../CONTRIBUTING.md), [quality policy](../../docs/documentation-quality-policy.md), [workflow skill](../../skills/sdd-project-workflow/SKILL.md), [README](../../README.md) | Current exact-candidate review and final-validation rules. | Read at accepted `b3f13badb6e8b828f4185e6116939d51b5d3faeb` baseline |
| [Error handling](../../docs/error-handling.md) | Preserve failures and recover proportionally; do not restart unaffected work. | Read at baseline |

## Requirements and acceptance

| ID | Need or requirement | Priority | Acceptance signal | Source |
| --- | --- | --- | --- | --- |
| R01 | Apply input-based invalidation to every final-candidate correction. | Must | Changed and unchanged gate inputs yield the corresponding rerun or reuse outcome. | Revised #142; owner decision |
| R02 | Include exercised product code, runner, dependencies, fixtures, configuration, and environment in the gate-input assessment. | Must | Changed gates rerun completely; uncertain overlap triggers full validation. | Revised #142 |
| R03 | Record the prior exact head and unchanged-input rationale for every reused pass; both retained reviewers confirm the mapping. Preserve failed evidence, required gates, and human authority. | Must | Human brief distinguishes passed, failed, unrun, and `reused from <sha>`; a failed gate stays red until its own rerun passes. | Revised #142; current Guide authorities |
| R04 | Define the rule only in the quality policy; link or point to it elsewhere and update relevant tests. Project policy may be stricter. | Must | Example/counterexample present; `npm run docs:all` passes. | Revised #142; contribution/quality policies |

## Options, experiments, and tradeoffs

| ID | Option | Benefit | Cost / risk | Disposition |
| --- | --- | --- | --- | --- |
| O01 | Rerun all gates after every candidate byte change. | Simple. | Repeats gates whose inputs did not change. | Rejected by revised #142 and owner decision. |
| O02 | Reuse all previous passes for any correction. | Fast. | Can hide changed product code, fixtures, contracts, or shared dependencies. | Rejected as unsafe. |
| O03 | Invalidate per gate input, with reviewed evidence for each reused pass. | Removes unnecessary reruns while preserving required gate outcomes. | Requires a concise impact rationale in PR evidence. | Selected. |

## Decision log

| ID | Decision | Rationale / tradeoff | Owner / evidence |
| --- | --- | --- | --- |
| D01 | Any final-candidate correction invalidates each full-validation result whose gate inputs it changes. Gate inputs are exercised product code, runner, dependencies, fixtures, configuration, and environment. | Replaces blanket invalidation with the revised #142 scope. | Revised #142; owner decision |
| D02 | Rerun every gate with changed inputs in full. An unaffected passed gate may be reused only when the PR records its prior exact head and unchanged-input rationale and both retained reviewers confirm the mapping. If overlap is uncertain, rerun full validation. | Prevents stale evidence and hidden coupling without a new classification tool. | R02–R03; revised #142 |
| D03 | Keep original failure evidence, exact-candidate focused checks and both reviewers, required hosted status for the final SHA, and human merge authority. A failed gate stays red until its own rerun passes; the human brief distinguishes passed, failed, unrun, and `reused from <sha>`. | Prevents green hunting and false merge readiness. | R03; revised #142 |
| D04 | Own the rule in the quality policy alone. Link or point to it from the workflow skill, Contributing, and README; revise the README flowchart if needed and update document-model tests. Include one example and counterexample. Leave downstream adoption to #451 and allow stricter project policy. | Prevents authority drift and preserves project ownership. | R04; revised #142 |

## Concluded design candidate

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| D01 | Per-gate input invalidation for any correction. | Exercised product code and test execution inputs define impact. | Documentation contract cases for product and validation changes. |
| D02 | Full rerun of changed-input gates; reviewer-confirmed, exact-head-evidenced reuse of unaffected passed gates. | Uncertain overlap triggers full validation. | Example: a test-only service image used by one integration gate changes; that gate reruns while unrelated gates retain passes. Counterexample: a shared container or fixture changes and every consumer reruns, or full validation runs if consumers are unclear. |
| D03 | Failure history, focused checks, reviews, hosted exact-SHA checks, human merge authority, and visible `reused from <sha>` evidence remain binding. | No status laundering or implied approval. | Failure/recovery examples and tests. |
| D04 | One canonical quality-policy rule; other Guide surfaces point to it, and project authority may be stricter. | #451 is separate downstream delivery. | `npm run docs:all` and semantic review. |

## Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| DR01 | D01, D02 | Changed | Owner accepted broader revised #142 after the initial narrow design review. |
| DR02 | D01, D02 | Changed | Includes product code and mandates full validation when impact overlap is unclear. |
| DR03 | D03 | Accepted | Failure remains visible and binding. |
| DR04 | D03, D04 | Changed | One canonical rule and explicit reuse evidence avoid duplicated policy. |

## Newly introduced fail-closed behaviors

| ID | Trigger | Required fail-closed response | Concrete example | Impact | Recovery / best next action | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- |
| FC01 | Input overlap is uncertain after a final-candidate correction. | Do not reuse old passes; keep final readiness blocked until full validation runs. | A shared test container changes and its consumers are unclear, so an old E2E pass is not carried forward and the full validation runs. | Extra validation time, with no unproven pass claimed. | The author runs full applicable validation on the reviewed candidate and presents the results; if input ownership can be established before that run, both retained reviewers may confirm a narrower affected-gate mapping. | Approved |

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | D01–D04 define per-gate input invalidation for any final-candidate correction and preserve all required review and gate outcomes. | `HUMAN_DECISION` |
| Important boundaries | This does not repair #442, waive its red gate, or modify project #451 yet. | `DISCLOSE` |
| Alternatives rejected | Blanket full reruns and blanket reuse of old passes. | `DISCLOSE` |
| Remaining gaps or risks | Shared dependencies require case-specific evidence; uncertain overlap requires full validation. | `DISCLOSE` |
| Newly introduced fail-closed behavior | FC01: uncertain input overlap blocks reuse and triggers full applicable validation. | `HUMAN_DECISION` |
| Decision requested | After two independent approvals, owner accepts D01–D04 and FC01 before conclusion. | `HUMAN_DECISION` |
