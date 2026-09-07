# Project agent trigger

From the repository root:

1. Read the [manifest](project-adoption-manifest.md),
   [contract registry](project-contracts.md), and
   [working whiteboard](solution-whiteboard.md).
2. Read `.sdd-runtime/agent-guide.md`; verify its project root, source
   repository, immutable manifest pin, checkout ownership marker, content hash,
   and selected skill. Run `./install-sdd.sh --validate` whenever runtime state
   may have drifted.
3. Follow the verified guide and installed skill for the live phase. Canonical
   project policies and owner decisions remain authoritative; the guide adds no
   separate policy or permission.
4. If the whiteboard is `EMPTY`, admit only an owner-supplied need and move it
   to `OPEN`. Do not repeat adoption. If it is active, resume only that need
   through its linked workflow and plan.
5. Preserve required checks, exact-candidate self-review, two isolated reviewer
   seats, human decisions, merge authority, target verification, and exact
   destructive ownership at their actual boundaries. Use the canonical
   recovery framework for failures instead of inventing extra stops.
6. After verified v5 delivery reset, require the whiteboard to be `EMPTY`, the
   manifest locator to be current, and the regenerated runtime to report
   `CURRENT` before admitting another need.

During an upgrade, follow `.sdd-runtime/playbook-upgrade-guide.md`. Keep the old
pin authoritative until the reviewed candidate passes validation and receives
human cutover approval; then clean only installer-owned runtime and regenerate
the normal guide from the new pin.

Resume prompt: “Follow the verified `.sdd-runtime/agent-guide.md`, then the
manifest, registry, and working whiteboard. Continue the dependency-ready action
inside its recorded scope and stop only at an actual human or safety boundary.”
