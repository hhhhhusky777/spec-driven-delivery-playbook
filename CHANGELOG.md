# Changelog

This project has not published a formal versioned release. Significant template
and workflow changes are recorded here until a release/versioning policy is
adopted.

## Unreleased — 2026-08-21

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
  separate delivery-resume and policy-activation gates.

Migration guidance: active deliveries that have not started implementation
should generate and approve a handoff, review their manifest, and add review
metadata before continuing. For active implementation, reconcile current
artifacts at the next safe gate rather than discarding valid evidence. If a
systemic policy gap is already known, register it, pause only affected work,
reroute the active manifest, and preserve valid evidence. Preserve completed
historical records unchanged and apply this workflow to new work.
