---
name: sdd-feature-review
description: Review a feature's design, plan, task candidates, corrections, and final candidate as one retained independent reviewer.
---

# SDD Feature Review

## Outcome

Protect the accepted feature outcome and project boundaries through independent,
exact-candidate review. Preserve useful context across the feature without
turning prior conclusions into assumptions.

> [!IMPORTANT]
> When a KB topic-read trigger applies and the accepted pin ships the topic,
> you MUST read it before applying its guidance. A skill summary or prior
> knowledge MUST NOT substitute for reading the topic.
>
> If an engineering method or its applicability is uncertain, confidence is
> low, or a material engineering claim lacks support, you MUST read the relevant
> primary references before deciding. Guesses, unsupported assumptions and
> subjective confidence MUST NOT substitute for evidence. Verify project-specific
> premises against canonical project sources or direct evidence; external guidance
> cannot establish them. If sources are unavailable or material uncertainty
> remains, disclose the limitation and follow existing project error handling.

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

When undertaking causal investigation with the author, use the installed
[problem triage skill](../sdd-problem-triage/SKILL.md). This is optional diagnosis,
not a substitute for independent candidate review.

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

When reviewing solution or system design, performance decisions or feedback,
read `performance-and-observability.md` directly from the manifest-linked KB
root when the accepted pin ships it. Assess measurable, interpretable feedback
and proportionate improvements within project authority.

Before judging performance-sensitive code or a code-level optimization, read
`code-level-performance-engineering.md` directly from the manifest-linked KB
root when the accepted pin ships it. Assess the actual cost mechanism, bounded
benefit and preservation of project behavior and ownership.

Before judging implementation clarity or a refactoring, read
`code-simplicity-and-clarity.md` directly from the manifest-linked KB root when
the accepted pin ships it. Assess understandable intent, control/data flow and
behavior preservation within project authority, not line count or personal style.

Before judging use or maintenance of project lessons, read
`experience-and-learning.md` directly from the manifest-linked KB root when
the accepted pin ships it. Check verified applicability, actionable value and
canonical ownership; past experience does not establish the current cause or
override project authority.

Before judging overlapping execution or delegation, read
`efficiency-and-concurrency.md` directly from the manifest-linked KB root when
the accepted pin ships it. Assess independence, resource ownership, coordination
cost and integrated evidence within project authority.

Before judging an interface contract or its compatibility, read
`contracts-and-compatibility.md` directly from the manifest-linked KB root
when the accepted pin ships it. Assess promised behavior for supported
consumers within the project's contract and migration authority.

Before judging test sufficiency or reproduction evidence, read
`testing-and-reproduction.md` directly from the manifest-linked KB root when the
accepted pin ships it. Judge behavior and material-risk coverage within project
testing authority.

Before judging a change to trust, access, sensitive data or exposure, read
`security-basics.md` directly from the manifest-linked KB root when the accepted
pin ships it. Assess actual security boundaries and proportionate controls
within project authority.

> [!IMPORTANT]
> **Hard rule.** Compare every plan and candidate addition with the accepted
> design. Unexplained scope MUST block approval, even when useful. Verify that
> every new fail-closed behavior is listed for human disposition with one
> concise concrete example and its `Recovery / best next action`. Recovery MUST
> name the smallest safe action, responsible actor, and retry/resume condition,
> or the required human decision; it MUST be proportionate to the material
> risk. The example MUST be realistic, align with the declared behavior, and
> remain explanatory rather than expand its scope. Require the parent human
> brief to preserve the recovery and both reviewers' exact dispositions. When
> no new behavior exists, require `None`; do not invent a behavior, example, or
> recovery.
> For the conclusion transition, accept only state, revision, and
> approved-disposition changes. Both reviewers MUST verify that exact commit before freeze. After
> freeze, any whiteboard byte change without prior human authorization for the exact
> amendment MUST block approval.
>
> Review every newly designed runtime/contract rejection and every new
> acceptance checkpoint or blocking gate in the Whiteboard's validation
> inventory. Each row MUST satisfy all five criteria:
>
> 1. Traceability to an accepted outcome, invariant, risk, or external contract.
> 2. Correct ownership and execution boundary.
> 3. Marginal value beyond existing controls.
> 4. Risk reduction proportionate to latency, complexity, false rejection,
>    maintenance, and operating cost.
> 5. The simplest sufficient mechanism. The fifth criterion is decisive: reuse
>    or a cheaper adequate option MUST win unless shown insufficient.
>
> Do not demand relisting of unchanged validation or ordinary
> tests under an existing gate. Require cross-references instead of duplicated
> fail-close or test evidence. Missing, incomplete, pending, or
> disproportionate rows MUST block design approval. Report an exact disposition
> for every row so the parent can reproduce the table at the human gate.
>
> Verify every task's recorded branch and required PR target against the
> canonical branch policy and the actual pull request. Under a feature
> integration model, a task PR targeting the protected integration branch MUST
> block approval; only the final reviewed feature PR may target that branch.
> Reject any delivery-local exception, policy override, opportunistic retarget,
> or direct task merge that bypasses the declared feature integration branch.
>
> For an Autopilot delivery, verify the plan's explicit owner authorization,
> scope and targets against PR evidence and the installed workflow skill's
> Autopilot mode contract. Reviewer approval does not supply merge authority.
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
> Before judging failure handling, retry safety or failure diagnostics, read
> `error-handling-and-diagnosability.md` directly from the manifest-linked KB
> root when the accepted pin ships it. Apply it within project authority.
> Before judging design simplicity or reuse, read
> `simple-design-and-reuse.md` directly from the manifest-linked KB
> root when the accepted pin ships it. Apply it within the accepted project
> boundary, not as a mandatory recipe or personal-style checklist.
>
> Treat a material premise that is unsupported, foreign-owned,
> incidental-state, a single-case generalization, a hidden dependency, or a
> speculative assumption as a scope finding. Require authoritative evidence,
> the owning public contract, or an explicit supported-domain boundary. Block
> only when material authority remains unresolved; do not demand universal
> proof or future-case generalization beyond the accepted outcome.
> Before judging responsibilities, dependencies, or material assumptions, read
> `architecture-scope-and-assumptions.md` directly from the manifest-linked KB
> root when the accepted pin ships it. Apply it within the accepted project
> boundary.
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
- one concise concrete example or counterexample from the exact candidate that
  shows how the issue manifests, its credible consequence, and why it warrants
  action now rather than optional advice or issue follow-up;
- blocking status and priority, with reasons it warrants action now rather
  than optional advice or issue follow-up;
- the smallest correction that protects the accepted outcome; and
- when a recognized practice genuinely applies, a primary industry standard or
  authoritative reference with a brief explanation of relevance.

When there are no actionable findings, report `None`; do not invent a finding
or example.

When no suitable external authority exists, cite the controlling project
principle or state the technical reasoning. Never fabricate authority. Keep
optional improvements separate from blocking findings and never expand the
accepted scope through review advice. A concrete example supports explanation;
it does not replace evidence, impact, priority, or blocking rationale. Do not
use a speculative or extremely unlikely example to promote low-value polish
into a finding or blocker.

Before assessing finding priority, correction value or an author's disposition,
read `proportional-review.md` directly from the manifest-linked KB root when the
accepted pin ships it. Resolve disagreement through evidence and tradeoffs;
accept justified dispositions without reopening settled findings absent new
evidence or changed content. Escalate critical unresolved disputes through
project authority.

Approve only the exact candidate you inspected when no unresolved blocking
finding remains. Optional suggestions and justified nonblocking deferrals do
not prevent approval. A candidate-changing correction returns to both retained reviewers;
each reviewer independently checks the new candidate and prior dispositions.
