# Solution whiteboard — simple failure handling and final validation

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [#97](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/97) |
| Owner | Repository owner |
| Concluded design revision | `2026-09-09` |
| Open owner decisions | `None` |

## Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| `DR01` | Error handling cannot enumerate every race, edge case, or failure interleaving. | Accepted |
| `DR02` | Keep recovery simple: protect consistency, fail closed, and expose a stable retryable result so the client can retry when retry is safe. | Accepted |
| `DR03` | Avoid speculative recovery machinery; ambiguity or possible prior effects require reconciliation or idempotency before retry. | Accepted |
| `DR04` | A completed task needs fast proportional validation, such as focused unit/integration tests and applicable coverage, before the existing review loop. | Accepted |
| `DR05` | Heavy/full/long-running validation belongs only to the reviewed final candidate that will merge to the protected integration target. | Accepted |

## Authority and context

| Source | Authority or relevant content | Freshness / verification |
| --- | --- | --- |
| Repository owner discussion | Required error posture and validation placement | Accepted 2026-09-09 |
| [Error handling](../../docs/error-handling.md) | Canonical recovery, triage, and escalation | Current at `9fac505` |
| [Documentation quality and testing policy](../../docs/documentation-quality-policy.md) | Canonical review and validation outcomes | Current at `9fac505` |
| [Contributing](../../CONTRIBUTING.md) | Task/integration branch and merge boundaries | Current at `9fac505` |

## Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `D01` | Error handling is invariant-based, simple, and fail-closed. | Enumerating all race and edge cases is impossible and encourages over-engineering. | Canonical policy emphasizes consistency and a safe default rather than exhaustive case lists. |
| `D02` | Retry-safe failures return a stable retryable outcome and leave retry timing to the client. | Never label an ambiguous or unsafe effect retryable until reconciliation or idempotency prevents duplication. | Policy distinguishes safe client retry from critical stop and ambiguous-effect recovery. |
| `D03` | Completed task candidates run fast proportional checks before unchanged exact-head two-agent review. | Suitable evidence includes focused unit/integration tests and applicable coverage; project authority chooses the set. | Review loop and regression agree on task-candidate evidence. |
| `D04` | Heavy/full/long-running validation runs after reviewers approve the final candidate targeting the protected integration branch, before human merge authority. | Intermediate task PRs targeting a feature integration branch do not repeat the full suite; a single-task PR to `main` is final. | Canonical policy, workflow, contributing guide, and README diagram share the same branch-sensitive loop. |
| `D05` | Candidate-changing corrections repeat fast checks and the same reviewers; final-candidate corrections also invalidate heavy validation. | Stricter project policy still wins; no quality or human gate is removed. | Tests lock both correction paths and exact-head semantics. |

## Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| `DR01` | `D01` | Accepted | The framework protects invariants rather than pretending to list the state space. |
| `DR02` | `D01`, `D02` | Accepted | Consistency and fail-closed behavior precede retryability. |
| `DR03` | `D02` | Accepted | Ambiguous effects remain a special safety boundary, not a speculative framework. |
| `DR04` | `D03` | Accepted | Fast checks preserve quick review feedback. |
| `DR05` | `D04`, `D05` | Accepted | Expensive evidence moves to the one candidate that crosses the protected-target boundary. |

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | Use simple invariant-based failure handling and branch-sensitive validation depth. | `DISCLOSE` |
| Important boundaries | Retry only when consistent/idempotent; keep two-agent review; run heavy validation before final merge to `main`; stricter project authority wins. | `DISCLOSE` |
| Remaining gaps or risks | None. “Fast” and “heavy” remain project-specific classifications rather than hardcoded commands. | `NONE` |
| Decision requested | None; owner authorized implementation. | `NONE` |
