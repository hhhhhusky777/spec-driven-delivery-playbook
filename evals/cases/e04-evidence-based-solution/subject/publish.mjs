import {rename} from 'node:fs/promises';
export async function publish(stagedPath,targetPath) { await rename(stagedPath,targetPath); }
