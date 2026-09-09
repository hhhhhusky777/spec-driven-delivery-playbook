# Solution Whiteboard — Preserve discussion drafts through conclusion

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [#85](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/85) |
| Owner | Repository owner |
| Concluded design revision | Owner decision on 2026-09-09 |
| Open owner decisions | `None` |

## Delivery links

- Issue: [#85](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/85)
- Pull request: [#86](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/86)

## Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| `DR01` | Agents record agreed items and material discussion while the design is explored. | Accepted |
| `DR02` | After gaps close, agents generate a formal concluded design without losing the discussion record. | Accepted |
| `DR03` | Reviewers need to compare the discussion draft with the official conclusion and catch omissions or inconsistencies. | Accepted |
| `DR04` | Preserve traceability without adding another document or retaining a raw chat transcript. | Accepted |

## Decision log

| ID | Decision | Material alternatives | Rationale / tradeoff | Owner / evidence |
| --- | --- | --- | --- | --- |
| `D01` | Keep a concise discussion draft, concluded design, and reconciliation in one whiteboard. | Replace the draft; create a separate snapshot document. | One canonical document gives reviewable traceability without duplicate state. | Owner decision; issue #85 |
| `D02` | Require every material draft item to have a resolved disposition when the whiteboard is concluded. | Depend only on informal review. | Makes silent omission visible while leaving semantic judgment to agents and reviewers. | Owner decision; issue #85 |

## Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `DP01` | The whiteboard retains a concise, ID-based discussion draft when conclusion is generated. | Preserve agreed items and material alternatives, not raw transcript. | Template and workflow guidance agree. |
| `DP02` | A concluded whiteboard maps every material draft item to an accepted, changed, deferred, or rejected conclusion. | Intentional differences require rationale; unresolved items prevent conclusion. | Lifecycle checker and negative tests enforce the structural boundary. |
| `DP03` | The feature remains within the three-document model. | GitHub owns detailed review history; no draft snapshot document is added. | Template inventory and document-model tests remain green. |

## Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| `DR01` | `DP01` | Accepted | The discussion draft remains the lightweight working surface. |
| `DR02` | `DP01`, `DP02` | Accepted | Conclusion is added without replacing the retained material record. |
| `DR03` | `DP02` | Accepted | The mapping exposes coverage and intentional differences. |
| `DR04` | `DP03` | Accepted | The design uses one whiteboard and excludes raw transcripts. |

## Human brief

| Attention | Summary |
| --- | --- |
| Decisions made | Retain and reconcile concise draft items inside the whiteboard. |
| Important boundaries | One canonical whiteboard; no raw transcript or fourth document. |
| Remaining gaps or risks | Semantic completeness still requires agent review; structural validation cannot infer meaning. |
| Decision requested | None; owner approved implementation. |
