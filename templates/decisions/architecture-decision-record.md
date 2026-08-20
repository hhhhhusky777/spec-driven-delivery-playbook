# Architecture Decision Record Template

Use an ADR for an architecturally significant or difficult-to-reverse decision.
An ADR records context, options, the accepted decision, and consequences. It is
not a design guide, task plan, policy, or chronological discussion transcript.

Replace all `<placeholders>` and remove instructional text from an instantiated
record.

# ADR `<number>`: `<decision title>`

## Status and ownership

| Field | Value |
| --- | --- |
| Status | `PROPOSED` |
| Date | `<date/timezone>` |
| Owners | `<roles/people>` |
| Reviewers | `<roles/people>` |
| Review state | `NOT_STARTED` |
| Whiteboard | `<link>` |
| Approved workflow handoff | `<link and version>` |
| Implementation plan | `<link>` |
| Decision IDs/contracts | `<IDs>` |
| Supersedes | `<ADR/None>` |
| Superseded by | `None` |

Allowed states: `PROPOSED`, `ACCEPTED`, `REJECTED`, `SUPERSEDED`, `DEPRECATED`.
An accepted ADR is immutable. Change direction through a new ADR that links and
supersedes it.

### Review gate

Submit the ADR for human or independent-agent review before `ACCEPTED`. The
author or generating runner must not self-approve unless a documented project
rule allows a low-risk exception. Resolve `CHANGES_REQUESTED` and repeat review;
return to the handoff or whiteboard if comments invalidate the accepted
requirements or solution.

| Round | Reviewer | Type | Result | Comments/link | Resolved version |
| --- | --- | --- | --- | --- | --- |
| `1` | `<identity>` | `<human/independent agent>` | `<APPROVED/CHANGES_REQUESTED>` | `<value>` | `<version>` |

## Context and problem

`<Describe the architectural problem, current state, and why a durable decision
is needed.>`

## Decision drivers and constraints

- `<functional/nonfunctional requirement>`
- `<security, data, performance, compatibility, cost, timeline constraint>`
- `<active policy or external contract>`

## Options considered

| Option | Summary | Benefits | Costs/cons | Risks | Evidence/confidence |
| --- | --- | --- | --- | --- | --- |
| `<A>` | `<design>` | `<benefits>` | `<costs>` | `<risks>` | `<evidence>` |

## Decision

`<State the accepted choice assertively and unambiguously.>`

### Responsibility and boundary consequences

| Component/boundary | New responsibility | Responsibility removed/prohibited |
| --- | --- | --- |
| `<component>` | `<owns>` | `<must not own>` |

## Consequences

### Positive

- `<benefit>`

### Negative and trade-offs

- `<cost/complexity/constraint>`

### Risks and mitigations

| Risk | Prevention/detection/recovery | Residual risk/owner |
| --- | --- | --- |
| `<risk>` | `<control>` | `<value>` |

## Implementation and migration effect

- System contracts affected: `<IDs/links>`
- Data/API/state changes: `<summary>`
- Migration/deployment order: `<summary>`
- Compatibility/rollback or forward-fix: `<summary>`
- Required tasks: `<IDs/plan link>`

Implementation details remain in the plan; this section records only the
consequences necessary to preserve the decision.

## Verification and observability

- Decision conformance tests/evidence: `<links>`
- Operational signals: `<metrics/logs/traces>`
- Revisit trigger: `<conditions that invalidate assumptions>`

## Policy relationship

- Existing policies applied: `<links>`
- New policy gap created: `<ID/None>`
- Does this decision establish a reusable rule? `<No / proposed policy link>`

An ADR explains why this architecture was chosen. If future changes must obey a
durable cross-feature rule, promote that rule through the specialized-policy
workflow rather than treating this ADR as an implicit policy.

## Decision history

| Date | Status | Event/reason | Approved by | Related ADR |
| --- | --- | --- | --- | --- |
| `<date>` | `<state>` | `<event>` | `<owner>` | `<link/None>` |
