# Solution Whiteboard — Proportional validation disclosure

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [#144](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/144) |
| Owner | Repository owner |
| Concluded design revision | `225c862fbdff6f6c161ff35bf98bfe036a5b2f83` |
| Open owner decisions | `None` |

## Discussion draft

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
| `DR09` | Frame the inventory with Phil Crosby's conformance, prevention, and price-of-nonconformance principles without claiming a mechanical Crosby template. | accepted |

## Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem / observed need | A design can add rejection logic or acceptance checkpoints without showing their value, placement, failure effect, and cost. |
| Required outcome | Before design acceptance, every new runtime/contract rejection and every new acceptance checkpoint or blocking gate is explicit and shown to be necessary and proportional. |
| Actors and critical journeys | Authors design validations, reviewers challenge necessity and placement, and the owner accepts, rejects, revises, or defers each row. |
| In scope | Whiteboard inventory, parent response, five review criteria, fail-close cross-reference, portable guidance, README explanation, and regressions. |
| Out of scope / deferred | Relisting unchanged validators, moving ordinary tests out of the plan, numerical quotas, or automating semantic proportionality judgment. |
| Confidence | High; the owner accepted the inventory and all five criteria, especially simplest sufficient mechanism. |

## Authority and context

| Source | Authority or relevant content | Freshness / verification |
| --- | --- | --- |
| Owner decision in Issue #144 discussion | Requires the validations table in design and parent responses and accepts the five criteria. | Current on 2026-09-29 |
| [Documentation quality policy](../../docs/documentation-quality-policy.md) | Owns design acceptance, proportionality, human briefs, and test evidence. | Current at `b3f13ba` |
| [Error handling](../../docs/error-handling.md) | Owns fail-closed recovery and escalation. | Current at `b3f13ba` |
| [OWASP Input Validation](https://cheatsheetseries.owasp.org/cheatsheets/Input_Validation_Cheat_Sheet.html) | Supports early validation at untrusted boundaries and syntactic/semantic distinction. | Primary guidance checked 2026-09-29 |
| [AWS risk guidance](https://docs.aws.amazon.com/wellarchitected/latest/userguide/identify-and-understand-risks.html) | Supports likelihood, impact, cost, and ownership assessment. | Primary guidance checked 2026-09-29 |
| [AWS controls guidance](https://docs.aws.amazon.com/wellarchitected/latest/management-and-governance-guide/controls.html) | Warns that duplicate controls can add cost. | Primary guidance checked 2026-09-29 |
| [Google review guidance](https://google.github.io/eng-practices/review/reviewer/looking-for.html) | Rejects speculative complexity and treats tests as maintained code. | Primary guidance checked 2026-09-29 |
| [ASQ: Philip Crosby](https://asq.org/about-asq/honorary-members/crosby) | Supports conformance to requirements and zero-defect prevention. | Authority summary checked 2026-09-30 |
| [ASQ: Cost of Quality](https://asq.org/quality-resources/cost-of-quality) | Distinguishes prevention/appraisal cost from internal and external failure cost. | Authority guidance checked 2026-09-30 |

## Facts, assumptions, and unknowns

### Facts

| ID | Fact | Evidence |
| --- | --- | --- |
| `F01` | The Whiteboard exposes new fail-closed behaviors but has no dedicated inventory for all new validations. | Current template and policy |
| `F02` | The implementation plan already owns ordinary test inventory and final-gate coverage. | Current workflow and plan template |
| `F03` | The parent brief already consolidates findings, fail-close behavior, assumptions, and validation evidence. | Current policy and workflow skill |

### Assumptions

| ID | Assumption | Failure impact | Validation / state |
| --- | --- | --- | --- |
| None | None | None | No material assumption remains; current authorities and owner decisions define the design. |

### Unknowns and owner decisions

| ID | Question or decision | Why it matters | Owner / source | State / resolution |
| --- | --- | --- | --- | --- |
| `Q01` | Must ordinary tests appear in the new validation inventory? | Duplicating the plan would add noise. | Owner decision | No; only a test that creates a new blocking gate belongs here. |
| `Q02` | What is the primary anti-over-engineering criterion? | The inventory must change decisions, not become ceremony. | Owner decision | The simplest sufficient mechanism; reuse or a cheaper adequate option wins unless shown insufficient. |

## Requirements and acceptance

| ID | Need or requirement | Priority | Acceptance signal | Source |
| --- | --- | --- | --- | --- |
| `R01` | The Whiteboard lists every new runtime/contract rejection and every new acceptance checkpoint or blocking gate before conclusion. | Required | A dedicated table has no undisposed row at conclusion. | Owner |
| `R02` | The parent response reproduces the complete table after both reviewers inspect it. | Required | Human brief appends both exact reviewer dispositions to every row, or reports `None`; PR owns detailed review history. | Owner |
| `R03` | Each row is judged by all five proportionality criteria. | Required | Schema covers traceability, boundary, marginal value, price of conformance versus credible price of nonconformance avoided, and simplest sufficient mechanism. | Owner |
| `R04` | Simpler adequate reuse defeats a more complex new validation. | Required | A row cannot be approved without explaining why reuse or a cheaper option is insufficient. | Owner |
| `R05` | Fail-close and test records remain canonical without duplication. | Required | Rows reference `FCxx` and plan test IDs where applicable; a test added under an existing gate remains plan evidence even though failure blocks that gate. | Existing model |
| `R06` | Crosby provides the quality/economic lens, not a fixed table or a mandate for unlimited validation. | Required | Guidance says Crosby-aligned, rejects mechanical scoring, and keeps the five accepted criteria. | Owner |

## Options, experiments, and tradeoffs

| ID | Option or experiment | Benefits | Costs / risks | Evidence needed | Disposition |
| --- | --- | --- | --- | --- | --- |
| `O01` | Add one dedicated new-validation table to the Whiteboard and parent response. | Complete visibility with one canonical design record. | Small author/review overhead. | Template, skills, policy, tests. | accepted |
| `O02` | Put all validations into the fail-close table. | Fewer tables. | Misclassifies non-fail-close gates and overloads recovery semantics. | None. | rejected |
| `O03` | Put all validations only in the implementation plan. | Avoids Whiteboard change. | Hides design restrictions until after design acceptance. | None. | rejected |
| `O04` | Require every existing validator and test to be listed. | Appears exhaustive. | Duplicates authorities and encourages ceremony. | None. | rejected |

## Policy applicability and gaps

| Concern | Applicable authority | Feature-specific consequence | Gap / action |
| --- | --- | --- | --- |
| Testing and quality | Documentation quality policy | Ordinary tests stay in the plan; new blocking gates need design disposition. | Add validation-disclosure contract. |
| Security, privacy, and abuse | Project authority plus OWASP when applicable | Security validation remains risk- and boundary-driven. | No universal validator mandate. |
| API, data, and compatibility | Evidence-bounded scope | Validation must use owned contracts, not incidental state. | Include ownership/boundary criterion. |
| Concurrency, idempotency, and recovery | Error handling | A rejecting or blocking validation links its fail-close behavior and recovery. | Cross-reference rather than duplicate. |
| Performance and operations | Proportional effort | Latency, false rejection, maintenance, and operating cost are explicit. | Include cost criterion. |

## Risks and consequences

| ID | Scenario | Likelihood / impact | Prevention or detection | Recovery / owner | Residual risk |
| --- | --- | --- | --- | --- | --- |
| `K01` | The inventory becomes another exhaustive checklist. | Medium / medium | Limit it to new runtime/contract rejections and new acceptance checkpoints or gates; use `None`; link existing authority. | Reviewer rejects duplication. | Low |
| `K02` | Authors justify every validation with generic safety language. | Medium / high | Require a concrete protected outcome/risk and simpler-option comparison. | Revise or reject row. | Low |
| `K03` | A duplicated validator creates latency or false rejection. | Medium / high | Require marginal-value and cost assessment, with simplest sufficient mechanism decisive. | Remove or reuse existing mechanism. | Low |
| `K04` | A runtime rejection is listed but its fail-close effect is hidden. | Low / high | Require `FCxx` cross-reference when applicable. | Block conclusion until linked and approved. | Low |

## Decision log

| ID | Decision | Material alternatives | Rationale / tradeoff | Owner / evidence |
| --- | --- | --- | --- | --- |
| `D01` | Add a dedicated inventory for the categorically defined in-scope validations. | Fail-close-only or plan-only inventory. | Human accepts restrictions before implementation. | Owner |
| `D02` | Use five criteria: traceability, boundary, marginal value, proportional cost, and simplest sufficient mechanism. | Numerical quota or reviewer preference. | Risk-based judgment remains portable. | Owner and industry guidance |
| `D03` | Make simplest sufficient mechanism decisive. | Treat it as optional advice. | Directly prevents redundant validation and speculative complexity. | Owner |
| `D04` | Parent response owns the table after review and appends both exact reviewer dispositions; the Whiteboard stores only owner disposition. | Separate reviewer tables or review history in the Whiteboard. | Matches findings, fail-close, and assumptions ownership while PR retains review history. | Existing response model |
| `D05` | Reference overlapping fail-close and test records. | Duplicate full content. | Preserves canonical ownership. | Existing document model |
| `D06` | Use a Crosby-aligned lens: conformance supplies traceability, prevention supplies correct placement and simplest mechanism, and price of conformance is compared with credible price of nonconformance avoided. | Claim the schema is Crosby's fixed format or treat zero defects as unlimited checking. | Makes validation economics visible without weakening proportionality or adding numerical scoring. | Owner and ASQ references |

## Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `WB144-01` | Every new runtime/contract rejection and every new acceptance checkpoint or blocking gate is visible before design acceptance. | An individual test or assertion added under an existing gate remains plan evidence; unchanged validations are linked. | Whiteboard schema and lifecycle regressions. |
| `WB144-02` | Each row exposes owning authority and boundary, protected outcome/risk, marginal value beyond existing controls, concrete invalid case, failure effect, price of conformance and credible price of nonconformance avoided, simpler option and its coverage, why that option is insufficient, references, and owner disposition. | Every row directly answers all five proportionality criteria without numerical scoring. | Cross-document review and structural tests. |
| `WB144-03` | All five criteria govern author and reviewer judgment. | Semantic judgment remains human/agent-owned; automation checks structure only. | Policy and skill review. |
| `WB144-04` | A new validation is rejected, removed, reused, or simplified unless a suitable existing or cheaper mechanism is shown insufficient. | Simplest sufficient mechanism is the primary anti-over-engineering boundary. | Reviewer disposition and human table. |
| `WB144-05` | Parent human-gate responses reproduce the complete reviewed table or `None` and append both exact reviewer dispositions. | Whiteboard stores only owner disposition; PR owns detailed review history. | Workflow and response regressions. |
| `WB144-06` | Overlapping fail-close and test evidence is cross-referenced, not duplicated. | Ordinary tests remain in the plan unless they create a new blocking gate. | Template and consistency review. |

## Draft-to-conclusion reconciliation

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
| `DR09` | `WB144-02`, `WB144-03`, `WB144-04` | accepted | Crosby's lens clarifies requirement conformance, prevention, and validation economics without creating another schema. |

## Newly introduced validations

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

| ID | Validation, owning authority, and execution boundary | Protected outcome / risk and marginal value beyond existing controls | Concrete invalid case | Failure effect / recovery | Price of conformance / credible price of nonconformance avoided | Existing/reusable or cheaper mechanism, its coverage, and why insufficient | Fail-close / test reference | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `V01` | Owner-approved design-acceptance boundary: before conclusion, require a complete and disposed inventory row for every new runtime/contract rejection and every new acceptance checkpoint or blocking gate. | Existing fail-close review exposes rejection recovery but not every new validation's ownership, marginal protection, economics, or simpler alternative; this inventory closes that gap. | A design adds a deployment blocker that duplicates an existing contract check but never shows its latency, false-rejection risk, or simpler reusable option. | Design conclusion and dependent planning remain blocked; recovery is owned by `FC01`. | Conformance: one concise row and semantic review per in-scope validation. Nonconformance avoided: hidden rejection, duplicated controls, false rejection, and their implementation/operating/rework cost. No unchanged-validator or ordinary-test inventory. | Reuse the existing Whiteboard and human gate. The fail-close table alone does not cover non-fail-close checkpoints or proportionality, so one compact inventory row is the smallest sufficient addition. | `FC01`; structural regression only. | `Approved` |

## Newly introduced fail-closed behaviors

| ID | Trigger | Required fail-closed response | Concrete example | Impact | Recovery / best next action | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- |
| `FC01` | An in-scope validation is missing, lacks required proportionality information, or has no reviewer/owner disposition. | Do not conclude the design or start dependent planning. | A new API validator rejects an input already safely handled by an existing framework, but the design omits the duplicate check and its cost from review. | Design acceptance pauses; no runtime behavior is changed. | Author lists and justifies the validator or removes/reuses it; both reviewers approve the correction; owner accepts or rejects the row. | `Approved` |

## Design amendments

| Amendment | Changed design points | Reason and impact | Owner decision |
| --- | --- | --- | --- |
| None | None | None | None |

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | Add a reviewed/human-disposed inventory of every new runtime/contract rejection and every new acceptance checkpoint or blocking gate, using five proportionality criteria. | `DISCLOSE` |
| Important boundaries | The inventory is Crosby-aligned, not a mechanical Crosby template; simplest sufficient mechanism is decisive, and unchanged validators or ordinary tests are not duplicated. | `DISCLOSE` |
| Alternatives rejected | Fail-close-only, plan-only, or exhaustive inventories. | `DISCLOSE` |
| Remaining gaps or risks | None; both reviewers approved the exact design revision. | `NONE` |
| Newly introduced validations | Owner approved `V01`, including authority/boundary, marginal value, example, failure effect, cost, simpler option and why insufficient, references, and both reviewer dispositions. | `DISCLOSE` |
| Newly introduced fail-closed behavior | Owner approved `FC01` after two-agent review. | `DISCLOSE` |
| Decision requested | None; owner accepted `WB144-01`–`WB144-06`, `V01`, and `FC01`, so planning is authorized. | `NONE` |
