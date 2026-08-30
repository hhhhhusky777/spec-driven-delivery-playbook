# Proposed SGLang SDD Overlay

Target path: `.github/spec-driven-delivery/development-policy.md`

Status: teaching representation only. SGLang has not reviewed or adopted it.

## 1. Scope and authority

This overlay owns only whiteboard-first discovery, artifact routing, incremental
planning, task context receipts, and delivery records. Existing SGLang
authorities continue to own code style, testing, CI permissions, performance,
accuracy, reviewers, merging, releases, security, and component instructions.

The project adoption manifest owns the complete authority map and conflict
owner. A conflict blocks affected SDD work; this overlay never overrides an
existing SGLang requirement.

## 2. Start and route work

For each non-trivial need, issue, defect, refactor, or policy gap:

```text
solution whiteboard
    -> reviewed whiteboard handoff
    -> reviewed delivery manifest
    -> one selected artifact at a time
    -> dependency-ready implementation tasks
    -> SGLang tests, reviewers, and PR process
    -> evidence reconciliation and delivery record
```

A trivial documentation correction may use the smallest route selected by the
reviewed manifest. High-risk changes remain high-risk even when the diff is
small.

## 3. Review and state

- An artifact author or generating agent does not approve its own output.
- A dependent artifact is not generated from an unapproved predecessor.
- Unknown project facts remain explicit and can block only affected work.
- Task states are `PLANNED -> READY -> IN_PROGRESS -> VERIFYING -> DONE`, with
  recorded `BLOCKED` and `CANCELLED` handling from the pinned playbook policy.
- Before `READY -> IN_PROGRESS`, the implementer completes a reviewed task
  context receipt against the approved SGLang and feature sources.

## 4. Incremental delivery

Split work into the smallest coherent changes that keep SGLang's integration
target working. LOC is a review signal, not a universal limit. Related tests
and documentation stay with the behavior they protect. Data or compatibility
foundations precede dependent behavior only when the approved design requires
them.

## 5. Testing and failure handling

Select test placement, suites, hardware, accuracy, performance, and CI triggers
from SGLang's active contribution and test documentation. Do not invent a
second test matrix or trigger restricted GPU CI without authorization.

When a test fails, record observed behavior, expected behavior, governing
design, and classification before modifying product code, configuration, or the
test. Fix the responsible layer. A rerun is evidence only when SGLang's existing
flaky-test/CI rules permit it and the underlying result is understood.

## 6. Agent and handoff behavior

- Read the project entry point, scoped agent instructions, active manifest, and
  approved feature artifacts before editing.
- Run from the SGLang root and verify the caller-supplied read-only playbook
  locator against the manifest before reading a playbook artifact.
- Perform one manifest `Next action` and stop at its review gate.
- Preserve unrelated changes and report exactly which evidence ran.
- Keep live state, next action, blockers, source revisions, and evidence in the
  owning artifact rather than relying on chat history.

## 7. Specialized policy discovery

Do not pre-create hardware, concurrency, security, performance, or other
specialized policies. If delivery exposes a repeated cross-feature invariant,
register the evidence, pause only affected work, and route a policy proposal and
existing-system audit through the active delivery manifest.

## 8. Completion

Delivery completes only when approved requirements, SGLang-required tests and
review, documentation/API/runbooks, residual risks, deferred work,
retrospective actions, and archive links are reconciled without invented
evidence.
