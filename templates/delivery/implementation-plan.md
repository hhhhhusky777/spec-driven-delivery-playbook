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
| Implementation mode | `<human-review-before-merge (default) or explicitly enabled Autopilot>` |
| Authorized scope / feature branch / protected target | `<owner-selected values; None before opt-in>` |
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

## Consumed design and contracts

The concluded whiteboard and its canonical sources own architecture, behavior
and design decisions. Reference their accepted IDs, text and relevant diagrams;
record the resulting engineering obligations here without proposing new
feature behavior or duplicating the design. Equivalent implementation choices
remain within those boundaries.

Keep source links and revisions in Governing inputs. The Tasks table below
maps accepted design to engineering work, boundaries and acceptance evidence.

## Test and acceptance contracts

Keep this as the single coverage inventory, not a test-run log. After each
task's focused tests, map changed outcomes and material risks to tests, naming
the owning task and any missing non-focused tests to add at the final gate.
Those recorded gaps do not block task `DONE`.

The workflow skill owns synchronization, implementation audit, human
acceptance, missing-test completion and final-validation timing; follow its
[human implementation review](../../skills/sdd-project-workflow/SKILL.md#human-implementation-review)
contract and surrounding validation rules. The PR owns approvals and run
results. This inventory records task-specific coverage obligations only.

| Owning task | Contract, changed outcome, or risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| `<task ID>` | `<IDs or material risk>` | `<test path/case or planned test>` | `<existing, implemented, or missing>` | `<focused task work or final-gate addition/run>` |

## Delivery strategy and readiness

### Compatibility, migration, and rollout obligations

Translate accepted compatibility and operational boundaries into concrete
engineering work; link the owning design instead of choosing a second approach.

| Concern | Before / after compatibility | Migration or rollout | Rollback / recovery | Validation |
| --- | --- | --- | --- | --- |
| `<API, data, configuration, workflow, or user>` | `<boundary>` | `<approach>` | `<safe return>` | `<proof>` |

### Delivery risks and mitigations

Record execution risks and responses within accepted authority. Reference
design risks already owned by the whiteboard rather than copy them.

| ID | Scenario | Likelihood / impact | Prevention / detection | Owner | State |
| --- | --- | --- | --- | --- | --- |
| `<K01>` | `<worst case>` | `<assessment>` | `<control>` | `<owner>` | `<open or accepted>` |

### Integration and readiness

| Concern | This delivery |
| --- | --- |
| Integration model | `<single PR or feature integration branch>` |
| Increment boundary | `<why each merge unit is self-contained>` |
| Parallel ownership | `<worktrees and non-overlapping scope, or None>` |
| Compatibility sequencing | `<foundation, consumer, migration, cleanup order>` |
| Merge authority | `<human review or explicitly authorized alternative>` |

> [!IMPORTANT]
> **Hard rule.** Record every task's exact branch and required PR target under
> an integration model permitted by the canonical project branch policy.
> Every task MUST comply with that policy; this plan cannot grant exceptions.

A task is ready when its accepted outcome, scope, dependencies, applicable
contracts, risks, validation, and merge boundary are sufficient to proceed
without inventing product behavior. Required machine-local inputs and access
must be available. Future implementation outputs are never prerequisites for
starting the task that produces them.

Readiness is behavioral, not measured by document or code detail. A short task
with bounded observable behavior can be ready; a long task naming files,
classes, or commands is not ready if failure behavior, compatibility, safety,
or ownership decisions remain unresolved. High-risk migrations also make data
invariants, old/new compatibility, deployment order, recovery, and rollback
explicit while leaving contract-equivalent implementation choices to the agent.

## Design-to-task mapping

The Tasks table is the design-to-task mapping; do not maintain a second task
mapping. Reference accepted design IDs and relevant text/views, then explain
what each task implements and how its result will be judged. Record accepted
non-code obligations in Delivery Definition of Done with their design source,
owner and evidence. Keep unresolved gaps in Clarifications and gaps.

> [!IMPORTANT]
> **Hard rule.** Every design point MUST map to a task or non-code obligation.
> Every planned addition MUST trace to the accepted design, an authority it
> explicitly consumes, or a contract-equivalent implementation choice.
> Unexplained scope MUST block readiness.

## Tasks

| ID | State | Depends on | Consumed design | Implementation work | Outcome | Boundaries | Error handling | Validation | Assumptions | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `T01` | `PLANNED` | `None` | `<design IDs and relevant text/diagram links>` | `<concrete engineering changes and existing mechanisms to reuse>` | `<one complete observable result>` | `<owned scope, exclusions and compatibility obligations>` | `<applicable accepted failure/recovery contract and how this task implements it, or None>` | `<acceptance condition; test/coverage links; actual code/flow evidence when available>` | `<material premise, evidence and handling, or None>` | `<owned branch; PR or None; exact target>` |

`Depends on` names producing task IDs and required inputs, not an ordering
inferred from task numbers. Use `None` for genuinely independent work. Keep
cells concise but specific enough for engineering review; link accepted
contracts and detailed evidence instead of copying them. Error handling and
assumptions must not introduce unapproved behavior or speculative cases.

## Task specifications and context receipts

Use this optional section only for engineering detail that does not fit clearly
in the task row, current context evidence and actual results. Do not repeat the
row or maintain another design mapping.

### `<task ID>` — `<task name>`

| Concern | Value |
| --- | --- |
| Additional engineering detail | `<necessary detail beyond the task row, or omit>` |
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

Record this delivery's exact owned cleanup scope and remaining obligations.
The workflow skill's [closing contract](../../skills/sdd-project-workflow/SKILL.md#completion)
owns archive, reset, merge-candidate timing and post-merge cleanup authority.

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

Record the owner's mode choice above; the
[Autopilot contract](../../skills/sdd-project-workflow/SKILL.md#autopilot-mode)
owns the response and authorization requirements.

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and outcomes | `<short task list>` | `<class>` |
| Design consistency | `<accepted design key points beside the task table's design consumption, engineering work, error handling, validation and assumptions; any gaps>` | `<class>` |
| Important changes | `<contracts, architecture, policies, compatibility, migrations, or operations>` | `<class>` |
| Validation | `<passed, failed, and unrun>` | `<class>` |
| Risks or open decisions | `<summary or None>` | `<class>` |
| Decision requested | `<exact request>` | `<class>` |

Detailed comments, checks, approvals, revisions, and merge evidence belong in
the pull request rather than additional repository documents.
