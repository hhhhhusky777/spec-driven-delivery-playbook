# Installation batch — ADOPTION-B01

Status: PROPOSED, preparation authorized; final owner acceptance pending.
The [manifest](project-adoption-manifest.md) remains MAPPED. This document is
the review index and evidence packet, not a replacement project policy.

## Attention and decisions

| ID | Scope and proposed outcome | Owner/review | Evidence |
| --- | --- | --- | --- |
| B-01 | Extend Contributing for development, branches, modes, releases | Owner; development/PR reviewer | [Contributing](../../CONTRIBUTING.md#project-delivery-policy) |
| B-02 | Explicit executable-tooling tests and retention | Owner; test reviewer | [Quality supplement](../../docs/documentation-quality-policy.md#11-project-tooling-test-strategy) |
| B-03 | Narrow runtime exclusion in canonical docs gate | Tooling reviewer | package.json, lint config, negative/positive exclusion regression |
| B-04 | Registry, trigger, agent entry, paths, archive and empty whiteboard | Two reviewers and owner | [Registry](project-contracts.md), [trigger](agent-trigger.md), [whiteboard](solution-whiteboard.md) |
| B-05 | Manual merge controls while main has no hosted protection | Owner residual-risk decision | Hosted inspection below; no bypass or automatic settings mutation |
| B-06 | Proposed numeric coverage treatment, retention and exception deadlines | Owner final acceptance | Behavioral coverage required; numeric percentages informational; logs 30 days; flake expiry 7 days; emergency review 2 working days |

Read in order: this attention map, current manifest handoff, Contributing,
quality supplement, registry/trigger/whiteboard, gate changes/tests, then
the batch review ledger. Deferred specialized policies remain deferred; no
product-runtime policy or new need is created.

## Authority and boundaries

Owner approved all consolidated recommendations and directed continued batch
work; [A04 ledger](reviews/ADOPTION-A04-S01.md) records the authority. It permits
dependent provisional drafts and one final human review after independent
review. It does not approve unseen content, change the playbook pin, authorize
hosted protection changes, publish releases, or permit first-need intake.
Exactly two fresh-context reviewers examine the joint package; retain their
seats for corrections. Changes invalidate affected evidence and are re-reviewed.

A04 is approved. Remaining batch proposals are provisional until the final
exact package is accepted and merged through review. The single final decision
approves the neutral whiteboard and may explicitly authorize the scoped PR,
squash merge, and post-merge recording mechanics. It does not record INSTALLED
before the reviewed merge and target verification.
Activation as ACTIVE still requires a later real pilot.

## Hosted repository evidence

Read-only GitHub API inspection on 2026-09-05 confirmed the canonical
repository and default main branch. Branch-protection endpoint returned
HTTP 404 “Branch not protected”; rulesets listing was empty. Squash, merge
commit, and rebase methods are all enabled. Local origin was updated with
owner authorization and verified to the canonical repository.

Proposed policy requires squash, owner approval, two agent reviews, and all
checks. These are manual controls until hosting configuration is separately
authorized. Final owner acceptance must acknowledge this limitation or require
hosted protection before installation acceptance. No enforcement claim is made.
GitHub license metadata is null, consistent with README's no-license notice;
the batch does not grant external redistribution rights.

## Installation and rollback

Final acceptance covers the exact reviewed file hashes, all resolved findings,
policy choices, and the hosted-settings limitation. Policy activation requires
reviewed merge as well as that acceptance. Publication and merge require explicit
owner authority, which the single final decision may supply for this package.
Revalidate the exact PR head, checks, comments, and target; material changes
return to the same reviewers and invalidate affected owner approval. After the
reviewed merge, verify target ancestry and checks, then record INSTALLED and
batch/whiteboard acceptance as authorized control-only follow-up without
rewriting candidate history. Until then remain MAPPED. Before a first need,
replace the completed adoption runtime as the
project trigger describes; validate the same pinned workflow profile. Runtime
validation currently has the known main-label mismatch tracked by issue #33;
new workflow installation uses the manifest SHA. Diagnose any failure before
intake. No runtime cleanup is performed during this pending batch.

Rollback uses reviewed, scoped reverts of batch integration changes; preserve
the previous approved authorities and append-only receipts. No commit, PR,
release, or hosted configuration update is claimed by preparation alone.

## Verification

### Policy conformance and residual scope

| Family | Applicable decisions and canonical completion evidence | Non-applicable / residual |
| --- | --- | --- |
| Development | Contributing defines change classes, plan/readiness/context gates, WIP, dependencies, defect/policy-gap routing, authority, modes, freshness, owner, and recovery; registry supplies working/archive paths | Owner final acceptance and reviewed merge activate the supplement |
| Testing | Quality Section 11 defines code boundary, changed-path coverage, real/mock levels, fixture ownership/cleanup, environments, failures/flakes, defects, evidence/retention, exemptions, maintenance | No product services or measured performance budget; future risk claims need explicit contracts |
| PR/branch | Contributing defines targets, unit counting, feature ownership/lifetime, task relationships, synchronization, squash, checks/review identity, deletion/abandonment, mode selection, closure/archive | Hosted protection absent; explicit manual-control acceptance required |
| Documentation | Existing quality Sections 1-10 continue to own sources, precedence, compatibility, review, validation and drift | Runtime scan corrected in package script; same CI command consumes it |
| Security/data/concurrency/performance | Existing secret/dependency/permission controls retained; real temp ownership and installer fault boundaries tested | No product data/concurrency/capacity contract; no license grant; extra obligations not reported |
| Release/operations/incidents | Contributing defines owner release/emergency authority, Git/changelog, reviewed revert/forward fix and time-bounded follow-up; archive contract preserves evidence | No hosted release or deployment performed |
| Specialized policies | Existing progressive trigger retained; no duplicate registry/policy created without systemic evidence | Deferred until observed trigger |

This is the current conformance proposal against the pinned policy templates.
The manifest's original discovery inventory/audit describes the approved
pre-installation baseline; this table and its linked changes show how the batch
addresses those gaps without erasing discovery history.

Gate results, exact candidate inventory, reviewer receipts, and final acceptance
belong in `reviews/ADOPTION-B01-S01.md`. Required checks are the canonical
`npm run docs:all`, advisory external links with classified failures, tracked
and exact-file untracked whitespace checks, and semantic cross-document
verification. Passing automation does not supply final owner acceptance.
