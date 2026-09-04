# SGLang Diagnostic API-Key Redaction — Delivery Workflow

## Workflow control

| Field | Value |
| --- | --- |
| State | `ARTIFACT_GENERATING` |
| Previous state | `ARTIFACTS_SELECTED` |
| Approved handoff | [Workflow input](02-whiteboard-handoff.md) |
| Selected route | Route 2 — Multi-task security defect; full plan, no new policy or ADR |
| Current artifact | [Implementation plan](04-implementation-plan.md) in `CONTRACT_REVIEW` |
| Current artifact review state | `NOT_STARTED` |
| Self-review state | `NOT_STARTED` |
| Self-review candidate revision | `Not recorded` |
| Self-review evidence | `Not recorded` |
| Fresh-context review state | `NOT_STARTED` |
| Fresh-context reviewed revision | `Not recorded` |
| Fresh-context review evidence | `Not recorded` |
| Human review state | `NOT_STARTED` |
| Human reviewed revision | `Not recorded` |
| Human review evidence | `Not recorded` |
| Implementation continuation mode | `NOT_SELECTED` |
| Implementation mode authority | `Not selected` |
| Implementation mode scope | `Not selected` |
| Implementation repository | `Not selected` |
| Implementation mode selected at | `Not selected` |
| Next action | Complete self-review, fresh-context review, and human review; resolve project-owned unknowns |
| Allowed write scope | This example packet only |
| Review mode | `EXPLICIT_REVIEW` |
| Automation boundary | `Not applicable` |
| Automatic gate result | `NOT_APPLICABLE` |
| Semantic decision introduced | `YES` |
| Blockers | SGLang source, compatibility, test, security, and reviewer facts are unverified |

## Artifact routing

| Artifact | Decision | Reason/state |
| --- | --- | --- |
| Existing SGLang security and contribution rules | `REUSE` only after decision-level conformance evidence | Project authority remains canonical |
| Existing PR/branch policy | `UPDATE_EXISTING` if it lacks the required single-task/multi-task route | Never create a duplicate policy |
| Specialized redaction policy | `SKIP` | One feature-specific projection does not yet prove a systemic policy gap |
| Architecture decision record | `SKIP` | The reviewed handoff already selects a local reversible projection boundary |
| Full implementation plan | `GENERATE_FULL` | Security, response compatibility, logs, tests, and two delivery tasks require explicit contracts |
| API/diagnostic documentation | `UPDATE_EXISTING` if the endpoint contract is documented | Canonical consumer-facing source stays authoritative |

### Artifact dependency and freshness register

| ID | Artifact | Depends on | Freshness |
| --- | --- | --- | --- |
| `H-01` | Approved handoff | Concluded whiteboard | `CURRENT` |
| `P-01` | Implementation plan | `H-01`, verified project authorities | `BLOCKED` until project facts are resolved |
| `C-01` | Task context receipts | Approved/current `P-01` | `BLOCKED` |
| `I-01` | Implementation | Approved/current receipts | `BLOCKED` |

### Risk-based action control

| Action | Mode | Gate and behavior |
| --- | --- | --- |
| Whiteboard conclusion and handoff meaning | `EXPLICIT_REVIEW` | Semantic security decisions require review |
| Copying approved IDs/links into the workflow | `AUTO_CONTINUE` | Only exact mechanical transfer; fail closed on mismatch |
| Running deterministic documentation checks | `REVIEW_ON_EXCEPTION` | Continue only when every declared gate passes |
| Plan approval, allowlist, compatibility, and task specifications | `EXPLICIT_REVIEW` | Project-owner decisions |
| Plan review | `EXPLICIT_REVIEW` | Self-review, a new fresh-context reviewer, then human approval of the exact candidate |

Missing or invalid mode data, ambiguity, drift, stale inputs, a failed gate, an
unknown impact, or scope expansion fails closed to `EXPLICIT_REVIEW`.
`AUTO_CONTINUED` records execution evidence and is never approval.
Before the plan enters `IN_REVIEW`, the producing agent must audit the exact
candidate and record `SELF_REVIEW_PASSED`. Any change invalidates that result;
self-review cannot approve, merge, or continue the delivery.
A newly created fresh-context reviewer must derive expectations from the SGLang
authorities and full plan before reconciling author annotations. After its
approval, human review remains mandatory because the plan is design. This
example does not invent a reviewer, receipt, GitHub identity, or approval that
has not occurred.

The implementation continuation mode remains `NOT_SELECTED` while this example
is in design. After the plan and a complete next-task specification are
approved, a real adopting user chooses `HUMAN_REVIEW_BEFORE_MERGE` or
`AGENT_AUTO_MERGE` with the exact repository and a comma-separated stable
target-ID scope. This teaching example does not make that choice for SGLang.

### Automation audit ledger

| Action | Result | Evidence | Next gate |
| --- | --- | --- | --- |
| Example link and Markdown validation | `NOT_RUN` until packet validation | Playbook documentation suite | Independent example review |

The workflow cannot reach `GATES_READY` until the plan is approved, current,
and has at least one complete `READY`/`NEXT` task with an approved source
boundary. Passing playbook documentation tests cannot supply SGLang approval.
