# Delivery archive — Evidence-bounded scope

<!-- sdd: delivery-archive -->

| Field | Value |
| --- | --- |
| Issues | [#138](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/138) |
| Closing pull request | [#139](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/139) |

<!-- sdd: archived-whiteboard -->

## Solution Whiteboard — Evidence-bounded scope

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [#138](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/138) |
| Owner | Repository owner |
| Concluded design revision | `WB-138-1` |
| Open owner decisions | `None` |

### Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| `DR01` | Agents can create brittle behavior by turning a current case or another component's internal state into a durable design fact. | accepted |
| `DR02` | Assumptions are unavoidable; the dangerous cases are unsupported, foreign-owned, incidental, single-case, hidden-dependency, and speculative assumptions. | accepted |
| `DR03` | A material assumption should be verified from authority, replaced with a public contract, or bounded explicitly; unresolved scope authority belongs to the human. | accepted |
| `DR04` | The rule must protect supported cases without demanding proof for every imaginable case or encouraging speculative generalization. | accepted |
| `DR05` | Microsoft Architectural Principles is the primary technical reference; AWS Workload and Scope is the supporting ownership/boundary reference. | accepted |
| `DR06` | Authors self-check assumptions and reviewers reject unsupported scope without pursuing perfection or expanding the accepted outcome. | accepted |

### Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem / observed need | Existing scope rules reject unexplained additions but do not help an agent identify when a design premise is an unsupported or foreign-owned assumption. |
| Required outcome | Design and implementation remain inside an evidence-supported, owned, explicitly declared domain; material uncertainty is verified or routed to the human rather than hard-coded. |
| In scope | Canonical documentation policy, whiteboard assumption capture, portable author/reviewer guidance, reader explanation, two external references, and regression coverage. |
| Out of scope / deferred | Proving correctness for every imaginable case, banning all assumptions, runtime assumption detection, project-specific migration rules, or a new scope document. |
| Confidence | High on the intended boundary; independent review must test whether the checklist is concise and avoids both brittle assumptions and over-engineering. |

### Authority and context

| Source | Authority or relevant content | Freshness / verification |
| --- | --- | --- |
| Repository owner discussion for Issue #138 | Defines unsupported and single-case assumptions as a scope risk and authorizes the evidence-bounded design. | Current conversation |
| [Documentation quality policy](../../../docs/documentation-quality-policy.md) | Owns clear boundaries, honest evidence, accepted-design authority, and human briefs. | Current at `d1df74c1dc548ac4397b14018a4d162d8ba32135` |
| [Microsoft Architectural Principles](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/architectural-principles) | Explicit dependencies, separation of concerns, single responsibility, single authority, and bounded contexts. | Reviewed 2026-09-28 |
| [AWS Workload and Scope](https://docs.aws.amazon.com/wellarchitected/latest/userguide/workload-and-scope.html) | General questions for ownership, purpose, boundaries, dependencies, lifecycle, and disruption impact. | Reviewed 2026-09-28 |

### Requirements and acceptance

| ID | Need or requirement | Priority | Acceptance signal | Source |
| --- | --- | --- | --- | --- |
| `R01` | Define evidence-bounded scope using accepted outcome, component ownership or authoritative external contract, and evidence valid for the declared supported cases. | Required | Canonical policy gives one unambiguous rule. | Owner; references |
| `R02` | Give agents a concise dangerous-assumption checklist: unsupported, foreign-owned, incidental-state, single-case generalization, hidden dependency, and speculative assumption. | Required | Author and reviewer guidance use the same six categories without duplicating the full policy. | Owner |
| `R03` | Require a material assumption to be verified, replaced with an authoritative contract, or bounded explicitly; unresolved material scope requires a human decision. | Required | Workflow and review gates fail closed only at the material ambiguity boundary. | Owner |
| `R04` | Preserve ordinary engineering judgment and proportionality. | Required | Guidance rejects universal proof, imagined-case expansion, and perfectionism. | Owner; Google simplicity principle considered but not retained as a required reference |
| `R05` | Use only the selected Microsoft and AWS references. | Required | Reader-facing reference section contains both links and no unnecessary reference list. | Owner |
| `R06` | Keep the design general rather than encoding the migration example as a special rule. | Required | Migration appears only as a concrete explanatory example. | Owner |

### Options, experiments, and tradeoffs

| ID | Option or experiment | Benefits | Costs / risks | Evidence needed | Disposition |
| --- | --- | --- | --- | --- | --- |
| `O01` | Ban assumptions. | Simple slogan. | Impossible in real design; would cause excessive human stops. | Industry principles and practical review. | rejected |
| `O02` | Use the six dangerous-assumption categories as the sole self-check vocabulary. | Detects the harmful assumptions while preserving judgment. | Requires concise semantic review. | Cross-document review and tests. | accepted |
| `O03` | Require proof for every possible case. | Appears maximally safe. | Unbounded, impossible, and over-engineered; expands beyond the declared supported domain. | None. | rejected |
| `O04` | Let only reviewers identify scope assumptions. | Less author guidance. | Finds avoidable mistakes late and encourages review loops. | Existing review experience. | rejected |
| `O05` | Create a separate scope policy. | Dedicated space. | Adds another authority and duplicates documentation policy. | None. | rejected |

### Risks and consequences

| ID | Scenario | Likelihood / impact | Prevention or detection | Recovery / owner | Residual risk |
| --- | --- | --- | --- | --- | --- |
| `K01` | Agents treat every unknown as out of scope and stop unnecessarily. | Medium / medium | Limit the stop to material assumptions the agent cannot verify or resolve within existing authority. | Agent verifies or records a nonmaterial limitation; human only when authority is missing. | Contextual judgment remains. |
| `K02` | Agents claim a one-case observation is general evidence. | Medium / high | Require evidence valid for the declared supported domain and reviewer challenge of incidental facts. | Narrow the supported domain or use an authoritative contract. | Evidence can still be misread. |
| `K03` | Reviewers demand speculative abstractions for hypothetical future cases. | Medium / medium | Explicitly reject universal proof, imagined-case expansion, and perfectionism. | Author rejects or defers disproportionate findings under existing review rules. | Judgment remains necessary. |
| `K04` | The same normative rule is copied across policy, skills, template, and README. | Medium / medium | Policy owns the rule; other surfaces provide only their role-specific prompt and link/summary. | Remove duplicated prose during consistency review. | Low. |

### Decision log

| ID | Decision | Material alternatives | Rationale / tradeoff | Owner / evidence |
| --- | --- | --- | --- | --- |
| `D01` | Name the rule **Evidence-bounded scope**. | “Avoid assumptions”; “universal design.” | States the positive outcome without banning legitimate assumptions. | Owner discussion |
| `D02` | Define in-scope decisions by outcome authority, ownership/contract, and evidence for the declared supported domain. | One-case intuition or universal applicability. | Matches established explicit-dependency and bounded-context principles. | Microsoft; AWS |
| `D03` | Require author self-check against the six dangerous-assumption categories. | A second checklist or prescriptive implementation workflow. | Keeps one vocabulary and reusable judgment criteria without fixing one path. | Owner discussion |
| `D04` | Material unresolved assumptions fail closed to human scope definition; ordinary verifiable assumptions remain agent work. | Always continue; always stop. | Preserves both safety and agent discretion. | Owner discussion |
| `D05` | Reviewers block only material unsupported scope and reject speculative expansion. | Perfect-generalization review. | Prevents brittle coupling without creating over-engineering loops. | Existing proportional review authority |

### Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `WB138-01` | Every material design or implementation premise traces to the accepted outcome and either current component ownership or an authoritative external contract, with evidence valid for the declared supported domain. | It need not cover unsupported or imagined cases. | Policy and reader guidance state the same outcome. |
| `WB138-02` | Authors check for six dangerous assumption types: unsupported, foreign-owned, incidental-state, single-case generalization, hidden dependency, and speculative assumption. | This is a judgment checklist, not a mechanical parser or mandatory artifact. | Workflow guidance and whiteboard template expose the check concisely. |
| `WB138-03` | For a material dangerous assumption, the agent verifies it, replaces it with a public contract, or narrows and discloses the supported domain; if authority remains missing, the human defines or expands scope. | Nonmaterial limitations and safely verifiable facts do not create a human stop. | Human-brief and reviewer tests preserve the escalation boundary. |
| `WB138-04` | Reviewers treat unsupported or over-specific premises as out-of-scope findings and require evidence, contract, or explicit boundary; they must not demand universal proof or speculative generalization. | Review protects accepted scope rather than perfection. | Reviewer guidance and cross-document regression agree. |
| `WB138-05` | The playbook cites Microsoft Architectural Principles and AWS Workload and Scope as the only external references for this rule. | References support the rule but do not become project authority. | Both links appear in the canonical/reader-facing location and pass link checks. |

### Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| `DR01` | `WB138-01`, `WB138-03` | accepted | Prevents current-case facts from becoming durable cross-component invariants. |
| `DR02` | `WB138-02` | accepted | Six categories make the dangerous subset explicit. |
| `DR03` | `WB138-03` | accepted | Verification and authority determine whether the agent proceeds or stops. |
| `DR04` | `WB138-01`, `WB138-04` | accepted | The supported domain is explicit without pretending to include every case. |
| `DR05` | `WB138-05` | accepted | Two complementary primary references are sufficient. |
| `DR06` | `WB138-02`, `WB138-04` | accepted | Author and reviewer responsibilities are aligned without duplicating policy. |

### Newly introduced fail-closed behaviors

| ID | Trigger | Required fail-closed response | Concrete example | Impact | Recovery / best next action | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- |
| `FC01` | A material design or implementation decision matches any of the six dangerous-assumption categories and the agent cannot verify, replace, or bound it within current authority. | Block the affected design, implementation, or approval; do not encode the assumption as an invariant or silently expand scope. | A deployment change hard-codes that every database upgrade is `1 → 2` although the upgrade script owns migration paths; a later `3 → 4` release would fail for a reason outside deployment's contract. | May pause one material boundary, but prevents brittle cross-component coupling and unsupported long-lived rules. | The author verifies authoritative evidence, changes the design to consume the owning component's public contract, or explicitly narrows the supported domain. If none is authorized, the repository owner defines or expands scope. Affected work resumes only after required validation, both retained reviewers approve changed candidate bytes, and the owner accepts any human-defined scope. | Approved by owner on 2026-09-28 |

### Design amendments

| Amendment | Changed design points | Reason and impact | Owner decision |
| --- | --- | --- | --- |
| `None` | `None` | Initial candidate. | `None` |

### Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | Adopt Evidence-bounded scope, six dangerous assumptions, the verify/contract/bound/human resolution boundary, and two external references. | `HUMAN_DECISION` |
| Important boundaries | Assumptions are not banned; supported-domain evidence is required only for material premises, and universal proof or speculative future-case design is rejected. | `DISCLOSE` |
| Alternatives rejected | Ban all assumptions, require universal proof, reviewer-only detection, or create another policy document. | `DISCLOSE` |
| Remaining gaps or risks | Independent reviewers must verify concision, non-duplication, and that `FC01` stops only material unresolved scope. | `DISCLOSE` |
| Newly introduced fail-closed behavior | `FC01`: an unresolved material assumption in any of the six dangerous categories blocks the affected gate. Example: deployment hard-codes `1 → 2` migration logic owned by the upgrade script. Recovery: the author verifies evidence, consumes the owning public contract, narrows the supported domain, or asks the owner to define scope; work resumes after validation, both reviewers approve changed bytes, and any required owner acceptance. Reviewer dispositions pending. | `HUMAN_DECISION` |
| Decision requested | After both reviewers approve, accept `WB-138-1` and `FC01` so planning may begin. | `HUMAN_DECISION` |

<!-- sdd: archived-implementation-plan -->

## Implementation Plan — Evidence-bounded scope

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
| Delivery branch / target | `codex/issue-138-evidence-scope` → `main` |
| Owner | Repository owner |
| Primary issue / need | [#138](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/138) |
| Concluded whiteboard | [Archived whiteboard](#solution-whiteboard--evidence-bounded-scope), `WB-138-1`, frozen at commit `34123b78ca336525978b95e654a5497b801334cb` |
| Required reviewers | Retained reviewer seats 1 and 2 from design through merge |
| Last verified | Exact final candidate `ed2fa39b48f8f7ae1ae43fa9989df0b48a424810` approved by both retained reviewers; 18/18 focused and 60/60 full tests plus all documentation gates passed on 2026-09-28 |

### Governing inputs and delivery boundaries

#### Source hierarchy

| Priority | Source | Authority / use |
| --- | --- | --- |
| 1 | Owner approval of `WB-138-1` and `FC01` | Required outcome, material-scope boundary, and fail-closed authority |
| 2 | Frozen [archived whiteboard](#solution-whiteboard--evidence-bounded-scope) | Exact design, non-scope, risk, and validation boundaries |
| 3 | [Documentation quality policy](../../../docs/documentation-quality-policy.md) and repository contribution policy | Canonical documentation, branch, review, and delivery rules |
| 4 | Existing templates, skills, README, and tests | Mechanisms to reuse and extend without creating a competing authority |

#### Outcome, scope, and assumptions

| Concern | Accepted value |
| --- | --- |
| Problem | Existing scope rules reject unexplained additions but do not help an agent recognize unsupported or foreign-owned design premises before hard-coding them. |
| Required outcome | Authors and reviewers keep material decisions inside an evidence-supported, owned, declared domain and route unresolved material scope authority to the human. |
| In scope | Canonical documentation policy, whiteboard prompt, workflow and reviewer skills, README explanation and two approved references, plus focused regression coverage. |
| Out of scope / deferred | Banning assumptions, universal proof, runtime assumption detection, project-specific migration rules, a new scope document, or historical archive rewrites. |
| Success measures | One canonical rule; exactly six shared dangerous-assumption categories; proportional fail-closed routing; no competing checklist or duplicated policy prose; applicable checks pass. |
| Assumptions / constraints | Existing scope and over-engineering guidance is reusable; the frozen whiteboard cannot change; external references support but do not replace repository authority. |

#### Clarifications and gaps

| ID | Question or gap | Why it matters | Resolution / owner | State |
| --- | --- | --- | --- | --- |
| `G01` | Should every assumption cause a human stop? | That would remove ordinary engineering judgment and create overhead. | No. Only a material assumption that cannot be verified, replaced, or bounded within current authority fails closed. | resolved |
| `G02` | Should the migration example become a special rule? | A special case would narrow a general contract and invite duplication. | No. It remains explanatory only. | resolved |

### Test and acceptance contracts

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
| `T01` | `WB138-01`: canonical policy defines evidence-bounded scope and declared supported domain | Document-model assertions and semantic author/reviewer inspection | implemented; focused checks passed | focused task work |
| `T01` | `WB138-02`: author and reviewer guidance use exactly the six accepted categories without copying the full policy | Cross-document assertions | implemented; focused checks passed | focused task work |
| `T01` | `WB138-03`, `FC01`: only unresolved material scope authority blocks; verification, public contract, or explicit bounding permits progress | Workflow/reviewer assertions and concrete example inspection | implemented; focused checks passed | focused task work |
| `T01` | `WB138-04`: reviewers reject unsupported premises without demanding universal proof or speculative generalization | Reviewer-skill assertions and retained-reviewer inspection | implemented; focused checks passed | focused task work |
| `T01` | `WB138-05`: README cites only the selected Microsoft and AWS references for this rule | Link/text assertions and documentation checks | implemented; focused checks passed | focused task work |
| `T01` | All changed Markdown, templates, skills, and links remain coherent | Full repository validation | No missing non-focused test remained; 60/60 full tests and all documentation gates passed on exact reviewed head `ed2fa39`. | final-gate run |

### Proposed design

#### Components and responsibility boundaries

| Component | Owns | Must not own | Interfaces / dependencies |
| --- | --- | --- | --- |
| Documentation quality policy | Canonical evidence-bounded scope rule and material escalation boundary | A prescriptive implementation path or project-specific example rule | Accepted whiteboard and existing scope authority |
| Whiteboard template | Concise prompt to expose material assumptions and their evidence/boundary | A duplicate policy or mechanical artifact requirement | Canonical policy and project authorities |
| Workflow skill | Author self-check and routing when material authority is unresolved | Reviewer procedure or a second checklist | Manifest, whiteboard, policy, and reviewer skill |
| Feature-review skill | Review enforcement against accepted scope and proportionality | New scope, universal-proof demands, or duplicated author policy | Exact candidate and canonical authorities |
| README | Reader-facing benefit, explanation, and the two approved external references | Normative detail copied from policy | Canonical policy and lifecycle description |
| Tests | Prevent vocabulary, escalation, reference, and non-duplication drift | Semantic proof from free-text heuristics | Maintained documents and skills |

#### Key decisions

| ID | Decision | Alternatives | Rationale / tradeoff | Affected contracts |
| --- | --- | --- | --- | --- |
| `D01` | Put the complete rule only in documentation quality policy. | New scope policy; duplicate full rule in every consumer. | Keeps one authority while portable surfaces retain role-specific prompts. | `WB138-01`, `WB138-04` |
| `D02` | Use exactly the six whiteboard categories in author and reviewer prompts. | A second checklist or free-form wording. | Shared vocabulary makes drift reviewable without turning judgment into a parser. | `WB138-02` |
| `D03` | Extend existing proportional scope/error routing rather than add a new lifecycle. | Always stop or always continue. | Preserves agent discretion and protects only material unresolved boundaries. | `WB138-03`, `FC01` |
| `D04` | Add focused cross-document assertions, not semantic prose parsing. | Attempt to automate whether an assumption is materially valid. | Structural consistency is deterministic; semantic judgment belongs to author and reviewers. | all design points |

#### Risks and mitigations

| ID | Scenario | Likelihood / impact | Prevention / detection | Owner | State |
| --- | --- | --- | --- | --- | --- |
| `K01` | Agents stop on every unknown. | Medium / medium | State the material and unresolved threshold consistently; test the allowed resolution paths. | `T01` | controlled |
| `K02` | Reviewers demand hypothetical generalization. | Medium / medium | Make supported-domain evidence and anti-perfection boundary explicit. | `T01` | controlled |
| `K03` | The same rule is copied into policy, skills, template, and README. | Medium / medium | Policy owns full rule; other surfaces contain only role-specific prompts and links/summaries. | `T01` | controlled |
| `K04` | Tests overfit exact prose and make guidance harder to improve. | Medium / low | Assert contract vocabulary and outcomes, not paragraph identity. | `T01` | controlled |

### Delivery strategy and readiness

| Concern | This delivery |
| --- | --- |
| Integration model | One coherent task and one PR targeting `main` |
| Increment boundary | Canonical rule, portable prompts, reader explanation, references, and regressions merge together so no consumer receives a partial contract. |
| Parallel ownership | None; the same small cross-document contract benefits from one author and one retained reviewer pair. |
| Compatibility sequencing | Canonical policy first, role-specific consumers, README, focused regressions, exact-candidate review, then final validation. |
| Merge authority | Human review and approval required. |

The single-task model complies with the repository branch policy: the owned
delivery branch is also the task branch and PR #139 targets `main`.

### Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| `WB138-01` | `T01`: add the canonical evidence-bounded scope rule and concise reader explanation. | Policy/README assertions and semantic review. | aligned |
| `WB138-02` | `T01`: expose exactly the six categories in the whiteboard and role-specific skill prompts. | Cross-document vocabulary assertions. | aligned |
| `WB138-03` | `T01`: encode verify, public-contract, bound, or human routing for material unresolved assumptions. | Workflow/template assertions and review. | aligned |
| `WB138-04` | `T01`: make reviewer enforcement proportional and anti-perfection. | Reviewer-skill assertions and retained-reviewer inspection. | aligned |
| `WB138-05` | `T01`: add only the approved Microsoft and AWS references. | README link/text checks. | aligned |
| `FC01` | `T01`: preserve the exact material trigger, block boundary, example, recovery actor, and resume conditions across applicable guidance. | Cross-document review without changing the frozen whiteboard. | aligned |

### Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- |
| `T01` | `DONE` | `None` | Deliver the canonical evidence-bounded scope rule with concise author/reviewer/template/reader guidance and regressions. | No whiteboard change, new policy, universal-proof demand, runtime detector, project-specific migration rule, historical rewrite, or duplicated full policy. | 18/18 focused tests; author and both reviewers approved implementation `7a7247a`; both reviewers approved final test-only head `ed2fa39`; 60/60 full tests and all documentation gates passed. | `codex/issue-138-evidence-scope`; [PR #139](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/139); target `main` |

### Task specifications and context receipts

#### `T01` — Evidence-bounded scope guidance

| Concern | Value |
| --- | --- |
| Outcome / non-scope | Make unsupported material premises visible and resolvable without banning assumptions, demanding universal proof, or expanding the accepted outcome. |
| Source boundary | `docs/documentation-quality-policy.md`, `templates/discovery/solution-whiteboard.md`, `skills/sdd-project-workflow/SKILL.md`, `skills/sdd-feature-review/SKILL.md`, `README.md`, and directly affected tests. |
| Consumed dependencies | Frozen `WB-138-1`, approved `FC01`, current branch/review/error-handling policies, Microsoft Architectural Principles, and AWS Workload and Scope. |
| Critical obligations | Do not modify frozen whiteboard; keep one canonical policy; use exactly six categories; stop only at material unresolved authority; preserve anti-over-engineering rules. |
| Required evidence | Focused cross-document tests; exact implementation audit by the author and both retained reviewers before final-gate test additions/runs; recorded missing-test completion and affected focused checks; exact final-candidate approval by both retained reviewers; full validation; human merge authority. |
| Context receipt | Manifest/runtime current at `d1df74c1dc548ac4397b14018a4d162d8ba32135`; owner-approved whiteboard frozen at `34123b7`; both retained reviewers approved the conclusion transition; no open owner decision. |
| Actual result | Added one canonical rule, six-category author/reviewer/template prompts, proportional material-scope routing, README explanation with the two approved references, and cross-document regression coverage. No missing test remained; both reviewers approved the implementation and final test-only candidate, and full validation passed. |

### Recovery, decisions, and change control

#### Failure and blocker log

| ID | Task | Observed versus expected | Classification / evidence | Recovery or owner decision | State |
| --- | --- | --- | --- | --- | --- |
| `None` | `None` | No active failure. | `None` | `None` | resolved |

#### Delivery decision and amendment log

| ID / time | Decision or plan change | Reason / consequence | Affected design, contracts, or tasks | Authority |
| --- | --- | --- | --- | --- |
| `2026-09-28` | Use one task and the existing PR targeting `main`. | All changed surfaces express one indivisible small contract; splitting would add coordination without independent value. | `WB138-01`–`WB138-05`, `FC01`, `T01` | Repository branch policy and necessary-complexity goal |
| `2026-09-28` | Accept implementation plan `ff651ee6b7d5cf6692ae725b8052b47d0eca9610` and release `T01`. | Both retained reviewers approved the corrected plan with no remaining findings. | `T01` readiness | Repository owner |
| `2026-09-28` | Owner approval of the implementation plan authorizes the named archive/reset closing transition. | Preserve the complete concluded whiteboard and completed plan in one archive, reset the live whiteboard, and remove the live plan before final human review. | Cleanup inventory and merge-resulting canonical state | Repository owner |

### Plan validation and completion

#### Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | Every `WB138` point and `FC01` maps to `T01` with no unexplained addition. | Implemented; author and both retained reviewers approved implementation `7a7247a` and final test-only head `ed2fa39`. |
| Applicable validation passed | Focused affected checks; pre-final author-plus-two-reviewer implementation audit; missing-test reconciliation/addition; focused recheck; exact final-candidate approval; then full validation. | 18/18 focused and 60/60 full tests passed; Markdown, structure, lifecycle, Mermaid, and diff checks passed. Closing-candidate review and exact-head rerun remain PR-owned. |
| Compatibility and operations safe | Existing scope, review, and error-handling contracts remain coherent; no historical archive rewrite. | Prospective guidance only; current authorities remain coherent and archives are unchanged. |
| Merge-ready canonical state | Policy, template, skills, README, tests, plan, archive/reset candidate, and PR summary agree before final review. | Closing candidate preserves this completed plan and concluded whiteboard in one archive, then resets/removes live feature state. |
| PR-owned review and delivery | PR #139 holds reviewer findings, checks, human authority, merge, and target verification. | [PR #139](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/139) |
| Feature cleanup complete | Concluded whiteboard and completed plan archived together; live whiteboard reset; live plan removed; owned worktree and branch cleaned after verified merge. | Archive/reset/removal authorized for the closing candidate; post-merge worktree/branch cleanup remains pending. |

#### Planned versus actual outcome

| Design / task | Planned result | Actual evidence or deviation | Remaining obligation / owner |
| --- | --- | --- | --- |
| `WB-138-1` / `T01` | Evidence-bounded scope is canonical, portable, concise, proportional, and regression-protected. | Implemented across policy, template, skills, README, and tests; author and both reviewers approved; 18/18 focused and 60/60 full tests passed. | Closing-candidate review, exact-head full validation, human merge, and target verification. |

#### Cleanup inventory

| Item | Keep, archive, remove, or reset | Ownership and evidence | Result |
| --- | --- | --- | --- |
| Manifest | Keep the accepted playbook pin and stable authorities. | Upgrade evidence in PR #139. | Candidate preserved. |
| Whiteboard and plan | Archive together, then reset/remove in the closing candidate. | Workflow completion contract and owner-approved plan. | Authorized for this closing candidate. |
| Issue #138 and PR #139 | Keep as durable need, review, and delivery evidence. | GitHub. | Active. |
| Delivery worktree and branch | Remove after verified merge to `main`. | Owned by this delivery. | Pending. |

#### Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and outcomes | `T01` delivered one canonical evidence-bounded scope rule, concise portable prompts, README guidance/references, and regression protection. | `HUMAN_DECISION` |
| Design consistency | Every `WB138` point and `FC01` maps to `T01`; no amendment, unexplained addition, duplicate policy, or historical rewrite exists. | `NONE` |
| Review findings | One missing workflow-routing assertion was added as a test-only correction; both reviewers approved the implementation audit and exact final candidate. | `DISCLOSE` |
| Validation | 18/18 focused and 60/60 full tests passed with all documentation gates on exact reviewed head `ed2fa39`. Closing-candidate review and exact-head rerun remain. | `DISCLOSE` |
| Risks or open decisions | No missing test, design gap, or additional fail-closed behavior remains. | `NONE` |
| Decision requested | Final human merge acceptance only after closing-candidate review and exact-head full validation pass. | `HUMAN_DECISION` |
