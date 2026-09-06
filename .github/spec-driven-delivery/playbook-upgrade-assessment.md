# Playbook upgrade assessment — U84

## Current cutover checkpoint

The owner instructed “complete the upgrade” on 2026-09-06 after the pending U84
cutover was identified. This accepts the reviewed R04 migration and authorizes
its exact d93d27a33c43c1574aeed27044654c8964cf998b pin/runtime transition.
The original assessment below is retained as reviewed history. This checkpoint
supersedes its WB33 and waiting-for-cutover status descriptions.

| Item | Current evidence / boundary |
| --- | --- |
| State | APPLYING; old pin retained until current validation passes |
| Source | Latest remote main still equals reviewed candidate d93d27a33c43c1574aeed27044654c8964cf998b |
| Safe boundary | WB62 is routing review only; no implementation plan, active task or task PR. WB33 draft was owner-discarded; do not resume it |
| Existing approvals | WB62 design and handoff remain accepted; W01 has two agent approvals but no human routing acceptance |
| Migration | R04 registry/trigger bytes reused unchanged; manifest navigation preserves WB62; no source or historical delivery bytes replaced |
| Compatibility | Existing WB62 v2 routing remains a versioned record, not silently converted to v4. New linked plan/workflow or batch preparation must reconcile its schema/authority explicitly before readiness |
| Batching | New runtime makes the scoped batch route available, not automatically selected. The upgrade does not approve WB62 routing or unseen batch contents |
| Remaining | Current gates, exact pin cutover, owned cleanup, regenerated normal-runtime verification and reviewed publication |
| Rollback | Retain pre-cutover Git commit and old pin d213114f99dc2186d6f4e50a85fe962de0e1afa9; restore only upgrade changes and regenerate verified old runtime if cutover fails |

No accepted WB62 normative input changes. Versioned legacy records remain
valid under the candidate's frozen compatibility schema; planning has not
started, so there is no active task context to invalidate. The new runtime
does not grant merge authority. Local cutover and reviewed main publication
are distinct results; source publication remains required.

## Historical owner review brief

| Type | Item | Recommendation / effect | Acceptance boundary |
| --- | --- | --- | --- |
| DECISION | Accept actual routing migration and authorize cutover | Accept the four-file package identified by the latest exact inventory in [U84 review evidence](reviews/U84-S01.md): assessment, manifest, registry and trigger | Authorize pin change from `d213114f99dc2186d6f4e50a85fe962de0e1afa9` to `d93d27a33c43c1574aeed27044654c8964cf998b`, owned runtime replacement and verification; PR publication/merge authority remains separate |
| ATTENTION | Batching and readiness | Make the delivered batching/recovery contract available to future explicitly scoped batches; use v4 for new linked plans/workflows | No automatic merge authority or blanket batch permission |
| ATTENTION | Durable adoption | Preserve manifest, policies, delivery history and archives in Git; regenerate only ignored runtime | Adoption remains INSTALLED; activation is separate |
| ATTENTION | Remaining runtime defects | Issues 33, 34 and 36 remain WB33 scope | Candidate does not fix temporary storage or worktree identity |
| ATTENTION | WB33 draft | Preserve the original worktree's uncommitted discussion; resume after verified cutover | No WB33 design choice or conclusion is approved here |
| ATTENTION | Version boundary | Old pin `d213114f99dc2186d6f4e50a85fe962de0e1afa9` -> candidate `d93d27a33c43c1574aeed27044654c8964cf998b` | Old pin remains authoritative through migration validation |
| ATTENTION | Delivered migration and rollback | Registry/trigger now route future v4 work and scoped batches; manifest records APPLYING and owner acceptance; neutral whiteboard/history unchanged. On cutover failure restore migration bytes and old pin, regenerate verified old runtime | [Migration plan](#4-migration-and-freshness-plan); [rollback](#5-validation-rollback-and-remaining-gates) |
| ATTENTION | Passed actual migration evidence | 99 tests, Markdown, structure, lifecycle, Mermaid and whitespace passed on migration; candidate runtime UPGRADE_CURRENT | Components run directly because npm unavailable; [review evidence](reviews/U84-S01.md); brief-only corrections receive targeted checks |
| ATTENTION | Remaining checks | Migration checks are recorded in the ledger; new-pin normal runtime regeneration and per-root WB33 runtime recovery remain unrun | Migration review does not assert completed cutover |
| ATTENTION | Small editorial deliveries under v4 | Require a compact plan with reciprocal workflow links by GATES_READY; legacy no-plan route is unavailable | Reconcile future project routing; preserve completed history |

## 1. Control and state

| Field | Value |
| --- | --- |
| State | APPLYING |
| Previous state | BLOCKED |
| Project / adoption manifest | [Project manifest](project-adoption-manifest.md) |
| Source repository | [Canonical playbook](https://github.com/hhhhhusky777/spec-driven-delivery-playbook) |
| Current revision | `d213114f99dc2186d6f4e50a85fe962de0e1afa9` |
| Candidate revision | `d93d27a33c43c1574aeed27044654c8964cf998b` |
| Assessment candidate revision | Exact Git blob recorded in the review ledger |
| Upgrade owner / required reviewers | Repository owner; two isolated retained reviewers |
| Safe boundary evidence | WB38 workflow ARCHIVED and plan terminal; prerequisite PR59 merged; WB33 is discussion only with no task or plan |
| Allowed write scope | This assessment and its review ledger during assessment; proposed migration scope below |
| Self-review state / evidence | See [U84 review ledger](reviews/U84-S01.md) for exact candidate evidence |
| Fresh-context review state / evidence | Assessment R02 approved; actual migration IN_REVIEW in U84-S01 with retained seats upgrade_u84_r1 and upgrade_u84_r2 |
| Human review state / evidence | Assessment R02 APPROVED by owner; exact blob and instruction in U84 ledger; migration cutover acceptance pending |
| Current blocker | None; issue 60 corrected in candidate |
| Next action | Validate actual routing migration, retained reviewer review, then owner cutover acceptance |

The owner requested the latest-main upgrade before WB33. Main resolved to the
candidate above after PR61 merged. Both normal runtime verification and candidate
preflight passed in the isolated worktree. The project pin is unchanged.

## 2. Candidate evidence and decisions

Comparison is the complete current-to-candidate Git diff. The project already
contains the candidate source, policies, tests and completed WB38 delivery;
upgrading the installed runtime does not require copying those files again.

| ID | Material change / source | Affected project artifacts | Decision | Reason / migration |
| --- | --- | --- | --- | --- |
| U01 | [Batch and recovery contract](../../docs/batch-review-and-recovery.md), templates and skills | Contributing; registry; trigger; future whiteboards, handoffs, workflows and plans | ADAPT | Explicitly reference adopted candidate contract in project routing; each batch still needs its own authority and inventory |
| U02 | Lifecycle v3/v4; frozen v2/v3 schemas; checker | Future linked workflow/plan/batch instances; archived WB38; Contributing/registry routing | ADAPT | New instances use matching v4 markers and separate prerequisites/future outputs. Even editorial deliveries need a compact plan: the legacy no-plan route is unavailable. Reciprocal plan/workflow links must resolve by GATES_READY; preparation may defer the absent plan only before readiness. Verify these constraints during migration routing checks. Preserve historical versions and accepted bytes |
| U03 | [Review brief policy](../../docs/documentation-quality-policy.md#26-attention-and-reviewability-gate) | Future owner gates and PR template | ACCEPT | Table-first phase briefs, design-to-task comparison, risks and exceptions; source enforcement is already merged |
| U04 | Draft-first discussion and consolidated readiness | Working whiteboard procedure and future task receipts | ADAPT | Update routing to candidate procedure after approval; retain WB33 notes and require substantive decisions, approved inputs and current context |
| U05 | PR-primary evidence and publication helper | Future review ledgers and PR reviews | ACCEPT | Retain concise identities/digests/links in Git, complete comments on PR; preserve old Git receipts. Helper remains optional and grants no credentials or approval |
| U06 | Exception triage and bounded recovery | Trigger, runtime skills, future workflow recovery records | ACCEPT | Classify source versus project failures; deduplicate upstream reports under existing disclosure authority; no gate bypass |
| U07 | One closure package and optional control receipt | Future closure workflows | ACCEPT | Explicit receipt authority required; no blanket cleanup or merge permission; old WB38 archive stays frozen |
| U08 | Installer manifest navigation preflight, PR59 | Tracked installer and manifest Start contributing link | ACCEPT | Candidate validates current CONTRIBUTING navigation and rejects malformed/external/escaping/symlink entries; candidate preflight passed |
| U09 | Documentation checks exclude generated runtime | package.json, lint configuration, test suite | ACCEPT | Already merged in this project; retain all blocking checks and negative regression coverage |
| U10 | Self-adoption records, WB38 archive and examples added upstream | Existing 40 tracked project adoption files; examples | NOT_APPLICABLE | These are already this repository's reviewed history, not template content to import or replay |
| U11 | Temporary checkout and identity behavior | Ignored guide, installed skills and checkout | ACCEPT | Keep current behavior for this upgrade; known issues 33/34/36 remain separately owned by WB33, with exact-SHA input and per-worktree verification |
| U12 | Portable installed skill references, PR61 | All three installed skills | ACCEPT | Documentation paths resolve through the verified checkout; actual installed upgrade skill passes the structure gate |

Owner for all decisions: repository maintainer after independent review. No
rejected change or unknown compatibility classification remains in this proposal.
Existing candidate code is supported by the merged PR59 run: 98 tests passed,
documentation checks passed, and its merged tree matches the reviewed candidate.
This does not substitute for the upgrade package's own checks below.

## 3. Complete impact inventory

| Inventory group | Treatment and freshness |
| --- | --- |
| Manifest | Current installed pin remains authority; add upgrade linkage/status only under approved migration, then final cutover pin |
| Registry and agent trigger | Refresh source routing and future v4/batch instructions in one migration package; use candidate runtime only after cutover |
| Future editorial delivery route | Reconcile existing Contributing guidance with v4 compact-plan and reciprocal-link requirements through registry/trigger references; verify absent-plan preparation cannot enter GATES_READY and a compact linked pair can |
| AGENTS, README, Contributing, quality policy, PR template, CI/configuration, scripts/tests and source templates | Already at candidate content; reconcile links and adopted versus optional authority; no wholesale replacement |
| Working whiteboard | Base branch has neutral EMPTY; original worktree contains uncommitted WB33 draft. Preserve that draft and apply any procedural migration without rewriting its decisions |
| Installation batch, live trial and adoption review ledgers | Historical approval evidence; preserve bytes, no retroactive authority expansion |
| WB38 deliveries, review ledgers, archive and directory contracts | Completed history; preserve accepted content and schema markers; do not reopen or migrate terminal tasks |
| Generated normal/upgrade guide, installed skills and owned checkout | Ignored runtime regenerated per verified root after cutover; never committed as project authority |

Transitive chain: approved assessment -> project routing migration -> migration
checks -> final pin cutover -> regenerated runtime -> WB33 discussion resumption.
WB33 has no downstream plan or active task to invalidate. Original-root runtime
validation previously failed because its OS-temporary checkout disappeared;
that root must be recovered and verified before project writes resume there.
The isolated assessment runtime validates UPGRADE_CURRENT. Neither condition
changes the tracked adoption state.

## 4. Migration and freshness plan

| Order | Boundary | Depends on | Exact write scope | Gates and rollback | State |
| --- | --- | --- | --- | --- | --- |
| 1 | Assessment review and owner acceptance | None | This assessment; reviews/U84-S01.md | Docs and exact self/two-agent review; old pin retained | ACCEPTED |
| 2 | Prepare one migration package | 1 accepted | project-adoption-manifest.md; project-contracts.md; agent-trigger.md; solution-whiteboard.md; this assessment; reviews/U84-S01.md | Reconcile candidate routing, future v4, table briefs and history preservation; restore only migration diff on failure | PREPARED |
| 3 | Validate and review actual migration package | 2 | Same scope | Full docs:all, lifecycle, whitespace, source/pin comparison, two retained reviewers and owner cutover acceptance | IN_REVIEW |
| 4 | Cutover and runtime verification | 3 accepted | Manifest pin/upgrade state; assessment evidence; ignored owned runtime | Set exact candidate pin; clean only verified owned checkouts; regenerate normal runtime; require CURRENT and matching skill/source SHA | PLANNED |
| 5 | Publish and resume | 4 verified | Approved package through PR; original WB33 draft reconciled without overwriting | Verify merged tree/checks and per-root runtime; resume discussion only | PLANNED |

Paths in the migration scope are relative to this adoption root. No branch
deletion, unrelated cleanup, new design decisions or automatic merge is granted.
Continuation proposal: EXPLICIT_REVIEW / HUMAN_REVIEW_BEFORE_MERGE. Any future
more permissive mode requires fresh owner selection within its specific scope.

## 5. Validation, rollback and remaining gates

Assessment verification and exact bytes are recorded in the review ledger.
Cutover is NOT_PERFORMED. Actual migration check results are in the ledger;
regenerated candidate workflow runtime remains NOT_RUN until owner cutover.

The migration changes registry/trigger routing and manifest upgrade controls.
The neutral whiteboard needs no byte change: it already delegates procedure to
the pinned registry, and its ordinary unbatched conclusion rule remains valid.
Preserve the original-root WB33 draft separately. README overview, batching
diagram, future-delivery procedure and repository setup remain accurate: they
already distinguish explicit batches from ordinary routes and resolve the pin
through the manifest. No reusable README or source-contract change is proposed.
The existing v4 bootstrap/reciprocal-link regressions validate the migration's
future editorial routing; they are synthetic compatibility evidence, not a
claim that WB33 already has a plan or has reached readiness.

Rollback authority is the old full SHA above. Before cutover retain the old
manifest and normal runtime. If migration fails, restore only the migration's
changed project bytes, retain failure evidence and restore the old pin. Clean
only marker-verified installer checkouts and regenerate at that old SHA. If a
checkout has disappeared, preserve its guide and diagnose ownership/recovery;
do not fabricate a marker or claim cleanup succeeded. Issues 33/34/36 retain
ownership of systemic revision/storage/isolation corrections.

No completed adoption or accepted history is deleted. The upgrade is complete
only after actual migration checks, owner cutover acceptance, verified normal
runtime and reviewed publication establish no affected stale artifact.

## 6. Exception checkpoint — U84-LINK

Historical failure at candidate `84dee5848488455c7b74371b3fa1a8cef9d38bee`:

Expected: copied candidate skills resolve their documentation through the verified
checkout. Observed: canonical structure check reports LOCAL_LINK for the copied
upgrade skill's source-relative batch documentation link. Candidate source and
installer copy behavior reproduce this independently of project policy.

Classification: PLAYBOOK_GAP. Reporting: LINKED to verified upstream
[issue 60](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/60)
after checking open and closed issues; no duplicate identified. Existing owner
authority covers sanitized playbook-gap reporting. No machine paths or secrets
were published. External issue creation returned number 60 and its canonical URL.

Preserved evidence: candidate preflight UPGRADE_CURRENT; all 98 tests, lifecycle
and Mermaid passed. Canonical structure gate FAILED; no aggregate pass or
self-review pass is claimed. Last safe state: old tracked pin plus verified
isolated runtime; candidate cutover NOT_PERFORMED. Retry counters: no blind retry,
no review rounds used. Owner: playbook maintainer. Next action: bounded source
portability correction and real-skill regression, then reassess a new SHA.

Resolution: PR61 merged as `d93d27a33c43c1574aeed27044654c8964cf998b`.
Owned old candidate and normal checkouts were cleaned through the installer;
normal runtime at the unchanged pin was regenerated, then the new candidate was
prepared. Its guide records that exact SHA and validation reports UPGRADE_CURRENT.
The real installed skill passes the structure gate. A subsequent redundant
prepare invocation refused the already-pending candidate as designed; validation
confirmed its identity without overwriting it. The earlier source failure is
resolved. The original-root missing runtime remains a separate recovery step
before resuming WB33 there. No adoption or pin change occurred.
