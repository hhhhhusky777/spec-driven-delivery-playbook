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
| `DR04` | Copying the same summary scaffold into all three templates violates canonical ownership and is unnecessary. | Accepted |
| `DR05` | The existing avoid-over-engineering goal needs a semantically explicit attention marker for agents. | Accepted |

## Decision log

| ID | Decision | Material alternatives | Rationale / tradeoff | Owner / evidence |
| --- | --- | --- | --- | --- |
| `D01` | Add one compact change-size table to the existing final PR human brief. | Raw file list; total-only line count; new report artifact. | Four stable categories expose review shape with minimal overhead. | Owner request; issue #90 |
| `D02` | Count additions and deletions from the exact candidate diff and classify files by primary responsibility. | Filename-only rules; a repository-wide parser. | Semantic classification works across projects and preserves agent discretion. | Existing six goals |
| `D03` | Keep the canonical table in the quality policy, require the live output through the workflow skill, and use README only as an example. | Repeat the scaffold in all three templates. | The PR owns live review evidence; templates do not need to duplicate it. | Owner correction during PR #91 review |
| `D04` | Mark the existing necessary-complexity instruction with `[!IMPORTANT]` and direct removal language. | Rely on rendering or broad principle wording alone. | The literal semantic instruction is useful to agents even without rendered styling. | Owner correction during PR #91 review |

## Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `DP01` | Every final PR human-review brief includes product code, documentation, tests, and other rows with additions, deletions, and total changed lines. | Show zero rows so the human sees the complete change shape. | Quality policy owns the table; workflow skill requires it; README demonstrates it. |
| `DP02` | Counts come from the exact candidate against its actual PR target; each changed file belongs to one primary category. | Non-line-countable files remain explicit instead of fabricated. | Tests assert the reusable contract and semantic review checks examples. |
| `DP03` | This extends the existing human brief only; the three templates contain no duplicate change-size scaffold. | No extra gate, durable report, dependency, or mandatory implementation path. | Negative regression protects canonical ownership. |
| `DP04` | The workflow skill highlights avoidance of unnecessary artifacts, rules, duplication, automation, abstractions, and dependencies with `[!IMPORTANT]`. | The words, not visual rendering alone, carry the instruction. | Skill and regression contain the semantic instruction. |

## Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| `DR01` | `DP01` | Accepted | The requested four-category table is the review output. |
| `DR02` | `DP02` | Accepted | Target-relative exact-candidate counts prevent stale or misleading totals. |
| `DR03` | `DP03` | Accepted | Existing briefs own the information. |
| `DR04` | `DP03` | Changed | The initial template copies were removed after owner review identified unnecessary duplication. |
| `DR05` | `DP04` | Accepted | A direct semantic alert reinforces the existing necessary-complexity goal. |

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decision | Add the four-category changed-line summary to final PR human briefs and an explicit avoid-over-engineering alert to the workflow skill. | `DISCLOSE` |
| Boundary | One canonical table, semantic file classification, exact target diff, and no new gate or template copy. | `DISCLOSE` |
| Validation | Source checks and 38 tests passed before final candidate reconciliation. | `DISCLOSE` |
| Open decisions | None. | `NONE` |
