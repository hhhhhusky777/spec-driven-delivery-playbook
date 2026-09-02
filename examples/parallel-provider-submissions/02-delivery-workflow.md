# Parallel Provider Submissions — Delivery Workflow and Manifest

## 1. Workflow control

| Field | Value |
| --- | --- |
| State | `ARTIFACT_IN_REVIEW` |
| Input | [Approved and consumed handoff](01a-whiteboard-handoff.md) |
| Consumed handoff version | Worked-example version dated 2026-08-20 |
| Trigger | `MANUAL_INVOCATION`; run ID `parallel-submissions-example-v1` |
| Selected route | Route 3 — Systemic design or policy gap |
| Reason | Cross-component schema, queue, locking, provider side-effect, billing, recovery, API, and deployment change |
| Manifest review | `APPROVED` |
| Current artifact | Full implementation plan in `CONTRACT_REVIEW` |
| Next action | Resolve project-specific discovery, review the plan, then approve `READY` |

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
| 0 | Whiteboard handoff | `REUSE` | Approved workflow input | Handoff template | [Consumed](01a-whiteboard-handoff.md) |
| 0 | Solution whiteboard | `REUSE` | Source discovery record | Discovery template | [Concluded](01-solution-whiteboard.md) |
| 0 | Development policy | `REUSE` | Existing project-wide authority | Project instance of development-policy template | Assumed active |
| 0 | Test strategy | `REUSE` | Existing project-wide quality gates | Project instance of test-strategy template | Assumed active |
| 0 | PR/branch policy | `REUSE` | Existing integration/review rules | Project instance of PR template | Assumed active |
| 0 | Database concurrency policy | `REUSE` | Existing lock ordering applies | Active project specialized policy | Audit required in plan |
| 1 | New specialized policy | `SKIP` | No uncovered reusable invariant; provider details remain feature-specific | Specialized-policy trigger | Justified |
| 2 | Queue topology ADR | `GENERATE` | Significant difficult-to-reverse architectural choice | ADR template | [Generated](03-adr-queue-per-submission.md) |
| 3 | Implementation plan | `GENERATE_FULL` | Seven-plus dependent production increments | SDD implementation-plan template | [Generated](04-implementation-plan.md) |
| 3 | Affected-code lock audit | `GENERATE` | New topology touches job/submission locks and transactions under an already active policy | S01 inside the reviewed implementation plan | `NOT_STARTED`; project instantiation required |
| 3 | Feature test matrix | `GENERATE` | High-risk state/race/provider/billing behavior | Plan system contracts | Included in plan |
| 4 | API/admin documentation | `UPDATE_EXISTING` | Parent provider identity/search changes | Project API/admin docs | Final task |
| 4 | Worker/recovery runbook | `UPDATE_EXISTING` | Task entry points, drain, and reconciliation change | Project runbook | Final task |
| — | Dedicated performance plan | `SKIP` | Named overlap/load assertions fit plan and active test strategy | Test strategy | Justified |
| — | Provider-resilience policy | `DEFER` | One provider-specific contract does not yet justify cross-feature policy | Policy registry | Reassess if repeated |

### Manifest and artifact review ledger

| Artifact | Round | Reviewer | Type | Result | Next action |
| --- | --- | --- | --- | --- | --- |
| Delivery manifest | 1 | Playbook example reviewer | Independent documentation review | `APPROVED` | Generate the first dependency-ready selected artifact |
| Queue-topology ADR | 1 | Playbook example architecture reviewer | Independent documentation review | `APPROVED` | Generate the dependent implementation plan |
| Implementation plan | 1 | Project-specific reviewers required | Human and/or independent agent | `IN_REVIEW` | Complete S00–S02 discovery and resolve review comments |
| API/admin documentation | — | Project-specific reviewer | Human and/or independent agent | `NOT_STARTED` | Wait for approved plan and delivery task |
| Worker/recovery runbook | — | Project-specific reviewer | Human and/or independent agent | `NOT_STARTED` | Wait for approved plan and delivery task |

### Risk-based action control

| Action ID | Target/output | Review mode | Reason/authority | Required gates | Automation boundary | State |
| --- | --- | --- | --- | --- | --- | --- |
| `A-01` | Delivery manifest | `EXPLICIT_REVIEW` | Routing is a semantic decision | Documentation and manifest checks | Not applicable | `COMPLETE` |
| `A-02` | Queue-topology ADR | `EXPLICIT_REVIEW` | Architecture decision | Documentation, contract, and architecture review | Not applicable | `COMPLETE` |
| `A-03` | Implementation plan | `EXPLICIT_REVIEW` | Contracts and task boundaries | Documentation, lifecycle, and plan review | Not applicable | `ACTIVE` |
| `A-04` | Deterministic documentation checks after an approved edit | `REVIEW_ON_EXCEPTION` | Active test strategy | All declared checks pass on exact revision | `A-04` | `PLANNED` |
| `A-05` | Record unchanged successful check evidence | `AUTO_CONTINUE` | Active development policy | Source result/provenance validation | `A-05` | `PLANNED` |
| `A-06` | Archive mechanics after closure approval | `AUTO_CONTINUE` | Active archive policy | Closure invariants and safe-path checks | `A-06` | `PLANNED` |

The automatic rows remain inactive until their project authorities and exact
commands are verified. They fail closed to `EXPLICIT_REVIEW` on any missing or
failed gate, semantic change, ambiguity, unknown impact, drift, stale/blocking
dependency, exception, unrelated diff, or scope expansion. `AUTO_CONTINUED`
will be recorded as execution evidence, never as approval.

### Automation audit ledger

| Action ID | Input/output revision | Mode | Gates/result | Impact/exceptions | Resulting state | Next action |
| --- | --- | --- | --- | --- | --- | --- |
| None | Not run | Not run | Not run | None | No automatic action executed | Continue `A-03` explicit plan review |

## 4. Generation and gate order

```text
approved whiteboard handoff
    -> generate/review/approve delivery manifest
    -> reuse active project policies
    -> generate/review/approve queue-topology ADR
    -> generate full implementation plan in CONTRACT_REVIEW
    -> instantiate project and execute S00/S01 repository discovery + lock audit
    -> revise/review/approve plan contracts and tasks as READY
    -> Definition of Ready
    -> dependency-ordered TDD task PRs
    -> full validation and operational drain evidence
    -> retrospective and delivery record
```

| Stage | Gate | Return path |
| --- | --- | --- |
| Handoff | Approved version and explicit trigger | Whiteboard/handoff refinement |
| Manifest | Route and every artifact decision independently approved | Router or handoff |
| ADR | Decision/options/consequences accepted | Whiteboard if topology changes |
| Discovery | S00/S01 verify schema, locks, queues, API/admin, retry and billing facts within the plan review cycle | Whiteboard for design contradiction; plan for scope correction |
| Plan | Discovery reconciled, contracts unambiguous, and tasks bounded/dependency-ready | Whiteboard or policy gap workflow |
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
| Workflow state | `ARTIFACT_IN_REVIEW` |
| Approved artifacts | Whiteboard handoff, manifest, example ADR |
| Current artifact | Example implementation plan in `CONTRACT_REVIEW` |
| Next ready action | Apply S00/S01 discovery, then submit the plan for project review |
| Active blocker | Real repository evidence is intentionally absent from this reusable example |
| Implementation authorized | No; project instantiation and review required |
