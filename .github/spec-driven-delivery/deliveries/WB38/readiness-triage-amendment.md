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
output register. Add a required role inventory with columns Artifact ID, Role,
Production phase, Required gate, Producer task, Depends on, Evidence. Role is
PREREQUISITE or FUTURE_OUTPUT. Every selected manifest artifact has exactly one
role; IDs are unique, references resolve, and the combined artifact dependency
graph is acyclic. Membership and phase fields cannot conflict across tables.

PREREQUISITE has Production phase EXISTING, Required gate GATES_READY and
Producer task NONE. It appears only in the current-input register, with the
existing exact revision, currentness and review requirements. Such a row cannot
depend on a FUTURE_OUTPUT: accepted design inputs cannot require in-delivery
results. Previously delivered outputs may be existing inputs only through an
explicit accepted external source/version, never an invented completed producer.

FUTURE_OUTPUT keeps that role for the whole delivery, even after completion.
It appears only in the output register, not the input freshness register.
Its dependencies may name existing prerequisites or outputs produced no later
than itself. The output register requires Artifact ID, State, Current version,
Verified version, Change impact, Freshness, Review state, Review evidence and
Blocked by; State is NOT_STARTED, IN_PROGRESS or COMPLETE. Version values are
full Git/SHA256 content identities. COMPLETE requires exact verified/current
content and APPROVED review evidence; missing, changed, unknown or blocked
evidence never counts as ready. Use the existing transitive freshness rules
over the combined graph, including output-to-output dependencies.

| Production phase | Producer task | Required gate | Exact timing |
| --- | --- | --- | --- |
| IMPLEMENTATION | A real ledger task ID | VALIDATING | Require COMPLETE/current/approved when entering workflow VALIDATING, after producer task is DONE |
| VALIDATION | PHASE | COMPLETE | May remain NOT_STARTED when entering VALIDATING; generate/review during validation, require COMPLETE/current/approved when entering COMPLETE |
| CLOSURE | PHASE | ARCHIVED | May remain NOT_STARTED when entering COMPLETE; generate/review during closure, require COMPLETE/current/approved when entering ARCHIVED |

These are the only valid phase/gate pairs. COMPLETE does not mean archived:
closure work and acceptance still occur before ARCHIVED. Existing mandatory
validation, human approval and archive prerequisites remain required at their
own transitions. A CLOSURE output with Required gate VALIDATING is rejected
during preparation, not accepted as a configurable earlier deadline.

For dependencies within IMPLEMENTATION, a producer output can depend only on
outputs of transitive predecessor tasks, never itself or a successor task;
the task DAG must be acyclic. VALIDATION outputs may depend on implementation
outputs or acyclic validation outputs. CLOSURE outputs may depend on earlier
phases or acyclic closure outputs. No earlier production phase may depend on
a later phase. Required-gate and producer identities are checked structurally
during preparation, before GATES_READY.

Add a required v4 per-task field Required output IDs (None or unique output
IDs). This is the only in-delivery task-consumption route: do not move completed
outputs into PREREQUISITE or duplicate their register membership. Each listed
output must have Production phase IMPLEMENTATION and a producer that is a
transitive predecessor in that task's dependency graph. At a task's READY/NEXT,
IN_PROGRESS, VERIFYING or DONE gate, require its producer DONE and each consumed
output COMPLETE, unblocked, CURRENT, with matching Current/Verified version and
APPROVED exact review evidence. Bind actual task context to those identities.
A later material or unknown change invalidates the consumer transitively and
blocks affected advancement/review, even when the producer still says DONE.

At initial GATES_READY, check all real prerequisites and only the selected
first-ready task's required outputs/execution dependencies; do not require the
outputs of future PLANNED tasks to exist. Subsequent tasks use their own fresh
readiness check. This v4 route explicitly supersedes the legacy instruction to
insert every produced output into the current-input register before consumption;
legacy v2/v3 routes remain unchanged.

Required fixtures include: T1 starts with its result NOT_STARTED and T2 PLANNED;
T2 cannot become READY with that result absent; T1 DONE and its exact approved
current output permit T2 readiness; changing those bytes invalidates T2 again.
Also test a validation-produced result absent at entry to VALIDATING but required
at COMPLETE, and a closure-produced result improperly required at VALIDATING.
A stale genuine existing input must still block T1. No synthetic fixture is
evidence of another project's actual installation.

Reviewers independently compare declared production timing, producer identity
and task inputs to the specifications. Structural checks cannot detect an
intentionally false but internally consistent role declaration.

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
