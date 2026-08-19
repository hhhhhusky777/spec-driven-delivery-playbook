# SDD Delivery Workflow Template

Use this template after a solution whiteboard reaches `CONCLUDED`. It consumes
the whiteboard handoff, selects the smallest safe delivery route, determines
which existing policies to reuse and which artifacts to generate, and records
the gates through implementation and archive.

The workflow is an artifact router. It does not recreate every policy for every
feature. Replace all `<placeholders>` and remove instructional text from an
instantiated workflow record.

## 1. Workflow control

| Field | Value |
| --- | --- |
| Delivery | `<short requirement/feature name>` |
| State | `AWAITING_WHITEBOARD` |
| Owner | `<role/person>` |
| Concluded whiteboard | `<canonical link>` |
| Whiteboard conclusion version/date | `<value>` |
| Selected route | `Not selected` |
| Current artifact/gate | `<value>` |
| Next action | `<value>` |
| Last routed | `<date/timezone>` |

```text
AWAITING_WHITEBOARD -> ROUTING -> ARTIFACTS_SELECTED -> ARTIFACTS_GENERATING
    -> GATES_READY -> DELIVERY_ACTIVE -> VALIDATING -> COMPLETE -> ARCHIVED

ROUTING / ARTIFACTS_GENERATING / DELIVERY_ACTIVE / VALIDATING -> BLOCKED
material upstream change -> RETURN_TO_WHITEBOARD -> ROUTING
```

## 2. Governing project registry

The project instantiates stable policies once and reuses them. `None` is a gap,
not permission to invent an implicit rule.

| Artifact | Active project authority | State/version | Owner |
| --- | --- | --- | --- |
| Development policy | `<link>` | `<value>` | `<role>` |
| Test strategy | `<link>` | `<value>` | `<role>` |
| PR/branch policy | `<link>` | `<value>` | `<role>` |
| API/system contracts | `<links>` | `<value>` | `<role>` |
| Specialized-policy registry | `<link>` | `<value>` | `<role>` |
| Operations/runbooks | `<links>` | `<value>` | `<role>` |

## 3. Whiteboard input contract

Do not route until the whiteboard convergence gate passes and supplies:

| Field | Whiteboard conclusion |
| --- | --- |
| Change type | `<documentation/defect/feature/refactor/migration/policy gap/incident>` |
| Delivery size | `<small/medium/large>` |
| Risk | `<low/medium/high/critical>` |
| Product code affected | `<Yes/No>` |
| Public/API contract affected | `<Yes/No>` |
| Schema/data affected | `<Yes/No>` |
| Shared-state/concurrency affected | `<Yes/No>` |
| Security/privacy/billing affected | `<Yes/No>` |
| Performance/capacity affected | `<Yes/No>` |
| Deployment/operations affected | `<Yes/No>` |
| Specialized-policy gaps | `<IDs/None>` |
| Architectural decisions | `<local/significant and IDs>` |
| Expected task count | `<estimate>` |
| Accepted requirements | `<IDs>` |
| Accepted solution | `<summary>` |
| Required evidence | `<boundaries>` |
| Deferred work/residual risk | `<items>` |

If required input is ambiguous, return to the whiteboard rather than guessing.

## 4. Classification and risk escalation

Size does not determine governance by itself. Escalate the route when a small
change affects a severe boundary.

| Dimension | Classification | Evidence | Route effect |
| --- | --- | --- | --- |
| Conceptual scope | `<local/cross-component/systemic>` | `<source>` | `<effect>` |
| Reversibility | `<easy/moderate/difficult>` | `<source>` | `<effect>` |
| Data/security/billing | `<none/low/high>` | `<source>` | `<effect>` |
| Concurrency/external effects | `<none/low/high>` | `<source>` | `<effect>` |
| Compatibility/migration | `<none/controlled/public>` | `<source>` | `<effect>` |
| Performance/availability | `<none/low/high>` | `<source>` | `<effect>` |
| Requirement uncertainty | `<low/medium/high>` | `<source>` | `<effect>` |

Required escalation rules from the development policy: `<link/summary>`.

## 5. Delivery-route selection

### Route 0 — Documentation or trivial change

Use when no product behavior/risk changes and the applicable documentation
validation is sufficient.

```text
whiteboard -> manifest -> scoped change -> documentation validation -> PR -> close
```

### Route 1 — Small production change

Use for one coherent, low-risk production task with settled contracts.

```text
whiteboard -> manifest -> COMPACT implementation plan -> TDD/gates -> PR -> record
```

### Route 2 — Multi-task feature or refactor

```text
whiteboard -> manifest -> FULL implementation plan -> dependency tasks
    -> TDD/PR per increment -> plan validation -> retrospective -> record
```

### Route 3 — Systemic design or policy gap

```text
whiteboard -> manifest -> specialized policy and/or ADR -> existing-system audit
    -> FULL plan -> remediation/feature tasks -> activation/validation -> record
```

### Route 4 — Incident or emergency

```text
incident whiteboard -> emergency manifest -> bounded mitigation -> evidence
    -> retrospective -> normal workflow for permanent remediation
```

Selected route: `<Route N>`.

Justification: `<why this is the smallest safe route>`.

## 6. Artifact decision vocabulary

- `REUSE` — use an active project artifact unchanged.
- `UPDATE_EXISTING` — change an existing authority through its review process.
- `GENERATE` — instantiate the linked template.
- `GENERATE_COMPACT` — instantiate only required compact-plan sections.
- `GENERATE_FULL` — instantiate the complete applicable plan.
- `SKIP` — not applicable; record why.
- `DEFER` — safe to postpone with owner and durable destination.
- `BLOCKED` — required input/authority is unavailable.

## 7. Artifact trigger rules

| Artifact | Generate/update when | Normally reuse/skip when |
| --- | --- | --- |
| Development policy | Project bootstrap or accepted project-wide process change | Reuse for feature delivery |
| Test strategy | Project bootstrap or accepted quality-policy change | Reuse; generate feature matrix in the plan |
| PR/branch policy | Project bootstrap or accepted integration-policy change | Reuse for every PR |
| Solution whiteboard | Always, under this workflow's project convention | Never skipped |
| Delivery workflow record | Always after whiteboard conclusion | Never skipped |
| Implementation plan | Product behavior/risk changes or multi-step delivery needs tracking | Skip only for justified Route 0 |
| Specialized policy | A systemic cross-feature policy gap satisfies the development-policy trigger | Keep local decisions in plan/ADR |
| Existing-system audit | A new policy or invariant may affect existing behavior | Skip when evidence proves no existing scope |
| ADR | A significant, difficult-to-reverse architectural decision needs durable rationale | Keep ordinary choices in plan |
| API/system contract update | External/shared observable contract changes | Skip with evidence of no contract impact |
| Runbook/operations update | Deployment, recovery, monitoring, or operator action changes | Skip when operations are unchanged |
| Dedicated performance/security plan | Risk cannot be adequately specified in the implementation plan | Use plan test matrix for bounded cases |
| Delivery record | Always for Routes 1–4; Route 0 follows project archive policy | Never claim completion without evidence |

## 8. Delivery manifest

This is the workflow's primary output and the entry point for continuation.

| Order | Artifact | Decision | Reason/trigger | Template or authority | Owner | State/link |
| --- | --- | --- | --- | --- | --- | --- |
| `0` | Concluded whiteboard | `REUSE` | Accepted input | `<link>` | `<owner>` | `<link>` |
| `1` | `<artifact>` | `<decision>` | `<reason>` | `<template/link>` | `<owner>` | `<state/link>` |

Every `SKIP`, `DEFER`, and `BLOCKED` decision must be justified. Missing rows do
not mean not applicable.

## 9. Generation and gate order

| Stage | Input | Generated/updated output | Gate | Failure/return path |
| --- | --- | --- | --- | --- |
| Policy/decision | `<input>` | `<policy/ADR>` | `<approval/audit>` | `<whiteboard/policy gap>` |
| Planning | `<handoff/policies>` | `<plan/contracts/tasks>` | `<Ready>` | `<whiteboard/plan>` |
| Delivery | `<ready task>` | `<code/tests/docs/PR>` | `<task DOD>` | `<failure triage/upstream>` |
| Validation | `<all tasks>` | `<evidence/retrospective>` | `<plan DOD>` | `<responsible artifact>` |
| Archive | `<reconciled packet>` | `<delivery record>` | `<link/integrity check>` | `<closure>` |

## 10. Feedback and rerouting rules

- Requirement or accepted-solution ambiguity -> return to whiteboard.
- Cross-artifact contradiction -> update the upstream owner, then regenerate or
  reconcile downstream artifacts.
- New systemic rule -> register policy gap and reroute through specialized
  policy/audit.
- Significant new architecture choice -> create/supersede ADR.
- Test failure -> create failure justification, then return to product, design,
  configuration, test, environment, or performance owner based on evidence.
- Added/split/cancelled task -> update plan dependency ledger and manifest when
  artifact decisions change.
- Whiteboard conclusion change -> mark downstream routing stale and rerun this
  workflow before implementation continues.

## 11. Delivery state and handoff

| Field | Current value |
| --- | --- |
| Workflow state | `<state>` |
| Current artifact/task | `<value>` |
| Next ready action | `<value>` |
| Active blockers | `<IDs/None>` |
| Stale artifacts | `<links/None>` |
| Validation complete | `<summary>` |
| Validation remaining | `<summary>` |
| Branch/PR | `<value>` |
| Last updated | `<date/timezone>` |

## 12. Completion packet

At completion, the linked packet contains as applicable:

```text
originating need/requirement/issue
├── concluded solution whiteboard
├── delivery workflow and artifact manifest
├── reused/updated policies
├── specialized policy and existing-system audit
├── accepted ADRs
├── approved implementation plan and system contracts
├── task PRs and change evidence
├── test/performance/security evidence
├── failure justifications and defect links
├── retrospective and improvement actions
└── archived delivery record
```

Closure checklist:

- [ ] Manifest decisions match actual artifacts.
- [ ] Required gates pass or have explicit approved exceptions.
- [ ] Contracts, implementation, tests, and operational documentation agree.
- [ ] Deferred work/residual risk has an owner and durable location.
- [ ] Retrospective improvements are routed separately.
- [ ] Archive links resolve and contain no secrets/sensitive evidence.

## 13. Workflow change history

| Date | Event | Whiteboard/input change | Routing/artifact effect | Approved by |
| --- | --- | --- | --- | --- |
| `<value>` | `<routed/rerouted/completed>` | `<change/None>` | `<effect>` | `<owner>` |
