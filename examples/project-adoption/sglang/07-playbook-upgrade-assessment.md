# SGLang Playbook Upgrade Assessment Representation

This non-authoritative example shows how the proposed SGLang integration would
assess a later playbook revision. It does not claim that SGLang adopted or
approved this workflow and does not alter the pinned teaching evidence.

## Trigger and boundary

From an authorized SGLang worktree, after an implementation task and its PR,
merge, checks, and review have completed:

```bash
./install-sdd.sh --upgrade
```

The installer must preserve the manifest's current pin, resolve a newer
candidate to an immutable commit, reject active task work, and emit only this
agent connector:

```text
Follow .sdd-runtime/playbook-upgrade-guide.md exactly.
```

## Example assessment shape

| Field | Example value |
| --- | --- |
| State | `DRAFT` |
| Current revision | `{approved-current-playbook-commit}` |
| Candidate revision | `{resolved-candidate-playbook-commit}` |
| Safe boundary | `No active task, PR, merge, self-review, or validation` |
| Manifest pin during assessment | `{approved-current-playbook-commit}` |
| Fresh-context review | `REQUIRED` |
| Human review | `REQUIRED` |

The agent compares exact changelog, migration, template, schema, skill, and gate
changes with the proposed SGLang authorities. Each material item is classified
`ACCEPT`, `ADAPT`, `REJECT`, or `NOT_APPLICABLE`; unknown impact blocks review.
Only after fresh-context and human approval may migrations begin. The manifest pin changes
once at final cutover after all candidate-required checks pass. Cleanup then
removes installer-owned checkouts, and the normal guide is regenerated and
validated from the new pin. A failed migration restores the previous pin and
records rollback evidence.
