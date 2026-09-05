# Scoped live trial — playbook efficiency

## Authority and boundary

On 2026-09-05 the repository owner approved the exact WB38-R03 conclusion and
explicitly authorized following work to use that design as a live trial.
This is a delivery-scoped exception to separate per-artifact preparation and
review stops, not standing policy for unrelated work or other repositories.
Source: [concluded whiteboard](solution-whiteboard.md) and
[approval evidence](reviews/WB38-S01.md).

| Field | Value |
| --- | --- |
| Owner | Repository owner |
| Scope | This full-lifecycle efficiency delivery originating in issues 38, 37 and 35 |
| Current authorized action | Prepare one provisional handoff/workflow/implementation-plan package |
| Allowed writes | Project adoption root for planning, review and evidence; no executable implementation before accepted planning |
| Preparation exception | Dependent drafts may be prepared against exact provisional predecessor versions inside the batch |
| Review boundary | One exact-package self-review, two initially isolated retained reviewers, then owner planning acceptance |
| Approval semantics | Draft dependencies are not APPROVED or CONSUMED merely because used for preparation; no task enters IN_PROGRESS before readiness and applicable authority |
| Preserved checks | Current canonical docs:all, required failure evidence, freshness, source binding, scope, ownership and all mandatory controls |
| Publication | Agent-attributed existing-account PR comments where an authorized PR is used; no formal self-approval or protection bypass |
| Merge authority | Current human-before-merge policy retained; no blanket merge or implementation auto-merge permission |
| Stop conditions | New material owner decision, policy conflict outside this exception, failed gate, unknown impact, missing authority, scope drift or unverifiable external effect |
| Expiry | Completion, cancellation or owner revocation of this delivery; no automatic carryover |
| Risk | Provisional dependants can drift before joint acceptance |
| Equivalent control | Exact predecessor inventory, transitive invalidation, coherent package review and final human acceptance before execution |
| Rollback | Stop trial cadence and resume ordinary current-policy gates; preserve all drafts and evidence |

## Measurement

Record review sessions and rounds, owner interruptions, repeated checks,
recovery events and elapsed effort where observable. Preserve the installation
baseline as one observed case, not a population average. Do not count fewer
controls or omitted evidence as efficiency. No user decision or approval is
inferred from a timer or exhausted retry/review budget.

## Trial status

COMPLETED; the scoped authority expired when WB38 implementation and final
validation completed. The [WB38 workflow](deliveries/WB38/workflow.md) is
COMPLETE while its archive/reset publication package is reviewed. All six tasks
and final validation are merged; the accepted conclusion is preserved in the
[archive candidate](archive/WB38/solution-whiteboard.md). No standing authority
carries to the next need. Runtime cleanup, pin upgrade, branch deletion and
adoption activation were not authorized by this trial.
