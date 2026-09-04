# Pull request

## Outcome and scope

- Problem and expected improvement:
- Affected canonical documents/templates:
- Out of scope:

## Reviewer attention map

- Gate: Required / Not applicable — single-focus reason
- Changed decisions/obligations and canonical sections:
- Blockers, questions, risks, and exceptions:
- Required reviewers or specialties:
- Recommended reading order and evidence:

## Contract-to-change map and author annotations

| Material change / PR annotation | Governing statement | Why / expected effect | Evidence | Risk / non-scope |
| --- | --- | --- | --- | --- |
| | | | | |

- [ ] Material or non-obvious hunks have concise author annotations.
- [ ] Routine mechanics were not annotated merely to increase comment count.
- [ ] Every annotation still matches the exact current PR head.

## Documentation review

- [ ] Statements were checked against their governing contracts or primary sources.
- [ ] Wording is clear, concise, project-oriented where applicable, and has one reasonable meaning.
- [ ] Cross-document terminology, authority, workflow state, links, and examples are consistent.
- [ ] Normative rules have one canonical owner; summaries link to it instead of duplicating it.
- [ ] Generated/instantiated content contains no template instructions, invented
      facts, or unexecuted evidence claims.
- [ ] Source freshness and compatibility impact were assessed; relevant review
      dates or event triggers were updated.
- [ ] Important rules use a heading, concise bold label, or supported callout rather than repetition.
- [ ] When required, the attention map was reconciled against an independent
      inventory of the complete diff; every material item has a disposition.

## Validation

- [ ] Applicable implementation tasks had an approved, current pre-start
      context receipt before `IN_PROGRESS`, or the recorded policy exception
      was reviewed.
- [ ] `npm ci --ignore-scripts`
- [ ] `npm run docs:all`
- [ ] `npm run docs:links:external` reviewed as advisory evidence.
- [ ] Failures were justified and classified before content, configuration, or tests changed.

## Agent self-review

- Exact reviewed PR head:
- Governing inputs and versions:
- Self-review record or embedded findings:
- Result: `SELF_REVIEW_PASSED / SELF_REVIEW_FAILED`

- [ ] The complete diff and surrounding behavior were reviewed against approved
      requirements, contracts, scope, non-scope, tests, risks, and policies.
- [ ] Every material change is represented in the review map.
- [ ] No blocking finding, unexplained change, or missing required gate remains.
- [ ] This result is presented as pre-review evidence, not approval or merge authority.

## Fresh-context and human review

- Exact reviewed PR head:
- Fresh-context packet and receipt:
- Fresh-context result: `NOT_STARTED / APPROVED / CHANGES_REQUESTED / BLOCKED`
- Human review: `NOT_STARTED / APPROVED / CHANGES_REQUESTED / NOT_APPLICABLE_FOR_SCOPED_AGENT_AUTO_MERGE`
- Publication channel and identity boundary:
- Durable findings and resolutions: `links / None`

- [ ] A newly created fresh-context reviewer received no authoring
      conversation, stayed read-only, and returned an exact-revision receipt.
- [ ] A same-actor comment is not represented as a formal approval from a
      different GitHub identity.
- [ ] Any commit after independent review invalidates that result and triggers
      a new review.
- [ ] Human review follows fresh approval unless this is a live, scoped
      implementation `AGENT_AUTO_MERGE` PR.

## Implementation continuation

- Phase: `DESIGN / IMPLEMENTATION`
- Live workflow and revision:
- Current mode: `NOT_SELECTED / HUMAN_REVIEW_BEFORE_MERGE / AGENT_AUTO_MERGE`
- User authority, selection time, and task/PR scope:
- Mode rechecked before this PR/merge: `YES / NOT_APPLICABLE`
- Post-merge human review destination: `ledger link / NOT_APPLICABLE`

- [ ] `AGENT_AUTO_MERGE`, if selected, applies only to implementation and does
      not bypass repository protections or required checks.
- [ ] Missing/invalid mode data, conflicts, inconsistencies, failed gates,
      unresolved comments, drift, or scope expansion stop automatic merge.
- [ ] An automatically merged PR will be recorded `PENDING` for post-merge
      human review and cannot be omitted from delivery closure.

## Risk and adoption

- Worst case if incorrect:
- Existing instantiated-document impact:
- Rollback or correction:

Closes #
