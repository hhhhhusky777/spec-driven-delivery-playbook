# Documentation Quality and Testing Policy

## Optional batched route

An explicitly adopted v3 batch may satisfy artifact-level review obligations
in one exact coherent package. All semantic inventory, tests, retained reviewers
and applicable human acceptance remain required. The linked contract owns the
batch cadence, table-first brief and prospective PR evidence retention; ordinary
unbatched review continues below.

See [Batched review and recovery](../docs/batch-review-and-recovery.md) for authority, evidence and recovery
requirements. This route takes effect only through reviewed project adoption.

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
> material documentation change therefore requires automated evidence,
> fresh-context agent review, and human semantic review.

Before every review gate, the producing agent must complete the
[agent self-review record](../templates/reviews/agent-self-review.md) against the
exact candidate revision. It checks correctness, clarity, canonical ownership,
cross-document consistency, freshness, duplication, attention mapping, scope,
and applicable automated evidence. Any candidate change invalidates the result.
`SELF_REVIEW_PASSED` is review input only; it cannot approve the artifact,
satisfy reviewer independence, authorize merge, or authorize continuation.
Next open a review session and initialize exactly two fresh-context reviewers for the exact candidate under the
[canonical protocol](../templates/reviews/fresh-context-agent-review.md).
Preserve requested changes, author dispositions, and resolutions as immutable
findings. After all assigned reviewers approve the same exact candidate,
mandatory human review decides the documentation gate. Any candidate change
requires a new self-review and re-review by the same session reviewer(s).

## 2. Required semantic review

The author records `ACCEPT`, `PARTIALLY_ACCEPT`,
`REJECT_WITH_JUSTIFICATION`, or `DEFER_WITH_AUTHORITY` for every material
finding. The same assigned reviewer then verifies the response; unresolved
author-reviewer disagreement is a human decision, not an automatic code edit.

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
- Treat README as a maintained user-facing contract summary. In the same PR,
  reconcile its overview, procedures and diagrams with changed behavior, or
  record a specific no-impact explanation after inspecting those sections.
  A link to new guidance does not resolve contradictory existing instructions.
  Label legacy and opt-in routes explicitly; preserve historical examples as
  history rather than rewriting their recorded outcomes. Reviewers verify this
  reconciliation before approval; syntax checks cannot prove semantic agreement.

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
own artifact. It must perform and record self-review, then obtain fresh-context
review and human approval before the artifact passes its review gate.

### 2.6 Attention and reviewability gate

At every human review gate, the coordinator must present a current, concise
table in the handoff or PR description before requesting acceptance. This
human-facing brief is required even when the optional detailed attention map
below is unnecessary. Do not assume the human will read every source document.
Agents still inspect the complete candidate; the brief supports informed human
judgment and cannot replace independent review or hide a material concern.

| Required brief content | What the human must see |
| --- | --- |
| Acceptance scope | Outcome, scope/non-scope, exact candidate and source versions, and the action acceptance authorizes |
| Key decisions | Important choices and consequences; alternatives and recommendation for unsettled choices |
| Risks and limits | Compatibility/security/operational risks, exceptions, deferred obligations, assumptions and owners |
| Evidence | Passed checks and their scope, failed/unrun checks, uncertainty and residual limitations |
| Required response | DECISION versus ATTENTION, specific questions or exact-package acceptance; explicitly state when no open design decisions remain |

Include the following phase-specific content in that same brief:

| Existing gate | Required phase-specific summary |
| --- | --- |
| Adoption acceptance | Discovered system contracts and sources; policies reused, changed or added and why; gaps/conflicts, exceptions and deferred items; owners; test/review/merge rules; pin/runtime and activation status |
| Planning acceptance | Whiteboard design key points together with task IDs, brief work/outcome per task, dependency/order, validation and PR boundaries; show design-to-task alignment and gaps |
| Implementation PR acceptance | Delivered behavior, deviations from accepted design/plan, compatibility and operational effects, evidence and exact merge target |
| Validation and closure | Planned versus actual outcomes, unresolved follow-ups, evidence limits, archive/cleanup targets and required permissions |
| Upgrade acceptance | Old/new source pins, contract/policy impact, migration, rollback, validation and explicit cutover authority |

At combined planning review, present a comparison table with columns
`Design point / source`, `Task(s) and brief work`, `Validation`, and
`Consistency / gap`. Include uncovered design points, tasks without a design
basis, deviations and justified non-code obligations—not only successful
mappings. Task presence is not proof of implementation or design fulfillment.
The existing batched boundary is unchanged: no separate whiteboard review stop
is introduced. Ordinary projects retain their adopted review boundaries.

Reconcile the brief after candidate changes and before the human handoff.
Reviewers independently compare it with the complete candidate and report
omissions or misleading statements as findings. A missing, stale or materially
incomplete brief blocks the request for human acceptance until corrected;
corrections stay within the existing review session. Source links offer detail,
not a substitute for surfacing important information. Keep one canonical brief
for the gate and link it from other records. Automated syntax checks alone do
not establish completeness or semantic consistency.

Use the additional detailed attention map when a document or change contains multiple material decisions,
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
`READY`, `NEXT`, or active require `Spec state: COMPLETE` and a matching task
specification marker. Automation checks those structured facts; it does not
infer prose quality or require one internal design when multiple implementations
satisfy the same approved contracts.

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
should not carry Puppeteer/Chromium cost or sandbox risk merely to parse
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

For every exception, apply the shared
[exception triage and upstream reporting contract](batch-review-and-recovery.md#exception-triage-and-upstream-reporting).
The layer classification below diagnoses documentation failures; the shared
contract determines whether a confirmed playbook gap needs an upstream issue.
Issue filing does not replace the exception approval requirements here.

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
- [ ] README overview, procedures and diagrams match the changed behavior, or
      the PR records a reviewed, section-specific no-impact explanation.
- [ ] Normative content has one owner; summaries link rather than compete.
- [ ] Instantiated/generated content is project-specific and claims only real
      evidence.
- [ ] When the attention gate applies, its map matches an independent inventory
      of material items and every item has a recorded reviewer disposition.
- [ ] The human-facing brief is current, complete for this phase, distinguishes
      decisions from attention, and states exact acceptance scope and unverified
      evidence; planning shows design points alongside task summaries and gaps.
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

## 11. Project tooling test strategy

This supplement is proposed under the owner-authorized
[installation batch](../.github/spec-driven-delivery/installation-batch.md).
It becomes active after final acceptance and reviewed merge of that exact
package, as required by Section 1. Sections 1-10
retain their existing authority; this section supplies missing Node/Bash
tooling decisions, rather than creating another test policy.

### Scope, levels, and coverage

Production tooling means `install-sdd.sh` and executable `scripts/` code.
Tests and fixtures are test code; dependencies and machine-generated runtime
files are excluded from production coverage. Local macOS and CI Linux use
Node.js 24, Bash, Git, and locked npm dependencies. Tests needing a missing
platform capability must report the unsupported boundary explicitly.

| Change | Required evidence | Scope/claim |
| --- | --- | --- |
| Documentation only | Full docs:all and semantic review | No runtime behavior claim |
| Test or harness | Full regression plus intentional failure proof for changed assertions | Test detects the failure it claims |
| Checker/configuration | Focused positive/negative fixtures and full regression | Changed input, validation, and error paths |
| Installer/runtime | Isolated subprocess/Git/filesystem scenarios and full regression | Install, resume, validation, cleanup, and upgrade paths affected |
| Security/state/compatibility | Boundary/fault tests plus owner review | Ownership, scope escape, stale pin, partial state, and incompatible transitions as applicable |

Unit tests cover pure parsing and local functions; contract tests cover schema
and documentation invariants; integration tests exercise real child processes,
temporary repositories, and filesystem effects. Fake remote repositories and
HTTP responses are permitted for deterministic failures; they do not prove
live authentication, network, or GitHub protection. The installer lifecycle
suite is tooling end-to-end evidence. Product-service smoke, billing, database,
and production-topology tests are inapplicable to this repository.

Every changed observable branch, required rejection, and recovery path must
map to a named assertion in the PR/plan evidence. Uncovered material paths
require a documented exception. This is behavioral coverage, not a claimed
line-coverage percentage. Numeric aggregate and line/branch coverage are
informational: no percentage threshold is imposed in this initial strategy.
The denominator for any future metric must name the changed-file/diff scope,
exclusions, runtime, and collection command; aggregate results cannot replace
changed-path evidence. Characterize existing behavior before refactoring it.

Use Red-Green-Refactor for executable changes: capture the expected initial
failure, fix the responsible behavior, then run the complete suite. Required
tests must be green before merge. Documentation-only changes do not need an
invented failing runtime test. Use boundary, malformed-input, state, fault, and
property/seeded-random tests when the changed risk warrants them; no blanket
fuzzing, mutation, load, or soak gate is imposed without a contract.

### Determinism and environments

Each integration test owns a uniquely created temporary directory and registers
teardown. Use temporary Git repositories and fake remotes; never alter the
developer checkout, real credentials, or shared runtime. Tests must run in any
order without shared writable fixtures. Control clocks/randomness or preserve
seeds and minimal reproducers. Do not rely on arbitrary sleeps or live data.
Cleanup errors fail the test and identify the owned path; do not broaden cleanup
targets. Sensitive production data and real tokens are prohibited.

Preflight verifies Node/Bash/Git versions and `npm ci --ignore-scripts`, cleanly
classifies the worktree, and scopes temporary ownership. It is not test evidence.
Local and CI results are named separately. No live network is required for
blocking tests; external links remain advisory under Section 4.

No measured performance budget currently exists. New capacity/latency claims
require an owner-approved workload, environment, metric, threshold, baseline,
and repeatable benchmark before such claims pass review. Parser and installer
resource risks still receive normal code and bounded-test review.

### Defects, flaky tests, and evidence

Apply Section 8 triage before changing failures. Create a durable issue for any
unresolved required behavior, repeated regression, cross-task ownership,
security impact, deferred correction, or release risk. Fixed executable defects
need the lowest-level stable reproducer plus affected integration evidence.

Reruns diagnose flakes; they do not erase a failed required gate. Preserve the
first failure, seed, logs, environment, and reproducer. Quarantine requires an
owner-approved issue with compensating evidence and an expiry within seven
days. Required behavior with no equivalent passing evidence blocks merge.
Restoration requires reproducer resolution and reviewed repeatable tests;
remove obsolete tests only through review, never to hide a defect.

Record command, exact source/candidate hash, dirty-state classification,
environment, start/end or duration, pass/fail/skip counts, changed-path coverage,
failure classification, and limitations in the delivery evidence record.
Keep concise evidence permanently in Git. Preserve historical full reviewer
receipts; new reviews under the adopted batch route use
[PR-primary retention](batch-review-and-recovery.md#pr-publication-and-retention)
with permanent identities, digests and disposition pointers. Non-PR reviews
retain exact local receipts. Retain bulky
sanitized logs for 30 days; unresolved failure evidence remains until resolution
and at least 30 days afterward. Summaries link logs or state that no separate
log artifact was retained. Do not claim unavailable logs are archived.

All existing Section 8 exception fields apply. Maintainers review this strategy
quarterly and after escaped defects, recurring flakes, platform changes, or
new tooling boundaries; include feedback latency and false confidence from
mocks in that review. Future automation gates require positive and negative
state/scope/mode fixtures; this batch does not grant implementation auto-merge.
