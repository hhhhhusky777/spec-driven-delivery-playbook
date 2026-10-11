# Solution Whiteboard — Project-aware engineering Knowledge Base

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `OPEN` |
| Need / issue | [Issue #156](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/156) |
| Owner | Repository owner |
| Concluded design revision | `None` |
| Open owner decisions | `None` |

## Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| DR01 | Package detailed engineering practices as an installed, versioned Knowledge Base rather than expanding skills indefinitely | Accepted; D01 |
| DR02 | Skills retain concise principles and topic-specific read triggers; author and reviewers both use the KB | Accepted; D02 |
| DR03 | Project boundaries and KB core principles constrain outcomes; agents choose the simplest sufficient project-specific implementation, not whether to ignore the principles | Accepted; D03 |
| DR04 | Read the relevant distilled topic first; consult primary references only for unresolved questions. README is a human index, not a mandatory routing hop | Accepted; D02, D04 |
| DR05 | Include nine topic documents and a lightweight README; examples explain decisions, not universal frameworks or mandatory recipes | Accepted; D04 |
| DR06 | Install and upgrade all official KB documents with the pinned playbook; preserve project policies, Experience and non-owned content | Accepted; D01, D05 |
| DR07 | Each document is a separate task; stop after every completed task for owner wording review rather than batch acceptance at the end | Accepted; D06; Autopilot off |
| DR08 | Do not claim all methods are universal industry standards; distinguish mature principles from emerging multi-agent practice | Accepted; D03, D04 |

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

Material assumptions: None. Remaining owner decisions: None apparent for this scope.

## Concluded design

The metadata state controls whether this reviewed design candidate is frozen.

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| D01 | Source `knowledge-base/` contains the nine topics and README. Projects receive its official documents at `.github/spec-driven-delivery/knowledge-base/`, Git-tracked and retained through cleanup | Manifest indexes the installed KB root/revision relationship; runtime uses the same accepted immutable playbook pin, not another version history or feature-state record | Actual installation contains every official document; links and pin agree |
| D02 | Skills keep short outcome principles and explicit task-relevant instructions to read the matching KB topic before applying it. Both author and reviewers use the same installed KB | Resolve topics from the manifest-linked KB root, not source-repository-relative paths that break on installation. Do not add a compulsory README hop, routinely reload unchanged topics, or duplicate full guidance | Real installed author/reviewer/triage contexts can locate and use their topic; source and installed routing both work |
| D03 | Agents choose a project-specific implementation satisfying both project authority and agreed core principles, with reuse and minimal sufficient change | Examples and reference implementation techniques are not mandatory. True conflicts follow existing error handling; an agent cannot silently ignore a principle or modify project authority. No speculative abstractions, policy additions, universal recipes, or personal-style blockers | Author/reviewer scenarios distinguish a simpler suitable implementation from mechanical framework adoption or principle avoidance |
| D04 | Each topic distills verified primary practice into concise principles, application boundaries and useful examples, retaining original reference links | Knowledge is not a copied manual or exhaustive checklist. References support deeper questions, not new authority. Multi-agent techniques are identified as evolving rather than universal standards | Per-document semantic review verifies claims, applicability, reference provenance and lack of duplicate detailed owners |
| D05 | Adoption and upgrade install/synchronize the complete official tree: additions, modifications, and removals of obsolete managed documents | Preserve project policies, Experience and unrelated/local content. Reuse existing installer ownership/provenance/rollback patterns. Legacy revisions without KB remain valid; new obligations apply only when the revision ships KB. An unaccepted candidate cannot silently activate newer obligations | Focused install/upgrade/rejection tests prove full-tree copying, safe removals, local-content preservation, old-pin compatibility and accepted runtime consistency |
| D06 | Each of ten KB documents is one task, with its own wording review and human stop. Supporting installation and final integration are separate tasks | Normal feature integration model: task PRs target `codex/knowledge-base`, never `main`; final PR alone targets `main`. Autopilot is off. No next task starts before owner acceptance of the current task | Implementation plan records per-task owner gate, design mapping, dependencies, branch and PR target; PR evidence retains each review |

## Proposed task mapping

These are planning inputs, not an implementation plan or permission to bypass design acceptance.

| Task | Unit | Design mapping | Human boundary |
| --- | --- | --- | --- |
| T01 | Minimal installer/manifest support for an optional-at-legacy-pins KB directory, without changing legacy obligations | D01, D05 | Supporting task review; stop |
| T02 | `knowledge-base/README.md`: human-facing index and usage/authority boundary; future topics identified without broken links | D02, D03, D04 | Document wording review; stop |
| T03 | `minimal-change-and-code-simplicity.md` | D02, D03, D04 | Document wording review; stop |
| T04 | `architecture-scope-and-assumptions.md` | D02, D03, D04 | Document wording review; stop |
| T05 | `contracts-and-compatibility.md` | D02, D03, D04 | Document wording review; stop |
| T06 | `error-handling-and-diagnosability.md` | D02, D03, D04 | Document wording review; stop |
| T07 | `testing-and-reproduction.md` | D02, D03, D04 | Document wording review; stop |
| T08 | `security-basics.md` | D02, D03, D04 | Document wording review; stop |
| T09 | `proportional-review.md` | D02, D03, D04 | Document wording review; stop |
| T10 | `efficiency-and-concurrency.md` | D02, D03, D04 | Document wording review; stop |
| T11 | `experience-and-learning.md` | D02, D03, D04 | Document wording review; stop |
| T12 | Final integration: remove migrated detailed duplication, reconcile routing/adoption/upgrade/README diagrams, verify complete installed package | D01–D06 | Integration review; stop, then final readiness under existing gates |

Each topic task includes its immediate skill trigger, index and affected checks;
links must resolve within the task candidate. Supporting edits do not create
another topic or permit completing later documents early. T12 is reconciliation,
not a second copy of the documentation or a new validation controller.

## Draft-to-design reconciliation

All DR01–DR08 items map to D01–D06 above with accepted intent. Formal conclusion
and freeze require two independent reviewers and owner acceptance under the
existing accepted-design authority.

## Newly introduced validations

| ID | Validation / authority / execution boundary | Protected outcome / risk / marginal value | Concrete invalid case | Failure effect / recovery | Cost / risk reduction | Existing or cheaper mechanism / coverage / why insufficient | Fail-close / test reference | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| V01 | Extend existing installer/runtime integrity and synchronization ownership/baseline checks to official KB content when the pinned revision ships it; installer and runtime-validation boundary | Prevent missing/mixed guidance and unintended loss of local or non-owned content | A required topic has a mismatched revision, or upgrade would overwrite a locally edited topic | FC01; FC02 | Bounded official-file/baseline checks, not project-code inspection or an additional validation stage | Reuse managed-skill provenance/ownership patterns; current checks do not cover shared KB content or local KB changes | FC01; FC02; T01 and T12 test inventory | Pending |

## Newly introduced fail-closed behaviors

| ID | Trigger | Required fail-closed response | Concrete example | Impact | Recovery / best next action | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- |
| FC01 | A revision declares KB content but its required official package is missing or inconsistent with that revision | Do not claim valid installation/upgrade or proceed with dependent KB-guided work | Accepted skill requires code-simplicity guidance but that installed topic belongs to another revision | Only dependent activation/work waits; previous accepted state remains preserved | Agent restores/regenerates verified official content within authority and reruns affected validation; resume only when content and pin match. Legacy pins with no KB have no such requirement | Pending |
| FC02 | KB synchronization would overwrite or remove content whose installer ownership or unchanged managed baseline cannot be established | Preserve that content; stop only its conflicting synchronization until disposition | A project edited an official KB topic locally; an upgrade must not erase the edit as though it were untouched vendor content | The affected upgrade cannot complete silently; no unrelated project cleanup | Agent compares local/official content and proposes preservation or reconciliation; owner authorizes any destructive or policy-affecting resolution before synchronization resumes | Pending |

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Design | Installed shared KB plus concise, project-aware skill principles and topic-read triggers | HUMAN_DECISION after reviewer approval |
| Delivery granularity | Twelve proposed tasks: ten separate documents and two supporting units; stop after every task, no Autopilot | DISCLOSE |
| New controls | V01, FC01 and FC02 extend managed-content integrity/ownership to KB; no new project-code checker or policy suite | HUMAN_DECISION after reviewer approval |
| State | Metadata records design state; review/acceptance never claims implementation or installed KB activation | DISCLOSE |
