# Task-specification calibration guide

This guide calibrates the development policy's `COMPLETE` task-specification
state. A complete specification lets an implementer proceed without inventing
or changing product or system behavior. It is not a source-code blueprint.

Approved contracts and decisions remain canonical. Reference them by stable ID
instead of copying them into a task. Independent readiness review judges the
whole task and its sources; automation checks only structured consistency.

## 1. Framework-only task

**Framework:** "Add campaign history storage" with a broad outcome, dependency,
and estimated size.

**Disposition:** keep `SPEC_PENDING`. It does not define or reference lifecycle
ownership, compatibility with current rows, failure behavior, migration and
rollback boundaries, or acceptance evidence. Implementing it would require new
product and data-integrity decisions.

## 2. Complete bounded task

**Specification:** add the approved campaign-history persistence boundary for
contracts `FC-03` and `SC-02`; preserve existing reads; restrict changes to the
named model, migration, repository, and tests; reject stale writes with the
approved retryable conflict; prove migration, rollback, and focused behavior;
exclude UI and analytics changes.

**Disposition:** `COMPLETE` when the cited contracts are approved/current and
the source boundary, dependencies, risk applicability, and observable
acceptance criteria are recorded. The implementer may choose helper layout,
local names, and contract-equivalent refactoring verified by tests and review.

## 3. High-risk migration task

**Must be specified or referenced:** data ownership; uniqueness, foreign-key,
nullability, and lifecycle invariants; old/new compatibility; deterministic
backfill and seed behavior; transaction and lock boundaries; rollback and
failure behavior; deployment order; and integrity/migration evidence.

**May remain implementation-owned:** helper/class layout, private naming,
contract-equivalent batching inside approved resource bounds, and query/index
choices that do not alter integrity, locking, compatibility, or the approved
performance contract. A unique index, lock-changing query, destructive column
operation, or irreversible backfill is not incidental and must be elevated.

## 4. Detailed but behaviorally ambiguous task

**Apparently detailed:** lists modules, classes, helper names, SQL statements,
and test filenames, but does not decide what happens for duplicate requests,
partial migration failure, or concurrent stale writes and names no owner for
those risks.

**Disposition:** remain `SPEC_PENDING` or fail DoR. Code-level detail does not
replace observable failure semantics, integrity ownership, or approved product
behavior.

## Readiness and receipt timing

Before `READY`, identify the canonical source boundary, confirm required sources
are available/current, complete the task specification, and self-check DoR.
Submit that task and evidence for one independent readiness review.

After `READY` and before `IN_PROGRESS`, the context receipt freezes and
reconciles the exact current revision, obligations, prohibitions, risks, and
completion evidence. Empty future receipt fields are expected before this
pre-start gate and do not make an otherwise complete task fail DoR.

## Automation boundary

Automation may enforce allowed `Spec state` values, state/marker consistency,
dependencies, freshness, and structured references. It must not claim that
arbitrary prose is sufficient, infer missing product decisions, or prescribe
one algorithm when several implementations satisfy the same approved contract.
