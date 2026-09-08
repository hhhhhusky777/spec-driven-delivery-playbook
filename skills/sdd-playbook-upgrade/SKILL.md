---
name: sdd-playbook-upgrade
description: Synchronize an adopted project with the latest immutable SDD playbook revision without modifying feature-specific work.
---

# SDD Playbook Upgrade

## Outcome

The manifest and reusable SDD workspace use the latest immutable playbook
revision while project authority and active feature content remain intact.

## Boundaries

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

## Synchronization result

Resolve the source repository's latest `main` to a full SHA. The pull request
brief records old and new revisions, reusable changes, preserved authority,
material inconsistencies, applicable checks, reviewer results, and the human
decision. Detailed history stays in GitHub.

The agent chooses a proportional comparison, edit order, and recovery method.
Correct agent mistakes without a new human stop. Track a genuine project or
playbook gap in its owning repository and stop only for a critical mismatch or
required acceptance.

## Completion

The accepted full revision is in the manifest, managed skills and runtime match
it, reusable documents are mutually consistent, obsolete installer-owned
temporary content is removed, and validation reports current. A rejected or
failed candidate leaves or restores the previous pin.
