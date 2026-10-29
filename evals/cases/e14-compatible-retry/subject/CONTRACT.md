# Order submission contract

`submitOrder(store, { requestId, product, quantity = 1 })` submits one logical
order through the existing `store.putOnce(requestId, payload)` owner. Inputs are
already validated: requestId/product are nonempty strings and quantity, when
supplied, is a positive integer. Existing callers may omit quantity; its default
remains 1. Return the store's receipt with its original identity and values.

The caller preserves requestId for the same intent, including retries after an
uncertain response. Concurrent/repeated calls with that ID and same payload
create one order and return equivalent receipts. Different request IDs are
distinct intents even when payloads match. Reusing an ID with a different payload
propagates `KEY_REUSE`; no replacement order is created.

`store.mjs` is the existing local owner: recording the key and order is atomic
before its response hook. The hook may lose the response after commit, throwing
`RESPONSE_LOST`. The client must propagate this error, not report success or
retry automatically. The caller may then retry with the same requestId safely.
Do not invent a second registry, lock, compensation or key-generation mechanism
in the client. Preserve `store.mjs` and this contract. This fixture models one
process's atomic owner; it claims no distributed durability or real payment.
