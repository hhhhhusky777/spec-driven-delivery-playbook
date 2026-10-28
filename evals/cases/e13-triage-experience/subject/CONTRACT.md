# Packaged limits loader

`loadLimits()` in `limits.mjs` asynchronously reads this package's
`config/limits.json` and returns its parsed object. A job runner may import it
while its working directory is any existing directory. Calling the loader must
not change the process working directory. No new argument is required from
existing callers. A genuinely missing or invalid packaged file remains an error;
do not substitute defaults or search other projects for a replacement.

`docs/experience.md` owns this project's reusable lessons. It describes one
verified synthetic setup incident, not proof of the present cause. Project
contracts and observed evidence remain authoritative. Changes authorized by
TASK.md may refine that lesson while preserving its useful applicability.
