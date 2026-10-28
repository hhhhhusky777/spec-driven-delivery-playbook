# Agent Behavior Evaluations

These optional, repository-owned evaluations test how an agent applies the
playbook. They are not installed into projects or run by source CI. Use existing
agent execution and evidence tools; no separate scheduler or hosted service is
required. Add coverage through grounded cases rather than a new framework.

## Evaluation contract

A case supplies a realistic request, supported project contract and initial
files. A fresh subject agent performs that task. A separate evaluator inspects
actual artifacts and traces against the case rubric. The subject's completion
claim is evidence to inspect, never its own approval.

| View | Assessment |
| --- | --- |
| Correctness | Judge required outcomes, authority/scope adherence and solution proportionality. Use PASS, FAIL or INCONCLUSIVE per required criterion with concrete evidence. Overall correctness is PASS only when all required criteria pass, FAIL for an evidenced breach, otherwise INCONCLUSIVE. An unresolved material evaluator disagreement is INCONCLUSIVE |
| Efficiency | Record elapsed time, available native token and completed-tool counters, rework and evidence of avoidable work. Explain any efficiency judgment against case expectations or comparable runs; absence of a baseline is not proof of inefficiency |
| Evidence integrity | Record whether inputs were fresh, answers inaccessible, traces sufficient and configuration known. Report limited observations explicitly as exploratory; functional passes do not turn unverified isolation into clean evidence |

Suitable assertions support deterministic outcomes; semantic judgment is still
needed for valid test premises, authority updates, research and proportionality.
Accept contract-equivalent solutions rather than require one implementation,
wording or command order. Faster incorrect work is not an improvement. Do not
combine quality and cost into a score that hides a material failure.

## Starter cases

All four are synthetic, contract-grounded microtasks, not production incidents
or full adoption/delivery tests. Case documents and checks are evaluator-only;
copy only each `subject/` tree and the shared context into a subject workspace.

| Case | Intended behavior | Deliberate limit |
| --- | --- | --- |
| [E01 — Proportional review](cases/e01-proportional-review/case.md) | Fix a genuine boundary defect and reject unsupported recovery machinery | Fixed review comments, not live reviewer dynamics |
| [E02 — Test validity](cases/e02-test-validity/case.md) | Fix a supported defect without implementing an invented test requirement | Explicit validated-input contract |
| [E03 — Durable authority](cases/e03-durable-authority/case.md) | Synchronize accepted behavior and its live authority while preserving frozen design | One authorized change; existing local plan supplied |
| [E04 — Evidence-based solution](cases/e04-evidence-based-solution/case.md) | Research the runtime contract and apply it within local project constraints | Research explicitly requested; does not measure spontaneous trigger recognition |

## Preparing and executing an attempt

Declare case selection, attempt count, exact case/playbook revisions, model and
settings, tool/permission availability and time/cost budget before execution.
Use the same conditions for comparisons; disclose differences and retain every
attempt, including interruptions. A corrective rerun gets a new identity, not a
replacement for a failed record.

Prepare a new disposable Git workspace with `subject/` contents and
[shared task instructions](context/AGENTS.md). Copy the selected immutable
playbook's workflow, feature-review and problem-triage skill directories into
`.agents/skills/`, and its complete `knowledge-base/` tree into
`.github/spec-driven-delivery/knowledge-base/`. Copy the
[manifest](context/project-adoption-manifest.md) beside that KB, replacing
`SET_DURING_PREPARATION` with the verified full revision. Commit the initial
fixture and record its SHA. Do not copy this evaluation tree, rubrics, evaluator
checks, prior answers or other attempt outputs. Preserve independent case output
directories so useful concurrency cannot mix artifacts or mutable state.

This is explicit fixture assembly, not an installation test. Preserve the
fixture's declared local completion boundary rather than silently demand a full
project lifecycle. E03 includes an accepted local plan to avoid creating missing
prerequisites during the measured task.

Use native runtime isolation that actually excludes evaluator answers from
subject-readable files/tools. A separate folder or write-restricted workspace
alone does not establish read isolation. Verify the boundary and record the
result. If the available runtime cannot enforce it, keep the run exploratory;
do not claim a clean baseline, weaken the claim silently or build a new isolation
platform as part of these evaluations.

For Codex, an illustrative native invocation is below. Resolve the installed
command and supported options first. Set the capitalized variables from the
predeclared run configuration; do not assume a model or reasoning default.
`TRACE` and `FINAL` belong outside the subject workspace. Enforce the declared
budget through existing runtime/process controls and preserve a timeout result.

```bash
codex --search exec --ignore-user-config --ephemeral --json \
  --sandbox workspace-write -C "$SUBJECT" \
  -c "model=\"$MODEL\"" -c "model_reasoning_effort=\"$EFFORT\"" \
  -o "$FINAL" \
  'Read AGENTS.md and complete TASK.md with focused verification. Report actual results; do not publish or merge.' \
  > "$TRACE"
```

This invocation captures evidence but does not itself prove read isolation.
Do not add coaching or hints about expected refusals while an attempt runs.
Keep local credentials and unrelated project data out of subject inputs and
published evidence.

## Independent assessment and calibration

After execution, preserve the final diff/new files, completion message, command
statuses, trace and run metadata before assessment. Use a separate read-only
evaluator context containing the rubric, initial contract and actual evidence;
it must not edit the subject result. The delivery's two retained reviewers
independently assess disputed/material conclusions under existing review policy.
A case may have useful deterministic evidence, for example:

```bash
node evals/cases/e01-proportional-review/check.mjs "$SUBJECT"
```

The checks read the subject implementation; run them in an environment where
executing that subject code is authorized. They are ordinary case checks, not a
runner or a semantic grader. They do not prove correct tests, untouched
contracts, research or efficiency. Inspect those obligations independently.
Before trusting a new/changed case, demonstrate that its checks and rubric
accept a valid contract-equivalent outcome and detect the relevant defective
outcome. Calibrate reviewer judgment with concrete evidence, not expected prose.

Missing evidence is not a pass. Distinguish subject failure, invalid case setup,
execution interruption and unknown cause; preserve any observed subject mistake
even when another part of the attempt is inconclusive. A material disagreement
needs evidence-based resolution, not averaging or automatic majority approval.

## Result format

Copy these tables into the owning PR's evidence, one row per attempt/criterion
as appropriate. Keep detailed review history in that PR. Record Unknown instead
of inventing unavailable values; retain concise sanitized excerpts/artifacts
sufficient to audit a judgment. Private raw traces remain local, not committed.

| Run context | Recorded value |
| --- | --- |
| Run ID, case and attempt | Case ID and distinct attempt ID |
| Inputs | Case/playbook full revisions, initial fixture commit and final artifact identity |
| Subject and evaluator | Separate identities, actual models, runtime versions and relevant settings |
| Environment and budget | Tools, permissions/isolation evidence, declared attempts and limits |
| Execution status | Completed, interrupted or failed; exit/timeout evidence and cause or Unknown |
| Evidence integrity | Clean or exploratory with concrete limitations; trace/artifact references |

| Case / attempt | Required criterion | PASS / FAIL / INCONCLUSIVE | Evidence and rationale | Correctness verdict |
| --- | --- | --- | --- | --- |
| Case and attempt ID | Rubric criterion ID | Actual disposition | Artifact/trace location and concrete observation | Overall correctness once all required criteria are assessed |

| Case / attempt | Elapsed seconds | Input / cached / output tokens | Completed tool calls | Rework / avoidable work evidence | Efficiency interpretation / comparison limits |
| --- | --- | --- | --- | --- | --- |
| Case and attempt ID | Measured or Unknown | Native counters or Unknown | Count and counting convention, or Unknown | Concrete observations and evidence, or None / Unknown | Supported conclusion and comparison basis, or insufficient evidence |

Separate subject elapsed time from setup and evaluation effort. Wall time includes
waits unless the runtime measures them separately; do not infer active work time.
Native cumulative token counts include repeated/cached context and are not unique
KB size or monetary cost. Count completed tool events once, not both start/end
events. Record the counting convention for different runtimes. Repeated reads or
checks may be justified by truncation or changed inputs; counts alone do not
establish waste. Do not prescribe a universal time/token threshold.

## Adding cases and interpreting trends

A new case reuses this contract. Its subject packet contains only the supported
project context and task. Its evaluator-only `case.md` records: grounded need,
completion boundary, required observable criteria, valid alternatives, known
wrong outcomes, efficiency evidence and interpretation limits. Add a small
case check only where it contributes independent deterministic evidence.
Calibrate both valid and defective outcomes before using the case for decisions.
Do not add cases solely to raise a count or chase hypothetical unsupported risks.

Compare the same case/model/runtime/settings across playbook versions, disclose
remaining differences and report all attempts and criterion dispositions.
Fresh independent repetitions can expose variation; no fixed sample count proves
reliability. A single-version run does not establish improvement over no playbook.
Track confirmed gaps through the existing issue process, without changing a
policy solely to make a weak case pass.

## References

- [OpenAI: Testing agent skills with evals](https://developers.openai.com/blog/eval-skills) — native traces, artifact checks, independent rubric judgment and efficiency observations.
- [OpenAI: Evaluation best practices](https://developers.openai.com/api/docs/guides/evaluation-best-practices) — task-specific criteria, calibration and transparent limitations.
- [Testing and Reproduction](../knowledge-base/testing-and-reproduction.md) — supported scenarios, independent expectations and defect-sensitive evidence.
