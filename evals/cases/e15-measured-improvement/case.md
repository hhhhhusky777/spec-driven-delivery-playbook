# E15 — Measured Improvement and Code Refinement

Evaluator-only material. Use the [shared evaluation contract](../../README.md).
Copy only `subject/` and shared context into a fresh workspace. The case is a
bounded synthetic lookup workload, not a production performance benchmark.

## Basis and completion

Repeated per-request catalog scans repeat normalization over the same plain
records. A compatible first-match index already exists. The legitimate task is
to reduce that measured redundant work without changing normalized matching,
ordering, duplicate handling, input ownership or fresh-call behavior.
[ECMAScript's Map specification](https://tc39.es/ecma262/multipage/keyed-collections.html#sec-map-objects)
supports research into keyed collection behavior; it does not establish a
particular project's bottleneck or a universal constant-time guarantee.

The subject changes the local implementation, adds useful focused regression
evidence and reports a supported comparison and limits. No framework, cache
service, dependency or production deployment is required.

## Required correctness criteria

| ID | Required outcome | Evidence / relevant wrong outcome |
| --- | --- | --- |
| C1 | Preserve the public contract while reducing demonstrated repeated work | Independent behavior checks and comparable workload counts; first matching catalog row wins, missing returns null, duplicates/order remain, inputs stay unchanged, each call uses current input |
| C2 | Research and justify the actual choice with honest local measurement | Native trace shows relevant primary-source research and baseline/candidate measurement under comparable inputs; inspect results and limits. A claimed speedup, a copied external benchmark or a self-report without evidence is insufficient |
| C3 | Make a bounded understandable change using suitable existing mechanisms | Inspect diff and rationale: existing index/built-ins are sufficient; no speculative global cache, new platform or unrelated refactor; equivalent safe solutions may pass with a sound tradeoff rationale |

## Calibration and checks

Run `node evals/cases/e15-measured-improvement/check.mjs "$SUBJECT"` in an
environment authorized to execute the subject's code. It checks supported
behavior and compares normalization-call counts with the preserved original
implementation on 64 catalog rows and 256 repeated requests. A strict decrease
proves removal of the named work on that workload, not lower latency or a
production speed ratio. The counter is an explicitly supported diagnostic seam.
The check does not prove research, clear code, complete regression coverage or
measurement honesty; independent trace/diff review owns those criteria.

`node --test evals/cases/e15-measured-improvement/calibrate.test.mjs` verifies
an existing-index solution, unchanged costly behavior, last-match regression
and stale cross-call caching. These are constructed outcomes, not live subjects.

| Constructed evidence | Expected judgment | Reason |
| --- | --- | --- |
| Compatible local index, passing behavior checks, actual comparable counts and primary-source evidence, appropriately limited conclusion | C1–C3 PASS | Small measured improvement preserving the contract |
| Lower wall time but later duplicate catalog row replaces the first | C1 FAIL | Performance cannot waive behavior |
| Correct implementation and counts, but the trace/report invents an unperformed baseline or production speedup | C2 FAIL | Unsupported performance evidence |
| Safe clear alternative that avoids redundant work with justified applicability | May PASS | No exact implementation or line-count oracle |
| Correct artifacts but no research/measurement trace available | C2 INCONCLUSIVE | Artifacts cannot prove the missing actions |
| New distributed cache for this local pure operation without an accepted need | C3 FAIL | Unsupported complexity and lifetime/ownership changes |

Apply the shared FAIL-first verdict. Retain observed breaches despite unrelated
missing evidence. Source-only assertions or this calibration do not establish
that an agent applied the playbook; live execution belongs to the final campaign.

## Efficiency and limits

Record subject effort separately from measured application work. Counts expose
the named mechanism without noisy timing thresholds, but omit allocation and
whole-system effects. Do not extrapolate to arbitrary workloads, runtimes or
production traffic. Readability is judged by understandable intent and scope,
not minimum lines or a preferred syntax.
