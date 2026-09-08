# Implementation plan — README project guide

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority.

## Delivery status

| Field | Value |
| --- | --- |
| State | `IMPLEMENTING` |
| Active tasks | `T02` |
| Next ready task | `None` |
| Active blocker | None |
| Implementation mode | `human-review-before-merge` |
| Feature branch / target | `codex/complete-three-doc-templates` -> `main` |
| Last verified | Design accepted through owner request on 2026-09-08 Asia/Shanghai |

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| D01-D08 | T01 restores the README's introduction, nested navigation, feature explanations, diagrams, and efficiency/reliability rationale, and adds the owner-selected Apache-2.0 license | PR #72 validation, review, owner acceptance, merge, and target verification | Delivered by [#72](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/72); no gap |
| D09 | T02 restores comprehensive project, design, contract, architecture, task, validation, recovery, and completion prompts inside exactly three templates | Template responsibility assertions, lifecycle checks, full repository suite, and semantic review against removed-template responsibilities | Covered; no duplicate durable document or PR evidence |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | PR |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | `DONE` | None | README is a complete, attractive, navigable project guide consistent with the simplified playbook, with clear Apache-2.0 reuse permission | README, `LICENSE`, and required whiteboard/plan state; no runtime behavior change | Complete source documentation gate, canonical license verification, and exact-candidate review | [#72](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/72) |
| T02 | `VERIFYING` | None | The three templates retain complete applicable delivery information while preserving one owner per document | The three maintained templates and focused regression only; do not recreate removed documents or duplicate PR evidence | Responsibility coverage assertions, lifecycle/Markdown/Mermaid checks, full suite, and exact-candidate review | [#73](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/73) |

## Delivery Definition of Done

- The top of the README communicates the project value, capabilities, and
  quick-start path.
- The nested table of contents resolves to the maintained sections.
- Each major feature area has a current explanation and useful Mermaid diagram.
- Efficiency and reliability are connected explicitly without weakening gates.
- README terminology, links, diagrams, templates, skills, and policies agree.
- The repository carries the canonical Apache License 2.0 text and the README
  states the permission clearly.
- Exactly three durable templates provide complete, proportional prompts for
  project adoption, solution design, and implementation/delivery state without
  recreating redundant documents or local review history.
- The documentation audit retains necessary-complexity guidance, behavioral
  readiness calibration, honest optional efficiency observations, and
  uncertain-effect safety without restoring obsolete guides or fixed routes.
- Each independent reviewer reports whether the introduction creates interest,
  whether the complete guide is convincing enough to try, and whether any
  unclear detail would cause questions or hesitation.
- `npm run docs:all` and two isolated semantic reviews pass on the exact
  candidate; the owner reviews before merge.

## Human review brief

| Attention | Summary |
| --- | --- |
| Tasks and outcomes | T01 delivered the complete README and Apache-2.0 permission in PR #72; T02 restores complete information inside exactly three templates |
| Design consistency | D01-D11 are mapped; no unexplained task or known gap |
| Important changes | Reader-facing guidance, licensing, richer three-document templates, and compact preservation of still-valid policy outcomes; no installer or runtime behavior change |
| Validation | Markdown, internal links, lifecycle, Mermaid, whitespace, canonical Apache-2.0 match, and all 29 tests passed locally |
| Risks or open decisions | Completeness must not recreate duplicate status, prescribed internal steps, or PR evidence; no owner decision remains |
| Decision requested | Review the completed PR before merge |
