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
| Required skill | `sdd-project-adoption` |
| Installed skill | `.agents/skills/sdd-project-adoption/SKILL.md` |

## Playbook runtime

| Field | Value |
| --- | --- |
| Source repository | `https://github.com/Orientation-CD/spec-driven-delivery-playbook.git` |
| Requested revision | `APPROVED_PLAYBOOK_COMMIT` |
| Resolved revision | `RESOLVED_PLAYBOOK_COMMIT` |
| Playbook checkout | `PLAYBOOK_ROOT_FROM_INSTALLER` |
| Access mode | `read-only` |

## Agent execution contract

1. Verify the project root, source repository, and resolved revision.
2. Read and follow the installed skill completely.
3. Preserve exact write scopes and every independent review stop.
4. Populate only durable playbook identity in the manifest; never commit the
   machine-local checkout.
5. Do not request or infer a product need during installation.
6. After reviewed authority reaches `INSTALLED`, create only the empty
   `.github/spec-driven-delivery/solution-whiteboard.md` and stop.

The actual installer also records an ownership marker and cleanup command. The
cleanup operation must validate both before removing its temporary checkout.
