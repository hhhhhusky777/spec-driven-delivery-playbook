# Solution Whiteboard — `<need>`

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `EMPTY` |
| Need / issue | `None` |
| Owner | `<owner>` |
| Concluded design revision | `None` |
| Open owner decisions | `None` |

Use this file as lightweight notes while discussing a feature. Do not force a
formal structure during exploration. Preserve agreed items, material
alternatives, constraints, unknowns, and owner decisions that affect the
result. Keep this concise discussion record when the design is concluded; do
not retain a raw transcript.

The sections below are a completeness menu, not mandatory ceremony. Use the
smallest subset that makes the accepted design unambiguous and reviewable.

## Discussion draft

`Empty until discussion starts.`

Record material discussion items with stable IDs so conclusion can reconcile
them. Combine or refine items as understanding improves instead of copying the
conversation verbatim.

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| `<DR01>` | `<material discussion point>` | `<open, accepted, changed, deferred, or rejected>` |

## Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem / observed need | `<what is happening and why it matters>` |
| Required outcome | `<observable result>` |
| Actors and critical journeys | `<who is affected and how>` |
| In scope | `<included behavior, systems, or users>` |
| Out of scope / deferred | `<explicit exclusions>` |
| Confidence | `<level and reason>` |

## Authority and context

| Source | Authority or relevant content | Freshness / verification |
| --- | --- | --- |
| `<owner decision, policy, contract, code, issue, or evidence>` | `<what it controls>` | `<current state>` |

## Facts, assumptions, and unknowns

### Facts

| ID | Fact | Evidence |
| --- | --- | --- |
| `<F01>` | `<verified fact>` | `<link, code, command, or observation>` |

### Assumptions

| ID | Assumption | Failure impact | Validation / state |
| --- | --- | --- | --- |
| `<A01>` | `<temporary belief>` | `<consequence if false>` | `<how and when resolved>` |

### Unknowns and owner decisions

| ID | Question or decision | Why it matters | Owner / source | State / resolution |
| --- | --- | --- | --- | --- |
| `<Q01>` | `<question>` | `<design consequence>` | `<owner>` | `<open or resolved result>` |

## Requirements and acceptance

| ID | Need or requirement | Priority | Acceptance signal | Source |
| --- | --- | --- | --- | --- |
| `<R01>` | `<observable need>` | `<priority>` | `<how a reviewer judges it>` | `<source>` |

## Current system and gaps

| ID | Required outcome | Current behavior | Gap / consequence | Evidence |
| --- | --- | --- | --- | --- |
| `<G01>` | `<outcome>` | `<current state>` | `<difference and risk>` | `<source>` |

## Options, experiments, and tradeoffs

| ID | Option or experiment | Benefits | Costs / risks | Evidence needed | Disposition |
| --- | --- | --- | --- | --- | --- |
| `<O01>` | `<candidate or bounded proof>` | `<benefits>` | `<tradeoffs>` | `<signal>` | `<considering, accepted, or rejected>` |

## Policy applicability and gaps

| Concern | Applicable authority | Feature-specific consequence | Gap / action |
| --- | --- | --- | --- |
| Testing and quality | `<link or None>` | `<boundary>` | `<None or issue>` |
| Security, privacy, and abuse | `<link or None>` | `<boundary>` | `<None or issue>` |
| API, data, and compatibility | `<link or None>` | `<boundary>` | `<None or issue>` |
| Concurrency, idempotency, and recovery | `<link or None>` | `<boundary>` | `<None or issue>` |
| Performance and operations | `<link or None>` | `<boundary>` | `<None or issue>` |

When edge cases, concurrency, races, timing, or failures are material, record
the feature-specific handling and applicable authority in the concluded
design. State the selected clear-cut boundary and any required fail-closed
consequence; link the general framework instead of restating it or enumerating
speculative cases.

## Risks and consequences

| ID | Scenario | Likelihood / impact | Prevention or detection | Recovery / owner | Residual risk |
| --- | --- | --- | --- | --- | --- |
| `<K01>` | `<failure or worst case>` | `<assessment>` | `<control>` | `<response>` | `<accepted remainder>` |

## Decision log

Keep only decisions and rejected alternatives needed to understand or amend the
design. Git and the pull request preserve detailed discussion history.

| ID | Decision | Material alternatives | Rationale / tradeoff | Owner / evidence |
| --- | --- | --- | --- | --- |
| `<D01>` | `<decision>` | `<alternatives>` | `<why>` | `<authority>` |

## Concluded design

When the design is ready, retain the concise discussion draft and add the
authoritative conclusion:

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `<ID>` | `<observable outcome>` | `<important constraint>` | `<how the outcome can be judged>` |

## Draft-to-conclusion reconciliation

Map every material discussion-draft item to its conclusion. A concluded
whiteboard has no unresolved draft item. Explain intentional changes,
deferrals, and rejections instead of silently dropping them.

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| `<DR01>` | `<design point ID or None>` | `<accepted, changed, deferred, or rejected>` | `<why the conclusion preserves or intentionally changes the draft>` |

## Newly introduced fail-closed behaviors

Reviewers inspect these proposals before the parent lists the complete set in
the human review response. A concluded whiteboard has no pending disposition.
Use one `None` row when the design introduces no fail-closed behavior.

| ID | Trigger | Required fail-closed response | Impact | Owner disposition |
| --- | --- | --- | --- | --- |
| `<FC01 or None>` | `<condition or None>` | `<behavior or None>` | `<effect or None>` | `<Pending, Approved, Rejected, or None>` |

## Design amendments

After the declared conclusion metadata transition is committed and both
retained reviewers verify no semantic change, the concluded whiteboard is
byte-frozen. Before any change—including formatting, metadata, status, or lifecycle mutation—the agent
must obtain human authorization for the concrete amendment. Change only that
scope, reconclude the complete design, return the new exact candidate to both
retained reviewers, and obtain human acceptance before dependent work resumes.
Ordinary task status, evidence, and contract-equivalent implementation choices
stay in the implementation plan.

| Amendment | Changed design points | Reason and impact | Owner decision |
| --- | --- | --- | --- |
| `<A01>` | `<IDs>` | `<observable change>` | `<evidence>` |

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | `<key decisions>` | `<class>` |
| Important boundaries | `<safety, compatibility, policy, or authority>` | `<class>` |
| Alternatives rejected | `<only material alternatives>` | `<class>` |
| Remaining gaps or risks | `<summary or None>` | `<class>` |
| Newly introduced fail-closed behavior | `<complete list after two-agent design review, with effect and recommendation, or None>` | `<HUMAN_DECISION or NONE>` |
| Decision requested | `<exact request>` | `<class>` |

Both retained reviewers inspect the conclusion candidate before this human
brief requests acceptance. Human approval authorizes only the declared update
of state, revision, and approved dispositions. After that transition is
committed, both reviewers verify no semantic change; their approval freezes the
exact `CONCLUDED` candidate before planning. The concluded whiteboard is the
exhaustive design authority: every later addition of content, behavior, logic,
or fail-closed effect must trace to it or an explicitly consumed project
authority.
