# Implementation plan — README project guide

<!-- sdd: implementation-plan -->

This is the only active-delivery state authority.

## Delivery status

| Field | Value |
| --- | --- |
| State | `IMPLEMENTING` |
| Active tasks | `T01` |
| Next ready task | `None` |
| Active blocker | None |
| Implementation mode | `human-review-before-merge` |
| Feature branch / target | `codex/readme-project-guide` -> `main` |
| Last verified | Design accepted through owner request on 2026-09-08 Asia/Shanghai |

## Design-to-task mapping

| Design point | Task and brief work | Validation | Consistency or gap |
| --- | --- | --- | --- |
| D01-D08 | T01 restores the README's introduction, nested navigation, feature explanations, diagrams, and efficiency/reliability rationale, and adds the owner-selected Apache-2.0 license | `npm run docs:all`, canonical license-text comparison, semantic comparison with project sources, and two-agent assessment of interest, willingness to try, clarity, and hesitation points | Fully mapped; no known gap |

## Tasks

| ID | State | Depends on | Outcome | Boundaries | Validation | PR |
| --- | --- | --- | --- | --- | --- | --- |
| T01 | `VERIFYING` | None | README is a complete, attractive, navigable project guide consistent with the simplified playbook, with clear Apache-2.0 reuse permission | README, `LICENSE`, and required whiteboard/plan state; no runtime behavior change | Complete source documentation gate, canonical license verification, and exact-candidate review | [#72](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/pull/72) |

## Delivery Definition of Done

- The top of the README communicates the project value, capabilities, and
  quick-start path.
- The nested table of contents resolves to the maintained sections.
- Each major feature area has a current explanation and useful Mermaid diagram.
- Efficiency and reliability are connected explicitly without weakening gates.
- README terminology, links, diagrams, templates, skills, and policies agree.
- The repository carries the canonical Apache License 2.0 text and the README
  states the permission clearly.
- Each independent reviewer reports whether the introduction creates interest,
  whether the complete guide is convincing enough to try, and whether any
  unclear detail would cause questions or hesitation.
- `npm run docs:all` and two isolated semantic reviews pass on the exact
  candidate; the owner reviews before merge.

## Human review brief

| Attention | Summary |
| --- | --- |
| Tasks and outcomes | T01 restores the complete README project-guide experience in one coherent documentation PR |
| Design consistency | D01-D08 are covered; no unexplained task or known gap |
| Important changes | Reader-facing structure and diagrams plus the owner-selected Apache-2.0 license; no installer, template, or runtime behavior change |
| Validation | Markdown, internal links, structure, lifecycle, Mermaid, whitespace, and all 28 tests passed locally |
| Risks or open decisions | None; the owner selected Apache-2.0 and the stale repository-map entries were corrected |
| Decision requested | Review the completed PR before merge |
