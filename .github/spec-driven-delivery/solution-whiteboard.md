# Solution whiteboard

## Control

| Field | Value |
| --- | --- |
| Topic | PR-owned delivery evidence and post-delivery reset |
| State | CONVERGING |
| Owner | Repository owner |
| Conclusion review | NOT_STARTED |
| Created | 2026-09-06 Asia/Shanghai |
| Origin | Owner amendment during PR #65 closure; [issue #66](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/66), building on #54 and #62 |
| Development policy | [Contributing](../../CONTRIBUTING.md) |
| Project contracts | [Registry](project-contracts.md) |
| Generated workflow handoff | Not generated |
| Resulting delivery workflow | Not generated |
| Resulting implementation plan | Not generated |

This is a lightweight discussion draft. It is not an accepted policy or merge
authority. PR #65 remains unmerged while the closure model is reconsidered.

## Current snapshot

| Field | Current conclusion |
| --- | --- |
| Problem | Permanent per-feature whiteboards, plans, ledgers, snapshots, evidence files and archives duplicate GitHub PR history and make the repository harder to review and maintain |
| Required outcome | GitHub PRs own durable delivery evidence; after target verification, feature-specific working state is reset without reinstalling adoption or deleting reusable project/playbook state |
| Preferred direction | Keep only reusable/current contracts in the merged tree; use concise PR evidence plus exact Git revisions; reset transient delivery state |
| Confidence | High; direction is explicit and the affected canonical consumers are mapped |
| Material open questions | None for the direction; historical archives are outside the current migration unless separately authorized |
| Active blocker | Current archive-based closure package cannot merge under the amended requirement |
| Next action | Review the formal conclusion, then update the existing WB62 plan with the implementation tasks |

## Confirmed goals and boundaries

| ID | Goal / boundary | Acceptance signal |
| --- | --- | --- |
| C01 | GitHub PR is the durable feature-delivery evidence owner | PR retains design/task brief, exact revisions, reviewer findings and dispositions, owner decision, checks, merge identity and target verification |
| C02 | Reset feature-specific state after delivery | No completed feature whiteboard, handoff, workflow, plan, local review ledger, snapshot family, evidence file or archive copy is required in the merged tree |
| C03 | Preserve one-time adoption | Adoption manifest, current immutable runtime pin, entry point, project contracts and installed trigger remain tracked and reusable for later features |
| C04 | Preserve reusable playbook/product work | Source, tests, policies, templates, docs and project code delivered by the feature remain tracked normally |
| C05 | Keep stable outcomes and authority boundaries | Required checks, two-agent review, human decisions, merge authority, target verification and safety controls remain; only duplicate repository evidence is removed |
| C06 | Give agents implementation discretion | Policy states required evidence and reset outcome, not one rigid file-by-file procedure; consequential gaps still return to the owner |

## Evidence and retention map

| Information | Durable owner after merge | Repository treatment |
| --- | --- | --- |
| Delivered source, tests and reusable documentation | Merge commit / main tree | Keep tracked |
| One-time adoption and current runtime routing | Project manifest, registry and trigger | Keep tracked and current |
| Design decisions and key trade-offs | PR review brief and owner decision comment | Do not archive a duplicate whiteboard |
| Implementation tasks and outcomes | PR body/comments, exact head and merge commit | Do not keep a completed plan/record copy |
| Reviewer findings and author dispositions | Labeled PR reviews/comments | Do not copy them into a repository ledger |
| Checks and post-merge verification | GitHub checks plus target-verification comment | Link exact check/run and merge identities |
| Active whiteboard/workflow/plan | Temporary working state while needed | Reset/remove after evidence is on the PR and target verification passes |
| Historical WB38 material | Existing merged history | Leave unchanged in this delivery; any retrospective deletion needs separate explicit scope |

## Proposed closure flow

1. During discovery and implementation, maintain only the working context needed
   to deliver safely.
2. At each human gate, publish the concise table-first brief and exact decision
   request to the issue or PR; do not require the human to read every working
   document.
3. Before merge, ensure the PR owns the minimum evidence set and the exact
   candidate has passed self-review, two-agent review, required checks and owner
   acceptance.
4. Merge, verify target ancestry/tree/checks and post the target receipt on the
   same PR.
5. Reset the stable whiteboard to `EMPTY` and remove transient feature state.
   Preserve the one-time adoption/runtime controls and delivered reusable work.

The reset is not evidence deletion: the PR and immutable Git revisions must
already own the required evidence. Missing or inconsistent PR evidence blocks
reset. Cleanup outside transient feature state still requires explicit
authority.

## Current-delivery migration candidate

| Scope | Proposed treatment |
| --- | --- |
| PR #65 | Replace the archive package with the policy/runtime migration and WB62 reset; keep all review history on the PR |
| WB62 archive/record/evidence additions | Remove from the final merged tree |
| WB62 working delivery files already on main | Remove after their accepted content is recoverable from PR #64/#65 and immutable revisions |
| Working whiteboard | Return to a neutral tracked `EMPTY` entry point |
| U64 runtime result | Keep the current runtime pin and stable manifest routing; move delivery-only narrative to PR evidence |
| Existing WB38 history | No change in this migration |

## Risks and validation

| Risk | Required protection |
| --- | --- |
| PR summary omits a material decision | Mandatory table-first evidence contract and human gate completeness check |
| Mutable PR prose loses exact identity | Bind every acceptance/review receipt to a full candidate SHA and preserve review/comment URLs |
| Reset removes one-time adoption | Checker distinguishes stable adoption/runtime controls from feature-transient state |
| Agent resets before merge is proven | Reset only after exact target verification; failed probes preserve the affected state and block completion |
| Existing archive consumers break | Audit README, policies, skills, templates, lifecycle checker and tests as one coherent change |

## Discussion log

| Round | Decision / new information | State |
| --- | --- | --- |
| 1 | Owner rejected permanent feature archives because GitHub PR is the evidence owner and requested reset after delivery | ACCEPTED_DIRECTION |
| 1 | Preserve adoption/runtime and reusable delivered work; reset only feature-specific working/evidence artifacts | PROPOSED_DETAIL |
| 1 | Apply the new behavior to current WB62; leave older WB38 history untouched without separate deletion authority | SAFE_MIGRATION_DEFAULT |

## Option and lifecycle conclusion

| Option | Result | Reason |
| --- | --- | --- |
| Keep permanent repository archives | REJECTED | Duplicates PR/Git history and preserves large per-feature payloads |
| Delete feature records without replacement evidence | REJECTED | Loses decisions, review identity and verification needed for stable outcomes |
| PR-owned evidence plus reset final tree | PREFERRED | Keeps exact audit evidence while removing completed feature state from the maintained repository tree |

The feature branch may use working whiteboard, workflow, plan and evidence files
while the delivery is active. By the final PR review, their material decisions
and results must be published in the PR evidence, and the proposed merge tree
must contain the reusable feature result plus reset project state, not a new
per-feature archive. The two reviewers and owner review that exact final tree
and its PR evidence once. After merge, target probes verify both the delivered
result and reset state on the same PR.

The playbook should prefer ignored runtime working state when practical, but
must not require one storage mechanism. Branch-local tracked state is also
acceptable when the final candidate resets it and PR evidence remains complete.
This is an outcome boundary, leaving agents room to choose safe mechanics.

## Canonical source impact

| Owner | Required change |
| --- | --- |
| README and Contributing | Replace archive/record lifecycle and diagrams with one PR-evidence/final-tree-reset closure |
| Documentation quality and recovery policy | Define the minimum PR evidence table, exact revision binding, reset preconditions and exception handling |
| Adoption runbook and project maps | Preserve one-time installation/runtime controls while removing delivery-history accumulation |
| Workflow/adoption skills | Route active work through temporary state and close on PR evidence plus reset verification |
| Whiteboard, handoff, plan, workflow, policy and review templates | Remove permanent archive/record obligations; require concise PR evidence at human gates |
| Lifecycle checker and tests | Accept the new terminal/reset model, reject missing PR evidence and prevent deletion of stable adoption controls |
| Examples and changelog | Demonstrate the new flow and record the compatibility change |
| Current self-adoption records | Remove WB62 transient/archive payload from the final tree; keep current runtime pin and reset the stable entry point |

## Implementation task mapping

| Task | Brief work | Completion signal |
| --- | --- | --- |
| T02 — Closure contract | Update canonical docs, diagrams, skills and templates to make the PR the durable evidence owner and define final-tree reset | All consumers state the same outcome without copied archive rules |
| T03 — Enforcement and compatibility | Update lifecycle validation and regression tests for PR evidence, stable-control preservation and reset behavior | Positive and negative scenarios pass; existing active deliveries have an explicit migration path |
| T04 — Current-project migration | Update registry/trigger/manifest, remove WB62 feature-state/archive material from the proposed merge tree, keep runtime pin, and make PR #65 the evidence owner | Final PR tree contains reusable changes and one-time adoption only; whiteboard is EMPTY; PR evidence is complete |

These tasks form one coherent PR and one final full review gate. Intermediate
task checks do not create separate two-agent review gates unless a material
design mismatch or missing authority is discovered.

## Error handling

| Classification | Agent action |
| --- | --- |
| Routine agent or environment mistake with known bounded effect | Correct, rerun affected checks and continue without owner interruption |
| Missing/inconsistent PR evidence before reset | Preserve affected working state, correct evidence and re-review only the affected boundary |
| Playbook or project gap | Preserve valid work, open/link a scoped issue and continue when existing authority safely covers the correction |
| Canonical conflict, unknown destructive effect or missing consequential authority | Stop affected work and request the specific owner decision |

Reset never grants broader deletion authority. The agent must classify errors
before acting; reviewer findings remain on the PR rather than being recopied
into permanent project documents.

## Conclusion readiness

| Check | Result |
| --- | --- |
| Owner direction | GitHub PR owns delivery evidence; permanent feature archive rejected |
| Required boundaries | Adoption/runtime/reusable work preserved; review, quality and authority controls unchanged |
| Current migration | WB62 resets; historical WB38 untouched |
| Open product/design decisions | None |
| Remaining work | Independent conclusion review, owner acceptance, plan update and implementation |
