import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const [stage, root] = process.argv.slice(2);
assert.ok(['audit', 'closure'].includes(stage) && root, 'Supply audit|closure and a subject root');
const source = fileURLToPath(new URL(`subject/${stage}/`, import.meta.url));
const read = (base, name) => readFile(resolve(base, name), 'utf8');
async function unchanged(names) {
  for (const name of names) assert.equal(await read(root, name), await read(source, name), `Preserve ${name}`);
}
const common = ['AGENTS.md', 'CONTRACT.md', 'TASK.md', 'upload.mjs'];
if (stage === 'audit') {
  await unchanged([...common, 'whiteboard.md', 'implementation-plan.md', 'policies/upload.json']);
  const result = JSON.parse(await read(root, 'audit.json'));
  assert.equal(result.ready_for_final_tests, false, 'Final-test readiness must not be claimed');
  assert.ok(result.findings.some(f => f.design_id === 'D01' && f.example_bytes === 5242880 &&
    f.expected === true && f.actual === false && typeof f.evidence === 'string' && f.evidence.trim()),
  'Report the supported exact-limit mismatch with source evidence');
  assert.ok((await read(root, 'audit.md')).trim(), 'Retain the actual audit brief');
} else {
  await unchanged([...common, 'Experience.md', 'acceptance.md']);
  assert.deepEqual(JSON.parse(await read(root, 'policies/upload.json')),
    { max_bytes: 5242880, mime_types: ['image/png', 'image/jpeg'] }, 'Update live policy without widening MIME scope');
  const archive = await read(root, 'delivery-archive.md');
  const normalize = text => text.split('\n').map(line => line.trim().replace(/^#+\s*/, '')).filter(Boolean);
  const archiveLines = normalize(archive);
  for (const [file, marker] of [['whiteboard.md', 'archived-whiteboard'], ['implementation-plan.md', 'archived-implementation-plan']]) {
    assert.ok(archive.includes(`<!-- sdd: ${marker} -->`), `Include ${marker}`);
    for (const line of normalize(await read(source, file))) {
      assert.ok(archiveLines.includes(line), `Archive complete source content: ${file}: ${line}`);
    }
  }
  assert.match(archive, /Issues[^\n]*https:\/\/code\.example\.invalid\/uploads\/issues\/16/, 'Link the issue at archive level');
  assert.match(archive, /Closing pull request[^\n]*https:\/\/code\.example\.invalid\/uploads\/pull\/16/, 'Link the closing PR');
  const pr = await read(root, 'pull-request.md');
  assert.ok(pr.includes('delivery-archive.md'), 'Closing PR record links back to archive');
  for (const url of ['issues/16', 'pull/16']) assert.ok(pr.includes(`https://code.example.invalid/uploads/${url}`));
  const reset = await read(root, 'whiteboard.md');
  assert.match(reset, /State:\s*DISCUSSION/, 'Reset the working whiteboard');
  assert.doesNotMatch(reset, /CONCLUDED|D01/, 'Do not leave the prior active design in the reset whiteboard');
  for (const name of ['implementation-plan.md', 'delivery-notes.md']) {
    await assert.rejects(access(resolve(root, name)), { code: 'ENOENT' }, `Remove authorized delivery material: ${name}`);
  }
}
console.log(`E16 ${stage} artifact checks PASS; trace, reply, authority and semantic review remain required.`);
