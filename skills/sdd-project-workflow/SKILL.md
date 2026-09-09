---
name: sdd-project-workflow
description: Deliver work in an adopted SDD project using its manifest, whiteboard, implementation plan, and pull requests.
---

# SDD Project Workflow

## Outcome

Deliver the requested result with clear boundaries, stable outcomes, key
information only, proportional effort, and enough agent discretion to fit the
project. Apply necessary complexity only: every added artifact, abstraction,
dependency, or control must protect the accepted outcome or a named invariant.
Repository policies and explicit owner decisions remain authoritative.

## Durable model

- The adoption manifest owns the installed immutable playbook revision,
  discovered project authorities, and stable project boundaries. It never owns
  feature progress.
- The whiteboard owns the active design discussion and concluded design. It
  retains a concise discussion draft and reconciles every material draft item
  to the authoritative conclusion; it does not preserve a raw transcript.
- The implementation plan owns tasks, dependencies, Definition of Done,
  validation expectations, and all active-delivery state.
- The pull request owns review comments, checks, approvals, merge evidence, and
  detailed delivery history.

Do not create additional documents that duplicate these responsibilities. Put
unique design information in the whiteboard, unique execution information in
the plan, and review evidence in the pull request.

## Boundaries

- Keep canonical project authorities mutually consistent. Resolve conflicts
  from those authorities and explicit owner decisions; ask the owner when the
  conflict changes policy, safety, intended behavior, or authority.
- Pause for substantive human decisions, required review, merge authority,
  destructive actions, or a critical mismatch. Do not invent pauses for
  routine progress or agent-correctable mistakes.
- Preserve existing work and secrets. Validate in proportion to risk and never
  claim an unrun or failed gate passed.
- When creating a worktree, provision the required machine-local untracked
  inputs there, including files such as `.env` when the task depends on them.
  Copy or recreate only what is needed, preserve appropriate permissions, keep
  it ignored and untracked, and never commit secrets or overwrite an existing
  worktree-local value without authority.
- A concluded design or approved plan changes only through an explicit
  amendment when the observable outcome changes. Ordinary task status and
  evidence updates do not reopen the design.
- Before final pull-request review, make the candidate converge every tracked
  canonical document to the state that will be true if that candidate merges.
  Candidate task and plan states describe that resulting repository state;
  GitHub owns the still-pending review, merge, and target-verification facts.
  Do not defer predictable tracked-state updates to a bookkeeping change after
  merge.
- Begin every delivery in an isolated worktree and owned delivery branch
  created from the accepted target. Provision required ignored machine-local
  inputs there, including the existing project installer when an upgrade may
  be needed. Regenerate the manifest-pinned runtime in that worktree, then
  check for and synchronize a newer playbook revision before whiteboard or
  implementation work. A maintenance-only upgrade is still a delivery; do not
  merge a separate target-branch upgrade solely to prepare another delivery.
- Before whiteboard work, reconcile the manifest's project authorities with
  current repository evidence. Semantically identify material policy sources
  that were added, removed, moved, or changed after adoption and update stable
  manifest links or boundaries in the same delivery. Filenames are discovery
  hints, not proof of authority. Routine corrections stay with the agent;
  conflicts that change policy, authority, safety, or intended behavior require
  the applicable owner decision.
- When candidate work changes canonical project policy, reconcile the manifest
  before final review. Link the canonical source instead of copying its text,
  and keep feature state out of the manifest.
- Treat the branch point as the implementation baseline. Do not routinely
  merge or rebase the target during ordinary work. Synchronize the completed
  candidate with its target, then run affected checks on that exact candidate
  before final review. If the baseline cannot support safe progress, follow the
  canonical error-handling authority.

## Agent discretion

Choose the working order, batching, tools, tests, and recovery method that best
achieve the accepted outcome. Prefer coherent review units and one human brief
at each real decision boundary. Human briefs use a compact table covering the
decision, important changes, risks or gaps, validation, and recommended action.
Classify material items as `HUMAN_DECISION`, `AGENT_ACTION`, `DISCLOSE`, or
`NONE` so the next agent knows whether to stop, act within authority, preserve
an explicit limitation, or continue. Classification adds no new gate.

## Error handling

Follow the canonical error-handling authority recorded in the adoption
manifest; do not restate or fork it here. In this playbook repository,
`docs/error-handling.md` owns triage, issue tracking, recovery, and escalation.

## Completion

Before final review, the candidate satisfies its implementation and task
outcomes, passes applicable pre-review checks, and already contains its
merge-resulting canonical state. After authorized merge, verify the complete
delivery outcome on the exact target. The pull request records review, merge
authority, merge, and target evidence. When the candidate closes the delivery,
it also archives the concluded whiteboard with pull-request links, removes the
feature plan and other non-reusable feature material, and resets the working
whiteboard. Preserve the manifest and other reusable project authority.
After target verification, remove owned delivery/task worktrees and retire
owned merged branches. Return the coordinating checkout to the accepted target
branch when safe; never discard local changes or disrupt another active task.
