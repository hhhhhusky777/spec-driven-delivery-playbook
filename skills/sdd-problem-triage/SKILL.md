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

> [!IMPORTANT]
> When a KB topic-read trigger applies and the accepted pin ships the topic,
> you MUST read it before applying its guidance. A skill summary or prior
> knowledge MUST NOT substitute for reading the topic.
>
> If an engineering method or its applicability is uncertain, confidence is
> low, or a material engineering claim lacks support, you MUST read the relevant
> primary references before deciding. Guesses, unsupported assumptions and
> subjective confidence MUST NOT substitute for evidence. Verify project-specific
> premises against canonical project sources or direct evidence; external guidance
> cannot establish them. If sources are unavailable or material uncertainty
> remains, disclose the limitation and follow existing project error handling.

When investigation requires assessing failure diagnostics or retry safety, read
`error-handling-and-diagnosability.md` directly from the manifest-linked KB root
when the accepted pin ships it. Apply it within the project's error contract and
authority.

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

Before designing a reproducer or assessing test failure evidence, read
`testing-and-reproduction.md` directly from the manifest-linked KB root when the
accepted pin ships it. Preserve the original failure and its cause-bearing
conditions; simplify without removing the suspected cause.

Add only authorized, redacted observation that distinguishes hypotheses;
account for instrumentation changing timing or behavior. An unreproduced
problem remains uncertain, not dismissed.

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

Apply the reference-reading requirement above to these diagnostic sources;
they do not grant project authority:

- [Google SRE troubleshooting](https://sre.google/sre-book/effective-troubleshooting/): testable hypotheses, causal evidence and proportional mitigation.
- [Google SRE postmortem culture](https://sre.google/workbook/postmortem-culture/): contributing causes and actionable learning.
