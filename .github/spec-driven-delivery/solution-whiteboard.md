# Solution Whiteboard — Immutable concluded design boundary

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [Issue #115](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/115) |
| Owner | Repository owner |
| Concluded design revision | `WB-115-1` |
| Open owner decisions | `None` |

## Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| DR01 | A concluded whiteboard must be byte-immutable without human authorization | Accepted; includes amendments, formatting, status changes, and cleanup transitions |
| DR02 | Implementation must add no content, behavior, or logic outside the concluded design | Accepted; implementation discretion remains only for contract-equivalent choices inside the boundary |
| DR03 | Reviewers must treat unauthorized scope as a finding | Accepted; review compares every candidate with the exact concluded whiteboard |
| DR04 | Every newly introduced fail-closed behavior must be disclosed before conclusion | Accepted; owner approval is required before it becomes design authority |
| DR05 | Existing archive-and-reset cleanup changes the live whiteboard | Proposed as a named lifecycle transition authorized before mutation; the archive preserves complete content while Git preserves exact bytes |

## Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem / observed need | Agents can reinterpret or expand an accepted design during planning, implementation, review, or cleanup, weakening human scope authority |
| Required outcome | Freeze the concluded design byte-for-byte and make it the exhaustive implementation scope unless a human explicitly authorizes a change |
| In scope | Normal-delivery whiteboard conclusion, planning and implementation scope, reviewer findings, fail-closed disclosure, and authorized archive/reset |
| Out of scope / deferred | Changing Fast Fix issue authority, eliminating implementation discretion inside the design, or adding a new status document |
| Confidence | High; owner supplied the required boundary and existing lifecycle sources identify the affected contracts |

## Authority and context

| Source | Authority or relevant content | Freshness / verification |
| --- | --- | --- |
| Owner request in Issue #115 | Exact byte freeze, strict execution scope, reviewer enforcement, and pre-conclusion fail-closed approval | Current owner decision |
| Installed workflow skill | Whiteboard authority, reviewer gates, implementation discretion, archive/reset lifecycle | Latest accepted `main` candidate prepared in this worktree |
| Feature review skill | Exact-candidate review and scope control | Latest accepted `main` |
| Whiteboard template | Discussion, conclusion, amendments, and human brief | Latest accepted `main` |

## Requirements and acceptance

| ID | Need or requirement | Priority | Acceptance signal | Source |
| --- | --- | --- | --- | --- |
| R01 | After conclusion, no byte of the whiteboard changes without explicit human authorization | Required | Workflow and template state the byte-level freeze and review detects unauthorized changes | Owner |
| R02 | Planning and implementation add no content, behavior, or logic beyond the concluded design | Required | Plan mapping and candidate review expose and reject every unauthorized addition | Owner |
| R03 | Both reviewers inspect for out-of-scope work against the exact concluded bytes | Required | Reviewer skill makes unauthorized scope a blocking finding | Owner |
| R04 | Before conclusion, list every newly introduced fail-closed behavior for human approval | Required | Whiteboard template contains a dedicated approval table and conclusion is invalid while any row lacks owner disposition | Owner |
| R05 | Preserve necessary implementation judgment only for choices equivalent to the authorized design | Required | Guidance distinguishes execution method from new outcomes, behaviors, logic, or fail-closed effects | Existing six-goal model |

## Proposed newly introduced fail-closed behaviors

Reviewers evaluate these proposals before the parent agent lists them in its
human review response. None becomes authoritative until the owner approves it
and this whiteboard is formally concluded.

| ID | Trigger | Required fail-closed response | Impact | Owner disposition |
| --- | --- | --- | --- | --- |
| FC01 | Any proposed byte change after human acceptance of a concluded design lacks prior explicit human authorization | Stop the change and retain the exact accepted whiteboard | Prevents agent-authored amendments, formatting, status edits, or cleanup changes | Approved by owner on 2026-09-20 |
| FC02 | Planning, implementation, or correction would add content, behavior, or logic not authorized by the accepted concluded design | Stop affected work and obtain human authorization before changing design or proceeding | Rejects scope expansion even when suggested by an agent or reviewer | Approved by owner on 2026-09-20 |
| FC03 | A newly introduced fail-closed behavior was not listed in the final human review response and approved before conclusion | Do not conclude the whiteboard or implement that behavior | Makes restrictive runtime behavior visible to the owner before it becomes authoritative | Approved by owner on 2026-09-20 |
| FC04 | Reviewer finds candidate scope that cannot be traced to the accepted concluded design | Block approval until the scope is removed or a human-authorized design amendment is completed | Makes out-of-scope work an explicit review failure | Approved by owner on 2026-09-20 |
| FC05 | A lifecycle action would mutate the accepted concluded whiteboard without prior human authorization | Do not perform the mutation | Applies the byte freeze to archive/reset while allowing the owner to preauthorize a named transition | Approved by owner on 2026-09-20 |

## Risks and consequences

| ID | Scenario | Likelihood / impact | Prevention or detection | Recovery / owner | Residual risk |
| --- | --- | --- | --- | --- | --- |
| K01 | Strict wording accidentally removes legitimate implementation judgment | Medium / delivery friction | Allow contract-equivalent technical choices that add no unauthorized outcome, behavior, logic, or restriction | Agent documents mapping; owner decides genuine ambiguity | Some borderline cases still require judgment |
| K02 | Archive/reset violates byte freeze | Certain at cleanup / lifecycle deadlock | Preserve complete concluded content in the archive and exact bytes through the Git blob/hash; obtain authorization for the named reset before mutation | Human may preauthorize the disclosed transition or decide at a later pre-mutation gate | Unauthorized cleanup remains blocked |
| K03 | A reviewer proposes a useful but out-of-scope improvement | Common / scope creep | Record it separately; do not require or implement it in the current candidate without human authorization | Human may reject, defer, or authorize a design change | Useful ideas may be deferred |

## Decision log

| ID | Decision | Material alternatives | Rationale / tradeoff | Owner / evidence |
| --- | --- | --- | --- | --- |
| D01 | Freeze concluded whiteboard bytes until explicit human authorization | Allow agent amendments for equivalent changes | Exact immutability makes the accepted design auditable and prevents silent reinterpretation | Owner request / Issue #115 |
| D02 | Treat the concluded design as exhaustive scope | Permit reviewer- or agent-added improvements | Human scope authority outweighs opportunistic expansion | Owner request / Issue #115 |
| D03 | Require pre-conclusion approval of every new fail-closed behavior | Infer approval from general safety policy | Fail-closed behavior can reject valid work and therefore needs visible owner acceptance | Owner request / Issue #115 |
| D04 | Keep implementation discretion for contract-equivalent methods only | Prescribe every implementation step | Protects strict outcomes without converting the playbook into a step-by-step program | Existing playbook goals |

## Proposed concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| WB115-01 | The concluded whiteboard is byte-immutable until explicit human authorization | No agent may amend, format, update status, reset, or otherwise change it autonomously | Exact concluded bytes remain unchanged across plan and implementation candidates |
| WB115-02 | All planned and implemented content, behavior, and logic trace to an authorized design point | Contract-equivalent implementation choices are allowed; new scope is not | Plan mapping and reviewer evidence show complete traceability and zero unauthorized additions |
| WB115-03 | Reviewers block unauthorized scope | A useful improvement is still out of scope until human authorization changes the design | Reviewer skill and findings explicitly assess whiteboard traceability |
| WB115-04 | Every newly introduced fail-closed behavior is listed and human-approved before conclusion | Existing canonical behavior need only be linked; newly imposed rejection behavior must be explicit | Dedicated table has no undisposed row at conclusion |
| WB115-05 | Archive/reset is allowed only as an explicitly human-authorized lifecycle transition | The archive preserves complete concluded content and Git preserves exact bytes; reset cannot happen solely on agent authority | Human authorization precedes closing-candidate mutation and may be granted when accepting this design or at a later pre-mutation gate |
| WB115-06 | Human approval authorizes only the declared conclusion metadata transition | After approval, change `OPEN` to `CONCLUDED`, assign the revision, and record approved dispositions; both retained reviewers verify that no other semantic change occurred | Freeze begins on the committed, reviewer-verified concluded candidate before planning |

## Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| DR01 | WB115-01, WB115-05 | Accepted | Byte freeze includes every mutation and names the existing cleanup exception requiring human authority |
| DR02 | WB115-02 | Accepted | Exhaustive scope with bounded technical discretion |
| DR03 | WB115-03 | Accepted | Reviewer enforcement is required, not optional advice |
| DR04 | WB115-04 | Accepted | New fail-closed effects become owner-visible before conclusion |
| DR05 | WB115-05 | Accepted | Preserves current archive/reset outcome without an autonomous exception |

## Design amendments

After human acceptance and reviewer verification of the declared conclusion
metadata transition, this concluded whiteboard is byte-immutable. An
amendment requires explicit human authorization for the concrete change before
any byte changes. The agent then changes only the authorized scope, reconcludes
the complete whiteboard, returns the new candidate to both retained reviewers,
and obtains human acceptance before dependent work resumes. Newly introduced
fail-closed behavior must be listed in the final human review response and
approved before the new revision is concluded. GitHub holds the authorization
and diff; do not add an amendment row autonomously.

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | Exact byte freeze after human acceptance; exhaustive authorized scope; reviewer scope blocking; pre-conclusion fail-closed approval | `HUMAN_DECISION` approved on 2026-09-20 |
| Important boundaries | Technical method remains agent-selected only when it is contract-equivalent and adds no unauthorized content, behavior, logic, or restriction | `DISCLOSE` |
| Newly introduced fail-closed behavior | FC01–FC05 were listed in the parent response after review and approved by the owner | `HUMAN_DECISION` resolved on 2026-09-20 |
| Lifecycle consequence | Archive preserves complete content and Git exact bytes; reset needs prior human authorization | `HUMAN_DECISION` approved on 2026-09-20 |
| Remaining gaps or risks | Borderline traceability may require owner judgment; agents and reviewers cannot self-expand scope | `DISCLOSE` |
| Decision requested | Exact proposed design, FC01–FC05, and the declared metadata transition | `HUMAN_DECISION` approved on 2026-09-20 |
