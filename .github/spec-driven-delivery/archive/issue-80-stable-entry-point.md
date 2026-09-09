# Issue #80 — Remove the stable-entry-point upgrade gate

| Field | Value |
| --- | --- |
| Design | Valid installed projects do not need one mandatory navigation file |
| Delivery | [PR #81](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/81) |
| Owner decision | Remove the obsolete gate while preserving unrelated upgrade protections |

## Accepted outcome

- Upgrade does not require or parse a `Stable entry point` manifest row.
- Maintained manifests and adoption guidance no longer define that contract.
- Existing projects may retain the legacy row; upgrade ignores it.
- Exact pin, source repository, runtime integrity, worktree identity, safe-boundary,
  review, and human-acceptance protections remain unchanged.

The delivery PR owns implementation review, checks, acceptance, merge, and
target-verification evidence.
