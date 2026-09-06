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
| Required outcome | GitHub PRs own durable delivery evidence; after target verification, remove everything specific to the completed delivery that cannot be reused, reset the runtime and working whiteboard, and preserve adoption plus reusable project/playbook outputs |
| Preferred direction | Keep only adoption controls and reusable/current outputs in the merged tree; use concise PR evidence plus exact Git revisions; remove non-reusable delivery state and regenerate runtime for the next need |
| Confidence | High; direction is explicit and the affected canonical consumers are mapped |
| Material open questions | None for the direction; historical archives are outside the current migration unless separately authorized |
| Active blocker | Current archive-based closure package cannot merge under the amended requirement |
| Next action | Review the formal conclusion, then update the existing WB62 plan with the implementation tasks |

## Confirmed goals and boundaries

| ID | Goal / boundary | Acceptance signal |
| --- | --- | --- |
| C01 | GitHub PR is the durable feature-delivery evidence owner | PR retains design/task brief, exact revisions, reviewer findings and dispositions, owner decision, checks, merge identity and target verification |
| C02 | Reset all non-reusable current-delivery state after delivery | Every path, runtime item and branch/worktree owned only by the completed delivery is removed or reset after target verification; the working whiteboard returns to neutral `EMPTY` |
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
| Active whiteboard/workflow/plan and other delivery-only state | Tracked or ignored working state while needed | Preserve through feature target verification; remove or reset through the bounded reset operation |
| Historical WB38 material | Existing merged history | Leave unchanged in this delivery; any retrospective deletion needs separate explicit scope |

### Reset classification boundary

The reset applies to the completed delivery, not to adoption or reusable output.
Historical interest alone is not reuse because the PR owns delivery history.
The agent classifies the exact inventory case by case using this outcome:

| Classification | Required disposition after verified delivery |
| --- | --- |
| Exists only to plan, execute, review or close the completed delivery | `REMOVE`; examples include its handoff, workflow, plan, local review/evidence records, snapshots, temporary branches and worktrees |
| Stable working entry point with reusable identity but delivery-specific content | `RESET`; replace the working whiteboard with the reviewed neutral `EMPTY` bytes |
| Machine-local delivery runtime | `RESET`; clean the owned checkout/guide and regenerate it from the preserved or explicitly upgraded manifest pin |
| Adoption control or output usable independently by future work | `KEEP`; examples include the manifest, contracts, trigger, current pin, delivered source, tests, policies, templates and reusable documentation |

Before destructive work, the reset candidate enumerates every delivery-owned
item and its disposition. `KEEP` requires a concrete future-use reason. Omitted
or uncertain ownership blocks only the affected removal; it cannot be treated
as implicit permission to retain duplicate delivery evidence or delete it.

GitHub repository and PR history are the selected system of record under the
same administrative trust boundary as repository Git history. The playbook does
not claim tamper-proof evidence against repository administrators. Before reset,
the agent must retrieve the PR, reviews, comments, check runs and merge object,
verify their identities and digests, and record one fixed-size locator in the
project adoption manifest. Missing, edited, dismissed or inaccessible evidence
blocks reset until reconciled; a URL or SHA alone is not proof of content.

## Minimum PR evidence contract

Before owner acceptance, the feature PR must contain one versioned
`sdd-pr-review/v1` table:

| Required field | Content |
| --- | --- |
| Repository and target | Repository identity, target branch and exact base SHA |
| Design | Key decisions, alternatives/risks and owner-accepted design source |
| Tasks | Task IDs, brief work, actual outcome and deviations |
| Candidate | Exact full candidate SHA and changed-path summary |
| Self-review | Exact candidate, state, evidence URL and SHA-256 digest of the evidence body |
| Independent review | Two labeled reviewer identities, exact candidate, disposition, receipt URL and SHA-256 digest for each body |
| Findings | Stable IDs, author dispositions, resolution revision and remaining state |
| Requested owner authority | Exact candidate and requested feature/reset merge scope; state `PENDING` before the owner acts |
| Checks | Required check names, conclusions and exact run URLs |
| Limits and follow-ups | Unrun/unavailable evidence, accepted limits and linked issues or `None` |
| Reset plan | Complete inventory of delivery-owned repository paths and runtime items; each item is `REMOVE`, `RESET`, or `KEEP` with a reuse reason; exact replacement bytes or blobs for every reset file; reset PR mode and cleanup authority; descriptive classes grant no deletion authority |

After the owner acts and before feature merge, the same PR receives a separate
`sdd-pr-acceptance/v1` comment containing the exact accepted candidate, owner
decision and merge/reset scope, owner comment URL, SHA-256 digest of that fetched
comment body, and the digest of the accepted `sdd-pr-review/v1` table. Rejecting
or changing the candidate returns to review; no table requires a future decision.

After feature merge, the same PR receives a versioned
`sdd-target-receipt/v1` table:

| Required field | Content |
| --- | --- |
| Merge identity | Exact feature merge SHA, target branch and merge time |
| Target proof | Accepted candidate ancestry and reviewed-tree/merged-tree result |
| Check proof | Exact required check names, conclusions and run URLs at the merged candidate |
| Evidence availability | Every required evidence URL still retrievable and its body digest still matches |
| Runtime/project proof | Applicable installation/runtime and stable-control validation |
| Reset authorization | Exact reset scope, reset PR target/mode and prior owner authority |
| Exceptions/follow-ups | External effects, unresolved work or `None` |

For a project already using v5, the reset PR records its exact reviewed head and
check runs before merge. Retained-seat delta verification, the reset merge SHA
and target-reset result are appended later to the feature PR. The reset PR
itself updates the manifest's single `Last delivery receipt` row with only
values knowable before its merge: feature PR URL and merge SHA, reset PR URL and
exact reviewed reset head, plus the SHA-256 digest of the complete pre-reset
evidence bundle. The later reset merge/result stays solely on the feature PR;
no third control PR or self-reference is required. The row is a locator and
integrity check, not a copied record.

## Steady-state v5 closure and reset flow

This flow applies only after the project is already pinned to a reviewed v5
revision. It does not authorize this repository's one-time v4-to-v5 bootstrap.

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
   pre-authorized reset PR containing the complete accepted path inventory,
   removal of all non-reusable delivery paths, exact `EMPTY` whiteboard bytes
   and fixed-size manifest locator update.
6. The retained reviewers verify only that bounded reset delta and required
   checks. Merge it without another semantic review only when the feature-PR
   owner acceptance explicitly authorized that exact reset scope and merge mode.
7. Verify the reset merge on target and append the final reset identity/result
   to the feature PR. Then remove delivery-owned branches/worktrees, clean the
   owned machine runtime and regenerate it for the next need from the current
   reviewed manifest pin.

The reset is not evidence deletion: the PR and immutable Git revisions must
already own the required evidence. Missing or inconsistent PR evidence blocks
the reset PR, so a failed feature target probe preserves tracked working state.
A failed reset PR preserves that branch and reports the affected failure. Cleanup
outside enumerated transient feature state still requires explicit authority.

### Current v4-to-v5 self-adoption bootstrap

This repository cannot pre-authorize an upgrade to PR #65's future merge SHA.
For this one-time bootstrap:

1. Keep PR #65 and its runtime pin on v4 through merge and target verification.
2. Resolve the immutable PR #65 merge SHA from the verified target receipt.
3. Prepare one combined reset/upgrade PR against that exact SHA, containing the
   enumerated reset and the v5 pin/runtime migration.
4. Run migration validation and required checks on that exact candidate.
5. Obtain two independent exact-head reviews and fresh human cutover acceptance.
6. Only then merge the pin cutover and enumerated repository reset, verify
   target, append its identity/result to PR #65, clean the old owned runtime and
   regenerate it at the new exact pin.

PR #65 acceptance does not preapprove this later candidate. The steady-state
bounded-reset exception begins only after the reviewed v5 cutover is complete.

## Current-delivery migration candidate

| Scope | Proposed treatment |
| --- | --- |
| PR #65 | Replace the proposed archive with v5 source policy and compatibility behavior while retaining the v4 runtime pin; remove unmerged WB62 archive additions, preserve working state through target verification and own all semantic evidence |
| Unmerged final-control commit | Withdraw only `5c894694a670d425033f5a0387a737359a3d5262`; retain its parent `cd6d8ba3311bbe3e4a6a692b4cd970477021fb7b` as the reconciled `VALIDATING` checkpoint, then use the allowed return to plan `IMPLEMENTING` / workflow `DELIVERY_ACTIVE` for T02–T04 |
| WB62 delivery-only files already on main | Inventory all WB62-owned paths and remove every non-reusable item only in the post-verification reset/upgrade PR after exact PR #64/#65 evidence validation |
| Working whiteboard | Preserve this amendment through PR #65 target verification; reset to the neutral tracked `EMPTY` entry point in the reset PR |
| U64 runtime result | PR #65 preserves the current v4 pin; after its exact merge SHA exists, a separately reviewed reset/upgrade PR performs the one-time v5 cutover, then the owned machine runtime is cleaned and regenerated at that pin |
| Existing WB38 history | No change in this migration |

## Risks and validation

| Risk | Required protection |
| --- | --- |
| PR summary omits a material decision | Mandatory table-first evidence contract and human gate completeness check |
| Mutable/deleted PR evidence loses exact identity | Validate URLs and body digests before reset; retain one fixed-size locator/digest in manifest history; stop and open a gap if evidence is unavailable |
| Reset removes one-time adoption or reusable output | Complete classification inventory distinguishes adoption/reusable outputs from delivery-only state; uncertain ownership fails closed for the affected item |
| Agent resets before merge is proven | Create reset PR only after exact target verification; failed probes preserve tracked state and block reset |
| Existing archive consumers break | Audit README, policies, skills, templates, lifecycle checker and tests as one coherent change |

## Discussion log

| Round | Decision / new information | State |
| --- | --- | --- |
| 1 | Owner rejected permanent feature archives because GitHub PR is the evidence owner and requested reset after delivery | ACCEPTED_DIRECTION |
| 1 | Preserve adoption/runtime routing and reusable delivered work; reset delivery-specific working/evidence artifacts | PROPOSED_DETAIL |
| 1 | Apply the new behavior to current WB62; leave older WB38 history untouched without separate deletion authority | SAFE_MIGRATION_DEFAULT |
| 2 | For an already-v5 project, use a separately scoped reset PR after feature target verification; feature-PR acceptance may pre-authorize its exact enumerated mechanical merge path | PROPOSED_DETAIL |
| 2 | Preserve v2–v4 behavior; introduce opt-in v5 and migrate only at a reviewed safe checkpoint | PROPOSED_DETAIL |
| 2 | Use pre-acceptance review, post-decision acceptance and post-merge target tables plus body digests and a non-self-referential fixed-size manifest locator | PROPOSED_DETAIL |
| 3 | Preserve the exact-SHA upgrade gate: current self-adoption needs one post-PR65 exact-SHA reset/upgrade acceptance; later v5 feature resets do not | PROPOSED_DETAIL |
| 4 | Owner clarified that reset covers the machine runtime, neutral working whiteboard and every current-delivery item that cannot be reused; reusable adoption controls and delivered outputs remain | ACCEPTED_DIRECTION |

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
| R2-F01 | Main is DELIVERY_ACTIVE/IMPLEMENTING; retain the branch's reconciled `cd6d8ba` VALIDATING checkpoint, withdraw only its unmerged terminal child and use the allowed return transition | PENDING_R02_REVIEW |

R02 retained reviewers requested bounded corrections on exact candidate
`90457879f57d4a9cc8a71715a08fb3684565eccb`.

| Finding | Consolidated correction | State |
| --- | --- | --- |
| R02-R1-F05 / R2-F07 | Make the manifest locator non-self-referential: feature PR/merge, reset PR/reviewed head and pre-reset bundle digest only; final reset merge/result stays on feature PR | PENDING_R03_REVIEW |
| R02-R1-F06 / R2-F01 | Correct main to DELIVERY_ACTIVE/IMPLEMENTING and name `cd6d8ba` as the branch's reconciled VALIDATING checkpoint; withdraw only unmerged `5c89469` | PENDING_R03_REVIEW |
| R02-R1-F07 | Replace stale one-PR/final-candidate wording with one semantic feature PR plus one bounded reset PR | PENDING_R03_REVIEW |
| R02-R1-F08 / R2-F09 | Map self-review, publication, workflow, package and CI consumers; assign the GitHub-aware command/action and read-only permissions | PENDING_R03_REVIEW |
| R2-F06 | Split pre-owner `sdd-pr-review/v1` from post-decision `sdd-pr-acceptance/v1` to remove circular evidence | PENDING_R03_REVIEW |
| R2-F08 | Define current self-adoption: explicit v4 amendment and exact v5 cutover inside the post-verification reset PR | PENDING_R03_REVIEW |

R03 R1 approved exact candidate
`ceabcd90c746bf5aef4c779fcbec162be1c54a9e`; retained R2 requested three
bounded corrections.

| Finding | Consolidated correction | State |
| --- | --- | --- |
| R2-F10 | Keep PR #65 on the current v4 pin; after merge, review the exact new SHA and combine its explicit human-approved upgrade with the current reset PR | PENDING_R04_REVIEW |
| R2-F11 | Map v2, v3 and current v4 schema files; introduce explicit v4/v5 dispatch and regression coverage rather than claiming no config exists | PENDING_R04_REVIEW |
| R2-F12 | Require an enumerated repository-relative reset inventory and exact retained replacement bytes/blobs; classes describe intent only | PENDING_R04_REVIEW |

Both retained reviewers approved exact R05 candidate
`49273873fa3c85019be38425cbde2e74ce1081d3`. The owner's later clarification
expanded the reset boundary to every non-reusable current-delivery item and
explicit machine-runtime regeneration, so those approvals remain historical
evidence and do not approve the revised candidate. R06 review is required.

## Option and lifecycle conclusion

| Option | Result | Reason |
| --- | --- | --- |
| Keep permanent repository archives | REJECTED | Duplicates PR/Git history and preserves large per-feature payloads |
| Delete feature records without replacement evidence | REJECTED | Loses decisions, review identity and verification needed for stable outcomes |
| PR-owned evidence plus post-verification reset PR | PREFERRED | Keeps exact audit evidence, preserves state on failed target probes and removes completed feature state with review proportional to whether the project is already on v5 |

The feature branch may use working whiteboard, workflow, plan and evidence files
while the delivery is active. By the final feature-PR review, their material
decisions and results must be published in the versioned PR evidence. For an
already-v5 delivery, the two reviewers and owner review the reusable feature
result and exact reset plan once; after merge, target probes verify the result
while tracked working state still exists, and only then does the bounded reset
PR remove it. The current v4-to-v5 bootstrap instead uses the separate exact-SHA
review and human cutover sequence above.

The playbook should prefer ignored runtime working state when practical, but
must not require one storage mechanism. Branch-local tracked state is also
acceptable when the later reset-PR candidate removes it and PR evidence remains
complete.
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
| Current self-adoption records | Keep the v4 pin through PR #65; then use the separately reviewed exact-SHA reset/upgrade PR to apply the complete WB62 disposition inventory, activate v5, restore the stable whiteboard to `EMPTY`, and regenerate the machine runtime |

## Implementation task mapping

| Task | Brief work | Completion signal |
| --- | --- | --- |
| T02 — Closure contract | Update canonical docs, diagrams, skills, templates and PR evidence schema to make the feature PR the semantic owner and define classification, repository reset, runtime regeneration and neutral-whiteboard outcomes | All consumers state the same evidence, sequencing, reuse boundary and authority outcome without copied archive rules |
| T03 — Enforcement and compatibility | Add GitHub-aware evidence verification; update local v5 lifecycle validation and reset-inventory regressions while preserving v2–v4 | Positive/negative API fixtures, schema compatibility, remove/reset/keep classification and failure-boundary scenarios pass |
| T04 — Current-project migration | Withdraw the unmerged terminal controls, keep the v4 pin, remove only unmerged archive additions in PR #65, and publish the complete WB62 disposition inventory; after PR #65 target verification, prepare one exact-SHA reset/upgrade PR for normal upgrade review | PR #65 merges reusable v5 behavior with WB62 state preserved; the later human-approved reset/upgrade PR pins the exact v5 merge, removes all non-reusable WB62 state, restores EMPTY and regenerates runtime without touching WB38 |

T02–T04 form PR #65 plus one later combined reset/upgrade PR. PR #65 receives
one final full semantic review. Because this repository starts on v4, the later
candidate receives migration validation, two independent reviews on its exact
head and fresh human cutover acceptance before changing the pin or resetting
WB62. Only future deliveries after that v5 cutover may use bounded delta
verification for an exactly pre-authorized reset. Intermediate task checks do
not create separate two-agent review gates unless a material design mismatch or
missing authority is discovered.

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
| Current WB62 | Main is workflow `DELIVERY_ACTIVE` / plan `IMPLEMENTING`; PR #65 already reconciled T01 at `cd6d8ba` to `VALIDATING`. The owner amendment withdraws only unmerged terminal child `5c89469`, then uses the allowed `VALIDATING -> DELIVERY_ACTIVE` / `VALIDATING -> IMPLEMENTING` return for T02–T04 |
| Current self-adoption cutover | PR #65 owner acceptance approves only the v4 closure amendment and exact reset inventory. After feature target verification reveals the immutable merge SHA, prepare the combined reset/upgrade PR, run migration validation, obtain two exact-head reviews and human cutover acceptance, then update the manifest pin, regenerate/validate runtime and apply the enumerated reset. This one-time bootstrap cannot reuse relational preapproval |
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
| New `scripts/verify-pr-evidence.mjs` | Query GitHub at the reset gate and verify versioned evidence objects, body digests, revisions, checks and authority | T03 | Mocked API positive/negative, pagination, mutation and unavailable-evidence tests |
| Documentation, lifecycle, installer and publication tests | Replace archive-only assertions; retain old-schema compatibility | T03 | Full suite plus API replay/idempotency tests |
| Maintained batched/adoption examples | Update one v5 example; label older examples historical/no-impact where retained | T02 | Example links and documented expected output |
| `templates/reviews/agent-self-review.md` and `scripts/review-publication.mjs` | Publish exact self-review/body digests and retain literal reviewer findings without local ledger duplication | T02/T03 | Deterministic publication/replay and edited-body digest mismatch tests |
| `.github/workflows/documentation-quality.yml` and `package.json` | Add the canonical reset-evidence check with read-only pull-request/check/content permissions and an explicit script entry point | T03 | Workflow wiring assertion plus mocked GitHub API positive/negative runs |
| `config/sdd-lifecycle-schema-v2.json`, `config/sdd-lifecycle-schema-v3.json`, current v4 `config/sdd-lifecycle-schema.json`, and `scripts/sdd-lifecycle.mjs` dispatch | Preserve v2/v3; retain the current schema as explicit v4 compatibility input; add a v5/default schema and validate v5 local fields, locator and reset inventory | T03 | Exact v2–v5 dispatch plus positive/negative compatibility tests |
| Project registry, trigger, manifest, WB62 paths/reviews/U64, machine runtime and archive index | Keep adoption controls; classify every WB62-owned item; remove non-reusable state, restore `EMPTY`, and regenerate runtime only through the reviewed current-project v5 cutover | T04 | Complete remove/reset/keep inventory, PR evidence verifier, regenerated runtime CURRENT and WB38 no-impact check |

## Conclusion readiness

| Check | Result |
| --- | --- |
| Owner direction | GitHub PR owns delivery evidence; permanent feature archive rejected |
| Required boundaries | Adoption and reusable work remain; all non-reusable current-delivery state is removed, runtime and whiteboard are reset, and review/quality/authority controls remain unchanged |
| Current migration | PR #65 preserves v4/WB62 through target verification; one exact-SHA reviewed reset/upgrade PR activates v5, applies the complete WB62 disposition inventory, restores `EMPTY`, and regenerates runtime; historical WB38 remains untouched |
| Open product/design decisions | None |
| Remaining work | Independent conclusion review, owner acceptance, plan update and implementation |
