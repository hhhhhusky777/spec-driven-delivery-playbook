# Implementation Plan — Review changed-line summary

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority.

## Delivery status

| Field | Value |
| --- | --- |
| State | `IMPLEMENTING` |
| Active tasks | `T01` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | Human review before merge |
| Delivery branch / target | `codex/review-line-summary` / `main` |
| Owner | Repository owner |
| Primary issue / need | [#90](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/90) |
| Concluded whiteboard | [Solution whiteboard](solution-whiteboard.md), owner request on 2026-09-09 |
| Required reviewers | Two isolated agent reviewers and repository owner |
| Last verified | `main` and `origin/main` at `981cd9cefb675324cddb5a6d8d7eb8c9b76e43df`; runtime upgrade prepared 2026-09-09 |

## Governing inputs and delivery boundaries

| Concern | Accepted value |
| --- | --- |
| Required outcome | Final PR human briefs show additions, deletions, and total changed lines for product code, documentation, tests, and other files. |
| In scope | Canonical human-brief policy, workflow skill, reusable templates, README, and focused regression coverage. |
| Out of scope | A new report document, mandatory helper program, language-specific classifier, or additional review gate. |
| Compatibility | Existing review classes, three-document lifecycle, and project-specific validation remain unchanged. |

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| `DP01` | `T01`: add the four-category table contract. | Documentation and model tests. | Aligned. |
| `DP02` | `T01`: define exact target-relative counts and semantic classification. | Cross-document semantic review. | Aligned. |
| `DP03` | `T01`: extend existing briefs only. | Three-document and complexity checks. | Aligned. |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | PR |
| --- | --- | --- | --- | --- | --- | --- |
| `T01` | `IN_PROGRESS` | `None` | Reusable final PR briefs expose the four-category changed-line summary. | No new gate, artifact, dependency, or rigid classifier. | `npm run docs:all`, runtime validation, two-agent review. | Pending |

## Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | `DP01`-`DP03` mapped to `T01`. | Pending implementation. |
| Applicable validation passed | Documentation suite and runtime validation. | Pending. |
| Merge-ready canonical state | README, policy, skill, templates, archive/reset, and manifest agree. | Pending. |
| PR-owned review and delivery | Exact-head CI, two agents, owner approval, merge, and target proof. | Pending PR. |

## Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Task and outcome | `T01` adds a four-category changed-line table to final PR review briefs. | `DISCLOSE` |
| Validation | Pending implementation and exact-candidate checks. | `AGENT_ACTION` |
| Open decisions | None. | `NONE` |
