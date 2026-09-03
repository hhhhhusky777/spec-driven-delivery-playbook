# SGLang Project-Adoption Walk-Through

This is a non-authoritative integration example for the public
[SGLang repository](https://github.com/sgl-project/sglang). It demonstrates
exactly where the first adoption document goes, how the installer-generated
guide drives the agent, what is reused versus updated, where review stops
occur, and how an installed integration produces its empty solution
whiteboard. The nested delivery example then applies the current workflow to a
public SGLang issue.

The example is not affiliated with or endorsed by SGLang. It changes no SGLang
repository, opens no upstream issue or pull request, and claims no SGLang test
or maintainer approval.

## 1. Pinned inputs

| Input | Immutable value |
| --- | --- |
| Playbook contract | Approved immutable checkout containing this example; start at the [playbook README](../../../README.md) |
| SGLang target | [`d315eb725044e435b146c85488b7c6d9222f7fec`](https://github.com/sgl-project/sglang/commit/d315eb725044e435b146c85488b7c6d9222f7fec) |
| Inspection date | 2026-08-22 |
| Example state | `REVIEW` — refreshed against the current playbook contracts |
| Proposed SGLang adoption root | `.github/spec-driven-delivery/` |
| Runtime execution | Agent working directory is SGLang; playbook root is an explicit read-only input |

The source inspection used the pinned Git tree and selected public blobs. It
verified named files and their content but did not prove that no related rule
exists inside every source file or historical discussion.

## 2. Why the integration reuses SGLang authority

The pinned project already has substantial governance:

- the [contribution guide](https://github.com/sgl-project/sglang/blob/d315eb725044e435b146c85488b7c6d9222f7fec/docs/docs/developer_guide/contribution_guide.mdx)
  owns source setup, branches, tests, CI triggering, code style, accuracy, and
  performance guidance;
- the [maintenance model](https://github.com/sgl-project/sglang/blob/d315eb725044e435b146c85488b7c6d9222f7fec/.github/MAINTAINER.md),
  [CODEOWNERS](https://github.com/sgl-project/sglang/blob/d315eb725044e435b146c85488b7c6d9222f7fec/.github/CODEOWNERS),
  and [PR template](https://github.com/sgl-project/sglang/blob/d315eb725044e435b146c85488b7c6d9222f7fec/.github/pull_request_template.md)
  own reviewer and merge routing;
- the [test system](https://github.com/sgl-project/sglang/blob/d315eb725044e435b146c85488b7c6d9222f7fec/test/README.md),
  [registered-test guide](https://github.com/sgl-project/sglang/blob/d315eb725044e435b146c85488b7c6d9222f7fec/test/registered/README.md),
  and [unit-test guide](https://github.com/sgl-project/sglang/blob/d315eb725044e435b146c85488b7c6d9222f7fec/test/registered/unit/README.md)
  own test placement, registration, suites, and commands; and
- scoped `.claude/rules`, `.claude/skills`, and `docs/AGENTS.md` already provide
  component and documentation guidance to supported agents.

The integration therefore proposes only the missing routing layer: adoption
state, whiteboard-first discovery, dependency-ordered artifact review, task
context receipts, and stable working and archive locations.

## 3. Proposed target tree

No file below exists in upstream SGLang at the pinned revision. This is the
proposed shape submitted for playbook review; SGLang owners would decide the
shape of any authorized adoption:

```text
sglang/
├── AGENTS.md                                  # thin Codex-compatible pointer
├── .claude/rules/spec-driven-delivery.md      # thin Claude-compatible pointer
└── .github/spec-driven-delivery/
    ├── README.md                              # human/agent development entry point
    ├── project-adoption-manifest.md           # first document and state connector
    ├── development-policy.md                  # SDD overlay; links existing rules
    ├── solution-whiteboard.md                 # empty after installation
    ├── agent-adoption-trigger.md              # pinned bounded prompts
    └── deliveries/
        └── {need-id}-{slug}/
            └── 01-solution-whiteboard.md      # archived concluded discovery
```

The example representations are:

| Proposed SGLang path | Example file |
| --- | --- |
| `.github/spec-driven-delivery/project-adoption-manifest.md` | [Current adoption example](01-project-adoption-manifest.md) |
| `.github/spec-driven-delivery/README.md` | [Project entry point](02-project-entrypoint.md) |
| `.github/spec-driven-delivery/development-policy.md` | [SDD overlay](03-development-policy.md) |
| Root and Claude pointers | [Agent adapters](04-agent-entrypoint-adapters.md) |
| Generated runtime connector | [Agent guide representation](06-generated-agent-guide.md) |
| First future delivery | [API-key redaction packet](delivery-api-key-redaction/README.md) |

## 4. Step-by-step execution

### Step 1 — Run the installer from the project root

Use a fork or authorized worktree for SGLang. Obtain `install-sdd.sh` from the
approved playbook revision, copy it to the SGLang root, and run it there. Do not
write to the upstream checkout or `main`.

```bash
./install-sdd.sh --revision {approved-playbook-commit}
```

With no `--revision`, the installer resolves the latest playbook `main` to an
immutable commit. It writes the requested and resolved revisions, read-only
temporary checkout, installed skill, and cleanup record to the locally ignored
`.sdd-runtime/agent-guide.md`.

### Step 2 — Give the generated guide to the agent

```text
Follow .sdd-runtime/agent-guide.md exactly.
```

The user does not name a skill or supply a need. The guide identifies the
installed skill and verified runtime inputs. The skill creates the first
manifest at `.github/spec-driven-delivery/project-adoption-manifest.md`, copies
only durable playbook identity into it, and keeps it `DISCOVERY`.

### Step 3 — Perform discovery only

The selected adoption skill follows the boundary in the generated guide. The
permitted write scope contains only the manifest. The agent inventories repository facts, records
unknowns, proposes routing decisions, and stops.

### Step 4 — Review discovery and mapping

Compare the agent result with
[the completed example manifest](01-project-adoption-manifest.md). An authorized
real-project reviewer would review only after the agent records
`SELF_REVIEW_PASSED` against that exact candidate. The reviewer then corrects
facts or approves `DISCOVERY -> MAPPED`. Self-review does not grant approval.
This teaching example records no SGLang approval and therefore leaves its
self-review and independent review states `NOT_STARTED`.

### Step 5 — Generate one selected artifact per review

After each approval, give the agent the same instruction to follow the generated
guide. Before every continuation, an authorized reviewer must set one `Next action` and its exact
`Allowed write scope` in the manifest:

1. generate the [project entry point](02-project-entrypoint.md), self-review the
   exact candidate, then request review;
2. generate the [SDD overlay](03-development-policy.md), self-review the exact
   candidate, then request review;
3. create the [thin agent adapters](04-agent-entrypoint-adapters.md), self-review
   the exact candidate, then request review; and
4. update documentation-link checking for the new `.github` Markdown path,
   self-review the exact candidate, then request review under SGLang's `.github`
   and CI ownership.

The existing contribution, test, CI, and maintainer documents remain canonical.
The PR/branch family routes to `UPDATE_EXISTING` because the pinned sources do
not prove the playbook's deterministic single-task/multi-task integration rule;
the agent updates project authority through owner review and never creates a
duplicate policy.

After all design artifacts and the next task specification are approved, the
agent asks the adopting user to choose the implementation continuation mode.
`HUMAN_REVIEW_BEFORE_MERGE` stops at every task PR. `AGENT_AUTO_MERGE` applies
only to explicitly scoped implementation PRs and only if SGLang's repository
protections permit the merge without bypass. The agent rereads the choice
before every task, PR, merge, and continuation. This non-authoritative example
leaves the mode `NOT_SELECTED` and performs no merge.

### Step 6 — Verify `INSTALLED`

From a fresh context, follow only `.github/spec-driven-delivery/README.md` and
confirm that it resolves:

- existing SGLang authorities and reviewers;
- the adoption manifest and current state;
- the working-whiteboard, archive, and pinned-template paths;
- the caller-supplied playbook root and its revision-verification rule;
- project test and PR gates; and
- the installed empty-whiteboard procedure.

In a real SGLang fork, run the documentation checks selected by its reviewed
manifest. This playbook example claims only its own `npm run docs:all` evidence.

### Step 7 — Generate the empty solution whiteboard

After an authorized reviewer records `INSTALLED`, the selected skill follows
the [generated guide representation](06-generated-agent-guide.md) and creates:

```text
.github/spec-driven-delivery/solution-whiteboard.md
```

The whiteboard is `EMPTY` and contains no inferred need. The installation
boundary stops there. A later discussion puts its need inside the whiteboard;
handoff generation and workflow routing remain gated until reviewed convergence.

After adoption, the [API-key redaction delivery](delivery-api-key-redaction/README.md)
demonstrates that future-need route using the current whiteboard, handoff,
workflow, implementation-plan, review-mode, task-receipt, and branch contracts.

## 5. Automation contract derived from the example

The installer and selected skill need only these stable inputs:

1. immutable playbook and target revisions;
2. target project root as the execution working directory;
3. a read-only playbook root or immutable URL base supplied at runtime;
4. target adoption root and manifest path;
5. target project instruction paths;
6. exact allowed write scope;
7. one manifest `Next action`;
8. applicable project checks; and
9. reviewer identity/disposition before another invocation.

The skill must not run all review-dependent actions without stopping. It
performs one bounded action, waits for review, then reads the approved manifest
state to determine the next action. The generated guide is the only prompt the
user needs to supply.

## 6. Current example handoff

| Field | Value |
| --- | --- |
| Example state | `REVIEW` |
| SGLang files changed | None |
| Integration shape | Demonstrated through proposed project files |
| Evidence | Pinned public-source audit plus playbook documentation gates |
| Pending gate | Independent review of the complete example and authority map |
| After approval | Mark `EXAMPLE_REVIEWED`; this example grants no authority to install or discuss a real SGLang need |
