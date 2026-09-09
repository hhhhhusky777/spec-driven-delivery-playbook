# Implementation Plan — Remove stable-entry-point upgrade gate

<!-- sdd: implementation-plan -->

## Delivery status

| Field | Value |
| --- | --- |
| State | `COMPLETE` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | `human-review-before-merge` |
| Feature branch / target | `codex/issue-80-remove-stable-entry` -> `main` |
| Owner | Repository owner |
| Primary issue / need | [#80](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/80) |
| Concluded whiteboard | [Solution whiteboard](solution-whiteboard.md) |
| Required reviewers | Two isolated agent reviewers |

## Outcome and boundaries

| Concern | Accepted value |
| --- | --- |
| Required outcome | Valid installed projects can upgrade without a `Stable entry point` manifest row |
| In scope | Installer parser/call, manifest template, adoption skill, self-adoption manifest, and regression tests |
| Out of scope | Other upgrade gates, feature-content migration, and automatic acceptance or merge |
| Compatibility | Legacy manifests may retain the unused row without blocking upgrade |
| Required evidence | Focused regression, complete repository suite, exact-head review, and owner approval |

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency |
| --- | --- | --- | --- |
| `D01-D03` | `T01`: remove the obsolete contract and prove absent/legacy manifests upgrade | Source search and full checks | Aligned |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | PR |
| --- | --- | --- | --- | --- | --- | --- |
| `T01` | `DONE` | `None` | Upgrade no longer requires a stable entry point | Preserve all unrelated upgrade protections | Installer regression and full suite | Pending delivery PR |

## Actual result

- Removed the obsolete installer parser and preflight gate.
- Removed the retired field from maintained manifest sources and adoption guidance.
- Preserved compatibility by ignoring the legacy row when an existing project still contains it.
- Replaced six path-validation scenarios with two behavior-focused regressions; all 34 tests pass.
