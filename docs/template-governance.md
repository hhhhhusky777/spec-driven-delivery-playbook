# Template Governance

This document governs the reusable templates in this repository. It is not a
project development policy; projects instantiate and approve their own policies.
All repository changes also follow the
[Documentation Quality and Testing Policy](documentation-quality-policy.md).

## Principles

- Each template has one primary purpose.
- Stable policy belongs in policy templates; uncertain discovery belongs in the
  whiteboard; accepted feature behavior belongs in the implementation plan.
- Templates provide required questions and fields without pretending every
  answer applies to every project.
- A template change must not silently weaken an instantiated project's active
  obligations.
- Machine-enforced template contracts use a versioned schema. A breaking field,
  state, marker, or meaning change increments that schema and includes adoption
  and migration guidance.
- Examples demonstrate the templates and must not claim evidence that was not
  produced.
- Concision matters: reference canonical content instead of duplicating it.
- Every review gate requires exact-candidate self-review and a stable review
  session whose reviewer(s) are initially created without author context and
  retained across revision rounds. Design and governance artifacts then require human
  approval. Only scoped implementation `AGENT_AUTO_MERGE` may proceed after
  fresh approval without pre-merge human review. Pre-authorized deterministic
  mechanics may continue automatically with fail-closed gates and an audit
  record; `AUTO_CONTINUED` never means approval.

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
8. Run the documentation policy's automated suite and semantic review.
9. Record migration guidance for existing instantiated documents when needed.
10. When review states or dependencies change, verify the handoff trigger,
    manifest review, per-artifact review loop, and return paths together.
11. Before every review gate, complete the agent self-review record against the
    exact candidate revision; any later change invalidates that evidence.
12. Open a stable session with exactly two fresh-context reviewers for that exact
    candidate, preserve findings and author dispositions, and retain those
    reviewer(s) through revisions. Require human review unless the candidate is
    inside a live scoped implementation `AGENT_AUTO_MERGE` action.

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
- preserve unmarked historical artifacts as version-zero evidence; migrate an
  active artifact only through its normal review gate;
- keep accepted ADRs and historical examples stable;
- add migration notes when instantiated documents need manual updates; and
- avoid modifying an example's historical evidence to match a newer template.

## Project adoption and updates

The [Project Adoption Runbook](project-adoption-runbook.md) owns how a project
maps, instantiates, pilots, activates, and later updates this playbook. Template
governance owns the upstream change; it does not grant that change authority in
an adopting project. Migration guidance identifies possible impact, while each
project's reviewed adoption manifest decides whether to accept, adapt, reject,
or defer the update.

An installed project prepares a candidate with `./install-sdd.sh --upgrade`
only between tasks. The generated guide and
[upgrade assessment](../templates/adoption/playbook-upgrade-assessment.md)
preserve the current pin through independent review and migration validation;
the manifest changes once at final cutover.

## Definition of Done for a template change

- [ ] Primary purpose remains clear.
- [ ] No project-specific secret, endpoint, credential, or private data exists.
- [ ] Cross-template references and routing are consistent.
- [ ] Review owner, state, comments, and approval remain explicit and no
      dependent artifact relies on an unapproved draft.
- [ ] Self-review, fresh-context review, durable findings, and applicable human
      approval are traceable to the exact candidate.
- [ ] Affected examples and README guidance are updated.
- [ ] Required/conditional fields are understandable.
- [ ] External claims have primary-source links.
- [ ] Documentation policy semantic review and automated gates pass.
- [ ] Migration or compatibility impact is recorded.
