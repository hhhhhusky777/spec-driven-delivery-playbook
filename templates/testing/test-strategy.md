# Test Strategy and Quality Evidence Template

Use this template to create a project-specific, normative test strategy. It
supports TDD, early defect discovery, risk-based system evidence, performance
validation, and evidence-backed failure triage.

Testing demonstrates specified behavior under stated conditions; it cannot
prove that software is defect-free. Replace every `<placeholder>`, define every
percentage denominator, and write `Not applicable — <reason>` instead of
silently deleting a required section. Remove this introduction from the
instantiated strategy.

## 1. Document control

| Field | Value |
| --- | --- |
| Strategy | `<project test strategy>` |
| Status | `DRAFT` |
| Version | `<version>` |
| Owner | `<QA/engineering role>` |
| Approvers | `<roles>` |
| Applies to | `<repositories/services/environments>` |
| Effective date | `<date or Not active>` |
| Last reviewed | `<date>` |
| Next review | `<date/event>` |
| Development policy | `<link>` |
| PR policy | `<link>` |

## 2. Quality objectives and claims

### Objectives

- Find contract, boundary, state, race, security, performance, and integration
  defects as early as practical.
- Provide traceable evidence for every required system contract and material
  risk.
- Keep failures reproducible, diagnosable, and attributable to the responsible
  layer.
- Prevent a narrow passing suite or aggregate percentage from hiding an
  untested changed boundary.
- Preserve fast developer feedback while retaining production-like confidence
  at appropriate gates.

### Permitted claims

Define the evidence required before using statements such as:

- `Focused behavior passed`: `<required evidence>`
- `Regression passed`: `<required evidence>`
- `Contract covered`: `<required traceability>`
- `Production-like path demonstrated`: `<environment and artifact requirements>`
- `Performance requirement met`: `<method and threshold>`
- `Release test gates passed`: `<complete matrix>`

Never infer that unexecuted tests passed, that one backend represents another,
or that coverage alone proves behavioral correctness.

## 3. Project quality profile

| Dimension | Project value | Reason / authority |
| --- | --- | --- |
| Product maturity | `<prototype/development/released>` | `<reason>` |
| Critical data/effects | `<data, billing, security, etc.>` | `<reason>` |
| Supported storage/providers | `<matrix>` | `<contract>` |
| Required environments | `<local/CI/staging/prod-like>` | `<reason>` |
| Critical user journeys | `<links/IDs>` | `<product contract>` |
| Performance-critical paths | `<paths>` | `<budget>` |
| Regulatory/compliance needs | `<value>` | `<authority>` |
| Known difficult test boundaries | `<list>` | `<mitigation>` |

## 4. Change classification and required gates

Define production code and classify each changed artifact. Mixed changes follow
the strictest applicable row.

| Change class | Focused tests | Changed-boundary coverage | Full regression | Smoke | E2E | Performance/security/other |
| --- | --- | --- | --- | --- | --- | --- |
| Documentation only | `<rule>` | `N/A` | `<rule>` | `<rule>` | `<rule>` | `<doc checks>` |
| Tests/harness only | `<rule>` | `<rule>` | `<rule>` | `<rule>` | `<rule>` | `<boundary validation>` |
| Development tooling/config | `<rule>` | `<rule>` | `<rule>` | `<rule>` | `<rule>` | `<validation>` |
| Local production behavior | `<rule>` | `<rule>` | `<rule>` | `<rule>` | `<rule>` | `<risk gates>` |
| API/schema/state change | `<rule>` | `<rule>` | `<rule>` | `<rule>` | `<rule>` | `<contract/migration gates>` |
| Security/data/billing/race | `<rule>` | `<rule>` | `<rule>` | `<rule>` | `<rule>` | `<fault/security evidence>` |
| Performance-sensitive | `<rule>` | `<rule>` | `<rule>` | `<rule>` | `<rule>` | `<benchmark/load gate>` |

Reduced diagnostic runs do not replace required gates. State the approval and
evidence required for exceptions in Section 18.

## 5. Contract and risk traceability

### Contract coverage

| Contract ID | Risk/criticality | Unit/contract evidence | Integration evidence | E2E/simulation evidence | Status |
| --- | --- | --- | --- | --- | --- |
| `<ID>` | `<C/H/M/L>` | `<test/link>` | `<test/link>` | `<test/link>` | `<state>` |

Define the denominator for any contract-coverage percentage. Recommended
baseline: every `MUST` contract maps to at least one verification artifact, and
every critical user journey has applicable end-to-end evidence.

### Risk coverage

| Risk ID | Failure/worst case | Prevention | Detection test | Recovery test | Residual risk/owner |
| --- | --- | --- | --- | --- | --- |
| `<ID>` | `<risk>` | `<control>` | `<test>` | `<test>` | `<value>` |

Do not use an undefined “E2E coverage percentage” or “production simulation
percentage.” Measure named requirements, journeys, risks, platforms, providers,
and failure classes.

## 6. TDD development loop

Use Red-Green-Refactor by default when behavior can be expressed before the
implementation:

1. **Specify:** identify the governing contract and observable behavior.
2. **Red:** add the smallest test and confirm it fails for the expected reason.
3. **Green:** implement the smallest compliant change.
4. **Refactor:** improve structure while preserving behavior.
5. **Broaden:** add boundary, negative, state, race, and failure cases based on
   risk.
6. **Regress:** run the required broader suites.
7. **Demonstrate:** run applicable live/prod-like gates and retain evidence.

Record what qualifies as Red-Green evidence: `<commands/artifacts/PR record>`.

Permitted exceptions to test-first order:

- bounded discovery/PoC code that is not shipped;
- emergency mitigation under the incident policy;
- behavior that must first be characterized from a legacy/external system; or
- generated/mechanical changes whose behavior is verified elsewhere.

An exception still requires tests before delivery where behavior or risk
changes.

## 7. Test levels and ownership

| Level | Purpose | Boundary | Must use real | May fake/mock | Owner | Typical gate |
| --- | --- | --- | --- | --- | --- | --- |
| Unit | `<pure/local behavior>` | `<scope>` | `<items>` | `<items>` | `<role>` | `<gate>` |
| Contract | `<API/provider/schema compatibility>` | `<scope>` | `<items>` | `<items>` | `<role>` | `<gate>` |
| Integration | `<component collaboration>` | `<scope>` | `<items>` | `<items>` | `<role>` | `<gate>` |
| State/race/fault | `<interleavings and recovery>` | `<scope>` | `<items>` | `<items>` | `<role>` | `<gate>` |
| Smoke | `<reachable deployed boundary>` | `<scope>` | `<items>` | `<items>` | `<role>` | `<gate>` |
| E2E | `<critical user journey>` | `<scope>` | `<items>` | `<items>` | `<role>` | `<gate>` |
| Production simulation | `<prod topology/workload>` | `<scope>` | `<items>` | `<items>` | `<role>` | `<gate>` |
| Performance | `<budget/capacity>` | `<scope>` | `<items>` | `<items>` | `<role>` | `<gate>` |
| Security | `<threat/control>` | `<scope>` | `<items>` | `<items>` | `<role>` | `<gate>` |

Tests at one level do not substitute for a required different level; document
the distinct claim each level supports.

## 8. Coverage policy

### Code coverage

| Target | Metric | Threshold | Denominator | Gate | Exception authority |
| --- | --- | --- | --- | --- | --- |
| Changed production files | `<line/branch>` | `<value>` | `<entire changed file/diff>` | `<gate>` | `<owner>` |
| Repository aggregate | `<line/branch>` | `<value or informational>` | `<scope>` | `<gate>` | `<owner>` |

Rules:

- Define exactly what counts as production code and generated/excluded code.
- Aggregate coverage must not hide an uncovered changed file or branch.
- Coverage exclusions require a reason and review.
- Executed lines are not proof of meaningful assertions.
- Add characterization tests before refactoring uncovered legacy behavior when
  the strategy requires preservation.

### Behavioral coverage

Use the traceability matrices for:

- required contracts;
- critical journeys;
- supported environments/providers/platforms;
- state transitions;
- error and retry classes;
- security boundaries; and
- performance/capacity scenarios.

## 9. Early defect-discovery techniques

Select techniques based on risk and record why omitted when material:

- Boundary and equivalence-partition tests
- Negative and malformed-input tests
- State-transition and invariant tests
- Legacy characterization tests
- Contract and consumer/provider tests
- Property-based and metamorphic tests
- Deterministic concurrency/race tests
- Fault injection for timeouts, partial writes, dependency loss, and duplicate
  delivery
- Fuzzing for parsers, protocol boundaries, and hostile input
- Mutation testing to assess assertion strength
- Differential testing against an established implementation
- Static analysis, typing, linting, dependency, and security scanning
- Migration upgrade/fresh-schema/data-integrity tests
- Soak/endurance testing for leaks and accumulated state

Randomized failures must preserve the seed and minimal reproducer before being
accepted into regression coverage.

## 10. Test data, isolation, and determinism

- Data ownership and teardown: `<rules>`
- Tenant/workspace isolation: `<rules>`
- Unique identity generation: `<rules>`
- Clock/randomness control: `<rules>`
- External side-effect containment: `<rules>`
- Parallel-test safety: `<rules>`
- Seed and artifact retention: `<rules>`
- Sensitive/production data prohibition: `<rules>`
- Cleanup failure behavior: `<rules>`

Never make tests pass by depending on execution order, shared undocumented
state, arbitrary sleeps, or uncontrolled live data.

## 11. Environment and configuration matrix

| Environment ID | Purpose | Services/topology | Storage/provider | Data lifecycle | Port/network | Owner |
| --- | --- | --- | --- | --- | --- | --- |
| `<ID>` | `<purpose>` | `<components>` | `<matrix>` | `<ephemeral/retained>` | `<rules>` | `<owner>` |

### Setup and preflight

Define canonical commands or runbook links for:

- dependencies and versions;
- schema/migration state;
- service readiness;
- authentication/authorization fixtures;
- provider/storage configuration;
- queue/worker topology;
- port ownership and stack reuse/override policy;
- secrets and sensitive output protection; and
- cleanup and retained evidence.

Preflight proves readiness only; it is not smoke or E2E evidence.

## 12. Smoke, E2E, and production-simulation policy

### Smoke

- Selection rule: `<changed-boundary/risk rule>`
- Required backends/providers: `<matrix>`
- Real versus mock boundary: `<rule>`
- Pass criteria: `<status/state/side effects>`

### E2E

- Critical journeys: `<IDs/links>`
- Actors/roles: `<matrix>`
- Concurrency/topology: `<configuration>`
- Required platforms/providers: `<matrix>`
- Business/state/security assertions: `<rules>`

### Production simulation

- Production characteristics represented: `<topology/config/load/dependencies>`
- Known differences: `<list and risk>`
- Required workload and duration: `<values>`
- Abort/safety limits: `<values>`
- Evidence and comparison baseline: `<rules>`

Do not label an environment production-like without enumerating its meaningful
similarities and differences.

## 13. Performance and scalability evidence

### Performance contract

| Scenario | Workload | Environment | Metric | Budget | Baseline | Gate |
| --- | --- | --- | --- | --- | --- | --- |
| `<scenario>` | `<rate/concurrency/data size>` | `<ID>` | `<p50/p95/p99/throughput/error/resource>` | `<value>` | `<version>` | `<rule>` |

### Method

- Warm-up: `<rule>`
- Runs/samples: `<count>`
- Duration: `<value>`
- Concurrency/ramp: `<profile>`
- Measurement interval: `<value>`
- Outlier/statistical treatment: `<rule>`
- CPU/memory/DB/queue/network telemetry: `<signals>`
- Allowed environmental variance: `<rule>`
- Regression threshold: `<absolute/relative rule>`
- Raw artifact location: `<path/system>`

A single successful request is not performance evidence. A benchmark without a
controlled environment and baseline is diagnostic only.

## 14. Test-failure triage

A failed test is evidence that an expected contract was not demonstrated. Do
not assume product, test, configuration, performance, or infrastructure fault
before investigation.

Before remediation, record:

1. **Observed failure:** command, operation, exact result, state, timing, and
   reproducibility.
2. **Expected behavior:** governing contract and missing result.
3. **Function/workflow design:** callers, state transitions, transactions,
   queues, retries, timeouts, and side effects.
4. **Evidence:** smallest reproducer and relevant application, worker, provider,
   database, queue, storage, environment, trace, and artifact observations.
5. **Classification hypothesis:** product implementation; design/contract;
   configuration/test data; performance/capacity; test/harness;
   environment/infrastructure; or unresolved. Include confidence and competing
   explanations.
6. **Proposed next proof/fix:** smallest responsible-layer action and gates to
   rerun.

Do not modify assertions, fixtures, timeouts, retries, configuration, or product
code until this justification exists. Preserve the original evidence first.

## 15. Defect and regression management

Create a durable defect when `<issue threshold>` applies, such as unresolved
required behavior, user impact, repeated regression, cross-task ownership,
release risk, or deferred remediation.

Every fixed defect should add the lowest-level stable regression test that
reproduces its observable behavior, plus broader evidence when the escaped risk
requires it. Link defect, contract, test, fix, and delivery evidence.

## 16. Flaky-test policy

- Repetition is diagnosis, not an automatic pass.
- Quarantine criteria: `<strict criteria>`.
- Quarantine owner and expiry: `<rules>`.
- Required preserved seed/log/artifact: `<rules>`.
- Required issue and severity: `<rules>`.
- Merge/release effect: `<rules>`.
- Restoration/removal gate: `<rules>`.

Never silently rerun until green or weaken production behavior to accommodate a
flaky harness.

## 17. Evidence and reporting

For every required gate retain:

- exact command and relevant configuration;
- source commit/branch and dirty-state classification;
- environment/topology/provider identity without secrets;
- start/end time and duration;
- pass/fail/skip counts;
- coverage/traceability/performance output;
- logs/traces/screenshots/reports where relevant;
- failure justifications and remediation sequence;
- known limitations and residual risk; and
- artifact location and retention period.

Define canonical report format and path: `<link>`.

## 18. Gate exceptions

An exception requires:

| Field | Required value |
| --- | --- |
| Gate and scope | `<exact omitted/reduced evidence>` |
| Reason | `<evidence-backed constraint>` |
| Risk/worst case | `<impact>` |
| Compensating evidence | `<control>` |
| Owner/approver | `<roles>` |
| Expiry/follow-up | `<date/issue>` |
| Release effect | `<allowed/blocked>` |

An exception does not turn missing evidence into a pass.

## 19. Maintenance and retrospective

Review this strategy after `<cadence/incident/major architecture change/new
provider/test escape>`.

Measure and discuss:

- defect detection stage and escape rate;
- mutation/assertion quality where used;
- flaky-test rate and time to repair;
- suite duration and feedback latency;
- contract/risk traceability gaps;
- performance-regression detection;
- false confidence from mocks or environment drift;
- recurring failure classifications; and
- obsolete, duplicate, or missing gates.

Update through reviewed policy changes. Record why a new industry practice is
applicable before adopting it.

## 20. Project instantiation checklist

- [ ] Replace all placeholders and remove template instructions.
- [ ] Define production code and every coverage denominator.
- [ ] Define change classes and exact required gates.
- [ ] Name critical journeys and material risks.
- [ ] Define real/mock boundaries for every test level.
- [ ] Provide canonical environment setup and commands.
- [ ] Define failure, defect, flaky-test, and exception workflows.
- [ ] Define performance workloads, metrics, environments, and thresholds.
- [ ] Link development, PR, API, security, and specialized policies.
- [ ] Assign owners, review cadence, evidence location, and retention.

## 21. Change history

| Version/date | Status | Change | Reason/evidence | Approved by | Affected gates |
| --- | --- | --- | --- | --- | --- |
| `<value>` | `<state>` | `<change>` | `<reason>` | `<owner>` | `<scope>` |
