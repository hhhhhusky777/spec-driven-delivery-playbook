# SDD Delivery Workflow Template

Use this template after a generated whiteboard handoff is reviewed and reaches
`APPROVED`. It consumes that exact handoff version, selects the smallest safe
delivery route, determines which existing policies to reuse and which artifacts
to generate, and records each review gate through implementation and archive.

The workflow is an artifact router. It does not recreate every policy for every
feature. Replace all `<placeholders>` and remove instructional text from an
instantiated workflow record.

## 1. Workflow control

| Field | Value |
| --- | --- |
| Delivery | `<short requirement/feature name>` |
| State | `AWAITING_HANDOFF` |
| Owner | `<role/person>` |
| Concluded whiteboard | `<canonical link>` |
| Approved workflow handoff | `<canonical link>` |
| Consumed handoff version | `<commit/version>` |
| Whiteboard conclusion version/date | `<value>` |
| Trigger mode | `<AUTOMATIC_ON_APPROVAL / MANUAL_INVOCATION>` |
| Trigger identity/run ID | `<value>` |
| Selected route | `Not selected` |
| Manifest review state | `NOT_STARTED` |
| Current artifact/gate | `<value>` |
| Current artifact review state | `<value>` |
| Next action | `<value>` |
| Last routed | `<date/timezone>` |

```text
AWAITING_HANDOFF -> ROUTING -> MANIFEST_IN_REVIEW -> ARTIFACTS_SELECTED
    -> ARTIFACT_GENERATING -> ARTIFACT_IN_REVIEW -> GATES_READY
    -> DELIVERY_ACTIVE -> VALIDATING -> COMPLETE -> ARCHIVED

MANIFEST_IN_REVIEW -> CHANGES_REQUESTED -> ROUTING
ARTIFACT_IN_REVIEW -> CHANGES_REQUESTED -> ARTIFACT_GENERATING
ROUTING / ARTIFACT_GENERATING / ARTIFACT_IN_REVIEW / DELIVERY_ACTIVE / VALIDATING -> BLOCKED
material upstream change -> RETURN_TO_WHITEBOARD -> AWAITING_HANDOFF -> ROUTING
```

### 1.1 Handoff trigger contract

Routing starts only from an explicitly `APPROVED` handoff version. The handoff
may trigger this workflow automatically on approval or a human/agent may invoke
it for a specific case. A prompt or UI action is transport, not authority: it
must reference the approved handoff and must not redefine its content or this
workflow. Record an idempotency/run ID so automation does not create duplicate
workflow records for one approval event.

### 1.2 Review protocol

The manifest and every generated or updated artifact require a review gate.
Generate one artifact at a time in dependency order. Do not generate a
dependent artifact until its input artifacts are `APPROVED`.

- The author or generating runner must not self-approve unless an active project
  policy grants a documented low-risk exception.
- Review may be performed by a human or an independent review agent. Human
  approval is required when project policy, risk, or external accountability
  requires it.
- `CHANGES_REQUESTED` returns to the same artifact for refinement and another
  review round.
- A local documentation problem returns to the current artifact; an incorrect
  manifest decision returns to routing; a requirement or solution problem
  returns to the handoff/whiteboard owner.
- Record reviewer identity, review type, comments, resolution, version, and
  approval. Silence or elapsed time is never approval.

Standard review states are `NOT_STARTED`, `IN_REVIEW`, `CHANGES_REQUESTED`,
`APPROVED`, and `STALE`.

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

## 3. Approved handoff input contract

Do not route until the handoff review gate passes and the approved handoff
supplies:

| Field | Approved handoff value |
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

If required input is ambiguous, request a handoff change. Return to the
whiteboard when the ambiguity comes from the accepted requirements or solution
rather than guessing downstream.

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
approved handoff -> manifest -> scoped change -> documentation validation -> PR -> close
```

### Route 1 — Small production change

Use for one coherent, low-risk production task with settled contracts.

```text
approved handoff -> manifest -> COMPACT implementation plan -> TDD/gates -> PR -> record
```

### Route 2 — Multi-task feature or refactor

```text
approved handoff -> manifest -> FULL implementation plan -> dependency tasks
    -> TDD/PR per increment -> plan validation -> retrospective -> record
```

### Route 3 — Systemic design or policy gap

```text
approved handoff -> manifest -> specialized policy and/or ADR -> existing-system audit
    -> FULL plan -> remediation/feature tasks -> activation/validation -> record
```

### Route 4 — Incident or emergency

```text
approved emergency handoff -> emergency manifest -> bounded mitigation -> evidence
    -> retrospective -> normal workflow for permanent remediation
```

The active emergency policy may compress or run the compact whiteboard,
handoff, and review concurrently with bounded mitigation. It must not fabricate
approval, erase the durable decision/evidence record, or skip the retrospective
and permanent-remediation routing.

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
| Delivery workflow record | Always after handoff approval and trigger | Never skipped |
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

| Order | Artifact | Decision | Reason/trigger | Template or authority | Owner | Review owner | Review state/link |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `0` | Approved handoff | `REUSE` | Reviewed workflow input | `<link>` | `<owner>` | `<reviewer>` | `APPROVED / <link>` |
| `1` | `<artifact>` | `<decision>` | `<reason>` | `<template/link>` | `<owner>` | `<reviewer>` | `<state/link>` |

Every `SKIP`, `DEFER`, and `BLOCKED` decision must be justified. Missing rows do
not mean not applicable. Review and approve the manifest itself before
generating the first selected artifact.

## 9. Generation and review-gate order

| Order | Input | Generate/update exactly one output | Review gate | Approved next action | Failure/return path |
| --- | --- | --- | --- | --- | --- |
| `0` | Approved handoff | Delivery manifest | Independent manifest review | Select first dependency-ready artifact | Routing or handoff |
| `1..N` | Approved dependencies | `<one policy/ADR/audit/contract/plan/runbook>` | Independent artifact review | Select next dependency-ready artifact | Current artifact, manifest, handoff, or whiteboard |
| `N+1` | Approved plan and authorities | `<one task: code/tests/docs/PR>` | PR policy and task DOD | Select next ready task | Failure triage/responsible artifact |
| `N+2` | All approved task evidence | Validation/retrospective | Plan DOD review | Generate delivery record | Responsible artifact |
| `N+3` | Reconciled approved packet | Delivery record | Closure review | Archive | Closure correction |

### 9.1 Artifact review ledger

| Artifact | Version | Round | Reviewer | Type | Result | Comments/resolution | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `<link>` | `<version>` | `1` | `<identity>` | `<human/independent agent>` | `<APPROVED/CHANGES_REQUESTED>` | `<summary/link>` | `<value>` |

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
- Handoff change after approval -> mark the manifest and dependent artifacts
  `STALE`; consume the newly approved version and reroute.
- Review comment limited to the current artifact -> refine that artifact and
  request another independent review before continuing.
- Review exposes an incorrect artifact decision -> return to routing and mark
  affected downstream artifacts `STALE`.

### 10.1 Mid-delivery policy-gap rerouting

Use this path when an issue discovered during `DELIVERY_ACTIVE` or `VALIDATING`
may require a specialized policy. The problem report is evidence, not automatic
proof that a new policy is needed. README owns the canonical
[workflow diagram](../../README.md#mid-delivery-policy-gap-rerouting); this
template owns the normative procedure and required record.

Required procedure:

1. Record what is wrong, what was expected, what evidence exists, and the
   concrete worst case before editing policy, product, configuration, or tests.
2. Apply the specialized-policy template's local-versus-systemic assessment.
   A local implementation choice stays in its owning feature artifact.
3. If systemic, assign a policy-gap ID and classify whether it belongs to this
   delivery. Reroute this manifest for same-delivery scope; create a linked
   standard workflow only for a materially independent issue, and record its
   dependency and precise unblock condition when it blocks current work.
4. Pause only tasks whose assumptions or safety depend on the missing rule.
   Preserve valid completed evidence and independent work. Mark an artifact
   `STALE` only when the new rule invalidates its content.
5. Use the registry to select `GENERATE` when no authority exists or
   `UPDATE_EXISTING` when an active policy is incomplete. Add that decision and
   the existing-system audit to the manifest, record dependencies/review
   owners, and approve the revised manifest before drafting the policy change.
6. Review the new or updated policy as `PROPOSED`, including its
   new/changed-code adoption boundary. Audit existing behavior and create
   risk-ordered remediation tasks.
7. Reconcile and review the implementation plan, contracts, ADRs, tests, and
   runbooks affected by the rule.
8. Resume affected delivery work only after its explicit resume gate passes.
   Activate the policy only after the separate activation gate passes.

Record the reroute in the workflow change history and current-state table:

| Field | Required value |
| --- | --- |
| Discovery issue/evidence | `<link and concise justification>` |
| Policy-gap ID and classification | `<ID; local/systemic; risk>` |
| Relationship to delivery | `<same delivery/materially independent>` |
| Linked workflow dependency/blocker | `<link and unblock condition/None>` |
| Paused and independent tasks | `<IDs and reasons>` |
| Stale artifacts | `<links/None and reason>` |
| Revised manifest version/review | `<version/state/reviewer>` |
| Proposed adoption boundary | `<new/changed work governed when>` |
| Existing-system audit/remediation | `<links and state>` |
| Delivery resume gate | `<conditions/state/approver>` |
| Policy activation gate | `<conditions/state/approver>` |

## 11. Delivery state and handoff

| Field | Current value |
| --- | --- |
| Workflow state | `<state>` |
| Current artifact/task | `<value>` |
| Current artifact review | `<state, reviewer, round>` |
| Last approved artifact | `<link/version>` |
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
- [ ] The handoff, manifest, and every generated/updated artifact have explicit
      approval records.
- [ ] No dependent artifact was generated from a draft, rejected, or stale
      input without documented reconciliation.
- [ ] Required gates pass or have explicit approved exceptions.
- [ ] Contracts, implementation, tests, and operational documentation agree.
- [ ] Deferred work/residual risk has an owner and durable location.
- [ ] Retrospective improvements are routed separately.
- [ ] Archive links resolve and contain no secrets/sensitive evidence.

## 13. Workflow change history

| Date | Event | Whiteboard/input change | Routing/artifact effect | Approved by |
| --- | --- | --- | --- | --- |
| `<value>` | `<routed/rerouted/completed>` | `<change/None>` | `<effect>` | `<owner>` |
