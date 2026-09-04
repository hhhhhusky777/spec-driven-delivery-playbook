# SGLang Generated Agent Guide Representation

This is a non-executable representation of the machine-local guide generated
by `install-sdd.sh`. A real guide contains verified absolute runtime paths and
is excluded from Git. This example records tokens instead so it does not claim
a checkout exists on another machine.

## Installation state

| Field | Value |
| --- | --- |
| Project root | `PROJECT_ROOT_FROM_INSTALLER` |
| Adoption manifest | `.github/spec-driven-delivery/project-adoption-manifest.md` |
| Manifest state detected | `ABSENT` |
| Manifest state before block | `NONE` |
| Generator version | `2.1.0` |
| Generator schema version | `2` |
| Guide profile | `adoption` |
| Required skill | `sdd-project-adoption` |
| Installed skill | `.agents/skills/sdd-project-adoption/SKILL.md` |
| Content hash | `GENERATED_CONTENT_HASH` |

## Playbook runtime

| Field | Value |
| --- | --- |
| Source repository | `https://github.com/hhhhhusky777/spec-driven-delivery-playbook.git` |
| Requested revision | `APPROVED_PLAYBOOK_COMMIT` |
| Resolved revision | `RESOLVED_PLAYBOOK_COMMIT` |
| Playbook checkout | `PLAYBOOK_ROOT_FROM_INSTALLER` |
| Access mode | `read-only` |

## Cleanup record

| Field | Value |
| --- | --- |
| Checkout owner | `install-sdd.sh` |
| Ownership marker | `PLAYBOOK_ROOT_FROM_INSTALLER/.sdd-owned-checkout` |
| Cleanup command | `./install-sdd.sh --cleanup` |
| Cleanup state | `PENDING` |

## Agent execution contract

1. Verify the project root, source repository, and resolved revision.
2. Read and follow the installed skill completely.
3. Preserve exact write scopes and every independent review stop.
4. Before every review stop, complete the agent self-review record against the
   exact candidate revision. A pass is evidence only, never approval or
   authorization to merge or continue.
5. Open a stable review session and initialize exactly two fresh-context reviewers
   for that candidate. Preserve requested changes and author dispositions;
   reuse those reviewer(s) for revisions, then stop for human review.
6. Populate only durable playbook identity in the manifest; never commit the
   machine-local checkout.
7. Do not request or infer a product need during installation.
8. Validate the runtime with `./install-sdd.sh --validate` when it may have
   drifted.
9. After reviewed authority reaches `INSTALLED`, clean up the pending checkout,
   rerun the installer to select `sdd-project-workflow`, then create only the empty
   `.github/spec-driven-delivery/solution-whiteboard.md` and stop.

The actual installer also records an ownership marker and cleanup command. The
cleanup operation must validate both before removing its temporary checkout.
The guide must be replaced whenever the manifest requires a different skill;
an adoption guide must never admit the first product need.
