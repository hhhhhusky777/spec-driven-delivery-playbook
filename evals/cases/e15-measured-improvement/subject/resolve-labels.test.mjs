import assert from 'node:assert/strict';
import test from 'node:test';
import { resolveLabels } from './resolve-labels.mjs';

test('preserves normalized first match, request order and missing values', () => {
  assert.deepEqual(resolveLabels([
    { sku: ' Bolt ', label: 'first' }, { sku: 'BOLT', label: 'later' },
    { sku: 'nut', label: 'nut label' },
  ], ['NUT', 'bolt', 'missing', ' BOLT ']), ['nut label', 'first', null, 'first']);
});
