# Project Adoption Runbook

Use this runbook to integrate the playbook into an existing or new project.
It owns the reusable adoption procedure. The
[Project Adoption Manifest Template](../templates/adoption/project-adoption-manifest.md)
records one project's facts, decisions, state, and evidence.

Adoption supplements an existing project. It does not silently replace project
contracts, contributor rules, review authority, tests, or CI. A project reaches
`ACTIVE` only after its own authorized reviewers approve the instantiated
documents, enforcement, and pilot evidence.

## 1. Control and outcome

| Field | Value |
| --- | --- |
| Status | Reusable canonical runbook; changes take effect after reviewed merge |
| Owner | Playbook maintainers |
| Applies to | Initial project adoption and later playbook-version updates |
| Project record | One reviewed adoption manifest in the adopting repository |
| Completion | Real adoption is `ACTIVE`; external case study is `EXAMPLE_REVIEWED` |
| Last source review | 2026-08-22 |

The outcome is a project-local delivery system that:

- preserves established project authority;
- exposes one concise entry point for human and AI contributors;
- instantiates only missing or intentionally changed capabilities;
- enforces project-owned documentation, test, and PR gates;
- proves the integration through one bounded real delivery; and
- can assess later playbook changes without automatic overwrite.

## 2. Authority and conflict gate

Before generating a policy, identify the project's existing authorities and
who can change them. The generic playbook is never project authority merely
because it is newer or more detailed.

Required rules:

- The project defines its own precedence among legal, security, product,
  architecture, contributor, test, release, and operational authorities.
- An approved project document remains authoritative until the project changes
  or supersedes it through its own review process.
- A playbook template is informative input until its instantiated content is
  approved by the project.
- A conflict between a template and project authority is `BLOCKED` until an
  authorized project owner records the disposition.
- Summaries and entry points link to canonical text; they do not create a
  second version of a rule.
- Upstream playbook changes never overwrite an active project document
  automatically.

## 3. Adoption state machine

```mermaid
stateDiagram-v2
    [*] --> DISCOVERY
    DISCOVERY --> MAPPED: facts and authority inventory approved
    MAPPED --> INSTALLED: selected artifacts and local gates approved
    INSTALLED --> PILOT: real project's first whiteboard starts
    INSTALLED --> REVIEW: external case package complete
    PILOT --> REVIEW: real delivery evidence complete
    REVIEW --> ACTIVE: adoption approved
    REVIEW --> EXAMPLE_REVIEWED: external case study approved
    REVIEW --> MAPPED: contract or routing changes requested
    REVIEW --> PILOT: evidence changes requested
    ACTIVE --> UPDATING: new playbook revision assessed
    UPDATING --> REVIEW: affected artifacts and evidence ready
    REVIEW --> ACTIVE: update approved
    ACTIVE --> SUPERSEDED: project replaces this adoption

    DISCOVERY --> BLOCKED
    MAPPED --> BLOCKED
    INSTALLED --> BLOCKED
    PILOT --> BLOCKED
    REVIEW --> BLOCKED
    UPDATING --> BLOCKED
    BLOCKED --> DISCOVERY: recomputed safe state
    BLOCKED --> MAPPED: recomputed safe state
    BLOCKED --> INSTALLED: recomputed safe state
    BLOCKED --> PILOT: recomputed safe state
    BLOCKED --> REVIEW: recomputed safe state
    BLOCKED --> UPDATING: recomputed safe state
```

`BLOCKED` preserves the prior state, evidence, owner, and explicit unblock
condition. `INSTALLED` means the project-local entry point, selected contracts,
artifact locations, and gates are approved; a contributor can now start the
first need in a whiteboard. `ACTIVE` additionally requires evidence from that
first real delivery. It does not imply endorsement by the playbook maintainers
or by any third-party project used in an example. `EXAMPLE_REVIEWED` is the
terminal state for a non-authoritative external-project case study; it never
means that the external project adopted the playbook.

## 4. Inputs and preflight

Create an adoption branch under the project's normal branch policy. Before
editing project documents, record:

- the exact playbook repository and immutable commit or release;
- the target repository, base commit, and adoption scope;
- authorized policy, test, documentation, CI, and code-review owners;
- existing dirty or user-owned changes that must be preserved;
- repository contribution, architecture, API, test, CI, release, security, and
  operational authorities;
- available local and CI environments, including costly or restricted
  hardware;
- the project path that will hold the manifest and generated records; and
- whether the adoption is real, an internal trial, or a non-authoritative
  external-project case study.

If a fact cannot be verified, record it as `UNKNOWN`. Do not turn an assumption
into a project rule.

## 5. Executable integration sequence

The adoption manifest is the state and data connector. The
[Agent Adoption Trigger Template](../templates/adoption/agent-adoption-trigger.md)
is the repeatable trigger. A human or automation invokes the agent for one
manifest action, reviews the result, records the disposition, and only then
allows the next action.

### Step 1 — Pin both repositories

Use a dedicated checkout or worktree. Record the exact playbook revision and
target-project base revision before generation. Never use a moving branch name
as evidence.

### Step 2 — Place the first project document

Choose one project-owned adoption root. The first file is always the manifest:

```text
<project-adoption-root>/project-adoption-manifest.md
```

With dedicated local checkouts, create it from the pinned template:

```bash
mkdir -p "${PROJECT_CHECKOUT}/${ADOPTION_ROOT}"
cp "${PLAYBOOK_CHECKOUT}/templates/adoption/project-adoption-manifest.md" \
  "${PROJECT_CHECKOUT}/${ADOPTION_ROOT}/project-adoption-manifest.md"
```

Fill only the source/target revisions, project path, adoption type, owner,
branch, and next action. Leave the state `DISCOVERY`. Do not copy another
policy yet.

### Step 3 — Run the bootstrap prompt

Fill and submit Prompt A from the agent-trigger template. The agent reads the
runbook, the new manifest, project instructions, and the pinned repository. It
updates only repository discovery, unknowns, and the proposed routing map. It
must not create downstream policies or mark its own work approved.

**Review stop A:** an authorized reviewer verifies facts and authority links.
On approval, the reviewer records the review and moves `DISCOVERY -> MAPPED`.
Comments keep the manifest in `DISCOVERY`.

### Step 4 — Install one selected artifact at a time

Invoke Prompt B. It reads the manifest's current state and performs exactly one
dependency-ready `GENERATE` or `UPDATE_EXISTING` action. `REUSE`, `SKIP`, and
`DEFER` decisions create no copied artifact.

**Review stop B:** review that artifact against the complete mapped project
authority. Keep the manifest `MAPPED` while selected artifacts remain. Repeat
Prompt B only after the previous artifact is approved.

### Step 5 — Verify the installed integration

After every selected artifact is approved, Prompt B performs one final
installation verification:

- a human entry point links the project contract registry and start procedure;
- each supported agent entry point links the same canonical procedure;
- whiteboard, handoff, workflow, plan, evidence, and archive locations exist;
- documentation, test, and PR gates are project-owned and executable; and
- the next-need prompt can resolve every source without hidden chat context.

**Review stop C:** independently follow the entry point as a new contributor.
If it works and the manifest has no unresolved adoption blocker, record
`MAPPED -> INSTALLED`. Integration is now complete and the first need may begin.

### Step 6 — Start the first need in a whiteboard

Fill Prompt C from the agent-trigger template with the need, issue, or defect.
The agent creates only the solution whiteboard under the installed project path,
links the active manifest and project authorities, records unknowns, and stops
for whiteboard discussion. It does not generate the handoff or plan.

For a real project, record `INSTALLED -> PILOT` when that first workflow starts.
After it delivers and its evidence is reviewed, complete adoption review and
move to `ACTIVE`. A non-authoritative external-project example instead stops at
`EXAMPLE_REVIEWED` and cannot activate the external project.

## 6. Discovery and authority mapping

Inspect the repository before copying a template. Map every applicable
playbook capability to an existing project authority or a demonstrated gap.
Use the same decisions as the delivery manifest:

| Decision | Adoption meaning |
| --- | --- |
| `REUSE` | Existing project authority already satisfies the need |
| `UPDATE_EXISTING` | Project authority remains canonical but needs a reviewed change |
| `GENERATE` | No suitable authority exists; instantiate the selected template |
| `SKIP` | Capability is not applicable, with a reason |
| `DEFER` | Safe to postpone, with owner and trigger |
| `BLOCKED` | Required fact, authority, environment, or decision is unavailable |

At minimum, assess development, testing, PR/branch, documentation, API,
security, data, concurrency, performance, release, incident, and operations
rules. Do not create specialized policies for hypothetical future needs.

The manifest review gate passes only when:

- every applicable capability has one decision and canonical destination;
- conflicts, duplication, and unclear authority have dispositions;
- missing policies are supported by observed project evidence;
- deviations from the playbook are explicit and owned; and
- the smallest safe adoption scope is selected.

## 7. Install the project-local integration

Generate or update one selected artifact at a time. Independently review it
before a dependent artifact proceeds.

1. Create one concise project development entry point or extend an existing
   one. Link it from the repository locations contributors and supported agents
   actually read.
2. Link the adoption manifest and the project's canonical contract registry.
3. Reuse existing development, test, and PR authorities. Instantiate a
   playbook template only for an approved gap.
4. Define where per-need whiteboards, handoffs, workflow manifests, plans,
   decisions, evidence, and archives live.
5. Connect documentation checks to the project's test strategy and PR gates.
6. Record commands, environments, permissions, owners, failure handling, and
   evidence locations. Never claim that the playbook repository's checks ran
   in the project.
7. Review the cross-document graph for competing rules, dead links, missing
   inbound references, and instructions that an AI or new contributor cannot
   discover from the entry point.

If central automation is reused across repositories, apply the project's
dependency and security policy. Pin mutable workflow dependencies to an
immutable revision when the platform supports it, and record who reviews
updates.

## 8. Pilot one real delivery

Select one bounded, representative need that the project is already authorized
to deliver. Prefer a change that exercises normal review and test routing
without requiring the project's most expensive or dangerous environment for
the first adoption proof.

Run the approved workflow from whiteboard through delivery record:

1. conclude and review the whiteboard;
2. generate, review, and approve the handoff;
3. route and review the delivery manifest;
4. create only selected artifacts, one at a time;
5. complete the task context receipt before implementation;
6. run the project's required tests and failure triage;
7. satisfy the project's PR and reviewer requirements; and
8. reconcile evidence, retrospective actions, and archive links.

The pilot for a real adoption must use actual project evidence. A historical
replay is permitted only for a non-authoritative teaching case. It labels
reconstructed reasoning and must not claim that the historical authors
followed this playbook or ran new tests.

## 9. Adoption review and activation

The adoption reviewer independently checks:

- repository facts against the pinned target revision;
- authority mappings against the complete existing document set;
- generated documents against active project rules;
- the entry point from a new human or AI contributor's perspective;
- local and CI gate evidence;
- the pilot's state, tests, approvals, and unresolved risk;
- rollback and correction steps; and
- the next review trigger and owner.

Record `APPROVED` or `CHANGES_REQUESTED` for every material manifest item. The
manifest may enter `ACTIVE` only when required items are approved and no
unresolved conflict or fabricated evidence remains. An external-project case
study instead enters `EXAMPLE_REVIEWED` and records why real project activation
is outside its authority.

## 10. Failure handling and rollback

Before changing a document, test, configuration, or workflow after a failure,
record what happened, what was expected, the relevant authority, and whether
the cause is a project defect, adoption-design defect, configuration defect,
environment limitation, or test/checker defect. Fix the responsible layer.

If adoption creates ambiguity, blocks normal delivery, or weakens an existing
gate:

1. pause only affected adoption work;
2. preserve valid project documents and evidence;
3. restore or continue using the last approved authority;
4. mark affected mappings or generated artifacts `STALE`;
5. record the correction or rollback PR; and
6. resume from the recomputed safe state after review.

Do not delete historical adoption evidence merely because the project rolls
back or supersedes the integration.

## 11. Playbook updates and drift

An active project consumes no playbook update automatically. At the project's
review cadence or an event trigger:

1. pin the candidate playbook revision;
2. read its changelog and migration guidance;
3. compare affected templates and rules with the adoption manifest;
4. classify each change as `ACCEPT`, `ADAPT`, `REJECT`, or `NOT_APPLICABLE`;
5. update only affected project artifacts through their normal owners;
6. rerun applicable documentation and delivery gates; and
7. approve a new manifest revision before returning to `ACTIVE`.

Repository templates are appropriate for an initial copy, not synchronization:
GitHub states that repositories created from a template have unrelated
histories. Reusable workflow references can reduce duplicated CI, but GitHub
recommends a commit SHA when consumers require an immutable workflow version.

## 12. External-project example rules

A public project used as a teaching example requires:

- an exact public repository commit and inspection date;
- an immutable playbook checkout; an example stored in that checkout may record
  its own source as the output of `git rev-parse HEAD` instead of embedding an
  impossible self-referential commit hash;
- links to upstream authorities instead of copied normative text;
- a clear no-affiliation/no-endorsement statement;
- separation of verified facts, interpretations, and hypothetical additions;
- no secrets, private data, or claims about unobserved approvals/tests;
- no upstream change or message without explicit authorization; and
- a drift warning that requires revalidation before reuse.

## 13. Definition of Done

- [ ] Source and target revisions are immutable and recorded.
- [ ] Existing project authorities and owners are verified.
- [ ] Every applicable playbook capability has a reviewed adoption decision.
- [ ] Conflicts, deviations, gaps, and deferred work are explicit.
- [ ] Project-local contracts and the contributor/agent entry point are linked.
- [ ] Documentation, PR, and test enforcement passes in the adopting project.
- [ ] The manifest is `INSTALLED`, and the next-need prompt creates only the
      first whiteboard without hidden context.
- [ ] A real adoption completed one bounded real delivery; an external teaching
      case completed its declared evidence without claiming project adoption.
- [ ] Any historical replay labels reconstructed reasoning and unrun evidence.
- [ ] Adoption review, rollback, update ownership, and next review are recorded.
- [ ] A real adoption is `ACTIVE` through project authority, or a
      non-authoritative external case is `EXAMPLE_REVIEWED` without an adoption
      claim.

## 14. References

- [GitHub — Creating a repository from a template](https://docs.github.com/en/repositories/creating-and-managing-repositories/creating-a-repository-from-a-template): template-derived repositories have unrelated histories.
- [GitHub — Reusing workflow configurations](https://docs.github.com/en/actions/concepts/workflows-and-actions/reusing-workflow-configurations): immutable SHA references and reusable-workflow trade-offs.
- [Google Engineering Practices — Small CLs](https://google.github.io/eng-practices/review/developer/small-cls.html): self-contained increments, related tests, and working integration targets.
