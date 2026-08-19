# Template Governance

This document governs the reusable templates in this repository. It is not a
project development policy; projects instantiate and approve their own policies.

## Principles

- Each template has one primary purpose.
- Stable policy belongs in policy templates; uncertain discovery belongs in the
  whiteboard; accepted feature behavior belongs in the implementation plan.
- Templates provide required questions and fields without pretending every
  answer applies to every project.
- A template change must not silently weaken an instantiated project's active
  obligations.
- Examples demonstrate the templates and must not claim evidence that was not
  produced.
- Concision matters: reference canonical content instead of duplicating it.

## Change categories

| Category | Example | Required review |
| --- | --- | --- |
| Editorial | Clarity, typo, link repair | Template owner |
| Compatible enhancement | New optional risk prompt | Owner plus affected-domain reviewer |
| Workflow change | New route, state, or gate | Development/test/PR template owners |
| Breaking template change | Removed/renamed required field or changed meaning | Cross-template review, migration note, version change |
| Methodology update | New external guidance | Applicability/trade-off review and source date |

## Review procedure

1. State the problem in the PR rather than beginning with a preferred edit.
2. Identify affected templates and examples.
3. Explain whether the change is project-specific or reusable.
4. Run a YAGNI audit: do current users need this requirement?
5. Check for duplicated authority and move content to its canonical template.
6. Update workflow routing when artifact triggers change.
7. Update at least one worked example when behavior changes.
8. Validate Markdown, relative links, Mermaid, placeholders, and terminology.
9. Record migration guidance for existing instantiated documents when needed.

## Periodic review

Review at least when:

- repeated delivery retrospectives expose the same gap;
- an example cannot represent a real workflow without workarounds;
- a major methodology/source changes;
- a policy or template repeatedly causes ambiguity or unnecessary work;
- an incident exposes a missing safety gate; or
- links, tools, or artifact formats become obsolete.

Do not update merely to appear current. Record the source, review date,
applicability, rejected alternatives, and consequences.

## Versioning

Until a formal release process is adopted:

- use repository history as the version record;
- describe breaking template changes explicitly in PRs and the changelog;
- keep accepted ADRs and historical examples stable;
- add migration notes when instantiated documents need manual updates; and
- avoid modifying an example's historical evidence to match a newer template.

## Definition of Done for a template change

- [ ] Primary purpose remains clear.
- [ ] No project-specific secret, endpoint, credential, or private data exists.
- [ ] Cross-template references and routing are consistent.
- [ ] Affected examples and README guidance are updated.
- [ ] Required/conditional fields are understandable.
- [ ] External claims have primary-source links.
- [ ] Markdown and local links validate.
- [ ] Migration or compatibility impact is recorded.
