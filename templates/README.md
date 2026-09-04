# Template Catalog

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
receipt to connect the original agent, a newly created isolated reviewer, and
the exact candidate. Preserve requested-change findings as immutable audit
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

Generate or update one selected artifact, then move it through
`IN_REVIEW -> CHANGES_REQUESTED -> IN_REVIEW` until it is `APPROVED`. Do not
generate a dependent artifact from an unapproved draft. The author or
generating runner must not self-approve unless an active project policy grants
a documented low-risk exception. Every review gate requires a new
fresh-context reviewer. Design, governance, adoption, upgrade, validation,
archive, and implementation under `HUMAN_REVIEW_BEFORE_MERGE` then stop for
mandatory human review. Only a user-authorized, scoped implementation
`AGENT_AUTO_MERGE` action may proceed after fresh approval without pre-merge
human review, subject to every live gate and repository protection.

For a fresh-context independent review, the original agent freezes the review
packet and creates a read-only reviewer with author-conversation inheritance
disabled. The reviewer returns a structured receipt; it never edits, merges,
or continues delivery. A candidate change invalidates the receipt and requires
a new fresh reviewer. Shared GitHub credentials do not constitute a distinct
formal approval identity.

`AUTO_CONTINUE` and `REVIEW_ON_EXCEPTION` classify deterministic non-review
actions. They do not approve artifacts or replace fresh-context or human
review.

Before submission, the generating or implementing agent must record
`SELF_REVIEW_PASSED` against the exact candidate revision. Any later change
invalidates that result. Self-review prepares the review package; it never
becomes `APPROVED` or authorizes merge or continuation.

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
