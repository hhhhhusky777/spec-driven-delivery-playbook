# Agent Adoption Trigger

Use these prompts with the
[Project Adoption Runbook](../../docs/project-adoption-runbook.md). The manifest
is the state/data connector; these prompts trigger one bounded action. Replace
all placeholders. The agent never approves its own artifact or advances an
adoption state without recorded reviewer authority.

## Required inputs

| Input | Value |
| --- | --- |
| Playbook checkout or immutable URL | `<value>` |
| Playbook revision | `<commit/release>` |
| Target project checkout | `<value>` |
| Target base revision | `<commit>` |
| Project adoption root | `<path>` |
| Adoption manifest | `<path>` |
| Project instruction entry points | `<AGENTS/CLAUDE/CONTRIBUTING/other paths>` |
| Allowed write scope | `<exact paths>` |
| Required documentation checks | `<commands>` |

## Prompt A — Bootstrap discovery

```text
Integrate the Spec-Driven Delivery Playbook revision <PLAYBOOK_REVISION> into
the project pinned at <TARGET_REVISION>.

Read in this order:
1. <PLAYBOOK_RUNBOOK>
2. <ADOPTION_MANIFEST>
3. <PROJECT_INSTRUCTION_PATHS>
4. the target repository documents and configuration needed to verify facts

Perform only the DISCOVERY action:
- verify the source and target revisions;
- inventory existing project authorities, owners, contributor/agent entry
  points, test/CI gates, artifact locations, and relevant constraints;
- record UNKNOWN when evidence is missing;
- propose REUSE, UPDATE_EXISTING, GENERATE, SKIP, DEFER, or BLOCKED for every
  applicable playbook capability;
- update only <ADOPTION_MANIFEST>;
- keep Adoption state as DISCOVERY;
- set Next action to independent review for DISCOVERY -> MAPPED;
- run <DOCUMENTATION_CHECKS> if they apply to the changed manifest.

Do not create another policy, workflow, template copy, feature document, code
change, issue, message, or pull request. Do not infer approval. Stop after
reporting:
- current state;
- file changed;
- verified evidence;
- unknowns/blockers;
- proposed routing decisions;
- checks run and exact result; and
- required reviewer and next action.
```

## Prompt B — Continue one adoption action

```text
Continue the project adoption recorded in <ADOPTION_MANIFEST> using playbook
revision <PLAYBOOK_REVISION>.

Read the manifest, its current state, approved review records, Next action,
project instructions, and every authority linked by the selected action.

Perform exactly one dependency-ready Next action within the manifest's current
Allowed write scope:
- while DISCOVERY, change only the manifest discovery proposal;
- while MAPPED, create or update only one selected artifact, or perform the
  final installation verification when no selected artifact remains;
- for REUSE, SKIP, or DEFER, record the reviewed decision without copying the
  source document;
- preserve all unrelated and user-owned changes;
- do not write outside the current Allowed write scope;
- update manifest evidence and Next action;
- run only the Required documentation checks applicable to this action.

Do not advance Adoption state, approve your own work, generate a dependent
artifact, start a feature whiteboard, modify product code, or contact an
external project. Stop after reporting:
- current state;
- one action completed;
- files changed;
- evidence and checks;
- unresolved conflicts or risks;
- proposed state transition, if any; and
- required reviewer and next action.
```

## Prompt C — Start the first need

```text
Start a new need under the installed project adoption at <ADOPTION_MANIFEST>.

Need/issue/defect:
<NEED_TEXT_OR_LINK>

Preconditions:
- the manifest state is INSTALLED or ACTIVE;
- the project entry point, development policy, artifact paths, and required
  templates are approved and resolvable;
- the working branch and allowed write path follow project policy.

Read the manifest, project entry point, active project authorities, and the
pinned solution-whiteboard template. Create only the first solution whiteboard
at <DELIVERY_ROOT>/<NEED_ID>-<SLUG>/01-solution-whiteboard.md.

Record the need, verified facts, assumptions, unknowns, initial requirements,
scope/non-scope, affected authorities, and discussion questions. Keep the
whiteboard in DRAFT. Link it from the manifest's pilot section when this is the
first delivery.

Do not decide the solution, conclude the whiteboard, generate a handoff,
workflow, policy, ADR, plan, code, test, issue, message, or PR. Run applicable
documentation checks and stop for whiteboard discussion and review.
```

## Reviewer action after every prompt

The reviewer independently reads the complete changed artifact and governing
sources. They record `APPROVED`, `CHANGES_REQUESTED`, or `BLOCKED`, comments,
version, and evidence in the manifest. Only an approved reviewer action changes
the adoption state or permits the next prompt.
