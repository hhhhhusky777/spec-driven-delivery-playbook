# WB62 — delivery routing

<!-- sdd-schema: delivery-workflow@4 -->

## Owner review brief

| Type | Item | Meaning |
| --- | --- | --- |
| DECISION | Planning package acceptance | Accept v4 mapping, FULL plan/audit and substantive T01 context together; final fresh readiness and owner merge authority remain |
| ATTENTION | Design alignment | Four goals and C01–C06 from the accepted whiteboard remain unchanged; canonical consistency is a boundary |
| ATTENTION | Task proposal | T01 aligns existing policy, skills/generated guidance, evidence retention and affected consumers/tests |
| ATTENTION | Minimal artifacts | Reuse existing authorities; put the existing-source impact audit and task specification in the FULL plan, not new parallel policy/ADR files |
| ATTENTION | Compatibility | Preserve machine schemas, quorum, acceptance boundaries, retry/retention limits and installed pin; required local snapshots remain |
| ATTENTION | Deferred | Runtime #33/#34/#36 deferred; U84 publication included by owner amendment |
| ATTENTION | Evidence | Exact candidate and actual local check results belong to the linked review record; no implementation, CI or scenario-execution claim |

## 1. Workflow control

| Field | Value |
| --- | --- |
| Review batch | [Planning batch](planning-batch.md) |
| Implementation plan | [FULL plan](implementation-plan.md) |
| Delivery | WB62 — agent judgment and essential evidence |
| State | MANIFEST_IN_REVIEW |
| Previous state | ROUTING |
| Owner | Repository owner |
| Concluded whiteboard | [Whiteboard](../../solution-whiteboard.md) |
| Approved workflow handoff | [Handoff](handoff.md) |
| Consumed handoff version | 4b18100a722aa06baba7643b67e01185108a8635 |
| Whiteboard conclusion version/date | 77a738d60f245fa1752b4cb25d1c3e788455e1fd / 2026-09-06 |
| Trigger mode | MANUAL_INVOCATION |
| Trigger identity/run ID | Coordinating agent / WB62-ROUTE-20260906-01 |
| Selected route | Route 3 — systemic guidance change using existing authorities and FULL plan |
| Manifest review state | IN_REVIEW |
| Current artifact/gate | This routing manifest |
| Current review phase | DESIGN |
| Current review target ID | workflow |
| Current artifact review state | IN_REVIEW |
| Self-review state | SELF_REVIEW_PASSED |
| Self-review candidate revision | WB62-P01-R04 |
| Self-review evidence | [Routing review](../../reviews/WB62-P01.md) |
| Fresh-context review state | APPROVED |
| Fresh-context review session ID | WB62-P01 |
| Fresh-context assigned reviewers | wb62_planning_r1, wb62_planning_r2 |
| Fresh-context required approvals | 2 |
| Fresh-context approved reviewers | wb62_planning_r1, wb62_planning_r2 |
| Fresh-context reviewed revision | WB62-P01-R04 |
| Fresh-context review evidence | [Routing review](../../reviews/WB62-P01.md) |
| Human review state | NOT_STARTED |
| Human reviewed revision | Not recorded |
| Human review evidence | [Review record](../../reviews/WB62-P01.md#owner-package-acceptance) |
| Implementation continuation mode | NOT_SELECTED |
| Implementation mode authority | [Owner mode record](../../reviews/WB62-P01.md#implementation-mode-authority) |
| Implementation mode scope | Not selected |
| Implementation repository | Not selected |
| Implementation mode selected at | Not selected |
| Next action | Owner acceptance of exact R04 package |
| Next action target IDs | workflow |
| Allowed write scope | .github/spec-driven-delivery/deliveries/WB62; .github/spec-driven-delivery/reviews; .github/spec-driven-delivery/project-adoption-manifest.md; .github/spec-driven-delivery/project-contracts.md; .github/spec-driven-delivery/agent-trigger.md; .github/spec-driven-delivery/playbook-upgrade-assessment.md; CONTRIBUTING.md; README.md; CHANGELOG.md; docs/documentation-quality-policy.md; docs/template-governance.md; docs/batch-review-and-recovery.md; docs/project-adoption-runbook.md; skills/sdd-project-workflow/SKILL.md; skills/sdd-project-adoption/SKILL.md; skills/sdd-playbook-upgrade/SKILL.md; install-sdd.sh; templates/reviews; templates/adoption; templates/discovery; templates/delivery; templates/workflows; examples; scripts/sdd-lifecycle.mjs; tests |
| Next action write targets | .github/spec-driven-delivery/deliveries/WB62/workflow.md; .github/spec-driven-delivery/deliveries/WB62/implementation-plan.md; .github/spec-driven-delivery/deliveries/WB62/planning-batch.md; .github/spec-driven-delivery/reviews/WB62-P01.md |
| Review mode | EXPLICIT_REVIEW |
| Review mode authority | Contributing review and continuation authority; pinned workflow §1.2 |
| Automation boundary | Not applicable |
| Required automatic gates | Not applicable |
| Automatic gate result | NOT_APPLICABLE |
| Semantic decision introduced | YES |
| Automation exception | None |
| Automation audit record | Not applicable |
| Last routed | 2026-09-06 Asia/Shanghai |

The review ledger records exact candidate self-review and subsequent receipts
outside the frozen candidate bytes. CURRENT means reconciled, not approved.
The verified d93d27a33c43c1574aeed27044654c8964cf998b runtime and
[preparation authority](preparation-authority.md) permit this provisional v4
planning package. The prior v2 review remains immutable Git history, not
approval of this migration. Only control
fields were changed in the handoff after its exact candidate acceptance.

## 2. Governing registry and input

| Authority | Source / applicability |
| --- | --- |
| Development, WIP, review and PR | [Contributing](../../../../CONTRIBUTING.md); existing delivery controls reused |
| Quality and minimum evidence | [Quality policy](../../../../docs/documentation-quality-policy.md); all existing checks retained |
| Ownership and compatibility | [Template governance](../../../../docs/template-governance.md); source changes not installed activation |
| Runtime and artifact locations | [Registry](../../project-contracts.md), [manifest](../../project-adoption-manifest.md), verified generated guide |
| Accepted input | [Handoff](handoff.md) §2 and [owner acceptance](../../reviews/WB62-H01.md#owner-acceptance) |

Existing authorities at source base d93d27a33c43c1574aeed27044654c8964cf998b
govern execution. T01 will propose changes to their existing source sections;
future output is not a prerequisite for preparing that same output.

## 3. Classification and route

| Dimension | Classification / consequence |
| --- | --- |
| Change / scope | Medium systemic governance and documentation contract change; FULL planning |
| Reversibility | Reviewed coherent source revert; preserve historical evidence |
| Interface / compatibility | Agent instructions and generated guidance change; machine schemas and installed pins do not |
| Data, security, concurrency | No runtime/data/concurrency logic change; existing safety and permission boundaries retained |
| Operations / performance | Guidance only; no runtime persistence fix or performance measurement |
| Uncertainty | Accepted goals and C01–C06 settled; implementation must verify affected-source completeness |

Route 3 is selected because this is systemic policy guidance, even though it
has one implementation unit. Existing canonical owners already exist; no new
specialized-policy framework or difficult-to-reverse architecture is needed.
The plan will contain the bounded existing-source impact/conformance audit
before readiness. This is not skipping audit or requiring future proposed
policy output to be approved before T01 can produce it.

## 4. Delivery manifest

<!-- sdd-section: delivery-manifest -->

| Order | Artifact ID | Artifact | Decision | Reason/trigger | Template or authority | Owner | Review owner | Review state/link |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | whiteboard | Concluded design | REUSE | Accepted C01–C06 and four goals | [Design](../../solution-whiteboard.md) | Owner | Owner | APPROVED / WB62-S01 |
| 1 | handoff | Normalized input | REUSE | Exact candidate accepted | [Handoff](handoff.md) | Owner | Owner | APPROVED / WB62-H01 |
| 2 | workflow | Routing | GENERATE | Select applicable artifacts | Pinned workflows/sdd-delivery-workflow.md | Coordinator | Two reviewers then owner | IN_REVIEW / WB62-P01 |
| 3 | plan | FULL plan including source impact audit | GENERATE_FULL | Systemic scope, one complete T01 specification | Pinned delivery/implementation-plan.md | Coordinator | Two reviewers then owner | NOT_STARTED |
| 4 | source | Existing authority and consumer source changes | UPDATE_EXISTING | T01 output implementing C01–C06; not a planning prerequisite | Accepted whiteboard source inventory | Implementer | Two reviewers then owner | NOT_STARTED |
| 5 | specialized | Separate specialized-policy file | SKIP | Existing quality/governance owners cover this guidance change | Template governance | Maintainer | Routing reviewers | IN_REVIEW |
| 6 | adr | Separate ADR | SKIP | No new significant architecture or service | Accepted handoff | Maintainer | Routing reviewers | IN_REVIEW |
| 7 | runtime | Runtime group | DEFER | Issues 33/34/36 remain outside scope | Accepted whiteboard | Owner | Owner | Deferred by design acceptance |
| 8 | validation | Final validation evidence | GENERATE | Produced after implementation | Project quality policy | Coordinator | Two reviewers then owner | NOT_STARTED |
| 9 | record | Delivery record/archive | GENERATE | After validation | Project archive contract | Coordinator | Two reviewers then owner | NOT_STARTED |
| 10 | upgrade | U84 controls | REUSE | Verified local cutover; owner requests combined publication | [U84](../../playbook-upgrade-assessment.md) | Owner | Owner | Cutover approved; publication pending |

Public application API, data migration and separate performance/security plans
are not applicable: no such executable boundary changes. Tests and source
compatibility belong to the FULL plan. Affected adoption/runbook, README,
diagrams and template guidance are part of source/T01, not separately invented
runtime work. The complete source inventory stays in the accepted whiteboard.

### Phase roles and future outputs

| Artifact ID | Role | Production phase | Required gate | Producer task | Depends on | Evidence |
| --- | --- | --- | --- | --- | --- | --- |
| whiteboard | PREREQUISITE | EXISTING | GATES_READY | NONE | None | [Design](../../solution-whiteboard.md) |
| handoff | PREREQUISITE | EXISTING | GATES_READY | NONE | whiteboard | [Handoff](handoff.md) |
| workflow | PREREQUISITE | EXISTING | GATES_READY | NONE | handoff | This workflow |
| plan | PREREQUISITE | EXISTING | GATES_READY | NONE | workflow | [Plan](implementation-plan.md) |
| upgrade | PREREQUISITE | EXISTING | GATES_READY | NONE | None | [U84](../../playbook-upgrade-assessment.md) |
| source | FUTURE_OUTPUT | IMPLEMENTATION | VALIDATING | T01 | plan, upgrade | Pending source-delivery evidence file |
| validation | FUTURE_OUTPUT | VALIDATION | COMPLETE | PHASE | source | Pending validation evidence file |
| record | FUTURE_OUTPUT | CLOSURE | ARCHIVED | PHASE | validation | Pending closure record |

| Artifact ID | State | Current version | Verified version | Change impact | Freshness | Review state | Review evidence | Blocked by |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| source | NOT_STARTED | None | None | MATERIAL | CURRENT | NOT_STARTED | None | None |
| validation | NOT_STARTED | None | None | MATERIAL | CURRENT | NOT_STARTED | None | None |
| record | NOT_STARTED | None | None | MATERIAL | CURRENT | NOT_STARTED | None | None |

### Dependency and freshness register

<!-- sdd-section: artifact-dependencies -->

| Artifact ID | Artifact/link | Depends on | Consumed version | Current version | Change impact | Freshness | Blocked by |
| --- | --- | --- | --- | --- | --- | --- | --- |
| whiteboard | [Design](../../solution-whiteboard.md) | None | 77a738d60f245fa1752b4cb25d1c3e788455e1fd | 77a738d60f245fa1752b4cb25d1c3e788455e1fd | CONTROL_ONLY | CURRENT | None |
| handoff | [Handoff](handoff.md) | whiteboard | 4b18100a722aa06baba7643b67e01185108a8635 | 4b18100a722aa06baba7643b67e01185108a8635 | CONTROL_ONLY | CURRENT | None |
| workflow | This routing candidate | handoff | WB62-P01-R01 | WB62-P01-R01 | CONTROL_ONLY | CURRENT | None |
| plan | [Plan](implementation-plan.md) | workflow | WB62-P01-R01 | WB62-P01-R01 | CONTROL_ONLY | CURRENT | None |
| upgrade | [U84](../../playbook-upgrade-assessment.md) | None | b43873a | b43873a | CONTROL_ONLY | CURRENT | None |

Plan and workflow are provisional prerequisites, not approved merely because
CURRENT. Source, validation and closure evidence remain separate future outputs.
Skipped/deferred items have no required role. Source includes T01 evidence of
actual delivered files and U84 publication; no future output is a pre-start input.

### Blockers

<!-- sdd-section: blocker-register -->

| Blocker ID | Evidence/unblock condition | Blocks | State | Owner |
| --- | --- | --- | --- | --- |

No active blocker. Required review/acceptance remains pending, not waived.

## 5. Action and review order

| Action ID | Target/output | Review mode | Mode authority | Required gates | Automation boundary | Semantic decision? | State |
| --- | --- | --- | --- | --- | --- | --- | --- |
| W01 | Routing | EXPLICIT_REVIEW | Approved handoff; pinned workflow | Local docs/lifecycle/regression and exact independent review | Not applicable | YES | ACTIVE |
| P01 | FULL plan and embedded source audit | EXPLICIT_REVIEW | Provisional preparation authority; joint acceptance required | Task completeness, docs/checks and two reviewers then owner | Not applicable | YES | PLANNED |
| T01 | Coherent source implementation PR | EXPLICIT_REVIEW | Requires approved plan/context and recorded mode | Focused scenarios, full checks, two reviewers and owner merge authority | Not applicable | YES | PLANNED |
| V01 | Final validation/closure | EXPLICIT_REVIEW | Requires complete implementation evidence | Actual validation, archive and authorized cleanup evidence | Not applicable | YES | PLANNED |

Each future action receives its exact write scope and current prerequisites
before execution. T01 uses a single task branch/PR to main; no feature branch
is needed unless scope splits into multiple merge units. Implementation mode
remains NOT_SELECTED during design. No prospective flexibility policy waives
the currently installed gates. Closure may use only explicitly authorized
control continuation under existing Contributing, not implied auto-merge.

### Artifact reviews and automatic work

| Artifact | Version | Review evidence | State |
| --- | --- | --- | --- |
| Whiteboard | 456b3fc2459be4f3ddc5ca7f649a533dd4e48996 | [Design acceptance](../../reviews/WB62-S01.md#owner-acceptance) | APPROVED |
| Handoff | 4b18100a722aa06baba7643b67e01185108a8635 | [Handoff acceptance](../../reviews/WB62-H01.md#owner-acceptance) | APPROVED |
| Routing | Exact candidate in [review record](../../reviews/WB62-P01.md) | Pending exact checks and review | IN_REVIEW |

No automatic semantic action or implementation has occurred. Manual trigger
WB62-ROUTE-20260906-01 consumes the accepted handoff once; repeat invocation
resumes this workflow instead of generating another. No handoff content changed.

### Implementation review ledger

<!-- sdd-section: implementation-review-ledger -->

| Task/PR | Head and merge commit | Implementation mode/authority | Self-review | Fresh-context review | Required checks | Merge result | Human review | Findings/follow-up |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |

## 6. Recovery and completion

Follow pinned workflow feedback/rerouting: local findings return to their owner,
changed requirements return to the whiteboard, genuine canonical conflicts stop
affected consumption. Preserve valid independent evidence; material or unknown
changes invalidate affected dependencies. Missing retrievable evidence is not
approval. T01 must not invent machine semantics or remove controls to resolve a
guidance conflict; report a scoped design amendment when necessary.

<!-- sdd-section: delivery-state -->

| Field | Current value |
| --- | --- |
| Workflow state | MANIFEST_IN_REVIEW |
| Current artifact/task | Routing; no active task |
| Current artifact review | IN_REVIEW / WB62-P01 |
| Last approved artifact | Handoff 4b18100a722aa06baba7643b67e01185108a8635 |
| Next ready action | Review the provisional routing, plan and substantive context together |
| Active blockers | None |
| Stale artifacts | None |
| Validation complete | See exact routing review record; no implementation validation |
| Validation remaining | Independent and human routing review, plan/readiness and all delivery gates |
| Branch/PR | codex/wb62-agent-judgment; local only, no PR |
| Last updated | 2026-09-06 Asia/Shanghai |

Completion requires actual T01 outcome evidence, consistent sources/consumers,
reviewed merge and target validation, preserved decisions/limitations, delivery
record and verified immutable archive before working-whiteboard reset. Cleanup
requires ownership and authorization. No closure or ACTIVE adoption claim now.

## 7. History

Owner packaging amendment permits provisional v4 migration and plan preparation
together. Prior W01 approval applies only to its v2 candidate. Legal transition
history: MANIFEST_IN_REVIEW -> CHANGES_REQUESTED -> ROUTING for this owner
amendment; no artifact selection or execution approval inferred.

| Date | Event | Input | Effect | Authority |
| --- | --- | --- | --- | --- |
| 2026-09-06 | First manual routing | Accepted H01 candidate | ROUTING to MANIFEST_IN_REVIEW; FULL plan proposed | Owner handoff acceptance; routing approval pending |
