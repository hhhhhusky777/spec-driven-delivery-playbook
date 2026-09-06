# Project contract registry

Accepted through the [installation batch](installation-batch.md). This is
navigation to canonical authority, not a second policy. Final owner acceptance
and reviewed merge are recorded in the manifest. The
[manifest](project-adoption-manifest.md) owns current adoption status.

| Reader need | Canonical source | Owner |
| --- | --- | --- |
| Start / development / branches | [Contributing](../../CONTRIBUTING.md) | Repository owner |
| Testing and evidence | [Documentation Quality Policy](../../docs/documentation-quality-policy.md) | Maintainer / test reviewer |
| Reusable template ownership | [Template Governance](../../docs/template-governance.md) | Template maintainer |
| Review packet and self-review | Pinned `templates/reviews/` through verified runtime | Two isolated reviewers then owner |
| Start or resume agent work | [Project trigger](agent-trigger.md) | Maintainer |
| Current need | [Working whiteboard](solution-whiteboard.md) | Repository owner; live state governs intake |
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

## U84 future-delivery routing

This migration is pending the [manifest's upgrade cutover](project-adoption-manifest.md#u84-upgrade-handoff)
and reviewed publication. Until then use the unchanged installed pin. After
cutover, resolve all source paths below through the verified pinned checkout.

| Need | Canonical source / project consequence |
| --- | --- |
| New workflow/plan | Matching v4 source templates; reciprocal links must resolve by GATES_READY. A compact plan is required even for editorial delivery; Contributing's compact discovery route is not a no-plan exemption under v4 |
| Phase readiness | `docs/batch-review-and-recovery.md#version-4-phase-aware-readiness`; map prerequisites separately from future implementation, validation and closure outputs; never require a task's own future result before it starts |
| Batched preparation/review | `docs/batch-review-and-recovery.md`; use `templates/reviews/review-batch.md` only with explicit per-package scope/authority. Availability is not standing batch or auto-merge authorization |
| Discussion and human review | Draft-first whiteboard notes; formal conclusion when settled; phase-specific table briefs from the quality policy. Planning brief compares design points with tasks and validation |
| Evidence and exceptions | Shared PR-primary retention and exception-triage contract; preserve prior exact local receipts and distinguish upstream gaps from project errors |
| Closure | Shared one-closure-package contract; preserve actual validation and owner acceptance, exact cleanup ownership and separately authorized bounded control receipts |

Historical v2/v3 records and completed WB38 artifacts keep their accepted bytes
and versions. The registry routes new work; it does not retroactively migrate
history or override Contributing's review, branch, or owner-acceptance policy.
