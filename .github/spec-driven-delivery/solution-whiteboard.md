# Solution Whiteboard — Fail-closed recovery action

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `OPEN` |
| Need / issue | [#135](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/135) |
| Owner | Repository owner |
| Concluded design revision | `WB-135-1 candidate` |
| Open owner decisions | Approve `WB-135-1` and `FC01` after two-agent design review |

## Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| `DR01` | A fail-closed behavior is hard to judge when the table explains only the stop and its impact, not the safest way to recover. | accepted |
| `DR02` | Add one dedicated recovery column rather than embedding recovery ambiguously in the concrete example. | accepted |
| `DR03` | The recovery entry must identify the smallest safe action, responsible actor, and retry or resume condition. | accepted |
| `DR04` | Preserve agent discretion: require an actionable outcome, not one prescribed implementation method. | accepted |
| `DR05` | Keep one canonical table and concise consuming guidance; do not duplicate a new policy section. | accepted |

## Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem / observed need | The current fail-closed table contains trigger, stopped response, example, impact, and disposition, while recovery is only optional prose inside the example. |
| Required outcome | Every material fail-closed row exposes the safest next action after the stop so the owner can judge proportionality and operational usability. |
| In scope | Whiteboard template, accepted-design policy, author/reviewer skills, lifecycle validation, reader guidance, and focused regressions. |
| Out of scope / deferred | Automatic remediation, project-specific recovery algorithms, enumerating every error case, or rewriting historical archives. |
| Confidence | High; the owner selected the missing decision field and the current canonical table is identified. |

## Authority and context

| Source | Authority or relevant content | Freshness / verification |
| --- | --- | --- |
| Owner decision in Issue #135 discussion | Add a column describing the best action after fail-close to repair or recover from the failure. | Current |
| [Documentation quality policy](../../docs/documentation-quality-policy.md) | Owns accepted-design authority and human brief outcomes. | Current at `714c9391839f3073b6c26f7a65b0b5933278a708` |
| [Error handling](../../docs/error-handling.md) | Owns invariant protection, simple fail-closed behavior, retry, and escalation. | Current at `714c9391839f3073b6c26f7a65b0b5933278a708` |
| [Whiteboard template](../../templates/discovery/solution-whiteboard.md) | Owns the reusable fail-closed disposition table. | Current at `714c9391839f3073b6c26f7a65b0b5933278a708` |

## Requirements and acceptance

| ID | Need or requirement | Priority | Acceptance signal | Source |
| --- | --- | --- | --- | --- |
| `R01` | Add `Recovery / best next action` to the fail-closed approval table without removing existing fields. | Required | Template and examples expose the column. | Owner |
| `R02` | Each material row states the smallest safe recovery action, responsible actor, and retry or resume condition. | Required | Policy, author skill, reviewer skill, and validation agree. | Owner / error-handling authority |
| `R03` | The human response preserves the recovery information after reviewer approval. | Required | Human-brief guidance explicitly requires it. | Owner |
| `R04` | Missing or non-actionable recovery information blocks conclusion prospectively. | Required | Lifecycle checker and negative regression reject it. | Stable outcome |
| `R05` | Guidance remains concise and outcome-based. | Required | No new document or prescriptive recovery workflow is added. | Six goals |

## Options, experiments, and tradeoffs

| ID | Option or experiment | Benefits | Costs / risks | Evidence needed | Disposition |
| --- | --- | --- | --- | --- | --- |
| `O01` | Keep recovery inside `Concrete example`. | No schema change. | Recovery remains optional and difficult to compare across rows. | Existing template inspection. | rejected |
| `O02` | Add `Recovery / best next action`. | Separates explanation from the action needed to restore progress. | One additional concise column. | Cross-document consistency and negative validation. | accepted |
| `O03` | Add a separate recovery document or workflow. | More space for detail. | Duplicates error-handling authority and over-engineers a review field. | None. | rejected |

## Decision log

| ID | Decision | Material alternatives | Rationale / tradeoff | Owner / evidence |
| --- | --- | --- | --- | --- |
| `D01` | Add a dedicated `Recovery / best next action` column after `Impact`. | `O01`, `O03` | Makes recovery independently reviewable with the smallest schema change. | Owner / `O02` |
| `D02` | Require action, actor, and retry/resume condition, or an explicit human-decision boundary. | Free-form advice. | Produces operationally useful information without prescribing implementation. | Owner / error-handling authority |
| `D03` | Enforce the column only for prospective concluded whiteboards and preserve historical archives. | Rewrite history. | Keeps current guidance correct without altering accepted evidence. | Compatibility boundary |
| `D04` | Reviewers assess whether the recovery path makes the fail-closed behavior proportionate. | Check only column presence. | The column exists to improve human judgment, not merely satisfy syntax. | Owner |

## Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `WB135-01` | Every new fail-closed behavior has a distinct `Recovery / best next action`. | Keep trigger, required response, concrete example, impact, and disposition unchanged. | Template and reader guidance agree. |
| `WB135-02` | Recovery identifies the smallest safe action, responsible actor, and condition for retry or resume; otherwise it names the required human decision. | Outcome-based wording preserves project-specific judgment. | Positive and negative fixtures cover the rule. |
| `WB135-03` | The parent human response includes the recovery field after two-agent design review. | The example remains explanatory and cannot expand the behavior. | Workflow and reviewer contracts agree. |
| `WB135-04` | A prospective conclusion missing actionable recovery information is invalid. | Historical archives remain unchanged. | Lifecycle validation rejects missing or empty recovery. |

## Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| `DR01` | `WB135-01`, `WB135-02` | accepted | Recovery becomes independently visible and actionable. |
| `DR02` | `WB135-01` | accepted | A dedicated column avoids ambiguity. |
| `DR03` | `WB135-02` | accepted | The minimum operational fields are explicit. |
| `DR04` | `WB135-02` | accepted | Only the outcome is fixed; the safe method remains contextual. |
| `DR05` | `WB135-03`, `WB135-04` | accepted | Existing canonical surfaces carry the rule without a new artifact. |

## Newly introduced fail-closed behaviors

| ID | Trigger | Required fail-closed response | Concrete example | Impact | Recovery / best next action | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- |
| `FC01` | A prospective concluded whiteboard omits `Recovery / best next action`, or a material row leaves it empty or non-actionable. | Do not conclude the whiteboard or begin dependent planning. | A design says a conflicting request is rejected but gives no actor or condition for retry; validation blocks conclusion rather than leaving the owner to infer recovery. | Adds one explicit design field and prevents approval of an operationally incomplete stop boundary. | Author supplies the smallest safe action, responsible actor, and retry/resume condition—or names the required human decision—then reruns validation and returns the candidate to the same reviewers. | Pending owner approval after reviewer approval |

## Design amendments

| Amendment | Changed design points | Reason and impact | Owner decision |
| --- | --- | --- | --- |
| `None` | `None` | Initial candidate. | `None` |

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | Add one recovery column; require action, actor, and retry/resume condition; preserve historical archives. | `HUMAN_DECISION` |
| Important boundaries | Examples stay explanatory; recovery cannot expand scope or prescribe one implementation method. | `DISCLOSE` |
| Alternatives rejected | Optional recovery inside examples and a separate recovery artifact. | `DISCLOSE` |
| Remaining gaps or risks | None identified before independent design review. | `NONE` |
| Newly introduced fail-closed behavior | `FC01`: incomplete recovery information blocks prospective conclusion; the author completes it and repeats validation/review. | `HUMAN_DECISION` |
| Decision requested | After both reviewers approve, accept `WB-135-1` and `FC01` so planning may begin. | `HUMAN_DECISION` |
