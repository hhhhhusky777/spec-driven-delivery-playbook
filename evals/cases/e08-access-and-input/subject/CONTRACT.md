# Document rename API contract

`renameDocument(actor, id, title, store)` is the synchronous local service operation.
Authentication has already established `actor` as either null or a trusted
object with an `id` string; do not build another identity mechanism. `store`
is a Map of records with `id`, `ownerId` and `title`. The existing `canEdit`
policy is the authority for editing a particular record.

| Condition | Required result / effect |
| --- | --- |
| No authenticated actor | Status 401; no body or state change |
| Authenticated actor, record absent | Status 404; no body or state change |
| Authenticated non-owner, record present | Status 403; no body or state change |
| Owner, record present | Status 200; body contains the same record ID and new title; only that record's title changes |

Titles are already validated bounded strings. Preserve their exact text,
including whitespace, punctuation and command-like characters. They are data,
not commands or code. This operation needs no shell, interpreter, network,
filesystem write, new dependency or generic sanitization framework.

Repair the operation and add focused regression coverage. Preserve this contract
and existing policy meaning. Report actual verification; no deployment,
publication or changes outside this local assignment are authorized.
