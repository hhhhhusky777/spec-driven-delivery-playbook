# Error handling

Errors are triaged by their effect, not by a fixed procedural list.

> [!IMPORTANT]
> Keep error handling simple and invariant-based. It is impossible to enumerate
> every edge case, race, timing, or failure interleaving; attempting to do so
> usually creates more failure modes. Preserve system consistency and fail
> closed when safe completion is uncertain. When the resulting state is known
> to be consistent and repeating the operation is safe, return a stable
> retryable outcome and let the client decide when to retry.

Do not add recovery orchestration, state, or branches for hypothetical cases.
A mechanism is justified only by a required invariant or observed failure. If
an operation may already have taken effect, reconcile the authoritative state
or rely on an established idempotency boundary before permitting retry. Errors
that need a policy, safety, product, or authority decision remain non-retryable
until that decision is resolved.

| Class | Agent response | Human stop |
| --- | --- | --- |
| Agent mistake | Correct it within scope and repeat affected checks | Only if the correction changes an accepted outcome |
| Recoverable execution failure | Preserve valid work, recover proportionally, and verify the result | When recovery no longer progresses or authority is missing |
| Project gap | Preserve evidence and open or update an issue in the project's owning tracker | When current work needs a policy, safety, or product decision |
| Playbook gap | Preserve evidence and open or update an issue in the playbook's owning tracker | When the gap blocks a required safe outcome |
| Critical mismatch | Stop affected work without discarding valid state | For policy, authority, safety, intended behavior, destructive scope, or required acceptance |

Do not restart unaffected work, repeat successful review without a changed
candidate, or turn every observed failure into a universal rule. Record triage
in the implementation plan or owning issue, not a separate status document.

A genuine gap discovered during conversation or execution belongs in the
owning repository's issue tracker; use GitHub Issues when the repository is
hosted on GitHub. Deduplicate it before opening a new issue. A delivery pull
request links the issue and uses the host's supported automatic-close
relationship only when it fully resolves the issue.

The issue tracker remains the problem record; do not replace it with a local
issue archive. Delivery closure follows the workflow skill.

When an external write may have succeeded, inspect the actual effect before
retrying; never create a duplicate merely because the response was lost. When
ownership or destructive impact is uncertain, preserve the current state and
fail closed on the affected action.
