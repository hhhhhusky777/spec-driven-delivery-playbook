import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import test from 'node:test';

const moduleUrl = new URL('limits.mjs', import.meta.url).href;
const program = `const { loadLimits } = await import(${JSON.stringify(moduleUrl)});
const before = process.cwd();
const limits = await loadLimits();
if (process.cwd() !== before) throw new Error('Loader changed working directory');
console.log(JSON.stringify(limits));`;

test('job-runner import works independently of launch directory', async t => {
  const cwd = await mkdtemp(join(tmpdir(), 'e13-runner-'));
  t.after(() => rm(cwd, { recursive: true, force: true }));
  const output = execFileSync(process.execPath, ['--input-type=module', '-e', program], { cwd, encoding: 'utf8' });
  assert.deepEqual(JSON.parse(output), { maxPages: 12, maxBytes: 65536 });
});
