# Delivery archive — Evidence-driven problem triage

<!-- sdd: delivery-archive -->

| Field | Value |
| --- | --- |
| Issues | [#152](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/152) |
| Closing pull request | [#153](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/153) |

Complete accepted design and final plan follow. Headings, relative links and
machine-local path presentation are adapted for durable embedding. GitHub owns exact-head review, validation,
merge authorization and target evidence. The owner authorized complete
archive/reset at plan acceptance and the schema-only correction separately.

<!-- sdd: archived-whiteboard -->

## Solution Whiteboard — Evidence-driven problem triage

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [Issue #152](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/152) |
| Owner | Repository owner |
| Concluded design revision | `a8f0f186f63130940f78c8909820fad3fecff5e2` |
| Open owner decisions | `None` |

### Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| DR01 | Add a portable triage skill for evidence-driven root-cause investigation. | accepted |
| DR02 | Include faithful reproduction, useful logs, and uncertain or flaky test failures. | accepted |
| DR03 | Activate on diagnostic need, including test execution failures; not every known typo or missing dependency. | accepted |
| DR04 | Author may collaborate with retained reviewers on useful independent hypotheses. | accepted |
| DR05 | Preserve canonical error handling, authority, existing trackers, and proportional effort. | accepted |
| DR06 | Install the skill into project profiles and explain it without duplicating its methods. | accepted |

### Current understanding

| Concern | Boundary |
| --- | --- |
| Required outcome | Agents can investigate an unexplained failure, establish justified causal confidence, and choose the smallest safe correction or next check. |
| In scope | One short `sdd-problem-triage` skill; workflow/adoption/upgrade routing; optional reviewer collaboration; portable installer/runtime support; relevant regression tests and README introduction. |
| Out of scope | New incident service, diagnostic tools, lifecycle engine, tracker, required investigation gate, mandatory RCA for every error, or expanded operational authority. |
| Current gap | The error-handling authority classifies failures and controls recovery but does not provide a portable diagnosis/reproduction skill. |

### Authority and context

| Source | Role |
| --- | --- |
| Owner discussion and Issue #152 | Requested outcomes and scope. |
| [Manifest](../project-adoption-manifest.md), [CONTRIBUTING](../../../CONTRIBUTING.md) | Project authorities, review, testing, and merge boundaries. |
| [Error handling](../../../docs/error-handling.md) | Canonical classification, recovery, issue tracking, and escalation; not replaced by this skill. |
| [Google SRE troubleshooting](https://sre.google/sre-book/effective-troubleshooting/), [postmortem culture](https://sre.google/workbook/postmortem-culture/) | Supporting references for testable hypotheses, evidence, contributing causes, and actionable lessons. |
| [Chromium bug reporting](https://www.chromium.org/for-testers/bug-reporting-guidelines/), [pytest flaky tests](https://docs.pytest.org/en/stable/explanation/flaky.html) | Supporting references for faithful reduced reproducers and uncontrolled state; not new project authority. |

### Concluded design

Owner accepted the independently reviewed candidate `a8f0f186` on 2026-10-10.

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| TR01 | Skill distinguishes facts and assumptions, compares expected/actual behavior, records relevant revision/environment and uses testable hypotheses with discriminating evidence. | Distinguish symptom, trigger, cause, and contributing factors. State confirmed, suspected, or unknown; a workaround or correlation is not proof. No rigid step sequence. | A review scenario cannot turn a successful retry into a confirmed root cause without evidence. |
| TR02 | Faithful reproduction and minimal observability preserve the conditions that cause the original failure. | Preserve relevant inputs, state, ordering, configuration, concurrency and failure criterion; simplify only while the same failure remains. Sanitize secrets. Use controlled scheduling where useful and report failure/run counts for intermittent failures; one pass does not prove absence. Logs and tracing must be proportionate and account for observer effects. Unable to reproduce remains explicit uncertainty. | Guidance supports isolated flaky/race investigations without mocked-away triggers, sleep piles, endless retries, or invented causes. A verified fix may turn the faithful reproducer into a regression test. |
| TR03 | Workflow routes unexplained or recurrent test/execution failures and diagnostic uncertainty to the installed skill. Adoption and upgrade can use the same skill for their diagnostic failures. | Known, bounded mistakes can be corrected directly. Diagnosis never converts a failed required test into a pass, skips assertions, or authorizes retry-until-green. Preserve existing testing gates. | Test-failure scenario finds the skill; a trivial known typo does not require formal RCA. |
| TR04 | Author may work with the feature's retained reviewers to challenge hypotheses, causal evidence, and remedy proportionality. | Delegate bounded independent questions only when useful. Author integrates evidence. Joint triage is not review approval; fixes still receive independent exact-candidate review under existing rules. No new reviewer session or gate per failure. | Reviewers can expose a counterexample without imposing another investigation ceremony or self-approving their fix. |
| TR05 | Skill consumes the project's canonical error-handling authority and existing permission boundaries. | Default read-only; production changes, restart, rollback, destructive actions and scope changes still need existing authority. Authorized urgent mitigation need not wait for RCA. Use owning Issue/PR or plan, not a new triage document; only verified reusable lessons belong in Experience. | Investigation output names evidence, confidence, impact, smallest fix/next check, and responsible authority. No copied recovery framework or extra policy. |
| TR06 | Installer packages `sdd-problem-triage` for adoption, workflow and upgrade profiles, with existing managed ownership and runtime provenance protections. | Preserve older immutable pins that do not contain the skill. Routing must work from installed project paths, not source-only relative links. Reuse existing installer mechanisms; README introduces the capability and skills/policy link to the owning guidance rather than repeat it. | Profile installation, legacy-pin compatibility, ownership/provenance and installed-link tests cover the new artifact under existing validation gates. |

### Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition |
| --- | --- | --- |
| DR01 | TR01 | accepted |
| DR02 | TR02 | accepted |
| DR03 | TR03 | accepted |
| DR04 | TR04 | accepted |
| DR05 | TR05 | accepted |
| DR06 | TR06 | accepted |

### Assumptions

| Assumption | Evidence / disposition |
| --- | --- |
| None | No new operational entitlement or universal reproducibility is assumed. An unavailable reviewer or reproducer does not prevent bounded author-led diagnosis. |

### Newly introduced validations

| ID | Validation, owning authority, and execution boundary | Protected outcome / risk and marginal value beyond existing controls | Concrete invalid case | Failure effect / recovery | Cost / risk reduction | Existing/reusable or cheaper mechanism, its coverage, and why insufficient | Fail-close / test reference | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| None | None | None | None | None | None | None | None | None |

No new acceptance checkpoint or runtime rejection is designed. Existing installer
ownership and provenance checks apply to the new managed artifact; the plan
will list its regression tests under the existing validation gates.

### Newly introduced fail-closed behaviors

| ID | Trigger | Required fail-closed response | Concrete example | Impact | Recovery / best next action | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- |
| None | None | None | None | None | None | None |

Existing project authority and error-handling boundaries remain unchanged.
The skill provides diagnostic judgment, not a new reason to halt delivery.

### Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Design | TR01–TR06; evidence-based triage, faithful reproduction, test-failure routing, optional reviewer collaboration, and portable installation. | Owner accepted after both reviewers approved |
| Important boundaries | No new authority, document, gate, or mechanical procedure; error handling remains canonical. | Preserved |
| Upgrade | Reusable-runtime upgrade from `d69a50b0da190226fc40584016bebed3c381c0c8` to `775f1479e8a1ce6277af7448d509cabe95374ad3`. | Owner accepted after both reviewers approved |
| Remaining gaps | None at design acceptance; implementation has not begun. | NONE |

<!-- sdd: archived-implementation-plan -->

## Implementation Plan — Evidence-driven problem triage

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority. Detailed evidence stays in
[PR #153](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/153).

### Delivery status

| Field | Value |
| --- | --- |
| State | `COMPLETE` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | `human-review-before-merge` |
| Authorized scope / feature branch / protected target | No Autopilot authorization; single PR to `main` |
| Delivery branch / target | `codex/problem-triage` / `main` |
| Owner | Repository owner |
| Primary issue / need | [Issue #152](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/152) |
| Concluded whiteboard | [Whiteboard](#solution-whiteboard--evidence-driven-problem-triage), approved candidate `a8f0f186f63130940f78c8909820fad3fecff5e2`; conclusion commit `5965046da53558638d91e10b7242a292549a9f2c` verified by both retained reviewers |
| Required reviewers | Retained Reviewer One and Reviewer Two for this delivery |
| Last verified | 2026-10-10; T01 implemented and audited by both retained reviewers; 36 affected installer tests and changed-file documentation checks pass; owner authorized schema-only normalization; PR owns exact closing-candidate reviews, full validation and pending merge facts |

### Governing inputs and boundaries

The frozen whiteboard owns TR01–TR06. [CONTRIBUTING](../../../CONTRIBUTING.md)
owns branch, review, merge and cleanup boundaries; the manifest links the
canonical [quality](../../../docs/documentation-quality-policy.md) and
[error-handling](../../../docs/error-handling.md) authorities. This plan does not
amend them.

Required outcome: an installed project can discover and use one concise
evidence-driven diagnosis skill, including faithful reproduction, unclear test
failures and useful optional reviewer collaboration. No new tracker, policy,
gate, operational permission, diagnostic service, or mandatory RCA ceremony.
Material assumptions and unresolved design gaps: `None`.

### Design-to-task mapping

| Design | Task work | Validation | Consistency |
| --- | --- | --- | --- |
| TR01 | T01: skill evidence, hypotheses and causal-confidence judgment | Semantic scenarios: workaround is not proof; uncertainty remains explicit | Aligned |
| TR02 | T01: faithful reproduction, minimal logs and intermittent/concurrent failure handling | Scenarios: preserve cause-bearing conditions, controlled timing and honest failure counts | Aligned |
| TR03 | T01: concise workflow/adoption/upgrade routing | Installed discovery and routing checks; distinguish unknown failure from known trivial correction | Aligned |
| TR04 | T01: optional bounded reviewer collaboration | Independent review checks joint triage is not approval or a new gate | Aligned |
| TR05 | T01: authority, records and compact diagnosis output | Review read-only/default authority, canonical ownership and useful output | Aligned |
| TR06 | T01: portable packaging and README introduction | Installer profile, ownership, provenance, legacy and installed-path regressions; README/diagram/link consistency | Aligned |

### Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | `DONE` | `None` | Portable triage skill with coherent routing, installation, guidance and regression coverage | TR01–TR06 only; reuse existing installer and test mechanisms | Focused checks before review; audit then full exact-head validation at final gate | `codex/problem-triage`; [PR #153](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/153); `main` |

One coherent implementation unit uses the canonical single-PR integration
model. Separating skill routing from packaging would create an unusable
intermediate result. There is no task-to-feature-branch merge to automate.

### Task specifications and context receipts

#### T01 — Definition of Done and readiness

| Concern | Required result |
| --- | --- |
| Skill | `skills/sdd-problem-triage/SKILL.md` owns concise diagnosis/reproduction judgment and output, with relevant primary references; no prescribed procedure or copied recovery framework |
| Routing | Workflow error handling/test diagnosis, adoption and upgrade point to the installed skill; reviewer guidance links it only when undertaking diagnosis |
| Packaging | `install-sdd.sh` installs triage for adoption, workflow and upgrade profiles, reuses managed ownership/provenance, and preserves older immutable pins without the skill |
| Documentation | `docs/error-handling.md` links diagnosis guidance without duplicating it; README introduction, appropriate diagram, TOC and repository map remain consistent |
| Source boundary | The skill, affected routing skills, installer, README, error-handling link, related source tests and canonical delivery state only |
| Context receipt | Current manifest, frozen whiteboard, CONTRIBUTING, quality/error-handling/Experience/template guidance read; worktree-focused checks and runtime validation passed; no missing implementation prerequisite |
| Exclusions | Issues #142/#147, dependency changes, new tools or investigation gates, operational mutations, changes to frozen design |
| Implementation time | Existing 90-minute per-task active implementation boundary applies |
| Actual result | Skill, routing, installer support and README candidate implemented; five focused regressions cover compatibility, integrity, installed links and offline rejected-upgrade recovery; all 36 affected installer tests and changed-file documentation checks pass; skill metadata and installer syntax checks pass |

### Test and acceptance inventory

This inventory owns coverage obligations, not run history. No new validation
gate or fail-closed behavior is introduced. Reuse existing source tests and
fixture helpers rather than create another test framework.

| Owner | Outcome / risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| T01 | TR01–TR05: useful, proportionate triage | Exact-skill semantic review of unexplained failure, unsuccessful hypothesis, workaround, unreproducible failure and optional collaboration | Verified in retained-reviewer semantic scenarios | Task review |
| T01 | TR06: all project profiles can load triage | Isolated adoption/workflow/upgrade fixture installation and installed routing resolution | Implemented in `tests/installer.test.mjs` | Focused task tests |
| T01 | TR06: preserve project ownership | Existing managed-skill protection applied to triage; unmanaged content remains untouched | Implemented in `tests/installer.test.mjs` | Focused task tests |
| T01 | TR06: runtime provenance | Existing runtime integrity checks cover changed installed triage content | Implemented in `tests/installer.test.mjs` | Focused task tests |
| T01 | TR06: old immutable pins | Fixture source without triage still installs/validates its existing contract without a dangling new route | Implemented in `tests/installer.test.mjs` | Focused task tests |
| T01 | TR03/TR06: portable links and README | Changed Markdown/Mermaid, installed-path checks and semantic consistency review | Existing mechanisms; new cases as needed | Focused task checks |
| T01 | Complete source regression and documentation consistency | `npm run docs:all`; installer syntax and skill metadata checks already pass | Existing suite; all tests present; exact closing-head results owned by PR | Final gate only, after implementation audit and final candidate review |

Any additional missing non-focused coverage discovered during implementation
is recorded here with T01 ownership and added at final readiness. All known required
tests are present; exact closing-head coverage and run evidence belong in the PR.

### Final readiness and cleanup

| Error / class | Evidence and bounded recovery | State |
| --- | --- | --- |
| Original whiteboard schema / agent mistake | Owner authorized canonical design/draft/reconciliation headers and accepted disposition tokens only; TR01–TR06 substantive text unchanged. No checker change or new issue. | Corrected within exact authorization; verified by both retained reviewers |

Follow canonical authority: required target synchronization and affected
focused checks precede the author/two-reviewer implementation audit. Audit
approval precedes missing final-gate test additions; final candidate review
precedes full exact-head validation. No routine mid-task synchronization.

### Cleanup inventory

| Item | Obligation / ownership | Authority / state |
| --- | --- | --- |
| Final acceptance | TR01–TR06 delivered, compatibility and applicable checks passed, exact-head reviewer approvals and human merge authorization in PR | Closing candidate contains completed outcomes; exact review/check/merge facts remain in PR; main merge not yet authorized |
| Combined archive | Preserve complete concluded whiteboard and final plan, link Issue #152 and closing PR #153 in both directions | Owner authorized at plan acceptance; complete sources embedded in this closing candidate |
| Live documents | Remove live plan and reset whiteboard only after combined archive exists | Owner authorized at plan acceptance; reset after embedding complete sources |
| Local worktree / branch | After authorized merge and target verification, remove this delivery's owned worktree and merged `codex/problem-triage`; preserve other work. Git worktree registration and PR evidence identify its machine-local location. | Delivery-owned; cleanup remains pending |
| Reusable authority | Keep manifest, reusable project guidance and installed accepted runtime | Retain |

### Planned versus actual outcome

| Plan | Actual outcome / deviation |
| --- | --- |
| TR01–TR06 in one T01 | Skill, routing, packaging, README and five regressions implemented; no design expansion |
| Preserve accepted runtime on rejected upgrade | Recovery uses accepted ancestor content in the verified candidate; filtered-clone offline regression verifies exact restored bytes |
| Preserve complete design and plan at closure | Owner authorized archive/reset; schema-only author drafting correction approved separately; complete sources embedded before live reset |

### Delivery Definition of Done

Accepted outcomes and all known tests are implemented. Author and both retained
reviewers approved implementation content at `8cee259`; final candidate review,
full exact-head source validation and human main-merge acceptance remain required
PR facts. `COMPLETE` describes the tracked delivery state if this closing
candidate merges; it does not assert an unrun check or an unapproved merge.
Detailed run, review and eventual target-verification evidence belongs in PR #153.

### Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Task | One coherent T01 implementing all six accepted design points | Owner accepted |
| Mode | Default human review before `main` merge; Autopilot has no intermediate merge to authorize in this single-PR delivery | Owner accepted default |
| Foreseeable decisions | No unresolved product or authority decision; scoped archive/reset authorized so closure needs no separate bookkeeping pause | Final `main` merge remains HUMAN_DECISION |
| Validation | Changed-file focused checks required before plan review; full source suite intentionally deferred to the final gate | AGENT_ACTION / DISCLOSE |

Detailed reviews and run evidence remain in PR #153, not this plan.
