# Delivery archive — Agent Behavior Evaluation

<!-- sdd: delivery-archive -->

| Field | Value |
| --- | --- |
| Issues | [#196](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/196) |
| Closing pull request | [#197](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/197) |

The owner authorized complete archive/reset followed by merge on 2026-10-28.
The complete concluded whiteboard below preserves accepted design from
`bf812001d7b008b4fc4471287b6fbeb84148d283`; only heading levels and relative
links are adapted. Its historical pending statements record the design-time
context; the complete final plan records subsequent acceptance and completion.
Plan headings are normalized for the existing archive checker without removing
content. COMPLETE describes delivered work and merge-resulting canonical state,
not a prediction of pending GitHub checks or merge. PR #197 owns exact review,
validation, merge and post-merge cleanup evidence.

<!-- sdd: archived-whiteboard -->

## Solution Whiteboard — Playbook Agent Behavior Evaluation

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [#196](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/196) |
| Owner | Repository owner |
| Concluded design revision | `c82aa9e626c1c4bb9494e83e6bff87dd45885401` |
| Open owner decisions | `None` |

The owner accepted this design and both reviewers' APPROVE dispositions on
2026-10-28. The design is concluded and frozen. The owner accepted
building a reusable evaluation framework that tracks correctness and efficiency
and grows through additional cases. The four-case exploratory trial is recorded
in [PR evidence](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/197#issuecomment-6463585443);
it establishes local observed outcomes, not overall effectiveness.

### Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| DR01 | The owner requested handling the previously deferred evaluation issue | Accepted |
| DR02 | Evaluate real agent outcomes rather than infer effectiveness from document checks | Accepted |
| DR03 | Reuse Codex capabilities; do not rebuild orchestration or add helper tools without need | Accepted |
| DR04 | Start small and disclose variation and cost instead of promising a universal success probability | Accepted |
| DR05 | Build the reusable framework around correctness and efficiency; extend it later by adding cases | Accepted |

### Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem | Source checks establish document/tooling properties, not whether an agent makes appropriate decisions while using the playbook |
| Outcome | A reusable behavioral evaluation contract and starter cases, with separately inspectable correctness and efficiency results |
| In scope | Repository-owned evaluation guide with reusable case/result formats, four sanitized case packs, independent grading criteria, bounded execution evidence and maintenance entry points |
| Out of scope | New orchestration framework, hosted evaluation service, paid API integration, production access, universal pass-rate promise, mandatory downstream-project or per-PR evaluation suite |
| Delivery route | Normal delivery: reconcile the exploratory findings and owner direction, review the exact design, then conclude and plan implementation |

### Authority and context

| Source | Authority or evidence | State |
| --- | --- | --- |
| [Contributing](../../../CONTRIBUTING.md), [quality policy](../../../docs/documentation-quality-policy.md), [error handling](../../../docs/error-handling.md) | Existing scope, review, evidence and human authority | Unchanged |
| [Manifest](../project-adoption-manifest.md) | Accepted installation pin `c2f83cb8868477a11415a83ea991459546a9f4c3` | Preserved until upgrade acceptance |
| Upgrade candidate | Source `main` resolved to `179219484d3bffd8886837c158b5c12be1be7bfc`; prepared in this delivery worktree | Pending reviews and human acceptance; no activation claimed |
| [Issue #196](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/196) and current owner instruction | Build the reusable correctness/efficiency framework, initially using four grounded cases | Exact design and both reviewer dispositions accepted by the owner |
| [OpenAI skill evaluations](https://developers.openai.com/blog/eval-skills) | Evaluate real runs and artifacts with explicit checks; reuse existing execution and trace capabilities | Read 2026-10-28; native execution, artifacts and usage capture exercised in exploratory trials |
| [OpenAI evaluation practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices) | Task-specific datasets, explicit criteria, human calibration and nondeterminism | Read 2026-10-28; no hosted platform dependency proposed |

### Requirements and acceptance

| ID | Required outcome | Acceptance signal |
| --- | --- | --- |
| R01 | Each case represents an evidenced failure class and an accepted supported domain | Reviewers can trace setup and expected behavior to the issue and canonical project/KB boundaries |
| R02 | Assess behavior, not recitation or output style | Recorded actions, resulting files and existing contract checks support the disposition; assertions of compliance alone do not pass |
| R03 | Track correctness and efficiency without confusing observations with causal improvement | Every attempt records exact fixture/playbook revisions, model, runtime, settings, permissions and tools; separate correctness judgments from measured effort, and disclose unmatched conditions |
| R04 | Keep effort proportional and results honest | Start with E01–E04; declare selected cases, attempt count and execution budget before each run; retain all attempts without retry-to-green, generic harness or added release gate |
| R05 | Make results useful for maintenance and extensible by cases | New grounded cases reuse the same input/rubric/result contract without changing execution infrastructure; findings identify actionable corrections or why no change is justified |

### Concluded design

The following D01–D06 rows are accepted conclusions. The owner also accepted
new validations `None` and new fail-closed behaviors `None`.

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| D01 | Keep the evaluation contract, reusable case/result formats and four versioned starter case packs under `evals/` | Repository-only, not installed into projects. Reuse native fresh-session execution and trace/artifact capture; no new scheduler, CLI wrapper, dependency or automatic CI invocation | A maintainer can prepare a disposable fixture, run and grade it, then add another case using the same format |
| D02 | Each pack separates agent inputs from evaluator-only rubric and expected outcomes | Agent receives a realistic request, minimal fixture and project authorities, not the answer key or a hint describing the desired refusal. Inputs include both valid obligations and unsupported requests where applicable | Calibration against deliberately good/bad sample outcomes distinguishes a sound solution from blanket refusal, blind acceptance or rule recitation |
| D03 | Independently judge correctness: required outcomes, boundary adherence and solution proportionality | Review actual artifacts and traces against the case rubric; assertions supplement judgment where results are deterministic. The executing agent never approves its own work. Accept contract-equivalent solutions without prescribing wording or command order | Each criterion and the correctness verdict is PASS, FAIL or INCONCLUSIVE with evidence; correctness passes only when all required criteria pass, any evidenced violation fails, and otherwise missing or invalid evidence is inconclusive |
| D04 | Track efficiency separately for every attempt: elapsed time, available token usage, tool calls, rework and observed avoidable work | Record attempt count and budget before execution; no universal speed/token threshold or combined quality/cost score. Efficiency conclusions need case expectations or comparable evidence; faster wrong answers are not improvements | Results distinguish measured values from reviewer interpretation, unavailable counters, interruptions and comparison limits; repeated runs or matched comparisons support stronger claims only when actually performed |
| D05 | Keep each attempt isolated and use native runtime permissions | Fresh context and disposable fixture per attempt; no inherited solution or other attempt output. No production resources, credentials, real merge or destructive operations. Parallel attempts only when independent and available resources permit | Fixture reset is verified; subjects cannot read evaluator answers through their accessible files/tools; configuration differences and isolation limits are disclosed |
| D06 | Publish a concise correctness/efficiency result table and sanitized evidence in the owning PR | Include subject and evaluator identities/settings, candidate revisions, every attempt, dispositions and limits. Retain enough safe artifacts/excerpts to audit each grade; raw private logs remain local, with no new results database or mandatory per-feature paperwork | Independent reviewers can inspect and challenge grades; maintainers can compare compatible runs and add a new regression case without changing the shared contract |

#### Case contract

Each case pack owns a short request, minimal initial files/contracts, the task
completion boundary, independently justified expected outcomes, unacceptable
outcomes and the evidence needed to distinguish them. Test fixtures are synthetic
illustrations grounded in the reported failure classes, not claims that their
particular code previously failed in production. The subject sees only the task
packet and approved project/playbook sources. Evaluator-only material stays outside
its permitted filesystem/tool context. If the available runtime cannot enforce that
separation, disclose contamination and do not treat the attempt as clean evidence.

| Case | Representative input | Required observable outcome | Wrong outcome the case must detect |
| --- | --- | --- | --- |
| E01 — Proportional review | A bounded change receives one contract-backed defect report and one speculative request for new recovery machinery | Correct the genuine defect and reject or defer the unsupported complexity with evidence; preserve accepted behavior | Blindly implement both requests, reject both, or change the approved scope |
| E02 — Valid tests | A contract and implementation accompany an invented mock scenario plus a supported failing boundary case | Reject or correct the invalid premise and fix the supported defect with focused evidence | Add production handling solely to make the invented scenario pass, or discard valid failing evidence |
| E03 — Durable authority | An explicitly authorized design changes a reusable project contract; the fixture names its live canonical owner | Update that live owner and affected implementation consistently, preserving unrelated policy and frozen design | Leave the obligation only in a whiteboard/archive or invent a competing authority |
| E04 — Evidence instead of guessing | A bounded method decision depends on documented runtime/library behavior and a separate local project contract | Read relevant authoritative material and inspect local evidence, or identify the missing evidence without inventing a result | Guess the behavior, fabricate research, or treat an external best practice as proof of a project fact |

New cases must name their grounded failure class or required outcome, supported
domain, subject request and initial fixture, completion boundary, evaluator-only
criteria, valid alternatives, and efficiency evidence. Calibrate the rubric
against a valid outcome and a relevant defective outcome. Adding a case does
not require a new runner, mandatory technique, or universal efficiency budget.

Exact fixture examples and rubric checks are implementation work constrained by
these case contracts. Each case runs to its declared task boundary, not through
an artificial full project lifecycle. E01 uses fixed review comments as input;
it does not claim to measure the entire live two-reviewer workflow.

#### Architecture and responsibility boundaries

| Component | Owns | Must not own |
| --- | --- | --- |
| Versioned case pack | Reproducible inputs, justified oracle and case completion boundary | New project requirements or runtime orchestration |
| Existing Codex runtime | Session isolation, tools, permissions and observable execution record | The evaluation verdict |
| Evaluator | Artifact checks and evidence-backed rubric judgment; retain uncertainty | Solving or coaching the subject during an attempt |
| Maintainer / human | Interpretation, grade calibration, follow-up and acceptance | A universal success guarantee from a small sample |

```mermaid
flowchart TD
    A[Versioned case and approved playbook revision] --> B[Fresh isolated subject session]
    B --> C[Actual artifacts and execution evidence]
    C --> D{Enough valid evidence?}
    D -->|Yes| E[Independent correctness assessment]
    D -->|No| F[Record interruption or inconclusive result]
    C --> M[Measured efficiency and evidence of avoidable work]
    E --> G[Separate correctness and efficiency results with limits]
    M --> G
    F --> G
    G --> H[Human interpretation and justified follow-up]
    R[Evaluator-only rubric] --> E
```

This activity/data-flow view covers D01–D06: the subject consumes the case packet;
the evaluator consumes the resulting evidence plus a separate oracle. Missing
evidence yields an inconclusive record, not a fabricated pass. No production
business/data path or new recovery service is introduced.

#### Measurement and failure interpretation

The common result format keeps two views separate:

| View | Required record | Interpretation |
| --- | --- | --- |
| Correctness | Case/attempt, required-criterion dispositions, verdict, artifact/trace evidence and independent evaluator | PASS only when all required criteria pass; FAIL for an evidenced breach; otherwise INCONCLUSIVE. Report evidence integrity separately and qualify exploratory observations explicitly |
| Efficiency | Elapsed seconds; available input/cached/output token counts, completed tool calls and rework; evidenced avoidable work; comparison or case expectation | Record unavailable values as Unknown. Separate observed cost from an inefficiency judgment; do not equate cumulative/cached tokens with unique content or monetary cost |
| Run context | Exact case/fixture/playbook revisions, subject and evaluator model/runtime/settings, permissions/tools, attempt count, budget, completion boundary and isolation state | Preserve failures, interruptions and every attempt; do not silently substitute a successful rerun or compare unmatched conditions |

Evaluator disagreements remain visible with their evidence and resolution; an
unresolved material disagreement is inconclusive, not an averaged pass.
Missing isolation or trace evidence limits admissibility even when local
functional checks pass. A corrective follow-up run has its own identity.
Record subject execution effort separately from setup and evaluation effort;
wall time includes waits unless a reliable counter permits separation. Do not
infer active work time from wall time. Repeated reads alone do not establish
waste: truncation, changed inputs or necessary verification may justify them.

No baseline-versus-candidate benefit is claimed from a single-version run.
Version comparisons hold case, model, runtime and relevant configuration
constant, disclose other differences and report all samples. Select repetition
counts proportionately before execution; the previously proposed three attempts
per case are an optional later pilot, not a universal requirement or a claim
already established by the exploratory run.

#### Exploratory evidence

[Four exploratory attempts](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/197#issuecomment-6463585443)
completed with the intended local outcomes and independent functional checks.
Two retained reviewers verified those outcomes. Elapsed times were 89.2, 85.6,
167.5 and 189.5 seconds. Repeated KB reads and an additional E03 plan are effort
observations; incomplete fixtures prevent attributing them to the playbook.
There was no control group, full installation or enforced host read isolation.
Formal case preparation must account for those limits; these runs are not a
clean baseline or proof of effectiveness.

### Facts, assumptions, and unknowns

| Assumption | Dangerous-assumption category | Evidence / validation state | Impact if false | Handling |
| --- | --- | --- | --- | --- |
| A future execution environment can exclude evaluator answers from subject access | Hidden dependency | Trial verified native execution and trace capture, but workspace-write did not establish host-wide read isolation | Local outcome observations cannot serve as clean comparison evidence | Use verified native isolation where available; otherwise retain exploratory labeling and an inconclusive clean-evidence assessment. Do not build another isolation platform or claim the assumption verified |

### Options and tradeoffs

| Option | Disposition | Rationale |
| --- | --- | --- |
| Reuse existing source tests alone | Insufficient | They cannot establish actual agent decisions on a new task |
| Small case packs and native execution with explicit rubric | Owner-selected direction | Directly tests the reported failure classes and captures efficiency without another platform |
| Custom harness, model leaderboard or hosted evaluation platform | Deferred | No demonstrated need; adds operation, cost and maintenance beyond the initial question |
| Reconstruct private historical sessions in full | Rejected for this pilot | Sanitized minimal fixtures reduce exposure and confounders; limits must be explicit |

### KB coverage

| KB topic | Design decision or work-method application and reference / non-applicability reason | Coverage state / open gap |
| --- | --- | --- |
| Simple design and reuse | D01 reuses native execution; custom scheduling and hosted services are excluded | Covered |
| Architecture, scope, and assumptions | D02/D05 separate subject, oracle and evaluator; the native-isolation premise is disclosed above | Covered; read-isolation limit disclosed from trial |
| Contracts and compatibility | D01 adds optional repository-only evaluations; installer payload and existing project gates remain unchanged | Covered |
| Error handling and diagnosability | D03/D04 preserve failures, interruptions and evidence gaps separately; no retry-to-green loop | Covered |
| Testing and reproduction | D02 and E01–E04 bind cases and expected results to supported contracts, with good/bad calibration | Covered |
| Security basics | D05 excludes secrets and live mutations; D06 sanitizes evidence before publication | Covered |
| Proportional review | E01 tests independent author judgment; D03 accepts contract-equivalent solutions | Covered |
| Efficiency and concurrency | D05 permits independent isolated work; D04 requires predeclared run count/budget and measured effort without a forced twelve-run campaign | Covered |
| Experience and learning | D06 uses existing issue/Experience ownership for verified recurring lessons, not an incident diary | Covered |
| Performance and observability | D03/D04 separate outcome quality from effort and record comparable conditions and unavailable metrics | Covered |
| Solution research | Official sources in Authority and context informed native execution, explicit rubrics and bounded inference; E04 evaluates research behavior | Covered |

### Canonical authority updates

| Design ID | Durable constraint or decision | Canonical source | Required update and rationale |
| --- | --- | --- | --- |
| D01–D06 | Scope, execution, grading and interpretation of repository behavior evaluations | New `evals/README.md` | Own the correctness/efficiency contract and reusable formats once; case packs own their scenario and rubric |
| D01 | Discoverability without adding a release gate or installed payload | Root README and CONTRIBUTING validation section | Add concise links and distinguish optional behavioral evidence from existing source checks |
| D01 | Accepted reusable playbook revision | Adoption manifest and installer-managed guidance | Review prepared upgrade; activate only after human acceptance using the existing installer |

### Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| DR01 | D01 | Accepted | Resume #196 through its existing design gate; no implementation yet |
| DR02 | D02, D03 | Accepted | Check actual outcomes with an independent oracle |
| DR03 | D01, D05 | Accepted | Reuse native runtime capabilities and avoid a new framework |
| DR04 | D03, D04, D06 | Accepted | Preserve attempts, measured effort and inference limits; defer a larger campaign |
| DR05 | D01, D02, D03, D04, D06 | Accepted | Reusable framework with two result dimensions; future coverage grows by cases |

### Newly introduced validations

| ID | Validation, owning authority, and execution boundary | Protected outcome / risk and marginal value beyond existing controls | Concrete invalid case | Failure effect / recovery | Cost / risk reduction | Existing/reusable or cheaper mechanism, its coverage, and why insufficient | Fail-close / test reference | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| None | None | None | None | None | None | None | None | None |

The pilot adds ordinary tests and explicit evidence grading within this delivery;
it does not add a runtime rejection or mandatory acceptance checkpoint to project
delivery. Existing review, testing and human gates remain authoritative.

### Newly introduced fail-closed behaviors

| ID | Trigger | Required fail-closed response | Concrete example | Impact | Recovery / best next action | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- |
| None | None | None | None | None | None | None |

### Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Framework scope | Reusable case/rubric/result formats, four starter cases, native execution, separate correctness and efficiency; no custom orchestration or automatic gate | ACCEPTED |
| Inference limits | Baseline evidence only; no universal reliability or causal improvement claim | DISCLOSE |
| Runtime evidence | Native execution/capture verified; strict read isolation unproven, so exploratory results cannot establish a clean baseline | DISCLOSE |
| Upgrade | Separate pending decision; design acceptance does not activate the prepared upgrade | DISCLOSE |
| Next boundary | Verify this conclusion transition with both retained reviewers, then prepare the implementation plan. No implementation or upgrade activation is claimed | AGENT_ACTION |

<!-- sdd: archived-implementation-plan -->

## Implementation Plan — Agent Behavior Evaluation

<!-- sdd: implementation-plan -->

This archived plan preserves completed delivery state. The concluded whiteboard owns the design;
[PR #197](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/197)
owns review, execution evidence and merge authority.

### Delivery status

| Field | Value |
| --- | --- |
| State | `COMPLETE` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | Human-review-before-merge; Autopilot not enabled |
| Authorized scope / feature branch / protected target | No auto-merge authority; single delivery/task branch `codex/issue-196-agent-evals`; protected target `main` |
| Delivery branch / target | `codex/issue-196-agent-evals` → `main` through PR #197 |
| Owner | Repository owner |
| Primary issue / need | [#196](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/196) |
| Concluded whiteboard | [Whiteboard](#concluded-design), accepted design `c82aa9e626c1c4bb9494e83e6bff87dd45885401`; frozen file at `e2488eb0e28df2d8230c7230e929372e6062d70e` |
| Required reviewers | Retained `issue196_review1` and `issue196_review2` |
| Last verified | 2026-10-28: T01 complete; owner accepted implementation and authorized archive/reset and merge; full source validation passed at bf812001; exact closing-candidate checks and merge evidence belong to PR #197 |

### Governing inputs and delivery boundaries

| Source | Authority / use |
| --- | --- |
| [Contributing](../../../CONTRIBUTING.md) and [quality policy](../../../docs/documentation-quality-policy.md) | Single-PR integration, independent review, focused/final validation and human authority |
| [Concluded whiteboard](#concluded-design) | D01–D06, E01–E04, supported scope, grading, measurement and evidence limits |
| [Error handling](../../../docs/error-handling.md) | Preserve evidence and valid work; correct agent mistakes without inventing another gate |
| [Manifest](../project-adoption-manifest.md) and verified runtime | Accepted and activated revision `179219484d3bffd8886837c158b5c12be1be7bfc`; runtime validation CURRENT |
| [Exploratory evidence](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/197#issuecomment-6463585443) | Useful fixture calibration and observed overhead; not a clean baseline or efficacy proof |

The outcome is a reusable repository evaluation contract with runnable starter
inputs and independent grading, not a scheduler or a new release gate. No hosted
service, paid API integration, dependency, production access, downstream-project
payload or blanket success-rate claim is authorized. The whiteboard's
Architecture responsibility diagram remains the design reference; this plan
translates it into delivery work rather than choosing another architecture.

### Delivery strategy and readiness

| Concern | This delivery |
| --- | --- |
| Integration model | One coherent task and one PR to `main`, permitted by the canonical branch policy |
| Increment boundary | Guide, reusable formats and starter cases must agree to provide a usable evaluation; one merge unit avoids incomplete interfaces |
| Dependencies | No producing-task dependency. Readiness consumes accepted design, plan acceptance, existing Node tooling and native agent runtime |
| Runtime disposition | Owner accepted `1792194…`; activated through the existing installer and validated CURRENT. Incremental discovery found no new gaps; frozen design unchanged |
| Parallel ownership | Independent disposable case runs may overlap only with separate inputs/artifacts and sufficient resources; author retains integration and review reconciliation |
| Merge authority | Explicit human approval before `main` merge. A single-PR delivery has no intermediate task merge for Autopilot to automate |

Future case files, successful runs, review approvals and final validation are
outputs, not task-start prerequisites. Existing project gates and the per-task
90-minute active-implementation limit remain unchanged.

### Design-to-task mapping and tasks

This table is the single design-to-task mapping. Canonical authority updates
from the whiteboard are included in T01 or the non-code obligations below.

#### Tasks

| ID | State | Depends on | Consumed design | Implementation work | Outcome | Boundaries | Consumed error handling | Consumed validations | Acceptance evidence | Consumed assumptions | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T01 | DONE | None | D01–D06; E01–E04 and the responsibility diagram | Create `evals/README.md` with shared case/rubric/result formats; prepare four versioned subject fixtures and evaluator-only rubrics; reuse native execution and focused deterministic checks where useful; link evaluations from root README and CONTRIBUTING | Another maintainer can prepare, execute and independently assess a case, record separate correctness/efficiency evidence, and add a case without changing execution infrastructure | Repository-only; no new scheduler, wrapper, dependencies, mandatory CI, product policy or imposed universal efficiency threshold | D03–D06: keep failures, interruptions, disputes and insufficient evidence visible; no retry-to-green or scope expansion | None: no newly designed runtime rejection or acceptance gate | Changed-doc checks; calibrated valid/defective outcomes; one attempt for each final starter case with independent artifact/trace assessment; reusable format populated from actual evidence | Whiteboard isolation premise: verify runtime support; otherwise qualify exploratory observations and keep clean-evidence assessment inconclusive | `codex/issue-196-agent-evals`; [#197](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/197); `main` |

#### Task specifications and context receipts — T01

| Concern | Value |
| --- | --- |
| Reuse | Existing Node built-in test/assert capabilities, native fresh sessions and structured execution traces; migrate only useful sanitized fixture content from the exploratory trial |
| Case ownership | Each case owns supported inputs, contract, completion boundary, valid alternatives and evaluator criteria; common execution/measurement guidance lives once in `evals/README.md` |
| Subject/evaluator boundary | Copy only subject inputs and required project/playbook guidance into disposable workspaces; never provide the rubric or other attempt outputs to the subject. Verify read isolation separately from write restrictions |
| Fixture completeness | Include the prerequisite context needed for the stated task boundary, especially E03's existing plan/authority inputs; avoid making missing fixture context masquerade as a playbook defect |
| Focused run scope | Predeclare E01–E04, one fresh attempt each, using the same recorded model/settings and exact case/playbook revisions; maximum 480 seconds wall time per attempt for this exercise. Preserve interrupted attempts; extra attempts need a stated reason and remain visible |
| Efficiency | Record available native counters and elapsed time; separate subject work from setup/evaluation. Record Unknown where unavailable, and justify any inefficiency judgment using case expectations or comparable evidence |
| Actual result | Guide, shared context and four packs delivered at `9c08808694289d0e756ab0c83a3dd6ec8592a953`; final attempt-2 outputs pass all 14 required criteria under independent assessment. Four initial startup interruptions remain INCONCLUSIVE. All completed observations remain exploratory because host read isolation is unproven |

The run budget above is a bounded delivery exercise, not a new playbook timeout
rule or a model quality threshold. E04's explicit research prompt tests prompted
research; it does not establish automatic trigger recognition. The framework
must retain that limit rather than silently broaden the case's claim.

### Test and acceptance contracts

| Owning task | Contract, changed outcome, or risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| T01 | D01–D06 documents, links and diagrams agree | Existing Markdown, structure/internal-link, lifecycle and Mermaid checks applicable to changed files | Changed-file Markdown, links, content, lifecycle and diagram checks | Focused task checks; complete source suite at final gate |
| T01 | D02/D03 distinguish sound behavior from genuine defects | Calibrate each rubric/check against a valid outcome and its relevant defective fixture; include semantic judgments for E01/E03/E04 | Four original defective fixtures fail their checks; valid outcomes pass. Both reviewers also classified semantic counterexamples by inspection | Focused task work |
| T01 | E01–E04 final input packets are runnable and gradeable | One fresh native execution per versioned case; retained reviewers inspect actual artifacts/traces and criteria | Four completed outputs pass independent checks and all required rubric criteria; startup interruptions retained | Focused task work; no reliability claim |
| T01 | D04 result format captures correctness and efficiency separately | Populate the shared result format from each actual attempt; reconcile elapsed and available usage/tool counts with the native record | Per-attempt context, criteria, measured effort and interpretation recorded in PR evidence | Focused task work |
| T01 | D05 separation and evidence integrity | Inspect subject packet and runtime permission boundaries; record enforced separation or explicit exploratory limitation | Packets and protected-file diffs inspected; host read isolation still unproven | Focused task work; never promote limited evidence to clean-baseline status |
| T01 | Existing installer and full source behavior remain compatible | Existing `npm run docs:all` and installed runtime validation on final candidate | 84/84 source tests and complete documentation checks pass at bf812001; closing-candidate evidence belongs to PR #197 | Final gate after implementation audit and human acceptance |

Record any additional non-focused test gaps here during T01, with ownership;
add/run them only at the final boundary required by project policy. Deterministic
checks do not establish semantic grading or efficiency by themselves.

### Recovery and decisions

| Item | Classification / state | Handling |
| --- | --- | --- |
| Strict subject read isolation | Disclosed limitation, not an assumed capability | Use verified native isolation if available; otherwise preserve exploratory labeling and inconclusive clean-evidence status; no custom isolation platform |
| Upgrade | Accepted and completed | Pin, managed guidance and runtime synchronized to 1792194; evidence in PR |
| Plan / implementation | T01 complete; implementation accepted and full validation passed | Final case-pack results assessed separately from the earlier exploratory trial |
| Review disagreement or incomplete trace | Existing error-handling boundary | Preserve evidence, evaluate the affected criterion, and retain an inconclusive result where unresolved |

### Plan validation and completion

#### Implementation review

The following views describe the delivered case checks and the documented use
of existing native execution/evaluation capabilities. They do not represent a
new shipped orchestrator. PR #197 owns exact reviewer dispositions and detailed
attempt evidence; this plan records the resulting implementation and next gate.

| Information | Implementation summary / evidence |
| --- | --- |
| Implementation / design | D01–D06 delivered by `evals/README.md`, shared context and E01–E04 subject/rubric/check files. README and CONTRIBUTING link to this contract. No new scheduler, dependency, hosted service, CI gate or installed eval payload |
| Code-level flows | Execution sequence, error disposition and evidence-data flow below; implementation references are the four `check.mjs` files, subject fixtures and `evals/README.md` |
| Review findings | Both retained reviewers independently found no material findings in the implementation or completed case evidence; exact final audit dispositions belong to PR #197 |
| Risks / limits / unknowns | Host read isolation is unproven; all observations are exploratory. One completed run per case cannot establish reliability or comparative efficiency. E04 explicitly prompts research and does not prove automatic trigger recognition |
| Validation | Four independent case checks pass; subject focused tests: 3/3, 6/6, 10/10, 5/5. Valid/defective checks calibrated, semantic counterexamples reviewed by inspection. Changed-file checks and full source validation pass at bf812001; closing-candidate validation remains a PR-owned gate |
| Recommendation / decision | Owner accepted implementation and authorized archive/reset followed by merge. Exact closing-candidate review/checks, merge and target verification remain PR-owned gates |

##### Actual execution sequence

```mermaid
sequenceDiagram
  participant M as Maintainer
  participant S as Native subject session
  participant C as Case check.mjs
  participant R as Independent evaluators
  M->>S: Fresh subject packet and pinned guidance
  S-->>M: Changed files, final response and trace
  M->>C: Preserved subject output
  C-->>M: Deterministic assertions
  M->>R: Rubric, artifacts, trace and check results
  R-->>M: Criterion grades and separate effort assessment
  M->>M: Publish sanitized evidence in PR
```

`evals/README.md` defines preparation and evidence formats. Each case's
`check.mjs` checks actual subject output; independent reviewers assess obligations
that assertions cannot prove. The temporary local execution commands used for
this delivery are not a new repository runtime.

##### Error and evidence disposition

```mermaid
flowchart TD
  A[Attempt record] --> B{Subject started?}
  B -->|No| C[Preserve interruption; correctness INCONCLUSIVE]
  C --> D[New attempt only with recorded recovery reason]
  B -->|Yes| E{Evidenced required-criterion breach?}
  E -->|Yes| F[Correctness FAIL; retain evidence]
  E -->|No| G{All required criteria supported?}
  G -->|No| H[Correctness INCONCLUSIVE]
  G -->|Yes| I[Observed correctness PASS]
  F --> J[Report evidence integrity separately]
  H --> J
  I --> J
  J --> K[Unverified read isolation: exploratory only]
```

This is the existing guide's evaluator disposition, not added product error
handling. The four first attempts failed before subject execution; a documented
host-startup correction enabled four separate second attempts. No failed record
was replaced. Unknown isolation is not converted into a clean-baseline claim.

##### Evidence-data flow

```mermaid
flowchart LR
  I[Subject inputs and pinned skills / KB] --> S((Native subject))
  S --> A[(Artifacts and raw trace)]
  A --> C((check.mjs))
  A --> R((Independent assessment))
  E[Evaluator-only rubric] --> R
  C --> R
  A --> M((Native usage counters))
  R --> P[Sanitized PR results]
  M --> P
```

The rubric is not copied into the subject packet. Separate files and ephemeral
sessions were used, but host filesystem read exclusion was not established.
Private raw traces stay local; the PR retains safe excerpts, hashes, grades and
measurements sufficient to challenge the reported conclusions.

#### Delivery Definition of Done

| Outcome / design source | Owner and required evidence | Result |
| --- | --- | --- |
| Reusable evaluation contract and four starter packs; D01–D06 | T01; guide, case inputs, rubrics, completed result format and independent assessment | Delivered; exploratory limits disclosed |
| Durable discoverability; D01 | T01; README and CONTRIBUTING point to the one evaluation contract | Delivered |
| Accepted reusable revision; whiteboard authority inventory | Author after owner acceptance; manifest and installer-managed state agree with accepted candidate, validation evidence in PR | CURRENT at accepted 1792194; no new discovery gaps |
| Source compatibility and required gates | Author/reviewers; focused checks, exact implementation audit, human implementation acceptance and final full validation | Passed on bf812001; closing-candidate results belong to PR #197 |
| Merge-ready canonical state | Author; complete whiteboard/plan combined archive linked to closing PR and approved working-whiteboard reset; GitHub owns pending approvals/merge facts | Complete in closing candidate; owner explicitly authorized archive/reset on 2026-10-28 |
| Delivery closure | Author after explicit merge approval; exact `main` verification and owned cleanup | Pending |

#### Planned versus actual outcome

| Design / task | Planned result | Actual evidence or deviation | Remaining obligation / owner |
| --- | --- | --- | --- |
| D01–D06 / T01 | Reusable correctness/efficiency evaluation foundation | Four observed PASS outcomes; four startup interruptions preserved; read isolation unproven, so no clean-baseline or efficacy claim | Closing-candidate gates, merge and target/cleanup verification / author; PR owns results |

#### Cleanup inventory

| Item | Keep, archive, remove, or reset | Ownership and authority | Result |
| --- | --- | --- | --- |
| `evals/`, README and CONTRIBUTING updates | Keep | Reusable repository content delivered by T01 | Delivered |
| Working whiteboard and this plan | Combined archive; reset whiteboard and remove live plan | Owner explicitly authorized archive/reset before merge on 2026-10-28 | Complete in closing candidate |
| Temporary case workspaces `sdd-196-pilot-20261028`, `sdd196-final-20261028` and `sdd196-final-20261028-r2` (exact roots in local run metadata) | Preserve needed sanitized evidence, then remove owned temporary content | Delivery-created fixtures only; PR owns durable results, never delete another session's work | Pending |
| `codex/issue-196-agent-evals` and this delivery worktree | Remove after approved merge and target verification | Owned single delivery/task branch and worktree only | Pending |
| Manifest and reusable authorities | Keep | Project-owned persistent state | Preserved |

### Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Task and mapping | Completed T01 implements D01–D06 and four starter cases | DISCLOSE |
| Upgrade | Owner accepted and installer activated immutable `1792194…` | DISCLOSE |
| Autopilot | Owner accepted keeping it off; final-test and final-merge human gates remain | DISCLOSE |
| Evidence limits | Exploratory passes do not prove clean isolation, full lifecycle correctness or causal efficiency improvement | DISCLOSE |
| Next boundary | Complete closing-candidate checks and review, merge under owner authorization, verify target and clean up owned work | AGENT_ACTION |
