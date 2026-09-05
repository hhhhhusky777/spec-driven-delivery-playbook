# Project solution whiteboard

## Recorded conclusion acceptance

The repository owner approved WB38-R03 on 2026-09-05 after both assigned
reviewers approved the exact candidate content hash
f0d879c8c016435ab3e90d2f26d8a4dcec9dd117. Sections 3-14 are now the accepted
frozen conclusion. Their candidate/pending wording describes the reviewed
snapshot and is superseded only by this control record, not rewritten.
Complete receipts and owner authority are in [the review record](reviews/WB38-S01.md).

The owner additionally authorized a scoped live trial of this design for the
following work on this delivery. See [live-trial authority](live-trial.md).
That authority changes this delivery's preparation/review cadence, not the
repository-wide policy, runtime pin or required quality/approval controls.

## Current conclusion overview

Formal candidate WB38-R03 supersedes the earlier adoption-only proposal.
Read this table, then the linked formal sections; preserved notes are history.
Both retained reviewers inspect the full candidate before owner acceptance.

| Focus | Canonical detail | Reviewer / owner attention |
| --- | --- | --- |
| Outcome and scope | [Intake](#3-intake), [requirements](#6-needs-and-candidate-requirements) | Both seats: all phases, REQ-01 through REQ-18; runtime fixes and Apps remain excluded |
| Review boundaries | [Lifecycle batches](#shared-lifecycle-batch-model) | R1 governance: adoption, planning, coherent task PRs and closure; upgrades keep cutover authority |
| No weaker controls | [Control mapping](#control-preservation-mapping), [policy gaps](#7-current-system-and-gap-analysis) | R1 policy and R2 tests: every mandatory control must map before readiness |
| Recovery | [Failure-specific rules](#shared-error-handling-and-recovery-contract), [risks](#11-risks-and-consequences) | R2 safety/operations: bounded retries, no duplicate effects, safe cleanup, human escalation |
| Evidence and limitations | [Experiments](#9-proofs-of-concept-and-experiments), [review record](reviews/WB38-S01.md) | R2 evidence: no measured savings or live publication claim; prior approvals are historical |
| Human acceptance | [Convergence](#13-convergence-gate), [handoff source](#14-workflow-handoff-source) | Owner: no unresolved design choice identified; exact candidate review still required |

## Preserved scope-extension history

The following notes preserve the sequence of owner directions. WB38-R03 formal
Sections 0-14 below reconcile and supersede their pending-synthesis statements.
Earlier adoption-only scope and unchanged-implementation statements are
historical, not current requirements. R02 reviews do not approve R03.

### Governing owner constraint — efficiency without weaker controls

The owner clarified the core objective: minimize unnecessary stops and repeated
full review gates across the lifecycle without reducing quality gates, policy
obligations, approval authority or other necessary safety/dependency gates.

Batching changes when and how related work is prepared and reviewed, not the
assurance required to accept it. Preserve required tests, validation, evidence,
independent challenge, exact-candidate acceptance, human decisions, scope and
ownership checks, and safe sequencing. A mandatory control can be satisfied
within a coherent batch; it cannot silently be omitted or declared passed.
Final design must map every existing mandatory control to its retained check
or approval boundary and justify each removed duplicate interruption. Failed
checks, material changes, unresolved decisions and missing authority still
stop affected work. Minimum stop count alone is not a success criterion.

### Additional owner direction — post-implementation closure

The owner requested the same methodology for post-implementation validation,
archive and cleanup. Include this in the reusable end-to-end design; this is
not permission to archive, delete branches or clean the current runtime now.

- Batch dependency-ready closure evidence, delivery-record preparation,
  retrospective, archive preparation and cleanup planning into a coherent
  closure package rather than separate full reviews per bookkeeping artifact.
- Proposed review boundary: one planned full two-agent closure-package review
  before final closure approval and consequential cleanup. Retain final
  validation and human archive/closure authority; this proposal is subject to
  formal synthesis and owner acceptance.
- Preserve merge, target verification, reconciliation, approved closure and
  archive ordering. Do not claim dependent evidence complete in advance.
- After approval, deterministic archive publication, bidirectional-link checks,
  fresh EMPTY whiteboard creation and authorized cleanup may run as one bounded
  sequence with verification, not a new full review per mechanical step.
- Cleanup must verify exact targets and ownership and retain any required
  branch-deletion permission. Preserve unmerged/user-owned work and recoverable
  evidence; failed verification stops affected cleanup. No broad deletion or
  automatic erasure of history follows from batching authority.
- A material defect or new decision returns affected work to the appropriate
  review boundary; one planned session does not guarantee one review round.

Formal reconciliation must include closure/archive templates, workflow and
runtime cleanup guidance, evidence retention, failure recovery and tests.
Earlier adoption-only and implementation-exclusion statements below are
historical scope snapshots, superseded by these owner additions.

### Additional owner direction — implementation and readiness batching

The owner subsequently agreed that the same batching methodology also applies
to implementation and the preparation between approved planning and the first
task. This supersedes the earlier statement that implementation review rules
remain unchanged; it is proposed policy scope, not active execution authority.

| Area | Direction | Preserved control |
| --- | --- | --- |
| Planning/readiness | Group task specifications, dependencies, context requirements, branch/environment/test preparation and merge-mode decision where dependency-ready | Do not claim runtime/environment facts verified before they are actually checked |
| Pre-start | Recheck current inputs, context, branch, environment and authority immediately before execution | Routine checks do not independently trigger full two-agent review; material mismatch or new decision stops affected work |
| Implementation | One planned full two-agent review per coherent completed PR before merge | Tests and author self-review remain; same-seat consolidated correction rounds may be needed |
| Task grouping | Combine related tasks only when they form a coherent independently testable merge unit | Do not combine unrelated/high-risk changes merely to minimize counts; separate PRs each require review |
| Human authority | Batch discoverable choices and keep exact scoped merge authority explicit | Missing implementation-mode selection cannot be inferred; no blanket automatic merge |

Formal synthesis must reconcile current context-receipt approval rules and
implementation review guidance with these directions. Group as much as safely
possible within real dependency, risk and authority boundaries; do not remove
checks or use stale evidence to eliminate a pause. Earlier R02 approvals remain
historical and do not cover these additions.

On 2026-09-05, after WB38-R02 independent review and before owner conclusion
acceptance, the owner approved extending the efficiency design to the planning
phase. This material addition supersedes the adoption-only gate-reduction
boundary in the formal candidate below. R02 receipts remain historical and
do not approve this expanded candidate. The whiteboard remains CONVERGING;
no downstream generation or implementation is authorized by this note.

| Area | Agreed direction | Retained boundary |
| --- | --- | --- |
| Adoption | One planned full two-agent review of coherent installation package | Owner decisions, exact acceptance and required checks remain |
| Planning | One planned full two-agent review of the combined whiteboard conclusion, handoff, delivery workflow and implementation plan before execution | No full independent review merely for each document boundary |
| Preparation | Use the same dependency-aware provisional batching approach | Missing owner decisions and material scope/risk/authority changes still pause affected work |
| Corrections | Consolidate findings; retain the same two reviewers across rounds | One planned session does not promise one round |
| Implementation | Existing implementation review rules unchanged | Final design approval and task readiness remain required |

Next formalization must reconcile requirements, policy routes, scope, risks,
acceptance evidence and handoff source with this extension. Provisional planning
preparation is proposed future policy, not permission to bypass the currently
installed workflow while delivering this change.

## Conclusion attention table

Read the formal sections in the numbered order below. Both reviewers inspect
the complete candidate; specialties allocate focus, not exclusive ownership.
The preserved discussion is historical context, not the acceptance checklist.

| Order / type | Important item and canonical detail | Review focus | Owner action |
| --- | --- | --- | --- |
| 1 / Scope | [Actors and scope](#3-intake), [authority](#4-authority-and-context) | R1 development/governance; R2 scope completeness | Confirm full-lifecycle efficiency/recovery scope; runtime fixes and Apps excluded |
| 2 / Decisions | [REQ-01 through REQ-12](#6-needs-and-candidate-requirements), [solution and alternatives](#8-candidate-solutions) | Both seats: observable outcomes and preserved decisions | Directions already supplied; exact candidate acceptance remains |
| 3 / Policy | [PG-01 through PG-04](#7-current-system-and-gap-analysis), [applicability](#10-policy-applicability-and-gaps) | R1 governance/compatibility; R2 consumer consistency | Proposed policy changes only; no waiver or active exception |
| 4 / Attention | [Publication, identity, retention, oversized-batch and stale-review risks](#11-risks-and-consequences) | R2 security/PR evidence; R1 authority | Review residual limitations; comments are not other-account approvals or immutable storage |
| 5 / Evidence | [Facts and hypothesis](#5-facts-assumptions-and-unknowns), [experiments](#9-proofs-of-concept-and-experiments), [review evidence](reviews/WB38-S01.md) | R2 tests/performance; both exact-candidate verification | No measured savings or live publishing proof yet; delivery evidence required |
| 6 / Acceptance | [Convergence gate](#13-convergence-gate), [handoff source](#14-workflow-handoff-source) | Both reviewers, then owner | No unresolved design question identified; accept exact candidate after reviewers pass |

## Preserved working discussion draft — adoption efficiency

Captured retrospectively on 2026-09-05 from the owner's discussion in this
task. These are working notes, not an approved conclusion or active policy.
The notes retain discussion history. The formal sections below now supersede
their preparation status; no note is evidence of exact-candidate approval.

### Problem and scope

- Repeated two-agent review gates and revision rounds make adoption slow.
- Long documents and repeated approval requests consume owner attention.
- Discuss issues [38](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/38),
  [37](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/37),
  and [35](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/35)
  together. Runtime reliability issues 33, 34, and 36 remain separate.
- This installation recorded five review sessions and fifteen numbered rounds,
  including final reconciliation; not a cross-project average or measured
  elapsed-time saving.

### Settled owner directions

| Item | Direction | Boundary |
| --- | --- | --- |
| Preparation | Batch related changes and discoverable owner questions | No approval inferred for unseen content |
| Independent review | One planned full review session on the complete PR before merge | Two isolated reviewers; further correction rounds possible |
| Corrections | Collect both reviewers' findings and address them together | Same reviewers inspect revised commit and affected dependencies |
| Publication | Existing account; labeled agent reviewer seats and exact commit | Comments, not formal self-approval or distinct GitHub identities |
| Audit record | PR owns findings, responses and results; documents link it | Proposed retention-policy change; old evidence stays intact |
| Human authority | Preserve current final owner approval before merge | No adoption-policy auto-merge authority |
| Human brief | Table by default: decisions, attention items, recommendations, consequences, evidence | No long prose-only approval request; important risks cannot be omitted |
| GitHub Apps | Defer | No app registration, credential service or hosted automation now |
| Discussion capture | Keep lightweight notes while discussing; synthesize formal conclusion when ready | No need to fill every formal section during conversation |

### Alternatives and corrections retained

- Reviewing before opening the PR was superseded by reviewing the actual PR.
- Creating disposable Apps each session was rejected for initial scope;
  permanent Apps with temporary credentials were also deferred.
- Short checklist was considered; owner ultimately preferred the table.
- One planned review gate does not promise one round or eliminate necessary
  human-decision, safety, failed-check or authority pauses.

### Open items and next step

### Reusable playbook requirement — draft-first discussion

The owner clarified that draft-first discussion must be implemented in the
playbook itself, not merely followed locally by this agent. Include this in
the current design and downstream implementation scope.

- During discussion, persist concise working notes after meaningful exchanges:
  facts, proposals, decisions, rejected alternatives, and unresolved questions.
  Do not require a fully populated formal document at each exchange.
- When material questions and owner decisions are resolved, synthesize the
  draft into a complete formal conclusion candidate. Carry forward rationale,
  alternatives and evidence without silently inventing missing decisions.
- If synthesis exposes a material gap, return to discussion and gather related
  questions together. Absence of open questions alone is not review approval.
- Preserve the required self-review, independent review and human conclusion
  authority before CONCLUDED and downstream handoff generation.
- Update the canonical whiteboard procedure/template and affected workflow
  skill/guidance consistently; demonstrate the draft-to-conclusion path in a
  maintained example and regression checks. This requirement does not change
  the installed runtime pin or waive the current delivery's gates.

### Current progression

No unresolved owner choice is currently identified. The owner requested
discussion closure and progression, then clarified the draft-first process.
Next: synthesize these notes into the formal conclusion candidate, check
completeness and current contracts, and satisfy the existing conclusion review
gate before CONCLUDED or handoff generation. Proposed review reductions do not
approve themselves. No implementation, PR publication, or merge is performed
by this draft capture.

The original neutral copy was accepted under the
[batch authority](installation-batch.md). Installation is complete; this is
the first owner-supplied need, not another installation artifact.

## 0. Whiteboard control

| Field | Value |
| --- | --- |
| Topic | End-to-end playbook efficiency, human review and recovery |
| State | `CONCLUDED` |
| Facilitator/owner | Repository owner |
| Participants/reviewers | Repository owner, author, and two isolated conclusion reviewers |
| Conclusion review state | `APPROVED`; both WB38-R03 reviewers and repository owner |
| Created | 2026-09-05 Asia/Shanghai |
| Last summarized | 2026-09-05 Asia/Shanghai; working discussion draft above |
| Origin | Issues 38, 37 and 35 linked in preserved draft |
| Development policy | [Contributing](../../CONTRIBUTING.md#project-delivery-policy) |
| Generated workflow handoff | [Provisional WB38 handoff](deliveries/WB38/handoff.md) |
| Resulting delivery workflow | [Provisional WB38 workflow](deliveries/WB38/workflow.md) |
| Resulting implementation plan | [Draft WB38 plan](deliveries/WB38/implementation-plan.md) |
| Archive/record | Not archived |

Only one owner-supplied need may occupy this working path. At CONCLUDED, the
accepted content and Section 14 become IMMUTABLE_AFTER_APPROVAL. Downstream
links are MUTABLE_CONTROL; discussion history is APPEND_ONLY_HISTORY. The
workflow owns delivery status. Never reset a concluded need before archival.

## 1. Use and review

Use the pinned whiteboard procedure resolved by the
[registry](project-contracts.md). Record facts separately from assumptions,
proposals, and decisions. Update snapshots and append discussion deltas.
Lifecycle: EMPTY -> OPEN -> EXPLORING -> CONVERGING -> CONCLUDED -> ARCHIVED;
BLOCKED records owner, evidence, prior state, and unblock condition.
Conclusion requires exact self-review, two isolated reviewers, and owner
approval. The owner requested conclusion if clear; exact written candidate
approval follows independent review under the current policy. The proposed
future review changes do not waive this delivery's gates.

## 2. Current snapshot

| Field | Value |
| --- | --- |
| Problem | Repeated full reviews, owner interruptions and duplicate bookkeeping across the playbook lifecycle |
| Required outcome | Fewer coherent review gates, concise owner decision tables and natural draft-first discovery |
| Current candidate | WB38-R03; formal Sections 3-14 below |
| Confidence | Medium: scope is settled; performance and publishing integration still require implementation evidence |
| Material open questions | None |
| Active policy gaps | PG-01 lifecycle review cadence; PG-02 evidence retention; PG-03 draft-first discovery; PG-04 recovery, all routed below |
| Active blocker | None |
| Next discussion/experiment | Review this exact conclusion candidate, then obtain owner acceptance |

## 3. Intake

| Actor | Current difficulty | Required outcome |
| --- | --- | --- |
| Owner | Repeated confirmations and long documents | Batched substantive choices and a concise final acceptance table |
| Author | Separate review sessions for minor related artifacts | Prepare a dependency-aware provisional package and consolidate corrections |
| Reviewers | Repeated investigation and fragmented fixes | One full initial PR review, retained seats, affected-delta re-review |
| Maintainer | Duplicated review histories | Trace findings, responses and reviewed commits through the PR |

In scope: issues 38/37 efficiency and issue 35 decision-focused handoffs,
extended by owner direction to adoption, discovery/planning, implementation
readiness, implementation, validation, archive and cleanup. Apply the same
batching principle and recovery framework across these phases and upgrade or
urgent-fix workflows. This does not grant exceptions to their authority or
cutover requirements. Draft-first discovery and table-based human review are
shared reusable behavior. Runtime defects 33/34/36 remain a separate delivery.

Out of scope: runtime issues 33/34/36, GitHub App registration or services, new
credentials, automatic adoption-policy merge, deleting past review evidence,
or silently upgrading installed consumers. Existing-account PR comments are
the selected initial publication path.

## 4. Authority and context

Use [registry](project-contracts.md), [manifest](project-adoption-manifest.md),
[Contributing](../../CONTRIBUTING.md), and
[quality policy](../../docs/documentation-quality-policy.md). Topic-specific
sources: issues linked above and the owner decisions in Section 12. Current
policy remains normative; proposed behavior must be formalized through its
owning authorities before use. Runtime source remains pinned at
d213114f99dc2186d6f4e50a85fe962de0e1afa9; candidate base is
4f44eff2ca4468b75069bdb2b47a5b681bb888b7.

[Template governance](../../docs/template-governance.md) governs compatibility,
schema changes and reviewed migration. The pinned whiteboard and review
templates govern this conclusion. GitHub's
[review rules](https://docs.github.com/en/pull-requests/how-tos/review-pull-requests/approving-a-pull-request-with-required-reviews)
state that PR authors cannot approve their own PRs; verified during discussion
on 2026-09-05. Same-account comments do not satisfy other-identity protections.

## 5. Facts, assumptions, and unknowns

| ID | Kind | Statement | Evidence / disposition |
| --- | --- | --- | --- |
| F-01 | Fact | Five installation sessions contain 15 numbered rounds: 5+3+2+1+4 | A01-A04 and B01 records under reviews; supplemental receipts are not counted as new numbered rounds |
| F-02 | Fact | Current policy requires two isolated reviewers and human approval at design gates | Contributing and pinned workflow skill |
| F-03 | Reported experience | Owner estimated some sessions take 10-30 minutes | Anecdotal, not instrumented timing or population average |
| A-01 | Hypothesis | Batching reduces total effort | Validate with baseline/revised traces; no guaranteed speedup |
| Q-01 | Engineering evidence | Live inline publishing and revision routing are not yet demonstrated by this solution | Test before implementation acceptance; no additional owner design choice currently needed |

## 6. Needs and candidate requirements

All rows are MUST candidates until conclusion.

| ID | Observable requirement | Acceptance evidence |
| --- | --- | --- |
| REQ-01 | Batch discoverable owner choices with options, recommendation, consequence and evidence | Multiple related questions in one brief; preparation authority distinguished from exact acceptance |
| REQ-02 | Prepare coherent provisional adoption artifacts without per-file review stops | Multi-artifact fixture reaches one planned full-package PR review session; dependent drafts bind input versions |
| REQ-03 | Two isolated seats review actual PR before merge | Both results bind repository, PR, round and exact commit; later material changes invalidate acceptance |
| REQ-04 | Consolidate both reviewers' findings and revisions | Same seats verify consolidated correction delta and affected dependencies; broader inspection remains possible |
| REQ-05 | PR owns new review findings/responses; documents retain pointers | Attributable inline/summary comments and accepted revision link; no copied comment ledger; historic ledgers preserved |
| REQ-06 | Use existing account without claiming distinct actors | Agent-generated seat labels and textual pass/changes-needed; no formal self-approval or protection bypass |
| REQ-07 | Human brief defaults to table | Stable ID, decision/attention category, question/context, recommendation/options, impact, response and evidence links; no unresolved choices explicitly stated |
| REQ-08 | Keep final owner acceptance and scoped merge authority | Failed checks, missing authority, conflicts, unresolved findings or changed scope prevent merge |
| REQ-09 | Routine verification/bookkeeping does not reopen full review | Authorized control-only post-merge work checked mechanically; material changes return to review |
| REQ-10 | Persist lightweight discussion drafts and synthesize formally when ready | Example captures facts/options/decisions/questions incrementally, then complete conclusion candidate; synthesis gap returns to discussion |
| REQ-11 | Maintain safety, evidence and compatibility | Tests cover changed prerequisites, partial rejection, absent authority, drift and recovery; version/migration notes for changed meanings |
| REQ-12 | Measure adoption efficiency honestly | Compare session/round counts, reviewer effort, interruptions and repeated checks on representative new/existing projects; separate external waiting |
| REQ-13 | Batch planning into one coherent pre-implementation package | Combined whiteboard conclusion, handoff, workflow and plan receive one planned full two-agent review before execution; draft dependencies remain provisional until acceptance |
| REQ-14 | Batch readiness and review implementation per coherent PR | Context/specification decisions covered by planning; fresh pre-start verification retained; coding/tests/self-review do not each open full sessions; each independent PR reviewed before merge |
| REQ-15 | Batch post-implementation validation and closure | One planned full closure-package review covers validation evidence, delivery record, retrospective and archive/cleanup plan; approved mechanical completion retains ordered checks and ownership |
| REQ-16 | Apply failure-specific recovery across every phase | Section 8 recovery cases demonstrated; preserve valid work, invalidate affected dependencies, no blind write retry or automatic approval after exhaustion |
| REQ-17 | Preserve all required assurance while reducing interruptions | Inventory each existing mandatory control, canonical owner, retained evidence/approval point and changed cadence; justify every removed duplicate session; unmapped control blocks readiness |
| REQ-18 | Measure full-lifecycle improvement, not only adoption | Extend REQ-12 metrics to planning, readiness, implementation and closure; classify exceptions/recovery, tool calls and cost where available; report unmeasured values honestly |

YAGNI: defer GitHub Apps and hosted automation under owner direction; preserve
existing authentication. No invented numeric time target. No new product
database, billing, or domain policy is needed.

## 7. Current system and gap analysis

| Gap | Current behavior | Owning change route |
| --- | --- | --- |
| PG-01 | Per-artifact review/approval cadence and repeated task/closure gates | Adoption and delivery runbooks/skills, context receipt, handoff/workflow/plan/archive templates, schema/checkers and shared review guidance |
| PG-02 | Permanent Git review evidence and duplicated comments | Quality retention policy and review protocol; explicit PR-primary evidence semantics |
| PG-03 | Structured whiteboard instructions do not clearly permit lightweight draft mode | Whiteboard template/procedure and workflow skill, with formal synthesis gate |
| G-04 | Human attention guidance lacks the selected table contract | Shared brief guidance and relevant templates/examples |
| PG-04 | Recovery rules fragmented across phase boundaries | Shared recovery contract referenced by phase owners, with current stricter safety/authority rules preserved |

These systemic changes must update existing canonical authorities, not create
a competing informal policy. Current contracts govern this delivery until
reviewed changes take effect. No implementation readiness is claimed.

## 8. Candidate solutions

Preferred: collect owner choices, prepare coherent adoption package, run
self-checks, open PR, obtain two independent reviews, consolidate fixes, then
present exact-package owner acceptance table. After authorized merge, validate
target and reconcile control state. Keep live state canonical, and review
material changes without restarting unaffected evidence.

### Shared lifecycle batch model

| Phase | Coherent review unit | Controls retained before crossing boundary |
| --- | --- | --- |
| Adoption | Complete installation package on PR | Authority mapping, required checks, two independent reviewers, owner exact acceptance, merge and target verification |
| Discovery/planning | Formal conclusion, handoff, workflow and implementation plan together | Lightweight discussion notes; all drafts bind provisional input versions; accepted dependency graph and human design approval before execution |
| Readiness | Planning decisions plus fresh pre-start verification | Complete task specification, current context/dependencies, branch/environment/test readiness and explicit implementation mode; no prediction of future verification |
| Implementation | One coherent independently testable PR, possibly related tasks | Tests, self-review, two-agent PR review, same-seat corrections, current checks and applicable human/merge authority |
| Validation/closure | Final validation evidence, delivery record, retrospective and archive/cleanup plan | All tasks terminal as required, target integration verified, pending post-merge human reviews resolved, validation and closure human approval |
| Approved closure mechanics | Bounded archive publication, link checks, fresh whiteboard and authorized cleanup | Verify archive and bidirectional links before replacement; exact ownership/deletion authority; preserve unrelated or unmerged work |
| Upgrades/urgent fixes | Dependency-ready coherent package within existing special workflow | Preserve current pin until authorized cutover, required security/emergency authority, rollback evidence and any mandatory follow-up |

One planned session is a baseline for a coherent unit, not a guarantee of one
round or permission to combine incompatible authority/risk boundaries. Full
review cadence may consolidate; required semantic approval, checks and evidence
remain mapped. Human choice pauses are batched where possible but urgent safety
stops are immediate. Failed readiness or changed contracts return affected work
to the owning decision/review gate. Related tasks may share a PR only when
independently testable together; ordinary WIP and feature integration rules stay.

### Control-preservation mapping

| Existing obligation | Proposed satisfaction point | Prohibited shortcut |
| --- | --- | --- |
| Authority/routing and semantic decisions | Batched decision brief and exact package acceptance | Approving unseen content or silently selecting owner choices |
| Independent challenge and self-review | Complete coherent candidate, then same-seat affected-delta rounds | Removing either reviewer or changing seats to obtain approval |
| Current context and dependencies | Substantive planning review plus recorded fresh execution-time verification | Reusing stale facts or skipping checks because plan passed |
| Required tests, final validation and failure evidence | Appropriate execution points plus final required gates | Discarding failures, narrowing mandatory coverage or inventing passes |
| Human merge/design/archive authority | Explicit applicable acceptance recorded for exact scope | Extending implementation auto-merge to policy, validation or archive |
| Safe archival/deletion/cutover | Approved plan followed by verified ordered mechanics | Deleting before evidence/ownership validation or changing pin early |

The implementation plan must expand this family-level map into a complete
inventory of affected canonical clauses and checker assertions before readiness.
Any control that cannot be mapped returns to the owner; it is not assumed
redundant. This is required implementation specification work, not proof already
completed by this conclusion.

### Shared error-handling and recovery contract

| Case | Recovery rule | Escalation / stopping condition |
| --- | --- | --- |
| Interrupted execution | Restore last durable checkpoint; compare actual files, revisions and completed external effects; retain valid work | Unknown state or authority cannot be reconstructed safely |
| Transient tool/network failure | Bounded retries; inspect whether writes already succeeded; reconcile partial success before retry | Exhaustion or ambiguity with no safe alternative; never retry until apparent success erases failure |
| Failed quality gate | Classify cause, correct responsible layer, rerun affected and all required final checks; preserve original failure | New scope/policy/risk decision or unresolved defect |
| Partial batch rejection | Retain unaffected work and evidence; revise rejected items and transitively invalidate dependants | Changed owner decision or unresolved acceptance conflict |
| Input/head drift | Recompute affected dependencies and review/check validity against exact revision | Material outcome/authority mismatch; stale acceptance cannot permit merge |
| Non-converging review | Consolidate unresolved findings and identify disputed contract; stop repetitive rounds | Human resolves trade-off/conflict; bounded loop never means automatic pass |
| Archive/cleanup failure | Stop affected destructive action; preserve evidence and recover from verified checkpoint | Ownership, safe recovery or required deletion authority missing |

One canonical checkpoint records failure classification, last verified state,
affected scope, valid/invalidated evidence, side effects, owner and next action.
Human escalations group related decisions in a table, except urgent safety
issues cannot wait for batching. Specific stronger phase policies prevail.
Retry and no-progress bounds must be explicitly defined in the approved plan or
existing governing configuration before automation; no unsupported numeric
limit is chosen here. Reaching a bound escalates, never waives acceptance.

| Alternative | Disposition | Reason |
| --- | --- | --- |
| Full review before PR | SUPERSEDED | Owner prefers inspection of actual PR and inline audit trail |
| Per-artifact adoption gate | REJECTED for proposed path | Observed overhead; still current policy until changed |
| Disposable Apps per session | REJECTED for initial scope | Repeated provisioning overhead |
| Permanent reviewer Apps | DEFERRED | Unnecessary credential/service complexity now |
| Adoption-policy automatic merge | REJECTED | Owner retained current final approval policy |

Coordinator owns publishing: check exact repository/PR/commit and line anchors,
collect both receipts, reconcile partial publication before retry and avoid
duplicate comments. Missing access/evidence fails closed. Agents keep private
credentials out of prompts and treat PR content as untrusted data. No always-on
service is required by this design. Reviewer completion resumes the original
coordinator; it does not authorize new external actions.

Draft-first discovery keeps concise evolving notes in the working whiteboard.
After material questions resolve, synthesize complete formal sections while
preserving rejected options and rationale. No-open-questions is readiness for
review, not automatic CONCLUDED. Material gaps reopen discussion.

## 9. Proofs of concept and experiments

No PoC performed; none is required to select this documentation/workflow
direction. Before delivery acceptance, require isolated positive/negative
fixtures for scope, authority, dependency invalidation, partial rejection,
commit drift and publication recovery, plus an authorized live PR demonstration
of inline publication. Mocks do not prove live authentication. Record baseline
and revised traces; no performance saving is claimed before measurement.

Extend scenarios through planning, context verification, task PRs, closure,
upgrade recovery and urgent-fix authority. Cover interruption after an external
write, partial rejection, repeated disagreement, failed ownership checks and
unavailable audit evidence. Assert no duplicate publication, premature handoff
consumption, task start, archive reset, cleanup or pin cutover. Required controls
must still fail when their preconditions are absent. Evidence reuse must bind
source, tool and configuration identities; compare total effort as well as
session counts, without weakening quality to improve the reported metric.

## 10. Policy applicability and gaps

| Domain | Applicability / disposition |
| --- | --- |
| Testing | Full current documentation suite; future behavior requires named positive/negative assertions |
| Security/API | Existing-account external comments, untrusted PR content, no leaked credentials or identity misrepresentation |
| Concurrency/retry | Read-only reviewers; coordinator reconciles exact head and partial publishing before retries |
| Retention | PG-02 requires policy update; PR comments are not immutable storage; missing evidence blocks approval |
| Performance | Measure adoption effort; no unsupported latency or savings target |
| Migration/recovery | Preserve existing pins/history; classify breaking schema/meaning changes and supply version/migration guidance; reviewed revert on defects |
| Product data/billing | Not applicable: no such application boundary |

Policy gaps PG-01 through PG-04 have canonical owners in Section 7 and block
implementation readiness until formalized; they do not leave the intended
solution ambiguous. This conclusion does not itself activate those changes.

## 11. Risks and consequences

| Risk | Prevention / recovery | Owner |
| --- | --- | --- |
| Oversized batch hides defects | Coherent scope, full initial review, split on material scope/authority/risk boundary | Author/reviewers |
| Table omits important choices | Inventory complete artifact; link all material decisions, exceptions and risks | Reviewers |
| Old approval applied to new commit | Exact candidate binding and re-review; verify before merge | Coordinator |
| Same-account comments mistaken for independent GitHub approval | Explicit agent-seat labels; preserve human/protection requirements | Coordinator |
| PR evidence unavailable or mutable | Durable PR/revision pointer, fail closed on unavailable evidence, preserve historic Git records | Maintainer |
| New policy approves itself | Current pinned workflow remains active for this delivery | Maintainer |
| Batching hides an unsatisfied control | Complete clause/assertion preservation inventory; unmet controls block readiness | Policy owner/reviewers |
| Recovery repeats external effects or destroys evidence | Checkpoint and reconciliation, bounded retries, ownership checks and escalation | Coordinator/maintainer |

Residual risks are presented for owner exact-candidate acceptance; no live
GitHub availability or speed guarantee is made.

## 12. Discussion and decision history

Preserved draft above retains discussion deltas. On 2026-09-05 the owner
selected batching, PR-centered review, same-account labeled comments, existing
merge policy and table-default human briefs, then added reusable draft-first
discussion. Requests to conclude authorize synthesis and review, not a claim
that reviewers examined future text. Subsequent decisions append with stable
IDs; settled directions map to REQ-01 through REQ-12.

Later owner directions extend that set: D-13 accepts shared planning batching;
D-14 extends to readiness and implementation; D-15 includes validation/archive/
cleanup; D-16 requires no weaker quality, authority or safety controls; D-17
accepts phase-wide failure-specific recovery and requests formal regeneration.
These map to REQ-13 through REQ-18 and supersede earlier scope exclusions,
without deleting the earlier discussion or claiming R02 approval applies.

## 13. Convergence gate

Problem, actors, scope, observable requirements, alternatives, YAGNI, policy
routes and risks are captured. No unresolved owner design choice is identified.
Performance/publication validation remains implementation evidence, not a
claimed completed experiment. Exact self-review and independent receipts belong
in [the conclusion review record](reviews/WB38-S01.md). The candidate remains
CONVERGING until both reviewers approve and the owner accepts that exact
candidate. Handoff generation is not yet authorized.

## 14. Workflow-handoff source

Candidate source, to become accepted/frozen only after conclusion:

- Outcome: reduce full-lifecycle review and owner-reading overhead without weakening
  authority, independent challenge or traceable evidence.
- Requirements: REQ-01 through REQ-18 in Section 6.
- Solution: Section 8 shared lifecycle batches, same-account attributed
  comments, human table, draft-first synthesis and failure-specific recovery.
- Contracts: PG-01/02/03/04 plus human-brief guidance; preserve final approval,
  failure stops, dependency/commit binding, retention and migration rules.
- Delivery boundaries: formalize governing policy/schema changes before their
  consumers; update affected skills/templates/runbooks/examples consistently;
  select tooling and task topology through the reviewed delivery workflow.
- Evidence: Section 9 tests, full checks, live authorized publication example
  and comparative trace; no numeric savings promise.
- Deferred work: owner retains runtime issues 33/34/36 separately; GitHub Apps
  deferred under the lead efficiency issue and preserved decision history.
- Next artifact: registry-defined handoff from this source after approved
  conclusion, followed by delivery workflow and selected implementation plan.

Only after approved conclusion may a handoff derive from this frozen section;
material unresolved design returns the whiteboard to exploration.

## 15. Archive instruction

Follow the [archive contract](archive/README.md) after the resulting delivery
closes. Verify archived whiteboard and record links before replacing the stable
path with an EMPTY copy. Do not overwrite this active need with runtime work.
