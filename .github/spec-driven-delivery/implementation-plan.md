# Implementation Plan — Worktree readiness and efficient review validation

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority.

## Delivery status

| Field | Value |
| --- | --- |
| State | `VALIDATING` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | Human review before merge |
| Delivery branch / target | `codex/runtime-review-loop` → `main` |
| Owner | Repository owner |
| Primary issue / need | [#92](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/92), [#93](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/93) |
| Concluded whiteboard | [solution-whiteboard.md](solution-whiteboard.md), revision `2026-09-09` |
| Required reviewers | Two isolated retained agent seats |
| Last verified | Worktree self-test and fast focused checks passed on 2026-09-09; agent review and full validation pending |

## Outcome and boundaries

| Concern | Accepted value |
| --- | --- |
| Required outcome | Worktrees prove relevant runtime readiness; PRs use fast checks before two-agent review and full required validation after reviewer convergence. |
| In scope | Workflow skill, contribution/review policy, quality policy, README diagrams/explanation, and focused tests. |
| Out of scope | New templates, process documents, mandatory commands, GitHub bot identities, weakened human authority, or committed runtime secrets. |
| Compatibility | Existing projects retain discretion and may impose stricter sequencing; exact-head evidence and review requirements remain. |

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| `DP01`, `DP02` | `T01`: guide and exercise agent-owned worktree self-test and proportional runtime provisioning. | Focused semantic assertions plus this worktree's runtime proof. | Aligned |
| `DP03`–`DP05` | `T01`: define the fast-check → review → full-validation loop and update the README diagram. | Focused assertions, Markdown/Mermaid checks, two exact-head reviewers, then full suite. | Aligned |
| `DP06` | `T01`: preserve human merge authority and concise human brief. | Semantic review and existing lifecycle regression. | Aligned |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | PR |
| --- | --- | --- | --- | --- | --- | --- |
| `T01` | `DONE` | None | Deliver #92 and #93 as one coherent behavior change. | Smallest canonical edits; no template duplication or new gate. | Fast focused checks → two retained reviews → full `docs:all` on exact head. | Pending |

### `T01` — Runtime-ready worktrees and efficient exact-head proof

| Concern | Value |
| --- | --- |
| Outcome / non-scope | Make worktree readiness observable and sequence expensive validation after agent-review convergence; do not prescribe a universal environment or weaken final proof. |
| Source boundary | Workflow skill, contribution policy, quality policy, README, focused regression, and delivery state. |
| Consumed dependencies | Concluded `DP01`–`DP06`; existing error handling, three-document model, exact-candidate review, and human merge policy. |
| Critical obligations | Preserve secrets, ignored state, project policy, exact-head evidence, retained reviewers, and human authority. |
| Required evidence | Relevant worktree-local checks, focused regression, two isolated reviews, complete repository validation after convergence, and owner acceptance. |
| Context receipt | Current manifest, whiteboard, workflow skill, contribution policy, quality policy, README, tests, issues #92/#93, branch and worktree inspected; no authority conflict found. |
| Actual result | Worktree readiness now requires an observable representative operation and proportional provisioning; review uses fast affected checks before two retained agents and full required validation after convergence. README diagrams expose both behaviors. |

## Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | `DP01`–`DP06` mapped to the coherent source change | Implemented in skill, policy, contributor guidance, README, and regression coverage |
| Applicable validation passed | Fast focused checks before review; full `docs:all` after two reviewers converge | Pending |
| Compatibility and operations safe | Project discretion, secrets, runtime ownership, and stricter policy preserved | Confirmed by focused checks and self-review; agent review pending |
| Merge-ready canonical state | Whiteboard archived, plan removed, live whiteboard reset before final review | Pending |
| PR-owned review and delivery | Two agent reviewers and human merge authority on exact candidate | Pending PR |
| Feature cleanup complete | Tracked closure in candidate; worktree/branch cleanup after target verification | Pending |

## Cleanup inventory

| Item | Keep, archive, remove, or reset | Ownership and evidence | Result |
| --- | --- | --- | --- |
| Concluded whiteboard | Archive with issue and PR links | This delivery | Pending PR number |
| Active implementation plan | Remove in delivery-closing candidate | This delivery | Pending |
| Working whiteboard | Reset to empty template | This delivery | Pending |
| Worktree-local `node_modules` and `.sdd-runtime` | Remove with owned worktree after merge verification | Ignored, task-created runtime | Pending |
| Delivery worktree and merged branch | Remove after target verification | Owned by this delivery | Pending |
