# Performance Design

Scope: Architecture, Engineering

- Architecture: Design system structure and resource choices for accepted workloads and performance requirements.
- Engineering: Realize the accepted design and assess results against the project's goals and evidence contract.

## Core principles

> [!IMPORTANT]
> Design from the project's workload, performance requirements and resource
> constraints. Choose the simplest sufficient system structure using suitable
> existing capabilities. Preserve correctness and accepted behavior; theoretical
> peak speed or an isolated benchmark is not the goal.

These boundaries synthesize the references below; they are not a prescribed
architecture or a requirement to optimize every feature.

| Boundary | Design judgment | Primary basis |
| --- | --- | --- |
| Useful outcomes | Identify the critical operation, user experience and useful work per resource cost. A lower CPU counter alone does not establish improvement | [Google: Application productivity](https://abseil.io/fast/7) |
| Workload and requirements | Use accepted demand, data characteristics, concurrency, growth and latency/throughput needs to select the design; distinguish requirements from current capability | [Microsoft: Performance Efficiency principles](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/principles) |
| Structure and resources | Choose suitable compute, data access, concurrency, capacity and scaling arrangements for that workload. Reuse existing capabilities and remove unnecessary processing, transfers and coordination before adding mechanisms | [AWS: Performance Efficiency](https://docs.aws.amazon.com/wellarchitected/latest/framework/performance-efficiency.html), [Google Cloud: Resource allocation](https://docs.cloud.google.com/architecture/framework/performance-optimization/plan-resource-allocation) |
| Performance trade-offs | Assess effects on accepted latency, throughput and resource budgets across the affected path. Caching exchanges memory and invalidation work for fewer repeated operations; batching exchanges waiting and memory for less per-operation overhead. Neither permits weakening required consistency or behavior | [AWS: Performance Efficiency definition](https://docs.aws.amazon.com/wellarchitected/latest/framework/perf-def.html) |
| Proportional complexity | Expected workload benefit must justify implementation, operation and maintenance cost. Avoid premature fine-tuning or a new platform when a bounded existing mechanism suffices | [Google: Optimizing optimization](https://abseil.io/fast/72), [Microsoft: Performance Efficiency principles](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/principles) |

Apply these boundaries to the actual limiting work and constraints, rather than
selecting a technique by name. Use [Solution Research](solution-research.md) to
compare alternatives; a bounded experiment is appropriate when it can resolve
decision-critical uncertainty at proportionate cost. Estimates can support an explicitly
accepted range or assumption; they are not measured results or invented targets.

## Project Performance Goals and Evidence authority

Each applicable project MUST have one canonical Performance Goals and Evidence
authority, indexed by its adoption manifest. Reuse an existing policy, SLO or
architecture contract that owns these inputs; if none exists, establish a
concise project policy. A separate file is unnecessary when the existing owner
can hold the complete contract. Keep reusable requirements here, project facts
in that authority, and per-run results in their existing evidence location.

| Contract content | What the project authority defines |
| --- | --- |
| Workload | Critical operations, representative data sizes/distributions, traffic and concurrency patterns, expected growth and relevant environment/resource constraints; identify sources and uncertainty |
| Goals | Human-accepted latency, throughput, useful-work/resource or other applicable requirements, their operation and workload boundaries, and allowed ranges or budgets. Label approved requirements, observed facts and estimates distinctly |
| Evidence acquisition | Concrete existing sources and how to obtain usable evidence: for example, an authorized telemetry query, replayable benchmark/load-test command with input/setup, or a documented collection procedure. Identify configuration, workload/environment and evidence location sufficiently to reproduce or interpret it; a bare instruction to “measure performance” is insufficient |
| Validity and acceptance | Conditions under which evidence represents the accepted workload and can support a comparison or goal assessment; units/intervals, relevant variability, comparison baseline and acceptance interpretation. Disclose unmeasured conditions instead of treating a sample as universal proof |
| Ownership and updates | Accountable owner and approval authority, and when to revise the contract: material workload/goal/resource changes, invalidated evidence assumptions or new accepted design obligations |

During adoption, upgrade and pre-feature authority reconciliation, check for
this authority and gaps in applicable inputs. Reuse the existing discovery/gap
process; record a reasoned non-applicability disposition when performance does
not require a project-specific contract. Do not invent numeric targets or create
an empty policy merely to fill a manifest row.

> [!IMPORTANT]
> If canonical authorities lack material workload or performance requirements,
> discuss the missing inputs with the human and obtain accepted requirements,
> ranges or bounded assumptions BEFORE making dependent performance decisions.
> If required performance evidence is missing and no acquisition method is
> defined, the agent MUST propose how to obtain and assess it against accepted
> workload and performance requirements, discuss the proposal with the human,
> and obtain agreement BEFORE making decisions that depend on that evidence.
> An observation, estimate or external benchmark MUST NOT silently become a
> requirement. Pause only the affected decisions; continue independent authorized
> work. Use the existing authority and error-handling boundaries for unresolved
> gaps or conflicts.

In the parent response, present the missing-input decision using this table;
link the project source and distinguish known facts from proposed requirements.

| Known information / source | Missing or uncertain input | Design impact | Recommendation / human decision |
| --- | --- | --- | --- |
| Existing project facts and evidence, or None | Material workload/goal/evidence gap | Decision that depends on it | Proposed requirement, range, bounded assumption or evidence acquisition; identify any owner decision needed |

The authority specifies how evidence is acquired and accepted; it does not
require full performance tests during every task. Existing focused/final test
boundaries, resource permissions and project testing policies still govern runs.

## Applying the design

Use the project authority to compare system organizations against representative
work and resource constraints. Identify where processing, data access or
coordination consumes the budget and choose appropriate existing mechanisms.
Account for peak demand and growth where relevant; do not require distributed
services, caching, asynchronous execution or elastic infrastructure for every
workload. A local cost increase can be acceptable when it improves the useful
operation within all accepted boundaries.

[Code-Level Performance Engineering](code-level-performance-engineering.md)
guides realization of the accepted design and reduction of implementation
overhead. [Observability and Diagnosability](observability-and-diagnosability.md)
owns measurement signals, instrumentation and correlation needed to obtain
interpretable evidence. Use that shared capability rather than define a second
measurement framework here.

## Reference-backed examples

These paraphrase or adapt the linked guidance; illustrative choices are not
universal designs or promised improvements.

| Situation | Design judgment | Application limit | Source |
| --- | --- | --- | --- |
| A service uses more CPU while processing more videos | Compare useful work per resource cost before redesigning; higher CPU use can reflect higher productive demand | Use the project's actual work unit and accepted goals, not a resource counter alone | [Google: Application productivity](https://abseil.io/fast/7) |
| An orders query is slow under representative load | Evaluate a suitable index against the existing access path before introducing a cache or separate service | Include write/storage costs and actual query/workload evidence; the proposed gain remains a hypothesis | [Microsoft: Performance testing](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/performance-test) |
| Interactive requests and batch processing have different response needs | Select resource and execution arrangements that fit each workload's accepted latency and capacity needs | The distinction does not require separate services or a new language; retain project constraints | [Google Cloud: Resource allocation](https://docs.cloud.google.com/architecture/framework/performance-optimization/plan-resource-allocation) |

## References

If the method or applicability is uncertain, confidence is low, or a material
engineering claim lacks support, you MUST read the relevant sources below.
Guesses and unsupported assumptions do not resolve uncertainty. Project
workloads, targets and bottlenecks require canonical sources or direct evidence;
external practice cannot establish those facts or authorize a policy change.

- [Microsoft: Performance Efficiency design principles](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/principles) — workload-led performance design, negotiated goals, capacity and proportional optimization.
- [AWS: Performance Efficiency](https://docs.aws.amazon.com/wellarchitected/latest/framework/performance-efficiency.html) and [definition](https://docs.aws.amazon.com/wellarchitected/latest/framework/perf-def.html) — suitable architecture/resources and performance trade-offs; contextual consistency trade-offs never waive project guarantees.
- [Google Cloud: Resource allocation](https://docs.cloud.google.com/architecture/framework/performance-optimization/plan-resource-allocation) — requirements and workload characteristics inform resource choices.
- [Google: Application productivity](https://abseil.io/fast/7) — useful work per resource cost and whole-application effects instead of isolated proxies.
- [Google: Optimizing optimization](https://abseil.io/fast/72) — expected benefit, reuse and total engineering effort; experimental shortcuts do not waive correctness.
- [Google SRE: Service Level Objectives](https://sre.google/sre-book/service-level-objectives/) — user-relevant measures and targets rather than arbitrary numbers.
- [Microsoft: Performance testing](https://learn.microsoft.com/en-us/azure/well-architected/performance-efficiency/performance-test) — representative workloads, baselines and comparisons; its schedules do not replace project testing authority.
