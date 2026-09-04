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

Every review gate opens one stable review session and assigns one or more
reviewers. Each reviewer is created without authoring context when first
assigned, then remains assigned for every revision round in that session. A
candidate change invalidates the prior revision disposition, requires a new
author self-review, and returns the exact revised candidate to the same assigned
reviewers. Human-requested changes use that same session before human
re-review. Do not replace reviewers merely to obtain a new opinion.

### 1.1 Session control record

Create one durable session record when the gate first enters review. For a PR,
the PR body or a linked review record owns it; for a non-PR artifact, use a
project-defined path such as `reviews/<artifact-id>/<session-id>.md`. Append
rounds and findings to that record instead of replacing it.

| Field | Value |
| --- | --- |
| Review session ID | `<stable ID>` |
| Subject and base | `<artifact/PR + exact base>` |
| State | `<OPEN/CHANGES_REQUESTED/APPROVED/BLOCKED/HUMAN_DECISION_REQUIRED/CLOSED>` |
| Assigned reviewers | `<stable reviewer IDs>` |
| Required approvals | `<all assigned reviewers>` |
| Approved reviewers | `<same reviewer IDs only after each approves Current candidate>` |
| Current candidate | `<exact revision>` |
| Current round | `<R01, R02, ...>` |
| Replacement history | `<reviewer + reason + handoff, or None>` |

One reviewer is the normal minimum. Assign two or more when project policy,
risk, or the human owner requires independent specialties or redundant review.
All assigned reviewers independently review the initial candidate and must
approve the same final candidate. If any reviewer requests changes, every prior
approval becomes stale when the candidate changes, and all assigned reviewers
review the revised exact candidate.

Freeze the roster when the session opens. Project policy or the human owner may
add a required specialist; initialize that reviewer without author context and
require them to review the complete current candidate and session history. Do
not remove or replace a reviewer to bypass a finding. Removal is allowed only
for recorded unavailability or authority change and follows the replacement
handoff in Section 3.

## 2. Review packet

The coordinating agent freezes this packet before every round. For the first
round, freeze it before initializing the assigned reviewer(s):

| Field | Value |
| --- | --- |
| Review session ID | `<stable ID for the whole review gate>` |
| Review round | `<R01, R02, ...>` |
| Assigned reviewers | `<stable reviewer IDs>` |
| Required approvals | `<count; all assigned reviewers by default>` |
| Approved reviewers | `<aggregate session record; Not recorded in an individual packet>` |
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

At session creation, the coordinating agent uses the runtime's isolated-agent
mechanism with conversation inheritance disabled for every assigned reviewer.
Give each reviewer only:

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

For later rounds, resume the same assigned reviewer rather than creating a new
one. Provide the new exact candidate, its author self-review, the changed diff,
and the immutable session findings/responses. The reviewer may use its own
prior review context to verify that requested changes were actually resolved.
If an assigned reviewer becomes unavailable, record `REVIEWER_REPLACED`, the
reason, and a handoff to a newly isolated reviewer. The replacement reads the
complete candidate and immutable session history; it is not a shortcut around
an unresolved finding.

## 4. Independent review procedure

1. Verify the session, round, subject, base, and candidate revision match the
   packet.
2. Read the governing inputs and independently derive the expected behavior,
   constraints, scope, and required evidence.
3. Inspect the complete candidate and relevant unchanged surroundings before
   reading the author's self-review conclusion.
4. Reconcile the candidate with tests/checks, author annotations, and the
   self-review record. Treat missing, stale, or contradictory evidence as a
   finding.
5. On a later round, re-evaluate every open, partially accepted, or rejected
   finding against the author's response and revised exact candidate before
   searching for regressions or new findings.
6. Record every actionable problem in the durable findings format below. Add
   inline comments only where a specific line or hunk needs correction; put
   cross-cutting findings in the summary.
7. Return exactly one disposition: `APPROVED`, `CHANGES_REQUESTED`, or
   `BLOCKED`.

`APPROVED` means the independent review gate passed under project policy. It
does not by itself authorize a merge. `CHANGES_REQUESTED` identifies
actionable defects or gaps. `BLOCKED` means the review could not reach a valid
decision because identity, provenance, scope, evidence, access, or isolation
could not be verified.

## 5. Durable findings and resolution history

For a PR, publish line-specific findings as inline comments and link them from
the receipt. For a non-PR artifact, return the exact receipt to the original
agent, which appends it without semantic rewriting to the stable session record
defined in Section 1.1. A review record is evidence and does not create another
review gate.

Never overwrite a request for changes. The author/coordinator evaluates every
finding and records exactly one response: `ACCEPT`, `PARTIALLY_ACCEPT`,
`REJECT_WITH_JUSTIFICATION`, or `DEFER_WITH_AUTHORITY`. Append the response,
evidence, and the same assigned reviewer's next-round disposition so a later
audit can reconstruct what was wrong, why it mattered, and how it was resolved.
The author must reject an incorrect comment rather than modifying the product
to satisfy it. A reviewer either accepts that justification, keeps the finding
open with contrary contract evidence, or records a conflict for human decision.

| Finding ID | Location | Governing statement | Expected | Observed | Impact/severity | Requested correction | Author response and revision | Reviewer disposition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `<S1-F01>` | `<file/section/line/hunk>` | `<requirement/contract/plan/policy ID>` | `<required result>` | `<actual result>` | `<blocking/non-blocking and consequence>` | `<required outcome, without unnecessary implementation prescription>` | `<ACCEPT/PARTIALLY_ACCEPT/REJECT_WITH_JUSTIFICATION/DEFER_WITH_AUTHORITY + evidence + exact revision>` | `<OPEN/RESOLVED/JUSTIFICATION_ACCEPTED/HUMAN_DECISION_REQUIRED>` |

The original agent must answer each finding with a fix, an evidence-backed
justification, or an accepted follow-up allowed by project policy. It must not
silently dismiss, resolve, summarize away, or edit the reviewer's original
finding.

## 6. Review receipt

| Field | Value |
| --- | --- |
| Review session ID | `<packet session ID>` |
| Review round | `<packet round>` |
| Assigned reviewer ID | `<stable reviewer ID>` |
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

- review session, round, assigned reviewer, subject, base, and candidate
  revision match the frozen packet;
- the reviewer attested `FRESH_CONTEXT` and stayed read-only;
- published comments and the receipt agree;
- no commit or artifact change occurred after review; and
- the live workflow mode, repository gates, blockers, and write scope still
  permit the next action.

On `CHANGES_REQUESTED`, the original agent evaluates every finding and records
its accepted fix, partial acceptance, evidence-backed rejection, or authorized
deferral. Any candidate change invalidates the prior revision disposition,
requires another exact-head self-review, and returns to every assigned reviewer
in the same session. The session passes only when all required reviewers approve
the same exact candidate. An unresolved author-reviewer conflict requires human
decision. On `BLOCKED`, restore reviewability before retrying. On `APPROVED`,
design and manual implementation stop for human review. Only a
scoped implementation `AGENT_AUTO_MERGE` flow may proceed without pre-merge
human review, and only after every live merge gate passes. The receipt supplies
review evidence, not merge authority.
