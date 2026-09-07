# Project Adoption Manifest — Spec-Driven Delivery Playbook

<!-- sdd-schema: project-adoption-manifest@5 -->

This is the durable installation control for the repository. Feature design,
task, review, and delivery evidence belongs to its GitHub pull request; this
manifest keeps only the state needed to start the next delivery safely.

## Control and live state

| Field | Value |
| --- | --- |
| Project / repository | [hhhhhusky777/spec-driven-delivery-playbook](https://github.com/hhhhhusky777/spec-driven-delivery-playbook) |
| Adoption scope | This repository's contributor-facing delivery workflow and documentation gates |
| Adoption state | `INSTALLED` |
| State before block | `None` |
| Playbook source repository | `https://github.com/hhhhhusky777/spec-driven-delivery-playbook.git` |
| Playbook revision | `69668f7f2a91788129da0c0b59253cf6288f61ba` |
| Upgrade state | `COMPLETE` |
| Upgrade assessment / candidate | [Neutral upgrade entry point](playbook-upgrade-assessment.md); no active candidate |
| Playbook materialization mode | `pinned local checkout` |
| Runtime playbook locator contract | Installer-generated `.sdd-runtime/agent-guide.md` verifies the read-only checkout for each invocation |
| Target base revision | `69668f7f2a91788129da0c0b59253cf6288f61ba` |
| Inspection date | `2026-09-07` |
| Adoption owner | Playbook maintainers |
| Required reviewers | Exactly two isolated agent reviewers, followed by an authorized repository maintainer at human gates |
| Project contract registry | [Project contracts](project-contracts.md) |
| Project adoption root | `.github/spec-driven-delivery` |
| Bootstrap trigger source | `templates/adoption/agent-adoption-trigger.md` at the pinned playbook revision |
| Installed project trigger | [Agent trigger](agent-trigger.md) |
| Branch / PR | `main`; delivery evidence is owned by GitHub pull requests |
| Allowed write scope | Read from the active delivery workflow; none while the whiteboard is `EMPTY` |
| Required documentation checks | `npm run docs:all`; exact lifecycle, Markdown, links, Mermaid, whitespace, and relevant focused tests |
| Review mode | `EXPLICIT_REVIEW` |
| Review mode authority | [Contributing](../../CONTRIBUTING.md#review-and-continuation-authority) |
| Self-review state | `NOT_STARTED` |
| Self-review candidate revision | `Not applicable` |
| Self-review evidence | `Not applicable` |
| Fresh-context review state / evidence | `Not started` |
| Fresh-context review session / assigned reviewers | `Not started` |
| Human review state / evidence | `Not started` |
| Automation boundary | `Not applicable` |
| Required automatic gates | `Not applicable` |
| Automatic gate result | `NOT_APPLICABLE` |
| Semantic decision introduced | `NO` |
| Automation exception | `None` |
| Current blocker | `None` |
| Next action | Await the owner's next need through the verified workflow runtime and neutral whiteboard |
| Last delivery receipt | `feature_pr=https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/65; feature_merge=69668f7f2a91788129da0c0b59253cf6288f61ba; reset_pr=https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/68; reset_head=9c2836c6e40f2a57357c7e894a4f5ee0fce015a1; bundle=sha256:1da0ba55ffa6b4d594d072ffc462d012fca4ac913921eaeb8f72315427ae2484` |

`Last delivery receipt` is replaced only after a verified v5 feature/reset
cycle. Its fixed-size format and evidence requirements are owned by
[Batched review and recovery](../../docs/batch-review-and-recovery.md#version-5-pr-evidence-and-delivery-reset).

## Installed project contracts

| Need | Canonical source |
| --- | --- |
| Start, development, branches, and merge authority | [Contributing](../../CONTRIBUTING.md) |
| Documentation quality, evidence, and human review briefs | [Documentation Quality Policy](../../docs/documentation-quality-policy.md) |
| Reusable template ownership and compatibility | [Template Governance](../../docs/template-governance.md) |
| Project artifact and runtime locations | [Project contract registry](project-contracts.md) |
| Start or resume agent work | [Project trigger](agent-trigger.md) and verified `.sdd-runtime/agent-guide.md` |
| Current need | [Working whiteboard](solution-whiteboard.md) |
| Review, recovery, PR evidence, and reset | [Batched review and recovery](../../docs/batch-review-and-recovery.md) |

## Stable boundary

- Adoption is complete and persists across feature deliveries; a future need
  does not repeat adoption.
- A new need may enter only while the working whiteboard is exactly `EMPTY` and
  the generated runtime matches the repository, project root, and immutable
  manifest pin.
- The active workflow owns delivery scope, dependencies, blockers, review mode,
  and next action. This manifest does not duplicate that volatile state.
- Required checks, independent review, human decisions, merge authority,
  target proof, and destructive ownership remain mandatory at their actual
  boundaries.
- Runtime files under `.sdd-runtime/` and installer-owned temporary checkouts
  are machine-local generated state, not project authority.

Adoption type: `real project`

External-project disclaimer: `Not applicable`
