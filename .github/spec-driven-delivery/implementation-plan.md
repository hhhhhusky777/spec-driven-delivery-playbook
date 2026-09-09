# Implementation Plan — simple failures and final validation

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
| Delivery branch / target | `codex/simple-errors-final-validation` → `main` |
| Owner | Repository owner |
| Primary issue / need | [#97](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/97) |
| Concluded whiteboard | [Simple failure handling and final validation](solution-whiteboard.md) |
| Required reviewers | Two isolated agents on the exact PR candidate |
| Last verified | Runtime `CURRENT`; focused tests, Markdown/structure, lifecycle, and Mermaid checks passed on 2026-09-09 |

## Governing inputs and delivery boundaries

| Concern | Accepted value |
| --- | --- |
| Required outcome | Agents preserve consistency with simple fail-closed errors and avoid repeating heavy tests on intermediate task PRs. |
| In scope | Error policy, testing/review policy, workflow skill, CONTRIBUTING, README diagrams/prose, and focused regression. |
| Out of scope | Universal error catalogs, retry protocol/status codes, fixed test commands/coverage, removal of review or human merge authority, and template changes. |
| Success measures | One canonical error framework; all review consumers share branch-sensitive validation depth; repository gates pass. |

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| `D01`, `D02` | `T01`: emphasize simple invariant-based fail-closed handling and safe client retry. | Cross-document semantic assertions. | Aligned |
| `D03`–`D05` | `T01`: move heavy validation to the final protected-target candidate while preserving task review and correction loops. | Diagram/ordering assertions, docs gates, and two-agent review. | Aligned |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | PR |
| --- | --- | --- | --- | --- | --- | --- |
| `T01` | `DONE` | `None` | Canonical failure handling and review-validation sequencing reflect `D01`–`D05`. | No new artifact, dependency, template field, or universal implementation mechanism. | Fast affected checks, two-agent review, then full exact-head validation because this PR targets `main`. | Pending |

## Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | `D01`–`D05` mapped to `T01` | Pending |
| Applicable validation passed | Focused checks; final full suite after exact-head reviewers approve | Pending |
| PR-owned review and delivery | Same-head reviews, human authority, merge, and target proof | Pending PR |
| Feature cleanup complete | Archive concluded whiteboard with PR link, remove plan, reset live whiteboard | Pending |

## Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and outcomes | One task updates canonical policy and its existing consumers, with regression coverage. | `DISCLOSE` |
| Design consistency | Every accepted design point maps to `T01`; no template or new artifact is introduced. | `DISCLOSE` |
| Remaining decisions | None until the final exact PR candidate reaches human review. | `NONE` |
