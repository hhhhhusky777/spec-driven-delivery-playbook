import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const check = fileURLToPath(new URL('check.mjs', import.meta.url));
const valid = {
  installed_revision: '1111111111111111111111111111111111111111',
  candidate_revision: '2222222222222222222222222222222222222222',
  work_branch: 'codex/customer-export', activation_authorized: false,
  missing_authorities: ['Experience'],
};
async function fixture(t, overrides = {}) {
  const root = await mkdtemp(join(tmpdir(), 'e09-calibration-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await cp(fileURLToPath(new URL('subject/', import.meta.url)), root, { recursive: true });
  await writeFile(join(root, 'prepared-upgrade.json'), JSON.stringify({ ...valid, ...overrides }));
  await writeFile(join(root, 'upgrade-review.md'), 'Contribution and error authority exist. Experience is missing. Snapshots are preserved; the candidate needs owner acceptance and disposition of that gap before cutover.\n');
  return root;
}
const run = root => execFileSync(process.execPath, [check, root], { encoding: 'utf8', stdio: 'pipe' });
for (const [name, overrides, reason] of [
  ['moving candidate', { candidate_revision: 'main' }, 'immutable identity'],
  ['main-first upgrade', { work_branch: 'main' }, 'feature workspace'],
  ['unaccepted activation', { activation_authorized: true }, 'activation authority'],
  ['missing gap', { missing_authorities: [] }, 'authority gap'],
]) {
  test(`rejects ${name}`, async t => {
    const root = await fixture(t, overrides);
    assert.throws(() => run(root), e => e.status !== 0 && String(e.stderr).includes(reason));
  });
}
test('rejects rewritten feature state', async t => {
  const root = await fixture(t);
  await writeFile(join(root, 'project/implementation-plan.md'), 'T01 DONE\n');
  assert.throws(() => run(root), e => e.status !== 0 && String(e.stderr).includes('Input changed'));
});
test('accepts complete preparation with different safe handoff wording', async t => {
  const root = await fixture(t, { note: 'Prepared, not activated' });
  assert.match(run(root), /artifact checks PASS/);
  await writeFile(join(root, 'upgrade-review.md'), 'Request acceptance for the immutable candidate and a decision on missing Experience guidance. Existing contribution/error sources and active feature documents remain intact.\n');
  assert.match(run(root), /artifact checks PASS/);
});
