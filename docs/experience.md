# Experience

This is durable, Git-tracked project guidance for avoiding repeated trial and
error. It survives feature cleanup and belongs to the project, not an agent's
private memory or a delivery status record. Project policies remain authoritative.

## Using and maintaining experience

> [!IMPORTANT]
> Keep verified, reusable lessons that materially reduce future trial and error,
> not a problem diary. A first resolution can qualify without waiting for recurrence.
> Each entry should help another agent recognize the situation, prevent or resolve
> the problem, and understand applicability limits. Effort or recurrence evidence
> may explain its value but never substitutes for actionable guidance.

Before related work, consult the applicable entries and their canonical links.
Use the verified approach while its assumptions remain valid; when relevant
conditions change, revalidate and update the same entry. An entry supplies
knowledge, not permission to bypass approval or safety boundaries.

Agents may add or refine a concise entry in their delivery PR after verifying
a reusable lesson. Record the recognition signal, effective approach, rationale
or evidence, and applicability limits—not raw logs, secrets, unsuccessful
guesses, or every one-off failure. Search existing guidance first. If a guide,
script, or configuration already owns the solution, link it rather than repeat
it here; move mature lessons into that owner when useful.

Reuse is review: check accuracy while applying an entry. For a new variation of
the same problem, refine the existing entry with verified approaches and their
distinct conditions rather than append a duplicate or enumerate every possible
case. Fix what you can verify within authority; otherwise flag the uncertainty
or obsolete advice rather than present it as reliable. Correct, merge, or remove
entries that are outdated, redundant, or no longer independently useful; Git
preserves history. If a documented problem recurs, inspect discoverability,
use, clarity, and changed assumptions before adding another entry.

Keep this document discoverable from the project entry point or manifest so a
fresh agent can find it without prior conversation. Merge parallel contributions
by reconciling evidence and conditions, not accumulating conflicting advice.
No entry count, new gate, or per-error recording ceremony is required.

## Reference practices

These sources inform this lightweight model, not additional project gates:

- [KCS article structure](https://library.serviceinnovation.org/KCS/KCS_v6/KCS_v6_Practices_Guide/030/020): make the issue, relevant environment, and effective resolution clear.
- [KCS practices guide](https://library.serviceinnovation.org/KCS/KCS_v6/KCS_v6_Practices_Guide): reuse is review; improve knowledge in the context of using it.
- [KCS Flag It or Fix It](https://library.serviceinnovation.org/KCS/KCS_v6/KCS_v6_Practices_Guide/030/030/040/030): correct verified problems within authority or flag them for clarification.
- [Google SRE postmortem culture](https://sre.google/workbook/postmortem-culture/): learning should lead to preventive or corrective action, not merely an event record. Experience entries do not require a full incident postmortem.

## Verified project experience

| Recognition signal | Verified approach | Rationale / evidence | Applicability / revalidation |
| --- | --- | --- | --- |
| A documentation test rejects a term used outside the contract it protects | Inspect the assertion's intended invariant; scope the check to that invariant instead of deleting valid guidance to satisfy a broad word ban | [PR #111](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/111): a blanket `long-running` prohibition rejected background-command guidance; limiting it to test categories restored 14/14 related tests while retaining focused/full boundaries | Applies to confirmed assertion false positives. Do not weaken a genuine failed quality gate; revalidate the protected behavior and affected tests |
