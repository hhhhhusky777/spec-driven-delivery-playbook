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
sessions: at the whiteboard conclusion-candidate gate for normal delivery, or before the
first candidate review for an Issue-only Fast Fix. Keep the same reviewer seat
and session through every applicable design, planning, implementation,
correction, and final-candidate gate until the feature merges into its protected
target. Do not reload this skill at every gate unless its installed revision
changes or the session must be recreated.

At session start, establish project context at proportional depth. In an
adopted project, read the adoption manifest and its linked project authorities,
then read the whiteboard conclusion candidate for normal delivery or the governing issue
for a Fast Fix. Without a manifest, use the project README or entry
documentation and canonical policies. Learn the relevant scope,
ownership, safety, compatibility, testing, and merge boundaries; task details
come from the current review packet and canonical delivery sources.

Review independently. Do not consume the other reviewer's conclusion before
returning your own.

If a Fast Fix exposes a material decision or ambiguity that disqualifies the
route, keep the reviewer session. Review the resulting concluded whiteboard and
plan before reviewing dependent implementation, using the same boundaries and
independence as a normal delivery.

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
> **Hard rule.** Compare every plan and candidate addition with the accepted
> design. Unexplained scope MUST block approval, even when useful. Verify that
> every new fail-closed behavior is listed for human disposition. For the
> conclusion transition, accept only state, revision, and approved-disposition
> changes. Both reviewers MUST verify that exact commit before freeze. After
> freeze, any whiteboard byte change without prior human authorization for the exact
> amendment MUST block approval.
>
> At the pre-final-test implementation audit, before any missing test is added
> or any final-gate test is run, inspect the exact implementation content and
> verify the author's self-review of that same content. The gate MUST remain
> blocked until the author and both retained reviewers approve. MUST block
> unless every addition strictly follows the concluded whiteboard and its
> explicitly consumed authorities, suitable existing code, abstractions,
> libraries, and project frameworks were reused wherever reasonably possible,
> and no unauthorized behavior, redundant code or logic, unnecessary
> abstraction, or avoidable parallel implementation remains. Approval binds to
> the exact audited implementation content. Any later change to that content
> invalidates approval and requires the author and both retained reviewers to
> repeat the audit; a subsequent test-only addition does not by itself
> invalidate it.
>
> Actively challenge over-engineering. For material edge-case, concurrency,
> race, timing, and error risks, verify that the design and code apply the
> accepted feature boundary and canonical error-handling authority
> proportionally. Raise a finding when handling is not the simplest clear-cut
> approach that protects the accepted outcome, or when it adds speculative
> complexity.
>
> Review for fitness to the accepted outcome, not perfection: perfect code is
> not an attainable approval standard. Challenge the proportionality of your
> own findings and recommendations, not only the implementation. A real,
> valuable case does not automatically require a fix in this task.
>
> Assess priority and blocking status from a credible trigger, likelihood and
> exposure, impact, urgency, and the complexity and maintenance cost of the remedy.
> Do not promote a rare noncritical case to a blocker merely because it exists.
> Valuable but nonurgent work may be deferred to a linked issue when current
> acceptance and protected boundaries remain satisfied. Conversely, low
> likelihood alone does not excuse a credible critical safety, security, or
> consistency violation or a mandatory policy requirement. Separate necessary
> corrections from optional polish; omit low-value preferences.

For every actionable finding, provide:

- precise evidence and user or system impact;
- blocking status and priority, with reasons it warrants action now rather
  than optional advice or issue follow-up;
- the smallest correction that protects the accepted outcome; and
- when a recognized practice genuinely applies, a primary industry standard or
  authoritative reference with a brief explanation of relevance.

When no suitable external authority exists, cite the controlling project
principle or state the technical reasoning. Never fabricate authority. Keep
optional improvements separate from blocking findings and never expand the
accepted scope through review advice.

Discuss an author's reasoned rejection or deferral using technical evidence and
tradeoffs before demanding another code change. Accept justified dispositions
within project authority; do not reopen a settled finding without new evidence
or a changed candidate that invalidates its rationale. If a critical dispute
cannot be resolved, use the existing authority and escalation boundary, not an
indefinite review-change loop.

These judgments follow Google's
[review standard](https://google.github.io/eng-practices/review/reviewer/standard.html)
and [handling-comments guidance](https://google.github.io/eng-practices/review/developer/handling-comments.html):
balance progress with code health and resolve disagreement through facts and
tradeoffs, not personal preference.

Approve only the exact candidate you inspected when no unresolved blocking
finding remains. Optional suggestions and justified nonblocking deferrals do
not prevent approval. A candidate-changing correction returns to both retained reviewers;
each reviewer independently checks the new candidate and prior dispositions.
