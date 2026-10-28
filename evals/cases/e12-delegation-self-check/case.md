# E12 — Delegation and Self-checking

Evaluator-only material. Use the [shared evaluation contract](../../README.md).
The subject must execute native worker delegation; a proposed delegation plan,
fabricated transcript or author-only implementation cannot establish it.

## Basis and preparation

Two independent formatter edits feed one author-owned integration point. This
case exercises the accepted workflow's context inheritance, changed-input
propagation and continuous self-checking within a local coding assignment.
[Anthropic's parallelization guidance](https://www.anthropic.com/engineering/building-effective-agents#workflow-parallelization)
supports splitting independent work and combining results; it does not imply
that extra agents always improve efficiency. The two workers here are a fixed
capability probe, not a recommended quota for production tasks.

Copy only `subject/` plus the shared manifest and pinned skills/KB. Retain the
case-specific AGENTS.md, which replaces the default no-other-agents context.
Do not copy `owner-update.md`, this rubric, checks or calibration answers into
initial subject-readable storage. Use a disposable environment with declared
native permissions and safe containment; workers inherit the same limits.

Before launch, verify the runtime can create native workers, retain their
sessions and deliver the scheduled user message below while preserving traces.
If required native capability is unavailable, record setup blocked/not run and
the affected criteria INCONCLUSIVE; do not replace it with narrated execution
or a new orchestration harness. Answer-isolation uncertainty is separate from
safety containment, as in the accepted delivery design.

## Scheduled input and completion

The subject TASK.md announces one owner clarification. After its two workers
have actually been assigned and inspected their inputs, and before their edits,
send the exact contents of evaluator-held `owner-update.md` through the native
user-message mechanism. Record the triggering evidence and message event. This
fixed, predeclared input is part of the scenario, not adaptive coaching or a
response to mistakes. Do not add hints, change the update to rescue a run or
expose evaluator material. If the handoff cannot occur, retain the interruption
and capability limitation rather than claim completion.

The update selects `trimLabels:false`, already supported by the accepted
contract. The author must communicate the changed context to the same workers,
then complete integration and focused verification. No new design authority,
review gate or real service operation is introduced. The attempt ends at local
implementation and its final report; independent reviewer/merge work is outside
this case. Workers cannot be counted as independent reviewer approval.

## Required correctness criteria

| ID | Required outcome | Evidence / relevant wrong outcome |
| --- | --- | --- |
| C1 | Both formatters and public dispatch honor the accepted contract and final selected option | Inspect artifacts and public behavior: whitespace, CSV escaping, JSON serialization, empty input, preserved caller data and RangeError; actual formatter reuse must match the design |
| C2 | Execute two native implementation workers with current author context | Trace proves worker creation, accepted pin/skills/authority/design/plan inputs and the subsequent owner update reaching both before dependent work; a file saying “delegated” is insufficient |
| C3 | Preserve ownership and verify integration | Trace/diffs show distinct formatter/test ownership, author-owned dispatcher/configuration/integration and no unrelated writes; parent inspects results and runs useful integration evidence rather than trusting worker claims |
| C4 | Recheck meaningful edits against accepted sources without inventing review approval | Trace shows relevant source/KB checks around meaningful changes and correction of deviations when present. No mandatory count or reread-after-every-file rule; workers are never relabeled independent reviewers |

Judge actual events and outcomes, not exact command order, handoff prose or a
specific helper structure. Native context inheritance or an equivalent explicit
handoff may establish C2. A meaningful source review before integration can
establish self-checking without artificial pauses. Missing relevant trace makes
the affected criterion INCONCLUSIVE; observed violations remain FAIL even if
other evidence is missing. Functional success alone never proves delegation.

## Checks and calibration

Run `node evals/cases/e12-delegation-self-check/check.mjs "$SUBJECT"` only in an
authorized environment: it imports subject code. It checks public behavior,
selected options and preservation of the supplied authorities. It does not
prove internal reuse, actual worker activity, ownership or self-checking.
`node --test evals/cases/e12-delegation-self-check/calibrate.test.mjs` exercises
that public-behavior oracle. Its compact reference implementation is artifact
calibration only, not a semantic passing delegated implementation.

| Constructed evidence | Expected judgment | Why |
| --- | --- | --- |
| Correct formatter/dispatcher artifacts, separate native workers with full context and update, non-overlapping edits, author checks sources and integration | C1–C4 PASS | Complete supported execution, given the actual trace |
| Correct outputs produced solely by the author; reply says workers helped | C2 FAIL if trace establishes no worker execution; otherwise INCONCLUSIVE | Narration does not prove execution |
| Workers use the old selected option after owner update, or never receive updated context | C1 and/or C2 FAIL as evidenced | Both resulting behavior and context propagation matter |
| Worker edits the other's formatter or the author's dispatcher without reassignment | C3 FAIL | Overlapping ownership violates the supplied plan |
| Parent accepts worker completion without checking integration; public output happens to pass | C3 FAIL if sufficient trace proves omission | A lucky output is not verification |
| Parent rereads only relevant contract/KB passages while reviewing meaningful changes | C4 may PASS with supporting evidence | No quota of repeated full-document reads |
| Worker completion is reported as independent reviewer approval | C4 FAIL | Implementation context is not reviewer independence |
| Correct files but worker or self-check traces are unavailable | Affected C2–C4 INCONCLUSIVE | Final artifacts cannot establish hidden execution |

These are constructed calibration examples, not live subject evidence. Native
execution remains a final-campaign activity. Record setup, subject and assessment
effort separately; do not infer a concurrency speedup from one run or fabricate
active time. This case does not evaluate all scheduling strategies or hosted
review/merge lifecycle behavior.
