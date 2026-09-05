# Requested amendment — phase-specific human review briefs

## Status and authority

Owner-authorized draft governance package; source guidance and template changes
are prepared for review, not merged or active. Preserve accepted WB38-R03/P04
and the reviewed T02 PR candidate. Owner instruction: “Then add it.”
The owner's latest instruction withdraws the proposed separate whiteboard
review gate. Keep the existing combined planning review and acceptance boundary.
Present the concluded whiteboard's key design points together with the
implementation-plan task summary so the human can compare them for consistency.
The adoption summary of discovered contracts and selected policies remains.
No extra human or two-subagent review stop is introduced by this amendment.

## Current coverage and gap

BC07 and shared guidance already require decision/attention tables. Adoption
templates contain authority/conformance inventories, whiteboard templates have
requirements/design/contracts, and plans contain task ledgers/specifications.
Their existence is not a guarantee that the owner receives a concise,
phase-specific review brief. The batched route currently includes the formal
conclusion inside combined planning acceptance; that boundary stays unchanged.

| Gate | Required concise owner brief |
| --- | --- |
| Adoption acceptance | Discovered system contracts and authoritative sources; policies reused/updated/generated and why; gaps, conflicts, deviations and deferred obligations; owners; testing/review/merge rules; pin/runtime and activation status; exact acceptance scope |
| Combined planning acceptance — design | Problem and expected outcome; scope/non-scope; key solution and contract decisions; alternatives/trade-offs; risks and assumptions; acceptance criteria; exact whiteboard version |
| Combined planning acceptance — task summary | Task ID, brief work/outcome per task, dependency/order, acceptance evidence and merge unit; cross-task risks, exclusions and readiness blockers; exact plan version |

Present these two planning views together, with an explicit comparison table:

| Design point / source | Planned task(s) and brief work | Validation | Consistency / gap |
| --- | --- | --- | --- |
| Stable design ID and key decision | Mapped task IDs and intended outcomes | Acceptance evidence or test | Aligned, missing coverage, deviation, or decision needed |

Include uncovered design points and tasks without a design basis, rather than
showing only successful mappings. Flag conflicts, omissions and justified
non-code obligations; do not equate presence of a task with fulfilled design.
Links point to canonical sources, not a second independently maintained design.

Every brief distinguishes DECISION from ATTENTION, names the requested human
response, links to canonical detail and states explicitly when no open decisions
remain. Do not substitute a tests-passed table or require the owner to find
these items across long source documents. No automatic design acceptance.

## Impact boundary

Reconcile canonical batch policy/diagrams, discovery and planning templates,
adoption guidance, skills and review brief consumers together under reviewed
scope. This is reusable playbook behavior, not just this repository's formatting.
It does not change T02 helper behavior, grant merge authority, or authorize
editing the accepted conclusion in place. Implementation is outside T02's
current helper-only write scope. This separate governance package is the bounded
follow-up; its exact scope is listed below. No executable product behavior or
new review boundary is introduced.

## Follow-up task T03 — required phase-specific human briefs

| Field | Specification |
| --- | --- |
| Outcome | Every human gate supplies a concise, current decision/attention brief; planning compares design and tasks |
| Dependency | T01 merged/current; independent of T02 helper implementation |
| Source | Accepted BC07 plus the owner's latest amendment; original conclusion stays immutable |
| Write scope | README.md; docs/documentation-quality-policy.md; docs/batch-review-and-recovery.md; templates/adoption/project-adoption-manifest.md; templates/discovery/solution-whiteboard.md; templates/delivery/implementation-plan.md; templates/reviews/fresh-context-agent-review.md; tests/documentation-quality.test.mjs; examples/batched-delivery/README.md; WB38 delivery and review records |
| Non-scope | Extra review gates, T02 changes, issue43 impact-map checker, credentials, runtime pins, archive or cleanup |
| Acceptance | Canonical phase requirements and fail-closed human-handoff rule; consumers linked; README reconciled; tests and two independent reviews; owner acceptance before merge |
| Compatibility | Presentation and semantic review obligation; existing state machines and batching boundaries unchanged; existing installed pins are not silently updated |
| Merge unit | Separate governance PR to the feature integration branch; manual owner acceptance required |

## Change-to-consumer reconciliation

| Changed requirement | Consumer / evidence |
| --- | --- |
| Universal human brief and phase content | Quality policy section 2.6 owns the rule and checklist |
| No added gate; planning comparison | Shared batch discussion section and README reviewability explanation; diagrams inspected, boundaries unchanged |
| Adoption/design/task handoff | Three source templates link the canonical rule with local consequence |
| Agent forgetfulness | Review protocol requires independent brief verification before human handoff; semantic gate, not automated completeness certification |
| Runtime skills | Existing skills invoke the review protocol and canonical policies; source behavior unchanged, installed copies/pin untouched |

Acceptance of this package adds T03 to WB38 closure obligations; no entire
delivery completion may be claimed with this requirement unmerged. It does not
alter T02's exact-head approval or grant T02 merge authority.
