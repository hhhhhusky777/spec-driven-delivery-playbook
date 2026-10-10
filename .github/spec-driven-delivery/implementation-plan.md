# Implementation Plan — Evidence-driven problem triage

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority. Detailed evidence stays in
[PR #153](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/153).

## Delivery status

| Field | Value |
| --- | --- |
| State | `BLOCKED` |
| Active tasks | `None` |
| Next ready task | `None` |
| Active blocker | Exact owner authorization for frozen-whiteboard schema-only normalization |
| Implementation mode | `human-review-before-merge` |
| Authorized scope / feature branch / protected target | No Autopilot authorization; single PR to `main` |
| Delivery branch / target | `codex/problem-triage` / `main` |
| Owner | Repository owner |
| Primary issue / need | [Issue #152](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/152) |
| Concluded whiteboard | [Whiteboard](solution-whiteboard.md), approved candidate `a8f0f186f63130940f78c8909820fad3fecff5e2`; conclusion commit `5965046da53558638d91e10b7242a292549a9f2c` verified by both retained reviewers |
| Required reviewers | Retained Reviewer One and Reviewer Two for this delivery |
| Last verified | 2026-10-10; T01 implemented; 36 affected installer tests and changed-file documentation checks pass; original whiteboard schema correction needs exact owner authorization before final readiness |

## Governing inputs and boundaries

The frozen whiteboard owns TR01–TR06. [CONTRIBUTING](../../CONTRIBUTING.md)
owns branch, review, merge and cleanup boundaries; the manifest links the
canonical [quality](../../docs/documentation-quality-policy.md) and
[error-handling](../../docs/error-handling.md) authorities. This plan does not
amend them.

Required outcome: an installed project can discover and use one concise
evidence-driven diagnosis skill, including faithful reproduction, unclear test
failures and useful optional reviewer collaboration. No new tracker, policy,
gate, operational permission, diagnostic service, or mandatory RCA ceremony.
Material assumptions and unresolved design gaps: `None`.

## Design-to-task mapping

| Design | Task work | Validation | Consistency |
| --- | --- | --- | --- |
| TR01 | T01: skill evidence, hypotheses and causal-confidence judgment | Semantic scenarios: workaround is not proof; uncertainty remains explicit | Aligned |
| TR02 | T01: faithful reproduction, minimal logs and intermittent/concurrent failure handling | Scenarios: preserve cause-bearing conditions, controlled timing and honest failure counts | Aligned |
| TR03 | T01: concise workflow/adoption/upgrade routing | Installed discovery and routing checks; distinguish unknown failure from known trivial correction | Aligned |
| TR04 | T01: optional bounded reviewer collaboration | Independent review checks joint triage is not approval or a new gate | Aligned |
| TR05 | T01: authority, records and compact diagnosis output | Review read-only/default authority, canonical ownership and useful output | Aligned |
| TR06 | T01: portable packaging and README introduction | Installer profile, ownership, provenance, legacy and installed-path regressions; README/diagram/link consistency | Aligned |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | `DONE` | `None` | Portable triage skill with coherent routing, installation, guidance and regression coverage | TR01–TR06 only; reuse existing installer and test mechanisms | Focused checks before review; audit then full exact-head validation at final gate | `codex/problem-triage`; [PR #153](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/153); `main` |

One coherent implementation unit uses the canonical single-PR integration
model. Separating skill routing from packaging would create an unusable
intermediate result. There is no task-to-feature-branch merge to automate.

### T01 — Definition of Done and readiness

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

## Test and acceptance inventory

This inventory owns coverage obligations, not run history. No new validation
gate or fail-closed behavior is introduced. Reuse existing source tests and
fixture helpers rather than create another test framework.

| Owner | Outcome / risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| T01 | TR01–TR05: useful, proportionate triage | Exact-skill semantic review of unexplained failure, unsuccessful hypothesis, workaround, unreproducible failure and optional collaboration | Planned review scenarios | Task review |
| T01 | TR06: all project profiles can load triage | Isolated adoption/workflow/upgrade fixture installation and installed routing resolution | Implemented in `tests/installer.test.mjs` | Focused task tests |
| T01 | TR06: preserve project ownership | Existing managed-skill protection applied to triage; unmanaged content remains untouched | Implemented in `tests/installer.test.mjs` | Focused task tests |
| T01 | TR06: runtime provenance | Existing runtime integrity checks cover changed installed triage content | Implemented in `tests/installer.test.mjs` | Focused task tests |
| T01 | TR06: old immutable pins | Fixture source without triage still installs/validates its existing contract without a dangling new route | Implemented in `tests/installer.test.mjs` | Focused task tests |
| T01 | TR03/TR06: portable links and README | Changed Markdown/Mermaid, installed-path checks and semantic consistency review | Existing mechanisms; new cases as needed | Focused task checks |
| T01 | Complete source regression and documentation consistency | `npm run docs:all`; installer syntax and skill metadata checks already pass | Existing suite; full run deferred; no known missing test | Final gate only, after implementation audit and final candidate review |

Any additional missing non-focused coverage discovered during implementation
is recorded here with T01 ownership and added at final readiness. Required
tests must be present before final review; no coverage claim is implied now.

## Final readiness and cleanup

| Error / class | Evidence and bounded recovery | State |
| --- | --- | --- |
| Original whiteboard schema / agent mistake | Existing checker requires canonical design/draft/reconciliation headers and accepted disposition tokens. Normalize only those headings/cells without changing TR01–TR06 substantive text, after exact owner authorization; no checker change or new issue is required. | Human authorization pending because the design is frozen |

Follow canonical authority: required target synchronization and affected
focused checks precede the author/two-reviewer implementation audit. Audit
approval precedes missing final-gate test additions; final candidate review
precedes full exact-head validation. No routine mid-task synchronization.

| Item | Obligation / ownership | Authority / state |
| --- | --- | --- |
| Final acceptance | TR01–TR06 delivered, compatibility and applicable checks passed, exact-head reviewer approvals and human merge authorization in PR | Pending; no merge authorized |
| Combined archive | Preserve complete concluded whiteboard and final plan, link Issue #152 and closing PR #153 in both directions | Owner authorized this transition at plan acceptance; construct after task completion |
| Live documents | Remove live plan and reset whiteboard only after combined archive exists | Owner authorized this transition at plan acceptance; frozen design remains unchanged until authorized closure |
| Local worktree / branch | After authorized merge and target verification, remove owned `/private/tmp/sdd-problem-triage` and merged `codex/problem-triage`; preserve other work | Delivery-owned; cleanup remains pending |
| Reusable authority | Keep manifest, reusable project guidance and installed accepted runtime | Retain |

## Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Task | One coherent T01 implementing all six accepted design points | Owner accepted |
| Mode | Default human review before `main` merge; Autopilot has no intermediate merge to authorize in this single-PR delivery | Owner accepted default |
| Foreseeable decisions | No unresolved product or authority decision; scoped archive/reset authorized so closure needs no separate bookkeeping pause | Final `main` merge remains HUMAN_DECISION |
| Validation | Changed-file focused checks required before plan review; full source suite intentionally deferred to the final gate | AGENT_ACTION / DISCLOSE |

Detailed reviews and run evidence remain in PR #153, not this plan.
