import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const subject = fileURLToPath(new URL('subject/', import.meta.url));
const check = fileURLToPath(new URL('check.mjs', import.meta.url));
const prelude = "import { readFile } from 'node:fs/promises';\n";
const implementations = [
  ['module URL', prelude + "export async function loadLimits() { return JSON.parse(await readFile(new URL('./config/limits.json', import.meta.url), 'utf8')); }", true],
  ['module directory', prelude + "import { join } from 'node:path'; export async function loadLimits() { return JSON.parse(await readFile(join(import.meta.dirname, 'config', 'limits.json'), 'utf8')); }", true],
  ['original launch-directory bug', null, false],
  ['process-wide chdir workaround', prelude + "export async function loadLimits() { process.chdir(import.meta.dirname); return JSON.parse(await readFile('config/limits.json', 'utf8')); }", false],
  ['hard-coded config', 'export async function loadLimits() { return {maxPages:12,maxBytes:65536}; }', false],
  ['suppressed missing config', prelude + "export async function loadLimits() { try { return JSON.parse(await readFile(new URL('./config/limits.json', import.meta.url), 'utf8')); } catch { return {}; } }", false],
];
for (const [name, code, pass] of implementations) {
  test(`${pass ? 'accepts' : 'rejects'} ${name}`, async t => {
    const root = await mkdtemp(join(tmpdir(), 'e13-calibration-'));
    t.after(() => rm(root, { recursive: true, force: true }));
    await cp(subject, root, { recursive: true });
    if (code) await writeFile(join(root, 'limits.mjs'), code);
    const run = () => execFileSync(process.execPath, [check, root], { stdio: 'pipe' });
    if (pass) assert.doesNotThrow(run);
    else assert.throws(run);
  });
}
