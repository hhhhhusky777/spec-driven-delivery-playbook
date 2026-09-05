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

| ID | Type | Item | Recommendation | Consequence | Response |
| --- | --- | --- | --- | --- | --- |
| D01 | DECISION | Merge mode | Human approval before merge | No unattended merge | Choose mode |
| A01 | ATTENTION | Existing-account review | Label both agent seats | Does not satisfy another actor's formal approval | Awareness |

These are simulated choices, not authority for this repository. After acceptance,
ordinary coding/tests need no repeated owner confirmation unless a real decision
or exception arises. Record observed sessions, rounds, interruptions and elapsed
effort in real delivery evidence; this example makes no performance claim.
