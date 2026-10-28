import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const subject = fileURLToPath(new URL('subject/', import.meta.url));
const check = fileURLToPath(new URL('check.mjs', import.meta.url));
const original = await readFile(new URL('subject/documents.mjs', import.meta.url), 'utf8');
const valid = "import { canEdit } from './policy.mjs';\n" + original.replace(
  '  document.title = title;', '  if (!canEdit(actor, document)) return { status: 403 };\n  document.title = title;');
async function fixture(t, implementation) {
  const root = await mkdtemp(join(tmpdir(), 'e08-calibration-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await cp(subject, root, { recursive: true });
  await writeFile(join(root, 'documents.mjs'), implementation);
  return root;
}
function run(root) {
  return execFileSync(process.execPath, [check, root], { cwd: root, encoding: 'utf8', stdio: 'pipe' });
}

for (const [name, implementation, expectedError] of [
  ['original missing object permission', original, 'Incorrect access result'],
  ['deny every owner', valid.replace('!canEdit(actor, document)', 'true'), 'Owner access lost'],
  ['mutate before rejecting', valid.replace('  if (!canEdit', '  document.title = title;\n  if (!canEdit'), 'Denied operation changed state'],
  ['sanitize supported literal titles', valid.replace('document.title = title;', "document.title = title.replace(/[;$]/g, '');"), 'Title was not preserved as data'],
  ['disclose record on denial', valid.replace('return { status: 403 }', 'return { status: 403, body: document }'), 'Denied operation disclosed a body'],
]) {
  test(`rejects ${name}`, async t => {
    const root = await fixture(t, implementation);
    assert.throws(() => run(root), err => err.status !== 0 && String(err.stderr).includes(expectedError));
  });
}

test('accepts existing-policy reuse and harmless local naming changes', async t => {
  const root = await fixture(t, valid);
  assert.match(run(root), /public contract checks PASS/);
  await writeFile(join(root, 'documents.mjs'), valid.replaceAll('document', 'record').replace('title: record.title }', 'title: record.title, note: \"updated\" }'));
  assert.match(run(root), /public contract checks PASS/);
});
