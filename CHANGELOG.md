# Changelog

This project has not published a formal versioned release. Significant template
and workflow changes are recorded here until a release/versioning policy is
adopted.

## Unreleased — updated 2026-09-04

- Made fresh-context agent review mandatory at every review gate. The author
  freezes an exact-revision packet after self-review, creates a new read-only
  reviewer without inherited author conversation, and preserves requested
  changes and resolutions as immutable audit history. Design, governance,
  adoption, upgrade, validation, archive, and manual implementation then require
  human review; only scoped implementation `AGENT_AUTO_MERGE` may proceed after
  fresh approval and all live gates pass. Added the phase sequence to the README,
  templates, skills, PR policy, and SGLang examples, while retaining the
  distinction between process isolation and a different formal GitHub identity.
  Lifecycle schema 2 adds fresh-context and human-review state, exact revision,
  and evidence fields, plus the canonical implementation PR and post-merge
  review ledger. The checker requires exact core workflow tables and ledger
  headers, recognized row modes, exact per-PR head/merge and review/check
  receipts, fresh approval for every merged row, exact prerequisite
  dispositions, phase-and-scope proof for the implementation-only human-review
  exception, stable manifest-to-dependency IDs, and non-empty/non-dangling
  dependency and closure evidence. Active schema-1 plans and workflows must add
  the review fields; workflows must also add the current review phase/target
  fields, delivery-manifest artifact IDs, complete dependency roots, and ledger
  section with exact headers before changing their markers to `@2` at their
  next review gate. Existing approvals remain historical evidence and do not
  satisfy the new gate.

- Added `install-sdd.sh --upgrade` for fail-closed, between-task preparation of
  an immutable candidate without changing the active manifest pin. Added a
  dedicated upgrade skill, generated guide, reviewed assessment template,
  ancestry/runtime preflight, rollback and cutover rules, SGLang example, and
  installer/documentation tests. Existing projects opt in by running the new
  mode from their project root; no active project is updated automatically.

- Added a user-selected, implementation-only continuation mode. After design
  approval, `HUMAN_REVIEW_BEFORE_MERGE` pauses each task PR, while scoped
  `AGENT_AUTO_MERGE` permits merge and next-task continuation only after exact
  self-review and repository gates pass. Added per-checkpoint mode rereads,
  fail-closed lifecycle rules, post-merge human-review closure, tests, and
  SGLang examples. Existing instantiated delivery workflows must add the four
  implementation-mode control fields before their next lifecycle check.
- Added mandatory exact-revision agent self-review before every review gate,
  contract-to-change author annotations for material PR changes, fail-closed
  lifecycle validation, and SGLang examples of the prerequisite. Existing
  instantiated plans and workflows must add the three self-review control
  fields before their next lifecycle check; self-review remains evidence and
  cannot approve, merge, or continue work.
- Updated the canonical repository after transfer to
  `hhhhhusky777/spec-driven-delivery-playbook`, refreshed the SGLang adoption
  example against current installer and policy contracts, and replaced the
  project-specific parallel-submission packet with a non-authoritative SGLang
  API-key-redaction delivery example. Bumped the installer generator to `2.0.1`
  so runtimes generated with pre-transfer provenance fail closed as stale.
- Made branch routing deterministic by implementation/merge-unit count: a
  one-task delivery may merge directly through a task PR, while every
  multi-task delivery uses its own feature integration branch, task PRs return
  there, and only the fully validated feature PR targets the protected branch.
- Added risk-based review gates: semantic decisions default to
  `EXPLICIT_REVIEW`, while pre-authorized deterministic work may use bounded
  `AUTO_CONTINUE` or `REVIEW_ON_EXCEPTION`. Added fail-closed lifecycle checks,
  action-control and automation-audit ledgers, negative tests, and explicit
  separation between `AUTO_CONTINUED` evidence and approval.
- Replaced numeric production-line task targets with a semantic delivery gate:
  the smallest coherent, self-contained increment that can be reviewed,
  validated, and merged independently while leaving the integration target
  working. Clarified that merged prerequisites are allowed but unmerged
  follow-up work cannot be required for correctness.
- Made reuse evidence-based across every project-policy family: adoption now
  audits decision-level conformance, routes missing or ambiguous requirements
  to `UPDATE_EXISTING`, updates the canonical artifact instead of creating a
  duplicate, and requires reviewed exceptions for intentional alternatives.
  Added a general policy-family inventory and a detailed PR/branch checklist,
  including task/final targets and merge-before-archive ordering.
- Defined a complete task specification as sufficient to implement without
  inventing product/system behavior, while preserving contract-equivalent
  engineering choices. Added source-boundary versus exact-revision timing,
  calibration examples, structured `Spec state` enforcement, and explicit
  automation limits without introducing another lifecycle or review state.
- Added fail-closed parent-validation gates: an implementation plan may enter
  `VALIDATING` only with terminal task-ledger rows and no next task; a delivery
  workflow with a plan dependency must link to a current plan already in
  `VALIDATING`. Added the `VALIDATING -> DELIVERY_ACTIVE` feedback transition
  when final validation exposes more implementation work.
- Clarified that intentional Red tests are transient within one task and merge
  unit, while contract-only predecessors remain explicitly proposed and close
  with passing static validation rather than merged failing runtime tests.
- Added versioned SDD lifecycle schemas, structured transitive-freshness and
  dependency-scoped blocker gates, just-in-time task specifications, and scoped
  project checker execution.
- Added skill-specific adoption/workflow runtime guides with generator
  provenance, content hashing, compatibility-aware `--validate`, and fail-closed
  runtime diagnostics.
- Clarified live versus historical metadata ownership across entry points,
  workflows, plans, whiteboards, handoffs, and ADRs.
- Made blocked-runtime skill selection explicit through the manifest's
  preserved pre-block state instead of guessing from `BLOCKED`.

- Added a project-root installer that resolves the requested playbook reference
  to an immutable revision, installs the manifest-appropriate repository skill,
  and generates a locally ignored Markdown guide containing verified runtime
  and safe-cleanup metadata. Adoption now creates an empty project solution
  whiteboard after `INSTALLED`; needs enter only inside that whiteboard, never
  through the installer or generated guide.
- Defined the recurring adopted-project cycle for future needs: one active need
  per stable working-whiteboard path, immutable archive and delivery-record
  verification before replacement, fresh `EMPTY` initialization, and
  guide-driven re-entry using the manifest's pinned playbook revision. Added
  explicit self-adoption guidance for this repository after the installer
  reaches `main`.

- Renamed the repository to `spec-driven-delivery-playbook`.
- Added reusable development, specialized-policy, test, PR/branch, whiteboard,
  implementation-plan, workflow-router, and ADR templates.
- Added the whiteboard-to-manifest-to-delivery workflow graph and teaching
  README.
- Added template governance and contribution guidance.
- Added a complete worked delivery example that stops honestly before
  repository-specific implementation and test evidence.
- Added a reviewed whiteboard-to-workflow handoff with automatic-on-approval or
  manual invocation modes.
- Added independent manifest and one-artifact-at-a-time review gates across the
  workflow, templates, README diagram, and worked example.
- Added explicit mid-delivery policy-gap rerouting: local-versus-systemic and
  same-delivery-versus-independent classification, affected-task pause/stale
  rules, manifest rerouting, proposed-policy adoption, audit/remediation, and
  separate delivery-resume and policy-activation gates. README owns the
  canonical diagram; templates own normative steps and tracking fields.
- Reconciled authority precedence, whiteboard/handoff consumption, compact/full
  plan modes, task states, emergency routing, and worked-example IDs and states
  through a repository-wide consistency audit.
- Added dependency-first durable-data sequencing to the development-policy
  template, enforced data classification and task phases in implementation
  plans, and updated the worked example to use foundation -> consumer/migration
  -> cleanup ordering without imposing a universal database-first rule.
- Added the repository documentation-quality policy and Issue #1 CI: pinned
  Markdown/Mermaid tooling, relative-link/anchor, fence, placeholder,
  likely-secret and local-path checks, intentional-failure regression tests,
  advisory external links, least-privilege workflows, and owned dependency and
  methodology freshness reviews. Added an attention-map gate for long or
  multi-focus artifacts so material decisions, risks, and reviewer actions stay
  visible without duplicating their canonical text. Added a reviewed pre-start
  task context receipt so implementers reconcile the approved source revision,
  critical constraints, boundaries, and evidence before `READY -> IN_PROGRESS`.
- Added the project-adoption architecture, canonical runbook, and stateful
  adoption-manifest template. Adoption now begins with repository discovery and
  authority mapping, reuses existing project rules by default, requires local
  enforcement plus one bounded pilot before activation, and assesses later
  playbook revisions without automatic overwrite. Added bounded agent triggers
  for bootstrap, one-action continuation, and first-whiteboard creation, plus a
  pinned non-authoritative SGLang walk-through that shows the exact first file,
  proposed project overlay, review stops, and automation inputs without
  claiming upstream adoption. Clarified that adoption agents execute from the
  target project root while a caller supplies and verifies the playbook as a
  separate read-only runtime dependency; manifests keep durable source identity
  without committing machine-specific paths.

Migration guidance: active deliveries that have not started implementation
should generate and approve a handoff, review their manifest, and add review
metadata before continuing. For active implementation, reconcile current
artifacts at the next safe gate rather than discarding valid evidence. If a
systemic policy gap is already known, register it, pause only affected work,
reroute the active manifest, and preserve valid evidence. Preserve completed
historical records unchanged and apply this workflow to new work.

Schema-1 migration applies only to active implementation plans and delivery
workflows at their next review gate. Add the schema marker, semantic section
markers, previous/current lifecycle fields, structured dependency/freshness
register, scoped blockers, and explicit next-action write targets; then run
`npm run docs:sdd` and obtain independent approval. Keep completed or otherwise
frozen unmarked records unchanged as historical evidence. When an adoption
manifest enters `BLOCKED`, add and populate `State before block` before running
the installer; reset it after the reviewed safe-state return.

For existing active plans, do not rewrite completed task history. At the next
planning or replanning gate, classify not-started durable-data work, record its
foundation/consumer/migration/cleanup dependencies and compatibility evidence,
and reorder only work that has not begun. Existing project migration and
production-data policies remain authoritative.

Projects instantiating the updated test-strategy template should link their
documentation-quality authority and define documentation-only/generated-output
gates. Existing strategies remain valid until their next reviewed update; do
not claim the playbook repository's commands as project evidence unless that
project adopts and runs equivalent checks.

Projects that already use earlier playbook templates do not need to rewrite
approved documents or replay completed deliveries. At the next safe governance
review, pin the currently consumed playbook revision, create an adoption
manifest, map existing documents to `REUSE` or another reviewed decision, and
use the next bounded real delivery as adoption-pilot evidence.

Projects using the earlier first-need prompt may preserve every concluded
whiteboard and delivery record unchanged. At the next safe adoption review,
select and document one project working-whiteboard path, instantiate an empty
copy after `INSTALLED`, and archive each concluded copy before replacing that
working path for later discussion.
