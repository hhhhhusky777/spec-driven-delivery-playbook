# Documentation Quality and Testing Policy

This policy owns the repository's documentation outcomes. It applies to
Markdown, templates, examples, documentation tooling, and CI. Changes take
effect only after reviewed merge.

## Authority

Legal, security, and upstream contracts take precedence. This policy owns
documentation quality; [Template Governance](template-governance.md) owns
reusable-template design; [Contributing](../CONTRIBUTING.md) owns repository
delivery. Project authorities and owner decisions must be mutually consistent.
Do not guess between conflicting canonical sources.

## Six goals and agent judgment

| Goal | Required outcome |
| --- | --- |
| Clear boundaries | Scope, authority, protected invariants, and evidence are explicit |
| Stable outcomes | The agreed result is demonstrated regardless of execution method |
| Key information only | Retain what decisions, verification, recovery, and maintenance require |
| Proportional effort | Preparation, review, and records match complexity, risk, and value |
| Agent discretion | The agent chooses methods and safe recovery within the boundaries |
| Necessary complexity only | Every artifact, abstraction, dependency, and control earns its maintenance cost by protecting a required outcome |

These are outcome constraints, not a prescribed path. A specific method is
mandatory only when another valid method would threaten a named protected
property. Reuse applicable authority instead of asking for it again; never
broaden it or treat it as acceptance of unseen results.

Complexity is justified by an accepted requirement, a named invariant, or
evidence of a real recurring need. Prefer the smallest maintainable solution
that satisfies those obligations. Hypothetical flexibility, speculative
frameworks, duplicate records, and automation that costs more than the risk it
controls are not required completeness.

The [error-handling framework](error-handling.md) owns diagnosis, recovery, and
escalation. Other documents link to it and state only local consequences.

## Required quality outcomes

| Outcome | Evidence expected |
| --- | --- |
| Correctness | Claims agree with canonical project sources, implementation, or cited primary sources |
| Clarity | A reasonable reader can identify the outcome, owner, state, and required decision |
| Consistency | Authorities, terms, states, links, diagrams, examples, and README agree |
| Canonical ownership | Every normative rule has one owner; other documents link instead of restating it |
| Honest evidence | Proposals, assumptions, observations, checks, and approvals are not confused |
| Currentness | Version-sensitive claims and affected dependents are reviewed together |
| Safe content | No credentials, private project data, or unintended local paths are committed |

Git and pull requests preserve prior versions and detailed delivery evidence.
The maintained tree keeps current reusable guidance and active feature state,
not duplicate history or successful-tool transcripts.

## Risk-focused test design

Tests provide evidence about accepted outcomes and protected invariants; they
do not guarantee absolute quality. Keep the smallest essential proof of each
critical happy path, then put additional effort where failures are most likely
to be costly, hidden, or difficult to reproduce.

| Material risk | Suitable evidence when applicable |
| --- | --- |
| Boundaries and unexpected input | Empty, minimum, maximum, malformed, duplicate, partial, and incompatible cases |
| Failure and recovery | Errors, retries, cancellation, rollback, restart, partial completion, and safe degradation |
| Concurrency and timing | Interleavings, races, idempotency, deadlocks, timeouts, ordering, delayed work, and clock-sensitive behavior |
| Interfaces and evolution | Contract, integration, compatibility, migration, and consumer/provider evidence |
| Critical business journeys | End-to-end smoke tests that prove the smallest valuable real journey |
| Production behavior | System, concurrent-load, stress, or soak tests with a representative workload when scale or contention is a material risk |
| Difficult test oracles | Property, model/state, metamorphic, mutation, simulation, or formal checks when examples alone cannot protect the invariant |

Choose the portfolio from the change's risks and project authority; do not
impose universal test levels, quotas, load, or duration. Assertions should
prefer observable outcomes and invariants over implementation details. Broad
and concurrent tests are useful discovery tools. When they expose a defect,
preserve the reproducing seed, schedule, workload, environment, or other
evidence and add the smallest deterministic regression at the lowest useful
layer when practical. Never hide a nondeterministic failure merely because it
cannot immediately be reduced.

Describe production-like evidence honestly: identify the business journey,
environment, workload shape, concurrency, duration, data volume, injected
failures, observed result, and material limitations that apply. A lighter
simulation can still be useful, but it must not be represented as production
proof.

Apply the repository's
[merge-ready state boundary](../CONTRIBUTING.md#branches-review-and-merge).
For documentation currentness, reviewers treat a predictable post-merge
status-only correction as a defect rather than routine cleanup.

## Review and human brief

Every material candidate receives exact-candidate self-review, review by two
isolated agents, and required human semantic acceptance. The pull request owns
findings, revisions, checks, acceptance, and merge evidence. Agents may correct
non-semantic mistakes and rerun checks within authority; a changed candidate
returns to the same reviewer seats.

Use fast affected validation to reach review early without representing it as
complete proof. After both retained reviewers report no findings on the same
candidate, run the full applicable validation on that exact head before human
acceptance. A candidate-changing correction invalidates the prior agent review
and final validation, so repeat affected fast checks, both retained reviews,
and full validation. If the candidate did not change, a transient validation
failure repeats only the affected validation. Project policy may require a
more conservative sequence; this efficiency rule never waives a required
check or exact-head evidence.

At each human gate, present a concise table because the human is not expected
to reread every document:

| Human need | Required content | Handling |
| --- | --- | --- |
| Acceptance scope | Outcome, scope/non-scope, exact candidate, and authorized action | Appropriate class |
| Decisions | Important choices, consequences, unsettled alternatives, and recommendation | Appropriate class |
| Attention | Risks, compatibility effects, assumptions, exceptions, deferred obligations, and owners | Appropriate class |
| Evidence | Passed checks with scope, failed or unrun checks, uncertainty, and residual limits | Appropriate class |
| Response | Exact decision requested, or explicit confirmation that none remains | `HUMAN_DECISION` or `NONE` |

Use `HUMAN_DECISION` when progress needs human judgment under an existing stop
boundary, `AGENT_ACTION` for correction within agent authority, `DISCLOSE` for
material awareness-only information (including accepted limitations) that
remains visible without stopping, and `NONE` when no material attention or
action remains. These semantic labels guide agents even in raw Markdown;
they do not create another gate or formatting requirement. Split items that
need different handling instead of hiding them in one mixed row.
Classify evidence by its actual consequence: a correctable failed check is
`AGENT_ACTION`, while a waiver, changed acceptance, or missing authority is
`HUMAN_DECISION`.

Phase-specific additions:

| Gate | Additional summary |
| --- | --- |
| Adoption | Discovered authorities and contracts, reused or changed policies, gaps, pin/runtime state, and activation boundary |
| Planning | Whiteboard design points mapped to task outcomes, dependencies, validation, PR boundaries, and gaps |
| Implementation PR | Delivered behavior, deviations, compatibility/operational effects, validation, and merge target |
| Validation and cleanup | Planned versus actual outcomes, unresolved work, cleanup ownership, and target proof |
| Upgrade | Old/new pins, reusable-document impact, migration, rollback, validation, and cutover authority |

When a pull request is waiting at its human review boundary, the brief also
shows the size and shape of the exact candidate against its actual PR target:

| Change category | Files | Additions | Deletions | Changed lines |
| --- | ---: | ---: | ---: | ---: |
| Product code | Count | Count | Count | Sum |
| Documentation | Count | Count | Count | Sum |
| Tests | Count | Count | Count | Sum |
| Other | Count | Count | Count | Sum |

Classify every changed file once by its primary responsibility rather than by
filename alone. Product code is shipped or runtime behavior; documentation is
reader-facing or maintainer guidance; tests are test code, fixtures, and
test-only assets; other covers remaining configuration, automation, metadata,
and assets. `Changed lines` is additions plus deletions. Identify binary or
otherwise non-line-countable files in the attention table instead of inventing
numbers. These counts help humans judge review shape; they are not a risk score
or an additional gate.

The brief supports human judgment but does not replace complete agent review or
canonical sources. It must be reconciled after candidate changes.

## Automated repository gates

The source repository runs `npm run docs:all`. It checks Markdown, internal
links and headings, Mermaid syntax, fences, placeholders, likely secrets,
private paths, the three-document model, and focused installer/lifecycle
behavior. New blocking behavior needs a regression that proves it fails.
Diagnostics identify the affected file and actionable reason; CI never rewrites
content.

These checks protect the playbook source. Adopting projects use their own
repository checks and installer runtime validation; upgrade does not install or
run this repository's test suite in those projects.

External links are advisory because remote availability is outside repository
control. A changed claim still needs a stable primary source when practical.

Validation matches the change. Documentation changes receive the complete
documentation suite and semantic review; checker, installer, state, security,
and compatibility changes also receive focused positive, negative, boundary,
and recovery evidence for the behavior they alter. Tests use isolated,
deterministic inputs and preserve the first meaningful failure. A rerun may
diagnose an intermittent result, but it does not erase failed required
evidence. Unmeasured coverage, performance, time, or cost remains unknown, not
zero.

## Tooling boundaries

- Node.js 24 and exact locked npm dependencies are the source-tooling runtime.
- GitHub Actions use immutable commit SHAs, read-only permissions, and no
  persisted credentials.
- New dependencies or third-party actions require necessity, maintenance,
  license, provenance, pinning, and replacement assessment.
- Secret scanning is defense in depth; exposed credentials must be revoked or
  rotated even after removal from Git.

## Review checklist

- [ ] The six goals are satisfied without unnecessary instructions or records.
- [ ] Changed claims, authorities, terminology, links, diagrams, examples, and
      README are mutually consistent.
- [ ] Normative content has one canonical owner and no competing restatement.
- [ ] The human brief exposes every material decision, risk, limit, and unrun
      gate for the current phase.
- [ ] Compatibility, migration, and historical impact are explicit.
- [ ] Applicable semantic review and `npm run docs:all` pass.

## References

- [Google developer documentation style guide](https://developers.google.com/style)
- [Microsoft guidance for concise writing](https://learn.microsoft.com/en-us/style-guide/word-choice/use-simple-words-concise-sentences)
- [Google engineering review guidance](https://google.github.io/eng-practices/review/reviewer/)
- [GitHub Actions secure-use reference](https://docs.github.com/en/actions/reference/security/secure-use)
- [Mermaid syntax validation API](https://mermaid.js.org/config/usage.html#syntax-validation-without-rendering)
