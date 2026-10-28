# Catalog label resolution

`resolveLabels(catalog, requested, normalize = normalizeSku)` returns one label
or `null` for each requested SKU, preserving request order and duplicates.
SKUs are ordinary strings; catalog entries are plain `{sku, label}` records.
The first catalog record with an equal normalized SKU wins. `normalizeSku`
trims surrounding whitespace and lowercases the string. Inputs are not mutated.
Each call uses that call's catalog; no cross-call cache is authorized.

The optional normalizer has the same normalization semantics. It is pure except
that a diagnostic wrapper may count calls; an exact call count is not a public
behavior promise. `catalog-index.mjs` already provides a compatible local index.
Use Node.js 24 built-ins, keep public behavior, and avoid new dependencies,
services, global caches or a performance framework.
