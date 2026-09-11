# Solution whiteboard — archive completeness and Fast Fix

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [#102](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/102), [#103](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/103) |
| Owner | Repository owner |
| Concluded design revision | Git commit containing this conclusion; exact SHA is supplied to reviewers |
| Open owner decisions | `None` |

## Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| `DR01` | Deliver the two related issues in one feature with two implementation tasks. | accepted |
| `DR02` | `T01` combines the concluded whiteboard and completed implementation plan into one durable delivery archive while GitHub keeps detailed review and merge evidence. | accepted |
| `DR03` | `T02` adds a narrowly eligible Fast Fix route that omits the whiteboard and implementation plan when one issue provides sufficient boundaries. | accepted |
| `DR04` | Fast Fix removes duplicate artifacts, not quality controls; focused evidence covers changed files, lines, and observable behavior before review. | accepted |
| `DR05` | The same two reviewers inspect each exact Fast Fix candidate; final full validation follows reviewer convergence and precedes human merge acceptance. | accepted |
| `DR06` | A material design, contract, security, concurrency, deployment, policy, accessibility, or scope decision disqualifies Fast Fix and escalates to normal delivery. | accepted |
| `DR07` | UI-only Fast Fix uses the smallest applicable behavioral and visual evidence without inventing disproportionate test infrastructure. | accepted |
| `DR08` | The agent selects and discloses Fast Fix when eligibility is unambiguous; only ambiguity or missing owner authority creates a human decision. | accepted |

## Current understanding

| Concern | Accepted understanding |
| --- | --- |
| Problem | Normal cleanup loses useful completed-plan context, while small bounded fixes repeat issue content in a whiteboard and plan. |
| Required outcome | Preserve the complete reusable context of normal deliveries and permit proportional Fast Fix delivery without weakening quality or authority. |
| In scope | Archive composition and lifecycle; Fast Fix ownership, eligibility, escalation, validation, review, merge, documentation, and compatibility. |
| Out of scope | Automatic merge, fewer reviewers, reduced final validation, retrospective rewriting of prior archives, or replacing GitHub evidence. |
| Confidence | High; existing three-document ownership and review gates provide the required boundaries. |

## Authority and facts

| Source | Authority or verified fact | Consequence |
| --- | --- | --- |
| Repository owner decisions in this discussion | Two tasks; proportional UI evidence; agent-selected Fast Fix when eligibility is clear | Binding feature outcome |
| [Issue #102](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/102) | One archive must preserve concluded design and completed implementation context | `T01` scope |
| [Issue #103](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/103) | Small bounded corrections may avoid duplicate feature artifacts | `T02` scope |
| [Contributing](../../CONTRIBUTING.md) | Branch, validation, retained-reviewer, human-acceptance, and cleanup boundaries | Both routes preserve applicable gates |
| [Documentation quality policy](../../docs/documentation-quality-policy.md) | Canonical ownership, focused evidence, full validation, review, and human briefs | No duplicated normative contract |
| [Error handling](../../docs/error-handling.md) | Proportional recovery and escalation | Valid work survives route escalation |

## Requirements and acceptance

| ID | Required outcome | Acceptance signal |
| --- | --- | --- |
| `R01` | A normal delivery closes with one archive containing the final concluded whiteboard and completed implementation plan. | Lifecycle fixture retains design, task mapping, actual results, validation expectations, deviations, and links in one archive. |
| `R02` | The closing candidate creates the archive before resetting the live whiteboard and removing the live plan. | Positive and negative lifecycle tests prove ordering and reject missing or competing archives. |
| `R03` | GitHub remains authoritative for detailed findings, approvals, checks, merge, and issue history. | Templates and guidance link instead of copying that evidence. |
| `R04` | An agent may select Fast Fix only for a small, bounded correction with an unambiguous accepted outcome and no material design decision. | Guidance and fixtures distinguish eligible, ambiguous, and disqualifying cases. |
| `R05` | Fast Fix uses its GitHub Issue for the problem, accepted outcome, scope, and validation intent, and its PR for candidate, review, checks, acceptance, and merge evidence. | No feature whiteboard, plan, or archive is created for an eligible Fast Fix. |
| `R06` | Fast Fix keeps applicable focused evidence, two retained reviewers, final full validation, and human merge acceptance. | Review-loop tests and documentation preserve the exact-candidate sequence. |
| `R07` | UI evidence matches changed behavior proportionally. | Applicable component, interaction, rendered, viewport, accessibility, or smoke proof is recorded; unrelated infrastructure is not required. |
| `R08` | Discovery of material uncertainty or scope expansion escalates Fast Fix to normal delivery without losing valid work or evidence. | Escalation fixtures preserve the issue and candidate while creating the required whiteboard and plan. |
| `R09` | Existing active normal deliveries finish under the normal route and adopt the combined archive at closure; prior completed archives are not rewritten. | Migration wording and compatibility tests are explicit. |
| `R10` | README, diagrams, templates, skills, policies, examples, and lifecycle checks remain mutually consistent. | Focused and final repository validation pass. |

## Options and decisions

| ID | Decision | Alternative rejected | Rationale |
| --- | --- | --- | --- |
| `D01` | Combine the final whiteboard and completed plan into one archive per normal delivery. | Continue archiving only the whiteboard or keep two archives. | One document preserves context without duplicating ownership. |
| `D02` | The combined archive contains durable design and execution context, with links to issues and PRs. | Copy PR review and merge evidence into Markdown. | GitHub already owns detailed evidence and history. |
| `D03` | Fast Fix is a separate proportional route with no feature whiteboard, implementation plan, or delivery archive. | Make a smaller duplicate set of those documents. | The issue and PR already provide the necessary canonical owners. |
| `D04` | The agent chooses Fast Fix and discloses the rationale when every eligibility boundary is clear. | Require owner approval merely to select the route. | An extra route gate would recreate avoidable overhead; substantive decisions still stop. |
| `D05` | Fast Fix retains focused evidence, two reviewers, final full validation, and human merge acceptance. | Reduce quality gates because the change is small. | Artifact reduction must not become evidence reduction. |
| `D06` | UI-only Fast Fix selects evidence by observable behavior and risk. | Require backend-style unit tests or a new visual-testing system in every case. | Proportional evidence protects outcomes without over-engineering. |
| `D07` | Material uncertainty escalates to normal delivery and preserves valid work. | Stretch Fast Fix eligibility or discard/restart work. | Fail closed on route eligibility while avoiding duplicated recovery. |
| `D08` | Implement as `T01` followed by `T02`. | One broad task or two unrelated deliveries. | Separate reviewable outcomes while sharing one consistent lifecycle change. |

## Policy applicability and risks

| Concern | Accepted boundary | Risk handling |
| --- | --- | --- |
| Canonical ownership | Manifest owns installation; whiteboard and plan own normal active delivery; Issue and PR own Fast Fix; one combined archive owns closed normal-delivery context. | Lifecycle checks reject competing live or archive owners. |
| Testing and review | Focused evidence precedes exact-candidate review; full applicable validation follows final reviewer convergence and precedes human merge acceptance. | Candidate changes invalidate the affected evidence as defined by current policy. |
| Route eligibility | No material architecture, schema, public contract, security, concurrency, deployment, systemic policy, accessibility-policy, or product decision. | Ambiguity fails closed to normal delivery; agent mistakes are corrected without inventing a human stop. |
| UI evidence | Test or inspect the affected behavior, states, viewports, accessibility obligations, and smoke journey that materially apply. | Missing applicable evidence blocks review; hypothetical infrastructure is not required. |
| Migration | Active normal deliveries use the combined archive when they close; old completed archives stay historical. | No mass migration or history rewrite. |
| Over-engineering | Add only artifacts and checks that protect an accepted outcome or invariant. | Reviewers challenge duplicated records, speculative eligibility rules, and unnecessary test machinery. |

## Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `CD01` | Normal delivery closes into one combined design-and-implementation archive. | Preserve final decisions, mapping, tasks, actual results, validation expectations, deviations, and issue/PR links; do not copy detailed GitHub evidence. | Archive fixture and lifecycle checks. |
| `CD02` | Archive creation, live-plan removal, and whiteboard reset are one merge-ready canonical transition. | Never remove the live sources before their durable content exists in the candidate. | Positive, missing-archive, and competing-archive cases. |
| `CD03` | Fast Fix uses Issue plus PR instead of whiteboard, plan, or archive. | Eligible only when outcome, scope, non-scope, validation intent, and authority are unambiguous and bounded. | Eligible-route fixture contains no redundant feature artifacts. |
| `CD04` | Agent selects and discloses Fast Fix without a separate route-approval gate. | Missing authority, material ambiguity, or disqualifying scope requires human input or normal delivery. | Routing tests and human-brief wording. |
| `CD05` | Fast Fix preserves the standard quality loop. | Applicable focused evidence, same two reviewers through merge, final full validation, and human merge acceptance remain required. | Exact-candidate positive and invalidation tests. |
| `CD06` | UI-only Fast Fix uses proportional behavioral and visual evidence. | Validate material UI behavior and risk; do not require unrelated tests or infrastructure. | Representative UI guidance and fixture. |
| `CD07` | Fast Fix escalates in place when a material design boundary appears. | Preserve valid issue, branch, code, tests, and evidence; add normal artifacts before dependent work continues. | Escalation-path fixture. |
| `CD08` | Existing normal deliveries adopt the new closing archive prospectively; prior archives remain untouched. | No retrospective history rewrite. | Migration guidance and compatibility coverage. |
| `CD09` | Two sequential tasks implement the design and all reader-facing surfaces remain consistent. | `T01` establishes the normal archive model; `T02` adds the proportional alternative. | Complete design-to-task mapping and repository validation. |

## Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| `DR01` | `CD09` | accepted | Two tasks provide clear outcome boundaries. |
| `DR02` | `CD01`, `CD02` | accepted | Combined archive preserves the previously lost execution context. |
| `DR03` | `CD03` | accepted | Fast Fix removes redundant active-delivery documents. |
| `DR04` | `CD05` | accepted | Evidence remains outcome-based and proportional. |
| `DR05` | `CD05` | accepted | Current exact-candidate review and final-validation boundaries remain. |
| `DR06` | `CD04`, `CD07` | accepted | Material expansion fails closed to normal delivery. |
| `DR07` | `CD06` | accepted | UI proof follows observable behavior rather than an unrelated test type. |
| `DR08` | `CD04` | accepted | Clear cases stay agent-routable; substantive ambiguity still stops. |

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | One normal-delivery combined archive; one Issue-plus-PR Fast Fix route; agent routing for unambiguous cases. | `DISCLOSE` |
| Important boundaries | Fast Fix removes documents only, preserves quality and human merge gates, and escalates on material uncertainty. | `DISCLOSE` |
| Alternatives rejected | Whiteboard-only archive, duplicate archives, reduced Fast Fix review/testing, mandatory route approval, and forced UI test infrastructure. | `DISCLOSE` |
| Remaining gaps or risks | None; reviewers must verify completeness, canonical ownership, migration, and lifecycle-test feasibility. | `NONE` |
| Decision requested | Accept the exact reviewed concluded design before implementation planning. | `HUMAN_DECISION` |
