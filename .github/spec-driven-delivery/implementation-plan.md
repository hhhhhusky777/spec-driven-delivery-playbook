# Implementation Plan — Proportional review

<!-- sdd: implementation-plan -->

## Delivery status

| Field | Value |
| --- | --- |
| State | `READY` |
| Active tasks | `None` |
| Next ready task | `T01` |
| Active blocker | `None` |
| Implementation mode | human-review-before-merge |
| Delivery branch / target | `codex/review-judgment` / `main` |
| Primary issue / need | [#105](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/105) |
| Concluded whiteboard | [Accepted design](solution-whiteboard.md), `review-judgment-20260917` |
| Last verified | Owner accepted design on 2026-09-17; design review evidence in [PR #106](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/106) |

## Governing inputs and delivery boundaries

Follow [Contributing](../../CONTRIBUTING.md), the accepted whiteboard, and its
linked Google engineering references. No new gate, recovery mechanism, risk
score, or template rule is in scope. Critical invariants and mandatory policy
remain protected. Source skills are maintained; installed runtime is generated.

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| D01, D02, D04 | T01: proportional reviewer judgment and approval disposition | Independent scenario review and source checks | aligned |
| D03 | T01: author acceptance, rejection, deferral responsibility | Independent scenario review and source checks | aligned |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | PR |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | READY | None | Review does not pursue perfection; author reasons about findings rather than accepting all requests | Review skill owns reviewer details; workflow owns author action; quality policy links and reflects blocking-only approval | Focused Markdown/link checks and independent scenarios; full source suite on final reviewed head | [#106](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/106) |

## Delivery strategy and readiness

One coherent PR targets main. Worktree runtime is CURRENT at accepted main
`32e9be3d4c302ab50c06f5ca97742169014b221f`; lifecycle and documentation structure
checks ran successfully from this worktree. Canonical sources and affected
skills were read; no unresolved authority conflict or task dependency exists.
Retain the two design reviewers through implementation and merge. Owner design
acceptance authorizes this bounded implementation, not merge.

## Plan validation and completion

Definition of Done: all four design points delivered without duplicated
error-handling guidance; optional/deferred work does not block approval;
critical violations cannot be unilaterally waived. Semantic review covers
optional polish, rare high-cost noncritical deferral, unsupported request
rejection, and credible critical-invariant violation. Full applicable source
validation follows exact-head agent review before human merge acceptance.

## Cleanup inventory

The closing candidate preserves the complete concluded whiteboard and final
plan in one combined archive linked to PR #106, removes this live plan, and
resets the live whiteboard. After authorized merge and target verification,
remove only this delivery's worktree and owned merged branch. Preserve the
reusable manifest and unrelated worktrees.
