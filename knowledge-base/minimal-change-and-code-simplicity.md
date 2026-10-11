# Minimal Change and Code Simplicity

Use this guidance when designing, implementing, or reviewing a change. The goal
is the smallest understandable increment that satisfies the accepted outcome
and project invariants—not the fewest lines at any cost.

## Core principles

> [!IMPORTANT]
> Reuse suitable existing project code, libraries, and framework mechanisms.
> Add only the behavior and complexity needed for the accepted outcome. Keep
> control flow and data flow easy to understand; do not build speculative
> capabilities or a second implementation of an existing responsibility.

Necessary validation, safety, compatibility, and useful tests are not optional
because a shorter implementation exists. Apply the project's authorities and
approved scope; this topic does not authorize unrelated cleanup or a redesign.

## Applying the principles

Inspect the mechanism that already owns the relevant behavior. Extend or
compose it when it fits the required contract; do not copy an unsuitable
implementation merely to claim reuse. A new helper, abstraction, or dependency
needs a concrete benefit for the current outcome, not hypothetical future use.

Prefer explicit, cohesive logic with meaningful names. Consolidate repeated
conditions or equivalent processing when doing so preserves evaluation order,
side effects, failure behavior, and ownership. Remove pass-through variables
that obscure data flow, but keep names that explain a domain concept, preserve
a meaningful snapshot, or avoid repeated expensive or effectful computation.

Keep evolution inexpensive through clear responsibilities and existing
extension mechanisms. Introduce an abstraction when current variation or
duplication justifies it; do not force different responsibilities together just
because they look similar. Simplicity is not code golf, a line-count quota, or
a reason to leave genuinely confusing changed code untouched.

## Concrete examples and limits

| Situation | Smallest suitable change | Limit to check |
| --- | --- | --- |
| Two adjacent `if (eligible)` blocks perform related actions | One block containing both actions | Safe only if the first action cannot change the second condition's result; preserve order and error behavior |
| A value is copied from `a` to `b` to `c` without transformation | Use one meaningful value directly | Keep an intermediate name when it explains a domain conversion or captures state intentionally |
| A framework already provides the required retry or serialization mechanism | Configure or extend that mechanism instead of creating another wrapper system | Verify its actual contract fits the approved behavior; do not add retries or change semantics without authority |
| One accepted format needs an adapter | Implement that adapter using existing extension points | Do not add a plugin registry for imaginary future formats; a genuine current extension need can justify one |

For example, merging two conditionals is incorrect if the first action changes
`eligible`: the original code would reevaluate it before the second action.
Prefer the clearer equivalent implementation, not a visually shorter behavior
change. Reviewers should identify a concrete avoidable cost or comprehension
problem, rather than enforce personal style or require theoretical perfection.

## References

These sources support the distilled principles. Read further when a material
question remains; their examples are not additional project requirements.

- [Google: What to look for in a code review](https://google.github.io/eng-practices/review/reviewer/looking-for.html) — complexity, unnecessary generality, clear names, and maintainable tests.
- [Martin Fowler: YAGNI](https://martinfowler.com/bliki/Yagni.html) — avoid speculative capabilities without neglecting code health or ease of change.
- [Martin Fowler: Consolidate Conditional Expression](https://refactoring.com/catalog/consolidateConditionalExpression.html) — a focused refactoring example for equivalent conditional logic, not permission to alter evaluation semantics.
- [Martin Fowler: Inline Variable](https://refactoring.com/catalog/inlineVariable.html) — remove an intermediary when the expression is clearer without it; retain explanatory names where useful.
