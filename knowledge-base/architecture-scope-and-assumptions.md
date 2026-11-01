# Architecture, Scope, and Assumptions

Scope: Architecture, Engineering

- Architecture: Define responsibilities, dependencies and evidence-bounded design premises.
- Engineering: Preserve ownership boundaries and verify material implementation assumptions.

Make the accepted outcome and supported domain explicit within project boundaries.

## Core principles

> [!IMPORTANT]
> Base material decisions on accepted requirements, owned responsibilities,
> and authoritative contracts. Keep collaborators behind explicit interfaces;
> do not turn their internals or today's observed state into your own rule.
> An assumption is a premise to verify or bound, not authority to expand scope.

Identify what the change owns, what it consumes, and what remains another
component's responsibility. A useful boundary names the behavior and its
owner, inputs and outputs, dependencies, and supported operating conditions.
Keep this information in the project's existing design or contract owner;
do not create another architecture inventory merely to apply this guidance.

Separate responsibilities that change for different reasons. Prefer explicit
dependencies and stable public contracts over hidden shared state or access to
another component's internal representation.

Architectural fitness means evidence that a change preserves an important,
accepted design property. Where that property warrants it, use an existing
metric, test or analysis to make degradation visible. For example, a dependency
check can expose a cycle that violates an agreed module boundary.

Assess only the property the evidence actually covers. A static dependency
check does not prove runtime correctness or performance. Prefer a suitable
existing mechanism; this is not a requirement to adopt evolutionary architecture,
install an architecture-testing framework or create a test for every design
preference. Design authority determines the boundary being evaluated.

## Material assumptions

Check premises that could change the result, ownership, safety, compatibility,
or supported domain. A verified fact or immaterial detail need not become an
assumption record. Use the project's existing disclosure and decision boundary.

| Warning category | What to question | Smallest sufficient handling |
| --- | --- | --- |
| Unsupported | Is there authority or adequate evidence for the premise? | Verify it or disclose the unresolved decision |
| Foreign-owned | Does it depend on another component's internals instead of its contract? | Consume the owning public contract |
| Incidental-state | Is a current observation being treated as a stable invariant? | Find a guarantee or accommodate the supported variation |
| Single-case generalization | Does one observed case stand in for the entire supported domain? | Validate the declared domain or narrow it explicitly |
| Hidden dependency | Does correctness require an undeclared environment, order, actor, or shared state? | Expose the necessary dependency and its owner |
| Speculative assumption | Does imagined future behavior introduce unaccepted scope? | Remove it or obtain the required scope decision |

These are the playbook's review vocabulary, not a taxonomy claimed by every
reference. Evidence is proportional to the supported domain; it need not prove
every imaginable case. When a material premise remains unresolved, use the
project's existing decision/error-handling authority and pause only affected
work. Do not silently broaden the design or invent a new rejection mechanism.

## Concrete examples and limits

These examples paraphrase the named sources; they are not project incidents
or compulsory architectures.

| Reference example | Boundary-respecting choice | Why it matters | Source |
| --- | --- | --- | --- |
| An application selects noteworthy items and formats them for display | Separate item selection from display formatting | Choosing content and presenting it are different responsibilities, even when used together | [Microsoft: Separation of concerns](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/architectural-principles#separation-of-concerns) |
| An object has a parameterless constructor but requires global or infrastructure components at runtime | Declare required collaborators through its constructor or method parameters | Callers can see what the object needs instead of discovering hidden dependencies during execution | [Microsoft: Explicit dependencies](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/architectural-principles#explicit-dependencies) |
| ArchUnit groups Java classes by package and checks those groups for dependency cycles | Reuse a suitable existing check for an accepted acyclic-module constraint | Covers selected classes and dependencies, not overall architecture quality | [ArchUnit: Slices](https://www.archunit.org/userguide/html/000_Index.html#_slices) |

For review, trace each material premise to evidence valid for the declared
domain, inspect dependency ownership, and distinguish a genuine contract gap
from a safely verifiable detail. Reuse the project's existing mechanisms;
uncertainty does not justify a speculative architecture or universal proof.

## References

If the method or applicability is uncertain, confidence is low, or a material
engineering claim lacks support, you MUST read the relevant sources below.
Guesses and unsupported assumptions do not resolve that uncertainty.
The sources inform decisions; project authority still owns scope and acceptance.

- [Microsoft: Architectural principles](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/architectural-principles) — separation of concerns, encapsulation, explicit dependencies, and public contracts. Its concrete .NET architecture is contextual, not a universal requirement.
- [AWS: Workload and scope](https://docs.aws.amazon.com/wellarchitected/latest/userguide/workload-and-scope.html) — understand purpose, ownership, boundaries, dependencies, and review context. Its cloud review procedure is not another project gate.
- [Google: What to look for in a code review](https://google.github.io/eng-practices/review/reviewer/looking-for.html) — assess design fit and integration in the existing system, not isolated code or speculative future needs.
- [Thoughtworks: Building Evolutionary Architectures, second-edition excerpt](https://www.thoughtworks.com/content/dam/thoughtworks/documents/books/bk_building_evolutionary_architectures_second_edition_free_chapter.pdf) — proportionate architecture effort and feedback on important design characteristics, especially printed pages 4–5.
- [ArchUnit: User Guide](https://www.archunit.org/userguide/html/000_Index.html) — a concrete dependency-cycle example in sections 4.7 and 8.2; section 8.3 retains suitable existing module systems.
