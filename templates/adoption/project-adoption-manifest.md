# Project Adoption Manifest — `<project>`

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
| Current blocker | `None` |
| Next action | `<one concrete action>` |

Set `State before block` to the current non-blocked adoption state before
entering `BLOCKED`; reset it to `None` after returning to a safe active state.
The installer uses this field only to retain the correct adoption or workflow
skill while blocked.

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

For PR and branch policy, include protected target, default branch model,
optional epic-model decision and criteria, naming, allowed source/target
relationships, task and final PR targets, synchronization and closure,
required validation/review, and merge-before-reconciliation-before-archive
ordering. A `REUSE` disposition is invalid until every applicable row has
evidence or a reviewed exception.

### Artifact impact and freshness register

Use only `CURRENT`, `STALE`, or `BLOCKED` for freshness. After every adoption
action, compare changed facts, links, commands, and availability claims with
previously approved artifacts. Affected artifacts become `STALE` even when an
earlier review remains valid historical evidence. Schedule the earliest
dependency-ready stale correction as a separate one-artifact action after the
current change is independently approved. The immediate next action remains
review of the current change; do not silently update the stale artifact during
the action that invalidated it. Stable entry points reference this manifest for
live adoption status instead of copying temporary progress statements.

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

| Round | Reviewer/type | Scope | Disposition | Comments resolved | Version/date |
| --- | --- | --- | --- | --- | --- |
| `1` | `<identity/type>` | `<items>` | `IN_REVIEW` | `<links or None>` | `<value>` |

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
