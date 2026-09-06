# WB62 — implementation plan

<!-- sdd-schema: implementation-plan@4; mode: FULL -->

## Owner review brief

| Design basis | Task / work | Validation | Limit / decision |
| --- | --- | --- | --- |
| Five goals; C01–C03 and owner clarification | T01: clear boundaries, stable outcomes, key information, proportional effort and agent discretion; reconcile policy, skills and generated guide | Consistent authority, retained approvals, bounded recovery, scope/safety escalation cases | No weakening of required gates or new machine semantics |
| Key information; C04–C05 | Issue 63 unblock plus T01: retain justified checker snapshots and Git-first review evidence with concise findings | Snapshot control transitions, immutable boundaries, Git history, unavailable bytes and unique logs | No broad mask, historical deletion or arbitrary volume threshold |
| Canonical consistency; C06 | T01: update affected README, diagrams, templates and maintained example together | Source-impact audit, semantic review, docs and full regression | Syntax passes are not proof of semantic consistency |
| Owner packaging amendment | T01 PR includes already verified U84 upgrade controls | New runtime CURRENT, migration inventory and mixed-version tests | No runtime issue fix; final main publication still pending |

Accept the exact planning package, including routing migration, this plan and
substantive context, after independent review. No unresolved design choice is
identified. This is not implementation-result or merge acceptance. Final
pre-start observations remain necessary. No implementation scenarios, savings
measurement or CI pass is claimed yet.

## 0. Document control

| Field | Value |
| --- | --- |
| Review batch | [Planning batch](planning-batch.md) |
| Delivery workflow | [Workflow](workflow.md) |
| Plan | WB62 agent judgment and essential evidence |
| Status | CONTRACT_REVIEW |
| Previous status | READY |
| Plan mode | FULL |
| Current phase | CONTRACT_REVIEW |
| Current task | None |
| Next ready task(s) | None |
| Blockers | None |
| Owner | Repository owner |
| Reviewers | Two isolated planning reviewers, then owner |
| Review state | IN_REVIEW |
| Self-review state | SELF_REVIEW_PASSED |
| Self-review candidate revision | WB62-P01-R06 |
| Self-review evidence | [Package evidence](../../reviews/WB62-P01.md) |
| Fresh-context review state | IN_REVIEW |
| Fresh-context review session ID | WB62-P01 |
| Fresh-context assigned reviewers | wb62_planning_r1, wb62_planning_r2 |
| Fresh-context required approvals | 2 |
| Fresh-context approved reviewers | None |
| Fresh-context reviewed revision | None |
| Fresh-context review evidence | [Package evidence](../../reviews/WB62-P01.md) |
| Human review state | NOT_STARTED |
| Human reviewed revision | None |
| Human review evidence | [Review record](../../reviews/WB62-P01.md#owner-package-acceptance) |
| Created | 2026-09-06 Asia/Shanghai |
| Last updated | 2026-09-06 Asia/Shanghai |
| Primary issue | [Issue 62](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/62) |
| Concluded whiteboard | [Design](../../solution-whiteboard.md) |
| Approved workflow handoff | [Handoff](handoff.md), 4b18100a722aa06baba7643b67e01185108a8635 |
| Implementation continuation mode | Read live from delivery workflow; do not copy |
| Development policy | [Contributing](../../../../CONTRIBUTING.md) |
| Test strategy | [Quality policy](../../../../docs/documentation-quality-policy.md) |
| PR/branch policy | [Contributing](../../../../CONTRIBUTING.md#branches-and-pull-requests) |
| Delivery implementation task count | 1 |
| Integration model | single-task direct |
| Feature integration branch | Not applicable |
| Task PR target | main |
| Final PR target | main |
| Protected-branch synchronization | Before task start and merge; reconcile changed inputs |
| Branch / PR | codex/wb62-agent-judgment; not opened |
| Archived record | Not archived |

## 1. Governing inputs

Use quality-policy precedence, Template Governance and Contributing. Accepted
design C01–C06 and handoff define source behavior; [preparation authority](preparation-authority.md)
adds U84 publication and provisional batching. Issue prose alone is not a
contract. Runtime d93d27a33c43c1574aeed27044654c8964cf998b supplies v4 templates.
Old receipts and schema versions remain immutable history.

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

Scope: accepted source inventory in the whiteboard, generated text only in
install-sdd.sh, corresponding tests and one maintained example; U84 project
controls join the same PR. The owner-authorized issue 63 exception adds one
narrow existing-checker projection correction and regressions before package
acceptance. Exclude runtime #33/#34/#36, schema/state-machine changes, broader
validator or review-quorum changes, new dependencies, blanket auto-merge,
retained-history pruning and activation of other projects.

Assumption: existing candidate source remains the baseline; recheck main and
current governing files before execution. If changed, reconcile affected inputs
before starting. Rollback is a reviewed coherent revert, preserving evidence.

## 3. Clarifications

| ID | Question | Resolution | State | Owner |
| --- | --- | --- | --- | --- |
| Q01 | Publish upgrade separately? | Owner requests joint delivery; local cutover verified | RESOLVED | Owner |
| Q02 | Change schemas or mandatory approvals? | No; issue 63 may correct existing control projection without changing either | RESOLVED | Owner |
| Q03 | Runtime issues? | Deferred to issues 33/34/36; independent of source guidance | DEFERRED | Owner |

## 4. Contracts and acceptance cases

| ID | Required outcome | Failure boundary | Required evidence |
| --- | --- | --- | --- |
| FC01 | Canonical sources agree within applicable scope/version; clear precedence allows subordinate correction | Genuine conflicting authority stops affected consumption | Same-authority conflict and stale-summary scenarios |
| FC02 | Agents reuse valid authorization and choose sequencing/diagnostics within authorized unit | New scope, authority or acceptance boundary is not inferred | Unchanged approval, related correction and scope-expansion cases |
| FC03 | Existing error handling supports autonomous repair of agent mistakes, safe isolation and issue tracking for genuine project/playbook gaps | Critical mismatch, missing authority, uncertain destructive effects or exhausted bounds stop affected work | Agent-mistake recovery, isolated failure, project/upstream gap triage, uncertain cause and safety escalation cases |
| FC04 | Exact reviewed bytes remain retrievable with concise findings/resolutions | A digest without available content cannot support acceptance | Git multi-round evidence and unavailable-object case |
| FC05 | Necessary unique raw/non-Git and checker-consumed snapshots remain | No blanket deletion or unsupported Git resolver | Unique log and current snapshot-comparison cases |
| FC06 | Policies, source skills, generator, phase templates, README and example agree | A link alone cannot fix contradictory instructions | Full affected-source audit plus docs and semantic review |

### Other system boundaries

State transitions, task graph rules, quorum, exact-head invalidation, retries
and retention deadlines stay as specified by the installed canonical contracts.
No new state machine, public API, data transaction, concurrent service, auth
mechanism or performance budget is introduced. Existing command/token/privacy
and worktree-ownership protections remain. Generated instructions are the only
installer interface change; execution logic is out of scope.

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

This is a bounded source audit, not an assertion that every downstream project
has been inspected. The implementer repeats impact search after editing and
records actual affected/no-impact dispositions. C01–C06 map to FC01–FC06 in T01.
Existing policies remain governing while their proposed source changes are
prepared; future source output is never its own starting prerequisite.

Accepted direction is a small contract in existing owners. Rejected alternatives
are removing controls, adding a framework, or imposing arbitrary volume limits.
Responsibility: policies own requirements; skills/generator implement them;
templates/examples explain local consequences. No duplicated precedence table.

Compatibility: NONE durable-data change; old schemas and adopted pins remain
supported. U84 changes this project's pin only. Further adoption of T01 source
changes requires its reviewed release/upgrade path. Risks are hidden skipped
controls, lost diagnostic evidence and inconsistent consumers; FC01–FC06 and
independent review address them. Any new material trade-off returns to owner.

## 6. Delivery strategy and gates

One coherent T01 keeps policies and consumers consistent at merge. WIP is one;
single-task PR targets main and includes U84 controls. No separate foundation,
data migration or cleanup task. All required new behavioral tests must turn
green within this task; no intentionally failing test escapes its merge unit.

<!-- sdd-section: task-state-rules -->

Use PLANNED -> READY -> IN_PROGRESS -> VERIFYING -> DONE, with existing scoped
BLOCKED/CANCELLED handling. No task is active during package preparation.

<!-- sdd-section: definition-of-ready -->

DoR: accepted package and complete task spec, current inputs, no blocking gap,
available owned source/environment, correct branch/PR topology and scope.
Select implementation mode only after design acceptance. Future source output,
validation and archive reports are not starting prerequisites.

<!-- sdd-section: context-receipt-gate -->

Substantive T01 context is reviewed with this package. Immediately before start,
perform one consolidated fresh verification of accepted revisions, dependencies,
environment, worktree/PR and permission/mode; record actual values in T01.
Unchanged accepted context needs no extra full review. Material mismatch returns
to its owning review. Never prefill approval or a future verification timestamp.

<!-- sdd-section: definition-of-done -->

DoD: FC01–FC06 implemented; actual focused and full checks, complete impact
reconciliation, exact PR review and owner merge acceptance, target verification
and durable concise evidence. No unrelated diff or lost historical evidence.

## 7. Task ledger

<!-- sdd-section: task-ledger -->

| ID | State | Next | Depends on | Blocked by | Source freshness | Spec state | Data phase | Outcome / vertical slice | Contract IDs | Independent merge boundary | PR | Required output IDs | Consumed output versions |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T01 | PLANNED | | None | None | CURRENT | COMPLETE | NONE | Bounded agent judgment and essential evidence with U84 publication | FC01, FC02, FC03, FC04, FC05, FC06 | One consistent source/policy/consumer PR | None | None | None |

## 8. Task specification and context

<!-- sdd-section: task-specifications -->
<!-- sdd-task-spec: T01 -->

### T01 — bounded judgment and essential evidence

| Field | Value |
| --- | --- |
| State | PLANNED |
| Depends on | None |
| Data phase | NONE |
| Source boundary | Whiteboard source inventory: docs, Contributing, README, CHANGELOG, three source skills, review/affected phase templates, generated guidance in install-sdd.sh, one maintained example and corresponding tests; U84 project controls; issue 63 checker/docs/regression correction |
| Compatibility before/after | Machine schemas and installer runtime logic unchanged; existing lifecycle checker admits only newly enumerated valid control progress; installed project upgrades explicit |
| Contract IDs | FC01, FC02, FC03, FC04, FC05, FC06 |
| Owner | Coordinating implementer |
| Branch / PR | codex/wb62-agent-judgment; main target; no PR yet |
| Context receipt | NOT_STARTED |
| Context source revision | d93d27a33c43c1574aeed27044654c8964cf998b |
| Context verification | NOT_STARTED |
| Verified source revision | Not recorded |
| Verification evidence | [T01 readiness evidence](../../reviews/WB62-P01.md#t01-readiness-evidence) |
| Verified at | Not recorded |
| Implementation mode at task start | Not selected; read workflow after package acceptance |
| Implementation mode at PR/merge | Not selected; reread live authority |
| Post-merge human review | NOT_APPLICABLE; no merge yet |
| Self-contained boundary | Policies, consumers, tests and upgrade controls delivered together |
| Actual change summary | Not recorded |

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
not yet produced.

## 9. Live snapshot

| Field | Current value |
| --- | --- |
| Plan state | CONTRACT_REVIEW |
| Current task | None |
| Next ready task(s) | None |
| Active branch / PR | codex/wb62-agent-judgment; no PR |
| Last completed task | None |
| Active blocker | None |
| Last validation | R05: 101 tests and documentation checks passed; R06 control reconciliation under review |
| Next action | Finish amended-context review and fresh pre-start verification; human review before merge remains selected |

## 10. Evidence and history

Traceability: C01/FC01, C02–C03/FC02–FC03, C04/FC04, C05/FC05,
C06/FC06 all map to T01 and the §4 scenario matrix. Final evidence is pending.
Record failures and author dispositions in the package checkpoint/review ledger,
not copied logs. Initial creation on 2026-09-06 implements the accepted design
and owner packaging amendment; no implementation result or new source policy.

## 11. Validation, retrospective and archive

Enter plan VALIDATING only after T01 is DONE, source output is complete/current
and reviewed, and NEXT is empty. Require actual FC evidence, green gates and
consistent source/docs before completion. Compare intended versus actual
outcomes, review effort and gaps; unknown measurements stay unknown. Deferred
runtime work retains its issue owner. Archive only after reviewed closure and
verified merge, preserving accepted design and bidirectional links under the
project archive contract. No archive path is reset or cleaned by this plan.
