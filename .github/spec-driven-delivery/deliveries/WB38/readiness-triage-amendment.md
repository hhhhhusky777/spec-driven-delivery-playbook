# WB38 follow-up — phase-aware readiness and exception triage

## Authority and status

Owner requested both fixes in this delivery. This is a provisional design/task
amendment for review, not an implemented fix or approved schema migration.
Preserve accepted WB38-R03/P04 and earlier task review/merge evidence. No new
whiteboard gate, credentials, main merge, pin cutover or cleanup is authorized.
Issues: [46](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/46)
and [47](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/47).

## Problem evidence

The WB38 readiness amendment separated future results from current approved
inputs. Current shared prose recommends that separation, but workflow checking
still requires every dependency-register row CURRENT at GATES_READY and every
selected manifest row reviewed. It has no structural phase/role declaration.
The existing positive test places future outputs in an otherwise unvalidated
table: it proves that correctly separated data is tolerated, not that incorrect
classification is caught. Other-project recurrence is reported by the owner;
their exact pins and reproductions remain unavailable.

## Design and task comparison

| Design point | Task / brief work | Validation | Consistency / risk |
| --- | --- | --- | --- |
| R01: inputs and future outputs have different gate meanings | T04 adds versioned role/phase representation and validator | Current input plus NOT_STARTED output can start; stale genuine input cannot | No future result is approved or dropped to make readiness pass |
| R02: impossible readiness fails before coding | T04 checks roles, producer/task identities and dependency reachability | Cycle, misplaced output and later-phase producer negative fixtures | Semantic false labeling remains reviewer responsibility |
| R03: compatibility is explicit | T04 preserves existing v2/v3 behavior and documents new-version opt-in | Existing fixtures unchanged; migration examples and unknown-version rejection | Installed pins are not auto-upgraded |
| E01: classify exceptions before deciding recovery | T05 adds reusable triage contract and consumer guidance | Project fault, adoption mistake, old pin, upstream gap and unknown-cause walkthroughs | Reporting cannot bypass a safety/policy gate |
| E02: confirmed upstream gaps get durable reports | T05 requires verified source target, duplicate search, sanitized report or pending draft | Duplicate, offline, missing authority and sensitive-data cases | Public issue creation needs authorized disclosure |

## R01-R03 — proposed readiness contract

Introduce lifecycle schema version 4 for changed workflow readiness semantics;
preserve full version-2 and version-3 validation behavior through frozen schemas
and version dispatch. New source plan/workflow/batch templates use matching
version-4 markers; legacy documents and historical fixtures remain unchanged.
Version migration requires explicit reviewed project adoption/upgrade.

The v4 workflow distinguishes the current prerequisite register from a required
future-output register. Add a required artifact-role inventory with columns
Artifact ID, Role, Required gate, Producer task, Depends on, Evidence.
Role is PREREQUISITE or FUTURE_OUTPUT; Required gate is IMPLEMENTATION,
VALIDATION or CLOSURE. Every selected manifest artifact has exactly one role;
IDs are unique, references resolve and dependency graphs are acyclic.

PREREQUISITE rows belong to the normal current-input register and cannot name
an uncompleted producer. FUTURE_OUTPUT rows belong to the separate output
register, with explicit producer, owning gate and NOT_STARTED/IN_PROGRESS/
COMPLETE state. Task-produced results name a real planned task; phase-produced
validation/closure records use the explicit PHASE producer sentinel. Full
output verification/review evidence is required at the declared owning gate.
No future output is counted as an approved readiness input. A prerequisite
depending directly or transitively on a declared future output is invalid.

At implementation readiness, validate current approved design/task inputs and
the first task's actual execution dependencies; future validation/closure
outputs remain obligations, not start requirements. A future output claiming
Required gate IMPLEMENTATION is invalid: an earlier task result needed by a
later task is an execution dependency, verified by that task's own readiness,
not a universal prerequisite for starting the delivery. Preserve task-to-task
DONE/current requirements and all existing context, authority and merge gates.

Role/reference/phase contradictions fail during preparation checks rather than
waiting for GATES_READY. At VALIDATING require implementation-produced outputs
complete with exact evidence; at COMPLETE/ARCHIVED require all selected outputs
complete and their owning reviews accepted. Schema validation does not prove
the truth of a declaration; reviewers independently compare roles/production
timing against the task specifications and source behavior.

## E01-E02 — proposed exception contract

On an exception, preserve failure evidence, source pin, candidate, failing gate,
affected targets and checkpoint. Diagnose the responsible layer before retrying
or changing controls. Classify project code/configuration/environment, incorrect
adoption, stale version, confirmed upstream playbook gap, or unresolved cause.
Do not classify every failed test as an upstream issue or call uncertainty a
confirmed defect. A version mismatch may need migration, not a duplicate bug.

For a confirmed playbook gap, verify the canonical upstream repository from the
installed manifest/runtime, search existing issues, and update a matching issue
or open one. Report expected/observed behavior, exact version, minimal sanitized
reproduction, impact, affected controls and safe workaround. Link the issue in
one canonical recovery record with owner and next action. Repeated occurrences
reuse that issue; never open a new issue per retry.

Remove credentials, private source/data and unnecessary personal information.
For sensitive security reports use the approved private disclosure route; if
publication authority or access is missing, preserve a local sanitized pending
draft and ask for the required decision. An unavailable network/API yields a
pending report, not a claim that an issue exists. Reporting failures do not
recursively open reports or reset recovery counters. No reporting action grants
authority to weaken gates, change scope, approve a workaround or resume blocked
work. Independently authorized unaffected work may continue.

## Bounded implementation tasks

| Field | T04 | T05 |
| --- | --- | --- |
| Outcome | Reusable phase-aware readiness, diagnostics and compatibility | Reusable triage and upstream reporting duties |
| Dependencies | T01 and merged T03 contracts; T02 integration preserved | Accepted amendment; may follow T04 for ordered integration |
| Write scope | config/sdd-lifecycle-schema*.json; scripts/sdd-lifecycle.mjs; tests/sdd-lifecycle.test.mjs; workflow/plan/review-batch templates; docs/batch-review-and-recovery.md; README.md; CHANGELOG.md; simulated examples and WB38 evidence | Shared recovery/quality/adoption/upgrade guidance; source workflow/adoption/upgrade skills; review/recovery templates; README.md; CHANGELOG.md; simulated examples, documentation tests and WB38 evidence |
| Excluded | Installer runtime fixes, implicit pin migration, weakened checks, issue43 implementation | Credential services, automatic project writes or recovery bypass, issue43 implementation |
| Acceptance | Cross-project positive and negative fixtures; unchanged legacy fixtures; all checks; two retained reviewers and owner merge acceptance | Positive/negative simulated classification and reporting walkthroughs; source skill consumer verification; all checks; two retained reviewers and owner merge acceptance |

Task implementation starts only after this exact amended contract/specification
passes the existing combined review and owner acceptance. Each coherent task PR
targets the feature branch. Final delivery validation waits for these follow-ups
as well as T01-T03; completion is not claimed while they are pending.

## Human attention

| Type | Important item | Recommendation / required response |
| --- | --- | --- |
| ATTENTION | Version4 is a compatibility boundary, not an automatic upgrade | Preserve v2/v3 behavior; adopting projects explicitly migrate |
| ATTENTION | No second project reproduction is available yet | Verify generalized behavior with a separate synthetic adopting-project fixture; do not claim a reproduced external incident |
| ATTENTION | Issue filing is not always safe or possible | Retain pending drafts and escalate authority/privacy decisions rather than publish blindly |
| DECISION | Exact amended design and two task scopes | After reviews pass, accept this package before implementation; no additional design choices are currently identified |
