# Fresh-Context Agent Review — `<artifact or pull request>`

Use this protocol at every review gate. The authoring agent coordinates the
fresh-context review but does not pass its conversation, hidden reasoning,
conclusions, or proposed disposition to
the reviewer. The reviewer receives only the bounded packet below and reads
the durable project evidence directly.

Fresh context reduces anchoring; it does not create a different human or
GitHub identity. Until a project installs separate review credentials, record
the result in the delivery ledger and, when useful, as a PR comment. Do not
claim that it satisfies a repository rule requiring a formal approval from a
different GitHub actor.

## 1. Phase and continuation policy

Every review-gated candidate follows this shared prefix:

```text
author work -> exact-revision self-review -> fresh-context review
```

What follows depends on phase and the live implementation mode:

| Phase/mode | After fresh-context `APPROVED` |
| --- | --- |
| Design, governance, adoption, upgrade, validation, or archive | Stop for human review; only human approval continues |
| Implementation with `HUMAN_REVIEW_BEFORE_MERGE` | Stop for human review and merge authority |
| Implementation with scoped `AGENT_AUTO_MERGE` | Recheck the exact candidate, live mode, scope, checks, repository protections, comments, and blockers; merge and continue only when all pass |

`AUTO_CONTINUE` and `REVIEW_ON_EXCEPTION` apply only to pre-authorized,
deterministic actions that are not review gates. They cannot publish or approve
semantic content. Reaching a review-gated artifact ends that automatic segment
and starts the shared review prefix above.

Every review round uses a newly created fresh-context reviewer. Human-requested
changes also return to author work and require a new self-review and fresh
review before human re-review.

## 2. Review packet

The coordinating agent freezes this packet before creating the reviewer:

| Field | Value |
| --- | --- |
| Review ID | `<stable ID>` |
| Subject | `<artifact path or PR URL>` |
| Project root | `<absolute runtime path>` |
| Candidate revision | `<exact commit, content hash, or immutable version>` |
| Base revision | `<exact comparison base or Not applicable>` |
| Governing inputs | `<approved requirement/contract/plan/policy links and versions>` |
| Allowed change scope | `<paths and semantic boundary>` |
| Non-scope | `<explicit exclusions>` |
| Required gates and evidence | `<commands/check runs/artifacts>` |
| Author annotations | `<PR links or artifact map>` |
| Author self-review | `<record/link and exact revision>` |
| Review publication channel | `<delivery ledger / PR comment / formal PR review if separately authorized>` |

The packet identifies evidence without arguing for approval. Do not include the
authoring conversation, private chain of thought, a recommended result, or a
summary that hides the governing documents or complete diff.

## 3. Fresh-context creation contract

The coordinating agent uses the runtime's isolated-agent mechanism with
conversation inheritance disabled. Give the reviewer only:

1. this protocol;
2. the frozen review packet;
3. permission to read the named repository, PR, contracts, and evidence; and
4. permission to publish review findings through the recorded channel.

The reviewer must not edit files, push commits, resolve its own comments,
merge or close the PR, alter workflow state, or perform implementation work.
If the runtime cannot prove that authoring context was excluded, record
`ISOLATION_UNVERIFIED` and return `BLOCKED` unless project policy explicitly
allows a different review method.

The coordinating agent remains responsible for waiting for the receipt and
resuming the original delivery. The reviewer does not need to recover or
trigger the original conversation.

## 4. Independent review procedure

1. Verify the subject, base, and candidate revision still match the packet.
2. Read the governing inputs and independently derive the expected behavior,
   constraints, scope, and required evidence.
3. Inspect the complete candidate and relevant unchanged surroundings before
   reading the author's self-review conclusion.
4. Reconcile the candidate with tests/checks, author annotations, and the
   self-review record. Treat missing, stale, or contradictory evidence as a
   finding.
5. Record every actionable problem in the durable findings format below. Add
   inline comments only where a specific line or hunk needs correction; put
   cross-cutting findings in the summary.
6. Return exactly one disposition: `APPROVED`, `CHANGES_REQUESTED`, or
   `BLOCKED`.

`APPROVED` means the independent review gate passed under project policy. It
does not by itself authorize a merge. `CHANGES_REQUESTED` identifies
actionable defects or gaps. `BLOCKED` means the review could not reach a valid
decision because identity, provenance, scope, evidence, access, or isolation
could not be verified.

## 5. Durable findings and resolution history

For a PR, publish line-specific findings as inline comments and link them from
the receipt. For a non-PR artifact, return the exact receipt to the original
agent, which stores it without semantic rewriting at a project-defined path
such as `reviews/<artifact-id>/round-<NN>.md`. A review record is evidence and
does not create another review gate.

Never overwrite a request for changes. Append the author's response and the
next reviewer's disposition so a later audit can reconstruct what was wrong,
why it mattered, and how it was resolved.

| Finding ID | Location | Governing statement | Expected | Observed | Impact/severity | Requested correction | Author response and revision | Reviewer disposition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `<R1-F01>` | `<file/section/line/hunk>` | `<requirement/contract/plan/policy ID>` | `<required result>` | `<actual result>` | `<blocking/non-blocking and consequence>` | `<required outcome, without unnecessary implementation prescription>` | `<fix/evidence/justification + exact revision or Pending>` | `<OPEN/RESOLVED/REJECTED_JUSTIFICATION>` |

The original agent must answer each finding with a fix, an evidence-backed
justification, or an accepted follow-up allowed by project policy. It must not
silently dismiss, resolve, summarize away, or edit the reviewer's original
finding.

## 6. Review receipt

| Field | Value |
| --- | --- |
| Review ID | `<packet Review ID>` |
| Reviewer agent/runtime | `<identity and runtime>` |
| Context isolation | `<FRESH_CONTEXT / ISOLATION_UNVERIFIED>` |
| Subject | `<artifact path or PR URL>` |
| Reviewed candidate revision | `<exact value>` |
| Reviewed base revision | `<exact value or Not applicable>` |
| Governing inputs inspected | `<links and versions>` |
| Gates/evidence inspected | `<links/results>` |
| Summary comment | `<link or embedded text>` |
| Inline comments | `<links or None>` |
| Durable findings | `<finding table/link or None>` |
| Disposition | `<APPROVED / CHANGES_REQUESTED / BLOCKED>` |
| Recommended next action | `<HUMAN_REVIEW / MERGE_GATE / AUTHOR_ADDRESS_FINDINGS / RESTORE_REVIEWABILITY>` |
| Reviewed at | `<timestamp/timezone>` |

## 7. Coordinator resume gate

Before using the receipt, the original agent verifies:

- review ID, subject, base, and candidate revision match the frozen packet;
- the reviewer attested `FRESH_CONTEXT` and stayed read-only;
- published comments and the receipt agree;
- no commit or artifact change occurred after review; and
- the live workflow mode, repository gates, blockers, and write scope still
  permit the next action.

On `CHANGES_REQUESTED`, the original agent addresses or justifies each finding.
Any candidate change invalidates the receipt and requires a newly created
fresh-context reviewer. On `BLOCKED`, restore reviewability before retrying. On
`APPROVED`, design and manual implementation stop for human review. Only a
scoped implementation `AGENT_AUTO_MERGE` flow may proceed without pre-merge
human review, and only after every live merge gate passes. The receipt supplies
review evidence, not merge authority.
