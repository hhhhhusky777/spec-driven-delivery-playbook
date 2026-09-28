# Implementation Plan — Evidence-bounded scope

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority.

## Delivery status

| Field | Value |
| --- | --- |
| State | `READY` |
| Active tasks | `None` |
| Next ready task | `T01` |
| Active blocker | `None` |
| Implementation mode | Human review before merge |
| Delivery branch / target | `codex/issue-138-evidence-scope` → `main` |
| Owner | Repository owner |
| Primary issue / need | [#138](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/138) |
| Concluded whiteboard | [Working whiteboard](solution-whiteboard.md), `WB-138-1`, frozen at commit `34123b78ca336525978b95e654a5497b801334cb` |
| Required reviewers | Retained reviewer seats 1 and 2 from design through merge |
| Last verified | Exact plan `ff651ee6b7d5cf6692ae725b8052b47d0eca9610` approved by both retained reviewers and accepted by the owner on 2026-09-28 |

## Governing inputs and delivery boundaries

### Source hierarchy

| Priority | Source | Authority / use |
| --- | --- | --- |
| 1 | Owner approval of `WB-138-1` and `FC01` | Required outcome, material-scope boundary, and fail-closed authority |
| 2 | Frozen [whiteboard](solution-whiteboard.md) | Exact design, non-scope, risk, and validation boundaries |
| 3 | [Documentation quality policy](../../docs/documentation-quality-policy.md) and repository contribution policy | Canonical documentation, branch, review, and delivery rules |
| 4 | Existing templates, skills, README, and tests | Mechanisms to reuse and extend without creating a competing authority |

### Outcome, scope, and assumptions

| Concern | Accepted value |
| --- | --- |
| Problem | Existing scope rules reject unexplained additions but do not help an agent recognize unsupported or foreign-owned design premises before hard-coding them. |
| Required outcome | Authors and reviewers keep material decisions inside an evidence-supported, owned, declared domain and route unresolved material scope authority to the human. |
| In scope | Canonical documentation policy, whiteboard prompt, workflow and reviewer skills, README explanation and two approved references, plus focused regression coverage. |
| Out of scope / deferred | Banning assumptions, universal proof, runtime assumption detection, project-specific migration rules, a new scope document, or historical archive rewrites. |
| Success measures | One canonical rule; exactly six shared dangerous-assumption categories; proportional fail-closed routing; no competing checklist or duplicated policy prose; applicable checks pass. |
| Assumptions / constraints | Existing scope and over-engineering guidance is reusable; the frozen whiteboard cannot change; external references support but do not replace repository authority. |

### Clarifications and gaps

| ID | Question or gap | Why it matters | Resolution / owner | State |
| --- | --- | --- | --- | --- |
| `G01` | Should every assumption cause a human stop? | That would remove ordinary engineering judgment and create overhead. | No. Only a material assumption that cannot be verified, replaced, or bounded within current authority fails closed. | resolved |
| `G02` | Should the migration example become a special rule? | A special case would narrow a general contract and invite duplication. | No. It remains explanatory only. | resolved |

## Test and acceptance contracts

This table is the coverage inventory; the pull request owns actual run results.

After implementation and focused tests, the author and both retained reviewers
MUST audit the exact implementation candidate before any missing final-gate test
is added or any full validation is run. They MUST verify strict conformance to
the frozen whiteboard, maximum practical reuse of existing code and frameworks,
and absence of unauthorized or redundant behavior. After that audit, add the
recorded missing tests, run affected focused checks, and return the exact final
candidate to the same reviewers. Run full applicable validation only after both
reviewers approve that exact final candidate. Any implementation-content
correction invalidates the audit and repeats it; test-only additions still
require the final-candidate review.

| Owning task | Contract, changed outcome, or risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| `T01` | `WB138-01`: canonical policy defines evidence-bounded scope and declared supported domain | Document-model assertions and semantic author/reviewer inspection | planned | focused task work |
| `T01` | `WB138-02`: author and reviewer guidance use exactly the six accepted categories without copying the full policy | Cross-document assertions | planned | focused task work |
| `T01` | `WB138-03`, `FC01`: only unresolved material scope authority blocks; verification, public contract, or explicit bounding permits progress | Workflow/reviewer assertions and concrete example inspection | planned | focused task work |
| `T01` | `WB138-04`: reviewers reject unsupported premises without demanding universal proof or speculative generalization | Reviewer-skill assertions and retained-reviewer inspection | planned | focused task work |
| `T01` | `WB138-05`: README cites only the selected Microsoft and AWS references for this rule | Link/text assertions and documentation checks | planned | focused task work |
| `T01` | All changed Markdown, templates, skills, and links remain coherent | Full repository validation | deferred until final gate; any missing non-focused coverage is recorded after focused tests | final-gate addition/run |

## Proposed design

### Components and responsibility boundaries

| Component | Owns | Must not own | Interfaces / dependencies |
| --- | --- | --- | --- |
| Documentation quality policy | Canonical evidence-bounded scope rule and material escalation boundary | A prescriptive implementation path or project-specific example rule | Accepted whiteboard and existing scope authority |
| Whiteboard template | Concise prompt to expose material assumptions and their evidence/boundary | A duplicate policy or mechanical artifact requirement | Canonical policy and project authorities |
| Workflow skill | Author self-check and routing when material authority is unresolved | Reviewer procedure or a second checklist | Manifest, whiteboard, policy, and reviewer skill |
| Feature-review skill | Review enforcement against accepted scope and proportionality | New scope, universal-proof demands, or duplicated author policy | Exact candidate and canonical authorities |
| README | Reader-facing benefit, explanation, and the two approved external references | Normative detail copied from policy | Canonical policy and lifecycle description |
| Tests | Prevent vocabulary, escalation, reference, and non-duplication drift | Semantic proof from free-text heuristics | Maintained documents and skills |

### Key decisions

| ID | Decision | Alternatives | Rationale / tradeoff | Affected contracts |
| --- | --- | --- | --- | --- |
| `D01` | Put the complete rule only in documentation quality policy. | New scope policy; duplicate full rule in every consumer. | Keeps one authority while portable surfaces retain role-specific prompts. | `WB138-01`, `WB138-04` |
| `D02` | Use exactly the six whiteboard categories in author and reviewer prompts. | A second checklist or free-form wording. | Shared vocabulary makes drift reviewable without turning judgment into a parser. | `WB138-02` |
| `D03` | Extend existing proportional scope/error routing rather than add a new lifecycle. | Always stop or always continue. | Preserves agent discretion and protects only material unresolved boundaries. | `WB138-03`, `FC01` |
| `D04` | Add focused cross-document assertions, not semantic prose parsing. | Attempt to automate whether an assumption is materially valid. | Structural consistency is deterministic; semantic judgment belongs to author and reviewers. | all design points |

### Risks and mitigations

| ID | Scenario | Likelihood / impact | Prevention / detection | Owner | State |
| --- | --- | --- | --- | --- | --- |
| `K01` | Agents stop on every unknown. | Medium / medium | State the material and unresolved threshold consistently; test the allowed resolution paths. | `T01` | controlled |
| `K02` | Reviewers demand hypothetical generalization. | Medium / medium | Make supported-domain evidence and anti-perfection boundary explicit. | `T01` | controlled |
| `K03` | The same rule is copied into policy, skills, template, and README. | Medium / medium | Policy owns full rule; other surfaces contain only role-specific prompts and links/summaries. | `T01` | controlled |
| `K04` | Tests overfit exact prose and make guidance harder to improve. | Medium / low | Assert contract vocabulary and outcomes, not paragraph identity. | `T01` | controlled |

## Delivery strategy and readiness

| Concern | This delivery |
| --- | --- |
| Integration model | One coherent task and one PR targeting `main` |
| Increment boundary | Canonical rule, portable prompts, reader explanation, references, and regressions merge together so no consumer receives a partial contract. |
| Parallel ownership | None; the same small cross-document contract benefits from one author and one retained reviewer pair. |
| Compatibility sequencing | Canonical policy first, role-specific consumers, README, focused regressions, exact-candidate review, then final validation. |
| Merge authority | Human review and approval required. |

The single-task model complies with the repository branch policy: the owned
delivery branch is also the task branch and PR #139 targets `main`.

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| `WB138-01` | `T01`: add the canonical evidence-bounded scope rule and concise reader explanation. | Policy/README assertions and semantic review. | aligned |
| `WB138-02` | `T01`: expose exactly the six categories in the whiteboard and role-specific skill prompts. | Cross-document vocabulary assertions. | aligned |
| `WB138-03` | `T01`: encode verify, public-contract, bound, or human routing for material unresolved assumptions. | Workflow/template assertions and review. | aligned |
| `WB138-04` | `T01`: make reviewer enforcement proportional and anti-perfection. | Reviewer-skill assertions and retained-reviewer inspection. | aligned |
| `WB138-05` | `T01`: add only the approved Microsoft and AWS references. | README link/text checks. | aligned |
| `FC01` | `T01`: preserve the exact material trigger, block boundary, example, recovery actor, and resume conditions across applicable guidance. | Cross-document review without changing the frozen whiteboard. | aligned |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- |
| `T01` | `READY` | `None` | Deliver evidence-bounded scope as one canonical rule with concise author/reviewer/template/reader guidance and regressions. | No whiteboard change, new policy, universal-proof demand, runtime detector, project-specific migration rule, historical rewrite, or duplicated full policy. | Focused document-model and affected documentation checks; retained reviewer pair; full repository validation at final gate. | `codex/issue-138-evidence-scope`; [PR #139](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/139); target `main` |

## Task specifications and context receipts

### `T01` — Evidence-bounded scope guidance

| Concern | Value |
| --- | --- |
| Outcome / non-scope | Make unsupported material premises visible and resolvable without banning assumptions, demanding universal proof, or expanding the accepted outcome. |
| Source boundary | `docs/documentation-quality-policy.md`, `templates/discovery/solution-whiteboard.md`, `skills/sdd-project-workflow/SKILL.md`, `skills/sdd-feature-review/SKILL.md`, `README.md`, and directly affected tests. |
| Consumed dependencies | Frozen `WB-138-1`, approved `FC01`, current branch/review/error-handling policies, Microsoft Architectural Principles, and AWS Workload and Scope. |
| Critical obligations | Do not modify frozen whiteboard; keep one canonical policy; use exactly six categories; stop only at material unresolved authority; preserve anti-over-engineering rules. |
| Required evidence | Focused cross-document tests; exact implementation audit by the author and both retained reviewers before final-gate test additions/runs; recorded missing-test completion and affected focused checks; exact final-candidate approval by both retained reviewers; full validation; human merge authority. |
| Context receipt | Manifest/runtime current at `d1df74c1dc548ac4397b14018a4d162d8ba32135`; owner-approved whiteboard frozen at `34123b7`; both retained reviewers approved the conclusion transition; no open owner decision. |
| Actual result | Pending. |

## Recovery, decisions, and change control

### Failure and blocker log

| ID | Task | Observed versus expected | Classification / evidence | Recovery or owner decision | State |
| --- | --- | --- | --- | --- | --- |
| `None` | `None` | No active failure. | `None` | `None` | resolved |

### Delivery decision and amendment log

| ID / time | Decision or plan change | Reason / consequence | Affected design, contracts, or tasks | Authority |
| --- | --- | --- | --- | --- |
| `2026-09-28` | Use one task and the existing PR targeting `main`. | All changed surfaces express one indivisible small contract; splitting would add coordination without independent value. | `WB138-01`–`WB138-05`, `FC01`, `T01` | Repository branch policy and necessary-complexity goal |
| `2026-09-28` | Accept implementation plan `ff651ee6b7d5cf6692ae725b8052b47d0eca9610` and release `T01`. | Both retained reviewers approved the corrected plan with no remaining findings. | `T01` readiness | Repository owner |

## Plan validation and completion

### Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | Every `WB138` point and `FC01` maps to `T01` with no unexplained addition. | pending |
| Applicable validation passed | Focused affected checks; pre-final author-plus-two-reviewer implementation audit; missing-test reconciliation/addition; focused recheck; exact final-candidate approval; then full validation. | pending |
| Compatibility and operations safe | Existing scope, review, and error-handling contracts remain coherent; no historical archive rewrite. | pending |
| Merge-ready canonical state | Policy, template, skills, README, tests, plan, archive/reset candidate, and PR summary agree before final review. | pending |
| PR-owned review and delivery | PR #139 holds reviewer findings, checks, human authority, merge, and target verification. | [PR #139](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/139) |
| Feature cleanup complete | Concluded whiteboard and completed plan archived together; live whiteboard reset; live plan removed; owned worktree and branch cleaned after verified merge. | pending |

### Planned versus actual outcome

| Design / task | Planned result | Actual evidence or deviation | Remaining obligation / owner |
| --- | --- | --- | --- |
| `WB-138-1` / `T01` | Evidence-bounded scope is canonical, portable, concise, proportional, and regression-protected. | Pending implementation. | Plan review/acceptance, implementation, final gates, human merge, and cleanup. |
