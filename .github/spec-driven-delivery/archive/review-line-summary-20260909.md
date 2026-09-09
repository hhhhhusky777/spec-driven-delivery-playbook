# Solution Whiteboard — Review changed-line summary

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [#90](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/90) |
| Owner | Repository owner |
| Concluded design revision | Owner request on 2026-09-09 |
| Open owner decisions | `None` |

## Delivery links

- Issue: [#90](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/90)
- Pull request: [#91](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/91)

## Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| `DR01` | A PR waiting for human review should show changed lines by product code, documentation, tests, and other files. | Accepted |
| `DR02` | The summary must describe the exact candidate versus its actual PR target. | Accepted |
| `DR03` | Extend the existing human brief without adding a document, gate, or mandatory helper program. | Accepted |

## Decision log

| ID | Decision | Material alternatives | Rationale / tradeoff | Owner / evidence |
| --- | --- | --- | --- | --- |
| `D01` | Add one compact change-size table to the existing final PR human brief. | Raw file list; total-only line count; new report artifact. | Four stable categories expose review shape with minimal overhead. | Owner request; issue #90 |
| `D02` | Count additions and deletions from the exact candidate diff and classify files by primary responsibility. | Filename-only rules; a repository-wide parser. | Semantic classification works across projects and preserves agent discretion. | Existing six goals |

## Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `DP01` | Every final PR human-review brief includes product code, documentation, tests, and other rows with additions, deletions, and total changed lines. | Show zero rows so the human sees the complete change shape. | Policy, workflow skill, README, and templates agree. |
| `DP02` | Counts come from the exact candidate against its actual PR target; each changed file belongs to one primary category. | Non-line-countable files remain explicit instead of fabricated. | Tests assert the reusable contract and semantic review checks examples. |
| `DP03` | This extends the existing human brief only. | No extra gate, durable report, dependency, or mandatory implementation path. | Three-document model and source checks remain green. |

## Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| `DR01` | `DP01` | Accepted | The requested four-category table is the review output. |
| `DR02` | `DP02` | Accepted | Target-relative exact-candidate counts prevent stale or misleading totals. |
| `DR03` | `DP03` | Accepted | Existing briefs own the information. |

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decision | Add the four-category changed-line summary to final PR human briefs. | `DISCLOSE` |
| Boundary | Semantic file classification; exact target diff; no new gate or artifact. | `DISCLOSE` |
| Validation | Source checks and 38 tests passed before final candidate reconciliation. | `DISCLOSE` |
| Open decisions | None. | `NONE` |
