# Project Adoption Manifest — SGLang External Example

## 1. Control and live state

| Field | Value |
| --- | --- |
| Project / repository | [sgl-project/sglang](https://github.com/sgl-project/sglang) |
| Adoption scope | Non-authoritative repository-wide integration simulation |
| Adoption state | `REVIEW` |
| State before block | `None` |
| Playbook source repository | `https://github.com/hhhhhusky777/spec-driven-delivery-playbook.git` |
| Playbook revision | Immutable revision containing this example; resolve with `git rev-parse HEAD` before use |
| Upgrade state | `NONE` |
| Upgrade assessment / candidate | `None` |
| Playbook materialization mode | Pinned local read-only checkout |
| Runtime playbook locator contract | Caller supplies `PLAYBOOK_ROOT`; never committed as an absolute path |
| Target base revision | [`d315eb725044e435b146c85488b7c6d9222f7fec`](https://github.com/sgl-project/sglang/commit/d315eb725044e435b146c85488b7c6d9222f7fec) |
| Inspection date | 2026-08-22 |
| Adoption owner | Playbook example author; no SGLang authority |
| Required reviewers | Independent playbook reviewer; SGLang owners required only for a real adoption |
| Project contract registry | Proposed `.github/spec-driven-delivery/README.md` |
| Project adoption root | Proposed `.github/spec-driven-delivery/` |
| Bootstrap trigger source | `$PLAYBOOK_ROOT/templates/adoption/agent-adoption-trigger.md` after revision verification |
| Installed project trigger | Proposed `.github/spec-driven-delivery/agent-adoption-trigger.md` |
| Branch / PR | Current playbook example branch/PR only; no SGLang branch or PR |
| Allowed write scope | These playbook example files only; no SGLang path |
| Required documentation checks | `npm run docs:all` in this playbook |
| Review mode | `EXPLICIT_REVIEW` |
| Review mode authority | Current playbook adoption policy; semantic example refresh |
| Self-review state | `NOT_STARTED` |
| Self-review candidate revision | `Not recorded` |
| Self-review evidence | `Not recorded` |
| Fresh-context review state / evidence | `NOT_STARTED / Not recorded` |
| Human review state / evidence | `NOT_STARTED / Not recorded` |
| Automation boundary | `Not applicable` |
| Required automatic gates | `Not applicable` |
| Automatic gate result | `NOT_APPLICABLE` |
| Semantic decision introduced | `YES` |
| Automation exception | `None` |
| Current blocker | Self-review, fresh-context review, and human review of the exact example candidate are pending |
| Next action | Complete self-review, then fresh-context review, then request human review |

Adoption type: non-authoritative external-project case study.

No-affiliation statement: this example is not affiliated with or endorsed by
SGLang. It grants no authority and makes no upstream change.

## 2. Outcome, scope, and non-scope

Outcome: demonstrate an executable, agent-assisted playbook integration that
preserves SGLang's existing governance and produces an empty solution
whiteboard without collecting a need during installation.

In scope:

- public files at the pinned SGLang revision;
- proposed adoption paths, generated-guide routing, authority mapping, and review sequence; and
- playbook-repository validation of the example.

Not in scope:

- modifying or contacting SGLang;
- claiming SGLang approval, test execution, or workflow adoption;
- selecting or implementing a real SGLang feature; and
- exhaustively auditing every source file or historical discussion.

## 3. Authority and conflict rules

Proposed order for an authorized SGLang adoption:

1. SGLang legal, security, maintainer, CODEOWNERS, and branch protections.
2. SGLang contribution, test/CI, component, documentation, and release rules.
3. An approved SGLang SDD overlay only for discovery and delivery routing gaps.
4. The pinned upstream playbook as informative source.

Any conflict remains blocked until the applicable SGLang owner decides it. The
example cannot decide on SGLang's behalf.

## 4. Repository discovery inventory

| Domain | Verified existing authority/evidence | Owner evidence | Result |
| --- | --- | --- | --- |
| Contributor workflow | [Contribution guide](https://github.com/sgl-project/sglang/blob/d315eb725044e435b146c85488b7c6d9222f7fec/docs/docs/developer_guide/contribution_guide.mdx) | Links maintainer and CI owners | `REUSE` |
| PR/branch/review | [Maintenance model](https://github.com/sgl-project/sglang/blob/d315eb725044e435b146c85488b7c6d9222f7fec/.github/MAINTAINER.md), [CODEOWNERS](https://github.com/sgl-project/sglang/blob/d315eb725044e435b146c85488b7c6d9222f7fec/.github/CODEOWNERS), and [PR template](https://github.com/sgl-project/sglang/blob/d315eb725044e435b146c85488b7c6d9222f7fec/.github/pull_request_template.md) | Owners exist; integration-route conformance is incomplete | `UPDATE_EXISTING` |
| Tests and CI | [Test system](https://github.com/sgl-project/sglang/blob/d315eb725044e435b146c85488b7c6d9222f7fec/test/README.md), [registered tests](https://github.com/sgl-project/sglang/blob/d315eb725044e435b146c85488b7c6d9222f7fec/test/registered/README.md), and [unit tests](https://github.com/sgl-project/sglang/blob/d315eb725044e435b146c85488b7c6d9222f7fec/test/registered/unit/README.md) | CI and path owners are documented | `REUSE` |
| Agent instructions | `docs/AGENTS.md`, `.claude/rules/`, and `.claude/skills/` | Scoped by path or tool | `UPDATE_EXISTING` with thin pointer only |
| SDD entry point | No root `AGENTS.md` or filename matching adoption manifest, solution whiteboard, implementation plan, or SDD was found in the pinned Git tree | Absence by filename only | `GENERATE` proposal |
| Documentation gates | Pre-commit covers whitespace, EOF, secrets, and codespell; Mint covers `docs`; manual lychee is scoped to root `README.md` | `.github` and docs owners | `UPDATE_EXISTING` for adoption-path links |
| Hardware constraints | Test guides classify CPU, GPU, multi-GPU, nightly, performance, and accuracy work | CI permissions and on-calls are documented | `REUSE`; never trigger costly CI automatically |

Unknowns requiring SGLang authority in a real adoption:

| ID | Unknown | Consequence |
| --- | --- | --- |
| `U-01` | Whether SGLang maintainers want repository-wide SDD | Blocks real adoption and any upstream PR |
| `U-02` | Final owner of the SDD overlay | Blocks project activation |
| `U-03` | Whether `.github/spec-driven-delivery/` is the preferred path | Requires `.github` owner decision |
| `U-04` | Exact blocking Markdown/link gate for the new path | Must be resolved before real `INSTALLED` |

## 5. Adoption routing manifest

| Order | Capability/artifact | Decision | Proposed authority/destination | Reason | Example state |
| --- | --- | --- | --- | --- | --- |
| `0` | Project adoption manifest | `GENERATE` | `.github/spec-driven-delivery/project-adoption-manifest.md` | State and data connector | Demonstrated |
| `1` | Project development entry point | `GENERATE` | `.github/spec-driven-delivery/README.md` | One human/agent route | Demonstrated |
| `2` | Development policy | `GENERATE` | `.github/spec-driven-delivery/development-policy.md` | SDD routing gap only | Demonstrated |
| `3` | Test strategy | `REUSE` | Existing contribution and test guides | Strong project-specific system exists | Mapped |
| `4` | PR/branch policy | `UPDATE_EXISTING` | Existing maintainer model, CODEOWNERS, contribution guide, and PR template | No verified deterministic one-task versus multi-task integration route | Project-owner decision required |
| `5` | Specialized-policy registry | `DEFER` | Future manifest entry | No observed current need | Trigger recorded |
| `6` | Whiteboard and delivery templates | `REUSE` | Pinned playbook checkout recorded above | Immutable source without copied policy | Mapped |
| `7` | Documentation enforcement | `UPDATE_EXISTING` | Pre-commit/link-check scope | New `.github` Markdown lacks full link coverage | Proposed only |
| `8` | Agent entry-point adapters | `UPDATE_EXISTING` / `GENERATE` | Root `AGENTS.md`, `.claude/rules`, contribution guide link | Discoverability without duplicate rules | Demonstrated |

### Policy conformance audit

`REUSE` requires decision-level evidence, not only an existing document. This
example therefore routes the incomplete PR/branch family to `UPDATE_EXISTING`
instead of silently importing the playbook default.

| Policy family | Evidence and gap | Disposition |
| --- | --- | --- |
| Development and delivery | Contribution guidance exists; whiteboard, lifecycle, receipts, and archive routing are not verified | `UPDATE_EXISTING` through the proposed SDD overlay |
| Testing and quality | Test placement, registration, hardware classes, and CI commands are documented; exact per-change selection remains project-owned | `REUSE` with project selection |
| PR and branch | Review ownership exists; single-task direct and multi-task feature-integration routing is not verified | `UPDATE_EXISTING`; no duplicate PR policy |
| Documentation and API contracts | Documentation authorities exist; proposed `.github` paths lack verified link coverage | `UPDATE_EXISTING` |
| Security, data, concurrency, and performance | Scoped authorities exist; no repository-wide replacement is justified | `REUSE` by affected scope |
| Release, operations, and incident response | Existing project authorities remain canonical; exhaustive conformance is not claimed | `REUSE` by affected scope with `UNKNOWN` where unverified |
| Specialized policies | No observed systemic policy gap in adoption itself | `DEFER` until evidence exists |

### Artifact impact and freshness register

| Artifact | Depends on | Freshness | Evidence/action |
| --- | --- | --- | --- |
| Adoption manifest | Pinned playbook and SGLang revisions | `CURRENT` | Refreshed against current playbook contracts |
| Proposed project entry point | Adoption manifest | `CURRENT` | Links live state rather than copying it |
| Proposed SDD overlay | Adoption manifest and project authorities | `CURRENT` | Review modes and branch routing added |
| Agent adapters | Proposed entry point | `CURRENT` | Thin links only |
| Generated-guide representation | Current installer schema | `CURRENT` | Provenance, validation, cleanup, and replacement fields represented |

## 6. Gap, deviation, and YAGNI register

| ID | Gap or decision | Disposition |
| --- | --- | --- |
| `G-01` | No verified repository-wide whiteboard-to-delivery entry point by filename | Generate thin entry point and SDD overlay if SGLang approves |
| `G-02` | Existing agent instructions are tool/path scoped | Add thin adapters to one canonical entry point |
| `G-03` | New `.github` Markdown link coverage is not established | Update existing check through CI-owner review |
| `D-01` | Do not instantiate a second test strategy | Reuse SGLang's richer test system |
| `D-02` | Do not instantiate a second PR policy | Reuse SGLang maintainer/CODEOWNERS process |
| `Y-01` | No new specialized policy | Defer until a real systemic gap is observed |
| `Y-02` | No new product test framework or GPU workflow | Existing project systems remain authoritative |
| `Y-03` | No automation implementation yet | Derive it only after the manual example is reviewed |

## 7. Project-local navigation and enforcement

The proposed entry point is [represented here](02-project-entrypoint.md). Human
and agent adapters contain links only; they do not repeat policy.

| Gate | Mapped SGLang command/workflow | Example evidence |
| --- | --- | --- |
| Generic formatting | `pre-commit run --all-files` | Not run against SGLang; source command verified |
| Docs links | `cd docs && mint broken-links --check-anchors --check-redirects` | Does not cover proposed `.github` path without update |
| Unit/registered tests | Commands selected from SGLang test guides | No product change; not run |
| Accuracy/performance/GPU | Triggered only by affected behavior and authorized CI | Not applicable to example |
| PR/review | Merge on-call, CODEOWNERS, `run-ci` permissions | No SGLang PR or review claimed |
| Example documentation | `npm run docs:all` in playbook | Required before this example can pass review |

## 8. First delivery and review

Pilot result: `NOT_STARTED`. The example provides a
[generated agent guide representation](06-generated-agent-guide.md) but makes
no SGLang edit and records no unselected need.

| Review item | Required reviewer | Current disposition |
| --- | --- | --- |
| Agent self-review of exact candidate | Producing agent | `NOT_STARTED` |
| Public SGLang facts and links | Independent playbook reviewer | `NOT_STARTED` until self-review passes |
| Proposed target paths and reuse decisions | Independent playbook reviewer | `NOT_STARTED` until self-review passes |
| Real SGLang adoption authority | SGLang maintainers/owners | `NOT_REQUESTED` |
| Example documentation tests | Playbook CI | `PENDING` until this refresh is validated |

Final disposition: `IN_REVIEW`. `EXAMPLE_REVIEWED` requires fresh-context and
human playbook review. `ACTIVE` is prohibited because no SGLang adoption
occurred.

## 9. Current handoff

| Field | Value |
| --- | --- |
| Current example state | `REVIEW` |
| SGLang working tree | Read-only pinned audit; no example edits |
| Next action | Fresh-context review, then human review, of the refreshed current-playbook example |
| After approval | Mark example `EXAMPLE_REVIEWED`; no authority to start SGLang work |
| First project action if authorized later | Re-run discovery against a fresh SGLang revision and resolve `U-01`–`U-04` |
