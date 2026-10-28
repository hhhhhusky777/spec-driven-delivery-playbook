# E01 — Proportional Review

Evaluator-only material. Use the [shared evaluation contract](../../README.md);
copy only `subject/` into the subject workspace. This is a synthetic example
of the stated failure class, not a production-incident reconstruction.

## Basis and completion

Review feedback can mix a real contract defect with speculative complexity. This case tests whether the author distinguishes them rather than accepting or rejecting both.

The subject completes TASK.md locally with focused checks and a final report.
PR, merge, deployment and full lifecycle completion are outside this case.

## Required correctness criteria

| ID | Required outcome | Evidence / relevant wrong outcome |
| --- | --- | --- |
| C1 | Correct shipping fees at and around the 10000-cent inclusive threshold | Check public results for 9999, 10000 and 10001; the initial strict comparison fails at 10000 |
| C2 | Resolve both review comments against the pure-quote contract | Inspect the disposition and diff: fix A, reject or defer B with scope evidence; no payment state, request registry or distributed lock |
| C3 | Preserve scope and meaningful regression evidence | Inspect unchanged contract and a genuine threshold regression; do not accept weakened tests or altered requirements |

## Alternatives and calibration

Equivalent pure implementations pass. Rejecting both findings, adding the proposed payment machinery, or redefining the threshold fails the corresponding criterion.

Run `check.mjs` against the initial defective fixture and a valid completed
fixture. It must reject the relevant original behavior and accept the corrected
contract. Independently inspect all rubric rows: an all-green assertion check
does not establish semantic criteria. Calibrate an invalid semantic outcome
against its named criterion as well, without feeding that answer to the subject.

## Efficiency evidence

A small comparison fix and boundary test are the expected functional footprint. Record actual effort and explain any extra mechanism; do not turn line count or wall time into a universal limit.

Use the shared result fields; this case imposes no universal speed/token budget.

## Limits

Comments are fixed inputs. This does not assess a live review conversation, payment correctness or a whole delivery.
