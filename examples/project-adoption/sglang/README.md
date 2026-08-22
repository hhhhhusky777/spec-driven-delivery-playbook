# SGLang Project-Adoption Walk-Through

This is a non-authoritative integration example for the public
[SGLang repository](https://github.com/sgl-project/sglang). It demonstrates
exactly where the first adoption document goes, how an agent is prompted, what
is reused versus proposed, where review stops occur, and how an installed
integration starts its first solution whiteboard.

The example is not affiliated with or endorsed by SGLang. It changes no SGLang
repository, opens no upstream issue or pull request, and claims no SGLang test
or maintainer approval.

## 1. Pinned inputs

| Input | Immutable value |
| --- | --- |
| Playbook contract | Approved immutable checkout containing this example; start at the [playbook README](../../../README.md) |
| SGLang target | [`d315eb725044e435b146c85488b7c6d9222f7fec`](https://github.com/sgl-project/sglang/commit/d315eb725044e435b146c85488b7c6d9222f7fec) |
| Inspection date | 2026-08-22 |
| Example state | `REVIEW` — awaiting independent review in the playbook PR |
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
context receipts, and stable per-need locations.

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
    ├── agent-adoption-trigger.md              # pinned bounded prompts
    └── deliveries/
        └── {need-id}-{slug}/
            └── 01-solution-whiteboard.md      # first per-need artifact
```

The example representations are:

| Proposed SGLang path | Example file |
| --- | --- |
| `.github/spec-driven-delivery/project-adoption-manifest.md` | [Completed discovery and mapping](01-project-adoption-manifest.md) |
| `.github/spec-driven-delivery/README.md` | [Project entry point](02-project-entrypoint.md) |
| `.github/spec-driven-delivery/development-policy.md` | [SDD overlay](03-development-policy.md) |
| Root and Claude pointers | [Agent adapters](04-agent-entrypoint-adapters.md) |
| Repeated installation invocation | [Filled Prompt B](05-installation-prompt.md) |
| First-need invocation | [Whiteboard trigger](06-first-need-prompt.md) |

## 4. Step-by-step execution

### Step 1 — Create isolated, pinned checkouts

Use a fork or authorized worktree for SGLang. Do not write to the upstream
checkout or `main`.

```bash
git clone https://github.com/Orientation-CD/spec-driven-delivery-playbook.git
git -C spec-driven-delivery-playbook checkout --detach {approved-playbook-commit}
git -C spec-driven-delivery-playbook rev-parse HEAD

git clone https://github.com/sgl-project/sglang.git
git -C sglang checkout --detach d315eb725044e435b146c85488b7c6d9222f7fec
git -C sglang switch -c example/spec-driven-delivery-adoption

PLAYBOOK_ROOT="$(git -C spec-driven-delivery-playbook rev-parse --show-toplevel)"
PROJECT_ROOT="$(git -C sglang rev-parse --show-toplevel)"
```

Run the agent with `PROJECT_ROOT` as its working directory. Supply
`PLAYBOOK_ROOT` as a read-only runtime input to every adoption prompt. These
machine-specific paths are not committed; the manifest stores the playbook
repository, immutable revision, and materialization mode.

### Step 2 — Place the first document

```bash
mkdir -p "$PROJECT_ROOT/.github/spec-driven-delivery"
cp "$PLAYBOOK_ROOT/templates/adoption/project-adoption-manifest.md" \
  "$PROJECT_ROOT/.github/spec-driven-delivery/project-adoption-manifest.md"
```

Fill the pinned revisions and paths only. Keep the manifest `DISCOVERY`.
Record the exact `git rev-parse HEAD` result as the playbook revision; the
brace-delimited value above is an invocation input, not a literal revision.

### Step 3 — Prompt the agent for discovery only

Use the exact [filled bootstrap prompt](00-bootstrap-prompt.md). The permitted
write scope contains only the manifest. The agent inventories repository facts,
records unknowns, proposes routing decisions, and stops.

Before submitting it, replace `PROJECT_ROOT_FROM_STEP_1` and
`PLAYBOOK_ROOT_FROM_STEP_1` with the two resolved runtime values. Do not place
those absolute paths in the committed manifest.

### Step 4 — Review discovery and mapping

Compare the agent result with
[the completed example manifest](01-project-adoption-manifest.md). An authorized
real-project reviewer would correct facts and approve `DISCOVERY -> MAPPED`.
This teaching example records no SGLang approval.

### Step 5 — Generate one selected artifact per review

Use the exact [filled installation prompt](05-installation-prompt.md) once for
each selected item. Before every invocation, an authorized reviewer must set
one `Next action` and its exact `Allowed write scope` in the manifest:

1. generate the [project entry point](02-project-entrypoint.md), then review;
2. generate the [SDD overlay](03-development-policy.md), then review;
3. create the [thin agent adapters](04-agent-entrypoint-adapters.md), then
   review; and
4. update documentation-link checking for the new `.github` Markdown path,
   then review under SGLang's `.github` and CI ownership.

The existing contribution, test, CI, PR, and maintainer documents remain
`REUSE`; the agent does not copy or rewrite them.

### Step 6 — Verify `INSTALLED`

From a fresh context, follow only `.github/spec-driven-delivery/README.md` and
confirm that it resolves:

- existing SGLang authorities and reviewers;
- the adoption manifest and current state;
- per-need artifact paths and pinned templates;
- the caller-supplied playbook root and its revision-verification rule;
- project test and PR gates; and
- the exact next-need prompt.

In a real SGLang fork, run the documentation checks selected by its reviewed
manifest. This playbook example claims only its own `npm run docs:all` evidence.

### Step 7 — Start the first whiteboard

After an authorized reviewer records `INSTALLED`, fill and submit the
[SGLang first-need prompt](06-first-need-prompt.md). The agent creates only:

```text
.github/spec-driven-delivery/deliveries/{need-id}-{slug}/01-solution-whiteboard.md
```

It stops for discussion. Handoff generation and workflow routing remain gated
until the whiteboard reaches its reviewed convergence state.

## 5. Automation contract derived from the example

Future automation needs only these stable inputs:

1. immutable playbook and target revisions;
2. target project root as the execution working directory;
3. a read-only playbook root or immutable URL base supplied at runtime;
4. target adoption root and manifest path;
5. target project instruction paths;
6. exact allowed write scope;
7. one manifest `Next action`;
8. applicable project checks; and
9. reviewer identity/disposition before another invocation.

The automation must not run all steps in one agent call. It invokes one prompt,
waits for review, then reads the approved manifest state to determine the next
action.

## 6. Current example handoff

| Field | Value |
| --- | --- |
| Example state | `REVIEW` |
| SGLang files changed | None |
| Integration shape | Demonstrated through proposed project files |
| Evidence | Pinned public-source audit plus playbook documentation gates |
| Pending gate | Independent review of the complete example and authority map |
| After approval | Mark `EXAMPLE_REVIEWED`; do not start a real need without a separate authorized adoption reaching `INSTALLED` |
