# Minimal Change Design

Use this guidance when designing or reviewing a solution: satisfy the current
requirement by reusing existing capabilities and introducing the fewest new
responsibilities and mechanisms necessary. This topic concerns design choices,
not coding style or source-level refactoring.

## Core principles

> [!IMPORTANT]
> Reuse suitable existing capabilities and framework mechanisms before adding
> new ones. Extend the existing owner of a responsibility instead of creating
> a parallel owner. Design only for demonstrated current requirements, not
> speculative features or extension points.

## Applying the principles

Identify which existing component or mechanism owns the required behavior and
compare its contract with the current requirement. Prefer configuration,
composition, or a bounded extension when that meets the need without weakening
existing guarantees. Reuse is unsuitable when it crosses ownership boundaries,
changes an unrelated contract, or needs more adaptation than a small coherent
new mechanism.

When proposing a new component, abstraction, dependency, or control, identify
the current requirement that the existing mechanism cannot adequately satisfy.
Weigh its benefit against added coupling, migration, operation, and maintenance
cost. Choose the least costly sufficient alternative, not the smallest diff if
that diff leaves duplicate ownership or fragile integration.

Keep responsibilities clear and changes easy to evolve. Existing extension
points can support change without inventing a generic framework. A new
abstraction is justified by current variation or a concrete responsibility,
not by imagined future formats or consumers. Necessary safety, compatibility,
and verification are part of a sufficient design, not optional complexity.

## Concrete examples and limits

| Situation | Smallest suitable change | Limit to check |
| --- | --- | --- |
| A framework provides the required scheduling mechanism | Configure or extend it instead of adding a second scheduler | Confirm its ordering and failure contract meets the current need |
| One accepted format needs an adapter | Use the existing extension point for that format | Do not design a plugin registry for imaginary future formats |
| An existing component serves a different contract | Add a small mechanism at the correct owner rather than forcing reuse | Explain the actual contract mismatch and why adaptation would be more costly or unsafe |

For design review, examine the existing option, the evidenced gap, the proposed
increment, and its total cost. Challenge an addition with a concrete sufficient
alternative; do not demand a universal framework or theoretical perfection.

## References

These sources support the distilled principles. Read further when a material
question remains; their examples are not additional project requirements.

- [Google: What to look for in a code review](https://google.github.io/eng-practices/review/reviewer/looking-for.html) — design fit, integration with existing components, and unnecessary generality.
- [Martin Fowler: YAGNI](https://martinfowler.com/bliki/Yagni.html) — avoid speculative capabilities without neglecting code health or ease of change.
