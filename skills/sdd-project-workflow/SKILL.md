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

> [!IMPORTANT]
> Avoid over-engineering. Before accepting a design or final candidate, remove
> every artifact, rule, duplicate statement, automation, abstraction, or
> dependency that does not protect an accepted outcome or named invariant.
> Prefer one canonical owner and the smallest sufficient solution.

## Durable model

- The adoption manifest owns the installed immutable playbook revision,
  discovered project authorities, and stable project boundaries. It never owns
  feature progress.
- For normal delivery, the whiteboard owns the active design discussion and concluded design. It
  retains a concise discussion draft and reconciles every material draft item
  to the authoritative conclusion; it does not preserve a raw transcript.
- For normal delivery, the implementation plan owns tasks, dependencies, Definition of Done,
  validation expectations, and all active-delivery state.
- The pull request owns review comments, checks, approvals, merge evidence, and
  detailed delivery history.

Do not create additional documents that duplicate these responsibilities. Put
unique design information in the whiteboard, unique execution information in
the plan, and review evidence in the pull request.

## Delivery routes

Use normal delivery when design or execution needs durable clarification: the
whiteboard concludes the design, the implementation plan owns execution, and
completion creates the combined archive described below.

An agent may instead select an Issue-only Fast Fix when a small correction's
accepted outcome, bounded scope, applicable authority, and validation intent
are unambiguous. The issue need not pre-exist: when the owner requests a
clearly bounded correction in conversation, create or update its governing
issue before implementation. Issue creation adds no separate approval gate;
discussion or diagnosis alone is not authorization to implement.
Disclose the selected route, reason, and evidence; route selection
does not create a separate approval gate. The issue owns the need and boundary,
and the pull request owns the candidate and delivery evidence. Do not create a
feature whiteboard, implementation plan, archive, or Fast Fix state record.

Fast Fix never waives testing, review, human merge authority, or project policy.
Before its first candidate review, create two isolated reviewer sessions, have
them load the installed sdd-feature-review skill once, and retain them through
corrections and merge. Run focused tests before review and full applicable
validation on the final reviewed candidate before human merge acceptance. For a
UI-only fix, use the smallest evidence that proves the changed behavior—such as
applicable component or interaction checks, rendered inspection at representative
viewports, accessibility evidence, or smoke evidence—without inventing a new
test framework merely to qualify for this route.

If work exposes ambiguity or a material architecture, schema, public-contract,
security, concurrency, deployment, systemic-policy, accessibility-policy,
product, or scope decision, fail closed to normal delivery. Preserve valid code,
tests, evidence, branch ownership, and the same reviewer sessions; conclude and
review the required whiteboard and plan before dependent work continues.

## Boundaries

> [!IMPORTANT]
> **Hard rule.** Each independent design or Issue-only Fast Fix MUST use two
> brand-new reviewer sessions with no inherited parent or prior-work context.
> Reviewers MUST NOT be reused across deliveries. They MUST read the review
> skill and applicable canonical sources. The same pair MUST remain through all
> gates, corrections, and final merge for that delivery.
>
> **Hard rule.** Both reviewers MUST approve the design before the human gate.
> The parent response MUST list every new fail-closed behavior with one concise
> concrete example and its `Recovery / best next action`, naming the smallest
> safe action, responsible actor, and retry/resume condition or required human
> decision. It MUST also preserve both reviewers' exact dispositions. The human
> MUST accept the design and every disposition.
> The conclusion commit MUST change only state, revision, and approved
> dispositions. The same reviewers MUST verify that exact commit before
> planning starts. After freeze, agents MUST NOT
> change any whiteboard byte without prior human authorization. Every addition MUST trace
> to the frozen design. Unexplained scope MUST block delivery.

If only the parent brief omitted unchanged, already approved recovery
information or reviewer dispositions, re-present them without another review.
Repeat review when candidate bytes or meaning changed.

Before the design human gate, use the Whiteboard's validation inventory to list
every newly designed runtime/contract rejection and every new acceptance
checkpoint or blocking gate. Do not relist unchanged validation or ordinary
tests under an existing gate. Authors and reviewers MUST assess each row against
all five criteria:

1. Traceability to an accepted outcome, invariant, risk, or external contract.
2. Correct ownership and execution boundary.
3. Marginal value beyond existing controls.
4. Risk reduction proportionate to latency, complexity, false rejection,
   maintenance, and operating cost.
5. The simplest sufficient mechanism. The fifth criterion is decisive: reuse
   or a cheaper adequate option wins unless shown insufficient.

Cross-reference overlapping fail-close and test evidence; do not duplicate it.

> [!IMPORTANT]
> After both retained reviewers approve the exact design candidate, the parent
> response MUST reproduce the complete validation table or `None`, preserve
> both reviewers' exact dispositions, and request owner disposition. Missing,
> incomplete, or pending rows MUST block conclusion and planning.
>
> The table MUST include: `ID`, `Validation / authority / execution boundary`,
> `Protected outcome / risk / marginal value`, `Concrete invalid case`,
> `Failure effect / recovery`, `Cost / risk reduction`,
> `Existing or cheaper mechanism / coverage / why insufficient`,
> `Fail-close / test reference`, and `Owner disposition`.
> Use these fields even when the project's Whiteboard has no validation-inventory
> section. Do not create a separate document or invent rows to populate the table.

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
  worktree-local value without authority. Test the worktree itself with a
  representative project operation before dependent work proceeds. If runtime
  support is missing, diagnose the gap and copy, recreate, or safely share only
  the required authorized support from an authoritative source; repeat the
  affected check until the worktree is operational or error handling requires
  escalation. Never make the worktree depend on mutable files or runtime owned
  by another checkout; shared support must have stable project-level ownership.
- Follow the project's canonical accepted-design authority. An authorized
  amendment changes only its named scope and repeats conclusion review and
  human acceptance before dependent work resumes.
- Keep material premises evidence-bounded. Check for unsupported,
  foreign-owned, incidental-state, single-case-generalization, hidden-dependency,
  and speculative assumptions. Verify the premise from authority, consume the
  owning public contract, or narrow and disclose the supported domain. If
  material authority remains unresolved, block only the affected work and ask
  the human to define or expand scope. Do not demand universal proof for
  unsupported or imagined cases.
  When there is genuine uncertainty about ownership, dependency, or
  supported-domain interpretation, consult Microsoft's
  [Architectural principles](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/architectural-principles)
  and AWS's
  [Workload and scope](https://docs.aws.amazon.com/wellarchitected/latest/userguide/workload-and-scope.html)
  as supporting references. Do not browse them routinely or treat them as
  project authority.
- For normal delivery, when the whiteboard conclusion candidate is ready,
  select two isolated reviewers for the feature and require each one to read
  the installed sdd-feature-review skill once. They review the exact design
  candidate before the owner concludes and accepts it for planning. Retain
  those same reviewer sessions
  through planning, every task and correction round, and the final candidate
  until the feature merges into its protected target. For each gate, send the
  focused context packet defined by the reviewer skill; do not reload the skill
  or recreate the sessions unless their runtime changes or recovery requires it.
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
- The implementation plan MUST select an integration model allowed by the
  canonical project branch policy and record every task's exact branch and
  required pull-request target. Under a feature integration model, every task
  PR MUST target the declared feature integration branch; only the final
  reviewed feature PR may target the protected integration branch. An agent
  MUST NOT invent an exception, override the canonical policy, retarget a task
  PR to the protected branch, or merge a task directly there. Any mismatch
  MUST block readiness, review, and merge until corrected.
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
  merge or rebase the target during ordinary work. The final-readiness
  implementation-audit contract below owns target-synchronization timing and
  invalidation. If the baseline cannot support safe progress, follow the
  canonical error-handling authority.

## Autopilot mode

At implementation-plan human review, the parent response MUST ask whether to
enable Autopilot, explain its exact scope, and batch foreseeable human decisions
with recommendations. Resolve blocking choices or record concrete owner-approved
alternatives in the plan; do not guess answers or request blanket future authority.

> [!IMPORTANT]
> Autopilot requires explicit owner opt-in. Generic plan approval, silence, or
> an unresolved choice MUST NOT enable it; human-review-before-merge is the
> default. Record mode, authorized scope, named feature integration branch and
> protected target in the existing plan; keep authorization evidence in the PR.
> With opt-in, merge task PRs ONLY into that named feature branch after both
> retained reviewers approve the exact head and focused/applicable required
> checks pass, including any required external approvals. Then start the next
> dependency-ready task and continue through existing final-readiness work.
> Stop at final merge-back ready with the normal human brief and wait for human
> protected-target merge acceptance. A single-PR delivery has no intermediate
> task merge to authorize; Autopilot NEVER grants automatic protected-target merge.

Candidate changes invalidate affected review/check evidence as usual. Existing
design, policy, scope, safety, testing, 90-minute and destructive-action boundaries
remain in force; unknown material decisions still require human input. Honor
owner suspension or narrowing of authority. Correct recoverable agent mistakes
within authority without routine progress pauses. Autopilot is scoped execution
authority, not a new controller, tracker, gate, or promise of uninterrupted work.

## Agent discretion

### Efficiency and Concurrency

> [!IMPORTANT]
> Actively overlap worthwhile independent work instead of waiting unnecessarily.
> Use asynchronous commands and parallel tasks when their inputs are ready and
> their files, data, environments, and resources do not interfere. Delegate
> bounded independent reasoning or implementation when it materially improves
> delivery time or judgment beyond its communication and integration cost.
> Concurrency never expands authority or bypasses dependencies and quality gates.

For your own execution, keep long-running commands in resumable background
sessions when supported and advance other independent work while they run.
Collect their exit status and evidence before consuming their results. Wait
when dependencies or resource contention require it, or when no useful safe
work remains; do not manufacture busywork or another agent for a simple command.

For multi-agent collaboration, delegate work that can be clearly scoped,
completed independently, and verified on return. Give workers sufficient context:
canonical source entry points, relevant design or task outcomes, exact candidate
or inputs, ownership and authority boundaries, and expected evidence. Keep
global requirements, cross-task tradeoffs, coordination, integration, and final
verification with the parent agent. Continue the mainline while workers run;
avoid duplicate effort and overlapping writes. Tightly coupled work or work
whose briefing and integration cost exceeds its benefit stays with the parent.
Independent reviewer creation still follows the Boundaries contract above.

These are judgment criteria, not a prescribed task graph or concurrency quota.
They draw on [OpenAI's subagent guidance](https://learn.chatgpt.com/docs/agent-configuration/subagents)
and [Anthropic's orchestrator-worker experience](https://www.anthropic.com/engineering/multi-agent-research-system).

### Execution judgment and evidence

Reuse verified project experience rather than repeat avoidable trial and error.
When an unexpected situation or failure arises, consult manifest-linked project
Experience or its existing equivalent for similar situations and verified
solutions. Check applicability before reuse; experience is guidance, not proof
of the current cause or permission to bypass project authority. Apply known
relevant lessons proactively when useful, without a mandatory lookup for every
operation. Prefer fixing the underlying problem or codifying a verified
solution in its existing code, script, or guidance owner within approved scope;
retain only useful residual knowledge rather than duplicate that owner.
Follow the Experience document's contribution guidance to refine reusable
lessons. Experience is reusable project guidance, not feature state: retain it
through cleanup.

Choose the working order, batching, tools, tests, and recovery method that best
achieve the accepted outcome. Prefer coherent review units and one human brief
at each real decision boundary. Human briefs use a compact table covering the
decision, important changes, risks or gaps, validation, and recommended action.
Follow the manifest-linked human-brief policy.

> [!IMPORTANT]
> After agent review, the parent MUST reply with a compact table pairing each
> reviewer finding with its proposed solution and the author's disposition
> (`fixed`, `rejected`, `deferred`, or `open`). The same table MUST include one
> concise concrete example for each finding, preserving the reviewer's meaning.
> The example explains how the finding manifests and why the finding warrants
> its priority; the author's solution and disposition remain separate. The
> example MUST NOT replace evidence, impact, or blocking rationale.
> Use `None` when there are no findings; do not invent an example. Link the PR
> when it exists; keep full review history in the PR. This adds no review gate
> or early-PR requirement.
>
> The parent response MUST also include a separate material-assumptions table:
> `Assumption`, `Dangerous-assumption category`, `Evidence / validation state`,
> `Impact if false`, and `Handling`. List every material assumption affecting
> the candidate or human decision. Use one `None` row when none exist. Do not
> manufacture entries from verified facts or immaterial details.
Classify material items as `HUMAN_DECISION`, `AGENT_ACTION`, `DISCLOSE`, or
`NONE` so the next agent knows whether to stop, act within authority, preserve
material awareness-only information (including accepted limitations), or
recognize that no material attention or action remains. Classification adds no
new gate.

Map every plan item and candidate addition of content, behavior, logic, or
fail-closed effect to the frozen concluded design or an explicitly consumed
project authority. Contract-equivalent methods remain discretionary. Stop
affected work when new scope appears; remove it or obtain prior human authority
for a design amendment instead of implementing it opportunistically.

Design test evidence from accepted outcomes and material failure risks. Keep
essential critical-path proof, then emphasize applicable boundaries,
error/recovery, concurrency/interleavings, timing/order, and interface
contracts. Use end-to-end smoke and production-like concurrent system or load
evidence when those risks warrant it. If broad or nondeterministic testing
exposes a defect, preserve the reproducing evidence and add the smallest
deterministic regression at the lowest useful layer when practical. Follow the
canonical project testing authority; do not impose universal suites or quotas.

When an exact pull-request candidate is waiting for human review, include the
canonical four-category changed-line summary for product code, documentation,
tests, and other files. Derive it against the actual PR target, classify each
file once by primary responsibility, and disclose non-line-countable files.
The summary informs review; it does not add a gate or prescribe a helper tool.

"Focused tests" means only the tests that cover the changed files and lines.
Run them before the feature's two retained agent reviewers inspect the exact
task candidate. A normal-delivery task may be `DONE` with missing non-focused
tests when the plan records each gap, its owning task, and its final-gate
obligation; keep actual run evidence in the PR.

> [!IMPORTANT]
> When all implementation tasks are `DONE` and final readiness begins, first
> perform any required target synchronization, resolve conflicts, and run
> affected focused checks. Do not resynchronize merely because the target
> advanced. The author and both retained reviewers MUST then audit the exact
> implementation content before any missing test is added or any final-gate
> test is run. They
> MUST verify that every addition strictly follows the concluded whiteboard and
> its explicitly consumed authorities, reuses suitable existing code,
> abstractions, libraries, and project frameworks wherever reasonably possible,
> and contains no unauthorized behavior, redundant code or logic, unnecessary
> abstraction, or avoidable parallel implementation. Any violation or missing
> approval MUST block final-test work. Approval binds to the exact audited
> implementation content; any later change to that content, including a required
> resynchronization, invalidates approval and repeats the audit. A subsequent
> test-only addition does not by itself invalidate this audit.

Only after this audit passes, reconcile all accepted changed outcomes and
material risks against the test inventory, including unrecorded gaps. Add
required missing tests before final candidate review, then run affected focused
checks and return the changed candidate to both retained reviewers. Do not
claim merge readiness with required tests still missing.
Candidate-changing corrections return to the same two reviewers. The installed
sdd-feature-review skill owns reviewer context and finding behavior. After both
reviewers approve the final candidate that will
merge back to the protected integration branch, run the project's full
applicable validation on that exact head before the human merge decision. A
single-task PR to the protected branch
is already final. Candidate-changing corrections repeat focused tests and the
same task reviewers; a final-candidate correction also repeats full validation.
Apply stricter project policy when it requires a more conservative sequence.

Playbook source tests belong only to changes in the playbook repository. In an
adopting project, use that project's tests and the installed runtime validation;
do not run the playbook repository's source suite.

Track active implementation time proportionally. If one task reaches 90 minutes
of active implementation before its planned review boundary, stop. Explain
whether the time reflects expected work or unexpected cases, whether extra work
protects the accepted outcome or is over-engineering, and what remains. Offer
a simpler or deferrable path when appropriate; wait for owner justification or
authorization before continuing. Do not count network or environment
interruptions, review time, or waits for people or external systems.

## Author disposition of review

> [!IMPORTANT]
> Independently assess each finding; do not implement reviewer requests by default.
> Accept a necessary correction, reject an unsupported or disproportionate request
> with evidence and tradeoffs, or defer valuable nonblocking work to a linked issue
> in its owning tracker. Explain the disposition in the PR. Discuss disagreements
> before unnecessary code changes; a reviewer suggestion is not authority to
> expand scope or add speculative complexity. The author is responsible for
> reasonable rejection as well as correction. Use the reviewer skill's judgment
> contract, not a second set of finding rules. Neither rejection nor issue
> deferral waives a required control or critical invariant; unresolved critical
> disagreements follow the existing authority and error-handling boundary.

## Error handling

For unexplained or recurrent test/execution failures, unsuccessful repairs, or
uncertain causes needing investigation, use the installed
[problem triage skill](../sdd-problem-triage/SKILL.md). Known bounded mistakes
can be corrected directly; triage adds no gate or test waiver.

Follow the project's manifest-linked error-handling authority when present.
Do not duplicate or override it.

Within approved scope and authority, correct recoverable agent errors and
continue. Preserve system consistency; fail closed when continuing could
violate a required invariant or safety boundary. Allow client-controlled retry
only when repeating the operation is safe; reconcile ambiguous effects or use
an established idempotency boundary before permitting retry. Prefer the
smallest sufficient handling, not enumeration of every possible failure.

Escalate unresolved scope, authority, or critical contract conflicts to the
human. Track confirmed playbook or project gaps in their GitHub issue tracker;
ordinary agent mistakes do not require a new issue.

## Completion

Before final human review, the candidate satisfies its implementation and task
outcomes, has converged through required agent review and exact-head
validation, and already contains its
merge-resulting canonical state. After authorized merge, verify the complete
delivery outcome on the exact target. The pull request records review, merge
authority, merge, and target evidence. When the candidate closes a normal
delivery, it creates one combined archive from the complete concluded
whiteboard and complete implementation plan. Mark the embedded sources with
`<!-- sdd: archived-whiteboard -->` and
`<!-- sdd: archived-implementation-plan -->` so applicable lifecycle checks can
verify both source states without adding a fourth template. The archive links
to its issues through an archive-level `Issues` field and identifies its
closing pull request through an archive-level `Closing pull request` field.
The closing pull request links back to the archive; detailed review and merge
evidence remains in GitHub. Preserve the source documents' durable authority,
design, mapping, task, actual-outcome, validation, deviation, and cleanup
sections rather than passing the archive gate with truncated summaries. Only
after that archive exists in the candidate may it remove the live plan and other
non-reusable feature material and reset the working whiteboard. Preserve the
manifest and other reusable project authority. Existing active normal
deliveries use this close boundary prospectively; do not rewrite historical
archives.
After target verification, remove owned delivery/task worktrees and retire
owned merged branches. Return the coordinating checkout to the accepted target
branch when safe; never discard local changes or disrupt another active task.
