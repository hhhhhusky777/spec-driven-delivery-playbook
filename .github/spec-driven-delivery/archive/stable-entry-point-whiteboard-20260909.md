# Archived solution whiteboard — Stable-entry-point upgrade gate

<!-- sdd: archived-whiteboard -->

| Field | Value |
| --- | --- |
| Need | Remove a redundant upgrade prerequisite |
| Issue | [#80](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/80) |
| Delivery | [PR #81](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/81) |
| Related ownership clarification | [#82](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/82) |
| Related delivery routing | [#83](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/83) |

## Concluded design

| Design point | Accepted outcome | Boundary |
| --- | --- | --- |
| `D01` | Upgrade does not require or parse a `Stable entry point` manifest row | Canonical authorities may expose multiple project entry points |
| `D02` | Existing projects may retain the legacy row without blocking upgrade | Ignore it rather than migrating feature content |
| `D03` | Maintained manifests and adoption guidance no longer define the retired contract | Preserve all unrelated upgrade protections |
| `D04` | GitHub Issues own discovered problem records | Archive only this concluded design; PRs own review and delivery evidence |
| `D05` | Upgrade the playbook inside the delivery worktree and feature branch | Do not merge a separate target upgrade solely to prepare the delivery |
| `D06` | Keep the branch point as the ordinary implementation baseline and synchronize before final review | Exceptional recovery follows the canonical error-handling authority |
