# A04 contributor entry-point review

## Frozen R01 packet

| Field | Value |
| --- | --- |
| Session / round | `ADOPTION-A04-S01` / `R01` |
| State | `OPEN` |
| Assigned reviewers | `R1 adoption_a04_r1`; `R2 adoption_a04_r2` |
| Required / approved | 2 / None |
| Replacement history | None |
| Joint candidate | `ADOPTION-A04-R01`: Contributing and manifest |
| Contributing blob | `1e1fc2f21126296326fdbece48830b13294dd5aa` |
| Manifest blob | `d5dfc60d2d6e85cb2045e46805427e360bdf2c05` |
| Base | `d213114f99dc2186d6f4e50a85fe962de0e1afa9`; previous approved manifest `d3b206fc76ca8b4ab1df36a10015ee0d515f5229` |
| Authority | A02 routing 0; A03 human approval in A03 ledger |
| Scope | Contributing start/resume navigation and manifest bookkeeping; append-only review publication |
| Governing inputs | Pinned adoption runbook, manifest and trigger templates, canonical review protocol; active README, Contributing, quality policy, Template Governance, generated guide |
| Self-review | `SELF_REVIEW_PASSED`; exact two-file scope reviewed in A04 manifest section |
| Evidence | Markdown 0; structure with runtime exclusion OK; lifecycle OK; Mermaid OK; 57/57 tests; tracked whitespace clean; exact-file no-index checks have no diagnostics, exit 1 for differing content |
| Known limitations | G-01 and validator mismatch remain classified; no installation-complete claim |
| Publication | Exact returned receipts appended here outside joint candidate |

Read the full candidate and governing inputs before the author self-review.
Current A04 handoff follows the explicitly historical A03 snapshot. Runtime
locator is supplied through the verified guide, not committed here. No missing
policy values or merge authority are selected by this action.

## R01 receipt — R1

| Field | Value |
| --- | --- |
| Review session ID | `ADOPTION-A04-S01` |
| Review round | `R01` |
| Reviewer seat | `R1` |
| Assigned reviewer ID | `adoption_a04_r1` |
| Reviewer agent/runtime | Codex isolated review subagent |
| Context isolation | `FRESH_CONTEXT`; received bounded review assignment without authoring conversation; remained read-only |
| Subject | `CONTRIBUTING.md` and `.github/spec-driven-delivery/project-adoption-manifest.md` jointly |
| Reviewed candidate revision | `ADOPTION-A04-R01`; Contributing blob `1e1fc2f21126296326fdbece48830b13294dd5aa`; manifest blob `d5dfc60d2d6e85cb2045e46805427e360bdf2c05` |
| Reviewed base revision | `d213114f99dc2186d6f4e50a85fe962de0e1afa9`; previously approved manifest `d3b206fc76ca8b4ab1df36a10015ee0d515f5229` |
| Governing inputs inspected | Canonical fresh-context protocol; pinned adoption runbook and manifest/trigger templates; active README, Contributing, Documentation Quality Policy, Template Governance, generated runtime guide; A02 routing and A03 approval evidence |
| Gates/evidence inspected | Candidate hashes verified before and after review; target and runtime HEAD match pinned base. Independently reran Markdown (44 files, 0 issues), structure with narrow runtime exclusion, lifecycle, Mermaid, tracked whitespace, and exact-manifest whitespace checks: no diagnostics. Inspected packet’s recorded 57/57 test result; did not independently rerun Node tests. |
| Summary comment | Contributor navigation implements approved routing 0, links canonical live state and existing procedures, and preserves the reviewed manifest/empty-whiteboard boundary. A03 completion and README freshness agree with recorded human approval. Historical A03 text is explicitly distinguished from the current A04 handoff. Scope, authority preservation, freshness, review state, and evidence are approved for this candidate; unresolved installation decisions remain open. |
| Inline comments | None |
| Durable findings | None |
| Disposition | `APPROVED` |
| Recommended next action | `HUMAN_REVIEW` after both assigned seats approve this identical joint candidate |
| Reviewed at | `2026-09-05 11:20:51 Asia/Shanghai (UTC+08:00)` |

## R01 receipt — R2

| Field | Value |
| --- | --- |
| Review session ID | `ADOPTION-A04-S01` |
| Review round | `R01` |
| Reviewer seat | `R2` |
| Assigned reviewer ID | `adoption_a04_r2` |
| Reviewer agent/runtime | Codex isolated review agent `/root/adoption_a04_r2`; read-only throughout |
| Context isolation | `FRESH_CONTEXT` |
| Subject | `CONTRIBUTING.md` and `.github/spec-driven-delivery/project-adoption-manifest.md` jointly |
| Reviewed candidate revision | `ADOPTION-A04-R01`; Contributing blob `1e1fc2f21126296326fdbece48830b13294dd5aa`; manifest blob `d5dfc60d2d6e85cb2045e46805427e360bdf2c05` |
| Reviewed base revision | `d213114f99dc2186d6f4e50a85fe962de0e1afa9`; previous approved manifest blob `d3b206fc76ca8b4ab1df36a10015ee0d515f5229` |
| Governing inputs inspected | Canonical fresh-context review protocol; adoption runbook Step 4 and Section 7; manifest and trigger templates; active README, Contributing, Documentation Quality Policy, Template Governance, generated guide; approved routing and A03 human decision |
| Gates/evidence inspected | Independently verified candidate hashes before and after review and inspected complete manifest delta against the approved predecessor. Markdown: 44 files, 0 issues. Structure with `.sdd-runtime` excluded, lifecycle, and Mermaid: passed. Tracked and exact-file manifest whitespace checks produced no diagnostics. Inspected recorded 57/57 test result; did not independently rerun tests. Target and runtime pins match. Approved README blob remains `289724a68148a68d3ac15ba9dfd77e3e305058a9`. |
| Summary comment | Contributor navigation follows approved routing 0 and preserves canonical authorities and first-need review boundaries. A03 completion, README freshness, A04 scope, and current handoff agree; historical evidence remains explicitly historical. Attention-map material items are approved within this bounded action; unresolved policy decisions and installation gaps remain open. No actionable finding identified. |
| Inline comments | None |
| Durable findings | None |
| Disposition | `APPROVED` |
| Recommended next action | `HUMAN_REVIEW` after both assigned seats approve this identical joint candidate |
| Reviewed at | `2026-09-05 11:21 Asia/Shanghai (UTC+08:00)` |

## Coordinator resume gate

Both assigned seats approved identical R01 joint candidate hashes. Initial
isolation and read-only scope were attested; no findings exist. Exact receipts
are preserved outside the candidate. Current session state is
`HUMAN_DECISION_REQUIRED`; A04 human approval is pending. Adoption remains
MAPPED. README is CURRENT; the new contributor section awaits approval.
No new stale dependent was identified and no empty whiteboard exists.

## Human A04 decision and batch authority

On 2026-09-05 the repository owner accepted all nine consolidated
recommendations and directed the agent to continue. This approves A04 R01's
joint candidate above and closes this session. It also authorizes bounded
preparation of the remaining adoption package, with two independent reviewers
and one final human acceptance instead of per-artifact human stops.

Policy directions: canonical transferred origin; main integration branch,
codex-prefixed branches, squash merges, owner human authority; default human
review before merge with explicitly scoped implementation auto-merge only;
one active task per agent; local artifacts under this adoption root; isolated
tooling tests and retained evidence; owner-controlled releases/emergencies;
no additional external obligations reported. Precise testing thresholds and
retention are proposals for the final package. Hosted settings are inspected
and mismatches reported; no blanket authority to change protections is implied.

Batch preparation is not final approval. Dependent drafts may reference exact
provisional inputs inside this batch; activation and first-need intake await
final acceptance. New material owner decisions or expanded external authority
still require direction. This owner instruction overrides the installed
skill's intermediate human stops only for this installation batch; upstream
issue #37 separately tracks reusable batching behavior.
