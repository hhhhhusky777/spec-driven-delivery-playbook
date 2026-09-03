# Pull Request and Branch Policy Template

Use this template to create a project-specific policy for branches, pull
requests, review, merge, and post-merge responsibility. Replace every
`<placeholder>`, apply the task-count routing rule, and write
`Not applicable — <reason>` instead of deleting a required section. Remove this
introduction from the instantiated policy.

## 1. Document control

| Field | Value |
| --- | --- |
| Policy | `<project PR and branch policy>` |
| Status | `DRAFT` |
| Version | `<version>` |
| Owner | `<role/team>` |
| Approvers | `<roles>` |
| Review state | `NOT_STARTED` |
| Effective date | `<date or Not active>` |
| Last reviewed | `<date>` |
| Next review | `<date/event>` |
| Development policy | `<link>` |
| Test strategy | `<link>` |

Status lifecycle: `DRAFT -> PROPOSED -> ACTIVE -> SUPERSEDED / RETIRED`.
Only `ACTIVE` versions govern pull requests.

### 1.1 Artifact review gate

Submit each draft or update for human or independent-agent review. The author
or generating runner must not self-approve unless a documented project rule
allows a low-risk exception. Resolve `CHANGES_REQUESTED` and repeat review
before activating the policy.

| Round | Reviewer | Type | Result | Comments/link | Resolved version |
| --- | --- | --- | --- | --- | --- |
| `1` | `<identity>` | `<human/independent agent>` | `<APPROVED/CHANGES_REQUESTED>` | `<value>` | `<version>` |

## 2. Project profile

| Policy value | Project choice | Reason / replacement guidance |
| --- | --- | --- |
| Protected integration branch | `<main>` | `<rule>` |
| Single-task branch model | `<protected -> task -> protected>` | `<rule>` |
| Multi-task branch model | `<protected -> feature -> tasks -> feature -> protected>` | `<rule>` |
| Feature-branch synchronization | `<cadence or trigger>` | `<how drift is controlled>` |
| Branch naming | `<format>` | `<examples>` |
| Default merge method | `<squash/rebase/merge>` | `<reason>` |
| Required reviewers | `<roles/count/CODEOWNERS>` | `<risk rules>` |
| Required checks | `<CI/gates>` | `<authority>` |
| Deployment maturity | `<development/released>` | `<compatibility effect>` |
| Increment boundary | `<smallest self-contained mergeable change>` | `<development policy>` |
| Issue linkage | `<required threshold>` | `<tracker>` |

Every applicable choice above must be explicit in the adopted project policy.
Omission does not mean that a branch model or control is selected. During
adoption, record decision-level conformance evidence;
route a missing or ambiguous choice to `UPDATE_EXISTING`, and record an
intentional alternative as a reviewed exception with its equivalent control.

## 3. Core principles

- A PR is one coherent, independently reviewable change—not storage for
  unrelated work.
- Every merge keeps its integration target buildable, testable, and internally
  consistent.
- Related behavior, tests, contracts, migrations, observability, and necessary
  documentation belong in the same delivery increment.
- Evidence demonstrates the change; “should work” is not evidence.
- Diagnose test failures before modifying product code, configuration, or
  tests.
- Preserve unrelated/user-owned changes and exclude secrets, local artifacts,
  and generated noise.
- Prefer reversible or safely forward-fixable changes.
- Record exceptions, residual risk, and incomplete gates explicitly.

## 4. Branch models

### Single-task delivery

```text
protected integration branch -> task branch -> reviewed task PR -> protected branch
```

Rules:

- Use this route only when the approved delivery contains one implementation
  and merge unit. Discovery, planning, final-validation, and archive-only ledger
  rows do not increase that count.
- The task must be self-contained and must not depend on unmerged follow-up work.
- Start from a sufficiently current protected branch.
- Keep the branch short-lived and scoped to one change.
- Refresh deliberately when upstream changes affect review or validation.
- Delete/close it after merge according to retention policy.

### Multi-task feature integration

```text
protected branch -> feature integration branch
feature integration branch -> task branches -> reviewed task PRs -> feature integration branch
feature integration branch -> final validated reviewed PR -> protected branch
```

Every approved delivery with two or more implementation and merge units uses
this route. Give each concurrently active delivery its own feature integration
branch so unfinished work cannot enter the protected branch or another
delivery's integration target. Require:

- an owner and delivery identifier;
- bounded lifetime and closure condition;
- green/buildable feature branch after every task merge;
- every task branch starts from the current feature integration branch;
- every task PR targets the feature integration branch and must not target the
  protected branch;
- regular synchronization from the protected branch;
- dependency-ordered task PRs;
- no direct unreviewed feature implementation;
- complete feature-level regression and applicable integration/end-to-end
  validation; and
- an explicit final feature-to-protected-branch review.

After the final merge, reconcile the protected-branch state before archiving
the delivery and close branches according to the retention policy. Do not use
the feature branch to hide broken intermediate work or postpone integration
conflicts.

If an approved single-task delivery splits into multiple implementation and
merge units before its protected-branch PR merges, pause for routing review,
designate a feature integration branch, and retarget all unmerged task work to
it.

### Release/hotfix branches

`<Define only if the project releases from maintained branches. State merge-back
or forward-port rules so fixes cannot disappear from future releases.>`

## 5. Starting and scoping work

Before editing:

1. Identify the governing issue/requirement/whiteboard/implementation plan.
2. Confirm the approved task and integration target.
3. Synchronize the base and record required dependency ancestry.
4. Inspect the worktree and attribute existing modifications.
5. Freeze allowed product boundaries, non-scope, self-contained merge
   condition, contracts, and tests.
6. Confirm required specialized policies and unresolved policy gaps.
7. Create the branch using the project naming rule.

Scope changes require an implementation-plan/task update before unrelated or
materially expanded work enters the PR.

## 6. Commit policy

- Each commit is coherent and buildable when practical.
- Use an imperative summary describing the outcome.
- Add a body when reason, risk, migration, compatibility, or operations are not
  obvious.
- Keep mechanical/refactoring changes separate from behavior when this improves
  reviewability.
- Do not separate tightly coupled tests merely to increase commit count.
- Inspect and selectively stage the complete intended diff.
- Do not rewrite shared history without coordination.
- Never force-push a protected branch.

Commit-signing or conventional-commit requirements: `<rules or Not applicable>`.

## 7. Definition of Ready for review

A PR may be marked ready only when:

- [ ] Outcome, scope, contracts, and acceptance criteria are clear.
- [ ] Implementation and required tests/documentation/migrations/operations are
      complete for this increment.
- [ ] The full diff contains no unrelated changes, secrets, temporary output,
      debugging artifacts, or unexplained generated files.
- [ ] Required focused, coverage, regression, smoke, E2E, performance, security,
      migration, and documentation gates have run under the test strategy.
- [ ] Every encountered failure has an evidence-backed justification before
      remediation.
- [ ] Compatibility, data, security, privacy, concurrency, performance,
      deployment, rollback/forward-fix, and operational risks are addressed.
- [ ] Branch/base/dependency ancestry is sufficiently current.
- [ ] Source branch and PR target match the approved single-task or multi-task
      route.
- [ ] Implementation-plan state and evidence are updated.

Draft PRs may be opened earlier for collaboration but must not imply readiness
or passed gates.

## 8. Required PR description

Use every section. Write `Not applicable — <reason>` rather than omitting one.

### Summary/outcome

`<Plain-language user/system result.>`

### Problem and expected behavior

`<Observed problem, governing requirement/contract, expected result, and worst
case if unchanged.>`

### Scope and non-scope

- Included: `<boundaries>`
- Excluded/deferred: `<boundaries and references>`

### Design and implementation

- System contracts implemented: `<IDs/links>`
- Integration model: `<single-task direct / multi-task feature integration>`
- Source branch and PR target: `<source -> target>`
- Delivery feature branch: `<branch or Not applicable>`
- Key decisions and trade-offs: `<summary/ADR links>`
- Files/components and responsibilities: `<summary>`
- Actual change summary and generated/mechanical changes: `<values>`
- YAGNI audit result: `<kept/deferred/removed>`

### Data, security, concurrency, and compatibility

- Schema/migration/data retention: `<effect>`
- Authorization/privacy/secrets: `<effect>`
- Locks/races/idempotency/retry: `<effect>`
- API/provider/client compatibility: `<effect>`

### Risk and impact assessment

- Failure/worst-case scenarios: `<risks>`
- Performance/capacity/operations: `<effect>`
- Residual risk: `<risk and owner>`

### Verification evidence

| Gate | Command/environment | Result | Artifact/link |
| --- | --- | --- | --- |
| `<focused/coverage/regression/etc.>` | `<value>` | `<pass/fail/exception>` | `<value>` |

State what was not run and why. A reduced run is not a full-gate pass.

### Failure triage and known limitations

- Failures encountered and classification: `<summary/links>`
- Limitations/deferred defects/policy gaps: `<summary/links>`

### Deployment, migration, rollback, and recovery

- Deployment/order/graceful drain: `<steps>`
- Rollback or forward-fix: `<strategy>`
- Monitoring/verification: `<signals>`

### Review guide

- Recommended reading order: `<files/commits>`
- Highest-risk decisions: `<items>`
- Reviewer questions: `<items/None>`

### Checklist and next gate

- [ ] Task Definition of Done satisfied.
- [ ] The canonical test strategy's Red closure boundary is satisfied; no
      required test intentionally remains failing for a later PR to repair.
- [ ] Required reviewers/checks complete.
- [ ] Plan/task/evidence updated.
- Next task or closure gate: `<ID/action>`.

## 9. Review policy

Reviewers evaluate:

- requirement and contract correctness;
- overall design and ownership boundaries;
- simplicity/YAGNI and evolvability;
- tests and failure evidence;
- data/security/privacy/concurrency/billing risks;
- API/schema/provider compatibility;
- performance, scalability, observability, and operations;
- migration/deployment/recovery; and
- readability and maintainability.

Define approval rules by risk:

| Change risk/domain | Required reviewer/owner | Additional gate |
| --- | --- | --- |
| `<domain>` | `<role>` | `<gate>` |

Authors respond to comments with a change, evidence-backed explanation, or a
recorded follow-up accepted by the reviewer. Do not resolve substantive comments
without addressing them.

## 10. Merge policy

Before merge:

- required approvals and checks are current;
- unresolved blocking comments are closed;
- branch protection and dependency order are satisfied;
- the PR source and target match the approved integration model;
- a multi-task task PR targets the feature integration branch, while its final
  feature PR targets the protected branch only after all delivery tasks and
  feature-level validation complete;
- required evidence matches the final commit;
- the implementation plan identifies the correct next state/task;
- deployment and migration prerequisites are ready; and
- no secret or sensitive artifact entered history.

Define stale-approval, merge-queue, auto-merge, administrator bypass, and
required up-to-date-branch rules: `<rules>`.

## 11. Post-merge responsibilities

- Verify merge ancestry and protected-branch checks.
- Update task/plan/delivery evidence.
- Execute required post-merge deployment or smoke verification.
- Monitor defined signals and respond to regressions.
- Delete or retain branches according to policy.
- Create/close follow-up issues and exceptions.
- Advance only the next dependency-ready task.

## 12. Emergency changes

Define eligible emergencies, authorization, minimal gates, deployment safety,
rollback, retrospective, and time-bounded follow-up. Emergency status may reduce
latency but must not erase review, evidence, security, or durable follow-up.

## 13. Exceptions

Each exception records:

- exact rule and scope;
- reason/evidence;
- risk/worst case;
- owner/approver;
- compensating control;
- expiry/follow-up; and
- merge/release effect.

Never represent an excepted or missing gate as passed.

## 14. Maintenance and retrospective

Review after `<cadence/repeated review failure/incident/branch conflict/release
change>`. Consider PR size, review latency, escaped defects, merge debt, stale
branches, exception frequency, and evidence quality. Change this policy through
a reviewed documentation PR and update dependent templates/automation.

## 15. Project instantiation checklist

- [ ] Define the single-task and multi-task branch models and the implementation-unit counting rule.
- [ ] Define protected branches, naming, merge method, reviewers, and checks.
- [ ] Link development and test policies.
- [ ] Define issue/task/plan integration.
- [ ] Define required PR sections and risk reviewers.
- [ ] Define merge, emergency, exception, and post-merge behavior.
- [ ] Assign owner and review cadence.

## 16. Change history

| Version/date | Status | Change | Reason/evidence | Approved by | Affected automation/templates |
| --- | --- | --- | --- | --- | --- |
| `<value>` | `<state>` | `<change>` | `<reason>` | `<owner>` | `<scope>` |
