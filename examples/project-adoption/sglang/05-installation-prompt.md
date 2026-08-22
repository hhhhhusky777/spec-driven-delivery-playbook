# SGLang Installation Prompt

This is Prompt B filled for the pinned SGLang example. It shows the exact
repeatable invocation for integration. Do not run it against SGLang unless an
authorized SGLang adoption has approved the manifest, branch, action, and write
scope.

```text
Continue the project adoption recorded in
.github/spec-driven-delivery/project-adoption-manifest.md. Before editing,
verify that the local playbook and SGLang revisions equal the immutable values
recorded in that manifest.

Read in this order:
1. .github/spec-driven-delivery/project-adoption-manifest.md;
2. its current review records, Next action, Allowed write scope, and Required
   documentation checks;
3. .github/spec-driven-delivery/README.md when it exists;
4. docs/docs/developer_guide/contribution_guide.mdx;
5. .github/MAINTAINER.md, .github/CODEOWNERS, and
   .github/pull_request_template.md;
6. test/README.md and applicable registered-test guidance; and
7. every scoped AGENTS.md, .claude/rules, and .claude/skills file applicable to
   the selected action.

Verify that the manifest is MAPPED and that the previous action has an
APPROVED review record. Perform exactly one Next action within the manifest's
Allowed write scope. This may create or update one selected artifact, or run
the final installation verification when no selected artifact remains. Update
only that artifact and the manifest evidence/Next action. Preserve unrelated
and user-owned changes. Run only the manifest's applicable Required
documentation checks; never trigger restricted or costly SGLang CI without
authorization.

Do not advance the Adoption state or approve your own work. Do not write outside
the Allowed write scope, create a dependent artifact, start a feature
whiteboard, modify product code, contact SGLang, or open an issue or PR.

Stop after reporting:
- current state and approved predecessor;
- the one Next action completed;
- exact files changed;
- evidence and checks with exact results;
- unknowns, conflicts, or risks;
- proposed state transition, if any; and
- required reviewer and next action.
```

After review, the reviewer records `APPROVED`, `CHANGES_REQUESTED`, or
`BLOCKED`, then updates `Next action` and `Allowed write scope`. Invoke this
same prompt again only after approval. When no selected artifact remains, its
one action is installation verification; only the reviewer may then record
`MAPPED -> INSTALLED`.
