---
name: sdd-project-workflow
description: Deliver project needs through the installed Spec-Driven Delivery Playbook while preserving authority, evidence, quality, and agent discretion.
---

# SDD Project Workflow

## Required outcome

Deliver the owner's approved need with current, mutually consistent project
contracts; verified implementation; concise decision evidence; and a clean
reusable state for the next need.

Apply the five goals in the verified playbook checkout's
`docs/documentation-quality-policy.md#five-goals-and-agent-judgment`:
clear boundaries, stable outcomes, key information only, proportional effort,
and agent discretion.

## Authority and safety boundaries

- The manifest identifies the installed playbook revision and active delivery.
- Canonical project contracts and owner decisions define intended behavior.
- The working whiteboard holds the current need until it is concluded; the PR
  holds durable delivery and review evidence.
- Preserve unrelated work, secrets, repository protections, required project
  quality controls, and explicit authority for destructive or external actions.
- Stop for the owner when a decision changes intended behavior, policy,
  authority, safety, irreversible data handling, or delivery acceptance.
- Do not treat passing automation, agent review, or file presence as human
  approval.

Only one need owns the project-owned solution whiteboard.

- **`EMPTY`:** a new need may be admitted.
- **`CONCLUDED`:** the approved design governs delivery.

Do not overwrite it or admit a second need until PR evidence and reset are verified.

For a multi-task delivery, verify the task branch starts from and the task PR
targets the feature integration branch. Only the validated feature PR targets
the protected branch.

## Agent discretion

Within those boundaries, the agent chooses methods, sequencing, batching,
tools, artifacts, tests, recovery, and review depth according to actual risk and
complexity. Routine corrections and agent mistakes do not require a human stop.
Use one coherent review package instead of repeated artifact-level reviews.
Ordinary internal engineering choices remain with the agent.

`EXPLICIT_REVIEW`, `AUTO_CONTINUE`, and `REVIEW_ON_EXCEPTION` express owner
authority and review risk. Implementation merge mode is user-selected as
`HUMAN_REVIEW_BEFORE_MERGE` or `AGENT_AUTO_MERGE`.
It is checked at task start or resumption, PR publication, review and merge boundaries. It does not apply
to design acceptance, and automatic merges remain subject to post-merge human review.

At implementation review, the Current review target ID must be inside the
recorded mode scope. Never weaken checks, use administrator bypass, or treat
agent evidence as owner acceptance.
Automatic authority reaches the final feature PR only when its recorded scope includes that PR and final validation is already approved.

The agent may prepare, implement, validate, and synchronize dependent work
without artificial pauses when existing authority covers the work and required
quality outcomes remain satisfied. A status question or tool boundary is not an
approval boundary.

## Required evidence

Retain only information needed for decisions, verification, recovery, and
maintenance. Human review briefs use a concise table covering scope, key design
or task outcomes, risks, checks, reviewer findings, unresolved decisions, and
the exact response requested. Link to canonical detail rather than repeating
rules or review commentary.

When independent review is applicable, use
`templates/reviews/agent-self-review.md` and
`templates/reviews/fresh-context-agent-review.md` as the evidence source rather
than copying their protocol into this skill.

## Exception routing

Use `docs/batch-review-and-recovery.md#recovery-without-restarting-everything`
and `docs/batch-review-and-recovery.md#exception-triage-and-upstream-reporting`
as the single error-handling authority. Preserve valid work, repeat only what a
failure affects, correct agent mistakes within scope, and open an owning issue
for a genuine project or playbook gap. Human involvement is required only when
the unresolved consequence crosses an authority or safety boundary.
Use `templates/reviews/exception-triage.md` when a durable exception record is
needed.

## Completion outcome

The delivered result satisfies the approved design and project checks, review
findings are resolved, required human acceptance is recorded, merged-target
behavior is verified, the concluded whiteboard links the delivery PR, and
feature-only working material is removed or reset. Adoption and reusable
project contracts remain available for the next feature.
