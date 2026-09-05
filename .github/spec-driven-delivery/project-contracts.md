# Project contract registry

Status: PROPOSED in the [installation batch](installation-batch.md). This is
navigation to canonical authority, not a second policy. Activation requires
final owner acceptance and reviewed merge under the batch contract. The
[manifest](project-adoption-manifest.md) owns current adoption status.

| Reader need | Canonical source | Owner |
| --- | --- | --- |
| Start / development / branches | [Contributing](../../CONTRIBUTING.md) | Repository owner |
| Testing and evidence | [Documentation Quality Policy](../../docs/documentation-quality-policy.md) | Maintainer / test reviewer |
| Reusable template ownership | [Template Governance](../../docs/template-governance.md) | Template maintainer |
| Review packet and self-review | Pinned `templates/reviews/` through verified runtime | Two isolated reviewers then owner |
| Start or resume agent work | [Project trigger](agent-trigger.md) | Maintainer |
| Current need | [Empty working whiteboard](solution-whiteboard.md) | Owner; no need admitted before acceptance |
| Archive / updates | [Archive contract](archive/README.md) | Maintainer |

## Artifact locations

Paths are relative to this adoption root. Future records are created only when
their approved workflow requires them; filenames below are contracts, not
claims that a need, handoff, or plan exists.

| Artifact | Pinned template path | Project path |
| --- | --- | --- |
| Whiteboard | `templates/discovery/solution-whiteboard.md` | `solution-whiteboard.md` |
| Handoff | `templates/handoffs/whiteboard-to-workflow.md` | `deliveries/DELIVERY-ID/handoff.md` |
| Workflow | `templates/workflows/sdd-delivery-workflow.md` | `deliveries/DELIVERY-ID/workflow.md` |
| Plan | `templates/delivery/implementation-plan.md` | `deliveries/DELIVERY-ID/implementation-plan.md` |
| Reviews | `templates/reviews/fresh-context-agent-review.md` | `reviews/DELIVERY-ID-SESSION.md` |
| Evidence / delivery record | Plan evidence and closure sections | `deliveries/DELIVERY-ID/evidence.md` and `record.md` |
| Archive | Whiteboard/workflow archive contracts | `archive/DELIVERY-ID/` |
| Upgrade assessment | `templates/adoption/playbook-upgrade-assessment.md` | `upgrades/ASSESSMENT-ID.md` |

DELIVERY-ID and ASSESSMENT-ID are owner-reviewed stable identifiers chosen at
intake. Paths cannot escape this root or overwrite another delivery. The
whiteboard is single-owner; parallel tasks belong to the same approved
delivery and use its dependency register and separate worktrees.

## Runtime source resolution

The manifest pins playbook repository and immutable SHA. Read
`.sdd-runtime/agent-guide.md` from the repository root, verify its root, origin,
HEAD, ownership, and profile, then resolve template paths in that read-only
checkout. Never substitute latest main or a stale local copy. Human readers
may use the pinned source at GitHub with that full manifest SHA. Missing or
mismatched runtime stops agent execution before project writes.

No specialized-policy file is installed without an observed systemic trigger.
The manifest gap register records that deferred route and owner. Security,
quality, and template rules remain at their existing canonical sources.
