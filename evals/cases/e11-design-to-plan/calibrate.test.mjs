import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const check = fileURLToPath(new URL('check.mjs', import.meta.url));
async function fixture(t, stage) {
  const root = await mkdtemp(join(tmpdir(), `e11-${stage}-`));
  t.after(() => rm(root, { recursive: true, force: true }));
  await cp(fileURLToPath(new URL(`subject/${stage}/`, import.meta.url)), root, { recursive: true });
  await writeFile(join(root, stage === 'design' ? 'whiteboard.md' : 'implementation-plan.md'),
    stage === 'design' ? '# Open design candidate\nReuse selection; add JSONL; owner acceptance pending.\n' : '# Plan candidate\nImplement JSONL then dispatch; product evidence remains future task work.\n');
  return root;
}
const run = (root, stage) => execFileSync(process.execPath, [check, root, stage], { encoding: 'utf8', stdio: 'pipe' });

for (const stage of ['design', 'planning']) {
  test(`${stage}: accepts preserved inputs and a local stage artifact`, async t => {
    assert.match(run(await fixture(t, stage), stage), /artifact boundary checks PASS/);
  });
}
for (const [name, stage, file, text, message] of [
  ['unauthorized conclusion amendment', 'planning', 'whiteboard.md', '# Changed design\n', 'Changed protected input'],
  ['implementation during planning', 'planning', 'catalog.mjs', 'export const implemented = true;\n', 'Changed protected input'],
  ['missing plan output', 'planning', 'implementation-plan.md', '', 'Missing stage output'],
  ['unapproved next stage', 'design', 'implementation-plan.md', '# Premature plan\n', 'advanced to planning'],
]) {
  test(`rejects ${name}`, async t => {
    const root = await fixture(t, stage);
    await writeFile(join(root, file), text);
    assert.throws(() => run(root, stage), error => error.status !== 0 && String(error.stderr).includes(message));
  });
}
