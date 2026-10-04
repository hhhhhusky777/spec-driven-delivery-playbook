# Delivery archive — Autopilot mode

<!-- sdd: delivery-archive -->

| Field | Value |
| --- | --- |
| Issues | [#148](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/148) |
| Closing pull request | [#149](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/149) |

Complete sources follow; headings and relative links are adjusted only for embedding.
The whiteboard is the accepted design snapshot, not a current-status ledger.

<!-- sdd: archived-whiteboard -->

## Solution whiteboard — Autopilot to final merge-back readiness

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [Issue #148](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/148) |
| Owner | Repository owner |
| Concluded design revision | `cfcd847b12fb6c18902d1d900fe3a1d835b0f1c2` |
| Open owner decisions | `None` |

### Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| DR01 | At implementation-plan human review, ask in the response whether to enable Autopilot and explain the exact authority. | accepted |
| DR02 | With explicit opt-in, merge reviewed task PRs into the named feature integration branch and start ready dependent tasks without routine human pauses. | accepted |
| DR03 | Continue through existing final-readiness work; stop at final merge-back ready for human acceptance of the protected-target merge. | accepted |
| DR04 | Ask foreseeable human questions together at plan review, with recommendations, to minimize avoidable interruptions. | accepted |
| DR05 | Preserve all existing policy, scope, testing, review, time, safety, and destructive-action boundaries; do not promise unknown decisions can be eliminated. | accepted |
| DR06 | Reuse plan mode/merge-authority fields and PR evidence; no new state document, controller, or automation service. | accepted |

### Authority and context

| Source | Authority or relevant content | Freshness / verification |
| --- | --- | --- |
| Owner request in Issue #148 | Defines Autopilot behavior and the plan-review response. | 2026-10-04 Asia/Shanghai |
| [Contributing](../../../CONTRIBUTING.md#branches-review-and-merge) | Canonical branch policy; scoped merge authority; human acceptance and cleanup. | Current main bd56ed3 |
| [Workflow skill](../../../skills/sdd-project-workflow/SKILL.md) | Portable delivery rules, focused/final validation, and existing stop boundaries. | Current main bd56ed3 |
| [Error handling](../../../docs/error-handling.md) | Recoverable errors remain agent work; unresolved critical decisions require human authority. | Current main bd56ed3 |
| [Quality policy](../../../docs/documentation-quality-policy.md#review-and-human-brief) | Design acceptance, human summary, exact-candidate review, and final validation. | Current main bd56ed3 |

### Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem / observed need | Repeated human task-merge pauses interrupt approved multi-task work even when reviewers and applicable checks pass. |
| Required outcome | Explicit bounded opt-in enables continuous task delivery to final merge-back readiness, not automatic protected-target merge. |
| In scope | Portable workflow mode contract; existing plan fields and human brief; reviewer authority check; README and relevant diagram; repository policy alignment and regressions. |
| Out of scope / deferred | New scheduler, tracker, background service, removal of existing gates, blanket future approval, unrelated consolidation in Issue #147. |
| Compatibility | Existing plans and projects default to human review before merge; no implied opt-in or mandatory migration. |

### Facts, assumptions, and owner decisions

| Concern | Evidence / disposition |
| --- | --- |
| Existing scope for task auto-merge | Contributing already permits explicitly authorized, scoped merge alternatives. |
| Existing plan storage | Implementation mode and merge authority already have canonical fields. |
| Material assumptions | None. Missing branch names and decisions remain plan-review inputs, not assumptions. |
| Open owner decisions | None about the proposed behavior; exact design acceptance is the current human gate. Per-delivery Autopilot opt-in is requested later at that delivery's plan-review gate. |
| Runtime currentness | Installer validates UPGRADE_CURRENT; candidate bd56ed39a07b7cfae552e1345769160b8e355daa prepared before design. Old pin b3f13badb6e8b828f4185e6116939d51b5d3faeb remains authoritative until upgrade acceptance. No feature implementation started. |

### Concluded design — accepted proposal

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| AP01 | At implementation-plan human review, the parent response asks whether to enable Autopilot, explains scope, and offers retain-human-review as the default. | Generic plan approval, silence, or an unresolved choice does not enable it. The approved plan owns mode, scope, named feature branch and protected target; PR owns authorization evidence. | Inspect response contract and plan fields; no new document. |
| AP02 | Once explicitly authorized, the author merges each task PR only into the named feature integration branch after both retained reviewers approve the exact candidate and focused/applicable required checks pass. | Follow canonical branch policy. Revisions invalidate affected approval/checks. Required external approvals are not replaced by agent reviews. | Positive authorized feature-target case; negative protected-target and stale-approval cases. |
| AP03 | Advance ready tasks and complete existing final audit, test-gap reconciliation, final review and full validation without routine progress pauses. | Stop at final merge-back ready, give the human the normal final summary, and wait for protected-target merge acceptance. Single-PR delivery has no intermediate task merge to authorize; never reinterpret it as permission to merge main. | Trace existing final gates and protected-target boundary. |
| AP04 | At plan review, batch foreseeable human decisions with recommendations and explicit requested authority in the response. | Resolve decisions that block planned work, or record concrete owner-approved choices/alternatives in existing plan fields. Do not invent answers or obtain blanket future design/safety authority. No exhaustive questionnaire. | A known environment or business choice is raised before its task, not after implementation has begun. |
| AP05 | Existing critical stop and recovery boundaries remain unchanged; honor human suspension or narrowing of authorization. | Autopilot removes routine task-merge pauses only. Unknown material scope/policy/safety/authority decisions, required acceptance, the 90-minute rule and destructive permissions still apply. Recoverable agent errors remain agent-correctable. | Existing gate evidence and authority-limited recovery. |
| AP06 | Keep instructions portable and concise; align policy, template, reviewer routing, README and diagram with the workflow mode contract. | Workflow owns the installed mode contract; plan records delivery facts; reviewer checks authority; policy and README link/summarize rather than duplicate details. No programmatic engine or new gate. | Focused regressions, link/lifecycle/Mermaid checks, retained semantic review; full suite at final gate. |

### Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| DR01 | AP01 | accepted | Ask explicitly at the existing plan gate in the parent response. |
| DR02 | AP02 | accepted | Scoped feature-branch merge authority, not main authority. |
| DR03 | AP03 | accepted | Preserve final gates and final human acceptance. |
| DR04 | AP04 | accepted | Batch predictable decisions without claiming knowledge of future unknowns. |
| DR05 | AP05 | accepted | Existing safe-stop controls remain authoritative. |
| DR06 | AP06 | accepted | Existing sources suffice; do not add coordination machinery. |

### Newly introduced validations

Existing authority, branch, review, testing and final-human gates are preserved;
Autopilot changes scoped authorization at the existing plan gate, not gate count.

| ID | Validation, owning authority, and execution boundary | Protected outcome / risk and marginal value beyond existing controls | Concrete invalid case | Failure effect / recovery | Cost / risk reduction | Existing/reusable or cheaper mechanism, its coverage, and why insufficient | Fail-close / test reference | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| None | None | None | None | None | None | None | None | None |

### Newly introduced fail-closed behaviors

No new failure behavior: absent authority and critical mismatches retain their
existing consequences; there is no new global stop or rejection mechanism.

| ID | Trigger | Required fail-closed response | Concrete example | Impact | Recovery / best next action | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- |
| None | None | None | None | None | None | None |

### Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Design key points | Explicit plan-gate opt-in; reviewed task PR auto-merge to named feature branch; continuous progress through existing final readiness; human approval before protected-target merge. | DISCLOSE |
| Predictable decisions | Collect relevant questions once with recommendations; resolve blocking choices or document concrete authorized alternatives. | DISCLOSE |
| Preserved boundaries | All existing review/testing, scope, policy, safety, time and destructive-authority controls remain; no unconditional promise of uninterrupted execution. | DISCLOSE |
| Upgrade | Candidate bd56ed3 prepared; no source-policy conflict or unrelated tracked change; accepted prior pin retained pending review/acceptance. | HUMAN_DECISION |
| Newly introduced validations / fail-close | None. | NONE |
| Decision requested | Accept AP01–AP06 and the in-place runtime upgrade, then conclude the whiteboard and prepare the implementation plan. This is not this delivery's Autopilot opt-in or merge approval. | HUMAN_DECISION |

<!-- sdd: archived-implementation-plan -->

## Implementation Plan — Autopilot mode

<!-- sdd: implementation-plan -->

### Delivery status

| Field | Value |
| --- | --- |
| State | `COMPLETE` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | Human-review-before-merge; Autopilot not enabled |
| Delivery branch / target | `codex/autopilot-mode` / `main` |
| Owner | Repository owner |
| Primary issue / need | [#148](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/148) |
| Concluded whiteboard | Complete source embedded above in this archive; accepted design `cfcd847b12fb6c18902d1d900fe3a1d835b0f1c2`; conclusion `58a531d725089f84be9c33b55897ccdc2068914d` |
| Required reviewers | Retained independent seats `autopilot_r1` and `autopilot_r2` |
| Last verified | 2026-10-04; T01 and implementation audit approved by both reviewers at a2bb5df; PR owns exact closing-candidate review and validation |

### Governing inputs and delivery boundaries

Consume the frozen whiteboard AP01–AP06, [canonical branch policy](../../../CONTRIBUTING.md#branches-review-and-merge), [quality policy](../../../docs/documentation-quality-policy.md#review-and-human-brief), and [error-handling authority](../../../docs/error-handling.md). The whiteboard owns design; this plan owns execution facts; [PR #149](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/149) owns review and authorization evidence.

Scope is the portable Autopilot authorization contract and its consumers. No scheduler, new tracker, extra gate, speculative future authority, dependency changes, or unrelated Issue #147 consolidation. Material assumptions: None.

### Delivery strategy and readiness

| Concern | This delivery |
| --- | --- |
| Integration model | One coherent implementation unit; single PR to main, allowed by canonical policy |
| Task branch / required target | `codex/autopilot-mode` / `main`; PR #149 |
| Merge authority | Human main-merge acceptance remains required; no intermediate task PR exists |
| Mode choice | At plan review ask whether to enable continuous Autopilot execution to final readiness; no authority to auto-merge this PR to main |
| Foreseeable decisions | Plan accepted; no explicit Autopilot opt-in; owner authorized complete combined archive, live whiteboard reset and live plan removal before this closing candidate |
| Readiness evidence | Worktree operation and installer validation passed; runtime pin accepted; both reviewers verified conclusion; locked dependencies provisioned |
| Parallel ownership | Reviewers read independently; parent owns edits and integration |

The implementation unit is atomic because the installed contract, template, review checks, and reader-facing diagram must agree. Creating separate task merges only to demonstrate Autopilot would add unnecessary coordination. Existing plans remain compatible and default to human review.

### Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| AP01 | T01: explicit plan-response opt-in and existing mode/authority fields | Default, silence, generic approval, explicit opt-in scenarios | Aligned |
| AP02 | T01: scoped reviewed feature-task merges | Exact candidate, checks, feature target and protected-target rejection scenarios | Aligned |
| AP03 | T01: continuous readiness with final human boundary | Multi-task and single-PR scenarios; final-gate sequence review | Aligned |
| AP04 | T01: foreseeable decision brief | Known blocking choice raised at plan gate; no blanket authority | Aligned |
| AP05 | T01: preserve stops and suspension | Authority narrowing, material new decision and existing time-boundary scenarios | Aligned |
| AP06 | T01: canonical workflow contract and aligned consumers | Focused source checks, links/diagram review, full final validation | Aligned |

### Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | `DONE` | `None` | Autopilot is explicit, portable, authority-bounded and consistent across its consumers | AP01–AP06 only; preserve default and existing gates | Focused tests and semantic scenario review passed; PR owns exact closing-head validation | `codex/autopilot-mode`; #149; `main` |

### Task specifications and context receipts

#### T01 — Portable mode and consistent consumers

| Concern | Value |
| --- | --- |
| Source boundary | Workflow skill owns contract; plan template records choices; review skill checks authority; CONTRIBUTING and quality policy route to canonical owner; README introduces mode and updates relevant diagram; document-model tests cover changed contract |
| Consumed dependencies | Approved AP01–AP06; installed bd56ed39 runtime; existing fields, reviewer sessions, branch policy and final gates |
| Critical obligations | No implicit opt-in, main auto-merge, weakened checks or whiteboard edits; do not duplicate algorithm across sources |
| Context receipt | Canonical sources read; exact conclusion approved by both seats; no unresolved source conflict |
| Actual result | Portable mode contract and consumers implemented; 21/21 focused and 63/63 full tests passed at a2bb5df; both reviewers approved scope/reuse and semantic scenarios; closing-head evidence remains in PR |

### Test and acceptance contracts

| Owning task | Contract, changed outcome, or risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| T01 | AP01–AP02 authorization | Canonical-link/plan-field regression and independent explicit opt-in, default, wrong-target and stale-head scenarios | Implemented / both seats approved | Focused task work |
| T01 | AP03–AP05 progression and preserved stops | Retained semantic review of dependent-task, single-PR, revoked authority and unexpected decision scenarios | Both seats approved | Focused task review |
| T01 | AP06 consistency | Changed-document structure, lifecycle, links and relevant Mermaid checks | Existing tooling | Focused task work |
| T01 | Entire final candidate | Coverage reconciled after implementation audit; no missing tests found; docs:all required on closing reviewed head | Complete coverage inventory; PR owns runs | Final gate |

No new programmatic workflow engine or exact-prose assertion quota. PR holds actual runs. The installed runtime stays pinned to the accepted released revision until a separately accepted source revision is available.

### Plan validation and completion

#### Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | AP01–AP06 mapping, concise canonical contract and consistent consumers | Delivered without deviation |
| Implementation audit | Author and both seats verify exact implementation against frozen design and suitable reuse before final-test work | Approved a2bb5df; implementation content unchanged in closure |
| Applicable validation | Focused checks, coverage-gap reconciliation, exact final review then docs:all | Full gate passed at a2bb5df; exact closing-head gates remain PR facts |
| Merge-ready canonical state | Task DONE and plan COMPLETE in combined archive; live plan removed and whiteboard reset only with prior named human authorization | Included in this authorized closing candidate |
| Delivery evidence | Both reviewers and human main-merge approval, exact target verification | GitHub owns current state |

#### Planned versus actual outcome

| Design / task | Planned result | Actual evidence or deviation | Remaining obligation / owner |
| --- | --- | --- | --- |
| AP01–AP06 / T01 | Bounded Autopilot guidance | Implemented and independently reviewed; no design deviation | Closing-head review/validation, human main-merge acceptance and target verification in PR |

#### Cleanup inventory

| Item | Keep, archive, remove, or reset | Ownership and evidence | Result |
| --- | --- | --- | --- |
| Concluded whiteboard and final plan | Combined archive linked to #148 and closing PR #149 | Complete sources; owner authorized named transition before construction | Included in closing candidate |
| Live whiteboard / live plan | Reset / remove in closing candidate | Authorized complete archive exists first | Included in closing candidate |
| Manifest and reusable guidance | Keep | Stable project authorities | Preserved |
| Delivery-owned worktree for `codex/autopilot-mode` and that branch | Remove owned worktree and retire merged branch after target verification | Resolve exact registered path from Git before removal; do not touch other worktrees, changes or branches | Pending |

### Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Task and design consistency | One T01 covers all six AP points; no added scope | DISCLOSE |
| Mode | Human-review-before-merge retained; this single PR never auto-merges main | DISCLOSE |
| Foreseeable cleanup | Owner authorized complete combined archive, live whiteboard reset and live plan removal; local owned cleanup remains after verified merge | DISCLOSE |
| Validation | T01 review/audit and full validation passed at a2bb5df; PR owns subsequent exact closing-head evidence and final human merge decision | DISCLOSE |
| Other decisions / assumptions | None currently known; unforeseen material decisions retain existing stops | NONE |
