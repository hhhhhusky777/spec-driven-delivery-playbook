# Implementation plan — affected validation reruns (#142)

<!-- sdd: implementation-plan -->

This file owns active delivery state. GitHub PR owns review, check, merge, and target evidence.

## Delivery status

| Field | Value |
| --- | --- |
| State | `DRAFT` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | Human review before merge |
| Delivery branch / target | `codex/affected-validation-reruns` → `main` |
| Owner | Repository owner |
| Primary issue / need | [#142](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/142) |
| Concluded whiteboard | [Solution whiteboard](solution-whiteboard.md), accepted design `8cd91fc688f81965d73f6517b6709a96fae3881a`, conclusion `0d4589cdb5254cb064b6bf361aab555014c9230d` |
| Required reviewers | Two retained independent design reviewers A and B, through plan, task, final candidate, and merge |
| Last verified | 2026-09-29: owner accepted D01–D04 and FC01; both reviewers verified conclusion commit; `npm run docs:sdd` passed |

## Governing inputs and boundaries

| Source | Authority / use |
| --- | --- |
| [Concluded whiteboard](solution-whiteboard.md) | D01–D04 and FC01 bind every addition; no whiteboard byte may change without prior owner authorization. |
| [Issue #142](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/142) | Desired observable rule, examples, and non-scope. |
| [Documentation quality policy](../../docs/documentation-quality-policy.md) | Sole canonical owner of final-validation invalidation; documentation and test outcomes. |
| [Contributing](../../CONTRIBUTING.md), [workflow skill](../../skills/sdd-project-workflow/SKILL.md), [README](../../README.md) | Existing review, branch, audit, human authority, and consuming guidance. |
| [Error handling](../../docs/error-handling.md) | Preserve failures; recover proportionally without erasing evidence. |

| Concern | Accepted value |
| --- | --- |
| Required outcome | A final-candidate correction invalidates each gate whose exercised product code, runner, dependencies, fixtures, configuration, or environment changed. Every affected gate reruns completely. |
| Reuse boundary | A passed unaffected gate may carry forward only with prior exact SHA, unchanged-input rationale, and confirmation by both retained reviewers; uncertain overlap triggers full validation. |
| Failure boundary | Preserve failed evidence; a failed gate stays red until its own rerun passes. Final focused checks, exact-candidate review, hosted status, and human merge authority remain required. |
| Scope | Canonical policy statement; links or short pointers in consumers; README flowchart if needed; example/counterexample; `reused from <sha>` evidence wording; document-model tests. |
| Exclusions | No new input-classification tool or checklist, no #442 MinIO repair, no downstream project policy change in this branch. Project #451 follows its own upgrade and review. |
| Compatibility | The rule clarifies evidence reuse for future final candidates; adopting projects retain stricter policy authority. |
| Material assumptions | None unresolved; the owner explicitly accepted the rewritten #142 scope. |

## Functional and failure contracts

| ID | Trigger / precondition | Required behavior | Result / postcondition | Failure / recovery |
| --- | --- | --- | --- | --- |
| C01 | Final candidate changes after validation | Compare each required gate's inputs with its prior run. | Changed-input gates rerun in full; unaffected passes may be reused with prior SHA and rationale confirmed by both reviewers. | Uncertain overlap follows FC01. |
| C02 | Previously failed gate | Keep original failure and exact rerun evidence. | Gate remains red until its own full rerun passes on reviewed candidate. | Diagnose under error-handling policy; no green hunting. |
| C03 | Human brief or PR presents validation | Distinguish passed, failed, unrun, and `reused from <sha>`. | Reused evidence is visible and does not imply approval or satisfy current hosted SHA status. | Missing evidence blocks final readiness until author supplies it or reruns. |
| FC01 | Input overlap remains uncertain | Do not reuse old passes; run full applicable validation. | Final readiness resumes only after reviewed candidate's gates pass. | Author may first establish input ownership and obtain both reviewers' confirmation of a narrower mapping. |

## Test and acceptance inventory

| Owning task | Contract, changed outcome, or risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| T01 | D01–D02; changed versus unchanged inputs | `tests/document-model.test.mjs` positive and negative policy contracts, including product code and validation-only changes | Update existing | Focused task test |
| T01 | D02; uncertain overlap | Counterexample for shared container/global setup/common fixture; full validation when consumers unclear | Add to policy and document-model contract | Focused task test |
| T01 | D03; failure and reuse evidence | Assert failed gate remains red, reviewer confirmation and `reused from <sha>` guidance, hosted final-SHA requirement | Update existing | Focused task test |
| T01 | D04; canonical ownership | Assert one normative rule in quality policy and noncontradictory pointers in workflow, Contributing, README | Update existing | Focused task test |
| T02 | Complete candidate | After exact implementation audit and authorized closure, run affected `npm run docs:focused -- BASE HEAD`, `npm run docs:sdd`, and `git diff --check` before both reviewers inspect the closing head. After their approval, run `npm ci --ignore-scripts` and `npm run docs:all`. | Pending | Focused checks before final review; full source gate after review |

## Delivery strategy and readiness

| Concern | This delivery |
| --- | --- |
| Integration model | Single self-contained PR from `codex/affected-validation-reruns` to `main`, per Contributing. |
| Increment boundary | T01 makes all policy consumers and tests consistent; T02 converges tracked delivery state and validates the final candidate. |
| Parallel ownership | None; retained reviewers work read-only. |
| Merge authority | Repository owner; no automatic merge. |
| Final audit | After implementation tasks complete and any required target synchronization, author and both retained reviewers audit exact implementation content before any missing final tests or final-gate runs. Closing document changes then receive affected focused checks before both reviewers inspect the exact closing candidate; complete validation follows their approval. |
| Closure authorization | The owner must explicitly authorize whiteboard reset and archive transition before T02 changes those tracked bytes. |

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| D01 | T01: input-based invalidation for any correction | Positive/negative document-model cases | Aligned |
| D02 | T01: complete affected reruns, reviewed reuse, uncertain full fallback | Example/counterexample and contract test | Aligned |
| D03 | T01: failure/review/status preservation and reuse evidence state | Contract test and semantic review | Aligned |
| D04 | T01: quality policy owner and consumer pointers; T02: full validation | Canonical wording checks and `docs:all` | Aligned |
| FC01 | T01: uncertain-overlap response and recovery | Counterexample and review | Aligned |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | `PLANNED` | `None` | Implement D01–D04 and FC01 in canonical guidance and contract tests. | No project-specific MinIO repair or new classifier. | Focused docs contract tests and `docs:sdd`. | `codex/affected-validation-reruns`; single PR; `main` |
| T02 | `PLANNED` | `T01` | Converge archive/plan/whiteboard candidate, exact-head review, and full applicable Guide validation. | Prior owner closure authorization; no merge without owner authority. | Exact implementation audit; affected focused checks and diff check before reviewers; `docs:all` after their approval. | `codex/affected-validation-reruns`; same PR; `main` |

## Task specifications

### T01 — policy and consumers

| Concern | Value |
| --- | --- |
| Outcome / non-scope | One quality-policy rule with consistent pointers, examples, evidence wording, and focused contract checks; excludes #442 and #451 code. |
| Source boundary | `docs/documentation-quality-policy.md`, `skills/sdd-project-workflow/SKILL.md`, `CONTRIBUTING.md`, `README.md`, `tests/document-model.test.mjs`. |
| Consumed dependencies | Concluded D01–D04/FC01; current canonical authorities listed above. |
| Critical obligations | Preserve exact-candidate review, all required gates, original failed evidence, project stricter policy. |
| Required evidence | Focused tests before retained reviewer inspection; tracked wording and examples match issue. |
| Actual result | Pending. |

### T02 — final candidate and closure

| Concern | Value |
| --- | --- |
| Outcome / non-scope | Merge-ready tracked state and complete exact-head evidence; merge remains an owner decision. |
| Source boundary | Existing whiteboard/plan/archive lifecycle and PR evidence. |
| Consumed dependencies | T01 DONE, owner closure authorization, exact implementation audit. |
| Required evidence | Affected focused command, SDD lifecycle, and diff check before both retained reviewers inspect the closing candidate; `npm run docs:all` after their approval. Disclose any failed or unrun check. |
| Actual result | Pending. |

## Plan validation and completion

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | D01–D04/FC01 mapped through T01/T02 | Pending |
| Applicable validation passed | Focused task checks then complete final source gate | Pending |
| Canonical state converged | Archive, whiteboard reset, and plan removal after explicit owner authorization | Pending |
| PR-owned delivery | Exact reviews, checks, human merge decision, target verification in PR | Pending |

## Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and outcomes | T01 implements policy and tests; T02 closes and validates final candidate. | `HUMAN_DECISION` |
| Design consistency | D01–D04 and FC01 are fully mapped; no extra behavior planned. | `DISCLOSE` |
| Important boundaries | One canonical quality-policy rule; prior failures stay red; project #451 remains separate. | `DISCLOSE` |
| Validation | Plan drafting `docs:sdd` to be run; focused and complete Guide gates remain pending. | `DISCLOSE` |
| Risks or open decisions | GitHub CLI authentication currently returns 401; PR creation may require credential refresh. Closure authorization is deferred to T02. | `DISCLOSE` |
| Decision requested | Accept the reviewed plan before T01 implementation. | `HUMAN_DECISION` |
