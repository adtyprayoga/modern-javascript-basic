// Jalankan kode yang benar-benar ditampilkan pada README tanpa menimpa proyek peserta.
import assert from 'node:assert/strict';
import { execFile } from 'node:child_process';
import { cp, mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { promisify } from 'node:util';

const run = promisify(execFile);
const root = fileURLToPath(new URL('../', import.meta.url));
const latihan = join(root, 'latihan');
const proyek = await mkdtemp(join(tmpdir(), 'praktik-javascript-'));
const normalize = (text = '') => text.replace(/\r\n/g, '\n').trimEnd();
const execute = async (file) => {
  const { stdout, stderr } = await run(process.execPath, [join(proyek, file)], {
    cwd: proyek,
    timeout: 10_000,
    maxBuffer: 1024 * 1024,
  });
  assert.equal(stderr, '', `${file}: ada error pada stderr`);
  return stdout;
};

try {
  const folders = (await readdir(latihan, { withFileTypes: true }))
    .filter((entry) => entry.isDirectory() && /^\d{2}-/.test(entry.name))
    .map((entry) => entry.name)
    .sort();
  assert.equal(folders.length, 12, 'Panduan harus memuat tahap 00–11');
  let jumlahCheckpoint = 0;

  for (const folder of folders) {
    const panduan = await readFile(join(latihan, folder, 'README.md'), 'utf8');
    const blocks = [...panduan.matchAll(/<!-- (write|expected|challenge|challenge-output|copy): ([^\n]+) -->\r?\n```[^\n]*\n([\s\S]*?)\n```/g)];
    let checkpoint = 0;
    let tantangan = 0;

    for (const [, jenis, file, content] of blocks) {
      if (jenis === 'copy') {
        assert.equal(file, 'test => test', 'Bahan yang disalin adalah suite test yang disediakan');
        await cp(join(root, 'test'), join(proyek, 'test'), { recursive: true });
      } else if (jenis === 'write' || jenis === 'challenge') {
        const target = join(proyek, file);
        await mkdir(join(target, '..'), { recursive: true });
        await writeFile(target, `${content}\n`);
      } else {
        assert.equal(normalize(await execute(file)), normalize(content), `${folder}: output ${file} berbeda`);
        if (jenis === 'expected') checkpoint++;
        else tantangan++;
        jumlahCheckpoint++;
      }
    }

    assert.ok(checkpoint > 0, `${folder}: checkpoint belum tersedia`);
    assert.ok(tantangan > 0, `${folder}: penyelesaian tantangan belum diperiksa`);
    console.log(`✅ ${folder}: ${checkpoint} checkpoint, ${tantangan} tantangan`);
  }

  const { stdout: reference, stderr } = await run(process.execPath, [join(root, 'main.js')], {
    cwd: tmpdir(),
    timeout: 10_000,
  });
  assert.equal(stderr, '');
  assert.equal(normalize(await execute('main.js')), normalize(reference), 'Aplikasi peserta berbeda dari referensi');

  for (const command of ['start', 'test']) {
    await run(process.platform === 'win32' ? 'npm.cmd' : 'npm', ['--prefix', proyek, command], {
      cwd: proyek,
      timeout: 30_000,
      maxBuffer: 1024 * 1024,
      shell: process.platform === 'win32',
    });
  }
  console.log(`Panduan: ${folders.length} tahap, ${jumlahCheckpoint} output cocok; aplikasi setara referensi; npm start dan npm test lulus.`);
} finally {
  await rm(proyek, { recursive: true, force: true });
}
