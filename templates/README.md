# Template Catalog

## Optional batched route

The optional review-batch record groups exact artifacts and controls without
changing their owners. Version-3 plan/workflow templates require an explicit
Review batch selection; None retains ordinary per-artifact behavior.

See [Batched review and recovery](../docs/batch-review-and-recovery.md) for authority, evidence and recovery
requirements. This route takes effect only through reviewed project adoption.

## Project adoption

Before instantiating project policies, follow the
[Project Adoption Runbook](../docs/project-adoption-runbook.md) and create a
[project adoption manifest](adoption/project-adoption-manifest.md). Inventory
the project's existing authorities first. Reuse them only after the manifest
records decision-level conformance for every applicable template obligation;
file existence alone is insufficient. Route missing decisions to
`UPDATE_EXISTING`, and require a reviewed exception for an intentional
alternative. Apply the audit to every applicable policy family. When a
canonical project policy is incomplete, update it; do not create a parallel or
replacement development, testing, PR, documentation/API, security, data,
concurrency, performance, release, operations, incident, or specialized policy
merely because a template exists. Use the
[agent adoption trigger](adoption/agent-adoption-trigger.md) to perform one
manifest action at a time by default. A reviewed project development policy may
pre-authorize bounded `AUTO_CONTINUE` or `REVIEW_ON_EXCEPTION` actions; missing
mode information fails closed to `EXPLICIT_REVIEW`, and automatic work stops at
the next semantic checkpoint or exception.

Use the [playbook upgrade assessment](adoption/playbook-upgrade-assessment.md)
for a reviewed current-to-candidate decision, migration order, validation,
cutover, and rollback in an installed project.

The preferred project entry is the repository-root
[`install-sdd.sh`](../install-sdd.sh). It generates a machine-local agent guide
and installs the skill selected by manifest state. After reviewed installation,
the skill creates an empty solution whiteboard; no need belongs in the
installer or guide.

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

Before every review gate, use the
[agent self-review record](reviews/agent-self-review.md) as a separate record or
embed its fields in the owning artifact. Then use the
[fresh-context agent review](reviews/fresh-context-agent-review.md) packet and
receipt to connect the original agent, a stable review session whose assigned
reviewer(s) were initialized without author context, and the exact candidate.
Preserve requested-change findings and author dispositions as immutable audit
records.

1. Always begin inside the installed project's empty
   [solution whiteboard](discovery/solution-whiteboard.md).
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

Use [self-review](reviews/agent-self-review.md) and the
[fresh-context protocol](reviews/fresh-context-agent-review.md) for the selected
artifact or explicitly authorized batch. The protocol owns isolation, findings,
revision rounds and phase acceptance; the approved workflow owns execution and
merge authority. Follow the [batch contract](../docs/batch-review-and-recovery.md)
only within adopted scope. Do not consume an unapproved draft as authority.

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

Instantiated delivery workflows and implementation plans retain their
`sdd-schema`, `sdd-section`, and applicable `sdd-task-spec` comments. These
non-rendered markers let the lifecycle checker verify semantic requirements
without making headings or prose a second machine interface. Replace the
implementation-plan marker's `SELECT` mode with `COMPACT` or `FULL`.
