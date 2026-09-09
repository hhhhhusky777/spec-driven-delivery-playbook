# Implementation Plan — Agent attention and authority refresh

<!-- sdd: implementation-plan -->

| Field | Value |
| --- | --- |
| State | `COMPLETE` |
| Issue | [#87](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/87) |
| Target | `main` |
| Delivery branch | `codex/attention-authority-refresh` |
| Active tasks | `None` |
| Next ready task | `None` |
| Merge mode | `HUMAN_REVIEW_BEFORE_MERGE` |

## Governing inputs and delivery boundaries

The concluded whiteboard governs this change. Preserve one-time adoption, the
three-document model, canonical policy ownership, proportional agent judgment,
and existing human-stop boundaries.

## Design-to-task mapping

| Design point | Task | Planned outcome | Validation |
| --- | --- | --- | --- |
| `DP01` | `T01` | Add handling classification to existing brief contracts and explanation. | Cross-document tests and semantic review |
| `DP02` | `T01` | Define proportional pre-design authority reconciliation in workflow and adoption guidance. | Source/consumer consistency review |
| `DP03` | `T01` | Make policy-changing candidates update manifest authority before final review. | Template, policy, and workflow agreement |
| `DP04` | `T01` | Preserve automatic agent correction and existing substantive stop boundaries. | Reviewer inspection and regression suite |

## Tasks

| ID | State | Depends on | Outcome / Definition of Done |
| --- | --- | --- | --- |
| `T01` | `DONE` | `None` | Source guidance, three templates, README, governance/policy consumers, and tests implement the accepted outcomes consistently. |

## Validation

| Check | State / evidence |
| --- | --- |
| Documentation and lifecycle suite | Passed: 37 tests plus Markdown, structure, lifecycle, and Mermaid checks |
| Two independent semantic reviews | Pending final candidate |
| Human acceptance and merge | Pending |

## Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and outcomes | One task implements all four design points. | `DISCLOSE` |
| Design consistency | Every design point maps to `T01`; no extra behavior is planned. | `DISCLOSE` |
| Risks or open decisions | Semantic discovery still requires agent and reviewer judgment; no owner decision remains. | `DISCLOSE` |
| Decision requested | Final exact-candidate acceptance after reviews. | `HUMAN_DECISION` |
