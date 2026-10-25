# Implementation Plan — Design and Implementation Planning

<!-- sdd: implementation-plan -->

This plan owns this delivery's tasks and state. The
[concluded whiteboard](solution-whiteboard.md) owns solution decisions;
[PR #188](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/188)
owns reviews, validation results, acceptance and merge evidence.

## Delivery status

| Field | Value |
| --- | --- |
| State | `IMPLEMENTING` |
| Active tasks | `T01` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | `human-review-before-merge` |
| Authorized scope / feature branch / protected target | Accepted task scope T01–T03; feature `codex/design-planning`; protected target `main`; Autopilot `None` |
| Delivery branch / target | `codex/design-planning` / `main` |
| Owner | Repository owner |
| Primary issue / need | [#187](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/187) |
| Concluded whiteboard | [Frozen file at 25cc9c6](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/blob/25cc9c6ab2402de2970807cd616d3b4d667d8b01/.github/spec-driven-delivery/solution-whiteboard.md); accepted semantic revision `4406e417cf7b96ed977a33ff04d4f1ed539c4335` |
| Required reviewers | Same two retained independent feature reviewer sessions |
| Last verified | 2026-10-25 Asia/Shanghai; owner-authorized D01 placement amendment is in review; prior T01 source awaits the amended design's acceptance; task worktree runtime CURRENT |

## Governing inputs and delivery boundaries

| Source | Authority / use |
| --- | --- |
| [Manifest](project-adoption-manifest.md) and its canonical links | Accepted installed pin `c2f83cb8868477a11415a83ea991459546a9f4c3`, project policies and ownership |
| [Concluded whiteboard](solution-whiteboard.md), D01–D09 | Accepted outcomes, architecture/document ownership, precise text and diagrams, scope and tradeoffs |
| [Contributing](../../CONTRIBUTING.md) | Branch policy, reviews, merge authority and source validation |
| [Quality policy](../../docs/documentation-quality-policy.md) and [template governance](../../docs/template-governance.md) | Quality, human briefs and reusable document responsibilities |
| Verified `.sdd-runtime/agent-guide.md` and its installed workflow skill | Lifecycle, task readiness, review, final-test and cleanup contracts |
| Whiteboard research basis | Already-read primary guidance and its recorded applicability; research is reusable while current and applicable |

| Concern | Accepted boundary |
| --- | --- |
| Required outcome | Brief mandatory skill-wide KB application boundaries, one task-planning KB, and aligned design/engineering templates and consumers implementing D01–D09 |
| Scope | Source KB, affected skill routes, whiteboard and plan templates, affected README/index/diagram descriptions, and meaningful source regression/packaging checks |
| Non-scope | New gates, trackers, document quotas, runtime rejection mechanisms, broad checker rewrites, historical archive rewrites, unrelated #147/#142 work, and installing source tests into adopting projects |
| Assumptions | None requiring owner resolution; topic availability is checked against the accepted pin, not assumed |
| Compatibility | Preserve branch enforcement, frozen-design/amendment authority, reviewer continuity, human gates, focused/final validation timing, the 90-minute task boundary and proportional template completeness |

Existing architecture and contracts are consumed from D01–D09, not redefined
here. Engineering choices may vary within those accepted boundaries. Do not
edit this delivery's frozen whiteboard to demonstrate a template change.

## Delivery strategy and readiness

| Concern | This delivery |
| --- | --- |
| Integration model | Feature integration branch `codex/design-planning`; only final PR #188 targets `main` |
| Baseline | Feature branch created from `c2f83cb8868477a11415a83ea991459546a9f4c3`; accepted preparation/conclusion ends at `25cc9c6` |
| Dependency rationale | T01 establishes skill-wide KB application boundaries; T02 consumes them for the planning method and routes; T03 applies that method and ownership model to template consumers |
| Parallel ownership | No concurrent overlapping implementation tasks; independent research, review and checks may run concurrently under the existing concurrency KB |
| Merge authority | Human review before each task merge by default; Autopilot requires explicit opt-in naming this feature branch and task scope |
| Readiness | Approved plan, consumed prerequisite results and sufficient current context; task-produced KB, templates and test outputs are not prerequisites for starting their producing task |

> [!IMPORTANT]
> Every task PR MUST target `codex/design-planning`. Only the final feature PR
> may target `main`. This plan grants no exception to the canonical branch
> policy. A branch/target mismatch MUST block task readiness, review and merge.

Required environment support is the repository's Node.js dependencies,
installer and managed runtime; no external service or project secret is needed
for this documentation/tooling delivery. The installed workflow and canonical
error-handling authority own environment readiness and recovery.

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| D01 | T01: brief dual-boundary requirements in each skill's existing global IMPORTANT; Solution Research returns to its own topic scope | All topic routes and version conditions retained; no cross-KB application section or extra policy document | Authorized amendment candidate |
| D02 | T03: whiteboard owns solution architecture/behavior; plan consumes it | Before/after ownership review plus representative design/plan inspection | Aligned |
| D03 | T03: precise architectural text with relevant matching diagrams, displayed in the whiteboard human-review response | Template prompts, response requirements and applicable diagram parsing/semantic review; genuine N/A remains possible | Aligned |
| D04 | T03: plan owns engineering obligations and removes duplicate architecture authority | Necessary information is preserved or linked; plan cannot authorize new feature behavior | Aligned |
| D05 | T02: task-planning KB, index and required author/reviewer routes | New topic content, route and complete-tree installation regression | Aligned |
| D06 | T03: existing task fields express complete outcomes, actual dependencies and acceptance evidence | Representative decomposition and dependency/readiness regressions | Aligned |
| D07 | T03: existing mapping and implementation brief compare code-grounded views to accepted design | All relevant text/diagram semantics trace through existing mapping and gate, without a new tracker | Aligned |
| D08 | T03: remove generic duplicate plan workflow; retain required controls | Compare preserved controls with canonical owners and affected regressions | Aligned |
| D09 | T01–T03: keep each changed consumer/index/test consistent; T03 reconciles final README/diagram model | Focused checks per task, existing distribution checks and final source gate | Aligned |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | `VERIFYING` | `None` | Each independently loaded skill requires relevant KB application within approved project boundaries | Brief global IMPORTANT boundaries; Solution Research stays within research scope; no new policy document | Focused changed-content checks and affected application/routing regressions after amendment acceptance | `codex/design-planning-t01`; [PR #189](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/189); target `codex/design-planning` |
| T02 | `PLANNED` | `T01` | One evidence-based planning KB and its consumers support coherent dependency-driven task decomposition in adopting projects | New `task-planning-and-decomposition.md`, index and planning/replanning/review routes; reuse existing installer | Focused topic/routing checks; meaningful complete-tree distribution coverage | `codex/design-planning-t02`; PR `None`; target `codex/design-planning` |
| T03 | `PLANNED` | `T01, T02` | Whiteboard, plan and review consumers consistently separate architecture from engineering delivery and expose comparable design/code evidence | Existing templates, affected routes and README/diagrams; retain necessary fields, controls and coverage inventory without new process artifacts | Focused template/model/diagram checks and bounded representative semantic review | `codex/design-planning-t03`; PR `None`; target `codex/design-planning` |

## Task specifications and context receipts

### T01 — Common KB application contract

After the authorized D01 amendment is accepted, put the brief KB application
boundary in the workflow, review and triage skills' existing global IMPORTANT
blocks. Retain topic triggers and version-aware reading; require solutions to
satisfy both KB principles and approved project scope, requirements, contracts
and policies. Remove the misplaced cross-KB application section and ownership
claims from Solution Research and the KB index. Reuse canonical conflict
authority; add no common document, detailed duplicate policy or new gate.
Source ownership remains the same skills, research topic, index and directly
affected model regression. No template architecture changes belong in T01.

Actual result before amendment: the prior candidate put the common contract in
Solution Research and passed its focused checks. That placement is superseded
by the owner's correction; the source and regression still require the scoped
follow-up after design acceptance. Prior approval is not current merge evidence.

### T02 — Task-planning method and distribution

Consume T01's skill-wide application boundaries. Distill the whiteboard's already-read
primary sources into the new KB: coherent complete outcomes, appropriate size,
actual acyclic dependencies, readiness inputs, safe useful parallelism and
acceptance evidence. Record applicability limits instead of copying vendor
quotas or branching policies. Add mandatory direct-read/application routes for
planning/replanning and plan assessment. Update the index and meaningful
installation/route coverage; the existing installer distributes the complete
tree. No new installer engine, mandatory worksheet or fixed task quota.

### T03 — Design/plan ownership and traceability

Consume T01 and T02. Rehome or link necessary architecture information in the
whiteboard template; use precise text and appropriate matching views. Make the
plan template consume accepted contracts rather than own a second proposed
design. Refine existing task fields and mapping, remove duplicate generic
execution prose and retain applicable detail and the single coverage inventory.
The whiteboard human-review response MUST display the relevant design diagrams
with concise, unambiguous explanatory text; file links alone are insufficient.
Reuse the whiteboard's accurate views without adding a diagram-count quota.
At the existing human implementation brief, compare actual code-level views
with accepted design semantics. Reconcile affected README/diagram descriptions
and regressions. Do not rewrite historical archives or this frozen design.

## Test and acceptance contracts

The table is a coverage/work inventory, not a test-run log. The installed
workflow owns focused/final timing, author/reviewer implementation audit and
human acceptance before final-test work. PRs own actual run evidence. Recorded
missing non-focused test work may be completed at the final gate; it is not a
prerequisite for starting or completing its producing implementation task.

| Owning task | Contract, changed outcome, or risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| T01 | Skill-wide KB/project boundaries and all existing required-read routes | Update the prior shared-owner case to inspect each global skill block, retained version conditions, topic routes and research-only ownership | Correction required after amended design acceptance; prior assertions target the superseded placement | Focused task work; unchanged installer/full source suite deferred to final gate |
| T02 | Coherent task method with applicability limits and mandatory consumers | New topic and workflow/reviewer route checks in `tests/document-model.test.mjs` | New meaningful cases planned | Focused task work |
| T02 | Adopters receive new topic and valid installed routes | Extend existing complete-tree KB case in `tests/installer.test.mjs` only where needed | Existing distribution mechanism; assess new-topic assertion need against current coverage | Focused applicable case when changed; complete suite at final gate |
| T03 | Required template information retained under correct owner; design diagrams visible in the whiteboard human-review response | Update affected document-model cases; inspect a representative design response and dependency-driven plan against text/diagrams | Existing cases to reconcile, representative semantic evidence planned | Focused task work |
| T03 | Readiness does not require future outputs; mapping and controls remain valid | Relevant existing cases in `tests/sdd-three-doc.test.mjs`, plus changed model assertions as needed | Existing lifecycle cases; add only genuine uncovered risk coverage | Focused affected cases; unchanged suite at final gate |
| T01–T03 | Changed Markdown, references, diagrams and whitespace | `npm run docs:focused -- TASK_BASE HEAD` and relevant structural/skill checks | Existing tools | Focused task work |
| T01–T03 | Complete source compatibility and installed-tree agreement | `npm run docs:all`, plus required shell/skill validation on the final candidate | Existing full source gate; reconcile any coverage gaps after implementation acceptance | Final gate |

Tests must be grounded in accepted outcomes and real contract risks, not lock
exact prose or invent cases to force new handling. Inspect current assertions
before adding duplicate coverage. Structural checks cannot prove future agent
judgment; semantic author/reviewer assessment remains necessary.

## Plan validation and completion

| Outcome | Required evidence / owner |
| --- | --- |
| D01–D09 delivered without new scope | Mapping above, task results and PR evidence |
| Each merge unit consistent | Affected source KB, skills, templates, index/README and tests reconciled in that unit |
| Final implementation conforms | Existing author/two-reviewer audit and human implementation brief comparing approved text/diagrams with actual views |
| Final source validation complete | Existing final gate; focused evidence does not substitute for full source tests |
| Canonical state ready on merge | Task completion updates travel with their implementing PR; GitHub retains live review/merge facts |
| Delivery cleanup | Existing combined-archive contract and verified owned cleanup; frozen-whiteboard reset requires its later explicit named human authorization |

Detailed recovery and decision discussion belongs in PR #188. Update this plan
only for actual task/state changes or a material engineering-plan adjustment;
design amendments require the existing prior human authority.

## Human review brief

The parent response presents the design-to-task mapping and tasks, review
findings/dispositions, assumptions, relevant risks and validation status. Ask
for plan acceptance and the explicit Autopilot choice under the installed
workflow contract. Default remains human review before merge; no plan approval
alone enables Autopilot. Final human implementation acceptance and final `main`
merge acceptance remain separate.
