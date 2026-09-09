# Implementation Plan — risk-focused testing guidance

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority.

## Delivery status

| Field | Value |
| --- | --- |
| State | `VALIDATING` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | Human review before merge |
| Delivery branch / target | `codex/testing-strategy` → `main` |
| Owner | Repository owner |
| Primary issue / need | [#95](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/95) |
| Concluded whiteboard | [Risk-focused testing guidance](solution-whiteboard.md) |
| Required reviewers | Two isolated agents on the exact PR candidate |
| Last verified | Focused regression, Markdown/structure, lifecycle, and Mermaid checks passed on 2026-09-09 |

## Governing inputs and delivery boundaries

| Concern | Accepted value |
| --- | --- |
| Required outcome | Agents design proportional test evidence around material risks, not repetitive happy paths alone. |
| In scope | Canonical quality policy, concise workflow guidance, README explanation/diagram, focused regression. |
| Out of scope | New test framework, universal TDD mandate, fixed coverage/load quotas, new template fields, or a separate testing document. |
| Success measures | The policy owns the complete model; skill and README apply/explain it consistently; templates remain project-specific; repository gates pass. |

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| `D01`–`D04` | `T01`: add the canonical risk-focused testing model and concise application guidance. | Semantic regression plus documentation checks. | Aligned |
| `D05` | `T01`: add README explanation/diagram and verify templates do not duplicate policy. | Cross-document assertions and Mermaid validation. | Aligned |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | PR |
| --- | --- | --- | --- | --- | --- | --- |
| `T01` | `DONE` | `None` | Risk-focused testing guidance is canonical, usable, proportional, and consistently explained. | Four maintained consumers only; no new dependency or template field. | Focused tests, docs gates, two-agent review, full exact-head validation. | Pending |

## Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | `D01`–`D05` mapped to `T01` | Implemented in policy, workflow skill, README, and regression test |
| Applicable validation passed | Focused and full documentation suites on exact candidate | Focused suite passed; final exact-head suite pending review |
| PR-owned review and delivery | Same-head reviews, human authority, merge, and target proof | Pending PR |
| Feature cleanup complete | Concluded whiteboard archived with PR link; plan removed; working whiteboard reset in closing candidate | Pending |

## Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and outcomes | One task adds canonical testing policy, concise skill guidance, README explanation, and regression coverage. | `DISCLOSE` |
| Design consistency | All five design points map to `T01`; no template duplication. | `DISCLOSE` |
| Risks or open decisions | None. Heavy tests remain proportional and project-specific. | `NONE` |
| Decision requested | None until the exact PR candidate reaches human review. | `NONE` |
