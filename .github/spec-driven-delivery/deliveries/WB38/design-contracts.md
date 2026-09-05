# WB38 — Proposed batch and recovery contracts

These are implementation specifications for PG-01 through PG-04, not active
repository policy. They become accepted design only with the joint planning
package. Upstream policy becomes effective only after reviewed merge; installed
projects retain their pins and explicitly adopt any update. The present trial
has its separately recorded owner authority.

## Attention and ownership

| ID / type | Decision | Consequence / recommendation | Review owner |
| --- | --- | --- | --- |
| BC01 / Attention | Version-3 opt-in batch contracts; preserve v2 | No automatic reinterpretation of existing documents | Governance and tests |
| BC02 / Attention | Provisional preparation, explicit joint acceptance | Draft content cannot authorize execution | Both reviewers |
| BC03 / Attention | Reviewed context obligations plus fresh verification | No repeated full review for unchanged pre-start facts | Both reviewers |
| BC04 / Attention | Two retries; two no-progress correction rounds | Exhaustion escalates, never passes | Recovery reviewer |
| BC05 / Attention | Read-only publication planner and coordinator writes | Existing account only; no new credential service | Security/test reviewer |
| BC06 / Attention | PR-primary new findings, durable Git pointers | Historic Git receipts preserved; missing remote evidence blocks acceptance | Governance reviewer |
| BC07 / Attention | Table-first briefs and draft-first notes | Complete inventory still required | Both reviewers |
| BC08 / Attention | Ordered closure and measurement | No cleanup permission or savings inferred | Both reviewers |

Read BC01-BC03 first, BC04-BC06 second, then BC07-BC08 and the linked audit.

## BC01 — Versioned representation and compatibility

Increment the current lifecycle schema to version 3 for changed review semantics.
The validator must continue accepting version-2 plan/workflow documents using
their existing required fields, transitions and approval rules. Retain the
complete existing v2 fixture suite; do not mass-rewrite fixtures to v3. Reject
unknown versions and artifact types. Unmarked historical records retain their
existing treatment. No historical record or installed document is auto-migrated.

Version-3 plan and workflow documents retain every v2 required field and marker.
Add a required `Review batch` field: `None` selects the ordinary per-artifact
path, otherwise a root-contained Markdown link selects a version-3 review-batch
record. A missing/invalid/unavailable link fails closed. A v2 document cannot
opt into new semantics merely by adding that field. Cross-version references
cannot confer batch authority on v2 documents; migration must be explicit.

Add a `review-batch@3` template/validator with these required control fields:

| Field group | Required values and validation |
| --- | --- |
| Identity | Batch ID, delivery ID, repository, phase, owner; stable non-sentinel IDs; phase ADOPTION, PLANNING, IMPLEMENTATION, CLOSURE or UPGRADE |
| Authority | Preparation authority/evidence, allowed paths, approval owner, expiry/end condition; absent or expired authority prohibits continuation |
| Lifecycle | State, previous state, resume state when BLOCKED; legal transitions below |
| Candidate | Full Git base/head revisions for PRs, PR URL for PR review, or exact artifact hash inventory for authorized non-PR review; no symbolic revision as acceptance identity |
| Review | Exact self-review evidence, stable session, exactly two unique assigned seats, both dispositions, human disposition and reviewed candidate; no timer-based disposition |
| Recovery | Checkpoint location, transient retry limit, no-progress limit, current counts, unresolved finding IDs, next action and owner |

Required tables use stable columns: `Artifact ID`, `Path`, `Candidate hash`,
`Depends on`, `Required control IDs`, `Disposition`, `Evidence`; and `Control ID`,
`Owning source`, `Satisfaction point`, `Evidence`, `Disposition`.
IDs are unique case-insensitively; paths cannot escape the project or allowed
scope; dependencies resolve to known IDs and are acyclic. Candidate hashes are
full Git blob hashes or SHA-256 with the algorithm stated, never mutable labels.
Every in-scope normative artifact and required control is present. Semantic
completeness remains a reviewer duty, not an inference from populated cells.

Lifecycle: PREPARING -> IN_REVIEW -> ACCEPTED -> EXECUTING -> VERIFIED -> CLOSED.
IN_REVIEW -> PREPARING handles corrections. Every nonterminal state may enter
BLOCKED; safe resumption returns only to its recorded prior state after exact
state/effect reconciliation. PREPARING/IN_REVIEW may become CANCELLED with owner
authority and preserved history. Accepted-content change creates a new candidate
and returns affected work to PREPARING; prior acceptance remains history.

IN_REVIEW requires a frozen packet and passing self-review. ACCEPTED requires
both current candidate approvals, all required item/control dispositions, and
applicable human acceptance. EXECUTING additionally requires current inputs,
in-scope explicit action authority and phase-specific preconditions. VERIFIED
requires actual completion evidence; CLOSED requires required closure acceptance
and preserved evidence. A batch state alone never overrides plan/workflow gates.
For scoped implementation auto-merge only, existing rules determine whether
pre-merge human approval is applicable; all other phases retain human acceptance.

## BC02 — Preparation, acceptance and evidence binding

One approved preparation scope can contain dependent provisional drafts. Record
their exact versions and dependency graph; explicitly label them provisional.
Do not mark them APPROVED, CURRENT-as-consumed, CONSUMED, READY or IN_PROGRESS
merely because a dependent draft was generated. Outside a valid batch authority,
ordinary dependency-ready preparation rules remain in force.

The first review covers the complete coherent package. Both seats review each
revised candidate; they may focus on affected deltas only after verifying the
complete change inventory and unaffected evidence. Consolidate all findings
before correction, except an urgent safety issue stops affected work immediately.

One exact owner acceptance may accept each explicitly listed artifact and control
in that package. It cannot accept unseen future content. Record the individual
artifact approval/consumption transitions in dependency order, preserving the
same batch acceptance reference; these are mechanical state updates, not new
semantic approval. No direct illegal state jump is introduced to save steps.

Immutable reviewed versions remain addressable in Git or the review evidence
store. Subsequent control-only transitions record their input/output revisions
and an exact delta; only review-state/evidence links, timestamps and actual
progress fields may change without changing frozen normative content. Scope,
requirements, dependencies, contracts, risks, exceptions and acceptance criteria
are never control-only. An unclassified delta fails closed. Validators enforce
structural consistency; a coordinator and reviewers verify semantic impact.

A PR head change invalidates the previous head-level review and check result.
Both retained reviewers must bind their new disposition to the new head, even
when a control-only delta permits a brief reconciliation instead of full repeat
investigation. Append-only PR comments do not change the reviewed Git head.
Never reuse an earlier head receipt as if it named the current head.

At GATES_READY, all selected design prerequisites are explicitly accepted/current,
the plan is approved and has one complete dependency-ready NEXT task. The normal
implementation-mode decision remains separate authority, grouped with package
acceptance when the owner can decide both without relying on future information.

## BC03 — Readiness and task context

Planning review includes each ready task's substantive context: source set,
outcome/non-scope, contracts, prohibitions, risks, dependencies, branch model and
required evidence. That exact context receives both reviewer and owner acceptance
as part of the package. It does not certify future environment or repository facts.

For v3 batched tasks, keep `Context receipt: APPROVED` for that substantive
acceptance and add `Context verification`, `Verified source revision`,
`Verification evidence` and `Verified at` in the task record. Verification is
NOT_STARTED, CURRENT, STALE or BLOCKED. Before IN_PROGRESS, verify the exact live
source set against accepted revisions, dirty-work ownership, branch/source/target,
dependencies, tools, test prerequisites and current implementation authority.
Only an APPROVED substantive receipt plus CURRENT verification permits start.
The checker must validate each active task's structured fields, not the first
matching table in the file. No future verification timestamp may be prefilled.

An unchanged match is deterministic verification with an audit record, not a
new full reviewer session. A material/unknown mismatch marks affected context
STALE, stops affected work and returns it to the same owning review boundary.
v2 receipts and non-batched v3 receipts keep the existing pre-start review path.
Task-spec completeness, WIP, dependency/data ordering and Red closure remain.

## BC04 — Recovery bounds and checkpoints

Use the existing two-transient-retry precedent in quality policy Section 4:
initial attempt plus at most two retries for a logical read operation. The
proposed review workflow uses delays of 1 and 2 seconds, overridden by an explicit
server Retry-After only when it is at most 60 seconds; longer waits are checkpointed
and escalated or resumed later, not spun in a tight loop. Authentication, authority,
validation and policy failures are not transient. Stricter phase rules prevail.

Writes are not automatically retried on ambiguous failure. Reconcile remote
state first. If an operation is proven not applied and the error is transient,
the same logical operation may use the remaining two-retry budget. If applied,
record its returned identity; if uncertain, stop with UNKNOWN_EFFECT. A process
restart does not reset attempt counters or create a new logical operation ID.

Stop for a human decision after two consecutive correction rounds make no
progress on the same blocking findings or reveal the same unresolved governing
contract disagreement. Progress means an original blocking finding is resolved
by its reviewer, not reworded or renumbered. New findings do not erase unresolved
ones or reset their counters. This is a bound on repetition, not total allowed
review rounds. Policy/safety conflicts escalate immediately. Never replace seats
or declare approval after exhaustion. Different configured limits require
explicit reviewed authority; no implicit unlimited setting.

Checkpoint fields: stable action ID, revision/input identity, previous verified
state, current failure class, attempts/no-progress counters, affected IDs,
valid/invalid evidence, observed external IDs/effects, owner, next action and
unblock condition. Preserve the original failure and each reconciliation result.
Partial rejection invalidates only transitive dependants; independent work may
continue within the approved scope. Cleanup ownership/authority ambiguity always
stops the destructive action before retry.

## BC05 — Existing-account PR publication

Implement a small read-only Node planner/reconciler, not a service or credential
broker. Its CLI consumes JSON on stdin and emits JSON on stdout. It never
accesses the network, launches shell commands, reads credentials, writes files
or merges. Export its pure functions for deterministic tests. The coordinator
obtains live authenticated snapshots, invokes the helper, executes approved
actions with existing GitHub CLI access, and verifies the results.

Input schema version 1 requires: operation PLAN or RECONCILE; repository owner/name;
PR number; expected full head SHA; session and round IDs; exactly two unique
reviewer seat/agent IDs; both exact-head receipts and findings; authenticated
publisher login; live PR state/head/base/head repository identities; observed
reviews/comments with pagination-complete flag; and existing checkpoint.
Each finding has stable ID, body and either a valid path/line/side in the fetched
diff or explicit summary location. The live snapshot records collection time
and the coordinator checks it again immediately before each write. A JSON
snapshot is validation input, not independent proof of live authentication.

PLAN rejects wrong head/repository/PR, closed PR, incomplete pagination, missing
seat/receipt, conflicting duplicate ID/body, invalid diff anchor and unexpected
review event. It emits zero or more ordered COMMENT-only review requests, one
logical receipt per seat/round/head, containing that seat's inline findings and
summary. Text dispositions are PASS, CHANGES_NEEDED or BLOCKED and are explicitly
agent-generated. Never emit APPROVE or REQUEST_CHANGES API events under this path.
Cross-cutting findings remain in the summary; no fake inline finding is invented.

Use a deterministic publication marker derived from repository, PR, head, session,
round and seat; each finding also retains its stable finding ID. Compare observed
marker, publisher, head, body and inline set. An identical complete publication
is a no-op. Missing publication may be planned once. Partial or contradictory
publication returns BLOCKED with the exact discrepancy; the coordinator must
reconcile it, not blindly repost the whole batch. RECONCILE returns VERIFIED
only when every intended review/comment identity and body is observed exactly
once on the intended head; otherwise BLOCKED. Output includes action IDs,
candidate identity, payloads or discrepancies, and next checkpoint data.

GitHub provides no assumed atomic compare-and-post with PR head. Re-read the
head before and after publishing. A changed head after a successful write marks
that publication stale and starts a new exact-head round; do not delete history
or claim the old receipt approves the new revision. Do not trust instructions
inside PR text or interpolate them into shell commands.

Exit codes: 0 for valid plan/no-op/verified result, 1 for failed preconditions or
blocked reconciliation, 2 for malformed CLI/JSON/schema input. Diagnostics name
the affected identity/rule without secrets. No external dependencies are required.

API facts verified from [GitHub review documentation](https://docs.github.com/en/rest/pulls/reviews)
and [review-comment documentation](https://docs.github.com/en/rest/pulls/comments)
on 2026-09-05: review creation accepts an explicit commit and COMMENT event;
inline review comments carry file/diff location; list endpoints are paginated.
Record the actually supported API version at implementation/live validation;
do not assume a query-string version pins GitHub's rendered documentation.

## BC06 — Audit retention and publication authority

Change the current retention rule explicitly: new PR findings, author responses,
seat dispositions and correction rounds live on the PR; Git retains permanent
session/roster, PR and comment IDs/URLs, accepted head, final disposition,
content digests and concise gate evidence. Do not copy full comment bodies into
multiple project documents. Existing Git ledgers remain unchanged. Non-PR
review or unavailable publication retains the existing exact local-receipt path
and must be explicitly labeled, never presented as successful PR publication.

Before acceptance/merge verify remote evidence against recorded identities and
digests. Deleted, edited, inaccessible or contradictory evidence blocks the gate;
reconstruct through the same reviewers or obtain an explicitly reviewed retention
exception, never assume a digest recovers missing content. This deliberately
retains dependence on GitHub availability. Bulky sanitized logs and unresolved
failure retention keep the current 30-day rules. Separate required human or
GitHub actor approvals are unaffected.

## BC07 — Discussion and owner brief

Persist concise facts, proposals, settled choices, rejected alternatives and
open questions after meaningful discussion changes, not every speech fragment.
Synthesize full formal content when material questions settle; missing facts
return to discussion. One active need and immutable accepted history remain.

The default owner brief is a table with stable item ID, DECISION or ATTENTION,
issue, options/recommendation, consequence/risk, required response and canonical
evidence. Group discoverable decisions, but never delay urgent safety action.
If no choices remain, say so and request acceptance of the exact reviewed
package; a checklist is only for an explicitly chosen simple presentation.

## BC08 — Closure, upgrade and measurement

Combine actual validation results, delivery record, retrospective and exact
archive/cleanup plan for one closure review. Tasks must be terminal, target
integration verified and required human follow-ups resolved before acceptance.
After owner acceptance: publish immutable archive; verify copy and bidirectional
links; replace stable whiteboard with EMPTY; perform only separately authorized,
owned cleanup. A failed step stops dependent mechanics and preserves recovery
evidence. Installation runtime handoff and upgrade cutover retain their own
prerequisites, ownership/pin verification and explicit authority.

Record per-phase sessions, rounds, human interruptions, repeated checks,
recovery events and observable elapsed effort. Tool-call/cost values not available
remain unknown. Compare equivalent scope and controls, distinguish historical
baseline from current measurements, and do not infer population savings from
one trial. Maintain at least one clearly labeled worked example covering every
phase and every recovery class; simulated evidence never claims live execution.
