# Delivery archive — Fail-closed recovery action

<!-- sdd: delivery-archive -->

| Field | Value |
| --- | --- |
| Issues | [#135](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/135) |
| Closing pull request | [#136](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/136) |

<!-- sdd: archived-whiteboard -->

## Solution Whiteboard — Fail-closed recovery action

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [#135](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/135) |
| Owner | Repository owner |
| Concluded design revision | `WB-135-1` |
| Open owner decisions | `None` |

### Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| `DR01` | A fail-closed behavior is hard to judge when the table explains only the stop and its impact, not the safest way to recover. | accepted |
| `DR02` | Add one dedicated recovery column rather than embedding recovery ambiguously in the concrete example. | accepted |
| `DR03` | The recovery entry must identify the smallest safe action, responsible actor, and retry or resume condition. | accepted |
| `DR04` | Preserve agent discretion: require an actionable outcome, not one prescribed implementation method. | accepted |
| `DR05` | Keep one canonical table and concise consuming guidance; do not duplicate a new policy section. | accepted |
| `DR06` | Automated validation can prove structure and presence; authors and reviewers must judge semantic actionability and proportionality. The human brief must preserve the reviewed recovery information. | accepted |

### Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem / observed need | The current fail-closed table contains trigger, stopped response, example, impact, and disposition, while recovery is only optional prose inside the example. |
| Required outcome | Every material fail-closed row exposes the safest next action after the stop so the owner can judge proportionality and operational usability. |
| In scope | Whiteboard template, accepted-design policy, author/reviewer skills, lifecycle validation, reader guidance, and focused regressions. |
| Out of scope / deferred | Automatic remediation, project-specific recovery algorithms, enumerating every error case, or rewriting historical archives. |
| Confidence | High; the owner selected the missing decision field and the current canonical table is identified. |

### Authority and context

| Source | Authority or relevant content | Freshness / verification |
| --- | --- | --- |
| Owner decision in Issue #135 discussion | Add a column describing the best action after fail-close to repair or recover from the failure. | Current |
| [Documentation quality policy](../../../docs/documentation-quality-policy.md) | Owns accepted-design authority and human brief outcomes. | Current at `714c9391839f3073b6c26f7a65b0b5933278a708` |
| [Error handling](../../../docs/error-handling.md) | Owns invariant protection, simple fail-closed behavior, retry, and escalation. | Current at `714c9391839f3073b6c26f7a65b0b5933278a708` |
| [Whiteboard template](../../../templates/discovery/solution-whiteboard.md) | Owns the reusable fail-closed disposition table. | Current at `714c9391839f3073b6c26f7a65b0b5933278a708` |

### Requirements and acceptance

| ID | Need or requirement | Priority | Acceptance signal | Source |
| --- | --- | --- | --- | --- |
| `R01` | Add `Recovery / best next action` to the fail-closed approval table without removing existing fields. | Required | Template and examples expose the column. | Owner |
| `R02` | Each material row states the smallest safe recovery action, responsible actor, and retry or resume condition. | Required | Policy, author skill, reviewer skill, and validation agree. | Owner / error-handling authority |
| `R03` | The human response preserves the recovery information and cites both reviewers' exact-candidate approval of it. | Required | Human-brief guidance explicitly requires it and blocks an incomplete owner request. | Owner |
| `R04` | Automated validation rejects a missing column or blank/`None` material recovery; authors and reviewers judge action, actor, safe resume, and proportionality. | Required | Structural negative regressions and semantic review enforce their respective boundaries. | Stable outcome |
| `R05` | Guidance remains concise and outcome-based. | Required | No new document or prescriptive recovery workflow is added. | Six goals |

### Options, experiments, and tradeoffs

| ID | Option or experiment | Benefits | Costs / risks | Evidence needed | Disposition |
| --- | --- | --- | --- | --- | --- |
| `O01` | Keep recovery inside `Concrete example`. | No schema change. | Recovery remains optional and difficult to compare across rows. | Existing template inspection. | rejected |
| `O02` | Add `Recovery / best next action`. | Separates explanation from the action needed to restore progress. | One additional concise column. | Cross-document consistency and negative validation. | accepted |
| `O03` | Add a separate recovery document or workflow. | More space for detail. | Duplicates error-handling authority and over-engineers a review field. | None. | rejected |

### Decision log

| ID | Decision | Material alternatives | Rationale / tradeoff | Owner / evidence |
| --- | --- | --- | --- | --- |
| `D01` | Add a dedicated `Recovery / best next action` column after `Impact`. | `O01`, `O03` | Makes recovery independently reviewable with the smallest schema change. | Owner / `O02` |
| `D02` | Require action, actor, and retry/resume condition, or an explicit human-decision boundary. | Free-form advice. | Produces operationally useful information without prescribing implementation. | Owner / error-handling authority |
| `D03` | Enforce the column only for prospective concluded whiteboards and preserve historical archives. | Rewrite history. | Keeps current guidance correct without altering accepted evidence. | Compatibility boundary |
| `D04` | Automation checks column presence and nonblank/non-`None` material values; authors and reviewers assess action, actor, safe resume, and proportionality. | Free-text semantic heuristics. | Separates deterministic structure from contextual engineering judgment. | Owner / reviewers |
| `D05` | An owner-decision request that drops reviewed recovery information is incomplete and must be corrected before the human gate. | Treat the whiteboard as sufficient even when the brief omits the field. | The human is not expected to reconstruct missing information from the document. | Owner |

### Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `WB135-01` | Every new fail-closed behavior has a distinct `Recovery / best next action`. | Keep trigger, required response, concrete example, impact, and disposition unchanged. | Template and reader guidance agree. |
| `WB135-02` | Recovery identifies the smallest safe action, responsible actor, and condition for retry or resume; otherwise it names the required human decision. | Outcome-based wording preserves project-specific judgment. | Authors and reviewers approve semantic sufficiency and proportionality. |
| `WB135-03` | The parent human response includes the recovery field and both exact-candidate reviewer dispositions. | The example remains explanatory and cannot expand the behavior. | Workflow and reviewer contracts block an incomplete human gate. |
| `WB135-04` | A prospective conclusion without the column or with blank/`None` material recovery is structurally invalid; semantic insufficiency blocks author/reviewer approval. | Historical archives remain unchanged; automation does not interpret free-form prose. | Lifecycle validation and review each enforce their bounded responsibility. |

### Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| `DR01` | `WB135-01`, `WB135-02` | accepted | Recovery becomes independently visible and actionable. |
| `DR02` | `WB135-01` | accepted | A dedicated column avoids ambiguity. |
| `DR03` | `WB135-02` | accepted | The minimum operational fields are explicit. |
| `DR04` | `WB135-02` | accepted | Only the outcome is fixed; the safe method remains contextual. |
| `DR05` | `WB135-03`, `WB135-04` | accepted | Existing canonical surfaces carry the rule without a new artifact. |
| `DR06` | `WB135-02`, `WB135-03`, `WB135-04` | accepted | Structure, semantic review, and human presentation have distinct enforcement boundaries. |

### Newly introduced fail-closed behaviors

| ID | Trigger | Required fail-closed response | Concrete example | Impact | Recovery / best next action | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- |
| `FC01` | A prospective concluded whiteboard lacks the recovery column, has blank/`None` material recovery, has recovery the author or reviewers judge semantically insufficient, or the parent human brief drops the reviewed recovery information or reviewer dispositions. | Block conclusion, reviewer approval, or the human decision request at the boundary that detects the omission; do not begin dependent planning. | A conflict rejection names no responsible actor or retry condition, or the whiteboard contains them but the parent brief omits them; the applicable gate stops instead of asking the owner to infer recovery. | Adds one explicit design field and prevents approval of an operationally incomplete or incompletely presented stop boundary. | For a candidate gap, the author adds the smallest safe action, actor, and retry/resume condition (or required human decision), reruns validation, and returns it to the same reviewers. For a brief-only omission, the parent corrects and re-presents the exact reviewer-approved information with links to both approvals; repeat candidate review only if bytes or meaning change. | Approved by owner on 2026-09-28 |

### Design amendments

| Amendment | Changed design points | Reason and impact | Owner decision |
| --- | --- | --- | --- |
| `None` | `None` | Initial candidate. | `None` |

### Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | Add one recovery column; require action, actor, and retry/resume condition; separate structural automation from semantic review; preserve historical archives. | `HUMAN_DECISION` |
| Important boundaries | Examples stay explanatory; recovery cannot expand scope or prescribe one implementation method. | `DISCLOSE` |
| Alternatives rejected | Optional recovery inside examples and a separate recovery artifact. | `DISCLOSE` |
| Remaining gaps or risks | None identified before independent design review. | `NONE` |
| Newly introduced fail-closed behavior | `FC01`: incomplete recovery structure, semantics, or human-brief presentation blocks the applicable gate; candidate gaps repeat validation/review, while brief-only omissions are corrected against unchanged reviewer-approved evidence. | `HUMAN_DECISION` |
| Decision requested | After both reviewers approve, accept `WB-135-1` and `FC01` so planning may begin. | `HUMAN_DECISION` |

<!-- sdd: archived-implementation-plan -->

## Implementation Plan — Fail-closed recovery action

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority.

### Delivery status

| Field | Value |
| --- | --- |
| State | `COMPLETE` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | Human review before merge |
| Delivery branch / target | `codex/issue-135-fail-close-recovery` → `main` |
| Owner | Repository owner |
| Primary issue / need | [#135](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/135) |
| Concluded whiteboard | [Archived whiteboard](#solution-whiteboard--fail-closed-recovery-action), `WB-135-1`, frozen at `84ebf9b49ff9a462db4c8cd33029fa80ab4792e5` |
| Required reviewers | Retained reviewer seats 1 and 2 from design through merge |
| Last verified | Exact implementation and final test-only candidates approved by both retained reviewers; 59/59 full source tests and all documentation/runtime gates passed on 2026-09-28 |

### Governing inputs and delivery boundaries

#### Source hierarchy

| Priority | Source | Authority / use |
| --- | --- | --- |
| 1 | Owner approval of `WB-135-1` and `FC01` | Required outcome and fail-closed authority |
| 2 | Frozen [archived whiteboard](#solution-whiteboard--fail-closed-recovery-action) | Exact scope, compatibility, and validation boundaries |
| 3 | [Documentation quality policy](../../../docs/documentation-quality-policy.md) and [error handling](../../../docs/error-handling.md) | Canonical review, human brief, and recovery principles |
| 4 | Repository implementation and tests | Existing mechanisms to reuse and extend |

#### Outcome, scope, and assumptions

| Concern | Accepted value |
| --- | --- |
| Problem | Fail-closed approval exposes the stop and impact but not a separately reviewable safest recovery action. |
| Required outcome | Every prospective material fail-closed row and its human brief expose the smallest safe action, actor, and retry/resume condition or required human decision. |
| In scope | Whiteboard template, canonical policy, workflow/reviewer skills, README explanation, lifecycle checker, and focused regressions. |
| Out of scope / deferred | Automatic remediation, project-specific recovery design, speculative error enumeration, new documents, and historical archive rewrites. |
| Success measures | One canonical column; deterministic structural validation; semantic author/reviewer judgment; complete human presentation; all applicable checks pass. |
| Assumptions / constraints | Existing table parsing and retained reviewer workflow are reusable; concluded whiteboard bytes are frozen. |

#### Clarifications and gaps

| ID | Question or gap | Why it matters | Resolution / owner | State |
| --- | --- | --- | --- | --- |
| `G01` | Can automation judge semantic recovery quality? | Free-form heuristics would be brittle. | No. Automation checks structure/presence; author and reviewers judge semantics. | resolved |
| `G02` | Does a brief-only omission require candidate review again? | An unnecessary review loop would add overhead. | Parent re-presents unchanged approved information; repeat review only when candidate bytes or meaning change. | resolved |

### Test and acceptance contracts

| Owning task | Contract, changed outcome, or risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| `T01` | `WB135-01`: canonical recovery column exists | Document-model assertion and maintained-template fixture | implemented; focused tests passed | focused task work |
| `T01` | `WB135-02`: recovery names an action, actor, and safe retry/resume condition or human decision | Cross-document assertions plus author and reviewer semantic inspection | implemented; author and both reviewers approved | focused task work and exact-candidate review |
| `T01` | `WB135-03`: author, reviewer, and human-brief contracts agree | Cross-document assertions | implemented; focused tests passed | focused task work |
| `T01` | `WB135-04`: missing-column and blank/`None` material recovery fail structurally while historical archives remain valid and prose is not parsed semantically | Positive/negative lifecycle fixtures plus full repository suite | missing-column, blank, and `None` regressions passed; full source gate passed | focused implementation; full run at final gate |

### Proposed design

#### Components and responsibility boundaries

| Component | Owns | Must not own | Interfaces / dependencies |
| --- | --- | --- | --- |
| Whiteboard template | Canonical fail-closed table schema and field instructions | General error-handling policy | Policy and workflow skill |
| Documentation quality policy | Design/human-gate outcome and structural/semantic boundary | Duplicate table template | Template, skills, checker |
| Workflow and reviewer skills | Portable author/reviewer behavior and routing | A competing policy or recovery algorithm | Manifest authorities and reviewed whiteboard |
| Lifecycle checker | Deterministic column and nonblank/non-`None` validation | Semantic interpretation of recovery prose | Template schema and fixtures |
| README | Concise reader-facing explanation | Normative implementation details | Canonical policy and lifecycle diagram/text |

#### Key decisions

| ID | Decision | Alternatives | Rationale / tradeoff | Affected contracts |
| --- | --- | --- | --- | --- |
| `D01` | Add one `Recovery / best next action` column. | Embed recovery in example; new document. | Smallest independently reviewable representation. | `WB135-01` |
| `D02` | Require action, actor, and retry/resume condition or human decision. | Free-form generic advice. | Makes the stop operationally usable. | `WB135-02` |
| `D03` | Machine checks structure; humans check meaning. | Free-text heuristics. | Deterministic validation without false confidence. | `WB135-04` |
| `D04` | Preserve recovery in the parent brief with exact reviewer dispositions. | Require the owner to reread the whiteboard. | Supports informed approval at the actual gate. | `WB135-03`, `FC01` |

#### Compatibility, migration, and rollout

| Concern | Before / after compatibility | Migration or rollout | Rollback / recovery | Validation |
| --- | --- | --- | --- | --- |
| Prospective whiteboards | New concluded designs require the column and material value. | Updated template applies to future work. | Revert candidate before merge if design fails review. | Positive/negative lifecycle tests. |
| Historical archives | Existing accepted records remain evidence and are not rewritten. | None. | Not applicable. | Full lifecycle suite remains green. |
| Adopting projects | New managed skills/template revision take effect after accepted playbook upgrade. | Normal pinned upgrade. | Previous pin remains available. | Source tests here; project runtime validation downstream. |

#### Risks and mitigations

| ID | Scenario | Likelihood / impact | Prevention / detection | Owner | State |
| --- | --- | --- | --- | --- | --- |
| `K01` | Checker attempts to parse semantic quality. | Medium / brittle false confidence. | Check only presence and nonblank/non-`None`; semantic review stays human/agent-owned. | `T01` | controlled |
| `K02` | Recovery wording duplicates error-handling policy. | Medium / maintenance drift. | Keep schema instruction concise and link/use canonical policy concepts. | `T01` | controlled |
| `K03` | Human brief drops recovery detail. | Medium / uninformed approval. | Workflow/reviewer contract plus `FC01` blocks the human gate. | Parent agent/reviewers | controlled |

### Delivery strategy and readiness

| Concern | This delivery |
| --- | --- |
| Integration model | One coherent task and one PR targeting `main` |
| Increment boundary | Schema, guidance, checker, and regressions merge together so no consumer sees a partial contract. |
| Parallel ownership | None; one small cross-document contract change avoids coordination overhead. |
| Compatibility sequencing | Canonical schema and policy, portable consumers, checker, regressions, then exact-head review/full validation. |
| Merge authority | Human review and approval required. |

### Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| `WB135-01` | `T01`: add the canonical column and reconcile reader guidance. | Template/document-model checks. | aligned |
| `WB135-02` | `T01`: define semantic content in author/reviewer contracts. | Cross-document review/assertions. | aligned |
| `WB135-03` | `T01`: preserve recovery and reviewer dispositions in the parent brief. | Workflow/reviewer assertions. | aligned |
| `WB135-04` | `T01`: add deterministic checker behavior and positive/negative regressions. | Lifecycle tests and full suite. | aligned |
| `FC01` | `T01`: block incomplete candidate or brief at its applicable gate with proportional recovery. | Negative fixtures and semantic review. | aligned |

### Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- |
| `T01` | `DONE` | `None` | Deliver the reviewed recovery column across its canonical schema, consumers, validator, and regressions. | No new artifact, semantic parser, automatic remediation, historical rewrite, or whiteboard amendment. | 23/23 focused tests; author and both retained reviewers approved exact implementation `4f66500`; both reviewers approved final test-only head `80e5e7d`; 59/59 full tests and all documentation/runtime gates passed. | `codex/issue-135-fail-close-recovery`; [PR #136](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/136); target `main` |

### Task specifications and context receipts

#### `T01` — Fail-closed recovery action

| Concern | Value |
| --- | --- |
| Outcome / non-scope | Add the required recovery field and bounded enforcement; do not add recovery machinery or reinterpret historical evidence. |
| Source boundary | `templates/discovery/solution-whiteboard.md`, `docs/documentation-quality-policy.md`, `skills/sdd-project-workflow/SKILL.md`, `skills/sdd-feature-review/SKILL.md`, `README.md`, `scripts/sdd-lifecycle-three-doc.mjs`, and affected tests. |
| Consumed dependencies | `WB-135-1`, `FC01`, current error-handling authority, branch policy, and playbook revision `714c9391839f3073b6c26f7a65b0b5933278a708`. |
| Critical obligations | Do not modify frozen whiteboard; do not parse semantic prose in automation; preserve historical archives; keep one canonical schema. |
| Required evidence | Focused positive/negative lifecycle tests, cross-document assertions, both retained reviewers, full repository validation, human merge authority. |
| Context receipt | Manifest/runtime current; owner-approved design frozen; reviewer findings resolved; source boundaries inspected. |
| Actual result | Added one canonical recovery column, portable author/reviewer/human-brief contracts, deterministic presence validation, and prospective missing-column, blank, and `None` regressions without changing historical archives or the frozen whiteboard. Author and both reviewers approved the implementation and final test-only candidate; the full source gate passed. |

### Recovery, decisions, and change control

#### Failure and blocker log

| ID | Task | Observed versus expected | Classification / evidence | Recovery or owner decision | State |
| --- | --- | --- | --- | --- | --- |
| `None` | `None` | No active failure. | `None` | `None` | resolved |

#### Delivery decision and amendment log

| ID / time | Decision or plan change | Reason / consequence | Affected design, contracts, or tasks | Authority |
| --- | --- | --- | --- | --- |
| `2026-09-28` | Use one task/PR rather than multiple dependent task branches. | The contract is small and must remain internally consistent; splitting adds no independent value. | All design points / `T01` | Branch policy and necessary-complexity goal |
| `2026-09-28` | Owner approved the plan's named archive/reset closing transition. | Preserve the complete concluded whiteboard and completed plan in one archive, reset the live whiteboard, and remove the live plan before final human review. | Cleanup inventory and final canonical state | Repository owner approval of this implementation plan |

### Plan validation and completion

#### Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | `WB135-01`–`WB135-04` and `FC01` mapped to `T01`. | Implemented; author and both reviewers approved exact implementation `4f66500` and final test-only head `80e5e7d`. |
| Applicable validation passed | Focused affected checks, exact-head review, and full repository gate. | 23/23 focused tests; 59/59 full tests; Markdown, structure, lifecycle, Mermaid, diff, hosted, and runtime checks passed. Closing-candidate review and exact-head rerun remain PR-owned. |
| Compatibility and operations safe | Prospective enforcement only; historical archives remain valid; prior pin remains recoverable. | Archive validation remains backward compatible; no semantic prose parser or historical rewrite added. |
| Merge-ready canonical state | Template, policy, skills, README, checker, tests, plan, and closing archive agree. | Closing candidate will preserve this completed plan and concluded whiteboard in one archive, then reset/remove live feature state. |
| PR-owned review and delivery | PR #136 checks, retained reviewers, human merge, and target proof. | [PR #136](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/136) owns live state. |
| Feature cleanup complete | Combined whiteboard/plan archive, live plan removal, whiteboard reset, worktree/branch cleanup after target verification. | Archive/reset/removal authorized for this closing candidate; post-merge worktree/branch cleanup remains pending. |

#### Planned versus actual outcome

| Design / task | Planned result | Actual evidence or deviation | Remaining obligation / owner |
| --- | --- | --- | --- |
| `WB-135-1` / `T01` | Recovery action becomes a reviewed, validated part of every prospective fail-closed disposition. | Implemented across template, policy, skills, README, checker, and regressions; author and both reviewers approved; 23/23 focused and 59/59 full tests passed. | Closing-candidate review, exact-head full validation, human merge, and target verification. |

#### Cleanup inventory

| Item | Keep, archive, remove, or reset | Ownership and evidence | Result |
| --- | --- | --- | --- |
| Manifest | Keep updated playbook pin and stable authorities. | Upgrade skill / PR diff. | Candidate prepared. |
| Whiteboard and plan | Archive together, then reset/remove in the final candidate after explicit owner authorization. | Workflow completion contract. | Owner authorized; included in the closing candidate. |
| Issue #135 and PR #136 | Keep as durable need/review/delivery evidence. | GitHub. | Active. |
| Delivery worktree and branch | Remove after verified merge to `main`. | Owned by this delivery. | Pending. |

### Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and outcomes | T01 is done: schema, policy/skills, README, checker, and regressions form one coherent contract. | `HUMAN_DECISION` |
| Design consistency | Every `WB135` point and `FC01` maps to `T01`; no gap or extra task exists. | `NONE` |
| Important changes | Structural validation is deterministic; semantic quality remains author/reviewer judgment; enforcement is prospective. | `DISCLOSE` |
| Validation | 23/23 focused and 59/59 full tests passed; Markdown, structure, lifecycle, Mermaid, diff, hosted, and runtime checks passed; both retained reviewers approved final test-only head `80e5e7d`. Closing-candidate review and exact-head rerun remain. | `DISCLOSE` |
| Risks or open decisions | No design amendment, missing test, or additional fail-closed behavior. | `NONE` |
| Decision requested | Final human merge acceptance only after closing-candidate review and exact-head full validation pass. | `HUMAN_DECISION` |
