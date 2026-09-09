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
| Playbook revision | `f1a8083db05f1fff9c9c3084618b72345e3aa77d` |
| Upgrade state | `COMPLETE` |
| Upgrade candidate | `None` |
| Playbook materialization mode | `pinned local checkout` |
| Adoption owner | Playbook maintainers |
| Accepted by | Repository owner through the adoption pull request |
| Accepted at | `2026-09-07 Asia/Shanghai` |
| Project adoption root | `.github/spec-driven-delivery` |
| Last verified | In-place upgrade to merged PR #91 revision `f1a8083db05f1fff9c9c3084618b72345e3aa77d`; project authority revalidated for issues #92 and #93 on 2026-09-09 |

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
- The working whiteboard owns design; the implementation plan, when present,
  owns all active-delivery state; pull requests own review and delivery history.
- Required checks, independent review, human decisions, merge authority,
  and destructive ownership remain mandatory at their actual boundaries.
- Runtime files under `.sdd-runtime/` and installer-owned temporary checkouts
  are machine-local generated state, not project authority.
