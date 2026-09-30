# Delivery archive — Proportional validation disclosure

<!-- sdd: delivery-archive -->

| Field | Value |
| --- | --- |
| Issues | [#144](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/144) |
| Closing pull request | [#145](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/145) |

<!-- sdd: archived-whiteboard -->

## Solution Whiteboard — Proportional validation disclosure

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [#144](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/144) |
| Owner | Repository owner |
| Concluded design revision | `225c862fbdff6f6c161ff35bf98bfe036a5b2f83` |
| Open owner decisions | `None` |

### Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| `DR01` | Every validation newly introduced by a design must be visible before design acceptance. | accepted |
| `DR02` | The parent human-gate response must list the same new validations after two-agent review. | accepted |
| `DR03` | Judge proportionality by traceability, correct ownership/boundary, marginal value, risk-versus-cost, and the simplest sufficient mechanism. | accepted |
| `DR04` | The simplest sufficient mechanism is decisive: reuse or a cheaper adequate option wins unless it is shown insufficient. | accepted |
| `DR05` | Every new runtime/contract rejection and new acceptance checkpoint or blocking gate requires disposition; ordinary tests stay in the plan unless they create a new gate. | accepted |
| `DR06` | Existing unchanged validations are linked, not relisted. | accepted |
| `DR07` | A validation that also creates fail-closed behavior cross-references its fail-close row instead of duplicating it. | accepted |
| `DR08` | Use `None` when no new validation exists. | accepted |
| `DR09` | Use the fail-close and assumptions disclosure pattern for validations. | corrected after owner clarified a voice-transcription error |

### Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem / observed need | A design can add rejection logic or acceptance checkpoints without showing their value, placement, failure effect, and cost. |
| Required outcome | Before design acceptance, every new runtime/contract rejection and every new acceptance checkpoint or blocking gate is explicit and shown to be necessary and proportional. |
| Actors and critical journeys | Authors design validations, reviewers challenge necessity and placement, and the owner accepts, rejects, revises, or defers each row. |
| In scope | Whiteboard inventory, parent response, five review criteria, fail-close cross-reference, portable guidance, README explanation, and regressions. |
| Out of scope / deferred | Relisting unchanged validators, moving ordinary tests out of the plan, numerical quotas, or automating semantic proportionality judgment. |
| Confidence | High; the owner accepted the inventory and all five criteria, especially simplest sufficient mechanism. |

### Authority and context

| Source | Authority or relevant content | Freshness / verification |
| --- | --- | --- |
| Owner decision in Issue #144 discussion | Requires the validations table in design and parent responses and accepts the five criteria. | Current on 2026-09-29 |
| [Documentation quality policy](../../../docs/documentation-quality-policy.md) | Owns design acceptance, proportionality, human briefs, and test evidence. | Current at `b3f13ba` |
| [Error handling](../../../docs/error-handling.md) | Owns fail-closed recovery and escalation. | Current at `b3f13ba` |
| [OWASP Input Validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) | Supports early validation at untrusted boundaries and syntactic/semantic distinction. | Primary guidance checked 2026-09-29 |
| [AWS risk guidance](https://docs.aws.amazon.com/wellarchitected/latest/userguide/identify-and-understand-risks.html) | Supports likelihood, impact, cost, and ownership assessment. | Primary guidance checked 2026-09-29 |
| [AWS controls guidance](https://docs.aws.amazon.com/wellarchitected/latest/management-and-governance-guide/controls.html) | Warns that duplicate controls can add cost. | Primary guidance checked 2026-09-29 |
| [Google review guidance](https://google.github.io/eng-practices/review/reviewer/looking-for.html) | Rejects speculative complexity and treats tests as maintained code. | Primary guidance checked 2026-09-29 |

### Facts, assumptions, and unknowns

#### Facts

| ID | Fact | Evidence |
| --- | --- | --- |
| `F01` | The Whiteboard exposes new fail-closed behaviors but has no dedicated inventory for all new validations. | Current template and policy |
| `F02` | The implementation plan already owns ordinary test inventory and final-gate coverage. | Current workflow and plan template |
| `F03` | The parent brief already consolidates findings, fail-close behavior, assumptions, and validation evidence. | Current policy and workflow skill |

#### Assumptions

| ID | Assumption | Failure impact | Validation / state |
| --- | --- | --- | --- |
| None | None | None | No material assumption remains; current authorities and owner decisions define the design. |

#### Unknowns and owner decisions

| ID | Question or decision | Why it matters | Owner / source | State / resolution |
| --- | --- | --- | --- | --- |
| `Q01` | Must ordinary tests appear in the new validation inventory? | Duplicating the plan would add noise. | Owner decision | No; only a test that creates a new blocking gate belongs here. |
| `Q02` | What is the primary anti-over-engineering criterion? | The inventory must change decisions, not become ceremony. | Owner decision | The simplest sufficient mechanism; reuse or a cheaper adequate option wins unless shown insufficient. |

### Requirements and acceptance

| ID | Need or requirement | Priority | Acceptance signal | Source |
| --- | --- | --- | --- | --- |
| `R01` | The Whiteboard lists every new runtime/contract rejection and every new acceptance checkpoint or blocking gate before conclusion. | Required | A dedicated table has no undisposed row at conclusion. | Owner |
| `R02` | The parent response reproduces the complete table after both reviewers inspect it. | Required | Human brief appends both exact reviewer dispositions to every row, or reports `None`; PR owns detailed review history. | Owner |
| `R03` | Each row is judged by all five proportionality criteria. | Required | Schema covers traceability, boundary, marginal value, cost versus credible risk reduction, and simplest sufficient mechanism. | Owner |
| `R04` | Simpler adequate reuse defeats a more complex new validation. | Required | A row cannot be approved without explaining why reuse or a cheaper option is insufficient. | Owner |
| `R05` | Fail-close and test records remain canonical without duplication. | Required | Rows reference `FCxx` and plan test IDs where applicable; a test added under an existing gate remains plan evidence even though failure blocks that gate. | Existing model |
| `R06` | Follow the existing fail-close and assumptions disclosure pattern. | Required | Judgment criteria and required parent-response table are explicit; no mechanical scoring or unlimited checking. | Owner clarification |

### Options, experiments, and tradeoffs

| ID | Option or experiment | Benefits | Costs / risks | Evidence needed | Disposition |
| --- | --- | --- | --- | --- | --- |
| `O01` | Add one dedicated new-validation table to the Whiteboard and parent response. | Complete visibility with one canonical design record. | Small author/review overhead. | Template, skills, policy, tests. | accepted |
| `O02` | Put all validations into the fail-close table. | Fewer tables. | Misclassifies non-fail-close gates and overloads recovery semantics. | None. | rejected |
| `O03` | Put all validations only in the implementation plan. | Avoids Whiteboard change. | Hides design restrictions until after design acceptance. | None. | rejected |
| `O04` | Require every existing validator and test to be listed. | Appears exhaustive. | Duplicates authorities and encourages ceremony. | None. | rejected |

### Policy applicability and gaps

| Concern | Applicable authority | Feature-specific consequence | Gap / action |
| --- | --- | --- | --- |
| Testing and quality | Documentation quality policy | Ordinary tests stay in the plan; new blocking gates need design disposition. | Add validation-disclosure contract. |
| Security, privacy, and abuse | Project authority plus OWASP when applicable | Security validation remains risk- and boundary-driven. | No universal validator mandate. |
| API, data, and compatibility | Evidence-bounded scope | Validation must use owned contracts, not incidental state. | Include ownership/boundary criterion. |
| Concurrency, idempotency, and recovery | Error handling | A rejecting or blocking validation links its fail-close behavior and recovery. | Cross-reference rather than duplicate. |
| Performance and operations | Proportional effort | Latency, false rejection, maintenance, and operating cost are explicit. | Include cost criterion. |

### Risks and consequences

| ID | Scenario | Likelihood / impact | Prevention or detection | Recovery / owner | Residual risk |
| --- | --- | --- | --- | --- | --- |
| `K01` | The inventory becomes another exhaustive checklist. | Medium / medium | Limit it to new runtime/contract rejections and new acceptance checkpoints or gates; use `None`; link existing authority. | Reviewer rejects duplication. | Low |
| `K02` | Authors justify every validation with generic safety language. | Medium / high | Require a concrete protected outcome/risk and simpler-option comparison. | Revise or reject row. | Low |
| `K03` | A duplicated validator creates latency or false rejection. | Medium / high | Require marginal-value and cost assessment, with simplest sufficient mechanism decisive. | Remove or reuse existing mechanism. | Low |
| `K04` | A runtime rejection is listed but its fail-close effect is hidden. | Low / high | Require `FCxx` cross-reference when applicable. | Block conclusion until linked and approved. | Low |

### Decision log

| ID | Decision | Material alternatives | Rationale / tradeoff | Owner / evidence |
| --- | --- | --- | --- | --- |
| `D01` | Add a dedicated inventory for the categorically defined in-scope validations. | Fail-close-only or plan-only inventory. | Human accepts restrictions before implementation. | Owner |
| `D02` | Use five criteria: traceability, boundary, marginal value, proportional cost, and simplest sufficient mechanism. | Numerical quota or reviewer preference. | Risk-based judgment remains portable. | Owner and industry guidance |
| `D03` | Make simplest sufficient mechanism decisive. | Treat it as optional advice. | Directly prevents redundant validation and speculative complexity. | Owner |
| `D04` | Parent response owns the table after review and appends both exact reviewer dispositions; the Whiteboard stores only owner disposition. | Separate reviewer tables or review history in the Whiteboard. | Matches findings, fail-close, and assumptions ownership while PR retains review history. | Existing response model |
| `D05` | Reference overlapping fail-close and test records. | Duplicate full content. | Preserves canonical ownership. | Existing document model |
| `D06` | Use the existing fail-close and assumptions disclosure pattern: judgment criteria plus the reviewed table in the parent response. | A new theory, numerical score, or separate disclosure document. | Keeps presentation consistent without adding ceremony. | Owner clarification |

### Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `WB144-01` | Every new runtime/contract rejection and every new acceptance checkpoint or blocking gate is visible before design acceptance. | An individual test or assertion added under an existing gate remains plan evidence; unchanged validations are linked. | Whiteboard schema and lifecycle regressions. |
| `WB144-02` | Each row exposes owning authority and boundary, protected outcome/risk, marginal value beyond existing controls, concrete invalid case, failure effect, cost and credible risk reduction, simpler option and its coverage, why that option is insufficient, references, and owner disposition. | Every row directly answers all five proportionality criteria without numerical scoring. | Cross-document review and structural tests. |
| `WB144-03` | All five criteria govern author and reviewer judgment. | Semantic judgment remains human/agent-owned; automation checks structure only. | Policy and skill review. |
| `WB144-04` | A new validation is rejected, removed, reused, or simplified unless a suitable existing or cheaper mechanism is shown insufficient. | Simplest sufficient mechanism is the primary anti-over-engineering boundary. | Reviewer disposition and human table. |
| `WB144-05` | Parent human-gate responses reproduce the complete reviewed table or `None` and append both exact reviewer dispositions. | Whiteboard stores only owner disposition; PR owns detailed review history. | Workflow and response regressions. |
| `WB144-06` | Overlapping fail-close and test evidence is cross-referenced, not duplicated. | Ordinary tests remain in the plan unless they create a new blocking gate. | Template and consistency review. |

### Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| `DR01` | `WB144-01`, `WB144-02` | accepted | Dedicated inventory makes new restrictions visible. |
| `DR02` | `WB144-05` | accepted | Parent response follows consolidated review. |
| `DR03` | `WB144-03` | accepted | Five criteria are complete and risk-based. |
| `DR04` | `WB144-04` | accepted | Strongest anti-over-engineering boundary. |
| `DR05` | `WB144-01`, `WB144-06` | accepted | Preserves plan ownership for ordinary tests. |
| `DR06` | `WB144-01` | accepted | Prevents duplicated project authority. |
| `DR07` | `WB144-06` | accepted | One fact keeps one canonical owner. |
| `DR08` | `WB144-05` | accepted | Explicit absence without invented rows. |
| `DR09` | `WB144-02`, `WB144-03`, `WB144-05` | corrected | Owner clarified the voice transcription: the intended reference was fail-close, not an external quality theory. |

### Newly introduced validations

> [!IMPORTANT]
> **Hard rule.** List every new runtime/contract rejection and every new
> acceptance checkpoint or blocking gate. Both reviewers MUST approve every row
> before the human gate. The parent response MUST reproduce every row, append
> `Reviewer 1 disposition` and `Reviewer 2 disposition`, and request human
> disposition. The Whiteboard stores only owner disposition; detailed review
> history remains in the PR. A concluded whiteboard MUST NOT contain a pending
> row. Use one all-`None` row when none exists. Existing unchanged validations
> and individual tests or assertions added under an existing gate MUST NOT be
> relisted; they remain plan test evidence.

| ID | Validation, owning authority, and execution boundary | Protected outcome / risk and marginal value beyond existing controls | Concrete invalid case | Failure effect / recovery | Cost / risk reduction | Existing/reusable or cheaper mechanism, its coverage, and why insufficient | Fail-close / test reference | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `V01` | Owner-approved design-acceptance boundary: before conclusion, require a complete and disposed inventory row for every new runtime/contract rejection and every new acceptance checkpoint or blocking gate. | Existing fail-close review exposes rejection recovery but not every new validation's ownership, marginal protection, economics, or simpler alternative; this inventory closes that gap. | A design adds a deployment blocker that duplicates an existing contract check but never shows its latency, false-rejection risk, or simpler reusable option. | Design conclusion and dependent planning remain blocked; recovery is owned by `FC01`. | Cost: one concise row and semantic review per in-scope validation. Risk reduction: hidden rejection, duplicated controls, false rejection, and their implementation/operating/rework cost. No unchanged-validator or ordinary-test inventory. | Reuse the existing Whiteboard and human gate. The fail-close table alone does not cover non-fail-close checkpoints or proportionality, so one compact inventory row is the smallest sufficient addition. | `FC01`; structural regression only. | `Approved` |

### Newly introduced fail-closed behaviors

| ID | Trigger | Required fail-closed response | Concrete example | Impact | Recovery / best next action | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- |
| `FC01` | An in-scope validation is missing, lacks required proportionality information, or has no reviewer/owner disposition. | Do not conclude the design or start dependent planning. | A new API validator rejects an input already safely handled by an existing framework, but the design omits the duplicate check and its cost from review. | Design acceptance pauses; no runtime behavior is changed. | Author lists and justifies the validator or removes/reuses it; both reviewers approve the correction; owner accepts or rejects the row. | `Approved` |

### Design amendments

| Amendment | Changed design points | Reason and impact | Owner decision |
| --- | --- | --- | --- |
| Owner clarification on 2026-09-30 | `WB144-02`, `WB144-03`, `WB144-05`; no new scope | Correct voice-transcription error; use fail-close/assumptions presentation, keep all five criteria, and make installed skill guidance self-contained. | Explicit owner instruction in conversation |

### Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | Add a reviewed/human-disposed inventory of every new runtime/contract rejection and every new acceptance checkpoint or blocking gate, using five proportionality criteria. | `DISCLOSE` |
| Important boundaries | The inventory follows the fail-close and assumptions disclosure pattern; simplest sufficient mechanism is decisive, and unchanged validators or ordinary tests are not duplicated. | `DISCLOSE` |
| Alternatives rejected | Fail-close-only, plan-only, or exhaustive inventories. | `DISCLOSE` |
| Remaining gaps or risks | Original design approval is historical; the owner-authorized clarification is recorded above. Current exact-head review and validation are PR-owned gates. | `DISCLOSE` |
| Newly introduced validations | Owner approved `V01`, including authority/boundary, marginal value, example, failure effect, cost, simpler option and why insufficient, references, and both reviewer dispositions. | `DISCLOSE` |
| Newly introduced fail-closed behavior | Owner approved `FC01` after two-agent review. | `DISCLOSE` |
| Decision requested | None; owner accepted `WB144-01`–`WB144-06`, `V01`, and `FC01`, so planning is authorized. | `NONE` |

<!-- sdd: archived-implementation-plan -->

## Implementation Plan — Proportional validation disclosure

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
| Delivery branch / target | `codex/issue-144-validation-review` → `main` |
| Owner | Repository owner |
| Primary issue / need | [#144](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/144) |
| Concluded whiteboard | [Solution Whiteboard](#solution-whiteboard--proportional-validation-disclosure), accepted design `225c862fbdff6f6c161ff35bf98bfe036a5b2f83`, concluded at `0fff8bf32c1f88468fa32a41f21443fcf134ea5c` |
| Required reviewers | Retained reviewer seats 1 and 2 from design through merge |
| Last verified | Latest correction passes focused checks; current exact-head reviewer audit, full validation, and merge evidence are recorded in PR #145. Earlier `d962127` approval is superseded historical evidence. |

### Governing inputs and delivery boundaries

#### Source hierarchy

| Priority | Source | Authority / use |
| --- | --- | --- |
| 1 | Owner approval of `WB144-01`–`WB144-06`, `V01`, and `FC01` | Required outcome, proportionality criteria, and blocking boundary |
| 2 | Concluded [Solution Whiteboard](#solution-whiteboard--proportional-validation-disclosure) | Exact frozen design, scope, examples, risks, and rejected alternatives |
| 3 | [Documentation quality policy](../../../docs/documentation-quality-policy.md), [error handling](../../../docs/error-handling.md), and [contribution policy](../../../CONTRIBUTING.md) | Canonical documentation, recovery, branch, review, and delivery rules |
| 4 | Existing templates, skills, README, and tests | Mechanisms to reuse without creating competing authority or a new artifact |

#### Outcome, scope, and assumptions

| Concern | Accepted value |
| --- | --- |
| Problem | Designs can introduce runtime/contract rejections and acceptance checkpoints or blocking gates without exposing ownership, marginal value, failure effect, cost, or a simpler adequate alternative before acceptance. |
| Required outcome | Every newly designed runtime/contract rejection and acceptance checkpoint or blocking gate is explicitly reviewed and owner-disposed before design conclusion. |
| In scope | One canonical policy contract, Whiteboard template inventory, role-specific workflow/reviewer guidance, concise README explanation and references, and focused structural regressions. |
| Out of scope / deferred | Relisting unchanged validation, moving ordinary tests from the plan, numerical scoring, automatic semantic proportionality judgment, another state artifact, or historical archive rewrites. |
| Success measures | All six design points and `V01`/`FC01` map to implementation; all five proportionality criteria are inspectable; simplest sufficient mechanism remains decisive; role boundaries do not duplicate canonical policy; applicable checks pass. |
| Assumptions / constraints | `None`; accepted authorities and current repository mechanisms are sufficient. |

#### Clarifications and gaps

| ID | Question or gap | Why it matters | Resolution / owner | State |
| --- | --- | --- | --- | --- |
| `None` | No unresolved planning gap. | `None` | `None` | resolved |

### Test and acceptance contracts

This table is the single coverage inventory; the pull request owns actual run
results. Task completion requires focused tests for changed files and lines and
records any missing non-focused coverage for the final gate. Before final-gate
test completion, the author and both retained reviewers audit exact
implementation conformance, reuse, and absence of unauthorized or redundant
logic as required by the canonical policy.

| Owning task | Contract, changed outcome, or risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| `T01` | `WB144-01`, `WB144-02`, `V01`: complete validation inventory and inspectable schema | Focused document-model assertions for the template, policy, and response contract | implemented; focused test passed | focused task work |
| `T01` | `WB144-03`, `WB144-04`: five criteria govern judgment and simplest sufficient mechanism defeats unnecessary validation | Focused policy/skill assertions plus retained semantic review | implemented; focused test passed; historical semantic review at `d962127` is superseded by current PR review | focused task work |
| `T01` | `WB144-05`: parent response reproduces the reviewed table with both reviewer dispositions or `None` | Focused workflow/reviewer cross-document assertions | implemented; focused test passed | focused task work |
| `T01` | `WB144-06`, `FC01`: fail-close and ordinary-test evidence are referenced without duplication; incomplete inventories block conclusion/planning | Focused template/policy/skill assertions and semantic review | implemented; focused test passed; historical semantic review at `d962127` is superseded by current PR review | focused task work |
| `T01` | Reader-facing description and fail-close and assumptions disclosure remain accurate | README/document review and documentation checks | implemented; documentation checks passed | focused task work |
| `T01` | All repository contracts remain coherent on the merge-ready candidate | Full documentation and test suite; no missing non-focused test implementation identified after focused work | run deferred until final gate | final-gate run |

### Proposed design

#### Components and responsibility boundaries

| Component | Owns | Must not own | Interfaces / dependencies |
| --- | --- | --- | --- |
| Documentation quality policy | Canonical validation-disclosure scope, five criteria, and disposition boundary | A numerical score or task procedure | Accepted design and existing human-gate contract |
| Whiteboard template | Project-specific inventory and owner disposition | Review history, unchanged validations, or ordinary test inventory | Canonical policy and project authorities |
| Workflow skill | Author routing and parent human-response presentation | Reviewer procedure or duplicate policy prose | Manifest, Whiteboard, plan, and reviewer skill |
| Feature-review skill | Independent semantic review and exact row disposition | New scope, automatic scoring, or perfection demands | Exact candidate and canonical authorities |
| README | Concise reader explanation, benefit, and selected references | Normative implementation detail | Canonical policy and lifecycle overview |
| Tests | Stable structural and cross-document regression coverage | Automated claims about semantic proportionality | Maintained documents, template, and skills |

#### Key decisions

| ID | Decision | Alternatives | Rationale / tradeoff | Affected contracts |
| --- | --- | --- | --- | --- |
| `D01` | Keep the complete normative rule in documentation quality policy; consumers keep only role-specific instructions and links. | Repeat the full rule everywhere. | One canonical owner prevents drift and excess text. | `WB144-03`, `WB144-05`, `WB144-06` |
| `D02` | Add one Whiteboard inventory covering every new runtime/contract rejection and every new acceptance checkpoint or blocking gate. | Exhaustive validation or fail-close-only inventories. | Makes owner decisions complete without duplicating ordinary tests or unchanged controls. | `WB144-01`, `WB144-02`, `V01`, `FC01` |
| `D03` | Use the five accepted criteria with simplest sufficient mechanism decisive. | Numerical scoring or reviewer preference. | Preserves proportional judgment and prevents redundant validation. | `WB144-03`, `WB144-04` |
| `D04` | Use the existing fail-close and assumptions presentation pattern. | Invent another theory or demand unlimited checking. | Keeps judgment criteria and human disclosure clear without creating ceremony. | `WB144-02`, `WB144-03`, `WB144-05` |
| `D05` | Add focused structural regressions and retain semantic agent/human review. | Parse free text to automate value judgments. | Automation protects document contracts; people judge proportionality. | all design points |

#### Risks and mitigations

| ID | Scenario | Likelihood / impact | Prevention / detection | Owner | State |
| --- | --- | --- | --- | --- | --- |
| `K01` | Authors inventory every assertion or unchanged check. | Medium / medium | Categorical membership and exclusions are explicit and regression-protected. | `T01` | controlled |
| `K02` | The new inventory becomes another duplicated review ledger. | Medium / medium | Whiteboard stores owner disposition; PR stores detailed review history; parent response transports reviewer dispositions. | `T01` | controlled |
| `K03` | Validation wording encourages perfection or unlimited checking. | Low / high | Keep the five criteria explicit and simplest sufficient mechanism decisive. | `T01` | controlled |
| `K04` | Cross-document guidance drifts or repeats the canonical rule. | Medium / medium | One policy owner, role-specific consumers, and focused consistency assertions. | `T01` | controlled |

### Delivery strategy and readiness

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

### Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| `WB144-01` | `T01`: define categorical inventory membership in policy and template. | Focused structure and semantic review. | aligned |
| `WB144-02` | `T01`: expose every accepted field, including example, economics, simpler mechanism, references, and owner disposition. | Schema assertions and review. | aligned |
| `WB144-03` | `T01`: route the five criteria through author and reviewer guidance. | Cross-document assertions and review. | aligned |
| `WB144-04` | `T01`: make reuse or a cheaper adequate mechanism decisive unless insufficient. | Policy/skill assertions and review. | aligned |
| `WB144-05` | `T01`: require parent responses to reproduce the table or `None` and append both reviewer dispositions. | Workflow/reviewer assertions. | aligned |
| `WB144-06` | `T01`: cross-reference fail-close and plan-owned test evidence rather than duplicate it. | Template/policy consistency review. | aligned |
| `V01`, `FC01` | `T01`: implement the approved design-acceptance blocker and proportional recovery. | Focused negative/positive contract assertions plus semantic review. | aligned |

### Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- |
| `T01` | `DONE` | `None` | Deliver proportional disclosure and disposition of every newly designed runtime/contract rejection and every new acceptance checkpoint or blocking gate across canonical policy, portable guidance, README, and regressions. | Only the owner-authorized clarification amendment; no exhaustive inventory, ordinary-test duplication, automatic semantic scoring, new artifact, historical rewrite, or duplicated full policy. | Complete changed test file 20/20, focused PR validation, and diff checks passed; prior `d962127` audit is superseded; current exact-head audit, final review, and full validation are PR-owned gates. | `codex/issue-144-validation-review`; [PR #145](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/145); target `main` |

### Task specifications and context receipts

#### `T01` — Proportional validation disclosure

| Concern | Value |
| --- | --- |
| Outcome / non-scope | Make every new runtime/contract rejection and every new acceptance checkpoint or blocking gate visible and proportional without cataloguing unchanged checks, duplicating ordinary tests, or prescribing numerical scoring. |
| Source boundary | `docs/documentation-quality-policy.md`, `templates/discovery/solution-whiteboard.md`, `skills/sdd-project-workflow/SKILL.md`, `skills/sdd-feature-review/SKILL.md`, `README.md`, and directly affected tests. |
| Consumed dependencies | Frozen Whiteboard design `225c862`; approved `V01` and `FC01`; current documentation, error-handling, branch, review, and final-gate contracts; selected OWASP, AWS, and Google references; owner-authorized transcription and portability clarification. |
| Critical obligations | Do not change any Whiteboard byte without prior owner-authorized amendment; keep one canonical rule; preserve all five criteria; simplest sufficient mechanism is decisive; reviewers and owner dispose every row; cross-reference rather than duplicate evidence. |
| Required evidence | Focused contract regressions and documentation checks; author plus both retained reviewers approve exact implementation before final coverage work; missing tests reconciled; both reviewers approve exact final candidate; full validation passes; human merge authority. |
| Context receipt | Manifest/runtime current at `b3f13badb6e8b828f4185e6116939d51b5d3faeb`; accepted design frozen at `225c862`; both retained reviewers approved conclusion commit `0fff8bf`; owner subsequently authorized the transcription/portability correction recorded in Design amendments; no additional scope or gate. |
| Actual result | Added one canonical proportional-validation contract, one project-specific Whiteboard inventory, concise author/reviewer routing, a reader-facing explanation of the fail-close and assumptions disclosure pattern, and focused cross-document regression coverage. The owner-authorized Whiteboard clarification is recorded above; no new artifact, semantic scoring, or runtime checker was added; no missing non-focused test implementation was identified. |

### Recovery, decisions, and change control

#### Failure and blocker log

| ID | Task | Observed versus expected | Classification / evidence | Recovery or owner decision | State |
| --- | --- | --- | --- | --- | --- |
| `E01` | `T01` | A new test passed alone, but the complete changed test file exposed one stale compatibility assertion. | Agent test-scope mistake; reviewer reproduced 19/20. | Restore the existing normative sentence, then run the complete changed test file and focused PR validation. | resolved; 20/20 and focused validation passed |
| `E02` | `T01` | The initial regression checked schema and proportionality but not the approved blocking wording. | Focused coverage gap against `V01`/`FC01`. | Extend the same regression to protect policy, template, workflow, and reviewer blocking contracts. | resolved; assertions pass |

#### Delivery decision and amendment log

| ID / time | Decision or plan change | Reason / consequence | Affected design, contracts, or tasks | Authority |
| --- | --- | --- | --- | --- |
| `2026-09-30` | Use one task and the existing PR targeting `main`. | The changed surfaces express one indivisible contract; splitting adds coordination without independent value. | `WB144-01`–`WB144-06`, `V01`, `FC01`, `T01` | Repository branch policy and necessary-complexity goal |
| `2026-09-30` | Accept plan `175619209d4f5004969622c578fc219b7197b11f` and release `T01`. | Both retained reviewers approved the corrected one-task plan with no remaining findings. | `T01` readiness | Repository owner |
| `2026-09-30` | Owner approval of the implementation plan authorizes the named archive/reset closing transition. | Preserve the complete Whiteboard and plan in one archive, reset the live Whiteboard, and remove the live plan before final human review. | Cleanup inventory and merge-resulting canonical state | Repository owner |

### Plan validation and completion

#### Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | Every design point and `V01`/`FC01` maps to `T01`; no unexplained addition. | Current exact-head implementation-content audit is required after the correction; PR #145 records both reviewer dispositions. |
| Applicable validation passed | Focused changed-file/line tests; pre-final author-plus-reviewer audit; missing-test reconciliation; exact final-candidate review; full final validation. | Complete changed test file 20/20, focused PR validation, and diff checks passed; no missing test implementation remains; final candidate review and full validation pending. |
| Compatibility safe | Existing fail-close, test inventory, human gate, reviewer, and archive contracts remain coherent. | `E01` and `E02` are resolved; current-candidate compatibility review and approval are recorded in PR #145. |
| Merge-ready canonical state | Affected policy, template, skills, README, tests, plan, and archive/reset candidate agree before final review. | Closing candidate archives this complete state, resets the live Whiteboard, and removes the live plan. |
| PR-owned review and delivery | PR #145 owns findings, checks, human authority, merge, and target verification. | [PR #145](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/145) |
| Feature cleanup complete | Concluded Whiteboard and completed plan archived together; live Whiteboard reset and live plan removed in the closing candidate; owned worktree and branch cleaned after verified merge. | Archive/reset/removal authorized for this closing candidate; post-merge worktree and branch cleanup remains. |

#### Planned versus actual outcome

| Design / task | Planned result | Actual evidence or deviation | Remaining obligation / owner |
| --- | --- | --- | --- |
| `WB144-01`–`WB144-06`, `V01`, `FC01` / `T01` | One concise, proportional, cross-document validation-disclosure contract with focused regressions. | Implemented with the owner-authorized no-new-scope clarification; no missing test implementation remains. Current exact-head approval is PR-owned. | Closing-candidate review, full validation, human merge, target verification, and worktree/branch cleanup. |

#### Cleanup inventory

| Item | Keep, archive, remove, or reset | Ownership and evidence | Result |
| --- | --- | --- | --- |
| Manifest | Keep accepted playbook pin and stable authorities. | Reusable installation authority. | Preserved. |
| Whiteboard and implementation plan | Archive together, then reset/remove in the closing candidate. | Owner-approved plan and workflow completion contract. | Authorized for this closing candidate. |
| Issue #144 and PR #145 | Keep as durable need, review, and delivery evidence. | GitHub. | PR links to the combined archive. |
| Delivery worktree and branch | Remove after verified merge to `main`. | Owned by this delivery. | Pending post-merge cleanup. |

#### Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and outcomes | `T01` implemented the approved policy, Whiteboard template, role-specific skills, README, and focused regressions as one coherent contract. | `DISCLOSE` |
| Design consistency | Every `WB144` point and `V01`/`FC01` maps to `T01`; the owner-authorized clarification amendment is recorded; no unexplained addition exists. | `DISCLOSE` |
| Important boundaries | Inventory every new runtime/contract rejection and every new acceptance checkpoint or blocking gate; ordinary tests and unchanged validation are not duplicated; simplest sufficient mechanism is decisive. | `DISCLOSE` |
| Review findings | Historical corrections: `E01` restored the existing fail-close assertion contract; `E02` added missing blocker coverage. Current exact-head findings and reviewer dispositions are recorded in PR #145. | `DISCLOSE` |
| Validation | Complete changed test file 20/20, focused PR validation, and diff checks passed; no missing tests remain; full suite is deferred until final-candidate approval. | `DISCLOSE` |
| Decision requested | None until final candidate review and full validation complete; human merge authority remains pending. | `NONE` |
