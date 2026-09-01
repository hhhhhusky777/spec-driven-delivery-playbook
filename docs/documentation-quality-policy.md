# Documentation Quality and Testing Policy

This policy governs documentation and reusable template changes in this
repository. It also defines the minimum documentation-quality prompts that the
test-strategy template carries into an instantiated project.

## 1. Control and authority

| Field | Value |
| --- | --- |
| Status | Active on `main`; changes take effect only after reviewed merge |
| Owner | Playbook maintainers |
| Applies to | Markdown, templates, examples, documentation tooling, and CI |
| Automated gate | `.github/workflows/documentation-quality.yml` |
| Local entry point | `npm run docs:all` |
| External-link evidence | `npm run docs:links:external` — advisory |
| Review cadence | Quarterly and on the events in Section 6 |
| Last source review | 2026-08-22 |

The authority order is:

1. Legal, security, and upstream contractual obligations.
2. This policy for repository documentation quality and testing.
3. [Template Governance](template-governance.md) for template ownership and
   lifecycle.
4. [Contributing](../CONTRIBUTING.md) for the contributor workflow.
5. Individual template instructions and worked examples.

Resolve conflicts at the higher authority. Do not copy this policy into every
template or generated artifact.

> [!IMPORTANT]
> Automation can prove structure and known mechanical rules. It cannot approve
> factual correctness, clarity, completeness, or methodological fitness. Every
> material documentation change therefore requires both automated evidence and
> human or independent-agent semantic review.

## 2. Required semantic review

The reviewer records a change, an evidence-backed explanation, or an accepted
follow-up for every material problem.

### 2.1 Correctness and evidence

- Compare changed statements with their governing repository contract, current
  implementation when relevant, and authoritative external source.
- Distinguish normative rules, recommendations, assumptions, proposals,
  examples, and dated observations.
- Cite a primary source for an external methodology or tooling claim. Record the
  review date when freshness affects the decision.
- Never claim that implementation, review, tests, or production evidence exists
  when it was not produced.
- Explain important trade-offs, applicability limits, and worst cases. Do not
  present one context-dependent practice as universally correct.

### 2.2 Clarity, simplicity, and accessibility

- Lead with the outcome, owner, state, or required action.
- Prefer short sentences, familiar words, defined terms, and one stable term for
  one concept.
- Write requirements so a reasonable reviewer reaches one interpretation.
  Replace vague pronouns, undefined scope, and words such as “usually” or
  “appropriate” with an explicit condition when they affect behavior.
- Use headings, lists, tables, and diagrams only when they improve navigation or
  understanding. Provide a text explanation for material diagram meaning.
- Use descriptive link text and a logical heading hierarchy. Add alternative
  text to informative images.
- Keep necessary safety and correctness detail; concision must not erase a
  boundary, exception, failure response, or owner.

### 2.3 Cross-document consistency

- Identify the canonical owner of every changed normative rule.
- Search all templates, examples, indexes, workflow diagrams, and policies that
  reference the changed term, state, gate, path, or responsibility.
- Reconcile contradictions at their owning authority. Mark dependents stale or
  update them in the same change when required.
- Verify inbound and outbound links, terminology, lifecycle states, task IDs,
  examples, and migration/adoption guidance.
- If a workflow route, state, artifact trigger, or review gate changes, update
  its diagram, normative workflow text, template fields, and worked example
  together.

### 2.4 Canonical ownership and emphasis

- State a normative rule once in its canonical policy or contract.
- Elsewhere, link to the owner and summarize only the local consequence. Label a
  non-normative summary when a reader might mistake it for the full rule.
- Remove redundant passages that add no local decision, context, or evidence.
- Emphasize an important rule with a descriptive heading, concise bold label, or
  supported Markdown callout. Do not repeat it merely to make it visible.
- A generated document may repeat the minimum context needed to stand alone,
  but it must not create a competing version of a shared rule.

### 2.5 Instantiated and generated documents

Content created from a template must pass the same review as a template change:

- replace all applicable placeholders and remove template-only instructions;
- use verified project names, paths, contracts, owners, environments, states,
  and evidence rather than generic or invented values;
- apply active project policies and explain feature-specific consequences;
- resolve or explicitly mark every required non-applicable section;
- preserve accepted history, rejected alternatives, and review state; and
- run the project's documentation checks in addition to any product-code gates.

Generation is not review. A producing agent or automation does not approve its
own artifact unless an active project policy explicitly permits that risk level.

### 2.6 Attention and reviewability gate

Use this gate when a document or change contains multiple material decisions,
normative obligations, risks, exceptions, lifecycle states, open questions, or
reviewer specialties. Do not use a fixed line, word, or page count as the
trigger; generated text, tables, diagrams, and short high-risk contracts have
different review costs.

Place a concise attention map near the beginning of the artifact or pull-request
description. It must identify:

- the outcome and scope;
- new or changed decisions and obligations, using stable IDs when available;
- blockers, unresolved questions, material risks, and exceptions;
- the required reviewer or specialty for each material item; and
- a recommended reading order with links to the canonical sections and evidence.

The map is navigation, not a substitute authority. It must not paraphrase a rule
in a way that can compete with the canonical text, omit a material item merely
to stay short, or claim approval/evidence that does not exist.

The reviewer performs two passes:

1. Independently inventory material decisions, obligations, risks, exceptions,
   and blockers from the complete artifact/diff; reconcile that inventory with
   the attention map.
2. Review the mapped source sections and evidence in the stated dependency
   order, recording `APPROVED`, `CHANGES_REQUESTED`, or `NOT_APPLICABLE` for
   every material item.

A reviewer must not approve from the map alone. If the full artifact or change
still cannot be reviewed as one coherent unit, split it into dependency-ordered,
independently reviewable artifacts or pull requests and record their links and
gates.

## 3. Automated blocking checks

Every relevant pull request and push to `main` runs the following gates:

| Check | Implementation | Required failure proof |
| --- | --- | --- |
| Markdown structure/style | `markdownlint-cli2` with repository configuration | Invalid Markdown fails |
| Relative files and Markdown headings | Repository Node.js checker | Missing file and anchor fail |
| SDD lifecycle and template conformance | Versioned lifecycle schema and checker | Illegal state/dependency/template combinations fail |
| Fenced code blocks | Repository Node.js checker | Unclosed fence fails |
| Mermaid syntax | Official `mermaid.parse` API | Invalid diagram fails |
| Template placeholders | Repository Node.js checker | Placeholder outside `templates/` fails |
| Likely secrets | Repository Node.js checker | Representative credential pattern fails |
| Private/local paths | Repository Node.js checker | Representative workstation path fails |

The regression suite creates intentional failures at runtime; it does not commit
real credentials, private paths, or permanently invalid fixtures. A new blocking
rule is incomplete until it has a negative regression test and one repository
pass case.

Diagnostics must include the affected file, line, rule, and actionable reason.
CI never rewrites documentation.

The lifecycle gate validates structured control fields and semantic markers,
not prose inference. It enforces dependency-scoped blockers, transitive
freshness, write scope, plan/task readiness, and selected template-mode
requirements. Future `PLANNED` tasks may remain `SPEC_PENDING`; tasks marked
`READY`, `NEXT`, or active require a complete task specification.

Use explicit roots and narrow exclusions when applying the structural checker
to an adopting project:

```bash
node scripts/documentation-quality.mjs check \
  --root /path/to/project \
  --exclude .sdd-runtime \
  --exclude generated
node scripts/sdd-lifecycle.mjs check --root /path/to/project
```

Exclusions are root-relative and reviewed. They must not hide the active SDD
manifest, workflow, plan, or another governed artifact.

The likely-secret check is defense in depth for documentation changes, not a
replacement for repository or organization secret scanning. If a credential is
ever committed, revoke/rotate it before treating removal as complete.

## 4. Advisory external-link checks

External links are checked with bounded concurrency, a 10-second request
timeout, two retries for transient network/timeout, rate-limit, and server
responses, and normal redirect handling. Failures report the source and remote
result but do not block a pull request because remote outages, authentication,
rate limits, and bot protection are not repository defects.

An exclusion must be a narrow URL pattern in
`config/documentation-quality.json` with a reviewed reason in the pull request.
Do not exclude a domain merely because one page is unstable. A maintainer
classifies a repeated advisory failure as:

- broken or moved source — update the link and re-check the claim;
- temporarily unavailable — retain with dated evidence and recheck;
- authentication/bot protected — replace with a stable primary source when
  practical; or
- obsolete methodology — route a reviewed policy/template update.

## 5. Tool and workflow dependency policy

- Node.js 24 is the documentation-tool runtime.
- Direct npm dependencies use exact versions and `package-lock.json`; CI uses
  `npm ci --ignore-scripts`.
- GitHub Actions use full immutable commit SHAs with a version comment. Current
  workflows use GitHub-owned actions only. Third-party actions are denied by
  default and require a recorded exception under Section 8.
- Workflow permissions are read-only, credentials are not persisted, no secrets
  are exposed, and pull-request content never runs through
  `pull_request_target`.
- Dependabot proposes grouped npm and GitHub Actions updates monthly. A
  maintainer reviews release notes, security impact, lockfile changes, negative
  regression tests, repository output, and upstream compatibility before merge.
- Security advisories, broken CI, or unsupported runtimes trigger immediate
  review; routine version availability alone does not justify an unreviewed
  upgrade.
- New dependencies or third-party actions require a necessity, maintenance,
  license, provenance, pinning, and replacement/removal assessment.

The official Mermaid parser validates every repository diagram in a minimal
`jsdom` environment without launching Chromium. This is the selected equivalent
to Mermaid CLI because the repository does not need image rendering in CI and
should not carry Puppeteer/Chromium cost or sandbox risk merely to parse two
diagrams.

## 6. Freshness and methodology review

Maintainers review this policy, tool pins, and external methodology references
quarterly. Review sooner when:

- an authoritative source changes a relied-on recommendation or contract;
- a dependency release changes supported syntax or behavior;
- a security advisory affects an action, npm dependency, or CI runtime;
- a link repeatedly fails or redirects to materially different content;
- a retrospective exposes ambiguity, duplication, stale guidance, or a missed
  documentation defect; or
- a generated project artifact repeatedly needs an undocumented workaround.

Freshness means reassessing applicability, not automatically copying the newest
external wording. Record the source date, relevant change, trade-off, affected
documents, compatibility/adoption impact, and reviewer. Preserve historical
records; update active authorities through their normal review gates.

## 7. Local and CI commands

```bash
npm ci --ignore-scripts
npm run docs:all
npm run docs:links:external
```

`docs:all` runs every blocking gate and negative regression test. The external
link command returns a non-zero status when advisory failures exist so local and
CI output stays visible; the workflow marks only that step non-blocking.

The workflow runs on relevant pull-request and `main` changes, monthly schedule,
and manual dispatch. Relevant paths include Markdown, policy/tool configuration,
dependency locks, documentation scripts/tests, and the workflow itself.

## 8. Failure handling and exceptions

Treat a failed documentation test as evidence, not automatically as a test bug:

1. Record the command, observed diagnostic, changed statement/file, and expected
   rule.
2. Check the canonical policy, source, checker design, configuration, and
   smallest reproducer.
3. Classify the result as content defect, policy/design conflict, stale source,
   configuration defect, checker/test defect, environment/external failure, or
   unresolved.
4. Fix the responsible layer, add or update the regression test, and rerun the
   complete blocking suite.

Do not weaken a checker, add a broad allowlist, change an assertion, or duplicate
content merely to make CI green.

An exception records the exact rule/file, evidence, reason, worst case, narrow
allowlist or compensating review, owner/approver, expiry, and removal condition.
External advisory failures do not require a gate exception, but their
classification belongs in review evidence when they affect a changed source.

## 9. Review checklist

- [ ] Every changed claim is correct and traceable to its governing source.
- [ ] Wording is clear, concise, accessible, and has no material ambiguity.
- [ ] Cross-document owners, states, terms, links, diagrams, and examples agree.
- [ ] Normative content has one owner; summaries link rather than compete.
- [ ] Instantiated/generated content is project-specific and claims only real
      evidence.
- [ ] When the attention gate applies, its map matches an independent inventory
      of material items and every item has a recorded reviewer disposition.
- [ ] Freshness, compatibility, adoption, and historical-record impact are
      addressed.
- [ ] Every new blocking rule has an intentional failure regression test.
- [ ] `npm run docs:all` passes and external-link advisories are classified.

## 10. Methodology and tooling references

These sources inform this repository policy but do not override it:

- [Google developer documentation style guide](https://developers.google.com/style)
- [Google guidance for accessible documentation](https://developers.google.com/style/accessibility)
- [Microsoft guidance for simple words and concise sentences](https://learn.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences)
- [Microsoft guidance for scannable content](https://learn.microsoft.com/en-us/style-guide/scannable-content/)
- [Google guidance for paragraph structure and critical information](https://developers.google.com/style/paragraph-structure)
- [Google guidance for navigating a change in review](https://google.github.io/eng-practices/review/reviewer/navigate.html)
- [GitHub Actions secure-use reference](https://docs.github.com/en/actions/reference/security/secure-use)
- [Mermaid syntax validation API](https://mermaid.js.org/config/usage.html#syntax-validation-without-rendering)
- [npm package-lock documentation](https://docs.npmjs.com/cli/configuring-npm/package-lock-json)
