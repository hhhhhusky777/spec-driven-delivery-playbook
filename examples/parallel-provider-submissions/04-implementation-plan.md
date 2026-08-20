# Parallel Provider Submissions — Example Implementation Plan

This plan demonstrates the output of the workflow. It is structurally ready for
project instantiation but does not claim repository discovery, implementation,
or test evidence.

## 0. Control and current state

| Field | Value |
| --- | --- |
| Plan state | `CONTRACT_REVIEW` |
| Review state | `IN_REVIEW` |
| Review owner | Project-specific product, engineering, QA, and operations reviewers |
| Mode | `FULL` |
| Whiteboard | [Concluded](01-solution-whiteboard.md) |
| Approved handoff | [Worked-example input](01a-whiteboard-handoff.md) |
| Workflow | [Artifact manifest](02-delivery-workflow.md) |
| ADR | [EX-001](03-adr-queue-per-submission.md) |
| Current task | `None` |
| Next task | `S00` — project instantiation and discovery |
| Implementation authorized | No; S00–S02 and project approval required |

Review record:

| Round | Reviewer | Type | Result | Next action |
| --- | --- | --- | --- | --- |
| 1 | Project-specific reviewers required | Human and/or independent agent | `IN_REVIEW` | Complete repository discovery and resolve comments before `READY` |

## 1. Outcome and scope

### Outcome

Ordinary and report jobs share one durable submission lifecycle. Multiple
provider submissions can execute independently, async providers are polled per
submission, a job poller waits for all terminal children, and one centralized
finalizer owns job-type output and parent billing/state.

### In scope

- Parent/submission schema and source-of-truth migration
- Job coordinator fan-out
- Sync/async submission processing and polling
- Job polling and centralized finalization
- Stale/lost-work reconciliation
- Selective retry of the original job
- API/admin provider-ID migration
- Observability and graceful worker drain
- Required tests, contracts, and operational documentation

### Out of scope/YAGNI

- Provider callbacks
- New submission status
- Immediate sibling cancellation
- New per-provider limiter without capacity evidence
- Production compatibility for a product explicitly confirmed unreleased

## 2. Applicable authorities

Real instantiation must replace these assumed authorities with canonical links:

| Authority | Plan use |
| --- | --- |
| Development policy | Increment size, state, YAGNI, handoff, archive |
| Test strategy | TDD, coverage, regression, live environments, failure triage |
| PR/branch policy | Task branches, review, merge, evidence |
| Database concurrency policy | Job/submission lock order, transactions, non-5xx race behavior |
| Provider contracts | Idempotency, timeout, retry, provider ID, polling |

Policy-gap result: no new specialized policy generated. S01 must reopen routing
if the existing concurrency policy cannot govern all affected locks.

## 3. System contracts

### Functional lifecycle

| ID | Contract |
| --- | --- |
| `FC-01` | Preparation creates one submission for an ordinary job and one per provider-backed report item for a report job. |
| `FC-02` | The coordinator durably prepares children, queues eligible child processing, changes the parent to `RUNNING`, queues the job poller, and releases the job lock before provider calls. |
| `FC-03` | Child processing, provider persistence, polling, retry, and reconciliation contain no ordinary/report branches. |
| `FC-04` | Sync child: atomically claim and change to `RUNNING` immediately before the provider call. |
| `FC-05` | Async child: remain `PENDING` during submission; atomically store provider ID and change to `RUNNING` after acceptance. |
| `FC-06` | Async child poller queries/reschedules only its submission. |
| `FC-07` | Job poller reads sibling state only. It reschedules while any child is active and calls the finalizer after all are terminal. |
| `FC-08` | The parent remains `RUNNING` until all children are terminal. A failed child does not cancel active siblings. |
| `FC-09` | Centralized finalization alone chooses parent success/failure, performs job-type output work, and settles/releases billing once. |
| `FC-10` | Retrying uses the original parent, preserves completed children/assets, resets/requeues only eligible failed children, and queues the job poller. |
| `FC-11` | Provider ID is submission-owned; API/admin behavior derives/searches through submissions. |

### State contract

```text
Parent:     PENDING -> RUNNING -> COMPLETED
                          |          ^
                          +-> FAILED-+ selective retry of original parent

Submission: PENDING -> RUNNING -> COMPLETED
                 |          |
                 +----------+-> FAILED
```

State interpretation:

- Sync `RUNNING` without provider ID: provider request is claimed/in progress or
  ambiguously interrupted; recovery requires exact request/key and valid expiry.
- Async `PENDING`: provider has not been durably accepted.
- Async `RUNNING` with provider ID: submission poller owns progress.
- Terminal submissions are immutable except through the explicit retry contract
  for eligible failed work.

### Lock and transaction contract

| Boundary | Lock/claim | Maximum scope |
| --- | --- | --- |
| Job preparation/retry/finalization | Job lock plus required DB transaction | Never includes provider network call |
| Submission processing | Submission lock or atomic DB claim | One child provider attempt/persistence boundary |
| Submission polling | Submission lock | One provider query/persist/reschedule operation |
| Job polling | Job lock | Read siblings and finalize/reschedule decision |

S01 must document canonical lock order and prove no path acquires it in reverse.
Race conflicts return the stable retryable non-5xx result required by project
policy.

### Queue and recovery contract

- Payloads contain `job_id` or `submission_id`, not ORM objects, secrets, signed
  URLs, or mutable prepared structures.
- Deterministic queue identities suppress redundant scheduled work but do not
  replace database/provider idempotency.
- Reconciler actions:
  - eligible stale `PENDING` child -> enqueue processing;
  - eligible stale `RUNNING` async child -> enqueue provider polling;
  - active parent without effective job poll -> enqueue job polling;
  - all-terminal children with non-terminal parent -> enqueue/invoke finalizer.
- A worker that cannot acquire the relevant lock skips/reschedules; it does not
  run competing work.

### Provider retry contract

- Persist canonical request snapshot, hash, idempotency key, creation time, and
  attempt metadata at the provider-safe boundary.
- Retry exact request/key for connection loss/timeouts, `429`, and documented
  `5xx` responses.
- Do not automatically retry `4xx` client or provider business errors.
- Default schedule: 1/2/4-second exponential delays, maximum 30 seconds,
  0–1-second jitter, maximum three retries; respect safe `Retry-After`.
- Seedream key validity: 24 hours. Automatic ambiguous replay after expiry is
  prohibited.
- A corrected/changed request uses a new provider attempt/key while retaining
  the same logical parent job and audit history.

### Failure and billing contract

- Internal transient errors exhaust bounded automatic retry before terminal
  child failure.
- Definitive non-retryable provider errors fail the child.
- Parent failure is decided only after all children become terminal.
- Completed child output remains available for original-job selective retry.
- Reservation, settlement, and release are idempotent and occur once according
  to the existing parent billing contract.
- Late/duplicate child results cannot revive a terminal incompatible parent.

### Deployment contract

- New workers become ready before old workers stop fetching new work.
- Old workers drain in-flight tasks within the configured grace period.
- Removal of old entry points requires proof that immediate, deferred, and
  scheduled legacy jobs are empty.
- Termination after provider acceptance but before DB persistence is recoverable
  through idempotency and reconciliation.

## 4. Responsibility design

| Component | Owns | Must not own |
| --- | --- | --- |
| Preparer | Job-type branch, child count, immutable snapshots | Provider execution/final effects |
| Coordinator | Parent lock/reservation/fan-out/RUNNING/job poll | Provider wait |
| Child processor | One child provider submission/result | Siblings/job-type logic |
| Child poller | One async provider operation | Parent terminal decisions |
| Job poller | All-child observation/finalizer trigger | Provider calls/final branches |
| Job finalizer | Parent result/billing/terminal state by job type | Provider communication |
| Reconciler | Reconstruct missing/stale work | Alternative lifecycle |

## 5. Test and evidence matrix

The real plan imports exact project gates. This feature additionally requires:

| Contracts/risks | Required evidence |
| --- | --- |
| `FC-01`–`FC-03` shared lifecycle | Ordinary/report unit and contract tests proving branches exist only in preparation/finalization |
| Parallel sync work | Deterministic barrier/event proof that two provider calls overlap; no arbitrary sleep assertion |
| Duplicate delivery | Duplicate process, child-poll, job-poll, and finalizer tests |
| Crash windows | Before call; accepted before DB commit; DB commit before queue enqueue |
| Provider idempotency | Exact key/body reuse, retryable/non-retryable classes, 24-hour expiry |
| Locks/races | Job/child lock scope, ordering, contention, late results, non-5xx retryable races |
| Reconciliation | Stale pending/running children, missing job poll, all-terminal active parent |
| Partial failure | One failed child while siblings finish; parent waits then fails once |
| Selective retry | Original parent; completed children skipped; failed children requeued |
| Billing | Reservation/settlement/release exactly once across duplicates/failure/retry |
| API/admin | Parent provider field removal/derivation and provider-ID search through child |
| Deployment | Graceful drain and proof of no legacy scheduled tasks |
| Regression/live | Active project full regression, changed-boundary smoke, E2E, provider/storage matrix |

A test failure requires the active strategy's written failure justification
before product, configuration, or test remediation.

## 6. Dependency-ordered delivery ledger

Each production task targets the project's small-change budget (for example,
approximately 300 changed production LOC excluding tests/docs). Final boundaries
are frozen after S01.

| ID | State | Depends | Outcome | Product scope estimate |
| --- | --- | --- | --- | --- |
| `S00` | `NEXT` | None | Instantiate this packet with canonical policies, paths, issue, owners, branch model, and test environments. | Docs only |
| `S01` | `PLANNED` | S00 | Inventory schema/constraints, provider adapters, locks/transactions, queue entry points, reconciliation, billing, API/admin reads, and drain behavior; classify policy compliance. | Discovery/docs/tests only |
| `S02` | `PLANNED` | S01 | Resolve discoveries, accept project ADR/contracts, freeze task scopes/LOC/tests, and pass Definition of Ready. | Docs only |
| `T01` | `PLANNED` | S02 | Make submission the provider-ID source of truth; migrate constraints and API/admin search while keeping the integration target working. | ~300 + migration |
| `T02` | `PLANNED` | T01 | Add durable child processing, child exclusion, exact request snapshots, sync/async state transitions, and bounded provider retry. | ~300 |
| `T03` | `PLANNED` | T02 | Refactor parent coordination into prepare/fan-out/parent RUNNING/initial job poll without holding the job lock during provider work. | ~300 |
| `T04` | `PLANNED` | T03 | Add async child polling and child stale-work reconciliation. | ~300 |
| `T05` | `PLANNED` | T04 | Add database-observing job polling and centralized idempotent job finalization for ordinary/report outcomes. | ~300 |
| `T06` | `PLANNED` | T05 | Add original-job selective retry, expired-key/new-attempt handling, and exactly-once billing race coverage. | ~300 |
| `T07` | `PLANNED` | T06 | Add observability, queue-age/retry signals, graceful drain, legacy-task removal gate, and runbook/API updates. | ~300 |
| `T08` | `PLANNED` | T01–T07 | Run complete project quality gates, reconcile contract evidence, retrospective, and archive record. | Tests/docs/config |

## 7. Task-level SDD example: T02

Requirements: `FC-03`–`FC-05`, provider retry contract, lock contract.

Gap closed: sequential parent-owned provider execution becomes one durable,
independently recoverable child operation.

Boundaries:

- In: queue entry point, durable reload, child claim/lock, provider adapter call,
  acceptance/result persistence, retry classification.
- Out: parent fan-out, job polling/finalization, user retry endpoint.

Delivery order:

1. Add failing state/idempotency/duplicate/crash-window tests.
2. Implement ID-only worker entry point and durable reload.
3. Implement atomic child claim and provider request boundary.
4. Add sync/async paths under the shared lifecycle.
5. Refactor while focused tests remain green.
6. Run task-required regression/live gates and record evidence.

Task DOD includes active project policy plus: no job-type branch, no job lock
across provider call, exact retry request/key, and deterministic duplicate/crash
evidence.

## 8. Definition of Ready

- [ ] S00 canonical project references are complete.
- [ ] S01 evidence confirms current schema, locks, queue, billing, API, and
      deployment facts.
- [ ] Any new policy gap is resolved or rerouted.
- [ ] ADR is accepted by project owners.
- [ ] State, retry, failure, billing, migration, and deployment contracts are
      unambiguous and testable.
- [ ] Task scopes, dependencies, expected product LOC, owners, and gates are
      frozen.
- [ ] Existing dirty/user-owned files are attributed and preserved.

Example status: `NOT YET READY` because it deliberately lacks a target
repository's S00/S01 evidence.

## 9. Live handoff

| Field | Value |
| --- | --- |
| Plan state | `CONTRACT_REVIEW` |
| Current task | None |
| Next task | S00 |
| Blocker | Project-specific facts/evidence not supplied in reusable example |
| Next action | Copy packet into target project and complete S00/S01 |
| Implementation/test evidence | None claimed |
