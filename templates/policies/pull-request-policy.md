# Pull Request and Branch Policy Template

## Optional batched route

For the adopted batch route, open the complete candidate PR before its full
two-agent review. Existing-account comments must label agent seats and exact
heads; textual dispositions are not formal GitHub approvals. Keep all required
human approval, checks, protection and feature-branch rules.

See [Batched review and recovery](../../docs/batch-review-and-recovery.md) for authority, evidence and recovery
requirements. This route takes effect only through reviewed project adoption.

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

Apply [self-review](../reviews/agent-self-review.md) and the
[canonical review protocol](../reviews/fresh-context-agent-review.md) before
human acceptance of this document. Activation requires the designated owner;
record that decision below rather than treating agent review as approval.

| Round | Candidate | Self-review | Fresh-context review | Durable findings/resolution | Human review | Result |
| --- | --- | --- | --- | --- | --- | --- |
| `1` | `<exact revision>` | `<record>` | `<receipt>` | `<links/None>` | `<identity + evidence>` | `<APPROVED/CHANGES_REQUESTED>` |

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
| Permitted implementation continuation modes | `<HUMAN_REVIEW_BEFORE_MERGE only / both modes>` | `<risk and repository-protection rule>` |
| Fresh-context agent review method | `<runtime/tool and receipt location>` | `<isolation and formal-identity boundary>` |
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

### Version 5 evidence and reset boundary

The feature PR owns `sdd-pr-review/v1`, the later owner-bound
`sdd-pr-acceptance/v1`, and post-merge `sdd-target-receipt/v1`. Each object names
the exact candidate or merge identity and links fetched evidence with SHA-256
body digests. The owner acceptance identifies the exact merge and reset scope;
it does not approve unseen bytes.

After target verification, create a reset PR containing only the accepted exact
`REMOVE`/`RESET`/`KEEP` inventory, neutral whiteboard bytes, fixed-size manifest
locator, and any separately reviewed pin change. The live GitHub-aware evidence
check is required before reset publication. Missing evidence, changed bodies,
unknown ownership, an unlisted target, or an unexpected delta preserves working
state and requires correction or explicit review. Existing v2–v4 projects keep
their adopted archive contract until a reviewed upgrade.

### Single-task delivery

```text
protected integration branch -> task branch -> reviewed task PR -> protected branch
```

Rules:

- Use this route only when the approved delivery contains one implementation
  and merge unit. Discovery, planning, final-validation, and reset/archive-only ledger
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

After the final merge, reconcile the protected-branch state before the installed
schema's archive/reset and close branches according to the retention policy. Do not use
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

Before requesting review, the implementing agent adds author annotations to
material or non-obvious PR hunks and completes the canonical agent self-review
against the exact PR head. A subsequent commit invalidates the result and
requires annotation reconciliation and a new self-review. Author annotations
are navigation and rationale, not reviewer comments or approval.

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

### Contract-to-change map and author annotations

| Material change / annotation | Governing statement | Why / expected effect | Evidence | Risk / non-scope |
| --- | --- | --- | --- | --- |
| `<file/hunk/comment link>` | `<requirement/task/contract ID>` | `<reason>` | `<test/check>` | `<value>` |

Annotate material and non-obvious hunks in the PR. Do not create repetitive
comments for routine imports, formatting, generated mechanics, or changes
already obvious from the diff.

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

### Agent self-review evidence

- Exact reviewed PR head: `<commit>`
- Governing inputs and versions: `<links>`
- Self-review record: `<link or embedded record>`
- Findings and resolutions: `<summary>`
- Result: `<SELF_REVIEW_PASSED / SELF_REVIEW_FAILED>`

`SELF_REVIEW_PASSED` is required before requesting review, but it is not an
approval and does not authorize merge or continuation.

### Checklist and next gate

- [ ] Task Definition of Done satisfied.
- [ ] The canonical test strategy's Red closure boundary is satisfied; no
      required test intentionally remains failing for a later PR to repair.
- [ ] Required reviewers/checks complete.
- [ ] Agent self-review passed against the exact current PR head.
- [ ] Plan/task/evidence updated.
- Next task or closure gate: `<ID/action>`.

## 9. Review policy

Use the [workflow mode contract](../workflows/sdd-delivery-workflow.md#13-implementation-continuation-mode)
and its [implementation ledger](../workflows/sdd-delivery-workflow.md#94-implementation-pr-and-post-merge-review-ledger)
for HUMAN_REVIEW_BEFORE_MERGE and AGENT_AUTO_MERGE. This policy's project profile
owns permitted modes and stricter repository approvals. The complete PR exists
before implementation review; draft timing follows §7.

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

Apply the [canonical review protocol](../reviews/fresh-context-agent-review.md)
to the exact PR candidate. It owns isolation, both retained seats, author
responses, immutable findings and re-review; do not duplicate its record here.

Authorized review publication: `<workflow evidence / same-account PR comments /
separately authorized review identity>`. Same-account comments cannot satisfy
branch protection requiring a different actor. Hosted approvals remain binding.

## 10. Merge policy

Before merge:

- required checks and exact-head fresh-context approval are current; per-PR
  human approval is current in `HUMAN_REVIEW_BEFORE_MERGE`, while
  `AGENT_AUTO_MERGE` requires recorded user authority and remains subject to
  every repository-enforced approval;
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

In `AGENT_AUTO_MERGE`, stop instead of merging on a failed/missing check,
conflict, unresolved comment or change request, stale input, unexpected diff,
ambiguity, inconsistency, new semantic decision, scope expansion, mode change,
or repository refusal. Never use administrator bypass or weaken protections.
After merging, record the PR head, merge commit, mode authority, self-review,
fresh-context review, checks, and `PENDING` post-merge human review before
continuing.

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
- Complete post-merge human review for every automatically merged PR. Record
  `ACCEPTED` or `FOLLOW_UP_REQUIRED`; block affected work on a finding, and do
  not complete or reset/archive the delivery until review or follow-up closes.

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
- [ ] Define the mandatory fresh-context review runtime, context-isolation
      evidence, publication channel, durable findings, and formal identity
      boundary.
- [ ] Define merge, emergency, exception, and post-merge behavior.
- [ ] Assign owner and review cadence.

## 16. Change history

| Version/date | Status | Change | Reason/evidence | Approved by | Affected automation/templates |
| --- | --- | --- | --- | --- | --- |
| `<value>` | `<state>` | `<change>` | `<reason>` | `<owner>` | `<scope>` |
