# 09. Memuat JSON dengan async dan menangani kegagalan

Di akhir tahap ini aplikasi membaca data dari file, mempertahankan nilai 0, dan menangani kegagalan pemuatan. Prasyarat: tahap 08 selesai dan tiga module processor, validator, serta formatter sudah ada di proyekmu.

## Cara mengikuti tahap ini

Semua path file pada petunjuk berada di dalam `latihan/proyek/`. Jalankan perintah terminal dari root repository. Ganti seluruh isi file yang disebut; pertahankan file lain dari tahap sebelumnya.

Pada blok `diff`, baris `-` menunjukkan kode sebelum perubahan dan baris `+` menunjukkan kode sesudah perubahan. Gunakan blok kode lengkap setelahnya untuk mengganti isi file.

## Langkah 1: Pindahkan data ke JSON dan tunggu Promise

Buat folder `data` di proyek peserta, lalu buat `data/peserta.json` dengan seluruh isi berikut. Ini salinan data latihan; jangan mengubah `data/peserta.json` di root repository.

File baru: `data/peserta.json`. Berikut isi lengkapnya.

<!-- write: data/peserta.json -->
```json
{
  "peserta": [
    {
      "id": 101,
      "name": "Aditya Prayoga",
      "email": "aditya@brainmatics.com",
      "class": "JavaScript Fundamentals",
      "score": 85
    },
    {
      "id": 102,
      "name": "Zaim Fauzan",
      "email": "zaim@brainmatics.com",
      "class": "React Basics",
      "score": 92
    },
    {
      "id": 103,
      "name": "Aditya Prayoga",
      "email": "aditya@brainmatics.com",
      "class": "JavaScript Fundamentals",
      "score": 88
    },
    {
      "id": 104,
      "name": "Milea Kusuma",
      "email": "milea@brainmatics.com",
      "class": "JavaScript Fundamentals",
      "score": 78
    },
    {
      "id": 105,
      "name": "Pratama Wijaya",
      "email": "pratama@brainmatics.com",
      "class": "React Basics",
      "score": 95
    },
    {
      "id": 106,
      "name": "Zaim Fauzan",
      "email": "zaim@brainmatics.com",
      "class": "React Basics",
      "score": 94
    }
  ]
}
```
Ganti seluruh `main.js` berikut. Array inline dari tahap 08 sekarang digantikan oleh pembacaan JSON.

Perubahan pada `main.js`:

```diff
--- sebelum/main.js
+++ sesudah/main.js
@@ -1,68 +1,6 @@
-import {
-  getUniqueEmails, createPesertaMap, getUniquePeserta,
-  getPesertaByClass, calculateAverageScore
-} from "./utils/pesertaProcessor.js";
-import {
-  PesertaValidator, createPassingValidator, createLenientValidator
-} from "./utils/pesertaValidator.js";
-import {
-  displayPeserta, createPesertaSummary, formatPesertaList, createDetailedReport
-} from "./utils/pesertaFormatter.js";
+import { readFile } from 'node:fs/promises';

-const rawPeserta = [
-  {
-    "id": 101,
-    "name": "Aditya Prayoga",
-    "email": "aditya@brainmatics.com",
-    "class": "JavaScript Fundamentals",
-    "score": 85
-  },
-  {
-    "id": 102,
-    "name": "Zaim Fauzan",
-    "email": "zaim@brainmatics.com",
-    "class": "React Basics",
-    "score": 92
-  },
-  {
-    "id": 103,
-    "name": "Aditya Prayoga",
-    "email": "aditya@brainmatics.com",
-    "class": "JavaScript Fundamentals",
-    "score": 88
-  },
-  {
-    "id": 104,
-    "name": "Milea Kusuma",
-    "email": "milea@brainmatics.com",
-    "class": "JavaScript Fundamentals",
-    "score": 78
-  },
-  {
-    "id": 105,
-    "name": "Pratama Wijaya",
-    "email": "pratama@brainmatics.com",
-    "class": "React Basics",
-    "score": 95
-  },
-  {
-    "id": 106,
-    "name": "Zaim Fauzan",
-    "email": "zaim@brainmatics.com",
-    "class": "React Basics",
-    "score": 94
-  }
-];
-
-const uniquePeserta = getUniquePeserta(rawPeserta);
-console.log(`Email unik: ${getUniqueEmails(rawPeserta).length}`);
-console.log(`Nilai terakhir Aditya: ${createPesertaMap(rawPeserta).get("aditya@brainmatics.com").score}`);
-console.log(formatPesertaList(uniquePeserta));
-console.log(`Rata-rata: ${calculateAverageScore(uniquePeserta)}`);
-console.log(`Peserta React: ${getPesertaByClass(uniquePeserta, "React Basics").length}`);
-console.log(displayPeserta("Milea", 78, "lulus"));
-console.log(createPesertaSummary(uniquePeserta[0]));
-console.log(createDetailedReport(uniquePeserta[0]));
-console.log(`Batas lulus: ${PesertaValidator.PASSING_SCORE}`);
-console.log(`Valid passing: ${createPassingValidator().validateBatch(uniquePeserta).valid}`);
-console.log(`Valid lenient: ${createLenientValidator().validateBatch(uniquePeserta).valid}`);
+const pembacaan = readFile(new URL('./data/peserta.json', import.meta.url), 'utf8');
+console.log(`Pembacaan menghasilkan Promise: ${pembacaan instanceof Promise}`);
+const json = JSON.parse(await pembacaan);
+console.log(`Jumlah tes: ${json.peserta.length}`);
```

Kode lengkap `main.js` setelah perubahan:

<!-- write: main.js -->
```javascript
import { readFile } from 'node:fs/promises';

const pembacaan = readFile(new URL('./data/peserta.json', import.meta.url), 'utf8');
console.log(`Pembacaan menghasilkan Promise: ${pembacaan instanceof Promise}`);
const json = JSON.parse(await pembacaan);
console.log(`Jumlah tes: ${json.peserta.length}`);
```
Jalankan:

```bash
node latihan/proyek/main.js
```

<!-- expected: main.js -->
```text
Pembacaan menghasilkan Promise: true
Jumlah tes: 6
```
`readFile` mengembalikan Promise. `await` menunggu hasil operasi ini tanpa memblokir seluruh proses Node. Teks hasil pembacaan belum menjadi object sampai diproses oleh `JSON.parse`. `await` di luar fungsi diperbolehkan pada ES module melalui top-level await.

## Langkah 2: Bangun module loader

Buat `utils/pesertaLoader.js` dengan isi lengkap berikut.

File baru: `utils/pesertaLoader.js`. Berikut isi lengkapnya.

<!-- write: utils/pesertaLoader.js -->
```javascript
import { readFile } from 'node:fs/promises';

// ES2017: async mengembalikan Promise; await menunggu hasil pembacaan file.
export const loadPeserta = async (fileUrl = new URL('../data/peserta.json', import.meta.url)) => {
  try {
    const text = await readFile(fileUrl, 'utf8');
    const json = JSON.parse(text);
    const pesertaList = json?.peserta ?? [];
    // ES2018 rest/spread menyalin properti. ES2020 ?? mempertahankan nilai 0.
    return pesertaList.map(({ score, ...rest }) => ({ ...rest, score: score ?? 0 }));
  } catch (error) {
    throw new Error(`Gagal memuat data peserta dari ${fileUrl}: ${error.message}`);
  }
};
```
Fungsi `async` selalu mengembalikan Promise. Pemanggil harus menunggu hasilnya dengan `await` atau memakai `.then()`. Path default dibangun relatif terhadap file loader, sehingga tidak bergantung pada direktori terminal.

`json?.peserta` berhenti ketika `json` null atau undefined. `?? []` menyediakan daftar kosong. `score ?? 0` hanya mengganti null atau undefined; nilai 0 tetap dipertahankan. `||` juga mengganti 0 dan string kosong.

`try` mencakup pembacaan, parsing, dan normalisasi data. `catch` memberi konteks file pada error. Loader ini bukan validator untuk semua bentuk JSON; data latihan mengikuti struktur yang ditentukan.

## Langkah 3: Pakai loader dan hubungkan kembali pengolahan peserta

Ganti seluruh `main.js`:

Perubahan pada `main.js`:

```diff
--- sebelum/main.js
+++ sesudah/main.js
@@ -1,6 +1,19 @@
-import { readFile } from 'node:fs/promises';
+import { loadPeserta } from './utils/pesertaLoader.js';
+import { createPesertaMap } from './utils/pesertaProcessor.js';
+import { displayPeserta } from './utils/pesertaFormatter.js';

-const pembacaan = readFile(new URL('./data/peserta.json', import.meta.url), 'utf8');
-console.log(`Pembacaan menghasilkan Promise: ${pembacaan instanceof Promise}`);
-const json = JSON.parse(await pembacaan);
-console.log(`Jumlah tes: ${json.peserta.length}`);
+let rawPeserta;
+try {
+  rawPeserta = await loadPeserta();
+} catch (error) {
+  console.error(`❌ ${error.message}`);
+  process.exit(1);
+}
+
+const pesertaMap = createPesertaMap(rawPeserta);
+console.log(`Jumlah tes: ${rawPeserta.length}`);
+console.log(`Peserta unik: ${pesertaMap.size}`);
+const { name, score } = pesertaMap.get('aditya@brainmatics.com');
+console.log(displayPeserta(name, score));
+console.log(`Peserta tidak ada: ${pesertaMap.get('tidak-ada@brainmatics.com')?.name ?? 'tidak ditemukan'}`);
+console.log(`Nilai nol tetap: ${0 ?? 80}`);
```

Kode lengkap `main.js` setelah perubahan:

<!-- write: main.js -->
```javascript
import { loadPeserta } from './utils/pesertaLoader.js';
import { createPesertaMap } from './utils/pesertaProcessor.js';
import { displayPeserta } from './utils/pesertaFormatter.js';

let rawPeserta;
try {
  rawPeserta = await loadPeserta();
} catch (error) {
  console.error(`❌ ${error.message}`);
  process.exit(1);
}

const pesertaMap = createPesertaMap(rawPeserta);
console.log(`Jumlah tes: ${rawPeserta.length}`);
console.log(`Peserta unik: ${pesertaMap.size}`);
const { name, score } = pesertaMap.get('aditya@brainmatics.com');
console.log(displayPeserta(name, score));
console.log(`Peserta tidak ada: ${pesertaMap.get('tidak-ada@brainmatics.com')?.name ?? 'tidak ditemukan'}`);
console.log(`Nilai nol tetap: ${0 ?? 80}`);
```
Jalankan:

```bash
node latihan/proyek/main.js
```

<!-- expected: main.js -->
```text
Jumlah tes: 6
Peserta unik: 4
Nama: Aditya Prayoga, Score: 88, Status: LULUS
Peserta tidak ada: tidak ditemukan
Nilai nol tetap: 0
```
`let rawPeserta` diperlukan karena nilainya diisi di dalam `try`. Kegagalan pada aplikasi utama menghentikan program dengan exit code 1, sehingga aplikasi tidak meneruskan laporan dengan data yang gagal dibaca.

## Langkah 4: Jalankan jalur gagal tanpa merusak data

Buat `cek-loader.js`. File `data/tidak-ada.json` sengaja tidak dibuat.

File baru: `cek-loader.js`. Berikut isi lengkapnya.

<!-- write: cek-loader.js -->
```javascript
import { loadPeserta } from './utils/pesertaLoader.js';

let peserta = [];
try {
  peserta = await loadPeserta(new URL('./data/tidak-ada.json', import.meta.url));
} catch {
  console.log('Data tidak bisa dimuat, memakai daftar kosong');
}
console.log(`Peserta pertama: ${peserta[0]?.name ?? 'tidak ada'}`);
```
Jalankan:

```bash
node latihan/proyek/cek-loader.js
```

<!-- expected: cek-loader.js -->
```text
Data tidak bisa dimuat, memakai daftar kosong
Peserta pertama: tidak ada
```
Pada demo ini kita sengaja memakai daftar kosong agar bisa mempelajari fallback. Pada aplikasi utama, keputusan saat loader gagal tetap menghentikan program.

## Kesalahan umum

- Tanpa `await`, nilai yang diterima masih Promise, bukan array peserta.
- JSON tidak menerima komentar atau trailing comma. Periksa file jika `JSON.parse` gagal.
- Default parameter hanya menangani undefined; `??` juga menangani null.
- `?.` tidak mengganti `try/catch` untuk error pembacaan file.

## Tantangan: Bedakan data kosong dan JSON rusak

Buat empat file fixture di bawah dalam folder `data` proyek peserta. Prediksi hasil untuk JSON null, key peserta yang tidak ada, nilai yang hilang, dan nilai 0. JSON rusak seharusnya masuk catch.

Buat `data/contoh-null.json`:

File baru: `data/contoh-null.json`. Berikut isi lengkapnya.

<!-- write: data/contoh-null.json -->
```json
null
```

Buat `data/contoh-kosong.json`:

File baru: `data/contoh-kosong.json`. Berikut isi lengkapnya.

<!-- write: data/contoh-kosong.json -->
```json
{}
```

Buat `data/contoh-nilai.json`:

File baru: `data/contoh-nilai.json`. Berikut isi lengkapnya.

<!-- write: data/contoh-nilai.json -->
```json
{
  "peserta": [
    {
      "name": "Rina"
    },
    {
      "name": "Zaim",
      "score": 0
    }
  ]
}
```

Buat `data/contoh-rusak.json`:

File baru: `data/contoh-rusak.json`. Berikut isi lengkapnya.

<!-- write: data/contoh-rusak.json -->
```text
{ "peserta": [ }
```

<details>
<summary>Lihat penyelesaian tantangan</summary>

Buat `tantangan-09.js` dengan kode lengkap berikut:

<!-- challenge: tantangan-09.js -->
```javascript
import { loadPeserta } from './utils/pesertaLoader.js';

const nullList = await loadPeserta(new URL('./data/contoh-null.json', import.meta.url));
const kosong = await loadPeserta(new URL('./data/contoh-kosong.json', import.meta.url));
const nilai = await loadPeserta(new URL('./data/contoh-nilai.json', import.meta.url));
console.log(`JSON null: ${nullList.length} peserta`);
console.log(`Tanpa peserta: ${kosong.length} peserta`);
console.log(`Tanpa score: ${nilai[0].score}`);
console.log(`Score nol: ${nilai[1].score}`);
try {
  await loadPeserta(new URL('./data/contoh-rusak.json', import.meta.url));
} catch (error) {
  console.log(`JSON rusak ditangani: ${error.message.startsWith('Gagal memuat data peserta')}`);
}
```
Jalankan dari root:

```bash
node latihan/proyek/tantangan-09.js
```

<!-- challenge-output: tantangan-09.js -->
```text
JSON null: 0 peserta
Tanpa peserta: 0 peserta
Tanpa score: 0
Score nol: 0
JSON rusak ditangani: true
```

JSON null dan key yang hilang menghasilkan daftar kosong. Nilai hilang dinormalisasi menjadi 0. JSON yang tidak bisa diparse menghasilkan error, sehingga penanganannya berbeda dari daftar kosong.

</details>

## Kondisi lengkap akhir tahap

Isi lengkap loader ada pada langkah 2 dan main ada pada langkah 3. `package.json` serta tiga module tahap 08 tetap dipertahankan. Data utama dan empat fixture tercantum lengkap di atas. `cek-loader.js` dan `tantangan-09.js` adalah file percobaan terpisah, bukan import main.

## Checkpoint

- [ ] Main membaca file JSON, bukan array inline.
- [ ] Enam tes menghasilkan empat peserta unik dan nilai terakhir Aditya 88.
- [ ] Email tidak ditemukan menghasilkan fallback dan nilai 0 tetap 0.
- [ ] File tidak ditemukan dan JSON rusak masuk catch.
- [ ] Saya bisa menjelaskan perbedaan jalur gagal aplikasi utama dan demo fallback.

[Tahap sebelumnya](../08-module-dan-formatter/README.md) · [Daftar latihan](../README.md) · [Tahap berikutnya](../10-crud-peserta/README.md)
