# E13 — Triage and Experience

Evaluator-only material. Use the [shared evaluation contract](../../README.md).
Copy only `subject/` and shared context. Keep this rubric, checks, calibration
answers and other attempts outside the subject's accessible inputs.

## Basis and completion

A packaged Node.js limits loader reports ENOENT from a job runner. The old
Experience entry describes a genuinely absent file; this snapshot contains the
file and fails only when launch-directory assumptions differ. This controlled
fixture tests cause-bearing reproduction, evidence-based reuse and refinement.
The prior incident is explicitly synthetic, not fabricated production history.

The subject fixes the accepted loader behavior, verifies the original failure
and updates the existing lesson with supported applicability. No new recovery
framework, global environment mutation, dependency or external service is needed.
[Node's module-relative file documentation](https://nodejs.org/docs/latest-v24.x/api/esm.html#importmetaurl)
supports a native remedy; contract-equivalent methods are allowed.

## Required correctness criteria

| ID | Required outcome | Evidence / relevant wrong outcome |
| --- | --- | --- |
| C1 | Establish the current failure from evidence rather than copying the old diagnosis | Trace/report shows reproduction, packaged-file inspection and distinguishing the current path-resolution cause from the old absent-file condition; unsupported claims about permissions, missing files or a successful retry are insufficient |
| C2 | Correct supported loading without widening behavior | Load packaged values from arbitrary existing launch directories without changing process cwd or requiring new arguments; genuine missing/invalid config errors remain errors; no hard-coded answer, silent default or filesystem-wide search |
| C3 | Revalidate and refine useful Experience with meaningful regression proof | Inspect the original/final lesson and focused tests: preserve the old missing-file condition, explain how to distinguish the new condition and verify the remedy; no duplicate incident diary, invented recurrence or false production claims |

## Checks and calibration

Run `node evals/cases/e13-triage-experience/check.mjs "$SUBJECT"` only where
executing the subject module is authorized and contained. It makes its own
disposable package copy, checks real launch-directory behavior, a second valid
packaged configuration and missing-file propagation, then removes that owned
copy. It does not establish the investigation history, lesson quality or test
integrity. Inspect those independently under C1/C3.

`node --test evals/cases/e13-triage-experience/calibrate.test.mjs` accepts two
valid native implementations and rejects the original defect, global-cwd
workaround, hard-coded data and suppressed missing-file errors.

| Constructed semantic evidence | Expected judgment | Rationale |
| --- | --- | --- |
| Reproduces the runner failure, verifies config exists, isolates path resolution, makes bounded fix, tests affected contexts and refines the existing lesson with both applicability conditions | C1–C3 PASS | Current evidence selects the remedy and makes knowledge useful |
| Correct loader, but claims config was missing although its initial snapshot contains it | C1 FAIL | A working patch does not validate an invented cause |
| Restores the already-present file and reruns only from project root | C1/C2 FAIL if runner failure remains | The reproducing condition was removed, not repaired |
| Valid loader and meaningful regression, but unchanged or duplicated generic Experience says only “retry ENOENT” | C3 FAIL | It does not preserve/refine a usable distinction for the next agent |
| Valid loader/lesson artifacts but no investigation trace | C2 may PASS; C1 INCONCLUSIVE | Do not infer demonstrated reproduction from a final explanation alone |

These are calibration scenarios, not actual subject-run evidence. An evidenced
breach remains FAIL even if another criterion is unknown. Missing evidence is
INCONCLUSIVE, not a reason to invent a failure or require one preferred command.

## Efficiency and limits

One local path-resolution defect and one relevant lesson suffice. Record actual
effort and justified rechecks without treating useful source rereads as waste.
This does not test production incident response, permission repair, all filesystem
errors or cross-platform packaging variants. Actual agent runs remain final-gate
work; local calibration does not prove playbook behavior.
