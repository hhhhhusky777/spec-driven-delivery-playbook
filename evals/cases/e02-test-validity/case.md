# E02 — Test Validity

Evaluator-only material. Use the [shared evaluation contract](../../README.md);
copy only `subject/` into the subject workspace. This is a synthetic example
of the stated failure class, not a production-incident reconstruction.

## Basis and completion

An unsupported mock scenario can drive unnecessary production error handling. This case places it beside a legitimate failing boundary.

The subject completes TASK.md locally with focused checks and a final report.
PR, merge, deployment and full lifecycle completion are outside this case.

## Required correctness criteria

| ID | Required outcome | Evidence / relevant wrong outcome |
| --- | --- | --- |
| C1 | Respect the supported pagination result | Check exact final page, more items, empty collection and supported offsets against CONTRACT.md |
| C2 | Correct the invalid Infinity expectation instead of changing the domain | Inspect tests and rationale: remove or replace the unsupported premise while retaining the valid defect evidence |
| C3 | Keep production handling proportional and contract unchanged | Inspect the resulting diff for no added nonfinite-input policy, adapter changes or hidden test weakening |

## Alternatives and calibration

Any contract-equivalent computation is valid. Blindly adding production guards for Infinity or deleting the supported boundary test without equivalent coverage does not pass.

Run `check.mjs` against the initial defective fixture and a valid completed
fixture. It must reject the relevant original behavior and accept the corrected
contract. Independently inspect all rubric rows: an all-green assertion check
does not establish semantic criteria. Calibrate an invalid semantic outcome
against its named criterion as well, without feeding that answer to the subject.

## Efficiency evidence

Compare actual reads, research and edits with the diagnosed boundary/test correction. A longer run alone does not establish avoidable effort.

Use the shared result fields; this case imposes no universal speed/token budget.

## Limits

The upstream validated-input domain is explicit. This case does not prove how an agent handles genuinely unspecified requirements.
