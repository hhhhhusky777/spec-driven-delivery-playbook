# Agent Adoption Trigger

Use these prompts with the
[Project Adoption Runbook](../../docs/project-adoption-runbook.md). The manifest
is the state/data connector; these prompts trigger one bounded action. Replace
all placeholders. The agent never approves its own artifact or advances an
adoption state without recorded reviewer authority.

Run every prompt with the target project root as the working directory. The
playbook runtime locator is a read-only per-invocation input; the manifest
stores the expected repository, revision, and materialization mode, never a
machine-specific absolute path.

## Required inputs

| Input | Value |
| --- | --- |
| Execution working directory | `<absolute target project root>` |
| Read-only playbook runtime locator | `<absolute checkout root or immutable URL base>` |
| Playbook source repository | `<canonical repository URL>` |
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

Execution contract:
- run with working directory <TARGET_PROJECT_CHECKOUT>;
- treat <PLAYBOOK_RUNTIME_LOCATOR> as read-only;
- verify that the working directory is the target project root; and
- read only the manifest control fields, then verify that
  <PLAYBOOK_RUNTIME_LOCATOR> resolves their playbook repository and revision.

If any execution-contract check fails, make no edit and report `BLOCKED` with
the failed check and required correction.

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
- audit existing policies for decision-level conformance against every
  applicable obligation in the pinned template;
- do not infer conformance from file existence, headings, or repository
  history; route missing or ambiguous decisions to UPDATE_EXISTING and record
  intentional alternatives as reviewed-exception candidates;
- apply the audit to every applicable policy family, update the canonical
  existing authority when it is incomplete, and do not create a duplicate
  policy; record BLOCKED when competing copies have no declared precedence;
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

Run with working directory <TARGET_PROJECT_CHECKOUT>. Treat
<PLAYBOOK_RUNTIME_LOCATOR> as read-only. Read only the manifest control fields,
then verify that the locator resolves their playbook repository and revision
before reading any playbook artifact.

If the working directory or playbook binding cannot be verified, make no edit
and report `BLOCKED`.

Read the manifest, its current state, approved review records, Next action,
project instructions, and every authority linked by the selected action.

Perform the dependency-ready Next action within the manifest's current Allowed
write scope. Apply its pre-approved `EXPLICIT_REVIEW`, `AUTO_CONTINUE`, or
`REVIEW_ON_EXCEPTION` mode:
- while DISCOVERY, change only the manifest discovery proposal;
- while MAPPED, create or update only one selected artifact, or perform the
  final installation verification when no selected artifact remains;
- for REUSE, record decision-level conformance evidence for every applicable
  policy obligation without copying the source document;
- for UPDATE_EXISTING, preserve the existing project policy as canonical and
  add only reviewed missing decisions or accepted alternatives; do not create
  a duplicate policy or a parallel replacement;
- for SKIP or DEFER, record the reviewed decision without copying the source;
- require a reviewed exception with rationale, owner, risk, and equivalent
  control for an intentional deviation; do not silently apply a playbook
  default;
- compare the action's changed facts, links, commands, and availability claims
  with previously approved artifacts;
- record every affected artifact as STALE in the manifest freshness register
  and select the earliest dependency-ready stale correction as the first action
  after the current change is independently approved;
- for `EXPLICIT_REVIEW`, keep independent review of the current change as the
  immediate Next action;
- for `AUTO_CONTINUE` or `REVIEW_ON_EXCEPTION`, require approved/current inputs,
  no semantic decision, every declared gate passing, an audit entry, and the
  next action inside the approved automation boundary and write scope;
- continue through eligible automatic actions only until the next mandatory
  semantic checkpoint;
- fail closed to `EXPLICIT_REVIEW` on a failed/missing gate, ambiguity, unknown
  impact, exception, drift, blocker, stale dependency, unrelated change, or
  scope expansion;
- do not update a newly stale artifact in this invocation, and keep volatile
  adoption progress in the manifest rather than copying it into stable entry
  points;
- preserve all unrelated and user-owned changes;
- do not write outside the current Allowed write scope;
- update manifest evidence and Next action;
- run only the Required documentation checks applicable to this action;
- before every review gate, complete the adopted agent self-review record
  against the exact candidate revision, including the contract-to-change map,
  material author annotations, scope, evidence, risks, and cross-document
  consistency; and
- record `SELF_REVIEW_PASSED` or `SELF_REVIEW_FAILED`; any candidate change
  invalidates the result, and a pass cannot approve, merge, or continue work.

Do not advance Adoption state without recorded explicit reviewer authority.
Do not approve your own work, use `AUTO_CONTINUED` as approval, cross an
explicit checkpoint, start a feature whiteboard, modify product code, or
contact an external project. Stop at `EXPLICIT_REVIEW`, the automation
boundary, or the first exception, then report:
- current state;
- actions completed and their review modes;
- files changed;
- evidence and checks;
- stale artifacts found by the impact audit, or None;
- unresolved conflicts or risks;
- proposed state transition, if any; and
- required reviewer and next action.
```

## Prompt C — Initialize the empty solution whiteboard

```text
Initialize the project solution whiteboard under the installed project adoption
at <ADOPTION_MANIFEST>.

Preconditions:
- the manifest state is INSTALLED or ACTIVE;
- the working directory is <TARGET_PROJECT_CHECKOUT> and
  <PLAYBOOK_RUNTIME_LOCATOR> has been verified against the manifest;
- the project entry point, development policy, artifact paths, and required
  templates are approved and resolvable;
- the working branch and allowed write path follow project policy.

If a precondition fails, make no edit and report `BLOCKED`.

Read the manifest, project entry point, active project authorities, and the
pinned solution-whiteboard template. Create only the empty solution whiteboard
at <PROJECT_ADOPTION_ROOT>/solution-whiteboard.md.

Set its state to EMPTY, link the reviewed manifest and project authorities, and
use neutral values such as Not recorded or None for topic-specific content.
Do not request, infer, or record a need during this action.

Do not decide the solution, conclude the whiteboard, generate a handoff,
workflow, policy, ADR, plan, code, test, issue, message, or PR. Run applicable
documentation checks and stop after reporting that the installation boundary
is ready.
```

## Adoption-to-workflow runtime handoff

After the adoption boundary and empty whiteboard are independently approved,
do not use a guide that still selects `sdd-project-adoption` to record a need.
If that verified guide records cleanup as `PENDING`, run these commands from the
project root:

```bash
./install-sdd.sh --cleanup
./install-sdd.sh
```

The first command must remove only the installer-owned checkout. The second
must reuse the manifest's pinned revision, detect `INSTALLED`, install
`sdd-project-workflow`, and generate a new guide with cleanup `PENDING`. Verify
those fields before prompting the agent. If a verified current guide already
selects `sdd-project-workflow`, reuse it without cleanup. If adoption completion
or empty-whiteboard approval is missing, report `BLOCKED`; do not clean up or
admit a need.

## Reviewer action after every prompt

The reviewer independently reads the complete changed artifact and governing
sources. They record `APPROVED`, `CHANGES_REQUESTED`, or `BLOCKED`, comments,
version, and evidence in the manifest. Only an approved reviewer action changes
the adoption state or permits the next prompt.
