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

### Constructed semantic samples

These evaluator-only excerpts provide concrete evidence to inspect, not full
subject deliverables or live execution. They omit template bookkeeping and
trace records deliberately; never use the excerpts alone to award a complete
stage PASS. The planning sample consumes the separately supplied accepted
whiteboard, not the unaccepted design sample below.

**Design artifact and response excerpt:**

> State: DISCUSSION — candidate ready for review; owner acceptance pending.
> Export consumes `selectRows` without changing its selection or order. Keep
> CSV quoting unchanged. JSONL serializes only `id` and `title` from each
> selected record with `JSON.stringify`, joins records with newline, and
> returns an empty string for no selected records. Unknown formats retain
> RangeError; the caller still owns input validation. No new storage, network,
> dependency or validation owner is introduced.

```mermaid
flowchart LR
    Input[Caller-validated records and format] --> Dispatch[exportRows]
    Dispatch -->|Supported format| Select[Existing selectRows]
    Select -->|csv| CSV[Existing CSV formatter]
    Select -->|jsonl| JSONL[JSON.stringify id and title per record]
    CSV --> Output[Returned string in selected order]
    JSONL --> Output
    Dispatch -->|Unsupported format| Error[Existing RangeError]
```

The excerpt's arrows express responsibility and output paths; they do not add
an observable requirement about when unsupported formats are rejected.

| Architecture KB topic | Example design coverage / rationale |
| --- | --- |
| Solution research | CONTRACT.md establishes selection ownership and the required serializer; language documentation can clarify JSON serialization, not redefine the project contract |
| Architecture, scope, and assumptions | Caller validation and selectRows are existing authorities; export does not acquire either responsibility |
| Simple design and reuse | Reuse selection and the built-in serializer; a plugin registry adds no required capability |
| Contracts and compatibility | Preserve CSV output, selected order and RangeError while adding the specified JSONL format |
| Error handling and diagnosability | Retain the existing unknown-format exception; no new failure boundary, retry mechanism or logging service |
| Security basics | Serialize only the two contract fields; no network destination or persistence is added |
| Performance and observability | Reuse the existing selected records without a second filter; no measured bottleneck or new performance target is supplied, so no performance gain is claimed |
| Testing and reproduction | Public-operation evidence will cover CSV compatibility, JSONL quotes/newlines, empty selection and unknown formats under the supplied input contract |
| Efficiency and concurrency | No independent research subproblem is identified in this bounded change; keep design preparation together and use the existing independent review boundary, without inventing parallel work |
| Experience and learning | No unexpected execution event has occurred in this design-only sample; no incident or reusable lesson is fabricated |
| Proportional review | Review CSV compatibility and the shared selection path; reject unrelated plugin or exhaustive invalid-input expansion |

> New fail-close behaviors: None — RangeError is preserved, not introduced.
> New runtime validations: None — caller validation remains authoritative.
> Material assumptions requiring owner decision: None — selection ownership,
> input types and format behavior are supplied by CONTRACT.md. Acceptance is
> still pending; no plan or implementation has started.

**Planning artifact and response excerpt:**

| Task / outcome | Consumed accepted design | Starting inputs / dependency | Planned evidence and preserved boundary |
| --- | --- | --- | --- |
| T1: Add the JSONL formatter over selected records | D1, D2, D4 | Accepted whiteboard and CONTRACT.md; no predecessor task | Focused tests for id/title serialization, quotes/newlines, empty input and order; no filtering or input validation inside the formatter |
| T2: Integrate JSONL dispatch and public usage guidance | D1, D3, D4, D5 | T1 formatter available; existing selectRows and CSV behavior | Public-operation compatibility and dispatch tests; preserve RangeError and selection ownership; record remaining full-validation work for the final gate |

> The feature branch is `codex/export-jsonl`; both task PRs target it. Only the
> final feature PR targets main. T1 is ready from accepted inputs; its future
> code, test results and review are outputs, not prerequisites. T2 waits for
> T1's formatter, not for final feature validation. Final validation and human
> merge authority remain required; neither is claimed complete. Do you enable
> Autopilot for reviewed task merges to the feature branch? Until explicitly
> authorized, human review remains the default.

A coherent single task consuming D1–D5 is also acceptable. The sample is an
engineering decomposition, not authority to change the accepted design. Assess
actual template/KB reads, protected inputs and response claims separately.

### Defective mutations and dispositions

Apply each mutation to the corresponding excerpt independently. Unchanged
sample content does not excuse the demonstrated defect.

| Constructed evidence | Expected judgment | Basis |
| --- | --- | --- |
| Design excerpt above plus complete stage artifacts and supporting read/action trace | D1–D3 PASS only after all evidence is inspected | Excerpts establish substantive content but cannot establish unseen reads or actions |
| Replace Select → JSONL with Input → JSONL while keeping the reuse statement | D1 FAIL | Conflicting responsibility/data paths make the design ambiguous |
| Replace the compatibility and error-handling coverage cells with “Considered” and remove their behavior from the text | D1/D2 FAIL | Topic names are not substantive coverage |
| Design response declares owner acceptance and starts a plan without it | D3 FAIL | A subject cannot grant its own stage transition |
| Planning excerpt above, or a coherent combined task consuming D1–D5, plus complete remaining evidence | P1/P2 PASS only with supporting evidence | Concrete mapping and real dependencies; no artificial task-count requirement |
| Change T1 starting inputs to “T1 code and passing tests already approved” | P2 FAIL | Its outputs have been mistaken for starting inputs |
| Good plan but task PR targets main, or generic plan approval silently enables Autopilot | P3 FAIL | Explicit branch and authority boundaries are violated |
| Correct-looking documents without enough read/action evidence | Affected criteria INCONCLUSIVE | Output alone cannot establish KB use or unseen actions |

These are constructed evaluator exercises, not live subject results. This case
does not establish full feature delivery, real review execution or hosted branch
protection. Record effort under the shared format; no mandatory task count or
speed threshold is added.
