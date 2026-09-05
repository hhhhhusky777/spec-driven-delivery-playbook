# T06 — Restore ordinary v4 workflow bootstrap

## Approved corrective scope

The owner approved this bounded corrective task after final review and renewed
continuation after PR51 merged as `1d667356d9a652c15fc197fbd97e0a977b2ef32d`.
This restores the accepted R01-R03 readiness contract, not a new design.
Final validation and archive remain incomplete; the merge did not resolve
WB38-FINAL-S01-R1-F01 or WB38-FINAL-S01-R2-F01.

| Item | Contract / acceptance |
| --- | --- |
| Outcome | Ordinary early v4 workflow can explicitly record no plan until its owning action creates one |
| Mandatory boundary | GATES_READY and later require full reciprocal plan, authority, task and output validation |
| No bypass | A supplied invalid plan remains an error; batch authority, blocked-state recovery and completed evidence cannot evade validation |
| Compatibility | Frozen v2/v3 unchanged; installed runtime and pin unchanged |
| Tests | Early unbatched startup without a plan; readiness rejection without one; present invalid plan rejection; existing reciprocal/output/authority regressions |
| Scope | Lifecycle checker/tests, workflow template and corresponding guidance; WB38 control and review evidence |
| Evidence correction | Register actual completed outputs for final validation, preserving specification IDs and historical receipts |
| Source | Main merge 1d667356d9a652c15fc197fbd97e0a977b2ef32d; issue 46 and PR51 final review findings |
| Routing | Single corrective task branch from merged main, follow-up PR to main; human review before merge |
| Review | Same retained final R1/R2 seats review corrections against the exact candidate |
| Recovery | Reviewed forward fix; no automatic revert, archive, cleanup or protection bypass |

## Readiness and execution evidence

Runtime validation reports CURRENT. The branch starts from verified merged
main; the existing workflow evidence correction was preserved. Dependencies
T04/T05 are merged. No dependency, credentials, external service, or product
decision is introduced. The owner-approved observable correction above is the
task specification; internal implementation remains bounded by it.

Implementation and regression validation are pending. This record is not a
review approval or delivery-completion claim.
