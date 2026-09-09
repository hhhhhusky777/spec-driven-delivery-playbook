# Implementation Plan — Reviewer continuity and useful findings

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority.

## Delivery status

| Field | Value |
| --- | --- |
| State | `IN_PROGRESS` |
| Active tasks | `T01` |
| Next ready task | `T01` |
| Active blocker | `None` |
| Implementation mode | Human review before merge |
| Delivery branch / target | `codex/reviewer-guidance` -> `main` |
| Owner | Repository owner |
| Primary issue / need | [Issue #99](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/99) |
| Concluded whiteboard | [Solution whiteboard](solution-whiteboard.md) |
| Required reviewers | Two fresh isolated agents for T01; retain them for T01 corrections |
| Last verified | Worktree runtime current at `800cb2ea3199b5cd1726cc3f5e3d2a7093747792` on 2026-09-10 |

## Governing inputs and delivery boundaries

| Concern | Accepted value |
| --- | --- |
| Required outcome | Make reviewer freshness, correction continuity, and grounded actionable findings explicit and consistent. |
| In scope | Quality policy, workflow skill, README, contributing guide, and semantic tests. |
| Out of scope / deferred | GitHub Apps, formal GitHub approval identities, new templates, and unrelated review behavior. |
| Success measures | Every design point is represented once canonically, consumed consistently, and protected by focused tests. |

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| `D01`, `D02` | `T01`: define fresh task reviewers and retained correction reviewers. | Semantic test plus document review. | Aligned |
| `D03`, `D04`, `D05` | `T01`: define useful, grounded, proportional change-request content. | Semantic test plus document review. | Aligned |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | PR |
| --- | --- | --- | --- | --- | --- | --- |
| `T01` | `IN_PROGRESS` | `None` | Reviewer sessions and findings follow the concluded design. | No template duplication, invented authority, or scope expansion. | Focused semantic test; two fresh reviewers; final full validation. | Pending |

## T01 — Reviewer continuity and useful findings

| Concern | Value |
| --- | --- |
| Outcome / non-scope | Clarify reviewer selection and useful change requests without adding identities, gates, or prescriptive templates. |
| Source boundary | `docs/documentation-quality-policy.md`, `skills/sdd-project-workflow/SKILL.md`, `README.md`, `CONTRIBUTING.md`, and `tests/document-model.test.mjs` |
| Critical obligations | Freshness between tasks; continuity within corrections; optional advice stays non-blocking; standards are never fabricated. |
| Required evidence | Focused tests on changed files and lines, exact-head review by two fresh agents, full validation before human merge decision. |
| Context receipt | Issue #99, concluded whiteboard, manifest authorities, and current review loop reconciled; no conflict found. |
| Actual result | Pending |

## Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | `D01`-`D05` mapped to `T01` | Pending |
| Applicable validation passed | Focused tests, exact-head review, then full validation | Pending |
| Merge-ready canonical state | Archive concluded whiteboard, remove this plan, and reset working whiteboard before final review | Pending |
| PR-owned review and delivery | Findings, owner authority, merge, and target proof | Pending PR |

## Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and outcomes | One task covering reviewer freshness, correction continuity, and grounded findings. | `DISCLOSE` |
| Design consistency | `D01`-`D05` map completely to `T01`; no gap. | `NONE` |
| Important changes | Review policy and its operational/readable consumers only. | `DISCLOSE` |
| Validation | Pending focused tests, two fresh reviewers, and final full validation. | `AGENT_ACTION` |
| Risks or open decisions | `None` | `NONE` |
| Decision requested | `None` until the final human merge gate. | `NONE` |
