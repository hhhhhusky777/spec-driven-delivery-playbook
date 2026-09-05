# Contributing

Changes are welcome when they make the workflow clearer, safer, more
evidence-driven, or less burdensome without weakening necessary controls.

## Start or resume repository delivery

Read the [project adoption manifest](.github/spec-driven-delivery/project-adoption-manifest.md)
for the current state, approved routing, open decisions, and next action.
Follow the [repository setup and resume instructions](README.md#use-this-playbook-for-this-repository)
and the installer-generated `.sdd-runtime/agent-guide.md`.

The manifest records which project-local artifacts are available and approved.
Use its next action to continue adoption; begin a new need only after the
manifest and empty whiteboard have passed their required reviews, following
the [recurring delivery procedure](README.md#deliver-future-needs).
The contributor, quality, and template authorities linked below continue to
govern changes.

## Project delivery policy

The additions in this section and the project quality-policy supplement are
proposed in the [installation batch](.github/spec-driven-delivery/installation-batch.md).
They take effect only after its exact candidate receives final owner acceptance
and is merged through the reviewed PR process.
Existing approved rules continue to govern meanwhile.

| Review focus | Canonical source | Owner |
| --- | --- | --- |
| State, batch approval, and open decisions | [Adoption manifest](.github/spec-driven-delivery/project-adoption-manifest.md) | Repository owner |
| Delivery, branches, and merge authority | This section | Repository owner |
| Tooling evidence and exceptions | [Quality policy](docs/documentation-quality-policy.md#11-project-tooling-test-strategy) | Maintainer and test reviewer |
| Artifact paths and runtime | [Contract registry](.github/spec-driven-delivery/project-contracts.md) | Maintainer |

### Development scope and readiness

This project ships reusable Markdown contracts, a Bash installer, Node checkers,
tests, and CI. Apply Template Governance's existing change categories. Pure
editorial work uses compact discovery/handoff and documentation evidence;
tooling behavior, cross-template state changes, compatibility changes, and
security-sensitive work require a complete implementation plan and focused
behavior/failure tests. Mixed changes follow their highest applicable risk.
No product database, billing service, or public application API is in scope.

Use the [delivery procedure](README.md#deliver-future-needs) and the registry's
pinned source templates. Each need has one whiteboard, reviewed handoff, and
delivery workflow; generate only selected artifacts. Template Governance owns
change categories and compatibility rules; link those rules instead of copying
them into each plan. The approved plan owns new observable behavior.

One agent may have one task IN_PROGRESS at a time. Parallel agents use separate
task branches/worktrees and non-overlapping write scopes. Sequence data and
contract dependencies before consumers. Each merge unit must be self-contained
and green; a future task cannot repair an intentionally failing required test.

The pinned implementation-plan template owns task states and specification
fields. Before READY, record observable outcomes, prohibited behavior,
contracts, scope, dependencies, acceptance tests, risks, and source revisions.
Before IN_PROGRESS for tooling, CI, or delivery-behavior changes, complete its
context receipt and required review. Editorial-only work records receipt
NOT_APPLICABLE with a reason. Internal contract-equivalent engineering choices
remain with the implementer. DONE requires implementation, checks, review,
and durable evidence. A blocked task records its prior state, owner, evidence,
and unblock condition; parent validation waits for all tasks to be terminal.

Use the existing [YAGNI and policy-gap routes](README.md#progressive-policy-discovery).
An observed systemic gap stops affected work for policy review. Local fixes
remain local; do not create speculative policies. Preserve decisions, rejected
alternatives, dependencies, and freshness in the delivery workflow. A changed
prerequisite invalidates affected reviews and blocks dependent implementation
until reconciled. Reassess policy after defects, incidents, or quarterly review.

### Review and continuation authority

Use exact-candidate self-review and exactly two isolated read-only reviewers
under the [review protocol](templates/reviews/fresh-context-agent-review.md).
Retain reviewer seats across revisions and preserve exact receipts/findings in
the delivery review ledger. Human decisions belong to the repository owner;
agent receipts are not formal approvals by a different GitHub identity.

Default implementation mode is HUMAN_REVIEW_BEFORE_MERGE. Both modes are
permitted, but AGENT_AUTO_MERGE requires the owner's explicit selection after
design approval, recorded in the live workflow with repository URL, stable
target IDs, timestamp, and authority. Recheck before editing, PR opening, and
merge. Missing authority, scope drift, failed checks, conflicts, unresolved
comments, or repository refusal stops auto-merge. Record merged SHA and pending
post-merge human review; do not close/archive until that review is resolved.
This mode never approves design, policy, validation, or activation.

The current installation batch has separate recorded owner preparation
authority. Its provisional documents may be drafted together, reviewed as one
exact package, and revised by the same reviewers. They remain provisional
until one final owner acceptance. This is not standing permission to batch
future semantic gates: future batches require an explicit scope and authority.
Routine deterministic state/evidence synchronization may continue within an
approved action's exact scope, with input/output hashes and gate evidence;
new semantic decisions end that automatic segment.

### Branches and pull requests

The canonical repository is `hhhhhusky777/spec-driven-delivery-playbook`;
integration target is main. Use `codex/task-ID-short-name` for one implementation
unit. For two or more implementation/merge units, use an owned
`codex/feature-ID-short-name` integration branch and task branches from it.
Task PRs target that feature branch; only the final validated feature PR targets
main. Discovery/validation/archive rows do not count as implementation units.
If a single unit splits, review routing and retarget before merging.

Synchronize before starting each dependent task and before final integration;
recheck changed upstream contracts and tests. Do not rewrite shared history.
Squash merge through a PR with the current documentation checks, two agent
approvals, and owner approval unless an explicitly scoped implementation mode
permits otherwise. Require the PR to be current with its target and green.
No admin bypass, force-push to main, or direct unreviewed implementation.
Merge queue is not required; queued changes must retain current checks.

Use the PR template for scope, evidence, risk, review identity, source/target,
and mode. Link a durable issue for unresolved defects, cross-task work,
exceptions, or deferred scope; a compact reviewed whiteboard suffices for
trivial work. Imperative commit summaries are required; no additional signing
or conventional-commit convention is imposed. CODEOWNERS is deferred while
the repository owner supplies human approval; revisit when ownership expands.

After merge, verify target ancestry/checks, reconcile the workflow, then archive.
Delete only merged task/feature branches after evidence and owner approval;
retain unmerged abandoned branches until scope and preservation are decided.
Do not delete unrelated branches as cleanup.

GitHub inspection on 2026-09-05 found main unprotected and all merge methods
enabled. These policy requirements are manual gates until hosting controls
are configured; never claim server enforcement. See the installation batch's
hosted-settings evidence and final acceptance decision.

### Releases, recovery, and ownership

The repository owner authorizes releases, hotfixes, and emergency exceptions.
Use Git history and changelog; no maintained release branch is currently needed.
For a release, review compatibility/migration notes, run all checks, identify
the exact commit, and obtain owner approval before publishing a tag or release.
Rollback uses a reviewed revert or forward fix preserving history and reruns
affected checks. Security exposure, broken installation, or broken CI can
justify an urgent fix; record owner authorization, minimum checks, rollback,
and a follow-up issue before closure. Complete deferred evidence and incident
review within two working days or request a dated owner-approved extension.

No extra external obligations were reported by the owner; existing repository
security restrictions and license text still apply. New dependencies need the
quality policy's provenance/license review. Recheck obligations when publishing
new material or integrating third-party content. Exceptions record scope,
risk, compensating evidence, owner, expiry, and follow-up; they are not passes.

## Before changing a template

- Describe the observed ambiguity, repeated failure, missing risk, or excessive
  process cost.
- Confirm that the need is reusable rather than project-specific.
- Identify the one canonical template that owns the rule.
- Check [Template Governance](docs/template-governance.md).
- Check the
  [Documentation Quality and Testing Policy](docs/documentation-quality-policy.md).
- Preserve accepted decision and example history.

## Pull request expectations

Include:

1. Problem and expected improvement
2. Affected templates/workflow routes
3. Alternatives and YAGNI assessment
4. Compatibility/migration impact for existing users
5. Updated example or explanation why none is affected
6. Markdown, link, diagram, and placeholder validation
7. External primary sources when methodology claims change

Do not add credentials, private customer/project data, raw chat transcripts, or
fabricated delivery evidence.

## Repository scope

Appropriate:

- Reusable development, testing, review, discovery, decision, and delivery
  templates
- Workflow routing and state/gate definitions
- Worked examples with honest evidence states
- Template adoption and migration guidance

Project-specific policies should live in their project repository. They may be
included here only as clearly labeled, sanitized examples with permission.

This repository's own delivery policy and adoption root are its owner-authorized
self-adoption, not an unrelated external project's policy or example.

## Validation

Install the exact locked dependencies and run every blocking check and its
negative regression suite:

```bash
npm ci --ignore-scripts
npm run docs:all
```

Review external links separately. Remote failures are advisory but must be
classified when they affect a changed claim:

```bash
npm run docs:links:external
```

Automated checks do not replace semantic review. Complete
[the policy checklist](docs/documentation-quality-policy.md#9-review-checklist),
inspect the complete diff, and record the governing source, reviewer, material
comments, and resolution in the pull request. Examples must use only intentional
example values, and template responsibilities must not conflict.
