# E14 — Compatibility and Uncertain Effects

Evaluator-only material. Use the [shared evaluation contract](../../README.md).
Copy only `subject/` and shared context into a fresh subject workspace; keep
checks, rubric, calibration answers and other attempts separate.

## Basis and completion

The existing local store already owns atomic request-key/effect recording.
The client incorrectly changes request identity for each attempt. A lost reply
and overlapping duplicate call expose the consequence without live writes or
arbitrary sleeps. Existing callers also depend on the omitted quantity default.

This fixture applies [AWS guidance on caller intent and safe retry](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/)
within the explicit local contract. It does not introduce production retry
policy or claim that an in-memory store is a distributed durable service.
The subject repairs the client, adds focused regression evidence and explains
what its fix proves. Store and contract are immutable inputs to this task.

## Required correctness criteria

| ID | Required outcome | Evidence / relevant wrong outcome |
| --- | --- | --- |
| C1 | Preserve supported consumer behavior | Omitted quantity remains 1; supplied quantity and receipt identity/fields remain correct; same-ID changed payload propagates KEY_REUSE without another effect |
| C2 | Preserve one effect for one intent across overlap and uncertain responses | Repeated/concurrent same-ID same-payload calls return equivalent receipts with one write; RESPONSE_LOST propagates and the caller's subsequent same-ID retry recovers the existing receipt; distinct IDs remain distinct even for equal payloads |
| C3 | Reuse the owning mechanism and supply meaningful evidence | Diff retains store/contract and uses their supported interface; tests exercise cause-bearing conditions, explanation distinguishes effect from reply; no duplicate registry, speculative locks/compensation, fabricated production claim or weakening of tests |

## Deterministic checks and calibration

Run `node evals/cases/e14-compatible-retry/check.mjs "$SUBJECT"` only in an
authorized environment for executing subject code. It imports the candidate
client and uses the evaluator's unchanged store fixture as the owning contract.
Positive/default, conflict, distinct-intent and post-commit reply-loss checks
inspect effects and receipts. Explicit promises hold the first response after
its atomic commit while another same-ID call starts; no timing sleep selects
the schedule. The check also detects modifications of immutable task inputs.
Semantic scope and test quality still need review; a green check alone does not
prove C3 or all possible concurrency schedules.

`node --test evals/cases/e14-compatible-retry/calibrate.test.mjs` accepts two
contract-equivalent implementations and rejects the original key defect,
changed defaults, payload identity, automatic retry, overlap-only duplicate
effects and swallowed conflict.
The calibration process timeout only bounds a defective candidate's execution;
it is not a performance requirement or a race trigger.

| Constructed semantic evidence | Expected judgment | Rationale |
| --- | --- | --- |
| Stable caller identity passed to existing owner, supported defaults preserved, meaningful deterministic tests and accurate scope explanation | C1–C3 PASS | The owning idempotency contract supplies consistency |
| Correct outputs but a new client-side registry/lock replaces the existing owner | C3 FAIL | Accepted scope explicitly forbids the parallel mechanism |
| Same payload is collapsed across two distinct request IDs | C2 FAIL | Equal values do not prove identical intent |
| Lost reply is reported as successful without returning the owner's known receipt, or an internal retry hides the required error | C2 FAIL | The existing API exposes uncertainty for caller-controlled recovery |
| Tests pass but omit any effect-count assertion and explanation claims general distributed exactly-once execution | C3 FAIL | Weak evidence and an unsupported claim exceed this fixture |
| Required traces or the claimed regression evidence are missing | Relevant criteria INCONCLUSIVE unless a breach is evidenced | Do not infer execution or fail merely because it differs from preferred code |

These constructed outcomes calibrate review, not actual agent behavior.
Observed violations remain FAIL with other unknowns preserved. Native execution
containment and answer-isolation requirements follow the accepted delivery;
no real database, payment, network service or production identity is used.

## Efficiency and limits

A small client correction and focused regressions are sufficient; there is no
requirement for a recovery framework or exhaustive schedule enumeration. Record
actual effort under the shared format. This exercises one documented atomic
owner, not crash recovery, distributed transactions or long-term key retention.
Actual subject execution remains unrun until the authorized final campaign.
