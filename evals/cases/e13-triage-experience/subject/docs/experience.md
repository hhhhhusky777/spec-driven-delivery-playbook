# Project Experience

## Limits loader reports ENOENT

In the earlier synthetic onboarding snapshot, the package's `config/` directory
was absent. Restoring the tracked packaged configuration fixed loading when run
from the project root. Check whether the named file actually exists before
using this remedy; restore the canonical packaged file only when it is missing.
Do not invent a replacement config or suppress the error.

Scope: the verified missing-file setup case. Other causes of ENOENT have not
been established by this lesson. The packaged configuration is not secret.
