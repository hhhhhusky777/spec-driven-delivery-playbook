---
name: sdd-playbook-upgrade
description: Assess and apply a prepared Spec-Driven Delivery Playbook revision in an installed project through its generated upgrade guide, without changing the active pin before fresh-context and human approval or upgrading during active task work.
---

# SDD Playbook Upgrade

## Governing goals

After runtime verification, read and apply
`docs/documentation-quality-policy.md#five-goals-and-agent-judgment` from the
verified playbook checkout. Keep operational choices within project authority.

## Exception routing

Read and apply `docs/batch-review-and-recovery.md#recovery-without-restarting-everything`
and `docs/batch-review-and-recovery.md#exception-triage-and-upstream-reporting`
from the verified checkout. Use `templates/reviews/exception-triage.md` in the
existing recovery record. Runtime-verification failure still forbids reading
an unverified checkout or making prohibited project writes.

## Optional batched route

Before using an explicitly approved upgrade batch, read
`docs/batch-review-and-recovery.md` from the verified read-only playbook checkout.
Group authorized preparation/migration review boundaries; retain current pin,
between-task checks, actual validation, human cutover and owned cleanup. Never
use batching to upgrade during active implementation or erase failure evidence.

Resolve source paths through that verified checkout, not the installed skill
directory. Availability is not project adoption or additional authority.

Use this skill only from an installed project's root when
`.sdd-runtime/playbook-upgrade-guide.md` exists.

## Establish the boundary

1. Read the entire generated guide and verify its content hash, project root,
   manifest, source repository, current revision, candidate revision, checkout,
   ownership marker, and installed-skill marker.
2. Re-read the project entry point, adoption manifest, active delivery workflow,
   implementation plan, project policies, and current handoff. The project
   authorities and current playbook revision remain authoritative.
3. Fail closed if a task is `IN_PROGRESS` or `VERIFYING`, a task PR or merge is
   pending, a required artifact is absent or stale, unrelated work overlaps the
   upgrade scope, or the guide disagrees with durable project state.
4. Do not modify the candidate checkout. Do not infer compatibility from a
   successful installer preflight.

## Assess the candidate

Create or resume the guide's assessment destination from the candidate
`templates/adoption/playbook-upgrade-assessment.md`.

- Compare the exact current and candidate revisions, including changelog,
  migration guidance, schemas, templates, skills, installer behavior, and gates.
- When moving to v5, verify the PR-evidence/reset contract, fixed-size manifest
  locator, exact inventory semantics and GitHub-aware read-only gate. Do not
  reinterpret an old archive as a completed v5 reset.
- Inventory every adopted project artifact and active delivery dependency that
  the candidate changes can affect.
- Classify each material change `ACCEPT`, `ADAPT`, `REJECT`, or
  `NOT_APPLICABLE`, with evidence and an owner. Unknown impact blocks approval.
- Compute transitive staleness and a dependency-ordered migration sequence.
- Preserve the old pin, runtime, and rollback instructions until validation and
  cutover complete.
- Reset implementation continuation to explicit review in the proposal when
  review, merge, gate, or continuation semantics changed. Project authority
  must reconfirm any more permissive mode after migration.

For the exact assessment candidate, follow the candidate checkout's
`templates/reviews/agent-self-review.md` and
`templates/reviews/fresh-context-agent-review.md`. Those protocols own
`SELF_REVIEW_PASSED`, isolated retained reviewers, evidence and correction rounds.
Mandatory human upgrade review still precedes cutover; agent review is not
human upgrade authority.

## Apply an approved upgrade

Resume only from an explicit human review disposition that follows
fresh-context approval and identifies the approved assessment revision and
permitted transition.

1. Record the supplied approval and enter assessment/manifest upgrade state
   `APPLYING`. Change adoption state to `UPDATING` only when project authority
   requires it; record and restore the preceding stable state.
2. Apply one dependency-ready migration boundary at a time through the normal
   project owner, write scope, checks, self-review, and review mode. Do not
   replace project authority with unreviewed template text.
3. Update derived artifacts and freshness records in dependency order. Stop on
   conflict, ambiguity, failed evidence, or scope expansion.
4. Validate all candidate-required project gates while the old manifest pin is
   still the rollback authority.
5. At final cutover, update the manifest pin to the exact candidate commit,
   record the upgrade result, and mark the assessment `COMPLETE` only when no
   affected artifact is stale or blocked.
6. Run the guide's cleanup command. Regenerate the normal runtime with
   `./install-sdd.sh`, run `./install-sdd.sh --validate`, and verify the normal
   workflow skill marker matches the new manifest pin.

A project with active old-schema work finishes under that pin by default. A v5
cutover requires a task-safe checkpoint and exact reviewed migration candidate;
only later deliveries may use the v5 reset route.

If validation or cutover fails, restore the last approved pin and affected
project artifacts, record the failure and evidence, clean the candidate runtime,
and regenerate the normal runtime from the restored pin. Never represent a
failed or partial migration as the active playbook revision.
