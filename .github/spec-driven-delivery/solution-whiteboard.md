# Solution Whiteboard — Evidence-driven problem triage

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `CONCLUDED` |
| Need / issue | [Issue #152](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/152) |
| Owner | Repository owner |
| Concluded design revision | `a8f0f186f63130940f78c8909820fad3fecff5e2` |
| Open owner decisions | `None` |

## Discussion draft

| ID | Agreed discussion outcome | Resolution |
| --- | --- | --- |
| DR01 | Add a portable triage skill for evidence-driven root-cause investigation. | TR01 |
| DR02 | Include faithful reproduction, useful logs, and uncertain or flaky test failures. | TR02 |
| DR03 | Activate on diagnostic need, including test execution failures; not every known typo or missing dependency. | TR03 |
| DR04 | Author may collaborate with retained reviewers on useful independent hypotheses. | TR04 |
| DR05 | Preserve canonical error handling, authority, existing trackers, and proportional effort. | TR05 |
| DR06 | Install the skill into project profiles and explain it without duplicating its methods. | TR06 |

## Current understanding

| Concern | Boundary |
| --- | --- |
| Required outcome | Agents can investigate an unexplained failure, establish justified causal confidence, and choose the smallest safe correction or next check. |
| In scope | One short `sdd-problem-triage` skill; workflow/adoption/upgrade routing; optional reviewer collaboration; portable installer/runtime support; relevant regression tests and README introduction. |
| Out of scope | New incident service, diagnostic tools, lifecycle engine, tracker, required investigation gate, mandatory RCA for every error, or expanded operational authority. |
| Current gap | The error-handling authority classifies failures and controls recovery but does not provide a portable diagnosis/reproduction skill. |

## Authority and context

| Source | Role |
| --- | --- |
| Owner discussion and Issue #152 | Requested outcomes and scope. |
| [Manifest](project-adoption-manifest.md), [CONTRIBUTING](../../CONTRIBUTING.md) | Project authorities, review, testing, and merge boundaries. |
| [Error handling](../../docs/error-handling.md) | Canonical classification, recovery, issue tracking, and escalation; not replaced by this skill. |
| [Google SRE troubleshooting](https://sre.google/sre-book/effective-troubleshooting/), [postmortem culture](https://sre.google/workbook/postmortem-culture/) | Supporting references for testable hypotheses, evidence, contributing causes, and actionable lessons. |
| [Chromium bug reporting](https://www.chromium.org/for-testers/bug-reporting-guidelines/), [pytest flaky tests](https://docs.pytest.org/en/stable/explanation/flaky.html) | Supporting references for faithful reduced reproducers and uncontrolled state; not new project authority. |

## Concluded design

Owner accepted the independently reviewed candidate `a8f0f186` on 2026-10-10.

| ID | Outcome | Boundary / rationale | Acceptance signal |
| --- | --- | --- | --- |
| TR01 | Skill distinguishes facts and assumptions, compares expected/actual behavior, records relevant revision/environment and uses testable hypotheses with discriminating evidence. | Distinguish symptom, trigger, cause, and contributing factors. State confirmed, suspected, or unknown; a workaround or correlation is not proof. No rigid step sequence. | A review scenario cannot turn a successful retry into a confirmed root cause without evidence. |
| TR02 | Faithful reproduction and minimal observability preserve the conditions that cause the original failure. | Preserve relevant inputs, state, ordering, configuration, concurrency and failure criterion; simplify only while the same failure remains. Sanitize secrets. Use controlled scheduling where useful and report failure/run counts for intermittent failures; one pass does not prove absence. Logs and tracing must be proportionate and account for observer effects. Unable to reproduce remains explicit uncertainty. | Guidance supports isolated flaky/race investigations without mocked-away triggers, sleep piles, endless retries, or invented causes. A verified fix may turn the faithful reproducer into a regression test. |
| TR03 | Workflow routes unexplained or recurrent test/execution failures and diagnostic uncertainty to the installed skill. Adoption and upgrade can use the same skill for their diagnostic failures. | Known, bounded mistakes can be corrected directly. Diagnosis never converts a failed required test into a pass, skips assertions, or authorizes retry-until-green. Preserve existing testing gates. | Test-failure scenario finds the skill; a trivial known typo does not require formal RCA. |
| TR04 | Author may work with the feature's retained reviewers to challenge hypotheses, causal evidence, and remedy proportionality. | Delegate bounded independent questions only when useful. Author integrates evidence. Joint triage is not review approval; fixes still receive independent exact-candidate review under existing rules. No new reviewer session or gate per failure. | Reviewers can expose a counterexample without imposing another investigation ceremony or self-approving their fix. |
| TR05 | Skill consumes the project's canonical error-handling authority and existing permission boundaries. | Default read-only; production changes, restart, rollback, destructive actions and scope changes still need existing authority. Authorized urgent mitigation need not wait for RCA. Use owning Issue/PR or plan, not a new triage document; only verified reusable lessons belong in Experience. | Investigation output names evidence, confidence, impact, smallest fix/next check, and responsible authority. No copied recovery framework or extra policy. |
| TR06 | Installer packages `sdd-problem-triage` for adoption, workflow and upgrade profiles, with existing managed ownership and runtime provenance protections. | Preserve older immutable pins that do not contain the skill. Routing must work from installed project paths, not source-only relative links. Reuse existing installer mechanisms; README introduces the capability and skills/policy link to the owning guidance rather than repeat it. | Profile installation, legacy-pin compatibility, ownership/provenance and installed-link tests cover the new artifact under existing validation gates. |

## Draft-to-conclusion reconciliation

| Draft | Candidate | Disposition |
| --- | --- | --- |
| DR01 | TR01 | Preserved |
| DR02 | TR02 | Preserved |
| DR03 | TR03 | Preserved |
| DR04 | TR04 | Preserved |
| DR05 | TR05 | Preserved |
| DR06 | TR06 | Preserved |

## Assumptions

| Assumption | Evidence / disposition |
| --- | --- |
| None | No new operational entitlement or universal reproducibility is assumed. An unavailable reviewer or reproducer does not prevent bounded author-led diagnosis. |

## Newly introduced validations

| ID | Validation, owning authority, and execution boundary | Protected outcome / risk and marginal value beyond existing controls | Concrete invalid case | Failure effect / recovery | Cost / risk reduction | Existing/reusable or cheaper mechanism, its coverage, and why insufficient | Fail-close / test reference | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| None | None | None | None | None | None | None | None | None |

No new acceptance checkpoint or runtime rejection is designed. Existing installer
ownership and provenance checks apply to the new managed artifact; the plan
will list its regression tests under the existing validation gates.

## Newly introduced fail-closed behaviors

| ID | Trigger | Required fail-closed response | Concrete example | Impact | Recovery / best next action | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- |
| None | None | None | None | None | None | None |

Existing project authority and error-handling boundaries remain unchanged.
The skill provides diagnostic judgment, not a new reason to halt delivery.

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Design | TR01–TR06; evidence-based triage, faithful reproduction, test-failure routing, optional reviewer collaboration, and portable installation. | Owner accepted after both reviewers approved |
| Important boundaries | No new authority, document, gate, or mechanical procedure; error handling remains canonical. | Preserved |
| Upgrade | Reusable-runtime upgrade from `d69a50b0da190226fc40584016bebed3c381c0c8` to `775f1479e8a1ce6277af7448d509cabe95374ad3`. | Owner accepted after both reviewers approved |
| Remaining gaps | None at design acceptance; implementation has not begun. | NONE |
