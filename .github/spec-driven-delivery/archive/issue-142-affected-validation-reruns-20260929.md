# Delivery archive — affected validation reruns (#142)

<!-- sdd: delivery-archive -->

| Field | Value |
| --- | --- |
| Issues | [#142](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/142) |
| Closing pull request | [#143](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/143) |

<!-- sdd: archived-whiteboard -->

## Solution whiteboard — affected validation reruns (#142)

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [#142](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/142) |
| Owner | Repository owner |
| Concluded design revision | `8cd91fc688f81965d73f6517b6709a96fae3881a` |
| Open owner decisions | `None` |

### Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| DR01 | After any final-candidate correction, only a gate whose inputs changed loses its prior full-validation result. | Changed |
| DR02 | Gate inputs include exercised product code, runner, dependencies, fixtures, configuration, and environment; uncertain overlap requires full validation. | Changed |
| DR03 | A failed gate stays red until a reviewed candidate passes it; prior failure evidence stays visible. | Accepted |
| DR04 | Define the rule once in the quality policy; other Guide surfaces point to it. Record reused evidence and reviewer agreement without adding a new classification tool. Project policy may be stricter. | Changed |

### Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem | Current Guide wording invalidates all full validation after every final-candidate correction, even where some gates' inputs are demonstrably unchanged. |
| Required outcome | Rerun each gate whose inputs changed. Reuse an unaffected passed gate only when its prior exact head and unchanged-input rationale are recorded and both retained reviewers confirm the mapping. |
| In scope | One canonical Guide rule, linked contributor/README/skill guidance, PR evidence state reused from &lt;sha&gt;, explanatory example and counterexample, and contract checks. |
| Out of scope | Repairing #442's MinIO dependency, turning its red gate green, or changing project policy in this upstream delivery; project #451 owns synchronization. |

### Authority and context

| Source | Authority or relevant content | Freshness / verification |
| --- | --- | --- |
| Repository owner decision | Adopt rewritten #142 scope: any final-candidate correction uses affected-gate input analysis; adjust Guide, then project policy. | Explicit 2026-09-29 conversation decision after reviewing [#142](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/142) |
| [Issue #142](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/142) | Defines desired rule, evidence state, example/counterexample, canonical ownership, and exclusions. | Read from GitHub issue page on 2026-09-29 |
| [Contributing](../../../CONTRIBUTING.md), [quality policy](../../../docs/documentation-quality-policy.md), [workflow skill](../../../skills/sdd-project-workflow/SKILL.md), [README](../../../README.md) | Current exact-candidate review and final-validation rules. | Read at accepted `b3f13badb6e8b828f4185e6116939d51b5d3faeb` baseline |
| [Error handling](../../../docs/error-handling.md) | Preserve failures and recover proportionally; do not restart unaffected work. | Read at baseline |

### Requirements and acceptance

| ID | Need or requirement | Priority | Acceptance signal | Source |
| --- | --- | --- | --- | --- |
| R01 | Apply input-based invalidation to every final-candidate correction. | Must | Changed and unchanged gate inputs yield the corresponding rerun or reuse outcome. | Revised #142; owner decision |
| R02 | Include exercised product code, runner, dependencies, fixtures, configuration, and environment in the gate-input assessment. | Must | Changed gates rerun completely; uncertain overlap triggers full validation. | Revised #142 |
| R03 | Record the prior exact head and unchanged-input rationale for every reused pass; both retained reviewers confirm the mapping. Preserve failed evidence, required gates, and human authority. | Must | Human brief distinguishes passed, failed, unrun, and reused from &lt;sha&gt;; a failed gate stays red until its own rerun passes. | Revised #142; current Guide authorities |
| R04 | Define the rule only in the quality policy; link or point to it elsewhere and update relevant tests. Project policy may be stricter. | Must | Example/counterexample present; `npm run docs:all` passes. | Revised #142; contribution/quality policies |

### Options, experiments, and tradeoffs

| ID | Option | Benefit | Cost / risk | Disposition |
| --- | --- | --- | --- | --- |
| O01 | Rerun all gates after every candidate byte change. | Simple. | Repeats gates whose inputs did not change. | Rejected by revised #142 and owner decision. |
| O02 | Reuse all previous passes for any correction. | Fast. | Can hide changed product code, fixtures, contracts, or shared dependencies. | Rejected as unsafe. |
| O03 | Invalidate per gate input, with reviewed evidence for each reused pass. | Removes unnecessary reruns while preserving required gate outcomes. | Requires a concise impact rationale in PR evidence. | Selected. |

### Decision log

| ID | Decision | Rationale / tradeoff | Owner / evidence |
| --- | --- | --- | --- |
| D01 | Any final-candidate correction invalidates each full-validation result whose gate inputs it changes. Gate inputs are exercised product code, runner, dependencies, fixtures, configuration, and environment. | Replaces blanket invalidation with the revised #142 scope. | Revised #142; owner decision |
| D02 | Rerun every gate with changed inputs in full. An unaffected passed gate may be reused only when the PR records its prior exact head and unchanged-input rationale and both retained reviewers confirm the mapping. If overlap is uncertain, rerun full validation. | Prevents stale evidence and hidden coupling without a new classification tool. | R02–R03; revised #142 |
| D03 | Keep original failure evidence, exact-candidate focused checks and both reviewers, required hosted status for the final SHA, and human merge authority. A failed gate stays red until its own rerun passes; the human brief distinguishes passed, failed, unrun, and reused from &lt;sha&gt;. | Prevents green hunting and false merge readiness. | R03; revised #142 |
| D04 | Own the rule in the quality policy alone. Link or point to it from the workflow skill, Contributing, and README; revise the README flowchart if needed and update document-model tests. Include one example and counterexample. Leave downstream adoption to #451 and allow stricter project policy. | Prevents authority drift and preserves project ownership. | R04; revised #142 |

### Concluded design candidate

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| D01 | Per-gate input invalidation for any correction. | Exercised product code and test execution inputs define impact. | Documentation contract cases for product and validation changes. |
| D02 | Full rerun of changed-input gates; reviewer-confirmed, exact-head-evidenced reuse of unaffected passed gates. | Uncertain overlap triggers full validation. | Example: a test-only service image used by one integration gate changes; that gate reruns while unrelated gates retain passes. Counterexample: a shared container or fixture changes and every consumer reruns, or full validation runs if consumers are unclear. |
| D03 | Failure history, focused checks, reviews, hosted exact-SHA checks, human merge authority, and visible reused from &lt;sha&gt; evidence remain binding. | No status laundering or implied approval. | Failure/recovery examples and tests. |
| D04 | One canonical quality-policy rule; other Guide surfaces point to it, and project authority may be stricter. | #451 is separate downstream delivery. | `npm run docs:all` and semantic review. |

### Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| DR01 | D01, D02 | Changed | Owner accepted broader revised #142 after the initial narrow design review. |
| DR02 | D01, D02 | Changed | Includes product code and mandates full validation when impact overlap is unclear. |
| DR03 | D03 | Accepted | Failure remains visible and binding. |
| DR04 | D03, D04 | Changed | One canonical rule and explicit reuse evidence avoid duplicated policy. |

### Newly introduced fail-closed behaviors

| ID | Trigger | Required fail-closed response | Concrete example | Impact | Recovery / best next action | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- |
| FC01 | Input overlap is uncertain after a final-candidate correction. | Do not reuse old passes; keep final readiness blocked until full validation runs. | A shared test container changes and its consumers are unclear, so an old E2E pass is not carried forward and the full validation runs. | Extra validation time, with no unproven pass claimed. | The author runs full applicable validation on the reviewed candidate and presents the results; if input ownership can be established before that run, both retained reviewers may confirm a narrower affected-gate mapping. | Approved |

### Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | D01–D04 define per-gate input invalidation for any final-candidate correction and preserve all required review and gate outcomes. | `HUMAN_DECISION` |
| Important boundaries | This does not repair #442, waive its red gate, or modify project #451 yet. | `DISCLOSE` |
| Alternatives rejected | Blanket full reruns and blanket reuse of old passes. | `DISCLOSE` |
| Remaining gaps or risks | Shared dependencies require case-specific evidence; uncertain overlap requires full validation. | `DISCLOSE` |
| Newly introduced fail-closed behavior | FC01: uncertain input overlap blocks reuse and triggers full applicable validation. | `HUMAN_DECISION` |
| Decision requested | After two independent approvals, owner accepts D01–D04 and FC01 before conclusion. | `HUMAN_DECISION` |

<!-- sdd: archived-implementation-plan -->

## Implementation plan — affected validation reruns (#142)

<!-- sdd: implementation-plan -->

This file owns active delivery state. GitHub PR owns review, check, merge, and target evidence.

### Delivery status

| Field | Value |
| --- | --- |
| State | `COMPLETE` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | Human review before merge |
| Delivery branch / target | `codex/affected-validation-reruns` → `main` |
| Owner | Repository owner |
| Primary issue / need | [#142](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/142) |
| Concluded whiteboard | [Solution whiteboard](issue-142-affected-validation-reruns-20260929.md), accepted design `8cd91fc688f81965d73f6517b6709a96fae3881a`, conclusion `0d4589cdb5254cb064b6bf361aab555014c9230d` |
| Required reviewers | Two retained independent design reviewers A and B, through plan, task, final candidate, and merge |
| Last verified | 2026-09-29: owner authorized closure; draft [PR #143](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/143) created; T01 and exact implementation audit approved by both retained reviewers; final closing-candidate review and validation remain PR evidence |

### Governing inputs and boundaries

| Source | Authority / use |
| --- | --- |
| [Concluded whiteboard](issue-142-affected-validation-reruns-20260929.md) | D01–D04 and FC01 bind every addition; no whiteboard byte may change without prior owner authorization. |
| [Issue #142](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/142) | Desired observable rule, examples, and non-scope. |
| [Documentation quality policy](../../../docs/documentation-quality-policy.md) | Sole canonical owner of final-validation invalidation; documentation and test outcomes. |
| [Contributing](../../../CONTRIBUTING.md), [workflow skill](../../../skills/sdd-project-workflow/SKILL.md), [README](../../../README.md) | Existing review, branch, audit, human authority, and consuming guidance. |
| [Error handling](../../../docs/error-handling.md) | Preserve failures; recover proportionally without erasing evidence. |

| Concern | Accepted value |
| --- | --- |
| Required outcome | A final-candidate correction invalidates each gate whose exercised product code, runner, dependencies, fixtures, configuration, or environment changed. Every affected gate reruns completely. |
| Reuse boundary | A passed unaffected gate may carry forward only with prior exact SHA, unchanged-input rationale, and confirmation by both retained reviewers; uncertain overlap triggers full validation. |
| Failure boundary | Preserve failed evidence; a failed gate stays red until its own rerun passes. Final focused checks, exact-candidate review, hosted status, and human merge authority remain required. |
| Scope | Canonical policy statement; links or short pointers in consumers; README flowchart if needed; example/counterexample; reused from &lt;sha&gt; evidence wording; document-model tests. |
| Exclusions | No new input-classification tool or checklist, no #442 MinIO repair, no downstream project policy change in this branch. Project #451 follows its own upgrade and review. |
| Compatibility | The rule clarifies evidence reuse for future final candidates; adopting projects retain stricter policy authority. |
| Material assumptions | None unresolved; the owner explicitly accepted the rewritten #142 scope. |

### Functional and failure contracts

| ID | Trigger / precondition | Required behavior | Result / postcondition | Failure / recovery |
| --- | --- | --- | --- | --- |
| C01 | Final candidate changes after validation | Compare each required gate's inputs with its prior run. | Changed-input gates rerun in full; unaffected passes may be reused with prior SHA and rationale confirmed by both reviewers. | Uncertain overlap follows FC01. |
| C02 | Previously failed gate | Keep original failure and exact rerun evidence. | Gate remains red until its own full rerun passes on reviewed candidate. | Diagnose under error-handling policy; no green hunting. |
| C03 | Human brief or PR presents validation | Distinguish passed, failed, unrun, and reused from &lt;sha&gt;. | Reused evidence is visible and does not imply approval or satisfy current hosted SHA status. | Missing evidence blocks final readiness until author supplies it or reruns. |
| FC01 | Input overlap remains uncertain | Do not reuse old passes; run full applicable validation. | Final readiness resumes only after reviewed candidate's gates pass. | Author may first establish input ownership and obtain both reviewers' confirmation of a narrower mapping. |

### Test and acceptance inventory

| Owning task | Contract, changed outcome, or risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| T01 | D01–D02; changed versus unchanged inputs | `tests/document-model.test.mjs` positive and negative policy contracts, including product code and validation-only changes | Implemented | Focused task test |
| T01 | D02; uncertain overlap | Counterexample for shared container/global setup/common fixture; full validation when consumers unclear | Implemented | Focused task test |
| T01 | D03; failure and reuse evidence | Assert failed gate remains red, reviewer confirmation and reused from &lt;sha&gt; guidance, hosted final-SHA requirement | Implemented | Focused task test |
| T01 | D04; canonical ownership | Assert one normative rule in quality policy and noncontradictory pointers in workflow, Contributing, README | Implemented | Focused task test |
| T02 | Complete candidate | After exact implementation audit and authorized closure, run affected `npm run docs:focused -- BASE HEAD`, `npm run docs:sdd`, and `git diff --check` before both reviewers inspect the closing head. After their approval, run `npm ci --ignore-scripts` and `npm run docs:all`. | Pending | Focused checks before final review; full source gate after review |

### Delivery strategy and readiness

| Concern | This delivery |
| --- | --- |
| Integration model | Single self-contained PR from `codex/affected-validation-reruns` to `main`, per Contributing. |
| Increment boundary | T01 makes all policy consumers and tests consistent; T02 converges tracked delivery state and validates the final candidate. |
| Parallel ownership | None; retained reviewers work read-only. |
| Merge authority | Repository owner; no automatic merge. |
| Final audit | After implementation tasks complete and any required target synchronization, author and both retained reviewers audit exact implementation content before any missing final tests or final-gate runs. Closing document changes then receive affected focused checks before both reviewers inspect the exact closing candidate; complete validation follows their approval. |
| Closure authorization | The owner must explicitly authorize whiteboard reset and archive transition before T02 changes those tracked bytes. |

#### Pre-final implementation audit

| Concern | Evidence / state |
| --- | --- |
| Target synchronization | On 2026-09-29, `origin/main` still resolves to branch point `b3f13badb6e8b828f4185e6116939d51b5d3faeb`; no synchronization is required for mergeability. |
| Exact implementation content | `60509b6643b2eecffbdc94d4073b6c66c2708f5f` changes the quality policy, its three Guide consumers, README flowchart, and existing document-model test. The accepted manifest upgrade and frozen whiteboard are separate reviewed process state. |
| Author self-review | Approved: each policy/test addition traces to D01–D04 or FC01; existing policy, skill, contributor text, diagram, and test framework are reused; no new classifier, redundant rule, project-specific repair, or unnecessary abstraction. |
| Retained reviewer audit | Both A and B approved exact implementation content `60509b6643b2eecffbdc94d4073b6c66c2708f5f` with no findings; plan-only audit record `c70cd4d2fb37c989041c4a2fb817289b7c9ae289` did not change those bytes. |
| Missing test inventory | T01 contract cases cover the accepted rule, failure and uncertainty boundary, pointers, and diagram; no known missing final-test addition. |

#### Proposed closing transition for owner authorization

| Tracked target | Intended change | Ownership / guard |
| --- | --- | --- |
| `.github/spec-driven-delivery/archive/issue-142-affected-validation-reruns-20260929.md` | Create one combined archive containing the complete concluded whiteboard and completed implementation plan, with #142 and the actual closing PR cross-linked. | New owned archive; retain all source sections and lifecycle markers. |
| `.github/spec-driven-delivery/solution-whiteboard.md` | Reset to neutral `EMPTY` whiteboard after the complete archive exists. | Frozen design; requires prior explicit owner authorization for this exact reset. |
| `.github/spec-driven-delivery/implementation-plan.md` | Remove live plan only after its complete state is embedded in the archive. | Owned live task state; history retained in archive and PR. |

No branch merge or target verification is part of this authorization. GitHub credentials must be restored before the closing PR link can be written and the candidate can be reviewed.

### Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| D01 | T01: input-based invalidation for any correction | Positive/negative document-model cases | Aligned |
| D02 | T01: complete affected reruns, reviewed reuse, uncertain full fallback | Example/counterexample and contract test | Aligned |
| D03 | T01: failure/review/status preservation and reuse evidence state | Contract test and semantic review | Aligned |
| D04 | T01: quality policy owner and consumer pointers; T02: full validation | Canonical wording checks and `docs:all` | Aligned |
| FC01 | T01: uncertain-overlap response and recovery | Counterexample and review | Aligned |

### Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | `DONE` | `None` | Implement D01–D04 and FC01 in canonical guidance and contract tests. | No project-specific MinIO repair or new classifier. | Focused docs contract tests and `docs:sdd`. | `codex/affected-validation-reruns`; single PR; `main` |
| T02 | `DONE` | `T01` | Converge archive/plan/whiteboard candidate for exact-head review and full applicable Guide validation. | Owner authorized closure; no merge without owner authority. | Exact implementation audit approved; closing-candidate focused checks before reviewers, `docs:all` after their approval, with live results owned by PR #143. | `codex/affected-validation-reruns`; [PR #143](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/143); `main` |

### Task specifications and context receipts

#### T01 — policy and consumers

| Concern | Value |
| --- | --- |
| Outcome / non-scope | One quality-policy rule with consistent pointers, examples, evidence wording, and focused contract checks; excludes #442 and #451 code. |
| Source boundary | `docs/documentation-quality-policy.md`, `skills/sdd-project-workflow/SKILL.md`, `CONTRIBUTING.md`, `README.md`, `tests/document-model.test.mjs`. |
| Consumed dependencies | Concluded D01–D04/FC01; current canonical authorities listed above. |
| Critical obligations | Preserve exact-candidate review, all required gates, original failed evidence, project stricter policy. |
| Required evidence | Focused tests before retained reviewer inspection; tracked wording and examples match issue. |
| Actual result | `60509b6`: canonical policy, consumer pointers, README flowchart, and document-model contract implemented; focused checks passed and both retained reviewers approved. |

#### T02 — final candidate and closure

| Concern | Value |
| --- | --- |
| Outcome / non-scope | Merge-ready tracked state and complete exact-head evidence; merge remains an owner decision. |
| Source boundary | Existing whiteboard/plan/archive lifecycle and PR evidence. |
| Consumed dependencies | T01 DONE, owner closure authorization, exact implementation audit. |
| Required evidence | Affected focused command, SDD lifecycle, and diff check before both retained reviewers inspect the closing candidate; `npm run docs:all` after their approval. Disclose any failed or unrun check. |
| Actual result | Owner authorized closing transition; [PR #143](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/143) supplies the archive cross-link. Combined archive, neutral whiteboard, and plan removal are in the closing candidate. Exact final checks and reviewer outcomes remain live PR evidence. |

### Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | D01–D04/FC01 mapped through T01/T02 | T01 content `60509b6` and combined archive in [PR #143](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/143). |
| Applicable validation passed | Focused task checks then complete final source gate | Focused task checks passed; closing-candidate and complete source gate outcomes are pending in PR #143, without a pass claim here. |
| Canonical state converged | Archive, whiteboard reset, and plan removal after explicit owner authorization | Authorized closing candidate contains these three transitions. |
| PR-owned delivery | Exact reviews, checks, human merge decision, target verification in PR | [Draft PR #143](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/143) owns pending review, final validation, merge decision, and target proof. |

### Planned versus actual outcome

| Design / task | Planned result | Actual evidence or deviation | Remaining obligation / owner |
| --- | --- | --- | --- |
| D01–D04, FC01 / T01 | Canonical per-gate rule, consistent pointers, and document-model proof. | `60509b6`; focused document-model 20/20, Mermaid, SDD checks passed; both reviewers approved T01 and exact-content audit. | None for T01. |
| T02 | Complete combined archive and neutral live state, exact closing review and applicable validation. | Owner authorized closure; draft PR #143 created; combined archive, neutral whiteboard, and plan removal are the closing candidate. | Both reviewers and complete final checks remain PR evidence; owner decides merge. |

### Cleanup inventory

| Item | Keep, archive, remove, or reset | Ownership and evidence | Result |
| --- | --- | --- | --- |
| `.github/spec-driven-delivery/archive/issue-142-affected-validation-reruns-20260929.md` | Create and keep | Owned combined archive of complete accepted whiteboard and final plan; #142 and PR #143 cross-links. | In closing candidate. |
| `.github/spec-driven-delivery/solution-whiteboard.md` | Reset to `EMPTY` | Owner explicitly authorized #142 closing transition on 2026-09-29. | In closing candidate after complete archive. |
| `.github/spec-driven-delivery/implementation-plan.md` | Remove after archive | Owned live plan; archive retains all sections and task outcomes. | In closing candidate after complete archive. |
| Delivery worktree and branch | Retire only after owner-authorized merge and exact target verification | Reversible/local ownership; preserve while PR is open. | Pending. |

### Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and outcomes | T01 implements policy and tests; T02 constructs the closing candidate; PR #143 owns final review and validation. | `DISCLOSE` |
| Design consistency | D01–D04 and FC01 are fully mapped; no extra behavior planned. | `DISCLOSE` |
| Important boundaries | One canonical quality-policy rule; prior failures stay red; project #451 remains separate. | `DISCLOSE` |
| Validation | Focused task checks passed; closing-candidate focused checks, both final reviews, and complete Guide source gate remain PR obligations. | `DISCLOSE` |
| Risks or open decisions | No unresolved design decision; owner merge authority remains. | `DISCLOSE` |
| Decision requested | None for this archived plan; draft PR #143 carries the later merge decision. | `NONE` |
