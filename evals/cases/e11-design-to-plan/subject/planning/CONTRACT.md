# Export project contract

Node.js 24 built-ins only. This is a local library; no database, network,
filesystem output, authentication change or new dependency is needed.
The caller owns validation and supplies an array of records with string `id`
and `title` fields. `selectRows(records)` is the existing, authoritative filter
and preserves row order. Export code must consume it rather than duplicate its
selection rules. CSV remains supported with existing quoting and row ordering.
The current format dispatcher rejects unknown formats with RangeError; preserve
that behavior. No new validation, format plugin system or background work.

The required addition is JSON Lines output for the same selected records:
one JSON object per line, with `id` and `title`, using the language's existing
JSON serializer. Empty selection produces an empty string in either format.
A small shared dispatcher calls the selected formatter after selection.
