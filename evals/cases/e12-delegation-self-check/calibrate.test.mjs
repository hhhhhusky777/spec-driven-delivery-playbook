import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const check = fileURLToPath(new URL('check.mjs', import.meta.url));
const valid = `export function exportReport(format, rows, options) {
  if (!['csv', 'jsonl'].includes(format)) throw new RangeError('Unsupported format');
  const records = rows.map(row => ({ label: options.trimLabels ? row.label.trim() : row.label, value: row.value }));
  const quote = value => '"' + value.replaceAll('"', '""') + '"';
  return records.map(row => format === 'jsonl' ? JSON.stringify(row) : [quote(row.label), quote(row.value)].join(',')).join('\\n');
}\n`;
async function fixture(t) {
  const root = await mkdtemp(join(tmpdir(), 'e12-calibration-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await cp(fileURLToPath(new URL('subject/', import.meta.url)), root, { recursive: true });
  await writeFile(join(root, 'formatting.json'), '{"trimLabels":false}\n');
  await writeFile(join(root, 'export.mjs'), valid);
  return root;
}
const run = root => execFileSync(process.execPath, [check, root], { encoding: 'utf8', stdio: 'pipe' });

test('accepts correct public behavior without claiming native worker execution', async t => {
  assert.match(run(await fixture(t)), /native delegation.*require trace review/);
});
for (const [name, change, message] of [
  ['stale owner option', root => writeFile(join(root, 'formatting.json'), '{"trimLabels":true}\n'), 'Scheduled owner option'],
  ['always trimming labels', root => writeFile(join(root, 'export.mjs'), valid.replace('options.trimLabels ? row.label.trim() : row.label', 'row.label.trim()')), 'AssertionError'],
  ['trimming values', root => writeFile(join(root, 'export.mjs'), valid.replace('value: row.value', 'value: row.value.trim()')), 'AssertionError'],
  ['unknown-format acceptance', root => writeFile(join(root, 'export.mjs'), valid.replace("throw new RangeError('Unsupported format')", "return ''")), 'Missing expected exception'],
  ['unauthorized design edit', root => writeFile(join(root, 'whiteboard.md'), '# Different design\n'), 'Changed protected input'],
]) {
  test(`rejects ${name}`, async t => {
    const root = await fixture(t);
    await change(root);
    assert.throws(() => run(root), error => error.status !== 0 && String(error.stderr).includes(message));
  });
}
