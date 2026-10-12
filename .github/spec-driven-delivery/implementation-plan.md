# Implementation Plan — Project-aware engineering Knowledge Base

<!-- sdd: implementation-plan -->

This plan owns active-delivery state. GitHub owns checks, review, acceptance,
and merge evidence; the frozen whiteboard owns design.

## Delivery status

| Field | Value |
| --- | --- |
| State | `IMPLEMENTING` |
| Active tasks | `None` |
| Next ready task | `T06` |
| Active blocker | `None` |
| Implementation mode | `human-review-before-merge`; Autopilot explicitly off |
| Authorized scope / feature branch / protected target | D01–D06 / `codex/knowledge-base` / `main`; no automatic merge authority |
| Delivery branch / target | `codex/knowledge-base` / `main` |
| Owner | Repository owner |
| Primary issue / need | [Issue #156](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/156) |
| Concluded whiteboard | [Frozen amended design](solution-whiteboard.md); reviewed amendment `0683283fb93f3cf4a9e39bd77c39ec09b64e0807`; conclusion commit `8766337fc079f306e55bbba3c139333bc07a1742` |
| Required reviewers | Retained independent `kb_review_r1` and `kb_review_r2` through final merge |
| Last verified | 2026-10-13 Asia/Shanghai; T01–T04 merged into the feature branch; T05 topic, immediate routing and installed regression complete; review and merge evidence remain in task PRs |

## Governing inputs and delivery boundaries

| Source | Authority / use |
| --- | --- |
| [Contributing](../../CONTRIBUTING.md) | Branches, focused/full validation, review, human merge authority and cleanup |
| [Manifest](project-adoption-manifest.md) | Accepted runtime pin and project authorities; no feature state |
| [Whiteboard](solution-whiteboard.md) | D01–D06, approved V01 and FC01–FC02, document set and per-task owner pauses |
| [Quality policy](../../docs/documentation-quality-policy.md) | Proportional effort, design freeze, human brief, final audit and 90-minute boundary |
| [Error handling](../../docs/error-handling.md) | Recovery and escalation; no separate recovery framework |

Deliver a shared, revision-matched KB that authors and reviewers apply inside
project boundaries. Scope is the frozen topic set, installer/manifest support,
skill triggers, affected guidance and checks. No new framework, policy suite,
code-style linter, copied manual, speculative topic, or project Experience
migration. Material assumptions: None. Amendment accepted; no unresolved design decisions.

The accepted installed pin remains `775f1479e8a1ce6277af7448d509cabe95374ad3`.
Preparing a newer runtime candidate is not acceptance or activation. Installer
tests use isolated fixtures; publishing this feature does not claim that every
existing project, including this repository, has accepted its new pin.

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| D01 | T01 packaging and manifest index; T02–T13 official documents; T14 complete package | Actual installed tree, tracked persistence and revision agreement | Aligned |
| D02 | T02 usage/index; T03–T13 immediate topic triggers; T14 routing reconciliation | Source and installed author/reviewer/triage resolution | Aligned |
| D03 | T02–T13 project-aware principles and examples | Semantic review of minimal sufficient application and authority conflicts | Aligned |
| D04 | T02–T13 distilled content and primary references | Claims, references, clarity and proportionality reviewed per document | Aligned |
| D05 | T01 synchronization mechanism; T14 complete upgrade/rollback coverage | Legacy pins, additions/updates/removals, integrity and local preservation | Aligned |
| D06 | T01–T14 explicit task targets and human stops | No next task before current task acceptance; no Autopilot | Aligned |

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
| T06 | READY | T05 | `error-handling-and-diagnosability.md` | D02–D04; simple invariant-preserving failures and useful diagnosis | Focused topic/trigger checks and wording review | `codex/knowledge-base-t06`; PR not opened; target `codex/knowledge-base` |
| T07 | PLANNED | T06 | `testing-and-reproduction.md` | D02–D04; risk-driven proof and smallest useful reproducer | Focused topic/trigger checks and wording review | `codex/knowledge-base-t07`; PR not opened; target `codex/knowledge-base` |
| T08 | PLANNED | T07 | `security-basics.md` | D02–D04; proportionate protection of real trust boundaries | Focused topic/trigger checks and wording review | `codex/knowledge-base-t08`; PR not opened; target `codex/knowledge-base` |
| T09 | PLANNED | T08 | `proportional-review.md` | D02–D04; material findings and reasonable author disposition, not perfection | Focused topic/trigger checks and wording review | `codex/knowledge-base-t09`; PR not opened; target `codex/knowledge-base` |
| T10 | PLANNED | T09 | `efficiency-and-concurrency.md` | D02–D04; independent safe work and coordination cost; evolving methods labeled | Focused topic/trigger checks and wording review | `codex/knowledge-base-t10`; PR not opened; target `codex/knowledge-base` |
| T11 | PLANNED | T10 | `experience-and-learning.md` | D02–D04; actionable reuse/refinement; retain project-specific lessons | Focused topic/trigger checks and wording review | `codex/knowledge-base-t11`; PR not opened; target `codex/knowledge-base` |
| T12 | PLANNED | T11 | `code-simplicity-and-clarity.md` | D02–D04; professional clarity examples, no line-count or style mandate; preserve behavior | Focused topic/trigger checks and wording review | `codex/knowledge-base-t12`; PR not opened; target `codex/knowledge-base` |
| T13 | PLANNED | T12 | `performance-and-observability.md` | D02–D04; measurable feedback, proportional performance evidence; fault diagnosis stays with T06 | Focused topic/trigger checks and wording review | `codex/knowledge-base-t13`; PR not opened; target `codex/knowledge-base` |
| T14 | PLANNED | T13 | Complete integration and guidance reconciliation | D01–D06; no second detailed owner or new topic/controller | Focused package, routing and consistency checks | `codex/knowledge-base-t14`; PR not opened; target `codex/knowledge-base` |

## Task specifications and context receipts

| Task unit | Owned source boundary | Required outcome / evidence | Context receipt / actual result |
| --- | --- | --- | --- |
| T01 | Existing `install-sdd.sh`, manifest template and necessary adoption/upgrade/runtime guidance plus affected tests | Reuse managed-content provenance/ownership/rollback; synchronize official KB only for pins that ship it. Exercise an isolated KB fixture and legacy fixture without creating future official topics | Sources and accepted runtime verified. Implemented complete-tree installation, immutable ownership baseline, safe synchronization, inventory/content validation and failure restoration; no official KB topic created |
| T02 | `knowledge-base/README.md`, immediately affected installer/index checks | Explain topic use, project authority and original-reference escalation. Future filenames are not broken links. Install real first document | Actual README installs byte-for-byte at the fixture's accepted immutable pin, validates, and can be Git-tracked. No future topic or trigger authored; live project pin unchanged |
| T03 | Simplicity topic, its index link, author/reviewer skill triggers and affected installer tests | Distill verified simplicity/reuse principles and useful examples; both installed readers can resolve the real topic without a README hop | Primary references verified; real installed author/reviewer routing covered. Existing hard scope, error-handling and review contracts preserved; live pin unchanged |
| T04 | Architecture/scope topic, its index link, author/reviewer triggers and installed routing regression | Distill responsibility/contract and evidence-bounded assumptions guidance with clear examples; retain existing hard scope and disclosure contracts | Accepted predecessor and manifest runtime verified in owned T04 worktree; Microsoft, AWS and Google primary sources verified; real installed topic and both reader routes covered; no later topic authored |
| T05 | Contracts topic, index link, author/reviewer triggers and installed routing check | Distill explicit contracts, supported consumer compatibility and proportionate transition evidence; verify professional source examples | T04 accepted and merged to feature; Google AIP-180 and Microsoft API-design references verified. Actual installed topic/routing covered; live pin unchanged |
| T06–T13 | Only the named topic, its index entry, relevant portable skill trigger, migrated detailed source guidance and affected tests | Read and verify primary references while authoring. Distill principles, application boundaries and concise useful examples. Require direct topic reading on relevant trigger; preserve concise skill principles and critical boundaries. Remove only migrated duplication, not independent policy or project lessons | Task-specific sources/references pending until that task; not implemented |
| T14 | Installer integration tests, manifest/adoption/upgrade routing, affected skills and root README/diagrams | Reconcile the complete official tree and remaining duplicate owners. Prove installed links, preservation, safe managed removals and compatibility; update actual capabilities without claiming unaccepted runtime activation | All accepted topic outputs required; not implemented |

Every task has its own owner stop. Shared specifications avoid twelve copies of
the same review contract; the ledger supplies each exact outcome and branch.
No task may complete a later topic early.

## Test and acceptance inventory

This is coverage intent, not a run log. Actual results belong to the task PR.
Update coverage and named missing non-focused tests as implementation exposes
them; recording a final-gate gap does not claim that test exists or passed.

| Owning task | Contract, changed outcome, or risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| T01 | D01, D05; V01 and FC01 | `tests/installer.test.mjs`, knowledge base cases: complete tree, old pin without KB, missing/mixed official content and changed candidate checkout | Implemented | Changed-line focused cases in T01; run evidence in task PR |
| T01 | D05; V01 and FC02 | Knowledge base cases: local edits/unowned collisions/linked parents preserved; safe official additions/updates/removals; directory replacement failures restore accepted tree | Implemented | Changed-line focused cases in T01; run evidence in task PR |
| T02–T13 | D02–D04 | Changed-document Markdown, links and examples; installed trigger resolves existing topic; primary-reference and project-application semantic review | Planned per-topic evidence | Focused checks and both reviewers before each owner stop |
| T14 | D01–D06 | `tests/installer.test.mjs` and affected `tests/document-model.test.mjs`: complete real tree, adoption/upgrade routing, rollback/preservation and legacy compatibility | Planned integration coverage; exact cases finalized against implementation | Focused changed-line cases in T14; record missing non-focused cases for final gate |
| T14 | D01, D02, D05 | Extend fixture-only T01 proof to the actual twelve-document KB and real installed author/reviewer/triage references | Missing until official content exists; T14 owns the gap | Implement affected checks in T14 or record required remaining additions for final audit/coverage reconciliation; run full source gate only at final readiness |
| T14 | D02, D04 | Root README/diagrams, remaining canonical links, no duplicated detailed owner or unavailable installed reference | Planned consistency proof | Focused integration review |
| Final gate | All accepted outcomes and material risks | Audit implementation against frozen design/reuse, reconcile missing tests, final exact-candidate review, then `npm run docs:all` | Not run; test gaps not yet known | Existing final-readiness boundary, not each document task |

Follow the canonical final gate: any necessary target sync and affected checks
precede the author/two-reviewer implementation audit. Only after audit approval
add required missing tests, perform affected focused checks and final candidate
review, then full applicable validation before human `main` merge acceptance.
Implementation changes invalidate the affected audit/review evidence. This
repository's source suite does not become an adopting project's obligation.

## Recovery, decisions, and change control

No active blocker or new recovery framework. Use the linked error-handling
authority and approved FC01–FC02. The accepted amended conclusion is byte-frozen; new scope
or a design amendment needs prior human authorization. Ordinary recoverable
agent mistakes stay within existing authority. Track real gaps in GitHub.

## Plan validation and completion

### Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | D01–D06 mapping, twelve accepted documents and complete managed installation | Pending |
| Applicable validation passed | Focused evidence per task; final audit, coverage reconciliation and exact-head full source gate | Pending |
| Compatibility and preservation | Old pins remain valid; correct new package and owned synchronization; project content preserved | Pending |
| Merge-ready canonical state | Root README/diagrams, routing and tracked delivery state agree with actual candidate | Pending |
| PR-owned acceptance and merge | Each task review/owner acceptance; final human approval and exact target verification | [Feature PR #157](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/157); pending |
| Feature cleanup | Complete linked whiteboard-and-plan archive and specifically authorized reset/removals | Pending; reset not authorized by design or plan approval |

### Planned versus actual outcome

| Design / task | Planned result | Actual evidence or deviation | Remaining obligation / owner |
| --- | --- | --- | --- |
| D01, D05 / T01 | Installer/manifest support without new legacy obligations | Implemented and covered by focused KB tests; no scope deviation | Task review/owner merge acceptance in PR; actual topic integration remains T14 |
| D02–D04 / T02 | Human index and project-aware application boundary | Actual README and focused installation regression complete; future topics explicitly unavailable | Per-document wording and feature-merge acceptance / owner |
| D02–D04 / T03 | Project-aware simplicity/reuse topic and direct installed routing | Design-only topic renamed; verified reference-backed examples and conditional shared-capability/gradual-replacement guidance added; index and two skill triggers reconciled; no later topic authored | Per-document wording and feature-merge acceptance / owner |
| D02–D04 / T04 | Project-aware responsibilities, scope and assumptions guidance | Topic, index and both immediate routes delivered; focused installed-content/routing coverage extended; no scope deviation | Per-document wording and feature-merge acceptance / owner |
| D02–D04 / T05 | Project-aware contract and compatibility topic with direct installed routing | Supported consumer domain, behavior/default compatibility and source-native examples delivered; existing authority retained | Per-document wording and feature-merge acceptance / owner |
| D01–D06 / T06–T14 | Complete installed, project-aware KB with separate document acceptance | Not implemented | Remaining topics, integration and final readiness / author, retained reviewers and owner |

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
| Tasks | Fourteen tasks: installer support, twelve separate documents, final integration | HUMAN_DECISION: accept this plan |
| Design consistency | Every D01–D06 maps to tasks; two owner-requested topics added; no new validation or fail-closed behavior | DISCLOSE |
| Execution mode | Autopilot off; stop after every task for owner review and merge decision | Existing owner decision retained |
| Validation | Planning focused/structure/lifecycle results remain in PR; implementation and full suite not run | DISCLOSE |
| Foreseeable decisions | Per-document wording acceptance; any real authority conflict; eventual explicit reset and final merge acceptance | HUMAN_DECISION at applicable boundary, not blanket permission |
