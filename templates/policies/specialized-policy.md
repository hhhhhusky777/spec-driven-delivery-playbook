# Specialized Engineering Policy Template

Use this template when a discovered problem requires a durable cross-feature or
cross-component rule. Do not create a specialized policy for a one-time local
implementation choice; keep that decision in its feature plan or ADR.

Replace every `<placeholder>`. Write `Not applicable — <reason>` rather than
silently removing a required section. Remove this introduction from the
instantiated policy.

## 1. Document control

| Field | Value |
| --- | --- |
| Policy | `<name>` |
| Domain | `<database concurrency/security/storage/provider/etc.>` |
| Status | `DRAFT` |
| Version | `<version>` |
| Owner | `<role/team>` |
| Reviewers | `<roles>` |
| Policy-gap ID | `<ID>` |
| Originating issue/record | `<link>` |
| Effective date | `<date or Not active>` |
| Last reviewed | `<date>` |
| Next review | `<date/event>` |
| Supersedes | `<policy/version or None>` |

Lifecycle:

```text
DRAFT -> PROPOSED -> ACTIVE -> SUPERSEDED
                       |
                       +-> RETIRED
```

New and changed code may be required to follow a `PROPOSED` safety rule before
the existing-system audit is complete. State that adoption boundary explicitly;
do not describe the policy as fully `ACTIVE` until its activation gate passes.

## 2. Policy-gap justification

### Observed problem

`<What happened or which design gap was discovered?>`

### Expected behavior

`<What invariant or consistent decision was missing?>`

### Why a local fix is insufficient

`<Identify repeated callers, components, workflows, reviewers, or future
changes that need the same rule.>`

### Worst case without a policy

`<Data loss, deadlock, security exposure, incorrect billing, outage, drift,
unbounded cost, or other concrete impact.>`

### Evidence

- `<issue, failure justification, code inventory, incident, external contract>`

## 3. Applicability

### Trigger

This policy is required when:

- `<objective trigger>`

### Applies to

- `<components, data, repositories, environments, workflows>`

### Does not apply to

- `<boundary and governing alternative>`

### Local-versus-systemic assessment

| Criterion | Evidence | Result |
| --- | --- | --- |
| Affects multiple features/components | `<evidence>` | `<Yes/No>` |
| Requires consistent ordering/ownership | `<evidence>` | `<Yes/No>` |
| Severe consequence if inconsistent | `<evidence>` | `<Yes/No>` |
| Repeated review/defect pattern | `<evidence>` | `<Yes/No>` |
| Needs automated enforcement | `<evidence>` | `<Yes/No>` |

Decision: `<Create policy / retain local decision>`.

## 4. Authority and related contracts

| Source | Relationship | Conflict rule |
| --- | --- | --- |
| `<development policy>` | `<governs policy lifecycle>` | `<rule>` |
| `<public/system contract>` | `<higher/lower authority>` | `<rule>` |
| `<implementation plan/ADR/runbook>` | `<relationship>` | `<rule>` |

This document defines durable domain rules. Feature plans define how a specific
delivery complies; runbooks define operational procedures; ADRs preserve
significant choices and consequences.

## 5. Terminology and model

| Term | Definition |
| --- | --- |
| `<term>` | `<unambiguous definition>` |

Add the smallest useful model or diagram needed to explain ordering, ownership,
state, hierarchy, or data flow.

## 6. Normative invariants

Assign stable IDs for traceability.

| ID | Invariant | Reason / protected outcome | Enforcement |
| --- | --- | --- | --- |
| `INV-01` | `<must always be true>` | `<why>` | `<test/review/constraint/metric>` |

Use `MUST`, `MUST NOT`, `SHOULD`, and `MAY` consistently. Explain every `SHOULD`
exception boundary.

## 7. Required and prohibited behavior

### Required

- `<rule and applicability>`

### Prohibited

- `<rule and worst case>`

### Decision procedure

Provide a concise sequence or table contributors can apply without relying on
tribal knowledge:

| Situation | Required decision | Evidence |
| --- | --- | --- |
| `<condition>` | `<action>` | `<what proves compliance>` |

## 8. Failure, retry, and degradation behavior

| Failure class | Required state/result | Retry/repair owner | External behavior | Prohibited outcome |
| --- | --- | --- | --- | --- |
| `<failure>` | `<result>` | `<owner>` | `<error/status>` | `<unsafe behavior>` |

Define ambiguous outcomes, timeouts, partial failure, duplicate execution,
recovery, and safe degradation where relevant.

## 9. Ordering, concurrency, and ownership

Complete when the domain contains shared state or concurrent actors:

- Source of truth: `<owner>`
- Allowed concurrent operations: `<list>`
- Mutual-exclusion boundary: `<lock/claim/transaction>`
- Canonical order: `<ordering>`
- Maximum lock/lease scope: `<rule>`
- External work while holding locks: `<rule>`
- Contention/backpressure behavior: `<rule>`
- Race result: `<stable retryable/non-5xx behavior where applicable>`
- Recovery authority: `<component>`

## 10. Security, privacy, and operational consequences

- Sensitive data and secrets: `<rules>`
- Authorization/tenant isolation: `<rules>`
- Audit events: `<rules>`
- Resource/cost impact: `<rules>`
- Deployment/rollback impact: `<rules>`
- Observability/runbook requirements: `<rules>`

## 11. Existing-system audit

The policy originator must determine whether existing behavior already violates
the new rule.

### Inventory method

- Search boundaries: `<paths, APIs, models, queues, queries, config>`
- Static evidence: `<commands/tools>`
- Runtime evidence: `<tests/metrics/traces>`
- Audit owner and completion date: `<value>`

### Compliance matrix

| Boundary | Current behavior | Required behavior | Classification | Risk | Evidence | Remediation task |
| --- | --- | --- | --- | --- | --- | --- |
| `<area>` | `<current>` | `<required>` | `UNKNOWN` | `<C/H/M/L>` | `<link>` | `<ID>` |

Classifications: `COMPLIANT`, `VIOLATION`, `UNKNOWN`, `NOT_APPLICABLE`,
`APPROVED_EXCEPTION`.

## 12. Adoption and remediation plan

- New/changed-code enforcement begins: `<date/state>`.
- Critical/high violations: `<blocking rule>`.
- Medium/low violations: `<tracking and deadline rule>`.
- Unknown areas: `<investigation owner/date>`.
- Migration/compatibility: `<sequence>`.
- Backout/forward-fix: `<strategy>`.

Use small, self-contained remediation tasks. Do not combine unrelated violations
only because they share this policy.

## 13. Verification and enforcement

| Invariant IDs | Mechanism | Scope | Frequency | Failure action | Evidence location |
| --- | --- | --- | --- | --- | --- |
| `<IDs>` | `<constraint/test/lint/review/metric>` | `<scope>` | `<when>` | `<action>` | `<link>` |

Prefer automated enforcement for severe, mechanically detectable violations.
Document what still requires human design review.

## 14. Exceptions

| ID | Rule | Scope | Reason and evidence | Risk/compensation | Owner/approver | Expiry | State |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `EX-01` | `<rule>` | `<scope>` | `<reason>` | `<control>` | `<roles>` | `<date>` | `<state>` |

No permanent undocumented exceptions. Expired exceptions become violations
unless explicitly renewed through review.

## 15. Activation gate

- [ ] Applicability and authority are approved.
- [ ] Normative invariants are unambiguous and testable.
- [ ] Failure and operational behavior are defined.
- [ ] Existing-system inventory is complete enough to classify critical risk.
- [ ] Critical/high violations are fixed or have approved blocking remediation.
- [ ] New and changed work is enforceably compliant.
- [ ] Owners, exceptions, evidence, and review cadence are recorded.
- [ ] Canonical documents and templates reference this policy where applicable.

Activation decision: `<ACTIVE / remain PROPOSED>`.

## 16. Retrospective and review

Review when `<cadence, incident, major change, repeated exception, new external
contract>` occurs.

Ask:

- Did the policy prevent or expose the original problem class?
- Are contributors applying it consistently?
- Are violations found before merge?
- Is the rule too broad, too narrow, or causing harmful contention/complexity?
- Can enforcement be simplified or automated?
- Has the applicability trigger changed?

## 17. Decision and change history

Accepted entries are append-only. Supersede a decision rather than rewriting
its historical rationale.

| Date/version | Status | Decision/change | Rationale and consequences | Approved by | Supersedes |
| --- | --- | --- | --- | --- | --- |
| `<value>` | `<state>` | `<change>` | `<reason>` | `<owner>` | `<entry/None>` |
