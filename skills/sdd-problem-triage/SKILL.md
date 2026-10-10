---
name: sdd-problem-triage
description: Investigate unexplained or recurrent test and execution failures, reproduce problems, and assess root causes from evidence. Known bounded corrections do not require formal investigation.
---

# SDD Problem Triage

## Outcome and authority

Establish what failed, what the evidence supports, and the smallest safe remedy
or discriminating next check. Use the project's manifest-linked error-handling
authority for classification, recovery, issue tracking and escalation. This
skill supplies diagnosis methods, not operational permission or a new gate.

Default to read-only investigation. Changes, restarts, rollback, destructive
actions and scope expansion remain subject to existing authority. Authorized
urgent mitigation need not wait for root-cause proof; preserve evidence and
distinguish mitigation from a verified fix.

## Causal judgment

Compare expected and actual behavior on the relevant revision, environment and
input or run identity. Separate observations from assumptions. Prefer testable
hypotheses and the smallest checks that distinguish them, changing one
meaningful variable where practical instead of blindly retrying or changing
several things at once.

Distinguish symptom, trigger, underlying cause and contributing factors; a
failure need not have one cause. Report conclusions as `confirmed`, `suspected`
or `unknown`, with supporting and excluding evidence. Correlation, a workaround
or one successful retry is not causal proof. Do not invent a cause when evidence
is insufficient or pursue endless investigation without information gain.

## Reproduction and observation

Preserve the original failure criterion and cause-bearing conditions: relevant
inputs, state, versions, configuration, permissions, scale, ordering and
concurrency. Sanitize secrets. Establish faithful reproduction before reducing
it; simplify only while the same failure remains. Make setup/reset explicit
enough to isolate state and repeat the experiment without corrupting real data.
Do not mock away the suspected cause.

For intermittent failures, record runs and failures and material conditions;
one passing run does not prove absence. Examine shared state, test order,
resource isolation and teardown. Use controlled events, barriers or scheduling
when useful for races, not piles of sleeps. Add only logs or tracing that can
distinguish hypotheses, with appropriate authorization and redaction; account
for instrumentation changing timing or behavior. An unreproduced problem
remains uncertain, not dismissed.

Verify a remedy against the original failure and affected invariants. Prefer
the smallest regression at the lowest useful layer when practical. Preserve
failed required evidence: no skipped assertions or retry-until-green. Choose
proportional handling from project authority rather than enumerate speculative
edge cases or invent recovery machinery.

## Collaboration and records

The author owns evidence integration and the next action. When useful, ask the
feature's retained reviewers to independently challenge causal evidence,
counterexamples or remedy complexity, or investigate bounded independent
hypotheses. Provide raw evidence, scope and authority, not a predetermined
answer. Reviewer availability is not a prerequisite for author-led diagnosis.
Joint triage is not review approval; fixes still need the existing independent
exact-candidate review.

Use the owning Issue/PR or implementation plan, not a new triage document.
Consume and refine verified project Experience where applicable; record only
actionable reusable lessons under its existing contribution guidance.

Summarize material results concisely, linking evidence instead of copying logs:

| Problem / impact | Cause judgment / status | Supporting / excluding evidence | Smallest fix or next check | Authority / owner |
| --- | --- | --- | --- | --- |
| Observed versus expected | Confirmed, suspected or unknown | Relevant evidence and limits | Proportionate action and verification | Existing authority and responsible actor |

## Supporting references

Consult when the diagnostic method is uncertain, not routinely or as new
project authority:

- [Google SRE troubleshooting](https://sre.google/sre-book/effective-troubleshooting/): testable hypotheses, causal evidence and proportional mitigation.
- [Google SRE postmortem culture](https://sre.google/workbook/postmortem-culture/): contributing causes and actionable learning.
- [Chromium bug reporting](https://www.chromium.org/for-testers/bug-reporting-guidelines/): faithful simplified reproducers and sufficient evidence.
- [pytest flaky tests](https://docs.pytest.org/en/stable/explanation/flaky.html): uncontrolled state, isolation and ordering.
