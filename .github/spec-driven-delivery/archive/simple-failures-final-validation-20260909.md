# Simple failure handling and final validation

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Issue | [#97](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/97) |
| Pull request | [#98](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/98) |
| Owner | Repository owner |
| Concluded design revision | `2026-09-09` |
| Open owner decisions | `None` |

## Discussion draft

| ID | Agreed item, alternative, constraint, or gap | Resolution |
| --- | --- | --- |
| `DR01` | Error handling cannot enumerate every race, edge case, or failure interleaving. | Protect invariants with a simple fail-closed default. |
| `DR02` | Consistent retry-safe failures should return control to the client. | Expose a stable retryable outcome only when repetition is safe. |
| `DR03` | Ambiguous prior effects can make retries unsafe. | Reconcile authoritative state or use an established idempotency boundary first. |
| `DR04` | Completed tasks need quick evidence before review without deferring their required test implementation. | Implement required tests in the task; execute changed-file, changed-line, and focused-test checks without full coverage before exact-head two-agent review. |
| `DR05` | Repeating heavy validation on intermediate task PRs wastes time. | Reserve it for the reviewed final candidate targeting the protected integration branch. |
| `DR06` | Full coverage is expensive and does not belong in the fast task gate. | Run it with full/heavy validation after final-candidate review. |
| `DR07` | A task consuming more than one hour of active implementation needs owner visibility. | Stop at one active hour, explain the cost and remaining work, and wait for owner justification; exclude interruptions and review time. |
| `DR08` | Existing PR automation still ran the full source suite before review. | Split PR fast automation from manually dispatched, scheduled, and target full validation. |

## Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `D01` | Error handling is invariant-based, simple, and fail-closed. | Do not enumerate hypothetical race and edge cases or add speculative recovery machinery. | Canonical policy emphasizes consistency and the safe default. |
| `D02` | Retry-safe failures return a stable outcome and leave retry timing to the client. | Ambiguous or unsafe effects require reconciliation or idempotency before retry. | Policy distinguishes safe retry from critical stop. |
| `D03` | Every task implements its required tests, while its fast gate validates changed files and lines plus directly exercised behavior before unchanged two-agent review. | Full-project coverage is not part of the fast gate. | Review guidance and regression agree. |
| `D04` | Full coverage and full/heavy/long-running validation run only after review of the final candidate targeting the protected integration branch. | A single-task PR to `main` is already final; intermediate task PRs do not repeat the general full suite. | Policy, workflow, contributing guide, and README diagram agree. |
| `D05` | Candidate corrections repeat affected fast checks and the same reviewers; final-candidate corrections also invalidate full validation. | Stricter project policy and human merge authority remain intact. | Tests lock both correction paths. |
| `D06` | One hour of active implementation on one task requires an owner stop and explanation before continuing. | Network/environment interruptions, review, and external waiting do not count. | Policy, workflow, and contribution guidance agree. |
| `D07` | Source automation enforces the same fast-then-review-then-full ordering. | PR events run the narrow gate; non-PR final/target runs use the full suite. | Workflow and regression agree. |

## Draft-to-conclusion reconciliation

| Draft item | Concluded point | Disposition |
| --- | --- | --- |
| `DR01` | `D01` | Accepted |
| `DR02`, `DR03` | `D02` | Accepted |
| `DR04` | `D03` | Accepted |
| `DR05`, `DR06` | `D04`, `D05` | Accepted |
| `DR07` | `D06` | Accepted |
| `DR08` | `D07` | Accepted after reviewer finding. |

## Delivery map

| Design | Delivered by | Evidence |
| --- | --- | --- |
| `D01`, `D02` | Canonical error policy plus concise skill/README consumers | Focused semantic regression |
| `D03`–`D07` | Canonical testing policy, workflow skill, source automation, contributing guide, and README diagrams | Focused review-loop, automation, and implementation-time regressions plus documentation gates |

Review, human acceptance, merge, and exact-target validation remain owned by
pull request #98.
