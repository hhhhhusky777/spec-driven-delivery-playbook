---
name: sdd-playbook-upgrade
description: Synchronize an adopted project with the latest immutable SDD playbook revision without modifying feature-specific work.
---

# SDD Playbook Upgrade

## Outcome

The manifest and reusable SDD workspace use the latest immutable playbook
revision while project authority and active feature content remain intact.

## Boundaries

- Run the upgrade in the current delivery's isolated worktree and owned
  delivery branch before whiteboard or implementation work. Include it in that
  delivery's candidate instead of merging a separate target-branch upgrade.
- A fresh worktree regenerates its own manifest-pinned runtime before preparing
  the newer candidate; runtime from another worktree is never reused.
- Upgrade only the manifest, neutral reusable whiteboard structure, managed
  skills, and generated runtime. Never rewrite feature-specific whiteboard
  content or implementation-plan content.
- Read the implementation plan only to determine whether work is at a safe
  boundary. It is not an upgrade output and its status is not copied elsewhere.
- Keep the previous pin authoritative until applicable validation, two
  independent reviews, and human acceptance pass.
- Do not install playbook source tests, lifecycle engines, evidence helpers,
  publication tools, or CI into an adopting project.
- Preserve canonical project policies and explicit owner decisions.
- Keep the branch point as the ordinary working baseline; synchronize the
  completed candidate with its target and run affected checks on the resulting
  candidate before final review. Route exceptional recovery through the
  project's canonical error-handling authority.

## Synchronization result

Resolve the source repository's latest `main` to a full SHA. The pull request
brief records old and new revisions, reusable changes, preserved authority,
material inconsistencies, applicable checks, reviewer results, and the human
decision. Detailed history stays in GitHub.

The agent chooses a proportional comparison, edit order, and recovery method.
Follow the project's canonical error-handling authority instead of restating a
second recovery or escalation procedure here.

## Completion

The accepted full revision is in the manifest, managed skills and runtime match
it, reusable documents are mutually consistent, obsolete installer-owned
temporary content is removed, and validation reports current. A rejected or
failed candidate leaves or restores the previous pin.
