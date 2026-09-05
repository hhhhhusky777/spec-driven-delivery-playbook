# Project Adoption Manifest — Spec-Driven Delivery Playbook

This manifest records the installation and adoption of the Spec-Driven Delivery
Playbook into its own source repository. It supplements, and does not replace,
the repository authorities linked below.

The live control table and final handoff are authoritative. Earlier discovery,
review attention, gap, checklist, and B01 preparation statements below are
historical snapshots of the approved candidate; their pending states do not
override the final acceptance and merge evidence.

## Historical B01 review attention map

| Focus | Review input | State / risk | Required reviewer |
| --- | --- | --- | --- |
| Outcome and scope | [Outcome, scope, and non-scope](#2-outcome-scope-and-non-scope) | B01 complete installation draft; final acceptance pending | Two isolated agent reviewers, then repository maintainer |
| Authorities and routing | [Discovery inventory](#4-repository-discovery-inventory), then [routing manifest](#5-adoption-routing-manifest) | A02 routing approved; local policy values remain unresolved until their own reviewed actions | Development, test, PR, and documentation reviewers |
| Gaps and evidence | [Gap register](#6-gap-deviation-and-yagni-register), then [enforcement](#8-enforcement-and-evidence) | Aggregate runtime scanning and the symbolic-label validator defect remain classified gaps | Documentation/tooling reviewer and repository maintainer |
| Blocker and next action | [Current handoff](#12-current-handoff) | No execution blocker; B01 requires two fresh-context approvals and one final human acceptance | New B01 review session seats `R1` and `R2` |
| Authority and remote questions | [Unknowns `U-01`-`U-05`](#4-repository-discovery-inventory), [authority roles](#3-authority-and-conflict-rules) | Owner directions recorded; hosted protection absent; precise policy proposals await package acceptance | Repository maintainer; PR, release, and security specialties within the two seats |
| Missing decisions and navigation | [Gaps `G-02`-`G-07`](#6-gap-deviation-and-yagni-register), [routing `0`-`8`](#5-adoption-routing-manifest) | Drafted contributor/PR/testing decisions, entry links, and artifact paths; origin corrected; final acceptance pending | Maintainer; development and PR reviewers |
| Drift and recovery | [Freshness register](#artifact-impact-and-freshness-register), [rollback](#11-rollback-updates-and-drift) | README correction approved in A03 and CURRENT; A04 contributor entry point approved; batch drafts await review; runtime defect remains classified | Documentation/tooling reviewer and maintainer |
| Exceptions and deferred scope | [Deviations and YAGNI](#6-gap-deviation-and-yagni-register), [pilot](#9-pilot-delivery) | No policy deviation or automation exception proposed; listed exclusions/deferments approved in A02; pilot `NOT_STARTED` | Maintainer and applicable domain reviewer |

Recommended reading order: this map, Sections 1-3, Section 8, Section 10, and
Section 12. A02 routing decisions are approved proposals for installation work; B01 drafts do
not activate policies before final acceptance. There are no inferred needs, exceptions, or automation permissions.

## 1. Control and live state

| Field | Value |
| --- | --- |
| Project / repository | [hhhhhusky777/spec-driven-delivery-playbook](https://github.com/hhhhhusky777/spec-driven-delivery-playbook); local origin updated with owner authorization |
| Adoption scope | This repository's contributor-facing delivery workflow and documentation gates |
| Adoption state | `INSTALLED` |
| State before block | `None` |
| Playbook source repository | `https://github.com/hhhhhusky777/spec-driven-delivery-playbook.git` |
| Playbook revision | `d213114f99dc2186d6f4e50a85fe962de0e1afa9` |
| Upgrade state | `NONE` |
| Upgrade assessment / candidate | `None` |
| Playbook materialization mode | `pinned local checkout` |
| Runtime playbook locator contract | Installer-generated `.sdd-runtime/agent-guide.md` supplies and verifies the read-only checkout for each invocation |
| Target base revision | `d213114f99dc2186d6f4e50a85fe962de0e1afa9` |
| Inspection date | `2026-09-05` |
| Adoption owner | Playbook maintainers |
| Required reviewers | Exactly two isolated agent reviewers, followed by an authorized repository maintainer |
| Project contract registry | [Project contracts](project-contracts.md); accepted B01 R03 |
| Project adoption root | `.github/spec-driven-delivery` |
| Bootstrap trigger source | `templates/adoption/agent-adoption-trigger.md` at the pinned playbook revision |
| Installed project trigger | [Agent trigger](agent-trigger.md); accepted B01 R03 |
| Branch / PR | [Installation PR](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/39), merged; control reconciliation on codex/sdd-installation-finalize |
| Allowed write scope | CONTRIBUTING.md; docs/documentation-quality-policy.md; .github/pull_request_template.md; package.json; .markdownlint-cli2.jsonc; tests/documentation-quality.test.mjs; AGENTS.md; project adoption root and review evidence |
| Required documentation checks | Canonical npm run docs:all; external-link advisory; exact tracked/untracked whitespace; semantic package review |
| Review mode | `EXPLICIT_REVIEW` |
| Review mode authority | Owner-authorized [batch preparation](installation-batch.md); final human acceptance retained |
| Self-review state | `SELF_REVIEW_PASSED` |
| Self-review candidate revision | `ADOPTION-B01-R03` |
| Self-review evidence | Batch review ledger records exact joint file inventory and self-review before independent review |
| Fresh-context review state / evidence | B01 R03 APPROVED by both assigned seats; exact receipts in B01 ledger |
| Fresh-context review session / assigned reviewers | ADOPTION-B01-S01; R1 adoption_b01_r1 and R2 adoption_b01_r2; two approvals required |
| Human review state / evidence | B01 APPROVED; owner authorized PR, merge, post-merge validation and installation completion on 2026-09-05; B01 ledger |
| Automation boundary | `Not applicable` |
| Required automatic gates | `Not applicable` |
| Automatic gate result | `NOT_APPLICABLE` |
| Semantic decision introduced | YES — remaining installation policy drafts and integration |
| Automation exception | `None` |
| Current blocker | `None` |
| Next action | Review and publish WB38 archive/reset control package, then await the next owner-supplied need through the verified workflow runtime |

Adoption type: `real project`

External-project disclaimer: `Not applicable`

## 2. Outcome, scope, and non-scope

Outcome:

Install a project-local, reviewed delivery workflow that preserves this
repository's existing contributor, documentation, template, pull-request, and
CI authorities.

In scope:

- Mapping the repository's current delivery authorities and installing only
  approved missing integration artifacts.

Not in scope:

- Changing reusable playbook behavior, admitting a product need, or claiming
  adoption is installed or active before its review gates pass.

Success evidence:

- A reviewed `INSTALLED` manifest, approved project navigation and gates, and
  an approved empty solution whiteboard.

## 3. Authority and conflict rules

Project-defined authority order:

1. Legal, security, and upstream contractual obligations.
2. [Documentation Quality and Testing Policy](../../docs/documentation-quality-policy.md).
3. [Template Governance](../../docs/template-governance.md).
4. [Contributing](../../CONTRIBUTING.md).
5. Individual template instructions and worked examples, subordinate to the
   active policies above.

This order follows Documentation Quality Policy Section 1. The following role
map explains supporting files without assigning them a new authority tier:

| Artifact | Role and canonical owner | Conflict handling |
| --- | --- | --- |
| [README](../../README.md) | Reusable workflow overview and contributor navigation; its lifecycle descriptions refer to the owning runbook/templates, not a complete repository-specific development policy | Active documentation, template, and contributor authorities above govern; project choices must be recorded through Contributing |
| [PR template](../pull_request_template.md) | Contributor review form implementing Contributing and Documentation Quality Policy; does not independently grant merge authority | Owning contributor/quality policy prevails |
| [CI workflow](../workflows/documentation-quality.yml), `package.json`, checker configuration, and Dependabot | Executable enforcement of Documentation Quality Policy Sections 3-8 | Policy prevails over implementation drift; `G-01` records the observed mismatch |
| Future instantiated supplements | Proposed additions only until independently and human reviewed; each must link its existing owning authority | Cannot silently supersede an existing policy |

Routing `1` therefore proposes updating Contributing for missing local delivery
decisions, linking existing template/quality rules instead of restating them.
No separate development-policy file is proposed. This mapping does not change
the existing precedence or confer authority on an unapproved supplement.

Conflict owner and escalation path: Playbook maintainers through reviewed pull
request discussion.

Rules:

- Existing project authority remains active until reviewed and superseded.
- A generated artifact has no project authority before project approval.
- Unresolved authority conflicts block only affected adoption work.
- Summaries link to canonical rules and do not compete with them.

## 4. Repository discovery inventory

Facts below were verified from target base
`d213114f99dc2186d6f4e50a85fe962de0e1afa9`. `UNKNOWN` means repository
evidence does not establish the choice or owner authority.

| Domain | Existing authority/evidence | State/version | Owner | Confidence |
| --- | --- | --- | --- | --- |
| Contributor entry point | [README](../../README.md) and [Contributing](../../CONTRIBUTING.md) | Active on target base; no project-local SDD start link | Playbook maintainers | High |
| Development/change policy | README delivery model, [Template Governance](../../docs/template-governance.md), and [Documentation Quality Policy](../../docs/documentation-quality-policy.md) | Split authorities; Template Governance explicitly is not a project development policy | Playbook maintainers | High |
| Test strategy and commands | Documentation Quality Policy Sections 3-8, `package.json`, `package-lock.json`, and `tests/` | Node.js 24; locked dependencies; blocking documentation and negative-regression suite | Playbook maintainers | High |
| PR/branch/reviewer rules | Contributing, `.github/pull_request_template.md`, README branch/review model | Review content is defined; repository-specific protected branch, merge method, naming, and implementation-mode choice are not recorded | Playbook maintainers; exact merge authority `UNKNOWN` | High |
| Documentation/API contracts | Documentation Quality Policy, Template Governance, template catalog, lifecycle schema | Documentation contracts active; no product API exists in repository scope | Playbook maintainers | High |
| CI/release/operations | `.github/workflows/documentation-quality.yml`, `.github/dependabot.yml`, `CHANGELOG.md`, Template Governance versioning | CI and dependency updates defined; formal release and emergency paths are not recorded | Playbook maintainers | Medium |
| Security/privacy/compliance | Contributing sensitive-data prohibition; documentation-policy secret/path checks, immutable action pins, read-only CI, dependency review | Applicable repository controls exist; external compliance obligations are `UNKNOWN` | Playbook maintainers | Medium |
| Data/concurrency/performance | No application runtime, service, database, queue, or public API in tracked repository | Product data/concurrency/performance policies not applicable to current repository scope | Playbook maintainers | High |
| Decision/history/archive | Git history, `CHANGELOG.md`, preserved examples, README workflow/archive rules | Repository history exists; project-local SDD delivery archive is not installed | Playbook maintainers | High |

Owner decisions and verification:

| ID | Decision / evidence | State / remaining boundary | Owner |
| --- | --- | --- | --- |
| U-01 | Canonical transferred repository confirmed; local origin updated and verified | RESOLVED | Repository owner |
| U-02 | main, codex branches, squash, owner approval, two agent reviews; CODEOWNERS deferred | Directions recorded; hosted protections absent, manual controls proposed for final acceptance | Repository owner |
| U-03 | Default human-before-merge; scoped implementation auto-merge only with explicit later selection | RESOLVED as policy direction; no current auto-merge scope | Repository owner |
| U-04 | Owner authorizes releases/hotfix/emergencies; no release branches initially | Directions recorded; precise emergency follow-up proposed in Contributing | Repository owner |
| U-05 | No additional external obligations reported; existing no-license notice retained | RESOLVED for current scope; reassess third-party/publication changes | Repository owner |

## 5. Adoption routing manifest

These routing dispositions were approved in A02 R03; their downstream policy
values and artifacts still require separate review before activation.

| Order | Capability/artifact | Decision | Project authority or destination | Reason/evidence | Depends on | Reviewer/state |
| --- | --- | --- | --- | --- | --- | --- |
| `0` | Project development entry point | `UPDATE_EXISTING` | [Contributing](../../CONTRIBUTING.md) | Current human entry point has no link to installed SDD state or start procedure | `None` | Maintainer / routing approved in A02 |
| `1` | Development policy | `UPDATE_EXISTING` | [Contributing](../../CONTRIBUTING.md), linking existing quality/template authorities | Existing contributor authority is incomplete for local delivery decisions; extend it without duplicating README workflow descriptions or generating a parallel policy | `0` | Development and maintainer / routing approved in A02 |
| `2` | Test strategy | `UPDATE_EXISTING` | [Documentation Quality Policy](../../docs/documentation-quality-policy.md) | Documentation gates are established; executable Node/Bash tooling needs explicit coverage, test-level, isolation, flake, defect, and evidence-retention decisions (`G-07`) | `1` | Test and maintainer / routing approved in A02 |
| `3` | PR and branch policy | `UPDATE_EXISTING` | Contributing plus `.github/pull_request_template.md` | Current authorities cover PR content and review but omit repository-specific branch/merge choices and implementation continuation modes | `1`, `2` | PR/maintainer / routing approved in A02 |
| `4` | Specialized-policy registry | `DEFER` | Manifest gap register and README progressive-policy route | No current systemic domain gap requires a separate policy; create or update one only when evidence triggers it | `1` | Maintainer / routing approved in A02 |
| `5` | Per-need delivery artifacts | `GENERATE` | `.github/spec-driven-delivery/` active and archive paths | Templates and workflow exist upstream, but project-local trigger, working paths, and empty whiteboard are not installed | `1`, `2`, `3` | Development/test/maintainer / routing approved in A02 |
| `6` | Documentation/test/PR enforcement | `UPDATE_EXISTING` | `package.json`, checker configuration/tests, and CI | Active policy requires excluding `.sdd-runtime` in adopting projects, but the canonical aggregate command currently scans it and fails | `2` | Documentation/tooling / routing approved in A02 |
| `7` | Adoption archive and updates | `GENERATE` | Project-local registry and archive paths under `.github/spec-driven-delivery/` | README defines the reusable lifecycle, but no project-local archive/update connector is installed | `5` | Maintainer / routing approved in A02 |
| `8` | Human/agent entry-point adapters | `GENERATE` | Root `AGENTS.md` plus the updated human entry point | No agent instruction file exists; adapter must remain thin and link reviewed project authority | `0`, `1`, `5` | Development/maintainer / routing approved in A02 |

### Policy conformance audit

| Policy family / routing ID | Required decision or obligation | Applicable? / reason | Existing project evidence | Gap, equivalent control, or exception | Disposition | Reviewer/state |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Development and delivery / `1` | Boundaries, change classes, task lifecycle/readiness, dependency sequencing, defect/policy-gap routing, WIP, review modes, and durable handoff | Yes; repository changes reusable workflow, templates, tests, and CI | README defines the SDD lifecycle, small increments, dependency sequencing, TDD, policy-gap rerouting, and review modes; Contributing defines template-change scope | Contributing owns contributor workflow but lacks local WIP, artifact paths, environment rules, and continuation choices; preserve existing change categories and link owning lifecycle rules | `UPDATE_EXISTING` | Development/maintainer / routing approved in A02 |
| Testing and quality / `2` | Levels, changed-boundary coverage, environment, deterministic evidence, triage, exceptions, security/performance applicability | Yes for documentation/tooling; product-runtime levels are not applicable because no runtime product is tracked | Documentation Quality Policy defines Node 24, locked dependencies, Markdown/structure/lifecycle/Mermaid/negative tests, advisory external links, generated-content checks, triage, exceptions, and review | Executable-tooling coverage, level boundaries, deterministic isolation, flaky-test treatment, durable-defect threshold, and evidence retention are incomplete (`G-07`); no product-runtime scope does not exempt Node/Bash tooling | `UPDATE_EXISTING` | Test/maintainer / routing approved in A02 |
| PR and branch / `3` | Protected target, single/multi-task models, naming, merge method, reviewers/checks, implementation-mode choice, closure and archive order | Yes | README defines generic single/multi-task topology and merge-before-reconcile-before-archive; Contributing and PR template define scope, evidence, self-review, two-agent review, human review, and risk sections | Protected-branch settings, naming, merge method, formal reviewer authority, and permitted implementation modes remain `U-02`/`U-03` | `UPDATE_EXISTING` | PR/maintainer / routing approved in A02 |
| Documentation and API contracts / `2`, `6` | Authority, precedence, consumers, compatibility, freshness, validation, and generated-content rules | Documentation yes; product API no | Documentation Quality Policy Sections 1-10, Template Governance, schema/config/scripts/tests/CI | Policy is complete, but aggregate enforcement violates its required `.sdd-runtime` exclusion during self-adoption | `UPDATE_EXISTING` for enforcement; policy text `REUSE` | Documentation/tooling / routing approved in A02 |
| Security, data, concurrency, and performance / `1`, `2` | Secrets, permissions, dependencies, data/migration/race/capacity invariants and enforcement | Security/tool dependency controls apply; product data/concurrency/performance do not | Contributing prohibits credentials/private data; documentation policy enforces secret/path checks, read-only CI, immutable GitHub Action pins, dependency review, and failure handling | External obligations remain `U-05`; no tracked runtime boundary justifies speculative product policies | `REUSE` applicable security controls; `SKIP` product-runtime controls | Security/maintainer / routing approved in A02 |
| Release, operations, and incident response / `1`, `3`, `7` | Environments, rollout, rollback, recovery, emergency authority, reconciliation, and archive | Partly; published template compatibility and repository recovery apply | Template Governance uses Git history, changelog, migration guidance, upgrade boundary, and preserved examples; README defines delivery archive order | Formal release/hotfix/emergency decisions remain `U-04`; add them to canonical development/PR authority instead of a duplicate policy | `UPDATE_EXISTING` | Maintainer / routing approved in A02 |
| Specialized policies / `4` | Evidence trigger, local/systemic decision, proposed/active states, audit, exceptions, remediation, retirement | Yes as a progressive trigger; no current specialized policy is justified | README progressive-policy route and Template Governance review procedure define the required trigger and lifecycle | No observed systemic domain gap; creating an empty registry now would be speculative | `REUSE` trigger; `DEFER` registry | Maintainer / routing approved in A02 |

### Artifact impact and freshness register

| Artifact / routing ID | Changed fact or action | Affected claim or dependency | Freshness | Required next action / evidence |
| --- | --- | --- | --- | --- |
| [Bootstrap review record](reviews/ADOPTION-A01-S01.md) | Human approved `ADOPTION-A01-R05` | Historical bootstrap evidence | `CURRENT` | Preserve append-only |
| [README self-adoption section](../../README.md#use-this-playbook-for-this-repository) | A03 R02 approved by agents and owner | Stable link to live manifest | `CURRENT` | Preserve approved README; status remains in manifest |
| Discovery / `ADOPTION-A02-R03` | Facts and routing approved by both agents and owner | Governs later adoption actions | `CURRENT` | Preserve [A02 approval](reviews/ADOPTION-A02-S01.md) |

### B01 impact and freshness

CURRENT below means the candidate was reconciled with its declared sources;
it does not mean approved or active. All B01 changes await final acceptance
and reviewed merge. Exact file blobs and review rounds are recorded in the
[B01 inventory](reviews/ADOPTION-B01-S01.md).

| Artifact group | Changed input / dependency | Freshness | Approval and remaining condition |
| --- | --- | --- | --- |
| Contributing development/PR supplement | Approved owner directions and A04 entry point; pinned policy templates | CURRENT on B01 candidate | Proposed; final acceptance and reviewed merge |
| Quality policy Section 11 | Tooling decisions, Contributing scope, pinned test template | CURRENT on B01 candidate | Proposed; final acceptance and reviewed merge |
| PR template | Contributing branch/authority supplement | CURRENT on B01 candidate | Proposed; exact PR checks/review still required for merge |
| package.json, lint configuration, exclusion regression | Existing quality-policy runtime exclusion rule | CURRENT; full canonical gate passed | Corrected candidate, not yet merged |
| README and contributor entry links | Registry and manifest availability | CURRENT; links checked | Prior entry approvals retained; downstream proposed state explicit |
| AGENTS, registry and trigger | Candidate Contributing/quality policy, manifest pin and activation boundary | CURRENT on joint B01 inventory | Proposed; no first-need intake |
| Archive and delivery paths | Registry, retention and closure rules | CURRENT on joint B01 inventory | Proposed; no delivery history invented |
| EMPTY whiteboard | Registry, Contributing and batch preparation authority | CURRENT; neutral content verified | Proposed installation draft; no need/conclusion |
| Installation index and manifest handoff | All listed candidate artifacts, approval/merge boundary and live checks | CURRENT on joint B01 inventory | Provisional control/evidence; final acceptance pending |
| Prior review ledgers | Original reviewed hashes and owner decisions | CURRENT historical evidence | Append-only; outside joint candidate |
| Runtime guide | Pinned origin/HEAD and adoption profile | CURRENT binding; known validator label defect separately recorded | Retain until approved post-merge runtime handoff |

No additional stale dependent was identified. Any material candidate change
invalidates affected freshness/review evidence before final acceptance.

## 6. Gap, deviation, and YAGNI register

### Gaps

| ID | Original gap | Batch disposition | Owner / final evidence |
| --- | --- | --- | --- |
| G-01 | Canonical docs gate scans runtime | Narrow exclusion and positive/negative regression drafted; require canonical full gate pass | Tooling reviewer |
| G-02 | Local development decisions missing | Contributing project-delivery supplement drafted | Owner final acceptance |
| G-03 | Branch, merge, and continuation decisions missing | Contributing and PR template updated; hosted protection limitation explicit | Owner final acceptance |
| G-04 | Human/agent navigation missing | A03/A04 human links approved; thin AGENTS adapter drafted | Batch reviewers |
| G-05 | Trigger, registry, whiteboard, archive missing | Drafted together under explicit batch authority; no need inferred | Owner installation acceptance |
| G-06 | Legacy origin | RESOLVED; canonical origin verified after authorized update | Git remote evidence |
| G-07 | Tooling test decisions missing | Existing quality policy extended; coverage/retention proposals explicit | Test reviewer and owner |

### Playbook deviations

None proposed. Existing project controls are reused only where the audit above
shows decision-level equivalence.

### YAGNI exclusions

| Candidate artifact/control | Why it is not needed now | Reconsideration trigger | Owner |
| --- | --- | --- | --- |
| Product API, data, concurrency, or performance policy | Repository contains documentation, templates, Node-based checkers, and tests but no product runtime boundary | A tracked runtime/API/stateful service or related systemic risk is introduced | Playbook maintainers |
| Standalone incident policy | No repository incident process or operational service boundary is evidenced | Maintainer identifies incident authority or a qualifying incident exposes a gap | Playbook maintainers |
| Empty specialized-policy registry | Progressive trigger already exists and no current domain policy gap is evidenced | A repeated/cross-feature enforceable gap is registered | Playbook maintainers |
| Additional agent adapters beyond root `AGENTS.md` | No repository evidence shows another supported agent entry point | A maintainer adopts another agent runtime | Playbook maintainers |

## 7. Project-local navigation

| Reader need | Canonical project entry/link | Required reading order |
| --- | --- | --- |
| Start contributing | [Contributing](../../CONTRIBUTING.md) | README -> Contributing -> linked documentation/template authorities |
| Use the solution whiteboard | [Draft whiteboard](solution-whiteboard.md), pending acceptance | Reviewed project entry point -> manifest -> empty whiteboard |
| Start implementation | [Registry](project-contracts.md), pending acceptance | Approved development policy -> workflow/plan -> context receipt -> change/tests |
| Review a PR | `.github/pull_request_template.md` and Documentation Quality Policy | Governing contracts -> attention map -> complete diff -> gates -> self/fresh/human review |
| Operate/respond | CI workflow and documentation-policy failure handling | Failed gate -> evidence/classification -> responsible authority -> correction |
| Continue AI/human handoff | This manifest | Control state -> freshness/gaps -> current handoff -> review evidence |

Inbound references: approved README and Contributing link this manifest;
batch AGENTS/registry/trigger also link it. Draft presence does not imply activation.

## 8. Enforcement and evidence

### Current B01 enforcement

The B01 candidate corrects G-01: canonical `npm run docs:all` now applies the
narrow runtime exclusion and passed Markdown, structure, lifecycle, Mermaid,
and 58 tests. External links: 35 checked, zero advisory failures. Exact file
inventory, commands, limitations, and round results are in the
[B01 review ledger](reviews/ADOPTION-B01-S01.md). These are local results;
hosted CI and reviewed merge remain outstanding. The symbolic main-label
runtime-validator mismatch remains unresolved until approved runtime handoff.

### Historical discovery and bootstrap enforcement

The following gate map and observations describe the pre-B01 baseline. Its
runtime-scan failure was corrected in the pending B01 candidate above; retained
historical commands/results do not describe current execution.

The applicable bootstrap documentation gate is the locked blocking suite. Its
content scans exclude only installer-owned `.sdd-runtime`, as required by the
documentation policy for an adopting project. The unmodified aggregate command
currently scans that machine-local runtime and is retained as classified
failure evidence. Discovery verifies the following project-owned gates.

| Gate | Project command/workflow | Trigger | Blocking/advisory | Owner | Evidence |
| --- | --- | --- | --- | --- | --- |
| Documentation | `npm run docs:all` / documentation-quality workflow | Markdown, config, tooling, dependency, workflow changes | Blocking, with `G-01` during installed-runtime use | Playbook maintainers | Policy Sections 3 and 7; CI workflow |
| Unit/contract | `node --test tests/*.test.mjs` within `docs:all` | Checker, lifecycle, installer, and contract changes | Blocking | Playbook maintainers | 57 tests passed on A02 candidate |
| Integration/E2E | Installer subprocess/Git/filesystem lifecycle tests exist in `tests/`; no deployed product service | Executable-tooling changes; exact level and real/mock boundaries await `G-07` policy decision | Existing regression suite blocking; no product-service E2E claim | Playbook maintainers | Test inventory; `G-07` |
| Performance/accuracy | Risk-specific semantic review; no performance contract exists | Methodology or tooling claim changes | Semantic blocking where applicable | Playbook maintainers | Documentation policy Sections 2 and 9 |
| PR/review | PR template, exact-candidate self-review, two fresh-context reviewers, human review | Every material repository change | Blocking | Repository maintainer | PR template and documentation policy |

Failure-triage authority: [Documentation Quality Policy Section 8](../../docs/documentation-quality-policy.md#8-failure-handling-and-exceptions).

Shared workflow/dependency provenance and immutable revision: `package-lock.json`
plus fully pinned GitHub Actions; playbook revision
`d213114f99dc2186d6f4e50a85fe962de0e1afa9`.

Historical bootstrap gate commands and results for `ADOPTION-A01-R05`:

```text
npm ci --ignore-scripts
PASS: 235 packages installed; 0 vulnerabilities

./node_modules/.bin/markdownlint-cli2 '**/*.md' '!node_modules/**' '!.sdd-runtime/**'
PASS: 0 issues

node scripts/documentation-quality.mjs check --root . --exclude .sdd-runtime
PASS: links, anchors, fences, placeholders, secrets, and paths OK

node scripts/sdd-lifecycle.mjs check --root .
PASS: SDD lifecycle invariants OK

node scripts/check-mermaid.mjs
PASS: Mermaid syntax OK

node --test tests/*.test.mjs
PASS: 57 passed, 0 failed

git diff --check
PASS: no tracked-diff whitespace errors; this command did not cover untracked
adoption files. R02 adds an exact-file check below.
```

Discovery R03 uses the same Markdown, structure, lifecycle, Mermaid, and Node
test commands above with Node.js 24 and the existing locked dependencies.
Each untracked adoption file additionally receives this whitespace check:

```bash
git diff --check --no-index /dev/null .github/spec-driven-delivery/project-adoption-manifest.md
git diff --check --no-index /dev/null .github/spec-driven-delivery/reviews/ADOPTION-A01-S01.md
git diff --check --no-index /dev/null .github/spec-driven-delivery/reviews/ADOPTION-A02-S01.md
```

R03 results are recorded with its immutable blob in the discovery session
ledger. Plain `git diff --check` is supplementary tracked-file evidence only.

Classified integration evidence:

- `npm run docs:all` without the policy-required runtime exclusion fails the
  structure step on three machine-local paths in `.sdd-runtime/agent-guide.md`.
- `./install-sdd.sh --validate` reports `STALE_RUNTIME` because the generated
  guide records requested revision `main` while the new manifest correctly
  pins the guide's identical resolved revision. Source, checkout, target base,
  and manifest revisions otherwise resolve to the same full commit.

### 8.1 Adoption action control

| Action ID | Target/output | Review mode | Mode authority | Required gates | Automation boundary | Semantic decision? | State |
| --- | --- | --- | --- | --- | --- | --- | --- |
| `ADOPTION-A01` | Bootstrap manifest | `EXPLICIT_REVIEW` | Pinned adoption runbook | Locked blocking suite with `.sdd-runtime` excluded from content scans | `Not applicable` | `NO` | `COMPLETE` |
| `ADOPTION-A02` | Bounded repository discovery | `EXPLICIT_REVIEW` | Pinned adoption runbook | Locked blocking suite with `.sdd-runtime` excluded from content scans | `Not applicable` | `YES` | `COMPLETE` |
| `ADOPTION-A03` | Correct stale README self-adoption statement | `EXPLICIT_REVIEW` | A02 approval and freshness register | Documentation suite | `Not applicable` | `YES` | `COMPLETE` |
| `ADOPTION-A04` | Contributor entry point, routing 0 | `EXPLICIT_REVIEW` | A02 routing and A03 human approval | Documentation suite | `Not applicable` | `YES` | `COMPLETE` |
| `ADOPTION-B01` | Remaining installation package | `EXPLICIT_REVIEW` | Explicit owner batch authority | Canonical documentation suite and two reviewers | One final human acceptance | `YES` | `ACTIVE` |

### 8.2 Automation audit ledger

No automatic action has run.

## 9. Pilot delivery

The first owner-supplied need is WB38, admitted after verified installation.
Its [whiteboard](solution-whiteboard.md) is CONCLUDED and owner accepted.
The [workflow](deliveries/WB38/workflow.md) owns current delivery preparation;
the [scoped live trial](live-trial.md) permits one provisional planning package.
Pilot execution and activation evidence are NOT_STARTED. Adoption remains
INSTALLED, not ACTIVE; neither draft presence nor planning approval proves a
completed pilot. Earlier installation-only routing below is historical.

## 10. Adoption review

### Attention map

The complete attention map is near the beginning of this manifest so reviewers
see the outcome, scope, risks, evidence, and reading order before the detailed
record.

### Review rounds

Self-review subject: `.github/spec-driven-delivery/project-adoption-manifest.md`
at immutable candidate version `ADOPTION-A01-R05`, based on target revision
`d213114f99dc2186d6f4e50a85fe962de0e1afa9`.

Allowed scope: the bootstrap manifest as the immutable reviewed subject, plus
the append-only session record as publication evidence outside the candidate.
The complete two-file diff and their boundary were inspected. Governing inputs:
the pinned Project Adoption Runbook, manifest template, adoption trigger,
repository Contributing guide, Documentation Quality and Testing Policy, and
Template Governance. Reviewing agent: Codex authoring agent. Reviewed at:
`2026-09-05 Asia/Shanghai`.

| Material change | Governing statement | Why / expected effect | Evidence | Risk / non-scope |
| --- | --- | --- | --- | --- |
| Bootstrap control and provenance | Adoption Runbook Steps 1-2 | Pin source and target before discovery | Runtime and Git revision verification | Symbolic-label validator defect remains classified |
| Scope and authority boundary | Adoption skill Execution 3; repository policies | Permit only the manifest and preserve current authority | Complete diff inspection | No routing, policy, need, or approval inferred |
| Review and handoff state | Adoption skill Execution 9-13 | Fail closed at explicit bootstrap review | Blocking suite and embedded state | Human approval remains mandatory |
| Review finding corrections | Fresh-context protocol Sections 1.1, 5, and 7 | Preserve exact receipts outside the immutable manifest candidate and address all findings | [Session record](reviews/ADOPTION-A01-S01.md) | Same reviewers must verify `R05` |

Self-review checks completed: all material changes map to governing statements;
the manifest is the sole immutable candidate and the complete two-file change
is within the evidence scope; links, states, terms, scope, and evidence were
checked; no sensitive data or raw machine-local runtime path is in the project
artifacts; non-applicable product-code impacts remain outside this
bootstrap; and unresolved review authority remains explicit.

Finding: the unmodified `npm run docs:all` scans installer-owned
`.sdd-runtime` and reports its required machine-local paths. Classification:
project-check integration gap, non-blocking for this candidate because the
documentation policy prescribes excluding `.sdd-runtime` for adopting-project
content scans. The action-scoped locked blocking suite with that narrow
exclusion passed.

Self-review result: `SELF_REVIEW_PASSED`. This is review evidence only and does
not approve the artifact or authorize discovery.

Historical bootstrap review session control (terminal summary):

| Field | Value |
| --- | --- |
| Review session ID | `ADOPTION-A01-S01` |
| Subject and base | This manifest; base `d213114f99dc2186d6f4e50a85fe962de0e1afa9` |
| State | `CLOSED`; agents and human approved R05, see authoritative bootstrap ledger |
| Assigned reviewers | `R1 adoption_a01_r1`; `R2 adoption_a01_r2` |
| Required approvals | `2` |
| Approved reviewers | `adoption_a01_r1`; `adoption_a01_r2`; matching R05 blob in ledger |
| Current candidate | `ADOPTION-A01-R05` manifest only; session record is publication evidence |
| Current round | `R05` |
| Replacement history | `None` |

Round `R01` receipts both attested `FRESH_CONTEXT`, verified candidate
`ADOPTION-A01-R01` with Git blob
`b5c547ce5406d752f74fc8ec9696b2705bc99995`, and returned
`CHANGES_REQUESTED`.

Complete immutable `R01` findings and appended author responses:

| Finding ID | Location | Governing statement | Expected | Observed | Impact/severity | Requested correction | Author response and revision | Reviewer disposition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ADOPTION-A01-S01-R1-F01` | Manifest Section 1, line 11; Section 10 lines 177-185; Section 12 line 244 | Adoption Runbook Section 4 requires recording the target repository before editing; Step 1 requires pinning both roots. Manifest template Section 1 requires the canonical project name/link. Documentation policy Section 2.5 requires verified project names and evidence. | `Project / repository` identifies the actual target checkout, and provenance/self-review claims agree with verified Git state. | The target checkout's `origin` is `https://github.com/Orientation-CD/`<!-- zero-width canonical-URL split -->`spec-driven-delivery-playbook.git`, but the manifest identifies `hhhhhusky777/spec-driven-delivery-playbook`, duplicating the separate playbook-source repository. It nevertheless claims target provenance was verified. | Blocking: the durable record points reviewers and future adoption actions at a different repository, making target identity and authority ambiguous. | Correct the target project/repository identity to the verified canonical target, or record authoritative evidence explaining why a different canonical target applies; reconcile affected provenance and self-review claims. | `ACCEPT`: `ADOPTION-A01-R02` distinguishes the README/regression-defined transferred canonical repository from the checkout's verified legacy pre-transfer `origin` and makes maintainer confirmation explicit. | `RESOLVED` by R1 in `R02` |
| `ADOPTION-A01-S01-R1-F02` | Manifest Section 12, line 245, compared with Section 1 lines 34-36 and Section 10 lines 187-195 | Documentation policy Sections 2.1 and 2.3 require truthful evidence and internally consistent states; the manifest template requires completed and outstanding evidence to be recorded accurately. | The handoff distinguishes completed gates/self-review from the remaining two fresh-context approvals and human approval. | `Evidence still required` lists the blocking documentation gate and author self-review, while the same candidate records `SELF_REVIEW_PASSED` and says the action-scoped blocking suite passed. | Blocking: the next agent or maintainer cannot determine which gates are complete from the durable handoff. | Reconcile the handoff with the exact gate and self-review evidence, leaving only genuinely outstanding review evidence. | `ACCEPT`: `ADOPTION-A01-R02` records exact gate results under completed evidence and leaves only agent re-review and human review outstanding. | `RESOLVED` by R1 in `R02` |
| `ADOPTION-A01-S01-R1-F03` | Manifest Section 10, line 218, compared with Section 1 lines 13 and 45-46 | The manifest template constrains final disposition to documented review outcomes; the runbook and documentation policy require clear, consistent lifecycle and blocker states. | The review disposition uses a defined value consistent with `DISCOVERY`, `Current blocker: None`, and the pending-review next action. | The candidate invents `BLOCKED_PENDING_REVIEW` while recording no current blocker and treating review as the normal next action. | Blocking: downstream readers cannot tell whether adoption is actually blocked or simply awaiting its required review gate. | Replace the undefined disposition with the applicable documented review state and keep blocker/next-action fields consistent. | `ACCEPT`: `ADOPTION-A01-R02` uses `CHANGES_REQUESTED`, keeps current blocker `None`, and identifies same-seat re-review as next. | `RESOLVED` by R1 in `R02` |
| `ADOPTION-A01-S01-R2-F01` | Manifest lines 3-5 and 218 | Manifest template Section 10 limits Final disposition to `APPROVED`, `CHANGES_REQUESTED`, `BLOCKED`, or `EXAMPLE_REVIEWED`; Documentation Quality Policy Sections 2.1 and 2.3 require truthful review claims and consistent lifecycle terms. | The bootstrap candidate should describe adoption as in progress and use a canonical disposition consistent with `DISCOVERY`, `Current blocker: None`, and pending review. | The introduction says this records “the reviewed adoption,” while no review is complete, and Final disposition uses the undefined value `BLOCKED_PENDING_REVIEW`. | Blocking: the manifest overstates review status and introduces a noncanonical lifecycle value that downstream readers or tooling cannot interpret reliably. | Describe the in-progress adoption truthfully and use a permitted disposition reconciled with the control and handoff state. | `ACCEPT`: `ADOPTION-A01-R02` removes the reviewed-adoption claim and uses `CHANGES_REQUESTED`. | `RESOLVED` by R2 in `R02` |
| `ADOPTION-A01-S01-R2-F02` | Manifest lines 31, 131-142, 187-192, and 244-245 | Manifest template Sections 1, 8, 10, and 12 require commands/evidence and consistent completed-versus-required handoff data; Documentation Quality Policy Sections 2.1, 2.3, 2.5, 8, and 9 require traceable evidence and cross-document consistency. | Durable evidence should identify the exact action-scoped commands/results or a stable evidence link, and completed gates/self-review should appear under Evidence completed rather than Evidence still required. | The manifest reports the locked suite and self-review as passed without exact commands/results or a durable evidence link, while the handoff still says both remain required and lists only revision verification as completed. | Blocking: a later reviewer cannot reconstruct the asserted gate result, and the authoritative handoff contradicts the review section. | Record exact commands/results or durable evidence references, reconcile the completed-evidence field, and leave only genuinely outstanding review/human gates under Evidence still required. | `ACCEPT`: `ADOPTION-A01-R02` records the portable command set, exact results, classified failures, and corrected handoff. `ADOPTION-A01-R03` makes the Markdown command self-contained and adds the supplied `git diff --check` result. | `OPEN` after R2 `R02`; pending `R03` |
| `ADOPTION-A01-S01-R2-F03` | Manifest lines 155-161 | Documentation Quality Policy Section 2.6 requires an applicable attention map near the beginning that identifies outcome/scope, changed obligations, blockers/questions/risks/exceptions, reviewer specialties, and a linked reading order/evidence path. | The map should provide all required navigation near the beginning of this multi-state governance artifact. | The map appears late in Section 10, contains only three focus rows, lacks an explicit outcome/scope entry, omits blockers/questions/risks/exceptions, and gives neither a reading order nor direct canonical/evidence links. | Blocking reviewability gap: the map does not satisfy the mandatory two-pass semantic-review input. | Move or add the concise map near the beginning and include every required category with direct section/evidence links and reading order. | `ACCEPT`: `ADOPTION-A01-R02` adds the required early map and directs Section 10 readers to it. | `RESOLVED` by R2 in `R02` |

Round `R02` receipts both attested `FRESH_CONTEXT`, verified candidate
`ADOPTION-A01-R02` with Git blob
`da53c1ee0ca64549d80f3a77d76be7a4df08c60a`, and returned
`CHANGES_REQUESTED`.

| Finding ID | Location | Governing statement | Expected | Observed | Impact/severity | Requested correction | Author response and revision | Reviewer disposition |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `ADOPTION-A01-S01-R1-F04` | Manifest Section 10, lines 254-266 | Fresh-context protocol Section 5 requires the original agent to append the exact receipt without semantic rewriting and preserve each finding's location, governing statement, expected and observed results, impact, requested outcome, author response, resolution revision, and reviewer disposition. Adoption skill Execution 10 imposes the same immutable per-round history. | The durable session history contains the complete R01 receipts or complete verbatim finding rows, followed by explicit author responses and R02 dispositions. | R02 records only a shared receipt summary and a condensed four-column table. It omits each finding's location, governing statement, expected result, observed result, impact/severity, and complete original wording; the requested corrections are paraphrased. | Blocking: the durable record cannot reconstruct what each reviewer found or verify that the author response addresses the original finding, defeating the immutable audit-history requirement. | Restore the complete R01 receipts without semantic rewriting, or preserve every original finding field and wording in the durable session record, then append-not replace-the author responses and later dispositions. | `ACCEPT`: `ADOPTION-A01-R03` restores every original `R01` finding field and wording, retains the author responses, and appends `R02` verification history. | `OPEN` pending R1 `R03` |
| `ADOPTION-A01-S01-R1-F05` | Manifest Section 10 and Section 12 | Fresh-context protocol Section 5 requires exact receipts in an append-only stable session record; adoption skill Execution 10 requires immutable per-round evidence; documentation policy Sections 2.1 and 2.3 require truthful, consistent evidence claims. | Both complete `R02` receipts are preserved without changing the manifest candidate they reviewed. | `R03` stores a shared summary instead of both complete receipts while claiming complete receipts are recorded. | Blocking: the durable session cannot reproduce `R02`, and receipt publication inside the manifest perpetually invalidates that manifest candidate. | Append both exact `R02` receipts without semantic rewriting in the protocol-defined stable session record and reconcile the evidence claim. | `ACCEPT`: `ADOPTION-A01-R04` links the append-only [session record](reviews/ADOPTION-A01-S01.md), which preserves complete receipts separately from the reviewed manifest candidate. | `OPEN` pending R1 `R04` |

R1 `R02` resolved `R1-F01` through `R1-F03`. R2 `R02` resolved `R2-F01`
and `R2-F03`; it kept `R2-F02` open because the recorded Markdown invocation
depended on an unstated `PATH` modification and omitted `git diff --check`.
`ADOPTION-A01-R03` records the self-contained local-binary invocation and the
missing check above.

The append-only [session record](reviews/ADOPTION-A01-S01.md) is authoritative
for complete receipt text and round-by-round disposition history. It is review
publication evidence outside the immutable manifest candidate, so appending a
receipt does not change the subject that the receipt approves.

Bootstrap candidate `ADOPTION-A01-R05` was approved by both assigned reviewers
and the repository owner. The authoritative session record preserves the exact
receipts and human decision.

### Historical discovery self-review

Self-review subject: `.github/spec-driven-delivery/project-adoption-manifest.md`
at immutable candidate version `ADOPTION-A02-R03`, based on target revision
`d213114f99dc2186d6f4e50a85fe962de0e1afa9`.

Allowed scope: the manifest is the sole immutable reviewed subject. The
append-only discovery session record is publication evidence outside the
candidate. Governing inputs: the pinned `docs/project-adoption-runbook.md`,
`templates/adoption/project-adoption-manifest.md`,
`templates/adoption/agent-adoption-trigger.md`,
`templates/policies/development-policy.md`,
`templates/testing/test-strategy.md`,
`templates/policies/pull-request-policy.md`, and
`templates/policies/specialized-policy.md`, plus current
repository authorities, configuration, tests, CI, and dependency automation.
Reviewing agent: Codex authoring agent. Reviewed at: `2026-09-05 Asia/Shanghai`.

| Material change | Governing statement | Why / expected effect | Evidence | Risk / non-scope |
| --- | --- | --- | --- | --- |
| Repository inventory and unknowns | Adoption Runbook discovery and authority mapping | Establish verified facts before routing | Target-base inspection summarized in Section 4 | Hosted settings and external obligations remain maintainer-owned unknowns |
| Routing and policy conformance proposals | Manifest template routing and policy-audit requirements | Give every applicable capability one explicit proposed disposition | Sections 5-7 with dependencies, owners, and YAGNI rationale | Proposals have no authority before review |
| Freshness and enforcement gaps | Documentation policy freshness and gate rules | Expose the stale README claim and runtime-scan mismatch | Freshness register, `G-01`, and action-scoped gate results | No README, package, CI, or policy file changed |
| Review corrections | Fresh-context findings R1-F01 through R1-F04 and R2-F01 through R2-F03 | Correct attention coverage, canonical ownership, test routing, historical/current review state, input paths, and untracked whitespace evidence | Author dispositions in discovery ledger; exact-file checks above | All dispositions await the same reviewers' verification |
| Review boundary and handoff | Adoption skill review and state-transition rules | Freeze one discovery candidate and fail closed before `MAPPED` | This self-review and Section 12 | No downstream artifact or lifecycle transition is authorized |

R03 self-review also verifies that G-01 through G-07 are contiguous rows in
one Markdown table, addressing R1-F05 and R2-F04 without changing their content.

Self-review checks completed: each material discovery claim maps to inspected
repository evidence; every applicable routing row records a decision, owner,
dependency, and proposed state; unknown hosted or external authority is not
inferred; non-applicable product runtime policies are justified from repository
scope; stale and missing artifacts are identified without editing them; the
manifest-only candidate boundary avoids receipt publication changing the
reviewed subject; and the action-scoped blocking suite passed.

The unmodified aggregate `npm run docs:all` gap remains `G-01`: it scans
installer-owned `.sdd-runtime`. This candidate uses the policy-required narrow
exclusion and does not claim that the aggregate command is clean.

Self-review result: `SELF_REVIEW_PASSED`. This does not approve the routing
proposals or advance the adoption state.

Historical discovery review session control (terminal summary):

| Field | Value |
| --- | --- |
| Review session ID | `ADOPTION-A02-S01` |
| Subject and base | This manifest; base `d213114f99dc2186d6f4e50a85fe962de0e1afa9` |
| State | `CLOSED`; both R03 reviewers and repository owner approved |
| Assigned reviewers | `R1 adoption_a02_r1`; `R2 adoption_a02_r2` |
| Required approvals | `2` |
| Approved reviewers | `adoption_a02_r1`; `adoption_a02_r2` |
| Current candidate | `ADOPTION-A02-R03` manifest only; session record is publication evidence |
| Current round | `R03` |
| Replacement history | `None` |

The A02 ledger preserves both exact R03 approvals and the owner's approval
of `DISCOVERY -> MAPPED`.

### Installation checklist

- [x] Source and target revisions are pinned.
- [x] Repository inventory and authority mapping are verified.
- [x] Every applicable capability has an approved routing decision.
- [ ] Gaps, deviations, exclusions, and conflicts have dispositions.
- [ ] Project-local navigation exposes canonical contracts without duplication.
- [ ] Required project gates pass with linked evidence.
- [ ] An empty solution whiteboard can resolve every source without hidden chat context.
- [ ] Authorized project reviewers approve `MAPPED -> INSTALLED`.

### Activation checklist

- [ ] A real bounded pilot has reviewed evidence.
- [ ] Rollback, update owner, and next review trigger are recorded.
- [ ] Authorized project reviewers approve activation.

Latest completed discovery disposition: `APPROVED` on A02 R03 by both
reviewers and the repository owner. A03 R02 was approved by both agents and the owner; A04 R01 approved by both agents and owner; B01 final disposition pending.

Activation authority: Repository maintainer approval after the required
adoption evidence exists.

## 11. Rollback, updates, and drift

Last approved project authorities to preserve: [Contributing](../../CONTRIBUTING.md),
[Documentation Quality and Testing Policy](../../docs/documentation-quality-policy.md),
[Template Governance](../../docs/template-governance.md), the pull-request
template, and the documentation-quality workflow.

Rollback/correction procedure: Revert only reviewed adoption artifacts through
the repository's pull-request process; preserve the pre-adoption authorities.

Update owner and cadence/triggers: Playbook maintainers; use the reviewed
upgrade workflow after installation.

## 12. Current handoff

### Historical A03 handoff and self-review

The following snapshot is retained from the approved A03 candidate. Its pending
review and STALE statements describe that earlier boundary; the current A04
handoff follows it.

| Field | Value |
| --- | --- |
| Current adoption state | `MAPPED` |
| Current artifact/action | `ADOPTION-A03-R02` README freshness correction |
| Next dependency-ready action | Two new assigned A03 seats review the exact README and manifest candidate |
| Blocker/unblock condition | None; normal explicit review pending |
| Evidence completed | A02 R03 agent and human approval recorded; runtime binding verified; A03 self-review and action-scoped checks recorded in A03 ledger |
| Evidence still required | Two A03 matching approvals followed by human review |
| Decisions since last review | Record authorized MAPPED transition; replace stale README progress claim with a link to this manifest |
| Files/changes to preserve | Existing authorities; all files outside README correction, manifest bookkeeping, and append-only review evidence |

### A03 self-review

R02 self-review verifies the live attention and registry summaries agree with
A02 approval while preserving open installation work and historical records.

Candidate `ADOPTION-A03-R02` comprises README and this manifest. The A03 ledger
is publication evidence outside the candidate and records their immutable
hashes. Self-review result: `SELF_REVIEW_PASSED`.

| Change | Governing source | Verification and scope |
| --- | --- | --- |
| Stable README navigation | Adoption skill Step 7; runbook Step 4; quality policy Sections 2.3-2.6 | Replaced the stale no-manifest statement with a link to the live manifest; retained first-need approval boundary and existing authority paragraph |
| MAPPED transition and routing state | Owner's A02 R03 approval in A02 ledger | Recorded actual approval; routing approval does not choose missing values or close project gaps |
| Handoff and freshness | Manifest template Sections 5, 8, 10, 12 | A03 alone active; README stays STALE pending approval; no empty whiteboard or other installation artifact created |
| Evidence | Quality policy Sections 3, 8, 9 | Complete two-file change inspected; action-scoped checks and no-index whitespace evidence recorded with exact hashes in A03 ledger |

Governing inputs remain the pinned runbook, manifest and trigger templates,
fresh-context protocol, and active README, Contributing, documentation-quality
policy, and Template Governance. No automatic action ran. After A03 approval,
the next dependency-ready work is routing 0 in Contributing.

### Historical A04 handoff

| Field | Value |
| --- | --- |
| Current adoption state | `MAPPED` |
| Current artifact/action | `ADOPTION-A04-R01` contributor entry point |
| Next dependency-ready action | Two assigned A04 seats review Contributing and manifest together |
| Blocker/unblock condition | None; normal explicit review pending |
| Evidence completed | A03 agent and human approval; README CURRENT; runtime verified; A04 self-review and checks in A04 ledger |
| Evidence still required | Two matching A04 approvals, then human review |
| Decisions since last review | Add stable contributor navigation to manifest and existing setup/delivery instructions |
| Files/changes to preserve | Approved README, existing contributor rules, all unrelated repository files |
| Freshness impact | No additional stale dependent identified; new contributor section awaits review |

### Historical A04 self-review

Candidate `ADOPTION-A04-R01` comprises Contributing and this manifest. The A04
review ledger is publication evidence outside the candidate and records their
exact blobs. `SELF_REVIEW_PASSED`: inspected complete two-file scope, canonical
links, current versus historical states, and required checks.

| Material change | Governing statement | Verification |
| --- | --- | --- |
| Contributor navigation | Approved routing 0; adoption runbook Step 4 and Section 7 | Links live manifest, existing setup instructions, and future-need procedure without duplicating volatile status |
| Authority and start boundary | Contributing; quality policy Sections 1 and 2; generated guide | Existing contributor rules remain; new section directs adoption to manifest next action and retains the approved empty-whiteboard boundary |
| A03 completion and freshness | Owner approval in A03 ledger; adoption skill Step 7 | README CURRENT; A03 complete; A04 alone active; open policy decisions and project gaps preserved |
| Evidence | Documentation Quality Policy Sections 3 and 9 | Exact-file checks cover untracked manifest; tracked checks cover Contributing; complete suite evidence in A04 ledger |

No automatic action ran. After A04 approval, routing 1 updates the existing
contributor authority with project development decisions. No empty whiteboard
exists; installation is not complete.

### Historical B01 preparation handoff

| Field | Value |
| --- | --- |
| Current adoption state | MAPPED |
| Current artifact/action | ADOPTION-B01 remaining installation batch |
| Next dependency-ready action | Canonical full checks, exact self-review, two fresh-context reviews, then single final owner acceptance |
| Blocker/unblock condition | No preparation blocker; hosted protection absent and final acceptance pending |
| Evidence completed | Owner directions recorded; canonical origin updated; hosted settings inspected; draft package prepared; canonical docs:all passed 58/58; external links 35/35; exact inventory and self-review in B01 ledger |
| Evidence still required | Two matching current-round approvals; final human acceptance and explicit publication/merge authority; reviewed merge and target verification; subsequent workflow-runtime handoff |
| Freshness | README and Contributing entry point approved; new/changed batch policies remain proposed; no accepted downstream delivery exists |
| Empty whiteboard | Draft EMPTY instance exists under batch authority; not available for need intake |
| Activation | Final acceptance plus reviewed merge and target verification precede INSTALLED; real pilot still required for ACTIVE |

The latest handoff above supersedes historical snapshots. Read the
[batch index](installation-batch.md) for decisions, runtime boundary, and hosted
limitations. Per-artifact human stops are replaced only by this owner's
explicit batch instruction; independent review and final human authority remain.

### Final installation handoff

| Field | Value |
| --- | --- |
| Current adoption state | INSTALLED; not ACTIVE |
| Authority | Both B01 R03 reviewers approved all selected artifacts including neutral EMPTY whiteboard; owner accepted and authorized merge and installation completion |
| Merge evidence | Installation PR merged as 3b4fb91150469e01d5b5b283d08f62a880683853; synchronized target has the identical reviewed package |
| Gates | PR blocking documentation checks passed; target documentation workflow passed; local canonical docs:all passed 58/58 before publication |
| Freshness and gaps | All applicable B01 inventory entries CURRENT; package acceptance resolves installation policy/navigation gaps; upstream symbolic-label validator defect remains tracked but does not affect the replacement pinned workflow runtime |
| Residual limitations | Hosted main protection absent and manually enforced as accepted; no pilot performed |
| Whiteboard | Approved EMPTY; no need, handoff, plan, or delivery inferred |
| Allowed remaining work | Control-only state/evidence reconciliation, its PR/checks, and owned-runtime replacement at the unchanged manifest pin |
| Runtime evidence | Owned adoption checkout cleaned; replacement detects INSTALLED, selects sdd-project-workflow, preserves the manifest pin; install-sdd.sh --validate reports CURRENT |
| Next action | Complete control publication, then await the owner's first need through the verified workflow runtime |

All installation checklist obligations are satisfied by the accepted package,
reviewed merge, and target checks. Earlier unchecked installation boxes are
retained as candidate history. ACTIVE still requires a real reviewed pilot.

### Current first-delivery route

The owner accepted WB38-R03 and authorized the following work to trial its
concluded design. Continue through the [WB38 workflow](deliveries/WB38/workflow.md)
under the [explicit scoped authority](live-trial.md). This supersedes the
installation handoff's waiting-for-first-need next action, without rewriting
its accepted evidence or changing the runtime pin. The workflow owns current
planning gaps, dependency versions, write targets and the next review boundary.

### WB38 closure candidate

WB38 final validation was owner-approved and merged through PR53 as
`c6c5ff3afc99bc228ccae8afd14582ffef8441ca`. The owner authorized the bounded
archive/reset mechanics. The [archived conclusion](archive/WB38/solution-whiteboard.md),
[delivery record](deliveries/WB38/record.md), completed workflow/plan and fresh
neutral EMPTY working path form one control-only publication candidate. Until
that package passes review, hosted checks, owner acceptance and merge, the
published main branch remains authoritative. Adoption remains INSTALLED, not
ACTIVE; runtime pin and checkout remain unchanged.
