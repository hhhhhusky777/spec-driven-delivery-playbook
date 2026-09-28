# Implementation Plan — Fail-closed recovery action

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority.

## Delivery status

| Field | Value |
| --- | --- |
| State | `DRAFT` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | Plan review and owner acceptance |
| Implementation mode | Human review before merge |
| Delivery branch / target | `codex/issue-135-fail-close-recovery` → `main` |
| Owner | Repository owner |
| Primary issue / need | [#135](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/135) |
| Concluded whiteboard | [Solution whiteboard](solution-whiteboard.md), `WB-135-1`, frozen at `84ebf9b49ff9a462db4c8cd33029fa80ab4792e5` |
| Required reviewers | Retained reviewer seats 1 and 2 from design through merge |
| Last verified | Conclusion transition approved by both reviewers; lifecycle and runtime validation passed on 2026-09-28 |

## Governing inputs and delivery boundaries

### Source hierarchy

| Priority | Source | Authority / use |
| --- | --- | --- |
| 1 | Owner approval of `WB-135-1` and `FC01` | Required outcome and fail-closed authority |
| 2 | Frozen [whiteboard](solution-whiteboard.md) | Exact scope, compatibility, and validation boundaries |
| 3 | [Documentation quality policy](../../docs/documentation-quality-policy.md) and [error handling](../../docs/error-handling.md) | Canonical review, human brief, and recovery principles |
| 4 | Repository implementation and tests | Existing mechanisms to reuse and extend |

### Outcome, scope, and assumptions

| Concern | Accepted value |
| --- | --- |
| Problem | Fail-closed approval exposes the stop and impact but not a separately reviewable safest recovery action. |
| Required outcome | Every prospective material fail-closed row and its human brief expose the smallest safe action, actor, and retry/resume condition or required human decision. |
| In scope | Whiteboard template, canonical policy, workflow/reviewer skills, README explanation, lifecycle checker, and focused regressions. |
| Out of scope / deferred | Automatic remediation, project-specific recovery design, speculative error enumeration, new documents, and historical archive rewrites. |
| Success measures | One canonical column; deterministic structural validation; semantic author/reviewer judgment; complete human presentation; all applicable checks pass. |
| Assumptions / constraints | Existing table parsing and retained reviewer workflow are reusable; concluded whiteboard bytes are frozen. |

### Clarifications and gaps

| ID | Question or gap | Why it matters | Resolution / owner | State |
| --- | --- | --- | --- | --- |
| `G01` | Can automation judge semantic recovery quality? | Free-form heuristics would be brittle. | No. Automation checks structure/presence; author and reviewers judge semantics. | resolved |
| `G02` | Does a brief-only omission require candidate review again? | An unnecessary review loop would add overhead. | Parent re-presents unchanged approved information; repeat review only when candidate bytes or meaning change. | resolved |

## Test and acceptance contracts

| Owning task | Contract, changed outcome, or risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| `T01` | `WB135-01`: canonical recovery column exists | Document-model assertion and maintained-template fixture | planned | focused task work |
| `T01` | `WB135-02`: recovery names an action, actor, and safe retry/resume condition or human decision | Cross-document assertions plus author and reviewer semantic inspection | planned | focused task work and exact-candidate review |
| `T01` | `WB135-03`: author, reviewer, and human-brief contracts agree | Cross-document assertions | planned | focused task work |
| `T01` | `WB135-04`: missing-column and blank/`None` material recovery fail structurally while historical archives remain valid and prose is not parsed semantically | Positive/negative lifecycle fixtures plus full repository suite | planned; full run deferred | focused implementation; full run at final gate |

## Proposed design

### Components and responsibility boundaries

| Component | Owns | Must not own | Interfaces / dependencies |
| --- | --- | --- | --- |
| Whiteboard template | Canonical fail-closed table schema and field instructions | General error-handling policy | Policy and workflow skill |
| Documentation quality policy | Design/human-gate outcome and structural/semantic boundary | Duplicate table template | Template, skills, checker |
| Workflow and reviewer skills | Portable author/reviewer behavior and routing | A competing policy or recovery algorithm | Manifest authorities and reviewed whiteboard |
| Lifecycle checker | Deterministic column and nonblank/non-`None` validation | Semantic interpretation of recovery prose | Template schema and fixtures |
| README | Concise reader-facing explanation | Normative implementation details | Canonical policy and lifecycle diagram/text |

### Key decisions

| ID | Decision | Alternatives | Rationale / tradeoff | Affected contracts |
| --- | --- | --- | --- | --- |
| `D01` | Add one `Recovery / best next action` column. | Embed recovery in example; new document. | Smallest independently reviewable representation. | `WB135-01` |
| `D02` | Require action, actor, and retry/resume condition or human decision. | Free-form generic advice. | Makes the stop operationally usable. | `WB135-02` |
| `D03` | Machine checks structure; humans check meaning. | Free-text heuristics. | Deterministic validation without false confidence. | `WB135-04` |
| `D04` | Preserve recovery in the parent brief with exact reviewer dispositions. | Require the owner to reread the whiteboard. | Supports informed approval at the actual gate. | `WB135-03`, `FC01` |

### Compatibility, migration, and rollout

| Concern | Before / after compatibility | Migration or rollout | Rollback / recovery | Validation |
| --- | --- | --- | --- | --- |
| Prospective whiteboards | New concluded designs require the column and material value. | Updated template applies to future work. | Revert candidate before merge if design fails review. | Positive/negative lifecycle tests. |
| Historical archives | Existing accepted records remain evidence and are not rewritten. | None. | Not applicable. | Full lifecycle suite remains green. |
| Adopting projects | New managed skills/template revision take effect after accepted playbook upgrade. | Normal pinned upgrade. | Previous pin remains available. | Source tests here; project runtime validation downstream. |

### Risks and mitigations

| ID | Scenario | Likelihood / impact | Prevention / detection | Owner | State |
| --- | --- | --- | --- | --- | --- |
| `K01` | Checker attempts to parse semantic quality. | Medium / brittle false confidence. | Check only presence and nonblank/non-`None`; semantic review stays human/agent-owned. | `T01` | controlled |
| `K02` | Recovery wording duplicates error-handling policy. | Medium / maintenance drift. | Keep schema instruction concise and link/use canonical policy concepts. | `T01` | controlled |
| `K03` | Human brief drops recovery detail. | Medium / uninformed approval. | Workflow/reviewer contract plus `FC01` blocks the human gate. | Parent agent/reviewers | controlled |

## Delivery strategy and readiness

| Concern | This delivery |
| --- | --- |
| Integration model | One coherent task and one PR targeting `main` |
| Increment boundary | Schema, guidance, checker, and regressions merge together so no consumer sees a partial contract. |
| Parallel ownership | None; one small cross-document contract change avoids coordination overhead. |
| Compatibility sequencing | Canonical schema and policy, portable consumers, checker, regressions, then exact-head review/full validation. |
| Merge authority | Human review and approval required. |

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| `WB135-01` | `T01`: add the canonical column and reconcile reader guidance. | Template/document-model checks. | aligned |
| `WB135-02` | `T01`: define semantic content in author/reviewer contracts. | Cross-document review/assertions. | aligned |
| `WB135-03` | `T01`: preserve recovery and reviewer dispositions in the parent brief. | Workflow/reviewer assertions. | aligned |
| `WB135-04` | `T01`: add deterministic checker behavior and positive/negative regressions. | Lifecycle tests and full suite. | aligned |
| `FC01` | `T01`: block incomplete candidate or brief at its applicable gate with proportional recovery. | Negative fixtures and semantic review. | aligned |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- |
| `T01` | `PLANNED` | `None` | Deliver the reviewed recovery column across its canonical schema, consumers, validator, and regressions. | No new artifact, semantic parser, automatic remediation, historical rewrite, or whiteboard amendment. | Focused affected tests; retained reviewers; final full repository gate. | `codex/issue-135-fail-close-recovery`; [PR #136](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/136); target `main` |

## Task specifications and context receipts

### `T01` — Fail-closed recovery action

| Concern | Value |
| --- | --- |
| Outcome / non-scope | Add the required recovery field and bounded enforcement; do not add recovery machinery or reinterpret historical evidence. |
| Source boundary | `templates/discovery/solution-whiteboard.md`, `docs/documentation-quality-policy.md`, `skills/sdd-project-workflow/SKILL.md`, `skills/sdd-feature-review/SKILL.md`, `README.md`, `scripts/sdd-lifecycle-three-doc.mjs`, and affected tests. |
| Consumed dependencies | `WB-135-1`, `FC01`, current error-handling authority, branch policy, and playbook revision `714c9391839f3073b6c26f7a65b0b5933278a708`. |
| Critical obligations | Do not modify frozen whiteboard; do not parse semantic prose in automation; preserve historical archives; keep one canonical schema. |
| Required evidence | Focused positive/negative lifecycle tests, cross-document assertions, both retained reviewers, full repository validation, human merge authority. |
| Context receipt | Manifest/runtime current; owner-approved design frozen; reviewer findings resolved; source boundaries inspected. |
| Actual result | Pending implementation. |

## Recovery, decisions, and change control

### Failure and blocker log

| ID | Task | Observed versus expected | Classification / evidence | Recovery or owner decision | State |
| --- | --- | --- | --- | --- | --- |
| `None` | `None` | No active failure. | `None` | `None` | resolved |

### Delivery decision and amendment log

| ID / time | Decision or plan change | Reason / consequence | Affected design, contracts, or tasks | Authority |
| --- | --- | --- | --- | --- |
| `2026-09-28` | Use one task/PR rather than multiple dependent task branches. | The contract is small and must remain internally consistent; splitting adds no independent value. | All design points / `T01` | Branch policy and necessary-complexity goal |

## Plan validation and completion

### Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | `WB135-01`–`WB135-04` and `FC01` mapped to `T01`. | Pending implementation. |
| Applicable validation passed | Focused affected checks, exact-head review, and full repository gate. | Focused plan checks pending. |
| Compatibility and operations safe | Prospective enforcement only; historical archives remain valid; prior pin remains recoverable. | Pending implementation evidence. |
| Merge-ready canonical state | Template, policy, skills, README, checker, tests, plan, and closing archive agree. | Pending. |
| PR-owned review and delivery | PR #136 checks, retained reviewers, human merge, and target proof. | [PR #136](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/136) owns live state. |
| Feature cleanup complete | Combined whiteboard/plan archive, live plan removal, whiteboard reset, worktree/branch cleanup after target verification. | Pending authorized closing candidate. |

### Planned versus actual outcome

| Design / task | Planned result | Actual evidence or deviation | Remaining obligation / owner |
| --- | --- | --- | --- |
| `WB-135-1` / `T01` | Recovery action becomes a reviewed, validated part of every prospective fail-closed disposition. | Pending. | Implement, review, validate, and merge. |

### Cleanup inventory

| Item | Keep, archive, remove, or reset | Ownership and evidence | Result |
| --- | --- | --- | --- |
| Manifest | Keep updated playbook pin and stable authorities. | Upgrade skill / PR diff. | Candidate prepared. |
| Whiteboard and plan | Archive together, then reset/remove in the final candidate after explicit owner authorization. | Workflow completion contract. | Pending. |
| Issue #135 and PR #136 | Keep as durable need/review/delivery evidence. | GitHub. | Active. |
| Delivery worktree and branch | Remove after verified merge to `main`. | Owned by this delivery. | Pending. |

## Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and outcomes | One task updates schema, policy/skills, README, checker, and regressions as one coherent contract. | `HUMAN_DECISION` |
| Design consistency | Every `WB135` point and `FC01` maps to `T01`; no gap or extra task exists. | `NONE` |
| Important changes | Structural validation is deterministic; semantic quality remains author/reviewer judgment; enforcement is prospective. | `DISCLOSE` |
| Validation | Plan structure, lifecycle, runtime, and diff checks; implementation tests remain pending. | `DISCLOSE` |
| Risks or open decisions | Only plan acceptance; no design amendment or additional fail-closed behavior. | `HUMAN_DECISION` |
| Decision requested | Approve this one-task plan and authorize `T01` implementation. | `HUMAN_DECISION` |
