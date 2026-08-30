# Changelog

This project has not published a formal versioned release. Significant template
and workflow changes are recorded here until a release/versioning policy is
adopted.

## Unreleased — updated 2026-08-22

- Renamed the repository to `spec-driven-delivery-playbook`.
- Added reusable development, specialized-policy, test, PR/branch, whiteboard,
  implementation-plan, workflow-router, and ADR templates.
- Added the whiteboard-to-manifest-to-delivery workflow graph and teaching
  README.
- Added template governance and contribution guidance.
- Added a complete parallel-provider-submission example that stops honestly
  before repository-specific implementation and test evidence.
- Added a reviewed whiteboard-to-workflow handoff with automatic-on-approval or
  manual invocation modes.
- Added independent manifest and one-artifact-at-a-time review gates across the
  workflow, templates, README diagram, and worked example.
- Added explicit mid-delivery policy-gap rerouting: local-versus-systemic and
  same-delivery-versus-independent classification, affected-task pause/stale
  rules, manifest rerouting, proposed-policy adoption, audit/remediation, and
  separate delivery-resume and policy-activation gates. README owns the
  canonical diagram; templates own normative steps and tracking fields.
- Reconciled authority precedence, whiteboard/handoff consumption, compact/full
  plan modes, task states, emergency routing, and worked-example IDs and states
  through a repository-wide consistency audit.
- Added dependency-first durable-data sequencing to the development-policy
  template, enforced data classification and task phases in implementation
  plans, and updated the worked example to use foundation -> consumer/migration
  -> cleanup ordering without imposing a universal database-first rule.
- Added the repository documentation-quality policy and Issue #1 CI: pinned
  Markdown/Mermaid tooling, relative-link/anchor, fence, placeholder,
  likely-secret and local-path checks, intentional-failure regression tests,
  advisory external links, least-privilege workflows, and owned dependency and
  methodology freshness reviews. Added an attention-map gate for long or
  multi-focus artifacts so material decisions, risks, and reviewer actions stay
  visible without duplicating their canonical text. Added a reviewed pre-start
  task context receipt so implementers reconcile the approved source revision,
  critical constraints, boundaries, and evidence before `READY -> IN_PROGRESS`.
- Added the project-adoption architecture, canonical runbook, and stateful
  adoption-manifest template. Adoption now begins with repository discovery and
  authority mapping, reuses existing project rules by default, requires local
  enforcement plus one bounded pilot before activation, and assesses later
  playbook revisions without automatic overwrite. Added bounded agent triggers
  for bootstrap, one-action continuation, and first-whiteboard creation, plus a
  pinned non-authoritative SGLang walk-through that shows the exact first file,
  proposed project overlay, review stops, and automation inputs without
  claiming upstream adoption. Clarified that adoption agents execute from the
  target project root while a caller supplies and verifies the playbook as a
  separate read-only runtime dependency; manifests keep durable source identity
  without committing machine-specific paths.

Migration guidance: active deliveries that have not started implementation
should generate and approve a handoff, review their manifest, and add review
metadata before continuing. For active implementation, reconcile current
artifacts at the next safe gate rather than discarding valid evidence. If a
systemic policy gap is already known, register it, pause only affected work,
reroute the active manifest, and preserve valid evidence. Preserve completed
historical records unchanged and apply this workflow to new work.

For existing active plans, do not rewrite completed task history. At the next
planning or replanning gate, classify not-started durable-data work, record its
foundation/consumer/migration/cleanup dependencies and compatibility evidence,
and reorder only work that has not begun. Existing project migration and
production-data policies remain authoritative.

Projects instantiating the updated test-strategy template should link their
documentation-quality authority and define documentation-only/generated-output
gates. Existing strategies remain valid until their next reviewed update; do
not claim the playbook repository's commands as project evidence unless that
project adopts and runs equivalent checks.

Projects that already use earlier playbook templates do not need to rewrite
approved documents or replay completed deliveries. At the next safe governance
review, pin the currently consumed playbook revision, create an adoption
manifest, map existing documents to `REUSE` or another reviewed decision, and
use the next bounded real delivery as adoption-pilot evidence.
