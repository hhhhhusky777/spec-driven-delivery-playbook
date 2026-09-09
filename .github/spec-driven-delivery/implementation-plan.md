# Implementation Plan — Whiteboard draft reconciliation

<!-- sdd: implementation-plan -->

| Field | Value |
| --- | --- |
| State | `COMPLETE` |
| Issue | [#85](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/85) |
| Target | `main` |
| Delivery branch | `codex/whiteboard-draft-reconciliation` |
| Active tasks | `None` |
| Next ready task | `None` |
| Merge mode | `HUMAN_REVIEW_BEFORE_MERGE` |

## Governing inputs and delivery boundaries

The concluded whiteboard is authoritative. Preserve the three-document model,
key-information-only goal, agent discretion, and GitHub-owned review history.
Do not add raw transcripts or a separate draft artifact.

## Design-to-task mapping

| Design point | Task | Planned outcome | Validation |
| --- | --- | --- | --- |
| `DP01` | `T01` | Retain a concise ID-based discussion draft in the whiteboard template and guidance. | Document-model checks and semantic review |
| `DP02` | `T01` | Add reconciliation structure and reject unresolved concluded drafts. | Positive and negative lifecycle tests |
| `DP03` | `T01` | Keep one whiteboard and reconcile README and governance docs. | Full documentation suite |

## Tasks

| ID | State | Depends on | Outcome / Definition of Done |
| --- | --- | --- | --- |
| `T01` | `DONE` | `None` | Template, workflow, README, governance, checker, and tests implement the concluded design consistently. |

## Validation

| Check | State / evidence |
| --- | --- |
| Focused lifecycle and document-model tests | Passed locally; exact command recorded in PR |
| Full documentation suite | Passed: 36 tests plus lint, structure, lifecycle, and Mermaid checks |
| Two independent semantic reviews | Pending final candidate |
| Human acceptance and merge | Pending |

## Delivery Definition of Done

- Every concluded whiteboard retains a concise discussion draft.
- Every material draft item has a resolved reconciliation disposition.
- Missing or unresolved reconciliation fails lifecycle validation.
- Maintained documentation and diagrams explain the same behavior.
- Applicable checks and two independent reviews pass on the exact candidate.
