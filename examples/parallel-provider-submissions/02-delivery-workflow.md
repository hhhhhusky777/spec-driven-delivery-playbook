# Parallel Provider Submissions — Delivery Workflow and Manifest

## 1. Workflow control

| Field | Value |
| --- | --- |
| State | `ARTIFACTS_SELECTED` |
| Input | [Concluded whiteboard](01-solution-whiteboard.md) |
| Selected route | Route 3 — Systemic design |
| Reason | Cross-component schema, queue, locking, provider side-effect, billing, recovery, API, and deployment change |
| Current artifact | ADR and full implementation plan generated for example |
| Next action | Instantiate against a real project, complete code/schema discovery, then approve `READY` |

## 2. Classification

| Dimension | Result | Route effect |
| --- | --- | --- |
| Conceptual scope | Systemic shared topology | Route 3 |
| Reversibility | Moderate/difficult after queued tasks/schema rollout | ADR required |
| Data/billing | High | Full plan and exactly-once evidence |
| Concurrency/external effects | High | Lock audit, idempotency, race/fault tests |
| Compatibility | Unreleased target-schema migration | No legacy compatibility layer, but API/admin update required |
| Performance | Material latency/concurrency change | Bounded concurrency evidence in plan |
| Requirement uncertainty | Low after whiteboard; repository facts still require discovery | Planning discovery gate |

## 3. Artifact manifest

| Order | Artifact | Decision | Reason | Template/authority | State/link |
| --- | --- | --- | --- | --- | --- |
| 0 | Solution whiteboard | `REUSE` | Concluded workflow input | Discovery template | [Concluded](01-solution-whiteboard.md) |
| 0 | Development policy | `REUSE` | Existing project-wide authority | Project instance of development-policy template | Assumed active |
| 0 | Test strategy | `REUSE` | Existing project-wide quality gates | Project instance of test-strategy template | Assumed active |
| 0 | PR/branch policy | `REUSE` | Existing integration/review rules | Project instance of PR template | Assumed active |
| 0 | Database concurrency policy | `REUSE` | Existing lock ordering applies | Active project specialized policy | Audit required in plan |
| 1 | New specialized policy | `SKIP` | No uncovered reusable invariant; provider details remain feature-specific | Specialized-policy trigger | Justified |
| 1 | Existing-system lock audit | `GENERATE` | New topology touches job/submission locks and transactions | Implementation-plan discovery task | Selected |
| 2 | Queue topology ADR | `GENERATE` | Significant difficult-to-reverse architectural choice | ADR template | [Generated](03-adr-queue-per-submission.md) |
| 3 | Implementation plan | `GENERATE_FULL` | Seven-plus dependent production increments | SDD implementation-plan template | [Generated](04-implementation-plan.md) |
| 3 | Feature test matrix | `GENERATE` | High-risk state/race/provider/billing behavior | Plan system contracts | Included in plan |
| 4 | API/admin documentation | `UPDATE_EXISTING` | Parent provider identity/search changes | Project API/admin docs | Final task |
| 4 | Worker/recovery runbook | `UPDATE_EXISTING` | Task entry points, drain, and reconciliation change | Project runbook | Final task |
| — | Dedicated performance plan | `SKIP` | Named overlap/load assertions fit plan and active test strategy | Test strategy | Justified |
| — | Provider-resilience policy | `DEFER` | One provider-specific contract does not yet justify cross-feature policy | Policy registry | Reassess if repeated |

## 4. Generation and gate order

```text
whiteboard conclusion
    -> reuse active project policies
    -> generate/accept queue-topology ADR
    -> complete repository discovery and lock audit
    -> freeze full implementation plan/contracts/tasks
    -> Definition of Ready
    -> dependency-ordered TDD task PRs
    -> full validation and operational drain evidence
    -> retrospective and delivery record
```

| Stage | Gate | Return path |
| --- | --- | --- |
| ADR | Decision/options/consequences accepted | Whiteboard if topology changes |
| Discovery | Schema, locks, queues, API/admin, retry and billing facts verified | Whiteboard for design contradiction; plan for scope correction |
| Plan | Contracts unambiguous; tasks bounded/dependency-ready | Whiteboard or policy gap workflow |
| Delivery | Per-task DOD and active test/PR policies | Failure triage to responsible layer |
| Validation | All contract/risk evidence and graceful-drain proof | Responsible task/contract |
| Archive | Manifest, evidence, retrospective, and links reconcile | Closure correction |

## 5. Rerouting examples

- Discovery finds no safe existing lock order -> create `POLICY_GAP`, generate a
  specialized database-concurrency policy update, reroute before production
  tasks.
- Provider documentation disproves idempotency -> return to whiteboard because
  crash recovery architecture changes.
- A new public compatibility promise appears -> update the whiteboard/plan and
  generate a migration/compatibility artifact.
- Test failure shows a wrong expected state -> return to the system contract,
  not directly to the assertion.

## 6. Current handoff

| Field | Value |
| --- | --- |
| Workflow state | `ARTIFACTS_SELECTED` |
| Completed artifacts | Whiteboard, manifest, example ADR, example plan |
| Next ready action | Apply S00/S01 discovery to the target repository |
| Active blocker | Real repository evidence is intentionally absent from this reusable example |
| Implementation authorized | No; project instantiation and review required |
