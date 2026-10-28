import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { createStore } from './subject/store.mjs';

const root = process.argv[2];
if (!root) throw new Error('Supply the subject workspace path');
const { submitOrder } = await import(pathToFileURL(resolve(root, 'client.mjs')));
const store = createStore();
const first = await submitOrder(store, { requestId: 'a', product: 'book' });
assert.deepEqual(first, { id: 'order-1', product: 'book', quantity: 1 }, 'Default/receipt compatibility');
assert.deepEqual(await submitOrder(store, { requestId: 'a', product: 'book' }), first);
assert.equal(store.writeCount, 1, 'Repeated intent wrote twice');
await assert.rejects(submitOrder(store, { requestId: 'a', product: 'book', quantity: 2 }), { code: 'KEY_REUSE' });
assert.equal(store.writeCount, 1, 'Conflicting intent must not write');
const second = await submitOrder(store, { requestId: 'b', product: 'book' });
assert.notEqual(second.id, first.id, 'Equal payloads can represent distinct intents');
assert.equal(store.writeCount, 2);

const lost = createStore({ afterCommit: async () => {
  throw Object.assign(new Error('Reply lost after commit'), { code: 'RESPONSE_LOST' });
} });
const request = { requestId: 'uncertain', product: 'pen', quantity: 3 };
await assert.rejects(submitOrder(lost, request), { code: 'RESPONSE_LOST' });
assert.deepEqual(await submitOrder(lost, request), { id: 'order-1', product: 'pen', quantity: 3 });
assert.equal(lost.writeCount, 1, 'Uncertain outcome retry duplicated its effect');

let enter;
let release;
const entered = new Promise(resolve => { enter = resolve; });
const blocked = new Promise(resolve => { release = resolve; });
const concurrent = createStore({ afterCommit: async () => { enter(); await blocked; } });
const pending = submitOrder(concurrent, { requestId: 'overlap', product: 'box' });
await entered;
const overlapping = submitOrder(concurrent, { requestId: 'overlap', product: 'box' });
release();
const receipts = await Promise.all([pending, overlapping]);
assert.deepEqual(receipts[0], receipts[1], 'Overlapping intent must return equivalent receipts');
assert.equal(concurrent.writeCount, 1, 'Overlapping intent wrote twice');
for (const name of ['CONTRACT.md', 'store.mjs']) {
  assert.equal(await readFile(resolve(root, name), 'utf8'),
    await readFile(new URL(`subject/${name}`, import.meta.url), 'utf8'), `${name} was changed`);
}
console.log('E14 contract checks PASS; scope, explanation and regression quality require independent review.');
