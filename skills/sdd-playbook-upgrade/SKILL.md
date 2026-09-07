---
name: sdd-playbook-upgrade
description: Synchronize an installed project's reusable SDD documents with the latest immutable playbook revision while preserving project authority and avoiding project-local playbook tooling.
---

# SDD Playbook Upgrade

## Required outcome

The installed project uses one immutable latest playbook revision. Its reusable
SDD documents are mutually consistent with that revision and with the owner's
project policies. Git history, not live compatibility branches, preserves older
playbook behavior.

Apply the five goals in
`docs/documentation-quality-policy.md#five-goals-and-agent-judgment`:
clear boundaries, stable outcomes, key information only, proportional effort,
and agent discretion.

## Boundaries

- Keep the current pin authoritative until the synchronized candidate is
  reviewed and accepted.
- Preserve project-specific policies and owner decisions unless the owner
  explicitly changes them.
- Synchronize reusable SDD documents only. Do not add project-local lifecycle
  validators, evidence helpers, publication tools, CI workflows, or playbook
  test suites.
- Do not alter active feature work or unrelated project content.
- Before reading candidate guidance or changing project files, require
  `./install-sdd.sh --validate` to report `UPGRADE_CURRENT`. Any checkout,
  repository, revision, guide hash, ownership marker, manifest pin, or managed
  skill mismatch blocks synchronization.
- Do not claim compatibility when canonical sources conflict, required project
  authority is missing, or applicable validation fails.
- Require human review for a policy change, unresolved canonical conflict,
  destructive action, or final acceptance of the synchronized result.

When a task is `IN_PROGRESS` or `VERIFYING`, the project is not at a safe
synchronization boundary. The current revision remains authoritative until the immutable
candidate revision, resolved from latest, passes fresh-context review, human
review, validation, and cutover.

## Agent discretion

The agent chooses the comparison method, edit order, batching, checks, and safe
recovery. Prefer the smallest coherent change that achieves the required
outcome. The generated guide supplies provenance, not a prescribed workflow.

Only evidence needed to judge the result belongs in the project: the old and
new immutable revisions, reusable files changed, preserved owner decisions,
material inconsistencies resolved, applicable checks, and review result.

## Validation outcome

Completion means the manifest records the accepted latest revision, reusable
documents agree on terminology, authority, links, states, and continuation
rules, the regenerated runtime validates, and no affected reusable document is
known to be inconsistent. Project application tests are required only when the
project's application code changed.

## Exception routing

Use
`docs/batch-review-and-recovery.md#recovery-without-restarting-everything` and
`docs/batch-review-and-recovery.md#exception-triage-and-upstream-reporting` as
the canonical error-handling framework. Correct agent mistakes within scope;
track a genuine playbook or project gap in its owning repository; ask the owner
only when the remaining mismatch changes authority, safety, policy, or intended
behavior.
Use `templates/reviews/exception-triage.md` when a durable exception record is
needed. Restore the current pin on a rejected candidate or failed cutover.

Independent review follows
`templates/reviews/fresh-context-agent-review.md`; self-review follows
`templates/reviews/agent-self-review.md`. These are evidence, not human
acceptance; agent review is not human upgrade authority.
