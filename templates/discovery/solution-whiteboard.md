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
formal structure during exploration. Preserve alternatives, constraints,
unknowns, and owner decisions that affect the result.

The sections below are a completeness menu, not mandatory ceremony. Use the
smallest subset that makes the accepted design unambiguous and reviewable.

## Working notes

`Empty until discussion starts.`

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

When the design is ready, replace the working notes with a concise conclusion:

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `<ID>` | `<observable outcome>` | `<important constraint>` | `<how the outcome can be judged>` |

## Design amendments

Add a row only when an accepted observable outcome changes. Ordinary task
status, evidence, and contract-equivalent implementation choices stay in the
implementation plan.

| Amendment | Changed design points | Reason and impact | Owner decision |
| --- | --- | --- | --- |
| `<A01>` | `<IDs>` | `<observable change>` | `<evidence>` |

## Human brief

| Attention | Summary |
| --- | --- |
| Decisions made | `<key decisions>` |
| Important boundaries | `<safety, compatibility, policy, or authority>` |
| Alternatives rejected | `<only material alternatives>` |
| Remaining gaps or risks | `<summary or None>` |
| Decision requested | `<exact request>` |

A concluded whiteboard is the design authority for its implementation plan.
Ordinary implementation discoveries update the plan; an observable design
change requires an explicit whiteboard amendment and owner decision.
