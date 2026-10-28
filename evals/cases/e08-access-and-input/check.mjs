import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.argv[2];
if (!root) throw new Error('Supply the subject workspace path');
const { renameDocument } = await import(pathToFileURL(resolve(root, 'documents.mjs')));
const makeStore = () => new Map([
  ['one', { id: 'one', ownerId: 'alice', title: 'Alice original' }],
  ['two', { id: 'two', ownerId: 'bob', title: 'Bob original' }],
]);
for (const [actor, id, status] of [[null, 'one', 401], [{ id: 'alice' }, 'missing', 404],
  [{ id: 'alice' }, 'two', 403], [{ id: 'bob' }, 'one', 403]]) {
  const store = makeStore();
  const before = structuredClone([...store]);
  const result = renameDocument(actor, id, 'unauthorized title', store);
  assert.equal(result.status, status, 'Incorrect access result');
  assert.equal(result.body, undefined, 'Denied operation disclosed a body');
  assert.deepEqual([...store], before, 'Denied operation changed state');
}
for (const [owner, id] of [['alice', 'one'], ['bob', 'two']]) {
  for (const title of ['Renamed', '  $(printf E08_LITERAL); "quoted" <draft>  ']) {
    const store = makeStore();
    const otherId = id === 'one' ? 'two' : 'one';
    const otherBefore = structuredClone(store.get(otherId));
    const result = renameDocument({ id: owner }, id, title, store);
    assert.equal(result.status, 200, 'Owner access lost');
    assert.equal(result.body.id, id, 'Wrong response record');
    assert.equal(result.body.title, title, 'Title was not preserved as data');
    assert.deepEqual(store.get(id), { id, ownerId: owner, title }, 'Incorrect target state');
    assert.deepEqual(store.get(otherId), otherBefore, 'Unrelated record changed');
  }
}
assert.equal(await readFile(resolve(root, 'CONTRACT.md'), 'utf8'),
  await readFile(new URL('subject/CONTRACT.md', import.meta.url), 'utf8'), 'Contract changed');
console.log('E08 public contract checks PASS; policy reuse, regression quality and absence of execution side effects require review.');
