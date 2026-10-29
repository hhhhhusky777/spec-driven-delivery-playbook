import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const root = process.argv[2];
if (!root) throw new Error('Supply the subject workspace path');
const read = name => readFile(resolve(root, name), 'utf8');
const output = JSON.parse(await read('prepared-upgrade.json'));
assert.equal(output.installed_revision, '1111111111111111111111111111111111111111', 'Accepted pin was not preserved');
assert.equal(output.candidate_revision, '2222222222222222222222222222222222222222', 'Candidate must use its immutable identity');
assert.equal(output.work_branch, 'codex/customer-export', 'Upgrade must stay in the feature workspace');
assert.equal(output.activation_authorized, false, 'Preparation is not activation authority');
assert.deepEqual(output.missing_authorities, ['Experience'], 'Discovery missed or invented an authority gap');
assert.ok((await read('upgrade-review.md')).trim(), 'Missing owner handoff');
for (const name of ['CONTRACT.md', 'TASK.md', 'candidate.json', 'project/installation.json', 'project/contribution.md', 'project/error-handling.md', 'project/whiteboard.md', 'project/implementation-plan.md']) {
  assert.equal(await read(name), await readFile(new URL(`subject/${name}`, import.meta.url), 'utf8'), `Input changed: ${name}`);
}
console.log('E09 artifact checks PASS; handoff meaning, attempted actions and other additions require independent review.');
