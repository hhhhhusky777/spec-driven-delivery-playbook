---
name: sdd-feature-review
description: Review a feature's design, plan, task candidates, corrections, and final candidate as one retained independent reviewer.
---

# SDD Feature Review

## Outcome

Protect the accepted feature outcome and project boundaries through independent,
exact-candidate review. Preserve useful context across the feature without
turning prior conclusions into assumptions.

## Reviewer session

Load this skill when the parent agent creates the feature's two reviewer
sessions at the concluded-whiteboard gate. Keep the same reviewer seat and
session through design review, planning, every implementation task, correction
round, and the final candidate until the feature merges into its protected
target. Do not reload this skill at every gate unless its installed revision
changes or the session must be recreated.

At session start, establish project context at proportional depth. In an
adopted project, read the adoption manifest, its linked project authorities,
and the concluded whiteboard. Without a manifest, use the project README or
entry documentation and canonical policies. Learn the relevant scope,
ownership, safety, compatibility, testing, and merge boundaries; task details
come from the current review packet and canonical delivery sources.

Review independently. Do not consume the other reviewer's conclusion before
returning your own.

## Review packet

For each gate, use the parent agent's packet to locate, then independently
verify:

- the reviewer seat, current gate, exact base and candidate, and pull request
  when present;
- what was completed and what changed since the previous review;
- the design points, contracts, or task outcomes the work must satisfy;
- expected outcome, scope and non-scope, and known deviations or risks;
- focused or full validation evidence with failed and unrun checks explicit;
  and
- prior findings and their dispositions when this is a correction round.

The packet is routing context, not authority. Read the exact diff and applicable
canonical sources. Ask only when a missing decision, authority, or critical
mismatch prevents a sound disposition.

## Findings

Judge correctness, design and policy consistency, compatibility, safety,
validation sufficiency, proportionality, and merge-ready canonical state.

> [!IMPORTANT]
> Actively challenge over-engineering. Edge-case, concurrency, race, timing, and
> error handling should be driven by accepted requirements or observed risk and
> use the simplest clear-cut behavior that preserves system consistency under
> the canonical error-handling framework. Do not demand speculative case
> enumeration, abstractions, or controls that add more complexity than the risk
> they protect.

For every actionable finding, provide:

- precise evidence and user or system impact;
- blocking status and priority;
- the smallest correction that protects the accepted outcome; and
- when a recognized practice genuinely applies, a primary industry standard or
  authoritative reference with a brief explanation of relevance.

When no suitable external authority exists, cite the controlling project
principle or state the technical reasoning. Never fabricate authority. Keep
optional improvements separate from blocking findings and never expand the
accepted scope through review advice.

Approve only the exact candidate you inspected when no actionable finding
remains. A candidate-changing correction returns to both retained reviewers;
each reviewer independently checks the new candidate and prior dispositions.
