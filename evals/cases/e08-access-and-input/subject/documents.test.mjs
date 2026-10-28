import assert from 'node:assert/strict';
import test from 'node:test';
import { renameDocument } from './documents.mjs';

test('owner can rename a document', () => {
  const store = new Map([['one', { id: 'one', ownerId: 'alice', title: 'Before' }]]);
  assert.deepEqual(renameDocument({ id: 'alice' }, 'one', 'After', store), {
    status: 200, body: { id: 'one', title: 'After' },
  });
});
