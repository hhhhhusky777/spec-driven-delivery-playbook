# Project Adoption Manifest — `<project>`

<!-- sdd: manifest -->

This reusable installation contract contains no feature-specific state.

## Installation

| Field | Value |
| --- | --- |
| Project / repository | `<link>` |
| Adoption state | `DRAFT` |
| State before block | `None` |
| Playbook source repository | `<canonical Git URL>` |
| Playbook revision | `<full commit SHA>` |
| Upgrade state | `NONE` |
| Upgrade candidate | `None` |
| Stable entry point | `<project-relative path>` |
| Adoption owner | `<owner>` |
| Required review | `<project rule>` |
| Last verified | `<date and evidence>` |

## Canonical project authorities

| Concern | Canonical source | Applicable boundary or owner decision |
| --- | --- | --- |
| Contribution and branches | `<link>` | `<summary>` |
| Testing and validation | `<link>` | `<summary>` |
| Security and secrets | `<link>` | `<summary>` |
| Documentation | `<link>` | `<summary>` |
| Review and merge | `<link>` | `<summary>` |

Add rows only for authorities that materially govern delivery. Canonical
sources and explicit owner decisions must agree before adoption or upgrade is
accepted.

## Stable project boundaries

| Boundary | Value |
| --- | --- |
| Protected content | `<paths or rules>` |
| Required environments | `<summary or None>` |
| External mutation authority | `<summary or None>` |
| Destructive-action authority | `<summary or None>` |
| Known project exceptions | `<links or None>` |

The active feature, task, branch, PR, review progress, and next action never
belong in this manifest. The implementation plan owns active delivery state.
