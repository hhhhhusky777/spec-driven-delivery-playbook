# Simulated batched delivery

This is an instructional scenario, not a record of executed work, real approval
or measured time savings. The simulated project explicitly adopts the
[batch contract](../../docs/batch-review-and-recovery.md). Production evidence
must come from the actual repository, identities and revisions.

## Lifecycle walkthrough

| Phase | Simulated action | Preserved gate / evidence |
| --- | --- | --- |
| Adoption | Inventory authorities and assemble policies, navigation and neutral whiteboard in one package | Conformance, exact pin, two reviewers and owner acceptance before installation; runtime handoff verified |
| Discussion | Save meaningful facts, proposals, rejected alternatives and questions | One active need; no conclusion until material questions settle |
| Planning | Synthesize conclusion, handoff, route, contracts and task plan together | Two-agent exact-package review; owner accepts named inputs, not future outputs |
| Readiness | Check the graph during planning; perform one fresh check just before coding | Accepted context, dependencies, branch/PR, environment, tests, permissions and merge mode all present |
| Implementation | Complete related changes, tests and self-review; review actual PR once | Two isolated retained seats, exact-head comments, owner merge approval; no self-approval |
| Corrections | Combine findings, fix affected scope and return revised head to both seats | Old findings preserved; delta review may be focused but exact-head evidence refreshed |
| Validation | Verify completed tasks and integration with actual checks | No future task repairs an intentionally failing merge; all human follow-ups resolved |
| Closure | Review validation, record, retrospective and archive plan together | Owner accepts actual evidence and exact archive targets |
| Archive/cleanup | Copy immutable conclusion, verify bidirectional links, reset EMPTY, then authorized cleanup | Stop dependent operations on failure; never erase unowned or unmerged work |
| Upgrade | Between tasks, prepare assessed migration while retaining old pin | Two-agent review, owner acceptance, migration tests and explicit cutover; verified rollback available |
| Urgent fix | Escalate immediately under emergency policy | Minimum checks, owner authority, rollback and dated follow-up retained |

For a two-task feature, task PRs target the feature integration branch; only the
final validated feature PR targets main. Task two's current specification does
not mean task one's implementation is complete. Future result obligations stay
separate from readiness inputs, preserving their dependency and acceptance gates.

## Recovery walkthrough

| Event | Simulated handling | What must not happen |
| --- | --- | --- |
| Transient read timeout | Preserve first failure; retries after 1 then 2 seconds | Unlimited retries or retrying authentication failure |
| Long Retry-After | Record checkpoint and resume later with remaining budget | Tight polling or resetting attempts |
| Unknown comment-write result | Read all remote comments and verify marker/head/body | Blind duplicate publication |
| Partial publication | Preserve returned IDs; reconcile missing/conflicting effects | Claiming full publication or deleting history |
| Failed test | Diagnose the responsible layer, fix, rerun required suite | Weakening assertion to get green |
| Rejected item | Invalidate only dependent evidence, retain independent valid work | Restarting every task or silently dropping the item |
| Interrupted session | Recover exact action ID, source and counters; inspect actual effects | Assuming earlier writes failed or succeeded |
| Two no-progress rounds | Return original disputed findings to owner with options | Auto-pass, renumber findings or replace reviewers for approval |
| Changed context | Stop affected task and return material mismatch to its owning review | Treating an old receipt as current |
| Missing PR evidence | Restore through the same reviewers or reviewed exception | Treating a digest as replacement content |
| Unclear cleanup ownership | Stop before deletion and preserve evidence | Broad cleanup or removal of user work |

## Human brief example

These worked briefs follow the
[phase-specific brief contract](../../docs/documentation-quality-policy.md#26-attention-and-reviewability-gate).
All versions, tasks, results and owners below are fictional instructional data,
not evidence or authority for a real project.

### Simulated adoption acceptance

| ID / type | Important item | Recommendation / consequence | Required response / evidence |
| --- | --- | --- | --- |
| A01 / ATTENTION | Package ADOPT-1: navigation and checks only; no product redesign | Accept only this installation scope | Package ADOPT-1 inventory |
| A02 / ATTENTION | Discovered API contract: writes require authentication; schema contract: migrations preserve existing records | Reuse these contracts; API and data owners remain accountable | Contract inventory API-1 and DATA-1 |
| A03 / ATTENTION | Reuse testing policy TEST-1; update PR policy to require manual merge acceptance | CI and two-agent review retained; owner controls merge | Conformance inventory POLICY-1 |
| D01 / DECISION | Public smoke test has no reachable environment | Defer activation, or supply environment; recommend deferring activation | Choose; operations owner tracks the gap |
| A04 / ATTENTION | Pin PIN-1 resolved; local checks pass in this scenario, public smoke unrun; runtime handoff pending | Installation evidence is not pilot/ACTIVE evidence; activation remains blocked | Runtime and validation inventory RUNTIME-1 |

The decision is unresolved: do not request unconditional installation/activation
acceptance or portray the passing local checks as complete evidence.

### Simulated combined planning acceptance

Scope: WB-7 plus PLAN-3 proposes authenticated CSV export; excludes scheduled
exports. Data owner owns privacy risks. All tests below are planned, not run.

| Design point / source | Task(s) and brief work | Validation | Consistency / gap |
| --- | --- | --- | --- |
| D01 / WB-7: only the requesting user can export their records | T1: implement scoped query and authorization; first PR | Cross-user rejection and own-record export tests | Aligned in plan, not yet implemented |
| D02 / WB-7: exports are downloadable CSV | T2: add download UI after T1; second PR | CSV format and user-visible failure tests | Aligned in plan; scheduled exports excluded |
| D03 / WB-7: export retention must protect privacy | No deletion task exists in PLAN-3 | Retention expiry test not specified | Missing coverage; do not accept plan as complete |
| D04 / WB-7: publish support guidance | Documentation owner supplies runbook with T2 | Owner checks runbook against actual behavior | Explicit non-code obligation, not omitted work |

| ID / type | Important item | Recommendation / risk | Required response |
| --- | --- | --- | --- |
| D01 / DECISION | PLAN-3 does not implement WB-7 retention | Add a retention task before readiness; privacy obligation otherwise unmet | Approve direction for correction, not acceptance of incomplete PLAN-3 |
| A01 / ATTENTION | T2 depends on T1; no evidence of implementation yet | Keep dependency and tests in readiness review | Awareness |

After correction, regenerate this brief against the revised exact plan, disclose
any remaining gaps, and request acceptance only after the existing package
review passes. No separate whiteboard gate is introduced.

### Simulated merge-mode choice

| ID | Type | Item | Recommendation | Consequence | Response |
| --- | --- | --- | --- | --- | --- |
| D01 | DECISION | Merge mode | Human approval before merge | No unattended merge | Choose mode |
| A01 | ATTENTION | Existing-account review | Label both agent seats | Does not satisfy another actor's formal approval | Awareness |

These are simulated choices, not authority for this repository. After acceptance,
ordinary coding/tests need no repeated owner confirmation unless a real decision
or exception arises. Record observed sessions, rounds, interruptions and elapsed
effort in real delivery evidence; this example makes no performance claim.

## Simulated phase-aware readiness

This is a synthetic adopting-project walkthrough, not evidence of an external
installation. Its executable counterparts are in the
[lifecycle tests](../../tests/sdd-lifecycle.test.mjs); use the
[v4 contract](../../docs/batch-review-and-recovery.md#version-4-phase-aware-readiness)
when instantiating real documents.

| Step | Required evidence | Expected outcome |
| --- | --- | --- |
| Initial readiness | Accepted design/current prerequisites; T1 ready; result NOT_STARTED; T2 PLANNED | T1 may start; future result is not a prerequisite |
| T2 requested early | T1/result incomplete | Block T2 only; no invented output or approval |
| T1 finished | Producer DONE, result COMPLETE, exact file hash and approved review | T2 binds result identity in its context and may become READY |
| Result changes | Current bytes no longer match verified identity | Block affected consumption and revalidate; retain historical receipts |
| Enter VALIDATING | Implementation outputs complete/current/approved | Validation report may still be NOT_STARTED |
| Enter COMPLETE | Validation outputs complete/current/approved plus ordinary acceptance | Closure record may still be NOT_STARTED |
| Enter ARCHIVED | Closure outputs complete/current/approved plus existing archive controls | Archive only after actual acceptance |
| Invalid dependency | Validation report depends on later closure record, even without a cycle | Reject during preparation |
| Real input stale | Design changes materially before T1 | Existing prerequisite gate still blocks T1 |

The same pattern applies to a service's implementation result and a
documentation project's published-reference result. Different artifact names
do not change timing or authority. No runtime migration, issue closure, merge
or deletion follows from this simulated example.
