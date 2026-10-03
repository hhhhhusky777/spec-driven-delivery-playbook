# Solution whiteboard — Autopilot to final merge-back readiness

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `OPEN` |
| Need / issue | [Issue #148](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/148) |
| Owner | Repository owner |
| Concluded design revision | `None` |
| Open owner decisions | `None` |

## Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| DR01 | At implementation-plan human review, ask in the response whether to enable Autopilot and explain the exact authority. | accepted |
| DR02 | With explicit opt-in, merge reviewed task PRs into the named feature integration branch and start ready dependent tasks without routine human pauses. | accepted |
| DR03 | Continue through existing final-readiness work; stop at final merge-back ready for human acceptance of the protected-target merge. | accepted |
| DR04 | Ask foreseeable human questions together at plan review, with recommendations, to minimize avoidable interruptions. | accepted |
| DR05 | Preserve all existing policy, scope, testing, review, time, safety, and destructive-action boundaries; do not promise unknown decisions can be eliminated. | accepted |
| DR06 | Reuse plan mode/merge-authority fields and PR evidence; no new state document, controller, or automation service. | accepted |

## Authority and context

| Source | Authority or relevant content | Freshness / verification |
| --- | --- | --- |
| Owner request in Issue #148 | Defines Autopilot behavior and the plan-review response. | 2026-10-04 Asia/Shanghai |
| [Contributing](../../CONTRIBUTING.md#branches-review-and-merge) | Canonical branch policy; scoped merge authority; human acceptance and cleanup. | Current main bd56ed3 |
| [Workflow skill](../../skills/sdd-project-workflow/SKILL.md) | Portable delivery rules, focused/final validation, and existing stop boundaries. | Current main bd56ed3 |
| [Error handling](../../docs/error-handling.md) | Recoverable errors remain agent work; unresolved critical decisions require human authority. | Current main bd56ed3 |
| [Quality policy](../../docs/documentation-quality-policy.md#review-and-human-brief) | Design acceptance, human summary, exact-candidate review, and final validation. | Current main bd56ed3 |

## Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem / observed need | Repeated human task-merge pauses interrupt approved multi-task work even when reviewers and applicable checks pass. |
| Required outcome | Explicit bounded opt-in enables continuous task delivery to final merge-back readiness, not automatic protected-target merge. |
| In scope | Portable workflow mode contract; existing plan fields and human brief; reviewer authority check; README and relevant diagram; repository policy alignment and regressions. |
| Out of scope / deferred | New scheduler, tracker, background service, removal of existing gates, blanket future approval, unrelated consolidation in Issue #147. |
| Compatibility | Existing plans and projects default to human review before merge; no implied opt-in or mandatory migration. |

## Facts, assumptions, and owner decisions

| Concern | Evidence / disposition |
| --- | --- |
| Existing scope for task auto-merge | Contributing already permits explicitly authorized, scoped merge alternatives. |
| Existing plan storage | Implementation mode and merge authority already have canonical fields. |
| Material assumptions | None. Missing branch names and decisions remain plan-review inputs, not assumptions. |
| Open owner decisions | None about the proposed behavior; exact design acceptance is the current human gate. Per-delivery Autopilot opt-in is requested later at that delivery's plan-review gate. |
| Runtime currentness | Installer validates UPGRADE_CURRENT; candidate bd56ed39a07b7cfae552e1345769160b8e355daa prepared before design. Old pin b3f13badb6e8b828f4185e6116939d51b5d3faeb remains authoritative until upgrade acceptance. No feature implementation started. |

## Proposed conclusion candidate

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| AP01 | At implementation-plan human review, the parent response asks whether to enable Autopilot, explains scope, and offers retain-human-review as the default. | Generic plan approval, silence, or an unresolved choice does not enable it. The approved plan owns mode, scope, named feature branch and protected target; PR owns authorization evidence. | Inspect response contract and plan fields; no new document. |
| AP02 | Once explicitly authorized, the author merges each task PR only into the named feature integration branch after both retained reviewers approve the exact candidate and focused/applicable required checks pass. | Follow canonical branch policy. Revisions invalidate affected approval/checks. Required external approvals are not replaced by agent reviews. | Positive authorized feature-target case; negative protected-target and stale-approval cases. |
| AP03 | Advance ready tasks and complete existing final audit, test-gap reconciliation, final review and full validation without routine progress pauses. | Stop at final merge-back ready, give the human the normal final summary, and wait for protected-target merge acceptance. Single-PR delivery has no intermediate task merge to authorize; never reinterpret it as permission to merge main. | Trace existing final gates and protected-target boundary. |
| AP04 | At plan review, batch foreseeable human decisions with recommendations and explicit requested authority in the response. | Resolve decisions that block planned work, or record concrete owner-approved choices/alternatives in existing plan fields. Do not invent answers or obtain blanket future design/safety authority. No exhaustive questionnaire. | A known environment or business choice is raised before its task, not after implementation has begun. |
| AP05 | Existing critical stop and recovery boundaries remain unchanged; honor human suspension or narrowing of authorization. | Autopilot removes routine task-merge pauses only. Unknown material scope/policy/safety/authority decisions, required acceptance, the 90-minute rule and destructive permissions still apply. Recoverable agent errors remain agent-correctable. | Existing gate evidence and authority-limited recovery. |
| AP06 | Keep instructions portable and concise; align policy, template, reviewer routing, README and diagram with the workflow mode contract. | Workflow owns the installed mode contract; plan records delivery facts; reviewer checks authority; policy and README link/summarize rather than duplicate details. No programmatic engine or new gate. | Focused regressions, link/lifecycle/Mermaid checks, retained semantic review; full suite at final gate. |

## Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| DR01 | AP01 | accepted | Ask explicitly at the existing plan gate in the parent response. |
| DR02 | AP02 | accepted | Scoped feature-branch merge authority, not main authority. |
| DR03 | AP03 | accepted | Preserve final gates and final human acceptance. |
| DR04 | AP04 | accepted | Batch predictable decisions without claiming knowledge of future unknowns. |
| DR05 | AP05 | accepted | Existing safe-stop controls remain authoritative. |
| DR06 | AP06 | accepted | Existing sources suffice; do not add coordination machinery. |

## Newly introduced validations

Existing authority, branch, review, testing and final-human gates are preserved;
Autopilot changes scoped authorization at the existing plan gate, not gate count.

| ID | Validation, owning authority, and execution boundary | Protected outcome / risk and marginal value beyond existing controls | Concrete invalid case | Failure effect / recovery | Cost / risk reduction | Existing/reusable or cheaper mechanism, its coverage, and why insufficient | Fail-close / test reference | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| None | None | None | None | None | None | None | None | None |

## Newly introduced fail-closed behaviors

No new failure behavior: absent authority and critical mismatches retain their
existing consequences; there is no new global stop or rejection mechanism.

| ID | Trigger | Required fail-closed response | Concrete example | Impact | Recovery / best next action | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- |
| None | None | None | None | None | None | None |

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Design key points | Explicit plan-gate opt-in; reviewed task PR auto-merge to named feature branch; continuous progress through existing final readiness; human approval before protected-target merge. | DISCLOSE |
| Predictable decisions | Collect relevant questions once with recommendations; resolve blocking choices or document concrete authorized alternatives. | DISCLOSE |
| Preserved boundaries | All existing review/testing, scope, policy, safety, time and destructive-authority controls remain; no unconditional promise of uninterrupted execution. | DISCLOSE |
| Upgrade | Candidate bd56ed3 prepared; no source-policy conflict or unrelated tracked change; accepted prior pin retained pending review/acceptance. | HUMAN_DECISION |
| Newly introduced validations / fail-close | None. | NONE |
| Decision requested | Accept AP01–AP06 and the in-place runtime upgrade, then conclude the whiteboard and prepare the implementation plan. This is not this delivery's Autopilot opt-in or merge approval. | HUMAN_DECISION |
