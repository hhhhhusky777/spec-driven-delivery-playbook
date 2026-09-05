# T06 — Restore ordinary v4 workflow bootstrap

## Completion

The owner accepted PR52 after both retained R02 reviewers approved exact
`080cbf49e1fc353fb54b30551b6b08122fcc68a3`. Squash merge
`15a648f06e22db4b195af683f2f76d62c87dcdff` is verified on main with an identical
tree. Post-merge docs:all passed 90 tests, zero failures/skips, plus Markdown,
structure, lifecycle and Mermaid checks. T06 is DONE. Earlier pending statements
below preserve candidate history. Renewed final validation remains separate.

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

## Candidate validation and self-review

Candidate WB38-T06-R01 is published through [PR52](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/52).
The exact committed revision is supplied in the retained review packet.

| Control | Evidence |
| --- | --- |
| Startup | All six early states pass the complete lifecycle checker with explicit None and no plan file |
| Failure boundaries | Supplied missing plan, batch deferral, produced output and blocked recovery reject no-plan state; readiness requires reciprocal plan |
| Compatibility | Existing v2/v3 and v4 reciprocal authority/output tests pass; frozen schemas unchanged |
| Full checks | docs:all: 90 passed, zero failed/skipped; Markdown, structure, lifecycle and Mermaid passed |
| Evidence graph | Original R2 finding accepted; final record now consumes separate T01/T02/T03 output identities, policy/consumer rows reconciled |
| Incomplete gates | Both retained reviewer receipts, human acceptance, corrective merge and final closure remain pending |

Self-review: SELF_REVIEW_PASSED for the candidate scope, source boundary,
startup behavior and preserved readiness failures. Original PR51 findings are
not marked resolved by the author; both are ACCEPT with correction pending
review. No new external-link claim or README lifecycle diagram changes are
introduced: the existing ordinary sequence is restored, not redesigned.

PR51 merged while final review requested changes. Final record R01 is historical
candidate evidence, not proof of accepted validation. No archive or cleanup is
authorized by that merge. This record is not a review approval or completion claim.
