# SGLang Diagnostic API-Key Redaction — Example Implementation Plan

## Plan control

| Field | Value |
| --- | --- |
| Status | `CONTRACT_REVIEW` |
| Previous status | `DRAFT` |
| Plan mode | `FULL` |
| Current phase | `SPECIFY` |
| Current task | `None` |
| Next ready task | `None` |
| Review state | `NOT_STARTED` |
| Self-review state | `NOT_STARTED` |
| Self-review candidate revision | `Not recorded` |
| Self-review evidence | `Not recorded` |
| Fresh-context review state | `NOT_STARTED` |
| Fresh-context review session ID | `Not recorded` |
| Fresh-context assigned reviewers | `Not recorded` |
| Fresh-context required approvals | `Not recorded` |
| Fresh-context approved reviewers | `Not recorded` |
| Fresh-context reviewed revision | `Not recorded` |
| Fresh-context review evidence | `Not recorded` |
| Human review state | `NOT_STARTED` |
| Human reviewed revision | `Not recorded` |
| Human review evidence | `Not recorded` |
| Implementation continuation mode | Read live from workflow; currently `NOT_SELECTED` |
| Primary issue | [SGLang #37457](https://github.com/sgl-project/sglang/issues/37457) |
| Target source boundary | SGLang at `9a05b470fa849b349e384ef3c1381f9a85c6c550`; refresh before approval |
| Delivery implementation task count | `2` |
| Integration model | `Multi-task feature integration` |
| Feature integration branch | Project owner must name it before `READY` |
| Task PR target | Feature integration branch |
| Final PR target | Protected branch selected by SGLang policy |
| Protected-branch synchronization | Project owner must define before `READY` |
| Blockers | Self-review, fresh-context review, human approval, allowlist, compatibility, exact sources/tests, owners, and branch values |

Discovery, planning, validation-only, and archive-only rows do not count as
implementation tasks. T01 and T02 task branches start from and their task PRs
target the feature integration branch. Only the complete, validated feature PR
targets the protected branch.

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

## Delivery ledger

| ID | State | Next | Depends on | Outcome | Independent merge boundary |
| --- | --- | --- | --- | --- | --- |
| `S01` | `PLANNED` | | None | Verify project authorities, exact source paths, consumers, allowlist, tests, and branch values | Discovery only; does not count |
| `T01` | `PLANNED` | | S01 | Add the shared projection and switch startup logging, with unit/log-capture tests | Startup diagnostics satisfy SC-01–SC-03 on the feature branch |
| `T02` | `PLANNED` | | T01 | Switch all server-information responses and update canonical diagnostic/API documentation with endpoint tests | All known publication paths satisfy AC-01–AC-06 |
| `V01` | `PLANNED` | | T01–T02 | Run the project-selected focused, regression, security, documentation, and compatibility gates; reconcile evidence | Validation only; does not count |
| `A01` | `PLANNED` | | V01 and final merge | Reconcile protected-branch state, retrospective, delivery record, and archive | Archive only; does not count |

Each implementation task is the smallest coherent, self-contained increment
that can be reviewed, validated, and merged independently while leaving its
integration target working. It may depend on already merged prerequisites but
must not rely on unmerged follow-up work for its stated outcome.

## Definition of Ready and task context receipts

No task is `READY` or `NEXT`. Before either task starts, reviewers must approve
the plan, resolve every blocker, verify the branch source and PR target, freeze
the exact current SGLang source revision, and approve a complete task
specification with acceptance tests and allowed write scope.

All task context receipts remain `NOT_STARTED`.

| Task | Context source revision | Allowed write scope | Review disposition |
| --- | --- | --- | --- |
| `T01` | `Not frozen` | `Not approved` | `NOT_STARTED` |
| `T02` | `Not frozen` | `Not approved` | `NOT_STARTED` |

## Test and failure policy

Use SGLang-owned commands selected during S01. Required evidence includes pure
projection tests, unknown-field denial, sanitized startup-log capture, both
server-information routes, unchanged authentication behavior, and affected
regression/documentation gates. No real credential enters fixtures or output.

A failure requires a justification before modification: observed result,
expected contract, function design, evidence, and classification as product,
design, configuration, environment, performance, or test defect. Fix the owning
layer; do not assume the test is wrong.

## Completion and review

The plan may become `READY` only after S01 resolves project facts and at least
one complete task is `READY`/`NEXT`. It may become `VALIDATING` only after all
implementation tasks are terminal. Completion requires current contracts,
passing project-authorized evidence, final feature-to-protected review and
merge, protected-state reconciliation, residual-risk ownership, retrospective,
and archive links. This teaching packet claims none of those gates.
