# WB62 — combined delivery preparation authority

On 2026-09-06 the owner instructed: “let's deliver the upgrade together with
the issue, and we can continue.” After the coordinator described one planning
batch containing routing reconciliation, implementation plan and readiness
prerequisites, the owner clarified that continuation means working until the
guide's stop point, not stopping after an acknowledgement.

This records bounded preparation, not acceptance of unseen content. U84
publication joins #62/#54; verified local cutover is not repeated. The accepted
whiteboard and consumed handoff retain their bytes; this linked amendment
changes packaging only.

| Boundary | Authorized treatment |
| --- | --- |
| Preparation | Reconcile WB62 routing to matching v4, draft one FULL plan and substantive T01 context together, review the whole package |
| Upgrade | Include U84 migration/cutover evidence and project adapters in the same eventual PR |
| Pre-publication use | Verified d93d27a runtime for this provisional preparation only; future-project activation still requires reviewed publication |
| Allowed files | WB62 workflow, implementation-plan, planning-batch and preparation-authority; WB62 review ledger; manifest, registry, trigger and U84 checkpoint synchronization |
| Unchanged inputs | Design 456b3fc2459be4f3ddc5ca7f649a533dd4e48996; handoff 4b18100a722aa06baba7643b67e01185108a8635 |
| End condition | Owner package acceptance, scope change or cancellation |
| Retained gates | Exact checks, two isolated reviewers, owner acceptance, fresh readiness and owner merge authority |
| Excluded | Implementation before acceptance/readiness, auto-merge, runtime issues, new design choices, historical deletion |

V4 migration and prerequisite/output mapping are review subjects. Older W01
approvals remain evidence for their exact v2 candidate, not approval of v4.
No new handoff trigger is issued. Acceptance records legal state transitions
in dependency order and cannot approve unseen future outputs.

## Issue 63 exception amendment

After the planning reviewers demonstrated that the accepted package could not
reach readiness through the checker, the owner instructed the coordinator to
“fix it.” This authorizes the smallest source correction needed to unblock the
same package and its regression evidence inside the next retained-reviewer
round.

| Boundary | Authorized treatment |
| --- | --- |
| Purpose | Let reviewed snapshots admit required, valid lifecycle-control progress while retaining the accepted normative design |
| Added files | `scripts/sdd-lifecycle.mjs`; `tests/sdd-lifecycle.test.mjs`; `docs/batch-review-and-recovery.md`; issue 63 evidence in the existing WB62 review records |
| Mutable controls | Enumerated status, review, implementation-mode, current-action, context and live-summary values; delivery-manifest review state with its existing evidence link; action/task ledger progress |
| Still immutable | Allowed write scope, review links, task dependencies, contracts, risk, acceptance criteria and ordinary prose |
| Compatibility | No schema/state/quorum change; existing snapshots and v2/v3/v4 routes remain supported |
| Review | Same two WB62 planning reviewers inspect the corrected exact package; owner acceptance remains required |
| Excluded | Broad projection bypass, unreviewed scope expansion, approval fabrication, implementation of the remaining T01 policy changes |
