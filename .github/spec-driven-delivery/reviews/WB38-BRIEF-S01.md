# Human review brief governance package

| Field | Value |
| --- | --- |
| Session / round | WB38-BRIEF-S01 / R01 |
| Candidate | Exact published head supplied at dispatch |
| Base | b5600e86914f2c14b1039427bfc5ef5a8a8826eb |
| Scope | [Owner-requested amendment and task](../deliveries/WB38/review-brief-amendment.md) |
| Seats | /root/wb38_brief_r1, /root/wb38_brief_r2; initial context inheritance disabled |
| Review authority | Current project policy and pinned two-reviewer protocol; no merge/activation authority |
| Non-scope | T02 helper changes, extra review gates, issue43 checker implementation, runtime/pin changes or cleanup |

SELF_REVIEW_PASSED: canonical quality policy owns phase-specific briefs;
consumers link rather than copy the requirement. README explains the new
presentation and unchanged diagrams/gates. Missing/stale/incomplete briefs
block human acceptance requests, not trigger a new full review session. The
test protects policy wording/consumer wiring with missing-clause negative
fixtures; it does not certify semantic completeness of actual human briefs.

Reviewers must independently inspect full scope, controls and consumer paths.
As a semantic negative walkthrough, a planning brief containing only passing
tests must fail for missing design/task comparison, risks and acceptance scope;
an adoption brief listing file names but omitting policy gaps and activation
status must fail. A complete brief must preserve ordinary versus batched gate
boundaries. Report actual walkthrough results; no proposed disposition supplied.

T02 remains separately reviewed on PR44; this feature-based branch does not
rewrite that candidate. Source documents remain provisional until reviewed
owner acceptance and merge; installed pinned copies are untouched.

## R01 findings and R02 correction

Both seats returned CHANGES_REQUESTED on
0dc5e45d6f9f3b8263f6ab1333e8eac6d335ae3c. R1 independently passed 73 tests;
R2 passed 34 documentation tests; both verified runtime, exact remote head and
hosted CI. Both semantic negative walkthroughs correctly rejected incomplete
briefs, and neither found an extra review gate introduced.

| Original finding IDs | Observed issue | Author response | Resolution |
| --- | --- | --- | --- |
| WB38-BRIEF-S01-R1-F01; WB38-BRIEF-S01-R2-F01 | Workflow live summary mixed T03/BRIEF with T01/PR42 routing | ACCEPT; reconcile live summary/link labels and plan current summary; preserve historical planning as labeled history | Pending same-seat review |
| WB38-BRIEF-S01-R1-F02; WB38-BRIEF-S01-R2-F02 | Mandatory new behavior lacked a worked example per Template Governance | ACCEPT; extend the existing expressly simulated example with adoption and planning briefs, including uncovered retention and non-code guidance | Pending same-seat review |

The example path is an ordinary required implementation dependency of the
owner-authorized reusable brief change; it is added to the amendment/write
scope. No historical observed outcome is rewritten. R02 self-review passed:
example demonstrates explicit scope, sources, decisions, attention, risks,
unrun tests and withheld acceptance on gaps. State reconciliation is separated
from the still-open T02 branch and does not claim its merge.
