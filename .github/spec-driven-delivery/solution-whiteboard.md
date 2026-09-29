# Solution Whiteboard — Proportional validation disclosure

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `OPEN` |
| Need / issue | [#144](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/144) |
| Owner | Repository owner |
| Concluded design revision | `None` |
| Open owner decisions | `V01`, `FC01` |

## Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| `DR01` | Every validation newly introduced by a design must be visible before design acceptance. | accepted |
| `DR02` | The parent human-gate response must list the same new validations after two-agent review. | accepted |
| `DR03` | Judge proportionality by traceability, correct ownership/boundary, marginal value, risk-versus-cost, and the simplest sufficient mechanism. | accepted |
| `DR04` | The simplest sufficient mechanism is decisive: reuse or a cheaper adequate option wins unless it is shown insufficient. | accepted |
| `DR05` | Runtime/contract validators and new blocking delivery or release gates require disposition; ordinary tests stay in the plan unless they add a blocking gate. | accepted |
| `DR06` | Existing unchanged validations are linked, not relisted. | accepted |
| `DR07` | A validation that also creates fail-closed behavior cross-references its fail-close row instead of duplicating it. | accepted |
| `DR08` | Use `None` when no new validation exists. | accepted |

## Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem / observed need | A design can add rejection logic or blocking gates without showing their value, placement, failure effect, and cost. |
| Required outcome | Before design acceptance, every new material validation is explicit and shown to be necessary and proportional. |
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
| `R01` | The Whiteboard lists every newly introduced material validation before conclusion. | Required | A dedicated table has no undisposed row at conclusion. | Owner |
| `R02` | The parent response reproduces the complete table after both reviewers inspect it. | Required | Human brief contains every row and both reviewer dispositions, or `None`. | Owner |
| `R03` | Each row is judged by all five proportionality criteria. | Required | Schema and guidance cover traceability, boundary, marginal value, cost, and simplest sufficient mechanism. | Owner |
| `R04` | Simpler adequate reuse defeats a more complex new validation. | Required | A row cannot be approved without explaining why reuse or a cheaper option is insufficient. | Owner |
| `R05` | Fail-close and test records remain canonical without duplication. | Required | Rows reference `FCxx` and plan test IDs where applicable. | Existing model |

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
| `K01` | The inventory becomes another exhaustive checklist. | Medium / medium | Limit it to new material validation; use `None`; link existing authority. | Reviewer rejects duplication. | Low |
| `K02` | Authors justify every validation with generic safety language. | Medium / high | Require a concrete protected outcome/risk and simpler-option comparison. | Revise or reject row. | Low |
| `K03` | A duplicated validator creates latency or false rejection. | Medium / high | Require marginal-value and cost assessment, with simplest sufficient mechanism decisive. | Remove or reuse existing mechanism. | Low |
| `K04` | A runtime rejection is listed but its fail-close effect is hidden. | Low / high | Require `FCxx` cross-reference when applicable. | Block conclusion until linked and approved. | Low |

## Decision log

| ID | Decision | Material alternatives | Rationale / tradeoff | Owner / evidence |
| --- | --- | --- | --- | --- |
| `D01` | Add a dedicated inventory for new material validations. | Fail-close-only or plan-only inventory. | Human accepts restrictions before implementation. | Owner |
| `D02` | Use five criteria: traceability, boundary, marginal value, proportional cost, and simplest sufficient mechanism. | Numerical quota or reviewer preference. | Risk-based judgment remains portable. | Owner and industry guidance |
| `D03` | Make simplest sufficient mechanism decisive. | Treat it as optional advice. | Directly prevents redundant validation and speculative complexity. | Owner |
| `D04` | Parent response owns the table after review; reviewers verify rows and dispositions. | Separate reviewer tables. | Matches findings, fail-close, and assumptions ownership. | Existing response model |
| `D05` | Reference overlapping fail-close and test records. | Duplicate full content. | Preserves canonical ownership. | Existing document model |

## Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `WB144-01` | Every newly introduced material validation is visible before design acceptance. | Runtime/contract validators and new blocking delivery/release gates only; unchanged validations are linked. | Whiteboard schema and lifecycle regressions. |
| `WB144-02` | Each row exposes boundary, protected outcome/risk, concrete invalid case, failure/recovery, cost, simpler option, and owner disposition. | Enough information for proportional judgment without enumerating implementations. | Cross-document review and structural tests. |
| `WB144-03` | All five criteria govern author and reviewer judgment. | Semantic judgment remains human/agent-owned; automation checks structure only. | Policy and skill review. |
| `WB144-04` | A new validation is rejected, removed, reused, or simplified unless a suitable existing or cheaper mechanism is shown insufficient. | Simplest sufficient mechanism is the primary anti-over-engineering boundary. | Reviewer disposition and human table. |
| `WB144-05` | Parent human-gate responses reproduce the complete reviewed table or `None`. | Reviewers provide dispositions; parent owns the combined response. | Workflow and response regressions. |
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

## Newly introduced validations

> [!IMPORTANT]
> **Hard rule.** Both reviewers MUST approve every row before the human gate.
> The parent response MUST then reproduce every row for human disposition. A
> concluded whiteboard MUST NOT contain a pending row. Use one all-`None` row
> when none exists. Existing unchanged validations and ordinary nonblocking
> test evidence MUST NOT be relisted.

| ID | Validation and execution boundary | Protected outcome / risk | Concrete invalid case | Failure effect / recovery | Cost / overhead | Reused or simpler option | Fail-close / test reference | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `V01` | Before design conclusion, block acceptance when a new material validation is missing, undisposed, or lacks proportionality justification. | Prevent hidden or over-engineered rejection logic and blocking gates. | A design adds a deployment blocker that duplicates an existing contract check but never shows its latency, false-rejection risk, or simpler reusable option. | Keep the design open; author lists, removes, reuses, or simplifies the validation; reviewers recheck; owner disposes the row. | One concise row per new material validation; no unchanged-validator or ordinary-test inventory. | Reuse the existing Whiteboard and human gate; no new document or lifecycle gate. This is the smallest sufficient mechanism. | `FC01`; structural regression only. | `Pending` |

## Newly introduced fail-closed behaviors

| ID | Trigger | Required fail-closed response | Concrete example | Impact | Recovery / best next action | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- |
| `FC01` | A new material validation is missing, lacks required proportionality information, or has no reviewer/owner disposition. | Do not conclude the design or start dependent planning. | A new API validator rejects an input already safely handled by an existing framework, but the design omits the duplicate check and its cost from review. | Design acceptance pauses; no runtime behavior is changed. | Author lists and justifies the validator or removes/reuses it; both reviewers approve the correction; owner accepts or rejects the row. | `Pending` |

## Design amendments

| Amendment | Changed design points | Reason and impact | Owner decision |
| --- | --- | --- | --- |
| None | None | None | None |

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | Add a reviewed/human-disposed inventory of every new material validation using five proportionality criteria. | `HUMAN_DECISION` |
| Important boundaries | Simplest sufficient mechanism is decisive; unchanged validators and ordinary tests are not duplicated. | `DISCLOSE` |
| Alternatives rejected | Fail-close-only, plan-only, or exhaustive inventories. | `DISCLOSE` |
| Remaining gaps or risks | Reviewer confirmation of schema clarity, proportionality, and non-duplication. | `DISCLOSE` |
| Newly introduced validations | `V01`, including boundary, risk, example, failure/recovery, cost, simpler option, references, and reviewer dispositions. | `HUMAN_DECISION` |
| Newly introduced fail-closed behavior | `FC01`; owner disposition follows two-agent review. | `HUMAN_DECISION` |
| Decision requested | After both reviewers approve, accept `WB144-01`–`WB144-06`, `V01`, and `FC01`, then authorize conclusion and planning. | `HUMAN_DECISION` |
