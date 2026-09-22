# Implementation plan — pre-final-test scope and reuse review

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority for Issue #123.

## Delivery status

| Field | Value |
| --- | --- |
| State | `VALIDATING` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | Human review before merge |
| Delivery branch / target | `codex/final-gate-scope-reuse-review` → `main` |
| Owner | Repository owner |
| Primary issue / need | [Issue #123](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/123) |
| Concluded whiteboard | [Whiteboard](solution-whiteboard.md), accepted design `71633c37eba39dd45dc26ed728d622793e3a4e0d`, freeze commit `fbe15e0c5e6394ce922da15cb51862118e48a900` |
| Required reviewers | Same two retained independent reviewer sessions selected for Issue #123 |
| Last verified | 2026-09-23: T01 focused model tests 16/16 plus Markdown, structure, lifecycle, Mermaid, runtime, and diff checks passed; pre-final-test audit pending |

## Governing inputs and delivery boundaries

### Source hierarchy

| Priority | Source | Authority / use |
| --- | --- | --- |
| 1 | Repository owner approval | `D01`–`D05`, `FC01`, pin cutover, and human merge authority |
| 2 | Frozen [whiteboard](solution-whiteboard.md) | Exact accepted outcome, scope, sequence, and fail-closed behavior |
| 3 | [Documentation Quality and Testing Policy](../../docs/documentation-quality-policy.md), [Contributing](../../CONTRIBUTING.md), and [Template Governance](../../docs/template-governance.md) | Canonical source-repository quality, delivery, and template boundaries |
| 4 | Exact candidate and PR evidence | Implementation, checks, reviewer dispositions, and merge facts |

### Outcome, scope, and assumptions

| Concern | Accepted value |
| --- | --- |
| Problem | Final readiness can begin missing-test work before anyone performs a dedicated audit of complete implementation scope and reuse. |
| Required outcome | Before final-gate missing tests are added or final tests run, the author and both retained reviewers approve the exact implementation content for whiteboard conformance, suitable reuse, and absence of avoidable redundancy. |
| In scope | Canonical policy, workflow and reviewer skills, plan template, README lifecycle explanation and diagram, Contributing, and focused regression tests. |
| Out of scope / deferred | New automation, status artifacts, architecture mandates, changes to task-level review, or removal of downstream tests/reviews/human merge authority. |
| Success measures | All mapped documents express one unambiguous ordering; focused regressions pass; no design point or new content is unmapped. |
| Assumptions / constraints | Suitable reuse remains contextual; only material scope/redundancy/reuse defects block; test-only additions after audit do not invalidate it. |

### Clarifications and gaps

| ID | Question or gap | Why it matters | Resolution / owner | State |
| --- | --- | --- | --- | --- |
| `G01` | Does the audit bind only production code? | Documentation, configuration, and infrastructure can also implement behavior. | It binds exact implementation content across all applicable categories. | Resolved |
| `G02` | Do later test-only additions invalidate the audit? | They are the next authorized gate and should not cause a loop. | No; any change to audited implementation content does. | Resolved |

## System contracts

### Functional and state contracts

| ID | Trigger / precondition | Required behavior | Result / postcondition | Failure behavior |
| --- | --- | --- | --- | --- |
| `FC01` | Final readiness begins, or previously approved implementation content changes | Author self-review and both retained reviewers independently audit the exact implementation content before missing-test work or final tests | Audit evidence confirms design traceability, suitable reuse, and no avoidable redundancy | Stop final test completion; correct and repeat the audit, or obtain an authorized design amendment |

### Test and acceptance contracts

| Owning task | Contract, changed outcome, or risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| `T01` | `D01`, `D02`, `FC01`: audit precedes missing-test additions and final tests, binds exact implementation content, and repeats after content changes | `tests/document-model.test.mjs` ordering and invalidation assertions | Implemented; focused test passed | Focused task work |
| `T01` | `D03`, `D04`: strict whiteboard traceability, suitable reuse, and redundant-logic rejection appear in author and reviewer guidance | `tests/document-model.test.mjs` cross-document assertions | Implemented; focused test passed | Focused task work |
| `T01` | `D05`: downstream test completion, focused checks, exact-candidate review, full validation, and human merge authority remain | Existing lifecycle assertions plus focused additions | Implemented; focused test passed | Focused task work |
| `T01` | Complete source repository remains internally consistent | `npm run docs:all` | Existing; unrun | Final-gate run after exact-candidate review |

## Proposed design

### Components and responsibility boundaries

| Component | Owns | Must not own | Interfaces / dependencies |
| --- | --- | --- | --- |
| `docs/documentation-quality-policy.md` | Canonical rule for this source repository | Installed-project execution by reference | Contributing, README, source tests |
| `skills/sdd-project-workflow/SKILL.md` | Self-contained portable author lifecycle and gate ordering | Reviewer finding mechanics | Installed runtime and reviewer skill |
| `skills/sdd-feature-review/SKILL.md` | Reviewer duties for the new audit | Parent workflow sequencing | Workflow packet and accepted design |
| `templates/delivery/implementation-plan.md` | Future delivery test inventory and final-readiness prompt | Review evidence | Workflow skill and PR |
| `README.md`, `CONTRIBUTING.md` | Reader-facing lifecycle and repository entry points | Canonical rule duplication beyond necessary explanation | Policy and skills |
| `tests/document-model.test.mjs` | Focused regression against drift and reversed ordering | Runtime enforcement in adopting projects | Source documents and skills |

### Key decisions

| ID | Decision | Alternatives | Rationale / tradeoff | Affected contracts |
| --- | --- | --- | --- | --- |
| `PD01` | Add one named implementation-scope and reuse audit before final test completion. | Rely only on the later final-candidate review. | Finds material over-implementation before test rework while retaining all later gates. | `D01`–`D05`, `FC01` |
| `PD02` | Bind approval to exact implementation content and exempt only test-only additions. | Bind to a commit or production-code category. | Keeps the rule portable across code, documentation, configuration, and infrastructure while allowing the intended next test gate. | `D02`, `FC01` |

### Compatibility, migration, and rollout

| Concern | Before / after compatibility | Migration or rollout | Rollback / recovery | Validation |
| --- | --- | --- | --- | --- |
| Existing active deliveries | New rule applies after the updated playbook is adopted; prior evidence is not rewritten. | Install or upgrade the workflow and review skills through the existing installer. | Retain the last accepted pin if upgrade validation fails. | Installer runtime plus source tests |
| Existing final gates | All existing checks and authorities remain; one earlier audit is inserted. | No data or API migration. | Revert the wording as one coherent change if rejected before merge. | Focused model test and full docs gate |

### Risks and mitigations

| ID | Scenario | Likelihood / impact | Prevention / detection | Owner | State |
| --- | --- | --- | --- | --- | --- |
| `K01` | Review becomes stylistic perfectionism. | Medium / medium | Limit blocking findings to accepted scope, material redundancy, and suitable reuse with material value; author disposition rules remain. | Author and retained reviewers | Accepted |
| `K02` | Implementation changes after audit without repetition. | Low / high | Exact-content invalidation language in author and reviewer guidance plus regression. | Author and retained reviewers | Mitigated by `FC01` |
| `K03` | New audit is mistaken for final approval. | Medium / medium | Preserve and explicitly name every downstream gate. | T01 | Planned |

## Delivery strategy and readiness

| Concern | This delivery |
| --- | --- |
| Integration model | One self-contained PR to `main` |
| Increment boundary | One coherent policy/portable-guidance/template/test change; splitting it would create inconsistent rules |
| Parallel ownership | Parent owns edits and integration; retained reviewers independently review exact candidates |
| Compatibility sequencing | Canonical rule and portable skills together, then entry points and regression; final candidate synchronizes with target before review |
| Merge authority | Human review and explicit approval |

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| `D01` | `T01`: add the pre-final-test audit and ordering | Focused ordering assertions | Aligned |
| `D02` | `T01`: require author plus both retained reviewers on exact implementation content; repeat after content change | Cross-document exact-content assertions | Aligned |
| `D03` | `T01`: enforce strict traceability to the frozen whiteboard and consumed authorities | Author/reviewer wording assertions | Aligned |
| `D04` | `T01`: require suitable reuse and reject avoidable redundancy or parallel mechanisms | Author/reviewer wording assertions | Aligned |
| `D05` | `T01`: preserve all downstream gates and update the README diagram | Diagram and lifecycle assertions | Aligned |
| `FC01` | `T01`: encode the stop and repeat behavior without adding runtime automation | Policy/skill/template regression | Aligned |

> [!IMPORTANT]
> **Hard rule.** Every design point is mapped to `T01`. T01 MUST NOT add any
> behavior, artifact, or logic that cannot be traced to the frozen whiteboard
> or an authority it explicitly consumes.

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | PR |
| --- | --- | --- | --- | --- | --- | --- |
| `T01` | `DONE` | `None` | Canonical and portable guidance, lifecycle entry points, template, diagram, and focused tests consistently require the approved pre-final-test audit | One review gate only; no automation, new artifact, architecture prescription, or weakened downstream gate | Focused model tests 16/16; Markdown/structure/lifecycle/Mermaid, runtime, and diff checks passed; full source gate pending final readiness | `None` |

## Task specifications and context receipts

### `T01` — implement the pre-final-test audit

| Concern | Value |
| --- | --- |
| Outcome / non-scope | Implement `D01`–`D05` and `FC01`; do not add runtime enforcement, another state document, or unrelated cleanup. |
| Source boundary | Policy, workflow/reviewer skills, implementation-plan template, README, Contributing, and focused document-model tests only unless a required consistency dependency is discovered. |
| Consumed dependencies | Frozen whiteboard at `fbe15e0c5e6394ce922da15cb51862118e48a900`; accepted playbook pin `55fd410c7bcc57aba95c8ea6e132b5bd87534d55`; existing retained-reviewer and final-gate contracts. |
| Critical obligations | Strong mandatory wording; author plus both retained reviewers; exact implementation content; suitable reuse; no redundant implementation; no downstream-gate weakening. |
| Required evidence | Focused tests and documentation checks, same retained reviewers on exact task candidate, then final-gate audit/test/review sequence and human merge approval. |
| Context receipt | Manifest, frozen whiteboard, installed workflow/review skills, policy, Contributing, plan template, README testing section/diagram, and existing model tests reviewed; no unresolved conflict. |
| Actual result | Policy, portable author and reviewer skills, plan template, README diagram and explanation, Contributing, and focused regression now require the approved audit ordering and exact-content invalidation. Focused model tests passed 16/16 and all affected documentation/runtime checks passed. |

## Recovery, decisions, and change control

### Delivery decision and amendment log

| ID / time | Decision or plan change | Reason / consequence | Affected design, contracts, or tasks | Authority |
| --- | --- | --- | --- | --- |
| `2026-09-23-D01` | Owner approved `D01`–`D05`, `FC01`, and bundled pin cutover. | Whiteboard froze and planning may proceed. | All | Repository owner; freeze commit `fbe15e0` |

## Plan validation and completion

### Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | `D01`–`D05` and `FC01` mapped with no extra scope | T01 implementation complete; pre-final-test audit pending |
| Applicable validation passed | Focused tests per task; pre-final-test audit; completed required tests; exact-candidate review; full source gate | Pending |
| Compatibility safe | Existing deliveries and downstream gates remain valid; portable skill stays self-contained | Pending |
| Merge-ready canonical state | Manifest, frozen design, final plan, reusable guidance, README/diagram, and tests agree | Pending |
| PR-owned review and delivery | Same reviewer seats, owner authority, merge, and target proof | Pending PR |
| Feature cleanup complete | Combined archive, live-plan removal, whiteboard reset, then owned worktree/branch cleanup after target verification | Pending |

### Planned versus actual outcome

| Design / task | Planned result | Actual evidence or deviation | Remaining obligation / owner |
| --- | --- | --- | --- |
| `D01`–`D05`, `FC01` / `T01` | One consistent pre-final-test audit contract | Implemented across canonical policy, portable skills, template, README/diagram, Contributing, and focused regression | Pre-final-test audit, final checks/review, and human merge gate |

### Cleanup inventory

| Item | Keep, archive, remove, or reset | Ownership and evidence | Result |
| --- | --- | --- | --- |
| Manifest and reusable guidance | Keep | Repository authority | Pending merge candidate |
| Whiteboard and implementation plan | Archive together, then reset/remove in the closing candidate after explicit human authorization | Workflow completion contract | Pending |
| Delivery worktree and branch | Remove after merge and target verification | Agent-owned and exact merged ancestry | Pending |

## Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and outcomes | One task updates the complete canonical/portable/documentation/test surface for the approved audit. | `HUMAN_DECISION` |
| Design consistency | `D01`–`D05` and `FC01` all map to T01; no unexplained addition. | `NONE` |
| Important changes | Strong pre-final-test author/reviewer audit; exact-content invalidation; suitable reuse and redundancy checks; downstream gates preserved. | `DISCLOSE` |
| Validation | T01 focused model tests 16/16 and affected documentation/runtime checks passed; pre-final-test audit and full validation remain unrun in the required order. | `DISCLOSE` |
| Risks or open decisions | No design gap; pre-final-test audit is the next gate. | `NONE` |
| Decision requested | None until the candidate reaches the human merge gate. | `NONE` |
