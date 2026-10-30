# Error Handling and Diagnosability

Scope: Architecture, Engineering

- Architecture: Define failure semantics, consistency guarantees and recovery boundaries.
- Engineering: Implement failure handling, actionable diagnostics and tests of those guarantees.

The project's error-handling authority owns classification, recovery permission,
issue tracking and escalation.

## Core principles

> [!IMPORTANT]
> Keep handling simple and invariant-based, not an enumeration of every edge
> case or interleaving. Preserve consistency; fail closed when continuing could
> violate a required invariant. Permit client-controlled retry only when its
> effects are safe. Make failures identifiable and locatable without exposing
> secrets or hiding the original cause.

Choose the smallest handling that protects the accepted outcome. Reuse existing
transaction, idempotency, cleanup and error-reporting mechanisms before adding
recovery state or orchestration. A failure must not be reported as success;
partial effects and uncertain outcomes need honest contract meaning.

## Safe recovery and retry

A timeout says the caller stopped waiting, not that the operation had no effect.
For an uncertain write, use the owning contract's idempotency guarantee or
reconcile authoritative state before repeating it. An identical payload does
not by itself establish the same intent. Do not invent duplicate detection or
compensation outside the component that owns the effect.

Separate a transient failure from an input, permission or policy problem that
requires a change before another attempt can succeed. Expose a stable outcome
and useful next action through the existing error contract. Returning a
retryable error is often sufficient; it does not require server-side retry
orchestration.

Where automatic retries are already justified, reuse the established client
policy and bound attempts and elapsed time. Consider load amplification and
retry ownership across layers; backoff and jitter help only when retry itself
is safe and useful. No fixed retry count, timeout, circuit breaker or universal
recovery framework follows from this guidance.

## Useful failure evidence

Use the [shared instrumentation and context guidance](performance-and-observability.md#useful-signals-and-feedback)
for performance and error diagnostics; preserve error-specific context below.

### Required evidence and optional detail

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

For example, an export can fail while loading metadata, rendering or uploading.
A final `export_failed` record is insufficient if it loses which stage failed.
Retaining `stage=upload`, the original storage exception and the existing
request identifier can locate the failure without logging every branch.

Review whether the failure can be located, its resulting state understood, and
the smallest safe next action determined. Detailed causal investigation belongs
to the project's triage guidance; broader performance feedback is a separate
concern. New failure behavior remains subject to accepted design and authority.

## Reference-backed examples

These paraphrase the named references, not project incidents or mandatory designs.

| Reference example | Risk or diagnostic distinction | Smallest sufficient application | Source |
| --- | --- | --- | --- |
| An EC2 singleton launch receives no response | Retrying can create a second instance if the first request took effect | Use the API's established request-token guarantee or reconcile the original effect | [AWS: Retrying and side effects](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/#Retrying_and_side_effects) |
| Five service layers each make three attempts on a failed downstream request | Attempts multiply to 243 at the database | Avoid independent retry multiplication; use the appropriate existing retry owner | [AWS: Timeouts, retries, and backoff with jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/) |
| A create-if-absent operation handles an already-existing resource | The handled condition is not an operation failure | Preserve relevant context without falsely reporting failure or duplicating a propagated exception | [OpenTelemetry: Recording exceptions](https://opentelemetry.io/docs/specs/semconv/general/recording-errors/#recording-exceptions) |

## References

If the method or applicability is uncertain, confidence is low, or a material
engineering claim lacks support, you MUST read the relevant sources below.
Guesses and unsupported assumptions do not resolve that uncertainty.
Use these sources within project authority, not as permission for new controls.

- [AWS: Making retries safe with idempotent APIs](https://aws.amazon.com/builders-library/making-retries-safe-with-idempotent-APIs/) — ambiguous effects, caller intent and established idempotency contracts; its service implementation is not a compulsory recipe.
- [AWS: Timeouts, retries, and backoff with jitter](https://aws.amazon.com/builders-library/timeouts-retries-and-backoff-with-jitter/) — bounded retry, amplification and load-aware timing; choose measures from actual dependency behavior.
- [RFC 9457: Problem Details for HTTP APIs](https://www.rfc-editor.org/rfc/rfc9457.html) — stable problem identity, occurrence context, actionable client detail and security limits. It specifies an HTTP format, not a required replacement for an existing error contract.
- [OpenTelemetry: Recording errors](https://opentelemetry.io/docs/specs/semconv/general/recording-errors/) — contextual classification and useful, nonduplicated failure evidence. These conventions are marked Development; their evolving instrumentation details are not a universal logging mandate.
- [Microsoft: Capture and rethrow exceptions properly](https://learn.microsoft.com/en-us/dotnet/standard/exceptions/best-practices-for-exceptions#capture-and-rethrow-exceptions-properly) — preserve the original stack and cause when propagating or wrapping errors; its .NET syntax is a language-specific example, not a cross-language recipe.
- [OpenTelemetry: Exceptions in logs](https://opentelemetry.io/docs/specs/semconv/exceptions/exceptions-logs/) — retain exception type, message, stack and applicable span context in existing diagnostics; no requirement to adopt OpenTelemetry.
- [Microsoft: Monitoring and diagnostics](https://learn.microsoft.com/en-us/azure/architecture/best-practices/monitoring#best-practices-for-instrumenting-applications) — log critical exceptions, preserve causal context and allow lower-level verbosity to be configured.
- [Google SRE: Monitoring distributed systems](https://sre.google/sre-book/monitoring-distributed-systems/#the-four-golden-signals) — failures include incorrect content behind successful responses and violations of accepted service targets.
- [AWS: Instrumenting distributed systems](https://aws.amazon.com/builders-library/instrumenting-distributed-systems-for-operational-visibility/) — useful request context, adjustable diagnostic detail and the loss of individual-failure evidence caused by sampling.
- [Microsoft: Monitoring and threat detection](https://learn.microsoft.com/en-us/azure/well-architected/security/monitor-threats) — security-relevant failures and access violations need internal evidence, even when a request is rejected.
