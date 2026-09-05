# Exception triage — `<action ID>`

Use these fields inside the existing canonical recovery record, manifest or
upgrade assessment. Do not create duplicate progress records or copy sensitive
diagnostics into a public repository. Follow the
[canonical triage contract](../../docs/batch-review-and-recovery.md#exception-triage-and-upstream-reporting).

| Field | Value |
| --- | --- |
| Action / candidate / failing gate | `<exact identities>` |
| Playbook repository / immutable pin | `<verified source URL and revision>` |
| Expected / observed | `<contract and sanitized evidence>` |
| Minimal reproduction / evidence-only limitation | `<safe reproducer or explicit limitation>` |
| Classification / cause evidence | `<PROJECT/ADOPTION/STALE_VERSION/PLAYBOOK_GAP/UNKNOWN and evidence>` |
| Affected IDs / preserved valid evidence | `<dependency impact>` |
| Canonical checkpoint / remaining counters | `<existing recovery record and budgets>` |
| Verified upstream / duplicate search | `<source authority, sanitized search and result>` |
| Disclosure authority / privacy assessment | `<existing permission and safe public/private route, or missing authority>` |
| Reporting state | `<NOT_REQUIRED/PENDING/LINKED>` |
| Issue / pending draft / limitation | `<verified issue link, sanitized draft, or reason no report is required>` |
| External effect reconciliation | `<confirmed result or UNKNOWN_EFFECT; never infer success>` |
| Safe workaround / required approval | `<proposal and authority, or None>` |
| Owner / next action / unblock condition | `<responsible owner, bounded next step and preserved gates>` |

NOT_REQUIRED needs a classification-based reason. PENDING is not filed. LINKED
requires verified actual issue evidence, including a reused issue where no new
comment was needed. A private report's reference must stay in an authorized
private record. An issue link never supplies permission to bypass a failed gate.

## Owner attention

| Type | Important risk or decision | Recommendation | Evidence |
| --- | --- | --- | --- |
| `<ATTENTION/DECISION>` | `<brief consequence or missing authority>` | `<safe next action>` | `<canonical link>` |
