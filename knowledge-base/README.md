# Engineering Knowledge Base

Shared, distilled engineering guidance for authors and reviewers. Use it to
make project-specific decisions with less trial and error—not to introduce
another framework, checklist, or source of project policy.

## Applying the guidance

The project manifest identifies canonical authorities and the installed KB
root. Skills retain concise principles and tell agents which topic to read
when relevant. Read that topic directly; this README is a human-facing index,
not a mandatory intermediate step.

Apply the topic's core principles within the project's approved scope,
contracts, policies, and existing mechanisms. Choose the simplest sufficient
solution that satisfies both boundaries. Examples and techniques illustrate
choices; they are not universal implementation recipes. Neither mechanical
adoption nor silently ignoring a principle is an adequate application.

If these boundaries genuinely conflict, use the project's canonical
error-handling and decision authority. The KB grants no permission to change
scope, weaken a policy, or add a new blocking control.

Each topic retains primary reference links. When an engineering method or its
applicability is uncertain, confidence is low, or a material engineering claim
lacks support, agents MUST read the relevant primary references before deciding.
Guesses, unsupported assumptions and subjective confidence cannot replace
evidence. Project-specific premises require canonical project sources or direct
evidence; external guidance cannot establish them. If sources are unavailable or
material uncertainty remains, disclose the limitation and follow existing project
error handling. Read what resolves the question; routine rereading of unchanged
sources already read in context is unnecessary unless freshness or applicability
is in doubt.

Distinguish established engineering principles from evolving multi-agent
methods; neither a reference nor an example becomes project authority.

## Topic index

All topics below are available. Read the topic relevant to the work; this index
does not require reading the entire Knowledge Base.

| Topic | When it helps | Document |
| --- | --- | --- |
| Simple design and reuse | Reuse existing capabilities; minimize new responsibilities and mechanisms | [Simple design and reuse](simple-design-and-reuse.md) |
| Architecture, scope, and assumptions | Establish ownership and evidence-bounded design premises | [Architecture, scope, and assumptions](architecture-scope-and-assumptions.md) |
| Contracts and compatibility | Change interfaces without accidental contract breakage | [Contracts and compatibility](contracts-and-compatibility.md) |
| Error handling and diagnosability | Preserve invariants with simple failures and useful diagnosis | [Error handling and diagnosability](error-handling-and-diagnosability.md) |
| Testing and reproduction | Prove changed behavior and reproduce material failure risks | [Testing and reproduction](testing-and-reproduction.md) |
| Security basics | Protect actual trust boundaries proportionately | [Security basics](security-basics.md) |
| Proportional review | Assess material problems, correction value, and reasonable dispositions | [Proportional review](proportional-review.md) |
| Efficiency and concurrency | Overlap independent work without unnecessary coordination | [Efficiency and concurrency](efficiency-and-concurrency.md) |
| Experience and learning | Turn verified lessons into actionable reuse and refinement | [Experience and learning](experience-and-learning.md) |
| Code simplicity and clarity | Make implementation intent and behavior easy to understand without sacrificing correctness | [Code simplicity and clarity](code-simplicity-and-clarity.md) |
| Performance and observability | Use meaningful feedback to evaluate performance and important system or design goals | [Performance and observability](performance-and-observability.md) |

## Installation and ownership

Official documents live in the playbook's `knowledge-base/` directory and are
installed at `.github/spec-driven-delivery/knowledge-base/`. They share the
manifest's immutable playbook revision, are Git-tracked, and survive feature
cleanup. Adoption and accepted upgrades synchronize the complete official
tree using the installer; candidate preparation is not activation. Legacy
revisions without a KB remain valid.

Keep general practice here and project-specific lessons in the manifest-linked
Experience document. Official synchronization preserves project policies,
Experience, and unrelated local content. A local edit to managed guidance
requires reconciliation, not silent replacement. Do not put feature status,
review history, secrets, or raw incident logs in the KB; the plan and PR retain
their existing responsibilities.
