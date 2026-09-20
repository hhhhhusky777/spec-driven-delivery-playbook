# Delivery archive — Concluded-design authority

<!-- sdd: delivery-archive -->

| Field | Value |
| --- | --- |
| Issues | [#115](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/115) |
| Closing pull request | [#116](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/116) |

<!-- sdd: archived-whiteboard -->

## Solution Whiteboard — Immutable concluded design boundary

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [Issue #115](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/115) |
| Owner | Repository owner |
| Concluded design revision | `WB-115-1` |
| Open owner decisions | `None` |

### Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| DR01 | A concluded whiteboard must be byte-immutable without human authorization | Accepted |
| DR02 | Implementation must add no content, behavior, or logic outside the concluded design | Accepted |
| DR03 | Reviewers must treat unauthorized scope as a finding | Accepted |
| DR04 | Every newly introduced fail-closed behavior must be disclosed before conclusion | Accepted |
| DR05 | Existing archive-and-reset cleanup changes the live whiteboard | Accepted |

### Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem / observed need | Agents can reinterpret or expand an accepted design during planning, implementation, review, or cleanup, weakening human scope authority |
| Required outcome | Freeze the concluded design byte-for-byte and make it the exhaustive implementation scope unless a human explicitly authorizes a change |
| In scope | Normal-delivery whiteboard conclusion, planning and implementation scope, reviewer findings, fail-closed disclosure, and authorized archive/reset |
| Out of scope / deferred | Changing Fast Fix issue authority, eliminating implementation discretion inside the design, or adding a new status document |
| Confidence | High; owner supplied the required boundary and existing lifecycle sources identify the affected contracts |

### Authority and context

| Source | Authority or relevant content | Freshness / verification |
| --- | --- | --- |
| Owner request in Issue #115 | Exact byte freeze, strict execution scope, reviewer enforcement, and pre-conclusion fail-closed approval | Current owner decision |
| Installed workflow skill | Whiteboard authority, reviewer gates, implementation discretion, archive/reset lifecycle | Latest accepted `main` candidate prepared in this worktree |
| Feature review skill | Exact-candidate review and scope control | Latest accepted `main` |
| Whiteboard template | Discussion, conclusion, amendments, and human brief | Latest accepted `main` |

### Requirements and acceptance

| ID | Need or requirement | Priority | Acceptance signal | Source |
| --- | --- | --- | --- | --- |
| R01 | After conclusion, no byte of the whiteboard changes without explicit human authorization | Required | Workflow and template state the byte-level freeze and review detects unauthorized changes | Owner |
| R02 | Planning and implementation add no content, behavior, or logic beyond the concluded design | Required | Plan mapping and candidate review expose and reject every unauthorized addition | Owner |
| R03 | Both reviewers inspect for out-of-scope work against the exact concluded bytes | Required | Reviewer skill makes unauthorized scope a blocking finding | Owner |
| R04 | Before conclusion, list every newly introduced fail-closed behavior for human approval | Required | Whiteboard template contains a dedicated approval table and conclusion is invalid while any row lacks owner disposition | Owner |
| R05 | Preserve necessary implementation judgment only for choices equivalent to the authorized design | Required | Guidance distinguishes execution method from new outcomes, behaviors, logic, or fail-closed effects | Existing six-goal model |

### Newly introduced fail-closed behaviors

Reviewers evaluated these behaviors before the parent agent listed them in its
human review response. The owner approved FC01–FC05 before this whiteboard was
formally concluded.

| ID | Trigger | Required fail-closed response | Impact | Owner disposition |
| --- | --- | --- | --- | --- |
| FC01 | Any proposed byte change after human acceptance of a concluded design lacks prior explicit human authorization | Stop the change and retain the exact accepted whiteboard | Prevents agent-authored amendments, formatting, status edits, or cleanup changes | Approved by owner on 2026-09-20 |
| FC02 | Planning, implementation, or correction would add content, behavior, or logic not authorized by the accepted concluded design | Stop affected work and obtain human authorization before changing design or proceeding | Rejects scope expansion even when suggested by an agent or reviewer | Approved by owner on 2026-09-20 |
| FC03 | A newly introduced fail-closed behavior was not listed in the final human review response and approved before conclusion | Do not conclude the whiteboard or implement that behavior | Makes restrictive runtime behavior visible to the owner before it becomes authoritative | Approved by owner on 2026-09-20 |
| FC04 | Reviewer finds candidate scope that cannot be traced to the accepted concluded design | Block approval until the scope is removed or a human-authorized design amendment is completed | Makes out-of-scope work an explicit review failure | Approved by owner on 2026-09-20 |
| FC05 | A lifecycle action would mutate the accepted concluded whiteboard without prior human authorization | Do not perform the mutation | Applies the byte freeze to archive/reset while allowing the owner to preauthorize a named transition | Approved by owner on 2026-09-20 |

### Risks and consequences

| ID | Scenario | Likelihood / impact | Prevention or detection | Recovery / owner | Residual risk |
| --- | --- | --- | --- | --- | --- |
| K01 | Strict wording accidentally removes legitimate implementation judgment | Medium / delivery friction | Allow contract-equivalent technical choices that add no unauthorized outcome, behavior, logic, or restriction | Agent documents mapping; owner decides genuine ambiguity | Some borderline cases still require judgment |
| K02 | Archive/reset violates byte freeze | Certain at cleanup / lifecycle deadlock | Preserve complete concluded content in the archive and exact bytes through the Git blob/hash; obtain authorization for the named reset before mutation | Human may preauthorize the disclosed transition or decide at a later pre-mutation gate | Unauthorized cleanup remains blocked |
| K03 | A reviewer proposes a useful but out-of-scope improvement | Common / scope creep | Record it separately; do not require or implement it in the current candidate without human authorization | Human may reject, defer, or authorize a design change | Useful ideas may be deferred |

### Decision log

| ID | Decision | Material alternatives | Rationale / tradeoff | Owner / evidence |
| --- | --- | --- | --- | --- |
| D01 | Freeze concluded whiteboard bytes until explicit human authorization | Allow agent amendments for equivalent changes | Exact immutability makes the accepted design auditable and prevents silent reinterpretation | Owner request / Issue #115 |
| D02 | Treat the concluded design as exhaustive scope | Permit reviewer- or agent-added improvements | Human scope authority outweighs opportunistic expansion | Owner request / Issue #115 |
| D03 | Require pre-conclusion approval of every new fail-closed behavior | Infer approval from general safety policy | Fail-closed behavior can reject valid work and therefore needs visible owner acceptance | Owner request / Issue #115 |
| D04 | Keep implementation discretion for contract-equivalent methods only | Prescribe every implementation step | Protects strict outcomes without converting the playbook into a step-by-step program | Existing playbook goals |

### Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| WB115-01 | The concluded whiteboard is byte-immutable until explicit human authorization | No agent may amend, format, update status, reset, or otherwise change it autonomously | Exact concluded bytes remain unchanged across plan and implementation candidates |
| WB115-02 | All planned and implemented content, behavior, and logic trace to an authorized design point | Contract-equivalent implementation choices are allowed; new scope is not | Plan mapping and reviewer evidence show complete traceability and zero unauthorized additions |
| WB115-03 | Reviewers block unauthorized scope | A useful improvement is still out of scope until human authorization changes the design | Reviewer skill and findings explicitly assess whiteboard traceability |
| WB115-04 | Every newly introduced fail-closed behavior is listed and human-approved before conclusion | Existing canonical behavior need only be linked; newly imposed rejection behavior must be explicit | Dedicated table has no undisposed row at conclusion |
| WB115-05 | Archive/reset is allowed only as an explicitly human-authorized lifecycle transition | The archive preserves complete concluded content and Git preserves exact bytes; reset cannot happen solely on agent authority | Human authorization precedes closing-candidate mutation and may be granted when accepting this design or at a later pre-mutation gate |
| WB115-06 | Human approval authorizes only the declared conclusion metadata transition | After approval, change `OPEN` to `CONCLUDED`, assign the revision, and record approved dispositions; both retained reviewers verify that no other semantic change occurred | Freeze begins on the committed, reviewer-verified concluded candidate before planning |

### Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| DR01 | WB115-01, WB115-05 | Accepted | Byte freeze includes every mutation and names the existing cleanup exception requiring human authority |
| DR02 | WB115-02 | Accepted | Exhaustive scope with bounded technical discretion |
| DR03 | WB115-03 | Accepted | Reviewer enforcement is required, not optional advice |
| DR04 | WB115-04 | Accepted | New fail-closed effects become owner-visible before conclusion |
| DR05 | WB115-05 | Accepted | Preserves current archive/reset outcome without an autonomous exception |

### Design amendments

After human acceptance and reviewer verification of the declared conclusion
metadata transition, this concluded whiteboard is byte-immutable. An
amendment requires explicit human authorization for the concrete change before
any byte changes. The agent then changes only the authorized scope, reconcludes
the complete whiteboard, returns the new candidate to both retained reviewers,
and obtains human acceptance before dependent work resumes. Newly introduced
fail-closed behavior must be listed in the final human review response and
approved before the new revision is concluded. GitHub holds the authorization
and diff; do not add an amendment row autonomously.

### Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | Exact byte freeze after human acceptance; exhaustive authorized scope; reviewer scope blocking; pre-conclusion fail-closed approval | `HUMAN_DECISION` approved on 2026-09-20 |
| Important boundaries | Technical method remains agent-selected only when it is contract-equivalent and adds no unauthorized content, behavior, logic, or restriction | `DISCLOSE` |
| Newly introduced fail-closed behavior | FC01–FC05 were listed in the parent response after review and approved by the owner | `HUMAN_DECISION` resolved on 2026-09-20 |
| Lifecycle consequence | Archive preserves complete content and Git exact bytes; reset needs prior human authorization | `HUMAN_DECISION` approved on 2026-09-20 |
| Remaining gaps or risks | Borderline traceability may require owner judgment; agents and reviewers cannot self-expand scope | `DISCLOSE` |
| Decision requested | Exact proposed design, FC01–FC05, and the declared metadata transition | `HUMAN_DECISION` approved on 2026-09-20 |

<!-- sdd: archived-implementation-plan -->

## Implementation Plan — Concluded-design authority

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority.

### Delivery status

| Field | Value |
| --- | --- |
| State | `COMPLETE` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | Human review before merge |
| Delivery branch / target | `codex/whiteboard-freeze` → `main` |
| Owner | Repository owner |
| Primary issue / need | [Issue #115](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/115) |
| Concluded whiteboard | `WB-115-1`, commit `f06400c46f4bd0e9794ec28b5d0fd2e347ed1a83`, SHA-256 `7850ff22e47a85f1a724f9b8af6734ba567f05b4fb32806e64a63d7988f2cdd5` |
| Required reviewers | The two retained Issue #115 reviewer sessions |
| Last verified | Exact T01 content at `ba2fe4d45782e23b0b23be5a562ac4f078ee1190` passed focused validation and both retained reviewer seats; owner authorized archive/reset |

### Governing inputs and delivery boundaries

#### Source hierarchy

| Priority | Source | Authority / use |
| --- | --- | --- |
| 1 | Owner acceptance of `WB-115-1` and FC01–FC05 | Scope, amendment, fail-closed, and lifecycle authority |
| 2 | Frozen concluded whiteboard at the recorded hash | Exhaustive feature design |
| 3 | Existing project policies and templates | Compatible implementation and validation boundaries |

#### Outcome, scope, and assumptions

| Concern | Accepted value |
| --- | --- |
| Problem | Accepted design can be silently reinterpreted or expanded during planning, implementation, review, or cleanup |
| Required outcome | Enforce prior human authority for every concluded-whiteboard byte change, exhaustive design traceability, reviewer scope blocking, and pre-conclusion approval of new fail-closed behavior |
| In scope | Canonical quality policy; contribution lifecycle authority; author and reviewer skills; whiteboard and plan templates; README lifecycle explanation and diagram; regression tests |
| Out of scope / deferred | Changing Fast Fix issue authority, prescribing implementation steps, introducing another document or service, or altering unrelated error-handling behavior |
| Success measures | Every changed rule traces to WB115-01–WB115-06; source tests and documentation checks pass; reviewers find no unauthorized scope |
| Assumptions / constraints | Whiteboard bytes remain exactly frozen; contract-equivalent wording choices remain agent-owned |

#### Clarifications and gaps

| ID | Question or gap | Why it matters | Resolution / owner | State |
| --- | --- | --- | --- | --- |
| G01 | Exact bytes cannot be embedded unchanged in the combined archive format | Avoids a false archive guarantee | Complete content is archived; Git blob/hash preserves exact bytes | Resolved in WB115-05 |
| G02 | Human approval follows semantic agent review but conclusion changes metadata | Exact-candidate integrity | Human authorizes the bounded transition; the same reviewers verify it before freeze | Resolved in WB115-06 |

### System contracts

#### Functional and state contracts

| ID | Trigger / precondition | Required behavior | Result / postcondition | Failure behavior |
| --- | --- | --- | --- | --- |
| C01 | Whiteboard is human-accepted and `CONCLUDED` | Preserve every byte until prior human authorization names a concrete amendment | Frozen design remains authoritative | FC01 |
| C02 | Plan, implementation, or correction proposes work | Trace every content, behavior, and logic addition to the frozen design | No unexplained task or candidate scope | FC02 |
| C03 | Agent is ready to ask the owner to conclude a design | Two reviewers first review the design; parent response then lists every new fail-closed behavior | Owner sees the complete restrictive behavior set before decision | FC03 |
| C04 | Reviewer inspects a design, plan, or candidate | Compare exact scope with the frozen concluded whiteboard | Unauthorized scope is a blocking finding | FC04 |
| C05 | Archive/reset or another lifecycle transition would mutate the frozen whiteboard | Require prior human authorization; preserve complete content and exact-byte Git provenance | Only authorized lifecycle mutation occurs | FC05 |

#### Test and acceptance contracts

| Contract or design IDs | Test level | Scenario | Required evidence |
| --- | --- | --- | --- |
| WB115-01, C01 | Document model / lifecycle | Unauthorized amendment is rejected and an authorized reconclusion remains valid | Deterministic regression plus semantic review |
| WB115-02, WB115-03, C02, C04 | Document model / reviewer review | Plan and reviewer instructions require exhaustive traceability and block out-of-scope work | Focused test and both reviewers |
| WB115-04, C03 | Document model | Human response lists new fail-closed behaviors only after design review and before conclusion | Template/skill assertions and reviewer inspection |
| WB115-05, C05 | Lifecycle | Archive preserves complete content and reset requires pre-mutation authority | Existing archive checks plus new authority assertion |
| WB115-06 | Lifecycle / review | Declared conclusion transition is verified before planning | Lifecycle checker and retained reviewers |

### Delivery strategy and readiness

| Concern | This delivery |
| --- | --- |
| Integration model | One coherent PR to `main` |
| Increment boundary | One policy contract must keep policy, skills, templates, README, and tests consistent |
| Parallel ownership | None; the files share normative wording and test contracts |
| Compatibility sequencing | Canonical policy first, consumers link or specialize by responsibility, tests prove lifecycle behavior |
| Merge authority | Human review and explicit merge authorization |

### Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| WB115-01 | T01: canonical byte-freeze and amendment authority; template and workflow routing | Lifecycle and document-model tests | Aligned |
| WB115-02 | T01: plan traceability and author scope boundary | Mapping inspection and reviewer review | Aligned |
| WB115-03 | T01: reviewer out-of-scope blocking contract | Reviewer-skill assertions and both reviewers | Aligned |
| WB115-04 | T01: review-before-human-response sequence and fail-closed disclosure | Template/skill assertions | Aligned |
| WB115-05 | T01: authorized archive/reset wording and provenance distinction | Archive lifecycle checks | Aligned |
| WB115-06 | T01: valid conclusion transition and exact-candidate verification | Lifecycle check and retained reviewers | Aligned |

### Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | PR |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | `DONE` | `None` | Deliver WB115-01–WB115-06 consistently across canonical policy, skills, templates, README, and tests | No whiteboard change, Fast Fix change, new document, or unrelated rule | Focused checks and both retained reviewers passed; full final validation follows the closing candidate | [PR #116](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/116) |

### Task specifications and context receipts

#### T01 — Enforce concluded-design authority

| Concern | Value |
| --- | --- |
| Outcome / non-scope | Enforce the accepted design exactly; do not add process beyond WB115-01–WB115-06 |
| Source boundary | `docs/documentation-quality-policy.md`, `CONTRIBUTING.md`, `skills/sdd-project-workflow/SKILL.md`, `skills/sdd-feature-review/SKILL.md`, `templates/discovery/solution-whiteboard.md`, `templates/delivery/implementation-plan.md`, `README.md`, `scripts/sdd-lifecycle-three-doc.mjs`, and applicable tests. The manifest was inspected and remains unchanged because WB115 grants no adoption-cutover authority |
| Consumed dependencies | Frozen whiteboard `WB-115-1`; current lifecycle checker; existing archive/reset contract |
| Critical obligations | Canonical single-source wording; prior human authority; exact traceability; no speculative restriction |
| Required evidence | Focused validation, lifecycle checks, both retained reviewer approvals, full exact-head validation, human merge acceptance |
| Context receipt | Existing policy, skills, templates, README, lifecycle checker, and tests inspected; reviewer findings reconciled before freeze |
| Actual result | Canonical policy owns accepted-design authority; CONTRIBUTING, author/reviewer skills, whiteboard/plan templates, README, lifecycle checker, and tests consistently apply WB115-01–WB115-06. Frozen whiteboard hash is unchanged |

### Recovery, decisions, and change control

#### Failure and blocker log

| ID | Task | Observed versus expected | Classification / evidence | Recovery or owner decision | State |
| --- | --- | --- | --- | --- | --- |
| E01 | Design gate | First conclusion transition retained proposal wording and non-terminal resolution tokens | Agent mistake; lifecycle checker and both reviewers blocked it | Owner authorized bounded wording correction; exact corrected candidate passed both reviewers | Resolved |

#### Delivery decision and amendment log

| ID / time | Decision or plan change | Reason / consequence | Affected design, contracts, or tasks | Authority |
| --- | --- | --- | --- | --- |
| 2026-09-20 | One coherent implementation task | All consumers implement one inseparable authority contract | WB115-01–WB115-06 / T01 | Frozen concluded design |

### Plan validation and completion

#### Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | Complete design-to-task mapping and exact scope review | Implemented; both retained reviewers approved the exact T01 content |
| Applicable validation passed | Focused checks and full final `docs:all` | Focused checks and 20/20 applicable tests pass; full final gate follows closing-candidate review |
| Merge-ready canonical state | Policy, contribution authority, skills, templates, README, tests, plan, and archive/reset contract consistent; manifest remains unchanged | Closing candidate pending review and full validation |
| PR-owned review and delivery | Two retained reviewers, checks, owner authority, merge and target proof | [PR #116](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/116); implementation review passed, human merge and target proof pending |
| Feature cleanup complete | Complete combined archive, authorized reset, owned branch/worktree cleanup | Archive/reset authorized for this closing candidate; post-merge worktree and branch cleanup pending |

#### Completion invariants

- The frozen whiteboard remains byte-identical to its recorded SHA-256.
- Every changed behavior and task maps to WB115-01–WB115-06 or a necessary
  existing project-authority obligation.
- Both retained reviewers block any unexplained scope.
- Applicable checks pass; failures and unrun gates remain explicit.
- Final human review receives the exact candidate and four-category line count.

### Planned versus actual outcome

| Concern | Final result |
| --- | --- |
| Delivered outcome | WB115-01–WB115-06 are implemented across the canonical policy, contribution boundary, author/reviewer skills, templates, README, lifecycle checker, and tests |
| Reviewer corrections | Review tightened lifecycle enforcement, terminal fail-closed dispositions, concise hard-rule wording, and the scope from any byte to any whiteboard byte |
| Deviations from accepted design | None |
| Unchanged authority | The adoption manifest remains unchanged because this design grants no playbook-upgrade authority |

### Cleanup inventory

The owner authorized this closing transition. This candidate preserves the
complete concluded whiteboard and final plan in this archive, resets the working
whiteboard, and removes the live plan. It preserves the reusable manifest and
unrelated delivery history. After authorized merge and target verification,
remove only this delivery's worktree and owned merged branch.

### Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and outcomes | One task aligns policy, skills, templates, README, and tests with the frozen design | `DISCLOSE` |
| Design consistency | WB115-01–WB115-06 all map to T01; no design gap | `NONE` |
| Important changes | Prior human authorization, byte freeze, exhaustive scope, reviewer blocking, and fail-closed disclosure | `DISCLOSE` |
| Validation | Focused task checks and both retained reviewers passed; closing-candidate review and full final validation remain | `AGENT_ACTION` |
| Risks or open decisions | None; whiteboard remains frozen | `NONE` |
| Decision requested | None; owner authorized implementation and this archive/reset transition | `NONE` |
