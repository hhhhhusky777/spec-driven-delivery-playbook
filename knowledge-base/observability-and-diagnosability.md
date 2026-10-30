# Observability and Diagnosability

Scope: Architecture, Engineering

- Architecture: Define measurable outcomes, diagnostic evidence and shared instrumentation boundaries.
- Engineering: Implement correlated signals that locate failures and support evidence-based improvement.

Use this topic for shared monitoring and diagnostic mechanisms.
[Performance](performance-and-observability.md) owns performance goals and
trade-offs; [Error Handling](error-handling-and-diagnosability.md) owns failure
semantics, consistency, recovery and retry.

## Core principles

> [!IMPORTANT]
> Make relevant system behavior measurable and failures identifiable and
> locatable. Reuse suitable shared instrumentation and operation context;
> collect actionable evidence proportional to project needs, without exposing
> sensitive data or adding redundant telemetry.

## Useful signals and feedback

Choose signals for the question being answered. Metrics describe aggregate
behavior over time; logs record events and context; traces connect operations
across a request's path. Correlation can explain where time goes, but not every
project or question needs all three.

A distributed trace connects a request's operations across services through a
shared trace ID. Each span describes an operation's duration, outcome and
relationship to other spans. It helps locate slow or failed stages; it does not
replace error-specific causal context. Neither distributed tracing nor a span
for every error is mandatory: structured logs with request/run correlation may
already provide sufficient evidence. Apply the
[required evidence and optional detail](#required-evidence-and-optional-detail)
boundary when selecting diagnostic coverage.

Use a suitable shared instrumentation framework and operation context for
performance and failure diagnostics. Reuse current project mechanisms; when a
framework is needed but none is suitable, evaluate mature implementations for
the project's language, runtime and deployment before building custom
infrastructure. Add only necessary business instrumentation.

| Responsibility | Framework and existing integrations | Business code |
| --- | --- | --- |
| Context and lifecycle | Create and propagate trace/span context; record span lifetime; apply configured collection and export policies | Define meaningful operation boundaries and necessary business attributes |
| Performance | Collect operation timing and configured metrics | Identify relevant operations, work units and performance goals |
| Failure diagnostics | Correlate errors and logs with their operation context | Supply error-specific context under [Context and placement](#context-and-placement) |

Connect collected evidence to an interpretation and useful action: assess a
goal, locate expensive work, compare a change or detect meaningful degradation.
Choose resolution, retention and collection volume proportionate to that need
and the cost of observing the system. Avoid unused signals and noisy alerts;
an alert should support an actionable response, not merely report that a metric
changed. Preserve project privacy and security boundaries in telemetry.

## Required evidence and optional detail

> [!IMPORTANT]
> Errors that compromise data correctness, integrity or consistency, business
> correctness or continuity, or leave an operation's effects uncertain MUST
> retain sufficient diagnostic evidence to locate the failure, understand its
> resulting state and determine the next safe action. Existing security, audit
> and compliance recording requirements MUST also be satisfied. Reuse adequate
> existing evidence; this does not require a full stack trace, distributed
> trace or alert for every error.

| Situation | Evidence boundary | Example |
| --- | --- | --- |
| Data correctness, integrity or consistency failure | Required: identify the failed operation and affected state | A partial write leaves related records inconsistent. |
| Incorrect business result or uncertain effects | Required: distinguish known results from unresolved effects | Payment times out without confirming whether a charge occurred. |
| Failed business operation or loss of continuity | Required: preserve enough context to locate the failure and its impact | An export ultimately fails, or a required dependency prevents service. |
| Security, audit or compliance event | Required as defined by project authority; a client response does not replace required internal evidence | Returning `401` does not replace required authentication audit records. |
| Expected ordinary validation or business rejection | Additional diagnostics are optional unless another required category applies | An invalid form field receives a clear response; no detailed stack is needed. |
| Safely recovered transient condition with a correct business outcome | Detail is optional, chosen for diagnostic value, frequency and cost | An established safe retry succeeds; individual attempt details may be unnecessary. |

Classify by actual effects and supported risk, not the exception name or HTTP
status alone. Transient errors that cause final failure or uncertain effects
remain required. For optional detail, choose existing counters, concise records,
sampling or temporary debug output as useful; do not suppress required evidence.
These are playbook boundaries synthesized from the references, not an identical
company-wide logging checklist claimed for every source.

### Context and placement

Preserve diagnostic context before propagation or translation can lose it.
Required internal evidence MUST distinguish the actual failed operation, its stage or
component, the error category, and the affected request or run, even when
multiple failure paths share one final handler.

| Location | Responsibility |
| --- | --- |
| Nearest failure boundary with useful context | Capture the specific operation, stage and relevant identifiers before that context is lost. |
| Propagation or wrapping | Preserve the original error and its available stack trace and cause chain; add meaningful context without replacing the origin with a generic message. |
| Shared handling boundary | Record the retained origin and context using the existing request/run correlation or trace context, so the actual failure can be located. |

These are context responsibilities, not three mandatory logging sites. One
record at the handling boundary is sufficient when it retains the actual
origin. Do not add catches or repeated logs solely to reproduce evidence that
propagation already preserves, or label a successfully handled condition as
an operation failure.

Use structured logs, stable unambiguous error codes, exception causes or traces
as appropriate. Human messages explain what happened; machine decisions use
the established typed error contract, not fragile parsing of prose. Separate
client-safe information from internal diagnosis; redact secrets and sensitive
payloads while retaining useful causal context in authorized diagnostics.

Review whether the failure can be located, its resulting state understood, and
the smallest safe next action determined. Detailed causal investigation belongs
to the project's triage guidance; performance goals and trade-offs belong to the
[Performance topic](performance-and-observability.md). New failure behavior
remains subject to accepted design and authority.

## Architectural fitness evidence

Architectural fitness means evidence that a change preserves an important,
accepted design property. Where that property warrants it, use an existing
metric, test or analysis to make degradation visible. For example, a dependency
check can expose a cycle that violates an agreed module boundary.

Assess only the property the evidence actually covers. A static dependency
check does not prove runtime correctness or performance. Prefer a suitable
existing mechanism; this is not a requirement to adopt evolutionary architecture,
install an architecture-testing framework or create a test for every design
preference. Design authority determines the boundary being evaluated.

## Reference-backed examples

These paraphrase the named sources, not project incidents or mandatory designs.

| Reference example | Diagnostic or measurement distinction | Smallest sufficient application | Source |
| --- | --- | --- | --- |
| A create-if-absent operation handles an already-existing resource | The handled condition is not an operation failure | Preserve relevant context without falsely reporting failure or duplicating a propagated exception | [OpenTelemetry: Recording exceptions](https://opentelemetry.io/docs/specs/semconv/general/recording-errors/#recording-exceptions) |
| A webpage request crosses an API gateway, backend and database, with spans in one trace | The connected path supplies context that isolated events lack | Instrument only the relevant path within project authority; this does not require OpenTelemetry adoption | [OpenTelemetry: Observability primer](https://opentelemetry.io/docs/concepts/observability-primer/#distributed-traces) |
| ArchUnit groups Java classes by package and checks those groups for dependency cycles | An executable check can reveal erosion of an accepted acyclic-module constraint | Covers the selected classes and dependencies, not overall architecture quality; keep an existing suitable module mechanism | [ArchUnit: Slices](https://www.archunit.org/userguide/html/000_Index.html#_slices) |

## References

If the method or applicability is uncertain, confidence is low, or a material
engineering claim lacks support, you MUST read the relevant sources below.
Guesses and unsupported assumptions do not resolve that uncertainty. Apply
these sources within project authority; they do not mandate a telemetry platform.

- [OpenTelemetry: Recording errors](https://opentelemetry.io/docs/specs/semconv/general/recording-errors/) — contextual classification and useful, nonduplicated failure evidence. These conventions are marked Development; their evolving instrumentation details are not a universal logging mandate.
- [Microsoft: Capture and rethrow exceptions properly](https://learn.microsoft.com/en-us/dotnet/standard/exceptions/best-practices-for-exceptions#capture-and-rethrow-exceptions-properly) — preserve the original stack and cause when propagating or wrapping errors; its .NET syntax is a language-specific example, not a cross-language recipe.
- [OpenTelemetry: Exceptions in logs](https://opentelemetry.io/docs/specs/semconv/exceptions/exceptions-logs/) — retain exception type, message, stack and applicable span context in existing diagnostics; no requirement to adopt OpenTelemetry.
- [Microsoft: Monitoring and diagnostics](https://learn.microsoft.com/en-us/azure/architecture/best-practices/monitoring#best-practices-for-instrumenting-applications) — log critical exceptions, preserve causal context and allow lower-level verbosity to be configured.
- [Google SRE: Monitoring distributed systems](https://sre.google/sre-book/monitoring-distributed-systems/) — meaningful signals, latency distributions and actionable monitoring; failures include incorrect content behind successful responses and violations of accepted service targets.
- [AWS: Instrumenting distributed systems](https://aws.amazon.com/builders-library/instrumenting-distributed-systems-for-operational-visibility/) — useful request context, adjustable diagnostic detail and the loss of individual-failure evidence caused by sampling.
- [Microsoft: Monitoring and threat detection](https://learn.microsoft.com/en-us/azure/well-architected/security/monitor-threats) — security-relevant failures and access violations need internal evidence, even when a request is rejected.
- [OpenTelemetry: Observability primer](https://opentelemetry.io/docs/concepts/observability-primer/) — the different questions metrics, logs and traces help answer; no telemetry platform mandate.
- [OpenTelemetry: Context propagation](https://opentelemetry.io/docs/concepts/context-propagation/) — shared context correlates signals across operation and service boundaries; reuse supported instrumentation and propagators.
- [OpenTelemetry: Traces](https://opentelemetry.io/docs/concepts/signals/traces/) — spans describe operation boundaries, lifetime and attributes; select relevant business instrumentation rather than trace every function.
- [Thoughtworks: Building Evolutionary Architectures, second-edition excerpt](https://www.thoughtworks.com/content/dam/thoughtworks/documents/books/bk_building_evolutionary_architectures_second_edition_free_chapter.pdf) — proportionate architecture effort and feedback on important design characteristics, especially printed pages 4–5.
- [ArchUnit: User Guide](https://www.archunit.org/userguide/html/000_Index.html) — a concrete dependency-cycle example in sections 4.7 and 8.2; section 8.3 retains suitable existing module systems.
