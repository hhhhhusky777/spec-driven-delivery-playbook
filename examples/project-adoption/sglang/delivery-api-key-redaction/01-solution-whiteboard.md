# SGLang Diagnostic API-Key Redaction — Concluded Whiteboard

## Control

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Input | [SGLang issue #37457](https://github.com/sgl-project/sglang/issues/37457) |
| Target revision | `9a05b470fa849b349e384ef3c1381f9a85c6c550` |
| Self-review evidence | `SELF_REVIEW_PASSED` against the example revision containing this packet |
| Fresh-context review | Required for real adoption; no SGLang review claimed |
| Human review | Required for real adoption; no SGLang approval claimed |
| Authority | Teaching example only; no SGLang approval |

## Need and observed gap

Resolved server arguments are published to startup logs and server-information
responses. The reported projection contains `api_key` and `admin_api_key`, so
credentials may enter logs or responses and remain available after startup.

Expected behavior: diagnostic outputs never reveal credentials. Runtime server
arguments remain unchanged, and future unknown fields are hidden until an
explicit diagnostic-contract review allows them.

## Facts, assumptions, and unknowns

Facts from the public issue:

- startup logging and two server-information paths publish the resolved
  argument dictionary;
- the dictionary includes credential fields; and
- the issue requests a positive allowlist with unknown fields hidden by default.

Unknowns that implementation discovery must resolve:

- the complete set of fields intentionally supported by diagnostic consumers;
- whether both server-information routes share one serializer at the pinned
  target revision;
- existing snapshot, endpoint, and log-capture tests; and
- the compatibility owner for removing fields from diagnostic responses.

## Options and decision

| Option | Result |
| --- | --- |
| Denylist known secret names | Rejected: a new credential field could leak by default |
| Mutate the operational argument object | Rejected: diagnostics must not change runtime behavior |
| Shared positive-allowlist diagnostic projection | Selected: explicit exposure, deny-by-default evolution, and one testable boundary |

Decision: introduce one pure diagnostic projection owned near the server-argument
contract. Startup logs and server-information responses consume the same
projection. Fields outside the reviewed allowlist retain their diagnostic key
but use a deterministic redacted marker.

## Requirements and non-scope

- `R-01`: credentials and unreviewed future fields never appear in diagnostic
  logs or server-information responses.
- `R-02`: the operational argument object and authentication behavior do not change.
- `R-03`: all diagnostic publication paths use one projection contract.
- `R-04`: tests cover known credentials, an unknown sentinel field, and allowed
  non-sensitive fields without logging real secrets.
- Non-scope: credential rotation, endpoint authorization redesign, general log
  sanitization, and unrelated server-argument refactoring.

## Convergence and YAGNI audit

The shared positive allowlist closes the observed exposure and protects future
fields without adding a generic secret-scanning framework. Exact allowlist
contents and diagnostic-response compatibility remain explicit review gates.
The conclusion is ready for a handoff, not for implementation.
