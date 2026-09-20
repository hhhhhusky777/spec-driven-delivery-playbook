# Implementation Plan — Concluded-design authority

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority.

## Delivery status

| Field | Value |
| --- | --- |
| State | `READY` |
| Active tasks | `None` |
| Next ready task | `T01` |
| Active blocker | `None` |
| Implementation mode | Human review before merge |
| Delivery branch / target | `codex/whiteboard-freeze` → `main` |
| Owner | Repository owner |
| Primary issue / need | [Issue #115](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/115) |
| Concluded whiteboard | `WB-115-1`, commit `f06400c46f4bd0e9794ec28b5d0fd2e347ed1a83`, SHA-256 `7850ff22e47a85f1a724f9b8af6734ba567f05b4fb32806e64a63d7988f2cdd5` |
| Required reviewers | The two retained Issue #115 reviewer sessions |
| Last verified | Both reviewers approved the exact concluded whiteboard; lifecycle, structure, focused validation, and 51/51 tests passed |

## Governing inputs and delivery boundaries

### Source hierarchy

| Priority | Source | Authority / use |
| --- | --- | --- |
| 1 | Owner acceptance of `WB-115-1` and FC01–FC05 | Scope, amendment, fail-closed, and lifecycle authority |
| 2 | Frozen concluded whiteboard at the recorded hash | Exhaustive feature design |
| 3 | Existing project policies and templates | Compatible implementation and validation boundaries |

### Outcome, scope, and assumptions

| Concern | Accepted value |
| --- | --- |
| Problem | Accepted design can be silently reinterpreted or expanded during planning, implementation, review, or cleanup |
| Required outcome | Enforce prior human authority for every concluded-whiteboard byte change, exhaustive design traceability, reviewer scope blocking, and pre-conclusion approval of new fail-closed behavior |
| In scope | Canonical quality policy; author and reviewer skills; whiteboard and plan templates; README lifecycle explanation and diagram; regression tests; required installed-playbook pin reconciliation |
| Out of scope / deferred | Changing Fast Fix issue authority, prescribing implementation steps, introducing another document or service, or altering unrelated error-handling behavior |
| Success measures | Every changed rule traces to WB115-01–WB115-06; source tests and documentation checks pass; reviewers find no unauthorized scope |
| Assumptions / constraints | Whiteboard bytes remain exactly frozen; contract-equivalent wording choices remain agent-owned |

### Clarifications and gaps

| ID | Question or gap | Why it matters | Resolution / owner | State |
| --- | --- | --- | --- | --- |
| G01 | Exact bytes cannot be embedded unchanged in the combined archive format | Avoids a false archive guarantee | Complete content is archived; Git blob/hash preserves exact bytes | Resolved in WB115-05 |
| G02 | Human approval follows semantic agent review but conclusion changes metadata | Exact-candidate integrity | Human authorizes the bounded transition; the same reviewers verify it before freeze | Resolved in WB115-06 |

## System contracts

### Functional and state contracts

| ID | Trigger / precondition | Required behavior | Result / postcondition | Failure behavior |
| --- | --- | --- | --- | --- |
| C01 | Whiteboard is human-accepted and `CONCLUDED` | Preserve every byte until prior human authorization names a concrete amendment | Frozen design remains authoritative | FC01 |
| C02 | Plan, implementation, or correction proposes work | Trace every content, behavior, and logic addition to the frozen design | No unexplained task or candidate scope | FC02 |
| C03 | Agent is ready to ask the owner to conclude a design | Two reviewers first review the design; parent response then lists every new fail-closed behavior | Owner sees the complete restrictive behavior set before decision | FC03 |
| C04 | Reviewer inspects a design, plan, or candidate | Compare exact scope with the frozen concluded whiteboard | Unauthorized scope is a blocking finding | FC04 |
| C05 | Archive/reset or another lifecycle transition would mutate the frozen whiteboard | Require prior human authorization; preserve complete content and exact-byte Git provenance | Only authorized lifecycle mutation occurs | FC05 |

### Test and acceptance contracts

| Contract or design IDs | Test level | Scenario | Required evidence |
| --- | --- | --- | --- |
| WB115-01, C01 | Document model / lifecycle | Unauthorized amendment is rejected and an authorized reconclusion remains valid | Deterministic regression plus semantic review |
| WB115-02, WB115-03, C02, C04 | Document model / reviewer review | Plan and reviewer instructions require exhaustive traceability and block out-of-scope work | Focused test and both reviewers |
| WB115-04, C03 | Document model | Human response lists new fail-closed behaviors only after design review and before conclusion | Template/skill assertions and reviewer inspection |
| WB115-05, C05 | Lifecycle | Archive preserves complete content and reset requires pre-mutation authority | Existing archive checks plus new authority assertion |
| WB115-06 | Lifecycle / review | Declared conclusion transition is verified before planning | Lifecycle checker and retained reviewers |

## Delivery strategy and readiness

| Concern | This delivery |
| --- | --- |
| Integration model | One coherent PR to `main` |
| Increment boundary | One policy contract must keep policy, skills, templates, README, and tests consistent |
| Parallel ownership | None; the files share normative wording and test contracts |
| Compatibility sequencing | Canonical policy first, consumers link or specialize by responsibility, tests prove lifecycle behavior |
| Merge authority | Human review and explicit merge authorization |

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| WB115-01 | T01: canonical byte-freeze and amendment authority; template and workflow routing | Lifecycle and document-model tests | Aligned |
| WB115-02 | T01: plan traceability and author scope boundary | Mapping inspection and reviewer review | Aligned |
| WB115-03 | T01: reviewer out-of-scope blocking contract | Reviewer-skill assertions and both reviewers | Aligned |
| WB115-04 | T01: review-before-human-response sequence and fail-closed disclosure | Template/skill assertions | Aligned |
| WB115-05 | T01: authorized archive/reset wording and provenance distinction | Archive lifecycle checks | Aligned |
| WB115-06 | T01: valid conclusion transition and exact-candidate verification | Lifecycle check and retained reviewers | Aligned |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | PR |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | `READY` | `None` | Deliver WB115-01–WB115-06 consistently across canonical policy, skills, templates, README, and tests | No whiteboard change, Fast Fix change, new document, or unrelated rule | Focused checks, two retained reviewers, then full final validation | `None` |

## Task specifications and context receipts

### T01 — Enforce concluded-design authority

| Concern | Value |
| --- | --- |
| Outcome / non-scope | Enforce the accepted design exactly; do not add process beyond WB115-01–WB115-06 |
| Source boundary | `docs/documentation-quality-policy.md`, `skills/sdd-project-workflow/SKILL.md`, `skills/sdd-feature-review/SKILL.md`, `templates/discovery/solution-whiteboard.md`, `templates/delivery/implementation-plan.md`, `README.md`, applicable tests, and manifest pin only if required for accepted runtime consistency |
| Consumed dependencies | Frozen whiteboard `WB-115-1`; current lifecycle checker; existing archive/reset contract |
| Critical obligations | Canonical single-source wording; prior human authority; exact traceability; no speculative restriction |
| Required evidence | Focused validation, lifecycle checks, both retained reviewer approvals, full exact-head validation, human merge acceptance |
| Context receipt | Existing policy, skills, templates, README, lifecycle checker, and tests inspected; reviewer findings reconciled before freeze |
| Actual result | Pending |

## Recovery, decisions, and change control

### Failure and blocker log

| ID | Task | Observed versus expected | Classification / evidence | Recovery or owner decision | State |
| --- | --- | --- | --- | --- | --- |
| E01 | Design gate | First conclusion transition retained proposal wording and non-terminal resolution tokens | Agent mistake; lifecycle checker and both reviewers blocked it | Owner authorized bounded wording correction; exact corrected candidate passed both reviewers | Resolved |

### Delivery decision and amendment log

| ID / time | Decision or plan change | Reason / consequence | Affected design, contracts, or tasks | Authority |
| --- | --- | --- | --- | --- |
| 2026-09-20 | One coherent implementation task | All consumers implement one inseparable authority contract | WB115-01–WB115-06 / T01 | Frozen concluded design |

## Plan validation and completion

### Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | Complete design-to-task mapping and exact scope review | Pending |
| Applicable validation passed | Focused checks and full final `docs:all` | Pending |
| Merge-ready canonical state | Policy, skills, templates, README, tests, plan, archive/reset and manifest state consistent | Pending |
| PR-owned review and delivery | Two retained reviewers, checks, owner authority, merge and target proof | Pending GitHub PR |
| Feature cleanup complete | Complete combined archive, authorized reset, owned branch/worktree cleanup | Pending |

### Completion invariants

- The frozen whiteboard remains byte-identical to its recorded SHA-256.
- Every changed behavior and task maps to WB115-01–WB115-06 or a necessary
  existing project-authority obligation.
- Both retained reviewers block any unexplained scope.
- Applicable checks pass; failures and unrun gates remain explicit.
- Final human review receives the exact candidate and four-category line count.

## Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and outcomes | One task aligns policy, skills, templates, README, and tests with the frozen design | `DISCLOSE` |
| Design consistency | WB115-01–WB115-06 all map to T01; no design gap | `NONE` |
| Important changes | Prior human authorization, byte freeze, exhaustive scope, reviewer blocking, and fail-closed disclosure | `DISCLOSE` |
| Validation | Plan lifecycle validation and two-agent plan review are next | `AGENT_ACTION` |
| Risks or open decisions | None; whiteboard remains frozen | `NONE` |
| Decision requested | None; owner already authorized implementation | `NONE` |
