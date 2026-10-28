import assert from 'node:assert/strict';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { resolveLabels as baseline } from './subject/resolve-labels.mjs';

const root = process.argv[2];
if (!root) throw new Error('Supply the subject workspace path');
const { resolveLabels } = await import(pathToFileURL(resolve(root, 'resolve-labels.mjs')));
const catalog = Object.freeze([
  Object.freeze({ sku: ' Bolt ', label: 'first' }),
  Object.freeze({ sku: 'BOLT', label: 'later' }),
  Object.freeze({ sku: '__proto__', label: 'literal' }),
]);
const requests = Object.freeze([' BOLT ', 'missing', 'bolt', '__proto__']);
assert.deepEqual(resolveLabels(catalog, requests), ['first', null, 'first', 'literal']);
assert.deepEqual(resolveLabels([], ['bolt']), [null]);
assert.deepEqual(resolveLabels(catalog, []), []);
assert.deepEqual(resolveLabels([{ sku: 'bolt', label: 'new' }], ['bolt']), ['new'], 'Stale cross-call result');
const rows = Array.from({ length: 64 }, (_, i) => ({ sku: ` sku-${i} `, label: `label-${i}` }));
const lookups = Array.from({ length: 256 }, (_, i) => `SKU-${i % 64}`);
function measure(fn) {
  let calls = 0;
  const result = fn(rows, lookups, sku => { calls += 1; return sku.trim().toLowerCase(); });
  return { result, calls };
}
const before = measure(baseline);
const after = measure(resolveLabels);
assert.deepEqual(after.result, lookups.map((_, i) => `label-${i % 64}`));
assert.ok(after.calls < before.calls, 'Repeated normalization work was not reduced');
console.log(JSON.stringify({ baselineNormalizationCalls: before.calls, candidateNormalizationCalls: after.calls }));
console.log('E15 behavior/cost checks PASS; research, measurement honesty and proportionality require independent review.');
