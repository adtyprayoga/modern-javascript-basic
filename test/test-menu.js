import assert from 'node:assert/strict';
import { spawn, spawnSync } from 'node:child_process';
import { mkdtemp, mkdir, readFile, rename, rm, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('../', import.meta.url));
const sementara = await mkdtemp(join(tmpdir(), 'peserta-menu-'));
const awal = [
  { id: 1, name: 'Ana', email: 'ana@example.com', class: 'JavaScript', score: 90 },
  { id: 2, name: 'Budi', email: 'budi@example.com', class: 'React', score: 60 }
];
let jumlah = 0;
const jalankan = (file, input = '0\n') => {
  const hasil = spawnSync(process.execPath, ['main.js'], {
    cwd: root, env: { ...process.env, PESERTA_DATA_FILE: file },
    input, encoding: 'utf8', timeout: 10000
  });
  assert.ifError(hasil.error);
  return { ...hasil, output: hasil.stdout + hasil.stderr };
};
const baca = async (file) => JSON.parse(await readFile(file, 'utf8')).peserta;
const uji = async (nama, periksa) => {
  const folder = join(sementara, `${jumlah + 1}`);
  await mkdir(folder);
  const file = join(folder, 'peserta.json');
  await writeFile(file, JSON.stringify({ peserta: awal }));
  await periksa(file, folder);
  jumlah += 1;
  console.log(`✓ Menu: ${nama}`);
};

try {
  await uji('seluruh menu baca dan pilihan tidak valid', async (file) => {
    const hasil = jalankan(file, '9\n1\n2\n ANA@EXAMPLE.COM \n7\nReact\n8\n0\n');
    assert.equal(hasil.status, 0);
    for (const teks of ['Pilihan tidak valid', 'Jumlah peserta unik: 2', 'Riwayat tes', 'Tes ID 1', 'Class: JavaScript', 'Rata-rata nilai terakhir: 75', 'LULUS (nilai >=80): 1', 'Pemeriksaan rentang 60–100', 'Budi: TIDAK LULUS', 'Rentang 60–100: Budi mendapat score 60 - SESUAI STANDAR']) {
      assert.ok(hasil.output.includes(teks), teks);
    }
    assert.deepEqual(await baca(file), awal);
  });
  await uji('tambah menerima nol dan normalisasi identitas', async (file) => {
    const hasil = jalankan(file, '3\n Cici \n CICI@EXAMPLE.COM \n Node \n0\n1\n0\n');
    assert.match(hasil.output, /Peserta berhasil ditambahkan/);
    assert.deepEqual((await baca(file)).at(-1), { id: 3, name: 'Cici', email: 'cici@example.com', class: 'Node', score: 0 });
  });
  await uji('nilai 90 → 79 → 80 mengikuti tes terakhir dan bertahan setelah restart', async (file) => {
    const turun = jalankan(file, '5\nana@example.com\n79\n1\n8\n0\n');
    assert.match(turun.output, /Nama: Ana, Score: 79, Status: TIDAK LULUS/);
    assert.match(turun.output, /Rata-rata nilai terakhir: 69.5/);
    const naik = jalankan(file, '5\nana@example.com\n80\n0\n');
    assert.match(naik.output, /Tes ulang berhasil dicatat/);
    const restart = jalankan(file, '2\nana@example.com\n0\n');
    assert.match(restart.output, /Nama: Ana, Score: 80, Status: LULUS/);
    const tes = (await baca(file)).filter(({ email }) => email === 'ana@example.com');
    assert.deepEqual(tes.map(({ score }) => score), [90, 79, 80]);
    for (const { id } of tes) assert.ok(restart.output.includes(`Tes ID ${id}`));
  });
  await uji('biodata seluruh riwayat berubah tanpa mengganti nilai, ID, urutan', async (file) => {
    jalankan(file, '5\nana@example.com\n79\n0\n');
    const sebelum = await baca(file);
    const hasil = jalankan(file, '4\nana@example.com\n Anita \n ANITA@EXAMPLE.COM \n Node \n0\n');
    assert.match(hasil.output, /Biodata peserta berhasil diperbarui/);
    assert.deepEqual(await baca(file), sebelum.map((peserta) => peserta.email === 'ana@example.com'
      ? { ...peserta, name: 'Anita', email: 'anita@example.com', class: 'Node' } : peserta));
  });
  await uji('biodata kosong mempertahankan nilai sebelumnya', async (file) => {
    const hasil = jalankan(file, '4\nana@example.com\n\n\n\n0\n');
    assert.match(hasil.output, /Biodata peserta berhasil diperbarui/);
    assert.deepEqual(await baca(file), awal);
  });
  await uji('duplikat dan bentrok email ditolak', async (file) => {
    const hasil = jalankan(file, '3\nAna lagi\n ANA@EXAMPLE.COM \nNode\n80\n4\nana@example.com\nAnita\nbudi@example.com\nNode\n0\n');
    assert.equal((hasil.output.match(/Email sudah terdaftar/g) ?? []).length, 2);
    assert.deepEqual(await baca(file), awal);
  });
  await uji('peserta tidak ditemukan pada detail dan semua perubahan', async (file) => {
    const hasil = jalankan(file, '2\ntidak@example.com\n4\ntidak@example.com\n5\ntidak@example.com\n6\ntidak@example.com\n0\n');
    assert.equal((hasil.output.match(/Peserta tidak ditemukan/g) ?? []).length, 4);
    assert.deepEqual(await baca(file), awal);
  });
  await uji('nilai kosong, NaN, tak terbatas dan di luar rentang ditolak pada tambah dan tes ulang', async (file) => {
    for (const nilai of ['', 'NaN', 'Infinity', '-1', '101', 'abc']) {
      for (const input of [`3\nCici\ncici@example.com\nNode\n${nilai}\n0\n`, `5\nana@example.com\n${nilai}\n0\n`]) {
        const hasil = jalankan(file, input);
        assert.match(hasil.output, /Nilai (wajib diisi|harus berupa angka)/);
        assert.doesNotMatch(hasil.output, /berhasil/);
        assert.deepEqual(await baca(file), awal);
      }
    }
  });
  await uji('biodata wajib dan email valid', async (file) => {
    for (const input of ['3\n\ncici@example.com\nNode\n80\n0\n', '3\nCici\nsalah\nNode\n80\n0\n', '3\nCici\ncici@example.com\n\n80\n0\n']) {
      const hasil = jalankan(file, input);
      assert.doesNotMatch(hasil.output, /berhasil/);
      assert.deepEqual(await baca(file), awal);
    }
  });
  await uji('konfirmasi batal tidak menghapus, konfirmasi ya menghapus seluruh riwayat', async (file) => {
    jalankan(file, '5\nana@example.com\n79\n0\n');
    const sebelum = await baca(file);
    const batal = jalankan(file, '6\nana@example.com\ntidak\n0\n');
    assert.match(batal.output, /Penghapusan dibatalkan/);
    assert.deepEqual(await baca(file), sebelum);
    const hapus = jalankan(file, '6\nana@example.com\nya\n0\n');
    assert.match(hapus.output, /seluruh riwayat berhasil dihapus/);
    assert.deepEqual(await baca(file), [awal[1]]);
    assert.doesNotMatch(jalankan(file, '1\n0\n').output, /Nama: Ana/);
  });
  await uji('EOF pada setiap langkah formulir membatalkan operasi tanpa menyimpan', async (file) => {
    const formulir = [
      ['2', 'ana@example.com'],
      ['3', 'Cici', 'cici@example.com', 'Node', '80'],
      ['4', 'ana@example.com', 'Anita', 'anita@example.com', 'Node'],
      ['5', 'ana@example.com', '80'],
      ['6', 'ana@example.com', 'ya'],
      ['7', 'React']
    ];
    for (const langkah of formulir) {
      for (let jumlahJawaban = 1; jumlahJawaban < langkah.length; jumlahJawaban += 1) {
        const hasil = jalankan(file, langkah.slice(0, jumlahJawaban).join('\n') + '\n');
        assert.equal(hasil.status, 0);
        assert.match(hasil.output, /Input berakhir. Operasi dibatalkan/);
        assert.doesNotMatch(hasil.output, /berhasil/);
        assert.deepEqual(await baca(file), awal);
      }
    }
    assert.equal(jalankan(file, '').status, 0);
  });
  await uji('JSON rusak tetap utuh dan startup gagal dengan exit 1', async (file) => {
    await writeFile(file, '{ rusak');
    const hasil = jalankan(file);
    assert.equal(hasil.status, 1);
    assert.match(hasil.output, /Data peserta tidak valid/);
    assert.equal(await readFile(file, 'utf8'), '{ rusak');
  });
  await uji('kegagalan simpan tidak menampilkan sukses atau mengubah memori', async (file, folder) => {
    const hasil = await new Promise((resolve, reject) => {
      const child = spawn(process.execPath, ['main.js'], { cwd: root, env: { ...process.env, PESERTA_DATA_FILE: file }, stdio: ['pipe', 'pipe', 'pipe'] });
      let output = '';
      let dipindah = false;
      const batas = setTimeout(() => { child.kill(); reject(new Error('Menu melewati timeout.')); }, 10000);
      child.on('error', reject);
      child.stdout.on('data', (chunk) => {
        output += chunk;
        if (!dipindah && output.includes('Pilihan: ')) {
          dipindah = true;
          const rusakkanTujuan = async () => {
            await rename(folder, `${folder}-lama`);
            await writeFile(folder, 'penghalang penyimpanan');
            child.stdin.end('5\nana@example.com\n79\n1\n0\n');
          };
          rusakkanTujuan().catch(reject);
        }
      });
      child.stderr.on('data', (chunk) => { output += chunk; });
      child.on('close', (status) => { clearTimeout(batas); resolve({ status, output }); });
    });
    assert.equal(hasil.status, 0);
    assert.match(hasil.output, /Gagal menyimpan data peserta/);
    assert.doesNotMatch(hasil.output, /berhasil/);
    assert.match(hasil.output, /Nama: Ana, Score: 90, Status: LULUS/);
    assert.deepEqual(await baca(join(`${folder}-lama`, 'peserta.json')), awal);
  });
  console.log(`\n${jumlah} pengujian menu lulus.`);
} finally {
  await rm(sementara, { recursive: true, force: true });
}
