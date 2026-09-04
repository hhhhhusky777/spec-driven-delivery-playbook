# Fresh-Context Agent Review — `<artifact or pull request>`

Use this protocol when an independent-agent review gate is assigned to a fresh
reviewer context. The authoring agent coordinates the review but does not pass
its conversation, hidden reasoning, conclusions, or proposed disposition to
the reviewer. The reviewer receives only the bounded packet below and reads
the durable project evidence directly.

Fresh context reduces anchoring; it does not create a different human or
GitHub identity. Until a project installs separate review credentials, record
the result in the delivery ledger and, when useful, as a PR comment. Do not
claim that it satisfies a repository rule requiring a formal approval from a
different GitHub actor.

## 1. Review packet

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

## 2. Fresh-context creation contract

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

## 3. Independent review procedure

1. Verify the subject, base, and candidate revision still match the packet.
2. Read the governing inputs and independently derive the expected behavior,
   constraints, scope, and required evidence.
3. Inspect the complete candidate and relevant unchanged surroundings before
   reading the author's self-review conclusion.
4. Reconcile the candidate with tests/checks, author annotations, and the
   self-review record. Treat missing, stale, or contradictory evidence as a
   finding.
5. Add inline comments only where a specific line or hunk needs an actionable
   correction. Put cross-cutting findings and the decision in the summary.
6. Return exactly one disposition: `APPROVED`, `CHANGES_REQUESTED`, or
   `BLOCKED`.

`APPROVED` means the independent review gate passed under project policy. It
does not by itself authorize a merge. `CHANGES_REQUESTED` identifies
actionable defects or gaps. `BLOCKED` means the review could not reach a valid
decision because identity, provenance, scope, evidence, access, or isolation
could not be verified.

## 4. Review receipt

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
| Findings | `<IDs, severity, and summary or None>` |
| Disposition | `<APPROVED / CHANGES_REQUESTED / BLOCKED>` |
| Recommended next action | `<MERGE_GATE / AUTHOR_ADDRESS_FINDINGS / RESTORE_REVIEWABILITY>` |
| Reviewed at | `<timestamp/timezone>` |

## 5. Coordinator resume gate

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
`APPROVED`, proceed only through the existing approval, continuation, and merge
rules; the receipt supplies review evidence, not merge authority.
