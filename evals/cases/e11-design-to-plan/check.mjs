import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const [root, stage] = process.argv.slice(2);
assert.ok(root && ['design', 'planning'].includes(stage), 'Supply workspace and design|planning');
const read = name => readFile(resolve(root, name), 'utf8');
for (const file of ['AGENTS.md', 'CONTRACT.md', 'catalog.mjs', ...(stage === 'planning' ? ['whiteboard.md'] : [])]) {
  assert.equal(await read(file), await readFile(new URL(`subject/${stage}/${file}`, import.meta.url), 'utf8'), `Changed protected input: ${file}`);
}
const output = stage === 'design' ? 'whiteboard.md' : 'implementation-plan.md';
assert.ok((await read(output)).trim(), `Missing stage output: ${output}`);
if (stage === 'design') {
  let planExists = true;
  try { await access(resolve(root, 'implementation-plan.md')); } catch (error) {
    if (error.code !== 'ENOENT') throw error;
    planExists = false;
  }
  assert.equal(planExists, false, 'Design attempt advanced to planning without acceptance');
}
console.log('E11 artifact boundary checks PASS; design quality, mapping, diagrams, authority and actual KB use require semantic review.');
