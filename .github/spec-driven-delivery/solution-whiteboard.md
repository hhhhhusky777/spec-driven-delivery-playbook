# Solution Whiteboard — Evidence-bounded scope

<!-- sdd: whiteboard -->

| Field | Value |
| --- | --- |
| State | `OPEN` |
| Need / issue | [#138](https://github.com/hhhhhusky777/spec-driven-delivery-playbook/issues/138) |
| Owner | Repository owner |
| Concluded design revision | Candidate `WB-138-1` |
| Open owner decisions | `None` before independent design review |

## Discussion draft

| ID | Agreed item, alternative, constraint, or gap | State / resolution |
| --- | --- | --- |
| `DR01` | Agents can create brittle behavior by turning a current case or another component's internal state into a durable design fact. | accepted |
| `DR02` | Assumptions are unavoidable; the dangerous cases are unsupported, foreign-owned, incidental, single-case, hidden-dependency, and speculative assumptions. | accepted |
| `DR03` | A material assumption should be verified from authority, replaced with a public contract, or bounded explicitly; unresolved scope authority belongs to the human. | accepted |
| `DR04` | The rule must protect supported cases without demanding proof for every imaginable case or encouraging speculative generalization. | accepted |
| `DR05` | Microsoft Architectural Principles is the primary technical reference; AWS Workload and Scope is the supporting ownership/boundary reference. | accepted |
| `DR06` | Authors self-check assumptions and reviewers reject unsupported scope without pursuing perfection or expanding the accepted outcome. | accepted |

## Current understanding

| Concern | Current understanding |
| --- | --- |
| Problem / observed need | Existing scope rules reject unexplained additions but do not help an agent identify when a design premise is an unsupported or foreign-owned assumption. |
| Required outcome | Design and implementation remain inside an evidence-supported, owned, explicitly declared domain; material uncertainty is verified or routed to the human rather than hard-coded. |
| In scope | Canonical documentation policy, whiteboard assumption capture, portable author/reviewer guidance, reader explanation, two external references, and regression coverage. |
| Out of scope / deferred | Proving correctness for every imaginable case, banning all assumptions, runtime assumption detection, project-specific migration rules, or a new scope document. |
| Confidence | High on the intended boundary; independent review must test whether the checklist is concise and avoids both brittle assumptions and over-engineering. |

## Authority and context

| Source | Authority or relevant content | Freshness / verification |
| --- | --- | --- |
| Repository owner discussion for Issue #138 | Defines unsupported and single-case assumptions as a scope risk and authorizes the evidence-bounded design. | Current conversation |
| [Documentation quality policy](../../docs/documentation-quality-policy.md) | Owns clear boundaries, honest evidence, accepted-design authority, and human briefs. | Current at `d1df74c1dc548ac4397b14018a4d162d8ba32135` |
| [Microsoft Architectural Principles](https://learn.microsoft.com/en-us/dotnet/architecture/modern-web-apps-azure/architectural-principles) | Explicit dependencies, separation of concerns, single responsibility, single authority, and bounded contexts. | Reviewed 2026-09-28 |
| [AWS Workload and Scope](https://docs.aws.amazon.com/wellarchitected/latest/userguide/workload-and-scope.html) | General questions for ownership, purpose, boundaries, dependencies, lifecycle, and disruption impact. | Reviewed 2026-09-28 |

## Requirements and acceptance

| ID | Need or requirement | Priority | Acceptance signal | Source |
| --- | --- | --- | --- | --- |
| `R01` | Define evidence-bounded scope using accepted outcome, component ownership or authoritative external contract, and evidence valid for the declared supported cases. | Required | Canonical policy gives one unambiguous rule. | Owner; references |
| `R02` | Give agents a concise dangerous-assumption checklist: unsupported, foreign-owned, incidental-state, single-case generalization, hidden dependency, and speculative assumption. | Required | Author and reviewer guidance use the same six categories without duplicating the full policy. | Owner |
| `R03` | Require a material assumption to be verified, replaced with an authoritative contract, or bounded explicitly; unresolved material scope requires a human decision. | Required | Workflow and review gates fail closed only at the material ambiguity boundary. | Owner |
| `R04` | Preserve ordinary engineering judgment and proportionality. | Required | Guidance rejects universal proof, imagined-case expansion, and perfectionism. | Owner; Google simplicity principle considered but not retained as a required reference |
| `R05` | Use only the selected Microsoft and AWS references. | Required | Reader-facing reference section contains both links and no unnecessary reference list. | Owner |
| `R06` | Keep the design general rather than encoding the migration example as a special rule. | Required | Migration appears only as a concrete explanatory example. | Owner |

## Options, experiments, and tradeoffs

| ID | Option or experiment | Benefits | Costs / risks | Evidence needed | Disposition |
| --- | --- | --- | --- | --- | --- |
| `O01` | Ban assumptions. | Simple slogan. | Impossible in real design; would cause excessive human stops. | Industry principles and practical review. | rejected |
| `O02` | Use the six dangerous-assumption categories as the sole self-check vocabulary. | Detects the harmful assumptions while preserving judgment. | Requires concise semantic review. | Cross-document review and tests. | accepted |
| `O03` | Require proof for every possible case. | Appears maximally safe. | Unbounded, impossible, and over-engineered; expands beyond the declared supported domain. | None. | rejected |
| `O04` | Let only reviewers identify scope assumptions. | Less author guidance. | Finds avoidable mistakes late and encourages review loops. | Existing review experience. | rejected |
| `O05` | Create a separate scope policy. | Dedicated space. | Adds another authority and duplicates documentation policy. | None. | rejected |

## Risks and consequences

| ID | Scenario | Likelihood / impact | Prevention or detection | Recovery / owner | Residual risk |
| --- | --- | --- | --- | --- | --- |
| `K01` | Agents treat every unknown as out of scope and stop unnecessarily. | Medium / medium | Limit the stop to material assumptions the agent cannot verify or resolve within existing authority. | Agent verifies or records a nonmaterial limitation; human only when authority is missing. | Contextual judgment remains. |
| `K02` | Agents claim a one-case observation is general evidence. | Medium / high | Require evidence valid for the declared supported domain and reviewer challenge of incidental facts. | Narrow the supported domain or use an authoritative contract. | Evidence can still be misread. |
| `K03` | Reviewers demand speculative abstractions for hypothetical future cases. | Medium / medium | Explicitly reject universal proof, imagined-case expansion, and perfectionism. | Author rejects or defers disproportionate findings under existing review rules. | Judgment remains necessary. |
| `K04` | The same normative rule is copied across policy, skills, template, and README. | Medium / medium | Policy owns the rule; other surfaces provide only their role-specific prompt and link/summary. | Remove duplicated prose during consistency review. | Low. |

## Decision log

| ID | Decision | Material alternatives | Rationale / tradeoff | Owner / evidence |
| --- | --- | --- | --- | --- |
| `D01` | Name the rule **Evidence-bounded scope**. | “Avoid assumptions”; “universal design.” | States the positive outcome without banning legitimate assumptions. | Owner discussion |
| `D02` | Define in-scope decisions by outcome authority, ownership/contract, and evidence for the declared supported domain. | One-case intuition or universal applicability. | Matches established explicit-dependency and bounded-context principles. | Microsoft; AWS |
| `D03` | Require author self-check against the six dangerous-assumption categories. | A second checklist or prescriptive implementation workflow. | Keeps one vocabulary and reusable judgment criteria without fixing one path. | Owner discussion |
| `D04` | Material unresolved assumptions fail closed to human scope definition; ordinary verifiable assumptions remain agent work. | Always continue; always stop. | Preserves both safety and agent discretion. | Owner discussion |
| `D05` | Reviewers block only material unsupported scope and reject speculative expansion. | Perfect-generalization review. | Prevents brittle coupling without creating over-engineering loops. | Existing proportional review authority |

## Concluded design

| Design point | Accepted outcome | Boundary or rationale | Validation signal |
| --- | --- | --- | --- |
| `WB138-01` | Every material design or implementation premise traces to the accepted outcome and either current component ownership or an authoritative external contract, with evidence valid for the declared supported domain. | It need not cover unsupported or imagined cases. | Policy and reader guidance state the same outcome. |
| `WB138-02` | Authors check for six dangerous assumption types: unsupported, foreign-owned, incidental-state, single-case generalization, hidden dependency, and speculative assumption. | This is a judgment checklist, not a mechanical parser or mandatory artifact. | Workflow guidance and whiteboard template expose the check concisely. |
| `WB138-03` | For a material dangerous assumption, the agent verifies it, replaces it with a public contract, or narrows and discloses the supported domain; if authority remains missing, the human defines or expands scope. | Nonmaterial limitations and safely verifiable facts do not create a human stop. | Human-brief and reviewer tests preserve the escalation boundary. |
| `WB138-04` | Reviewers treat unsupported or over-specific premises as out-of-scope findings and require evidence, contract, or explicit boundary; they must not demand universal proof or speculative generalization. | Review protects accepted scope rather than perfection. | Reviewer guidance and cross-document regression agree. |
| `WB138-05` | The playbook cites Microsoft Architectural Principles and AWS Workload and Scope as the only external references for this rule. | References support the rule but do not become project authority. | Both links appear in the canonical/reader-facing location and pass link checks. |

## Draft-to-conclusion reconciliation

| Draft item | Concluded design point | Disposition | Rationale / evidence |
| --- | --- | --- | --- |
| `DR01` | `WB138-01`, `WB138-03` | accepted | Prevents current-case facts from becoming durable cross-component invariants. |
| `DR02` | `WB138-02` | accepted | Six categories make the dangerous subset explicit. |
| `DR03` | `WB138-03` | accepted | Verification and authority determine whether the agent proceeds or stops. |
| `DR04` | `WB138-01`, `WB138-04` | accepted | The supported domain is explicit without pretending to include every case. |
| `DR05` | `WB138-05` | accepted | Two complementary primary references are sufficient. |
| `DR06` | `WB138-02`, `WB138-04` | accepted | Author and reviewer responsibilities are aligned without duplicating policy. |

## Newly introduced fail-closed behaviors

| ID | Trigger | Required fail-closed response | Concrete example | Impact | Recovery / best next action | Owner disposition |
| --- | --- | --- | --- | --- | --- | --- |
| `FC01` | A material design or implementation decision matches any of the six dangerous-assumption categories and the agent cannot verify, replace, or bound it within current authority. | Block the affected design, implementation, or approval; do not encode the assumption as an invariant or silently expand scope. | A deployment change hard-codes that every database upgrade is `1 → 2` although the upgrade script owns migration paths; a later `3 → 4` release would fail for a reason outside deployment's contract. | May pause one material boundary, but prevents brittle cross-component coupling and unsupported long-lived rules. | The author verifies authoritative evidence, changes the design to consume the owning component's public contract, or explicitly narrows the supported domain. If none is authorized, the repository owner defines or expands scope. Affected work resumes only after required validation, both retained reviewers approve changed candidate bytes, and the owner accepts any human-defined scope. | Pending independent review and owner acceptance |

## Design amendments

| Amendment | Changed design points | Reason and impact | Owner decision |
| --- | --- | --- | --- |
| `None` | `None` | Initial candidate. | `None` |

## Human brief

| Attention | Summary | Handling |
| --- | --- | --- |
| Decisions made | Adopt Evidence-bounded scope, six dangerous assumptions, the verify/contract/bound/human resolution boundary, and two external references. | `HUMAN_DECISION` |
| Important boundaries | Assumptions are not banned; supported-domain evidence is required only for material premises, and universal proof or speculative future-case design is rejected. | `DISCLOSE` |
| Alternatives rejected | Ban all assumptions, require universal proof, reviewer-only detection, or create another policy document. | `DISCLOSE` |
| Remaining gaps or risks | Independent reviewers must verify concision, non-duplication, and that `FC01` stops only material unresolved scope. | `DISCLOSE` |
| Newly introduced fail-closed behavior | `FC01`: an unresolved material assumption in any of the six dangerous categories blocks the affected gate. Example: deployment hard-codes `1 → 2` migration logic owned by the upgrade script. Recovery: the author verifies evidence, consumes the owning public contract, narrows the supported domain, or asks the owner to define scope; work resumes after validation, both reviewers approve changed bytes, and any required owner acceptance. Reviewer dispositions pending. | `HUMAN_DECISION` |
| Decision requested | After both reviewers approve, accept `WB-138-1` and `FC01` so planning may begin. | `HUMAN_DECISION` |
