# Solution Research

Choose engineering solutions from relevant evidence and project constraints,
not a familiar technique or unsupported guess. This guidance applies to design
and implementation, including reviewer alternatives and triage methods/remedies.

## Research requirement

> [!IMPORTANT]
> Before selecting any engineering solution, at design or implementation level,
> you MUST search the web for comparable problems and authoritative guidance using
> the problem, requirements, project boundaries and applicable KB principles.
> Include relevant language/version, runtime, libraries and deployment constraints.
> Use non-sensitive descriptions, not private project data, in external searches.
> Read the primary sources and assess applicability and trade-offs against
> project evidence and suitable existing mechanisms. Choose the simplest
> sufficient solution; familiarity, guesses, unsupported assumptions and
> subjective confidence MUST NOT substitute for research.

Treat language as an established constraint or an explicitly authorized choice;
research never grants authority to introduce a language or change project policy.
External practice cannot establish project facts or prove a bottleneck: verify
those premises against canonical contracts, code or direct evidence. Research
supports a triage method or remedy, not proof of a project-specific cause.

## Reuse and uncertainty

Reuse already-read research while it remains current and applicable; do not
repeat browsing for each coding action. For unresolved engineering-method or
applicability questions, low confidence or unsupported material claims, read
the relevant primary references before deciding. If sources are unavailable or
material uncertainty remains, disclose it and follow existing error handling.

A skill summary or prior familiarity does not replace reading this document;
unchanged content already read in context need not be reread routinely.
No per-delivery research record, fixed source count, prescribed technique or
separate gate is required. Keep material rationale in its existing design,
implementation or PR owner.

## Supporting references

These sources support evidence-based judgment and contextual trade-offs. The
mandatory research trigger is this playbook's requirement, not a claim that
the sources require browsing for every action or another decision record.

- [Google: The standard of code review](https://google.github.io/eng-practices/review/reviewer/standard.html#principles) — technical facts and engineering principles take precedence over personal preference; more than one solution can be valid.
- [Microsoft: Architecture decision records](https://learn.microsoft.com/en-us/azure/well-architected/architect-role/architecture-decision-record) — context, requirements, constraints, alternatives and consequences explain why a choice fits and whether it still applies.
