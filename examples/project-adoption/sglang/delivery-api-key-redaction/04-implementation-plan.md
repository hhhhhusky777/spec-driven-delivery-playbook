# SGLang Diagnostic API-Key Redaction — Example Implementation Plan

<!-- sdd: implementation-plan -->

This is the example's only active-delivery state authority.

## Delivery status

| Field | Value |
| --- | --- |
| State | `DRAFT` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | Exact SGLang sources, allowlist, compatibility owner, tests, and branch values are unverified |
| Implementation mode | Human review before merge |
| Primary issue | [SGLang #37457](https://github.com/sgl-project/sglang/issues/37457) |
| Target source boundary | SGLang at `9a05b470fa849b349e384ef3c1381f9a85c6c550`; refresh before approval |
| Feature branch / target | Project owner must define |
| Last verified | Teaching example only; no live project validation claimed |

## Needs, requirements, and acceptance

- `AC-01`: known API credentials do not appear in startup-log diagnostics.
- `AC-02`: known API credentials do not appear in either server-information response.
- `AC-03`: a newly introduced unknown argument field is hidden by default.
- `AC-04`: reviewed non-sensitive diagnostic fields retain their approved values.
- `AC-05`: runtime arguments and request authentication remain unchanged.
- `AC-06`: all publication paths use the same projection contract.

## System contracts

`SC-01 — Diagnostic exposure`: diagnostic output is produced only from a
reviewed positive allowlist. Unknown fields are non-public by default.

`SC-02 — Runtime isolation`: projection is pure and does not mutate operational
server arguments, parser state, or authentication configuration.

`SC-03 — Shared ownership`: startup logs and server-information endpoints use
one diagnostic projection; callers do not maintain local secret lists.

`SC-04 — Compatibility`: the exact allowlist and redacted response shape
require SGLang compatibility-owner approval before implementation.

## Design, risks, and YAGNI

Place the projection at the verified server-argument diagnostic boundary and
pass its result to each publication path. Do not add reflection-based secret
guessing, a generic secret scanner, credential rotation, or endpoint-auth changes.

Primary risks are breaking diagnostic consumers, leaving one publication path
unconverted, and accidentally logging test sentinels. Prevent them with an
approved compatibility inventory, one projection owner, path enumeration, and
sanitized tests. If unchanged, credentials may persist in logs or responses.

## Design-to-task mapping

| Design / acceptance | Owning task | Validation |
| --- | --- | --- |
| `SC-01`–`SC-03`, `AC-01`, `AC-03`, `AC-05` | `T01` | Projection unit tests and sanitized startup-log capture |
| `SC-04`, `AC-02`, `AC-04`, `AC-06` | `T02` | Both server-information routes, compatibility review, and documentation checks |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | PR |
| --- | --- | --- | --- | --- | --- | --- |
| `T01` | `PLANNED` | None | Add the shared projection and switch startup logging | No endpoint or authentication behavior change | Projection unit tests and sanitized log capture | Not opened |
| `T02` | `PLANNED` | `T01` | Switch all server-information responses and update canonical diagnostic/API documentation | Preserve the approved response compatibility contract | Endpoint, compatibility, regression, and documentation checks | Not opened |

## Readiness boundary

No task is ready. Before work starts, resolve the recorded blocker and confirm
the approved design, current source, dependencies, write boundary, environment,
tests, permissions, branch target, and merge authority. These prerequisites are
checked together; they are not separate status documents or review stops.

## Test and failure policy

Use SGLang-owned commands selected during S01. Required evidence includes pure
projection tests, unknown-field denial, sanitized startup-log capture, both
server-information routes, unchanged authentication behavior, and affected
regression/documentation gates. No real credential enters fixtures or output.

A failure follows the playbook's canonical error-handling framework. Correct
agent mistakes within authority; record genuine project or playbook gaps in the
applicable issue tracker.

## Completion and review

Before final review, a delivery-closing candidate must contain completed task
outcomes, current contracts, project-authorized checks, owned residual risks,
an archived whiteboard linked to its PR, removal of this feature plan, and a
reset working whiteboard. Review, authorized merge, and exact-target
verification remain PR-owned facts. This teaching example claims none of those
outcomes.
