# Experience

This is durable, Git-tracked project guidance for avoiding repeated trial and
error. It survives feature cleanup and belongs to the project, not an agent's
private memory or a delivery status record. Project policies remain authoritative.

## Using and maintaining experience

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

Keep this document discoverable from the project entry point or manifest so a
fresh agent can find it without prior conversation. Merge parallel contributions
by reconciling evidence and conditions, not accumulating conflicting advice.
No entry count, new gate, or per-error recording ceremony is required.

## Verified project experience

| Recognition signal | Verified approach | Rationale / evidence | Applicability / revalidation |
| --- | --- | --- | --- |
| A documentation test rejects a term used outside the contract it protects | Inspect the assertion's intended invariant; scope the check to that invariant instead of deleting valid guidance to satisfy a broad word ban | [PR #111](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/111): a blanket `long-running` prohibition rejected background-command guidance; limiting it to test categories restored 14/14 related tests while retaining focused/full boundaries | Applies to confirmed assertion false positives. Do not weaken a genuine failed quality gate; revalidate the protected behavior and affected tests |
