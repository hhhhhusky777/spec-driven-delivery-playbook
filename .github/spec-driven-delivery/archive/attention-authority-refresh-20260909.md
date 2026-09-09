# Solution Whiteboard — Agent attention and authority refresh

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [#87](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/87) |
| Owner | Repository owner |
| Concluded design revision | Owner decisions on 2026-09-09 |
| Open owner decisions | `None` |

## Delivery links

- Issue: [#87](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/87)
- Pull request: [#88](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/88)

## Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| `DR01` | Markdown styling alone is not a reliable agent-attention mechanism. | Accepted |
| `DR02` | Existing briefs should tell agents whether an item needs a human decision, an agent correction, disclosure only, or no action. | Accepted |
| `DR03` | A project can add or change canonical policy after one-time adoption; later deliveries must discover and reconcile it without reinstalling the playbook. | Accepted |
| `DR04` | Discovery must use semantic agent judgment rather than a rigid filename-only policy engine. | Accepted |
| `DR05` | Policy text remains in its canonical source; the manifest links authority and records only stable boundaries and verification. | Accepted |

## Decision log

| ID | Decision | Material alternatives | Rationale / tradeoff | Owner / evidence |
| --- | --- | --- | --- | --- |
| `D01` | Extend existing human briefs with a handling classification. | Depend on bold text; add another attention document or gate. | A semantic label survives raw Markdown and handoff without extra ceremony. | Owner discussion; issue #87 |
| `D02` | Reconcile manifest authority before design work and whenever candidate work changes reusable policy. | Repeat adoption; rely only on fixed filenames; never refresh. | Preserves one-time adoption while keeping project authority current. | Owner discussion; issue #87 |
| `D03` | Human involvement remains limited to substantive policy, authority, safety, intended-behavior, or acceptance decisions. | Stop for every manifest link refresh. | Routine discovery and correction belong to the agent. | Existing workflow boundary; owner confirmation |

## Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `DP01` | Existing briefs classify attention as `HUMAN_DECISION`, `AGENT_ACTION`, `DISCLOSE`, or `NONE`. | Classification explains handling; it does not create a new gate or formatting parser. | Workflow, policy, templates, and README agree. |
| `DP02` | Before whiteboard work, an agent semantically reconciles current project authority with the manifest and updates stable links or boundaries in the same delivery. | Scan repository evidence proportionally; do not treat filenames alone as authority. | Adoption/workflow guidance and manifest template expose the outcome. |
| `DP03` | Candidate work that adds, removes, moves, or changes canonical policy also reconciles the manifest before final review. | Link canonical sources; do not copy policy text or feature state. | Documentation review checks the manifest and policy source together. |
| `DP04` | Agent-correctable discovery changes proceed automatically; substantive authority conflicts follow existing human-stop boundaries. | Preserve agent discretion and one-time adoption. | Human brief classification and semantic review show correct routing. |

## Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| `DR01` | `DP01` | Accepted | Semantic handling classes, not styling, activate agent behavior. |
| `DR02` | `DP01`, `DP04` | Accepted | Existing briefs carry the handling signal. |
| `DR03` | `DP02`, `DP03` | Accepted | Incremental reconciliation keeps adoption reusable. |
| `DR04` | `DP02` | Accepted | Agent judgment determines whether evidence is canonical policy. |
| `DR05` | `DP03` | Accepted | Manifest remains an authority index, not a policy copy. |

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | Add semantic handling classes and incremental manifest authority reconciliation. | `DISCLOSE` |
| Important boundaries | No new document, gate, rigid filename engine, copied policy, or styling checker. | `DISCLOSE` |
| Remaining gaps or risks | Semantic authority classification cannot be proven by syntax alone. | `DISCLOSE` |
| Decision requested | None; implementation was authorized. | `NONE` |
