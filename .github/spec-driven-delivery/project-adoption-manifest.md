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
| Playbook revision | `e7934be75e0834961a3083f18b6aa2bfd35a4a66` |
| Upgrade state | `ASSESSING` |
| Upgrade candidate | `814cdf768d72d57d962c51d9e5ad1cae8aa0246f` |
| Playbook materialization mode | `pinned local checkout` |
| Adoption owner | Playbook maintainers |
| Accepted by | Repository owner through the adoption pull request |
| Accepted at | `2026-09-07 Asia/Shanghai` |
| Project adoption root | `.github/spec-driven-delivery` |
| Knowledge Base root | `.github/spec-driven-delivery/knowledge-base` |
| Last verified | 2026-10-23 Asia/Shanghai: incremental discovery compared the incoming manifest template and current canonical sources; authority and Experience links remain current; candidate preparation validates and acceptance evidence belongs to the pull request |

## Canonical project authorities

| Authority | Canonical source | Boundary |
| --- | --- | --- |
| Contribution, branching, review, and merge | [Contributing](../../CONTRIBUTING.md) | Repository changes and human authority |
| Documentation quality and human briefs | [Documentation Quality Policy](../../docs/documentation-quality-policy.md) | Documentation checks and reviewability |
| Reusable template ownership | [Template Governance](../../docs/template-governance.md) | Playbook templates and compatibility |
| Error handling | [Error handling](../../docs/error-handling.md) | Recovery, triage, and escalation |
| Reusable project experience | [Experience](../../docs/experience.md) | Verified practical guidance; does not override policies or grant authority |
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
