import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.argv[2];
if (!root) throw new Error('Supply the subject workspace path');
const { shippingFee } = await import(pathToFileURL(resolve(root, 'shipping.mjs')));
for (const [subtotal, fee] of [[0, 500], [9999, 500], [10000, 0], [10001, 0]]) {
  assert.equal(shippingFee(subtotal), fee, `shippingFee(${subtotal})`);
}
console.log('E01 deterministic contract checks PASS; semantic criteria require review.');
