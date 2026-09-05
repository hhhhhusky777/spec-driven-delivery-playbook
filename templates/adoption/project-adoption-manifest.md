# Project Adoption Manifest — `<project>`

## Optional batched route

A project may authorize one installation preparation/review batch. Record its
scope, authority and evidence here; mappings and policies stay proposed until
joint acceptance. Runtime verification, neutral whiteboard, pilot and activation
remain separate obligations, not automatic consequences of file creation.

See [Batched review and recovery](../../docs/batch-review-and-recovery.md) for authority, evidence and recovery
requirements. This route takes effect only through reviewed project adoption.

Use this template with the
[Project Adoption Runbook](../../docs/project-adoption-runbook.md). Replace all
applicable placeholders, remove these instructions, and keep the instantiated
manifest in the adopting project. This manifest records adoption decisions and
evidence; it does not replace the project authorities to which it links.

## 1. Control and live state

| Field | Value |
| --- | --- |
| Project / repository | `<canonical name and link>` |
| Adoption scope | `<repositories/components/teams>` |
| Adoption state | `DISCOVERY` |
| State before block | `None` |
| Playbook source repository | `<canonical repository URL>` |
| Playbook revision | `<immutable commit or release>` |
| Upgrade state | `NONE` |
| Upgrade assessment / candidate | `<None, or link + immutable candidate revision>` |
| Playbook materialization mode | `<pinned local checkout / vendored selected artifacts / immutable remote>` |
| Runtime playbook locator contract | `<caller-supplied variable/input name; never a committed machine-local path>` |
| Target base revision | `<immutable commit>` |
| Inspection date | `<date>` |
| Adoption owner | `<role/person>` |
| Required reviewers | `<policy/test/PR/security/other owners>` |
| Project contract registry | `<canonical link>` |
| Project adoption root | `<canonical path>` |
| Bootstrap trigger source | `<path inside the verified playbook revision>` |
| Installed project trigger | `<project-local canonical path or reviewed Not installed>` |
| Branch / PR | `<value>` |
| Allowed write scope | `<exact paths; update before every agent action>` |
| Required documentation checks | `<commands or reviewed Not applicable reason>` |
| Review mode | `<EXPLICIT_REVIEW / AUTO_CONTINUE / REVIEW_ON_EXCEPTION>` |
| Review mode authority | `<approved action-control row / policy link>` |
| Self-review state | `<NOT_STARTED / SELF_REVIEW_PASSED / SELF_REVIEW_FAILED>` |
| Self-review candidate revision | `<exact commit/version or Not applicable>` |
| Self-review evidence | `<record/link or Not applicable>` |
| Fresh-context review state / evidence | `<state + exact-revision receipt or Not started>` |
| Fresh-context review session / assigned reviewers | `<stable session ID + assigned and approved reviewer IDs + required approval count or Not started>` |
| Human review state / evidence | `<state + reviewer/link or Not started>` |
| Automation boundary | `<last permitted action ID or Not applicable>` |
| Required automatic gates | `<commands/check IDs or Not applicable>` |
| Automatic gate result | `<PASS / FAIL / NOT_RUN / NOT_APPLICABLE>` |
| Semantic decision introduced | `<NO / YES / UNKNOWN>` |
| Automation exception | `<ID/details or None>` |
| Current blocker | `None` |
| Next action | `<one concrete action>` |

Set `State before block` to the current non-blocked adoption state before
entering `BLOCKED`; reset it to `None` after returning to a safe active state.
The installer uses this field only to retain the correct adoption or workflow
skill while blocked.

Review defaults to `EXPLICIT_REVIEW`. `AUTO_CONTINUE` and
`REVIEW_ON_EXCEPTION` are valid only when a reviewed project authority
preclassifies the action, every declared gate passes, no semantic decision or
exception exists, and the next action remains within the recorded automation
boundary and write scope. Otherwise continuation fails closed to
`EXPLICIT_REVIEW`.

During policy mapping, require the development and PR/branch authorities to
decide whether implementation permits `AGENT_AUTO_MERGE` or only
`HUMAN_REVIEW_BEFORE_MERGE`. Record where the live delivery choice and
post-merge review ledger will reside. A missing decision routes to
`UPDATE_EXISTING`; adoption never infers auto-merge permission.

Adoption type: `<real project / internal trial / external-project case study>`

External-project disclaimer: `<Not applicable, or explicit no-affiliation and
no-endorsement statement>`

## 2. Outcome, scope, and non-scope

Outcome:

`<What project-local delivery capability this adoption must provide>`

In scope:

- `<repositories, contributors, delivery classes, and environments>`

Not in scope:

- `<explicit exclusions, including upstream changes not authorized>`

Success evidence:

- `<observable adoption result and evidence location>`

## 3. Authority and conflict rules

Project-defined authority order:

1. `<highest applicable project authority>`
2. `<next authority>`
3. `<approved instantiated playbook supplements>`
4. `<upstream playbook as informative source>`

Conflict owner and escalation path: `<value>`

Rules:

- Existing project authority remains active until reviewed and superseded.
- A generated artifact has no project authority before project approval.
- Unresolved authority conflicts block only affected adoption work.
- Summaries link to canonical rules and do not compete with them.

## 4. Repository discovery inventory

Record verified facts from the pinned target revision. Use `UNKNOWN` where
evidence is unavailable.

| Domain | Existing authority/evidence | State/version | Owner | Confidence |
| --- | --- | --- | --- | --- |
| Contributor entry point | `<link or None>` | `<value>` | `<role>` | `<level>` |
| Development/change policy | `<link or None>` | `<value>` | `<role>` | `<level>` |
| Test strategy and commands | `<links or None>` | `<value>` | `<role>` | `<level>` |
| PR/branch/reviewer rules | `<links or None>` | `<value>` | `<role>` | `<level>` |
| Documentation/API contracts | `<links or None>` | `<value>` | `<role>` | `<level>` |
| CI/release/operations | `<links or None>` | `<value>` | `<role>` | `<level>` |
| Security/privacy/compliance | `<links or None>` | `<value>` | `<role>` | `<level>` |
| Data/concurrency/performance | `<links or None>` | `<value>` | `<role>` | `<level>` |
| Decision/history/archive | `<links or None>` | `<value>` | `<role>` | `<level>` |

Unknowns and verification owners:

| ID | Unknown | Why it matters | Owner | Resolution evidence / state |
| --- | --- | --- | --- | --- |
| `U-01` | `<fact>` | `<impact>` | `<owner>` | `<link / OPEN>` |

## 5. Adoption routing manifest

Use only `REUSE`, `UPDATE_EXISTING`, `GENERATE`, `SKIP`, `DEFER`, or `BLOCKED`.

| Order | Capability/artifact | Decision | Project authority or destination | Reason/evidence | Depends on | Reviewer/state |
| --- | --- | --- | --- | --- | --- | --- |
| `0` | Project development entry point | `<decision>` | `<link/path>` | `<reason>` | `None` | `<review>` |
| `1` | Development policy | `<decision>` | `<link/path>` | `<reason>` | `<IDs>` | `<review>` |
| `2` | Test strategy | `<decision>` | `<link/path>` | `<reason>` | `<IDs>` | `<review>` |
| `3` | PR and branch policy | `<decision>` | `<link/path>` | `<reason>` | `<IDs>` | `<review>` |
| `4` | Specialized-policy registry | `<decision>` | `<link/path>` | `<reason>` | `<IDs>` | `<review>` |
| `5` | Per-need delivery artifacts | `<decision>` | `<link/path>` | `<reason>` | `<IDs>` | `<review>` |
| `6` | Documentation/test/PR enforcement | `<decision>` | `<link/path>` | `<reason>` | `<IDs>` | `<review>` |
| `7` | Adoption archive and updates | `<decision>` | `<link/path>` | `<reason>` | `<IDs>` | `<review>` |
| `8` | Human/agent entry-point adapters | `<decision>` | `<link/path>` | `<reason>` | `<IDs>` | `<review>` |

### Policy conformance audit

Complete this audit before approving `REUSE` for an existing policy. Assess
decision-level conformance; matching filenames, headings, or general intent are
not evidence by themselves. Equivalent project controls are acceptable when
their location and effect are explicit. A missing or ambiguous applicable item
requires `UPDATE_EXISTING`. An intentional difference requires a reviewed
exception with an owner and equivalent control. Do not silently copy a
playbook default or choose for the project owner.

When a canonical policy exists but is incomplete, update that artifact through
`UPDATE_EXISTING`; do not create a duplicate or parallel project policy. If
several documents compete for the same rule without declared precedence,
record `BLOCKED` until the project owner identifies or consolidates authority.
Policy families may share one file or use several explicitly linked canonical
documents.

| Policy family / routing ID | Required decision or obligation | Applicable? / reason | Existing project evidence | Gap, equivalent control, or exception | Disposition | Reviewer/state |
| --- | --- | --- | --- | --- | --- | --- |
| Development and delivery / `<ID>` | `<boundaries, tasks, lifecycle, readiness, defects, policy gaps>` | `<YES / NO + reason>` | `<section/link or None>` | `<gap / control / exception ID>` | `<REUSE / UPDATE_EXISTING / SKIP / BLOCKED>` | `<review>` |
| Testing and quality / `<ID>` | `<levels, coverage, environments, triage, evidence, exceptions>` | `<YES / NO + reason>` | `<section/link or None>` | `<gap / control / exception ID>` | `<REUSE / UPDATE_EXISTING / SKIP / BLOCKED>` | `<review>` |
| PR and branch / `<ID>` | `<models, targets, naming, reviews/checks, merge, closure, archive>` | `<YES / NO + reason>` | `<section/link or None>` | `<gap / control / exception ID>` | `<REUSE / UPDATE_EXISTING / SKIP / BLOCKED>` | `<review>` |
| Documentation and API contracts / `<ID>` | `<authority, precedence, consumers, compatibility, freshness, validation>` | `<YES / NO + reason>` | `<section/link or None>` | `<gap / control / exception ID>` | `<REUSE / UPDATE_EXISTING / SKIP / BLOCKED>` | `<review>` |
| Security, data, concurrency, and performance / `<ID>` | `<invariants, risks, migrations, races, capacity, observability, enforcement>` | `<YES / NO + reason>` | `<section/link or None>` | `<gap / control / exception ID>` | `<REUSE / UPDATE_EXISTING / SKIP / BLOCKED>` | `<review>` |
| Release, operations, and incident response / `<ID>` | `<environments, rollout, rollback, recovery, escalation, reconciliation>` | `<YES / NO + reason>` | `<section/link or None>` | `<gap / control / exception ID>` | `<REUSE / UPDATE_EXISTING / SKIP / BLOCKED>` | `<review>` |
| Specialized policies / `<ID>` | `<trigger, scope, state, audit, exception, enforcement, remediation, retirement>` | `<YES / NO + reason>` | `<section/link or None>` | `<gap / control / exception ID>` | `<REUSE / UPDATE_EXISTING / SKIP / BLOCKED>` | `<review>` |

For PR and branch policy, include protected target, single-task and multi-task
branch models, the implementation-unit counting rule, naming, allowed source/target
relationships, task and final PR targets, synchronization and closure,
required validation/review, and merge-before-reconciliation-before-archive
ordering. A `REUSE` disposition is invalid until every applicable row has
evidence or a reviewed exception.

### Artifact impact and freshness register

Use only `CURRENT`, `STALE`, or `BLOCKED` for freshness. After every adoption
action, compare changed facts, links, commands, and availability claims with
previously approved artifacts. Affected artifacts become `STALE` even when an
earlier review remains valid historical evidence. Schedule the earliest
dependency-ready stale correction as a separate action. For `EXPLICIT_REVIEW`,
the immediate next action remains review of the current change; do not silently
update the stale artifact during the action that invalidated it. For an
automatic mode, newly stale or unknown impact is an exception that stops the
segment and fails closed to explicit review. Stable entry points reference this
manifest for live adoption status instead of copying temporary progress
statements.

| Artifact / routing ID | Changed fact or action | Affected claim or dependency | Freshness | Required next action / evidence |
| --- | --- | --- | --- | --- |
| `<path / ID>` | `<change>` | `<claim / dependency>` | `<state>` | `<action / link>` |

Final installation verification is blocked while any applicable artifact is
`STALE` or `BLOCKED`.

## 6. Gap, deviation, and YAGNI register

### Gaps

| ID | Observed current behavior | Required behavior | Local/systemic | Action/owner | State/evidence |
| --- | --- | --- | --- | --- | --- |
| `G-01` | `<fact>` | `<need>` | `<class>` | `<action/owner>` | `<state/link>` |

### Playbook deviations

| ID | Playbook recommendation | Project decision | Reason/trade-off | Owner/review |
| --- | --- | --- | --- | --- |
| `D-01` | `<recommendation>` | `<adopt/adapt/reject>` | `<reason>` | `<review>` |

### YAGNI exclusions

| Candidate artifact/control | Why it is not needed now | Reconsideration trigger | Owner |
| --- | --- | --- | --- |
| `<item>` | `<evidence>` | `<event>` | `<role>` |

## 7. Project-local navigation

| Reader need | Canonical project entry/link | Required reading order |
| --- | --- | --- |
| Start contributing | `<link>` | `<ordered links>` |
| Use the solution whiteboard | `<link>` | `<ordered links>` |
| Start implementation | `<link>` | `<plan -> context receipt -> code/tests>` |
| Review a PR | `<link>` | `<PR policy -> contracts -> diff -> evidence>` |
| Operate/respond | `<link>` | `<runbook/incident links>` |
| Continue AI/human handoff | `<link>` | `<live state -> next task -> evidence>` |

Inbound references to this manifest: `<README/CONTRIBUTING/agent or other links>`

## 8. Enforcement and evidence

| Gate | Project command/workflow | Trigger | Blocking/advisory | Owner | Evidence |
| --- | --- | --- | --- | --- | --- |
| Documentation | `<value>` | `<paths/events>` | `<class>` | `<role>` | `<link>` |
| Unit/contract | `<value>` | `<change class>` | `<class>` | `<role>` | `<link>` |
| Integration/E2E | `<value>` | `<change class>` | `<class>` | `<role>` | `<link>` |
| Performance/accuracy | `<value>` | `<risk/change class>` | `<class>` | `<role>` | `<link>` |
| PR/review | `<value>` | `<change class>` | `<class>` | `<role>` | `<link>` |

Failure-triage authority: `<link>`

Shared workflow/dependency provenance and immutable revision: `<value or None>`

### 8.1 Adoption action control

Initial discovery, authority mapping, policy creation/update, exceptions, state
activation, and adoption approval require `EXPLICIT_REVIEW`. Only deterministic
mechanics pre-authorized by reviewed project policy may use `AUTO_CONTINUE` or
`REVIEW_ON_EXCEPTION`.

Every adoption review gate requires exact-candidate self-review followed by a
stable session with reviewer(s) initialized without author context and then
mandatory human review. Preserve requested changes, author dispositions, and
resolutions as immutable findings. A candidate change starts a new round with
the same assigned reviewer(s); automatic action modes do not replace either
review.

| Action ID | Target/output | Review mode | Mode authority | Required gates | Automation boundary | Semantic decision? | State |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `<ID>` | `<path/action>` | `<EXPLICIT_REVIEW/AUTO_CONTINUE/REVIEW_ON_EXCEPTION>` | `<link>` | `<checks>` | `<last action ID/Not applicable>` | `<NO/YES>` | `<PLANNED/ACTIVE/COMPLETE/STOPPED>` |

### 8.2 Automation audit ledger

| Action ID | Input/output revision | Mode | Authority | Gates/result | Impact/exceptions | Resulting state | Next action |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `<ID>` | `<versions>` | `<AUTO_CONTINUE/REVIEW_ON_EXCEPTION>` | `<link>` | `<evidence / PASS>` | `<CONTROL_ONLY / None>` | `<state>` | `<action or explicit checkpoint>` |

`AUTO_CONTINUED` is not an approval or review state. Automatic adoption work
fails closed on a failed/missing gate, ambiguity, unknown/material semantic
impact, exception, drift, blocker, stale dependency, unrelated change, or scope
expansion.

## 9. Pilot delivery

| Field | Value |
| --- | --- |
| Need/issue | `<link>` |
| Why representative and bounded | `<reason>` |
| Delivery route | `<route>` |
| Whiteboard/handoff/workflow | `<links and versions>` |
| Plan/context receipts | `<links and versions>` |
| PR/review | `<link and disposition>` |
| Test/evidence record | `<link; do not claim unrun evidence>` |
| Retrospective | `<link>` |
| Pilot result | `NOT_STARTED` |

Historical replay provenance: `<Not applicable, or before/after commits and
which reasoning is reconstructed>`

## 10. Adoption review

### Attention map

| Focus | Items and canonical links | Required reviewer | Disposition |
| --- | --- | --- | --- |
| Authority/conflicts | `<IDs/links>` | `<reviewer>` | `<state>` |
| Generated/updated contracts | `<IDs/links>` | `<reviewer>` | `<state>` |
| Enforcement and evidence | `<IDs/links>` | `<reviewer>` | `<state>` |
| Pilot and residual risk | `<IDs/links>` | `<reviewer>` | `<state>` |
| Drift/update/rollback | `<IDs/links>` | `<reviewer>` | `<state>` |

### Review rounds

Every adoption review round requires a completed
[agent self-review](../reviews/agent-self-review.md) against the exact candidate
revision. A later candidate change invalidates the result and requires another
self-review. `SELF_REVIEW_PASSED` is evidence only; it cannot approve adoption,
satisfy reviewer independence, authorize merge, or authorize continuation.

| Session | Round | Self-review evidence | Assigned reviewer/type | Scope | Disposition | Findings/author responses | Version/date |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `<ID>` | `1` | `<SELF_REVIEW_PASSED record + candidate revision>` | `<identity/type>` | `<items>` | `IN_REVIEW` | `<links or None>` | `<value>` |

### Installation checklist

- [ ] Source and target revisions are pinned.
- [ ] Repository inventory and authority mapping are verified.
- [ ] Every applicable capability has an approved routing decision.
- [ ] Gaps, deviations, exclusions, and conflicts have dispositions.
- [ ] Project-local navigation exposes canonical contracts without duplication.
- [ ] Required project gates pass with linked evidence.
- [ ] Prompt C can create the empty solution whiteboard using only
      repository-visible context and without an inferred need.
- [ ] Authorized project reviewers approve `MAPPED -> INSTALLED`.

### Activation checklist

- [ ] A real adoption has real pilot evidence; an external case labels its
      historical replay and reconstructed reasoning.
- [ ] Rollback, update owner, and next review trigger are recorded.
- [ ] Authorized project reviewers approve activation.

Final disposition: `<APPROVED / CHANGES_REQUESTED / BLOCKED / EXAMPLE_REVIEWED>`

Activation authority: `<project approval link, or Not applicable for an
external-project case study>`

## 11. Rollback, updates, and drift

Last approved project authorities to preserve: `<links/versions>`

Rollback/correction procedure: `<branch/PR/state/evidence steps>`

Update owner and cadence/triggers: `<value>`

Start an in-flight update only through `./install-sdd.sh --upgrade` at a
between-task boundary. Use `NONE`, `ASSESSING`, `APPROVED`, `APPLYING`,
`VALIDATING`, `COMPLETE`, or `BLOCKED` for `Upgrade state`. The candidate does
not replace `Playbook revision` until the reviewed migration passes validation
and reaches final cutover. Link the project-owned upgrade assessment while an
update is open; do not copy its volatile details into this manifest.

| Playbook revision | Assessment | Accepted/adapted/rejected items | Project PR | Result/date |
| --- | --- | --- | --- | --- |
| `<revision>` | `<link>` | `<IDs>` | `<link>` | `<state/date>` |

## 12. Current handoff

| Field | Value |
| --- | --- |
| Current adoption state | `DISCOVERY` |
| Current artifact/action | `<value>` |
| Next dependency-ready action | `<one action>` |
| Blocker/unblock condition | `None` |
| Evidence completed | `<links or None>` |
| Evidence still required | `<items>` |
| Decisions since last review | `<IDs or None>` |
| Files/changes to preserve | `<value or None>` |
