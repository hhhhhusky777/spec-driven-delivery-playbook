---
name: sdd-project-adoption
description: Adopt the SDD playbook once by recording project authority and preparing the reusable three-document workspace.
---

# SDD Project Adoption

## Outcome

Install one immutable playbook revision and leave the project ready for future
deliveries without repeating adoption.

## Required result

- A manifest records the source repository, full revision, adoption state,
  discovered canonical policies, owner decisions, and project boundaries.
- A neutral whiteboard is ready for design work.
- No feature implementation plan exists until a feature is planned.
- The generated runtime and managed workflow skill match the manifest pin.
- Existing project authority is preserved unless the owner explicitly changes
  it.

Adoption is still one-time when project policy evolves. Future deliveries
semantically reconcile current repository authority with the manifest before
design work and update stable links or boundaries when a canonical source is
added, removed, moved, or changed. They do not rerun adoption or copy policy
text into the manifest.

Do not create additional status or evidence documents. Link the project's
canonical authorities from the manifest instead of copying policy text.

## Judgment and review

Apply the six goals: clear boundaries, stable outcomes, key information only,
proportional effort, agent discretion, and necessary complexity only. Batch
related discovery and owner decisions. Review one coherent adoption result,
and present the owner a compact table of installed revision, discovered
authorities, material choices, validation, gaps, and requested acceptance.

> [!IMPORTANT]
> When discovery finishes, the agent response MUST include one simple table
> covering existing policies, missing applicable policies, and discovered gaps.
> Use columns `Category`, `Policy / gap`, `Canonical source / evidence`, and
> `Impact / proposed handling / owner decision`. Use `None` for an empty category.
> Link existing authority; do not copy policy text. Distinguish a missing source
> from a material rule or authority gap, and disclose whether it blocks adoption.
> This summarizes manifest discovery and gap records; it adds no document,
> mandatory policy file, or review gate.

Follow the project's canonical error-handling authority rather than defining a
second recovery procedure here. Human acceptance is required before adoption
becomes installed.
