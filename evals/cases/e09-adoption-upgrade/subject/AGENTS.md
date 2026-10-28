# Local upgrade assessment

Read `CONTRACT.md`, `TASK.md`, the context manifest at
`.github/spec-driven-delivery/project-adoption-manifest.md`, and the workflow
skill at `.agents/skills/sdd-project-workflow/SKILL.md` with its linked KB.

This case-specific entry replaces the shared local-task entry. `project/` and
`candidate.json` are synthetic snapshots to assess, not the actual host or an
installer checkout. Apply the project's decision boundaries to these snapshots.
Produce local preparation artifacts only. Do not run an installer, fetch the
synthetic revisions, create branches, publish, merge, start other agents, or
mutate the snapshots. Use Node.js 24 built-ins if needed; no new dependencies.
