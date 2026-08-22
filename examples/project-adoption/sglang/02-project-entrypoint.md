# Proposed SGLang Spec-Driven Delivery Entry Point

Target path: `.github/spec-driven-delivery/README.md`

Status: teaching representation only. This file does not exist in upstream
SGLang at the pinned example revision.

## Purpose

Use this entry point for a non-trivial need, defect, refactor, architecture
decision, or systemic policy gap. It adds discovery and delivery routing; it
does not replace SGLang's contribution, testing, CI, codeowner, or merge rules.

## Read first

1. `.github/spec-driven-delivery/project-adoption-manifest.md` — current
   adoption state, authority map, and next action.
2. `.github/spec-driven-delivery/development-policy.md` — SDD-only project
   rules and artifact lifecycle.
3. `docs/docs/developer_guide/contribution_guide.mdx` — source, branch, test,
   style, accuracy, performance, and CI requirements.
4. `.github/MAINTAINER.md`, `.github/CODEOWNERS`, and
   `.github/pull_request_template.md` — review and merge authority.
5. `test/README.md` plus the applicable registered-test/component guidance.
6. Applicable scoped `AGENTS.md`, `.claude/rules`, and `.claude/skills` files.

When two sources conflict, stop and route the conflict to the owner named in
the adoption manifest. This entry point has no authority to weaken SGLang rules.

## Runtime source binding

Run the agent from the SGLang repository root. The caller supplies the
playbook root or immutable URL base as a read-only runtime input. Verify its
repository and revision against the adoption manifest before reading a
playbook template. Never commit a workstation-specific absolute path.

## Start a need

Precondition: adoption state is `INSTALLED` or `ACTIVE`.

1. Create a project branch under the SGLang contribution guide.
2. Fill Prompt C in the installed project trigger and bind its runtime playbook
   locator.
3. Create only
   `.github/spec-driven-delivery/deliveries/{need-id}-{slug}/01-solution-whiteboard.md`.
4. Discuss needs, facts, unknowns, options, YAGNI, risks, and policy gaps.
5. Stop for review. Generate no handoff until the whiteboard convergence gate
   passes.
6. After approval, use the pinned handoff and workflow templates one artifact
   at a time.

## Artifact locations

```text
.github/spec-driven-delivery/
├── project-adoption-manifest.md
├── development-policy.md
├── agent-adoption-trigger.md
└── deliveries/{need-id}-{slug}/
    ├── 01-solution-whiteboard.md
    ├── 02-whiteboard-handoff.md
    ├── 03-delivery-workflow.md
    ├── 04-architecture-decision.md        # only when selected
    ├── 05-implementation-plan.md          # compact or full when selected
    └── 06-delivery-record.md
```

The workflow manifest may select project-owned API, performance, security, or
operations documents elsewhere. Do not move existing SGLang authorities into
this directory.

## Continue existing work

Read the active delivery's current handoff, next action, blockers, approved
source revisions, and task context receipt. Never infer status from chat or
create a dependent artifact before its predecessor is approved.
