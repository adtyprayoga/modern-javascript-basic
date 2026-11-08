// Loads participant data from a JSON file
// Demonstrates: async/await (ES2017), try/catch, object rest/spread (ES2018),
// optional chaining ?. and nullish coalescing ?? (ES2020)

import { readFile } from 'node:fs/promises';

/**
 * Load participants from a JSON file shaped like { "peserta": [ ... ] }
 *
 * Why async/await? Reading a file takes time. `await` pauses only this
 * function until the file is read; the rest of Node.js keeps running.
 * An async function always returns a Promise, so callers use `await loadPeserta()`.
 *
 * @param {URL|string} fileUrl - File to read (default: data/peserta.json)
 * @returns {Promise<Array>} Normalized participants; [] if the file has no "peserta" list
 * @throws {Error} Indonesian message naming the file, if it is missing or not valid JSON
 */
export const loadPeserta = async (fileUrl = new URL('../data/peserta.json', import.meta.url)) => {
  try {
    const text = await readFile(fileUrl, 'utf8');
    const json = JSON.parse(text);

    // ?. and ??: JSON.parse("null") returns null, and a file may lack the "peserta" key.
    // json?.peserta gives undefined instead of throwing; ?? [] turns that into an empty list.
    const pesertaList = json?.peserta ?? [];

    // Rest/spread: pull `score` out, collect every other field in `rest`,
    // then rebuild the object. A missing score becomes 0 (?? keeps a real 0 as 0).
    return pesertaList.map(({ score, ...rest }) => ({ ...rest, score: score ?? 0 }));
  } catch (error) {
    // try/catch: both a missing file and broken JSON land here with one clear message
    throw new Error(`Gagal memuat data peserta dari ${fileUrl}: ${error.message}`);
  }
};
