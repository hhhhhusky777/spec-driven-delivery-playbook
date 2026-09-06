# WB62 — implementation plan

<!-- sdd-schema: implementation-plan@4; mode: FULL -->

## Owner review brief

| Design basis | Task / work | Validation | Limit / decision |
| --- | --- | --- | --- |
| Accepted reset design C01–C06 | T02 design package: replace archive/record guidance with PR-owned evidence and the remove/reset/keep outcome | Cross-document and diagram consistency; concise gate tables; no duplicated history | Implemented in one PR #65 lifecycle task with the T03 design package |
| Exact evidence and compatibility | T03 design package: GitHub-aware evidence checks, v5 lifecycle/reset validation and v2–v4 compatibility | Positive/negative API fixtures; exact schema dispatch; full regression | Local checks must not pretend GitHub evidence exists |
| Current-project migration | T04: preserve v4 through PR #65 target proof, then use an exact-SHA reviewed reset/upgrade PR | Complete file/ref/worktree/runtime inventory; ownership; `EMPTY`; regenerated runtime `CURRENT` | Remove every non-reusable WB62 item; preserve adoption, reusable output and WB38 |
| Owner decision at this gate | Accept lifecycle task T02, which combines design packages T02/T03, plus T04; select implementation continuation mode/scope | Exact package review by retained planning seats | Recommendation: `HUMAN_REVIEW_BEFORE_MERGE` for T02 and T04 |

The original package delivered T01 through reviewed and merged PR #64. The
owner-approved PR-evidence/reset design now reopens this plan for T02–T04.
PR #65 is the semantic feature PR; a later exact-SHA reset/upgrade PR performs
the one-time current-project cutover after PR #65 target verification.

## 0. Document control

| Field | Value |
| --- | --- |
| Review batch | None |
| Delivery workflow | [Workflow](workflow.md) |
| Plan | WB62 agent judgment and essential evidence |
| Status | IMPLEMENTING |
| Previous status | VALIDATING |
| Plan mode | FULL |
| Current phase | IMPLEMENTATION |
| Current task | T02 |
| Next ready task(s) | None |
| Blockers | None |
| Owner | Repository owner |
| Reviewers | Two isolated planning reviewers, then owner |
| Review state | APPROVED |
| Self-review state | SELF_REVIEW_PASSED |
| Self-review candidate revision | d8d7fd707e1ca31f2d413c86479f51fe7864c6d8 |
| Self-review evidence | [Package evidence](../../reviews/WB62-P01.md) |
| Fresh-context review state | APPROVED |
| Fresh-context review session ID | WB62-P02 |
| Fresh-context assigned reviewers | wb62_planning_r1, wb62_planning_r2 |
| Fresh-context required approvals | 2 |
| Fresh-context approved reviewers | wb62_planning_r1, wb62_planning_r2 |
| Fresh-context reviewed revision | d8d7fd707e1ca31f2d413c86479f51fe7864c6d8 |
| Fresh-context review evidence | [Package evidence](../../reviews/WB62-P01.md) |
| Human review state | APPROVED |
| Human reviewed revision | d8d7fd707e1ca31f2d413c86479f51fe7864c6d8 |
| Human review evidence | [P02 owner acceptance](../../reviews/WB62-P01.md#p02-owner-acceptance) |
| Created | 2026-09-06 Asia/Shanghai |
| Last updated | 2026-09-07 Asia/Shanghai |
| Primary issue | [Issue 62](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/62) |
| Concluded whiteboard | [Accepted PR-evidence/reset design](../../solution-whiteboard.md), semantic candidate `a0d7f66559d7f179f333c00ceb1cd2f0ff6c2f30` |
| Approved workflow handoff | [Handoff](handoff.md), 4b18100a722aa06baba7643b67e01185108a8635 |
| Implementation continuation mode | Read live from delivery workflow; do not copy |
| Development policy | [Contributing](../../../../CONTRIBUTING.md) |
| Test strategy | [Quality policy](../../../../docs/documentation-quality-policy.md) |
| PR/branch policy | [Contributing](../../../../CONTRIBUTING.md#branches-and-pull-requests) |
| Delivery implementation task count | 3 total; T01 complete, T02 verifying, T04 planned |
| Integration model | Existing PR #65 combines design packages T02/T03 in lifecycle task T02; later exact-SHA reset/upgrade PR is T04 |
| Feature integration branch | Not applicable |
| Task PR target | main |
| Final PR target | main |
| Protected-branch synchronization | Before task start and merge; reconcile changed inputs |
| Branch / PR | T01 [PR #64](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/64) merged; lifecycle task T02, combining design packages T02/T03, uses [PR #65](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/65) from `codex/upgrade-37653ee`; T04 PR not created |
| Archived record | None; the accepted design makes GitHub PR evidence authoritative and resets non-reusable delivery state |

## 1. Governing inputs

The accepted R06 planning input remains historical for T01. T02–T04 consume the
owner-approved [PR-evidence/reset design](../../solution-whiteboard.md), exact
semantic candidate `a0d7f66559d7f179f333c00ceb1cd2f0ff6c2f30`.

Use quality-policy precedence, Template Governance and Contributing. The new
conclusion supersedes only WB62's rejected archive closure model; original
T01 approvals and PR #64 remain immutable history. The verified v4 runtime at
`37653eec1d980e3ea5ed858922ab97894395fab9` governs this amendment until T04's
separately reviewed exact-SHA v5 cutover. Issue prose alone is not a contract.

The later [owner goal and error-handling clarification](../../reviews/WB62-P01.md#owner-goal-clarification-for-t01)
adds agent discretion as an explicit fifth goal. Integrate recovery and triage
into existing error handling, not a new framework: correct agent mistakes within
authority; track genuine project/playbook gaps in their respective issue
trackers; diagnose uncertain causes; isolate affected work and involve humans
for critical mismatches or missing decisions. The accepted baseline remains
retrievable; this clarification does not approve future implementation results.

Applicable: documentation ownership, test/PR policy, evidence retention,
installer-generated instructions and safety. No application API, database,
billing, provider integration or production service exists in this change.
Existing canonical policies cover the gap; no new specialized-policy file/ADR
is needed. The audit below identifies source corrections rather than declaring
future policy output already approved.

## 2. Problem, outcomes and scope

Agents and owners encounter excessive per-edit gates and duplicated evidence.
Success means agents can choose methods inside clear boundaries, consistently
prove required outcomes, retain decision-useful evidence and use proportional
effort. Tests and representative scenarios demonstrate both safe continuation
and correct escalation; reduced line count alone is not success.

Scope: the accepted conclusion's complete consumer matrix—canonical docs,
diagrams, skills, generated guidance, templates, PR schema, v5 lifecycle schema
and dispatcher, GitHub-aware evidence checker/action, corresponding tests and
the current WB62 migration. T02–T03 update reusable playbook behavior in PR #65.
T04 later inventories and resets every non-reusable WB62 item, restores the
working whiteboard to exact `EMPTY`, updates the pin and regenerates runtime.
Exclude runtime defects #33/#34/#36, review-quorum changes, new dependencies,
blanket auto-merge, retrospective WB38 deletion and other-project activation.

Assumption: existing candidate source remains the baseline; recheck main and
current governing files before execution. If changed, reconcile affected inputs
before starting. Rollback is a reviewed coherent revert, preserving evidence.

## 3. Clarifications

| ID | Question | Resolution | State | Owner |
| --- | --- | --- | --- | --- |
| Q01 | Publish upgrade separately? | Owner requests joint delivery; local cutover verified | RESOLVED | Owner |
| Q02 | What schema and approval changes are in scope? | Add explicit v5/default lifecycle and PR-evidence validation while preserving v2–v4 behavior; review quorum and required human authority do not change | RESOLVED | Owner |
| Q03 | Runtime issues? | Deferred to issues 33/34/36; independent of source guidance | DEFERRED | Owner |
| Q04 | What does post-delivery reset include? | Every current-delivery item without reuse value is removed; machine runtime is regenerated; working whiteboard becomes `EMPTY`; adoption and reusable outputs remain | RESOLVED | Owner |

## 4. Contracts and acceptance cases

| ID | Required outcome | Failure boundary | Required evidence |
| --- | --- | --- | --- |
| FC01 | Canonical sources agree within applicable scope/version; clear precedence allows subordinate correction | Genuine conflicting authority stops affected consumption | Same-authority conflict and stale-summary scenarios |
| FC02 | Agents reuse valid authorization and choose sequencing/diagnostics within authorized unit | New scope, authority or acceptance boundary is not inferred | Unchanged approval, related correction and scope-expansion cases |
| FC03 | Existing error handling supports autonomous repair of agent mistakes, safe isolation and issue tracking for genuine project/playbook gaps | Critical mismatch, missing authority, uncertain destructive effects or exhausted bounds stop affected work | Agent-mistake recovery, isolated failure, project/upstream gap triage, uncertain cause and safety escalation cases |
| FC04 | Exact reviewed bytes remain retrievable with concise findings/resolutions | A digest without available content cannot support acceptance | Git multi-round evidence and unavailable-object case |
| FC05 | Necessary unique raw/non-Git and checker-consumed snapshots remain | No blanket deletion or unsupported Git resolver | Unique log and current snapshot-comparison cases |
| FC06 | Policies, source skills, generator, phase templates, README and example agree | A link alone cannot fix contradictory instructions | Full affected-source audit plus docs and semantic review |
| FC07 | The feature PR owns durable design, task, review, approval, check, merge and target evidence | Missing, mutated or inaccessible required PR evidence blocks reset | Versioned review/acceptance/target receipts and digest failure fixtures |
| FC08 | Every delivery-owned item is classified `REMOVE`, `RESET`, or `KEEP`; `KEEP` has an independent future-use reason | Historical interest alone cannot retain duplicate delivery evidence | Complete inventory and omitted/uncertain-item failures |
| FC09 | Destructive cleanup uses exact path/ref/worktree/runtime identities, verified ownership and explicit authority | A class, glob, unresolved path or unknown effect grants no deletion authority | File/ref/worktree/runtime identity and ownership-negative tests |
| FC10 | After verified delivery, the whiteboard is exact neutral `EMPTY` and owned machine runtime is regenerated from the reviewed pin | Failed target proof or cleanup preserves affected state and prevents closure | Reset sequencing, failed probe and regenerated-runtime `CURRENT` evidence |
| FC11 | v2–v4 behavior remains compatible; v5 is explicit and the current repository cuts over only after PR #65's exact merge SHA exists | PR #65 cannot preapprove its future upgrade/reset candidate | v2–v5 schema dispatch and current bootstrap tests |
| FC12 | README, diagrams, policies, templates, skills, examples and checks express the same v5 model | Syntax-only success cannot establish semantic consistency | Impact search, cross-document review, Markdown, links and Mermaid |

### Other system boundaries

Existing v2–v4 state transitions, task graphs, quorum, exact-head invalidation,
retries and retention deadlines remain compatible. T02 adds the approved v5
lifecycle/evidence contract, schema dispatch and GitHub-aware verification;
T04 performs the bounded installer runtime reset/regeneration and exact-pin
cutover. No product application state machine, public API, data transaction,
concurrent service, new authentication mechanism or performance budget is
introduced. Existing command, token, privacy and worktree-ownership protections
remain.

Failures follow the existing triage contract: diagnose failed checks before
fixing; preserve ambiguous external effects; escalate genuine authority gaps;
do not replace failed evidence with a weaker assertion. Logs/metrics here mean
concise actual gate results and uncertainty, not new observability tooling.
Savings are unmeasured. No throughput, production smoke or service E2E claim.

## 5. Source audit and design

| ID | Inspected source / present behavior | Planned owner correction | Consumer verification |
| --- | --- | --- | --- |
| C01 | Quality §§1, 2.3–2.4 own precedence and source reconciliation | Add mutual canonical consistency and outcome/boundary distinction there | Governance, Contributing, phase guidance |
| C02 | Source workflow Action gate says before every edit / after one edit; generator says exactly one action | Reconcile authorized unit versus acceptance boundary without waiving controls | All three skills and actual generated/installed text |
| C03 | Batch contract and ordinary routes have scoped applicability | Preserve scope/authority distinction; ordinary defaults not blanket batch grants | Workflow, plan, adoption/upgrade guidance and README diagrams |
| C04 | Review protocol preserves findings; policy retains needed evidence | Clarify retrievable Git identity versus duplicate bodies | PR and non-PR examples, retention text |
| C05 | sdd-lifecycle.mjs reads optional Reviewed snapshot but rejects required mode/phase/target progress | Keep required local comparison input; narrowly enumerate lifecycle progress while retaining scope, dependency, review-link and prose bytes | Expanded immutable-snapshot tests plus actual WB62 acceptance/readiness simulation; no schema change |
| C06 | README, governance and templates summarize execution/ownership | Reconcile all affected summaries in same T01; maintain example | Search affected terms, inbound/outbound links and diagrams |
| C07 | Current closure sources require permanent archives/local records | Replace with versioned PR-owned evidence and post-target reset in the canonical policy; consumers link rather than restate | Evidence schema fixtures and complete archive/record term impact search |
| C08 | Delivery-only state is mixed with reusable project controls | Define the remove/reset/keep outcome and complete exact inventory without prescribing one storage method | Classification, omission, future-use and preserved-adoption cases |
| C09 | Existing cleanup scope does not cover exact refs, worktrees and runtime identities | Require exact identities, ownership markers and cleanup operations before destructive action | Positive and negative ownership/path/ref/worktree/runtime cases |
| C10 | Working whiteboard and machine runtime need a reusable next-delivery state | Restore reviewed neutral `EMPTY`; clean and regenerate runtime from the current reviewed pin | Installer cleanup/install/validate and exact-whiteboard assertions |
| C11 | v4 archive semantics cannot silently become v5 reset semantics | Add explicit v5/default dispatch; preserve v2–v4; use exact-SHA reviewed bootstrap | Schema compatibility, migration and no-relational-preapproval tests |
| C12 | Stable entry points and diagrams currently describe archive closure | Reconcile README, Contributing, changelog, maps, examples and templates with canonical v5 owner | Cross-document, link, diagram and fresh-context semantic review |

This is a bounded source audit, not an assertion that every downstream project
has been inspected. The implementer repeats impact search after editing and
records actual affected/no-impact dispositions. C01–C06 map to completed T01;
C07–C12 map to FC07–FC12 and T02–T04. Existing v4 policies remain governing
while v5 source changes are prepared; future source output is never its own
starting prerequisite.

Accepted direction is a small contract in existing owners. Rejected alternatives
are removing controls, adding a framework, or imposing arbitrary volume limits.
Responsibility: policies own requirements; skills/generator implement them;
templates/examples explain local consequences. No duplicated precedence table.

Compatibility: no application durable-data change. v2–v4 schemas, archived
history and adopted pins remain supported. v5 is opt-in; this repository keeps
v4 through PR #65 target verification, then T04 uses a fresh exact-head review
and owner cutover decision. Risks are incomplete PR evidence, destructive-scope
errors, retained duplicate state and inconsistent consumers; FC07–FC12 and
independent review address them. Any new material trade-off returns to owner.

## 6. Delivery strategy and gates

WIP remains one. The whiteboard's T02 contract and T03 enforcement packages are
one lifecycle task, T02, in existing PR #65 because policy, consumers and
enforcement must merge consistently. T04 starts only after that PR merges and
its target receipt identifies the immutable SHA; it is a separately reviewed
reset/upgrade PR. Every merge unit is green and self-contained; no intentionally
failing test escapes it.

<!-- sdd-section: task-state-rules -->

Use PLANNED -> READY -> IN_PROGRESS -> VERIFYING -> DONE, with existing scoped
BLOCKED/CANCELLED handling. T01 remains immutable `DONE`; no new task is active
during this plan review.

<!-- sdd-section: definition-of-ready -->

DoR: accepted package and complete task spec, current inputs, no blocking gap,
available owned source/environment, correct branch/PR topology and scope.
Select a continuation mode explicitly covering the new tasks before T02 starts.
Future source, validation, merge, target-receipt and reset outputs are not
starting prerequisites for their own producer tasks.

<!-- sdd-section: context-receipt-gate -->

Immediately before each new task starts, perform one consolidated verification
of accepted revisions, dependency outputs, environment, branch/PR, permissions
and live mode; record actual values in that task. Unchanged accepted context
needs no extra full review. Material mismatch returns to its owning review.
Never prefill approval or a future verification timestamp.

<!-- sdd-section: definition-of-done -->

DoD: each task's assigned FC outcomes are implemented; actual focused/full
checks, impact reconciliation, exact PR review, required owner merge acceptance
and target verification are complete. T04 additionally requires complete
cleanup, neutral `EMPTY` and regenerated runtime `CURRENT`. No unrelated diff
or lost reusable output.

## 7. Task ledger

<!-- sdd-section: task-ledger -->

| ID | State | Next | Depends on | Blocked by | Source freshness | Spec state | Data phase | Outcome / vertical slice | Contract IDs | Independent merge boundary | PR | Required output IDs | Consumed output versions |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T01 | DONE | | None | None | CURRENT | COMPLETE | NONE | Bounded agent judgment and essential evidence with U84 publication | FC01, FC02, FC03, FC04, FC05, FC06 | One consistent source/policy/consumer PR | None | None | None |
| T02 | VERIFYING | | T01 | None | CURRENT | COMPLETE | NONE | PR-owned evidence, reset contract, v5 enforcement and compatibility in PR #65 | FC07, FC08, FC09, FC10, FC11, FC12 | One coherent policy/consumer/checker PR; design packages T02/T03 cannot merge separately | [PR #65](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/65) | source | source=9e8f79af50ed3bad2d512301e03943506f7421f0 |
| T04 | PLANNED | | T02 | None | CURRENT | COMPLETE | CLEANUP | Exact-SHA current-project v5 cutover, complete WB62 reset and runtime regeneration | FC08, FC09, FC10, FC11 | One separately reviewed reset/upgrade PR after PR #65 target proof | Not created | pr65-v5 | None |

## 8. Task specification and context

<!-- sdd-section: task-specifications -->
<!-- sdd-task-spec: T01 -->

### T01 — bounded judgment and essential evidence

| Field | Value |
| --- | --- |
| State | DONE |
| Depends on | None |
| Data phase | NONE |
| Source boundary | Whiteboard source inventory: docs, Contributing, README, CHANGELOG, three source skills, review/affected phase templates, generated guidance in install-sdd.sh, one maintained example and corresponding tests; U84 project controls; issue 63 checker/docs/regression correction |
| Compatibility before/after | Machine schemas and installer runtime logic unchanged; existing lifecycle checker admits only newly enumerated valid control progress; installed project upgrades explicit |
| Contract IDs | FC01, FC02, FC03, FC04, FC05, FC06 |
| Owner | Coordinating implementer |
| Branch / PR | [PR #64](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/64), merged as `37653eec1d980e3ea5ed858922ab97894395fab9` |
| Context receipt | APPROVED |
| Context source revision | d93d27a33c43c1574aeed27044654c8964cf998b |
| Context verification | CURRENT |
| Verified source revision | d93d27a33c43c1574aeed27044654c8964cf998b |
| Verification evidence | [T01 readiness evidence](../../reviews/WB62-P01.md#t01-readiness-evidence) |
| Verified at | 2026-09-06T10:20:34Z |
| Implementation mode at task start | HUMAN_REVIEW_BEFORE_MERGE; recorded owner scope T01 |
| Implementation mode at PR/merge | HUMAN_REVIEW_BEFORE_MERGE; owner authorized exact PR64 head after review |
| Post-merge human review | NOT_APPLICABLE; the implementation used human review before merge, followed by the recorded post-merge validation receipt |
| Self-contained boundary | Policies, consumers, tests and upgrade controls delivered together |
| Actual change summary | Canonical goals/recovery, linked skills and consumers, discretionary PR timing, essential evidence and regressions; PR 64 |

Outcome, requirements, scope and prohibited behavior are FC01–FC06 and §§2–5.
No predecessor outputs are consumed. The source set is accepted design/handoff,
current canonical policies, verified pin and this provisional plan; final
acceptance/revision must be recorded before execution. No known design ambiguity.

Delivery guide: update owning policy first; reconcile skills/generator and
consumers; add representative tests/example; inspect whole diff and run gates;
submit complete PR to two reviewers and owner. Exact helper/text organization
is implementation-owned, not an extra owner decision.

Acceptance criteria: each FC row has actual positive and failure evidence;
unchanged schema/review/retention/ownership boundaries demonstrably remain;
README/diagrams and one maintained example agree; no duplicate historical
snapshots added merely for review when retained Git objects suffice.

Required tests: relevant documentation and installer generated-skill regression,
existing v2/v3/v4 and snapshot compatibility tests, scenario evidence for all
FC rows, full 99-test baseline plus additions, Markdown, structure, lifecycle,
Mermaid and whitespace. External-link advisory if changed claims need it.
Package-check results belong in the review ledger; implementation results are
now recorded in T01/final evidence and PR #64. The original 99-test baseline
grew to 103 passing tests; the external-link advisory was not rerun.

<!-- sdd-task-spec: T02 -->

### T02 — PR-owned evidence, reset contract and v5 enforcement

| Field | Value |
| --- | --- |
| State | VERIFYING |
| Depends on | T01 |
| Data phase | NONE |
| Source boundary | Canonical documentation, diagrams, skills, installer-generated guidance, whiteboard/handoff/plan/workflow/review/adoption templates, PR template, lifecycle schemas/dispatcher, GitHub-aware evidence verifier/action, package scripts, examples, changelog and corresponding tests identified by the accepted design consumer matrix |
| Compatibility before/after | Preserve v2–v4 behavior and existing archives; add explicit opt-in v5 PR-evidence/reset behavior without silently changing installed pins |
| Contract IDs | FC07, FC08, FC09, FC10, FC11, FC12 |
| Owner | Coordinating implementer |
| Branch / PR | [PR #65](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/65) from `codex/upgrade-37653ee` to `main` |
| Context receipt | APPROVED |
| Context source revision | 231b51efc6e2d0d65e39c93ec7a24c6fd1001855 |
| Implementation mode at task start | HUMAN_REVIEW_BEFORE_MERGE / [P02 owner acceptance](../../reviews/WB62-P01.md#p02-owner-acceptance) / scope `T02, T04` |
| Implementation mode at PR/merge | Recheck the live workflow before publication, review and merge |
| Post-merge human review | NOT_APPLICABLE when human review occurs before merge; otherwise not authorized |
| Self-contained boundary | The whiteboard's T02 contract and T03 enforcement packages merge together so no policy/checker mismatch reaches `main` |
| Actual change summary | Added opt-in v5 PR-owned evidence/reset semantics, frozen v4 dispatch, exact reset inventory and fixed-size locator validation, a read-only GitHub evidence/tree verifier, deterministic reviewer body digests, CI/package wiring, mapped source guidance/templates/examples and positive/negative regressions |

Outcome: PR #65 delivers one consistent reusable v5 contract in which GitHub PR
evidence replaces permanent per-delivery archives and verified closure removes
all non-reusable delivery state, resets the whiteboard and regenerates runtime.

Task requirements:

- Implement FC07–FC12 and the accepted whiteboard consumer matrix.
- Define versioned PR review, owner-acceptance and target-receipt evidence with
  immutable candidate binding, body digests and unavailable-evidence handling.
- Define complete `REMOVE`/`RESET`/`KEEP` inventory, exact destructive target
  identities, ownership proof, cleanup authority and completion failure.
- Preserve adoption controls and reusable delivered output; historical interest
  alone is not a reuse reason.
- Preserve v2–v4 and add explicit v5/default schema dispatch plus a GitHub-aware
  verifier that does not fabricate remote evidence from local files.
- Update README, diagrams, maps, policies, skills, generated guidance, templates,
  examples and tests together.

Scope: only the accepted design's canonical consumer matrix and current PR #65
reconciliation. Not in scope: runtime defects #33/#34/#36, quorum changes, new
dependencies, automatic design/validation approval, WB38 deletion or T04's
post-merge destructive actions.

Dependencies and gates: accepted semantic design
`a0d7f66559d7f179f333c00ceb1cd2f0ff6c2f30`; accepted P02 plan; fresh context
receipt; owner-selected mode covering T02; exact-head self-review, two retained
implementation reviewers, all required checks and human review before merge
unless a different mode is explicitly authorized.

Task context receipt (complete after `READY` and before `IN_PROGRESS`):

| Receipt field | Recorded value |
| --- | --- |
| Implementer / type / timestamp | Coordinating agent / implementation / 2026-09-06T23:58:36+08:00 |
| Approved source set / revision | Design `a0d7f66559d7f179f333c00ceb1cd2f0ff6c2f30`; plan `d8d7fd707e1ca31f2d413c86479f51fe7864c6d8`; owner control revision `231b51efc6e2d0d65e39c93ec7a24c6fd1001855` |
| Receipt candidate revision | 231b51efc6e2d0d65e39c93ec7a24c6fd1001855 |
| Outcome / non-scope | Implement T02's reusable PR-evidence/reset contract and v5 enforcement; exclude T04 destructive reset/cutover, WB38 deletion and runtime defects #33/#34/#36 |
| Contracts / decisions | FC07–FC12; accepted design C01–C06 |
| Critical obligations / prohibitions | Preserve adoption/reusable output; no destructive T04 action; no fabricated GitHub evidence |
| Risks / exceptions / boundaries | Exact inventory, compatibility and cross-document consistency |
| Dependencies / data phase | T01/source blob `9e8f79af50ed3bad2d512301e03943506f7421f0`; current main and runtime pin `37653eec1d980e3ea5ed858922ab97894395fab9`; PR #65 identity verified / NONE |
| Required completion evidence | Focused fixtures, v2–v5 compatibility, docs gates, full tests, exact PR review and target receipt |
| Ambiguities / conflicts / map omissions | None. PR #65's remote head intentionally remains the earlier published revision until the complete T02 candidate is ready for review |
| Self-review state / evidence | SELF_REVIEW_PASSED / [T02 readiness evidence](../../reviews/WB62-P01.md#t02-consolidated-readiness-evidence) |
| Fresh-context review state / revision / receipt | NOT_APPLICABLE / accepted context unchanged; one consolidated readiness verification is the approved route |
| Fresh-context session / assigned reviewers | Not applicable until the completed T02 implementation review boundary |
| Human review state / revision / evidence | APPROVED / plan `d8d7fd707e1ca31f2d413c86479f51fe7864c6d8` / [P02 owner acceptance](../../reviews/WB62-P01.md#p02-owner-acceptance) |
| Final receipt disposition | APPROVED |

Delivery guide: implement canonical owners first; add schemas/verifier and
negative tests; reconcile every mapped consumer and diagram; inspect the full
diff; run focused and aggregate gates; publish the exact candidate to PR #65;
then complete two-agent and human review.

Acceptance criteria:

- [x] One canonical contract owns PR evidence and reset semantics; consumers link
      it without contradictory archive rules.
- [x] Exact inventory and ownership validation reject omitted, ambiguous, broad
      or unauthorized destructive targets.
- [x] v2–v4 regressions pass and v5 selection is explicit.
- [x] GitHub-aware tests cover pagination, mutation, missing evidence, body
      digests, checks, merge identity and target proof.
- [x] README, diagrams, policies, skills, templates, examples and changelog agree.
- [ ] All required checks and exact-head reviews pass on PR #65.

Required tests and evidence: focused schema/evidence/reset/installer fixtures;
Markdown, structure, lifecycle, Mermaid, whitespace and full Node suite;
external-link advisory only if a changed external claim needs it. Implementation
and validation record: not started.

<!-- sdd-task-spec: T04 -->

### T04 — exact-SHA WB62 reset and runtime cutover

| Field | Value |
| --- | --- |
| State | PLANNED |
| Depends on | T02 |
| Data phase | CLEANUP |
| Source boundary | Exact PR #65 merge/target receipt; project manifest, registry and trigger; complete WB62 repository-path/ref/worktree/runtime inventory; working whiteboard; installer-owned runtime checkout/guide/marker; reset/upgrade PR |
| Compatibility before/after | Before: project remains pinned to v4 with WB62 state preserved. After: exact PR #65 merge SHA is the reviewed v5 pin, all non-reusable WB62 state is removed, whiteboard is `EMPTY`, runtime is regenerated and v2–v4 source compatibility remains |
| Contract IDs | FC08, FC09, FC10, FC11 |
| Owner | Coordinating implementer |
| Branch / PR | Not created; create only after PR #65 target receipt |
| Context receipt | NOT_STARTED |
| Context source revision | Not recorded; future exact PR #65 merge SHA is required after it exists |
| Implementation mode at task start | Not selected for T04; requires explicit live scope after exact candidate exists |
| Implementation mode at PR/merge | HUMAN_REVIEW_BEFORE_MERGE recommended; fresh owner cutover acceptance is mandatory regardless |
| Post-merge human review | NOT_APPLICABLE after required human review before merge and target reset verification |
| Self-contained boundary | One combined reset/upgrade PR owns the exact v5 pin, complete WB62 reset, neutral whiteboard and stable-control update |
| Actual change summary | Not recorded |

Outcome: after PR #65 is merged and target-verified, one exact-SHA reviewed PR
removes every non-reusable WB62 item, preserves adoption/reusable output and WB38,
restores `EMPTY`, updates the pin and regenerates a `CURRENT` runtime.

Task requirements:

- Consume only the verified PR #65 merge SHA and target receipt; PR #65 approval
  cannot preapprove this future candidate.
- Enumerate every WB62 repository-relative path, exact branch ref, worktree path
  and ownership marker, and runtime checkout/guide/marker identity.
- Record `REMOVE`, `RESET`, or `KEEP` plus reuse reason, exact replacement bytes,
  ownership proof and cleanup operation for every item.
- Obtain migration validation, two independent exact-head reviews and fresh
  human cutover/merge acceptance before destructive action.
- Verify target, append the result to PR #65, clean only enumerated local targets
  and regenerate runtime from the exact reviewed v5 pin.

Scope: WB62 and the exact runtime/pin transition only. Not in scope: WB38,
unrelated branches/worktrees, runtime defects #33/#34/#36, historical cleanup,
new policy semantics or any target absent from the accepted inventory.

Dependencies and gates: T02 `DONE`; `pr65-v5` output complete/current/approved and
bound in the context receipt; exact reset inventory; migration checks; exact-head
self-review and two reviews; fresh owner cutover acceptance; repository checks;
target-reset and regenerated-runtime verification.

Task context receipt (complete after `READY` and before `IN_PROGRESS`):

| Receipt field | Recorded value |
| --- | --- |
| Implementer / type / timestamp | Not recorded |
| Approved source set / revision | T02/PR #65 output; exact merge SHA not yet available |
| Receipt candidate revision | Not recorded |
| Outcome / non-scope | Reconcile against this task specification and exact inventory |
| Contracts / decisions | FC08, FC09, FC10, FC11; accepted reset design |
| Critical obligations / prohibitions | No relational preapproval; no unenumerated deletion; preserve adoption/reusable output/WB38 |
| Risks / exceptions / boundaries | Destructive ownership, unavailable PR evidence and runtime cutover |
| Dependencies / data phase | T02 / CLEANUP |
| Required completion evidence | PR #65 target receipt, migration checks, exact inventory, reviews, owner acceptance, reset target proof, runtime `CURRENT` |
| Ambiguities / conflicts / map omissions | Future SHA/targets are expected outputs, not current blockers; exact values required before READY |
| Self-review state / evidence | NOT_STARTED / Not recorded |
| Fresh-context review state / revision / receipt | NOT_STARTED / Not recorded |
| Fresh-context session / assigned reviewers | Not recorded |
| Human review state / revision / evidence | NOT_STARTED / Not recorded |
| Final receipt disposition | NOT_STARTED |

Acceptance criteria:

- [ ] PR #65 exact merge and target evidence is verified before candidate creation.
- [ ] Complete inventory has no omitted or uncertain delivery-owned item.
- [ ] Only enumerated ownership-verified targets are changed or removed.
- [ ] Adoption controls, reusable output and WB38 remain unchanged except the
      explicit exact-SHA pin/control updates.
- [ ] Working whiteboard is exact neutral `EMPTY`; runtime regeneration validates
      `CURRENT` at the reviewed v5 pin.
- [ ] Reset/upgrade PR checks, exact-head reviews, owner acceptance and target
      verification all pass.

Required tests and evidence: exact tree/path/ref/worktree/runtime inventory;
GitHub evidence verification; v4-to-v5 migration tests; installer cleanup,
install and validate; lifecycle, documentation and full regression gates;
post-merge target receipt on PR #65. Local implementation validation: focused
schema/evidence/reset/publication tests pass 59/59; Markdown, structure,
lifecycle, Mermaid and whitespace gates pass; the full Node suite passes
113/113. The external-link advisory was not rerun because no external factual
claim changed. Exact-head PR checks and implementation reviews remain pending.

## 9. Live snapshot

| Field | Current value |
| --- | --- |
| Plan state | IMPLEMENTING |
| Current task | T02 |
| Next ready task(s) | None |
| Active branch / PR | `codex/upgrade-37653ee`; [PR #65](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/65) |
| Last completed task | T01 |
| Active blocker | None |
| Last validation | T02 implementation complete locally; focused tests 59/59, full Node suite 113/113, Markdown, structure, lifecycle, Mermaid and whitespace gates pass |
| Next action | Freeze and publish the exact PR #65 head, then run self-review and two implementation reviews |

## 10. Evidence and history

Historical C01–C06/FC01–FC06 map to T01 and [T01 evidence](T01-evidence.md).
Current design C01–C06 maps through C07–C12/FC07–FC12 to T02 and T04.
Implementation evidence will be published on PR #65 and the later reset/upgrade
PR rather than copied into a permanent delivery archive. Until v5 reset, this
working plan preserves live state and reviewer findings without overwriting T01.

## 11. Validation, retrospective and reset

The earlier plan entered `VALIDATING` after T01, but the accepted design exposed
new implementation work and legally returned it to `IMPLEMENTING`. Plan-level
validation resumes only after T02 and T04 are `DONE`, no next task remains and
all FC07–FC12 evidence is complete. Closure publishes the concise result to the
PRs, verifies target, applies the complete reset inventory, restores `EMPTY` and
regenerates runtime. No permanent WB62 archive/record is created by v5 closure;
existing historical material remains until the separately reviewed T04 reset.
