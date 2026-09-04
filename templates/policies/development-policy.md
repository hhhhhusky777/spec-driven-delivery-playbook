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
| Review state | `NOT_STARTED` |
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

### 1.1 Artifact review gate

Submit each draft or update through exact-revision self-review, fresh-context
agent review, and human review. First complete the
[agent self-review](../reviews/agent-self-review.md) against the exact candidate
evidence, then use the canonical
[fresh-context review](../reviews/fresh-context-agent-review.md). After fresh
approval, stop for mandatory human review before changing the policy to
`ACTIVE`. Any candidate change invalidates both prior results; resolve
`CHANGES_REQUESTED`, record `ACCEPT`, `PARTIALLY_ACCEPT`,
`REJECT_WITH_JUSTIFICATION`, or `DEFER_WITH_AUTHORITY`, repeat self-review, and
return to the same session reviewer(s). Agent review is evidence, not policy
approval.

| Round | Candidate | Self-review | Fresh-context review | Durable findings/resolution | Human review | Result |
| --- | --- | --- | --- | --- | --- | --- |
| `1` | `<exact revision>` | `<record>` | `<receipt>` | `<links/None>` | `<identity + evidence>` | `<APPROVED/CHANGES_REQUESTED>` |

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
3. `<this development policy and other active project-wide policies>`
4. `<active specialized policies>`
5. `<accepted architecture decision records>`
6. `<approved feature implementation plan>`
7. `<issues, discussions, prototypes, and implementation details>`

Resolve conflicts before implementation. Record which source supersedes the
other and update stale references.

A reviewed `PROPOSED` specialized policy is authoritative only inside its
explicit new/changed-code adoption boundary while activation work continues.
It must not conflict with higher active authorities, and it must not be cited
as generally `ACTIVE` outside that boundary.

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

Under this playbook, every change begins with a solution whiteboard and reviewed
handoff. Low-risk documentation and emergency records may be compact, and an
authorized emergency may complete them concurrently with bounded mitigation,
but the durable discovery/decision record and follow-up review are not erased.

### Risk-based review and continuation

Assign one review mode to every workflow action before it starts. If the mode
or its authority is absent, the default review mode is `EXPLICIT_REVIEW`.

| Mode | Behavior | Permitted use |
| --- | --- | --- |
| `EXPLICIT_REVIEW` | Exact-revision self-review, stable fresh-context review session, then mandatory human review | Any semantic decision, approval, exception, or risk boundary |
| `AUTO_CONTINUE` | Run deterministic work and continue while every condition passes | Mechanical generation, state/evidence synchronization, and deterministic validation |
| `REVIEW_ON_EXCEPTION` | Continue through a pre-authorized repeatable action; stop on any exception | Known low-risk operations with objective success/failure gates |

An automatic action must satisfy all of these conditions:

- an active project policy pre-authorizes its action class, gates, write scope,
  automation boundary, and audit destination;
- its inputs are approved and `CURRENT`;
- it must not introduce a new semantic decision about requirements, design,
  policy, architecture, contracts, behavior, risk, or exceptions;
- its output is deterministic or mechanically derived from approved inputs;
- every required automated gate passes against the exact resulting revision;
- no blocker, stale dependency, ambiguity, unknown, exception, test failure,
  unrelated diff, or scope expansion exists; and
- the next action remains inside the approved automation boundary, WIP policy,
  and exact write scope.

Automatic continuation fails closed to `EXPLICIT_REVIEW` when any condition is
false or cannot be proven. It continues only until the next mandatory semantic
checkpoint. `AUTO_CONTINUED` is an audit outcome, not an approval, review state,
or permission to mark a normative artifact `APPROVED`.

Always require `EXPLICIT_REVIEW` for a whiteboard conclusion, handoff meaning,
routing choice, policy, ADR, public/system contract, complete task
specification, acceptance or risk decision, exception, destructive or
externally consequential action, and any approval required by project PR,
security, release, or compliance policy. A project may make this list stricter.
Changing an action from `EXPLICIT_REVIEW` to another mode is itself a semantic
policy decision and requires explicit review.

Record each automatic action, input/output revision, mode authority, gates and
results, change/impact classification, resulting state, and next action. At the
next explicit checkpoint, summarize the automatic segment without representing
it as reviewer approval.

`AUTO_CONTINUE` and `REVIEW_ON_EXCEPTION` are non-review action modes. They may
perform only the deterministic work above and must end before a review-gated
artifact is approved. They never replace fresh-context or human review.

### Mandatory agent self-review

Before every review gate, the generating or implementing agent reviews the
exact candidate revision against approved inputs, requirements, contracts,
scope and non-scope, acceptance criteria, applicable policies, required tests,
risks, surrounding behavior, and cross-document consistency. Use the canonical
agent self-review template: `<link>`.

For code changes, open a draft PR when project policy permits and add concise
author annotations to material or non-obvious hunks. Each annotation maps the
change to its governing statement, reason, expected effect, evidence, and
risk. Do not comment on routine mechanics or add source-code comments that only
repeat the PR explanation.

The agent then audits the complete diff and annotations against the final PR
head. Record the exact commit or immutable artifact version, findings,
resolutions, gates, and `SELF_REVIEW_PASSED` or `SELF_REVIEW_FAILED`. Any
candidate change invalidates the prior result. An open blocking finding or
missing/failed gate requires `SELF_REVIEW_FAILED` and stops submission to the
owning review gate until resolved.

Self-review is mandatory pre-review evidence regardless of the selected review
mode. It is not independent approval: `SELF_REVIEW_PASSED` cannot set
`APPROVED`, satisfy a required reviewer, authorize merge, or authorize
continuation by itself.

### Mandatory fresh-context and human review

After self-review passes, every review gate opens a stable review session and
initializes one or more fresh-context subagents using the canonical protocol:
`<link>`. Each reviewer receives a frozen exact-revision packet without the
author's conversation or proposed result, derives expectations from approved
sources, remains read-only, and returns `APPROVED`, `CHANGES_REQUESTED`, or
`BLOCKED` with durable findings.

Every finding records its location, governing statement, expected and observed
result, impact, requested outcome, author disposition, resolution revision, and
reviewer disposition. Preserve the original finding. A changed candidate
invalidates its prior disposition and requires a new self-review plus re-review
by the same assigned session reviewer(s). Incorrect comments are rejected with
contract evidence; unresolved disagreement stops for human decision.

For design, governance, adoption, upgrade, validation, and archive gates,
fresh-context approval is followed by mandatory human review. Human-requested
changes repeat the author -> self-review -> same-session fresh-review cycle before human
re-review, using the same session reviewer(s). An agent approval cannot replace
human design authority.

Implementation uses the same sequence in `HUMAN_REVIEW_BEFORE_MERGE`. Only a
user-authorized, scoped `AGENT_AUTO_MERGE` implementation PR may continue after
fresh-context approval without pre-merge human review, and only when every live
mode, scope, repository, test, comment, blocker, and merge gate passes.

### Human-selected implementation continuation

This choice applies only after the whiteboard, handoff, routing, policies,
contracts, complete task specification, and implementation plan have received
their required design-phase approvals. Design and planning gates always stop
for their required reviewer and cannot use this implementation mode.

The delivery workflow is the canonical live owner of one mode:

| Mode | Task-PR behavior |
| --- | --- |
| `NOT_SELECTED` | Implementation cannot start; ask the user to choose a mode |
| `HUMAN_REVIEW_BEFORE_MERGE` | After exact-revision self-review and fresh-context approval, stop until human review and merge authority are recorded |
| `AGENT_AUTO_MERGE` | After exact-revision self-review and fresh-context approval, recheck all live gates, merge the scoped implementation PR, and continue to the next dependency-ready task |

Ask the user to choose after design approval and before the first task enters
`IN_PROGRESS`. Record the user's identity/instruction, selected time, exact
implementation repository URL, and a comma-separated list of unique stable
implementation target IDs in the workflow. Do not encode prose such as `task`
or `PR` in that list. The agent must never infer or select `AGENT_AUTO_MERGE`.

Recording an explicit user selection or change is a control-only workflow
synchronization and needs no second semantic approval unless project policy
requires one. It must reproduce the instructed mode and scope exactly and pass
the workflow's lifecycle checks; it cannot broaden the authorization.

The user may change the mode at any time. The new value applies before the next
irreversible action; it cannot undo a completed merge. Before each task edit,
self-review gate, PR opening, merge attempt, and next-task continuation, the
agent rereads the canonical workflow and verifies the current mode, authority,
scope, revision, `Current review phase`, and `Current review target ID`. Only an
`IMPLEMENTATION` target inside that scope can omit pre-merge human review;
design, validation, and archive gates cannot. Missing, invalid, stale, or
out-of-scope mode data stops for user direction.

`AGENT_AUTO_MERGE` does not relax the approved task, tests, self-review,
fresh-context review, PR
annotations, branch routing, branch protection, CODEOWNERS, security,
compliance, deployment, or repository merge rules. The agent must stop on a
failed or missing gate, conflict, unresolved comment, change request, stale
input, unexpected diff, ambiguity, inconsistency, new semantic decision,
scope expansion, mode change, or a repository rule requiring review. It must
not use administrator bypass or weaken a required check.

The recorded scope may include task PRs and, after final validation receives
its required approval, the final feature-integration PR. The mode may authorize
that PR's merge but cannot approve final validation or any other design,
contract, risk, exception, or closure decision.

Every automatically merged PR enters a post-merge human-review ledger with its
registered target/PR identity, head and merge commit, mode authority,
revision-bound self-review, fresh-review and check receipts, merge evidence,
and disposition.
Implementation may continue while those reviews are pending only when no
finding affects the next task. Delivery cannot become `COMPLETE` or archive
until every pending review is accepted or its required follow-up is resolved.

## 5. Spec-driven development workflow

Use separate artifacts with one primary purpose:

```text
Requirement / issue / defect
    -> solution whiteboard
    -> convergence review
    -> reviewed whiteboard handoff
    -> delivery router and reviewed artifact manifest
    -> one-at-a-time policy / ADR / audit / contract artifacts as selected
    -> approved implementation plan and system contracts when selected
    -> dependency-ordered tasks
    -> implementation and test evidence
    -> validation and retrospective
    -> archived delivery record
```

Define required templates and canonical locations:

| Artifact | Template | Active location | Archive location | Owner |
| --- | --- | --- | --- | --- |
| Solution whiteboard | `<link>` | `<path>` | `<path>` | `<role>` |
| Whiteboard handoff | `<link>` | `<path>` | `<path>` | `<role>` |
| Delivery workflow/manifest | `<link>` | `<path>` | `<path>` | `<role>` |
| Implementation plan | `<link>` | `<path>` | `<path>` | `<role>` |
| Test strategy | `<link>` | `<path>` | `<path>` | `<role>` |
| PR/branch policy | `<link>` | `<path>` | `<path>` | `<role>` |
| Specialized policy | `<link>` | `<path>` | `<path>` | `<role>` |

The whiteboard contains discovery and rejected alternatives. The approved plan
contains the normative feature contracts. Do not treat issue text, chat, or
pseudocode as an engineering contract unless the plan explicitly promotes it.

## 6. Incremental delivery and reviewability

### Change-unit rule

Deliver the smallest coherent, self-contained increment that can be reviewed,
validated, and merged independently while leaving the integration target
buildable, testable, and behaviorally consistent.

- Include every product change, test, contract, migration, compatibility
  measure, observability update, and document required for that boundary.
- The increment may depend on already merged prerequisites, but it must not
  rely on unmerged follow-up work to build, pass required tests, preserve active
  behavior, or satisfy its stated contracts.
- Keep inseparable changes together when splitting them would leave an invalid
  intermediate state. Split further when separate outcomes can satisfy the
  rule independently.
- Treat numeric size and generated/mechanical volume as review-planning inputs,
  never as acceptance limits or substitutes for cohesion.
- Justify an unusually broad increment with its inseparable boundary, risks,
  reviewers, and compensating validation; do not justify it by convenience.

Each increment must:

- implement one coherent outcome;
- include its related tests and contract/documentation updates;
- satisfy its own Definition of Done;
- keep the integration target buildable and internally consistent;
- close the canonical test strategy's Red-Green cycle inside the same task and
  merge unit;
- avoid unused APIs or incomplete invariants unless safely gated; and
- remain independently reviewable and reversible or forward-fixable.

### Dependency and data sequencing

Plan tasks by real prerequisites, not by presentation order or a universal
layer-first preference. Define observable contracts and state invariants before
freezing task order.

For every delivery, classify its durable-data impact as `NONE`, `ADDITIVE`,
`TRANSITIONAL`, or `DESTRUCTIVE` and state the compatibility boundary. When the
classification is not `NONE`:

1. Implement and validate the minimum schema, migration, constraints, and
   data-access foundation before a task whose business behavior depends on it.
2. Introduce consumers and perform required data transitions while the
   integration target remains working.
3. Remove obsolete fields, indexes, paths, or compatibility behavior only after
   every consumer has moved and the cleanup gate has evidence.

Tag applicable plan tasks as `FOUNDATION`, `CONSUMER`, `MIGRATION`, or `CLEANUP`;
use `NONE` when no durable-data dependency exists:

- `FOUNDATION` creates the minimum compatible durable shape, constraints,
  migration, and access primitives.
- `CONSUMER` introduces behavior that depends on that foundation.
- `MIGRATION` moves stored data, traffic, or read/write ownership to the target.
- `CLEANUP` removes obsolete schema or compatibility paths after migration.

A foundation increment may be non-user-facing when it is independently
verifiable, required by an approved consumer, and safe while dormant. It must
not introduce speculative schema.

This is dependency-first sequencing, not an instruction to finish an entire
data layer before delivering behavior or to move business logic into the
database. Record an exception when:

- a PoC or unresolved business contract must determine the data shape first; or
- the data and behavior cannot be separated without leaving an unsafe or broken
  integration target, so they must ship as one bounded vertical increment.

Plan implementation/merge dependencies separately from deployment order.
Projects with live data or mixed application versions should normally use an
expand -> consume/migrate -> contract rollout; project-specific migration,
backup, and recovery policies remain authoritative.

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
    -> local: update the owning plan/contract/task/ADR and review it
    -> systemic: register POLICY_GAP
        -> classify current-delivery versus independent scope
        -> update/reroute the active manifest, or start a linked workflow
        -> pause only affected tasks and mark invalid dependents STALE
        -> investigate and gather evidence
        -> generate or update the applicable specialized policy as PROPOSED
        -> define the new/changed-code adoption boundary
        -> audit affected existing behavior
        -> remediate by risk in small increments
        -> reconcile the implementation plan and dependent artifacts
        -> pass resume and policy-activation gates
        -> activate and periodically review
```

An unresolved high-risk policy gap blocks implementation readiness. Define how
medium/low-risk adoption work is owned, dated, and tracked.

When a gap appears after implementation starts, do not restart or duplicate the
entire delivery by default. Reroute its existing manifest when the rule belongs
to the same accepted outcome. Start a separate whiteboard/handoff/workflow only
when the issue is materially independent, and record the dependency or blocker
in both workflows. Follow the
[mid-delivery rerouting workflow](../../README.md#mid-delivery-policy-gap-rerouting).

## 9. Dependencies, gates, and task state

Define the repository's canonical task states or reference the plan template:

```text
PLANNED -> READY -> IN_PROGRESS -> VERIFYING -> DONE
   |          |          |             |
   +----------+----------+-----------> BLOCKED

Any non-DONE task -> CANCELLED
```

Required rules:

- `READY` requires approved contracts, satisfied dependencies, bounded scope,
  acceptance criteria, test intent, and no material ambiguity.
- `DONE` requires implementation, applicable validation, review, evidence, and
  tracker updates.
- Blockers record observed evidence, impact, owner, and unblock condition.
- A `BLOCKED` task preserves its prior state and returns to that state, or to a
  newly recomputed safe state, after the unblock condition is evidenced.
- Added, removed, split, or reordered tasks retain history; IDs are not reused.
- `CANCELLED` requires a reason and dependency/contract impact; a `DONE` task
  is never rewritten as cancelled.
- State changes are recorded before another contributor relies on them.

Parent lifecycle states do not mirror the state of the latest task. A plan may
enter `VALIDATING` only when every task in its active ledger is terminal:
`DONE`, or `CANCELLED` with its reason and dependency/contract impact recorded.
It must have no `NEXT` marker or next-ready task. One task entering `VERIFYING`
or `DONE` never authorizes plan-level validation while another ledger task is
non-terminal. Deferred outcomes leave the active delivery only through a
reviewed scope change and retain a durable owner/tracking reference.

### 9.1 Complete task specification

A task specification is complete when an implementer can implement it without
inventing or changing product or system behavior. It is not a line-by-line
implementation blueprint. Before readiness, identify or canonically reference:

- observable outcomes, postconditions, failures, and prohibited behavior;
- approved contract and decision IDs;
- scope, non-scope, dependencies, data phase, affected component/source
  boundary, compatibility or migration boundary, and expected evidence; and
- applicability of data, concurrency, security, operations, and performance
  risks, with reasons for every `Not applicable` decision.

Canonical approved contracts satisfy these obligations by reference; do not
duplicate their full text in the task. Helper/class layout, incidental internal
names, local refactoring structure, and contract-equivalent internal
engineering choices remain with the implementer. An internal choice must be
elevated before coding when it changes observable behavior, difficult-to-reverse
architecture or data, transaction or lock ownership, integrity, security,
compatibility, operations, or an approved performance boundary.

The task author prepares the complete specification and self-checks every DoR
input before requesting one independent readiness review. DoR verifies the
specification; it is not a reason to prescribe every internal choice or to use
review as the planned authoring step. The workflow freshness value `UNKNOWN`
applies to artifact-change impact, not to ordinary implementation choices among
approved contract-equivalent alternatives. Use the
[task-specification calibration guide](../../docs/task-specification-calibration.md)
for positive, negative, and migration examples.

### 9.2 Pre-start task context receipt

Before a task that changes product, data, runtime configuration, or delivery
behavior moves from `READY` to `IN_PROGRESS`, its implementer must complete an
approved task context receipt. This is a transition gate, not another task
state. A project may apply the gate to additional task classes; an excluded
task records `NOT_APPLICABLE` and the reason.

The receipt demonstrates reconciliation of the complete approved source set
for that task. It does not prove human or AI comprehension, and an attention
map does not replace reading the governing sources. Record, without copying
their canonical text:

- implementer identity or agent, timestamp, task ID, and immutable source
  revision;
- intended outcome, non-scope, and governing contract and decision IDs;
- critical obligations and prohibitions, with their local consequence and
  canonical links;
- material risks, exceptions, dependencies, data phase, and operational or
  compatibility boundaries;
- required acceptance, test, and other completion evidence;
- unresolved ambiguity or conflict, including attention-map omissions; and
- fresh-context review disposition and receipt; and
- human review disposition and required specialty when the live implementation
  mode is `HUMAN_REVIEW_BEFORE_MERGE`.

After the author self-review, the gate's assigned fresh-context reviewer(s)
reconcile the receipt with the approved source set and record `APPROVED` or
`CHANGES_REQUESTED`. The receipt author cannot satisfy that requirement. Under
`HUMAN_REVIEW_BEFORE_MERGE`, a qualified human or specialist then reviews it;
under scoped `AGENT_AUTO_MERGE`, fresh approval may continue only through the
live implementation gates. Security, privacy, billing, destructive data,
concurrency, and other project-defined high-risk work may still require a
human specialist even in auto mode.

Before `READY`, the task identifies its canonical source boundary and confirms
that the required sources and a current revision are available. After `READY`
and before `IN_PROGRESS`, the receipt freezes and reconciles the exact current
revision, risks, prohibitions, and completion evidence. Intentionally blank
post-`READY` receipt fields do not fail DoR.

If a governing source changes after approval, mark the receipt `STALE` and
pause affected work at the next safe boundary. Refresh and reapprove it before
continuing; use `BLOCKED` only when the change cannot be reconciled safely.
`READY -> IN_PROGRESS` is prohibited while the receipt is `NOT_STARTED`,
`CHANGES_REQUESTED`, or `STALE`.

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
- next ready task or tasks within the active WIP limit;
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
- Permit only one need in each stable working-whiteboard path. After closure,
  verify the immutable archived copy and delivery-record links before replacing
  that working path with a fresh `EMPTY` whiteboard.
- Define archive paths, naming, retention, sensitive-data restrictions, and
  broken-link prevention: `<rules>`.

## 16. Branch, PR, and integration policy

Canonical PR/branch policy: `<link>`

Record only development-level expectations here:

- single-task integration model: `<protected -> task -> protected>`;
- multi-task integration model: `<protected -> feature -> tasks -> feature -> protected>`;
- every multi-task delivery uses a delivery-specific feature integration branch,
  and every task branch and task PR returns to that branch;
- integration target must remain green after every increment;
- feature integration branches require bounded lifetime, protected-branch
  synchronization, final validation, and explicit closure rules;
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
