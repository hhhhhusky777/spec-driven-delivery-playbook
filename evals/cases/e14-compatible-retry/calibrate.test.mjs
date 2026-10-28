import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { cp, mkdtemp, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import test from 'node:test';

const subject = fileURLToPath(new URL('subject/', import.meta.url));
const check = fileURLToPath(new URL('check.mjs', import.meta.url));
const variants = [
  ['stable caller identity', 'export async function submitOrder(store, {requestId, product, quantity=1}) { return store.putOnce(requestId, {product, quantity}); }', true],
  ['equivalent explicit default', 'export function submitOrder(store, request) { const quantity=request.quantity===undefined?1:request.quantity; return store.putOnce(request.requestId, {product:request.product, quantity}); }', true],
  ['original attempt-key defect', null, false],
  ['changed default', 'export async function submitOrder(store, {requestId, product, quantity=0}) { return store.putOnce(requestId, {product, quantity}); }', false],
  ['payload-derived identity', 'export async function submitOrder(store, {product, quantity=1}) { return store.putOnce(JSON.stringify({product,quantity}), {product,quantity}); }', false],
  ['automatic ambiguous retry', 'export async function submitOrder(store, {requestId, product, quantity=1}) { try { return await store.putOnce(requestId,{product,quantity}); } catch (e) { if(e.code!=="RESPONSE_LOST")throw e; return store.putOnce(requestId,{product,quantity}); } }', false],
  ['overlap-only attempt identity', 'const pending=new Set(); export async function submitOrder(store,{requestId,product,quantity=1}) { const key=pending.has(requestId)?requestId+"-concurrent":requestId; pending.add(requestId); try { return await store.putOnce(key,{product,quantity}); } finally { pending.delete(requestId); } }', false],
  ['swallowed conflict', 'export async function submitOrder(store, {requestId, product, quantity=1}) { try { return await store.putOnce(requestId,{product,quantity}); } catch (e) { if(e.code!=="KEY_REUSE")throw e; return {id:"order-1",product,quantity}; } }', false],
];
for (const [name, code, pass] of variants) {
  test(`${pass ? 'accepts' : 'rejects'} ${name}`, async t => {
    const root = await mkdtemp(join(tmpdir(), 'e14-calibration-'));
    t.after(() => rm(root, { recursive: true, force: true }));
    await cp(subject, root, { recursive: true });
    if (code) await writeFile(join(root, 'client.mjs'), code);
    const run = () => execFileSync(process.execPath, [check, root], { stdio: 'pipe', timeout: 5000 });
    if (pass) assert.doesNotThrow(run);
    else assert.throws(run, error => error.status === 1 && /AssertionError/.test(error.stderr?.toString()));
  });
}
