# Project agent trigger

Installation acceptance, reviewed merge, target verification, and current
runtime handoff state are recorded in the manifest.

From the repository root:

1. Read the [manifest](project-adoption-manifest.md) and
   [registry](project-contracts.md). Reconcile the current action, approved
   input revisions, allowed write scope, review mode, and unresolved decisions.
2. Read the installer-generated `.sdd-runtime/agent-guide.md` and verify its
   project root, checkout origin/HEAD, immutable manifest pin, ownership marker,
   and selected skill. Follow that skill for the live phase.
3. While adoption remains MAPPED, only prepare/review the owner-authorized
   batch. The drafted EMPTY whiteboard does not permit intake. Do not infer a
   need or installed status from file existence.
4. After final installation acceptance records INSTALLED, finish the approved
   runtime handoff: `./install-sdd.sh --cleanup`, then `./install-sdd.sh`.
   Verify the replacement selects `sdd-project-workflow` at the same SHA and
   `./install-sdd.sh --validate` reports CURRENT. Preserve the old owned runtime
   until this boundary is approved; diagnose a mismatch rather than guessing.
5. Only through that verified workflow guide may the owner-supplied next need
   enter the EMPTY whiteboard. An active or unarchived concluded whiteboard
   blocks reuse. Derive handoff and workflow from approved predecessor versions.
6. Preserve exact self-review, two independent reviewer seats and receipts,
   human authority, checks, and freshness. Ordinary future gates follow the
   approved project policy; this installation's batch authorization does not
   grant permanent automatic continuation or merge authority.

Resume prompt: “Follow the verified `.sdd-runtime/agent-guide.md`, then the
project registry and current manifest/workflow next action. Reconcile exact
inputs and allowed writes before acting; record evidence and remaining gates.”
