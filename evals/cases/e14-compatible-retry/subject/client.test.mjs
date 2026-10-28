import assert from 'node:assert/strict';
import test from 'node:test';
import { submitOrder } from './client.mjs';
import { createStore } from './store.mjs';

test('existing callers can omit quantity', async () => {
  const store = createStore();
  const receipt = await submitOrder(store, { requestId: 'legacy-1', product: 'book' });
  assert.deepEqual(receipt, { id: 'order-1', product: 'book', quantity: 1 });
});

test('caller retry after response loss does not duplicate the committed order', async () => {
  const store = createStore({ afterCommit: async () => {
    throw Object.assign(new Error('Reply lost after commit'), { code: 'RESPONSE_LOST' });
  } });
  const request = { requestId: 'retry-1', product: 'book' };
  await assert.rejects(submitOrder(store, request), { code: 'RESPONSE_LOST' });
  const receipt = await submitOrder(store, request);
  assert.equal(receipt.id, 'order-1');
  assert.equal(store.writeCount, 1);
});
