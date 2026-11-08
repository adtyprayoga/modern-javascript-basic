// Checks every exercise solution in latihan/referensi/ against its expected output.
// Each NN-name.expected.txt is paired with NN-name.js; files without an
// .expected.txt (helper modules like kelasValidator.js) are not run.

import { execFile } from 'node:child_process';
import { readdir, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const solusiDir = new URL('./referensi/', import.meta.url);

// Same text on every OS: \r\n → \n, no trailing whitespace
const normalize = (text = '') => text.replace(/\r\n/g, '\n').trimEnd();

/**
 * Run one solution and compare its output with the expected file.
 * Runs from the OS temp directory, so a solution that only works from the
 * repo root fails here.
 * @param {string} name - File stem, e.g. "01-nilai-terakhir"
 * @returns {Promise<boolean>} True if the output matches
 */
const cekSolusi = async (name) => {
  const expected = normalize(await readFile(new URL(`${name}.expected.txt`, solusiDir), 'utf8'));
  const script = fileURLToPath(new URL(`${name}.js`, solusiDir));

  let actual;
  let berhasil = true;
  try {
    const { stdout, stderr } = await run(process.execPath, [script], { cwd: tmpdir(), timeout: 10_000 });
    actual = normalize(stdout + stderr);
  } catch (error) {
    berhasil = false;
    // A crash or a missing file still produces output worth showing
    actual = normalize(`${error.stdout ?? ''}${error.stderr ?? ''}`) || error.message;
  }

  const cocok = berhasil && actual === expected;
  console.log(`${cocok ? '✅' : '❌'} ${name}`);
  if (!cocok) {
    console.log(`   Expected: ${JSON.stringify(expected)}`);
    console.log(`   Actual: ${JSON.stringify(actual)}`);
  }
  return cocok;
};

const names = (await readdir(solusiDir))
  .filter((file) => file.endsWith('.expected.txt'))
  .map((file) => file.replace('.expected.txt', ''))
  .sort();

console.log('='.repeat(60));
console.log('📝 CEK LATIHAN');
console.log('='.repeat(60));

let jumlahCocok = 0;
for (const name of names) {
  if (await cekSolusi(name)) jumlahCocok++;
}

console.log(`Latihan: ${jumlahCocok}/${names.length} cocok`);
if (jumlahCocok !== names.length) process.exitCode = 1;
