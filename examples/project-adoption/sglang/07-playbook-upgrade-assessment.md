# SGLang Playbook Synchronization Representation

This non-authoritative example shows how the proposed SGLang integration would
align its reusable SDD documents with the latest playbook revision. It does not claim that SGLang adopted or
approved this workflow and does not alter the pinned teaching evidence.

## Trigger and boundary

From an authorized SGLang worktree, after an implementation task and its PR,
merge, checks, and review have completed:

```bash
./install-sdd.sh --upgrade
```

The installer preserves the manifest's current pin, resolves latest `main` to
an immutable commit, rejects active task work, and emits this agent connector:

```text
Use .sdd-runtime/playbook-upgrade-guide.md to synchronize the project with the
latest playbook revision.
```

## Example assessment shape

| Field | Example value |
| --- | --- |
| Previous revision | `{approved-current-playbook-commit}` |
| Latest revision | `{resolved-latest-main-commit}` |
| Reusable files synchronized | `{project-owned SDD document paths}` |
| Owner policies preserved or explicitly changed | `{summary}` |
| Material inconsistencies resolved | `{summary or None}` |
| Applicable validation | `{project document checks and runtime result}` |
| Fresh-context independent review | `{identity, exact candidate, result}` |
| Human acceptance | `{identity, exact candidate, result}` |

The result is accepted only when reusable documents are mutually consistent
with the latest revision and SGLang's owner policies, the upgrade runtime first
validated as `UPGRADE_CURRENT`, applicable project documentation checks pass,
two fresh-context reviews pass, and a human accepts the exact candidate. The
manifest pin changes once at cutover. Cleanup removes installer-owned temporary
content, and the normal guide is regenerated and validated from the new pin. A
rejected or failed synchronization restores the previous pin without adding
playbook validators, evidence helpers, publication tooling, CI, or test suites
to SGLang.
