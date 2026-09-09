# Archived Whiteboard — Reviewer continuity and useful findings

<!-- sdd: archived-whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [Issue #99](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/99) |
| Delivery PR | [PR #100](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/100) |
| Owner | Repository owner |
| Concluded design revision | Owner decisions recorded on 2026-09-10 |
| Open owner decisions | `None` |

## Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| `DR01` | Reviewers from one task should not be reused for a later task. | Accepted: each task review session selects two agents fresh for that session. |
| `DR02` | A correction round benefits from reviewers who know the original findings. | Accepted: retain the same two reviewers within that task's review session. |
| `DR03` | A change request should help the author reach a sound correction. | Accepted: include impact, blocking status, smallest correction, and applicable authoritative practice with relevance. |
| `DR04` | Best-practice advice could create scope or false authority. | Bound it: separate optional advice, do not expand scope, and never invent a standard. |

## Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `D01` Fresh task reviewers | Every new task review session selects two agents fresh for that session and does not reuse an agent from any prior task review session. | Freshness is between tasks without resetting at a delivery boundary. | Policy and workflow state the task boundary. |
| `D02` Retained correction reviewers | Candidate-changing corrections return to the same two reviewers until the task review converges. | Continuity is within one task session. | Review-loop wording remains consistent. |
| `D03` Actionable findings | A blocking finding states evidence/impact, blocking status, and the smallest recommended correction. | Help authors correct without guessing. | Canonical policy and regression tests cover the content. |
| `D04` Grounded reference | When a recognized practice applies, the finding cites a primary industry standard or authoritative reference and explains relevance; otherwise it cites project authority or states technical reasoning. | Never fabricate a standard. | Policy covers both applicable and no-authority cases. |
| `D05` Proportional advice | Optional advice stays separate from blocking findings and recommendations cannot expand accepted scope. | Preserve proportional effort and owner authority. | Policy and tests enforce the boundary. |

## Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| `DR01` | `D01` | Accepted | Provides a fresh perspective for each task. |
| `DR02` | `D02` | Accepted | Prevents correction rounds from losing finding context. |
| `DR03` | `D03`, `D04` | Accepted | Combines a concrete correction with relevant authority when available. |
| `DR04` | `D05` | Accepted | Prevents advice from becoming invented scope or ceremony. |

## Delivery mapping

| Design points | Delivered by | Evidence |
| --- | --- | --- |
| `D01`, `D02` | `T01`: fresh task reviewers and retained correction reviewers | [PR #100](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/100) |
| `D03`, `D04`, `D05` | `T01`: useful, grounded, proportional change-request content | [PR #100](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/100) |

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | Fresh reviewers between tasks; retained reviewers within corrections; grounded, actionable change requests. | `DISCLOSE` |
| Important boundaries | No invented standards, template duplication, or recommendation-driven scope expansion. | `DISCLOSE` |
| Remaining gaps or risks | `None` | `NONE` |
| Decision requested | Human merge acceptance after agent review and full validation. | `HUMAN_DECISION` |
