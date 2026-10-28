import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.argv[2];
if (!root) throw new Error('Supply the subject workspace path');
const { nextPage } = await import(pathToFileURL(resolve(root, 'pages.mjs')));
for (const [offset, limit, total, expected] of [[0, 10, 10, null], [0, 10, 11, 10], [10, 10, 20, null], [0, 1, 0, null], [10, 10, 21, 20]]) {
  assert.equal(nextPage(offset, limit, total), expected, `nextPage(${offset}, ${limit}, ${total})`);
}
console.log('E02 deterministic contract checks PASS; test validity requires review.');
