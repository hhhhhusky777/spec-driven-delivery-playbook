# Contributing

## Delivery model

This repository follows the playbook's
[six goals](docs/documentation-quality-policy.md#six-goals-and-agent-judgment).
The agent chooses a proportional route within the boundaries below.

| Authority | Canonical owner |
| --- | --- |
| Installed playbook revision and project authorities | `.github/spec-driven-delivery/project-adoption-manifest.md` |
| Active design | `.github/spec-driven-delivery/solution-whiteboard.md` |
| Tasks, Definition of Done, validation, and delivery state | `.github/spec-driven-delivery/implementation-plan.md`, when active |
| Review, checks, acceptance, and merge evidence | GitHub pull request |
| Documentation quality and source-tooling evidence | [Quality policy](docs/documentation-quality-policy.md) |
| Reusable template design | [Template Governance](docs/template-governance.md) |

Do not create another document for these responsibilities. The generated
runtime guide selects the applicable skill but adds no project policy or state.

## Repository boundaries

This project ships reusable Markdown contracts, a Bash installer, Node.js
checkers, tests, and CI. Project-specific policy belongs in its project unless
it is a clearly labeled sanitized example.

Every delivery must preserve:

- current and mutually consistent canonical authorities;
- an accepted design before dependent implementation;
- task outcomes, dependencies, validation, and state in one plan;
- self-contained merge units that keep their integration target working;
- required checks, two isolated agent reviewers, and human authority;
- explicit ownership before destructive cleanup; and
- honest evidence that distinguishes passed, failed, and unrun gates.

The [error-handling framework](docs/error-handling.md) owns recovery. Agent
mistakes may be corrected within authority. Genuine project or playbook gaps
belong in their issue tracker. Stop when intended behavior, canonical authority,
policy, safety, or required human acceptance cannot be resolved safely.

## Branches, review, and merge

The canonical repository is `hhhhhusky777/spec-driven-delivery-playbook` and the
protected integration target is `main`.

Every delivery uses an owned delivery branch. For one implementation unit, that
branch is also the task branch and may target `main`. Multiple dependent units
use it as the feature integration branch; task PRs target it and the final
reviewed feature PR targets `main`. Parallel work uses separate worktrees and
non-overlapping ownership. Do not rewrite shared history, bypass required
checks, force-push `main`, or claim hosting protections without current evidence.

Create the delivery worktree and branch before checking playbook currentness or
starting whiteboard work. Apply any accepted upgrade in that worktree. Keep its
creation point as the ordinary implementation baseline, then synchronize the
completed candidate with its target and run affected checks on the resulting
candidate before final review. Exceptional recovery follows the canonical
error-handling framework. Before dependent work proceeds, exercise a relevant
project operation from the worktree itself and provision any missing required
ignored support within its ownership and security boundaries.

The implementation plan records any owner-selected merge mode and exact scope.
Human review before merge is the default. Scoped agent auto-merge never supplies
design, policy, validation, cleanup, or out-of-scope authority.

Open the PR when it best supports collaboration; a draft PR is not required
before coding. Each task still implements the tests required by its accepted
outcome. Its fast gate checks only changed files and lines plus the directly
exercised behavior, using focused tests without full-project coverage. That
evidence prepares the coherent task candidate for the two retained agent
reviewers. An intermediate task PR targeting the feature integration branch
does not run general full, heavy, long-running, or full-coverage validation.
After both reviewers report no findings on the same exact head of the final
candidate targeting `main`, run the full applicable repository validation
including full coverage and selected heavy or long-running tests, before
required owner acceptance. A single-task PR targeting `main` is final. Candidate-changing
corrections return through affected checks and both retained reviewer seats;
final-candidate corrections also invalidate full validation. GitHub is the
durable record, and a stricter project policy still applies.

If active implementation of one task reaches one hour without reaching its
planned review boundary, stop and give the owner a concise account of time
spent, progress, cause, remaining work, and recommended next action. Continue
only after owner justification or authorization. Count active
implementation time only; network or environment interruptions, review time,
and time waiting for people or external systems do not count.

Before final review, that candidate must already contain every predictable
tracked canonical state that its merge will make true. If it closes the
delivery, archive the concluded whiteboard with links to its PRs, remove the
feature plan and other non-reusable feature material, and reset the working
whiteboard in the same candidate. Preserve the manifest and reusable project
authority. Pending review, merge, and target verification remain GitHub facts;
after merge, verify the exact target without creating a status-only follow-up.
Then remove owned delivery/task worktrees, delete only owned merged branches,
and return the coordinating checkout to `main` when doing so will not discard
or disrupt other work.

## Change expectations

A contribution makes the problem, expected outcome, scope/non-scope,
compatibility impact, risks, and validation clear. Reconcile affected templates,
skills, examples, README text, and diagrams in the same change. Prefer the
smallest design that satisfies the outcome; Git history preserves superseded
wording and examples.

Do not add credentials, private project data, raw chat transcripts, fabricated
evidence, or redundant process records. New dependencies require a reviewed
need, provenance, license, maintenance, pinning, and removal assessment.

## Validation

Pull-request automation runs the changed-file and changed-line gate against the
PR base:

```bash
npm run docs:fast -- BASE_REVISION HEAD
```

After exact-head agent review of the final candidate, run the complete source
gate before human merge acceptance:

```bash
npm ci --ignore-scripts
npm run docs:all
```

External-link checks are advisory. Automated checks do not replace semantic
review or the concise human brief required by the quality policy.
