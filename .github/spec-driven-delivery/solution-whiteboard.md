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
| Design decisions and key trade-offs | Versioned PR evidence comment and owner decision | Do not archive a duplicate whiteboard |
| Implementation tasks and outcomes | Versioned PR evidence comment, exact head and merge commit | Do not keep a completed plan/record copy |
| Reviewer findings and author dispositions | Labeled PR reviews/comments plus digests in the evidence comment | Do not copy them into a repository ledger |
| Checks and post-merge verification | GitHub checks plus versioned target-verification comment | Link exact check/run and merge identities |
| Last delivery locator | One fixed-size manifest row with feature PR, reset PR and evidence digest | Overwrite for the next delivery; Git history preserves prior values |
| Active whiteboard/workflow/plan | Tracked or ignored working state while needed | Preserve through feature target verification; remove through the bounded reset PR |
| Historical WB38 material | Existing merged history | Leave unchanged in this delivery; any retrospective deletion needs separate explicit scope |

GitHub repository and PR history are the selected system of record under the
same administrative trust boundary as repository Git history. The playbook does
not claim tamper-proof evidence against repository administrators. Before reset,
the agent must retrieve the PR, reviews, comments, check runs and merge object,
verify their identities and digests, and record one fixed-size locator in the
project adoption manifest. Missing, edited, dismissed or inaccessible evidence
blocks reset until reconciled; a URL or SHA alone is not proof of content.

## Minimum PR evidence contract

The feature PR must contain one versioned `sdd-pr-evidence/v1` table before
owner acceptance:

| Required field | Content |
| --- | --- |
| Repository and target | Repository identity, target branch and exact base SHA |
| Design | Key decisions, alternatives/risks and owner-accepted design source |
| Tasks | Task IDs, brief work, actual outcome and deviations |
| Candidate | Exact full candidate SHA and changed-path summary |
| Self-review | Exact candidate, state, evidence URL and SHA-256 digest of the evidence body |
| Independent review | Two labeled reviewer identities, exact candidate, disposition, receipt URL and SHA-256 digest for each body |
| Findings | Stable IDs, author dispositions, resolution revision and remaining state |
| Owner authority | Decision/merge scope, exact accepted candidate, comment URL and SHA-256 digest |
| Checks | Required check names, conclusions and exact run URLs |
| Limits and follow-ups | Unrun/unavailable evidence, accepted limits and linked issues or `None` |
| Reset plan | Exact transient paths/classes, retained stable controls, reset PR mode and cleanup authority |

After feature merge, the same PR receives a versioned `sdd-target-receipt/v1`
table:

| Required field | Content |
| --- | --- |
| Merge identity | Exact feature merge SHA, target branch and merge time |
| Target proof | Accepted candidate ancestry and reviewed-tree/merged-tree result |
| Check proof | Exact required check names, conclusions and run URLs at the merged candidate |
| Evidence availability | Every required evidence URL still retrievable and its body digest still matches |
| Runtime/project proof | Applicable installation/runtime and stable-control validation |
| Reset authorization | Exact reset scope, reset PR target/mode and prior owner authority |
| Exceptions/follow-ups | External effects, unresolved work or `None` |

The later reset PR records its own exact head, check runs, retained-seat delta
verification, merge SHA and target-reset result on the feature PR. The manifest's
single `Last delivery receipt` row stores the feature PR URL, feature merge SHA,
reset PR URL/merge SHA and final evidence digest. This is a locator and integrity
check, not a copied delivery record.

## Executable closure and reset flow

1. During discovery and implementation, maintain only the working context needed
   to deliver safely.
2. At each human gate, publish the concise table-first brief and exact decision
   request to the issue or PR; do not require the human to read every working
   document.
3. Before merge, ensure the PR owns the minimum evidence set and the exact
   candidate has passed self-review, two-agent review, required checks and owner
   acceptance.
4. Merge the feature PR while preserving its tracked working state; verify
   target ancestry/tree/checks and publish `sdd-target-receipt/v1` on that PR.
5. If every evidence item remains available and matches its digest, create the
   pre-authorized reset PR containing only the exact transient-state deletion,
   stable `EMPTY` whiteboard and fixed-size manifest locator update.
6. The retained reviewers verify only that bounded reset delta and required
   checks. Merge it without another semantic review only when the feature-PR
   owner acceptance explicitly authorized that exact reset scope and merge mode.
7. Verify the reset merge on target and append the final reset identity/result
   to the feature PR. Only then may ignored local working state be cleaned.

The reset is not evidence deletion: the PR and immutable Git revisions must
already own the required evidence. Missing or inconsistent PR evidence blocks
the reset PR, so a failed feature target probe preserves tracked working state.
A failed reset PR preserves that branch and reports the affected failure. Cleanup
outside enumerated transient feature state still requires explicit authority.

## Current-delivery migration candidate

| Scope | Proposed treatment |
| --- | --- |
| PR #65 | Replace the proposed archive with the v5 policy/runtime migration; remove unmerged WB62 archive additions, preserve working state through target verification and own all semantic evidence |
| Unmerged final-control commit | Withdraw the unmerged `ARCHIVED` transition; resume from main's legal WB62 `VALIDATING` state under this owner amendment |
| WB62 working delivery files already on main | Remove only in the post-verification reset PR after exact PR #64/#65 evidence validation |
| Working whiteboard | Preserve this amendment through PR #65 target verification; reset to the neutral tracked `EMPTY` entry point in the reset PR |
| U64 runtime result | Keep the current runtime pin and stable manifest routing; move delivery-only narrative to PR evidence |
| Existing WB38 history | No change in this migration |

## Risks and validation

| Risk | Required protection |
| --- | --- |
| PR summary omits a material decision | Mandatory table-first evidence contract and human gate completeness check |
| Mutable/deleted PR evidence loses exact identity | Validate URLs and body digests before reset; retain one fixed-size locator/digest in manifest history; stop and open a gap if evidence is unavailable |
| Reset removes one-time adoption | Checker distinguishes stable adoption/runtime controls from feature-transient state |
| Agent resets before merge is proven | Create reset PR only after exact target verification; failed probes preserve tracked state and block reset |
| Existing archive consumers break | Audit README, policies, skills, templates, lifecycle checker and tests as one coherent change |

## Discussion log

| Round | Decision / new information | State |
| --- | --- | --- |
| 1 | Owner rejected permanent feature archives because GitHub PR is the evidence owner and requested reset after delivery | ACCEPTED_DIRECTION |
| 1 | Preserve adoption/runtime and reusable delivered work; reset only feature-specific working/evidence artifacts | PROPOSED_DETAIL |
| 1 | Apply the new behavior to current WB62; leave older WB38 history untouched without separate deletion authority | SAFE_MIGRATION_DEFAULT |
| 2 | Use a separately scoped reset PR after feature target verification; feature-PR acceptance may pre-authorize its exact mechanical merge path | PROPOSED_DETAIL |
| 2 | Preserve v2–v4 behavior; introduce opt-in v5 and migrate only at a reviewed safe checkpoint | PROPOSED_DETAIL |
| 2 | Use versioned PR evidence/target tables plus body digests and a fixed-size manifest locator | PROPOSED_DETAIL |

### Design review reconciliation

Both fresh-context reviewers requested changes on exact R01 candidate
`adb606240084d834686f9000654bbdd3ac1a6de3`, based on
`5c894694a670d425033f5a0387a737359a3d5262`.

| Finding | Consolidated correction | State |
| --- | --- | --- |
| R1-F01 / R2-F02 | Separate feature target verification from a later pre-authorized reset PR; preserve tracked state on failed probes | PENDING_R02_REVIEW |
| R1-F02 / R2-F03 / R2-F04 | Define complete versioned evidence/target tables, body digests, availability checks, fixed-size locator and recovery | PENDING_R02_REVIEW |
| R1-F03 / R2-F05 | Preserve v2–v4, introduce opt-in v5, define safe active-delivery migration and unavailable-evidence behavior | PENDING_R02_REVIEW |
| R1-F04 / R2-F05 | Add exact design-to-task consumer mapping and split local versus GitHub-aware enforcement | PENDING_R02_REVIEW |
| R2-F01 | Withdraw only the unmerged terminal delta and resume WB62 from main's legal VALIDATING state; do not reopen a merged terminal plan | PENDING_R02_REVIEW |

## Option and lifecycle conclusion

| Option | Result | Reason |
| --- | --- | --- |
| Keep permanent repository archives | REJECTED | Duplicates PR/Git history and preserves large per-feature payloads |
| Delete feature records without replacement evidence | REJECTED | Loses decisions, review identity and verification needed for stable outcomes |
| PR-owned evidence plus post-verification reset PR | PREFERRED | Keeps exact audit evidence, preserves state on failed target probes and removes completed feature state without another semantic review |

The feature branch may use working whiteboard, workflow, plan and evidence files
while the delivery is active. By the final feature-PR review, their material
decisions and results must be published in the versioned PR evidence. The two
reviewers and owner review the reusable feature result and exact reset plan once.
After merge, target probes verify the result while tracked working state still
exists; only then does the bounded reset PR remove it.

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
| Local lifecycle checker and tests | Preserve v2–v4; validate v5 local schema, exact reset inventory and fixed-size receipt locator without pretending to query GitHub |
| GitHub-aware verification command/action | Query PR/review/comment/check/merge APIs, validate exact identities/body digests and gate reset publication |
| Examples and changelog | Demonstrate the new flow and record the compatibility change |
| Current self-adoption records | Remove WB62 transient/archive payload from the final tree; keep current runtime pin and reset the stable entry point |

## Implementation task mapping

| Task | Brief work | Completion signal |
| --- | --- | --- |
| T02 — Closure contract | Update canonical docs, diagrams, skills, templates and PR evidence schema to make the feature PR the semantic owner and define the post-verification reset PR | All consumers state the same evidence, sequencing and authority outcome without copied archive rules |
| T03 — Enforcement and compatibility | Add GitHub-aware evidence verification; update local v5 lifecycle validation and regressions while preserving v2–v4 | Positive/negative API fixtures, schema compatibility and reset-boundary scenarios pass |
| T04 — Current-project migration | Withdraw the unmerged terminal controls, update stable routing/runtime records, remove only unmerged archive additions in PR #65, then publish the exact reset inventory for a post-verification PR | PR #65 merges reusable v5 behavior with WB62 state preserved; later reset PR removes WB62 state and restores EMPTY without touching adoption/runtime or WB38 |

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

If required PR evidence is unavailable before reset, retain tracked state and
open/link a scoped playbook, project or access issue. If evidence becomes
unavailable after reset, use the feature/reset merge commits, the historical
manifest locator revision and available GitHub events to diagnose it; do not
reconstruct missing approval as fact. Report the evidence gap and preserve all
remaining sources. Evidence destruction by a repository administrator is
outside the ordinary integrity guarantee, just as forced Git-history rewriting
is today.

## Compatibility and migration

| Boundary | Decision |
| --- | --- |
| Existing schemas | v2–v4 parsing, archive semantics and historical records remain valid and unchanged |
| New behavior | Introduce v5 workflow/evidence semantics; select only through an explicit reviewed playbook upgrade |
| Active old-model delivery | Finish under its pinned model by default; migrate only at a reviewed checkpoint with no running task or unresolved external effect |
| Current WB62 | Eligible because PR #65 is unmerged and the owner explicitly amended closure; withdraw the unmerged terminal delta and resume from main's VALIDATING state |
| Downstream installation | No silent migration; upgrade keeps the old pin until compatibility checks and owner cutover acceptance pass |
| Historical archive cleanup | Never inferred; retain when required PR evidence is unavailable; any deletion needs separate exact scope and authority |

## Design-to-task consumer matrix

| Consumer | Decision | Task | Required validation |
| --- | --- | --- | --- |
| `README.md`, `CONTRIBUTING.md`, `CHANGELOG.md` | Replace archive flow/diagrams; document v5 compatibility | T02 | Markdown, Mermaid and semantic cross-document review |
| `docs/batch-review-and-recovery.md`, `docs/documentation-quality-policy.md`, `docs/project-adoption-runbook.md` | Own evidence tables, reset sequence, gate brief and installation boundary | T02 | Required-field and cross-link assertions |
| `skills/sdd-project-workflow/SKILL.md`, adoption/upgrade skills and generated guide text in `install-sdd.sh` | Route v5 work/reset; preserve v2–v4 and pin upgrades | T02/T03 | Real install/upgrade/generated-link tests |
| `.github/pull_request_template.md`, `templates/README.md`, PR/development policies | Collect versioned PR evidence and authority | T02 | Complete/missing-field fixtures |
| Whiteboard, handoff, implementation-plan, workflow, review-batch and fresh-review templates | Make working state transient and publish key gate tables to PR | T02 | Template link/placeholder and gate assertions |
| Adoption-manifest and test-strategy templates | Preserve stable adoption; verify reset and evidence failure cases | T02/T03 | Stable-control deletion rejection and scenario coverage |
| `scripts/sdd-lifecycle.mjs` plus a GitHub-aware verifier | Preserve old schemas; validate v5 local/API boundaries at their correct enforcement points | T03 | v2–v5 positive/negative unit and fixture tests |
| Documentation, lifecycle, installer and publication tests | Replace archive-only assertions; retain old-schema compatibility | T03 | Full suite plus API replay/idempotency tests |
| Maintained batched/adoption examples | Update one v5 example; label older examples historical/no-impact where retained | T02 | Example links and documented expected output |
| Project registry, trigger, manifest, WB62 paths/reviews/U64 and archive index | Keep stable pin/routes; remove unmerged archive additions; declare later reset inventory | T04 | Exact path inventory, PR evidence verifier, runtime CURRENT and WB38 no-impact check |

## Conclusion readiness

| Check | Result |
| --- | --- |
| Owner direction | GitHub PR owns delivery evidence; permanent feature archive rejected |
| Required boundaries | Adoption/runtime/reusable work preserved; review, quality and authority controls unchanged |
| Current migration | PR #65 preserves WB62 through target verification; separately scoped reset PR removes it; historical WB38 untouched |
| Open product/design decisions | None |
| Remaining work | Independent conclusion review, owner acceptance, plan update and implementation |
