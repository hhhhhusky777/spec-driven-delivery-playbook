# Solution Whiteboard — Project-aware engineering Knowledge Base

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

## Discussion draft

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

## Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem | Portable skills contain short practice summaries and external references, but no installed shared owner for their detailed application guidance |
| Required outcome | Authors and reviewers can read version-matched, distilled engineering guidance and apply it inside actual project boundaries |
| In scope | KB content, complete installation/upgrade, manifest discovery, portable skill routing, affected README/diagrams, focused regressions and final validation |
| Out of scope | New agent framework, policy suite, generic linter for code style, project-specific Experience migration, copied third-party manuals, blanket automatic conflict resolution |

## Authority and facts

| Source | Authority or relevant evidence |
| --- | --- |
| Owner discussion | Approves the KB purpose, topic set, project-aware application, direct topic routing, and per-document human stops |
| [Contributing](../../CONTRIBUTING.md) | Feature/task branch policy, two independent retained reviewers, human acceptance, focused/full validation and cleanup |
| [Quality policy](../../docs/documentation-quality-policy.md) | Necessary complexity, canonical ownership, design freeze, human brief and validation disclosure |
| [Error handling](../../docs/error-handling.md) | Recovery, gap tracking and escalation; no second error-handling framework |
| [Installer](../../install-sdd.sh) | Existing immutable revision, managed-content ownership, candidate validation and rollback mechanisms to reuse |
| [Skills](../../skills/sdd-project-workflow/SKILL.md) | Existing concise principles, scope references, concurrent-work guidance and project-context entry points |
| [Project Experience](../../docs/experience.md) | Durable project-specific lessons; must remain separate from centrally maintained KB |

Material assumptions: None. The owner accepted the reviewed standalone-document
amendment and both reviewers' dispositions. V01 and FC01–FC02
remain unchanged and approved. Research semantics stay within existing review
and error-handling boundaries; no independent checkpoint, runtime rejection or
fail-closed behavior is added.

## Concluded design

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

## Proposed task mapping

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

### Global solution research

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

## Topic boundaries and reference-backed examples

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

### Performance boundaries and technical coverage

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

Apply the KB-wide [content-selection criteria](../../knowledge-base/README.md#content-selection-and-refinement)
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

## Draft-to-design reconciliation

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

## Newly introduced validations

Research amendment delta: None. The existing accepted inventory is retained.
D08 strengthens solution evidence within existing review, not a new acceptance
checkpoint or runtime validation.

| ID | Validation / authority / execution boundary | Protected outcome / risk / marginal value | Concrete invalid case | Failure effect / recovery | Cost / risk reduction | Existing or cheaper mechanism / coverage / why insufficient | Fail-close / test reference | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| V01 | Extend existing installer/runtime integrity and synchronization ownership/baseline checks to official KB content when the pinned revision ships it; installer and runtime-validation boundary | Prevent missing/mixed guidance and unintended loss of local or non-owned content | A required topic has a mismatched revision, or upgrade would overwrite a locally edited topic | FC01; FC02 | Bounded official-file/baseline checks, not project-code inspection or an additional validation stage | Reuse managed-skill provenance/ownership patterns; current checks do not cover shared KB content or local KB changes | FC01; FC02; T01 and T16 test inventory | Approved |

## Newly introduced fail-closed behaviors

Research amendment delta: None. Existing uncertainty/authority handling applies;
the accepted inventory is retained.

| ID | Trigger | Required fail-closed response | Concrete example | Impact | Recovery / best next action | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- |
| FC01 | A revision declares KB content but its required official package is missing or inconsistent with that revision | Do not claim valid installation/upgrade or proceed with dependent KB-guided work | Accepted skill requires code-simplicity guidance but that installed topic belongs to another revision | Only dependent activation/work waits; previous accepted state remains preserved | Agent restores/regenerates verified official content within authority and reruns affected validation; resume only when content and pin match. Legacy pins with no KB have no such requirement | Approved |
| FC02 | KB synchronization would overwrite or remove content whose installer ownership or unchanged managed baseline cannot be established | Preserve that content; stop only its conflicting synchronization until disposition | A project edited an official KB topic locally; an upgrade must not erase the edit as though it were untouched vendor content | The affected upgrade cannot complete silently; no unrelated project cleanup | Agent compares local/official content and proposes preservation or reconciliation; owner authorizes any destructive or policy-affecting resolution before synchronization resumes | Approved |

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Design | D08 replaces uncertainty-only reference use with research-grounded solution selection across design and implementation; language/runtime are research inputs, not implicit technology-change authority | Approved |
| Ownership | Solution Research becomes one shared KB document; all three skills keep mandatory short reads at their current positions. Accepted installed KB and upgrade-candidate KB remain separate | Approved |
| Delivery granularity | Preserve one document per task: T15 extracts Solution Research; unstarted final integration moves to T16. Fourteen documents plus two supporting units; stop after every task, no Autopilot | Approved |
| New controls | None in this amendment. Approved V01, FC01 and FC02 remain unchanged | DISCLOSE |
| State | Metadata records design state; review/acceptance never claims implementation or installed KB activation | DISCLOSE |
