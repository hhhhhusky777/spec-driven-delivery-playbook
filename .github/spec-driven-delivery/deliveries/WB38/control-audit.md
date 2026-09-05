# WB38 — Existing-control audit

## Attention and status

WB38-A02 is the proposed preservation audit for REQ-17. The source clauses and
checker diagnostic inventory below define what implementation must preserve.
The design mapping is ready for review; implementation conformance remains
NOT_RUN. No row claims a control has already changed or passed live validation.

| ID / type | Important item | Remaining work | Owner |
| --- | --- | --- | --- |
| A01 / Attention | Exact control preservation | Review the clause and complete diagnostic dispositions below | Coordinator; both reviewers |
| A02 / Attention | Compatibility | BC01 preserves v2 and specifies explicit v3 opt-in | Governance and checker reviewer |
| A03 / Attention | Readiness context | BC03 separates accepted obligations from actual verification | Both reviewers |
| A04 / Attention | PR audit retention | Distinguish durable pointers from mutable/unavailable remote evidence | Governance and security reviewer |

## Inspected source index and required disposition

Paths below identify canonical repository sources at base
4f44eff2ca4468b75069bdb2b47a5b681bb888b7. Pinned template/runtime provenance is
d213114f99dc2186d6f4e50a85fe962de0e1afa9. Changes must be checked against both;
source templates and installed runtime are not interchangeable.

| Control ID | Canonical clause/source boundary | Retained obligation | Planned cadence treatment | Completion |
| --- | --- | --- | --- | --- |
| CP01 | Contributing: Review and continuation authority; Template Governance review procedure 11-12 | Exact self-review, two isolated retained seats, human semantic acceptance | One coherent package, same-seat corrections | Mapped below; review pending |
| CP02 | Quality policy 2.1-2.6 and 9 | Correctness, ownership, complete attention inventory and semantic review | Table navigation and joint review, never map-only approval | Mapped below; review pending |
| CP03 | Quality policy 3, 5, 7, 8 and 11 | Every required check, negative proof, failure triage, dependency/security controls | No required final-check reduction | Mapped below; review pending |
| CP04 | Handoff 1, 3, 4; workflow 1.1-1.2, 8-10 | No unapproved normative authority, exact consumption and transitive invalidation | Explicit provisional preparation, commit only after package acceptance | Mapped below; review pending |
| CP05 | Implementation plan 6.3-6.5; task calibration readiness; workflow skill pre-start | Complete task, fresh context, approved substantive interpretation | Plan review plus execution-time verification; material mismatch returns to review | Mapped below; review pending |
| CP06 | Workflow 1.3 and 9.4; Contributing branches | Current mode/scope, exact PR head, no self-approval, target checks and merge authority | Coherent PR boundary, not task-state full reviews | Mapped below; review pending |
| CP07 | Plan 6-8; Contributing development scope | WIP, dependency ordering, self-contained green merge unit, task history | Group only related independently testable changes | Mapped below; review pending |
| CP08 | Workflow 1.4, 11-12; plan 11; project archive contract | Terminal tasks, final validation, human closure, archive then reset, owned cleanup | Combined closure review followed by verified mechanics | Mapped below; review pending |
| CP09 | Adoption runbook 2-8 and 10-11; adoption and upgrade skills | Authority mapping, immutable pin, runtime verification, controlled cutover and rollback | Batch within special authority, never early activation/cutover | Mapped below; review pending |
| CP10 | Review protocol 1-7; quality policy 11 | Exact findings, author dispositions, identity honesty, preserved history | PR-primary new findings only after retention-policy change | Mapped below; review pending |
| CP11 | Whiteboard procedure and template | One active need, factual notes, settled material decisions, reviewed conclusion | Draft-first notes; synthesize complete formal package | Mapped below; review pending |
| CP12 | Quality policy 8/11; workflow rerouting; upgrade/cleanup rules | Classify failure, preserve evidence, block affected scope, bounded recovery | One canonical recovery checkpoint; no retries as approval | Mapped below; review pending |
| CP13 | Lifecycle checker: checkSelfReviewGate, checkReviewSessionRoster, checkIndependentReviewGate | Two exact approvals and applicable human acceptance | Preserve assertions across any schema version | Mapped below; review pending |
| CP14 | Lifecycle checker: checkImplementationContinuation and parent validation | Repository/head/mode binding, merged evidence, resolved human review and terminal tasks | No bypass through new batch fields | Mapped below; review pending |
| CP15 | Lifecycle checker: computeTransitiveFreshness and workflow scope/readiness checks | Unknown/material drift, dependency blockers, path scope, approved selected prerequisites | Explicit provisional state never passes readiness | Mapped below; review pending |
| CP16 | Lifecycle checker: checkImplementationPlan; schema transitions; documentation regression contracts | Complete task specifications, legal transitions, required markers | Reconcile changed cadence assertions without deleting their protected controls | Mapped below; review pending |

Source-file links:
[Contributing](../../../../CONTRIBUTING.md),
[quality policy](../../../../docs/documentation-quality-policy.md),
[governance](../../../../docs/template-governance.md),
[handoff](../../../../templates/handoffs/whiteboard-to-workflow.md),
[workflow](../../../../templates/workflows/sdd-delivery-workflow.md),
[plan](../../../../templates/delivery/implementation-plan.md),
[calibration](../../../../docs/task-specification-calibration.md),
[adoption](../../../../docs/project-adoption-runbook.md),
[review](../../../../templates/reviews/fresh-context-agent-review.md),
[schema](../../../../config/sdd-lifecycle-schema.json),
[checker](../../../../scripts/sdd-lifecycle.mjs),
[lifecycle tests](../../../../tests/sdd-lifecycle.test.mjs),
[documentation tests](../../../../tests/documentation-quality.test.mjs).

## Clause-level dispositions

All rows are PROPOSED for joint review. Required tests reference the plan's E
matrix and [BC01-BC08](design-contracts.md). PRESERVE means the obligation
remains, even when its review is part of one package; CHANGE_CADENCE is not
permission to omit evidence. No clause is waived.

| ID | Exact owning clause or instruction | Disposition and satisfaction point | Required proof |
| --- | --- | --- | --- |
| CP01-a | Quality policy 1: exact candidate self-review before review | PRESERVE at each coherent candidate, invalidated on change | E01/E02; self-review state/evidence diagnostics |
| CP01-b | Review protocol 1.1 and 3: exactly two initially isolated seats, retained per session | PRESERVE; same roster and candidate on each correction round | E02; missing/duplicate/mismatched reviewer rejection |
| CP01-c | Review protocol 5 and 7: immutable findings, explicit author dispositions, unresolved conflict | PRESERVE; BC06 new PR history plus permanent Git pointers | E02/E05; unresolved finding and missing evidence block |
| CP01-d | Quality policy 1; governance review 11-12: human design approval | PRESERVE; one acceptance explicitly covers listed exact normative artifacts | E01; absent human receipt cannot accept planning |
| CP02-a | Quality policy 2.1-2.5: facts/proposals, tradeoffs, canonical ownership, generated content | PRESERVE unchanged; independent semantic inventory | E03/E08; full-diff semantic receipt |
| CP02-b | Quality policy 2.6: attention trigger, two-pass full inventory, split unreviewable unit | PRESERVE; BC07 default table, not map-only approval | E03; omitted decision and misleading map scenario |
| CP03-a | Quality policy 3/7: blocking lint/structure/lifecycle/Mermaid/negative tests | PRESERVE all final aggregate checks | E08 and unchanged documentation failure fixtures |
| CP03-b | Quality policy 5: pins, read-only CI, no privileged untrusted code | PRESERVE unchanged; helper adds no dependency or CI privileges | E08; dependency/CI diff audit |
| CP03-c | Quality policy 8/11: classify before fixing, Red-Green, no failing merge, flake retention | PRESERVE; BC04 retries never erase first failure | E05/E08; original failure + correction |
| CP04-a | Handoff 1/3/4: approval precedes trigger; frozen conclusion; exactly-once consumption | CHANGE_CADENCE for authorized v3 provisional drafting; acceptance/trigger guards preserved | E01; draft can be prepared but cannot execute/consume |
| CP04-b | Workflow 1.2 and 8-9: one-at-a-time dependency generation/review | CHANGE_CADENCE only within explicit package scope; BC02 joint normative acceptance | E01/E05; invalid/missing authority and unapproved external input reject |
| CP04-c | Workflow 8.1/8.2 and 10: transitive freshness, unknown impact, scoped blockers, stale-first correction | PRESERVE; BC02/04 compute affected graph, no unrelated invalidation | E01/E05; existing freshness/scope fixtures plus batch cases |
| CP04-d | Workflow 1.4: canonical owner and frozen input mutability | PRESERVE; exact control-only deltas cannot alter semantic content | E01; changed scope/contract invalidates review |
| CP05-a | Plan 6.3, 7-8 and calibration: complete spec before READY; future detail JIT | PRESERVE; both planned task specs complete here, no invented behavior | E01; missing spec marker/state/source rejected |
| CP05-b | Plan 6.4; development policy 9.2; workflow skill Implementation task continuation | CHANGE_CADENCE for v3 batched receipt only: substantive approval plus fresh BC03 verification | E01; missing/stale/incorrect per-task verification blocks start |
| CP05-c | Plan 6.5: current approved context and full DONE evidence | PRESERVE with BC03 dual evidence; v2 remains unchanged | E01/E08; active tasks cannot rely on another task's receipt |
| CP06-a | Workflow 1.3; PR policy 9: selected mode after design, exact repository/scope, recheck | PRESERVE; no auto-mode default or broadening | E01/E02; all existing mode/phase/authority cases |
| CP06-b | Workflow 9.4; PR policy 9-10: head/merge identity, checks, human/manual or post-merge review | PRESERVE; same-account comments never count as another actor | E02/E06; existing ledger/head/merge negative cases |
| CP06-c | PR policy 9 wording opens ready PR after fresh review | CHANGE_CADENCE: open exact candidate PR before its two-agent review | E02/E04; review actually names published PR/head |
| CP07-a | Development policy 6; Contributing development scope/branches | PRESERVE smallest coherent green unit, WIP, feature isolation for multiple units | E08; T01 core and T02 optional helper; feature routing |
| CP07-b | Plan 6.1/7; test strategy Red closure | PRESERVE dependencies/data sequencing, stable IDs, cancellation history, no future Green repair | E01/E08; old task and parent-state fixtures |
| CP08-a | Workflow 1.4/11/12; plan 11: all tasks terminal, validated plan, post-merge review complete | PRESERVE in closure package; never predicted future results | E06; all parent-validation/closure negative cases |
| CP08-b | Project archive contract; workflow skill ARCHIVED route | CHANGE_CADENCE of review only; immutable copy and links before EMPTY, authorized owned cleanup | E06; premature reset, ownership/authority failure stop |
| CP09-a | Adoption runbook 2/3 and steps 1-3; adoption skill execution 1-5 | PRESERVE authority/conformance/source pin and scope, no inferred needs | E01/E07/E08; existing installer/isolation fixtures |
| CP09-b | Adoption runbook step 4 review stop B, step 5 stop C, step 6 neutral whiteboard | CHANGE_CADENCE to coherent installation package; selected mappings, empty whiteboard and verification still reviewed | E03/E08; worked installation path preserves all obligations |
| CP09-c | Adoption runbook runtime handoff steps 1-6 and sections 8-9 | PRESERVE runtime owner/profile/pin verification, first need/PILOT, actual pilot before ACTIVE | E06/E07; installer tests plus no premature activation scenario |
| CP09-d | Adoption runbook 11; upgrade skill Establish/Apply; assessment cutover checklist | CHANGE_CADENCE within migration authority; preserve between-task checks, old pin, assessment, validation, cutover and rollback | E06/E07; no early cutover or cleanup |
| CP10-a | Quality policy 11 final retention paragraph; project archive retention sentence | CHANGE_RETENTION prospectively under BC06; no deletion of old receipts; 30-day logs unchanged | E02/E07; remote evidence mismatch/unavailability blocks |
| CP10-b | Review protocol 2/4/6; PR policy 10 | PRESERVE packet/receipt fields, complete candidate inspection and line-specific findings | E02/E04; exact identities/anchors and attribution |
| CP11-a | Whiteboard state/control and convergence/handoff-source sections | CHANGE_PREPARATION to draft notes; preserve single need, complete formal synthesis and acceptance before conclusion | E03; missing decisions and overwritten active need fail |
| CP11-b | Workflow skill Action/freshness after-edit steps 4-7; adoption skill execution 7-13 | CHANGE_CADENCE only where explicit batch contract applies; outside it preserve default EXPLICIT_REVIEW | E01/E05; no automatic semantic approval |
| CP12-a | Workflow 10/10.1, quality 8, adoption rollback, upgrade rollback | PRESERVE policy-gap/defect ownership and scoped stops; BC04 adds explicit checkpoint/retry bound | E05; each failure class/partial rejection/resume |
| CP12-b | Contributing Releases/recovery: owner emergency authority and two-working-day follow-up | PRESERVE stricter urgent rules; batching cannot postpone immediate safety stop | E05/E08; urgent authority/follow-up worked scenario |
| CP12-c | Review protocol unresolved-disagreement handling | PRESERVE; BC04 adds two-no-progress escalation, not approval or reviewer replacement | E05; stable finding counters through restart |
| CP13-16 | Every diagnostic listed below plus required schema fields/markers and transitions | PRESERVE for v2; inherit baseline guards in v3 except explicit new type/version support | Full v2 suite unchanged, v3 equivalents and new negative rules |

Only new batch/context structure adds enforcement. Existing checks must not be
replaced by trusting a batch label. Where an old regression asserts exact
per-artifact wording, change only that cadence assertion and add both default
legacy and explicit-batch cases; preserve the original protected obligation.

## Exhaustive baseline checker-diagnostic inventory

Each row is an existing observable rejection in scripts/sdd-lifecycle.mjs at
the base SHA. All remain required under their original v2 conditions. V3 retains
these guards in addition to BC01-BC03 checks; schema dispatch additionally
recognizes specified v3 types/versions. This is an assertion inventory, not a
claim that all semantic policies are currently machine-enforced.

| Diagnostic | Disposition | Evidence required |
| --- | --- | --- |
| SDD_ARTIFACT_ID | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_AUTO_CONFIGURATION | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_AUTO_EXCEPTION | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_AUTO_GATE_BLOCKED | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_AUTO_SEMANTIC_DECISION | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_BLOCKED_NEXT | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_DELIVERY_MANIFEST_EMPTY | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_DEPENDENCY_COVERAGE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_DEPENDENCY_REFERENCE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_DEPENDENCY_REGISTER_EMPTY | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_FRESHNESS_MISMATCH | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_FRESH_REVIEW_EVIDENCE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_FRESH_REVIEW_SESSION | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_FRESH_REVIEW_STATE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_GATES_NOT_READY | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_HUMAN_REVIEW_EVIDENCE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_HUMAN_REVIEW_MODE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_HUMAN_REVIEW_STATE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_ILLEGAL_TRANSITION | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_IMPLEMENTATION_MODE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_IMPLEMENTATION_MODE_AUTHORITY | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_IMPLEMENTATION_MODE_PHASE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_IMPLEMENTATION_MODE_REQUIRED | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_IMPLEMENTATION_MODE_SCOPE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_IMPLEMENTATION_REPOSITORY | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_IMPLEMENTATION_REVIEW_BINDING | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_IMPLEMENTATION_REVIEW_EMPTY | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_IMPLEMENTATION_REVIEW_EVIDENCE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_IMPLEMENTATION_REVIEW_LEDGER | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_IMPLEMENTATION_REVIEW_MODE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_IMPLEMENTATION_REVIEW_SCOPE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_MANUAL_MERGE_HUMAN_REVIEW | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_MERGED_FRESH_REVIEW | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_MERGE_RESULT | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_PLAN_MODE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_PLAN_NOT_READY | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_PLAN_REVIEW | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_PLAN_VALIDATING_NEXT | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_PLAN_VALIDATING_NEXT_READY | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_PLAN_VALIDATING_TASKS | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_POST_MERGE_REVIEW_OPEN | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_REQUIRED_FIELD | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_REQUIRED_SECTION | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_REQUIRED_TABLE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_REVIEW_MODE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_REVIEW_PHASE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_REVIEW_REVISION_MISMATCH | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_SCHEMA_UNKNOWN | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_SCHEMA_VERSION | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_SELF_REVIEW_EVIDENCE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_SELF_REVIEW_STATE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_STALE_SUMMARY_MISMATCH | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_STALE_TASK_SOURCE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_STOPPED_REVIEW_EVIDENCE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_TASK_SPEC_INCOMPLETE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_TASK_SPEC_REQUIRED | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_TASK_SPEC_STATE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_UNAPPROVED_PREREQUISITE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_WORKFLOW_PLAN_FRESHNESS | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_WORKFLOW_PLAN_LINK | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_WORKFLOW_PLAN_STATE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_WORKFLOW_REVIEW_STATE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |
| SDD_WRITE_SCOPE | PRESERVE original rejection; v3 adds explicit cases | Existing v2 fixtures unchanged; equivalent v3 guard and positive path |

## Readiness and activation boundary

The clause-to-control map is specified; both reviewers must independently check
its completeness against full source scope and recorded baseline diagnostics.
T01 must produce passing implementation evidence for every changed control,
not merely remove a text assertion. An unmapped newly discovered clause returns
to this package before affected implementation; it is not presumed redundant.

BC01-BC08 are PROPOSED feature/system contracts for this delivery, not active
upstream policy. Exact planning acceptance authorizes implementing them in the
named files under the scoped trial. Global policy activation still requires
reviewed merge; installed consumers retain their pins until reviewed adoption.
No activation, live publication or performance pass is claimed by this audit.
