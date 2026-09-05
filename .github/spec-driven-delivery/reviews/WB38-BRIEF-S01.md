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
