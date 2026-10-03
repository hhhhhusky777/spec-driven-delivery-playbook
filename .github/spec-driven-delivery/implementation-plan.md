# Implementation Plan — Autopilot mode

<!-- sdd: implementation-plan -->

## Delivery status

| Field | Value |
| --- | --- |
| State | `DRAFT` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | Plan acceptance; explicit mode and closing-transition decisions |
| Implementation mode | Human-review-before-merge; Autopilot not enabled |
| Delivery branch / target | `codex/autopilot-mode` / `main` |
| Owner | Repository owner |
| Primary issue / need | [#148](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/148) |
| Concluded whiteboard | [Whiteboard](solution-whiteboard.md), accepted design `cfcd847b12fb6c18902d1d900fe3a1d835b0f1c2`; conclusion `58a531d725089f84be9c33b55897ccdc2068914d` |
| Required reviewers | Retained independent seats `autopilot_r1` and `autopilot_r2` |
| Last verified | 2026-10-04; both reviewers approved exact conclusion; installed runtime CURRENT at bd56ed39 |

## Governing inputs and delivery boundaries

Consume the frozen whiteboard AP01–AP06, [canonical branch policy](../../CONTRIBUTING.md#branches-review-and-merge), [quality policy](../../docs/documentation-quality-policy.md#review-and-human-brief), and [error-handling authority](../../docs/error-handling.md). The whiteboard owns design; this plan owns execution facts; [PR #149](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/149) owns review and authorization evidence.

Scope is the portable Autopilot authorization contract and its consumers. No scheduler, new tracker, extra gate, speculative future authority, dependency changes, or unrelated Issue #147 consolidation. Material assumptions: None.

## Delivery strategy and readiness

| Concern | This delivery |
| --- | --- |
| Integration model | One coherent implementation unit; single PR to main, allowed by canonical policy |
| Task branch / required target | `codex/autopilot-mode` / `main`; PR #149 |
| Merge authority | Human main-merge acceptance remains required; no intermediate task PR exists |
| Mode choice | At plan review ask whether to enable continuous Autopilot execution to final readiness; no authority to auto-merge this PR to main |
| Foreseeable decisions | Plan acceptance, explicit Autopilot choice, and optional named archive/reset authorization |
| Readiness evidence | Worktree operation and installer validation passed; runtime pin accepted; both reviewers verified conclusion; locked dependencies provisioned |
| Parallel ownership | Reviewers read independently; parent owns edits and integration |

The implementation unit is atomic because the installed contract, template, review checks, and reader-facing diagram must agree. Creating separate task merges only to demonstrate Autopilot would add unnecessary coordination. Existing plans remain compatible and default to human review.

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| AP01 | T01: explicit plan-response opt-in and existing mode/authority fields | Default, silence, generic approval, explicit opt-in scenarios | Aligned |
| AP02 | T01: scoped reviewed feature-task merges | Exact candidate, checks, feature target and protected-target rejection scenarios | Aligned |
| AP03 | T01: continuous readiness with final human boundary | Multi-task and single-PR scenarios; final-gate sequence review | Aligned |
| AP04 | T01: foreseeable decision brief | Known blocking choice raised at plan gate; no blanket authority | Aligned |
| AP05 | T01: preserve stops and suspension | Authority narrowing, material new decision and existing time-boundary scenarios | Aligned |
| AP06 | T01: canonical workflow contract and aligned consumers | Focused source checks, links/diagram review, full final validation | Aligned |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | `PLANNED` | `None` | Autopilot is explicit, portable, authority-bounded and consistent across its consumers | AP01–AP06 only; preserve default and existing gates | Focused changed-source tests and semantic scenarios; full final gate | `codex/autopilot-mode`; #149; `main` |

## Task specifications and context receipts

### T01 — Portable mode and consistent consumers

| Concern | Value |
| --- | --- |
| Source boundary | Workflow skill owns contract; plan template records choices; review skill checks authority; CONTRIBUTING and quality policy route to canonical owner; README introduces mode and updates relevant diagram; document-model tests cover changed contract |
| Consumed dependencies | Approved AP01–AP06; installed bd56ed39 runtime; existing fields, reviewer sessions, branch policy and final gates |
| Critical obligations | No implicit opt-in, main auto-merge, weakened checks or whiteboard edits; do not duplicate algorithm across sources |
| Context receipt | Canonical sources read; exact conclusion approved by both seats; no unresolved source conflict |
| Actual result | Not implemented |

## Test and acceptance contracts

| Owning task | Contract, changed outcome, or risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| T01 | AP01–AP02 authorization | Source regressions plus independent review of explicit opt-in, default, wrong-target and stale-head cases | Planned | Focused task work |
| T01 | AP03–AP05 progression and preserved stops | Retained semantic review of dependent-task, single-PR, revoked authority and unexpected decision scenarios | Planned | Focused task review |
| T01 | AP06 consistency | Changed-document structure, lifecycle, links and relevant Mermaid checks | Existing tooling | Focused task work |
| T01 | Entire final candidate | Reconcile missing test coverage after implementation audit; run repository docs:all on final reviewed head | Unrun | Final gate |

No new programmatic workflow engine or exact-prose assertion quota. PR holds actual runs. The installed runtime stays pinned to the accepted released revision until a separately accepted source revision is available.

## Plan validation and completion

### Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | AP01–AP06 mapping, concise canonical contract and consistent consumers | Pending |
| Implementation audit | Author and both seats verify exact implementation against frozen design and suitable reuse before final-test work | Pending in PR #149 |
| Applicable validation | Focused checks, coverage-gap reconciliation, exact final review then docs:all | Pending in PR #149 |
| Merge-ready canonical state | Task DONE and plan COMPLETE in combined archive; live plan removed and whiteboard reset only with prior named human authorization | Pending |
| Delivery evidence | Both reviewers and human main-merge approval, exact target verification | GitHub owns current state |

### Planned versus actual outcome

| Design / task | Planned result | Actual evidence or deviation | Remaining obligation / owner |
| --- | --- | --- | --- |
| AP01–AP06 / T01 | Bounded Autopilot guidance | Not implemented; no deviation | Parent implementation after plan acceptance |

### Cleanup inventory

| Item | Keep, archive, remove, or reset | Ownership and evidence | Result |
| --- | --- | --- | --- |
| Concluded whiteboard and final plan | Combined archive linked to #148 and closing PR #149 | Preserve complete sources; human named closing-transition authorization required | Pending |
| Live whiteboard / live plan | Reset / remove in closing candidate | Only after authorized complete archive | Pending |
| Manifest and reusable guidance | Keep | Stable project authorities | Preserved |
| `/private/tmp/sdd-autopilot-mode` and `codex/autopilot-mode` | Remove owned worktree and retire merged branch after target verification | Do not touch other worktrees, changes or branches | Pending |

## Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Task and design consistency | One T01 covers all six AP points; no added scope | DISCLOSE |
| Mode | Enable Autopilot to final readiness, or retain human review; this single PR never auto-merges main | HUMAN_DECISION |
| Foreseeable cleanup | Authorize complete combined archive, live whiteboard reset and live plan removal in closing candidate; owned local cleanup after verified merge | HUMAN_DECISION |
| Validation | Runtime and conclusion verified; plan checks/review pending; implementation and full tests unrun | DISCLOSE |
| Other decisions / assumptions | None currently known; unforeseen material decisions retain existing stops | NONE |
