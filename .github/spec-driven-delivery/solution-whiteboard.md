# Solution whiteboard — README project guide

<!-- sdd: whiteboard -->

## Control

| Field | Value |
| --- | --- |
| Topic | Restore complete reader guidance and three-document templates |
| State | `CONCLUDED` |
| Owner | Repository owner |
| Open owner decisions | None |
| Concluded design revision | Owner request on 2026-09-08 Asia/Shanghai |

## Working notes

The simplified README preserved the new three-document model but removed too
much reader-facing context: the project introduction, feature catalog, nested
navigation, feature diagrams, and explanation of how the model improves both
efficiency and reliability. The owner wants those layers restored without
restoring obsolete version history, duplicated policy, or a rigid agent script.

## Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| D01 | Open with a concise, persuasive explanation of the problem, audience, core promise, and major capabilities | Readers should understand why the project matters before implementation detail | First screen contains value proposition, feature summary, and quick start |
| D02 | Restore a nested table of contents with titles and subtitles | A long-form guide must remain scannable | Every listed anchor resolves and major sections are reachable |
| D03 | Explain the five goals and three-document model without duplicating their canonical policies | README teaches the model; policy files remain normative | Claims link to canonical sources and use current terminology |
| D04 | Give every major feature area a focused explanation and diagram | Visual readers should understand adoption, design, planning, implementation, review, recovery, cleanup, and parallel delivery | Mermaid and semantic consistency checks pass |
| D05 | Explain how the design reduces effort while preserving reliability | Efficiency must not be mistaken for removing quality or authority gates | Explicit comparison table connects reduced overhead to retained controls |
| D06 | Preserve the simplified latest-only model | Do not restore obsolete version history, redundant ledgers, or prescriptive internal steps | README agrees with current manifest, templates, skills, and policies |
| D07 | Make the guide compelling and confidence-building, not merely complete | A new reader should want to try it and should understand the details without unresolved questions or hesitation | Both independent reviewers explicitly assess interest, willingness to try, clarity, and hesitation points |
| D08 | License the project under Apache License 2.0 | Public trial and reuse need explicit permission; the owner selected Apache-2.0 to resolve the review blocker | Canonical license text is tracked and README links to it |
| D09 | Keep exactly three durable templates without removing the information needed for safe delivery | Simplification consolidates ownership; it must preserve project discovery, design reasoning, contracts, architecture, task readiness, validation, recovery, and completion information | Each template exposes a proportional completeness menu for its sole responsibility, and regression tests protect the categories |

## Human review brief

| Attention | Summary |
| --- | --- |
| Decisions made | Restore the original README information architecture and visual depth, and restore complete delivery information inside exactly three responsibility-owned templates |
| Important boundaries | Canonical rules remain in policy documents; README explains and links rather than creating competing authority |
| Alternatives rejected | Keeping the 163-line overview; restoring the obsolete 900-line README verbatim; recreating removed workflow, handoff, or review-ledger templates |
| Remaining gaps or risks | Semantic drift or a technically correct but unconvincing introduction must be caught in review; licensing is resolved by Apache-2.0 |
| Decision requested | None; the owner's request accepts this design for implementation |
