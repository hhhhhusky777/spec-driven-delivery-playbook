# Implementation Plan — archive completeness and Fast Fix

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority. GitHub issues own the needs;
pull requests own review, checks, acceptance, merge, and target evidence.

## Delivery status

| Field | Value |
| --- | --- |
| State | `DRAFT` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | Planning review and owner acceptance |
| Implementation mode | Human review before merge |
| Delivery branch / target | `codex/archive-fast-fix` / `main` |
| Owner | Repository owner |
| Primary issue / need | [#102](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/102), [#103](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/103) |
| Concluded whiteboard | [Accepted design](solution-whiteboard.md) at `81ab6e766768032c73f4000a93e8522fd0a943a3` |
| Required reviewers | Same two isolated feature reviewers retained from design through merge |
| Last verified | Design approved by both reviewers and repository owner; lifecycle check passed on 2026-09-11 |

## Governing inputs and boundaries

| Priority | Source | Authority / use |
| --- | --- | --- |
| 1 | Repository owner decisions | Two tasks, agent-selected Fast Fix, proportional UI evidence, and human review before merge |
| 2 | [Concluded whiteboard](solution-whiteboard.md) | `CD01`–`CD09` accepted outcomes and boundaries |
| 3 | [Contributing](../../CONTRIBUTING.md), [quality policy](../../docs/documentation-quality-policy.md), and [error handling](../../docs/error-handling.md) | Canonical delivery, evidence, review, and escalation rules |
| 4 | Issues [#102](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/102) and [#103](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/103) | Problem records and acceptance intent |

| Concern | Accepted value |
| --- | --- |
| Required outcome | Preserve one complete normal-delivery archive and add a proportional Issue-plus-PR Fast Fix route without weakening quality or authority. |
| In scope | Templates, lifecycle checker and fixtures, workflow/review guidance, canonical policy, README diagrams, examples, compatibility, and this repository's installed pin/state. |
| Out of scope | Automatic merge, reviewer reduction, historical archive rewrites, additional reusable templates, a Fast Fix state engine, or unrelated cleanup. |
| Compatibility | Existing active normal deliveries close using the combined archive; existing completed archives remain valid; Fast Fix applies prospectively. |
| Implementation baseline | Branch point `8b0bcdb184d3f4843979c1d5d55301122e6260e9`; prepared in-place upgrade resolves to the same revision. |

## Contracts and risks

| ID | Contract | Failure behavior / evidence |
| --- | --- | --- |
| `FC01` | A normal closing candidate contains one combined archive before removing the live plan and resetting the whiteboard. | Lifecycle validation fails closed on missing source content, missing archive, competing archives, or non-empty live state. |
| `FC02` | Archive preserves concluded design, draft reconciliation, task mapping, task outcomes, validation expectations, deviations, and issue/PR links. | Fixture inspection proves durable fields; detailed GitHub evidence is linked, not copied. |
| `FC03` | Fast Fix uses an eligible Issue for need and boundaries and a PR for candidate and delivery evidence, with no feature whiteboard, plan, or archive. | Ambiguous or disqualifying scope escalates to normal delivery. |
| `FC04` | Fast Fix initializes two isolated reviewers before first candidate review and retains them through corrections, escalation, and merge. | Routing guidance and regression tests reject fresh-per-round reviewer wording. |
| `FC05` | Focused evidence covers changed files, lines, and observable behavior; UI-only evidence is proportional; full applicable validation runs at final merge gate. | Missing applicable evidence blocks review or merge; unrelated test infrastructure is not required. |
| `FC06` | Closing PR links to the combined archive, and the archive links to its issues and PRs. | Human brief and lifecycle fixture expose missing discoverability. |

| Risk | Mitigation |
| --- | --- |
| Fast Fix becomes a bypass | Clear outcome-based disqualifiers, fail-closed escalation, unchanged reviewers, validation, and human merge authority. |
| Combined archive duplicates GitHub | Preserve durable design/execution context only and link detailed evidence. |
| Checker becomes a new workflow engine | Validate repository invariants and fixtures only; route judgment remains with the agent. |
| UI rule creates test over-engineering | Require the smallest applicable behavioral or visual evidence, not a universal test type or new framework. |
| Existing delivery breaks | Prospective close behavior with compatibility fixtures; no rewriting completed archives. |

## Delivery strategy and readiness

| Concern | This delivery |
| --- | --- |
| Integration model | One delivery branch and one final PR to `main`; two sequential task review boundaries. |
| Increment boundary | `T01` establishes the normal closing model; `T02` adds the alternative route against that stable model. |
| Parallel ownership | None; both tasks touch shared lifecycle and guidance surfaces. |
| Upgrade | Manifest-pinned runtime regenerated; latest `main` candidate prepared and validated as `UPGRADE_CURRENT`; accepted pin convergence ships in this delivery. |
| Merge authority | Human review before merge. |

Readiness does not require future implementation output. `T01` becomes ready
after this plan is reviewed and accepted. `T02` becomes ready when `T01` is
done on the delivery branch.

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| `CD01`, `CD02` | `T01` — combined archive content, bidirectional links, and atomic close transition | Lifecycle positive/negative fixtures and documentation checks | aligned |
| `CD08` | `T01` — prospective migration and preservation of historical archives | Compatibility fixtures | aligned |
| `CD03`, `CD04` | `T02` — Issue-plus-PR route and agent eligibility decision | Eligible, ambiguous, and disqualifying cases | aligned |
| `CD05`, `CD07` | `T02` — retained cohort, quality loop, and in-place escalation | Routing and escalation fixtures | aligned |
| `CD06` | `T02` — proportional UI evidence guidance | Documentation regression and semantic review | aligned |
| `CD09` | `T01`, `T02` — reconcile all canonical and reader-facing surfaces | README/diagram, Markdown, lifecycle, and full repository validation | aligned |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | PR |
| --- | --- | --- | --- | --- | --- | --- |
| `T01` | `PLANNED` | `None` | Normal delivery archives concluded design and completed implementation context together in one discoverable document. | No history rewrite, fourth reusable template, copied PR evidence, or unrelated cleanup. | Focused lifecycle, archive, template, docs, and compatibility tests. | Final feature PR |
| `T02` | `PLANNED` | `T01` | Eligible small fixes use Issue plus PR with agent-selected routing, proportional evidence, retained reviewers, and safe escalation. | No reduced quality/human gates, new state engine, or speculative eligibility procedure. | Focused routing, review-loop, escalation, UI-guidance, docs, and compatibility tests. | Final feature PR |

### `T01` — combined delivery archive

| Concern | Value |
| --- | --- |
| Outcome / non-scope | Preserve accepted design and completed execution context in one archive; do not duplicate GitHub evidence or migrate old archives. |
| Source boundary | Lifecycle checker/tests, implementation-plan and whiteboard templates, workflow and cleanup guidance, README lifecycle diagrams, representative examples. |
| Consumed dependencies | `CD01`, `CD02`, `CD08`, `CD09`; issues #102 and #103; current three-document model. |
| Critical obligations | Archive exists before live sources are removed; closing PR and archive link each other; prior archives remain valid. |
| Required evidence | Focused changed-file/line tests, positive and fail-closed fixtures, both retained reviewers. |
| Context receipt | Current policies, templates, lifecycle checker, tests, README references, and issue requirements inspected; no unresolved conflict. |
| Actual result | Pending. |

### `T02` — Issue-only Fast Fix

| Concern | Value |
| --- | --- |
| Outcome / non-scope | Remove duplicate feature artifacts for clearly bounded corrections; do not weaken evidence, review, or authority. |
| Source boundary | Workflow/review skills, quality and error-handling links, contribution guide, README routes/diagrams, lifecycle and document-model tests. |
| Consumed dependencies | `T01`; `CD03`–`CD07`, `CD09`; stable normal-delivery archive model. |
| Critical obligations | Agent discloses route; ambiguity escalates; reviewer cohort starts before first review and survives escalation; UI evidence is proportional. |
| Required evidence | Eligible/disqualified/escalation fixtures, focused tests, both retained reviewers, final full validation. |
| Context receipt | Pending after `T01` exact accepted result. |
| Actual result | Pending. |

## Recovery and change control

Use the canonical [error-handling framework](../../docs/error-handling.md).
Agent-correctable checker, documentation, or fixture mistakes repeat only the
affected work. A discovered observable design change requires a whiteboard
amendment and owner decision. A Fast Fix eligibility ambiguity fails closed to
normal delivery without discarding valid work.

## Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | `CD01`–`CD09` mapped to both tasks | Pending |
| Applicable validation passed | Focused tests per task; full `npm run docs:all` on final reviewed candidate | Pending |
| Compatibility safe | Active normal delivery, historical archive, eligible Fast Fix, and escalation cases | Pending |
| Merge-ready canonical state | Manifest pin, reusable guidance, combined archive of this delivery, removed live plan, and reset whiteboard | Pending |
| PR-owned review and delivery | Same two agents, human merge acceptance, issue auto-close, and target proof | Pending final PR |
| Feature cleanup complete | Combined archive, owned file inventory, worktree/branch cleanup after target proof | Pending |

## Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and outcomes | `T01` combined archive, then `T02` Fast Fix route. | `DISCLOSE` |
| Design consistency | Every `CD01`–`CD09` point maps to one or both tasks; no unexplained work. | `NONE` |
| Important boundaries | No new template or state engine; existing reviews, final validation, and human merge gate remain. | `DISCLOSE` |
| Validation | Focused checks per task; full repository gate only on final reviewed candidate. | `DISCLOSE` |
| Risks or open decisions | No open design decision; planning acceptance is required before `T01`. | `HUMAN_DECISION` |
| Decision requested | Accept this two-task plan and authorize `T01` implementation. | `HUMAN_DECISION` |
