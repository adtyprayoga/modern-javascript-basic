# 10. CRUD peserta pada array

Buat fungsi tambah, baca, ubah, hapus, dan tes ulang. Prasyarat: tahap 09 selesai. Satu object adalah satu hasil tes; email mengidentifikasi peserta dan ID mengidentifikasi tes. Tahap ini bekerja di memori, sehingga contoh belum menyimpan perubahan ke JSON.

Semua nama file berada di `latihan/proyek/`. Jalankan perintah dari root repository. Pertahankan file tahap sebelumnya. Pada diff, `-` adalah kode lama dan `+` adalah kode baru. Ketik perubahan, lalu cocokkan dengan kode lengkap setelah diff. Jalankan setiap checkpoint sebelum melanjutkan.

## Langkah 1: Tambah peserta dan baca riwayat

Normalisasikan email sebelum membandingkan identitas. `Set` mendeteksi email ganda. `map` dan object spread menyalin entri sumber. ID baru memakai ID terbesar ditambah satu. Nilai harus bertipe number, terbatas, dan berada pada 0–100. String kosong tidak menjadi nol.

Buat file `utils/pesertaCrud.js` dengan isi lengkap berikut.

<!-- write: utils/pesertaCrud.js -->
```javascript
const normalisasiEmail = (email = '') => {
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    throw new Error('Email harus berformat valid.');
  }
  return email.trim().toLowerCase();
};

const teksWajib = (nilai, label) => {
  if (typeof nilai !== 'string' || nilai.trim() === '') {
    throw new Error(`${label} wajib diisi.`);
  }
  return nilai.trim();
};

const validasiNilai = (score) => {
  if (typeof score !== 'number' || !Number.isFinite(score) || score < 0 || score > 100) {
    throw new Error('Nilai harus berupa angka terbatas antara 0 dan 100.');
  }
};

const biodataPeserta = (data = {}) => {
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Biodata peserta harus berupa object.');
  }
  return {
    name: teksWajib(data.name, 'Nama'),
    email: normalisasiEmail(data.email),
    class: teksWajib(data.class, 'Kelas')
  };
};

const cariRiwayat = (list = [], email = '') => {
  const identitas = normalisasiEmail(email);
  const riwayat = list.filter(peserta => normalisasiEmail(peserta.email) === identitas);
  if (riwayat.length === 0) throw new Error('Peserta tidak ditemukan.');
  return riwayat;
};

const idBerikutnya = (list = []) => {
  const id = list.reduce((terbesar, peserta) => Math.max(terbesar, peserta.id), 0) + 1;
  if (!Number.isSafeInteger(id)) throw new Error('ID hasil tes tidak dapat ditambahkan.');
  return id;
};

const salinRiwayat = (list = []) => list.map(peserta => ({ ...peserta }));

/**
 * Tambahkan peserta beserta nilai tes pertamanya tanpa mengubah list sumber.
 * @param {Array} list Riwayat hasil tes.
 * @param {Object} data Biodata dan nilai peserta baru.
 * @returns {Array} Riwayat baru.
 */
export const tambahPeserta = (list = [], data = {}) => {
  const biodata = biodataPeserta(data);
  validasiNilai(data.score);
  const emailTerdaftar = new Set(list.map(peserta => normalisasiEmail(peserta.email)));
  if (emailTerdaftar.has(biodata.email)) throw new Error('Email sudah terdaftar.');
  // ES2018 object spread menyalin data agar riwayat sumber tetap utuh.
  return [...salinRiwayat(list), { id: idBerikutnya(list), ...biodata, score: data.score }];
};

/**
 * Baca seluruh tes peserta sesuai urutan pencatatan.
 * @param {Array} list Riwayat hasil tes.
 * @param {string} email Identitas peserta.
 * @returns {Array} Salinan riwayat peserta.
 */
export const getRiwayatTes = (list = [], email = '') => salinRiwayat(cariRiwayat(list, email));
```

Buat file `cek-crud.js` dengan isi lengkap berikut.

<!-- write: cek-crud.js -->
```javascript
import { tambahPeserta, getRiwayatTes } from './utils/pesertaCrud.js';
const awal = [];
const hasil = tambahPeserta(awal, { name: 'Rina', email: ' RINA@example.com ', class: 'Node.js', score: 90 });
console.log(`Sumber: ${awal.length} tes`);
console.log(JSON.stringify(getRiwayatTes(hasil, 'rina@example.com')));
try {
  tambahPeserta(hasil, { name: 'Lain', email: 'rina@example.com', class: 'Node.js', score: 80 });
} catch (error) {
  console.log(error.message);
}
```

Jalankan dari root repository:

```bash
node latihan/proyek/cek-crud.js
```

<!-- expected: cek-crud.js -->
```text
Sumber: 0 tes
[{"id":1,"name":"Rina","email":"rina@example.com","class":"Node.js","score":90}]
Email sudah terdaftar.
```

## Langkah 2: Ubah biodata tanpa mengubah hasil tes

`ubahPeserta` menggabungkan perubahan dengan biodata terakhir. Hanya nama, email, dan kelas yang masuk salinan hasil. Properti score dari perubahan tidak dipakai. Perbarui semua entri dengan email sama agar riwayat tetap konsisten. Tolak email yang sudah dipakai peserta lain.

Perubahan pada `utils/pesertaCrud.js`:

```diff
--- sebelum/utils/pesertaCrud.js
+++ sesudah/utils/pesertaCrud.js
@@ -60,6 +60,29 @@
 };

 /**
+ * Perbarui biodata pada seluruh tes peserta dan pertahankan nilai serta ID.
+ * @param {Array} list Riwayat hasil tes.
+ * @param {string} email Identitas peserta saat ini.
+ * @param {Object} perubahan Biodata yang ingin diubah.
+ * @returns {Array} Riwayat baru.
+ */
+export const ubahPeserta = (list = [], email = '', perubahan = {}) => {
+  const riwayat = cariRiwayat(list, email);
+  if (perubahan === null || typeof perubahan !== 'object' || Array.isArray(perubahan)) {
+    throw new Error('Biodata peserta harus berupa object.');
+  }
+  const identitas = normalisasiEmail(email);
+  const biodata = biodataPeserta({ ...riwayat.at(-1), ...perubahan });
+  const emailLain = new Set(list
+    .map(peserta => normalisasiEmail(peserta.email))
+    .filter(alamat => alamat !== identitas));
+  if (emailLain.has(biodata.email)) throw new Error('Email sudah terdaftar.');
+  return list.map(peserta => normalisasiEmail(peserta.email) === identitas
+    ? { ...peserta, ...biodata }
+    : { ...peserta });
+};
+
+/**
  * Baca seluruh tes peserta sesuai urutan pencatatan.
  * @param {Array} list Riwayat hasil tes.
  * @param {string} email Identitas peserta.
```

<!-- write: utils/pesertaCrud.js -->
```javascript
const normalisasiEmail = (email = '') => {
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    throw new Error('Email harus berformat valid.');
  }
  return email.trim().toLowerCase();
};

const teksWajib = (nilai, label) => {
  if (typeof nilai !== 'string' || nilai.trim() === '') {
    throw new Error(`${label} wajib diisi.`);
  }
  return nilai.trim();
};

const validasiNilai = (score) => {
  if (typeof score !== 'number' || !Number.isFinite(score) || score < 0 || score > 100) {
    throw new Error('Nilai harus berupa angka terbatas antara 0 dan 100.');
  }
};

const biodataPeserta = (data = {}) => {
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Biodata peserta harus berupa object.');
  }
  return {
    name: teksWajib(data.name, 'Nama'),
    email: normalisasiEmail(data.email),
    class: teksWajib(data.class, 'Kelas')
  };
};

const cariRiwayat = (list = [], email = '') => {
  const identitas = normalisasiEmail(email);
  const riwayat = list.filter(peserta => normalisasiEmail(peserta.email) === identitas);
  if (riwayat.length === 0) throw new Error('Peserta tidak ditemukan.');
  return riwayat;
};

const idBerikutnya = (list = []) => {
  const id = list.reduce((terbesar, peserta) => Math.max(terbesar, peserta.id), 0) + 1;
  if (!Number.isSafeInteger(id)) throw new Error('ID hasil tes tidak dapat ditambahkan.');
  return id;
};

const salinRiwayat = (list = []) => list.map(peserta => ({ ...peserta }));

/**
 * Tambahkan peserta beserta nilai tes pertamanya tanpa mengubah list sumber.
 * @param {Array} list Riwayat hasil tes.
 * @param {Object} data Biodata dan nilai peserta baru.
 * @returns {Array} Riwayat baru.
 */
export const tambahPeserta = (list = [], data = {}) => {
  const biodata = biodataPeserta(data);
  validasiNilai(data.score);
  const emailTerdaftar = new Set(list.map(peserta => normalisasiEmail(peserta.email)));
  if (emailTerdaftar.has(biodata.email)) throw new Error('Email sudah terdaftar.');
  // ES2018 object spread menyalin data agar riwayat sumber tetap utuh.
  return [...salinRiwayat(list), { id: idBerikutnya(list), ...biodata, score: data.score }];
};

/**
 * Perbarui biodata pada seluruh tes peserta dan pertahankan nilai serta ID.
 * @param {Array} list Riwayat hasil tes.
 * @param {string} email Identitas peserta saat ini.
 * @param {Object} perubahan Biodata yang ingin diubah.
 * @returns {Array} Riwayat baru.
 */
export const ubahPeserta = (list = [], email = '', perubahan = {}) => {
  const riwayat = cariRiwayat(list, email);
  if (perubahan === null || typeof perubahan !== 'object' || Array.isArray(perubahan)) {
    throw new Error('Biodata peserta harus berupa object.');
  }
  const identitas = normalisasiEmail(email);
  const biodata = biodataPeserta({ ...riwayat.at(-1), ...perubahan });
  const emailLain = new Set(list
    .map(peserta => normalisasiEmail(peserta.email))
    .filter(alamat => alamat !== identitas));
  if (emailLain.has(biodata.email)) throw new Error('Email sudah terdaftar.');
  return list.map(peserta => normalisasiEmail(peserta.email) === identitas
    ? { ...peserta, ...biodata }
    : { ...peserta });
};

/**
 * Baca seluruh tes peserta sesuai urutan pencatatan.
 * @param {Array} list Riwayat hasil tes.
 * @param {string} email Identitas peserta.
 * @returns {Array} Salinan riwayat peserta.
 */
export const getRiwayatTes = (list = [], email = '') => salinRiwayat(cariRiwayat(list, email));
```

Perubahan pada `cek-crud.js`:

```diff
--- sebelum/cek-crud.js
+++ sesudah/cek-crud.js
@@ -1,10 +1,5 @@
-import { tambahPeserta, getRiwayatTes } from './utils/pesertaCrud.js';
-const awal = [];
-const hasil = tambahPeserta(awal, { name: 'Rina', email: ' RINA@example.com ', class: 'Node.js', score: 90 });
-console.log(`Sumber: ${awal.length} tes`);
-console.log(JSON.stringify(getRiwayatTes(hasil, 'rina@example.com')));
-try {
-  tambahPeserta(hasil, { name: 'Lain', email: 'rina@example.com', class: 'Node.js', score: 80 });
-} catch (error) {
-  console.log(error.message);
-}
+import { tambahPeserta, ubahPeserta, getRiwayatTes } from './utils/pesertaCrud.js';
+const awal = tambahPeserta([], { name: 'Rina', email: 'rina@example.com', class: 'Node.js', score: 90 });
+const hasil = ubahPeserta(awal, 'rina@example.com', { name: 'Rina Putri', email: 'putri@example.com', score: 0 });
+console.log(JSON.stringify(getRiwayatTes(hasil, 'putri@example.com')));
+console.log(`Nama sumber: ${awal[0].name}; nilai sumber: ${awal[0].score}`);
```

<!-- write: cek-crud.js -->
```javascript
import { tambahPeserta, ubahPeserta, getRiwayatTes } from './utils/pesertaCrud.js';
const awal = tambahPeserta([], { name: 'Rina', email: 'rina@example.com', class: 'Node.js', score: 90 });
const hasil = ubahPeserta(awal, 'rina@example.com', { name: 'Rina Putri', email: 'putri@example.com', score: 0 });
console.log(JSON.stringify(getRiwayatTes(hasil, 'putri@example.com')));
console.log(`Nama sumber: ${awal[0].name}; nilai sumber: ${awal[0].score}`);
```

Jalankan dari root repository:

```bash
node latihan/proyek/cek-crud.js
```

<!-- expected: cek-crud.js -->
```text
[{"id":1,"name":"Rina Putri","email":"putri@example.com","class":"Node.js","score":90}]
Nama sumber: Rina; nilai sumber: 90
```

## Langkah 3: Catat tes ulang dan hapus seluruh riwayat

Tambahkan hasil tes di akhir array, walaupun nilainya turun. `.at(-1)` membaca tes terakhir. Hapus seluruh entri peserta supaya tes lama tidak muncul lagi sebagai nilai terakhir. Konfirmasi penghapusan dibuat pada menu tahap 12, sedangkan fungsi ini hanya mengolah array.

Perubahan pada `utils/pesertaCrud.js`:

```diff
--- sebelum/utils/pesertaCrud.js
+++ sesudah/utils/pesertaCrud.js
@@ -83,6 +83,31 @@
 };

 /**
+ * Hapus peserta beserta seluruh hasil tesnya.
+ * @param {Array} list Riwayat hasil tes.
+ * @param {string} email Identitas peserta.
+ * @returns {Array} Riwayat baru tanpa peserta tersebut.
+ */
+export const hapusPeserta = (list = [], email = '') => {
+  cariRiwayat(list, email);
+  const identitas = normalisasiEmail(email);
+  return salinRiwayat(list.filter(peserta => normalisasiEmail(peserta.email) !== identitas));
+};
+
+/**
+ * Catat tes ulang di akhir array, termasuk jika nilainya turun.
+ * @param {Array} list Riwayat hasil tes.
+ * @param {string} email Identitas peserta.
+ * @param {number} score Nilai tes baru.
+ * @returns {Array} Riwayat baru dengan satu hasil tes tambahan.
+ */
+export const tambahNilai = (list = [], email = '', score = 0) => {
+  const terakhir = cariRiwayat(list, email).at(-1);
+  validasiNilai(score);
+  return [...salinRiwayat(list), { id: idBerikutnya(list), ...biodataPeserta(terakhir), score }];
+};
+
+/**
  * Baca seluruh tes peserta sesuai urutan pencatatan.
  * @param {Array} list Riwayat hasil tes.
  * @param {string} email Identitas peserta.
```

<!-- write: utils/pesertaCrud.js -->
```javascript
const normalisasiEmail = (email = '') => {
  if (typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
    throw new Error('Email harus berformat valid.');
  }
  return email.trim().toLowerCase();
};

const teksWajib = (nilai, label) => {
  if (typeof nilai !== 'string' || nilai.trim() === '') {
    throw new Error(`${label} wajib diisi.`);
  }
  return nilai.trim();
};

const validasiNilai = (score) => {
  if (typeof score !== 'number' || !Number.isFinite(score) || score < 0 || score > 100) {
    throw new Error('Nilai harus berupa angka terbatas antara 0 dan 100.');
  }
};

const biodataPeserta = (data = {}) => {
  if (data === null || typeof data !== 'object' || Array.isArray(data)) {
    throw new Error('Biodata peserta harus berupa object.');
  }
  return {
    name: teksWajib(data.name, 'Nama'),
    email: normalisasiEmail(data.email),
    class: teksWajib(data.class, 'Kelas')
  };
};

const cariRiwayat = (list = [], email = '') => {
  const identitas = normalisasiEmail(email);
  const riwayat = list.filter(peserta => normalisasiEmail(peserta.email) === identitas);
  if (riwayat.length === 0) throw new Error('Peserta tidak ditemukan.');
  return riwayat;
};

const idBerikutnya = (list = []) => {
  const id = list.reduce((terbesar, peserta) => Math.max(terbesar, peserta.id), 0) + 1;
  if (!Number.isSafeInteger(id)) throw new Error('ID hasil tes tidak dapat ditambahkan.');
  return id;
};

const salinRiwayat = (list = []) => list.map(peserta => ({ ...peserta }));

/**
 * Tambahkan peserta beserta nilai tes pertamanya tanpa mengubah list sumber.
 * @param {Array} list Riwayat hasil tes.
 * @param {Object} data Biodata dan nilai peserta baru.
 * @returns {Array} Riwayat baru.
 */
export const tambahPeserta = (list = [], data = {}) => {
  const biodata = biodataPeserta(data);
  validasiNilai(data.score);
  const emailTerdaftar = new Set(list.map(peserta => normalisasiEmail(peserta.email)));
  if (emailTerdaftar.has(biodata.email)) throw new Error('Email sudah terdaftar.');
  // ES2018 object spread menyalin data agar riwayat sumber tetap utuh.
  return [...salinRiwayat(list), { id: idBerikutnya(list), ...biodata, score: data.score }];
};

/**
 * Perbarui biodata pada seluruh tes peserta dan pertahankan nilai serta ID.
 * @param {Array} list Riwayat hasil tes.
 * @param {string} email Identitas peserta saat ini.
 * @param {Object} perubahan Biodata yang ingin diubah.
 * @returns {Array} Riwayat baru.
 */
export const ubahPeserta = (list = [], email = '', perubahan = {}) => {
  const riwayat = cariRiwayat(list, email);
  if (perubahan === null || typeof perubahan !== 'object' || Array.isArray(perubahan)) {
    throw new Error('Biodata peserta harus berupa object.');
  }
  const identitas = normalisasiEmail(email);
  const biodata = biodataPeserta({ ...riwayat.at(-1), ...perubahan });
  const emailLain = new Set(list
    .map(peserta => normalisasiEmail(peserta.email))
    .filter(alamat => alamat !== identitas));
  if (emailLain.has(biodata.email)) throw new Error('Email sudah terdaftar.');
  return list.map(peserta => normalisasiEmail(peserta.email) === identitas
    ? { ...peserta, ...biodata }
    : { ...peserta });
};

/**
 * Hapus peserta beserta seluruh hasil tesnya.
 * @param {Array} list Riwayat hasil tes.
 * @param {string} email Identitas peserta.
 * @returns {Array} Riwayat baru tanpa peserta tersebut.
 */
export const hapusPeserta = (list = [], email = '') => {
  cariRiwayat(list, email);
  const identitas = normalisasiEmail(email);
  return salinRiwayat(list.filter(peserta => normalisasiEmail(peserta.email) !== identitas));
};

/**
 * Catat tes ulang di akhir array, termasuk jika nilainya turun.
 * @param {Array} list Riwayat hasil tes.
 * @param {string} email Identitas peserta.
 * @param {number} score Nilai tes baru.
 * @returns {Array} Riwayat baru dengan satu hasil tes tambahan.
 */
export const tambahNilai = (list = [], email = '', score = 0) => {
  const terakhir = cariRiwayat(list, email).at(-1);
  validasiNilai(score);
  return [...salinRiwayat(list), { id: idBerikutnya(list), ...biodataPeserta(terakhir), score }];
};

/**
 * Baca seluruh tes peserta sesuai urutan pencatatan.
 * @param {Array} list Riwayat hasil tes.
 * @param {string} email Identitas peserta.
 * @returns {Array} Salinan riwayat peserta.
 */
export const getRiwayatTes = (list = [], email = '') => salinRiwayat(cariRiwayat(list, email));
```

Perubahan pada `cek-crud.js`:

```diff
--- sebelum/cek-crud.js
+++ sesudah/cek-crud.js
@@ -1,5 +1,12 @@
-import { tambahPeserta, ubahPeserta, getRiwayatTes } from './utils/pesertaCrud.js';
-const awal = tambahPeserta([], { name: 'Rina', email: 'rina@example.com', class: 'Node.js', score: 90 });
-const hasil = ubahPeserta(awal, 'rina@example.com', { name: 'Rina Putri', email: 'putri@example.com', score: 0 });
-console.log(JSON.stringify(getRiwayatTes(hasil, 'putri@example.com')));
-console.log(`Nama sumber: ${awal[0].name}; nilai sumber: ${awal[0].score}`);
+import { tambahPeserta, tambahNilai, ubahPeserta, hapusPeserta, getRiwayatTes } from './utils/pesertaCrud.js';
+import { createPesertaMap } from './utils/pesertaProcessor.js';
+import { PesertaValidator } from './utils/pesertaValidator.js';
+let hasil = tambahPeserta([], { name: 'Rina', email: 'rina@example.com', class: 'Node.js', score: 90 });
+hasil = tambahNilai(hasil, 'rina@example.com', 79);
+console.log(PesertaValidator.getStatus(createPesertaMap(hasil).get('rina@example.com').score));
+hasil = tambahNilai(hasil, 'rina@example.com', 80);
+hasil = ubahPeserta(hasil, 'rina@example.com', { name: 'Rina Putri' });
+console.log(`Riwayat: ${getRiwayatTes(hasil, 'rina@example.com').map(({ score }) => score).join(', ')}`);
+console.log(`Semua nama: ${hasil.map(({ name }) => name).join(', ')}`);
+console.log(PesertaValidator.getStatus(createPesertaMap(hasil).get('rina@example.com').score));
+console.log(`Setelah hapus: ${hapusPeserta(hasil, 'rina@example.com').length} tes`);
```

<!-- write: cek-crud.js -->
```javascript
import { tambahPeserta, tambahNilai, ubahPeserta, hapusPeserta, getRiwayatTes } from './utils/pesertaCrud.js';
import { createPesertaMap } from './utils/pesertaProcessor.js';
import { PesertaValidator } from './utils/pesertaValidator.js';
let hasil = tambahPeserta([], { name: 'Rina', email: 'rina@example.com', class: 'Node.js', score: 90 });
hasil = tambahNilai(hasil, 'rina@example.com', 79);
console.log(PesertaValidator.getStatus(createPesertaMap(hasil).get('rina@example.com').score));
hasil = tambahNilai(hasil, 'rina@example.com', 80);
hasil = ubahPeserta(hasil, 'rina@example.com', { name: 'Rina Putri' });
console.log(`Riwayat: ${getRiwayatTes(hasil, 'rina@example.com').map(({ score }) => score).join(', ')}`);
console.log(`Semua nama: ${hasil.map(({ name }) => name).join(', ')}`);
console.log(PesertaValidator.getStatus(createPesertaMap(hasil).get('rina@example.com').score));
console.log(`Setelah hapus: ${hapusPeserta(hasil, 'rina@example.com').length} tes`);
```

Jalankan dari root repository:

```bash
node latihan/proyek/cek-crud.js
```

<!-- expected: cek-crud.js -->
```text
TIDAK LULUS
Riwayat: 90, 79, 80
Semua nama: Rina Putri, Rina Putri, Rina Putri
LULUS
Setelah hapus: 0 tes
```

## Tantangan: Nilai nol dan input tidak valid

Buktikan nilai nol diterima, input kosong ditolak, dan kegagalan tidak mengubah sumber. Coba sendiri sebelum membuka solusi.

<details>
<summary>Lihat penyelesaian tantangan</summary>

Buat file `tantangan-10.js` dengan isi lengkap berikut.

<!-- challenge: tantangan-10.js -->
```javascript
import assert from 'node:assert/strict';
import { tambahPeserta, tambahNilai, hapusPeserta } from './utils/pesertaCrud.js';
const awal = tambahPeserta([], { name: 'Rina', email: 'rina@example.com', class: 'Node.js', score: 0 });
assert.equal(awal[0].score, 0);
for (const score of ['', NaN, Infinity, -1, 101]) {
  assert.throws(() => tambahNilai(awal, 'rina@example.com', score), /Nilai/);
}
assert.throws(() => hapusPeserta(awal, 'lain@example.com'), /tidak ditemukan/);
assert.equal(awal.length, 1);
console.log('Tantangan 10: nilai nol diterima dan input tidak valid ditolak');
```

Jalankan dari root repository:

```bash
node latihan/proyek/tantangan-10.js
```

<!-- challenge-output: tantangan-10.js -->
```text
Tantangan 10: nilai nol diterima dan input tidak valid ditolak
```

</details>

## Checkpoint

- [ ] Kelima fungsi CRUD diekspor dari module sendiri.
- [ ] Nilai 90, 79, lalu 80 tetap tercatat berurutan.
- [ ] Ubah biodata mempertahankan ID serta nilai; hapus menghilangkan semua tes.
- [ ] Array dan object sumber tetap utuh.

[Tahap sebelumnya](../09-async-loader/README.md) · [Daftar latihan](../README.md) · [Tahap berikutnya](../11-penyimpanan-json/README.md)
