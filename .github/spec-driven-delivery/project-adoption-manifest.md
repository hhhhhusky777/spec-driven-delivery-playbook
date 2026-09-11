# Project Adoption Manifest — Spec-Driven Delivery Playbook

<!-- sdd: manifest -->

This is the reusable installation contract. It contains no feature-specific
state.

## Installation

| Field | Value |
| --- | --- |
| Project / repository | [hhhhhusky777/spec-driven-delivery-playbook](https://github.com/hhhhhusky777/spec-driven-delivery-playbook) |
| Adoption state | `INSTALLED` |
| State before block | `None` |
| Playbook source repository | `https://github.com/hhhhhusky777/spec-driven-delivery-playbook.git` |
| Playbook revision | `8b0bcdb184d3f4843979c1d5d55301122e6260e9` |
| Upgrade state | `COMPLETE` |
| Upgrade candidate | `None` |
| Playbook materialization mode | `pinned local checkout` |
| Adoption owner | Playbook maintainers |
| Accepted by | Repository owner through the adoption pull request |
| Accepted at | `2026-09-07 Asia/Shanghai` |
| Project adoption root | `.github/spec-driven-delivery` |
| Last verified | In-place upgrade to merged PR #101 revision `8b0bcdb184d3f4843979c1d5d55301122e6260e9`; project authority and route ownership reconciled for issues #102 and #103 on 2026-09-12 |

## Canonical project authorities

| Authority | Canonical source | Boundary |
| --- | --- | --- |
| Contribution, branching, review, and merge | [Contributing](../../CONTRIBUTING.md) | Repository changes and human authority |
| Documentation quality and human briefs | [Documentation Quality Policy](../../docs/documentation-quality-policy.md) | Documentation checks and reviewability |
| Reusable template ownership | [Template Governance](../../docs/template-governance.md) | Playbook templates and compatibility |
| Error handling | [Error handling](../../docs/error-handling.md) | Recovery, triage, and escalation |
| Active design | [Solution whiteboard](solution-whiteboard.md) | Current feature design only |

## Stable boundaries

- Adoption is complete and persists across feature deliveries; a future need
  does not repeat adoption.
- The manifest never records an active feature, task, next action, branch, or
  review result.
- For normal delivery, the working whiteboard owns design and the implementation
  plan owns active-delivery state. For an Issue-only Fast Fix, the Issue owns its
  bounded outcome and scope. Pull requests own review and delivery history.
- Required checks, independent review, human decisions, merge authority,
  and destructive ownership remain mandatory at their actual boundaries.
- Runtime files under `.sdd-runtime/` and installer-owned temporary checkouts
  are machine-local generated state, not project authority.
