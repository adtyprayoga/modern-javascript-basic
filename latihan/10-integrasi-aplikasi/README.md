# 10. Gabungkan aplikasi sampai TASK 1–9 selesai

Di akhir tahap ini proyekmu menghasilkan laporan lengkap yang sama dengan aplikasi referensi. Prasyarat: tahap 09 selesai, termasuk data JSON dan empat module buatanmu.

Semua nama file berikut berada di `latihan/proyek/`. Jalankan perintah dari root repository. Pada setiap langkah, ganti seluruh `main.js` dengan blok lengkap yang disediakan. Kode mencakup hasil langkah sebelumnya supaya kamu dapat memeriksa kondisi proyek tanpa menebak bagian yang perlu dipertahankan.

Main menghubungkan loader untuk membaca, processor untuk mengolah, validator untuk memeriksa, dan formatter untuk menghasilkan teks. Semua import menggunakan `./utils/`, yaitu module di proyekmu sendiri.

## Langkah 1: Tampilkan data dan format dasar

Ganti seluruh isi `main.js`:

<!-- write: main.js -->
```javascript
import { loadPeserta } from './utils/pesertaLoader.js';
import { 
  getUniqueEmails, 
  createPesertaMap, 
  getPesertaByClass, 
  calculateAverageScore,
  getUniquePeserta 
} from './utils/pesertaProcessor.js';
import { 
  displayPeserta, 
  createPesertaSummary, 
  formatPesertaList,
  createDetailedReport 
} from './utils/pesertaFormatter.js';
import { 
  PesertaValidator, 
  createPassingValidator,
  createLenientValidator 
} from './utils/pesertaValidator.js';
let rawPeserta;
try {
  rawPeserta = await loadPeserta();
} catch (error) {
  console.error(`❌ ${error.message}`);
  process.exit(1);
}

console.log("=".repeat(60));
console.log("🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS");
console.log("=".repeat(60));
console.log();
console.log("📊 TASK 1: Raw Data Overview");
console.log("-".repeat(60));
console.log(`Total raw entries: ${rawPeserta.length}`);
console.log(`Unique emails: ${getUniqueEmails(rawPeserta).length}`);
console.log();
console.log("📊 TASK 2: Testing displayPeserta Function");
console.log("-".repeat(60));
console.log(displayPeserta("Aditya", 85));      // With LULUS status
console.log(displayPeserta("Milea", 78));       // With TIDAK LULUS status
console.log(displayPeserta());                  // With all defaults
console.log();
console.log("📊 TASK 3: Testing Destructuring with Renaming");
console.log("-".repeat(60));
const pesertaSample = { 
  id: 101, 
  name: "Aditya", 
  email: "aditya@brainmatics.com", 
  score: 85 
};
const { name: pesertaNama, email: pesertaEmail, score: nilaiAkhir } = pesertaSample;
console.log(`Nama: ${pesertaNama}`);
console.log(`Email: ${pesertaEmail}`);
console.log(`Nilai Akhir: ${nilaiAkhir}`);
const { name, ...sisanya } = pesertaSample;
console.log(`Sisa properti (rest): ${JSON.stringify(sisanya)}`);
console.log();
```

Jalankan dari root:

```bash
node latihan/proyek/main.js
```

<!-- expected: main.js -->
```text
============================================================
🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS
============================================================

📊 TASK 1: Raw Data Overview
------------------------------------------------------------
Total raw entries: 6
Unique emails: 4

📊 TASK 2: Testing displayPeserta Function
------------------------------------------------------------
Nama: Aditya, Score: 85, Status: LULUS
Nama: Milea, Score: 78, Status: TIDAK LULUS
Nama: Unknown, Score: 0, Status: TIDAK LULUS

📊 TASK 3: Testing Destructuring with Renaming
------------------------------------------------------------
Nama: Aditya
Email: aditya@brainmatics.com
Nilai Akhir: 85
Sisa properti (rest): {"id":101,"email":"aditya@brainmatics.com","score":85}
```

TASK 1 menunjukkan enam tes dan empat email unik. TASK 2 mencoba fungsi dengan parameter lengkap serta default. TASK 3 memperlihatkan destructuring dengan rename dan object rest. Minta satu peserta menjelaskan perbedaan nama properti dengan nama variabel hasil rename.

## Langkah 2: Tambahkan Set dan Map

Ganti seluruh isi `main.js`:

<!-- write: main.js -->
```javascript
import { loadPeserta } from './utils/pesertaLoader.js';
import { 
  getUniqueEmails, 
  createPesertaMap, 
  getPesertaByClass, 
  calculateAverageScore,
  getUniquePeserta 
} from './utils/pesertaProcessor.js';
import { 
  displayPeserta, 
  createPesertaSummary, 
  formatPesertaList,
  createDetailedReport 
} from './utils/pesertaFormatter.js';
import { 
  PesertaValidator, 
  createPassingValidator,
  createLenientValidator 
} from './utils/pesertaValidator.js';
let rawPeserta;
try {
  rawPeserta = await loadPeserta();
} catch (error) {
  console.error(`❌ ${error.message}`);
  process.exit(1);
}

console.log("=".repeat(60));
console.log("🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS");
console.log("=".repeat(60));
console.log();
console.log("📊 TASK 1: Raw Data Overview");
console.log("-".repeat(60));
console.log(`Total raw entries: ${rawPeserta.length}`);
console.log(`Unique emails: ${getUniqueEmails(rawPeserta).length}`);
console.log();
console.log("📊 TASK 2: Testing displayPeserta Function");
console.log("-".repeat(60));
console.log(displayPeserta("Aditya", 85));      // With LULUS status
console.log(displayPeserta("Milea", 78));       // With TIDAK LULUS status
console.log(displayPeserta());                  // With all defaults
console.log();
console.log("📊 TASK 3: Testing Destructuring with Renaming");
console.log("-".repeat(60));
const pesertaSample = { 
  id: 101, 
  name: "Aditya", 
  email: "aditya@brainmatics.com", 
  score: 85 
};
const { name: pesertaNama, email: pesertaEmail, score: nilaiAkhir } = pesertaSample;
console.log(`Nama: ${pesertaNama}`);
console.log(`Email: ${pesertaEmail}`);
console.log(`Nilai Akhir: ${nilaiAkhir}`);
const { name, ...sisanya } = pesertaSample;
console.log(`Sisa properti (rest): ${JSON.stringify(sisanya)}`);
console.log();
console.log("📊 TASK 4: Unique Emails Using Set");
console.log("-".repeat(60));
const uniqueEmails = getUniqueEmails(rawPeserta);
console.log(`Found ${uniqueEmails.length} unique emails:`);
uniqueEmails.forEach((email, index) => {
  console.log(`  ${index + 1}. ${email}`);
});
console.log();
console.log("📊 TASK 5: Participant Map (Email-based Indexing)");
console.log("-".repeat(60));
const pesertaMap = createPesertaMap(rawPeserta);
console.log(`Map size: ${pesertaMap.size}`);
console.log("\nLatest entry for aditya@brainmatics.com:");
const adityaData = pesertaMap.get("aditya@brainmatics.com");
console.log(createDetailedReport(adityaData));
console.log(`Score tidak-ada@brainmatics.com: ${pesertaMap.get("tidak-ada@brainmatics.com")?.score ?? "tidak ditemukan"}`);
console.log();
```

Jalankan dari root:

```bash
node latihan/proyek/main.js
```

<!-- expected: main.js -->
```text
============================================================
🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS
============================================================

📊 TASK 1: Raw Data Overview
------------------------------------------------------------
Total raw entries: 6
Unique emails: 4

📊 TASK 2: Testing displayPeserta Function
------------------------------------------------------------
Nama: Aditya, Score: 85, Status: LULUS
Nama: Milea, Score: 78, Status: TIDAK LULUS
Nama: Unknown, Score: 0, Status: TIDAK LULUS

📊 TASK 3: Testing Destructuring with Renaming
------------------------------------------------------------
Nama: Aditya
Email: aditya@brainmatics.com
Nilai Akhir: 85
Sisa properti (rest): {"id":101,"email":"aditya@brainmatics.com","score":85}

📊 TASK 4: Unique Emails Using Set
------------------------------------------------------------
Found 4 unique emails:
  1. aditya@brainmatics.com
  2. zaim@brainmatics.com
  3. milea@brainmatics.com
  4. pratama@brainmatics.com

📊 TASK 5: Participant Map (Email-based Indexing)
------------------------------------------------------------
Map size: 4

Latest entry for aditya@brainmatics.com:

╔═══════════════════════════════════════╗
  ID       : 103
  Nama     : Aditya Prayoga
  Email    : aditya@brainmatics.com
  Kelas    : JavaScript Fundamentals
  Score    : 88
  Status   : ✅ LULUS
╚═══════════════════════════════════════╝
Score tidak-ada@brainmatics.com: tidak ditemukan
```

Kode sekarang menambahkan TASK 4 dan TASK 5. Email unik berasal dari Set; Map menyimpan nilai terakhir setiap email. Aditya memakai nilai 88. Pencarian email yang tidak ada memakai ?. dan ??, sehingga laporan tetap berjalan.

## Langkah 3: Tambahkan validator rentang

Ganti seluruh isi `main.js`:

<!-- write: main.js -->
```javascript
import { loadPeserta } from './utils/pesertaLoader.js';
import { 
  getUniqueEmails, 
  createPesertaMap, 
  getPesertaByClass, 
  calculateAverageScore,
  getUniquePeserta 
} from './utils/pesertaProcessor.js';
import { 
  displayPeserta, 
  createPesertaSummary, 
  formatPesertaList,
  createDetailedReport 
} from './utils/pesertaFormatter.js';
import { 
  PesertaValidator, 
  createPassingValidator,
  createLenientValidator 
} from './utils/pesertaValidator.js';
let rawPeserta;
try {
  rawPeserta = await loadPeserta();
} catch (error) {
  console.error(`❌ ${error.message}`);
  process.exit(1);
}

console.log("=".repeat(60));
console.log("🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS");
console.log("=".repeat(60));
console.log();
console.log("📊 TASK 1: Raw Data Overview");
console.log("-".repeat(60));
console.log(`Total raw entries: ${rawPeserta.length}`);
console.log(`Unique emails: ${getUniqueEmails(rawPeserta).length}`);
console.log();
console.log("📊 TASK 2: Testing displayPeserta Function");
console.log("-".repeat(60));
console.log(displayPeserta("Aditya", 85));      // With LULUS status
console.log(displayPeserta("Milea", 78));       // With TIDAK LULUS status
console.log(displayPeserta());                  // With all defaults
console.log();
console.log("📊 TASK 3: Testing Destructuring with Renaming");
console.log("-".repeat(60));
const pesertaSample = { 
  id: 101, 
  name: "Aditya", 
  email: "aditya@brainmatics.com", 
  score: 85 
};
const { name: pesertaNama, email: pesertaEmail, score: nilaiAkhir } = pesertaSample;
console.log(`Nama: ${pesertaNama}`);
console.log(`Email: ${pesertaEmail}`);
console.log(`Nilai Akhir: ${nilaiAkhir}`);
const { name, ...sisanya } = pesertaSample;
console.log(`Sisa properti (rest): ${JSON.stringify(sisanya)}`);
console.log();
console.log("📊 TASK 4: Unique Emails Using Set");
console.log("-".repeat(60));
const uniqueEmails = getUniqueEmails(rawPeserta);
console.log(`Found ${uniqueEmails.length} unique emails:`);
uniqueEmails.forEach((email, index) => {
  console.log(`  ${index + 1}. ${email}`);
});
console.log();
console.log("📊 TASK 5: Participant Map (Email-based Indexing)");
console.log("-".repeat(60));
const pesertaMap = createPesertaMap(rawPeserta);
console.log(`Map size: ${pesertaMap.size}`);
console.log("\nLatest entry for aditya@brainmatics.com:");
const adityaData = pesertaMap.get("aditya@brainmatics.com");
console.log(createDetailedReport(adityaData));
console.log(`Score tidak-ada@brainmatics.com: ${pesertaMap.get("tidak-ada@brainmatics.com")?.score ?? "tidak ditemukan"}`);
console.log();
console.log("📊 TASK 6: Testing PesertaValidator Class");
console.log("-".repeat(60));
const passingValidator = createPassingValidator();
console.log("Standard Validator (80-100):");
console.log(`  ${passingValidator.formatResult("Aditya", 85)}`);
console.log(`  ${passingValidator.formatResult("Milea", 75)}`);
const lenientValidator = createLenientValidator();
console.log("\nLenient Validator (60-100):");
console.log(`  ${lenientValidator.formatResult("Aditya", 85)}`);
console.log(`  ${lenientValidator.formatResult("Milea", 75)}`);
console.log();
```

Jalankan dari root:

```bash
node latihan/proyek/main.js
```

<!-- expected: main.js -->
```text
============================================================
🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS
============================================================

📊 TASK 1: Raw Data Overview
------------------------------------------------------------
Total raw entries: 6
Unique emails: 4

📊 TASK 2: Testing displayPeserta Function
------------------------------------------------------------
Nama: Aditya, Score: 85, Status: LULUS
Nama: Milea, Score: 78, Status: TIDAK LULUS
Nama: Unknown, Score: 0, Status: TIDAK LULUS

📊 TASK 3: Testing Destructuring with Renaming
------------------------------------------------------------
Nama: Aditya
Email: aditya@brainmatics.com
Nilai Akhir: 85
Sisa properti (rest): {"id":101,"email":"aditya@brainmatics.com","score":85}

📊 TASK 4: Unique Emails Using Set
------------------------------------------------------------
Found 4 unique emails:
  1. aditya@brainmatics.com
  2. zaim@brainmatics.com
  3. milea@brainmatics.com
  4. pratama@brainmatics.com

📊 TASK 5: Participant Map (Email-based Indexing)
------------------------------------------------------------
Map size: 4

Latest entry for aditya@brainmatics.com:

╔═══════════════════════════════════════╗
  ID       : 103
  Nama     : Aditya Prayoga
  Email    : aditya@brainmatics.com
  Kelas    : JavaScript Fundamentals
  Score    : 88
  Status   : ✅ LULUS
╚═══════════════════════════════════════╝
Score tidak-ada@brainmatics.com: tidak ditemukan

📊 TASK 6: Testing PesertaValidator Class
------------------------------------------------------------
Standard Validator (80-100):
  Aditya mendapat score 85 - SESUAI STANDAR
  Milea mendapat score 75 - TIDAK SESUAI

Lenient Validator (60-100):
  Aditya mendapat score 85 - SESUAI STANDAR
  Milea mendapat score 75 - SESUAI STANDAR
```

TASK 6 membuat dua instance validator dengan rentang 80–100 dan60–100. Nilai75 tidak sesuai rentang pertama tetapi sesuai rentang kedua. Format SESUAI STANDAR menjelaskan rentang yang dipilih, bukan mengganti aturan kelulusan getStatus.

## Langkah 4: Lengkapi statistik, batch, dan daftar akhir

Ganti seluruh isi `main.js`:

<!-- write: main.js -->
```javascript
import { loadPeserta } from './utils/pesertaLoader.js';
import { 
  getUniqueEmails, 
  createPesertaMap, 
  getPesertaByClass, 
  calculateAverageScore,
  getUniquePeserta 
} from './utils/pesertaProcessor.js';
import { 
  displayPeserta, 
  createPesertaSummary, 
  formatPesertaList,
  createDetailedReport 
} from './utils/pesertaFormatter.js';
import { 
  PesertaValidator, 
  createPassingValidator,
  createLenientValidator 
} from './utils/pesertaValidator.js';
let rawPeserta;
try {
  rawPeserta = await loadPeserta();
} catch (error) {
  console.error(`❌ ${error.message}`);
  process.exit(1);
}

console.log("=".repeat(60));
console.log("🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS");
console.log("=".repeat(60));
console.log();
console.log("📊 TASK 1: Raw Data Overview");
console.log("-".repeat(60));
console.log(`Total raw entries: ${rawPeserta.length}`);
console.log(`Unique emails: ${getUniqueEmails(rawPeserta).length}`);
console.log();
console.log("📊 TASK 2: Testing displayPeserta Function");
console.log("-".repeat(60));
console.log(displayPeserta("Aditya", 85));      // With LULUS status
console.log(displayPeserta("Milea", 78));       // With TIDAK LULUS status
console.log(displayPeserta());                  // With all defaults
console.log();
console.log("📊 TASK 3: Testing Destructuring with Renaming");
console.log("-".repeat(60));
const pesertaSample = { 
  id: 101, 
  name: "Aditya", 
  email: "aditya@brainmatics.com", 
  score: 85 
};
const { name: pesertaNama, email: pesertaEmail, score: nilaiAkhir } = pesertaSample;
console.log(`Nama: ${pesertaNama}`);
console.log(`Email: ${pesertaEmail}`);
console.log(`Nilai Akhir: ${nilaiAkhir}`);
const { name, ...sisanya } = pesertaSample;
console.log(`Sisa properti (rest): ${JSON.stringify(sisanya)}`);
console.log();
console.log("📊 TASK 4: Unique Emails Using Set");
console.log("-".repeat(60));
const uniqueEmails = getUniqueEmails(rawPeserta);
console.log(`Found ${uniqueEmails.length} unique emails:`);
uniqueEmails.forEach((email, index) => {
  console.log(`  ${index + 1}. ${email}`);
});
console.log();
console.log("📊 TASK 5: Participant Map (Email-based Indexing)");
console.log("-".repeat(60));
const pesertaMap = createPesertaMap(rawPeserta);
console.log(`Map size: ${pesertaMap.size}`);
console.log("\nLatest entry for aditya@brainmatics.com:");
const adityaData = pesertaMap.get("aditya@brainmatics.com");
console.log(createDetailedReport(adityaData));
console.log(`Score tidak-ada@brainmatics.com: ${pesertaMap.get("tidak-ada@brainmatics.com")?.score ?? "tidak ditemukan"}`);
console.log();
console.log("📊 TASK 6: Testing PesertaValidator Class");
console.log("-".repeat(60));
const passingValidator = createPassingValidator();
console.log("Standard Validator (80-100):");
console.log(`  ${passingValidator.formatResult("Aditya", 85)}`);
console.log(`  ${passingValidator.formatResult("Milea", 75)}`);
const lenientValidator = createLenientValidator();
console.log("\nLenient Validator (60-100):");
console.log(`  ${lenientValidator.formatResult("Aditya", 85)}`);
console.log(`  ${lenientValidator.formatResult("Milea", 75)}`);
console.log();
console.log("📊 TASK 7: Filter by Class & Calculate Statistics");
console.log("-".repeat(60));
const uniquePeserta = getUniquePeserta(rawPeserta);
console.log(`Total unique participants: ${uniquePeserta.length}\n`);
const jsFundamentals = getPesertaByClass(uniquePeserta, "JavaScript Fundamentals");
console.log(`📚 JavaScript Fundamentals Class (${jsFundamentals.length} students):`);
jsFundamentals.forEach(peserta => {
  console.log(`  ${createPesertaSummary(peserta)}`);
});
const jsAverage = calculateAverageScore(jsFundamentals);
console.log(`  ⭐ Average Score: ${jsAverage}`);
console.log();
const reactBasics = getPesertaByClass(uniquePeserta, "React Basics");
console.log(`📚 React Basics Class (${reactBasics.length} students):`);
reactBasics.forEach(peserta => {
  console.log(`  ${createPesertaSummary(peserta)}`);
});
const reactAverage = calculateAverageScore(reactBasics);
console.log(`  ⭐ Average Score: ${reactAverage}`);
console.log();
console.log("📊 TASK 8: Batch Validation Report");
console.log("-".repeat(60));

const validator = new PesertaValidator(80, 100);
const validationSummary = validator.validateBatch(uniquePeserta);

console.log("Validation Summary (Threshold: 80-100):");
console.log(`  Total Participants: ${validationSummary.total}`);
console.log(`  Valid (LULUS): ${validationSummary.valid}`);
console.log(`  Invalid (TIDAK LULUS): ${validationSummary.invalid}`);
console.log(`  Pass Rate: ${validationSummary.validPercentage}%`);
console.log();
console.log("Individual Validation Results:");
uniquePeserta.forEach(({ name, score }) => {
  console.log(`  ${validator.formatResult(name, score)}`);
});
console.log(`Validasi status (includes): "LULUS" → ${PesertaValidator.isValidStatus("LULUS")}, "lulus" → ${PesertaValidator.isValidStatus("lulus")}`);
console.log();
console.log("📊 TASK 9: Complete Unique Participant List");
console.log("-".repeat(60));
console.log(formatPesertaList(uniquePeserta));
console.log();
```

Jalankan dari root:

```bash
node latihan/proyek/main.js
```

<!-- expected: main.js -->
```text
============================================================
🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS
============================================================

📊 TASK 1: Raw Data Overview
------------------------------------------------------------
Total raw entries: 6
Unique emails: 4

📊 TASK 2: Testing displayPeserta Function
------------------------------------------------------------
Nama: Aditya, Score: 85, Status: LULUS
Nama: Milea, Score: 78, Status: TIDAK LULUS
Nama: Unknown, Score: 0, Status: TIDAK LULUS

📊 TASK 3: Testing Destructuring with Renaming
------------------------------------------------------------
Nama: Aditya
Email: aditya@brainmatics.com
Nilai Akhir: 85
Sisa properti (rest): {"id":101,"email":"aditya@brainmatics.com","score":85}

📊 TASK 4: Unique Emails Using Set
------------------------------------------------------------
Found 4 unique emails:
  1. aditya@brainmatics.com
  2. zaim@brainmatics.com
  3. milea@brainmatics.com
  4. pratama@brainmatics.com

📊 TASK 5: Participant Map (Email-based Indexing)
------------------------------------------------------------
Map size: 4

Latest entry for aditya@brainmatics.com:

╔═══════════════════════════════════════╗
  ID       : 103
  Nama     : Aditya Prayoga
  Email    : aditya@brainmatics.com
  Kelas    : JavaScript Fundamentals
  Score    : 88
  Status   : ✅ LULUS
╚═══════════════════════════════════════╝
Score tidak-ada@brainmatics.com: tidak ditemukan

📊 TASK 6: Testing PesertaValidator Class
------------------------------------------------------------
Standard Validator (80-100):
  Aditya mendapat score 85 - SESUAI STANDAR
  Milea mendapat score 75 - TIDAK SESUAI

Lenient Validator (60-100):
  Aditya mendapat score 85 - SESUAI STANDAR
  Milea mendapat score 75 - SESUAI STANDAR

📊 TASK 7: Filter by Class & Calculate Statistics
------------------------------------------------------------
Total unique participants: 4

📚 JavaScript Fundamentals Class (2 students):
  📚 Aditya Prayoga - Class: JavaScript Fundamentals - Score: 88
  📚 Milea Kusuma - Class: JavaScript Fundamentals - Score: 78
  ⭐ Average Score: 83

📚 React Basics Class (2 students):
  📚 Zaim Fauzan - Class: React Basics - Score: 94
  📚 Pratama Wijaya - Class: React Basics - Score: 95
  ⭐ Average Score: 94.5

📊 TASK 8: Batch Validation Report
------------------------------------------------------------
Validation Summary (Threshold: 80-100):
  Total Participants: 4
  Valid (LULUS): 3
  Invalid (TIDAK LULUS): 1
  Pass Rate: 75%

Individual Validation Results:
  Aditya Prayoga mendapat score 88 - SESUAI STANDAR
  Zaim Fauzan mendapat score 94 - SESUAI STANDAR
  Milea Kusuma mendapat score 78 - TIDAK SESUAI
  Pratama Wijaya mendapat score 95 - SESUAI STANDAR
Validasi status (includes): "LULUS" → true, "lulus" → false

📊 TASK 9: Complete Unique Participant List
------------------------------------------------------------
1. Nama: Aditya Prayoga, Score: 88, Status: LULUS
2. Nama: Zaim Fauzan, Score: 94, Status: LULUS
3. Nama: Milea Kusuma, Score: 78, Status: TIDAK LULUS
4. Nama: Pratama Wijaya, Score: 95, Status: LULUS
```

TASK 7–9 memakai peserta unik agar tes ulang tidak dihitung sebagai peserta tambahan. TASK 7 menyaring kelas lalu menghitung rata-rata. TASK 8 memeriksa batch dengan validator 80–100; TASK 9 menampilkan daftar akhir. Pada data ini ada empat peserta unik dan tiga lulus.

Jalankan juga melalui script package:

```bash
npm --prefix latihan/proyek start
```

npm menambahkan header package sebelum output program. Hasil TASK 1–9 sama dengan output langkah 4 di atas.

## Kesalahan umum

- `Identifier has already been declared` berarti definisi lama masih tertinggal. Ganti seluruh main sesuai langkah 2.
- `is not a function` atau named export tidak ditemukan berarti salah satu module tahap 08 belum lengkap.
- Statistik dari rawPeserta menghitung tes ulang. Gunakan uniquePeserta pada laporan peserta akhir.

## Tantangan: Buat ringkasan dua kelas

Di file terpisah, muat data, ambil peserta unik, lalu cetak jumlah anggota dan rata-rata tiap kelas. Gunakan fungsi yang sudah kamu bangun.

<details>
<summary>Lihat penyelesaian tantangan</summary>

Buat `tantangan-10.js`:

<!-- challenge: tantangan-10.js -->
```javascript
import { loadPeserta } from './utils/pesertaLoader.js';
import { getUniquePeserta, getPesertaByClass, calculateAverageScore } from './utils/pesertaProcessor.js';

const peserta = getUniquePeserta(await loadPeserta());
for (const kelas of ['JavaScript Fundamentals', 'React Basics']) {
  const anggota = getPesertaByClass(peserta, kelas);
  console.log(`${kelas}: ${anggota.length} peserta, rata-rata ${calculateAverageScore(anggota)}`);
}
```
Jalankan:

```bash
node latihan/proyek/tantangan-10.js
```

<!-- challenge-output: tantangan-10.js -->
```text
JavaScript Fundamentals: 2 peserta, rata-rata 83
React Basics: 2 peserta, rata-rata 94.5
```

Deduplikasi dilakukan sebelum filter agar Aditya dan Zaim masing-masing dihitung satu kali dengan nilai terakhir.

</details>

## Kondisi lengkap akhir tahap

Main lengkap tercantum pada langkah 4. Module tetap memakai isi tahap 08 dan loader tahap 09. Data utama tetap berisi enam entri. Tidak ada perubahan file module pada tahap ini.

## Checkpoint

- [ ] TASK 1–9 berjalan dari proyek saya sendiri.
- [ ] Total tes 6, peserta unik 4, dan kelulusan 3 dari 4 peserta.
- [ ] Rata-rata kelas memakai nilai terakhir setiap peserta.
- [ ] Saya bisa menelusuri Aditya dari JSON, Map, validator, sampai teks laporan.

[Tahap sebelumnya](../09-async-loader/README.md) · [Daftar latihan](../README.md) · [Tahap berikutnya](../11-pengujian-akhir/README.md)
