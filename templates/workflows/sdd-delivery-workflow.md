# SDD Delivery Workflow Template

<!-- sdd-schema: delivery-workflow@2 -->

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
| Previous state | `AWAITING_HANDOFF` |
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
| Self-review state | `<NOT_STARTED / SELF_REVIEW_PASSED / SELF_REVIEW_FAILED>` |
| Self-review candidate revision | `<exact commit/version or Not applicable>` |
| Self-review evidence | `<record/link or Not applicable>` |
| Fresh-context review state | `<NOT_STARTED / IN_REVIEW / APPROVED / CHANGES_REQUESTED / BLOCKED>` |
| Fresh-context reviewed revision | `<exact commit/version or Not recorded>` |
| Fresh-context review evidence | `<packet/receipt link or Not recorded>` |
| Human review state | `<NOT_STARTED / IN_REVIEW / APPROVED / CHANGES_REQUESTED / NOT_APPLICABLE>` |
| Human reviewed revision | `<exact commit/version or Not recorded/Not applicable>` |
| Human review evidence | `<review link or Not recorded/Not applicable>` |
| Implementation continuation mode | `NOT_SELECTED` |
| Implementation mode authority | `Not selected` |
| Implementation mode scope | `Not selected` |
| Implementation mode selected at | `Not selected` |
| Next action | `<value>` |
| Next action target IDs | `<artifact/task IDs>` |
| Allowed write scope | `<semicolon-separated repository-relative paths>` |
| Next action write targets | `<semicolon-separated repository-relative paths>` |
| Review mode | `<EXPLICIT_REVIEW / AUTO_CONTINUE / REVIEW_ON_EXCEPTION>` |
| Review mode authority | `<development-policy section and approved action-control row>` |
| Automation boundary | `<last permitted action ID or Not applicable>` |
| Required automatic gates | `<commands/check IDs or Not applicable>` |
| Automatic gate result | `<PASS / FAIL / NOT_RUN / NOT_APPLICABLE>` |
| Semantic decision introduced | `<NO / YES / UNKNOWN>` |
| Automation exception | `<ID/details or None>` |
| Automation audit record | `<section/link or Not applicable>` |
| Last routed | `<date/timezone>` |

```text
AWAITING_HANDOFF -> ROUTING -> MANIFEST_IN_REVIEW -> ARTIFACTS_SELECTED
    -> ARTIFACT_GENERATING -> ARTIFACT_IN_REVIEW -> GATES_READY
    -> DELIVERY_ACTIVE -> VALIDATING -> COMPLETE -> ARCHIVED

MANIFEST_IN_REVIEW -> CHANGES_REQUESTED -> ROUTING
ARTIFACT_IN_REVIEW -> CHANGES_REQUESTED -> ARTIFACT_GENERATING
ROUTING / ARTIFACT_GENERATING / ARTIFACT_IN_REVIEW / DELIVERY_ACTIVE / VALIDATING -> BLOCKED
VALIDATING -> DELIVERY_ACTIVE when plan-level validation requires more implementation
material upstream change -> RETURN_TO_WHITEBOARD -> AWAITING_HANDOFF -> ROUTING
```

### 1.1 Handoff trigger contract

Routing starts only from an explicitly `APPROVED` handoff version. The handoff
may trigger this workflow automatically on approval or a human/agent may invoke
it for a specific case. A prompt or UI action is transport, not authority: it
must reference the approved handoff and must not redefine its content or this
workflow. Record an idempotency/run ID so automation does not create duplicate
workflow records for one approval event.

### 1.2 Review and automation protocol

The approved development policy assigns `EXPLICIT_REVIEW`, `AUTO_CONTINUE`, or
`REVIEW_ON_EXCEPTION` before each action starts. Missing or unapproved mode
information fails closed to `EXPLICIT_REVIEW`. Generate or update artifacts in
dependency order; a normative artifact cannot supply authority to a dependent
artifact until it is `APPROVED`.

`EXPLICIT_REVIEW` starts the mandatory self-review -> fresh-context review ->
human-review sequence. `AUTO_CONTINUE` and
`REVIEW_ON_EXCEPTION` may continue through multiple pre-authorized actions in
one invocation only while every input is approved/current, no semantic decision
is introduced, all declared gates pass, and each next action remains within the
recorded automation boundary, WIP policy, and write scope. Stop immediately on
failure, ambiguity, unknown impact, exception, drift, unrelated change, scope
expansion, or a mandatory semantic checkpoint. These automatic modes apply
only to deterministic non-review actions and cannot approve normative content.

- Before every review gate, the implementing agent completes the
  [agent self-review](../reviews/agent-self-review.md) against the exact
  candidate revision. Review may begin only with `SELF_REVIEW_PASSED` and linked
  evidence. Any candidate change invalidates that result and requires another
  self-review.
- Then create a new read-only reviewer through the
  [fresh-context review protocol](../reviews/fresh-context-agent-review.md).
  Record its packet/receipt, exact revision, and immutable findings. Any
  candidate change requires a new self-review and newly created fresh reviewer.
- After fresh-context `APPROVED`, design, governance, adoption, upgrade,
  validation, archive, and manual implementation stop for human review. Only a
  scoped implementation `AGENT_AUTO_MERGE` action may proceed without
  pre-merge human review after all live gates are rechecked.
- `CHANGES_REQUESTED` returns to the same artifact for refinement and another
  review round.
- A local documentation problem returns to the current artifact; an incorrect
  manifest decision returns to routing; a requirement or solution problem
  returns to the handoff/whiteboard owner.
- Record each finding's location, governing statement, expected/observed
  result, impact, requested outcome, author response, resolution revision, and
  reviewer disposition. Preserve original findings. Silence or elapsed time is
  never approval.
- Record every automatic action separately. `AUTO_CONTINUED` is not an approval
  or review state and cannot mark a normative artifact `APPROVED`.
- `SELF_REVIEW_PASSED` is pre-review evidence only. It cannot approve an
  artifact, satisfy reviewer independence, authorize merge, or authorize
  continuation.

Standard review states are `NOT_STARTED`, `IN_REVIEW`, `CHANGES_REQUESTED`,
`APPROVED`, and `STALE`.

### 1.3 Implementation continuation mode

This mode is separate from the action-level review mode above. It applies only
to implementation PRs after every design dependency and the applicable complete
task specification are approved.

- `NOT_SELECTED`: required throughout design; at `GATES_READY`, ask the user to
  choose before entering `DELIVERY_ACTIVE`.
- `HUMAN_REVIEW_BEFORE_MERGE`: after checks, mandatory self-review, and
  fresh-context approval, stop for human review and merge authority.
- `AGENT_AUTO_MERGE`: after checks, mandatory self-review, and fresh-context
  approval, verify repository protections and the current mode again, merge
  without bypass, record the audit, and continue to the next dependency-ready
  task.

Record the user's identity/instruction, selection time, and exact task/PR scope.
The user may change the mode at any time. Before each task edit, self-review
gate, PR opening, merge attempt, and continuation, reread these live fields;
never rely on an earlier prompt or cached value. A missing, invalid, stale, or
out-of-scope value stops for user direction. A later change takes effect before
the next irreversible action and cannot undo a completed merge.

Writing the user's explicit selection into these live fields is a control-only
synchronization, not a new agent decision, and needs no additional semantic
approval unless project policy says otherwise. Copy the instructed value and
scope exactly, run lifecycle validation, and never broaden it.

The implementation mode cannot bypass branch protection, required checks,
CODEOWNERS, security/compliance rules, or any project rule requiring review.
Stop on a conflict, inconsistency, failed/missing gate, unresolved comment or
change request, stale dependency, unexpected diff, new semantic decision,
scope expansion, mode change, or repository refusal. Design artifacts and
their review ledgers never use `AGENT_AUTO_MERGE`.

For a multi-task delivery, the user may explicitly include the final feature PR
in scope only after final validation receives its required approval. The mode
may authorize that merge; it never approves the validation decision itself.

Before changing `State`, preserve its old value in `Previous state`. The
lifecycle checker rejects transitions outside the state machine above.

### 1.4 Canonical state and mutability

- This workflow owns the live delivery state, current artifact, blockers,
  freshness, and next action.
- The adoption manifest owns adoption state; the implementation plan owns task
  state. Do not maintain conflicting copies here.
- `VALIDATING` is a parent-level state, not a copy of a task's `VERIFYING`
  state. When the dependency register contains a `plan` artifact, that row must
  link to a `CURRENT` implementation plan already in `VALIDATING`; its ledger
  must contain only `DONE` or reviewed `CANCELLED` tasks and no next task.
- If plan-level validation exposes more implementation work, return the plan to
  `IMPLEMENTING` and this workflow to `DELIVERY_ACTIVE`. Preserve the failure
  and transition evidence; do not continue toward closure.
- Stable contributor entry points link to the live manifest/workflow. They must
  not copy volatile lifecycle state, blockers, task IDs, or next actions.
- Approved whiteboard conclusions, normalized handoffs, ADR decisions, and
  audits are historical inputs. Change their live-reference metadata only when
  the template explicitly marks it mutable; never rewrite approved evidence.

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

- `REUSE` — use an active project artifact unchanged after its applicable
  decisions have approved decision-level conformance evidence.
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

<!-- sdd-section: delivery-manifest -->

This is the workflow's primary output and the entry point for continuation.

| Order | Artifact | Decision | Reason/trigger | Template or authority | Owner | Review owner | Review state/link |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `0` | Approved handoff | `REUSE` | Reviewed workflow input | `<link>` | `<owner>` | `<reviewer>` | `APPROVED / <link>` |
| `1` | `<artifact>` | `<decision>` | `<reason>` | `<template/link>` | `<owner>` | `<reviewer>` | `<state/link>` |

Every `SKIP`, `DEFER`, and `BLOCKED` decision must be justified. Missing rows do
not mean not applicable. Review and approve the manifest itself before
generating the first selected artifact.

### 8.1 Artifact dependency and freshness register

<!-- sdd-section: artifact-dependencies -->

This table is the machine-readable dependency source for transitive freshness.
Use stable IDs. `Consumed version` is the last approved input used downstream;
`Current version` is the version now presented. Classify a difference as
`CONTROL_ONLY` only when it cannot alter requirements, contracts, dependencies,
risk, or evidence. `UNKNOWN` fails closed like `MATERIAL`.

| Artifact ID | Artifact/link | Depends on | Consumed version | Current version | Change impact | Freshness | Blocked by |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `handoff` | `<link>` | `whiteboard` | `<version>` | `<version>` | `<CONTROL_ONLY/MATERIAL/UNKNOWN>` | `<CURRENT/STALE/BLOCKED>` | `<IDs/None>` |
| `workflow` | This workflow | `handoff` | `<version>` | `<version>` | `<CONTROL_ONLY/MATERIAL/UNKNOWN>` | `<CURRENT/STALE/BLOCKED>` | `<IDs/None>` |
| `plan` | `<link>` | `workflow` | `<version>` | `<version>` | `<CONTROL_ONLY/MATERIAL/UNKNOWN>` | `<CURRENT/STALE/BLOCKED>` | `<IDs/None>` |

A material or unknown version difference makes that artifact `STALE`. Staleness
or blocking propagates only to transitive dependants. A control-only navigation
update does not invalidate frozen content. Review the current change first;
after approval, the earliest dependency-ready stale correction takes priority.
When this workflow enters `VALIDATING`, the `plan` row's Markdown link is the
machine-readable parent/child state reference. It must resolve inside the
project to a `CURRENT` SDD implementation plan in `VALIDATING`. Route 0 may omit
the row when no implementation plan was selected.

### 8.2 Scoped blocker register

<!-- sdd-section: blocker-register -->

| Blocker ID | Evidence/unblock condition | Blocks | State | Owner |
| --- | --- | --- | --- | --- |
| `<B-ID>` | `<link and exact condition>` | `<artifact/task IDs>` | `<OPEN/RESOLVED>` | `<owner>` |

An open blocker prohibits only actions that depend on an ID in `Blocks`.
Independent ready work may continue within the approved WIP and write scope.

## 9. Generation and review-gate order

| Order | Input | Generate/update output | Review mode | Successful next action | Failure/return path |
| --- | --- | --- | --- | --- | --- |
| `0` | Approved handoff | Delivery manifest | `EXPLICIT_REVIEW` | Select first dependency-ready artifact | Routing or handoff |
| `1..N` | Approved dependencies | `<policy/ADR/audit/contract/plan/runbook>` | `<normally EXPLICIT_REVIEW>` | Select next dependency-ready artifact | Current artifact, manifest, handoff, or whiteboard |
| `N+1` | Approved plan and authorities | `<task: code/tests/docs/PR>` | `<project PR/task policy>` | Select next ready task | Failure triage/responsible artifact |
| `N+2` | All approved task evidence | Validation/retrospective | `<REVIEW_ON_EXCEPTION then plan DOD EXPLICIT_REVIEW>` | Generate delivery record | Responsible artifact |
| `N+3` | Reconciled approved packet | Delivery record/archive mechanics | `<EXPLICIT_REVIEW then bounded AUTO_CONTINUE>` | Archive and cleanup | Closure correction |

### 9.1 Action control ledger

Classify each action before execution. Mode changes require explicit review.
Normative generated content, interpretation, or a new decision always uses
`EXPLICIT_REVIEW`, even when its formatting checks pass.

| Action ID | Target/output | Review mode | Mode authority | Required gates | Automation boundary | Semantic decision? | State |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `<ID>` | `<path/action>` | `<EXPLICIT_REVIEW/AUTO_CONTINUE/REVIEW_ON_EXCEPTION>` | `<policy/approved decision>` | `<checks>` | `<last action ID/Not applicable>` | `<NO/YES>` | `<PLANNED/ACTIVE/COMPLETE/STOPPED>` |

### 9.2 Artifact review ledger

| Artifact | Version | Round | Self-review | Fresh-context review | Human review | Durable findings/resolution | Result | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `<link>` | `<version>` | `1` | `<SELF_REVIEW_PASSED + link>` | `<APPROVED/CHANGES_REQUESTED/BLOCKED + packet/receipt>` | `<APPROVED/CHANGES_REQUESTED + link, or NOT_APPLICABLE for scoped implementation auto-merge>` | `<per-round record/None>` | `<APPROVED/CHANGES_REQUESTED/BLOCKED>` | `<value>` |

### 9.3 Automation audit ledger

| Action ID | Input/output revision | Mode | Authority | Gates/result | Impact | Resulting state | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `<ID>` | `<versions>` | `<AUTO_CONTINUE/REVIEW_ON_EXCEPTION>` | `<link>` | `<evidence / PASS>` | `<CONTROL_ONLY/MATERIAL/UNKNOWN>` | `<state>` | `<action or explicit checkpoint>` |

`AUTO_CONTINUED` is not an approval. Record it in the action result/evidence,
not in the artifact review ledger. At the next `EXPLICIT_REVIEW`, provide one
concise inventory of the automatic actions and their evidence.

### 9.4 Implementation PR and post-merge review ledger

| Task/PR | Head and merge commit | Implementation mode/authority | Self-review | Fresh-context review | Required checks | Merge result | Human review | Findings/follow-up |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `<task + PR link>` | `<commits>` | `<mode + authority link>` | `<record>` | `<APPROVED / packet-or-receipt-link>` | `<evidence>` | `<MERGED/STOPPED>` | `<APPROVED / evidence for manual mode, or PENDING/ACCEPTED/FOLLOW_UP_REQUIRED/FOLLOW_UP_COMPLETE / evidence for auto mode>` | `<links or None>` |

In `HUMAN_REVIEW_BEFORE_MERGE`, record the human review before merge. In
`AGENT_AUTO_MERGE`, create the row immediately after merge with human review
`PENDING`; later record `ACCEPTED` or `FOLLOW_UP_REQUIRED` without rewriting the
merge evidence. A finding that affects active or future work marks those
dependencies stale or blocked. Every row must be accepted, or have completed
follow-up recorded as `FOLLOW_UP_COMPLETE`, before `COMPLETE` and archive.

Use the exact leading disposition shown above, optionally followed by ` / ` and
an evidence link. Unknown values fail closed. A merged `AGENT_AUTO_MERGE` row
requires leading fresh-context disposition `APPROVED`; at `COMPLETE` or
`ARCHIVED`, human review must lead with `APPROVED`, `ACCEPTED`, or
`FOLLOW_UP_COMPLETE`.

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

After every generated or updated artifact, perform an impact audit before
selecting another action: compare changed facts, links, commands, versions, and
availability claims with the dependency register; classify the change; compute
transitive freshness; verify write scope; and record affected IDs. Passing
Markdown checks never substitutes for this semantic review.

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
| Policy-reroute stale artifacts | `<links/None and reason>` |
| Revised manifest version/review | `<version/state/reviewer>` |
| Proposed adoption boundary | `<new/changed work governed when>` |
| Existing-system audit/remediation | `<links and state>` |
| Delivery resume gate | `<conditions/state/approver>` |
| Policy activation gate | `<conditions/state/approver>` |

## 11. Delivery state and handoff

<!-- sdd-section: delivery-state -->

| Field | Current value |
| --- | --- |
| Workflow state | `<state>` |
| Current artifact/task | `<value>` |
| Current artifact review | `<state, reviewer, round>` |
| Last approved artifact | `<link/version>` |
| Next ready action | `<value>` |
| Active blockers | `<IDs/None>` |
| Stale artifacts | `<artifact IDs/None>` |
| Validation complete | `<summary>` |
| Validation remaining | `<summary>` |
| Branch/PR | `<value>` |
| Last updated | `<date/timezone>` |

`GATES_READY` is valid only when every selected prerequisite is approved, every
dependency-register entry required by the first task is `CURRENT`, no open
blocker affects that task, the approved plan has one task that satisfies its
Definition of Ready and is marked `NEXT`, and the next action's write targets
are inside the allowed write scope. Its `Current artifact review state` must be
`APPROVED`; invalid review-state values fail closed. `COMPLETE` and `ARCHIVED`
also require the current validation or closure gate to be `APPROVED`.

At `GATES_READY`, `NOT_SELECTED` is a valid waiting state whose next action is
to ask the user for the implementation continuation mode. The workflow cannot
enter `DELIVERY_ACTIVE` until a valid mode, authority, scope, and selection time
are recorded.

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
- [ ] The handoff, manifest, and every normative generated/updated artifact have
      explicit approval records; every automatic action has gate and audit
      evidence without representing `AUTO_CONTINUED` as approval.
- [ ] No dependent artifact was generated from a draft, rejected, or stale
      input without documented reconciliation.
- [ ] Required gates pass or have explicit approved exceptions.
- [ ] Every automatically merged PR has post-merge human disposition
      `ACCEPTED`, or its required follow-up is complete and linked.
- [ ] Contracts, implementation, tests, and operational documentation agree.
- [ ] Deferred work/residual risk has an owner and durable location.
- [ ] The concluded whiteboard is preserved at its immutable archive path and
      linked bidirectionally with the delivery record.
- [ ] The stable project working-whiteboard path is replaced with a fresh
      `EMPTY` instance only after archive verification; no active or blocked
      need was overwritten.
- [ ] Retrospective improvements are routed separately.
- [ ] Archive links resolve and contain no secrets/sensitive evidence.

## 13. Workflow change history

| Date | Event | Whiteboard/input change | Routing/artifact effect | Approved by |
| --- | --- | --- | --- | --- |
| `<value>` | `<routed/rerouted/completed>` | `<change/None>` | `<effect>` | `<owner>` |
