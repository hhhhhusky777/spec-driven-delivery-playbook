# Playbook Upgrade Assessment — `<project>`

## Optional batched route

An authorized upgrade package may group dependent migration preparation and
review. Keep current pin, between-task restrictions, actual migration checks,
owner cutover and rollback; batching does not authorize early activation.

See [Batched review and recovery](../../docs/batch-review-and-recovery.md) for authority, evidence and recovery
requirements. This route takes effect only through reviewed project adoption.

Use this project-owned artifact to assess one exact playbook revision before
changing the active manifest pin. The generated upgrade guide supplies runtime
paths; do not commit machine-local paths.

## 1. Control and state

| Field | Value |
| --- | --- |
| State | `DRAFT` |
| Previous state | `None` |
| Project / adoption manifest | `<links>` |
| Source repository | `<canonical URL>` |
| Current revision | `<40-character commit>` |
| Candidate revision | `<40-character commit>` |
| Assessment candidate revision | `<project commit/version>` |
| Upgrade owner / required reviewers | `<values>` |
| Safe boundary evidence | `<no active task, PR, merge, or validation>` |
| Allowed write scope | `<exact paths>` |
| Self-review state / evidence | `<state and link>` |
| Fresh-context review state / evidence | `<state + exact-revision receipt>` |
| Fresh-context review session / assigned reviewers | `<stable session ID + assigned and approved reviewer IDs + required approval count>` |
| Human review state / evidence | `<state + reviewer/link>` |
| Current blocker | `None` |
| Next action | `<one dependency-ready action>` |

States: `DRAFT -> IN_REVIEW -> APPROVED -> APPLYING -> VALIDATING -> COMPLETE`.
Review comments return to `DRAFT`; any state may enter `BLOCKED`. Exact-candidate
self-review must be followed by a stable session whose reviewer(s) were
initialized without author context, then mandatory human approval before
entering `APPROVED`. Preserve requested-change findings, author dispositions,
and resolutions; any candidate change starts a same-reviewer session round. The manifest's
current revision remains authoritative through assessment and migration
validation.

## 2. Candidate evidence

| Source | Current-to-candidate finding | Relevance / evidence |
| --- | --- | --- |
| Changelog and migration guidance | `<finding>` | `<link>` |
| Schemas and lifecycle rules | `<finding>` | `<link>` |
| Templates and policy obligations | `<finding>` | `<link>` |
| Skills, installer, and runtime | `<finding>` | `<link>` |
| Documentation and enforcement gates | `<finding>` | `<link>` |

## 3. Decision ledger

Use only `ACCEPT`, `ADAPT`, `REJECT`, or `NOT_APPLICABLE`. Unknown impact is a
blocker, not `NOT_APPLICABLE`.

| ID | Candidate change | Affected project authority/artifact | Decision | Reason / trade-off | Owner / review |
| --- | --- | --- | --- | --- | --- |
| `U-01` | `<change>` | `<links>` | `<decision>` | `<evidence>` | `<value>` |

## 4. Migration and freshness plan

| Order | Migration boundary | Depends on | Write scope | Required gates / rollback | State |
| --- | --- | --- | --- | --- | --- |
| `1` | `<smallest self-contained boundary>` | `<IDs or None>` | `<paths>` | `<checks / restore action>` | `PLANNED` |

Transitive freshness impact: `<artifact graph and required refresh order>`

Continuation-mode impact: `<UNCHANGED, or reset to EXPLICIT_REVIEW and required reconfirmation>`

## 5. Validation and cutover

On an exception, follow the [shared triage contract](../../docs/batch-review-and-recovery.md#exception-triage-and-upstream-reporting)
and link the [triage record](../reviews/exception-triage.md) from this assessment.
Reporting an upstream issue neither approves migration nor changes the active
pin; keep the last approved rollback authority until validated cutover.

- [ ] Every material candidate change has a decision and evidence.
- [ ] Affected artifacts, policies, skills, gates, and active delivery inputs are
      mapped with no unknown impact.
- [ ] Migration order preserves a working project at every boundary.
- [ ] Rollback preserves the current pin and runtime until candidate validation.
- [ ] Required project checks pass; unrun checks are named, not implied.
- [ ] Agent self-review covers this exact assessment candidate.
- [ ] Fresh-context approval identifies this exact assessment candidate.
- [ ] Human approval identifies this exact assessment candidate.
- [ ] The manifest pin changes only at final cutover.
- [ ] Normal runtime is regenerated and validates against the new pin.
- [ ] No affected artifact remains `STALE` or `BLOCKED`.

Cutover evidence: `<commits, checks, manifest change, runtime validation>`

Rollback evidence or procedure: `<last approved pin, restoration steps, result>`

## 6. Review and history

| Round | Candidate revision | Self-review | Fresh-context receipt | Durable findings/resolution | Human review | Result/date |
| --- | --- | --- | --- | --- | --- | --- |
| `1` | `<value>` | `<evidence>` | `<receipt>` | `<links/None>` | `<identity/evidence>` | `IN_REVIEW / <date>` |

| Event | From -> to | Evidence / authority | Next action |
| --- | --- | --- | --- |
| `<event>` | `<transition>` | `<link>` | `<action>` |
