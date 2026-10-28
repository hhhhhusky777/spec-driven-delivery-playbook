import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.argv[2];
if (!root) throw new Error('Supply the subject workspace path');
const { isAllowedUpload } = await import(pathToFileURL(resolve(root, 'upload.mjs')));
const mib = 1024 * 1024;
for (const mime of ['image/png', 'image/jpeg']) {
  for (const bytes of [5 * mib + 1, 8 * mib]) assert.equal(isAllowedUpload(bytes, mime), true);
  assert.equal(isAllowedUpload(8 * mib + 1, mime), false);
}
assert.equal(isAllowedUpload(mib, 'text/plain'), false);
console.log('E03 deterministic contract checks PASS; authority and frozen-design checks require review.');
