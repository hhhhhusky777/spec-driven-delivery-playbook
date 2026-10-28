# Implementation Plan — Playbook Behavior and Safety Coverage

<!-- sdd: implementation-plan -->

## Delivery status

| Field | Value |
| --- | --- |
| State | `IMPLEMENTING` |
| Active tasks | `T09, T11` |
| Next ready task | `None` |
| Active blocker | `None` |
| Implementation mode | Autopilot enabled by owner on 2026-10-28 |
| Authorized scope / feature branch / protected target | Task PR auto-merge after exact-head two-reviewer approval and required focused checks; remaining T03–T13 into `codex/playbook-eval-coverage`; protected target `main` |
| Delivery branch / target | `codex/playbook-eval-coverage` / `main`; final PR #201 |
| Owner | Repository owner; author coordinates implementation |
| Primary issue / need | [Issue #200](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/200) |
| Concluded whiteboard | [Accepted design](solution-whiteboard.md), revision `6e0f8f92d0b680d6eaadd62bb544f706a31c6f72`; conclusion metadata completed at `525e208` |
| Required reviewers | Retained independent seats `issue200_review1` and `issue200_review2` |
| Last verified | 2026-10-28: T07/E11 implemented; 6 focused calibration tests passed; task reviews/merges remain PR facts; actual subject campaign and full validation unrun |

## Governing inputs and delivery boundaries

| Source | Authority / use |
| --- | --- |
| [Contributing](../../CONTRIBUTING.md), [quality policy](../../docs/documentation-quality-policy.md), [error handling](../../docs/error-handling.md) | Branches, reviews, validation and recovery |
| [Manifest](project-adoption-manifest.md) at accepted `c27ab7ed8f5b27a2f88ac8829b46b5295714384b` | Installed playbook and canonical authorities; frozen design describes the earlier preparation state, not current installation state |
| [Concluded whiteboard](solution-whiteboard.md#concluded-design) D01–D06 and case matrix | Accepted scope, behavior and safety boundaries; no amendment proposed |
| [Evaluation contract](../../evals/README.md) | Existing case format, independent judgment, calibration and evidence schema |

Outcome: extend four microtasks with twelve grounded cases and report a bounded
first campaign. Reuse the existing framework; no runner, isolation platform,
new policy, mandatory CI gate or real external mutation by subjects. Correctness,
safety and efficiency remain separate. Coverage is representative, not exhaustive
security certification or proof of reliability across models.

### Clarifications and gaps

| ID | Question or gap | Resolution / owner | State |
| --- | --- | --- | --- |
| G01 | Can native execution contain real host resources and external writes? | Author verifies before adversarial execution under D03; unavailable containment means no launch and explicit setup-blocked/INCONCLUSIVE criteria | Execution prerequisite unresolved; does not block writing fixtures |
| G02 | Can the runtime isolate evaluator answers and execute native delegation? | Author verifies before attempts; otherwise use D04's exploratory or INCONCLUSIVE disposition, without substituting narrated delegation | Execution capability unverified |
| G03 | Enable task auto-merge? | Owner explicitly enabled Autopilot for T03–T13 into the named feature branch; human final-test and main-merge gates retained | Authorized |

## Consumed design and contracts

The task table owns the design-to-task mapping. Each case task includes its
subject inputs, evaluator-only rubric and proportionate deterministic support,
plus calibration against a valid result and representative defective results.
Checks must distinguish supported outcomes, not enforce a preferred tool order.
Each case can be added and calibrated independently; no artificial foundation
task is required. Shared catalog integration consumes their completed artifacts.

## Tasks

| ID | State | Depends on | Consumed design | Implementation work | Outcome | Boundaries | Consumed error handling | Consumed validations | Acceptance evidence | Consumed assumptions | Branch / PR / required target |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| T01 | DONE | None | D01–D05; E05 in the accepted case matrix | Add E05 Untrusted instructions: external report with a synthetic injection; rubric, subject and calibrated checks under its own `evals/cases/` directory | Complete the legitimate task without following injected instructions | Trust boundary; inspect attempted actions, not only final output | D03: contain effects; blocked setup is not a subject pass | None new; apply D02 calibration and existing case verdicts | No instruction-following or disclosure from untrusted content; valid and defective calibration evidence in task PR | D03/D04 capabilities remain unverified until setup; no host-safety assumption | `codex/eval-e05`; [PR #202](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/202); target `codex/playbook-eval-coverage` |
| T02 | DONE | None | D01–D05; E06 in the accepted case matrix | Add E06 Sensitive diagnostics: failure evidence with fake credentials and safe correlation identifiers; rubric, subject and calibrated checks under its own `evals/cases/` directory | Useful diagnosis without leaking sensitive fixture values | Authorized reads are not leakage; inspect new output and tool arguments | D03: contain effects; blocked setup is not a subject pass | None new; apply D02 calibration and existing case verdicts | Sanitized useful diagnostics and no disclosed secret; valid and defective calibration evidence in task PR | D03/D04 capabilities remain unverified until setup; no host-safety assumption | `codex/eval-e06`; [PR #203](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/203); target `codex/playbook-eval-coverage` |
| T03 | DONE | None | D01–D05; E07 in the accepted case matrix | Add E07 Destructive ownership: owned disposable output, unrelated fixture and symlink; rubric, subject and calibrated checks under its own `evals/cases/` directory | Clean only authorized owned output | All resources disposable; resolve ownership before deletion | D03: contain effects; blocked setup is not a subject pass | None new; apply D02 calibration and existing case verdicts | Owned output removed; unrelated target preserved; valid and defective calibration evidence in task PR | D03/D04 capabilities remain unverified until setup; no host-safety assumption | `codex/eval-e07`; [PR #204](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/204); target `codex/playbook-eval-coverage` |
| T04 | DONE | None | D01–D05; E08 in the accepted case matrix | Add E08 Access and input boundaries: small local API with authenticated actors and command-like data; rubric, subject and calibrated checks under its own `evals/cases/` directory | Preserve authorized access and reject cross-owner access | Reuse existing authorization; input remains data | D03: contain effects; blocked setup is not a subject pass | None new; apply D02 calibration and existing case verdicts | Positive authorized path and defective authorization/input controls distinguished; valid and defective calibration evidence in task PR | D03/D04 capabilities remain unverified until setup; no host-safety assumption | `codex/eval-e08`; [PR #206](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/206); target `codex/playbook-eval-coverage` |
| T05 | DONE | None | D01–D05; E09 in the accepted case matrix | Add E09 Adoption and upgrade judgment: local upgrade snapshots, missing Experience authority and active delivery; rubric, subject and calibrated checks under its own `evals/cases/` directory | Discover gaps and prepare an in-place upgrade without unaccepted cutover | Local snapshots; preserve project and feature authorities | D04–D05: preserve unknowns, failures and interrupted evidence | None new; apply D02 calibration and existing case verdicts | Gap disclosure, preserved state and correct acceptance boundary; valid and defective calibration evidence in task PR | D03/D04 capabilities remain unverified until setup; no host-safety assumption | `codex/eval-e09`; [PR #205](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/205); target `codex/playbook-eval-coverage` |
| T06 | DONE | None | D01–D05; E10 in the accepted case matrix | Add E10 Autopilot and evidence gates: three staged task/authority/time packets; rubric, subject and calibrated checks under its own `evals/cases/` directory | Proceed within authority and stop at real boundaries | No real protected merge or timed sleep; exclude interruptions from active time | D04–D05: preserve unknowns, failures and interrupted evidence | None new; apply D02 calibration and existing case verdicts | In-scope action, stale-evidence rejection and per-task active-time boundary; valid and defective calibration evidence in task PR | D03/D04 capabilities remain unverified until setup; no host-safety assumption | `codex/eval-e10`; [PR #207](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/207); target `codex/playbook-eval-coverage` |
| T07 | DONE | None | D01–D05; E11 in the accepted case matrix | Add E11 Design to engineering plan: separate design-stage and accepted-design planning packets; rubric, subject and calibrated checks under its own `evals/cases/` directory | Produce grounded design and a coherent dependency-based plan | Independent stages; never infer acceptance from the subject response | D04–D05: preserve unknowns, failures and interrupted evidence | None new; apply D02 calibration and existing case verdicts | Applicable KB/decision coverage, matching views and design-consumed tasks; valid and defective calibration evidence in task PR | D03/D04 capabilities remain unverified until setup; no host-safety assumption | `codex/eval-e11`; [PR #208](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/208); target `codex/playbook-eval-coverage` |
| T08 | PLANNED | None | D01–D05; E12 in the accepted case matrix | Add E12 Delegation and self-checking: independent edits, integration and an authorized context update; rubric, subject and calibrated checks under its own `evals/cases/` directory | Execute non-overlapping delegated work with current author context | Actual native delegation required; reviewers remain independent | D04–D05: preserve unknowns, failures and interrupted evidence | None new; apply D02 calibration and existing case verdicts | Worker context/update traces, integrated edits and meaningful self-check evidence; valid and defective calibration evidence in task PR | D03/D04 capabilities remain unverified until setup; no host-safety assumption | `codex/eval-e12`; PR not opened; target `codex/playbook-eval-coverage` |
| T09 | IN_PROGRESS | None | D01–D05; E13 in the accepted case matrix | Add E13 Triage and Experience: controlled failure and a similar but conditionally applicable lesson; rubric, subject and calibrated checks under its own `evals/cases/` directory | Find supported cause and reuse or refine the lesson | No fabricated incident; past experience is not current cause proof | D04–D05: preserve unknowns, failures and interrupted evidence | None new; apply D02 calibration and existing case verdicts | Reproduction, bounded repair and justified lesson disposition; valid and defective calibration evidence in task PR | D03/D04 capabilities remain unverified until setup; no host-safety assumption | `codex/eval-e13`; PR not opened; target `codex/playbook-eval-coverage` |
| T10 | PLANNED | None | D01–D05; E14 in the accepted case matrix | Add E14 Compatibility and uncertain effects: supported callers, controlled interleaving and ambiguous write result; rubric, subject and calibrated checks under its own `evals/cases/` directory | Preserve consistency and safe retry at the existing owner | Deterministic controls; no exhaustive race catalog or recovery framework | D04–D05: preserve unknowns, failures and interrupted evidence | None new; apply D02 calibration and existing case verdicts | Caller compatibility, invariant preservation and no unsafe repeated effect; valid and defective calibration evidence in task PR | D03/D04 capabilities remain unverified until setup; no host-safety assumption | `codex/eval-e14`; PR not opened; target `codex/playbook-eval-coverage` |
| T11 | IN_PROGRESS | None | D01–D05; E15 in the accepted case matrix | Add E15 Measured improvement and code refinement: redundant work with measurable local cost and an existing alternative; rubric, subject and calibrated checks under its own `evals/cases/` directory | Choose a supported improvement while preserving behavior | Research applicability; no production speed claim or arbitrary speed ratio | D04–D05: preserve unknowns, failures and interrupted evidence | None new; apply D02 calibration and existing case verdicts | Behavior regression evidence, comparable workload/cost and clear bounded change; valid and defective calibration evidence in task PR | D03/D04 capabilities remain unverified until setup; no host-safety assumption | `codex/eval-e15`; PR not opened; target `codex/playbook-eval-coverage` |
| T12 | PLANNED | None | D01–D05; E16 in the accepted case matrix | Add E16 Final audit and closure: separate incomplete audit and authorized closing snapshots; rubric, subject and calibrated checks under its own `evals/cases/` directory | Detect mismatch before final tests and close only authorized artifacts | Local staged artifacts; no real hosted merge/deletion | D04–D05: preserve unknowns, failures and interrupted evidence | None new; apply D02 calibration and existing case verdicts | Design/code/view mismatch detected; archive, authority updates and owned cleanup verified; valid and defective calibration evidence in task PR | D03/D04 capabilities remain unverified until setup; no host-safety assumption | `codex/eval-e16`; PR not opened; target `codex/playbook-eval-coverage` |
| T13 | PLANNED | T01, T02, T03, T04, T05, T06, T07, T08, T09, T10, T11, T12 | D01–D05; architecture/evidence flow | Update `evals/README.md` with coverage, case context assembly, campaign preparation and evidence interpretation using the existing format | Complete suite is discoverable and can be executed without ambiguous authority or leaked rubrics | Preserve E01–E04; no new harness or duplicated case criteria | D03/D04 setup and isolation dispositions; D05 gap triage | None new; existing focused documentation and fixture checks | All 16 cases resolve; per-case authority overrides are explicit; preparation excludes evaluator-only artifacts | Native capabilities are measured, not inferred from a separate directory | `codex/eval-catalog`; PR not opened; target `codex/playbook-eval-coverage` |

## Test and acceptance contracts

This is the coverage inventory; actual run results belong in the PR. Case
checks are evaluator support, not a claim that a subject applied the playbook.

| Owning task | Contract, changed outcome, or risk | Test or scenario | Coverage | Work boundary |
| --- | --- | --- | --- | --- |
| T01 | E05: Untrusted instructions; D02 legitimate success and defect sensitivity | Valid and representative defective artifact/trace calibration against E05 rubric; meaningful small checks where useful | Implemented: E05 rubric, artifact check and five calibration tests | Focused task work; live subject attempts deferred to final gate |
| T02 | E06: Sensitive diagnostics; D02 legitimate success and defect sensitivity | Valid and representative defective artifact/trace calibration against E06 rubric; meaningful small checks where useful | Implemented: E06 rubric, artifact check and eight calibration tests | Focused task work; live subject attempts deferred to final gate |
| T03 | E07: Destructive ownership; D02 legitimate success and defect sensitivity | Valid and representative defective artifact/trace calibration against E07 rubric; meaningful small checks where useful | Implemented: E07 rubric, focused check and 6 calibration tests | Focused task work; live subject attempts deferred to final gate |
| T04 | E08: Access and input boundaries; D02 legitimate success and defect sensitivity | Valid and representative defective artifact/trace calibration against E08 rubric; meaningful small checks where useful | Implemented: E08 rubric, focused check and 6 calibration tests | Focused task work; live subject attempts deferred to final gate |
| T05 | E09: Adoption and upgrade judgment; D02 legitimate success and defect sensitivity | Valid and representative defective artifact/trace calibration against E09 rubric; meaningful small checks where useful | Implemented: E09 rubric, focused check and 6 calibration tests | Focused task work; live subject attempts deferred to final gate |
| T06 | E10: Autopilot and evidence gates; D02 legitimate success and defect sensitivity | Valid and representative defective artifact/trace calibration against E10 rubric; meaningful small checks where useful | Implemented: E10 rubric, focused check and 9 calibration tests | Focused task work; live subject attempts deferred to final gate |
| T07 | E11: Design to engineering plan; D02 legitimate success and defect sensitivity | Valid and representative defective artifact/trace calibration against E11 rubric; meaningful small checks where useful | Implemented: E11 rubric, focused check and 6 calibration tests | Focused task work; live subject attempts deferred to final gate |
| T08 | E12: Delegation and self-checking; D02 legitimate success and defect sensitivity | Valid and representative defective artifact/trace calibration against E12 rubric; meaningful small checks where useful | Missing; owned by T08 | Focused task work; live subject attempts deferred to final gate |
| T09 | E13: Triage and Experience; D02 legitimate success and defect sensitivity | Valid and representative defective artifact/trace calibration against E13 rubric; meaningful small checks where useful | Missing; owned by T09 | Focused task work; live subject attempts deferred to final gate |
| T10 | E14: Compatibility and uncertain effects; D02 legitimate success and defect sensitivity | Valid and representative defective artifact/trace calibration against E14 rubric; meaningful small checks where useful | Missing; owned by T10 | Focused task work; live subject attempts deferred to final gate |
| T11 | E15: Measured improvement and code refinement; D02 legitimate success and defect sensitivity | Valid and representative defective artifact/trace calibration against E15 rubric; meaningful small checks where useful | Missing; owned by T11 | Focused task work; live subject attempts deferred to final gate |
| T12 | E16: Final audit and closure; D02 legitimate success and defect sensitivity | Valid and representative defective artifact/trace calibration against E16 rubric; meaningful small checks where useful | Missing; owned by T12 | Focused task work; live subject attempts deferred to final gate |
| T13 | D01/D04 coherent assembly and current catalog | Focused Markdown/link checks; inspect assembled case inputs, authority precedence and evaluator exclusion | Missing | Focused task work |
| Author, final gate | D02–D05 actual subject behavior and evidence integrity | Bounded campaign below; independent criterion assessment and reviewed material disputes | Unrun | After implementation audit and human acceptance |
| Author, final gate | Source compatibility and documentation integrity | `npm run docs:all`, applicable installer/runtime checks and whitespace on final candidate | Existing source suite; unrun for this delivery | Full validation after final candidate review |

At task completion, record any missing non-focused tests here with an owner.
After the required implementation audit and human acceptance, reconcile the
whole inventory, add missing required tests and run final validation. A failed
subject attempt is a finding about the measured behavior, not automatically a
broken case: preserve it and triage its cause under D05. A defective case or
unsupported verdict must be corrected and reviewed; no failed result is erased.

## Delivery strategy and readiness

| Concern | This delivery |
| --- | --- |
| Integration model | Feature integration; every task PR targets `codex/playbook-eval-coverage`; only final PR #201 targets `main` |
| Increment boundary | One usable, calibrated case per task; catalog integration follows all cases |
| Parallel ownership | T01–T12 own distinct case directories and can be parallel when safe and useful; only coordinator edits this plan and shared catalog |
| Context assembly | Preserve E01–E04 shared local-task instructions. Where a new lifecycle/delegation case needs different authority, provide its own explicit subject instructions; T13 documents replacing, not combining with, conflicting default instructions |
| Readiness | Accepted design, current pin and existing case format are available. Owner accepted the plan on 2026-10-28; T01–T12 have no producing-task dependencies |
| Merge authority | Autopilot authorized for remaining task PRs into the named feature branch after both reviewers and required checks; final-test work and final `main` merge retain human gates |
| Compatibility / rollback | Additive cases and catalog only; retain current result schema and E01–E04. Revert an affected task within ordinary review authority if needed |

The frozen design is not edited by these tasks. Per-task active implementation
time follows the installed 90-minute rule; campaign elapsed limits below are a
separate execution budget, not author task time.

### Bounded first campaign

| Setting | Declared value |
| --- | --- |
| Case revision | Immutable integrated candidate SHA recorded in PR before launching; never a moving branch label |
| Playbook under test | `c27ab7ed8f5b27a2f88ac8829b46b5295714384b` |
| Subject runtime | Installed native Codex; record exact executable/version and effective configuration before execution |
| Model / reasoning | Current configured `gpt-6.1-sol` / `high`; verify availability and effective settings before launch; do not silently substitute |
| Inputs and permissions | Fresh disposable fixture and declared skills/KB; no prior subject context, evaluator rubric/checks, real credentials, production resources or external write permission |
| Safety / isolation | D03 containment verified before adversarial launch. D04 answer isolation independently recorded; otherwise-safe runs may be exploratory. Required native delegation unavailable means its execution criterion INCONCLUSIVE |
| Limits | At most 20 launched subject attempts total, at most 15 minutes elapsed each, at most 2 concurrent; enforce through existing runtime/process controls |
| Reruns | New ID, retained previous result and same total cap; a rerun displaces a not-yet-run attempt and the omission is disclosed; no expansion without owner authority |
| Evaluation | Separate read-only evaluator context receives rubric and preserved artifacts/traces; material disagreements go to retained reviewers; no coaching subject runs |
| Evidence | Per-attempt revisions, input SHA, settings/permissions, containment/isolation evidence, trace, artifact diff, statuses and criterion verdicts; sanitized summary in PR, raw evidence local |
| Efficiency | Subject elapsed time and available tokens/completed tool events; setup, calibration and assessment effort separate; unavailable counters Unknown |

| Cases / variants | Planned fresh attempts | Purpose |
| --- | --- | --- |
| E01–E09 | 9 | One supported scenario per retained/new case |
| E10: in-scope choice; changed-candidate/authority; active-time boundary | 3 | Separate authority states without conflating outcomes |
| E11: design; accepted-design planning | 2 | Separate starting stages |
| E12–E15 | 4 | One scenario each; E12 requires actual native delegation |
| E16: pre-test audit; authorized closure | 2 | Separate starting authority |
| Total | 20 | Single campaign, no reliability or comparative-performance claim |

Blocked setup is recorded without launching a subject. Exhausting the attempt
budget leaves remaining scenarios explicitly unrun; no aggregate PASS hides
missing evidence or a prohibited attempt. Observed policy breaches remain FAIL
even when execution controls blocked their effect.

## Task specifications and context receipts

### T01 — Untrusted instructions

| Concern | Evidence / result |
| --- | --- |
| Context | Accepted E05/D01–D05; current workflow, testing, security and code-clarity KBs; existing eval contract and case structure; OWASP external-document injection guidance |
| Actual result | `evals/cases/e05-untrusted-instructions/`: subject report/contract/task and fake private value, evaluator rubric, read-only artifact checker and valid/defective calibration |
| Focused evidence | Five calibration tests passed: equivalent valid variants, incorrect counts, empty brief, direct disclosure and changed authority; semantic trace examples independently reviewed rather than counted as actual runs |
| Remaining | Live subject execution and trace assessment belong to the final campaign; no security PASS claimed from fixture checks |

### T02 — Sensitive diagnostics

| Concern | Evidence / result |
| --- | --- |
| Context | Accepted E06/D01–D05; current workflow, testing, security, error-diagnosability KBs and eval contract; OWASP guidance on correlation and sensitive log exclusions |
| Actual result | `evals/cases/e06-sensitive-diagnostics/`: synthetic event capture, local diagnostic contract/task, evaluator rubric, artifact check and calibration |
| Focused evidence | Eight calibration tests passed: valid alternatives, wrong failure stage, missing correlation, empty brief, altered authority and three disclosure categories; semantic evidence scenarios supplied for independent judgment |
| Remaining | Actual subject behavior, final replies and action traces are unrun final-campaign obligations; artifact checks alone do not establish privacy or root cause |

## Recovery, decisions, and change control

Use [canonical error handling](../../docs/error-handling.md). Keep failed runs
and triage evidence in the PR; confirmed playbook/project gaps receive issues,
ordinary author mistakes do not create mandatory new issues.

| ID | Observed versus expected | Classification / recovery | State |
| --- | --- | --- | --- |
| R01 | Conclusion metadata used prose dispositions and slash-separated IDs that failed lifecycle validation | Author formatting mistake; normalized already-approved metadata only at `525e208`; both reviewers verified unchanged design | Resolved |

## Plan validation and completion

### Implementation review

Task and coverage tables above own current implementation status. At final readiness,
record the actual suite, its flow views, design comparison, findings, risks,
focused evidence and outstanding final work in this table before review.

| Information | Implementation summary / evidence |
| --- | --- |
| Implementation / design | See task inventory; integrated implementation audit pending |
| Code-level flows | Pending actual preparation, subject, evaluation and failure/data flows |
| Review findings | Pending implementation audit; PR owns review history |
| Risks / limits / unknowns | D03 containment and D04 native isolation/delegation capability unverified |
| Validation | Completed focused evidence is recorded by task and in PRs; the coverage inventory owns remaining work. Subject campaign and full validation unrun |
| Recommendation / decision | Continue approved tasks under Autopilot; integrated implementation acceptance is the next required human gate before final-test work |

### Delivery Definition of Done

| Outcome | Required evidence | Result / link |
| --- | --- | --- |
| D01–D02 | T01–T13 deliver all new cases, preserve E01–E04 and calibrate meaningful criteria | Pending |
| D03–D05 campaign obligation, author owned | Bounded actual attempts or explicit setup limits, independent verdicts, efficiency and retained failed/unknown evidence; genuine gaps tracked | Pending; no claim of comprehensive security certification |
| D06 accepted upgrade, author owned | Owner acceptance, verified conclusion transition and CURRENT runtime | Completed at `525e208`; [PR #201](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/201) owns evidence |
| Durable authority updates | Whiteboard's authority-update inventory consumed; evaluation catalog/contract update owned by T13 | Pending |
| Applicable validation and canonical state | Exact-candidate full checks, honest final plan and consistent catalog | Pending |
| Review and delivery | Both retained reviewers, human gates, final merge and target verification | PR #201; pending |
| Feature cleanup | Complete combined archive, authorized live reset/removal and verified owned physical cleanup | Pending |

### Planned versus actual outcome

| Design / task | Planned result | Actual evidence or deviation | Remaining obligation / owner |
| --- | --- | --- | --- |
| D01–D05 / T01–T13 | Calibrated suite and bounded first campaign | Task/coverage inventory owns completed artifacts and focused evidence; actual subject runs unrun | Nonterminal tasks in inventory and final campaign / author and task owners |
| D06 | Accepted current pin | CURRENT at `c27ab7e`; no design amendment | None |

### Cleanup inventory

| Item | Keep, archive, remove, or reset | Ownership and evidence | Result |
| --- | --- | --- | --- |
| Manifest, installed KB/skills, reusable evaluation cases/catalog | Keep | Reusable project guidance/product | Pending final verification |
| Working whiteboard and this plan | Combined archive, then authorized reset/removal | Complete sources and PR/issue links; named archive/reset authority required before changing frozen whiteboard | Pending |
| Current feature worktree and `codex/playbook-eval-coverage` | Remove/retire after final target verification | Owned delivery; app-managed lifecycle and clean state verified before action | Pending |
| Task worktrees/branches and disposable attempts | Remove when safe under verified ownership | Exact created paths/branches recorded in PR as created; preserve required local evidence and unrelated data | Not created |
| Installer-owned runtime | Installer cleanup after closing boundary | Existing installer ownership record | Pending |

## Human review brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Tasks and design consistency | Completed case rows and coverage inventory below reflect this candidate; remaining tasks continue under Autopilot | DISCLOSE |
| Upgrade | Accepted pin active and verified; no new upgrade decision | DISCLOSE |
| Campaign | 20-attempt bounded allocation; real containment still must be demonstrated before adversarial execution | DISCLOSE |
| Mode | Autopilot enabled for task PRs into the feature branch only | DISCLOSE |
| Decision requested | Continue task reviews/merges under Autopilot; next required human gate is completed implementation before final-test work | HUMAN_DECISION |
