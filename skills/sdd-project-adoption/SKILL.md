---
name: sdd-project-adoption
description: Adopt the Spec-Driven Delivery Playbook once by aligning reusable project contracts with an immutable playbook revision and the owner's actual policies.
---

# SDD Project Adoption

## Required outcome

The project has one trusted entry point, one immutable playbook revision, a
small reusable contract set, an empty working whiteboard, and clear owner
authority for future delivery. Adoption happens once; future features reuse it.

Apply the five goals in the verified playbook checkout's
`docs/documentation-quality-policy.md#five-goals-and-agent-judgment`:
clear boundaries, stable outcomes, key information only, proportional effort,
and agent discretion.

## Boundaries

- Existing repository policy and owner decisions remain authoritative unless
  explicitly changed.
- Reuse canonical project documents and links instead of copying rules.
- Keep machine-local runtime and checkout data out of Git.
- Commit only reusable adoption content; do not commit temporary discovery,
  review transcripts, generated runtime, or feature-specific working state.
- Do not invent approvals, project facts, enforcement capabilities, or test
  evidence.
- Ask the owner only for substantive policy decisions, authority, critical
  canonical conflicts, or final adoption acceptance.

Decision-level conformance determines whether an existing canonical policy is
accepted, updated as `UPDATE_EXISTING`, or covered by a reviewed exception. Do
not silently copy a playbook default or create a parallel or replacement
policy.

The adoption boundary means: do not admit a need through a guide that selects this adoption skill.
After recorded authority moves the manifest to `INSTALLED`, the new guide selects `sdd-project-workflow`; until then, do not infer a need.
Record affected artifacts as `STALE`.
The outcome must require every applicable freshness entry to be `CURRENT` before completion.

## Agent discretion

The agent chooses discovery depth, document mapping, checks, and corrections
according to project risk. When the owner or project has authorized batched
review, the agent may group related decisions and review material into one
concise package; otherwise the project's existing review boundaries remain.
Routine inconsistencies and agent mistakes are corrected without separate
human stops.

`EXPLICIT_REVIEW`, `AUTO_CONTINUE`, and `REVIEW_ON_EXCEPTION` describe the
owner's review outcome, not a prescribed execution path. Automation remains
inside approved authority and cannot supply semantic acceptance.

## Required evidence

The adoption review brief identifies the immutable playbook revision, project
entry point, reusable contracts, preserved policies, material decisions,
applicable checks, reviewer findings, and any remaining owner decision. Detail
stays in canonical sources and the PR.

## Exception routing

Use
`docs/batch-review-and-recovery.md#recovery-without-restarting-everything` and
`docs/batch-review-and-recovery.md#exception-triage-and-upstream-reporting` as
the canonical recovery and triage framework. Correct agent mistakes within
scope; track genuine project or playbook gaps with their owner; escalate only
unresolved authority, safety, or policy conflicts.
Use `templates/reviews/exception-triage.md` when a durable exception record is
needed. Self-review and independent review are evidence, not approval.

## Completion

Adoption is complete when the reusable documents are mutually consistent, the
runtime validates against the recorded immutable revision, required reviews
and owner acceptance are present, and the empty whiteboard is ready for the
first delivery.
