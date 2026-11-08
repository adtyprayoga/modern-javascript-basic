# 12. Bangun menu terminal

Ubah main.js menjadi aplikasi interaktif. Prasyarat: module CRUD dan store sudah lengkap. Satu pembaca readline dengan async iterator menjaga jawaban tetap berurutan, termasuk ketika input dikirim sekaligus melalui pipe.

Semua nama file berada di `latihan/proyek/`. Jalankan perintah dari root repository. Pertahankan file tahap sebelumnya. Pada diff, `-` adalah kode lama dan `+` adalah kode baru. Ketik perubahan, lalu cocokkan dengan kode lengkap setelah diff. Jalankan setiap checkpoint sebelum melanjutkan.

## Langkah 1: Tampilkan menu dan daftar peserta

Pembaca mengembalikan satu baris per panggilan baca. Symbol akhirInput menandai EOF tanpa menyerupai error validasi. finally selalu menutup pembaca. Menu lengkap sudah ditampilkan; pilihan yang belum dipasang sementara masuk pesan pilihan tidak valid. Mulai dengan daftar lalu keluar.

Perubahan pada `main.js`:

```diff
--- sebelum/main.js
+++ sesudah/main.js
@@ -1,19 +1,83 @@
-import { loadPeserta } from './utils/pesertaLoader.js';
-import { createPesertaMap } from './utils/pesertaProcessor.js';
-import { displayPeserta } from './utils/pesertaFormatter.js';
+import { createInterface } from 'node:readline';
+import { loadStore, saveStore } from './utils/pesertaStore.js';
+import { tambahPeserta, ubahPeserta, hapusPeserta, tambahNilai, getRiwayatTes } from './utils/pesertaCrud.js';
+import { getUniqueEmails, getUniquePeserta, createPesertaMap, getPesertaByClass, calculateAverageScore } from './utils/pesertaProcessor.js';
+import { displayPeserta, createPesertaSummary, formatPesertaList, createDetailedReport } from './utils/pesertaFormatter.js';
+import { PesertaValidator, createPassingValidator, createLenientValidator } from './utils/pesertaValidator.js';

-let rawPeserta;
+let riwayat;
 try {
-  rawPeserta = await loadPeserta();
+  riwayat = await loadStore();
 } catch (error) {
   console.error(`❌ ${error.message}`);
   process.exit(1);
 }

-const pesertaMap = createPesertaMap(rawPeserta);
-console.log(`Jumlah tes: ${rawPeserta.length}`);
-console.log(`Peserta unik: ${pesertaMap.size}`);
-const { name, score } = pesertaMap.get('aditya@brainmatics.com');
-console.log(displayPeserta(name, score));
-console.log(`Peserta tidak ada: ${pesertaMap.get('tidak-ada@brainmatics.com')?.name ?? 'tidak ditemukan'}`);
-console.log(`Nilai nol tetap: ${0 ?? 80}`);
+const pembaca = createInterface({ input: process.stdin, crlfDelay: Infinity });
+// Satu iterator menjaga urutan jawaban, termasuk input yang dikirim sekaligus.
+const jawaban = pembaca[Symbol.asyncIterator]();
+const akhirInput = Symbol('akhir input');
+const baca = async (pertanyaan = '') => {
+  process.stdout.write(pertanyaan);
+  const { value, done } = await jawaban.next();
+  if (done) throw akhirInput;
+  return value.trim();
+};
+const bacaEmail = async (pertanyaan = 'Email peserta: ') => (await baca(pertanyaan)).toLowerCase();
+const bacaNilai = async () => {
+  const input = await baca('Nilai (0–100): ');
+  if (input === '') throw new Error('Nilai wajib diisi.');
+  return Number(input);
+};
+const cariPeserta = (email = '') => {
+  const peserta = createPesertaMap(riwayat).get(email);
+  if (!peserta) throw new Error('Peserta tidak ditemukan.');
+  return peserta;
+};
+const simpan = async (hasil = [], pesan = '') => {
+  // Memori baru berubah setelah penyimpanan berhasil.
+  await saveStore(hasil);
+  riwayat = hasil;
+  console.log(pesan);
+};
+
+console.log('🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS');
+try {
+  let berjalan = true;
+  while (berjalan) {
+    console.log(`
+1. Daftar peserta
+2. Detail peserta dan riwayat tes
+3. Tambah peserta
+4. Ubah biodata peserta
+5. Catat tes ulang
+6. Hapus peserta
+7. Filter berdasarkan kelas
+8. Statistik dan validasi
+0. Keluar`);
+    try {
+      const pilihan = await baca('Pilihan: ');
+      switch (pilihan) {
+        case '0':
+          berjalan = false;
+          break;
+        case '1': {
+          console.log(`Jumlah peserta unik: ${getUniqueEmails(riwayat).length}`);
+          console.log(formatPesertaList(getUniquePeserta(riwayat)));
+          break;
+        }
+        default:
+          console.log('Pilihan tidak valid. Masukkan angka 0–8.');
+      }
+    } catch (error) {
+      if (error === akhirInput) {
+        console.log('\nInput berakhir. Operasi dibatalkan.');
+        break;
+      }
+      console.error(`❌ ${error.message}`);
+    }
+  }
+} finally {
+  pembaca.close();
+}
+console.log('Sampai jumpa.');
```

<!-- write: main.js -->
```javascript
import { createInterface } from 'node:readline';
import { loadStore, saveStore } from './utils/pesertaStore.js';
import { tambahPeserta, ubahPeserta, hapusPeserta, tambahNilai, getRiwayatTes } from './utils/pesertaCrud.js';
import { getUniqueEmails, getUniquePeserta, createPesertaMap, getPesertaByClass, calculateAverageScore } from './utils/pesertaProcessor.js';
import { displayPeserta, createPesertaSummary, formatPesertaList, createDetailedReport } from './utils/pesertaFormatter.js';
import { PesertaValidator, createPassingValidator, createLenientValidator } from './utils/pesertaValidator.js';

let riwayat;
try {
  riwayat = await loadStore();
} catch (error) {
  console.error(`❌ ${error.message}`);
  process.exit(1);
}

const pembaca = createInterface({ input: process.stdin, crlfDelay: Infinity });
// Satu iterator menjaga urutan jawaban, termasuk input yang dikirim sekaligus.
const jawaban = pembaca[Symbol.asyncIterator]();
const akhirInput = Symbol('akhir input');
const baca = async (pertanyaan = '') => {
  process.stdout.write(pertanyaan);
  const { value, done } = await jawaban.next();
  if (done) throw akhirInput;
  return value.trim();
};
const bacaEmail = async (pertanyaan = 'Email peserta: ') => (await baca(pertanyaan)).toLowerCase();
const bacaNilai = async () => {
  const input = await baca('Nilai (0–100): ');
  if (input === '') throw new Error('Nilai wajib diisi.');
  return Number(input);
};
const cariPeserta = (email = '') => {
  const peserta = createPesertaMap(riwayat).get(email);
  if (!peserta) throw new Error('Peserta tidak ditemukan.');
  return peserta;
};
const simpan = async (hasil = [], pesan = '') => {
  // Memori baru berubah setelah penyimpanan berhasil.
  await saveStore(hasil);
  riwayat = hasil;
  console.log(pesan);
};

console.log('🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS');
try {
  let berjalan = true;
  while (berjalan) {
    console.log(`
1. Daftar peserta
2. Detail peserta dan riwayat tes
3. Tambah peserta
4. Ubah biodata peserta
5. Catat tes ulang
6. Hapus peserta
7. Filter berdasarkan kelas
8. Statistik dan validasi
0. Keluar`);
    try {
      const pilihan = await baca('Pilihan: ');
      switch (pilihan) {
        case '0':
          berjalan = false;
          break;
        case '1': {
          console.log(`Jumlah peserta unik: ${getUniqueEmails(riwayat).length}`);
          console.log(formatPesertaList(getUniquePeserta(riwayat)));
          break;
        }
        default:
          console.log('Pilihan tidak valid. Masukkan angka 0–8.');
      }
    } catch (error) {
      if (error === akhirInput) {
        console.log('\nInput berakhir. Operasi dibatalkan.');
        break;
      }
      console.error(`❌ ${error.message}`);
    }
  }
} finally {
  pembaca.close();
}
console.log('Sampai jumpa.');
```

Jalankan dari root repository:

```bash
node latihan/proyek/main.js
```

Masukkan jawaban berikut berurutan, satu jawaban per baris. Baris kosong berarti tekan Enter. Pada input terprogram, prompt tercetak bersebelahan karena terminal tidak menggema jawaban.

<!-- input: main.js -->
```text
1
0
```

<!-- expected: main.js -->
```text
🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS

1. Daftar peserta
2. Detail peserta dan riwayat tes
3. Tambah peserta
4. Ubah biodata peserta
5. Catat tes ulang
6. Hapus peserta
7. Filter berdasarkan kelas
8. Statistik dan validasi
0. Keluar
Pilihan: Jumlah peserta unik: 4
1. Nama: Aditya Prayoga, Score: 88, Status: LULUS
2. Nama: Zaim Fauzan, Score: 94, Status: LULUS
3. Nama: Milea Kusuma, Score: 78, Status: TIDAK LULUS
4. Nama: Pratama Wijaya, Score: 95, Status: LULUS

1. Daftar peserta
2. Detail peserta dan riwayat tes
3. Tambah peserta
4. Ubah biodata peserta
5. Catat tes ulang
6. Hapus peserta
7. Filter berdasarkan kelas
8. Statistik dan validasi
0. Keluar
Pilihan: Sampai jumpa.
```

## Langkah 2: Hubungkan detail, filter, dan statistik

Detail memakai Map untuk peserta terakhir dan getRiwayatTes untuk seluruh tes. Filter dan statistik selalu menerima peserta unik. Dua factory validator memperagakan kelulusan 80–100 dan pemeriksaan rentang 60–100 yang terpisah. Coba filter JavaScript Fundamentals.

Perubahan pada `main.js`:

```diff
--- sebelum/main.js
+++ sesudah/main.js
@@ -66,6 +66,40 @@
           console.log(formatPesertaList(getUniquePeserta(riwayat)));
           break;
         }
+        case '2': {
+          const email = await bacaEmail();
+          const peserta = cariPeserta(email);
+          console.log(createDetailedReport(peserta));
+          console.log(createPesertaSummary(peserta));
+          console.log('Riwayat tes (urutan pencatatan):');
+          for (const { id, name, score } of getRiwayatTes(riwayat, email)) {
+            console.log(`Tes ID ${id}: ${displayPeserta(name, score)}`);
+          }
+          break;
+        }
+        case '7': {
+          const className = await baca('Kelas: ');
+          console.log(formatPesertaList(getPesertaByClass(getUniquePeserta(riwayat), className)));
+          break;
+        }
+        case '8': {
+          const pesertaUnik = getUniquePeserta(riwayat);
+          const standar = createPassingValidator();
+          const rentang = createLenientValidator();
+          const ringkasan = standar.validateBatch(pesertaUnik);
+          console.log(`Jumlah peserta: ${ringkasan.total}`);
+          console.log(`Rata-rata nilai terakhir: ${calculateAverageScore(pesertaUnik)}`);
+          console.log(`LULUS (nilai >=80): ${ringkasan.valid}; TIDAK LULUS: ${ringkasan.invalid}`);
+          console.log('Pemeriksaan rentang 60–100 terpisah dari kelulusan >=80.');
+          for (const { name, score } of pesertaUnik) {
+            const status = PesertaValidator.getStatus(score);
+            console.log(`${name}: ${status}; status valid: ${PesertaValidator.isValidStatus(status)}`);
+            console.log(standar.formatResult(name, score));
+            console.log(`Rentang 60–100: ${rentang.formatResult(name, score)}`);
+            console.log(`Nilai dalam rentang: ${rentang.isValidScore(score)}; ${rentang.getValidationDetails(score).message}`);
+          }
+          break;
+        }
         default:
           console.log('Pilihan tidak valid. Masukkan angka 0–8.');
       }
```

<!-- write: main.js -->
```javascript
import { createInterface } from 'node:readline';
import { loadStore, saveStore } from './utils/pesertaStore.js';
import { tambahPeserta, ubahPeserta, hapusPeserta, tambahNilai, getRiwayatTes } from './utils/pesertaCrud.js';
import { getUniqueEmails, getUniquePeserta, createPesertaMap, getPesertaByClass, calculateAverageScore } from './utils/pesertaProcessor.js';
import { displayPeserta, createPesertaSummary, formatPesertaList, createDetailedReport } from './utils/pesertaFormatter.js';
import { PesertaValidator, createPassingValidator, createLenientValidator } from './utils/pesertaValidator.js';

let riwayat;
try {
  riwayat = await loadStore();
} catch (error) {
  console.error(`❌ ${error.message}`);
  process.exit(1);
}

const pembaca = createInterface({ input: process.stdin, crlfDelay: Infinity });
// Satu iterator menjaga urutan jawaban, termasuk input yang dikirim sekaligus.
const jawaban = pembaca[Symbol.asyncIterator]();
const akhirInput = Symbol('akhir input');
const baca = async (pertanyaan = '') => {
  process.stdout.write(pertanyaan);
  const { value, done } = await jawaban.next();
  if (done) throw akhirInput;
  return value.trim();
};
const bacaEmail = async (pertanyaan = 'Email peserta: ') => (await baca(pertanyaan)).toLowerCase();
const bacaNilai = async () => {
  const input = await baca('Nilai (0–100): ');
  if (input === '') throw new Error('Nilai wajib diisi.');
  return Number(input);
};
const cariPeserta = (email = '') => {
  const peserta = createPesertaMap(riwayat).get(email);
  if (!peserta) throw new Error('Peserta tidak ditemukan.');
  return peserta;
};
const simpan = async (hasil = [], pesan = '') => {
  // Memori baru berubah setelah penyimpanan berhasil.
  await saveStore(hasil);
  riwayat = hasil;
  console.log(pesan);
};

console.log('🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS');
try {
  let berjalan = true;
  while (berjalan) {
    console.log(`
1. Daftar peserta
2. Detail peserta dan riwayat tes
3. Tambah peserta
4. Ubah biodata peserta
5. Catat tes ulang
6. Hapus peserta
7. Filter berdasarkan kelas
8. Statistik dan validasi
0. Keluar`);
    try {
      const pilihan = await baca('Pilihan: ');
      switch (pilihan) {
        case '0':
          berjalan = false;
          break;
        case '1': {
          console.log(`Jumlah peserta unik: ${getUniqueEmails(riwayat).length}`);
          console.log(formatPesertaList(getUniquePeserta(riwayat)));
          break;
        }
        case '2': {
          const email = await bacaEmail();
          const peserta = cariPeserta(email);
          console.log(createDetailedReport(peserta));
          console.log(createPesertaSummary(peserta));
          console.log('Riwayat tes (urutan pencatatan):');
          for (const { id, name, score } of getRiwayatTes(riwayat, email)) {
            console.log(`Tes ID ${id}: ${displayPeserta(name, score)}`);
          }
          break;
        }
        case '7': {
          const className = await baca('Kelas: ');
          console.log(formatPesertaList(getPesertaByClass(getUniquePeserta(riwayat), className)));
          break;
        }
        case '8': {
          const pesertaUnik = getUniquePeserta(riwayat);
          const standar = createPassingValidator();
          const rentang = createLenientValidator();
          const ringkasan = standar.validateBatch(pesertaUnik);
          console.log(`Jumlah peserta: ${ringkasan.total}`);
          console.log(`Rata-rata nilai terakhir: ${calculateAverageScore(pesertaUnik)}`);
          console.log(`LULUS (nilai >=80): ${ringkasan.valid}; TIDAK LULUS: ${ringkasan.invalid}`);
          console.log('Pemeriksaan rentang 60–100 terpisah dari kelulusan >=80.');
          for (const { name, score } of pesertaUnik) {
            const status = PesertaValidator.getStatus(score);
            console.log(`${name}: ${status}; status valid: ${PesertaValidator.isValidStatus(status)}`);
            console.log(standar.formatResult(name, score));
            console.log(`Rentang 60–100: ${rentang.formatResult(name, score)}`);
            console.log(`Nilai dalam rentang: ${rentang.isValidScore(score)}; ${rentang.getValidationDetails(score).message}`);
          }
          break;
        }
        default:
          console.log('Pilihan tidak valid. Masukkan angka 0–8.');
      }
    } catch (error) {
      if (error === akhirInput) {
        console.log('\nInput berakhir. Operasi dibatalkan.');
        break;
      }
      console.error(`❌ ${error.message}`);
    }
  }
} finally {
  pembaca.close();
}
console.log('Sampai jumpa.');
```

Jalankan dari root repository:

```bash
node latihan/proyek/main.js
```

Masukkan jawaban berikut berurutan, satu jawaban per baris. Baris kosong berarti tekan Enter. Pada input terprogram, prompt tercetak bersebelahan karena terminal tidak menggema jawaban.

<!-- input: main.js -->
```text
7
JavaScript Fundamentals
0
```

<!-- expected: main.js -->
```text
🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS

1. Daftar peserta
2. Detail peserta dan riwayat tes
3. Tambah peserta
4. Ubah biodata peserta
5. Catat tes ulang
6. Hapus peserta
7. Filter berdasarkan kelas
8. Statistik dan validasi
0. Keluar
Pilihan: Kelas: 1. Nama: Aditya Prayoga, Score: 88, Status: LULUS
2. Nama: Milea Kusuma, Score: 78, Status: TIDAK LULUS

1. Daftar peserta
2. Detail peserta dan riwayat tes
3. Tambah peserta
4. Ubah biodata peserta
5. Catat tes ulang
6. Hapus peserta
7. Filter berdasarkan kelas
8. Statistik dan validasi
0. Keluar
Pilihan: Sampai jumpa.
```

## Langkah 3: Tambahkan peserta dan tes ulang

bacaNilai menolak string kosong sebelum Number dipanggil. Validasi angka selanjutnya dilakukan fungsi CRUD. simpan menunggu file berhasil ditulis sebelum mengganti riwayat dalam memori dan menampilkan sukses. Lengkapi seluruh formulir sebelum fungsi simpan dipanggil.

Perubahan pada `main.js`:

```diff
--- sebelum/main.js
+++ sesudah/main.js
@@ -77,6 +77,21 @@
           }
           break;
         }
+        case '3': {
+          const name = await baca('Nama: ');
+          const email = await bacaEmail('Email: ');
+          const className = await baca('Kelas: ');
+          const score = await bacaNilai();
+          await simpan(tambahPeserta(riwayat, { name, email, class: className, score }), 'Peserta berhasil ditambahkan.');
+          break;
+        }
+        case '5': {
+          const email = await bacaEmail();
+          cariPeserta(email);
+          const score = await bacaNilai();
+          await simpan(tambahNilai(riwayat, email, score), 'Tes ulang berhasil dicatat.');
+          break;
+        }
         case '7': {
           const className = await baca('Kelas: ');
           console.log(formatPesertaList(getPesertaByClass(getUniquePeserta(riwayat), className)));
```

<!-- write: main.js -->
```javascript
import { createInterface } from 'node:readline';
import { loadStore, saveStore } from './utils/pesertaStore.js';
import { tambahPeserta, ubahPeserta, hapusPeserta, tambahNilai, getRiwayatTes } from './utils/pesertaCrud.js';
import { getUniqueEmails, getUniquePeserta, createPesertaMap, getPesertaByClass, calculateAverageScore } from './utils/pesertaProcessor.js';
import { displayPeserta, createPesertaSummary, formatPesertaList, createDetailedReport } from './utils/pesertaFormatter.js';
import { PesertaValidator, createPassingValidator, createLenientValidator } from './utils/pesertaValidator.js';

let riwayat;
try {
  riwayat = await loadStore();
} catch (error) {
  console.error(`❌ ${error.message}`);
  process.exit(1);
}

const pembaca = createInterface({ input: process.stdin, crlfDelay: Infinity });
// Satu iterator menjaga urutan jawaban, termasuk input yang dikirim sekaligus.
const jawaban = pembaca[Symbol.asyncIterator]();
const akhirInput = Symbol('akhir input');
const baca = async (pertanyaan = '') => {
  process.stdout.write(pertanyaan);
  const { value, done } = await jawaban.next();
  if (done) throw akhirInput;
  return value.trim();
};
const bacaEmail = async (pertanyaan = 'Email peserta: ') => (await baca(pertanyaan)).toLowerCase();
const bacaNilai = async () => {
  const input = await baca('Nilai (0–100): ');
  if (input === '') throw new Error('Nilai wajib diisi.');
  return Number(input);
};
const cariPeserta = (email = '') => {
  const peserta = createPesertaMap(riwayat).get(email);
  if (!peserta) throw new Error('Peserta tidak ditemukan.');
  return peserta;
};
const simpan = async (hasil = [], pesan = '') => {
  // Memori baru berubah setelah penyimpanan berhasil.
  await saveStore(hasil);
  riwayat = hasil;
  console.log(pesan);
};

console.log('🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS');
try {
  let berjalan = true;
  while (berjalan) {
    console.log(`
1. Daftar peserta
2. Detail peserta dan riwayat tes
3. Tambah peserta
4. Ubah biodata peserta
5. Catat tes ulang
6. Hapus peserta
7. Filter berdasarkan kelas
8. Statistik dan validasi
0. Keluar`);
    try {
      const pilihan = await baca('Pilihan: ');
      switch (pilihan) {
        case '0':
          berjalan = false;
          break;
        case '1': {
          console.log(`Jumlah peserta unik: ${getUniqueEmails(riwayat).length}`);
          console.log(formatPesertaList(getUniquePeserta(riwayat)));
          break;
        }
        case '2': {
          const email = await bacaEmail();
          const peserta = cariPeserta(email);
          console.log(createDetailedReport(peserta));
          console.log(createPesertaSummary(peserta));
          console.log('Riwayat tes (urutan pencatatan):');
          for (const { id, name, score } of getRiwayatTes(riwayat, email)) {
            console.log(`Tes ID ${id}: ${displayPeserta(name, score)}`);
          }
          break;
        }
        case '3': {
          const name = await baca('Nama: ');
          const email = await bacaEmail('Email: ');
          const className = await baca('Kelas: ');
          const score = await bacaNilai();
          await simpan(tambahPeserta(riwayat, { name, email, class: className, score }), 'Peserta berhasil ditambahkan.');
          break;
        }
        case '5': {
          const email = await bacaEmail();
          cariPeserta(email);
          const score = await bacaNilai();
          await simpan(tambahNilai(riwayat, email, score), 'Tes ulang berhasil dicatat.');
          break;
        }
        case '7': {
          const className = await baca('Kelas: ');
          console.log(formatPesertaList(getPesertaByClass(getUniquePeserta(riwayat), className)));
          break;
        }
        case '8': {
          const pesertaUnik = getUniquePeserta(riwayat);
          const standar = createPassingValidator();
          const rentang = createLenientValidator();
          const ringkasan = standar.validateBatch(pesertaUnik);
          console.log(`Jumlah peserta: ${ringkasan.total}`);
          console.log(`Rata-rata nilai terakhir: ${calculateAverageScore(pesertaUnik)}`);
          console.log(`LULUS (nilai >=80): ${ringkasan.valid}; TIDAK LULUS: ${ringkasan.invalid}`);
          console.log('Pemeriksaan rentang 60–100 terpisah dari kelulusan >=80.');
          for (const { name, score } of pesertaUnik) {
            const status = PesertaValidator.getStatus(score);
            console.log(`${name}: ${status}; status valid: ${PesertaValidator.isValidStatus(status)}`);
            console.log(standar.formatResult(name, score));
            console.log(`Rentang 60–100: ${rentang.formatResult(name, score)}`);
            console.log(`Nilai dalam rentang: ${rentang.isValidScore(score)}; ${rentang.getValidationDetails(score).message}`);
          }
          break;
        }
        default:
          console.log('Pilihan tidak valid. Masukkan angka 0–8.');
      }
    } catch (error) {
      if (error === akhirInput) {
        console.log('\nInput berakhir. Operasi dibatalkan.');
        break;
      }
      console.error(`❌ ${error.message}`);
    }
  }
} finally {
  pembaca.close();
}
console.log('Sampai jumpa.');
```

Jalankan dari root repository:

```bash
node latihan/proyek/main.js
```

Masukkan jawaban berikut berurutan, satu jawaban per baris. Baris kosong berarti tekan Enter. Pada input terprogram, prompt tercetak bersebelahan karena terminal tidak menggema jawaban.

<!-- input: main.js -->
```text
3
Rina
rina@example.com
Node.js
90
5
rina@example.com
79
0
```

<!-- expected: main.js -->
```text
🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS

1. Daftar peserta
2. Detail peserta dan riwayat tes
3. Tambah peserta
4. Ubah biodata peserta
5. Catat tes ulang
6. Hapus peserta
7. Filter berdasarkan kelas
8. Statistik dan validasi
0. Keluar
Pilihan: Nama: Email: Kelas: Nilai (0–100): Peserta berhasil ditambahkan.

1. Daftar peserta
2. Detail peserta dan riwayat tes
3. Tambah peserta
4. Ubah biodata peserta
5. Catat tes ulang
6. Hapus peserta
7. Filter berdasarkan kelas
8. Statistik dan validasi
0. Keluar
Pilihan: Email peserta: Nilai (0–100): Tes ulang berhasil dicatat.

1. Daftar peserta
2. Detail peserta dan riwayat tes
3. Tambah peserta
4. Ubah biodata peserta
5. Catat tes ulang
6. Hapus peserta
7. Filter berdasarkan kelas
8. Statistik dan validasi
0. Keluar
Pilihan: Sampai jumpa.
```

## Langkah 4: Ubah biodata dan konfirmasi penghapusan

Input kosong pada biodata memakai nilai sebelumnya. Penghapusan memerlukan jawaban ya. EOF membatalkan formulir; tidak ada data parsial yang disimpan. Kesalahan operasi dicetak lalu menu dibuka kembali. Pada checkpoint ini, batalkan penghapusan Rina dari langkah sebelumnya, periksa riwayatnya, lalu keluar.

Perubahan pada `main.js`:

```diff
--- sebelum/main.js
+++ sesudah/main.js
@@ -85,11 +85,37 @@
           await simpan(tambahPeserta(riwayat, { name, email, class: className, score }), 'Peserta berhasil ditambahkan.');
           break;
         }
+        case '4': {
+          const email = await bacaEmail();
+          const peserta = cariPeserta(email);
+          console.log('Kosongkan isian untuk mempertahankan biodata.');
+          const name = await baca(`Nama [${peserta.name}]: `);
+          const emailBaru = await bacaEmail(`Email [${peserta.email}]: `);
+          const className = await baca(`Kelas [${peserta.class}]: `);
+          const perubahan = {
+            name: name === '' ? peserta.name : name,
+            email: emailBaru === '' ? peserta.email : emailBaru,
+            class: className === '' ? peserta.class : className
+          };
+          await simpan(ubahPeserta(riwayat, email, perubahan), 'Biodata peserta berhasil diperbarui.');
+          break;
+        }
         case '5': {
           const email = await bacaEmail();
           cariPeserta(email);
           const score = await bacaNilai();
           await simpan(tambahNilai(riwayat, email, score), 'Tes ulang berhasil dicatat.');
+          break;
+        }
+        case '6': {
+          const email = await bacaEmail();
+          const peserta = cariPeserta(email);
+          const konfirmasi = await baca(`Hapus ${peserta.name} dan seluruh riwayat? Ketik ya: `);
+          if (konfirmasi.toLowerCase() !== 'ya') {
+            console.log('Penghapusan dibatalkan.');
+            break;
+          }
+          await simpan(hapusPeserta(riwayat, email), 'Peserta dan seluruh riwayat berhasil dihapus.');
           break;
         }
         case '7': {
```

<!-- write: main.js -->
```javascript
import { createInterface } from 'node:readline';
import { loadStore, saveStore } from './utils/pesertaStore.js';
import { tambahPeserta, ubahPeserta, hapusPeserta, tambahNilai, getRiwayatTes } from './utils/pesertaCrud.js';
import { getUniqueEmails, getUniquePeserta, createPesertaMap, getPesertaByClass, calculateAverageScore } from './utils/pesertaProcessor.js';
import { displayPeserta, createPesertaSummary, formatPesertaList, createDetailedReport } from './utils/pesertaFormatter.js';
import { PesertaValidator, createPassingValidator, createLenientValidator } from './utils/pesertaValidator.js';

let riwayat;
try {
  riwayat = await loadStore();
} catch (error) {
  console.error(`❌ ${error.message}`);
  process.exit(1);
}

const pembaca = createInterface({ input: process.stdin, crlfDelay: Infinity });
// Satu iterator menjaga urutan jawaban, termasuk input yang dikirim sekaligus.
const jawaban = pembaca[Symbol.asyncIterator]();
const akhirInput = Symbol('akhir input');
const baca = async (pertanyaan = '') => {
  process.stdout.write(pertanyaan);
  const { value, done } = await jawaban.next();
  if (done) throw akhirInput;
  return value.trim();
};
const bacaEmail = async (pertanyaan = 'Email peserta: ') => (await baca(pertanyaan)).toLowerCase();
const bacaNilai = async () => {
  const input = await baca('Nilai (0–100): ');
  if (input === '') throw new Error('Nilai wajib diisi.');
  return Number(input);
};
const cariPeserta = (email = '') => {
  const peserta = createPesertaMap(riwayat).get(email);
  if (!peserta) throw new Error('Peserta tidak ditemukan.');
  return peserta;
};
const simpan = async (hasil = [], pesan = '') => {
  // Memori baru berubah setelah penyimpanan berhasil.
  await saveStore(hasil);
  riwayat = hasil;
  console.log(pesan);
};

console.log('🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS');
try {
  let berjalan = true;
  while (berjalan) {
    console.log(`
1. Daftar peserta
2. Detail peserta dan riwayat tes
3. Tambah peserta
4. Ubah biodata peserta
5. Catat tes ulang
6. Hapus peserta
7. Filter berdasarkan kelas
8. Statistik dan validasi
0. Keluar`);
    try {
      const pilihan = await baca('Pilihan: ');
      switch (pilihan) {
        case '0':
          berjalan = false;
          break;
        case '1': {
          console.log(`Jumlah peserta unik: ${getUniqueEmails(riwayat).length}`);
          console.log(formatPesertaList(getUniquePeserta(riwayat)));
          break;
        }
        case '2': {
          const email = await bacaEmail();
          const peserta = cariPeserta(email);
          console.log(createDetailedReport(peserta));
          console.log(createPesertaSummary(peserta));
          console.log('Riwayat tes (urutan pencatatan):');
          for (const { id, name, score } of getRiwayatTes(riwayat, email)) {
            console.log(`Tes ID ${id}: ${displayPeserta(name, score)}`);
          }
          break;
        }
        case '3': {
          const name = await baca('Nama: ');
          const email = await bacaEmail('Email: ');
          const className = await baca('Kelas: ');
          const score = await bacaNilai();
          await simpan(tambahPeserta(riwayat, { name, email, class: className, score }), 'Peserta berhasil ditambahkan.');
          break;
        }
        case '4': {
          const email = await bacaEmail();
          const peserta = cariPeserta(email);
          console.log('Kosongkan isian untuk mempertahankan biodata.');
          const name = await baca(`Nama [${peserta.name}]: `);
          const emailBaru = await bacaEmail(`Email [${peserta.email}]: `);
          const className = await baca(`Kelas [${peserta.class}]: `);
          const perubahan = {
            name: name === '' ? peserta.name : name,
            email: emailBaru === '' ? peserta.email : emailBaru,
            class: className === '' ? peserta.class : className
          };
          await simpan(ubahPeserta(riwayat, email, perubahan), 'Biodata peserta berhasil diperbarui.');
          break;
        }
        case '5': {
          const email = await bacaEmail();
          cariPeserta(email);
          const score = await bacaNilai();
          await simpan(tambahNilai(riwayat, email, score), 'Tes ulang berhasil dicatat.');
          break;
        }
        case '6': {
          const email = await bacaEmail();
          const peserta = cariPeserta(email);
          const konfirmasi = await baca(`Hapus ${peserta.name} dan seluruh riwayat? Ketik ya: `);
          if (konfirmasi.toLowerCase() !== 'ya') {
            console.log('Penghapusan dibatalkan.');
            break;
          }
          await simpan(hapusPeserta(riwayat, email), 'Peserta dan seluruh riwayat berhasil dihapus.');
          break;
        }
        case '7': {
          const className = await baca('Kelas: ');
          console.log(formatPesertaList(getPesertaByClass(getUniquePeserta(riwayat), className)));
          break;
        }
        case '8': {
          const pesertaUnik = getUniquePeserta(riwayat);
          const standar = createPassingValidator();
          const rentang = createLenientValidator();
          const ringkasan = standar.validateBatch(pesertaUnik);
          console.log(`Jumlah peserta: ${ringkasan.total}`);
          console.log(`Rata-rata nilai terakhir: ${calculateAverageScore(pesertaUnik)}`);
          console.log(`LULUS (nilai >=80): ${ringkasan.valid}; TIDAK LULUS: ${ringkasan.invalid}`);
          console.log('Pemeriksaan rentang 60–100 terpisah dari kelulusan >=80.');
          for (const { name, score } of pesertaUnik) {
            const status = PesertaValidator.getStatus(score);
            console.log(`${name}: ${status}; status valid: ${PesertaValidator.isValidStatus(status)}`);
            console.log(standar.formatResult(name, score));
            console.log(`Rentang 60–100: ${rentang.formatResult(name, score)}`);
            console.log(`Nilai dalam rentang: ${rentang.isValidScore(score)}; ${rentang.getValidationDetails(score).message}`);
          }
          break;
        }
        default:
          console.log('Pilihan tidak valid. Masukkan angka 0–8.');
      }
    } catch (error) {
      if (error === akhirInput) {
        console.log('\nInput berakhir. Operasi dibatalkan.');
        break;
      }
      console.error(`❌ ${error.message}`);
    }
  }
} finally {
  pembaca.close();
}
console.log('Sampai jumpa.');
```

Jalankan dari root repository:

```bash
node latihan/proyek/main.js
```

Masukkan jawaban berikut berurutan, satu jawaban per baris. Baris kosong berarti tekan Enter. Pada input terprogram, prompt tercetak bersebelahan karena terminal tidak menggema jawaban.

<!-- input: main.js -->
```text
6
rina@example.com
tidak
2
rina@example.com
0
```

<!-- expected: main.js -->
```text
🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS

1. Daftar peserta
2. Detail peserta dan riwayat tes
3. Tambah peserta
4. Ubah biodata peserta
5. Catat tes ulang
6. Hapus peserta
7. Filter berdasarkan kelas
8. Statistik dan validasi
0. Keluar
Pilihan: Email peserta: Hapus Rina dan seluruh riwayat? Ketik ya: Penghapusan dibatalkan.

1. Daftar peserta
2. Detail peserta dan riwayat tes
3. Tambah peserta
4. Ubah biodata peserta
5. Catat tes ulang
6. Hapus peserta
7. Filter berdasarkan kelas
8. Statistik dan validasi
0. Keluar
Pilihan: Email peserta:
╔═══════════════════════════════════════╗
  ID       : 108
  Nama     : Rina
  Email    : rina@example.com
  Kelas    : Node.js
  Score    : 79
  Status   : ❌ TIDAK LULUS
╚═══════════════════════════════════════╝
📚 Rina - Class: Node.js - Score: 79
Riwayat tes (urutan pencatatan):
Tes ID 107: Nama: Rina, Score: 90, Status: LULUS
Tes ID 108: Nama: Rina, Score: 79, Status: TIDAK LULUS

1. Daftar peserta
2. Detail peserta dan riwayat tes
3. Tambah peserta
4. Ubah biodata peserta
5. Catat tes ulang
6. Hapus peserta
7. Filter berdasarkan kelas
8. Statistik dan validasi
0. Keluar
Pilihan: Sampai jumpa.
```

Jalankan kembali aplikasi dan pilih 2 dengan email rina@example.com. Dua tes Rina tetap ada dengan nilai terakhir 79, sehingga statusnya TIDAK LULUS. Pilih 5 dan masukkan 80 untuk meluluskan tes berikutnya. Pilih 4 untuk mengganti biodata seluruh tes, lalu 6 dan ya untuk menghapus seluruh riwayat. Data contoh tidak berubah. Output checkpoint di atas mengasumsikan file kerja baru dari tahap 11; menjalankan transaksi tambah dua kali akan menolak email ganda.

## Tantangan: Tangani pilihan menu tidak valid

Jalankan aplikasi dengan pilihan 9, kemudian 0. Pastikan menu kembali tampil dan aplikasi ditutup. Solusi memanggil main.js yang sama tanpa menyalin implementasi menu.

<details>
<summary>Lihat penyelesaian tantangan</summary>

Buat file `tantangan-12.js` dengan isi lengkap berikut.

<!-- challenge: tantangan-12.js -->
```javascript
// Import menunggu aplikasi menyelesaikan loop menu yang sama.
await import('./main.js');
```

Jalankan dari root repository:

```bash
node latihan/proyek/tantangan-12.js
```

Masukkan jawaban berikut berurutan, satu jawaban per baris. Baris kosong berarti tekan Enter. Pada input terprogram, prompt tercetak bersebelahan karena terminal tidak menggema jawaban.

<!-- input: tantangan-12.js -->
```text
9
0
```

<!-- challenge-output: tantangan-12.js -->
```text
🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS

1. Daftar peserta
2. Detail peserta dan riwayat tes
3. Tambah peserta
4. Ubah biodata peserta
5. Catat tes ulang
6. Hapus peserta
7. Filter berdasarkan kelas
8. Statistik dan validasi
0. Keluar
Pilihan: Pilihan tidak valid. Masukkan angka 0–8.

1. Daftar peserta
2. Detail peserta dan riwayat tes
3. Tambah peserta
4. Ubah biodata peserta
5. Catat tes ulang
6. Hapus peserta
7. Filter berdasarkan kelas
8. Statistik dan validasi
0. Keluar
Pilihan: Sampai jumpa.
```

</details>

## Checkpoint

- [ ] Semua pilihan 0–8 berjalan dari module proyek sendiri.
- [ ] Data tetap tersedia setelah aplikasi dibuka kembali.
- [ ] Input kosong mempertahankan biodata dan konfirmasi selain ya membatalkan hapus.
- [ ] EOF formulir tidak menyimpan data parsial.
- [ ] Pesan sukses tampil setelah await saveStore selesai.

[Tahap sebelumnya](../11-penyimpanan-json/README.md) · [Daftar latihan](../README.md) · [Tahap berikutnya](../13-pengujian-akhir/README.md)
