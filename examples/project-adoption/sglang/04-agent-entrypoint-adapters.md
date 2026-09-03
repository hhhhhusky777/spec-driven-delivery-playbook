# Proposed SGLang Agent and Human Entry-Point Adapters

These are thin adapters to one canonical entry point. They contain no copied
policy. SGLang has not reviewed or adopted them.

## Root `AGENTS.md`

Proposed content:

```markdown
# Repository agent entry point

For a non-trivial need, defect, refactor, architecture change, or policy gap,
read `.github/spec-driven-delivery/README.md` before editing.

Also follow every more-specific `AGENTS.md`, `.claude/rules`, component skill,
contribution, test, CODEOWNERS, CI, and maintainer instruction applicable to the
files you touch. The spec-driven entry point does not override those rules.
```

The existing `docs/AGENTS.md` remains the more-specific authority for work
inside `docs/`.

## `.claude/rules/spec-driven-delivery.md`

Proposed content:

```markdown
# Spec-driven delivery entry point

Before a non-trivial repository change, read
`.github/spec-driven-delivery/README.md` and the active delivery artifacts it
selects. Continue to follow all component-specific rules and skills. Do not
generate a dependent artifact or begin implementation before its review gate.
Before requesting that review, complete the required agent self-review against
the exact candidate revision; a pass is evidence, not approval.
```

## Contribution-guide link

Proposed concise addition to the SGLang contribution guide:

```markdown
## Plan a non-trivial change

For a non-trivial feature, defect, refactor, architecture decision, or systemic
policy gap, start at `.github/spec-driven-delivery/README.md`. This adds
reviewed discovery and planning before implementation; the testing, CI,
reviewer, and merge requirements in this guide remain authoritative. Complete
the required exact-revision agent self-review before each review gate.
```

In a real adoption, each change follows its existing path owner and is reviewed
separately. The adapters are not committed merely because this example proposes
them.
