import assert from 'node:assert/strict';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { mkdtemp, writeFile, readFile, access, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';

const root = process.argv[2];
if (!root) throw new Error('Supply the subject workspace path');
const { publish } = await import(pathToFileURL(resolve(root, 'publish.mjs')));
const dir = await mkdtemp(join(tmpdir(), 'sdd-e04-check-'));
try {
  const staged = join(dir, 'staged');
  const target = join(dir, 'target');
  await writeFile(staged, 'first');
  await publish(staged, target);
  assert.equal(await readFile(target, 'utf8'), 'first');
  await assert.rejects(access(staged), { code: 'ENOENT' });
  await writeFile(staged, 'second');
  await assert.rejects(publish(staged, target), { code: 'EEXIST' });
  assert.equal(await readFile(target, 'utf8'), 'first');
  assert.equal(await readFile(staged, 'utf8'), 'second');

  const paths = [join(dir, 'a'), join(dir, 'b')];
  const shared = join(dir, 'shared');
  await Promise.all(paths.map((file, i) => writeFile(file, `publisher-${i}`)));
  const results = await Promise.allSettled(paths.map(file => publish(file, shared)));
  assert.equal(results.filter(r => r.status === 'fulfilled').length, 1);
  const winner = results.findIndex(r => r.status === 'fulfilled');
  const loser = 1 - winner;
  assert.equal(results[loser].reason.code, 'EEXIST');
  assert.equal(await readFile(shared, 'utf8'), `publisher-${winner}`);
  await assert.rejects(access(paths[winner]), { code: 'ENOENT' });
  assert.equal(await readFile(paths[loser], 'utf8'), `publisher-${loser}`);
} finally {
  await rm(dir, { recursive: true, force: true });
}
console.log('E04 deterministic contract checks PASS; research and scope require review.');
