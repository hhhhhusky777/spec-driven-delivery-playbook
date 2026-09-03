# Agent Self-Review Record — `<artifact or change>`

Use this record before every human or independent-agent review gate. It is the
authoring agent's pre-review audit, not approval and not a substitute for the
reviewer required by project policy. Embed the same fields in the owning
artifact when a separate file would add unnecessary overhead.

## 1. Subject and provenance

| Field | Value |
| --- | --- |
| Subject | `<artifact, task, or PR>` |
| Exact candidate revision | `<commit, content hash, or immutable version>` |
| Governing inputs | `<approved requirement/contract/plan/policy IDs and versions>` |
| Allowed scope | `<paths and semantic boundary>` |
| Required gates | `<commands/check IDs>` |
| Reviewing agent | `<identity/runtime>` |
| Reviewed at | `<timestamp/timezone>` |

Any content change after this review invalidates the result. Review the new
exact revision before requesting or completing the owning review gate.

## 2. Contract-to-change map and author annotations

| Material change or PR annotation | Governing statement | Why and expected effect | Evidence | Risk/non-scope |
| --- | --- | --- | --- | --- |
| `<file/section/hunk/comment link>` | `<requirement/task/contract/policy ID>` | `<concise explanation>` | `<test/check/source>` | `<risk or None>` |

Annotate material or non-obvious PR hunks so a reviewer can trace code to the
approved documents. Do not annotate routine imports, formatting, or obvious
mechanics merely to increase comment count. PR annotations explain the review
mapping; source-code comments remain reserved for information future
maintainers need in the code itself.

## 3. Self-review checks

- [ ] Every material change maps to an approved governing statement.
- [ ] Every annotation accurately describes the final candidate revision.
- [ ] The implementation or artifact satisfies its acceptance criteria and
      Definition of Done without inventing behavior.
- [ ] Changed and unchanged surrounding behavior was inspected for omissions,
      contradictions, edge cases, and unintended effects.
- [ ] The complete diff stays within allowed scope and contains no unrelated,
      unexplained, generated, sensitive, or user-owned changes.
- [ ] Required tests and deterministic gates ran against the exact candidate;
      failures were justified and classified before remediation.
- [ ] API, data, security, concurrency, performance, compatibility,
      observability, deployment, rollback, and documentation impacts are
      satisfied or explicitly not applicable.
- [ ] Cross-document links, states, terminology, authority, and evidence claims
      are current and consistent.
- [ ] Deferred work, residual risks, blockers, and reviewer specialties are
      explicit.

## 4. Findings and disposition

| Finding | Severity | Resolution or owner | State |
| --- | --- | --- | --- |
| `<finding or None>` | `<blocking/non-blocking>` | `<change/evidence/owner>` | `<OPEN/RESOLVED>` |

Result: `<SELF_REVIEW_PASSED / SELF_REVIEW_FAILED>`

`SELF_REVIEW_PASSED` requires no open blocking finding and every required gate
passing or carrying a reviewed exception. It is evidence only: it cannot set
`APPROVED`, satisfy reviewer independence, authorize merge, or authorize
continuation. The existing review mode and project authority still control the
next action.
