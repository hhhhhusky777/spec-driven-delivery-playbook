# Archived Whiteboard — Reviewer continuity and useful findings

<!-- sdd: archived-whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [Issue #99](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/99) |
| Delivery PRs | [PR #100](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/100), [PR #101](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/101) |
| Owner | Repository owner |
| Concluded design revision | Original design delivered by PR #100; owner-approved amendment delivered by PR #101 |
| Open owner decisions | `None` |

## Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| `DR01` | Reviewers from one task should not be reused for a later task. | Changed by `DR05`: feature-wide context is more valuable than task-level replacement. |
| `DR02` | A correction round benefits from reviewers who know the original findings. | Expanded by `DR05`: retain the same two reviewers for the complete feature. |
| `DR03` | A change request should help the author reach a sound correction. | Accepted: include impact, blocking status, smallest correction, and applicable authoritative practice with relevance. |
| `DR04` | Best-practice advice could create scope or false authority. | Bound it: separate optional advice, do not expand scope, and never invent a standard. |
| `DR05` | Reviewers need the feature's problem, rationale, and design context across later gates. | Accepted: begin review after whiteboard conclusion and retain both sessions until feature merge. |
| `DR06` | Reviewers need project background without reading every implementation detail. | Accepted: bootstrap from the manifest and linked authorities, or project entry documentation when no manifest exists. |
| `DR07` | The project agent needs a reliable way to give reviewers that background. | Changed: each reviewer loads one dedicated review skill once, then receives a focused packet at each gate. |

## Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `D01` Design review gate | A formally concluded whiteboard receives exact-design review by two isolated agents, followed by human design acceptance before planning. | Design gaps are cheapest to correct before downstream work depends on them. | README flow and policy expose the gate and human brief. |
| `D02` Retained feature reviewers | The same two reviewer sessions continue through planning, every task, corrections, and the final candidate until feature merge. | Feature-wide context preserves the problem, rationale, design, and prior findings. | Workflow and review-loop wording remain consistent. |
| `D03` Actionable findings | A blocking finding states evidence/impact, blocking status, and the smallest recommended correction. | Help authors correct without guessing. | Canonical policy and regression tests cover the content. |
| `D04` Grounded reference | When a recognized practice applies, the finding cites a primary industry standard or authoritative reference and explains relevance; otherwise it cites project authority or states technical reasoning. | Never fabricate a standard. | Policy covers both applicable and no-authority cases. |
| `D05` Proportional advice | Optional advice stays separate from blocking findings and recommendations cannot expand accepted scope. | Preserve proportional effort and owner authority. | Policy and tests enforce the boundary. |
| `D06` Reviewer context bootstrap | Before first review, both reviewers learn relevant project boundaries from the manifest and linked authorities, or from README/entry documentation and canonical policies when no manifest exists. | Establish scope, ownership, safety, compatibility, testing, and merge context without requiring all implementation details. | Policy, workflow, README, and regression agree. |
| `D07` Reviewer skill and packet | Each retained reviewer loads the dedicated review skill once at session creation. At each gate, the parent supplies what was completed, mapped design or contracts, expected outcome, exact candidate/base, scope, validation, changes, risks, and prior finding dispositions. | Keep reviewer behavior consistent while making each gate's context focused; the packet routes to canonical evidence rather than replacing it. | Installed skill, workflow, README, and tests agree. |

## Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| `DR01` | `D02` | Changed | The owner replaced task-level freshness with feature-wide continuity. |
| `DR02` | `D02` | Changed | Continuity now spans the full feature rather than one task. |
| `DR03` | `D03`, `D04` | Accepted | Combines a concrete correction with relevant authority when available. |
| `DR04` | `D05` | Accepted | Prevents advice from becoming invented scope or ceremony. |
| `DR05` | `D01`, `D02` | Accepted | Starts the retained cohort at concluded-design review and keeps its context through merge. |
| `DR06` | `D06` | Accepted | Gives reviewers proportional project context through authoritative entry points. |
| `DR07` | `D07` | Changed | The owner selected a dedicated skill because reviewers are independent, retained agents with their own context. |

## Design amendments

| Amendment | Changed design points | Reason and impact | Owner decision |
| --- | --- | --- | --- |
| `A01` | Replaced the original `D01` task-level freshness and expanded `D02` task-only continuity; added current `D01`, `D02`, `D06`, and `D07` | Preserve the feature problem, rationale, boundaries, and prior findings across every review gate; add exact-design review before planning and a proportional reviewer bootstrap. | Owner replaced the original design on 2026-09-10; [PR #101](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/101) delivers the amendment. |

## Delivery mapping

| Design points | Delivered by | Evidence |
| --- | --- | --- |
| `D01`, `D02` | `T01`: concluded-design gate and retained feature reviewer cohort | [PR #101](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/101) |
| `D03`, `D04`, `D05` | `T01`: useful, grounded, proportional change-request content | [PR #100](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/100) |
| `D06` | `T01`: proportional reviewer context bootstrap | [PR #101](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/101) |
| `D07` | `T01`: installed reviewer skill and focused per-gate packet | [PR #101](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/101) |

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | Review concluded design before human acceptance; retain the same two feature reviewers through merge; require grounded, actionable change requests. | `DISCLOSE` |
| Important boundaries | No invented standards, template duplication, or recommendation-driven scope expansion. | `DISCLOSE` |
| Remaining gaps or risks | `None` | `NONE` |
| Decision requested | Human merge acceptance after agent review and full validation. | `HUMAN_DECISION` |
