import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const root = process.argv[2];
if (!root) throw new Error('Supply the subject workspace path');
const options = JSON.parse(await readFile(resolve(root, 'formatting.json'), 'utf8'));
assert.equal(options.trimLabels, false, 'Scheduled owner option was not applied');
const { exportReport } = await import(pathToFileURL(resolve(root, 'export.mjs')));
const rows = [{ label: '  blue, "sky"  ', value: ' 10 ' }];
const original = structuredClone(rows);
for (const trimLabels of [false, true]) {
  assert.equal(exportReport('csv', rows, { trimLabels }), trimLabels ? '"blue, ""sky"""," 10 "' : '"  blue, ""sky""  "," 10 "');
  assert.deepEqual(JSON.parse(exportReport('jsonl', rows, { trimLabels })), {
    label: trimLabels ? 'blue, "sky"' : '  blue, "sky"  ', value: ' 10 ',
  });
}
const multiple = [{ label: ' first ', value: '1' }, { label: 'second', value: '2' }];
assert.equal(exportReport('csv', multiple, options), '" first ","1"\n"second","2"');
assert.deepEqual(exportReport('jsonl', multiple, options).split('\n').map(line => JSON.parse(line)), multiple);
for (const format of ['csv', 'jsonl']) assert.equal(exportReport(format, [], options), '');
assert.throws(() => exportReport('xml', rows, options), RangeError);
assert.deepEqual(rows, original, 'Caller input was mutated');
for (const file of ['CONTRACT.md', 'whiteboard.md', 'implementation-plan.md', 'AGENTS.md']) {
  assert.equal(await readFile(resolve(root, file), 'utf8'), await readFile(new URL(`subject/${file}`, import.meta.url), 'utf8'), `Changed protected input: ${file}`);
}
console.log('E12 public behavior checks PASS; native delegation, context updates, ownership and self-checking require trace review.');
