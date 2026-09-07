# Playbook Synchronization — `<project>`

This concise record proves that reusable project SDD documents match one
immutable latest playbook revision. It is not a migration plan, delivery
archive, or request to install playbook tooling in the project.

## Boundary and result

| Field | Value |
| --- | --- |
| Project / manifest | `<links>` |
| Source repository | `<canonical URL>` |
| Previous revision | `<40-character commit>` |
| Latest revision | `<40-character commit>` |
| Reusable files synchronized | `<paths>` |
| Owner policies preserved or explicitly changed | `<summary>` |
| Material inconsistencies resolved | `<summary or None>` |
| Excluded project tooling or unrelated work | `<summary>` |
| Applicable validation | `<actual results>` |
| Fresh-context independent review | `<identity, exact candidate, result>` |
| Self-review | `<exact candidate and result>` |
| Human acceptance | `<identity, exact candidate, result>` |
| Status | `<DRAFT, REVIEW, ACCEPTED, or BLOCKED>` |

The manifest's current revision remains authoritative until the immutable candidate
revision, resolved from latest, receives fresh-context review, human review,
validation, and cutover.
A rejected result restores the previous pin. Historical compatibility choices
such as `ACCEPT`, `ADAPT`, `REJECT`, or `NOT_APPLICABLE` are not a migration
plan; record only the final material inconsistency outcome above.

## Human review brief

| Attention | Result |
| --- | --- |
| Important document changes | `<concise summary>` |
| Policy or authority changes | `<concise summary or None>` |
| Remaining inconsistency or risk | `<concise summary or None>` |
| Decision requested | `<exact request>` |

The agent chooses how to compare, synchronize, validate, and recover within the
skill's boundaries. Keep only evidence needed to judge the result. Correct
agent mistakes within scope; track genuine project or playbook gaps with their
owner; stop only for unresolved authority, policy, safety, or acceptance.
Use the canonical [exception triage and upstream reporting](../../docs/batch-review-and-recovery.md#exception-triage-and-upstream-reporting)
outcome when a genuine gap remains.
