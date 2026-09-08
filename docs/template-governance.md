# Template Governance

This document owns reusable-template design. Project-specific policy stays in
the project, and Git plus pull requests preserve prior template versions.

## Outcome boundaries

Apply the quality policy's [six goals](documentation-quality-policy.md#six-goals-and-agent-judgment).

- Each maintained template has one purpose and contains only information its
  consumer needs.
- Templates ask for project facts without inventing them or pretending every
  field applies everywhere.
- Rules remain with their canonical owner; templates link instead of copying.
- A change cannot silently weaken an installed project's active obligation.
- Examples are honest, current, and no more elaborate than the behavior they
  demonstrate.
- Internal agent methods remain adaptable unless a named invariant requires a
  particular mechanism.

## Maintained model

| Template | Owner responsibility |
| --- | --- |
| Project adoption manifest | Installed revision, canonical authorities, and stable boundaries |
| Solution whiteboard | One active feature's discussion and concluded design |
| Implementation plan | Tasks, Definition of Done, validation, and all active-delivery state |

The pull request owns review, checks, acceptance, merge evidence, and detailed
history. Additional templates require a distinct durable responsibility that
cannot fit one of these owners or GitHub.

## Change outcome

A template change explains the reusable problem, affected ownership,
compatibility or migration impact, and proportional validation. The exact
candidate has no duplicate authority; README, diagrams, examples, skills, and
installer behavior agree; applicable automated and semantic reviews pass.

Review when delivery evidence exposes repeated ambiguity, unnecessary work, a
missing safety boundary, or obsolete behavior. Do not update merely to appear
current.

Installed projects synchronize only at a safe boundary through the
[upgrade skill](../skills/sdd-playbook-upgrade/SKILL.md). The old pin remains
authoritative until the candidate is reviewed, accepted, and cut over.

## Review checklist

- [ ] Purpose and ownership are clear and non-duplicative.
- [ ] Required fields protect a real decision or invariant.
- [ ] Project data, secrets, and unsupported evidence are absent.
- [ ] README, diagrams, skills, examples, and related templates agree.
- [ ] Compatibility or migration impact and applicable validation are recorded.
- [ ] Review follows the quality policy and remains traceable to the exact PR candidate.
