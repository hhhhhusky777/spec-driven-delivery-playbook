# Solution Whiteboard — Efficient worktree readiness and review validation

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [#92](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/92), [#93](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/93) |
| Owner | Repository owner |
| Concluded design revision | `2026-09-09` |
| Open owner decisions | `None` |

## Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| `DR01` | A new worktree may omit ignored inputs and dependencies that make the main workspace operational. | `accepted` |
| `DR02` | Running every expensive validation before review causes repeated full work after review corrections. | `accepted` |
| `DR03` | Any candidate correction can stale review or validation evidence. | `accepted` |
| `DR04` | The README should explain the review loop visually. | `accepted` |

## Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem / observed need | Worktrees can be source-complete but unable to run the project, while early full validation can be repeated after review corrections. |
| Required outcome | Worktrees prove relevant runtime readiness, and exact PR candidates reach human review with two-agent approval plus full required validation at lower repeated cost. |
| In scope | Reusable workflow guidance, canonical validation/review policy, contributor guidance, README diagrams, and focused regression coverage. |
| Out of scope / deferred | A universal copying command, committing secrets or ignored runtime inputs, a new template field, a new human gate, or automated GitHub reviewer identities. |
| Confidence | High; the owner selected both behavioral boundaries and this worktree reproduced the missing-dependency case. |

## Authority and context

| Source | Authority or relevant content | Freshness / verification |
| --- | --- | --- |
| Repository owner decisions | Accepted outcomes and sequencing for #92 and #93 | Confirmed in this discussion on 2026-09-09 |
| [Contributing](../../CONTRIBUTING.md) | Repository branch, review, merge, and source-validation boundaries | Read at `f1a8083db05f1fff9c9c3084618b72345e3aa77d` |
| [Documentation quality policy](../../docs/documentation-quality-policy.md) | Canonical validation and human-review evidence | Read at the same revision |
| [Error handling](../../docs/error-handling.md) | Recovery and escalation | Remains canonical; not restated here |

## Facts and decisions

| ID | Fact, question, or decision | Resolution / evidence |
| --- | --- | --- |
| `F01` | This delivery worktree initially lacked `node_modules`, while the main workspace had required project dependencies. | Direct worktree self-test on 2026-09-09. |
| `F02` | Dependencies are ignored and must not be committed. | `.gitignore` and `git check-ignore`. |
| `Q01` | Must a worktree be a byte-for-byte clone? | No: require operational equivalence for relevant work, using only required authorized inputs. |
| `Q02` | When does full validation run? | After two reviewers converge; repeat after candidate-changing corrections. |

## Requirements and acceptance

| ID | Need or requirement | Acceptance signal |
| --- | --- | --- |
| `R01` | The agent verifies a new worktree can perform its relevant work and tests. | Guidance requires a representative self-test and proportional provisioning/recovery. |
| `R02` | Missing runtime support is copied, recreated, or safely shared only as needed and within authority. | Guidance preserves ignored status, permissions, secrets, ownership, and independence. |
| `R03` | Fast checks enable early review; full checks certify the reviewed exact head. | Canonical policy and README show the selected loop. |
| `R04` | Candidate changes invalidate the appropriate review and validation evidence without restarting unrelated work. | Same retained reviewers re-review and full validation reruns; transient unchanged failures rerun only affected checks. |
| `R05` | Existing quality, human merge authority, and project-specific stricter policy remain intact. | No removed gate or universal override. |

## Decision log

| ID | Decision | Alternatives | Rationale / tradeoff |
| --- | --- | --- | --- |
| `D01` | Treat worktree readiness as an agent-owned observable outcome. | Assume source checkout is sufficient; prescribe a universal copy list. | A representative self-test adapts to each project without weakening runtime readiness. |
| `D02` | Run fast affected validation before agent review and full required validation after both reviewers converge. | Full validation before every review round. | Preserves final-head proof while avoiding predictable repeated expensive work. |
| `D03` | A candidate-changing correction repeats fast checks, both retained reviews, and final full validation. | Reuse stale evidence. | Review and test evidence must describe the exact candidate. |
| `D04` | Keep rules outcome-oriented and update existing canonical owners and diagrams only. | Add a new process document or detailed universal procedure. | Fits proportional effort and avoids over-engineering. |

## Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `DP01` | A delivery worktree demonstrates it can run the relevant project work before dependent implementation proceeds. | The agent chooses a representative fast check and diagnoses failures. | A relevant check runs from the worktree with its provisioned runtime. |
| `DP02` | Required missing ignored support is provisioned proportionally from an authoritative workspace or source. | Copy, recreate, or safely share only necessary authorized inputs; never commit secrets or overwrite owned local values without authority. | Inputs remain ignored and the worktree does not rely on mutable feature state elsewhere. |
| `DP03` | A coherent PR begins two-agent review after fast affected checks. | Project policy may require additional or earlier checks. | Fast-check evidence and exact reviewed head are recorded. |
| `DP04` | Full applicable validation runs after both retained reviewers have no findings. | Full validation certifies the exact candidate before human merge review. | Two review results and full checks share one head SHA. |
| `DP05` | Candidate changes loop through affected fast checks, retained-seat re-review, and full validation. | An unchanged transient validation failure repeats only affected validation; no stale evidence is reused. | Final evidence is green for the unchanged exact head. |
| `DP06` | Human merge authority remains the final decision boundary. | Efficiency changes review ordering, not required judgment or safety. | Human brief discloses review and validation evidence before merge. |

## Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| `DR01` | `DP01`, `DP02` | Accepted | Worktree self-test reproduced the missing ignored dependency case. |
| `DR02` | `DP03`, `DP04` | Accepted | Separates fast feedback from final exact-head proof. |
| `DR03` | `DP05` | Accepted | Preserves evidence validity without repeating unaffected preparation. |
| `DR04` | `DP03`, `DP04`, `DP05` | Accepted | Existing README diagrams are the reader-facing explanation. |

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | Worktree self-test/provisioning and fast-review-full-validation sequencing accepted. | `DISCLOSE` |
| Important boundaries | Secrets stay untracked; evidence must match the exact head; stricter project policy and human merge authority remain. | `DISCLOSE` |
| Alternatives rejected | Blind workspace cloning, universal copy commands, early repeated full suites, and new templates/gates. | `DISCLOSE` |
| Remaining gaps or risks | Project-specific runtime resources can still require authority; canonical error handling governs those cases. | `DISCLOSE` |
| Decision requested | None; implementation is authorized. | `NONE` |
