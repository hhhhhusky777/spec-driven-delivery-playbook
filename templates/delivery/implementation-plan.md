# Implementation Plan — `<feature>`

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority.

## Delivery status

| Field | Value |
| --- | --- |
| State | `DRAFT` |
| Current task | `None` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | `<human-review-before-merge or explicitly authorized alternative>` |
| Feature branch / target | `<values>` |
| Last verified | `<date and evidence>` |

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| `<whiteboard ID>` | `<task ID and outcome>` | `<proof>` | `<aligned, gap, or non-code obligation>` |

Every accepted design point must be covered, and every task must have a design,
project-authority, or necessary-engineering basis.

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | PR |
| --- | --- | --- | --- | --- | --- | --- |
| `T01` | `PLANNED` | `None` | `<observable result>` | `<scope and compatibility>` | `<checks>` | `None` |

Use only the task detail needed to implement and judge the result. A task is
done when its outcome, applicable validation, review, merge requirement, and
dependent state are satisfied.

## Delivery Definition of Done

- The concluded design is fully mapped with no unexplained task or gap.
- Applicable project checks pass; unrun or failed checks remain explicit.
- Required review and merge authority are recorded in the pull request.
- Canonical documents and user-facing entry points affected by the change are
  consistent.
- The plan reports the actual final state and no unresolved critical mismatch.

## Human review brief

| Attention | Summary |
| --- | --- |
| Tasks and outcomes | `<short task list>` |
| Design consistency | `<mapping result and gaps>` |
| Important changes | `<contracts, policies, compatibility, or migrations>` |
| Validation | `<passed, failed, and unrun>` |
| Risks or open decisions | `<summary or None>` |
| Decision requested | `<exact request>` |

Detailed comments, checks, approvals, revisions, and merge evidence belong in
the pull request rather than additional repository documents.
