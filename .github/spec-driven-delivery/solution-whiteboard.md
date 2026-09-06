# Whiteboard — WB62 agent judgment and essential evidence

## Control

| Field | Value |
| --- | --- |
| Topic | [#62](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/62) and [#54](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/54) |
| State | CONCLUDED |
| Owner | Repository owner |
| Conclusion review | APPROVED; both R02 seats and owner accepted 456b3fc2459be4f3ddc5ca7f649a533dd4e48996; [WB62 review record](reviews/WB62-S01.md#owner-acceptance) |
| Updated | 2026-09-06 |
| Handoff / workflow / plan | Not generated |

The owner accepted the four goals and overall direction, then explicitly
discarded the prior WB33 working draft and authorized runtime recovery and this
priority change. This synthesis is not yet an independently reviewed conclusion
or an active policy. WB38 accepted history remains unchanged.

## Agreed goals

| Goal | Meaning |
| --- | --- |
| Clear boundaries | Explicit scope, protected constraints, quality expectations and owner authority |
| Stable outcomes | Demonstrate that agreed requirements hold across different execution approaches |
| Key information only | Retain what supports decisions, verification, recovery or maintenance |
| Proportional effort | Match process and documentation to value, complexity and risk |

Agent judgment is the means to achieve these goals, not permission to expand
authority or bypass necessary controls.

## Problem and evidence

Issue62 addresses procedural rigidity and repeated stops. Issue54 reports 56
full-file snapshots adding 39,657 lines despite recoverable Git history; that is
reported incident evidence, not a fresh downstream audit. Following detailed
instructions can produce substantial work without demonstrating better quality.
The solution must reconcile conflicting source instructions, not merely add a
“be flexible” paragraph above them.

## Scope and authority

Use the [registry](project-contracts.md), [manifest](project-adoption-manifest.md),
[Contributing](../../CONTRIBUTING.md), [quality policy](../../docs/documentation-quality-policy.md)
and [template governance](../../docs/template-governance.md).

In scope: reusable policies, review guidance, affected skills/templates,
examples and maintained README summaries; existing authorization, bounded
recovery, proportional execution and essential evidence retention.

Out of scope: implementing #33/#34/#36, silently upgrading installed projects,
blanket auto-merge, weakening safety/quality, and bulk historical deletion.
U84 remains a separate pending upgrade. Current pin stays unchanged.

## Proposed solution

| Area | Direction | Boundary |
| --- | --- | --- |
| Instructions | Separate mandatory outcomes/constraints from adaptable defaults and illustrative examples | Do not silently reclassify actual policy obligations as optional |
| Execution | Let agents choose sequencing, diagnostics, grouping and routine reversible recovery | Escalate consequential unresolved decisions, conflicts or missing authority |
| Approval | Reuse applicable existing authorization | Changed scope or a genuinely new acceptance boundary still needs its owner |
| Evidence | Prefer retained Git candidate/base commits and concise review history | A hash alone is not retrievability; preserve findings and their resolution |
| Documentation | Keep one canonical source and link consumers to it | Reconcile contradictions in existing consumers, not just add more prose |
| Canonical consistency | Policies, contracts and applicable owner decisions must agree within their scope and version | Do not silently choose between conflicting owners or treat a link as resolution |

Recommended: a small outcome-and-boundary contract integrated into existing
authorities, supported by representative cases rather than exhaustive rules.

Alternatives not preferred: retain rigid rules and add exceptions for every
incident; remove rules broadly and trust the agent; impose fixed line-count or
snapshot-count blocking thresholds. Each either recreates complexity or loses
the contextual judgment and assurance sought here.

## Essential information

| Keep when decision-useful | Usually avoid duplicating |
| --- | --- |
| Accepted requirements, decisions and important reasons | Raw conversation and repeated summaries |
| Maintained contracts, implementation, tests and user guidance | Competing copies of canonical content |
| Retrievable reviewed revisions, findings, resolutions and acceptance | Full-file snapshots recoverable from retained Git commits |
| Meaningful validation, limitations and unresolved risk | Every successful command's full output |
| Unique failure/non-Git evidence needed for diagnosis or recovery | Temporary diagnostics without continuing value |

These are judgment examples, not an exhaustive retention checklist. Ask what
important understanding or recovery ability would be lost without the record.
Existing evidence is not deleted by this design; any later authorized pruning
must first verify recoverability and necessary context.

## Risks and validation direction

| Risk | Proposed response |
| --- | --- |
| Flexibility hides skipped controls | Require evidence of outcomes and preserved authority |
| Concision loses context | Retain what, why, verification and uncertainty |
| Guidance conflicts across documents | Trace canonical owners and reconcile affected skills, templates, examples and README |
| Proportionality becomes another rulebook | Use a few realistic cases and justify additional process |

Evaluate unchanged authorization across turns, related corrections, reversible
recovery, changed scope, uncertain destructive effects, unavailable evidence,
Git-backed multi-round review and necessary raw/non-Git evidence. Confirm both
successful work and correct escalation. Fewer stops or shorter files alone do
not prove improvement. No scenario execution or measured savings is claimed yet.

## Canonical-source reconciliation and design decisions

Owner clarification on 2026-09-06 makes mutual canonical consistency a hard
boundary within the four goals. Consistency means compatible obligations for
the same scope/version, not identical text or automatic adoption of latest
source. Legal/security obligations remain above project choices; owner
decisions bind their authorized scope and cannot silently amend higher rules.

The quality policy remains the authority for consistency and minimum evidence;
template governance owns reusable ownership/versioning; Contributing owns
project delivery/merge choices. Skills and generated guides execute those
contracts rather than create competing policy. Where precedence and approved
intent are clear, the agent can repair a stale subordinate description within
scope and submit required review. A genuinely conflicting policy or owner
decision blocks only affected consumption until its owner reconciles it.

| ID | Source evidence at main d93d27a | Classification and planned correction |
| --- | --- | --- |
| C01 | [Quality policy §§1, 2.3–2.4](../../docs/documentation-quality-policy.md#1-control-and-authority) | Already requires ownership and precedence, but should explicitly require mutual canonical consistency and authority-aware resolution; do not introduce a second precedence table |
| C02 | [Workflow skill action gate](../../skills/sdd-project-workflow/SKILL.md#action-and-freshness-gate), generated execution text in install-sdd.sh | Per-edit wording can overconstrain execution; distinguish actions inside an authorized unit from its actual acceptance boundary, and reconcile generator and skill together |
| C03 | [Batch contract](../../docs/batch-review-and-recovery.md#explicit-preparation-and-acceptance) versus ordinary workflow | Scoped alternatives, not an inherent contradiction. Preserve explicit batch authority, legal transitions and exact acceptance; do not silently turn every unbatched artifact into a batch |
| C04 | [Review protocol](../../templates/reviews/fresh-context-agent-review.md#5-durable-findings-and-resolution-history) and [retention policy](../../docs/documentation-quality-policy.md#defects-flaky-tests-and-evidence) | Add minimum retrievable evidence guidance. Immutable findings do not require duplicated source files; PR and non-PR retention remain distinct |
| C05 | Optional Reviewed snapshot in [batch contract](../../docs/batch-review-and-recovery.md#explicit-preparation-and-acceptance) and scripts/sdd-lifecycle.mjs | This is a real checker-consumed comparison input, not merely a redundant review archive. Retain it where that mechanism needs local bytes; explain necessity rather than deleting it or inventing unsupported Git resolution |
| C06 | [Template governance](../../docs/template-governance.md), [Contributing](../../CONTRIBUTING.md), README and review/phase templates | Reconcile consumers with the canonical changes; preserve accepted history and label version/opt-in differences instead of calling them inconsistent |

Proposed implementation keeps machine-readable schema fields, state transitions,
review quorum, approval invalidation, merge protection, retry bounds and
retention deadlines unchanged. Discretion concerns means inside those adopted
boundaries. A discovered need to change one of those contracts must be reported
as a design amendment, not hidden in guidance. Installed projects keep their
pin and policies until reviewed adoption; source improvement is not activation.

## Design-to-delivery proposal

One coherent implementation unit is proposed because policy and evidence
guidance must agree when delivered. The table is a planning proposal inside the
whiteboard, not a generated plan or readiness claim; the pinned workflow still
requires an approved conclusion and routing before creating execution artifacts.

| Design point / source | Proposed task and work | Validation | Consistency / gap |
| --- | --- | --- | --- |
| Four goals; C01–C03 | T01: integrate outcome/boundary guidance into existing policy and reconcile skills/generated guide; reuse applicable authorization and permit proportionate methods | Same-authority conflict, stale subordinate summary, unchanged approval, routine recovery, scope expansion and destructive-uncertainty scenarios | Do not grant missing authority or bypass current schema/quality gates |
| Essential evidence; C04–C05 | T01: define Git-first retrievable candidate evidence, concise history and justified raw/non-Git/checker-required material | Multi-round Git candidate without duplicate copies; unique raw evidence retained; missing content cannot be approved from a hash; checker snapshot case remains supported | No historical deletion or new arbitrary snapshot-volume gate |
| Canonical consistency; C06 | T01: reconcile README, diagrams, policy/skill/template references and one maintained scenario | Complete source impact inspection plus documentation/regression suite and two-agent review | No claim that syntax checks prove semantic agreement |
| Compatibility | T01: record unchanged schemas/pins and adoption implications; keep source behavior changes visible | Existing version fixtures; real generated-guide/installed-skill checks where text changes; full regression | If machine semantics must change, return for scoped design amendment |

Planned implementation paths: docs/documentation-quality-policy.md,
docs/template-governance.md, docs/batch-review-and-recovery.md, affected sections
of docs/project-adoption-runbook.md, CONTRIBUTING.md, README.md, CHANGELOG.md,
skills/sdd-project-workflow/SKILL.md, skills/sdd-project-adoption/SKILL.md,
skills/sdd-playbook-upgrade/SKILL.md, install-sdd.sh generated guidance only,
templates/reviews/ and affected phase-template guidance, one maintained example,
and corresponding tests. This is an impact inventory, not permission for
unrelated cleanup or edits to runtime resolution/ownership logic.

T01 has no implementation predecessor; approved design, routing and complete
task/context specification are prerequisites. Proposed PR boundary is one
self-contained implementation PR to main after readiness, with required checks,
two independent reviewers and owner merge acceptance. No auto-merge selected.
Rollback is a reviewed revert of the coherent source change, preserving
historical evidence. No new package, daemon, configuration DSL or threshold
checker is needed. Performance savings remain unmeasured.

## Owner review brief

| Type | Item | Result / requested acceptance |
| --- | --- | --- |
| DECISION | Formal design candidate | Accept the four-goal design, canonical-consistency boundary, C01–C06 corrections and proposed single-unit T01 scope after independent review; permits subsequent routing/planning, not implementation or merge |
| ATTENTION | Source boundary | Source base d93d27a33c43c1574aeed27044654c8964cf998b; installed pin d213114f99dc2186d6f4e50a85fe962de0e1afa9 unchanged. Proposed changes are not active installed policy |
| ATTENTION | Exact acceptance identity | The complete whiteboard and manifest are the subject; the [acceptance identity record](reviews/WB62-S01.md#acceptance-identity) owns their full immutable candidate commit and hashes outside the reviewed bytes |
| ATTENTION | Controls retained | Safety, scoped authority, actual tests/review/merge gates, schemas, retry/retention contracts remain; execution steps are adaptable within them |
| ATTENTION | Evidence qualification | Git-first does not mean deleting unique logs or checker-required local snapshots; exact reviewed bytes remain recoverable |
| ATTENTION | Risks / deferred work | Semantic consistency needs review; actual scenario validation remains implementation work. No measured savings. Runtime group and U84 remain deferred |
| ATTENTION | Current checks | Local Markdown, structure, lifecycle, Mermaid, whitespace and 99 tests passed; runtime CURRENT. Package components ran directly under Node 24 because npm was unavailable. Brief-only corrections receive targeted checks; no CI, external-link advisory rerun or design-scenario execution claimed. Detailed commands/results in the review record |

No unresolved owner preference is identified. Independent review may reveal a
material design gap; the agent must not fill such a gap with invented authority.

## Decisions and next action

| Item | State |
| --- | --- |
| Four goals and solution direction | Accepted by owner in discussion |
| Priority over runtime group | Explicit owner direction |
| WB33 working draft | Discarded by owner; temporary recovery copy retained |
| Runtime access | Recovered at unchanged pin; CURRENT |
| Canonical consistency boundary | Explicit owner direction; incorporated above |
| Source impact/compatibility analysis | C01–C06 mapped; implementation must verify the complete changed-source impact |
| Formal conclusion / independent review | Candidate prepared; review pending; state remains CONVERGING until acceptance |
| Implementation | Not started |

Next: exact-candidate independent review, then owner acceptance of this design
and task proposal. Formal handoff, execution plan and readiness are not yet
generated; discussion acceptance is preserved but is not review of unseen bytes.

This is the sole active working discussion. The earlier standalone #62/#54
discussion file is superseded by this repository record. On actual delivery
completion follow the [archive contract](archive/README.md); do not represent
discarded or unfinished work as delivered.
