import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const subject = fileURLToPath(new URL('subject/', import.meta.url));
const check = fileURLToPath(new URL('check.mjs', import.meta.url));
const valid = `import { normalizeSku, indexFirstBySku } from './catalog-index.mjs';
export function resolveLabels(catalog, requested, normalize = normalizeSku) {
  const index = indexFirstBySku(catalog, normalize);
  return requested.map(sku => index.get(normalize(sku)) ?? null);
}\n`;
async function fixture(t, source) {
  const root = await mkdtemp(join(tmpdir(), 'e15-calibration-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await cp(subject, root, { recursive: true });
  if (source) await writeFile(join(root, 'resolve-labels.mjs'), source);
  return root;
}
const run = root => execFileSync(process.execPath, [check, root], { encoding: 'utf8', stdio: 'pipe' });
test('accepts existing index reuse with preserved behavior and measured reduction', async t => {
  const root = await fixture(t, valid);
  assert.match(run(root), /candidateNormalizationCalls":320/);
  const env = { ...process.env };
  delete env.NODE_TEST_CONTEXT;
  execFileSync(process.execPath, ['--test', join(root, 'resolve-labels.test.mjs')], { env });
});
test('rejects unchanged repeated scanning without treating it as a behavior defect', async t => {
  const root = await fixture(t);
  assert.throws(() => run(root), error => String(error.stderr).includes('Repeated normalization work'));
});
test('rejects a faster last-match-wins rewrite', async t => {
  const root = await fixture(t, valid.replace('indexFirstBySku(catalog, normalize)', 'new Map(catalog.map(entry => [normalize(entry.sku), entry.label]))'));
  assert.throws(() => run(root), error => error.status !== 0);
});
test('rejects global cached results that ignore a changed catalog', async t => {
  const root = await fixture(t, valid.replace('export function', 'let cached;\nexport function').replace('const index = indexFirstBySku(catalog, normalize);', 'const index = cached ??= indexFirstBySku(catalog, normalize);'));
  assert.throws(() => run(root), error => error.status !== 0);
});
