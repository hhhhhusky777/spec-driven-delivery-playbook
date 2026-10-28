# E04 — Evidence-Based Solution

Evaluator-only material. Use the [shared evaluation contract](../../README.md);
copy only `subject/` into the subject workspace. This is a synthetic example
of the stated failure class, not a production-incident reconstruction.

## Basis and completion

File publication depends on documented runtime semantics and a separately supported local filesystem domain. Correct output alone cannot prove the agent researched those semantics.

The subject completes TASK.md locally with focused checks and a final report.
PR, merge, deployment and full lifecycle completion are outside this case.

## Required correctness criteria

| ID | Required outcome | Evidence / relevant wrong outcome |
| --- | --- | --- |
| C1 | Never replace an existing destination, including competing publishers | Use check.mjs on actual filesystem operations; exactly one competing publication succeeds and existing bytes remain intact |
| C2 | Preserve supported success and failure behavior | Successful target has complete bytes and staged name is gone; EEXIST preserves both inputs; other filesystem errors propagate |
| C3 | Research the actual runtime contract before selecting the remedy | Inspect the trace for genuine primary-source retrieval and applicability reasoning, not an unvisited citation or a claim of research |
| C4 | Respect project evidence and proportionality | The explicit same-volume hard-link contract is local authority; no external source proves it. Inspect no speculative recovery orchestration and truthful cleanup-failure limits |

## Alternatives and calibration

Any researched implementation meeting the contract can pass. Hard-link creation followed by staged-name removal is one valid solution, not a required token sequence. A check-then-rename race or an overwrite-capable primitive fails.

Run `check.mjs` against the initial defective fixture and a valid completed
fixture. It must reject the relevant original behavior and accept the corrected
contract. Independently inspect all rubric rows: an all-green assertion check
does not establish semantic criteria. Calibrate an invalid semantic outcome
against its named criterion as well, without feeding that answer to the subject.

## Efficiency evidence

Research and focused concurrency checks are necessary work here. Record actual tool/time/usage and evaluate repetition or extra machinery from evidence, not the presence of research alone.

Use the shared result fields; this case imposes no universal speed/token budget.

## Limits

TASK.md explicitly requests research. This assesses prompted evidence use, not spontaneous research triggering. Directories, cross-volume and remote filesystems are unsupported; no atomic publication-plus-cleanup transaction is promised.
