# Observability and Diagnosability

Scope: Architecture, Engineering

- Architecture: Define measurable outcomes, diagnostic evidence and shared instrumentation boundaries.
- Engineering: Implement correlated signals that locate failures and support evidence-based improvement.

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
[failure evidence and optional detail](#failure-evidence-and-optional-detail)
boundary when selecting diagnostic coverage.

> [!IMPORTANT]
> Required measurement and diagnostic evidence MUST use a coherent project-shared
> instrumentation framework and operation context. Reuse suitable existing
> mechanisms. If this capability is missing, establish it by integrating a
> mature framework appropriate to the project's language, runtime and deployment;
> add only necessary integration and business instrumentation, not a custom
> telemetry platform. Shared context does not require one SDK across all
> languages, every available signal or a span for every operation.

Evaluate suitable existing options before creating new infrastructure:

| Option | Fit and reuse boundary |
| --- | --- |
| [OpenTelemetry](https://opentelemetry.io/docs/what-is-opentelemetry/) | Vendor-neutral APIs, SDKs and integrations for logs, metrics and traces; choose supported language/runtime components and retain a suitable existing backend |
| [.NET diagnostics with OpenTelemetry](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/observability-with-otel) | Reuse native logging, metrics and Activity APIs with OTel collection/export instead of parallel custom instrumentation |
| [Micrometer Observation](https://docs.micrometer.io/micrometer/reference/observation/components.html) | For a JVM project, reuse its observation lifecycle and handlers for metrics/tracing; integrate existing logging and context rather than duplicate instrumentation |

These are reference options, not required products. Select the smallest suitable
mechanism within project authority; the shared capability does not itself grant
permission to add dependencies or deploy a monitoring service.

| Responsibility | Framework and existing integrations | Business code |
| --- | --- | --- |
| Context and lifecycle | Maintain shared operation/request context and applicable trace/span lifetimes; apply configured collection and export policies | Define meaningful operation boundaries and necessary business attributes |
| Performance measurement | Collect operation timing and configured metrics | Identify relevant operations, work units and accepted measurement goals |
| Failure diagnostics | Correlate errors and logs with their operation context | Supply error-specific context under [Context and placement](#context-and-placement) |

Connect collected evidence to an interpretation and useful action: assess a
goal, locate expensive work, compare a change or detect meaningful degradation.
Choose resolution, retention and collection volume proportionate to that need
and the cost of observing the system. Avoid unused signals and noisy alerts;
an alert should support an actionable response, not merely report that a metric
changed. Preserve project privacy and security boundaries in telemetry.

## Performance evidence and optional detail

Select signals from the project's accepted goals and representative workloads.
The shared framework MUST
provide evidence that can assess those accepted goals and locate relevant
costs; counters without an interpretable operation or workload are insufficient.

| Evidence | Required boundary / optional detail |
| --- | --- |
| Measurement meaning | Identify the operation, workload, environment, measurement interval and units; separate successful and failed work where mixing them misleads |
| Goal-relevant signals | Provide the latency distribution, throughput, resource use or useful-work measures needed for the accepted goals; no universal metric set or threshold |
| Interpretation | Retain enough context to compare representative observations and locate relevant processing or dependency costs using existing signals |
| Additional detail | Per-request spans, fine-grained profiles and other high-volume detail are optional according to diagnostic value and cost; sampling must not be presented as complete per-request evidence |

## Failure evidence and optional detail

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
to the project's triage guidance. New failure behavior remains subject to
accepted design and authority.

## Reference-backed examples

These paraphrase the named sources, not project incidents or mandatory designs.

| Reference example | Diagnostic or measurement distinction | Smallest sufficient application | Source |
| --- | --- | --- | --- |
| A create-if-absent operation handles an already-existing resource | The handled condition is not an operation failure | Preserve relevant context without falsely reporting failure or duplicating a propagated exception | [OpenTelemetry: Recording exceptions](https://opentelemetry.io/docs/specs/semconv/general/recording-errors/#recording-exceptions) |
| A webpage request crosses an API gateway, backend and database, with spans in one trace | The connected path supplies context that isolated events lack | Instrument only the relevant path within project authority; this does not require OpenTelemetry adoption | [OpenTelemetry: Observability primer](https://opentelemetry.io/docs/concepts/observability-primer/#distributed-traces) |

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

- [OpenTelemetry overview](https://opentelemetry.io/docs/what-is-opentelemetry/) — shared, vendor-neutral instrumentation and export interfaces; it is not a storage/visualization backend.
- [Microsoft: .NET observability with OpenTelemetry](https://learn.microsoft.com/en-us/dotnet/core/diagnostics/observability-with-otel) — reuse native logging, metrics and Activity APIs with common collection/export.
- [Micrometer: Observation components](https://docs.micrometer.io/micrometer/reference/observation/components.html) — one observation lifecycle can drive suitable metric/tracing handlers; integrate the project's actual context and logging mechanisms.
