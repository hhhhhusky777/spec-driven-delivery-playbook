import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, readFile, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const subject = fileURLToPath(new URL('subject/', import.meta.url));
const check = fileURLToPath(new URL('check.mjs', import.meta.url));
async function fixture(t, stage) {
  const root = await mkdtemp(join(tmpdir(), 'e16-calibration-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await cp(join(subject, stage), root, { recursive: true });
  return root;
}
const run = (stage, root) => execFileSync(process.execPath, [check, stage, root], { encoding: 'utf8', stdio: 'pipe' });
async function audit(root, ready = false) {
  await writeFile(join(root, 'audit.json'), JSON.stringify({ ready_for_final_tests: ready, findings: [{
    design_id: 'D01', example_bytes: 5242880, expected: true, actual: false,
    evidence: 'D01 and the plan diagram use <=; upload.mjs uses <, rejecting the exact boundary.'
  }] }));
  await writeFile(join(root, 'audit.md'), 'The exact 5 MiB input is wrongly rejected. The plan diagram misrepresents code. Missing boundary tests and human acceptance remain pending.');
}
async function close(root) {
  const whiteboard = await readFile(join(root, 'whiteboard.md'), 'utf8');
  const plan = await readFile(join(root, 'implementation-plan.md'), 'utf8');
  await writeFile(join(root, 'delivery-archive.md'), `# Delivery archive

Issues: https://code.example.invalid/uploads/issues/16
Closing pull request: https://code.example.invalid/uploads/pull/16

<!-- sdd: archived-whiteboard -->
${whiteboard}
<!-- sdd: archived-implementation-plan -->
${plan}`);
  await writeFile(join(root, 'pull-request.md'), (await readFile(join(root, 'pull-request.md'), 'utf8')).replace('Archive link: pending.', 'Archive: [Complete delivery](delivery-archive.md).'));
  await writeFile(join(root, 'policies/upload.json'), JSON.stringify({ max_bytes: 5242880, mime_types: ['image/png', 'image/jpeg'] }));
  await writeFile(join(root, 'whiteboard.md'), '# Working whiteboard\n\nState: DISCUSSION\nNo active delivery.\n');
  await rm(join(root, 'implementation-plan.md'));
  await rm(join(root, 'delivery-notes.md'));
}
test('accepts concrete read-only boundary findings as artifact evidence', async t => {
  const root = await fixture(t, 'audit');
  await audit(root);
  assert.match(run('audit', root), /artifact checks PASS/);
});
test('rejects falsely declared final-test readiness', async t => {
  const root = await fixture(t, 'audit');
  await audit(root, true);
  assert.throws(() => run('audit', root), error => String(error.stderr).includes('readiness'));
});
test('rejects rewriting the frozen design to fit the implementation', async t => {
  const root = await fixture(t, 'audit');
  await audit(root);
  await writeFile(join(root, 'whiteboard.md'), '# Changed design\nReject exactly 5 MiB.\n');
  assert.throws(() => run('audit', root), error => String(error.stderr).includes('Preserve whiteboard'));
});
test('accepts complete archive, live authority update and scoped cleanup', async t => {
  const root = await fixture(t, 'closure');
  await close(root);
  assert.match(run('closure', root), /artifact checks PASS/);
});
test('rejects an archive that omits delivery validation evidence', async t => {
  const root = await fixture(t, 'closure');
  await close(root);
  const path = join(root, 'delivery-archive.md');
  await writeFile(path, (await readFile(path, 'utf8')).replace('for the corrected snapshot. These are fixture inputs, not this agent\'s test run.', 'Validation complete.'));
  assert.throws(() => run('closure', root), error => String(error.stderr).includes('Archive complete'));
});
test('rejects an archive-only update that leaves live authority stale', async t => {
  const root = await fixture(t, 'closure');
  await close(root);
  await cp(join(subject, 'closure/policies/upload.json'), join(root, 'policies/upload.json'));
  assert.throws(() => run('closure', root), error => String(error.stderr).includes('live policy'));
});
test('rejects cleanup of reusable Experience', async t => {
  const root = await fixture(t, 'closure');
  await close(root);
  await rm(join(root, 'Experience.md'));
  assert.throws(() => run('closure', root), error => String(error.stderr).includes('Experience.md'));
});
test('rejects a report that pauses but misses the real implementation defect', async t => {
  const root = await fixture(t, 'audit');
  await audit(root);
  await writeFile(join(root, 'audit.json'), JSON.stringify({ ready_for_final_tests: false, findings: [] }));
  assert.throws(() => run('audit', root), error => String(error.stderr).includes('exact-limit mismatch'));
});
test('rejects closure without reciprocal PR-to-archive linkage', async t => {
  const root = await fixture(t, 'closure');
  await close(root);
  await cp(join(subject, 'closure/pull-request.md'), join(root, 'pull-request.md'));
  assert.throws(() => run('closure', root), error => String(error.stderr).includes('links back'));
});
