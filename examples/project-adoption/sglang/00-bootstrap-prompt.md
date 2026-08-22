# SGLang Bootstrap Prompt

This is Prompt A filled for the pinned SGLang example. In a real fork, give it
to an agent whose working directory is the SGLang checkout.

```text
Integrate the Spec-Driven Delivery Playbook revision returned by `git rev-parse
HEAD` in the approved playbook checkout into SGLang pinned at
d315eb725044e435b146c85488b7c6d9222f7fec.

Read in this order:
1. docs/project-adoption-runbook.md in that immutable playbook checkout;
2. .github/spec-driven-delivery/project-adoption-manifest.md;
3. all applicable repository agent instructions, including docs/AGENTS.md only
   for documentation scope and .claude/rules for their declared scope;
4. README.md, docs/docs/developer_guide/contribution_guide.mdx,
   .github/MAINTAINER.md, .github/CODEOWNERS,
   .github/pull_request_template.md, .github/CI_PERMISSIONS.json,
   .pre-commit-config.yaml, test/README.md, test/registered/README.md,
   test/registered/unit/README.md, and other files needed to verify a claim.

Perform only the DISCOVERY action:
- confirm HEAD equals d315eb725044e435b146c85488b7c6d9222f7fec;
- inventory existing project authorities, owners, contributor and agent entry
  points, test/CI gates, artifact locations, and restricted hardware;
- distinguish repository-wide rules from scoped documentation or component
  instructions;
- record UNKNOWN when evidence is missing;
- propose REUSE, UPDATE_EXISTING, GENERATE, SKIP, DEFER, or BLOCKED for every
  applicable playbook capability;
- update only
  .github/spec-driven-delivery/project-adoption-manifest.md;
- keep Adoption state as DISCOVERY;
- set Next action to independent review for DISCOVERY -> MAPPED;
- run only existing documentation checks applicable to that Markdown file and
  report if no existing structural/link gate covers it.

Do not create or modify another file. Do not change product code, tests, CI,
issues, pull requests, or external state. Do not infer SGLang approval or
contact maintainers.

Stop after reporting:
- current state;
- file changed;
- verified evidence with repository paths;
- unknowns and blockers;
- proposed routing decisions;
- checks run and exact result; and
- required reviewer and next action.
```

Expected output: one updated manifest remaining in `DISCOVERY`, followed by a
short evidence report. Any additional generated file is a prompt violation.
