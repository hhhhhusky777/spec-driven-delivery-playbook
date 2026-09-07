# Playbook upgrade assessment

| Field | Value |
| --- | --- |
| State | `NONE` |
| Current revision | Read from [project adoption manifest](project-adoption-manifest.md) |
| Candidate revision | None |
| Current blocker | None |
| Next action | Create an assessment only when an immutable newer candidate is intentionally prepared |

No upgrade is active. This stable entry point is reusable; it carries no prior
delivery task, review, candidate, or continuation authority. A future upgrade
must use the verified installer-generated upgrade guide and the candidate
revision's assessment template, then pass independent and human review before
cutover.
