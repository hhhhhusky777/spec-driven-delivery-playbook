# Contributing

## Delivery model

This repository follows the playbook's
[five goals](docs/documentation-quality-policy.md#five-goals-and-agent-judgment).
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

One implementation unit may use a task branch targeting `main`. Multiple
dependent units use an owned feature integration branch; task PRs target it and
the final reviewed feature PR targets `main`. Parallel work uses separate
worktrees and non-overlapping ownership. Do not rewrite shared history, bypass
required checks, force-push `main`, or claim hosting protections without current
evidence.

The implementation plan records any owner-selected merge mode and exact scope.
Human review before merge is the default. Scoped agent auto-merge never supplies
design, policy, validation, cleanup, or out-of-scope authority.

Open the PR when it best supports collaboration; a draft PR is not required
before coding. Before merge, publish the complete exact candidate, run
applicable checks, reconcile comments, obtain review from the two retained
agent seats, and obtain required owner acceptance. GitHub is the durable record.

After verified delivery, archive the concluded whiteboard with links to its
merged PRs, remove the feature plan and other non-reusable feature material,
then reset the working whiteboard. Preserve the manifest and reusable project
authority. Delete only owned merged branches after approval.

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

The source repository's blocking command is:

```bash
npm ci --ignore-scripts
npm run docs:all
```

External-link checks are advisory. Automated checks do not replace semantic
review or the concise human brief required by the quality policy.
