import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { loadStore, saveStore } from '../utils/pesertaStore.js';
import { tambahNilai, hapusPeserta, ubahPeserta } from '../utils/pesertaCrud.js';

const contoh = [{ id: 1, name: 'Ayu', email: 'ayu@example.com', class: 'JavaScript', score: 90 }];
const setup = async (t) => {
  const dir = await mkdtemp(join(tmpdir(), 'peserta-store-'));
  t.after(() => rm(dir, { recursive: true, force: true }));
  const file = join(dir, 'kerja', 'peserta.json');
  const seed = join(dir, 'seed.json');
  await writeFile(seed, JSON.stringify({ peserta: contoh }));
  return { dir, file, seed };
};

test('file kerja yang belum ada diinisialisasi dari seed tanpa mengubah seed', async (t) => {
  const { file, seed } = await setup(t);
  const asli = await readFile(seed, 'utf8');
  assert.deepEqual(await loadStore(pathToFileURL(file), pathToFileURL(seed)), contoh);
  assert.deepEqual(JSON.parse(await readFile(file, 'utf8')), { peserta: contoh });
  assert.equal(await readFile(seed, 'utf8'), asli);
});

test('restart mempertahankan tes ulang 90 ke 79 ke 80 sesuai urutan', async (t) => {
  const { file, seed } = await setup(t);
  const awal = await loadStore(file, seed);
  await saveStore(tambahNilai(awal, contoh[0].email, 79), file);
  assert.deepEqual((await loadStore(file, seed)).map(({ score }) => score), [90, 79]);
  await saveStore(tambahNilai(await loadStore(file, seed), contoh[0].email, 80), file);
  assert.deepEqual((await loadStore(file, seed)).map(({ score }) => score), [90, 79, 80]);
});

test('biodata seluruh riwayat dan penghapusan bertahan setelah restart', async (t) => {
  const { file, seed } = await setup(t);
  const riwayat = tambahNilai(await loadStore(file, seed), contoh[0].email, 0);
  const baru = ubahPeserta(riwayat, contoh[0].email, { name: 'Ayu Baru', email: 'baru@example.com', class: 'Node' });
  await saveStore(baru, file);
  assert.deepEqual(await loadStore(file, seed), baru);
  await saveStore(hapusPeserta(baru, 'baru@example.com'), file);
  assert.deepEqual(await loadStore(file, seed), []);
});

test('JSON rusak tetap utuh dan tidak diganti seed', async (t) => {
  const { file, seed } = await setup(t);
  await mkdir(join(file, '..'), { recursive: true });
  await writeFile(file, '{rusak');
  await assert.rejects(loadStore(file, seed), /Data peserta tidak valid/);
  assert.equal(await readFile(file, 'utf8'), '{rusak');
});

test('file kerja yang ada tidak membutuhkan seed yang tersedia', async (t) => {
  const { file, dir } = await setup(t);
  await saveStore(contoh, file);
  assert.deepEqual(await loadStore(file, join(dir, 'tidak-ada.json')), contoh);
});

test('struktur, ID, biodata, email, dan nilai tidak valid ditolak tanpa ditimpa', async (t) => {
  const { file, seed } = await setup(t);
  const invalid = [null, [], {}, { peserta: null }, { peserta: [null] }];
  for (const perubahan of [
    { id: 0 }, { id: -1 }, { id: 1.5 }, { id: Number.MAX_SAFE_INTEGER + 1 },
    { name: '' }, { name: null }, { class: ' ' }, { email: 'ayu@' },
    { score: '' }, { score: '80' }, { score: null }, { score: -1 }, { score: 101 }
  ]) invalid.push({ peserta: [{ ...contoh[0], ...perubahan }] });
  invalid.push({ peserta: [...contoh, { ...contoh[0] }] });
  invalid.push({ peserta: [...contoh, { ...contoh[0], id: 2, name: 'Nama berbeda' }] });
  invalid.push({ peserta: [...contoh, { ...contoh[0], id: 2, class: 'Kelas berbeda' }] });
  await mkdir(join(file, '..'), { recursive: true });
  for (const data of invalid) {
    const isi = JSON.stringify(data);
    await writeFile(file, isi);
    await assert.rejects(loadStore(file, seed));
    assert.equal(await readFile(file, 'utf8'), isi);
  }
});

test('normalisasi email menyatukan identitas tanpa mengubah urutan dan ID', async (t) => {
  const { file, seed } = await setup(t);
  await mkdir(join(file, '..'), { recursive: true });
  await writeFile(file, JSON.stringify({ peserta: [...contoh, { ...contoh[0], id: 8, email: ' AYU@EXAMPLE.COM ', score: 0 }] }));
  const hasil = await loadStore(file, seed);
  assert.deepEqual(hasil.map(({ email }) => email), ['ayu@example.com', 'ayu@example.com']);
  assert.deepEqual(hasil.map(({ id, score }) => [id, score]), [[1, 90], [8, 0]]);
});

test('save menolak nilai nonfinite dan data invalid sebelum menimpa file lama', async (t) => {
  const { file } = await setup(t);
  await saveStore(contoh, file);
  const asli = await readFile(file, 'utf8');
  for (const score of [NaN, Infinity, -Infinity, '', null, 101]) {
    await assert.rejects(saveStore([{ ...contoh[0], score }], file), /Nilai/);
    assert.equal(await readFile(file, 'utf8'), asli);
  }
  assert.deepEqual(await readdir(join(file, '..')), ['peserta.json']);
});

test('rename gagal membersihkan file sementara dan mempertahankan tujuan', async (t) => {
  const { dir } = await setup(t);
  const tujuan = join(dir, 'tujuan');
  await mkdir(tujuan);
  await writeFile(join(tujuan, 'tetap.txt'), 'tetap');
  await assert.rejects(saveStore(contoh, tujuan), /Gagal menyimpan/);
  assert.equal(await readFile(join(tujuan, 'tetap.txt'), 'utf8'), 'tetap');
  assert.deepEqual((await readdir(dir)).sort(), ['seed.json', 'tujuan']);
});

test('seed invalid tidak membuat file kerja', async (t) => {
  const { file, seed, dir } = await setup(t);
  await writeFile(seed, JSON.stringify({ peserta: [{ ...contoh[0], score: null }] }));
  await assert.rejects(loadStore(file, seed));
  assert.deepEqual(await readdir(dir), ['seed.json']);
});

test('PESERTA_DATA_FILE menerima lokasi relatif cwd tanpa mengubah lokasi eksplisit', async (t) => {
  const { file, seed, dir } = await setup(t);
  const sebelumnya = process.env.PESERTA_DATA_FILE;
  t.after(() => {
    if (sebelumnya === undefined) delete process.env.PESERTA_DATA_FILE;
    else process.env.PESERTA_DATA_FILE = sebelumnya;
  });
  const { relative } = await import('node:path');
  process.env.PESERTA_DATA_FILE = relative(process.cwd(), file);
  assert.deepEqual(await loadStore(undefined, seed), contoh);
  await saveStore([]);
  assert.deepEqual(await loadStore(), []);
  const eksplisit = join(dir, 'eksplisit.json');
  await saveStore(contoh, eksplisit);
  assert.deepEqual(await loadStore(eksplisit), contoh);
});
