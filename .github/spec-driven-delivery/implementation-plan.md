# Implementation Plan — Shared Observability and Diagnosability

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority. GitHub PRs own live review,
merge and execution evidence. The owner accepted this plan in conversation. Implementation follows its
approved scope with human review before task merges; Autopilot is not enabled.

## Delivery status

| Field | Value |
| --- | --- |
| State | `IMPLEMENTING` |
| Active tasks | `T01` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | Human-review-before-merge; Autopilot not enabled |
| Authorized scope / feature branch / protected target | D01-D05; `codex/error-origin-context`; `main` |
| Delivery branch / target | `codex/error-origin-context` / `main`; final PR #216 |
| Owner | Repository owner |
| Primary issue / need | [Issue #215](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/215) |
| Concluded whiteboard | [Working whiteboard](solution-whiteboard.md), accepted design `b3e90bf2098c5476e10ff389ed25063102857789`; conclusion transition `e760248` |
| Required reviewers | The same two retained independent Issue #215 reviewer sessions |
| Last verified | 2026-10-30 Asia/Shanghai: plan accepted, T01 started on its declared task branch; task results remain pending |

## Governing inputs and delivery boundaries

| Source | Authority / use |
| --- | --- |
| [Contributing](../../CONTRIBUTING.md) and owner decisions in [PR #216](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/216) | Branches, review, merge, scope and named permissions |
| [Concluded design](solution-whiteboard.md#concluded-design) D01-D05 and responsibility diagram | Frozen behavior and content ownership; no unauthorized whiteboard changes |
| [Manifest](project-adoption-manifest.md) and verified runtime | Installed pin c27ab7e and project authorities; no activation upgrade in this delivery |
| [Error handling](../../docs/error-handling.md) and [quality policy](../../docs/documentation-quality-policy.md) | Recovery, focused/final validation, human gates and honest evidence |

| Concern | Accepted boundary |
| --- | --- |
| Outcome | One installed shared diagnostic/observability topic, narrow error/performance consumers and direct version-matched agent routes |
| Included | D01-D05 content extraction, references, titles/scopes, active links/index, three skills and existing installer tests |
| Excluded | New runtime telemetry system, SDK/platform, dependency, installer mode, project policy/gate, live model evaluations and archive rewrites |
| Assumptions | None; installed content/routes are acceptance evidence to produce, not assumed starting inputs |
| Existing implementation | Candidate 5daaa69 already contains reviewed diagnostic and triage corrections; the extraction must preserve them |

## Integration and readiness

| Concern | This delivery |
| --- | --- |
| Integration model | Feature integration branch `codex/error-origin-context`; only final PR #216 targets `main` |
| Increment boundary | T01 establishes and links the shared owner atomically; T02 consumes its real filename/content to wire installed agent routing |
| Parallel ownership | Coupled extraction/routing remains with the parent; independent retained reviews can run concurrently; no overlapping writers |
| Compatibility | Keep existing error/performance filenames, narrow titles/scopes, preserve same-revision guards and older pins without the topic |
| Merge authority | Human review before task merge by default; scoped Autopilot may authorize task merges into this feature branch only |
| Starting readiness | Accepted plan, current source/design inputs and existing documentation environment; outputs/tests produced by a task are not its starting prerequisites |

## Tasks — design-to-task mapping

| ID | State | Depends on | Consumed design | Implementation work | Outcome | Boundaries | Consumed error handling | Consumed validations | Acceptance evidence | Consumed assumptions | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T01 | IN_PROGRESS | None | D01-D03; whiteboard responsibility diagram and coverage | Add `observability-and-diagnosability.md`; move shared sections and their relevant references from the existing error/performance topics; narrow those titles/scopes; update KB index and affected active links, including the code-level performance topic | One canonical shared topic is reachable from both narrow consumers without duplicate mechanism ownership | Preserve approved diagnostic content, performance/recovery principles and existing filenames; no runtime change, platform mandate or removed export example reintroduction | D02 required/optional evidence, original cause/context, privacy and existing audit duties move intact; recovery authority remains unchanged | None; reuse existing documentation gates | Compare moved obligations against 5daaa69 and D01-D03; focused Markdown/local links; reviewer checks loss/duplication and text/diagram agreement | None | `codex/issue215-kb-extraction`; PR not yet created; target `codex/error-origin-context` |
| T02 | PLANNED | T01 | D04; D01 topic contract and installed-root boundary | Update workflow/review/triage direct topic-read triggers and narrow existing trigger descriptions; extend existing installed-content and cross-profile routing tests to cover the new same-revision topic | Authors, reviewers and triage agents discover the shipped topic directly and receive the correct installed content | Reuse complete-tree installer and revision guards; no new installer mode, extra tracker or generic rule duplication | Existing escalation for unresolved authority or missing evidence; no task-specific failure behavior | None; new assertions stay inside existing test gates | Focused installed-topic/routing tests verify actual content and availability across supported profiles and cleanup; skill validation and documentation checks | None | `codex/issue215-kb-routing`; PR not yet created; target `codex/error-origin-context` |

D05 is an existing delivered correction, not a new implementation task. Preserve
it as the explicit non-code obligation below. `Depends on` identifies the real
T01 topic consumed by T02; numbering alone grants no ordering or merge authority.

## Test and acceptance contracts

This is the coverage inventory, not a run log. Add owned missing non-focused
tests here as discovered; they may be implemented at the final gate under the
existing timing contract. Do not claim planned checks have run.

| Owning task | Contract / outcome / risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| T01 | D01-D03 content ownership and migrated safeguards | Semantic comparison of original/moved sections and references; required/optional evidence and no universal span/stack/alert mandate | Planned author and retained reviewer audit | Focused task evidence |
| T01 | Both narrow topics and active links reach the new owner | Changed-file Markdown and existing structure/link checks | Existing checks; run on task candidate | Focused task checks |
| T02 | D04 installed content matches the source revision and skill routing | `knowledge base topic routing resolves for installed author, reviewer and triage skills` in `tests/installer.test.mjs`; include new topic for all three skills | Existing case; assertion additions planned | Focused task test |
| T02 | D04 supported profiles, old revisions and cleanup preserve valid routing | `installed skill routing resolves same-revision KB topics across profiles and cleanup` in `tests/installer.test.mjs`; extend existing topic set | Existing case; assertion additions planned | Focused task test |
| T02 | Installation still synchronizes the complete official tree | Existing complete-tree installation/cleanup tests | Existing; retain without weakening assertions | Final-gate full suite; focused if packaging changes |
| Final gate | Entire source remains consistent after integration | `npm ci --ignore-scripts` and `npm run docs:all`, including full installer/source tests and Mermaid | Existing; UNRUN for this delivery | After implementation audit and explicit human implementation acceptance |

No live model run is needed for this source/packaging refactor. Existing PR
checks and task-focused validation remain applicable; no new acceptance gate.

## Recovery, decisions, and change control

| Item | Disposition / evidence |
| --- | --- |
| Route promotion | Owner replaced Fast Fix with normal whiteboard/plan delivery; preserve existing branch, candidates and reviewer sessions |
| Prior extraction edits | Unpublished drafts are saved locally outside Git; they are reference material, not accepted implementation proof |
| Conclusion schema correction | Draft table enums/headings were aligned before acceptance; actual conclusion changed only three metadata fields and both reviewers verified it |
| New material design gap | Follow existing error handling and obtain the required owner amendment; never change the frozen whiteboard without named authorization |
| Agent-correctable mistake | Correct within approved scope and repeat affected checks; no extra progress review gate |

## Plan validation and completion

### Implementation review

Fill after T01 and T02 finish, before the exact-content audit. Current planning
must not require future code-level evidence.

| Information | Implementation summary / evidence |
| --- | --- |
| Implementation / design | Pending T01-T02; D05 already exists at 16b48f2 and is preserved at current baseline |
| Code-level flows | Product business/error/data flows are N/A for the documentation-only design; actual reading/installation relationships must match the accepted whiteboard diagram |
| Review findings | Both retained reviewers approved plan 5426001 without findings; task findings and live approvals remain GitHub facts |
| Risks / limits / unknowns | Existing filename/title mismatch is an accepted compatibility trade-off; no runtime validation claim |
| Validation | Design focused/structure/lifecycle/Mermaid evidence exists in PR #216; task checks and full validation remain unrun |
| Recommendation / decision | After both tasks and the author/two-reviewer implementation audit, obtain explicit human acceptance before final-test work, including under Autopilot |

### Delivery Definition of Done and non-code obligations

| Outcome | Design / owner | Required evidence | Result / link |
| --- | --- | --- | --- |
| Shared topic and narrow consumers | D01-D03; T01 | Canonical owner, complete migrated content, index and links | Pending |
| Installed direct agent routing | D04; T02 | Actual same-revision installed content and supported-profile proof | Pending |
| Complete triage repair review boundary retained | D05; parent author | Existing triage skill at 16b48f2/5daaa69 retains diagnosis-only authority, escalation, time limits and deferred full-validation timing | Existing candidate; verify retained at final audit |
| Canonical guidance updated | Whiteboard Canonical authority updates; T01-T02 | Live KB/index/skill owners carry accepted obligations; manifest pin and project policies unchanged | Pending |
| Required validation and review | Project quality authority; parent | Honest focused/full results and retained reviewer evidence tied to exact candidates | PR #216 owns current state |
| Merge-ready closure | Parent under named cleanup authorization | Complete concluded whiteboard and final plan preserved in one linked archive; live plan removed and whiteboard reset in closing candidate | Not authorized or performed yet |
| Protected target verification and physical cleanup | Parent | Authorized final merge, verified target, ownership-safe cleanup | Pending; PR evidence |

### Cleanup inventory

| Item | Keep, archive, remove, or reset | Ownership / authorization boundary | Result |
| --- | --- | --- | --- |
| Manifest, reusable KB and installed guidance | Keep | Project authorities; no pin activation in this scope | Retained |
| Working whiteboard and final plan | Archive together, then reset whiteboard/remove live plan | Named owner permission required before closing-candidate construction; link archive and final PR both ways | Pending |
| T01/T02 task branches and owned task worktrees | Remove after verified task merges and no remaining use | Record actual created paths/ownership before removal; do not bypass app protection | Not yet created |
| Feature branch `codex/error-origin-context` and current worktree | Remove only after final merge and verified ownership/no remaining use | Current checkout may be app-protected; preserve and report a guard rather than force-delete | Pending |
| Local unpublished extraction drafts | Remove when no longer needed | Parent-created temporary files only; never commit them as delivery evidence | Retained for implementation reference |

Detailed review/check/merge history stays in PRs. Task states must reflect the
resulting repository state before each task candidate merges; the final closing
candidate reconciles all canonical state before protected-target review.

## Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks | T01 establishes shared content ownership; T02 consumes that topic to wire and prove installed agent routing | Plan acceptance |
| Design consistency | D01-D04 map to tasks; D05 maps to the retained triage obligation; no unmapped design point | Review mapping |
| Autopilot | Not enabled. Opt-in permits task merges only into `codex/error-origin-context` after exact-head reviewer approval and required focused checks, then the next dependency-ready task; stop before final-test work for human implementation acceptance and before final `main` merge | Explicit owner decision |
| Foreseeable decisions | Shared-topic name, responsibility split, filename compatibility, no platform mandate and no live evals are already fixed by accepted design; no remaining technical owner question | None |
| Validation | Planning evidence only; task and full validation remain unrun | Attention |
