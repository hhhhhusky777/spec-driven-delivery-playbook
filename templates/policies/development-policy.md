# Development Policy Template

Use this template to create a repository-wide development policy. The policy
defines durable engineering rules; it must not contain one feature's design,
task ledger, test results, or delivery chronology.

Replace every `<placeholder>`. Write `Not applicable — <reason>` where a
required section does not apply. Remove this introduction from the instantiated
policy.

## 1. Document control

| Field | Value |
| --- | --- |
| Policy | `<project development policy>` |
| Status | `DRAFT` |
| Version | `<version>` |
| Owner | `<role/team>` |
| Approvers | `<roles>` |
| Effective date | `<date or Not active>` |
| Last reviewed | `<date>` |
| Next review | `<date or event>` |
| Supersedes | `<policy/version or None>` |
| Repository maturity | `<prototype/development/released/regulated/etc.>` |

Allowed lifecycle:

```text
DRAFT -> PROPOSED -> ACTIVE -> SUPERSEDED
                    |    |
                    |    +-> SUSPENDED -> ACTIVE
                    +------> RETIRED
```

An `ACTIVE` policy is normative. Change it through review; do not silently
rewrite obligations during active delivery.

## 2. Purpose, scope, and authority

### Purpose

`<State which development risks and consistency problems this policy controls.>`

### Applies to

- `<repositories, branches, production code, tests, documentation, tooling>`

### Does not apply to

- `<explicit exclusions and their governing authority>`

### Authority order

1. `<law, regulation, or external contractual obligation>`
2. `<public product/system contract>`
3. `<this development policy>`
4. `<active specialized policies>`
5. `<approved feature implementation plan>`
6. `<issues, discussions, prototypes, and implementation details>`

Resolve conflicts before implementation. Record which source supersedes the
other and update stale references.

## 3. Core development principles

Customize these principles without weakening applicable safety or quality
requirements:

- Deliver the smallest self-contained change that creates demonstrable value
  and leaves its integration target working.
- Define observable behavior before implementation.
- Use tests as evidence against contracts and risks, not as proof that defects
  are impossible.
- Prefer simple current requirements over speculative flexibility.
- Preserve unrelated and user-owned work.
- Diagnose failures before changing product code, configuration, or tests.
- Keep one canonical source for each policy or contract and link instead of
  copying it.
- Record decisions, exceptions, and residual risk so another contributor can
  continue without reconstructing private conversation.

## 4. Change classification and required workflow

| Change class | Discovery/whiteboard | Implementation plan | Tests | PR/review | Delivery record |
| --- | --- | --- | --- | --- | --- |
| Trivial documentation | `<rule>` | `<rule>` | `<rule>` | `<rule>` | `<rule>` |
| Test/tooling only | `<rule>` | `<rule>` | `<rule>` | `<rule>` | `<rule>` |
| Local low-risk fix | `<rule>` | `<rule>` | `<rule>` | `<rule>` | `<rule>` |
| Cross-cutting refactor | `<rule>` | `<rule>` | `<rule>` | `<rule>` | `<rule>` |
| Feature/API/schema change | `<rule>` | `<rule>` | `<rule>` | `<rule>` | `<rule>` |
| Security/data/billing/concurrency | `<rule>` | `<rule>` | `<rule>` | `<rule>` | `<rule>` |
| Incident/emergency | `<rule>` | `<rule>` | `<rule>` | `<rule>` | `<rule>` |

State how risk may upgrade a change to a stricter workflow. Documentation-only
work must not be forced through irrelevant runtime gates unless the project
records a reason.

## 5. Spec-driven development workflow

Use separate artifacts with one primary purpose:

```text
Requirement / issue / defect
    -> solution whiteboard
    -> convergence review
    -> approved implementation plan and system contracts
    -> dependency-ordered tasks
    -> implementation and test evidence
    -> validation and retrospective
    -> archived delivery record
```

Define required templates and canonical locations:

| Artifact | Template | Active location | Archive location | Owner |
| --- | --- | --- | --- | --- |
| Solution whiteboard | `<link>` | `<path>` | `<path>` | `<role>` |
| Implementation plan | `<link>` | `<path>` | `<path>` | `<role>` |
| Test strategy | `<link>` | `<path>` | `<path>` | `<role>` |
| PR/branch policy | `<link>` | `<path>` | `<path>` | `<role>` |
| Specialized policy | `<link>` | `<path>` | `<path>` | `<role>` |

The whiteboard contains discovery and rejected alternatives. The approved plan
contains the normative feature contracts. Do not treat issue text, chat, or
pseudocode as an engineering contract unless the plan explicitly promotes it.

## 6. Incremental delivery and reviewability

### Change-unit rule

- Target `<maximum or range>` changed production-code LOC per task/PR.
- Define production code for this repository: `<definition>`.
- Exclude from the planning count: `<tests/docs/generated output/etc.>`.
- Report generated or mechanical changes separately.
- Conceptual cohesion and a working integration target take precedence over
  mechanically satisfying the line count.
- A material exception requires advance justification, reviewer agreement,
  risks, and compensating validation.

Each increment must:

- implement one coherent outcome;
- include its related tests and contract/documentation updates;
- satisfy its own Definition of Done;
- keep the integration target buildable and internally consistent;
- avoid unused APIs or incomplete invariants unless safely gated; and
- remain independently reviewable and reversible or forward-fixable.

### Work-in-progress policy

- Default implementation WIP limit: `<number>`.
- Parallel tasks require `<non-overlap/dependency/owner rule>`.
- A blocked task does not silently authorize unrelated scope expansion.

## 7. YAGNI and over-engineering audit

Run the audit during solution convergence, task readiness, and final PR review.

For every non-essential abstraction, stateful component, dependency, status,
queue, cache, configuration option, compatibility layer, or generalized API,
answer:

1. Which approved current requirement needs it?
2. What is the simplest solution without it?
3. What concrete failure occurs if it is deferred?
4. Is the anticipated extension probable and expensive to add later?
5. Does it increase operational, security, migration, or testing burden now?

Classify each questioned element:

- `KEEP_NOW` — required by an approved contract.
- `EXTENSION_POINT_ONLY` — preserve a clean boundary without implementing the
  future behavior.
- `DEFER` — useful later; record only when a durable follow-up is justified.
- `REMOVE` — speculative or redundant.

## 8. Specialized-policy discovery and governance

Projects cannot predict every cross-cutting policy at inception. Use a policy
registry and a repeatable discovery workflow instead of drafting speculative
rules.

### Policy registry

| Domain | State | Applicability trigger | Current authority | Owner | Last audit |
| --- | --- | --- | --- | --- | --- |
| `<testing/concurrency/security/etc.>` | `<state>` | `<when required>` | `<link/None>` | `<owner>` | `<date>` |

Allowed states: `NOT_ASSESSED`, `NOT_APPLICABLE`, `FEATURE_SPECIFIC`,
`CANDIDATE`, `PROPOSED`, `ACTIVE`, `SUPERSEDED`, `RETIRED`.

### Applicability scan

Every non-trivial whiteboard and plan evaluates at least:

- shared-state concurrency and transactions;
- authentication, authorization, security, privacy, and abuse;
- external APIs and compatibility;
- storage ownership, retention, and deletion;
- provider/network retry and idempotency;
- billing or other exactly-once effects;
- performance, scalability, and capacity;
- deployment, migration, rollback, and recovery;
- observability and operations; and
- testing and evidence.

Mark each domain `Not applicable`, `Covered by <policy>`, `Feature-specific`, or
`POLICY_GAP` with a reason.

### When to create a specialized policy

Create or propose one when a rule is cross-feature, repeated, difficult to
reverse, required for consistent decisions, necessary for automated
enforcement, imposed externally, or protects against severe data, security,
billing, concurrency, or availability impact.

Keep a rule in the feature plan or an ADR when it is local, experimental,
one-time, or already covered by an existing authority.

### Policy-gap workflow

```text
Problem discovered
    -> classify local versus systemic
    -> register POLICY_GAP
    -> investigate and gather evidence
    -> draft specialized policy
    -> review and approve
    -> audit affected existing behavior
    -> remediate by risk in small increments
    -> enforce for all new and changed work
    -> activate and periodically review
```

An unresolved high-risk policy gap blocks implementation readiness. Define how
medium/low-risk adoption work is owned, dated, and tracked.

## 9. Dependencies, gates, and task state

Define the repository's canonical task states or reference the plan template:

```text
PLANNED -> READY -> IN_PROGRESS -> VERIFYING -> DONE
               |         |             |
               +------> BLOCKED <-------+
```

Required rules:

- `READY` requires approved contracts, satisfied dependencies, bounded scope,
  acceptance criteria, test intent, and no material ambiguity.
- `DONE` requires implementation, applicable validation, review, evidence, and
  tracker updates.
- Blockers record observed evidence, impact, owner, and unblock condition.
- Added, removed, split, or reordered tasks retain history; IDs are not reused.
- State changes are recorded before another contributor relies on them.

## 10. Testing, defects, and quality evidence

Canonical test strategy: `<link>`

This policy defines only integration with development:

- Use Red-Green-Refactor where practical.
- Map approved system contracts and material risks to test or verification
  evidence.
- Apply the test strategy's failure-triage process before remediation.
- Track unresolved product defects, policy gaps, deferred risk, and technical
  debt in `<durable tracker>` using the project's issue threshold.
- Do not create permanent defects for understood transient diagnostics that are
  fixed and evidenced within the active task unless audit requirements demand
  it.
- A passing test does not erase untested or accepted residual risk.

## 11. Documentation and contract freshness

- Every canonical document has an owner, status, version or last-reviewed date,
  and inbound references.
- Change documentation with the behavior it governs.
- Reference canonical policies/contracts; do not copy normative paragraphs into
  feature plans.
- Mark dated observations and live evidence with timestamps.
- Periodically review policies according to risk and change rate, not merely
  because an external article changed.
- Assess new industry guidance before adoption through a reviewed policy
  change.
- Supersede obsolete documents explicitly and repair or preserve durable links.

## 12. Handoff and continuation

Every active plan exposes a compact current snapshot containing:

- current state and task;
- next ready task;
- branch/PR/base;
- blockers and unblocking conditions;
- decisions made since the last checkpoint;
- validation completed and still required;
- dirty/user-owned files to preserve; and
- one concrete next action.

Handoffs summarize durable state and link evidence. Do not require replaying
chat transcripts, periodic status messages, or raw logs.

## 13. Token- and context-efficient documentation

- Lead with current state and conclusions.
- Keep one canonical statement and link to it.
- Summarize discussion deltas; do not copy conversations verbatim.
- Use stable IDs and compact tables for repeated mappings.
- Preserve rejected decisions with concise reasons, not full debate.
- Store raw evidence in artifacts and record only the result and location.
- Remove template instructions from instantiated documents.
- Keep required context self-contained; token efficiency must not create
  ambiguity or omit safety-critical reasoning.

## 14. Retrospectives and process improvement

At `<task/feature/release cadence>`, review:

- intended versus delivered outcome;
- defects found early and late;
- preventable rework and ambiguity;
- task sizing and dependency accuracy;
- policy gaps or ineffective policies;
- test effectiveness and missing risk coverage;
- operational and review friction;
- documentation/context quality; and
- concrete improvements with owners.

Classify each improvement as an immediate plan correction, proposed policy
change, tooling/test task, durable issue, or no action. Do not silently change
an active policy from a retrospective.

## 15. Archive and development-history policy

- Reconcile contracts, decisions, tasks, evidence, failures, exceptions, and
  deferred items before closure.
- Convert the completed plan into a dated delivery record without erasing its
  decision and task history.
- Archive the concluded whiteboard with or link it bidirectionally to the
  delivery record.
- Preserve accepted/superseded architecture decisions.
- Do not reset or resume archived feature artifacts; start a new whiteboard and
  plan that reference the prior record.
- Define archive paths, naming, retention, sensitive-data restrictions, and
  broken-link prevention: `<rules>`.

## 16. Branch, PR, and integration policy

Canonical PR/branch policy: `<link>`

Record only development-level expectations here:

- default integration model: `<short-lived topic to main / approved feature integration branch>`;
- integration target must remain green after every increment;
- long-lived branches require explicit justification and refresh rules;
- related tests accompany behavior changes; and
- PRs contain contract, risk, validation, migration, rollback, and review
  evidence required by the canonical policy.

## 17. Exceptions, enforcement, and review

An exception must record:

- exact rule and scope;
- reason and evidence;
- risk and worst case;
- owner and approver;
- compensating control;
- expiry/review date; and
- remediation or acceptance outcome.

Define enforcement mechanisms: `<CI, review checklist, linters, audits, metrics>`.

Policy review checklist:

- [ ] Rules remain applicable to the current repository maturity and risks.
- [ ] Canonical links and owners are current.
- [ ] Exceptions are closed, renewed, or escalated.
- [ ] Retrospective improvements were assessed.
- [ ] New policy gaps were registered.
- [ ] Rules are enforceable and not duplicated elsewhere.
- [ ] Changes are recorded below and communicated to affected plans.

## 18. Change history

| Version/date | Status | Change | Reason/evidence | Approved by | Affected artifacts |
| --- | --- | --- | --- | --- | --- |
| `<value>` | `<state>` | `<change>` | `<reason>` | `<owner>` | `<links>` |
