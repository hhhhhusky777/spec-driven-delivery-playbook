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
| Playbook revision | `800cb2ea3199b5cd1726cc3f5e3d2a7093747792` |
| Upgrade state | `COMPLETE` |
| Upgrade candidate | `None` |
| Playbook materialization mode | `pinned local checkout` |
| Adoption owner | Playbook maintainers |
| Accepted by | Repository owner through the adoption pull request |
| Accepted at | `2026-09-07 Asia/Shanghai` |
| Project adoption root | `.github/spec-driven-delivery` |
| Last verified | In-place upgrade candidate to merged PR #98 revision `800cb2ea3199b5cd1726cc3f5e3d2a7093747792`; project authority revalidated for issue #99 on 2026-09-10 |

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
