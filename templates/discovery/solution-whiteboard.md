# Solution Whiteboard Template

Human handoffs must include the
[phase-specific review brief](../../docs/documentation-quality-policy.md#26-attention-and-reviewability-gate).
Supply key design points for the combined design/task comparison; do not add a separate batched whiteboard gate.

## Optional batched route

With explicit batch authority, persist meaningful lightweight discussion notes
while exploring, then synthesize the complete formal conclusion for the joint
planning review. Do not treat notes as an accepted conclusion. Preserve one
active need until verified delivery reset; new requirements use a linked
amendment while it remains active.

See [Batched review and recovery](../../docs/batch-review-and-recovery.md) for authority, evidence and recovery
requirements. This route takes effect only through reviewed project adoption.

Use this document to turn a requirement, issue, defect, or architectural concern
into an evidence-backed solution before generating the reviewed workflow
handoff. It is a structured discussion surface, not a system contract and not a
chat transcript.

An adoption may instantiate one empty project working copy before a need is
known. Enter the need inside that whiteboard and move it from `EMPTY` to `OPEN`.
Before reusing the stable working path, publish the accepted design and delivery
evidence on the feature PR, verify the merged target and evidence digests, then
replace it with reviewed neutral `EMPTY` bytes through the exact reset inventory.
Replace every `<placeholder>` with a neutral or verified value and remove this
introduction from the instantiated whiteboard.

## 0. Whiteboard control

| Field | Value |
| --- | --- |
| Topic | `<short name>` |
| State | `EMPTY` |
| Facilitator/owner | `<role/person>` |
| Participants/reviewers | `<roles>` |
| Conclusion review state | `NOT_STARTED` |
| Created | `<date/timezone>` |
| Last summarized | `<date/timezone>` |
| Origin | `<requirement/issue/defect/incident link>` |
| Development policy | `<link>` |
| Generated workflow handoff | `Not generated` |
| Resulting delivery workflow | `Not generated` |
| Resulting implementation plan | `Not generated` |
| Durable delivery evidence | `Not published` |

The accepted discovery content and workflow-handoff source become
`IMMUTABLE_AFTER_APPROVAL` at `CONCLUDED` while the delivery is active. Control
links may update as downstream artifacts appear without changing the frozen
conclusion. Before reset, the PR evidence must preserve the accepted design,
alternatives and owner decision. The delivery workflow owns live state.

Lifecycle:

```text
EMPTY -> OPEN -> EXPLORING -> CONVERGING -> CONCLUDED
           |              |
           +-> BLOCKED <---+
```

- `EMPTY`: installation is ready, but no need or topic has been recorded.
- `OPEN`: intake exists; facts and questions are not yet structured.
- `EXPLORING`: requirements, gaps, alternatives, evidence, and experiments are
  being developed.
- `CONVERGING`: one candidate is preferred; contracts, trade-offs, and remaining
  questions are under final review.
- `CONCLUDED`: the convergence gate passed and the source content for the
  workflow handoff is frozen.
- `BLOCKED`: a named missing decision/evidence source prevents safe progress.

Only one need may own a stable working-whiteboard path at a time. A new need is
blocked while that path is `OPEN`, `EXPLORING`, `CONVERGING`, `CONCLUDED`, or
`BLOCKED`. At v5 closure, verify the feature PR evidence and merged target, then
reset this stable path to exact reviewed `EMPTY` bytes. Existing v2–v4 instances
retain their adopted archive procedure.

### 0.1 Conclusion review gate

The whiteboard owner facilitates discussion but must not alone approve the
conclusion. Apply [self-review](../reviews/agent-self-review.md) and the
[canonical review protocol](../reviews/fresh-context-agent-review.md), including
human design approval before setting CONCLUDED.

| Round | Candidate | Self-review | Fresh-context review | Durable findings/resolution | Human review | Result |
| --- | --- | --- | --- | --- | --- | --- |
| `1` | `<exact revision>` | `<record>` | `<receipt>` | `<links/None>` | `<identity + evidence>` | `<APPROVED/CHANGES_REQUESTED>` |

## 1. How the AI and contributors use this whiteboard

After each meaningful discussion round:

1. Update the current snapshot first.
2. Separate new facts, assumptions, questions, proposals, and decisions.
3. Update existing entries by stable ID; do not duplicate the same point.
4. Mark incorrect or abandoned proposals `REJECTED` or `SUPERSEDED` with a
   concise reason; do not erase them.
5. Link evidence rather than copying large logs, code, documents, or chat.
6. Record contradictions and resolve them at the authority that owns them.
7. Add only the discussion delta to the round summary.
8. Do not promote candidate behavior to a system contract before convergence.
9. Stop and request a decision when an unresolved choice would materially
   change requirements, risk, or scope.
10. Generate the workflow handoff only after Section 13 passes. Generate no
    implementation plan unless the reviewed manifest selects it and its
    dependency artifacts are approved.

Never include secrets, credentials, private signed URLs, customer data, or raw
sensitive payloads. Summaries must be short enough for a new contributor to
understand without replaying the conversation, but complete enough to preserve
material rationale.

## 2. Current snapshot

| Field | Current conclusion |
| --- | --- |
| Problem | `<one paragraph>` |
| Required outcome | `<one paragraph>` |
| Current candidate | `<proposal ID or None>` |
| Confidence | `<Low/Medium/High and reason>` |
| Material open questions | `<IDs or None>` |
| Active policy gaps | `<IDs or None>` |
| Active blocker | `<ID or None>` |
| Next discussion/experiment | `<one concrete action>` |

## 3. Intake: requirement, issue, or defect

### 3.1 Observed need/problem

`<Describe observable current behavior and impact without assuming a cause or
solution.>`

### 3.2 Expected outcome

`<Describe what users/operators/systems must be able to observe.>`

### 3.3 Actors and critical journeys

| Actor | Journey | Current result | Required result | Priority |
| --- | --- | --- | --- | --- |
| `<actor>` | `<journey>` | `<current>` | `<required>` | `<Must/Should/Could>` |

### 3.4 Initial scope

In:

- `<boundary>`

Out or deferred:

- `<boundary, reason, and follow-up if durable>`

## 4. Authority and context

| Source | Authority | Relevant content | Freshness/verification |
| --- | --- | --- | --- |
| `<link>` | `<normative/informative/pseudocode/dated evidence>` | `<summary>` | `<rule>` |

State which issue text, comments, user clarifications, public contracts,
existing policies, code, and prior delivery records are authoritative. A draft
or prototype may guide structure without being engineering-complete.

## 5. Facts, assumptions, and unknowns

### Facts

| ID | Fact | Evidence | Verified date |
| --- | --- | --- | --- |
| `F-01` | `<statement>` | `<source/reproducer>` | `<date>` |

### Assumptions

| ID | Assumption | Why needed | Failure impact | Validation | State |
| --- | --- | --- | --- | --- | --- |
| `A-01` | `<statement>` | `<reason>` | `<worst case>` | `<proof>` | `OPEN` |

### Unknowns and questions

| ID | Question | Why it matters | Owner/source | Required by | State/resolution |
| --- | --- | --- | --- | --- | --- |
| `Q-01` | `<question>` | `<affected decision>` | `<owner>` | `<gate/date>` | `OPEN` |

States: `OPEN`, `ANSWERED`, `ACCEPTED_RISK`, `DEFERRED`, `BLOCKED`. Deferred
items require a reason, owner, and durable destination when they remain relevant.

## 6. Needs and candidate requirements

Requirements here are candidates until conclusion. Use stable IDs so the
accepted set can be promoted into the implementation plan.

| ID | Need/requirement | Priority | Acceptance signal | Source | State |
| --- | --- | --- | --- | --- | --- |
| `REQ-01` | `<observable requirement>` | `MUST` | `<how demonstrated>` | `<source>` | `CANDIDATE` |

States: `CANDIDATE`, `ACCEPTED`, `REJECTED`, `DEFERRED`, `SUPERSEDED`.

### YAGNI audit

| Item | Current requirement that needs it | Simplest alternative | Cost/risk now | Cost if deferred | Decision |
| --- | --- | --- | --- | --- | --- |
| `<abstraction/status/config/dependency/etc.>` | `<REQ-ID/None>` | `<alternative>` | `<cost>` | `<cost>` | `<KEEP_NOW/EXTENSION_POINT_ONLY/DEFER/REMOVE>` |

## 7. Current system and gap analysis

### Current behavior/design

`<Describe only the relevant current architecture, states, data, interfaces,
operations, and constraints.>`

### Gap matrix

| Gap ID | Required outcome | Current behavior | Gap | Risk if unchanged | Evidence | Candidate owner |
| --- | --- | --- | --- | --- | --- | --- |
| `G-01` | `<requirement>` | `<current>` | `<missing/change>` | `<impact>` | `<source>` | `<component/task>` |

Include applicable product, API, state, data, concurrency, provider, storage,
security, performance, test, observability, deployment, and documentation gaps.

## 8. Candidate solutions

### Option comparison

| ID | Proposal | State | Benefits | Costs/cons | Risks | Requirements met | Evidence needed |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `OPT-01` | `<solution>` | `PROPOSED` | `<benefits>` | `<costs>` | `<risks>` | `<REQ-IDs>` | `<proof>` |

States: `PROPOSED`, `INVESTIGATING`, `PREFERRED`, `REJECTED`, `SUPERSEDED`,
`ACCEPTED`.

### Detailed notes by option

For each material option, cover:

- Component and responsibility boundaries
- State/data/API changes
- Technologies and dependencies
- Error/retry/recovery behavior
- Performance and scalability
- Security/privacy
- Evolvability and likely extension points
- Operational and migration impact
- Testability
- Reversibility

Avoid false precision before evidence exists.

## 9. Proofs of concept and experiments

Use a PoC only to answer a named uncertainty. It is disposable evidence unless
separately reviewed as production code.

| PoC ID | Question/hypothesis | Success/failure criteria set before work | Bounded scope | Result/evidence | Decision impact |
| --- | --- | --- | --- | --- | --- |
| `POC-01` | `<question>` | `<criteria>` | `<time/code/environment boundary>` | `<result>` | `<option/requirement impact>` |

Record inconclusive results honestly. Do not convert a demonstration into a
production commitment without the normal plan, tests, security, and review.

## 10. Policy applicability and policy gaps

| Domain | Applicable? | Existing authority | Gap | Action/state |
| --- | --- | --- | --- | --- |
| Testing | `<Yes/No>` | `<policy>` | `<gap/None>` | `<state>` |
| Shared-state concurrency | `<Yes/No>` | `<policy>` | `<gap/None>` | `<state>` |
| Security/privacy/abuse | `<Yes/No>` | `<policy>` | `<gap/None>` | `<state>` |
| API/compatibility | `<Yes/No>` | `<policy>` | `<gap/None>` | `<state>` |
| Storage/retention | `<Yes/No>` | `<policy>` | `<gap/None>` | `<state>` |
| Provider/retry/idempotency | `<Yes/No>` | `<policy>` | `<gap/None>` | `<state>` |
| Billing/exactly-once effects | `<Yes/No>` | `<policy>` | `<gap/None>` | `<state>` |
| Performance/capacity | `<Yes/No>` | `<policy>` | `<gap/None>` | `<state>` |
| Deployment/recovery | `<Yes/No>` | `<policy>` | `<gap/None>` | `<state>` |

Register a `POLICY_GAP` when a required cross-cutting rule has no authority.
Use the specialized-policy workflow instead of inventing an informal convention
inside implementation code.

## 11. Risk and consequence review

| Risk ID | Scenario/worst case | Likelihood | Impact | Prevention | Detection/recovery | Residual risk | Owner |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `R-01` | `<risk>` | `<L/M/H>` | `<L/M/H>` | `<control>` | `<control>` | `<accepted remainder>` | `<owner>` |

Explicitly review data integrity, authorization, secrets, billing, concurrency,
external side effects, availability, capacity, migration, rollback, and
operational recovery when applicable.

## 12. Discussion and decision history

### Discussion-round summaries

Summarize only durable deltas.

| Round/time | New information | Corrections/rejections | Decisions | Remaining questions | Updated by |
| --- | --- | --- | --- | --- | --- |
| `<value>` | `<delta>` | `<delta>` | `<IDs>` | `<IDs>` | `<owner>` |

### Decision log

| Decision ID | State | Decision | Alternatives | Rationale/trade-offs | Evidence/confidence | Supersedes |
| --- | --- | --- | --- | --- | --- | --- |
| `D-01` | `PROPOSED` | `<decision>` | `<OPT-IDs>` | `<why/consequences>` | `<evidence/confidence>` | `None` |

States: `PROPOSED`, `ACCEPTED`, `REJECTED`, `SUPERSEDED`. Accepted entries are
append-only; add a superseding decision rather than rewriting the rationale.

## 13. Convergence gate

The whiteboard may become `CONCLUDED` only when:

- [ ] The problem, actors, required outcomes, scope, and non-scope are clear.
- [ ] Every `MUST` requirement is observable and unambiguous.
- [ ] Material facts are evidenced; assumptions are proven or explicitly
      accepted with risk.
- [ ] Current-state and implementation gaps are understood.
- [ ] At least one viable solution was evaluated against requirements.
- [ ] Rejected alternatives retain concise reasons.
- [ ] Necessary PoCs/experiments have decisive results.
- [ ] YAGNI audit removes speculative scope.
- [ ] Security, data, concurrency, failure, performance, operations, migration,
      and testability were considered where applicable.
- [ ] High-risk policy gaps have an owner and explicit policy/audit routing and
      block implementation readiness; any ambiguity they create in the
      requirements or accepted solution blocks conclusion.
- [ ] The preferred solution, trade-offs, residual risks, and confidence are
      accepted.
- [ ] Remaining deferred items have owners and durable destinations.

Conclusion approval: `<reviewers/date>`.

After conclusion, generate the
[whiteboard-to-workflow handoff](../handoffs/whiteboard-to-workflow.md) from
Section 14 and submit that small connector artifact to its own review gate.

## 14. Workflow-handoff source

Freeze this section at conclusion. The reviewed handoff must derive from it,
not reinterpret earlier discussion. Any later implementation plan derives from
the approved handoff plus the reviewed manifest and approved dependencies.

### Accepted problem and outcome

`<concise statement>`

### Accepted requirements

- `<REQ-IDs and summaries>`

### Accepted solution

`<concise end-to-end solution>`

### Candidate system contracts to formalize

- `<state/API/data/locking/retry/failure/security/performance/operations/test contract>`

### Required delivery boundaries

- `<dependency, component boundary, migration sequence, rollout constraint>`

### Required evidence

- `<tests, PoCs to productionize, performance, smoke, E2E, operational proof>`

### Deferred work and residual risk

- `<item, owner, destination>`

### Handoff-generation instruction

Generate `<handoff-link>` from the accepted content above using the
[whiteboard-to-workflow handoff template](../handoffs/whiteboard-to-workflow.md).
The approved handoff—not this full discussion record—is the delivery router's
input. If handoff generation or review exposes a material unresolved design
question, return this whiteboard to `EXPLORING` or `CONVERGING` rather than
inventing the answer downstream.

## 15. Delivery reset instruction

At v5 delivery closure:

- publish key facts, rejected options, accepted decisions, risks and PoC results
  in the versioned feature-PR evidence;
- keep this concluded working copy through feature target verification;
- verify remote evidence URLs and body digests;
- enumerate this exact path as `RESET`, with reviewed neutral replacement bytes;
- preserve adoption controls and reusable delivered output; and
- reset only through the authorized reset PR, never while the need is active,
  blocked, unverified, or incompletely evidenced.
