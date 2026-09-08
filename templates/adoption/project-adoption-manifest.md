# Project Adoption Manifest — `<project>`

<!-- sdd: manifest -->

This reusable installation contract contains no feature-specific state.

Complete only the sections that materially apply to the project. Preserve the
information needed to reuse the installation safely; omit empty ceremony and
keep feature progress in the implementation plan.

## Installation

| Field | Value |
| --- | --- |
| Project / repository | `<link>` |
| Adoption state | `DRAFT` |
| State before block | `None` |
| Playbook source repository | `<canonical Git URL>` |
| Playbook revision | `<full commit SHA>` |
| Upgrade state | `NONE` |
| Upgrade candidate | `None` |
| Adoption scope | `<repositories, components, or teams>` |
| Project adoption root | `<project-relative path>` |
| Materialization mode | `<pinned checkout or other verified mode>` |
| Target base revision | `<full commit SHA or Not applicable>` |
| Stable entry point | `<project-relative path>` |
| Adoption owner | `<owner>` |
| Required review | `<project rule>` |
| Last verified | `<date and evidence>` |

## Adoption outcome and scope

| Concern | Accepted outcome or boundary |
| --- | --- |
| Purpose | `<why the project adopts the playbook>` |
| In scope | `<repositories, teams, and delivery classes>` |
| Out of scope | `<explicit exclusions>` |
| Success signal | `<how a reusable installation is demonstrated>` |
| Rollback boundary | `<how an unaccepted candidate is abandoned safely>` |

## Canonical project authorities

| Concern | Canonical source | Applicable boundary or owner decision |
| --- | --- | --- |
| Contribution and branches | `<link>` | `<summary>` |
| Testing and validation | `<link>` | `<summary>` |
| Security and secrets | `<link>` | `<summary>` |
| Documentation | `<link>` | `<summary>` |
| Review and merge | `<link>` | `<summary>` |

### Project discovery inventory

Record the authoritative source, not a copied policy summary. Add or remove
rows in proportion to the project.

| Concern | Existing authority or evidence | Owner | Applicability / freshness |
| --- | --- | --- | --- |
| Contributor entry point | `<link or None>` | `<owner>` | `<result>` |
| Test strategy and commands | `<link or None>` | `<owner>` | `<result>` |
| Branch, PR, and review rules | `<link or None>` | `<owner>` | `<result>` |
| Documentation and API contracts | `<link or None>` | `<owner>` | `<result>` |
| CI, release, and operations | `<link or None>` | `<owner>` | `<result>` |
| Security, privacy, and compliance | `<link or None>` | `<owner>` | `<result>` |
| Data, concurrency, and performance | `<link or None>` | `<owner>` | `<result>` |
| Decisions and durable history | `<link or None>` | `<owner>` | `<result>` |

Add rows only for authorities that materially govern delivery. Canonical
sources and explicit owner decisions must agree before adoption or upgrade is
accepted.

## Stable project boundaries

| Boundary | Value |
| --- | --- |
| Protected content | `<paths or rules>` |
| Required environments | `<summary or None>` |
| External mutation authority | `<summary or None>` |
| Destructive-action authority | `<summary or None>` |
| Known project exceptions | `<links or None>` |

## Validation and enforcement

These are project gates, not the playbook source repository's own test suite.

| Gate | Project command or workflow | Applies when | Blocking or advisory | Owner |
| --- | --- | --- | --- | --- |
| Documentation | `<command or Not applicable>` | `<change class>` | `<class>` | `<owner>` |
| Unit / contract | `<command or Not applicable>` | `<change class>` | `<class>` | `<owner>` |
| Integration / end-to-end | `<command or Not applicable>` | `<change class>` | `<class>` | `<owner>` |
| Security / performance / operations | `<command or Not applicable>` | `<risk trigger>` | `<class>` | `<owner>` |
| Pull request / merge | `<workflow or policy link>` | `<boundary>` | `<class>` | `<owner>` |

## Gaps, deviations, and proportional exclusions

### Adoption or project gaps

| ID | Observed state | Required stable outcome | Owner / issue | Disposition |
| --- | --- | --- | --- | --- |
| `<ID>` | `<evidence>` | `<outcome>` | `<owner or link>` | `<open, accepted, or resolved>` |

### Playbook deviations

| ID | Playbook outcome | Project decision | Reason / tradeoff | Owner acceptance |
| --- | --- | --- | --- | --- |
| `<ID>` | `<expected outcome>` | `<adaptation>` | `<reason>` | `<evidence>` |

### YAGNI exclusions

| Candidate control | Why it is unnecessary now | Reconsideration trigger |
| --- | --- | --- |
| `<item>` | `<reason>` | `<evidence-based trigger>` |

## Adoption or upgrade human brief

| Human need | Summary |
| --- | --- |
| Acceptance scope | `<installation or reusable upgrade scope and exact candidate>` |
| Authorities discovered | `<canonical sources and owners>` |
| Policies reused or changed | `<links and concise impact>` |
| Gaps, deviations, and risks | `<items or None>` |
| Validation | `<passed, failed, and unrun project checks>` |
| Pin and runtime state | `<old/new full SHAs and activation boundary>` |
| Decision requested | `<exact owner decision>` |

The active feature, task, branch, PR, review progress, and next action never
belong in this manifest. The implementation plan owns active delivery state.
Pull requests own detailed review findings, approvals, checks, and merge
evidence.
