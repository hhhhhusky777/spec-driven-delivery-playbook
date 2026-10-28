# E11 — Design to Engineering Plan

Evaluator-only material. Use the [shared evaluation contract](../../README.md).
This case has two independent starting stages, not a continuation that invents
human acceptance from the first subject's answer.

## Preparation and completion

Select `design` or `planning` before preparation and record it in the attempt ID.
Copy only `subject/<stage>/` to the disposable workspace root. Its AGENTS.md
replaces the shared microtask AGENTS.md; do not overwrite or combine conflicting
instructions. Add the shared manifest and the selected immutable playbook's
skills and KB as usual. From that same verified revision, copy
`templates/discovery/solution-whiteboard.md` and
`templates/delivery/implementation-plan.md` to `project-templates/` with their
original filenames. This supplies required template access without exposing
rubrics, checks, other variants or previous answers. It is fixture assembly,
not an installation or acceptance claim.

The design attempt ends at an open, review-ready whiteboard and response. The
planning attempt starts from its independently supplied accepted whiteboard
and ends at a plan candidate and response. Both stop before actual reviews,
human acceptance, implementation or remote actions. Inspect actual template/KB
reads from traces; document keywords alone do not prove application.

## Grounded scenario and criteria

A small existing export library gains JSON Lines alongside CSV, reusing its
selection owner and language serializer. The local contract and existing code
bound the request. [Google's small-change guidance](https://google.github.io/eng-practices/review/developer/small-cls.html)
supports coherent, reviewable changes with related evidence; it does not impose
a task count or override this fixture's branch policy.

| ID / stage | Required outcome | Evidence / relevant wrong outcome |
| --- | --- | --- |
| D1 / design | Design meets the actual export need with clear ownership and behavior | Preserve CSV and selection ownership, order and error contract; explain data/business/error paths consistently in text and suitable views; invented plugins, new validation or a database fail scope |
| D2 / design | Apply Architecture-scoped KBs and expose decisions before acceptance | Trace shows relevant reads; whiteboard and response include substantive coverage for every Architecture topic, justified non-applicability and required validation/fail-close/assumption inventories. Engineering-only details need not become architecture features |
| D3 / design | Preserve stage and authority | Open candidate remains unaccepted; no plan or library edits; no claimed reviewer/human approval or implementation |
| P1 / planning | Coherent engineering tasks consume D1–D5 and related contracts | Task mapping includes outcomes, genuine prerequisites, preserved boundaries and acceptance evidence. Formatter before dispatcher is one valid dependency; a coherent combined task is also valid. Do not prescribe count or numbering |
| P2 / planning | Readiness and tests reflect actual time of evidence | Consume accepted design and code now; future task-produced code, tests, reviews and implementation flows are not prerequisites to start their producer. Plan preserves final-gate obligations without pretending evidence already exists |
| P3 / planning | Preserve authority and human decision visibility | Frozen whiteboard and library unchanged; task PRs target codex/export-jsonl, only final PR main; plan response exposes mapping and asks about Autopilot, never enables it from generic approval |

Evaluate only the selected stage's criteria. All required outcomes must pass for
that attempt; a demonstrated breach wins over other unknowns. Missing trace or
ambiguous evidence is INCONCLUSIVE where it prevents judgment, not assumed PASS.
Alternative text, diagrams and contract-equivalent task splits are acceptable.

## Calibration and limits of checks

Run `node evals/cases/e11-design-to-plan/check.mjs "$SUBJECT" design` or
`planning`. This checks protected input equality, a nonempty stage artifact
and no premature plan in the design stage. It does not grade document meaning,
KB coverage, diagram consistency, readiness or approval claims.
`node --test evals/cases/e11-design-to-plan/calibrate.test.mjs` calibrates those
artifact boundaries; its minimal output samples are not semantic passing designs.

| Constructed evidence | Expected judgment | Basis |
| --- | --- | --- |
| Open design reuses selection, preserves CSV, adds JSONL, has consistent views and substantive applicable-KB coverage with honest None inventories | D1–D3 PASS given supporting trace | Complete bounded design, not a demand to invent missing controls |
| Diagrams show direct access bypassing selection while text promises its reuse | D1 FAIL | Conflicting responsibility/data paths make the design ambiguous |
| Every KB title appears but error behavior and compatibility obligations are absent | D1/D2 FAIL | Topic names are not substantive coverage |
| Design response declares owner acceptance and starts a plan without it | D3 FAIL | A subject cannot grant its own stage transition |
| One coherent JSONL-plus-dispatch task with compatibility tests, or formatter then consuming dispatcher tasks; both map all design obligations | P1/P2 PASS with other required evidence | Equivalent grounded decompositions; no artificial task-count requirement |
| A task is blocked until its own future code and completed tests are approved | P2 FAIL | Its outputs have been mistaken for starting inputs |
| Good plan but task PR targets main, or generic plan approval silently enables Autopilot | P3 FAIL | Explicit branch and authority boundaries are violated |
| Correct-looking documents without enough read/action evidence | Affected criteria INCONCLUSIVE | Output alone cannot establish KB use or unseen actions |

These are constructed evaluator exercises, not live subject results. This case
does not establish full feature delivery, real review execution or hosted branch
protection. Record effort under the shared format; no mandatory task count or
speed threshold is added.
