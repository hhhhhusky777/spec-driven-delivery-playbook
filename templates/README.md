# Template Catalog

## Project-level templates

Instantiate once and maintain through review:

- [Development policy](policies/development-policy.md)
- [Test strategy](testing/test-strategy.md)
- [PR and branch policy](policies/pull-request-policy.md)

The development policy is the canonical owner of dependency-first task and
durable-data sequencing. Implementation plans reference the project's active
policy, classify their data changes, and enforce foundation/consumer/migration/
cleanup prerequisites instead of copying the rule into each feature.

Create [specialized policies](policies/specialized-policy.md) progressively when
a systemic policy gap is discovered. When discovery happens during active
implementation, follow the
[mid-delivery policy-gap rerouting workflow](../README.md#mid-delivery-policy-gap-rerouting)
and update the active workflow manifest instead of bypassing its review gates.

## Per-need templates

1. Always begin with a [solution whiteboard](discovery/solution-whiteboard.md).
2. After convergence, generate and approve the
   [whiteboard-to-workflow handoff](handoffs/whiteboard-to-workflow.md).
3. Approval may trigger routing automatically or a human/agent may invoke it
   for the case. Instantiate the
   [SDD delivery workflow](workflows/sdd-delivery-workflow.md).
4. Review its manifest, then follow it to generate, reuse, update, skip, defer,
   or block:
   - [implementation plan](delivery/implementation-plan.md);
   - [architecture decision record](decisions/architecture-decision-record.md);
   - specialized policy and audit; and
   - project-owned API, runbook, performance, security, or other artifacts.

Do not copy every template for every feature. The workflow manifest records why
each artifact is or is not required.

## Review rule

Generate or update one selected artifact, then move it through
`IN_REVIEW -> CHANGES_REQUESTED -> IN_REVIEW` until it is `APPROVED`. Do not
generate a dependent artifact from an unapproved draft. The author or
generating runner must not self-approve unless an active project policy grants
a documented low-risk exception. A reviewer may be a human or an independent
review agent; high-risk or externally accountable decisions require a human
when project policy says so.

## Instantiation rules

- Copy the template; do not edit the reusable source for one project.
- Replace every applicable placeholder.
- Remove instructional text.
- Use canonical project links and owners.
- Keep rejected discovery in the whiteboard, accepted contracts in the plan,
  and durable architectural rationale in ADRs.
- Reuse project policies rather than embedding copies in feature documents.
- Record review owner, state, rounds, comments, and approval in each
  instantiated artifact.
- Preserve completed artifacts as records; start later work from fresh copies.
