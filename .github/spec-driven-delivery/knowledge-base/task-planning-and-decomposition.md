# Task Planning and Decomposition

Scope: Engineering

- Engineering: Translate accepted design into focused task outcomes, real dependencies and acceptance evidence.

The whiteboard owns architecture and accepted behavior; the
implementation plan owns delivery tasks and state. Decomposition does not
authorize new design, scope or project policy.

## Core principles

> [!IMPORTANT]
> Give each task one complete, observable outcome within the approved design.
> Include the related implementation obligations and acceptance evidence needed
> to establish that outcome. Order tasks by actual consumed prerequisites,
> not numbering or an assumed sequence. Keep each integration result usable
> under the project's contract; do not split work into incomplete fragments
> merely to make tasks small.

## Choosing task boundaries

| Consideration | Planning judgment |
| --- | --- |
| Outcome | Name what becomes true for a consumer, operator or developer. A file list or activity such as “write code” does not explain completion |
| Cohesion | Keep changes together when they implement one behavior or must change together to preserve a contract. A task can span several files or layers |
| Size | Split when unrelated outcomes, uncertainty or review complexity obscure correctness. Keep a large but mechanical change together when further splitting adds no useful feedback; file, line and duration counts are not universal size rules |
| Completeness | Account for affected callers, configuration, documentation, compatibility and evidence where relevant. A new interface without a meaningful consumer or a hidden later repair is not a useful complete slice |
| Evidence | Define the acceptance condition and how it can be observed, including material failure behavior. Use existing tests or checks where sufficient; project testing policy owns when they run |
| Traceability | Map each task to the approved design points it delivers. Cover all accepted outcomes without adding speculative work or repeating design decisions in the plan |

Tasks need not each be independently deployable when the approved integration
model delivers the feature as a whole. They do need a meaningful intermediate
result and evidence appropriate to that result. Keep task obligations and any
authorized deferred test work in the existing plan, not a second checklist or
status document.

## Dependencies, readiness and parallel work

A dependency identifies an input another task actually produces: an accepted
contract, implementation capability, migration prerequisite or verified result.
Record that input and its producer. Shared subject matter or consecutive task
IDs alone do not establish an ordering constraint. A cycle indicates that the
proposed boundaries or prerequisites need reconsideration, not more status flags.

Readiness requires sufficient approved inputs and execution context to begin.
It must not require the task's own future output to exist before work starts.
Distinguish an input needed to begin from evidence needed to accept the result.
Resolve a material missing design decision through existing project authority;
do not fill it with an unsupported planning assumption.

For independent ready tasks, apply [Efficiency and Concurrency](efficiency-and-concurrency.md)
to judge resource interference, ownership and coordination cost. A dependency
graph permits an order; it does not itself prove parallel execution is safe or
useful. Parent coordination and integration remain necessary.

## Replanning within authority

Refine engineering task boundaries as evidence changes while preserving the
accepted design, compatibility and already-completed work. Update affected
dependencies, acceptance evidence and design mapping in the existing plan.
Changing accepted behavior or scope follows the project's design-amendment
authority; replanning is not permission to bypass review, branch policy or
human decisions.

## Examples

These illustrate boundary choices, not a required task sequence.

| Situation | Useful decomposition and rationale |
| --- | --- |
| An approved export feature offers CSV and JSON using an existing query contract | Each format can be a coherent task including its formatter, reachable caller and behavior evidence. Neither format depends on the other; parallelism still depends on ownership and resource isolation |
| Both formats require a missing shared query capability already in the accepted design | Its producing task must deliver a usable capability and evidence; the format tasks name that consumed prerequisite. Do not invent a generic framework merely to create a foundation task |
| A migration task is marked blocked until its own migration script is approved | The script is an output, not a starting prerequisite. Readiness consumes the accepted migration contract and relevant schema evidence; script review belongs to acceptance |
| A behavior change also includes an unrelated formatting sweep | Separate the sweep or omit it when unnecessary; combining them makes the behavior harder to review without improving its completeness |

## References and applicability

The shared principles are coherent changes, useful feedback, explicit scope,
observable acceptance and real dependencies. These sources use different work
item and delivery models; their templates, numerical size suggestions and
trunk/release practices do not override project authority.

If the method or applicability remains uncertain, confidence is low, or a
material engineering claim lacks support, you MUST read the relevant primary
sources. Guesses and unsupported assumptions do not resolve the uncertainty.

- [Google: Small CLs](https://google.github.io/eng-practices/review/developer/small-cls.html) — self-contained changes, related evidence, understandable consumers and a working integration result; size requires judgment.
- [DORA: Working in small batches](https://dora.dev/capabilities/working-in-small-batches/) — useful, testable increments and early feedback; independence is a planning objective, not a reason to hide genuine dependencies.
- [Microsoft: Task design review template](https://microsoft.github.io/code-with-engineering-playbook/design/design-reviews/recipes/templates/template-task-design-review/) — scope, non-goals and acceptance criteria tied to completion; use those concepts in the existing plan rather than create a design document per task.
- [Microsoft: Work item link types](https://learn.microsoft.com/en-us/azure/devops/boards/queries/link-type-reference?view=azure-devops#work-link-type) — directional dependencies and cycle restrictions; an organizational parent-child relationship differs from a prerequisite.
