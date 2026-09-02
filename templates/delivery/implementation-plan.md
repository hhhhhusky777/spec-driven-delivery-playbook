# Spec-Driven Agile Implementation Plan Template

<!-- sdd-schema: implementation-plan@1; mode: SELECT -->

Use this template for a non-trivial feature, refactor, migration, or reliability
change. The completed document is the plan of record: it defines intended
behavior before implementation, decomposes delivery into reviewable increments,
and records evidence as work progresses.

This template is part of a suite:

- [Development Policy Template](../policies/development-policy.md) defines durable
  repository-wide development rules.
- [Solution Whiteboard Template](../discovery/solution-whiteboard.md) governs
  discovery, discussion, alternatives, and convergence before planning.
- [Whiteboard-to-Workflow Handoff Template](../handoffs/whiteboard-to-workflow.md)
  defines the reviewed discovery input consumed by routing.
- [Delivery Workflow Template](../workflows/sdd-delivery-workflow.md) selects
  the route and dependency-ordered artifact manifest.
- [Specialized Policy Template](../policies/specialized-policy.md) governs a
  cross-cutting policy discovered during development.
- [Test Strategy Template](../testing/test-strategy.md) defines
  project-specific quality evidence and failure handling.
- [PR and Branch Policy Template](../policies/pull-request-policy.md) defines
  integration and review rules.

An instantiated plan references active project policies; it does not redefine
them. It records feature-specific contracts, design, tasks, state, and evidence.

Replace all `<placeholders>`, remove instructional text that does not apply, and
write `Not applicable — <reason>` instead of silently deleting a required
section.

## 0. Document control

| Field | Value |
| --- | --- |
| Plan | `<short descriptive name>` |
| Status | `DRAFT` |
| Previous status | `DRAFT` |
| Plan mode | `<COMPACT / FULL>` |
| Current phase | `SPECIFY` |
| Current task | `None` |
| Next ready task(s) | `<task IDs or None>` |
| Blockers | `None` |
| Owner | `<person or team>` |
| Reviewers | `<product, engineering, QA, security, operations as applicable>` |
| Review state | `NOT_STARTED` |
| Created | `<YYYY-MM-DD and timezone>` |
| Last updated | `<YYYY-MM-DD HH:MM and timezone>` |
| Primary issue | `<canonical URL>` |
| Concluded whiteboard | `<canonical path/URL>` |
| Approved workflow handoff | `<canonical path/URL and version>` |
| Delivery workflow/manifest | `<canonical path/URL and version>` |
| Development policy | `<canonical path/URL>` |
| Test strategy | `<canonical path/URL>` |
| PR/branch policy | `<canonical path/URL>` |
| Branch / PR | `<branch and canonical PR URL, or Not opened>` |
| Archived record | `Not archived` |

### 0.1 Plan lifecycle

```text
DRAFT -> CONTRACT_REVIEW -> READY -> IMPLEMENTING -> VALIDATING -> COMPLETE
             |                 |          |               |
             +--------------> BLOCKED <---+---------------+

VALIDATING -> IMPLEMENTING when plan-level validation finds more delivery work
```

- `DRAFT`: the problem, requirements, or design still contains material gaps.
- `CONTRACT_REVIEW`: requirements and contracts are complete enough for
  stakeholder review; implementation must not begin.
- `READY`: contracts are approved, risks are addressed, and at least one task
  satisfies its Definition of Ready.
- `IMPLEMENTING`: an approved task is being implemented.
- `VALIDATING`: implementation is complete, every ledger task is `DONE` or
  reviewed `CANCELLED`, no task is `NEXT`, and plan-level gates are running.
- `BLOCKED`: progress cannot safely continue; record evidence, impact, owner,
  and the precise unblocking condition. A blocked plan returns to its prior
  active state when resolved.
- `COMPLETE`: all required contracts and Definitions of Done are satisfied.

Do not advance a lifecycle state merely because code exists. Record the gate
that permits every transition in Section 10. Before changing `Status`, preserve
its old value in `Previous status`; the lifecycle checker rejects transitions
that are not in this state machine.

### 0.2 Artifact review gate

Submit the plan for human or independent-agent review before `READY`. The
author or generating runner must not self-approve unless a documented project
rule allows a low-risk exception. Resolve `CHANGES_REQUESTED`, update affected
contracts/tasks, and repeat review. If comments invalidate the accepted
solution or manifest, return to the owning upstream artifact instead of fixing
the contradiction only in this plan.

| Round | Reviewer | Type | Result | Comments/link | Resolved version |
| --- | --- | --- | --- | --- | --- |
| `1` | `<identity>` | `<human/independent agent>` | `<APPROVED/CHANGES_REQUESTED>` | `<value>` | `<version>` |

### 0.3 How to use this document

`COMPACT` is permitted only when the approved manifest selects
`GENERATE_COMPACT` for one coherent low-risk production task. It still retains
document control/review, governing inputs, problem/scope, every applicable
system contract and risk, the single task's DoR/DOD and execution record, live
state, evidence, validation, retrospective, and archive handoff. Mark an
inapplicable section with a reason rather than hiding the boundary.

`FULL` is required for multi-task, systemic, policy-gap, high-risk, or otherwise
escalated delivery. Complete every applicable section and preserve dependency
ordering across all selected artifacts and tasks.

Both modes preserve the complete task ledger, but task detail is just in time:
every future `PLANNED` task records a bounded summary and `SPEC_PENDING`; only a
task entering `READY` must have a complete specification under the active
development policy and the
[calibration guide](../../docs/task-specification-calibration.md). This avoids a
plan wall without allowing implementation from an underspecified task. Replace the
schema marker's `SELECT` with the chosen mode in an instantiated plan.

1. Specify observable outcomes and system contracts before implementation.
2. Resolve or explicitly defer every clarification in Section 3.
3. Review significant decisions before marking the plan `READY`.
4. Derive dependency-ordered, independently verifiable delivery tasks from the
   approved contracts.
5. Update the execution snapshot before and after each task.
6. Append evidence and decisions; do not rewrite accepted history.
7. At completion, freeze the contracts and evidence, change the title to
   `Delivery Record`, and move the file to `development_history/` in a
   documentation-only archival change.

## 1. Governing inputs and feature authority

### 1.1 Source hierarchy

List governing sources from highest to lowest authority. The approved workflow
handoff supplies the reviewed discovery input; this plan turns it into normative
feature contracts and executable delivery tasks. Resolve conflicts before
implementation and use the concluded whiteboard for its supporting discussion
history.

1. `<law, regulation, external obligation, or public product/system contract>`
2. `<active repository-wide policies and any reviewed PROPOSED specialized
   rule within its explicit adoption boundary>`
3. `<accepted architecture decision records selected by the manifest>`
4. `<this plan's approved feature-specific system contracts>`
5. `<issue discussion, prototypes, and pseudocode>`
6. `<implementation details>`

An issue description, comment, chat, prototype, or pseudocode is not
automatically an engineering-level contract. State explicitly which content
the concluded whiteboard accepted and which content remains informative.

### 1.2 Required references

| Reference | Role | Authority / freshness rule |
| --- | --- | --- |
| `<link>` | `<whiteboard, development/test/PR/specialized policy, API, runbook, issue, prior record, etc.>` | `<normative, informative, or dated evidence>` |

Repository-wide policies should remain separate and be linked rather than
copied. Examples include test policy, PR/branch policy, security policy,
operational runbooks, and public API documentation.

### 1.3 Applicable policies and policy gaps

Apply the development policy's applicability scan. Do not invent cross-cutting
rules inside this plan when a specialized policy is required.

| Domain | Applicable? | Active authority | Feature-specific application | Policy gap/action |
| --- | --- | --- | --- | --- |
| `<testing/concurrency/security/etc.>` | `<Yes/No>` | `<link/None>` | `<summary>` | `<None/POLICY_GAP ID>` |

Keep feature-specific behavior and acceptance contracts here. Link a separate
shared contract, active specialized policy, runbook, or accepted ADR when the
development policy requires it. Summarize its feature consequence so the plan
remains understandable without copying the normative document.

## 2. Problem, outcomes, and scope

### 2.1 Problem statement

`<Describe the observed problem and its impact without prescribing a solution.>`

### 2.2 Users and critical journeys

| Actor | Journey | Current result | Required result |
| --- | --- | --- | --- |
| `<actor>` | `<operation>` | `<observable current behavior>` | `<observable expected behavior>` |

### 2.3 Outcomes and success measures

- `<measurable functional outcome>`
- `<reliability, security, performance, or operational outcome>`
- `<how the result will be demonstrated>`

### 2.4 In scope

- `<included behavior or boundary>`

### 2.5 Out of scope and deferred work

- `<excluded behavior, reason, and follow-up reference if required>`

### 2.6 Assumptions and constraints

| ID | Assumption or constraint | Evidence | Failure impact | Validation |
| --- | --- | --- | --- | --- |
| `A-01` | `<statement>` | `<source>` | `<worst case if false>` | `<how/when proved>` |

## 3. Clarification and gap register

Every material ambiguity is resolved, deferred with an owner, or blocks
`READY`. Do not silently choose an interpretation during implementation.

| ID | Question or gap | Why it matters | Resolution / decision | State | Owner |
| --- | --- | --- | --- | --- | --- |
| `Q-01` | `<question>` | `<contract/risk affected>` | `<answer or required evidence>` | `OPEN` | `<owner>` |

Allowed states: `OPEN`, `RESOLVED`, `DEFERRED`, `BLOCKED`. A `DEFERRED` item must
identify why it is safe to defer and where it will be tracked.

## 4. System contracts

This is the feature's normative specification. Assign stable IDs so tasks,
tests, decisions, and evidence can trace back to each contract. Describe
observable behavior and ownership; avoid prescribing incidental code structure.

### 4.1 Functional contracts

| ID | Trigger / precondition | Required behavior | Result / postcondition | Failure behavior |
| --- | --- | --- | --- | --- |
| `FC-01` | `<when>` | `<must happen>` | `<observable state>` | `<stable failure contract>` |

### 4.2 State-machine contract

Include a state diagram and transition table. Name the component that owns each
transition and make retry, duplicate delivery, stale work, and invalid
transitions explicit.

```text
<STATE_A> -> <STATE_B> -> <STATE_C>
                  |          |
                  +------> <FAILURE_STATE>
```

| Entity | From | Event / guard | To | Owner | Atomic side effects | Duplicate behavior |
| --- | --- | --- | --- | --- | --- | --- |
| `<entity>` | `<state>` | `<event>` | `<state>` | `<component>` | `<writes/billing/queue>` | `<idempotent result>` |

### 4.3 API and interface contracts

- Requests and responses: `<schemas, compatibility, stable errors>`
- Queue messages: `<task name, ID-only payload, uniqueness, scheduling>`
- Provider calls: `<request snapshot, timeout, idempotency, retry>`
- Storage: `<object ownership, integrity, cleanup>`
- Administrative interfaces: `<search, audit, authorization>`

Link detailed schemas to the canonical API document when one exists.

### 4.4 Data and transaction contracts

- Source of truth: `<entity/field>`
- Uniqueness and integrity: `<constraints>`
- Transaction boundaries: `<atomic operations>`
- Lock order and scope: `<locks and ownership>`
- Migration and existing-data behavior: `<forward/backfill/rollback>`
- Retention and deletion: `<lifecycle>`

### 4.5 Concurrency, idempotency, and recovery contracts

- Concurrent operations allowed: `<operations>`
- Mutual-exclusion boundary: `<job, child, tenant, etc.>`
- Stable idempotency identity: `<generation and lifetime>`
- Crash windows: `<before/after external side effects and commits>`
- Reconciler rules: `<stale states and safe recovery actions>`
- Retry classification: `<automatic, manual, non-retryable, exhausted>`
- Race outcome: `<stable non-5xx retryable response where applicable>`

### 4.6 Failure and error contracts

| Failure class | Detection | State result | Retry owner | External result | Evidence required |
| --- | --- | --- | --- | --- | --- |
| `<class>` | `<signal>` | `<state>` | `<worker/user/none>` | `<error/status>` | `<logs/metrics/test>` |

Follow the repository test-failure triage policy when validation fails. A test
failure is evidence to classify before production code, configuration, or the
test is modified.

### 4.7 Security, privacy, and abuse contracts

- Authentication and authorization: `<boundary>`
- Tenant/workspace isolation: `<rules>`
- Secrets and sensitive payloads: `<storage/logging/queue restrictions>`
- Input/output validation: `<rules>`
- Abuse, quota, and resource exhaustion: `<controls>`
- Audit requirements: `<events and retention>`

### 4.8 Performance and capacity contracts

- Expected workload: `<rate, concurrency, payload size>`
- Budget: `<latency, throughput, queue delay, resource limits>`
- Backpressure: `<where enforced>`
- Degradation behavior: `<overload result>`
- Measurement method: `<test/metric>`

### 4.9 Observability and operational contracts

- Logs: `<events and safe fields>`
- Metrics: `<rates, latency, queue age, failures, retries>`
- Traces/correlation: `<identifiers>`
- Alerts: `<actionable thresholds>`
- Runbook changes: `<operator actions>`
- Deployment, graceful shutdown, and rollback: `<contract>`

### 4.10 Test and acceptance contracts

Reference the normative repository test policy and add feature-specific cases:

| Contract IDs | Test level | Scenario | Required evidence |
| --- | --- | --- | --- |
| `<IDs>` | `<unit/contract/race/smoke/E2E>` | `<case>` | `<assertion/artifact>` |

## 5. Proposed design

### 5.1 Context and component flow

`<Describe the end-to-end design. Add only diagrams that clarify ownership,
sequence, hierarchy, or concurrency.>`

### 5.2 Responsibility boundaries

| Component | Owns | Must not own |
| --- | --- | --- |
| `<component>` | `<responsibility>` | `<excluded responsibility>` |

### 5.3 Key design decisions

| Decision ID | Status | Decision | Alternatives | Rationale / tradeoffs | Contract IDs | ADR |
| --- | --- | --- | --- | --- | --- | --- |
| `D-01` | `PROPOSED` | `<decision>` | `<options>` | `<why and consequences>` | `<IDs>` | `<link or Inline>` |

Decision states: `PROPOSED`, `ACCEPTED`, `SUPERSEDED`, `REJECTED`. Once accepted,
append a superseding entry rather than editing its meaning.

### 5.4 Compatibility, migration, and rollout

- Compatibility promise: `<public/internal/unreleased>`
- Durable-data change class: `<NONE / ADDITIVE / TRANSITIONAL / DESTRUCTIVE>`
- Migration sequence: `<schema/data/code order>`
- Mixed-version behavior: `<supported or controlled downtime>`
- Deployment gates: `<preflight and evidence>`
- Rollback or forward-fix: `<safe response>`

### 5.5 Risks and mitigations

| Risk ID | Scenario and worst case | Likelihood | Impact | Prevention / detection | Owner | State |
| --- | --- | --- | --- | --- | --- | --- |
| `R-01` | `<risk>` | `<L/M/H>` | `<L/M/H>` | `<control>` | `<owner>` | `OPEN` |

## 6. Delivery strategy

### 6.1 Increment rules

Apply the active development and PR policies. Record the feature-specific
delivery values rather than copying their normative rules:

| Setting | This delivery |
| --- | --- |
| Increment boundary rule | `<development-policy link>` |
| Independent merge condition | `<build/test/behavior/contract condition>` |
| WIP limit | `<policy value>` |
| Integration model | `<short-lived task to main / approved feature integration branch>` |
| Broad-increment justification authority | `<role>` |
| Generated/mechanical change treatment | `<rule/link>` |

Describe how the solution is divided into vertical, independently verifiable
increments and how every increment leaves its integration target working:

- `<delivery slicing rationale>`

Apply the active development policy's dependency and data-sequencing rule.
Do not interpret vertical delivery to mean that every foundation task must be
user-facing: a minimum additive schema/migration increment is valid when it is
independently verified, safe while dormant, and required by a named consumer.
Do not create speculative data structures merely to make a separate task.

Use `FOUNDATION` for the compatible durable shape, `CONSUMER` for dependent
behavior, `MIGRATION` for stored-data or read/write-ownership movement, and
`CLEANUP` for obsolete schema/path removal. Use `NONE` when a task has no
durable-data dependency.

| Data change | Class | Foundation task(s) | Consumer/migration task(s) | Cleanup task(s) | Compatibility evidence |
| --- | --- | --- | --- | --- | --- |
| `<entity/contract or None>` | `<NONE/ADDITIVE/TRANSITIONAL/DESTRUCTIVE>` | `<IDs/None>` | `<IDs/None>` | `<IDs/None>` | `<test/gate/reason>` |

### 6.2 Task state application

<!-- sdd-section: task-state-rules -->

```text
PLANNED -> READY -> IN_PROGRESS -> VERIFYING -> DONE
   |          |          |             |
   +----------+----------+-----------> BLOCKED

Any non-DONE task -> CANCELLED
```

Use the exact state meanings, WIP limit, blocker rules, and transition gates from
the active development policy. If this delivery permits parallel non-overlapping
tasks, record the owners, boundaries, and reason here: `<value or None>`.

### 6.3 Definition of Ready for a task

<!-- sdd-section: definition-of-ready -->

DoR verifies that the task can be implemented without inventing product or
system behavior. It does not require advance prescription of ordinary,
contract-equivalent internal engineering choices.

- [ ] Dependencies are `DONE` or their required artifacts are available.
- [ ] Referenced contracts are approved and testable.
- [ ] Scope, non-scope, expected production files, and the self-contained
      independent-merge boundary are recorded.
- [ ] Acceptance criteria and task-specific tests are defined.
- [ ] The canonical source boundary and attention-map applicability are
      identified, required sources are available/current, and the exact current
      revision will be frozen by the post-`READY` context receipt.
- [ ] Data, security, concurrency, failure, compatibility, and operational
      impacts are understood or explicitly not applicable.
- [ ] The task's data phase is recorded; every required foundation predecessor
      is `DONE`, or inseparable data/behavior scope has an approved exception.
- [ ] Existing dirty worktree files are attributed and preserved.
- [ ] The test strategy's Red closure boundary is satisfied: this task owns the
      Green implementation for every required behavioral test it introduces,
      or a contract-only predecessor uses `PROPOSED` status and passing static
      validation without an intentionally failing runtime test.
- [ ] No unresolved clarification makes the implementation ambiguous.

### 6.4 Pre-start task context receipt gate

<!-- sdd-section: context-receipt-gate -->

Apply the active development policy's task context receipt after a task becomes
`READY` and before it enters `IN_PROGRESS`. The receipt is per task and does not
add a workflow state. Complete the receipt in that task's execution record;
reference stable IDs and canonical links instead of duplicating policy text.

An independent reviewer reconciles the receipt against the complete approved
source set and records a disposition. If a governing source revision changes,
mark the receipt `STALE`, pause affected work at the next safe boundary, and
refresh it before continuing. `READY -> IN_PROGRESS` is permitted only when the
receipt is `APPROVED`, or `NOT_APPLICABLE` with a policy-valid reason.

### 6.5 Definition of Done for a task

<!-- sdd-section: definition-of-done -->

- [ ] Acceptance criteria and referenced contracts are implemented.
- [ ] The task context receipt was approved before implementation and remained
      current, or every later source change was reconciled and reapproved.
- [ ] Required Red-Green-Refactor evidence is recorded.
- [ ] Applicable focused tests and changed-file coverage pass.
- [ ] Applicable full regression, smoke, and E2E gates pass under the test
      policy.
- [ ] Failure triage exists for every encountered failure before remediation.
- [ ] Data-phase migration and compatibility evidence passes where applicable.
- [ ] Schema, API, security, observability, operations, and documentation are
      updated where applicable.
- [ ] Diff contains no unrelated changes, secrets, debug artifacts, or
      unexplained generated output.
- [ ] PR review and merge requirements are satisfied.
- [ ] Actual change summary, evidence, decisions, and next-ready task are
      recorded in this plan.

## 7. Dependency-ordered task ledger

<!-- sdd-section: task-ledger -->

`NEXT` identifies dependency-ready tasks permitted to start within the active
WIP policy. Use exactly one marker when the project requires a single-next-task
model. `Data phase` is `NONE`, `FOUNDATION`, `CONSUMER`, `MIGRATION`, or
`CLEANUP` under the active development policy.

| ID | State | Next | Depends on | Blocked by | Source freshness | Spec state | Data phase | Outcome / vertical slice | Contract IDs | Independent merge boundary | PR |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `T00` | `PLANNED` | | `None` | `None` | `CURRENT` | `SPEC_PENDING` | `NONE` | `<task outcome>` | `<IDs>` | `<why it is independently safe>` | `—` |
| `T01` | `PLANNED` | | `T00` | `None` | `CURRENT` | `SPEC_PENDING` | `<phase>` | `<task outcome>` | `<IDs>` | `<why it is independently safe>` | `—` |

Task-ledger evolution rules:

- Add, split, reorder, block, or cancel tasks only with a change-log entry and
  dependency/contract impact assessment.
- Never reuse an ID or erase a completed/cancelled task.
- `CANCELLED` is terminal for an uncompleted task and records why its outcome is
  no longer required; never relabel a `DONE` task as cancelled.
- Every ledger row participates in the plan-level validation gate. Before the
  plan enters `VALIDATING`, every row must be `DONE` or reviewed `CANCELLED`,
  every `Next` cell must be empty, and `Next ready task(s)` must be `None`.
  A task in `VERIFYING` is still implementation work, not plan validation.
- Move deferred outcomes out of the active delivery only through a reviewed
  scope change; preserve their owner and durable tracking reference.
- Recompute `NEXT` after every material change.
- Before a task becomes `READY`, expand its complete specification below,
  change `Spec state` to `COMPLETE`, verify source freshness, and review its DoR.
- An open blocker prevents `NEXT` only for tasks that list that blocker directly
  or depend on a blocked task. It does not stop independent work.
- A newly discovered design-level ambiguity returns to the linked whiteboard;
  do not hide solution discovery inside an implementation task.

## 8. Task specifications and execution records

<!-- sdd-section: task-specifications -->

Copy this subsection when a task is proposed for `READY`; future `PLANNED`
tasks may remain summarized in the ledger as `SPEC_PENDING`. Freeze the scope
when it becomes `READY`; append execution evidence rather than replacing the
original contract.

`COMPLETE` means the task fixes or references every product/system decision
needed for implementation while preserving bounded engineering discretion. It
requires no unresolved ambiguity that would make the implementer choose
observable behavior or a material risk boundary. Linked approved contracts
satisfy the requirement without duplication. Before requesting DoR review,
self-check this specification against Section 6.3 and the
[calibration guide](../../docs/task-specification-calibration.md).

<!-- sdd-task-spec: TNN -->
### TNN — `<task name>`

| Field | Value |
| --- | --- |
| State | `PLANNED` |
| Depends on | `<IDs>` |
| Data phase | `<NONE/FOUNDATION/CONSUMER/MIGRATION/CLEANUP>` |
| Source boundary | `<components/directories and expected production files or areas>` |
| Compatibility before/after | `<schema/application compatibility boundary or Not applicable>` |
| Contract IDs | `<IDs>` |
| Owner | `<owner>` |
| Branch / PR | `<value>` |
| Context receipt | `NOT_STARTED` |
| Context source revision | `Not recorded` |
| Self-contained boundary | `<why this task can merge without unmerged follow-up>` |
| Actual change summary | `Not recorded` |

Outcome: `<independently demonstrable value>`

Task requirements:

- `<contract IDs and task-level observable requirements>`

Approved solution for this slice:

- `<how this task implements the parent design without redesigning it>`

Gap closed:

- `<gap IDs/current-to-required transition>`

Scope:

- `<allowed production boundary>`

Not in scope:

- `<explicit exclusion>`

Dependencies and gates:

- `<predecessors, artifacts, migrations, environments, policy gates>`

Task context receipt (complete after `READY` and before `IN_PROGRESS`):

| Receipt field | Recorded value |
| --- | --- |
| Implementer / type / timestamp | `<human or agent identity; type; timestamp>` |
| Approved source set / revision | `<links and immutable commit/version>` |
| Outcome / non-scope | `<concise reconciliation>` |
| Contracts / decisions | `<stable IDs and canonical links>` |
| Critical obligations / prohibitions | `<IDs, links, and local consequence>` |
| Risks / exceptions / boundaries | `<IDs and links, or None>` |
| Dependencies / data phase | `<predecessors and phase>` |
| Required completion evidence | `<acceptance, tests, and other gates>` |
| Ambiguities / conflicts / map omissions | `<None or blocking details>` |
| Review disposition | `<APPROVED/CHANGES_REQUESTED/NOT_APPLICABLE; reviewer; reason>` |

Delivery guide:

1. `<safe implementation order>`
2. `<transaction/migration/deployment boundary>`
3. `<verification and handoff order>`

Acceptance criteria:

- [ ] `<observable criterion>`

Required tests and evidence:

- `<focused, regression, race, smoke, E2E, migration, or documentation check>`

Implementation and validation record:

- `<append timestamps, commits, commands, results, failure justifications, and
  evidence links>`

## 9. Live execution snapshot

Update this table whenever task state, branch, blocker, validation, or next work
changes.

| Field | Current value |
| --- | --- |
| Plan state | `<state>` |
| Current task | `<ID or None>` |
| Next ready task(s) | `<IDs or None>` |
| Active branch / PR | `<value>` |
| Last completed task | `<ID or None>` |
| Active blocker | `<ID or None>` |
| Last validation | `<summary and timestamp>` |
| Next action | `<one concrete action>` |

## 10. Evidence, decisions, and change history

### 10.1 Contract traceability

| Contract ID | Design decision | Delivery tasks | Tests | Final evidence |
| --- | --- | --- | --- | --- |
| `<ID>` | `<D-ID>` | `<T-IDs>` | `<tests>` | `<result/link>` |

### 10.2 Failure and blocker log

| ID | Time | Task | Observed vs expected | Classification and evidence | Decision / unblock condition | State |
| --- | --- | --- | --- | --- | --- | --- |
| `B-01` | `<time>` | `<ID>` | `<failure>` | `<triage>` | `<next step>` | `OPEN` |

### 10.3 Decision log

| Time | Decision ID | Event | Rationale and consequences | Approved by |
| --- | --- | --- | --- | --- |
| `<time>` | `<D-ID>` | `<proposed/accepted/superseded>` | `<reason>` | `<owner>` |

### 10.4 Plan change log

| Time | Changed by | Sections | Change and reason | Contract/task impact |
| --- | --- | --- | --- | --- |
| `<time>` | `<owner>` | `<sections>` | `<change>` | `<impact>` |

## 11. Plan-level validation and closure

### 11.1 Definition of Done

- [ ] Every required system contract has implementation and passing evidence.
- [ ] Every required task is `DONE`; no critical blocker remains open.
- [ ] Required tests and release gates pass under the repository test policy.
- [ ] Security, privacy, reliability, performance, observability, migration,
      deployment, rollback, and operations are verified or explicitly not
      applicable with reasons.
- [ ] Public/API/runbook documentation reflects the delivered behavior.
- [ ] Deferred work has an owner and durable tracking reference.
- [ ] Final review confirms the implementation, contracts, and evidence agree.

### 11.2 Delivery retrospective

| Topic | Intended | Observed/evidence | Learning | Action/owner |
| --- | --- | --- | --- | --- |
| Outcome/value | `<value>` | `<value>` | `<learning>` | `<action/None>` |
| Requirements/design quality | `<value>` | `<value>` | `<learning>` | `<action/None>` |
| Task sizing/dependencies | `<value>` | `<value>` | `<learning>` | `<action/None>` |
| TDD/defect discovery | `<value>` | `<value>` | `<learning>` | `<action/None>` |
| Policy gaps/effectiveness | `<value>` | `<value>` | `<learning>` | `<action/None>` |
| Review/operations/context | `<value>` | `<value>` | `<learning>` | `<action/None>` |

Route improvements through the development policy: immediate plan correction,
proposed policy/template change, tooling/test task, durable issue, or no action.
Do not silently mutate an active policy from this record.

### 11.3 Archive handoff

Apply the active development policy's archive rules:

1. Reconcile every contract, decision, task, PR, test result, failure,
   exception, retrospective action, and deferred item.
2. Record actual results without deleting original estimates or accepted
   history.
3. Mark the plan `COMPLETE` and change its title from `Implementation Plan` to
   `Delivery Record`.
4. Archive at `<policy-defined path>` and link the concluded whiteboard.
5. Repair inbound references or preserve a redirect when required.
6. Treat the record as dated evidence; later work starts a new whiteboard and
   plan that link back rather than resuming this ledger.

## 12. External methodology references

These sources inform the template but do not override repository contracts.
Remove this provenance section from an instantiated plan unless the project
requires it:

- [GitHub Spec Kit](https://github.com/github/spec-kit): specification,
  clarification, planning, task decomposition, cross-artifact analysis, and
  implementation phases.
- [Google Engineering Practices — Small CLs](https://google.github.io/eng-practices/review/developer/small-cls.html): self-contained, reviewable changes that keep the system working.
- [Google Cloud — Architecture decision records](https://docs.cloud.google.com/architecture/architecture-decision-records): decisions, alternatives, rationale, timestamps, and code-adjacent records.
- [Microsoft — Architecture design specification](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-design-specification): plan-of-record metadata, API/data contracts, rollout, rollback, testing, security, monitoring, and alternatives.
- [Microsoft — Maintain an architecture decision record](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record): append-only accepted decisions and explicit supersession.
- [Microsoft Azure DevOps — What is Agile?](https://learn.microsoft.com/en-us/devops/plan/what-is-agile): continual planning, explicit value, and Definition of Done.
- [AWS Prescriptive Guidance — ADR process](https://docs.aws.amazon.com/prescriptive-guidance/latest/architectural-decision-records/adr-process.html): lifecycle-managed records of significant architectural context, decisions, and consequences.
