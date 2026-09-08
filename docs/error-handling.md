# Error handling

Errors are triaged by their effect, not by a fixed procedural list.

| Class | Agent response | Human stop |
| --- | --- | --- |
| Agent mistake | Correct it within scope and repeat affected checks | Only if the correction changes an accepted outcome |
| Recoverable execution failure | Preserve valid work, recover proportionally, and verify the result | When recovery no longer progresses or authority is missing |
| Project gap | Preserve evidence and open or update an issue in the project | When current work needs a policy, safety, or product decision |
| Playbook gap | Preserve evidence and open or update an issue in the playbook repository | When the gap blocks a required safe outcome |
| Critical mismatch | Stop affected work without discarding valid state | For policy, authority, safety, intended behavior, destructive scope, or required acceptance |

Do not restart unaffected work, repeat successful review without a changed
candidate, or turn every observed failure into a universal rule. Record triage
in the implementation plan or owning issue, not a separate status document.

When an external write may have succeeded, inspect the actual effect before
retrying; never create a duplicate merely because the response was lost. When
ownership or destructive impact is uncertain, preserve the current state and
fail closed on the affected action.
