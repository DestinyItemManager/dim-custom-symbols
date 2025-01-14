/*================================================================================================================================*\
||
|| Helper Functions
||
||
\*================================================================================================================================*/
import { execSync } from 'child_process';
import { writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { writeFile as writeFileFS } from 'node:fs/promises';
import { infoLog } from './log.js';

const TAG = 'UTILS';

type WriteHook = (fileName: string) => void;
const writeHooks: WriteHook[] = [];

export function registerWriteHook(hook: WriteHook) {
  writeHooks.push(hook);
}

export function writeFile(filename: string, data: any, pretty = false) {
  if (typeof data === 'object') {
    data = JSON.stringify(data, null, 2);
  }

  writeFileSync(filename, data + '\n', 'utf8');

  if (pretty || filename.endsWith('.ts')) {
    execSync(`pnpm prettier "${filename}" --write`);
  }

  infoLog(TAG, `${filename} saved.`);

  for (const hook of writeHooks) {
    hook(filename);
  }
}

export function uniqAndSortArray<T>(array: T[]): T[] {
  const uniq = [...new Set(array)];
  return uniq.every(isNumberlike) ? uniq.sort((a, b) => Number(a) - Number(b)) : uniq.sort();
}

function isNumberlike(x: any): x is number | string {
  return typeof x === 'number' || (typeof x === 'string' && /^\d+$/.test(x));
}

export function diffArrays(all: any[], exclude: any[]) {
  return [
    ...new Set(
      all.filter(function (x) {
        if (!exclude.includes(x)) {
          return true;
        } else {
          return false;
        }
      }),
    ),
  ];
}

export function sortObject<T extends Record<string, any>>(o: T): T {
  const sorted: Record<string, any> = {};
  const a = Object.keys(o).sort();

  for (const key of a) {
    sorted[key] = o[key];
  }

  return sorted as T;
}
export function downloadFile(url: string, outputPath: string) {
  return fetch(url)
    .then((x) => x.arrayBuffer())
    .then((x) => writeFileFS(outputPath, Buffer.from(x)));
}

export function uriToFileName(uri: string) {
  return uri.substring(uri.lastIndexOf('/') + 1);
}

export function makeDirIfMissing(dir: string) {
  if (!existsSync(dir)) {
    mkdirSync(dir);
  }
}

export function toArrayBuffer(buffer: Buffer) {
  const arrayBuffer = new ArrayBuffer(buffer.length);
  const view = new Uint8Array(arrayBuffer);
  for (let i = 0; i < buffer.length; ++i) {
    view[i] = buffer[i];
  }
  return arrayBuffer;
}
