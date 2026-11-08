# 11. Uji proyek yang sudah selesai

Di akhir tahap ini kamu membuktikan bahwa module buatanmu memenuhi aturan proyek. Prasyarat: aplikasi lengkap tahap 10 berjalan. Pengujian ini mengimpor `utils/` di dalam proyek peserta, bukan utils aplikasi referensi.

## Cara mengikuti tahap ini

Semua path file pada petunjuk berada di dalam `latihan/proyek/`. Jalankan perintah terminal dari root repository. Ganti seluruh isi file yang disebut; pertahankan file lain dari tahap sebelumnya.

## Langkah 1: Pasang bahan pengujian

Suite dan fixture sudah disediakan di folder `test` pada root repository. Salin seluruh folder tersebut ke `latihan/proyek/test`. Kamu boleh memakai file explorer atau menjalankan perintah berikut dari root:

<!-- copy: test => test -->
```bash
node --input-type=module -e "import { cp } from 'node:fs/promises'; await cp('test', 'latihan/proyek/test', { recursive: true });"
```

Bahan uji meliputi `test-all.js` dan folder fixtures yang berisi JSON rusak, kosong, null, serta data tanpa nilai. Jangan mengubah expected pada suite untuk menyamarkan kesalahan implementasi.

## Langkah 2: Tambahkan perintah test

Ganti seluruh isi `package.json` proyek peserta:

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
    "test": "node test/test-all.js"
  }
}
```
Jalankan dari root:

```bash
npm --prefix latihan/proyek test
```

npm menambahkan header package. Isi keluaran test runner sama dengan menjalankan perintah ini:

```bash
node latihan/proyek/test/test-all.js
```

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
Suite memeriksa 79 perilaku. Impor `../utils/` dari proyek peserta/test/test-all.js mengarah ke proyek peserta/utils, sehingga salinan aplikasi root tidak dapat membuat implementasi peserta yang salah terlihat lulus.

## Langkah 3: Telusuri kegagalan dan periksa aplikasi

Jika test gagal, baca nama test, Expected, dan Actual. Cari fungsi terkait di module proyekmu, cocokkan dengan kode lengkap tahap pembuatannya, lalu jalankan test lagi. Jangan mengganti data dasar atau expected agar hasil tampak cocok.

Jalankan aplikasi setelah test:

```bash
npm --prefix latihan/proyek start
```

Output aplikasi tetap sama dengan tahap 10. Root repository juga memiliki pemeriksaan terpisah:

```bash
npm test
```

Perintah terakhir memeriksa aplikasi referensi dan tujuh solusi tambahan. Kelulusannya tidak membuktikan bahwa proyek peserta sudah selesai. Gunakan perintah dengan `--prefix latihan/proyek` untuk menilai hasil praktikmu.

## Kesalahan umum

- Test script belum tersedia jika package.json belum diganti sesuai langkah 2.
- Fixture tidak ditemukan berarti folder test tidak disalin lengkap.
- Error import utils berarti module peserta belum dibuat atau named export berbeda.
- Nilai terakhir berbeda berarti peserta memakai nilai terbesar atau mempertahankan entri pertama.

## Tantangan: Buktikan aturan yang sering tertukar

Buat pengujian tambahan untuk tes ulang yang turun dari 90 menjadi 79, batas kelulusan 79/80, daftar kosong, nilai 0, dan perbedaan validasi rentang dengan kelulusan.

<details>
<summary>Lihat penyelesaian tantangan</summary>

Buat `tantangan-11.js` dengan kode berikut. `assert.equal` akan melempar error jika hasil tidak sesuai.

<!-- challenge: tantangan-11.js -->
```javascript
import assert from 'node:assert/strict';
import { createPesertaMap, calculateAverageScore } from './utils/pesertaProcessor.js';
import { PesertaValidator } from './utils/pesertaValidator.js';
import { createPesertaSummary, formatPesertaList } from './utils/pesertaFormatter.js';

const tes = [
  { email: 'rina@example.com', score: 90 },
  { email: 'rina@example.com', score: 79 }
];
assert.equal(createPesertaMap(tes).get('rina@example.com').score, 79);
assert.equal(PesertaValidator.getStatus(79), 'TIDAK LULUS');
assert.equal(PesertaValidator.getStatus(80), 'LULUS');
assert.equal(PesertaValidator.isValidStatus('lulus'), false);
assert.equal(calculateAverageScore([]), 0);
assert.equal(formatPesertaList([]), 'Tidak ada peserta.');
assert.equal(createPesertaSummary({ name: 'Rina', score: 0 }).includes('Score: 0'), true);
const validator = new PesertaValidator();
assert.equal(validator.isValidScore(70), true);
assert.equal(PesertaValidator.getStatus(70), 'TIDAK LULUS');
console.log('Tantangan 11: semua pemeriksaan lulus');
```
Jalankan:

```bash
node latihan/proyek/tantangan-11.js
```

<!-- challenge-output: tantangan-11.js -->
```text
Tantangan 11: semua pemeriksaan lulus
```

Nilai 70 berada dalam rentang default validator 60–100, tetapi belum memenuhi batas lulus 80. Dua pemeriksaan tersebut menjawab pertanyaan yang berbeda.

</details>

## Kondisi lengkap akhir proyek

```text
proyek/
├── package.json
├── main.js
├── data/
│   ├── peserta.json
│   └── contoh-*.json
├── utils/
│   ├── pesertaLoader.js
│   ├── pesertaProcessor.js
│   ├── pesertaValidator.js
│   └── pesertaFormatter.js
├── test/
│   ├── test-all.js
│   └── fixtures/
├── cek-loader.js
└── tantangan-NN.js
```

Main lengkap berada di tahap 10; processor, validator, dan formatter di tahap 08; loader dan data di tahap 09; package.json di langkah 2 tahap ini. Folder test disediakan melalui langkah 1. File tantangan yang kamu kerjakan tetap terpisah dari aplikasi utama.

## Checkpoint akhir

- [ ] Saya menulis module proyek sendiri, tanpa import ke utils root.
- [ ] Aplikasi menampilkan TASK 1–9.
- [ ] Pengujian proyek peserta lulus 79/79.
- [ ] Tantangan membuktikan tes terakhir yang lebih rendah tetap dipakai.
- [ ] Saya bisa menjelaskan array mentah, Set, Map, validator, formatter, Promise, dan penanganan error.

[Tahap sebelumnya](../10-integrasi-aplikasi/README.md) · [Daftar latihan](../README.md) · [Panduan instruktur](../../instructor.md)
