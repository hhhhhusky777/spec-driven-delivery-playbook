# Solution whiteboard

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [#80](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/80) |
| Owner | Repository owner |
| Concluded design revision | Owner discussion on 2026-09-09 |
| Open owner decisions | `None` |

## Concluded design

| Design point | Accepted outcome | Boundary | Validation |
| --- | --- | --- | --- |
| `D01` | Upgrade does not require a single stable-entry-point field or file | Canonical authorities may expose multiple project entry points | Installed fixture without the field upgrades |
| `D02` | Existing manifests containing the retired field remain compatible | Ignore the legacy metadata; do not migrate feature content | Legacy-field fixture upgrades even when its value is unavailable |
| `D03` | Remove the retired contract everywhere maintained | Preserve manifest pin, source, runtime, worktree, safe-boundary, review, and acceptance checks | Source search plus full repository checks |

## Human brief

| Attention | Summary |
| --- | --- |
| Decision | Remove the mandatory stable-entry-point contract as redundant after simplification |
| Safety | Runtime and repository identity continue to fail closed independently |
| Compatibility | Old manifests remain readable because unknown legacy rows are ignored |
| Open decisions | None |
