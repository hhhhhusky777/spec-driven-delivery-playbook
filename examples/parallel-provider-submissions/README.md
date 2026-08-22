# Worked Example: Parallel Provider Submissions

This example shows how a real multi-round design discussion becomes a routed,
implementation-ready delivery packet.

The example is based on a design-job system where an ordinary job creates one
provider submission and a report job may create several. Synchronous provider
requests are currently executed sequentially, increasing total latency and
mixing parent-job and submission responsibilities.

## Artifact path

1. [Solution whiteboard](01-solution-whiteboard.md)
   - Captures requirements, corrections, alternatives, provider retry evidence,
     rejected ideas, and the accepted handoff.
2. [Approved whiteboard handoff](01a-whiteboard-handoff.md)
   - Normalizes the concluded whiteboard into a small reviewed data contract and
     records the manual example trigger.
3. [Delivery workflow and manifest](02-delivery-workflow.md)
   - Selects Route 3, reuses project policies, generates one ADR and a full
     implementation plan, explains skipped artifacts, and reviews each selected
     document before proceeding.
4. [ADR: queue per submission](03-adr-queue-per-submission.md)
   - Preserves the significant topology decision and alternatives.
5. [Implementation plan](04-implementation-plan.md)
   - Defines system contracts, responsibilities, dependencies, small tasks,
     test intent, and the implementation readiness gate.

## What the router selected

| Artifact | Decision | Why |
| --- | --- | --- |
| Development policy | `REUSE` | Project-wide policy already exists |
| Test strategy | `REUSE` | Feature test matrix references the active project strategy |
| PR/branch policy | `REUSE` | No integration-policy change |
| Database concurrency policy | `REUSE` | Existing job/submission lock rules cover the design |
| Specialized policy | `SKIP` | No new cross-feature invariant remains after applying existing policies |
| ADR | `GENERATE` | Queue topology is significant and difficult to reverse |
| Implementation plan | `GENERATE_FULL` | Cross-component schema, worker, retry, reconciliation, and finalization work |
| Dedicated performance plan | `SKIP` | Bounded concurrency evidence fits the implementation plan |
| API documentation update | `UPDATE_EXISTING` | Parent provider identity and admin search behavior change |
| Runbook update | `UPDATE_EXISTING` | Worker drain and stale-work recovery change |

## Review progression

The example uses a manual trigger after handoff approval. The manifest is then
approved, the ADR is generated and approved, and only then is the implementation
plan generated. The plan remains in `CONTRACT_REVIEW`, so implementation is not
authorized. A real project may use automatic triggering, but it follows the
same approval states and one-artifact-at-a-time gates.

## Evidence status

This is a documentation example, not a completed product delivery:

- Requirements and design decisions are shown as accepted for the example.
- Implementation tasks are dependency-ordered and ready for project-specific
  code discovery before execution.
- Commands, commits, test counts, coverage, smoke, E2E, and deployment evidence
  remain explicitly unexecuted.
- The plan must be instantiated and revalidated against a real repository before
  any `DONE` or passing claim is made.

## Lessons demonstrated

- The issue description can expose a problem without defining the solution.
- Pseudocode can guide structure without being engineering-complete.
- A higher-level job lock does not protect concurrent submission tasks after it
  is released; holding it would serialize provider calls.
- Existing states can be reused when their semantics and recovery rules are
  explicit; a new status is not automatically necessary.
- A job poller can coordinate sibling completion without submissions knowing
  about each other.
- Retrying the original job can preserve completed submissions and requeue only
  failed work.
- Provider idempotency has an expiry boundary that recovery must respect.
- Data-dependent tasks establish a minimum compatible foundation before worker
  consumers and postpone destructive parent-field cleanup until all users move.
- Policies are reused; they are not regenerated for each feature.
