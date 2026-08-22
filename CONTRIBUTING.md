# Contributing

Changes are welcome when they make the workflow clearer, safer, more
evidence-driven, or less burdensome without weakening necessary controls.

## Before changing a template

- Describe the observed ambiguity, repeated failure, missing risk, or excessive
  process cost.
- Confirm that the need is reusable rather than project-specific.
- Identify the one canonical template that owns the rule.
- Check [Template Governance](docs/template-governance.md).
- Check the
  [Documentation Quality and Testing Policy](docs/documentation-quality-policy.md).
- Preserve accepted decision and example history.

## Pull request expectations

Include:

1. Problem and expected improvement
2. Affected templates/workflow routes
3. Alternatives and YAGNI assessment
4. Compatibility/migration impact for existing users
5. Updated example or explanation why none is affected
6. Markdown, link, diagram, and placeholder validation
7. External primary sources when methodology claims change

Do not add credentials, private customer/project data, raw chat transcripts, or
fabricated delivery evidence.

## Repository scope

Appropriate:

- Reusable development, testing, review, discovery, decision, and delivery
  templates
- Workflow routing and state/gate definitions
- Worked examples with honest evidence states
- Template adoption and migration guidance

Project-specific policies should live in their project repository. They may be
included here only as clearly labeled, sanitized examples with permission.

## Validation

Install the exact locked dependencies and run every blocking check and its
negative regression suite:

```bash
npm ci --ignore-scripts
npm run docs:all
```

Review external links separately. Remote failures are advisory but must be
classified when they affect a changed claim:

```bash
npm run docs:links:external
```

Automated checks do not replace semantic review. Complete
[the policy checklist](docs/documentation-quality-policy.md#9-review-checklist),
inspect the complete diff, and record the governing source, reviewer, material
comments, and resolution in the pull request. Examples must use only intentional
example values, and template responsibilities must not conflict.
