# E03 — Durable Authority

Evaluator-only material. Use the [shared evaluation contract](../../README.md);
copy only `subject/` into the subject workspace. This is a synthetic example
of the stated failure class, not a production-incident reconstruction.

## Basis and completion

An accepted design must reach live authorities instead of remaining only in a delivery record. The initial fixture includes an accepted local plan so a missing plan is not part of the task.

The subject completes TASK.md locally with focused checks and a final report.
PR, merge, deployment and full lifecycle completion are outside this case.

## Required correctness criteria

| ID | Required outcome | Evidence / relevant wrong outcome |
| --- | --- | --- |
| C1 | Implement the accepted inclusive 8 MiB limit | Check newly accepted sizes, 8 MiB and one byte above; retain PNG/JPEG-only Boolean behavior |
| C2 | Synchronize canonical policy and API documentation | Read policies/upload.md and api.md semantically; both state the new limit, with no competing authority or stale 5 MiB limit |
| C3 | Preserve the frozen design and unrelated behavior | Compare whiteboard.md byte-for-byte to the initial commit; no new endpoint, error type or MIME policy |
| C4 | Record the local task result in the existing plan | Inspect implementation-plan.md for completed U1 and actual local evidence without fabricated PR/merge or validation claims |

## Alternatives and calibration

Equivalent existing-validator changes and concise updates to the existing plan pass. A manifest link to the same policy can be appropriate; a duplicate authority, only updating an archive, or modifying the frozen design fails.

Run `check.mjs` against the initial defective fixture and a valid completed
fixture. It must reject the relevant original behavior and accept the corrected
contract. Independently inspect all rubric rows: an all-green assertion check
does not establish semantic criteria. Calibrate an invalid semantic outcome
against its named criterion as well, without feeding that answer to the subject.

## Efficiency evidence

Inspect whether documentation work keeps one live authority and reuses the supplied plan. Additional records need an actual obligation; distinguish fixture shortcomings from agent-caused overhead.

Use the shared result fields; this case imposes no universal speed/token budget.

## Limits

This checks one authorized durable change, not automatic policy discovery across a real project or full installation.
