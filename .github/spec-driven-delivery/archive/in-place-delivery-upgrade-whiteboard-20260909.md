# Archived solution whiteboard — In-place delivery upgrades

<!-- sdd: archived-whiteboard -->

| Field | Value |
| --- | --- |
| Need | Keep playbook upgrade inside the delivery that consumes it |
| Issue | [#83](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/83) |
| Delivery | [PR #84](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/84) |

## Concluded design

| Design point | Accepted outcome | Boundary |
| --- | --- | --- |
| `D01` | Every delivery begins in an isolated worktree on an owned delivery branch | A single-unit delivery branch may also be its task branch |
| `D02` | Check and upgrade the playbook in that worktree before whiteboard or implementation work | A fresh worktree regenerates runtime from the accepted manifest pin; it never reuses another worktree's runtime |
| `D03` | Keep the upgrade in the delivery candidate | Do not merge a separate target upgrade solely to prepare the delivery |
| `D04` | Use the branch point as the ordinary implementation baseline | Do not routinely merge or rebase the target during implementation |
| `D05` | Synchronize the completed candidate with its target and validate the resulting candidate before final review | Review binds to the exact integrated candidate |
| `D06` | Let the agent recover proportionally when the ordinary path cannot proceed safely | Canonical error handling, project authority, and required controls remain binding |
