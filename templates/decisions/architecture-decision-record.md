# ADR `<number>`: `<decision title>`

> **Template instructions:** Use an ADR for an architecturally significant or
> difficult-to-reverse decision. An ADR records context, options, the accepted
> decision, and consequences; it is not a design guide, task plan, policy, or
> chronological discussion transcript. Replace all `<placeholders>` and remove
> this instructional blockquote from an instantiated record.

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
| Delivery workflow/manifest | `<link and version>` |
| Implementation plan state at approval | `<link or Not generated>` |
| Decision IDs/contracts | `<IDs>` |
| Supersedes | `<ADR/None>` |
| Superseded by | `None` |

Allowed states: `PROPOSED`, `ACCEPTED`, `REJECTED`, `SUPERSEDED`, `DEPRECATED`.
An accepted ADR is immutable. Change direction through a new ADR that links and
supersedes it.

Navigation and generation-state fields record the state at approval; they are
not live delivery status. Follow the linked workflow for current progress.

### Review gate

Submit the ADR through self-review, fresh-context agent review, and human review
before `ACCEPTED`. First complete the
[agent self-review](../reviews/agent-self-review.md) against the exact candidate
revision and record `SELF_REVIEW_PASSED`, then use the canonical
[fresh-context review](../reviews/fresh-context-agent-review.md). After fresh
approval, stop for mandatory human review. Any candidate change invalidates
both results; resolve `CHANGES_REQUESTED`, repeat self-review, and create a new
fresh reviewer. Return to the handoff or whiteboard if comments invalidate the
accepted requirements or solution. Agent review is evidence, not design
approval.

| Round | Candidate | Self-review | Fresh-context review | Durable findings/resolution | Human review | Result |
| --- | --- | --- | --- | --- | --- | --- |
| `1` | `<exact revision>` | `<record>` | `<receipt>` | `<links/None>` | `<identity + evidence>` | `<APPROVED/CHANGES_REQUESTED>` |

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
