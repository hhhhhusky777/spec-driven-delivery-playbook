# Architecture, Scope, and Assumptions

Use this guidance when defining or reviewing responsibilities, dependencies,
and material design premises. Make the accepted outcome and supported domain
explicit; choose an architecture that fits the project's existing boundaries.

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
another component's internal representation. These principles do not require
microservices, a fixed layering scheme, or an interface for every function.

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

The illustrations are adapted applications of the references, not reported
incidents or compulsory architectures.

| Situation | Boundary-respecting choice | Why it matters |
| --- | --- | --- |
| A deployment wrapper launches a migration tool that owns version transitions | Use its documented invocation and result contract; do not hardcode the wrapper's observed schema version as an independent migration rule | The migration owner can support later transitions without a contradictory second authority |
| A caller sees results sorted in one response, but the API promises no ordering | Sort locally when ordering is an owned requirement, or obtain an explicit provider guarantee | One sample is not a stable contract; incidental ordering must not determine correctness |
| Formatting logic reads storage-specific fields to decide a business rule | Obtain the decision through the owning business contract and format the result | Business semantics and persistence details can change independently |

For review, trace each material premise to evidence valid for the declared
domain, inspect dependency ownership, and distinguish a genuine contract gap
from a safely verifiable detail. Reuse the project's existing mechanisms;
uncertainty does not justify a speculative architecture or universal proof.

## References

Read further when the distilled guidance leaves a material question unresolved.
The sources inform decisions; project authority still owns scope and acceptance.

- [Microsoft: Architectural principles](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/architectural-principles) — separation of concerns, encapsulation, explicit dependencies, and public contracts. Its concrete .NET architecture is contextual, not a universal requirement.
- [AWS: Workload and scope](https://docs.aws.amazon.com/wellarchitected/latest/userguide/workload-and-scope.html) — understand purpose, ownership, boundaries, dependencies, and review context. Its cloud review procedure is not another project gate.
- [Google: What to look for in a code review](https://google.github.io/eng-practices/review/reviewer/looking-for.html) — assess design fit and integration in the existing system, not isolated code or speculative future needs.
