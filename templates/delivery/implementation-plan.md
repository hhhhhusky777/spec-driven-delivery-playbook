# Implementation Plan — `<feature>`

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority.

Use the applicable sections needed to make implementation safe and reviewable.
The template is a completeness menu, not a requirement to fill every row. Link
canonical contracts instead of copying them, and keep PR review evidence in the
pull request.

Within a pull-request candidate, tracked states describe the repository state
that will result if the candidate merges. Before final review, update every
affected canonical document accordingly. Review, merge, and target verification
remain live pull-request facts; do not predict or duplicate them in a later
status-only change.

## Delivery status

| Field | Value |
| --- | --- |
| State | `DRAFT` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | `<human-review-before-merge or explicitly authorized alternative>` |
| Delivery branch / target | `<values>` |
| Owner | `<owner>` |
| Primary issue / need | `<link>` |
| Concluded whiteboard | `<link and accepted revision>` |
| Required reviewers | `<project rule>` |
| Last verified | `<date and evidence>` |

## Governing inputs and delivery boundaries

### Source hierarchy

| Priority | Source | Authority / use |
| --- | --- | --- |
| 1 | `<owner decision or binding project authority>` | `<boundary>` |
| 2 | `<accepted whiteboard and contracts>` | `<boundary>` |
| 3 | `<implementation evidence>` | `<boundary>` |

### Outcome, scope, and assumptions

| Concern | Accepted value |
| --- | --- |
| Problem | `<observed behavior and consequence>` |
| Required outcome | `<observable result>` |
| In scope | `<systems, behavior, data, or users>` |
| Out of scope / deferred | `<explicit exclusions and owners>` |
| Success measures | `<signals and thresholds>` |
| Assumptions / constraints | `<IDs, evidence, and validation>` |

### Clarifications and gaps

| ID | Question or gap | Why it matters | Resolution / owner | State |
| --- | --- | --- | --- | --- |
| `<G01>` | `<item>` | `<impact>` | `<decision or issue>` | `<open or resolved>` |

## System contracts

Record only contract classes that apply. Link stable project contracts and add
feature-specific behavior here.

### Functional and state contracts

| ID | Trigger / precondition | Required behavior | Result / postcondition | Failure behavior |
| --- | --- | --- | --- | --- |
| `<FC01>` | `<condition>` | `<observable behavior>` | `<result>` | `<safe failure>` |

| Entity | From | Event / guard | To | Atomic effects | Duplicate behavior |
| --- | --- | --- | --- | --- | --- |
| `<entity>` | `<state>` | `<event>` | `<state>` | `<effects>` | `<idempotent result>` |

### Interface, data, and concurrency contracts

| ID / concern | Inputs and outputs | Compatibility / invariants | Transaction, ordering, or idempotency | Failure / recovery |
| --- | --- | --- | --- | --- |
| `<IC01>` | `<API, event, schema, file, or UI>` | `<contract>` | `<ownership and race boundary>` | `<response>` |

### Quality and operational contracts

| Concern | Required outcome | Evidence / threshold | Owner or canonical source |
| --- | --- | --- | --- |
| Security, privacy, and abuse | `<invariants>` | `<tests or review>` | `<owner/link>` |
| Performance and capacity | `<boundary>` | `<measurement>` | `<owner/link>` |
| Observability and operations | `<signals, rollout, rollback>` | `<proof>` | `<owner/link>` |
| Accessibility / usability | `<boundary>` | `<proof>` | `<owner/link>` |

### Test and acceptance contracts

Keep this as the single coverage inventory, not a test-run log. After each
task's focused tests, map changed outcomes and material risks to tests, naming
the owning task and any missing non-focused tests to add at the final gate.
Those recorded gaps do not block task `DONE`.

At final readiness, first perform any required target synchronization, resolve
conflicts, and run affected focused checks. Before adding any missing test or
running any final-gate test, record the author and both retained reviewers'
approval of the exact implementation content. They MUST verify strict
conformance to the concluded whiteboard and its explicitly consumed authorities,
suitable reuse of existing code and project frameworks, and the absence of
unauthorized or redundant implementation. Any later implementation-content
change, including a required
resynchronization, invalidates approval and repeats the audit; a test-only
addition does not. Only after approval,
reconcile all accepted outcomes and material risks, including unrecorded gaps,
and add required missing tests before final candidate review. The PR owns actual
run results.

| Owning task | Contract, changed outcome, or risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| `<task ID>` | `<IDs or material risk>` | `<test path/case or planned test>` | `<existing, implemented, or missing>` | `<focused task work or final-gate addition/run>` |

## Proposed design

### Components and responsibility boundaries

Include a diagram when relationships or sequencing are easier to understand
visually.

| Component | Owns | Must not own | Interfaces / dependencies |
| --- | --- | --- | --- |
| `<component>` | `<responsibility>` | `<boundary>` | `<contracts>` |

### Key decisions

| ID | Decision | Alternatives | Rationale / tradeoff | Affected contracts |
| --- | --- | --- | --- | --- |
| `<D01>` | `<choice>` | `<material alternatives>` | `<why>` | `<IDs>` |

### Compatibility, migration, and rollout

| Concern | Before / after compatibility | Migration or rollout | Rollback / recovery | Validation |
| --- | --- | --- | --- | --- |
| `<API, data, configuration, workflow, or user>` | `<boundary>` | `<approach>` | `<safe return>` | `<proof>` |

### Risks and mitigations

| ID | Scenario | Likelihood / impact | Prevention / detection | Owner | State |
| --- | --- | --- | --- | --- | --- |
| `<K01>` | `<worst case>` | `<assessment>` | `<control>` | `<owner>` | `<open or accepted>` |

## Delivery strategy and readiness

| Concern | This delivery |
| --- | --- |
| Integration model | `<single PR or feature integration branch>` |
| Increment boundary | `<why each merge unit is self-contained>` |
| Parallel ownership | `<worktrees and non-overlapping scope, or None>` |
| Compatibility sequencing | `<foundation, consumer, migration, cleanup order>` |
| Merge authority | `<human review or explicitly authorized alternative>` |

> [!IMPORTANT]
> **Hard rule.** Select an integration model allowed by the project's canonical
> branch policy and record every task's exact branch and required PR target.
> Under a feature integration model, every task PR MUST target the declared
> feature integration branch; only the final reviewed feature PR may target the
> protected integration branch. This plan and its agents MUST NOT add an
> exception, override the canonical policy, or retarget a task directly to the
> protected branch. A mismatch MUST block readiness, review, and merge.

A task is ready when its accepted outcome, scope, dependencies, applicable
contracts, risks, validation, and merge boundary are sufficient to proceed
without inventing product behavior. Required machine-local inputs and access
must be available. Future implementation outputs are never prerequisites for
starting the task that produces them.

The delivery worktree's branch point is the ordinary implementation baseline.
Do not require continuous target synchronization. The final-readiness test and
acceptance contract above owns synchronization, conflict-resolution, and
affected-check timing. Exceptional recovery follows the project's canonical
error-handling authority.

Readiness is behavioral, not measured by document or code detail. A short task
with bounded observable behavior can be ready; a long task naming files,
classes, or commands is not ready if failure behavior, compatibility, safety,
or ownership decisions remain unresolved. High-risk migrations also make data
invariants, old/new compatibility, deployment order, recovery, and rollback
explicit while leaving contract-equivalent implementation choices to the agent.

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| `<whiteboard ID>` | `<task ID and outcome>` | `<proof>` | `<aligned, gap, or non-code obligation>` |

> [!IMPORTANT]
> **Hard rule.** Every design point MUST map to a task or non-code obligation.
> Every planned addition MUST trace to the accepted design, an authority it
> explicitly consumes, or a contract-equivalent implementation choice.
> Unexplained scope MUST block readiness.

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- |
| `T01` | `PLANNED` | `None` | `<observable result>` | `<scope and compatibility>` | `<checks>` | `<owned branch; PR or None; exact target>` |

## Task specifications and context receipts

Repeat this compact section for each task when the ledger row alone is
insufficient.

### `<task ID>` — `<task name>`

| Concern | Value |
| --- | --- |
| Outcome / non-scope | `<observable result and exclusions>` |
| Source boundary | `<owned paths, components, or systems>` |
| Consumed dependencies | `<task IDs, contracts, and exact revisions>` |
| Critical obligations | `<safety, compatibility, data, or policy boundaries>` |
| Required evidence | `<tests, review, deployment, or manual proof>` |
| Context receipt | `<current sources read, conflicts or gaps, and disposition>` |
| Actual result | `<summary when implemented>` |

## Recovery, decisions, and change control

Use the canonical error-handling framework. Keep only active or materially
reusable facts here; detailed review discussion remains in the PR.

### Failure and blocker log

| ID | Task | Observed versus expected | Classification / evidence | Recovery or owner decision | State |
| --- | --- | --- | --- | --- | --- |
| `<E01>` | `<task>` | `<difference>` | `<agent mistake, execution failure, project gap, playbook gap, or critical mismatch>` | `<action>` | `<state>` |

### Delivery decision and amendment log

| ID / time | Decision or plan change | Reason / consequence | Affected design, contracts, or tasks | Authority |
| --- | --- | --- | --- | --- |
| `<entry>` | `<change>` | `<why>` | `<IDs>` | `<owner or evidence>` |

## Plan validation and completion

### Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | `<mapped design and contracts>` | `<pending or evidence>` |
| Applicable validation passed | `<commands, environments, and manual proof>` | `<pending or evidence>` |
| Compatibility and operations safe | `<migration, rollout, rollback, observability>` | `<pending or evidence>` |
| Merge-ready canonical state | `<affected tracked state reconciled before final review>` | `<result>` |
| PR-owned review and delivery | `<PR checks, reviewers, owner authority, merge, and target proof>` | `<PR link; GitHub owns current state>` |
| Feature cleanup complete | `<combined whiteboard-and-plan archive link, exact owned removal inventory, reset proof>` | `<pending or evidence>` |

### Planned versus actual outcome

| Design / task | Planned result | Actual evidence or deviation | Remaining obligation / owner |
| --- | --- | --- | --- |
| `<ID>` | `<plan>` | `<result>` | `<None or follow-up>` |

### Delivery efficiency observations

Record only what was actually observed when it will inform a retrospective or
playbook improvement. Unknown effort is not zero, and this optional table must
not become another progress ledger.

| Review sessions / rounds | Owner interruptions | Repeated checks or recovery | Active / elapsed effort | Quality or limitation |
| --- | --- | --- | --- | --- |
| `<measured value or Unknown>` | `<measured value or Unknown>` | `<measured value or Unknown>` | `<measured value or Unknown>` | `<outcome or limitation>` |

### Cleanup inventory

| Item | Keep, archive, remove, or reset | Ownership and evidence | Result |
| --- | --- | --- | --- |
| `<path, branch, worktree, runtime item, or issue>` | `<action>` | `<proof and authority>` | `<pending or result>` |

Tracked cleanup belongs in the merge candidate. After target verification,
remove owned delivery/task worktrees and merged branches, then return the
coordinating checkout to the accepted target branch when safe. Keep any unsafe
or externally owned cleanup pending rather than discarding or disrupting work.

Use only the task detail needed to implement and judge the result. In a final
PR candidate, a task is `DONE` when its accepted outcome, applicable validation,
dependent state, and merge-ready canonical updates are complete. This is the
state that becomes authoritative on merge; it does not claim that the PR has
already been reviewed or merged.

### Completion invariants

- The concluded design is fully mapped with no unexplained task or gap.
- Applicable project checks pass; unrun or failed checks remain explicit.
- Every affected tracked canonical state already represents the result of
  merging the candidate; no predictable status-only follow-up is required.
- Required review, merge authority, merge, and target verification are recorded
  in the pull request rather than predicted in the plan.
- Canonical documents and user-facing entry points affected by the change are
  consistent.
- The plan reports the actual final state and no unresolved critical mismatch.

## Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and outcomes | `<short task list>` | `<class>` |
| Design consistency | `<mapping result and gaps>` | `<class>` |
| Important changes | `<contracts, architecture, policies, compatibility, migrations, or operations>` | `<class>` |
| Validation | `<passed, failed, and unrun>` | `<class>` |
| Risks or open decisions | `<summary or None>` | `<class>` |
| Decision requested | `<exact request>` | `<class>` |

Detailed comments, checks, approvals, revisions, and merge evidence belong in
the pull request rather than additional repository documents.
