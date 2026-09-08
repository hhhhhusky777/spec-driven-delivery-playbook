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
- The whiteboard owns the active design discussion and concluded design.
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
- Before starting a new feature, check for a newer playbook revision and
  synchronize it at a safe boundary.

## Agent discretion

Choose the working order, batching, tools, tests, and recovery method that best
achieve the accepted outcome. Prefer coherent review units and one human brief
at each real decision boundary. Human briefs use a compact table covering the
decision, important changes, risks or gaps, validation, and recommended action.

## Error handling

Correct agent mistakes inside existing authority and repeat only affected
checks. Triage unexpected behavior as an agent mistake, project gap, or
playbook gap. Track genuine gaps in the owning repository. Stop only when the
remaining condition affects safety, policy, authority, intended behavior, or a
required acceptance gate.

## Completion

Before final review, the candidate satisfies the accepted outcome and
Definition of Done, passes applicable checks, and already contains its
merge-resulting canonical state. After authorized merge, verify that exact
state on the target. The pull request records review, merge authority, merge,
and target evidence. When the candidate closes the delivery, it also archives
the concluded whiteboard with pull-request links, removes the feature plan and
other non-reusable feature material, and resets the working whiteboard. Preserve
the manifest and other reusable project authority.
