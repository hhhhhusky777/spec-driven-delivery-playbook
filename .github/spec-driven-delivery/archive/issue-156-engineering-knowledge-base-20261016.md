# Delivery archive — Project-aware engineering Knowledge Base

<!-- sdd: delivery-archive -->

| Field | Value |
| --- | --- |
| Issues | [#156](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/156) |
| Closing pull request | [#157](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/157) |

Complete concluded whiteboard and final implementation plan follow, preserved
from implementation candidate `be9acedb60d432cca823c0d32bbe07c1ede85531`. Only heading levels,
the reconciliation heading and relative links are adapted in the whiteboard;
its accepted design content is unchanged. Plan status reflects the closing
candidate's merge-resulting state, not a claim that pending checks passed.

The owner explicitly authorized this archive, removal of the live plan and
reset of the working whiteboard on 2026-10-16. This does not authorize merging
main or upgrading the installed pin. PR #157 owns exact-candidate review,
full validation, human merge acceptance and post-merge target/cleanup evidence.
No predictable tracked-state update is deferred to a bookkeeping PR.

<!-- sdd: archived-whiteboard -->

## Solution Whiteboard — Project-aware engineering Knowledge Base

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [Issue #156](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/156) |
| Owner | Repository owner |
| Concluded design revision | `fad850710ac9383ed0c8ee53c0507be894e5db8b` |
| Open owner decisions | `None` |

Owner-accepted performance amendment. The prior accepted design
remains available at `8766337fc079f306e55bbba3c139333bc07a1742`, with reviewed
content `0683283fb93f3cf4a9e39bd77c39ec09b64e0807`. The owner authorized this
amendment on 2026-10-15 after agreeing the design/code-level split and cost-based
classification. The owner accepted the reviewed amendment and dispositions on
2026-10-15; existing work and installation authority remain preserved.
The owner also requested a D04 clarification: put shared content-selection
criteria in the KB README and assess completed topics without duplicating those
criteria in each document.

The owner authorized a further amendment in PR #171: make research a global
requirement for design-level and implementation-level solution choices, with
language and runtime as inputs, one workflow-skill owner and concise reader
routes. The last accepted conclusion is preserved at
`fc115f49a5789032033e9b0746f341ab14f2af1d`. Both retained reviewers approved
`2c50cdb711f9cdceaf57e39dfb7fd72623d82245`; the owner accepted that research
amendment and its dispositions on 2026-10-15. Existing topic work, merge
authority and installed pin are preserved.

The owner has now authorized extracting the unchanged research requirement
into `knowledge-base/solution-research.md`, with mandatory short read triggers
at the existing skill positions. The prior accepted conclusion remains at
`c8b3cd345106fceb8da6c5875ad8d1ca059bf539`. This accepted amendment changes content
ownership, version-aware routing and the corresponding document/task count,
not the research requirement, project authority or validation gates. Both
retained reviewers approved `fad850710ac9383ed0c8ee53c0507be894e5db8b`; the owner
accepted that candidate and its dispositions on 2026-10-15. Existing task,
merge and installation authority remain unchanged.

### Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| DR01 | Package detailed engineering practices as an installed, versioned Knowledge Base rather than expanding skills indefinitely | Accepted |
| DR02 | Skills retain concise principles and topic-specific read triggers; author and reviewers both use the KB | Accepted |
| DR03 | Project boundaries and KB core principles constrain outcomes; agents choose the simplest sufficient project-specific implementation, not whether to ignore the principles | Accepted |
| DR04 | Read the relevant distilled topic first; the former unresolved-questions-only reference boundary is superseded by DR15. README remains a human index, not a mandatory routing hop | Changed |
| DR05 | Original scope: eleven topic documents and a lightweight README; DR12 proposes one additional topic. Examples explain decisions, not universal frameworks or mandatory recipes | Changed |
| DR06 | Install and upgrade all official KB documents with the pinned playbook; preserve project policies, Experience and non-owned content | Accepted |
| DR07 | Each document is a separate task; stop after every completed task for owner wording review rather than batch acceptance at the end | Accepted |
| DR08 | Do not claim all methods are universal industry standards; distinguish mature principles from emerging multi-agent practice | Accepted |
| DR09 | Separate design-level reuse, code-level clarity, and Performance and Observability; include conditional shared-capability and gradual-replacement guidance | Accepted |
| DR10 | Use verified professional examples; architecture fitness evidence belongs with observability and examples are not compulsory recipes | Accepted |
| DR11 | Make performance and observability explicit during solution/system design: measurable, interpretable evidence supports improvement; consolidate five performance boundaries in the existing topic | Accepted |
| DR12 | Add Code-Level Performance Engineering as one separate document task. Organize by how costs arise, not an exhaustive technique list or mandatory hardware checklist | Accepted |
| DR13 | Select guidance by causal explanation, reusable applicability, actionable method/reference routing and preserved semantics. Techniques illustrate choices; necessary overhead is not automatically waste | Accepted |
| DR14 | Apply the four content-selection criteria across the KB, including coding and completed topics. README owns the shared guidance; retain adequate topic content and correct only real gaps | Accepted |
| DR15 | All engineering solution choices, at design and implementation levels, require research of comparable problems and authoritative guidance using project needs, constraints and applicable KB principles; familiarity alone is not evidence | Accepted |
| DR16 | Language, version, runtime, dependencies and deployment constraints inform research. Language is either a fixed project constraint or a choice within authorized scope; external examples do not prove project fitness | Accepted |
| DR17 | The former workflow-owned rule is superseded by DR18. Do not copy it into every topic or project system prompt; retain the existing verified skill-loading entry | Changed |
| DR18 | A standalone Solution Research KB document owns the unchanged full rule; workflow, reviewer and triage keep mandatory short read triggers at their current positions. Reuse KB installation and preserve accepted/candidate version separation | Accepted |

### Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem | Portable skills contain short practice summaries and external references, but no installed shared owner for their detailed application guidance |
| Required outcome | Authors and reviewers can read version-matched, distilled engineering guidance and apply it inside actual project boundaries |
| In scope | KB content, complete installation/upgrade, manifest discovery, portable skill routing, affected README/diagrams, focused regressions and final validation |
| Out of scope | New agent framework, policy suite, generic linter for code style, project-specific Experience migration, copied third-party manuals, blanket automatic conflict resolution |

### Authority and facts

| Source | Authority or relevant evidence |
| --- | --- |
| Owner discussion | Approves the KB purpose, topic set, project-aware application, direct topic routing, and per-document human stops |
| [Contributing](../../../CONTRIBUTING.md) | Feature/task branch policy, two independent retained reviewers, human acceptance, focused/full validation and cleanup |
| [Quality policy](../../../docs/documentation-quality-policy.md) | Necessary complexity, canonical ownership, design freeze, human brief and validation disclosure |
| [Error handling](../../../docs/error-handling.md) | Recovery, gap tracking and escalation; no second error-handling framework |
| [Installer](../../../install-sdd.sh) | Existing immutable revision, managed-content ownership, candidate validation and rollback mechanisms to reuse |
| [Skills](../../../skills/sdd-project-workflow/SKILL.md) | Existing concise principles, scope references, concurrent-work guidance and project-context entry points |
| [Project Experience](../../../docs/experience.md) | Durable project-specific lessons; must remain separate from centrally maintained KB |

Material assumptions: None. The owner accepted the reviewed standalone-document
amendment and both reviewers' dispositions. V01 and FC01–FC02
remain unchanged and approved. Research semantics stay within existing review
and error-handling boundaries; no independent checkpoint, runtime rejection or
fail-closed behavior is added.

### Concluded design

The metadata state controls whether this reviewed design candidate is frozen.

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| D01 | Source `knowledge-base/` contains thirteen topics and README, including the extracted Solution Research guidance. Projects receive its official documents at `.github/spec-driven-delivery/knowledge-base/`, Git-tracked and retained through cleanup | Manifest indexes the installed KB root/revision relationship; runtime uses the same accepted immutable playbook pin, not another version history or feature-state record | Actual installation contains every official document; links and pin agree |
| D02 | Skills keep short outcome principles and explicit task-relevant instructions to read the matching KB topic before applying it. Both author and reviewers use the same installed KB | Resolve topics from the manifest-linked KB root, not source-repository-relative paths that break on installation. Do not add a compulsory README hop, routinely reload unchanged topics, or duplicate full guidance | Real installed author/reviewer/triage contexts can locate and use their topic; source and installed routing both work |
| D03 | Agents choose a project-specific implementation satisfying both project authority and agreed core principles, with reuse and minimal sufficient change | Examples and reference implementation techniques are not mandatory. True conflicts follow existing error handling; an agent cannot silently ignore a principle or modify project authority. No speculative abstractions, policy additions, universal recipes, or personal-style blockers | Author/reviewer scenarios distinguish a simpler suitable implementation from mechanical framework adoption or principle avoidance |
| D04 | Each topic distills verified primary practice into concise principles, application boundaries and useful examples, retaining original reference links | The KB README owns shared content-selection criteria; topics apply them without repeating the table. Knowledge is not a copied manual or exhaustive checklist. References support solution research under D08 and deeper questions, not new authority. Multi-agent techniques are identified as evolving rather than universal standards | Per-document semantic review verifies claims, applicability, reference provenance and lack of duplicate detailed owners |
| D05 | Adoption and upgrade install/synchronize the complete official tree: additions, modifications, and removals of obsolete managed documents | Preserve project policies, Experience and unrelated/local content. Reuse existing installer ownership/provenance/rollback patterns. Legacy revisions without KB remain valid; new obligations apply only when the revision ships KB. An unaccepted candidate cannot silently activate newer obligations | Focused install/upgrade/rejection tests prove full-tree copying, safe removals, local-content preservation, old-pin compatibility and accepted runtime consistency |
| D06 | Each of fourteen KB documents is one task, with its own wording review and human stop. Supporting installation and final integration are separate tasks | Normal feature integration model: task PRs target `codex/knowledge-base`, never `main`; final PR alone targets `main`. Autopilot is off. No next task starts before owner acceptance of the current task | Implementation plan records per-task owner gate, design mapping, dependencies, branch and PR target; PR evidence retains each review |
| D07 | Separate design-level Performance and Observability from Code-Level Performance Engineering using the performance boundaries below. Both author and reviewer routing explicitly cover the appropriate design or implementation context | Shared principles have one detailed owner; the code topic links to them and explains cost mechanisms, applicability and representative techniques rather than prescribing a universal optimization list | Semantic review and focused installed-routing evidence cover the two distinct topics and their project-aware application |
| D08 | Require evidence-grounded research for all engineering solution choices at design and implementation levels, using the project problem, requirements, boundaries and relevant technical context | `knowledge-base/solution-research.md` owns the unchanged full rule below. Workflow/reviewer/triage skills keep mandatory short read triggers at their current positions; KB README indexes it. Existing applicable research can be reused; no per-line browsing, per-delivery research record, search quota or extra approval gate | Installed and candidate-version references resolve; author/reviewer scenarios distinguish researched applicable choices from familiar guesses, blind copying or unauthorized technology changes |

### Proposed task mapping

These are planning inputs, not an implementation plan or permission to bypass design acceptance.

| Task | Unit | Design mapping | Human boundary |
| --- | --- | --- | --- |
| T01 | Minimal installer/manifest support for an optional-at-legacy-pins KB directory, without changing legacy obligations | D01, D05 | Supporting task review; stop |
| T02 | `knowledge-base/README.md`: human-facing index and usage/authority boundary; future topics identified without broken links | D02, D03, D04 | Document wording review; stop |
| T03 | `simple-design-and-reuse.md` | D02, D03, D04 | Document wording review; stop |
| T04 | `architecture-scope-and-assumptions.md` | D02, D03, D04 | Document wording review; stop |
| T05 | `contracts-and-compatibility.md` | D02, D03, D04 | Document wording review; stop |
| T06 | `error-handling-and-diagnosability.md` | D02, D03, D04 | Document wording review; stop |
| T07 | `testing-and-reproduction.md` | D02, D03, D04 | Document wording review; stop |
| T08 | `security-basics.md` | D02, D03, D04 | Document wording review; stop |
| T09 | `proportional-review.md` | D02, D03, D04 | Document wording review; stop |
| T10 | `efficiency-and-concurrency.md` | D02, D03, D04 | Document wording review; stop |
| T11 | `experience-and-learning.md` | D02, D03, D04 | Document wording review; stop |
| T12 | `code-simplicity-and-clarity.md` | D02, D03, D04 | Document wording review; stop |
| T13 | `performance-and-observability.md`: design-stage measurement and five performance boundaries | D02, D03, D04, D07 | Document wording review; stop |
| T14 | `code-level-performance-engineering.md`: cost mechanisms and bounded implementation techniques; owner-requested global research clarification in existing skills/index and affected checks after amendment acceptance | D02, D03, D04, D07, D08 | Document wording review; stop |
| T15 | `solution-research.md`: extract the existing D08 rule; replace workflow-owned details and cross-skill routes with mandatory direct KB reading; update index and affected installed/candidate routing checks | D01, D02, D03, D08 | Document wording review; stop |
| T16 | Final integration: remove migrated detailed duplication, reconcile routing/adoption/upgrade/README diagrams, verify complete installed package | D01–D08 | Integration review; stop, then final readiness under existing gates |

Each topic task includes its immediate skill trigger, index and affected checks;
links must resolve within the task candidate. Supporting edits do not create
another topic or permit completing later documents early. The unstarted final
integration task becomes T16; no completed task is renumbered. T16 is reconciliation,
not a second copy of the documentation or a new validation controller.

#### Global solution research

The shared `knowledge-base/solution-research.md` owns this requirement, under
`[!IMPORTANT]`. Before selecting an engineering solution, at design or
implementation level, agents MUST search for comparable problems and relevant
authoritative engineering guidance using the problem, requirements, project
boundaries and applicable KB principles. Include relevant language/version,
runtime, libraries and deployment constraints; use non-sensitive descriptions,
not private project data, in external searches.

Read the underlying primary sources, assess applicability and trade-offs, and
justify the simplest sufficient choice against project evidence and suitable
existing mechanisms. Familiarity, subjective confidence, guesses or unsupported
reasoning MUST NOT substitute for research. External practice cannot establish
project-specific facts or prove a bottleneck. Treat language as either an
established constraint or an explicitly authorized choice, never permission to
introduce a new language or change project authority.

Reuse already-read research when its evidence remains current and applicable;
do not repeat browsing for each coding action. Unavailable sources or unresolved
material uncertainty follow existing error handling. No per-delivery research record,
fixed source count, prescribed technique or standalone gate is required.

Workflow, reviewer and triage skills MUST require reading the shared document
at their current research-trigger positions, under `[!IMPORTANT]`. A summary
or prior familiarity cannot replace reading it; unchanged content already read
in context need not be reread routinely. Workflow applies it to solution choices;
reviewer checks the research basis and applicability, including its own proposed
alternatives; triage applies it to investigation methods and remedies, not proof
of a project-specific cause. Remove the former workflow-owned full rule and
cross-skill research references instead of maintaining a second copy. KB README
keeps an index link and short purpose; topics retain their specific practice and sources.

Normal workflow/reviewer/triage use the manifest-linked installed KB. Before a
manifest exists, adoption uses `Knowledge Base root` in its verified normal
runtime guide; the installed document persists after temporary checkout cleanup.
Candidate-upgrade triage instead reads `knowledge-base/solution-research.md`
from the verified upgrade guide's candidate checkout at its `Resolved revision`,
not the older installed KB. Reading candidate guidance does not activate that
revision or grant project authority. Reuse existing KB synchronization,
provenance, validation and recovery; add no installer mechanism. Legacy pins
that do not ship the document gain no retrospective requirement.
Project system prompts retain their verified manifest/runtime/skill entry,
not a duplicate research rule. Reconcile conflicting wording only, and verify
links in the actual installed context.

### Topic boundaries and reference-backed examples

| Topic | Required content | Boundary / professional example |
| --- | --- | --- |
| Simple Design and Reuse | Current demonstrated needs, suitable existing capabilities, correct ownership/contracts, small sufficient increments and whole-life cost. Shared capability requires real commonality; gradual replacement applies only when migration risk warrants it | Design mechanisms, not coding style. No speculative platform or mandatory coexistence machinery |
| Code Simplicity and Clarity | Clear intent, names, control/data flow, useful intermediate state, proportionate abstraction, explanatory comments and behavior-preserving simplification | Fowler's Extract Function names a coherent operation; Consolidate Conditional Expression names one eligibility decision; Replace Temp with Query illustrates a meaningful calculation boundary, not a ban on local variables. Preserve evaluation order, side effects, errors and concurrency semantics |
| Performance and Observability | Consider performance and observability during solution/system design. Make relevant behavior measurable and interpretable so evidence supports improvement; apply the five design-level boundaries below and retain proportionate architectural fitness evidence | Reconcile existing wording rather than add duplicate rules. No universal monitoring platform or new gate. Failure localization and recovery remain owned by Error Handling and Diagnosability |
| Code-Level Performance Engineering | Recognize how implementation costs arise; use the cost categories and selection criteria below to locate applicable engineering methods within project constraints | Not another design/measurement policy, code-style guide, exhaustive technique catalog or mandatory optimization checklist. CPU, registers, cache, memory, disk and network are locations where costs occur, not additional required chapters |

Examples are adapted explanations, not copied manuals or compulsory transformations.
The coding task MUST verify applicability and semantic preservation rather than
optimize line count or impose personal style.

Primary coding references:
[Google review guidance](https://google.github.io/eng-practices/review/reviewer/looking-for.html),
[Fowler Extract Function](https://refactoring.com/catalog/extractFunction.html),
[Consolidate Conditional Expression](https://refactoring.com/catalog/consolidateConditionalExpression.html),
and [Replace Temp with Query](https://refactoring.com/catalog/replaceTempWithQuery.html).
The design task verifies its Google, Microsoft, AWS, Meta and Fowler references;
performance verifies its Google SRE, OpenTelemetry and architectural-fitness sources,
plus the performance references below.
Reference techniques serve project boundaries, not additional project authority.

#### Performance boundaries and technical coverage

Performance and Observability owns these five design-level boundaries, merged
with existing guidance rather than restated as a second contract:

| Boundary | Required meaning |
| --- | --- |
| Useful outcomes | Improve the accepted operation and useful work per resource cost, not a proxy metric in isolation |
| Evidence | Design how relevant behavior will be measured and interpreted; use representative evidence to locate limiting work and assess improvement claims |
| Unnecessary work | Prefer removing avoidable processing and supporting work before adding a more elaborate mechanism |
| Whole-system trade-offs | Preserve correctness and assess effects on other operations, latency, throughput and resources rather than optimize one metric independently |
| Proportional complexity | Expected benefit must justify implementation, operating and maintenance cost; choose the smallest sufficient solution within project boundaries |

Code-Level Performance Engineering applies those boundaries through the
following non-exhaustive organization. These are our source-backed editorial
categories, not a claimed industry-standard taxonomy or per-project checklist.

| Cost mechanism | Technical coverage and example search directions |
| --- | --- |
| Computation and instruction execution | Repeated calculation, parsing and conversion; unnecessarily expensive operations; relevant execution dependencies or hardware limits. Examples include computation reuse, suitable data structures and, where justified, compiler/vectorization methods |
| Data movement and access | Avoidable copies, loads, indirections and movement through the memory hierarchy. Examples include in-place construction, views, locality, compact layout and relevant register-pressure/spill analysis |
| Resource creation and reclamation | Repeated allocation, initialization, collection and teardown. Examples include appropriate preallocation and existing buffer/connection reuse mechanisms |
| Scheduling, synchronization and coordination | Excessively fine work, redundant handoffs, blocking and shared-state contention. Examples include task granularity, local aggregation and runtime-appropriate asynchronous I/O |
| I/O and access amplification | Requests, blocks, bytes and rewrites induced by one logical operation. Examples include appropriate batching, selective access, fewer round trips and storage-specific read/write amplification analysis |

Apply the KB-wide [content-selection criteria](../../../knowledge-base/README.md#content-selection-and-refinement)
to these cost mechanisms; the same criteria apply to coding and other topics.
Read the topic before applying it; research solution choices under D08 and use
relevant primary references for unresolved questions. Do not select a technique merely
because its keyword appears. A technique may affect several categories; do not
duplicate its detailed explanation. No exhaustive catalog or mandatory use of
zero-copy, pooling, lock-free code, vectorization or low-level CPU tuning follows.

Reducing data/state transfers and auxiliary work is a useful thread, not a claim
that every performance limit is copying. Register spills, context switches and
I/O amplification have different mechanisms. Metadata, synchronization and copies
may be required for correctness or lower total cost; neither their presence nor
an amplification factor alone proves removable waste. Keep ownership, lifetime,
consistency, supported semantics and accepted project boundaries intact.

Primary performance references to verify and distill per topic:
[Google application productivity](https://abseil.io/fast/7),
[Google optimization effort](https://abseil.io/fast/72),
[Google memory bandwidth](https://abseil.io/fast/62),
[Google regular-expression efficiency](https://abseil.io/fast/21),
[Microsoft performance design principles](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/principles),
[Microsoft implementation practices](https://learn.microsoft.com/en-us/aspnet/core/fundamentals/best-practices),
[Microsoft parallelism pitfalls](https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/potential-pitfalls-in-data-and-task-parallelism),
[Intel Top-Down analysis](https://www.intel.com/content/www/us/en/docs/vtune-profiler/cookbook/2024-0/top-down-microarchitecture-analysis-method.html),
[Intel Roofline](https://www.intel.com/content/www/us/en/developer/articles/technical/integrated-roofline-model-with-intel-advisor.html),
[Linux false sharing](https://docs.kernel.org/kernel-hacking/false-sharing.html),
and [RocksDB amplification](https://github.com/facebook/rocksdb/wiki/RocksDB-Tuning-Guide#amplification-factors).
Use only relevant source-supported techniques with explicit platform limits;
these links do not require every topic to reproduce every source or example.

### Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition |
| --- | --- | --- |
| DR01 | D01 | Accepted |
| DR02 | D02 | Accepted |
| DR03 | D03 | Accepted |
| DR04 | D02, D04, D08 | Changed |
| DR05 | D01, D04 | Changed |
| DR06 | D01, D05 | Accepted |
| DR07 | D06 | Accepted |
| DR08 | D03, D04 | Accepted |
| DR09 | D04, D06 | Accepted |
| DR10 | D04 | Accepted |
| DR11 | D07 | Accepted |
| DR12 | D01, D06, D07 | Accepted |
| DR13 | D03, D04, D07 | Accepted |
| DR14 | D04 | Accepted |
| DR15 | D08 | Accepted |
| DR16 | D03, D08 | Accepted |
| DR17 | D02, D08 | Changed |
| DR18 | D01, D02, D06, D08 | Accepted |

Formal conclusion and freeze require two independent reviewers and owner
acceptance under the existing accepted-design authority.

### Newly introduced validations

Research amendment delta: None. The existing accepted inventory is retained.
D08 strengthens solution evidence within existing review, not a new acceptance
checkpoint or runtime validation.

| ID | Validation / authority / execution boundary | Protected outcome / risk / marginal value | Concrete invalid case | Failure effect / recovery | Cost / risk reduction | Existing or cheaper mechanism / coverage / why insufficient | Fail-close / test reference | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| V01 | Extend existing installer/runtime integrity and synchronization ownership/baseline checks to official KB content when the pinned revision ships it; installer and runtime-validation boundary | Prevent missing/mixed guidance and unintended loss of local or non-owned content | A required topic has a mismatched revision, or upgrade would overwrite a locally edited topic | FC01; FC02 | Bounded official-file/baseline checks, not project-code inspection or an additional validation stage | Reuse managed-skill provenance/ownership patterns; current checks do not cover shared KB content or local KB changes | FC01; FC02; T01 and T16 test inventory | Approved |

### Newly introduced fail-closed behaviors

Research amendment delta: None. Existing uncertainty/authority handling applies;
the accepted inventory is retained.

| ID | Trigger | Required fail-closed response | Concrete example | Impact | Recovery / best next action | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- |
| FC01 | A revision declares KB content but its required official package is missing or inconsistent with that revision | Do not claim valid installation/upgrade or proceed with dependent KB-guided work | Accepted skill requires code-simplicity guidance but that installed topic belongs to another revision | Only dependent activation/work waits; previous accepted state remains preserved | Agent restores/regenerates verified official content within authority and reruns affected validation; resume only when content and pin match. Legacy pins with no KB have no such requirement | Approved |
| FC02 | KB synchronization would overwrite or remove content whose installer ownership or unchanged managed baseline cannot be established | Preserve that content; stop only its conflicting synchronization until disposition | A project edited an official KB topic locally; an upgrade must not erase the edit as though it were untouched vendor content | The affected upgrade cannot complete silently; no unrelated project cleanup | Agent compares local/official content and proposes preservation or reconciliation; owner authorizes any destructive or policy-affecting resolution before synchronization resumes | Approved |

### Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Design | D08 replaces uncertainty-only reference use with research-grounded solution selection across design and implementation; language/runtime are research inputs, not implicit technology-change authority | Approved |
| Ownership | Solution Research becomes one shared KB document; all three skills keep mandatory short reads at their current positions. Accepted installed KB and upgrade-candidate KB remain separate | Approved |
| Delivery granularity | Preserve one document per task: T15 extracts Solution Research; unstarted final integration moves to T16. Fourteen documents plus two supporting units; stop after every task, no Autopilot | Approved |
| New controls | None in this amendment. Approved V01, FC01 and FC02 remain unchanged | DISCLOSE |
| State | Metadata records design state; review/acceptance never claims implementation or installed KB activation | DISCLOSE |

<!-- sdd: archived-implementation-plan -->

## Implementation Plan — Project-aware engineering Knowledge Base

<!-- sdd: implementation-plan -->

This completed plan preserves the delivery outcome resulting from the closing
candidate's authorized merge. GitHub owns checks, review, acceptance, merge and
target-verification evidence; the embedded frozen whiteboard owns design.
`COMPLETE` does not grant merge authority or claim pending checks passed.

### Delivery status

| Field | Value |
| --- | --- |
| State | `COMPLETE` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | `human-review-before-merge`; Autopilot explicitly off |
| Authorized scope / feature branch / protected target | Accepted D01–D08 / `codex/knowledge-base` / `main`; no automatic merge authority |
| Delivery branch / target | `codex/knowledge-base` / `main` |
| Owner | Repository owner |
| Primary issue / need | [Issue #156](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/156) |
| Concluded whiteboard | [Accepted ownership amendment](#solution-whiteboard--project-aware-engineering-knowledge-base); reviewed content `fad850710ac9383ed0c8ee53c0507be894e5db8b`, verified conclusion `d077103455c98063a97ab5aca5d724a5a52e50be` |
| Required reviewers | Retained independent `kb_review_r1` and `kb_review_r2` through final merge |
| Last verified | 2026-10-16 Asia/Shanghai; all sixteen task PRs accepted and merged to the feature branch through PR #173 at `be9acedb60d432cca823c0d32bbe07c1ede85531`. Author and both retained reviewers approved that implementation audit; coverage reconciliation found no additional missing tests. Owner authorized this combined archive, live-plan removal and working-whiteboard reset. Final exact-candidate review, full validation, main-merge acceptance and target verification remain PR-owned gates; no installed-pin activation |

### Governing inputs and delivery boundaries

| Source | Authority / use |
| --- | --- |
| [Contributing](../../../CONTRIBUTING.md) | Branches, focused/full validation, review, human merge authority and cleanup |
| [Manifest](../project-adoption-manifest.md) | Accepted runtime pin and project authorities; no feature state |
| [Whiteboard](#solution-whiteboard--project-aware-engineering-knowledge-base) | D01–D08, approved V01 and FC01–FC02, document set and per-task owner pauses |
| [Quality policy](../../../docs/documentation-quality-policy.md) | Proportional effort, design freeze, human brief, final audit and 90-minute boundary |
| [Error handling](../../../docs/error-handling.md) | Recovery and escalation; no separate recovery framework |

Deliver a shared, revision-matched KB that authors and reviewers apply inside
project boundaries. Scope is the frozen topic set, installer/manifest support,
skill triggers, affected guidance and checks. No new framework, policy suite,
code-style linter, copied manual, speculative topic, or project Experience
migration. Material assumptions: None. Preserve accepted D08 semantics and the
reviewed T14 outcome. The accepted ownership amendment adds Solution
Research as T15 and moves unstarted integration to T16 to retain one document
per task. T15 extracts the full rule and updates README and all three skill
routes together. Its source migration does not activate a new installed revision.

The accepted installed pin remains `775f1479e8a1ce6277af7448d509cabe95374ad3`.
Preparing a newer runtime candidate is not acceptance or activation. Installer
tests use isolated fixtures; publishing this feature does not claim that every
existing project, including this repository, has accepted its new pin.

### Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| D01 | T01 packaging and manifest index; T02–T15 official documents; T16 complete package | Actual installed tree, tracked persistence and revision agreement | Aligned |
| D02 | T02 usage/index; T03–T15 immediate topic triggers; T16 routing reconciliation | Source and installed author/reviewer/triage resolution | Aligned |
| D03 | T02–T15 project-aware principles and examples | Semantic review of minimal sufficient application and authority conflicts | Aligned |
| D04 | T02–T15 distilled content and primary references | Claims, references, clarity and proportionality reviewed per document | Aligned |
| D05 | T01 synchronization mechanism; T16 complete upgrade/rollback coverage | Legacy pins, additions/updates/removals, integrity and local preservation | Aligned |
| D06 | T01–T16 explicit task targets and human stops | No next task before current task acceptance; no Autopilot | Aligned |
| D07 | T13 design-level boundaries and explicit design-stage routing; T14 code-level cost mechanisms and implementation routing; T16 final reconciliation | Distinct detailed owners, source-backed scope and real installed topic routes | Aligned |
| D08 | T14 research requirement; T15 extracts its unchanged full rule into Solution Research, replaces cross-skill references and reconciles KB index; T16 final consistency | Same-revision installed/candidate KB routes, applicable research reuse and project-aware choices without extra authority | Aligned |

### Delivery strategy and readiness

Feature integration model: every task PR targets `codex/knowledge-base`.
Only the [final feature PR #157](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/157)
targets `main`. Each task produces a working increment; future topics remain
plain index entries until their files exist. No task requires its own future
outputs as readiness inputs.

Execution order follows owner acceptance, not a claim that all topics are
technically dependent. Complete focused checks and exact-candidate review with
the retained pair, present the wording/outcome brief, and wait for human
acceptance and merge authority before advancing. Autopilot is off by owner
choice; no additional automatic merge or cleanup authority is implied.

Before each task, consume current accepted predecessors, the frozen design,
applicable authorities and relevant source paths; exercise the task worktree
and provision only required authorized ignored inputs. Record any material
context mismatch here, without another readiness document. Contract-equivalent
implementation choices stay with the agent.

### Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | DONE | None | Minimal KB installer and manifest support | D01, D05; preserve legacy pins and local content; no official topic writing | Eight focused KB scenarios; document/skill checks | `codex/knowledge-base-t01`; [PR #158](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/158); target `codex/knowledge-base` |
| T02 | DONE | T01 | `knowledge-base/README.md` human index and authority/application guide | D02–D04; not a mandatory routing hop | Focused document/link checks and wording review | `codex/knowledge-base-t02`; [PR #159](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/159); target `codex/knowledge-base` |
| T03 | DONE | T02 | `simple-design-and-reuse.md` | D02–D04; design-level reuse, sufficient increments and conditional shared-capability/migration guidance; old filename and triggers reconciled | Focused topic/trigger checks and wording review | `codex/knowledge-base-t03`; [PR #160](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/160); target `codex/knowledge-base` |
| T04 | DONE | T03 | `architecture-scope-and-assumptions.md` | D02–D04; evidence-bounded ownership and supported domain | Focused topic/trigger checks and wording review | `codex/knowledge-base-t04`; [PR #161](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/161); target `codex/knowledge-base` |
| T05 | DONE | T04 | `contracts-and-compatibility.md` | D02–D04; explicit contracts and safe compatible change | Focused topic/trigger checks and wording review | `codex/knowledge-base-t05`; [PR #162](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/162); target `codex/knowledge-base` |
| T06 | DONE | T05 | `error-handling-and-diagnosability.md` | D02–D04; simple invariant-preserving failures and useful diagnosis | Focused topic/trigger checks and wording review | `codex/knowledge-base-t06`; [PR #163](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/163); target `codex/knowledge-base` |
| T07 | DONE | T06 | `testing-and-reproduction.md` | D02–D04; risk-driven proof and smallest useful reproducer | Focused topic/trigger checks and wording review | `codex/knowledge-base-t07`; [PR #164](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/164); target `codex/knowledge-base` |
| T08 | DONE | T07 | `security-basics.md` | D02–D04; proportionate protection of real trust boundaries | Focused topic/trigger checks and wording review | `codex/knowledge-base-t08`; [PR #165](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/165); target `codex/knowledge-base` |
| T09 | DONE | T08 | `proportional-review.md` | D02–D04; material findings and reasonable author disposition, not perfection | Focused topic/trigger checks and wording review | `codex/knowledge-base-t09`; [PR #166](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/166); target `codex/knowledge-base` |
| T10 | DONE | T09 | `efficiency-and-concurrency.md` | D02–D04; independent safe work and coordination cost; evolving methods labeled | Focused topic/trigger checks and wording review | `codex/knowledge-base-t10`; [PR #167](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/167); target `codex/knowledge-base` |
| T11 | DONE | T10 | `experience-and-learning.md` | D02–D04; actionable reuse/refinement; retain project-specific lessons | Focused topic/trigger checks and wording review | `codex/knowledge-base-t11`; [PR #168](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/168); target `codex/knowledge-base` |
| T12 | DONE | T11 | `code-simplicity-and-clarity.md` | D02–D04; professional clarity examples, no line-count or style mandate; preserve behavior | Focused topic/trigger checks and wording review | `codex/knowledge-base-t12`; [PR #169](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/169); target `codex/knowledge-base` |
| T13 | DONE | T12 | Revise `performance-and-observability.md` | D02–D04, D07; design-stage measurability, interpretation and five performance boundaries; fault diagnosis stays with T06 | Focused topic/trigger checks and wording review | `codex/knowledge-base-t13`; [PR #170](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/170); target `codex/knowledge-base` |
| T14 | DONE | T13 | `code-level-performance-engineering.md` and accepted global research clarification | D02–D04, D07, D08; one detailed research owner, version-matched routes, no new installer mechanism | Focused topic/trigger/routing checks and wording review | `codex/knowledge-base-t14`; [PR #171](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/171); target `codex/knowledge-base` |
| T15 | DONE | T14 | `solution-research.md`, mandatory direct KB reading and reference migration | D01, D02, D03, D08; preserve research semantics, accepted/candidate versions and existing installation mechanism | Focused document, installed/candidate routing and wording review | `codex/knowledge-base-t15`; [PR #172](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/172); target `codex/knowledge-base` |
| T16 | DONE | T15 | Complete integration and guidance reconciliation | D01–D08; complete package without duplicate detailed owners or unaccepted runtime activation | Focused package, routing and consistency checks | `codex/knowledge-base-t16`; [PR #173](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/173); target `codex/knowledge-base` |

### Task specifications and context receipts

| Task unit | Owned source boundary | Required outcome / evidence | Context receipt / actual result |
| --- | --- | --- | --- |
| T01 | Existing `install-sdd.sh`, manifest template and necessary adoption/upgrade/runtime guidance plus affected tests | Reuse managed-content provenance/ownership/rollback; synchronize official KB only for pins that ship it. Exercise an isolated KB fixture and legacy fixture without creating future official topics | Sources and accepted runtime verified. Implemented complete-tree installation, immutable ownership baseline, safe synchronization, inventory/content validation and failure restoration; no official KB topic created |
| T02 | `knowledge-base/README.md`, immediately affected installer/index checks | Explain topic use, project authority and original-reference escalation. Future filenames are not broken links. Install real first document | Actual README installs byte-for-byte at the fixture's accepted immutable pin, validates, and can be Git-tracked. No future topic or trigger authored; live project pin unchanged |
| T03 | Simplicity topic, its index link, author/reviewer skill triggers and affected installer tests | Distill verified simplicity/reuse principles and useful examples; both installed readers can resolve the real topic without a README hop | Primary references verified; real installed author/reviewer routing covered. Existing hard scope, error-handling and review contracts preserved; live pin unchanged |
| T04 | Architecture/scope topic, its index link, author/reviewer triggers and installed routing regression | Distill responsibility/contract and evidence-bounded assumptions guidance with clear examples; retain existing hard scope and disclosure contracts | Accepted predecessor and manifest runtime verified in owned T04 worktree; Microsoft, AWS and Google primary sources verified; real installed topic and both reader routes covered; no later topic authored |
| T05 | Contracts topic, index link, author/reviewer triggers and installed routing check | Distill explicit contracts, supported consumer compatibility and proportionate transition evidence; verify professional source examples | T04 accepted and merged to feature; Google AIP-180 and Microsoft API-design references verified. Actual installed topic/routing covered; live pin unchanged |
| T06 | Failure-handling topic, index link, author/reviewer/triage triggers and installed routing check | Distill simple invariant-preserving failures, safe retry and actionable diagnostics; retain project recovery/escalation authority | T05 accepted and merged; AWS, RFC 9457 and OpenTelemetry sources verified, including development status. Actual installed topic and three reader routes covered; live pin unchanged |
| T07 | Testing/reproduction topic, index, author/reviewer/triage triggers and installed routing check | Distill risk-driven behavioral evidence and faithful minimal reproduction; migrate detailed reproduction guidance without changing validation timing | T06 merged and accepted runtime verified; Google, Microsoft, Chromium and pytest primary references verified; installed topic and three reader routes covered; live pin unchanged |
| T08 | Security topic, index, author/reviewer triggers and installed routing check | Distill actual trust boundaries, least privilege, safe input and secret handling with professional examples; no security policy suite | T07 merged and accepted runtime verified in owned worktree; Microsoft and OWASP primary references verified; real installed topic and both reader routes covered; live pin unchanged |
| T09 | Review topic, index, author/reviewer triggers, migrated explanatory reference guidance and installed routing check | Distill material findings, proportional corrections and reasoned rejection/deferral; preserve hard review boundaries and exact-candidate authority | T08 merged; accepted runtime verified in owned worktree; Google primary reviewer/author sources and examples verified; actual installed topic and both reader routes covered; live pin unchanged |
| T10 | Efficiency topic, index, author/reviewer triggers, migrated execution detail and installed routing check | Distill safe independent execution, bounded delegation and coordination cost; label evolving multi-agent methods | T09 merged and accepted runtime verified in owned worktree; OpenAI and Anthropic primary sources verified; actual installed topic and both reader routes covered; live pin unchanged |
| T11 | Experience topic, index, author/reviewer/triage triggers and installed routing check | Distill actionable reuse, verified applicability and refinement; preserve project-specific lessons and ownership | T10 merged and accepted runtime verified in owned worktree; KCS and Google SRE primary sources verified; real installed topic and three reader routes covered; project Experience and live pin unchanged |
| T12 | Code clarity topic, index, author/reviewer triggers and installed routing check | Distill intent, names, control/data flow, useful intermediate state, proportionate abstraction, comments and behavior-preserving simplification | T11 merged and accepted runtime verified in owned worktree; Google and Fowler primary sources/examples verified; actual installed topic and both reader routes covered; frozen design and live pin unchanged |
| T13 | Performance topic, index, author/reviewer triggers and installed routing check | Consolidate D07's five boundaries into existing guidance; explicitly consider performance and measurable/interpretable feedback during solution/system design; retain proportionate fitness evidence and T06's diagnosis ownership | Accepted amendment and verified conclusion consumed; design-stage wording, five boundaries, source-backed examples and installed reader routes delivered. Relevant Google, Microsoft and OpenTelemetry sources verified; live pin unchanged |
| T14 | Code-level performance topic, index, workflow/reviewer/triage skills and affected routing checks | Apply D07's five cost mechanisms and D08's global solution research; keep one detailed rule with language/runtime inputs, current applicable research reuse and same-revision routes. Preserve behavior and distinguish necessary overhead from avoidable work | T13 and accepted-pin runtime verified. Prior primary sources and performance topic preserved; owner-accepted D08 conclusion verified. Full rule in workflow, concise reviewer/triage routes, KB explanations and actual installed/source routing regressions implemented. No installer mechanism or installed-pin change |
| T15 | `knowledge-base/solution-research.md`, KB index, existing research positions in workflow/reviewer/triage skills, affected document/installer tests | Extract D08 without changing semantics; keep short mandatory read triggers, remove former full workflow rule and cross-skill routes. Resolve accepted installed KB, premanifest guide KB root and candidate-upgrade checkout/revision separately; no installer mechanism or legacy obligation added | T14 merged and accepted runtime verified; full rule extracted, README/performance-topic references and three mandatory skill routes reconciled. Existing installer mechanism covers normal/adoption cleanup persistence, candidate/accepted separation and legacy pins. Google/Microsoft supporting references verified; frozen whiteboard and live pin unchanged |
| T16 | Installer integration tests, manifest/adoption/upgrade routing, affected skills and root README/diagrams | Reconcile the complete official tree and remaining duplicate owners. Prove installed links, preservation, safe managed removals and compatibility; update actual capabilities without claiming unaccepted runtime activation | Accepted T01–T15 consumed; isolated worktree, accepted-pin runtime and dependencies verified. Real fourteen-document install/synchronization/preservation/rollback covered. Triage topics share same-revision routes across normal, premanifest and candidate-upgrade contexts. README capabilities, diagram and validation timing reconciled; existing manifest/adoption/upgrade routing already sufficient. Frozen whiteboard and live pin unchanged |

Every task has its own owner stop. Shared specifications avoid repeated copies of
the same review contract; the ledger supplies each exact outcome and branch.
No task may complete a later topic early.

Owner-requested T10 correction also reconciles reference-reading wording across
completed topics and author/reviewer/triage skills: unsupported guesses cannot
resolve a knowledge gap; relevant primary references inform engineering methods,
while canonical project sources or direct evidence establish project facts.
This clarifies D02–D04 and existing error handling; it creates no new review gate.

The owner-requested D04 clarification in PR #170 makes content-selection criteria
explicit in the KB README and assesses completed topics, including code clarity.
Keep adequate topic content unchanged; do not duplicate the criteria or add
mechanical checklist sections. The accepted clarification does not complete
T13/T14 performance work; each topic retains its separate task boundary.

### Test and acceptance inventory

This is coverage intent, not a run log. Actual results belong to the task PR.
Update coverage and named missing non-focused tests as implementation exposes
them; recording a final-gate gap does not claim that test exists or passed.

| Owning task | Contract, changed outcome, or risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| T01 | D01, D05; V01 and FC01 | `tests/installer.test.mjs`, knowledge base cases: complete tree, old pin without KB, missing/mixed official content and changed candidate checkout | Implemented | Changed-line focused cases in T01; run evidence in task PR |
| T01 | D05; V01 and FC02 | Knowledge base cases: local edits/unowned collisions/linked parents preserved; safe official additions/updates/removals; directory replacement failures restore accepted tree | Implemented | Changed-line focused cases in T01; run evidence in task PR |
| T02–T15 | D02–D04 | Changed-document Markdown, links and examples; installed trigger resolves existing topic; primary-reference and project-application semantic review | Completed per-topic evidence in the merged task PRs | Focused checks and both reviewers before each owner stop |
| T13 | D02–D04, D07 | Existing actual-index and installed author/reviewer/triage routing regressions; affected workflow/reviewer contract checks; design-stage trigger and five-boundary semantic review | Existing focused tests cover the changed artifact and its installation; no additional missing T13 test identified | Focused run evidence in PR #170; complete-package lifecycle proof delivered in T16; full source validation belongs to the closing PR |
| T14 | D02–D04, D07, D08 | Actual-index/topic routing; reviewer-to-workflow anchor; triage owning-guide resolution across workflow, adoption, candidate upgrade and cleaned-checkout recovery; semantic review of research applicability and authority | Focused regressions implemented for T14's interim ownership; T15 updates affected routing checks with the extraction | Focused run evidence belongs in PR #171; complete-package lifecycle proof delivered in T16; full source validation belongs to the closing PR |
| T15 | D01, D02, D03, D08 | Actual installed Research topic and README/three-skill routes; premanifest adoption through guide KB root after source cleanup; mixed accepted/candidate revisions; legacy pins without this document; semantic preservation and mandatory-read review | Existing focused regressions updated and actual-index installation exercised; no additional missing T15 test identified | Focused run evidence belongs in the T15 PR; complete-package lifecycle integration delivered in T16; full validation belongs to the closing PR |
| T16 | D01, D02, D05, D08 | Six real-package installer cases: full install, installed author/reviewer/triage routes, accepted add/update/remove synchronization, local-edit/collision preservation, injected backup/publish rollback and same-revision triage topics across runtime profiles | Implemented and focused checks passed; all fourteen official files compared with their revision, project KB/Experience/policy preserved | No additional missing T16 test identified; full source suite remains final-gate work |
| T16 | D02, D04 | Root README/diagram, mandatory KB routing, focused/full-test guidance and installed-reference contract checks | Affected existing document checks and README Mermaid validation; no extra checker or detailed rule owner | Focused integration review; exact-candidate evidence in task PR |
| Final gate | All accepted outcomes and material risks | Audit implementation against frozen design/reuse, reconcile missing tests, final exact-candidate review, then `npm run docs:all` | Implementation audit approved by author and both retained reviewers at `be9aced`; coverage reconciliation found no additional missing tests. Existing non-focused installer legacy, integrity, linked-parent and runtime checks plus the complete source suite remain required on the final reviewed candidate; actual results belong to PR #157 | Author and retained reviewers; existing final-readiness boundary, not each document task |

Follow the canonical final gate: any necessary target sync and affected checks
precede the author/two-reviewer implementation audit. Only after audit approval
add required missing tests, perform affected focused checks and final candidate
review, then full applicable validation before human `main` merge acceptance.
Implementation changes invalidate the affected audit/review evidence. This
repository's source suite does not become an adopting project's obligation.

### Recovery, decisions, and change control

The owner accepted the reviewed D08 ownership/routing amendment at `fad8507`;
both retained reviewers verified conclusion `d077103`. The plan applies its
T15/T16 mapping without changing completed tasks or research semantics. Existing
V01/FC01–FC02 and merge authority are unchanged. Ordinary recoverable agent
mistakes stay within authority.

### Plan validation and completion

#### Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| Accepted design delivered | D01–D08 mapping, fourteen accepted documents and complete managed installation | All sixteen tasks accepted and merged; exact implementation audit approved, with no material findings |
| Applicable validation passed | Focused evidence per task; final audit, coverage reconciliation and exact-head full source gate | Task evidence in PRs #158–#173; audit and coverage reconciliation complete. Final candidate review and full-run evidence must pass in closing PR #157 before merge |
| Compatibility and preservation | Old pins remain valid; correct new package and owned synchronization; project content preserved | Focused complete-package proof delivered in T16; closing PR owns required final full-validation evidence |
| Merge-ready canonical state | Root README/diagrams, routing and tracked delivery state agree with actual candidate | Reconciled in T16; authorized combined archive, live-plan removal and working-whiteboard reset included in closing candidate |
| PR-owned acceptance and merge | Each task review/owner acceptance; final human approval and exact target verification | [Feature PR #157](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/157) owns final review, validation, main-merge acceptance and target verification; archive/reset authorization is not merge authority |
| Feature cleanup | Complete linked whiteboard-and-plan archive and specifically authorized reset/removals | Explicitly authorized on 2026-10-16 and included in this candidate; owned worktree/branch retirement follows target verification |

#### Planned versus actual outcome

| Design / task | Planned result | Actual evidence or deviation | Remaining obligation / owner |
| --- | --- | --- | --- |
| D01, D05 / T01 | Installer/manifest support without new legacy obligations | Implemented and covered by focused KB tests; no scope deviation | Merged to feature in PR #158; final readiness remains |
| D02–D04 / T02 | Human index and project-aware application boundary | Actual README and focused installation regression complete; future topics explicitly unavailable | Final feature-merge acceptance / owner |
| D02–D04 / T03 | Project-aware simplicity/reuse topic and direct installed routing | Design-only topic renamed; verified reference-backed examples and conditional shared-capability/gradual-replacement guidance added; index and two skill triggers reconciled; no later topic authored | Final feature-merge acceptance / owner |
| D02–D04 / T04 | Project-aware responsibilities, scope and assumptions guidance | Topic, index and both immediate routes delivered; focused installed-content/routing coverage extended; no scope deviation | Final feature-merge acceptance / owner |
| D02–D04 / T05 | Project-aware contract and compatibility topic with direct installed routing | Supported consumer domain, behavior/default compatibility and source-native examples delivered; existing authority retained | Final feature-merge acceptance / owner |
| D02–D04 / T06 | Project-aware failure handling and diagnosability with direct installed routing | Simple recovery, effect-aware retry and actionable failure evidence delivered with source examples; no project policy or later topic changed | Final feature-merge acceptance / owner |
| D02–D04 / T07 | Risk-driven tests and faithful reproduction with direct installed routing | Topic, source-backed examples and three reader routes delivered; detailed reproduction guidance migrated without changing testing gates | Final feature-merge acceptance / owner |
| D02–D04 / T08 | Proportionate security guidance and direct installed routing | Trust/access, safe input, secrets and source-backed examples delivered; no new policy, controller or validation stage | Final feature-merge acceptance / owner |
| D02–D04 / T09 | Proportional review, finding value and author dispositions with direct installed routing | Verified principles/examples delivered; detailed reference explanation migrated to KB, existing hard review and author boundaries retained | Final feature-merge acceptance / owner |
| D02–D04 / T10 | Safe execution concurrency and proportional delegation with direct installed routing | Independent execution, ownership and integrated evidence delivered with source examples; multi-agent practices labeled evolving; no new authority or gate | Final feature-merge acceptance / owner |
| D02–D04 / T11 | Actionable project learning and direct installed routing | Verified reuse/refinement, source-backed examples and three reader routes delivered; project-specific Experience retained; no new recording quota or gate | Final feature-merge acceptance / owner |
| D02–D04 / T12 | Code-level simplicity/clarity and direct installed routing | Verified professional examples, behavior-preservation limits and two reader routes delivered; no line-count/style mandate or later topic authored | Final feature-merge acceptance / owner |
| D02–D04, D07 / T13 | Design-stage performance and observability with direct installed routing | Design-stage measurement/interpretation, five boundaries, useful-work example and author/reviewer triggers delivered; actual installed topic/routing covered. Shared README criteria retained without topic duplication | Final feature-merge acceptance / owner |
| D02–D04, D07, D08 / T14 | Code-level performance guidance and global evidence-grounded solution research | Five cost mechanisms and source-backed examples retained; initial workflow-owned research rule delivered in PR #171, with its accepted ownership migration implemented by T15 | Merged to feature in PR #171; final readiness remains |
| D01, D02, D03, D08 / T15 | Shared Solution Research document with mandatory direct version-correct routes | Full research rule has one KB owner; README, performance-topic reference and three skills route to it. Existing focused tests cover installed and candidate versions, cleanup persistence and legacy compatibility. No new installer mechanism, gate or live upgrade | Merged to feature in PR #172; final readiness remains |
| D01–D08 / T16 | Complete installed, project-aware KB integration | Actual complete-tree lifecycle proof added to existing cases; triage's existing three-route resolver now covers all its KB topics. README describes installed KB and correct validation timing; no installer or accepted-design change | Merged to feature in PR #173; implementation audit approved; closing PR owns full validation and final acceptance |

#### Cleanup inventory

| Item | Keep, archive, remove, or reset | Ownership and evidence | Result |
| --- | --- | --- | --- |
| Manifest, project policies, Experience and official KB | Keep | Reusable authority/guidance; local content preserved | Preservation implemented and focused-tested; existing local items unchanged |
| Concluded whiteboard and completed plan | Combined archive linked to issue #156 and closing PR #157 | Complete sources preserved here; owner explicitly authorized closing/reset on 2026-10-16 | Included in closing candidate |
| Live plan and working whiteboard | Remove live plan and reset working whiteboard after this archive exists | Owner explicitly authorized these transitions on 2026-10-16; no other design change | Included in closing candidate |
| Owned task and feature branches/worktrees | Remove only merged owned units after applicable target verification | Exclude other deliveries and user-owned data | Pending |
| Local runtime/checkouts | Installer-managed lifecycle only | Preserve accepted runtime until authorized replacement; no blanket deletion | Accepted pin unchanged; no upgrade or activation authorized by this closure |

### Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks | All sixteen implementation tasks accepted and merged; closing PR owns final readiness and acceptance | DISCLOSE |
| Design consistency | D01–D08 delivered without changing the frozen whiteboard. T16 reconciles actual package integration, version-matched topic routes and README. No new validation requirement or fail-closed behavior | DISCLOSE |
| Execution mode | Autopilot off; stop after every task for owner review and merge decision | Existing owner decision retained |
| Validation | Per-task focused checks and reviews belong in their PRs. Complete-package focused coverage, implementation audit and coverage reconciliation are complete; exact final review and full validation remain required in closing PR #157 | DISCLOSE |
| Foreseeable decisions | Archive/reset already authorized; separate final main-merge acceptance remains required after exact-head review and full validation | HUMAN_DECISION at applicable boundary, not blanket permission |
