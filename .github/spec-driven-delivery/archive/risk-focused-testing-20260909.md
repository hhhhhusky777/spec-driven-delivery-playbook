# Risk-focused testing guidance

| Field | Value |
| --- | --- |
| State | `DELIVERY_CANDIDATE` |
| Issue | [#95](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/95) |
| Pull request | [#96](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/96) |
| Owner | Repository owner |
| Concluded design revision | `2026-09-09` |
| Open owner decisions | `None` |

## Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| `DR01` | Testing should spend more effort on boundary, error/recovery, concurrency/race, and timing/order risks than on repetitive happy paths. | Accepted |
| `DR02` | Critical business journeys still need end-to-end smoke evidence. | Accepted |
| `DR03` | Production-like system, concurrent-load, stress, or soak evidence is valuable when the change's risks warrant its cost. | Accepted |
| `DR04` | Broad or nondeterministic tests can discover races and edge cases, but useful failures should become reproducible focused regressions when practical. | Accepted |
| `DR05` | Guidance needs one canonical owner and must not be copied into all three durable templates. | Accepted |

## Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `D01` | The quality policy defines a risk-focused test portfolio. | One canonical owner; tests provide evidence rather than absolute guarantees. | Policy distinguishes essential critical-path proof from applicable boundary, failure, concurrency, timing, interface, and production-behavior evidence. |
| `D02` | Test design emphasizes material failure risks and observable invariants. | Avoid implementation-coupled assertions and repetitive happy-path coverage. | Guidance names edge/malformed/duplicate/partial, error/retry/recovery/cancel/rollback, race/interleaving/idempotency/deadlock, and timeout/order risks. |
| `D03` | E2E smoke proves critical journeys; broader production-like tests are selected when risk warrants. | No universal heavy suite, load level, duration, or quota. | Evidence identifies the exercised journey or workload and its limitations. |
| `D04` | Broad failures are preserved and reduced to the lowest useful deterministic regression when practical. | Discovery and diagnosis have different jobs; nondeterminism is not silently erased. | Guidance preserves seed, schedule, workload, environment, or other reproducing evidence. |
| `D05` | The workflow skill applies the policy concisely, and the README explains the model visually. | Templates only record project-specific test and acceptance contracts. | Cross-document regression proves ownership, links, diagram flow, and absence of duplicated template policy. |

## Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| `DR01` | `D01`, `D02` | Accepted | Risk classes become the primary design input after essential critical-path proof. |
| `DR02` | `D03` | Accepted | Smoke evidence remains a distinct critical-journey control. |
| `DR03` | `D03` | Accepted | Broader testing is proportional to risk and project authority. |
| `DR04` | `D04` | Accepted | Preserve discovery evidence and improve repeatability without pretending every race is instantly deterministic. |
| `DR05` | `D05` | Accepted | Policy owns; skill and README link and explain; templates do not restate. |

## Delivery map

| Design | Delivered by | Evidence |
| --- | --- | --- |
| `D01`–`D04` | Canonical quality policy and concise workflow guidance | Focused semantic regression and repository documentation gates |
| `D05` | README explanation/diagram and cross-document regression | Mermaid validation and template non-duplication assertions |

Review, human acceptance, merge, and exact-target validation remain owned by
pull request #96.
