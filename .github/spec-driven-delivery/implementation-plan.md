# Implementation Plan — Project-aware engineering Knowledge Base

<!-- sdd: implementation-plan -->

This plan owns active-delivery state. GitHub owns checks, review, acceptance,
and merge evidence; the frozen whiteboard owns design.

## Delivery status

| Field | Value |
| --- | --- |
| State | `IMPLEMENTING` |
| Active tasks | `None` |
| Next ready task | `T14` |
| Active blocker | `None` |
| Implementation mode | `human-review-before-merge`; Autopilot explicitly off |
| Authorized scope / feature branch / protected target | Accepted D01–D07 / `codex/knowledge-base` / `main`; no automatic merge authority |
| Delivery branch / target | `codex/knowledge-base` / `main` |
| Owner | Repository owner |
| Primary issue / need | [Issue #156](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/156) |
| Concluded whiteboard | [Accepted performance amendment](solution-whiteboard.md), reviewed content `58ad81d65aa043b17496f21a05aa637eb0aa14c4`, verified conclusion `fc115f49a5789032033e9b0746f341ab14f2af1d` |
| Required reviewers | Retained independent `kb_review_r1` and `kb_review_r2` through final merge |
| Last verified | 2026-10-15 Asia/Shanghai; T01–T12 merged. Owner accepted the performance amendment and README criteria; both retained reviewers verified conclusion. T13 candidate is implemented in PR #170; task states describe its merge result. Start T14 only after T13 owner acceptance and merge. Runtime validation is CURRENT; review and merge evidence remain in PRs |

## Governing inputs and delivery boundaries

| Source | Authority / use |
| --- | --- |
| [Contributing](../../CONTRIBUTING.md) | Branches, focused/full validation, review, human merge authority and cleanup |
| [Manifest](project-adoption-manifest.md) | Accepted runtime pin and project authorities; no feature state |
| [Whiteboard](solution-whiteboard.md) | D01–D07, approved V01 and FC01–FC02, document set and per-task owner pauses |
| [Quality policy](../../docs/documentation-quality-policy.md) | Proportional effort, design freeze, human brief, final audit and 90-minute boundary |
| [Error handling](../../docs/error-handling.md) | Recovery and escalation; no separate recovery framework |

Deliver a shared, revision-matched KB that authors and reviewers apply inside
project boundaries. Scope is the frozen topic set, installer/manifest support,
skill triggers, affected guidance and checks. No new framework, policy suite,
code-style linter, copied manual, speculative topic, or project Experience
migration. Material assumptions: None. The performance amendment is accepted
and frozen. T13 revises the existing design-level topic; T14 adds the code-level
topic and the unstarted integration task moves to T15. Each task retains its
owner wording and merge boundary.

The accepted installed pin remains `775f1479e8a1ce6277af7448d509cabe95374ad3`.
Preparing a newer runtime candidate is not acceptance or activation. Installer
tests use isolated fixtures; publishing this feature does not claim that every
existing project, including this repository, has accepted its new pin.

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| D01 | T01 packaging and manifest index; T02–T14 official documents; T15 complete package | Actual installed tree, tracked persistence and revision agreement | Aligned |
| D02 | T02 usage/index; T03–T14 immediate topic triggers; T15 routing reconciliation | Source and installed author/reviewer/triage resolution | Aligned |
| D03 | T02–T14 project-aware principles and examples | Semantic review of minimal sufficient application and authority conflicts | Aligned |
| D04 | T02–T14 distilled content and primary references | Claims, references, clarity and proportionality reviewed per document | Aligned |
| D05 | T01 synchronization mechanism; T15 complete upgrade/rollback coverage | Legacy pins, additions/updates/removals, integrity and local preservation | Aligned |
| D06 | T01–T15 explicit task targets and human stops | No next task before current task acceptance; no Autopilot | Aligned |
| D07 | T13 design-level boundaries and explicit design-stage routing; T14 code-level cost mechanisms and implementation routing; T15 final reconciliation | Distinct detailed owners, source-backed scope and real installed topic routes | Aligned |

## Delivery strategy and readiness

Feature integration model: every task PR targets `codex/knowledge-base`.
Only the [final feature PR #157](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/157)
targets `main`. Each task produces a working increment; future topics remain
plain index entries until their files exist. No task requires its own future
outputs as readiness inputs.

Execution order follows owner acceptance, not a claim that all topics are
technically dependent. Complete focused checks and exact-candidate review with
the retained pair, present the wording/outcome brief, and wait for human
acceptance and merge authority before advancing. Autopilot is off by owner
choice; no additional automatic merge or cleanup authority is implied.

Before each task, consume current accepted predecessors, the frozen design,
applicable authorities and relevant source paths; exercise the task worktree
and provision only required authorized ignored inputs. Record any material
context mismatch here, without another readiness document. Contract-equivalent
implementation choices stay with the agent.

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | DONE | None | Minimal KB installer and manifest support | D01, D05; preserve legacy pins and local content; no official topic writing | Eight focused KB scenarios; document/skill checks | `codex/knowledge-base-t01`; [PR #158](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/158); target `codex/knowledge-base` |
| T02 | DONE | T01 | `knowledge-base/README.md` human index and authority/application guide | D02–D04; not a mandatory routing hop | Focused document/link checks and wording review | `codex/knowledge-base-t02`; [PR #159](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/159); target `codex/knowledge-base` |
| T03 | DONE | T02 | `simple-design-and-reuse.md` | D02–D04; design-level reuse, sufficient increments and conditional shared-capability/migration guidance; old filename and triggers reconciled | Focused topic/trigger checks and wording review | `codex/knowledge-base-t03`; [PR #160](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/160); target `codex/knowledge-base` |
| T04 | DONE | T03 | `architecture-scope-and-assumptions.md` | D02–D04; evidence-bounded ownership and supported domain | Focused topic/trigger checks and wording review | `codex/knowledge-base-t04`; [PR #161](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/161); target `codex/knowledge-base` |
| T05 | DONE | T04 | `contracts-and-compatibility.md` | D02–D04; explicit contracts and safe compatible change | Focused topic/trigger checks and wording review | `codex/knowledge-base-t05`; [PR #162](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/162); target `codex/knowledge-base` |
| T06 | DONE | T05 | `error-handling-and-diagnosability.md` | D02–D04; simple invariant-preserving failures and useful diagnosis | Focused topic/trigger checks and wording review | `codex/knowledge-base-t06`; [PR #163](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/163); target `codex/knowledge-base` |
| T07 | DONE | T06 | `testing-and-reproduction.md` | D02–D04; risk-driven proof and smallest useful reproducer | Focused topic/trigger checks and wording review | `codex/knowledge-base-t07`; [PR #164](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/164); target `codex/knowledge-base` |
| T08 | DONE | T07 | `security-basics.md` | D02–D04; proportionate protection of real trust boundaries | Focused topic/trigger checks and wording review | `codex/knowledge-base-t08`; [PR #165](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/165); target `codex/knowledge-base` |
| T09 | DONE | T08 | `proportional-review.md` | D02–D04; material findings and reasonable author disposition, not perfection | Focused topic/trigger checks and wording review | `codex/knowledge-base-t09`; [PR #166](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/166); target `codex/knowledge-base` |
| T10 | DONE | T09 | `efficiency-and-concurrency.md` | D02–D04; independent safe work and coordination cost; evolving methods labeled | Focused topic/trigger checks and wording review | `codex/knowledge-base-t10`; [PR #167](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/167); target `codex/knowledge-base` |
| T11 | DONE | T10 | `experience-and-learning.md` | D02–D04; actionable reuse/refinement; retain project-specific lessons | Focused topic/trigger checks and wording review | `codex/knowledge-base-t11`; [PR #168](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/168); target `codex/knowledge-base` |
| T12 | DONE | T11 | `code-simplicity-and-clarity.md` | D02–D04; professional clarity examples, no line-count or style mandate; preserve behavior | Focused topic/trigger checks and wording review | `codex/knowledge-base-t12`; [PR #169](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/169); target `codex/knowledge-base` |
| T13 | DONE | T12 | Revise `performance-and-observability.md` | D02–D04, D07; design-stage measurability, interpretation and five performance boundaries; fault diagnosis stays with T06 | Focused topic/trigger checks and wording review | `codex/knowledge-base-t13`; [PR #170](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/170); target `codex/knowledge-base` |
| T14 | READY | T13 | `code-level-performance-engineering.md` | D02–D04, D07; cost mechanisms, bounded methods/examples and source routing; no exhaustive checklist | Focused topic/trigger checks and wording review | `codex/knowledge-base-t14`; PR not opened; target `codex/knowledge-base` |
| T15 | PLANNED | T14 | Complete integration and guidance reconciliation | D01–D07; no second detailed owner or new topic/controller | Focused package, routing and consistency checks | `codex/knowledge-base-t15`; PR not opened; target `codex/knowledge-base` |

## Task specifications and context receipts

| Task unit | Owned source boundary | Required outcome / evidence | Context receipt / actual result |
| --- | --- | --- | --- |
| T01 | Existing `install-sdd.sh`, manifest template and necessary adoption/upgrade/runtime guidance plus affected tests | Reuse managed-content provenance/ownership/rollback; synchronize official KB only for pins that ship it. Exercise an isolated KB fixture and legacy fixture without creating future official topics | Sources and accepted runtime verified. Implemented complete-tree installation, immutable ownership baseline, safe synchronization, inventory/content validation and failure restoration; no official KB topic created |
| T02 | `knowledge-base/README.md`, immediately affected installer/index checks | Explain topic use, project authority and original-reference escalation. Future filenames are not broken links. Install real first document | Actual README installs byte-for-byte at the fixture's accepted immutable pin, validates, and can be Git-tracked. No future topic or trigger authored; live project pin unchanged |
| T03 | Simplicity topic, its index link, author/reviewer skill triggers and affected installer tests | Distill verified simplicity/reuse principles and useful examples; both installed readers can resolve the real topic without a README hop | Primary references verified; real installed author/reviewer routing covered. Existing hard scope, error-handling and review contracts preserved; live pin unchanged |
| T04 | Architecture/scope topic, its index link, author/reviewer triggers and installed routing regression | Distill responsibility/contract and evidence-bounded assumptions guidance with clear examples; retain existing hard scope and disclosure contracts | Accepted predecessor and manifest runtime verified in owned T04 worktree; Microsoft, AWS and Google primary sources verified; real installed topic and both reader routes covered; no later topic authored |
| T05 | Contracts topic, index link, author/reviewer triggers and installed routing check | Distill explicit contracts, supported consumer compatibility and proportionate transition evidence; verify professional source examples | T04 accepted and merged to feature; Google AIP-180 and Microsoft API-design references verified. Actual installed topic/routing covered; live pin unchanged |
| T06 | Failure-handling topic, index link, author/reviewer/triage triggers and installed routing check | Distill simple invariant-preserving failures, safe retry and actionable diagnostics; retain project recovery/escalation authority | T05 accepted and merged; AWS, RFC 9457 and OpenTelemetry sources verified, including development status. Actual installed topic and three reader routes covered; live pin unchanged |
| T07 | Testing/reproduction topic, index, author/reviewer/triage triggers and installed routing check | Distill risk-driven behavioral evidence and faithful minimal reproduction; migrate detailed reproduction guidance without changing validation timing | T06 merged and accepted runtime verified; Google, Microsoft, Chromium and pytest primary references verified; installed topic and three reader routes covered; live pin unchanged |
| T08 | Security topic, index, author/reviewer triggers and installed routing check | Distill actual trust boundaries, least privilege, safe input and secret handling with professional examples; no security policy suite | T07 merged and accepted runtime verified in owned worktree; Microsoft and OWASP primary references verified; real installed topic and both reader routes covered; live pin unchanged |
| T09 | Review topic, index, author/reviewer triggers, migrated explanatory reference guidance and installed routing check | Distill material findings, proportional corrections and reasoned rejection/deferral; preserve hard review boundaries and exact-candidate authority | T08 merged; accepted runtime verified in owned worktree; Google primary reviewer/author sources and examples verified; actual installed topic and both reader routes covered; live pin unchanged |
| T10 | Efficiency topic, index, author/reviewer triggers, migrated execution detail and installed routing check | Distill safe independent execution, bounded delegation and coordination cost; label evolving multi-agent methods | T09 merged and accepted runtime verified in owned worktree; OpenAI and Anthropic primary sources verified; actual installed topic and both reader routes covered; live pin unchanged |
| T11 | Experience topic, index, author/reviewer/triage triggers and installed routing check | Distill actionable reuse, verified applicability and refinement; preserve project-specific lessons and ownership | T10 merged and accepted runtime verified in owned worktree; KCS and Google SRE primary sources verified; real installed topic and three reader routes covered; project Experience and live pin unchanged |
| T12 | Code clarity topic, index, author/reviewer triggers and installed routing check | Distill intent, names, control/data flow, useful intermediate state, proportionate abstraction, comments and behavior-preserving simplification | T11 merged and accepted runtime verified in owned worktree; Google and Fowler primary sources/examples verified; actual installed topic and both reader routes covered; frozen design and live pin unchanged |
| T13 | Performance topic, index, author/reviewer triggers and installed routing check | Consolidate D07's five boundaries into existing guidance; explicitly consider performance and measurable/interpretable feedback during solution/system design; retain proportionate fitness evidence and T06's diagnosis ownership | Accepted amendment and verified conclusion consumed; design-stage wording, five boundaries, source-backed examples and installed reader routes delivered. Relevant Google, Microsoft and OpenTelemetry sources verified; live pin unchanged |
| T14 | Code-level performance topic, index, author/reviewer triggers and installed routing check | Apply D07's five cost mechanisms and selection criteria; explain causal mechanisms, useful bounded examples, applicability and reference search directions. Link design-level principles rather than duplicate them; preserve behavior and distinguish necessary overhead from avoidable work | Accepted new task; not implemented. Verify relevant primary technical sources and examples, exercise actual installed author/reviewer routes, then stop for owner wording review |
| T15 | Installer integration tests, manifest/adoption/upgrade routing, affected skills and root README/diagrams | Reconcile the complete official tree and remaining duplicate owners. Prove installed links, preservation, safe managed removals and compatibility; update actual capabilities without claiming unaccepted runtime activation | All accepted topic outputs required; not implemented |

Every task has its own owner stop. Shared specifications avoid thirteen copies of
the same review contract; the ledger supplies each exact outcome and branch.
No task may complete a later topic early.

Owner-requested T10 correction also reconciles reference-reading wording across
completed topics and author/reviewer/triage skills: unsupported guesses cannot
resolve a knowledge gap; relevant primary references inform engineering methods,
while canonical project sources or direct evidence establish project facts.
This clarifies D02–D04 and existing error handling; it creates no new review gate.

The owner-requested D04 clarification in PR #170 makes content-selection criteria
explicit in the KB README and assesses completed topics, including code clarity.
Keep adequate topic content unchanged; do not duplicate the criteria or add
mechanical checklist sections. The accepted clarification does not complete
T13/T14 performance work; each topic retains its separate task boundary.

## Test and acceptance inventory

This is coverage intent, not a run log. Actual results belong to the task PR.
Update coverage and named missing non-focused tests as implementation exposes
them; recording a final-gate gap does not claim that test exists or passed.

| Owning task | Contract, changed outcome, or risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| T01 | D01, D05; V01 and FC01 | `tests/installer.test.mjs`, knowledge base cases: complete tree, old pin without KB, missing/mixed official content and changed candidate checkout | Implemented | Changed-line focused cases in T01; run evidence in task PR |
| T01 | D05; V01 and FC02 | Knowledge base cases: local edits/unowned collisions/linked parents preserved; safe official additions/updates/removals; directory replacement failures restore accepted tree | Implemented | Changed-line focused cases in T01; run evidence in task PR |
| T02–T14 | D02–D04 | Changed-document Markdown, links and examples; installed trigger resolves existing topic; primary-reference and project-application semantic review | Planned per-topic evidence | Focused checks and both reviewers before each owner stop |
| T13 | D02–D04, D07 | Existing actual-index and installed author/reviewer/triage routing regressions; affected workflow/reviewer contract checks; design-stage trigger and five-boundary semantic review | Existing focused tests cover the changed artifact and its installation; no additional missing T13 test identified | Focused run evidence in PR #170; complete-package lifecycle proof remains T15 and full source validation remains final-gate work |
| T15 | D01–D07 | `tests/installer.test.mjs` and affected `tests/document-model.test.mjs`: complete real tree, adoption/upgrade routing, rollback/preservation and legacy compatibility | Planned integration coverage; exact cases finalized against implementation | Focused changed-line cases in T15; record missing non-focused cases for final gate |
| T15 | D01, D02, D05 | Extend fixture-only T01 proof to complete-package upgrade/rollback with the actual thirteen-document KB and real installed author/reviewer/triage references | Per-topic install/routing covered; complete-package lifecycle integration remains T15-owned | Implement affected checks in T15 or record required remaining additions for final audit/coverage reconciliation; run full source gate only at final readiness |
| T15 | D02, D04 | Root README/diagrams, remaining canonical links, no duplicated detailed owner or unavailable installed reference | Planned consistency proof | Focused integration review |
| Final gate | All accepted outcomes and material risks | Audit implementation against frozen design/reuse, reconcile missing tests, final exact-candidate review, then `npm run docs:all` | Not run; test gaps not yet known | Existing final-readiness boundary, not each document task |

Follow the canonical final gate: any necessary target sync and affected checks
precede the author/two-reviewer implementation audit. Only after audit approval
add required missing tests, perform affected focused checks and final candidate
review, then full applicable validation before human `main` merge acceptance.
Implementation changes invalidate the affected audit/review evidence. This
repository's source suite does not become an adopting project's obligation.

## Recovery, decisions, and change control

The owner accepted the reviewed performance amendment and both retained
reviewers verified its conclusion. Preserve valid T01–T12 work and use the
linked error-handling authority and unchanged approved FC01–FC02. The whiteboard
is frozen again; further amendments need prior human authorization. Ordinary
recoverable agent mistakes stay within authority.

## Plan validation and completion

### Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | D01–D07 mapping, thirteen accepted documents and complete managed installation | Pending |
| Applicable validation passed | Focused evidence per task; final audit, coverage reconciliation and exact-head full source gate | Pending |
| Compatibility and preservation | Old pins remain valid; correct new package and owned synchronization; project content preserved | Pending |
| Merge-ready canonical state | Root README/diagrams, routing and tracked delivery state agree with actual candidate | Pending |
| PR-owned acceptance and merge | Each task review/owner acceptance; final human approval and exact target verification | [Feature PR #157](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/157); pending |
| Feature cleanup | Complete linked whiteboard-and-plan archive and specifically authorized reset/removals | Pending; reset not authorized by design or plan approval |

### Planned versus actual outcome

| Design / task | Planned result | Actual evidence or deviation | Remaining obligation / owner |
| --- | --- | --- | --- |
| D01, D05 / T01 | Installer/manifest support without new legacy obligations | Implemented and covered by focused KB tests; no scope deviation | Task review/owner merge acceptance in PR; actual topic integration remains T15 |
| D02–D04 / T02 | Human index and project-aware application boundary | Actual README and focused installation regression complete; future topics explicitly unavailable | Per-document wording and feature-merge acceptance / owner |
| D02–D04 / T03 | Project-aware simplicity/reuse topic and direct installed routing | Design-only topic renamed; verified reference-backed examples and conditional shared-capability/gradual-replacement guidance added; index and two skill triggers reconciled; no later topic authored | Per-document wording and feature-merge acceptance / owner |
| D02–D04 / T04 | Project-aware responsibilities, scope and assumptions guidance | Topic, index and both immediate routes delivered; focused installed-content/routing coverage extended; no scope deviation | Per-document wording and feature-merge acceptance / owner |
| D02–D04 / T05 | Project-aware contract and compatibility topic with direct installed routing | Supported consumer domain, behavior/default compatibility and source-native examples delivered; existing authority retained | Per-document wording and feature-merge acceptance / owner |
| D02–D04 / T06 | Project-aware failure handling and diagnosability with direct installed routing | Simple recovery, effect-aware retry and actionable failure evidence delivered with source examples; no project policy or later topic changed | Per-document wording and feature-merge acceptance / owner |
| D02–D04 / T07 | Risk-driven tests and faithful reproduction with direct installed routing | Topic, source-backed examples and three reader routes delivered; detailed reproduction guidance migrated without changing testing gates | Per-document wording and feature-merge acceptance / owner |
| D02–D04 / T08 | Proportionate security guidance and direct installed routing | Trust/access, safe input, secrets and source-backed examples delivered; no new policy, controller or validation stage | Per-document wording and feature-merge acceptance / owner |
| D02–D04 / T09 | Proportional review, finding value and author dispositions with direct installed routing | Verified principles/examples delivered; detailed reference explanation migrated to KB, existing hard review and author boundaries retained | Per-document wording and feature-merge acceptance / owner |
| D02–D04 / T10 | Safe execution concurrency and proportional delegation with direct installed routing | Independent execution, ownership and integrated evidence delivered with source examples; multi-agent practices labeled evolving; no new authority or gate | Per-document wording and feature-merge acceptance / owner |
| D02–D04 / T11 | Actionable project learning and direct installed routing | Verified reuse/refinement, source-backed examples and three reader routes delivered; project-specific Experience retained; no new recording quota or gate | Per-document wording and feature-merge acceptance / owner |
| D02–D04 / T12 | Code-level simplicity/clarity and direct installed routing | Verified professional examples, behavior-preservation limits and two reader routes delivered; no line-count/style mandate or later topic authored | Per-document wording and feature-merge acceptance / owner |
| D02–D04, D07 / T13 | Design-stage performance and observability with direct installed routing | Design-stage measurement/interpretation, five boundaries, useful-work example and author/reviewer triggers delivered; actual installed topic/routing covered. Shared README criteria retained without topic duplication | Per-document wording and feature-task merge acceptance / owner |
| D02–D04, D07 / T14 | Code-level performance guidance organized by cost mechanisms with direct installed routing | New topic accepted; not implemented | T13 acceptance, then separate document task / author and owner |
| D01–D07 / T15 | Complete installed, project-aware KB integration | Not implemented | Remaining integration and final readiness / author, retained reviewers and owner |

### Cleanup inventory

| Item | Keep, archive, remove, or reset | Ownership and evidence | Result |
| --- | --- | --- | --- |
| Manifest, project policies, Experience and official KB | Keep | Reusable authority/guidance; local content preserved | Pending implementation; existing items preserved |
| Concluded whiteboard and completed plan | Combined archive linked to issue #156 and closing PR #157 | Preserve complete sources; request explicit closing/reset authority first | Pending |
| Live plan and working whiteboard | Remove plan and reset whiteboard only in authorized closing candidate after archive exists | No reset authority implied by generic approval | Pending |
| Owned task and feature branches/worktrees | Remove only merged owned units after applicable target verification | Exclude other deliveries and user-owned data | Pending |
| Local runtime/checkouts | Installer-managed lifecycle only | Preserve accepted runtime until authorized replacement; no blanket deletion | Pending |

## Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks | Fifteen accepted tasks: installer support, thirteen separate documents, final integration; T13 revised, new T14, former integration becomes T15 | DISCLOSE |
| Design consistency | Frozen D07 maps design-level boundaries to T13 and code-level cost mechanisms to T14; T01–T12 preserved. No new validation or fail-closed behavior in this amendment | DISCLOSE |
| Execution mode | Autopilot off; stop after every task for owner review and merge decision | Existing owner decision retained |
| Validation | T13 focused checks and exact-candidate review belong in PR #170. T14/T15 implementation, final implementation audit and full validation remain outstanding | DISCLOSE |
| Foreseeable decisions | Per-document wording acceptance; any real authority conflict; eventual explicit reset and final merge acceptance | HUMAN_DECISION at applicable boundary, not blanket permission |
