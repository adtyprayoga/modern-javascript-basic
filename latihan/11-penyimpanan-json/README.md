# 11. Simpan perubahan ke JSON

Hubungkan array riwayat dengan file kerja. Prasyarat: fungsi CRUD tahap 10 berjalan. Pertahankan data/peserta.json sebagai contoh; aplikasi memakai data/peserta.local.json. File rusak harus tetap tersedia untuk diperiksa.

Semua nama file berada di `latihan/proyek/`. Jalankan perintah dari root repository. Pertahankan file tahap sebelumnya. Pada diff, `-` adalah kode lama dan `+` adalah kode baru. Ketik perubahan, lalu cocokkan dengan kode lengkap setelah diff. Jalankan setiap checkpoint sebelum melanjutkan.

## Langkah 1: Baca dan validasi struktur file

Validasi file lebih ketat daripada loader demonstrasi tahap 09. Wajib ada array peserta, ID positif unik, biodata konsisten untuk setiap email, dan nilai 0–100. `Map` menyimpan biodata per email; `Set` menyimpan ID yang sudah dijumpai. Pada langkah pertama file harus sudah ada, maka uji dengan file contoh. Import penyimpanan disiapkan untuk langkah berikutnya.

Buat file `utils/pesertaStore.js` dengan isi lengkap berikut.

<!-- write: utils/pesertaStore.js -->
```javascript
import { mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const defaultFile = new URL('../data/peserta.local.json', import.meta.url);
const defaultSeed = new URL('../data/peserta.json', import.meta.url);
const lokasiFile = (file = process.env.PESERTA_DATA_FILE ?? defaultFile) =>
  file instanceof URL ? fileURLToPath(file) : resolve(file);

const validasiRiwayat = (data) => {
  if (data === null || typeof data !== 'object' || !Array.isArray(data.peserta)) {
    throw new Error('Struktur data harus berupa object dengan array peserta.');
  }
  const ids = new Set();
  const identitas = new Map();
  return data.peserta.map((peserta) => {
    if (peserta === null || typeof peserta !== 'object' || Array.isArray(peserta)) {
      throw new Error('Setiap hasil tes harus berupa object.');
    }
    const { id, name, email, class: className, score } = peserta;
    if (!Number.isSafeInteger(id) || id <= 0 || ids.has(id)) {
      throw new Error('ID hasil tes harus bilangan bulat positif yang unik dan aman.');
    }
    if (typeof name !== 'string' || !name.trim() || typeof className !== 'string' || !className.trim()) {
      throw new Error('Nama dan kelas wajib diisi.');
    }
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      throw new Error('Email harus berformat valid.');
    }
    if (typeof score !== 'number' || !Number.isFinite(score) || score < 0 || score > 100) {
      throw new Error('Nilai harus berupa angka terbatas antara 0 dan 100.');
    }
    const alamat = email.trim().toLowerCase();
    const biodata = { name: name.trim(), class: className.trim() };
    const sebelumnya = identitas.get(alamat);
    if (sebelumnya && (sebelumnya.name !== biodata.name || sebelumnya.class !== biodata.class)) {
      throw new Error('Biodata dalam seluruh riwayat peserta harus konsisten.');
    }
    ids.add(id);
    identitas.set(alamat, biodata);
    return { id, name: biodata.name, email: alamat, class: biodata.class, score };
  });
};

/** Muat dan validasi file yang sudah tersedia. */
export const loadStore = async (fileUrl) => {
  const isi = await readFile(lokasiFile(fileUrl), 'utf8');
  return validasiRiwayat(JSON.parse(isi));
};
```

Buat file `cek-store.js` dengan isi lengkap berikut.

<!-- write: cek-store.js -->
```javascript
import { loadStore } from './utils/pesertaStore.js';
const list = await loadStore(new URL('./data/peserta.json', import.meta.url));
console.log(`File contoh: ${list.length} hasil tes`);
try {
  await loadStore(new URL('./data/contoh-rusak.json', import.meta.url));
} catch {
  console.log('JSON rusak ditolak; file tidak diubah.');
}
```

Jalankan dari root repository:

```bash
node latihan/proyek/cek-store.js
```

<!-- expected: cek-store.js -->
```text
File contoh: 6 hasil tes
JSON rusak ditolak; file tidak diubah.
```

## Langkah 2: Inisialisasi dan simpan melalui file sementara

`loadStore` hanya menyalin contoh ketika readFile gagal dengan ENOENT, yaitu file kerja belum ada. JSON rusak tidak masuk jalur tersebut. `saveStore` menulis file sementara pada direktori yang sama, kemudian rename mengganti file tujuan. Jika penyimpanan gagal, hapus file sementara dan teruskan error.

`PESERTA_DATA_FILE` dapat menunjuk file kerja terpisah saat pengujian. Tanpa variabel tersebut, default berada di data/peserta.local.json. Isi .gitignore berikut melindungi file kerja pada proyek peserta.

Buat file `.gitignore` dengan isi lengkap berikut.

<!-- write: .gitignore -->
```text
data/peserta.local.json
```

Perubahan pada `utils/pesertaStore.js`:

```diff
--- sebelum/utils/pesertaStore.js
+++ sesudah/utils/pesertaStore.js
@@ -43,8 +43,51 @@
   });
 };

-/** Muat dan validasi file yang sudah tersedia. */
-export const loadStore = async (fileUrl) => {
-  const isi = await readFile(lokasiFile(fileUrl), 'utf8');
-  return validasiRiwayat(JSON.parse(isi));
+/**
+ * Muat riwayat tervalidasi; buat file kerja dari seed hanya jika belum ada.
+ * @param {URL|string} fileUrl File kerja, atau PESERTA_DATA_FILE jika tidak diberikan.
+ * @param {URL|string} seedUrl File data contoh.
+ * @returns {Promise<Array>} Riwayat tes sesuai urutan pencatatan.
+ */
+export const loadStore = async (fileUrl, seedUrl = defaultSeed) => {
+  const file = lokasiFile(fileUrl);
+  let isi;
+  try {
+    isi = await readFile(file, 'utf8');
+  } catch (error) {
+    if (error.code !== 'ENOENT') throw new Error(`Gagal membaca data peserta: ${error.message}`, { cause: error });
+    try {
+      const seed = await readFile(lokasiFile(seedUrl), 'utf8');
+      const list = validasiRiwayat(JSON.parse(seed));
+      await saveStore(list, file);
+      return list;
+    } catch (seedError) {
+      throw new Error(`Gagal menginisialisasi data peserta: ${seedError.message}`, { cause: seedError });
+    }
+  }
+  try {
+    return validasiRiwayat(JSON.parse(isi));
+  } catch (error) {
+    throw new Error(`Data peserta tidak valid: ${error.message}`, { cause: error });
+  }
 };
+
+/**
+ * Simpan riwayat melalui file sementara agar kegagalan tidak merusak file lama.
+ * @param {Array} list Riwayat tes yang akan disimpan.
+ * @param {URL|string} fileUrl File kerja, atau PESERTA_DATA_FILE jika tidak diberikan.
+ * @returns {Promise<void>} Selesai setelah rename berhasil.
+ */
+export const saveStore = async (list = [], fileUrl) => {
+  const peserta = validasiRiwayat({ peserta: list });
+  const file = lokasiFile(fileUrl);
+  const sementara = `${file}.${randomUUID()}.tmp`;
+  try {
+    await mkdir(dirname(file), { recursive: true });
+    await writeFile(sementara, `${JSON.stringify({ peserta }, null, 2)}\n`, { flag: 'wx' });
+    await rename(sementara, file);
+  } catch (error) {
+    await unlink(sementara).catch(() => {});
+    throw new Error(`Gagal menyimpan data peserta: ${error.message}`, { cause: error });
+  }
+};
```

<!-- write: utils/pesertaStore.js -->
```javascript
import { mkdir, readFile, rename, unlink, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { randomUUID } from 'node:crypto';

const defaultFile = new URL('../data/peserta.local.json', import.meta.url);
const defaultSeed = new URL('../data/peserta.json', import.meta.url);
const lokasiFile = (file = process.env.PESERTA_DATA_FILE ?? defaultFile) =>
  file instanceof URL ? fileURLToPath(file) : resolve(file);

const validasiRiwayat = (data) => {
  if (data === null || typeof data !== 'object' || !Array.isArray(data.peserta)) {
    throw new Error('Struktur data harus berupa object dengan array peserta.');
  }
  const ids = new Set();
  const identitas = new Map();
  return data.peserta.map((peserta) => {
    if (peserta === null || typeof peserta !== 'object' || Array.isArray(peserta)) {
      throw new Error('Setiap hasil tes harus berupa object.');
    }
    const { id, name, email, class: className, score } = peserta;
    if (!Number.isSafeInteger(id) || id <= 0 || ids.has(id)) {
      throw new Error('ID hasil tes harus bilangan bulat positif yang unik dan aman.');
    }
    if (typeof name !== 'string' || !name.trim() || typeof className !== 'string' || !className.trim()) {
      throw new Error('Nama dan kelas wajib diisi.');
    }
    if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      throw new Error('Email harus berformat valid.');
    }
    if (typeof score !== 'number' || !Number.isFinite(score) || score < 0 || score > 100) {
      throw new Error('Nilai harus berupa angka terbatas antara 0 dan 100.');
    }
    const alamat = email.trim().toLowerCase();
    const biodata = { name: name.trim(), class: className.trim() };
    const sebelumnya = identitas.get(alamat);
    if (sebelumnya && (sebelumnya.name !== biodata.name || sebelumnya.class !== biodata.class)) {
      throw new Error('Biodata dalam seluruh riwayat peserta harus konsisten.');
    }
    ids.add(id);
    identitas.set(alamat, biodata);
    return { id, name: biodata.name, email: alamat, class: biodata.class, score };
  });
};

/**
 * Muat riwayat tervalidasi; buat file kerja dari seed hanya jika belum ada.
 * @param {URL|string} fileUrl File kerja, atau PESERTA_DATA_FILE jika tidak diberikan.
 * @param {URL|string} seedUrl File data contoh.
 * @returns {Promise<Array>} Riwayat tes sesuai urutan pencatatan.
 */
export const loadStore = async (fileUrl, seedUrl = defaultSeed) => {
  const file = lokasiFile(fileUrl);
  let isi;
  try {
    isi = await readFile(file, 'utf8');
  } catch (error) {
    if (error.code !== 'ENOENT') throw new Error(`Gagal membaca data peserta: ${error.message}`, { cause: error });
    try {
      const seed = await readFile(lokasiFile(seedUrl), 'utf8');
      const list = validasiRiwayat(JSON.parse(seed));
      await saveStore(list, file);
      return list;
    } catch (seedError) {
      throw new Error(`Gagal menginisialisasi data peserta: ${seedError.message}`, { cause: seedError });
    }
  }
  try {
    return validasiRiwayat(JSON.parse(isi));
  } catch (error) {
    throw new Error(`Data peserta tidak valid: ${error.message}`, { cause: error });
  }
};

/**
 * Simpan riwayat melalui file sementara agar kegagalan tidak merusak file lama.
 * @param {Array} list Riwayat tes yang akan disimpan.
 * @param {URL|string} fileUrl File kerja, atau PESERTA_DATA_FILE jika tidak diberikan.
 * @returns {Promise<void>} Selesai setelah rename berhasil.
 */
export const saveStore = async (list = [], fileUrl) => {
  const peserta = validasiRiwayat({ peserta: list });
  const file = lokasiFile(fileUrl);
  const sementara = `${file}.${randomUUID()}.tmp`;
  try {
    await mkdir(dirname(file), { recursive: true });
    await writeFile(sementara, `${JSON.stringify({ peserta }, null, 2)}\n`, { flag: 'wx' });
    await rename(sementara, file);
  } catch (error) {
    await unlink(sementara).catch(() => {});
    throw new Error(`Gagal menyimpan data peserta: ${error.message}`, { cause: error });
  }
};
```

Perubahan pada `cek-store.js`:

```diff
--- sebelum/cek-store.js
+++ sesudah/cek-store.js
@@ -1,8 +1,6 @@
-import { loadStore } from './utils/pesertaStore.js';
-const list = await loadStore(new URL('./data/peserta.json', import.meta.url));
-console.log(`File contoh: ${list.length} hasil tes`);
-try {
-  await loadStore(new URL('./data/contoh-rusak.json', import.meta.url));
-} catch {
-  console.log('JSON rusak ditolak; file tidak diubah.');
-}
+import { loadStore, saveStore } from './utils/pesertaStore.js';
+const riwayat = await loadStore();
+await saveStore(riwayat);
+const dibukaKembali = await loadStore();
+console.log(`Tersimpan dan dibaca kembali: ${dibukaKembali.length} hasil tes`);
+console.log(`Urutan tetap: ${riwayat.map(({ id }) => id).join(', ') === dibukaKembali.map(({ id }) => id).join(', ')}`);
```

<!-- write: cek-store.js -->
```javascript
import { loadStore, saveStore } from './utils/pesertaStore.js';
const riwayat = await loadStore();
await saveStore(riwayat);
const dibukaKembali = await loadStore();
console.log(`Tersimpan dan dibaca kembali: ${dibukaKembali.length} hasil tes`);
console.log(`Urutan tetap: ${riwayat.map(({ id }) => id).join(', ') === dibukaKembali.map(({ id }) => id).join(', ')}`);
```

Jalankan dari root repository:

```bash
node latihan/proyek/cek-store.js
```

<!-- expected: cek-store.js -->
```text
Tersimpan dan dibaca kembali: 6 hasil tes
Urutan tetap: true
```

Jalankan cek-store.js sekali lagi. Hasilnya sama, tetapi file kerja yang sudah ada kini dibaca langsung. Contoh ini menyimpan seed tanpa menambah peserta agar tahap menu dimulai dari data contoh. Pada operasi nyata, hitung array baru, await saveStore, baru ganti variabel memori. Tahap 12 menerapkan urutan ini.

## Tantangan: Simpan tes yang nilainya turun

Gunakan file tantangan terpisah agar data kerja aplikasi tidak berubah. Buktikan riwayat 90, 79, 80 tetap ada setelah dibaca kembali.

<details>
<summary>Lihat penyelesaian tantangan</summary>

Buat file `tantangan-11.js` dengan isi lengkap berikut.

<!-- challenge: tantangan-11.js -->
```javascript
import assert from 'node:assert/strict';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { tambahPeserta, tambahNilai } from './utils/pesertaCrud.js';
import { loadStore, saveStore } from './utils/pesertaStore.js';
const folder = await mkdtemp(join(tmpdir(), 'tantangan-peserta-'));
try {
  const file = join(folder, 'riwayat.json');
  let list = tambahPeserta([], { name: 'Rina', email: 'rina@example.com', class: 'Node.js', score: 90 });
  list = tambahNilai(list, 'rina@example.com', 79);
  list = tambahNilai(list, 'rina@example.com', 80);
  await saveStore(list, file);
  assert.deepEqual((await loadStore(file)).map(({ score }) => score), [90, 79, 80]);
  console.log('Tantangan 11: riwayat 90, 79, 80 bertahan setelah dibaca kembali');
} finally {
  await rm(folder, { recursive: true, force: true });
}
```

Jalankan dari root repository:

```bash
node latihan/proyek/tantangan-11.js
```

<!-- challenge-output: tantangan-11.js -->
```text
Tantangan 11: riwayat 90, 79, 80 bertahan setelah dibaca kembali
```

</details>

## Checkpoint

- [ ] Data contoh tetap utuh dan file kerja diabaikan Git.
- [ ] Struktur file, identitas, ID, dan nilai divalidasi sebelum digunakan.
- [ ] Inisialisasi hanya terjadi saat file kerja belum tersedia.
- [ ] Penyimpanan selesai sebelum memori diganti.

[Tahap sebelumnya](../10-crud-peserta/README.md) · [Daftar latihan](../README.md) · [Tahap berikutnya](../12-menu-terminal/README.md)
