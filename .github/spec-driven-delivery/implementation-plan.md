# Implementation Plan — Human implementation review before final validation

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority. The PR owns review, approval
and run evidence; task states describe the candidate's resulting repository state.

## Delivery status

| Field | Value |
| --- | --- |
| State | `VALIDATING` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | Human implementation acceptance before final-test work |
| Implementation mode | Human-review-before-merge; Autopilot not enabled |
| Authorized scope / feature branch / protected target | No automatic merge authority; single-unit delivery; main |
| Delivery branch / target | codex/pre-validation-human-review / main |
| Owner | Repository owner |
| Primary issue / need | [#179](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/179) |
| Concluded whiteboard | [Accepted design](solution-whiteboard.md), conclusion commit 3fae987091f0f4781c0193cc56cf5ea87a68f043 |
| Required reviewers | The same two isolated issue179 reviewer sessions |
| Last verified | 2026-10-23: T01 implementation and focused checks complete; pre-final implementation audit requested; full validation remains unrun and Autopilot remains disabled |

## Governing inputs and delivery boundaries

The [whiteboard](solution-whiteboard.md) owns D01–D07 and approved V01 / FC01.
[Contributing](../../CONTRIBUTING.md) owns branching and merge authority;
the [quality policy](../../docs/documentation-quality-policy.md) owns project
checks; [template governance](../../docs/template-governance.md) owns template
consistency. The owner confirmed the implementation-level review and requested
a concise response table supporting a decision to change code or start final
tests. This refines D03 / D04 and the existing human-brief authority.

One implementation unit is sufficient: one portable contract and its existing
consumers change together. No new tool, template, tracker, diagram generator,
runtime state engine, business behavior or unrelated policy is introduced.
Material assumptions and unresolved scope gaps: `None`.

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| D01 / D02 | T01: extend the existing audit with human acceptance before final-test work, including Autopilot and Fast Fix | Walk ordinary, Autopilot and single-unit routes | Aligned; task-focused tests unchanged |
| D03 / D04 | T01: require a concise decision table and three actual code-level flow views in the reply | Review complete briefs, code references, notation and justified N/A | Aligned; no separate diagram document |
| D05 | T01: preserve acceptance only while the audited implementation content is unchanged | Walk implementation-change and test-only cases | Aligned; existing invalidation boundary reused |
| D06 | T01: keep the detailed contract in workflow skill; reconcile reviewer guidance, policy, CONTRIBUTING, plan and README diagrams | Semantic cross-document review, links, focused checks and Mermaid | Aligned; no duplicate contract owner |
| D07 | T01: complete the accepted in-place upgrade to 814cdf768d72d57d962c51d9e5ad1cae8aa0246f using the installer | Accepted runtime CURRENT and managed skill/KB parity | Cutover complete; accepted runtime validates CURRENT |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | DONE | None | Portable, concise human implementation-review contract with consistent consumers and installed runtime | D01–D07; human decisions and main merge remain separate | Focused changed-file checks and existing installer regression; pre-final review, human implementation acceptance and full source validation remain delivery gates | codex/pre-validation-human-review; [PR #180](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/180); main |

## Task specifications and context receipts

### T01 — Code-grounded human decision before final tests

| Concern | Value |
| --- | --- |
| Source boundary | skills/sdd-project-workflow/SKILL.md; skills/sdd-feature-review/SKILL.md; docs/documentation-quality-policy.md; CONTRIBUTING.md; templates/delivery/implementation-plan.md; README.md; affected existing tests/document-model.test.mjs diagram assertion; installer-managed accepted runtime material and manifest |
| Consumed dependencies | Accepted D01–D07; project authorities; immutable upgrade candidate 814cdf768d72d57d962c51d9e5ad1cae8aa0246f |
| Critical obligations | Keep focused checks, retained review independence, design scope, final human merge authority and content-bound acceptance intact |
| Context receipt | Authorities, skills, template and README audit/Autopilot paths inspected; existing audit is the sufficient shared boundary; no future implementation output is a readiness prerequisite |
| Required evidence | Focused Markdown/link/lifecycle/Mermaid checks; skill frontmatter validation; applicable existing installed-profile regression; independent semantic walkthroughs; full applicable source checks only at the final gate |
| Actual result | Portable human implementation-review section, existing consumer links and README flow diagrams implemented; affected existing contract-routing/topology assertions updated; accepted runtime cutover complete |

The workflow skill owns the response requirements. Keep its wording short and
normative. Require a concise parent-response table containing these fields:

| Information | Required content |
| --- | --- |
| Implementation / design conformance | What changed and whether the actual implementation matches the accepted design; identify deviations |
| Code-level flows | Render business, error-handling and data-flow diagrams in the reply using suitable established notation; reference actual code and explain any N/A |
| Review findings | Concrete examples, author solutions/dispositions and unresolved findings, or None; reuse the existing findings table |
| Risks / limits / unknowns | Material tradeoffs, accepted limitations and unresolved items, or None; preserve the existing separate material-assumptions table |
| Validation | Focused results and remaining tests to add/run; do not imply full validation passed |
| Recommendation / decision | Author recommendation, both reviewer conclusions, and explicit choice: change implementation or accept it and begin final-test work |

Acceptance here is not full-validation evidence or final merge authority.
Existing generic tables need not be duplicated: include or link their rows in
the same reply while keeping the three actual flows directly visible.

## Test and acceptance contracts

| Owning task | Contract, changed outcome, or risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| T01 | Portable contract and installation routing | Existing workflow/review profile round-trip regression; skill validators | Existing; no new installer mechanism required | Focused task checks |
| T01 | Consistent documentation and rendered flow positions | Changed-file lint/structure/lifecycle checks and affected Mermaid blocks | Existing tooling | Focused task checks |
| T01 | Human acceptance, code-grounded brief and invalidation | Independent ordinary/Autopilot/Fast Fix, missing acceptance, code-change, test-only and N/A walkthroughs | Reviewer evidence required | Task review and pre-final implementation audit |
| T01 | Source-wide compatibility | npm run docs:all on the exact final reviewed candidate | Existing full suite; not yet run for this delivery | Final gate, after human implementation acceptance |

Record any genuinely missing tests here with their owner and final-gate
obligation; do not add prose-matching tests merely to lock the new wording.

## Recovery, decisions, and change control

Use the [canonical error-handling framework](../../docs/error-handling.md).
Known bounded agent mistakes are corrected within authority; material scope
changes require the existing owner-authorized amendment process.
V01 / FC01 are already accepted; this plan adds no validation or fail-close
behavior beyond them. Detailed findings and dispositions remain in PR #180.

## Plan validation and completion

### Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | Complete D01–D07 mapping and no unexplained additions | T01 implementation complete; exact-candidate review evidence belongs in PR #180 |
| Implementation reviewed | Author and both retained reviewers approve the same content; human accepts the code-grounded brief before final-test work | Pending |
| Applicable validation passed | Focused evidence, complete required test coverage and full applicable final source gate | Pending; no unrun gate is claimed passed |
| Current reusable installation | Accepted immutable pin, runtime CURRENT and complete installed KB/skill parity | Complete at 814cdf768d72d57d962c51d9e5ad1cae8aa0246f; new source guidance is a separate unmerged candidate |
| PR-owned delivery | Exact-head review, owner merge authority and target verification | [PR #180](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/180) owns live evidence |
| Merge-ready state and cleanup | Converged tracked state, complete combined archive, live plan removal and whiteboard reset only after named owner authorization | Not yet authorized or performed |

### Planned versus actual outcome

| Design / task | Planned result | Actual evidence or deviation | Remaining obligation / owner |
| --- | --- | --- | --- |
| D01–D07 / T01 | One coherent portable gate and consistent consumers | Implemented with focused evidence; no design deviation | Exact-candidate audit, human implementation acceptance, final validation, authorized tracked closure and merge |

### Cleanup inventory

| Item | Keep, archive, remove, or reset | Ownership and evidence | Result |
| --- | --- | --- | --- |
| Manifest, reusable guidance and project Experience | Keep | Canonical reusable project sources | Preserved |
| Complete whiteboard and final plan | Combined archive; then remove live plan and reset whiteboard | Normal-delivery completion contract; requires named prior owner authorization | Pending; no reset authorization assumed |
| Delivery worktree and merged branch | Remove only after authorized merge and exact-target verification | Owned worktree recorded in PR #180 and codex/pre-validation-human-review | Pending |
| Installer-owned temporary runtime | Retire superseded checkout through installer ownership checks | Generated ownership markers | Superseded owned checkouts retired during accepted cutover; current runtime remains until worktree cleanup |

## Human review brief

One task, one branch and one PR. Human-review-before-merge remains the default.
Ask whether to enable Autopilot at this plan gate; recommend leaving it off
because this single-PR unit has no intermediate feature-task merge to automate.
Neither choice bypasses the human implementation review or final main merge.
The next implementation review presents the decision table and applicable
actual flow views; no production runtime flow is invented for documentation.
