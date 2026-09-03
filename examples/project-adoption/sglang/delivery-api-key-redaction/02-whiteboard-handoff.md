# SGLang Diagnostic API-Key Redaction — Workflow Handoff

## Control

| Field | Value |
| --- | --- |
| State | `APPROVED` for playbook demonstration only |
| Source | [Concluded whiteboard](01-solution-whiteboard.md) |
| Source revision | Example revision containing this packet |
| Self-review evidence | `SELF_REVIEW_PASSED` against the source revision |
| Trigger | `MANUAL_INVOCATION` |
| External authority | None; SGLang review is still required |

## Frozen workflow input

Need: prevent credentials and unreviewed future server-argument fields from
appearing in startup logs or server-information responses while leaving the
operational configuration unchanged.

Accepted solution boundary:

- one shared, pure, positive-allowlist diagnostic projection;
- every current diagnostic publication path consumes it;
- unknown fields fail closed;
- compatibility owners approve the exact exposed-field set and redaction form;
- focused unit, log, and endpoint tests provide evidence; and
- no general-purpose secret framework or authorization redesign.

Unresolved project facts are not silently promoted to decisions. The workflow
must select a full implementation plan and keep implementation blocked until
the allowlist, response compatibility, source locations, owners, and applicable
test commands are verified at the pinned SGLang revision.
