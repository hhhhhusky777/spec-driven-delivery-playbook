# ADR EX-001: Queue One Durable Task per Provider Submission

## Status and ownership

| Field | Value |
| --- | --- |
| Status | `ACCEPTED_FOR_EXAMPLE` |
| Review state | `APPROVED` for worked-example consistency |
| Review owner | Playbook example architecture reviewer |
| Context | [Concluded whiteboard](01-solution-whiteboard.md) |
| Approved handoff | [Worked-example input](01a-whiteboard-handoff.md) |
| Plan | [Implementation plan](04-implementation-plan.md) |
| Decision IDs | `D-01`, requirements `REQ-02`–`REQ-08`, `REQ-12` |
| Supersedes | Sequential parent-worker submission design |
| Scope warning | Teaching example; a real project must approve its own ADR |

Review record:

| Round | Reviewer | Type | Result | Scope |
| --- | --- | --- | --- | --- |
| 1 | Playbook example architecture reviewer | Independent documentation review | `APPROVED` | Internal example consistency only |

## Context

A parent design job may own multiple provider submissions. Synchronous calls are
currently awaited sequentially inside one parent worker. The desired design
must permit concurrent provider calls while retaining durable retry, crash
recovery, per-submission polling, centralized job completion, and exactly-once
parent billing effects.

## Decision drivers

- Shared ordinary/report submission lifecycle
- Independent retries and stale-work recovery
- Provider idempotency across ambiguous network outcomes
- No duplicate submission execution
- No job-wide lock held across provider calls
- Parent finalization only after all children are terminal
- Horizontal worker scalability and bounded queue concurrency

## Options considered

| Option | Benefits | Costs/risks | Decision |
| --- | --- | --- | --- |
| Sequential loop | Simple local control flow | Sum-of-latencies, coupled retries, no parallelism | Rejected |
| In-process `asyncio.gather` | Concurrent calls with little queue change | One worker owns group lifetime; crash/retry coupling; unbounded fan-out risk | Rejected |
| Child queue tasks with shared job lock | Durable task delivery | Job lock serializes calls | Rejected |
| One durable queued task per submission plus job poller | Independent retry/recovery, horizontal concurrency, clear ownership | More queue tasks, handoff reconciliation, two polling responsibilities | Accepted |
| Child-triggered parent aggregation only | Fast terminal reaction | Children need aggregation knowledge; lost trigger needs fallback | Deferred optimization |

## Decision

Each eligible provider submission is processed by its own durable queued task.
Submission processing and provider polling use submission-scoped exclusion. The
parent job lock is used only for job-owned work and is released before provider
calls. One job poller observes durable sibling states and invokes centralized,
idempotent job finalization after every required submission is terminal.

Queue payloads contain durable identifiers only. The database remains the
source of truth; reconciliation repairs lost database-to-queue handoffs.

## Responsibility consequences

| Component | Owns | Must not own |
| --- | --- | --- |
| Submission preparer | Job-type branching and durable child snapshots | Provider execution/final parent effects |
| Job coordinator | Job lock, reservation, fan-out, parent `RUNNING`, initial job poll | Provider call duration |
| Submission processor | One provider submission and its result | Sibling inspection/job-type finalization |
| Submission poller | One async provider operation | Parent terminal decision |
| Job poller | Sibling observation and finalizer trigger | Provider calls/job-type branches |
| Job finalizer | Parent terminal state, billing, job-type output assembly | Provider communication |
| Reconciler | Lost/stale work reconstruction | Competing lifecycle rules |

## Consequences

Positive:

- Sync submissions can overlap across workers.
- Each child retries and recovers independently.
- Ordinary/report special handling is limited to preparation and finalization.
- Completed sibling work survives a selective retry.

Negative/trade-offs:

- More queued jobs and operational signals are required.
- Database commit and Redis enqueue require reconciliation.
- Lock scopes and task idempotency must be explicit.
- Job and submission pollers have distinct responsibilities that documentation
  and naming must preserve.

## Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Duplicate provider call | Submission claim/lock, exact request snapshot, provider idempotency |
| Stranded committed child | Reconciler requeues eligible durable state |
| Double terminal billing | One idempotent job finalizer under job lock/transaction |
| Hot job polling | Deterministic deferred scheduling and bounded interval |
| Provider replay after key expiry | Prohibit automatic ambiguous replay beyond documented validity |
| Queue overload | Worker concurrency configuration and observable queue age; add limiter only when evidence requires it |

## Verification and revisit triggers

Required evidence includes deterministic overlapping sync calls, duplicate
delivery, lost enqueue, crash windows, async polling, all-terminal failure,
selective retry, exactly-once billing, reconciliation, and graceful drain.

Revisit if providers lose idempotency support, callbacks replace polling,
required task volume exceeds queue capacity, or parent finalization can no
longer be centralized.
