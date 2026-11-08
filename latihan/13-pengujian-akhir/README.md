# 13. Uji proyek lengkap

Buktikan fungsi, file kerja, dan menu berjalan bersama. Prasyarat: menu tahap 12 lengkap. Pengujian memakai utils dan main di proyek peserta, sehingga hasil root tidak menggantikan bukti proyekmu.

Semua nama file berada di `latihan/proyek/`. Jalankan perintah dari root repository. Pertahankan file tahap sebelumnya. Pada diff, `-` adalah kode lama dan `+` adalah kode baru. Ketik perubahan, lalu cocokkan dengan kode lengkap setelah diff. Jalankan setiap checkpoint sebelum melanjutkan.

## Langkah 1: Salin suite beserta fixture

Salin folder test dari root ke proyek peserta. Jangan salin aplikasi root ke proyekmu.

<!-- copy: test => test -->
```bash
node --input-type=module -e "import { cp } from 'node:fs/promises'; await cp('test', 'latihan/proyek/test', { recursive: true });"
```

Suite test-all menjaga 79 perilaku lama. test-crud memeriksa transformasi array, test-store memeriksa file sementara dan restart, sedangkan test-menu menjalankan proses Node nyata dengan input terprogram.

## Langkah 2: Jalankan semua suite dari proyekmu

Perubahan pada `package.json`:

```diff
--- sebelum/package.json
+++ sesudah/package.json
@@ -7,6 +7,7 @@
     "node": ">=22"
   },
   "scripts": {
-    "start": "node main.js"
+    "start": "node main.js",
+    "test": "node test/test-all.js && node test/test-crud.js && node test/test-store.js && node test/test-menu.js"
   }
 }
```

<!-- write: package.json -->
```json
{
  "name": "praktik-manajemen-peserta",
  "version": "1.0.0",
  "private": true,
  "type": "module",
  "engines": {
    "node": ">=22"
  },
  "scripts": {
    "start": "node main.js",
    "test": "node test/test-all.js && node test/test-crud.js && node test/test-store.js && node test/test-menu.js"
  }
}
```

Jalankan `npm --prefix latihan/proyek test`. Jangan menambahkan latihan/cek.js pada script peserta karena pemeriksa tujuh solusi lama dimiliki repository root. Waktu eksekusi dan nomor proses pada TAP berubah setiap kali dijalankan; periksa jumlah lulus dan nol gagal. Keluaran suite lama tetap persis berikut saat menjalankan `node latihan/proyek/test/test-all.js`.

<!-- expected: test/test-all.js -->
```text
============================================================
🧪 RUNNING UNIT TESTS FOR ES6 TRAINING SYSTEM
============================================================

📦 TEST SUITE 1: Data Validation
------------------------------------------------------------
✅ PASS: rawPeserta is an array
✅ PASS: rawPeserta has 6 entries
✅ PASS: Participant has 'id' property
✅ PASS: Participant has 'name' property
✅ PASS: Participant has 'email' property
✅ PASS: Participant has 'class' property
✅ PASS: Participant has 'score' property

📦 TEST SUITE 2: getUniqueEmails Function
------------------------------------------------------------
✅ PASS: Returns 4 unique emails
✅ PASS: Contains aditya email
✅ PASS: Contains zaim email
✅ PASS: Contains milea email
✅ PASS: Contains pratama email
✅ PASS: Returns empty array for empty input
✅ PASS: Handles undefined parameter with default

📦 TEST SUITE 3: createPesertaMap Function
------------------------------------------------------------
✅ PASS: Map has 4 unique entries
✅ PASS: Aditya entry uses latest ID (103)
✅ PASS: Aditya entry uses latest score (88)
✅ PASS: Zaim entry uses latest ID (106)
✅ PASS: Zaim entry uses latest score (94)
✅ PASS: Returns empty Map for empty input

📦 TEST SUITE 4: getPesertaByClass Function
------------------------------------------------------------
✅ PASS: JavaScript Fundamentals has 3 participants
✅ PASS: React Basics has 3 participants
✅ PASS: Returns empty array for non-existent class
✅ PASS: Handles empty array input

📦 TEST SUITE 5: calculateAverageScore Function
------------------------------------------------------------
✅ PASS: Calculates correct average
✅ PASS: JavaScript Fundamentals has positive average
✅ PASS: Returns 0 for empty array
✅ PASS: Handles single entry correctly

📦 TEST SUITE 6: getUniquePeserta Function
------------------------------------------------------------
✅ PASS: Returns 4 unique participants
✅ PASS: All emails are unique
✅ PASS: Keeps latest Aditya score (88)

📦 TEST SUITE 7: displayPeserta Function
------------------------------------------------------------
✅ PASS: Formats passing score correctly
✅ PASS: Formats failing score correctly
✅ PASS: Uses default parameters correctly
✅ PASS: Valid status override is kept
✅ PASS: Invalid status falls back to computed
✅ PASS: Lowercase status is invalid

📦 TEST SUITE 8: createPesertaSummary Function
------------------------------------------------------------
✅ PASS: Formats summary correctly
✅ PASS: Handles empty object with defaults
✅ PASS: Handles null with ??
✅ PASS: Score 0 is kept

📦 TEST SUITE 9: PesertaValidator Class
------------------------------------------------------------
✅ PASS: Constructor sets minScore correctly
✅ PASS: Constructor sets maxScore correctly
✅ PASS: Recognizes valid score (85)
✅ PASS: Recognizes boundary valid score (80)
✅ PASS: Recognizes boundary valid score (100)
✅ PASS: Recognizes invalid score (79)
✅ PASS: Recognizes invalid score (101)
✅ PASS: Formats valid result correctly
✅ PASS: Formats invalid result correctly
✅ PASS: Batch validation counts total correctly
✅ PASS: Batch validation has non-negative valid count
✅ PASS: Batch validation has non-negative invalid count
✅ PASS: Batch validation valid + invalid = total
✅ PASS: Default minScore is 60
✅ PASS: Default maxScore is 100
✅ PASS: Passing score is 80
✅ PASS: Status list
✅ PASS: 80 is LULUS (boundary)
✅ PASS: 79 is TIDAK LULUS (boundary)
✅ PASS: Default score 0 is TIDAK LULUS
✅ PASS: includes() accepts LULUS
✅ PASS: includes() accepts TIDAK LULUS
✅ PASS: includes() is case-sensitive
✅ PASS: Old label is no longer valid
✅ PASS: undefined is not a status

📦 TEST SUITE 10: createDetailedReport Function
------------------------------------------------------------
✅ PASS: Detailed report uses TIDAK LULUS
✅ PASS: Detailed report handles null

📦 TEST SUITE 11: loadPeserta Function
------------------------------------------------------------
✅ PASS: async loadPeserta reads 6 records
✅ PASS: Records keep their order and scores
✅ PASS: Missing file rejects with Indonesian message
✅ PASS: Error names the file
✅ PASS: Malformed JSON caught by try/catch
✅ PASS: JSON null gives [] via ?. and ??
✅ PASS: Missing peserta key gives []
✅ PASS: Missing score becomes 0 via ??
✅ PASS: Rest/spread keeps extra fields
✅ PASS: Average is 0, not NaN
✅ PASS: createPesertaMap spread keeps extra fields

============================================================
📊 TEST SUMMARY
============================================================
✅ Tests Passed: 79
❌ Tests Failed: 0
📈 Pass Rate: 100%
============================================================
🎉 ALL TESTS PASSED! System is working correctly.
```

## Langkah 3: Periksa batas dan aturan nilai terakhir

Jika gagal, baca nama test, Expected, dan Actual. Cocokkan fungsi terkait dengan kode lengkap tahap pembuatannya. Jangan mengubah data contoh atau expected untuk menyamarkan kegagalan.

Jalankan menu dengan `npm --prefix latihan/proyek start`, pilih 1 lalu 0. Daftar menampilkan isi file kerja, sehingga perubahan pada tahap 12 tetap ada. Suite menggunakan file kerja sementara sendiri melalui PESERTA_DATA_FILE.

## Tantangan: Buktikan riwayat dan sumber tetap utuh

Buat pengujian kecil untuk nilai terakhir yang turun, batas 79/80, dan biodata yang berubah tanpa mengubah ID atau nilai.

<details>
<summary>Lihat penyelesaian tantangan</summary>

Buat file `tantangan-13.js` dengan isi lengkap berikut.

<!-- challenge: tantangan-13.js -->
```javascript
import assert from 'node:assert/strict';
import { tambahPeserta, tambahNilai, ubahPeserta, hapusPeserta } from './utils/pesertaCrud.js';
import { createPesertaMap } from './utils/pesertaProcessor.js';
import { PesertaValidator, createLenientValidator } from './utils/pesertaValidator.js';
const awal = tambahPeserta([], { name: 'Rina', email: 'rina@example.com', class: 'Node.js', score: 90 });
const turun = tambahNilai(awal, 'rina@example.com', 79);
assert.equal(PesertaValidator.getStatus(createPesertaMap(turun).get('rina@example.com').score), 'TIDAK LULUS');
const naik = tambahNilai(turun, 'rina@example.com', 80);
assert.equal(PesertaValidator.getStatus(naik.at(-1).score), 'LULUS');
const berubah = ubahPeserta(naik, 'rina@example.com', { name: 'Rina Putri' });
assert.deepEqual(berubah.map(({ id, score }) => [id, score]), naik.map(({ id, score }) => [id, score]));
assert.equal(berubah.every(({ name }) => name === 'Rina Putri'), true);
assert.equal(awal[0].name, 'Rina');
assert.equal(hapusPeserta(berubah, 'rina@example.com').length, 0);
assert.equal(createLenientValidator().isValidScore(70), true);
assert.equal(PesertaValidator.getStatus(70), 'TIDAK LULUS');
console.log('Tantangan 13: riwayat, biodata, dan aturan kelulusan benar');
```

Jalankan dari root repository:

```bash
node latihan/proyek/tantangan-13.js
```

<!-- challenge-output: tantangan-13.js -->
```text
Tantangan 13: riwayat, biodata, dan aturan kelulusan benar
```

</details>

## Checkpoint akhir

- [ ] Pengujian 79 perilaku lama, CRUD, file, dan menu lulus.
- [ ] Tes 90 → 79 → 80 tetap ada setelah restart.
- [ ] Hapus menghilangkan seluruh riwayat; pembatalan dan EOF tidak mengubah data.
- [ ] JSON rusak tetap utuh; gagal menyimpan tidak menghasilkan pesan sukses.
- [ ] Semua import aplikasi mengarah ke module proyek sendiri.

Kode lengkap main berada di tahap 12, CRUD di tahap 10, store di tahap 11, processor/formatter/validator di tahap 08, dan loader serta data contoh di tahap 09. Nama file validator.js dan module.js dari latihan awal tetap dipertahankan sebagai bagian perjalanan praktik.

[Tahap sebelumnya](../12-menu-terminal/README.md) · [Daftar latihan](../README.md) · [Panduan instruktur](../../instructor.md)
