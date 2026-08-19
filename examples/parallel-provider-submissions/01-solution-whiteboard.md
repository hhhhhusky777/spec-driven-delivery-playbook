# Parallel Provider Submissions — Concluded Solution Whiteboard

## 0. Whiteboard control

| Field | Value |
| --- | --- |
| Topic | Shared parallel submission topology for design jobs |
| State | `CONCLUDED` |
| Origin | Need: remove sequential provider submission and simplify ordinary/report lifecycle |
| Evidence type | Multi-round design discussion plus provider retry reference |
| Resulting workflow | [Delivery workflow](02-delivery-workflow.md) |
| Scope warning | Worked example; not runtime evidence for a specific repository |

## 1. Current conclusion

| Field | Conclusion |
| --- | --- |
| Problem | A parent job can own multiple submissions, but synchronous provider requests execute sequentially and parent/submission responsibilities are mixed. |
| Required outcome | One shared submission lifecycle, independent queued execution, submission polling for async providers, job polling for sibling aggregation, and centralized job finalization. |
| Accepted option | `OPT-03` — queue one durable processing task per submission plus one database-observing job poller |
| Confidence | High for topology; project-specific schema/timeouts require implementation discovery |
| Open design blockers | None for example convergence |
| Next action | Route artifacts and generate the implementation plan |

## 2. Need and requirements

### Problem

An ordinary design job creates one provider submission. A report job creates
multiple submissions from report configuration. The current worker awaits
synchronous provider calls sequentially, so total report latency grows with the
sum of provider times. Special report-only lifecycle handling also obscures the
shared domain model.

### Accepted requirements

| ID | Requirement |
| --- | --- |
| `REQ-01` | Preparation creates one durable submission for an ordinary job and one per provider-backed report item for a report job. |
| `REQ-02` | After preparation, ordinary and report submissions use the same processing, provider persistence, polling, retry, and reconciliation paths. |
| `REQ-03` | The coordinator queues one processing task per eligible submission, changes the parent job to `RUNNING`, and queues one job poller. |
| `REQ-04` | Submission provider calls can execute concurrently without duplicate execution of the same submission. |
| `REQ-05` | A sync submission becomes `RUNNING` immediately before its provider call; an async submission becomes `RUNNING` after provider acceptance. |
| `REQ-06` | An async submission poller queries only its provider operation and updates only that submission. |
| `REQ-07` | The job poller reads all sibling states, reschedules while any remain active, and invokes centralized job finalization only after all are terminal. |
| `REQ-08` | One failed submission does not cancel active siblings. After all become terminal, centralized finalization fails the parent. |
| `REQ-09` | Retrying uses the original job, preserves completed submissions/assets, and requeues only failed submissions. |
| `REQ-10` | Provider identity belongs to the submission. Admin search resolves the parent through matching submissions. |
| `REQ-11` | Provider/result asset work belongs to submissions; parent billing, terminal state, and job-type output assembly belong to centralized job finalization. |
| `REQ-12` | Stale jobs/submissions and lost queue handoffs are recoverable from durable state. |

### Non-requirements/YAGNI

| Item | Decision | Reason |
| --- | --- | --- |
| New `SUBMITTING` status | `REMOVE` | Existing `PENDING`/`RUNNING` states are sufficient when sync/async semantics are explicit. |
| New per-provider concurrency limiter | `DEFER` | Provider allocation is high and current user job limits bound initial demand; retain operational configurability. |
| Provider callback system | `REMOVE` | Existing workers can update submissions and a job poller can aggregate durable states. |
| Immediate sibling cancellation | `REMOVE` | Completed/active work should be preserved for selective retry. |
| Parent provider-ID compatibility layer | `REMOVE` | Example assumes an unreleased product and permits target-schema migration. |

## 3. Facts, assumptions, and provider evidence

### Facts

| ID | Fact |
| --- | --- |
| `F-01` | Provider calls are owned by individual durable submissions. |
| `F-02` | Parent-level final effects include terminal job state and token settlement/release. |
| `F-03` | Async providers return an operation/provider ID that can be polled. |
| `F-04` | The synchronous Seedream request supports `X-Idempotency-Key`. |
| `F-05` | Seedream requires the same key and exactly the same request parameters for a safe retry and retains the key for 24 hours. |
| `F-06` | Documented automatic retry classes are connection/read timeouts, connection loss, `429`, and `5xx`; `4xx` and business errors are non-retryable. |

### Assumptions requiring project validation

| ID | Assumption | Validation before implementation |
| --- | --- | --- |
| `A-01` | Existing database constraints can represent the accepted sync/async state semantics after a bounded migration. | Inspect model and migration head. |
| `A-02` | All configured providers honor their documented idempotency behavior. | Capture provider contracts and adapter tests. |
| `A-03` | Graceful worker drain is controlled during deployment. | Verify worker configuration and scheduled queue state. |
| `A-04` | Existing job/submission locking policy defines a safe order. | Audit all affected locks and transactions. |

## 4. Gap analysis

| ID | Current behavior | Required behavior | Gap/risk |
| --- | --- | --- | --- |
| `G-01` | Parent worker loops and awaits sync submissions sequentially. | Independent queued submission tasks. | Latency and failure isolation. |
| `G-02` | Job lock may appear to protect child work. | Job lock ends before provider calls; each child has its own claim/lock. | Shared job lock would serialize work; no child lock permits duplicates. |
| `G-03` | Parent stores provider identity. | Submission is the only provider-ID source of truth. | Duplicate state and inconsistent search/API behavior. |
| `G-04` | Child/provider polling and parent aggregation responsibilities overlap. | Separate submission poller and job poller. | Confusing ownership and retry behavior. |
| `G-05` | Failure may trigger distributed parent special cases. | Centralized all-terminal job finalization. | Double settlement or contradictory terminal state. |
| `G-06` | DB commit and queue enqueue are not atomic. | Reconciler repairs eligible durable states and missing polls. | Permanently stranded work. |
| `G-07` | Idempotency expiry is not a recovery state boundary. | Never automatically replay an ambiguous sync request after 24 hours. | Duplicate generation/cost. |

## 5. Options and corrections

| ID | Option | State | Reason |
| --- | --- | --- | --- |
| `OPT-01` | `asyncio.gather` all provider calls inside the parent worker | `REJECTED` | In-process fan-out couples retries/crash recovery and occupies one worker for the whole group. |
| `OPT-02` | Queue child tasks but hold the job lock in every child | `REJECTED` | The shared lock serializes provider calls and defeats parallelism. |
| `OPT-03` | Queue one task per submission, use child locks, and run a database-observing job poller | `ACCEPTED` | Durable independent retry, horizontal execution, clear ownership, and centralized aggregation. |
| `OPT-04` | No job poller; every child directly finalizes the parent | `REJECTED` | Child tasks would need sibling coordination and duplicate terminal logic. |
| `OPT-05` | Event-only parent aggregation after child terminal transitions | `SUPERSEDED` | Useful optimization, but the accepted scheduled job poller is the primary coordination/recovery mechanism. |

Corrections captured from discussion:

- The issue description exposes the sequential problem; the design discussion
  defines the selected solution.
- Pseudocode is structural input, not implementation-quality code.
- Job and submission status semantics must not be conflated.
- Retrying the original job does not imply blindly reusing an expired provider
  idempotency key.

## 6. Accepted solution

```text
submit_design_job(job_id)
    acquire job lock
    finalize/resolve required inputs
    reserve parent billing once
    prepare one or many durable submissions
    queue process_submission_task(submission_id) for eligible children
    mark parent RUNNING
    queue poll_design_job(job_id)
    release job lock

process_submission_task(submission_id)
    acquire submission lock/claim
    reload durable request snapshot
    sync: mark RUNNING, then send idempotent request
    async: send request while PENDING, then persist provider ID + RUNNING
    persist terminal result or queue poll_submission_task

poll_submission_task(submission_id)
    acquire submission lock
    query provider
    update/reschedule only this submission

poll_design_job(job_id)
    acquire job lock briefly
    any active submissions -> reschedule
    all terminal -> finalize_design_job(job_id)

finalize_design_job(job_id)
    evaluate terminal children
    perform ordinary/report-specific output finalization
    settle or release billing once
    write parent terminal state once
```

## 7. Lock, retry, and failure conclusions

- Job lock: preparation, reservation, parent state, retry setup, and job
  finalization only; never held across provider calls.
- Submission lock/atomic claim: processing and provider polling for one child.
- Stable provider request snapshot and idempotency identity are persisted before
  a sync provider call.
- Automatic retry: initial delay 1 second, exponential 1/2/4 seconds, bounded at
  30 seconds, 0–1 second jitter, default maximum three retries; respect provider
  `Retry-After` within the safety budget.
- Ambiguous sync recovery reuses the exact request/key only inside the 24-hour
  validity window. After expiry, automatic replay is prohibited.
- Internal transient failures retry according to project policy. Definitive
  provider client/business failures make the submission terminally failed.
- The job remains `RUNNING` until every sibling is terminal, even after one
  fails. Centralized finalization then fails the job.

## 8. Policy applicability

| Domain | Decision |
| --- | --- |
| Development/test/PR policies | Reuse active project policies. |
| Database concurrency | Existing policy applies; require an affected-code audit in planning. |
| Provider retry/idempotency | Feature-specific Seedream contract is sufficient now; no cross-feature policy generated. |
| Security/privacy | Existing project policy applies; queue payloads contain durable IDs, not secrets or signed URLs. |
| Performance/capacity | Feature contract and tests are sufficient; no new project policy. |
| New specialized-policy gap | None after applying existing authorities. |

## 9. Routing handoff

| Field | Conclusion |
| --- | --- |
| Change type | Cross-component refactor and worker-topology feature |
| Delivery size | Large/multi-task |
| Risk | High: concurrency, external side effects, billing, recovery |
| Product code affected | Yes |
| Public/API contract affected | Yes: provider identity/search representation |
| Schema/data affected | Yes |
| Shared-state/concurrency affected | Yes |
| Security/privacy/billing affected | Billing and queue payload safety |
| Performance/capacity affected | Yes: parallel execution and queue capacity |
| Deployment/operations affected | Yes: worker entry points, drain, reconciliation |
| Specialized-policy gaps | None |
| Architectural decision | Significant: queue-per-submission topology |
| Expected task count | 7–9 |
| Required evidence | Unit/contract/race/fault/regression/smoke/E2E plus bounded concurrency and drain evidence |

Convergence gate: `PASSED_FOR_EXAMPLE`.
