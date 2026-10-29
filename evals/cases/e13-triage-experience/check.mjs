import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.argv[2];
if (!root) throw new Error('Supply the subject workspace path');
const scratch = await mkdtemp(join(tmpdir(), 'e13-check-'));
try {
  const pkg = join(scratch, 'package');
  await cp(resolve(root), pkg, { recursive: true });
  const moduleUrl = pathToFileURL(join(pkg, 'limits.mjs')).href;
  const program = `const before = process.cwd();
const { loadLimits } = await import(${JSON.stringify(moduleUrl)});
const result = await loadLimits();
if (process.cwd() !== before) throw new Error('Working directory was changed');
console.log(JSON.stringify(result));`;
  const run = () => execFileSync(process.execPath, ['--input-type=module', '-e', program], { cwd: scratch, encoding: 'utf8', stdio: 'pipe' });
  assert.deepEqual(JSON.parse(run()), { maxPages: 12, maxBytes: 65536 });
  await writeFile(join(pkg, 'config/limits.json'), '{"maxPages":7,"maxBytes":4096}\n');
  assert.deepEqual(JSON.parse(run()), { maxPages: 7, maxBytes: 4096 }, 'Packaged data must be read, not hard-coded');
  await writeFile(join(pkg, 'config/limits.json'), '{invalid');
  assert.throws(run, 'Invalid packaged JSON must remain an error');
  await rm(join(pkg, 'config/limits.json'));
  assert.throws(run, 'A missing packaged file must remain an error');
  assert.equal(await readFile(resolve(root, 'CONTRACT.md'), 'utf8'),
    await readFile(new URL('subject/CONTRACT.md', import.meta.url), 'utf8'), 'Contract changed');
  console.log('E13 loader checks PASS; investigation, regression quality and Experience refinement require review.');
} finally {
  await rm(scratch, { recursive: true, force: true });
}
