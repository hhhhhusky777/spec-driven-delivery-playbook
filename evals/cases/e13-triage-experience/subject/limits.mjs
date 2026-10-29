import { readFile } from 'node:fs/promises';

export async function loadLimits() {
  return JSON.parse(await readFile('config/limits.json', 'utf8'));
}
