# SGLang First-Need Prompt

Use this only after an authorized project adoption reaches `INSTALLED` or
`ACTIVE`. Replace `NEED_TEXT_OR_ISSUE_URL`, `PROJECT_ROOT_FROM_STEP_1`, and
`PLAYBOOK_ROOT_FROM_STEP_1` with current runtime values.

```text
Start a new SGLang need under the installed adoption recorded at
.github/spec-driven-delivery/project-adoption-manifest.md.

Execution working directory: PROJECT_ROOT_FROM_STEP_1
Read-only playbook root: PLAYBOOK_ROOT_FROM_STEP_1

Before reading playbook content or writing project files, read only the
manifest control fields. Verify that the working directory equals
PROJECT_ROOT_FROM_STEP_1 and that the Git repository and HEAD under
PLAYBOOK_ROOT_FROM_STEP_1 match the recorded playbook source and revision.
Treat the playbook root as read-only. If verification fails, make no edit and
report `BLOCKED`; do not search for or guess another checkout.

Need/issue/defect:
NEED_TEXT_OR_ISSUE_URL

Read in this order:
1. .github/spec-driven-delivery/README.md;
2. .github/spec-driven-delivery/project-adoption-manifest.md;
3. .github/spec-driven-delivery/development-policy.md;
4. docs/docs/developer_guide/contribution_guide.mdx;
5. .github/MAINTAINER.md, .github/CODEOWNERS, and
   .github/pull_request_template.md;
6. test/README.md and applicable registered-test guidance;
7. every scoped AGENTS.md, .claude/rules, and .claude/skills file applicable to
   the likely change area; and
8. PLAYBOOK_ROOT_FROM_STEP_1/templates/discovery/solution-whiteboard.md after
   verifying that the playbook repository and revision match the adoption
   manifest.

Verify that the adoption state is INSTALLED or ACTIVE. Create only:
.github/spec-driven-delivery/deliveries/{need-id}-{slug}/01-solution-whiteboard.md

Fill the whiteboard with the need, verified current facts, assumptions,
unknowns, initial requirements, scope/non-scope, affected authorities, risks,
YAGNI questions, and topics requiring discussion. Keep it DRAFT. If this is the
first real delivery, link it in the adoption manifest pilot section and propose
INSTALLED -> PILOT for reviewer action.

Do not decide the solution, conclude the whiteboard, generate a handoff,
workflow, policy, ADR, plan, code, test, issue, external message, or PR. Run the
documentation checks applicable to the two changed files and stop for
whiteboard discussion and independent review.
```

Expected result: one draft whiteboard, an updated pilot link when applicable,
and no downstream artifact. This is the exact boundary between project adoption
and the normal whiteboard-to-delivery workflow.
