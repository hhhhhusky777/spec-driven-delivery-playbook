# Solution whiteboard — pre-final-test scope and reuse review

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [Issue #123](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/123) |
| Owner | Repository owner |
| Concluded design revision | `71633c37eba39dd45dc26ed728d622793e3a4e0d` |
| Open owner decisions | `None` |

## Discussion draft

| ID | Agreed item, constraint, or gap | State / resolution |
| --- | --- | --- |
| `DR01` | Final readiness reconciles test coverage but does not require a separate implementation-scope and reuse audit before missing tests are added or final tests run. | Accepted gap |
| `DR02` | The author and both retained reviewers must inspect all implementation changes against the concluded whiteboard before final-gate test completion begins. | Accepted direction |
| `DR03` | The audit must reject unauthorized behavior, redundant code or logic, avoidable parallel implementations, and failure to reuse suitable existing code or project frameworks. | Accepted direction |
| `DR04` | The audit is an additional check inside the existing final gate; it does not replace later exact-candidate review, tests, full validation, or human merge authority. | Accepted boundary |

## Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem / observed need | Tests can prove behavior while implementation still exceeds the accepted design or duplicates suitable project mechanisms. Discovering that only after final tests adds avoidable rework and can normalize over-engineering. |
| Required outcome | Before adding recorded missing tests or running final-gate tests, the author and both retained reviewers approve a complete implementation audit for design conformance and reuse. |
| Actors and critical journey | Author completes implementation and self-audits it; the same two retained reviewers independently inspect the complete implementation; only a passing audit permits final test completion. |
| In scope | Canonical policy, portable workflow and reviewer guidance, lifecycle explanation, and regression coverage. |
| Out of scope / deferred | Changing task-level focused reviews, weakening later exact-candidate review or validation, prescribing a particular architecture, or requiring reuse when an existing mechanism is unsuitable. |
| Confidence | High; the owner supplied the ordering and mandatory review criteria. |

## Authority and context

| Source | Authority or relevant content | Freshness / verification |
| --- | --- | --- |
| Repository owner decision in Issue #123 discussion | Required ordering and mandatory author/reviewer criteria | Current request |
| [Documentation Quality and Testing Policy](../../docs/documentation-quality-policy.md) | Source-repository final readiness, necessary complexity, review, and test gates | Current `main` |
| Installed `sdd-project-workflow` skill | Portable lifecycle and retained-reviewer execution boundary | Manifest pin `55fd9494bb7b96984114db27c0995a910da82f6b` |
| Prepared upgrade candidate | Latest reusable workflow baseline | `55fd410c7bcc57aba95c8ea6e132b5bd87534d55`; acceptance pending with this delivery |

## Requirements and acceptance

| ID | Need or requirement | Priority | Acceptance signal | Source |
| --- | --- | --- | --- | --- |
| `R01` | Before adding final-gate missing tests or running final-gate tests, the author MUST self-review all implementation changes and both retained reviewers MUST independently approve the same complete implementation candidate. | Required | Policy and installed guidance state the order without ambiguity; regressions reject reversed order. | Owner |
| `R02` | The audit MUST verify that every implementation change is authorized by and fully conforms to the concluded whiteboard and its explicitly consumed authorities. | Required | Untraceable behavior or logic blocks the gate. | Owner; existing frozen-design authority |
| `R03` | The audit MUST verify that suitable existing code, abstractions, libraries, and project frameworks were reused wherever reasonably possible. | Required | Any new parallel mechanism has a necessary, documented reason; otherwise it blocks the gate. | Owner |
| `R04` | The audit MUST reject unauthorized behavior, redundant code, duplicate logic, unnecessary abstractions, and avoidable parallel implementations. | Required | Both reviewer dispositions and author disposition are recorded; unresolved violations block progression. | Owner |
| `R05` | After this audit passes, existing final coverage reconciliation, missing-test implementation, affected focused checks, exact-candidate review, full validation, and human merge acceptance still apply. | Required | No downstream gate is removed or weakened. | Existing policy |

## Options and tradeoffs

| ID | Option | Benefits | Costs / risks | Disposition |
| --- | --- | --- | --- | --- |
| `O01` | Rely only on the existing final-candidate review after tests are complete. | No added review point. | Scope and reuse defects are found after test work and may cause repeated rework. | Rejected |
| `O02` | Add one mandatory pre-final-test implementation audit using the retained reviewers. | Finds unauthorized or redundant implementation before completing final tests; preserves reviewer context. | Adds one bounded review pass. | Accepted |
| `O03` | Require reuse unconditionally. | Strong apparent standardization. | Can force unsuitable dependencies or abstractions. | Rejected; require reuse of suitable mechanisms or a necessary documented reason. |

## Risks and consequences

| ID | Scenario | Likelihood / impact | Prevention or detection | Recovery / owner | Residual risk |
| --- | --- | --- | --- | --- | --- |
| `K01` | Review becomes stylistic perfectionism. | Medium / medium | Limit blocking findings to design authority, real redundancy, and suitable reuse with material value. | Author may reject unsupported findings under existing disposition rules. | Judgment remains necessary. |
| `K02` | Review passes, then the audited implementation content changes. | Low / high | Approval binds to the exact audited implementation content. Any later change to that content invalidates the audit and requires the author and both retained reviewers to repeat it before test completion continues; test-only additions do not by themselves invalidate this audit. | Author and same retained reviewers. | None beyond reviewer error. |
| `K03` | New gate is mistaken for final approval. | Medium / medium | State explicitly that downstream exact-candidate review, validation, and human merge authority remain mandatory. | Workflow guidance and regression tests. | Low. |

## Concluded design candidate

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `D01` | Final readiness begins with a mandatory pre-final-test implementation audit. | It occurs before recorded missing tests are added and before any final-gate tests or full validation run. | Ordering is explicit and regression-tested. |
| `D02` | The author self-reviews and both retained reviewers independently approve the same complete implementation content. | Approval binds to the exact audited implementation content, including documentation, configuration, infrastructure, and runtime behavior. Any later change to that content invalidates the audit and requires repetition; subsequent test-only additions do not by themselves invalidate it. | Review evidence identifies the exact audited content and all three dispositions. |
| `D03` | The audit blocks any implementation not fully traceable to the concluded whiteboard or its explicitly consumed authorities. | No new behavior, logic, or scope may be justified by tests alone. | Untraceable additions prevent progression. |
| `D04` | The audit blocks redundant code or logic and avoidable new mechanisms when suitable existing code or project frameworks are available. | A new mechanism is allowed only when existing options are unsuitable and the reason is documented. | Review evidence records reuse assessment and any justified exception. |
| `D05` | Passing this audit does not replace subsequent test completion, focused checks, exact-candidate review, full validation, or human merge acceptance. | This is an early final-gate safeguard, not approval to merge. | Existing downstream gates remain present and ordered. |

## Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| `DR01` | `D01` | Accepted | Adds the missing pre-test boundary. |
| `DR02` | `D02` | Accepted | Makes all three required review participants explicit. |
| `DR03` | `D03`, `D04` | Accepted | Separates authority conformance from reuse and redundancy. |
| `DR04` | `D05` | Accepted | Preserves every existing downstream quality gate. |

## Newly introduced fail-closed behaviors

> [!IMPORTANT]
> **Hard rule.** Both reviewers MUST approve this candidate before the human
> gate. The parent response MUST list every row for owner disposition. The
> whiteboard cannot conclude while a row remains pending.

| ID | Trigger | Required fail-closed response | Impact | Owner disposition |
| --- | --- | --- | --- | --- |
| `FC01` | The author or either retained reviewer has not approved the implementation-scope and reuse audit; finds unauthorized scope, avoidable redundancy, or unjustified failure to reuse a suitable existing mechanism; or the approved implementation content changes afterward. | Do not add final-gate missing tests and do not run final-gate tests or full validation. Correct the implementation and repeat the audit, or obtain prior human approval for the exact design amendment. A test-only addition after approval does not itself invalidate the audit. | Final readiness pauses before test-completion work; valid prior task evidence is preserved. | `Approved` |

## Bundled upgrade brief

| Concern | Exact result |
| --- | --- |
| Old pin | `55fd9494bb7b96984114db27c0995a910da82f6b` remains authoritative until human acceptance and cutover. |
| New pin | `55fd410c7bcc57aba95c8ea6e132b5bd87534d55`, the current immutable `origin/main` revision. |
| Reusable-document impact | Absorbs the merged Issue #121 final-coverage inventory and 90-minute task boundary that this design extends; no feature-specific content is imported. |
| Migration | On acceptance, update the manifest pin, regenerate this worktree's managed workflow runtime from the accepted revision, and validate it as `CURRENT` before planning. |
| Rollback / recovery | Until cutover, keep the old pin and runtime authoritative. If regeneration or validation fails, restore or retain that accepted pin/runtime and preserve failure evidence. |
| Validation | Upgrade candidate preparation succeeded; `55fd410c` is current `origin/main` and contains the old pin. Final cutover still requires regenerated-runtime validation in this worktree. |
| Cutover authority | Human acceptance of this design gate authorizes the bundled pin cutover; it does not authorize implementation or merge. |

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | Add a mandatory author plus two-retained-reviewer implementation audit before final test completion. | `HUMAN_DECISION` |
| Important boundaries | The audit blocks out-of-design or redundant implementation and unjustified non-reuse; later test/review/merge gates remain mandatory. | `HUMAN_DECISION` |
| Alternatives rejected | Existing final review alone is too late; unconditional reuse can be harmful. | `DISCLOSE` |
| Remaining gaps or risks | Reviewer judgment must remain material and avoid stylistic perfectionism. | `DISCLOSE` |
| Newly introduced fail-closed behavior | `FC01`: final test completion cannot start until author and both retained reviewers approve the exact implementation content; an implementation-content change invalidates approval. | `HUMAN_DECISION` |
| Decision requested | After two-agent review, approve `D01`–`D05`, `FC01`, and the bundled pin upgrade to `55fd410c7bcc57aba95c8ea6e132b5bd87534d55`. | `HUMAN_DECISION` |
