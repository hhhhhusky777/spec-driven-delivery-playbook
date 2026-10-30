# Performance

Scope: Architecture, Engineering

- Architecture: Define performance goals, measurable behavior and whole-system trade-offs.
- Engineering: Assess implementation performance against accepted goals using representative measurements.

This topic covers system-level performance goals, representative measurements
and whole-system trade-offs. Code-level techniques belong to
[Code-level Performance Engineering](code-level-performance-engineering.md).

## Core principles

> [!IMPORTANT]
> Design for measurable, interpretable feedback about accepted outcomes.
> Choose the simplest sufficient improvement within project boundaries;
> more telemetry or a faster isolated benchmark is not itself an improvement.

These five boundaries consolidate the linked sources for this KB; they are
not a claimed industry-standard taxonomy or a prescribed optimization sequence.

| Boundary | Design judgment | Primary basis |
| --- | --- | --- |
| Useful outcomes | Improve the accepted operation and useful work per resource cost. A proxy metric can help explain behavior but cannot alone establish the intended gain | [Google: Application productivity](https://abseil.io/fast/7) |
| Evidence | Design how relevant behavior will be measured and interpreted; use representative evidence to locate limiting work and assess improvement claims | [Microsoft: Performance design](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/principles) |
| Unnecessary work | Prefer removing avoidable processing or supporting work over adding a more elaborate mechanism. Supporting work may still be necessary for correctness or lower total cost | [Google: Optimizing optimization](https://abseil.io/fast/72) |
| Whole-system trade-offs | Preserve accepted correctness and behavior; assess latency, throughput, resource use and effects on other operations. A local cost increase may still improve the whole system | [Google: Application productivity](https://abseil.io/fast/7) |
| Proportional complexity | Expected benefit must justify implementation, operation and maintenance cost. Reuse suitable mechanisms and signals; do not chase theoretical optimality or add a monitoring platform without a demonstrated need | [Google: Optimizing optimization](https://abseil.io/fast/72), [Microsoft: Performance design](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/principles) |

## Meaningful performance evidence

During design, identify the relevant operation, accepted target and how its
behavior can be measured. Use available evidence and distinguish estimates or
unmeasured properties from observed results. Considering performance early does
not require a full test run or fine-grained optimization during design.
Define what is measured, for which workload and over what interval. Choose
relevant latency, throughput, error or resource measures rather than every available metric.
Separate successful and failed requests where mixing them would hide poor
service. Tail latency can expose slow users that an average conceals; no
universal percentile or threshold follows from this guidance.

Establish a baseline under representative data, concurrency, traffic patterns
and environment. Profile or inspect existing evidence to locate the limiting
work before proposing an optimization. Compare the candidate with that
baseline under comparable conditions, accounting for variability. Disclose
synthetic data, omitted dependencies or scale differences that limit the claim;
a local microbenchmark does not establish production performance.

Retain evidence sufficient to explain the decision, not a second
performance-reporting system. Project authority still controls
test timing, production access and acceptable load; this topic creates no new
validation gate or permission to experiment on live users.

## Instrumentation and feedback

Read and apply [Observability and Diagnosability](observability-and-diagnosability.md)
for shared signals, instrumentation, context and diagnostic evidence.

## Reference-backed examples

These paraphrase published examples. The application limits are our bounded
interpretation, not universal tool choices or new project requirements.

| Published example | Useful feedback | Application limit | Source |
| --- | --- | --- | --- |
| A service uses more CPU while processing more videos | Work completed per CPU-second distinguishes higher demand from lower efficiency; CPU use alone cannot | Choose the useful-work unit for the actual service; a lower resource counter is not automatically a better outcome | [Google: Application productivity](https://abseil.io/fast/7) |
| A service averages 100 ms at 1,000 requests per second, while 1% take 5 seconds | The average hides ten slow requests each second; the latency distribution reveals them | Choose a meaningful tail measure and target for the actual operation, not these illustrative numbers | [Google SRE: Latency distributions](https://sre.google/sre-book/monitoring-distributed-systems/#worrying-about-your-tail-or-instrumentation-and-performance-Yms9Ck) |
| An orders-table index is evaluated against the original schema under the same load | Query latency, CPU and throughput test whether the proposed optimization helps | The stated improvement is a hypothesis, not a promised result for another database or workload | [Microsoft: Performance testing](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/performance-test) |

## References

If the method or applicability is uncertain, confidence is low, or a material
engineering claim lacks support, you MUST read the relevant sources below.
Guesses and unsupported assumptions do not resolve that uncertainty. Actual
workloads, targets and bottlenecks require canonical project sources or direct
evidence; an external benchmark or example cannot establish them.

- [Google: Application productivity](https://abseil.io/fast/7) — useful work per resource cost and whole-application effects instead of isolated proxy improvements.
- [Google: Optimizing optimization](https://abseil.io/fast/72) — expected benefit, total engineering effort, reuse and measurement; its experimental shortcuts do not waive project correctness boundaries.
- [Microsoft: Performance Efficiency design principles](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/principles) — performance from design onward, whole-system trade-offs and proportionate evidence; cloud-specific mechanisms and test gates are not additional project requirements.
- [Google SRE: Service Level Objectives](https://sre.google/sre-book/service-level-objectives/) — user-relevant measures and targets rather than arbitrary numbers or every available metric.
- [Microsoft: Performance testing](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/performance-test) — representative workloads, baselines and hypothesis-driven comparison; its test schedules do not replace project authority.
