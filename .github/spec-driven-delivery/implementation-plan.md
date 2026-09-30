# Implementation Plan — Proportional validation disclosure

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority.

## Delivery status

| Field | Value |
| --- | --- |
| State | `VALIDATING` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | Human review before merge |
| Delivery branch / target | `codex/issue-144-validation-review` → `main` |
| Owner | Repository owner |
| Primary issue / need | [#144](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/144) |
| Concluded whiteboard | [Solution Whiteboard](solution-whiteboard.md), accepted design `225c862fbdff6f6c161ff35bf98bfe036a5b2f83`, concluded at `0fff8bf32c1f88468fa32a41f21443fcf134ea5c` |
| Required reviewers | Retained reviewer seats 1 and 2 from design through merge |
| Last verified | `T01` focused regression 1/1, documentation checks, and diff checks passed on the implementation worktree; retained implementation review is pending |

## Governing inputs and delivery boundaries

### Source hierarchy

| Priority | Source | Authority / use |
| --- | --- | --- |
| 1 | Owner approval of `WB144-01`–`WB144-06`, `V01`, and `FC01` | Required outcome, proportionality criteria, and blocking boundary |
| 2 | Concluded [Solution Whiteboard](solution-whiteboard.md) | Exact frozen design, scope, examples, risks, and rejected alternatives |
| 3 | [Documentation quality policy](../../docs/documentation-quality-policy.md), [error handling](../../docs/error-handling.md), and [contribution policy](../../CONTRIBUTING.md) | Canonical documentation, recovery, branch, review, and delivery rules |
| 4 | Existing templates, skills, README, and tests | Mechanisms to reuse without creating competing authority or a new artifact |

### Outcome, scope, and assumptions

| Concern | Accepted value |
| --- | --- |
| Problem | Designs can introduce runtime/contract rejections and acceptance checkpoints or blocking gates without exposing ownership, marginal value, failure effect, cost, or a simpler adequate alternative before acceptance. |
| Required outcome | Every newly designed runtime/contract rejection and acceptance checkpoint or blocking gate is explicitly reviewed and owner-disposed before design conclusion. |
| In scope | One canonical policy contract, Whiteboard template inventory, role-specific workflow/reviewer guidance, concise README explanation and references, and focused structural regressions. |
| Out of scope / deferred | Relisting unchanged validation, moving ordinary tests from the plan, numerical scoring, automatic semantic proportionality judgment, another state artifact, or historical archive rewrites. |
| Success measures | All six design points and `V01`/`FC01` map to implementation; all five proportionality criteria are inspectable; simplest sufficient mechanism remains decisive; role boundaries do not duplicate canonical policy; applicable checks pass. |
| Assumptions / constraints | `None`; accepted authorities and current repository mechanisms are sufficient. |

### Clarifications and gaps

| ID | Question or gap | Why it matters | Resolution / owner | State |
| --- | --- | --- | --- | --- |
| `None` | No unresolved planning gap. | `None` | `None` | resolved |

## Test and acceptance contracts

This table is the single coverage inventory; the pull request owns actual run
results. Task completion requires focused tests for changed files and lines and
records any missing non-focused coverage for the final gate. Before final-gate
test completion, the author and both retained reviewers audit exact
implementation conformance, reuse, and absence of unauthorized or redundant
logic as required by the canonical policy.

| Owning task | Contract, changed outcome, or risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| `T01` | `WB144-01`, `WB144-02`, `V01`: complete validation inventory and inspectable schema | Focused document-model assertions for the template, policy, and response contract | implemented; focused test passed | focused task work |
| `T01` | `WB144-03`, `WB144-04`: five criteria govern judgment and simplest sufficient mechanism defeats unnecessary validation | Focused policy/skill assertions plus retained semantic review | implemented; focused test passed; semantic review pending | focused task work |
| `T01` | `WB144-05`: parent response reproduces the reviewed table with both reviewer dispositions or `None` | Focused workflow/reviewer cross-document assertions | implemented; focused test passed | focused task work |
| `T01` | `WB144-06`, `FC01`: fail-close and ordinary-test evidence are referenced without duplication; incomplete inventories block conclusion/planning | Focused template/policy/skill assertions and semantic review | implemented; focused test passed; semantic review pending | focused task work |
| `T01` | Reader-facing description and Crosby framing remain accurate and non-mechanical | README/document review and documentation checks | implemented; documentation checks passed | focused task work |
| `T01` | All repository contracts remain coherent on the merge-ready candidate | Full documentation and test suite; no missing non-focused test implementation identified after focused work | run deferred until final gate | final-gate run |

## Proposed design

### Components and responsibility boundaries

| Component | Owns | Must not own | Interfaces / dependencies |
| --- | --- | --- | --- |
| Documentation quality policy | Canonical validation-disclosure scope, five criteria, Crosby-aligned lens, and disposition boundary | A fixed Crosby template, numerical score, or task procedure | Accepted design and existing human-gate contract |
| Whiteboard template | Project-specific inventory and owner disposition | Review history, unchanged validations, or ordinary test inventory | Canonical policy and project authorities |
| Workflow skill | Author routing and parent human-response presentation | Reviewer procedure or duplicate policy prose | Manifest, Whiteboard, plan, and reviewer skill |
| Feature-review skill | Independent semantic review and exact row disposition | New scope, automatic scoring, or perfection demands | Exact candidate and canonical authorities |
| README | Concise reader explanation, benefit, and selected references | Normative implementation detail | Canonical policy and lifecycle overview |
| Tests | Stable structural and cross-document regression coverage | Automated claims about semantic proportionality | Maintained documents, template, and skills |

### Key decisions

| ID | Decision | Alternatives | Rationale / tradeoff | Affected contracts |
| --- | --- | --- | --- | --- |
| `D01` | Keep the complete normative rule in documentation quality policy; consumers keep only role-specific instructions and links. | Repeat the full rule everywhere. | One canonical owner prevents drift and excess text. | `WB144-03`, `WB144-05`, `WB144-06` |
| `D02` | Add one Whiteboard inventory covering every new runtime/contract rejection and every new acceptance checkpoint or blocking gate. | Exhaustive validation or fail-close-only inventories. | Makes owner decisions complete without duplicating ordinary tests or unchanged controls. | `WB144-01`, `WB144-02`, `V01`, `FC01` |
| `D03` | Use the five accepted criteria with simplest sufficient mechanism decisive. | Numerical scoring or reviewer preference. | Preserves proportional judgment and prevents redundant validation. | `WB144-03`, `WB144-04` |
| `D04` | Use Crosby as a qualitative conformance, prevention, and cost lens only. | Attribute a fixed schema to Crosby or treat zero defects as unlimited checking. | Clarifies validation economics without creating ceremony. | `WB144-02`, `WB144-03`, `WB144-04` |
| `D05` | Add focused structural regressions and retain semantic agent/human review. | Parse free text to automate value judgments. | Automation protects document contracts; people judge proportionality. | all design points |

### Risks and mitigations

| ID | Scenario | Likelihood / impact | Prevention / detection | Owner | State |
| --- | --- | --- | --- | --- | --- |
| `K01` | Authors inventory every assertion or unchanged check. | Medium / medium | Categorical membership and exclusions are explicit and regression-protected. | `T01` | controlled |
| `K02` | The new inventory becomes another duplicated review ledger. | Medium / medium | Whiteboard stores owner disposition; PR stores detailed review history; parent response transports reviewer dispositions. | `T01` | controlled |
| `K03` | Crosby wording encourages perfection or unlimited validation. | Low / high | State the qualitative lens and keep simplest sufficient mechanism decisive. | `T01` | controlled |
| `K04` | Cross-document guidance drifts or repeats the canonical rule. | Medium / medium | One policy owner, role-specific consumers, and focused consistency assertions. | `T01` | controlled |

## Delivery strategy and readiness

| Concern | This delivery |
| --- | --- |
| Integration model | One coherent task and one PR targeting `main` |
| Increment boundary | Policy, template, role guidance, reader explanation, and regressions merge together so no consumer receives a partial contract. |
| Parallel ownership | None; the same compact cross-document contract benefits from one author and the retained reviewer pair. |
| Compatibility sequencing | Canonical policy, template, role-specific skills, README, focused regressions, implementation audit, final coverage reconciliation, then full validation. |
| Merge authority | Human review and approval required. |

The owned delivery branch is also the single task branch, as allowed by the
repository branch policy. PR [#145](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/145)
targets `main`; no intermediate task PR or policy exception exists.

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| `WB144-01` | `T01`: define categorical inventory membership in policy and template. | Focused structure and semantic review. | aligned |
| `WB144-02` | `T01`: expose every accepted field, including example, economics, simpler mechanism, references, and owner disposition. | Schema assertions and review. | aligned |
| `WB144-03` | `T01`: route the five criteria through author and reviewer guidance. | Cross-document assertions and review. | aligned |
| `WB144-04` | `T01`: make reuse or a cheaper adequate mechanism decisive unless insufficient. | Policy/skill assertions and review. | aligned |
| `WB144-05` | `T01`: require parent responses to reproduce the table or `None` and append both reviewer dispositions. | Workflow/reviewer assertions. | aligned |
| `WB144-06` | `T01`: cross-reference fail-close and plan-owned test evidence rather than duplicate it. | Template/policy consistency review. | aligned |
| `V01`, `FC01` | `T01`: implement the approved design-acceptance blocker and proportional recovery. | Focused negative/positive contract assertions plus semantic review. | aligned |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- |
| `T01` | `DONE` | `None` | Deliver proportional disclosure and disposition of every newly designed runtime/contract rejection and every new acceptance checkpoint or blocking gate across canonical policy, portable guidance, README, and regressions. | No Whiteboard amendment, exhaustive inventory, ordinary-test duplication, automatic semantic scoring, new artifact, historical rewrite, or duplicated full policy. | Focused regression 1/1, documentation checks, and diff checks passed; retained implementation audit, exact final-candidate review, and full final-gate validation remain. | `codex/issue-144-validation-review`; [PR #145](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/145); target `main` |

## Task specifications and context receipts

### `T01` — Proportional validation disclosure

| Concern | Value |
| --- | --- |
| Outcome / non-scope | Make every new runtime/contract rejection and every new acceptance checkpoint or blocking gate visible and proportional without cataloguing unchanged checks, duplicating ordinary tests, or prescribing numerical scoring. |
| Source boundary | `docs/documentation-quality-policy.md`, `templates/discovery/solution-whiteboard.md`, `skills/sdd-project-workflow/SKILL.md`, `skills/sdd-feature-review/SKILL.md`, `README.md`, and directly affected tests. |
| Consumed dependencies | Frozen Whiteboard design `225c862`; approved `V01` and `FC01`; current documentation, error-handling, branch, review, and final-gate contracts; selected OWASP, AWS, Google, and ASQ references. |
| Critical obligations | Do not change any Whiteboard byte without prior owner-authorized amendment; keep one canonical rule; preserve all five criteria; simplest sufficient mechanism is decisive; reviewers and owner dispose every row; cross-reference rather than duplicate evidence. |
| Required evidence | Focused contract regressions and documentation checks; author plus both retained reviewers approve exact implementation before final coverage work; missing tests reconciled; both reviewers approve exact final candidate; full validation passes; human merge authority. |
| Context receipt | Manifest/runtime current at `b3f13badb6e8b828f4185e6116939d51b5d3faeb`; accepted design frozen at `225c862`; both retained reviewers approved conclusion commit `0fff8bf`; no open owner decision or planning gap. |
| Actual result | Added one canonical proportional-validation contract, one project-specific Whiteboard inventory, concise author/reviewer routing, a reader-facing explanation with ASQ references, and focused cross-document regression coverage. No Whiteboard byte, new artifact, semantic scoring, or runtime checker was added; no missing non-focused test implementation was identified. |

## Recovery, decisions, and change control

### Failure and blocker log

| ID | Task | Observed versus expected | Classification / evidence | Recovery or owner decision | State |
| --- | --- | --- | --- | --- | --- |
| `None` | `None` | No active execution failure. | `None` | `None` | resolved |

### Delivery decision and amendment log

| ID / time | Decision or plan change | Reason / consequence | Affected design, contracts, or tasks | Authority |
| --- | --- | --- | --- | --- |
| `2026-09-30` | Use one task and the existing PR targeting `main`. | The changed surfaces express one indivisible contract; splitting adds coordination without independent value. | `WB144-01`–`WB144-06`, `V01`, `FC01`, `T01` | Repository branch policy and necessary-complexity goal |
| `2026-09-30` | Accept plan `175619209d4f5004969622c578fc219b7197b11f` and release `T01`. | Both retained reviewers approved the corrected one-task plan with no remaining findings. | `T01` readiness | Repository owner |

## Plan validation and completion

### Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | Every design point and `V01`/`FC01` maps to `T01`; no unexplained addition. | Implemented; retained implementation audit pending. |
| Applicable validation passed | Focused changed-file/line tests; pre-final author-plus-reviewer audit; missing-test reconciliation; exact final-candidate review; full final validation. | Focused regression 1/1, documentation checks, and diff checks passed; later gates pending. |
| Compatibility safe | Existing fail-close, test inventory, human gate, reviewer, and archive contracts remain coherent. | Author self-review passed; retained semantic review pending. |
| Merge-ready canonical state | Affected policy, template, skills, README, tests, plan, and eventual archive/reset candidate agree before final review. | Pending. |
| PR-owned review and delivery | PR #145 owns findings, checks, human authority, merge, and target verification. | [PR #145](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/145) |
| Feature cleanup complete | Concluded Whiteboard and completed plan archived together; live Whiteboard reset and live plan removed in the closing candidate; owned worktree and branch cleaned after verified merge. | Pending. |

### Planned versus actual outcome

| Design / task | Planned result | Actual evidence or deviation | Remaining obligation / owner |
| --- | --- | --- | --- |
| `WB144-01`–`WB144-06`, `V01`, `FC01` / `T01` | One concise, proportional, cross-document validation-disclosure contract with focused regressions. | Implemented without design amendment; focused checks passed and no missing test implementation was identified. | Retained implementation audit, exact final review, full validation, human merge, and cleanup. |

### Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and outcomes | `T01` implemented the approved policy, Whiteboard template, role-specific skills, README, and focused regressions as one coherent contract. | `DISCLOSE` |
| Design consistency | Every `WB144` point and `V01`/`FC01` maps to `T01`; no amendment or unexplained addition exists. | `NONE` |
| Important boundaries | Inventory every new runtime/contract rejection and every new acceptance checkpoint or blocking gate; ordinary tests and unchanged validation are not duplicated; simplest sufficient mechanism is decisive. | `DISCLOSE` |
| Validation | Focused changed-file/line checks during `T01`; implementation audit and missing-test reconciliation before exact final review; full suite at final gate. | `DISCLOSE` |
| Decision requested | None; owner approved the plan and released `T01`. | `NONE` |
