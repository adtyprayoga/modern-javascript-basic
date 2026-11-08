# 08. Module dan formatter

## Hasil dan prasyarat

Memisahkan pengolahan, validasi, dan tampilan ke module proyek sendiri.

Selesaikan tahap 07. Semua fungsi tetap buatan peserta; tidak mengimpor `utils` dari root repository.

Kerjakan semua file di `latihan/proyek/`. Jalankan semua perintah terminal dari **root repository**, tempat README utama berada. Ketik kode sendiri, prediksi hasil, lalu jalankan. Ganti seluruh isi file sesuai nama yang disebut sebelum blok kode.


Buat folder `latihan/proyek/utils/` dan file percobaan `latihan/proyek/module.js`. Jalur import di file ini selalu menuju `./utils/`, milik proyek peserta sendiri. Kita memindahkan kode secara bertahap sambil menjalankan file percobaan. `main.js` tahap 07 baru diganti setelah semua module siap; tidak perlu mengubahnya pada langkah 1–4.

Pada blok `diff`, baris `-` menunjukkan kode sebelum perubahan dan baris `+` menunjukkan kode sesudah perubahan. Gunakan blok kode lengkap setelahnya untuk mengganti isi file.

## 1. Pindahkan processor dan coba import

Buat `utils/pesertaProcessor.js`, lalu ketik isi lengkap berikut. Setiap `export` membuka fungsi untuk dipakai file lain. Fungsi ini sama dengan fungsi inline tahap 07.

File baru: `utils/pesertaProcessor.js`. Berikut isi lengkapnya.

<!-- write: utils/pesertaProcessor.js -->
```javascript
export const getUniqueEmails = (pesertaList = []) => {
  const emailSet = new Set(pesertaList.map(p => p.email));
  return [...emailSet];
};

export const createPesertaMap = (pesertaList = []) => {
  const pesertaMap = new Map();
  for (const peserta of pesertaList) {
    pesertaMap.set(peserta.email, { ...peserta });
  }

  return pesertaMap;
};

export const getPesertaByClass = (pesertaList = [], className = "") => {
  const result = [];
  for (const { id, name, email, class: pesertaClass, score } of pesertaList) {
    if (pesertaClass === className) {
      result.push({ id, name, email, class: pesertaClass, score });
    }
  }

  return result;
};

export const calculateAverageScore = (pesertaList = []) => {
  if (pesertaList.length === 0) return 0;
  const totalScore = pesertaList.reduce((sum, { score }) => sum + score, 0);
  return Math.round((totalScore / pesertaList.length) * 100) / 100;
};

export const getUniquePeserta = (pesertaList = []) => {
  const pesertaMap = createPesertaMap(pesertaList);
  return [...pesertaMap.values()];
};
```

Buat `module.js`. Kurung kurawal pada import memilih export berdasarkan nama; ejaan harus sama.

File baru: `module.js`. Berikut isi lengkapnya.

<!-- write: module.js -->
```javascript
import { getUniqueEmails, getUniquePeserta, getPesertaByClass, calculateAverageScore } from "./utils/pesertaProcessor.js";

const daftar = [
  { id: 1, name: "Rina", email: "r@example.com", class: "JavaScript", score: 90 },
  { id: 2, name: "Rina", email: "r@example.com", class: "JavaScript", score: 79 }
];
const unik = getUniquePeserta(daftar);
console.log(`Email unik: ${getUniqueEmails(daftar).length}`);
console.log(`Nilai terakhir: ${unik[0].score}`);
console.log(`Peserta JavaScript: ${getPesertaByClass(unik, "JavaScript").length}`);
console.log(`Rata-rata: ${calculateAverageScore(unik)}`);
```

Jalankan dari root repository:

```bash
node latihan/proyek/module.js
```

<!-- expected: module.js -->
```text
Email unik: 1
Nilai terakhir: 79
Peserta JavaScript: 1
Rata-rata: 79
```

## 2. Pindahkan validator dan gunakan bersama processor

Buat `utils/pesertaValidator.js`. Class dan factory sekarang diekspor; hapus kata `export` hanya jika menulis kode inline, bukan pada file module ini.

File baru: `utils/pesertaValidator.js`. Berikut isi lengkapnya.

<!-- write: utils/pesertaValidator.js -->
```javascript
export class PesertaValidator {
  static PASSING_SCORE = 80;

  static STATUS = ["LULUS", "TIDAK LULUS"];

  static getStatus = (score = 0) =>
    score >= PesertaValidator.PASSING_SCORE ? "LULUS" : "TIDAK LULUS";

  static isValidStatus = (status) => PesertaValidator.STATUS.includes(status);

  constructor(minScore = 60, maxScore = 100) {
    this.minScore = minScore;
    this.maxScore = maxScore;
  }

  isValidScore = (score) => {
    return score >= this.minScore && score <= this.maxScore;
  };

  formatResult = (name, score) => {
    const status = this.isValidScore(score) ? "SESUAI STANDAR" : "TIDAK SESUAI";
    return `${name} mendapat score ${score} - ${status}`;
  };

  getValidationDetails = (score) => {
    return {
      score,
      isValid: this.isValidScore(score),
      minScore: this.minScore,
      maxScore: this.maxScore,
      message: this.isValidScore(score)
        ? `Score dalam rentang ${this.minScore}-${this.maxScore}`
        : `Score di luar rentang ${this.minScore}-${this.maxScore}`
    };
  };

  validateBatch = (pesertaList = []) => {
    const validCount = pesertaList.filter(({ score }) => this.isValidScore(score)).length;
    const invalidCount = pesertaList.length - validCount;

    return {
      total: pesertaList.length,
      valid: validCount,
      invalid: invalidCount,
      validPercentage: pesertaList.length > 0
        ? Math.round((validCount / pesertaList.length) * 100)
        : 0
    };
  };
}

export const createPassingValidator = () => {
  return new PesertaValidator(PesertaValidator.PASSING_SCORE, 100);
};

export const createLenientValidator = () => {
  return new PesertaValidator(60, 100);
};
```

Ganti seluruh `module.js`. Dua module dapat diimpor dan dipakai dalam satu program tanpa menyalin definisi fungsinya.

Perubahan pada `module.js`:

```diff
--- sebelum/module.js
+++ sesudah/module.js
@@ -1,11 +1,8 @@
-import { getUniqueEmails, getUniquePeserta, getPesertaByClass, calculateAverageScore } from "./utils/pesertaProcessor.js";
+import { getUniquePeserta } from "./utils/pesertaProcessor.js";
+import { PesertaValidator, createPassingValidator, createLenientValidator } from "./utils/pesertaValidator.js";

-const daftar = [
-  { id: 1, name: "Rina", email: "r@example.com", class: "JavaScript", score: 90 },
-  { id: 2, name: "Rina", email: "r@example.com", class: "JavaScript", score: 79 }
-];
+const daftar = [{ email: "r@example.com", score: 90 }, { email: "r@example.com", score: 79 }];
 const unik = getUniquePeserta(daftar);
-console.log(`Email unik: ${getUniqueEmails(daftar).length}`);
-console.log(`Nilai terakhir: ${unik[0].score}`);
-console.log(`Peserta JavaScript: ${getPesertaByClass(unik, "JavaScript").length}`);
-console.log(`Rata-rata: ${calculateAverageScore(unik)}`);
+console.log(`Status terakhir: ${PesertaValidator.getStatus(unik[0].score)}`);
+console.log(`Diterima passing: ${createPassingValidator().validateBatch(unik).valid}`);
+console.log(`Diterima lenient: ${createLenientValidator().validateBatch(unik).valid}`);
```

Kode lengkap `module.js` setelah perubahan:

<!-- write: module.js -->
```javascript
import { getUniquePeserta } from "./utils/pesertaProcessor.js";
import { PesertaValidator, createPassingValidator, createLenientValidator } from "./utils/pesertaValidator.js";

const daftar = [{ email: "r@example.com", score: 90 }, { email: "r@example.com", score: 79 }];
const unik = getUniquePeserta(daftar);
console.log(`Status terakhir: ${PesertaValidator.getStatus(unik[0].score)}`);
console.log(`Diterima passing: ${createPassingValidator().validateBatch(unik).valid}`);
console.log(`Diterima lenient: ${createLenientValidator().validateBatch(unik).valid}`);
```

Jalankan dari root repository:

```bash
node latihan/proyek/module.js
```

<!-- expected: module.js -->
```text
Status terakhir: TIDAK LULUS
Diterima passing: 0
Diterima lenient: 1
```

## 3. Buat formatter dasar

Buat `utils/pesertaFormatter.js` dengan dua fungsi terlebih dahulu. Formatter mengimpor validator dari folder yang sama, sehingga jalurnya `./pesertaValidator.js`. Aturan status tidak perlu ditulis ulang. `peserta ?? {}` memakai object kosong ketika input null atau undefined; default destructuring mengisi properti yang hilang. Nilai 0 tetap 0. Penggunaan fallback data diperdalam di tahap 09.

File baru: `utils/pesertaFormatter.js`. Berikut isi lengkapnya.

<!-- write: utils/pesertaFormatter.js -->
```javascript
import { PesertaValidator } from './pesertaValidator.js';

export const displayPeserta = (name = "Unknown", score = 0, status = PesertaValidator.getStatus(score)) => {
  const finalStatus = PesertaValidator.isValidStatus(status) ? status : PesertaValidator.getStatus(score);
  return `Nama: ${name}, Score: ${score}, Status: ${finalStatus}`;
};

export const createPesertaSummary = (peserta) => {
  const { name = "Unknown", score = 0, class: className = "N/A" } = peserta ?? {};
  return `📚 ${name} - Class: ${className} - Score: ${score}`;
};
```

Ganti seluruh `module.js`. Program ini hanya mengimpor dua fungsi yang sudah tersedia; label `lulus` tidak sah sehingga status dihitung ulang.

Perubahan pada `module.js`:

```diff
--- sebelum/module.js
+++ sesudah/module.js
@@ -1,8 +1,6 @@
-import { getUniquePeserta } from "./utils/pesertaProcessor.js";
-import { PesertaValidator, createPassingValidator, createLenientValidator } from "./utils/pesertaValidator.js";
+import { displayPeserta, createPesertaSummary } from "./utils/pesertaFormatter.js";

-const daftar = [{ email: "r@example.com", score: 90 }, { email: "r@example.com", score: 79 }];
-const unik = getUniquePeserta(daftar);
-console.log(`Status terakhir: ${PesertaValidator.getStatus(unik[0].score)}`);
-console.log(`Diterima passing: ${createPassingValidator().validateBatch(unik).valid}`);
-console.log(`Diterima lenient: ${createLenientValidator().validateBatch(unik).valid}`);
+console.log(displayPeserta("Rina", 79));
+console.log(displayPeserta("Rina", 80, "lulus"));
+console.log(createPesertaSummary({ name: "Rina", class: "JavaScript", score: 0 }));
+console.log(createPesertaSummary(null));
```

Kode lengkap `module.js` setelah perubahan:

<!-- write: module.js -->
```javascript
import { displayPeserta, createPesertaSummary } from "./utils/pesertaFormatter.js";

console.log(displayPeserta("Rina", 79));
console.log(displayPeserta("Rina", 80, "lulus"));
console.log(createPesertaSummary({ name: "Rina", class: "JavaScript", score: 0 }));
console.log(createPesertaSummary(null));
```

Jalankan dari root repository:

```bash
node latihan/proyek/module.js
```

<!-- expected: module.js -->
```text
Nama: Rina, Score: 79, Status: TIDAK LULUS
Nama: Rina, Score: 80, Status: LULUS
📚 Rina - Class: JavaScript - Score: 0
📚 Unknown - Class: N/A - Score: 0
```

## 4. Tambahkan daftar dan laporan rinci

Ganti seluruh `utils/pesertaFormatter.js` dengan versi lengkap berikut. `formatPesertaList` memakai `map` untuk memberi nomor dan `join` untuk menggabungkan baris. `createDetailedReport` menyusun template literal beberapa baris; baris kosong pembuka termasuk hasilnya. Fungsi yang sudah ada tetap disertakan agar import sebelumnya terus bekerja.

Perubahan pada `utils/pesertaFormatter.js`:

```diff
--- sebelum/utils/pesertaFormatter.js
+++ sesudah/utils/pesertaFormatter.js
@@ -10,2 +10,32 @@
   return `📚 ${name} - Class: ${className} - Score: ${score}`;
 };
+
+export const formatPesertaList = (pesertaList = []) => {
+  if (pesertaList.length === 0) return "Tidak ada peserta.";
+  return pesertaList
+    .map(({ name, score }, index) => {
+      return `${index + 1}. ${displayPeserta(name, score, PesertaValidator.getStatus(score))}`;
+    })
+    .join("\n");
+};
+
+export const createDetailedReport = (peserta) => {
+  const {
+    id = 0,
+    name = "Unknown",
+    email = "N/A",
+    class: className = "N/A",
+    score = 0
+  } = peserta ?? {};
+
+  const status = PesertaValidator.getStatus(score) === "LULUS" ? "✅ LULUS" : "❌ TIDAK LULUS";
+  return `
+╔═══════════════════════════════════════╗
+  ID       : ${id}
+  Nama     : ${name}
+  Email    : ${email}
+  Kelas    : ${className}
+  Score    : ${score}
+  Status   : ${status}
+╚═══════════════════════════════════════╝`;
+};
```

Kode lengkap `utils/pesertaFormatter.js` setelah perubahan:

<!-- write: utils/pesertaFormatter.js -->
```javascript
import { PesertaValidator } from './pesertaValidator.js';

export const displayPeserta = (name = "Unknown", score = 0, status = PesertaValidator.getStatus(score)) => {
  const finalStatus = PesertaValidator.isValidStatus(status) ? status : PesertaValidator.getStatus(score);
  return `Nama: ${name}, Score: ${score}, Status: ${finalStatus}`;
};

export const createPesertaSummary = (peserta) => {
  const { name = "Unknown", score = 0, class: className = "N/A" } = peserta ?? {};
  return `📚 ${name} - Class: ${className} - Score: ${score}`;
};

export const formatPesertaList = (pesertaList = []) => {
  if (pesertaList.length === 0) return "Tidak ada peserta.";
  return pesertaList
    .map(({ name, score }, index) => {
      return `${index + 1}. ${displayPeserta(name, score, PesertaValidator.getStatus(score))}`;
    })
    .join("\n");
};

export const createDetailedReport = (peserta) => {
  const {
    id = 0,
    name = "Unknown",
    email = "N/A",
    class: className = "N/A",
    score = 0
  } = peserta ?? {};

  const status = PesertaValidator.getStatus(score) === "LULUS" ? "✅ LULUS" : "❌ TIDAK LULUS";
  return `
╔═══════════════════════════════════════╗
  ID       : ${id}
  Nama     : ${name}
  Email    : ${email}
  Kelas    : ${className}
  Score    : ${score}
  Status   : ${status}
╚═══════════════════════════════════════╝`;
};
```

Ganti seluruh `module.js`, lalu periksa nomor urut, pesan daftar kosong, dan rincian peserta.

Perubahan pada `module.js`:

```diff
--- sebelum/module.js
+++ sesudah/module.js
@@ -1,6 +1,6 @@
-import { displayPeserta, createPesertaSummary } from "./utils/pesertaFormatter.js";
+import { formatPesertaList, createDetailedReport } from "./utils/pesertaFormatter.js";

-console.log(displayPeserta("Rina", 79));
-console.log(displayPeserta("Rina", 80, "lulus"));
-console.log(createPesertaSummary({ name: "Rina", class: "JavaScript", score: 0 }));
-console.log(createPesertaSummary(null));
+const rina = { id: 1, name: "Rina", email: "rina@example.com", class: "JavaScript", score: 80 };
+console.log(formatPesertaList([rina]));
+console.log(formatPesertaList());
+console.log(createDetailedReport(rina));
```

Kode lengkap `module.js` setelah perubahan:

<!-- write: module.js -->
```javascript
import { formatPesertaList, createDetailedReport } from "./utils/pesertaFormatter.js";

const rina = { id: 1, name: "Rina", email: "rina@example.com", class: "JavaScript", score: 80 };
console.log(formatPesertaList([rina]));
console.log(formatPesertaList());
console.log(createDetailedReport(rina));
```

Jalankan dari root repository:

```bash
node latihan/proyek/module.js
```

<!-- expected: module.js -->
```text
1. Nama: Rina, Score: 80, Status: LULUS
Tidak ada peserta.

╔═══════════════════════════════════════╗
  ID       : 1
  Nama     : Rina
  Email    : rina@example.com
  Kelas    : JavaScript
  Score    : 80
  Status   : ✅ LULUS
╚═══════════════════════════════════════╝
```

## 5. Ganti definisi inline dengan import

Semua module sekarang siap. Ganti **seluruh** `main.js` dengan kode berikut. Penggantian ini menghapus definisi inline processor, class, dan factory dari tahap 07 sekaligus memasukkan import bernama. Jangan menempelkan import di atas definisi lama karena akan mendeklarasikan nama yang sama dua kali. Data enam entri tetap berada dalam `main.js` sampai tahap 09. File `module.js` hanya percobaan, tidak diimpor oleh aplikasi akhir.

Perubahan pada `main.js`:

<details>
<summary>Lihat perubahan sebelum dan sesudah pada main.js</summary>

```diff
--- sebelum/main.js
+++ sesudah/main.js
@@ -1,2 +1,13 @@
+import {
+  getUniqueEmails, createPesertaMap, getUniquePeserta,
+  getPesertaByClass, calculateAverageScore
+} from "./utils/pesertaProcessor.js";
+import {
+  PesertaValidator, createPassingValidator, createLenientValidator
+} from "./utils/pesertaValidator.js";
+import {
+  displayPeserta, createPesertaSummary, formatPesertaList, createDetailedReport
+} from "./utils/pesertaFormatter.js";
+
 const rawPeserta = [
   {
@@ -44,110 +55,14 @@
 ];

-const getUniqueEmails = (pesertaList = []) => {
-  const emailSet = new Set(pesertaList.map(p => p.email));
-  return [...emailSet];
-};
-
-const createPesertaMap = (pesertaList = []) => {
-  const pesertaMap = new Map();
-  for (const peserta of pesertaList) {
-    pesertaMap.set(peserta.email, { ...peserta });
-  }
-
-  return pesertaMap;
-};
-
-const getPesertaByClass = (pesertaList = [], className = "") => {
-  const result = [];
-  for (const { id, name, email, class: pesertaClass, score } of pesertaList) {
-    if (pesertaClass === className) {
-      result.push({ id, name, email, class: pesertaClass, score });
-    }
-  }
-
-  return result;
-};
-
-const calculateAverageScore = (pesertaList = []) => {
-  if (pesertaList.length === 0) return 0;
-  const totalScore = pesertaList.reduce((sum, { score }) => sum + score, 0);
-  return Math.round((totalScore / pesertaList.length) * 100) / 100;
-};
-
-const getUniquePeserta = (pesertaList = []) => {
-  const pesertaMap = createPesertaMap(pesertaList);
-  return [...pesertaMap.values()];
-};
-
-class PesertaValidator {
-  static PASSING_SCORE = 80;
-
-  static STATUS = ["LULUS", "TIDAK LULUS"];
-
-  static getStatus = (score = 0) =>
-    score >= PesertaValidator.PASSING_SCORE ? "LULUS" : "TIDAK LULUS";
-
-  static isValidStatus = (status) => PesertaValidator.STATUS.includes(status);
-
-  constructor(minScore = 60, maxScore = 100) {
-    this.minScore = minScore;
-    this.maxScore = maxScore;
-  }
-
-  isValidScore = (score) => {
-    return score >= this.minScore && score <= this.maxScore;
-  };
-
-  formatResult = (name, score) => {
-    const status = this.isValidScore(score) ? "SESUAI STANDAR" : "TIDAK SESUAI";
-    return `${name} mendapat score ${score} - ${status}`;
-  };
-
-  getValidationDetails = (score) => {
-    return {
-      score,
-      isValid: this.isValidScore(score),
-      minScore: this.minScore,
-      maxScore: this.maxScore,
-      message: this.isValidScore(score)
-        ? `Score dalam rentang ${this.minScore}-${this.maxScore}`
-        : `Score di luar rentang ${this.minScore}-${this.maxScore}`
-    };
-  };
-
-  validateBatch = (pesertaList = []) => {
-    const validCount = pesertaList.filter(({ score }) => this.isValidScore(score)).length;
-    const invalidCount = pesertaList.length - validCount;
-
-    return {
-      total: pesertaList.length,
-      valid: validCount,
-      invalid: invalidCount,
-      validPercentage: pesertaList.length > 0
-        ? Math.round((validCount / pesertaList.length) * 100)
-        : 0
-    };
-  };
-}
-
-const createPassingValidator = () => {
-  return new PesertaValidator(PesertaValidator.PASSING_SCORE, 100);
-};
-
-const createLenientValidator = () => {
-  return new PesertaValidator(60, 100);
-};
-
 const uniquePeserta = getUniquePeserta(rawPeserta);
-const defaultValidator = new PesertaValidator();
-const passingValidator = createPassingValidator();
-const lenientValidator = createLenientValidator();
-console.log(`Nilai 78 dalam rentang default: ${defaultValidator.isValidScore(78)}`);
-console.log(`Status kelulusan nilai 78: ${PesertaValidator.getStatus(78)}`);
-console.log(`Nilai 78 dalam rentang passing: ${passingValidator.isValidScore(78)}`);
-console.log(`Nilai 78 dalam rentang lenient: ${lenientValidator.isValidScore(78)}`);
-console.log(`Status LULUS sah: ${PesertaValidator.isValidStatus("LULUS")}`);
-console.log(`Status lulus sah: ${PesertaValidator.isValidStatus("lulus")}`);
-console.log(passingValidator.formatResult("Milea Kusuma", 78));
-console.log(passingValidator.getValidationDetails(78).message);
-console.log(JSON.stringify(passingValidator.validateBatch(uniquePeserta)));
+console.log(`Email unik: ${getUniqueEmails(rawPeserta).length}`);
+console.log(`Nilai terakhir Aditya: ${createPesertaMap(rawPeserta).get("aditya@brainmatics.com").score}`);
+console.log(formatPesertaList(uniquePeserta));
+console.log(`Rata-rata: ${calculateAverageScore(uniquePeserta)}`);
+console.log(`Peserta React: ${getPesertaByClass(uniquePeserta, "React Basics").length}`);
+console.log(displayPeserta("Milea", 78, "lulus"));
+console.log(createPesertaSummary(uniquePeserta[0]));
+console.log(createDetailedReport(uniquePeserta[0]));
+console.log(`Batas lulus: ${PesertaValidator.PASSING_SCORE}`);
+console.log(`Valid passing: ${createPassingValidator().validateBatch(uniquePeserta).valid}`);
+console.log(`Valid lenient: ${createLenientValidator().validateBatch(uniquePeserta).valid}`);
```

</details>

Kode lengkap `main.js` setelah perubahan:

<!-- write: main.js -->
```javascript
import {
  getUniqueEmails, createPesertaMap, getUniquePeserta,
  getPesertaByClass, calculateAverageScore
} from "./utils/pesertaProcessor.js";
import {
  PesertaValidator, createPassingValidator, createLenientValidator
} from "./utils/pesertaValidator.js";
import {
  displayPeserta, createPesertaSummary, formatPesertaList, createDetailedReport
} from "./utils/pesertaFormatter.js";

const rawPeserta = [
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
];

const uniquePeserta = getUniquePeserta(rawPeserta);
console.log(`Email unik: ${getUniqueEmails(rawPeserta).length}`);
console.log(`Nilai terakhir Aditya: ${createPesertaMap(rawPeserta).get("aditya@brainmatics.com").score}`);
console.log(formatPesertaList(uniquePeserta));
console.log(`Rata-rata: ${calculateAverageScore(uniquePeserta)}`);
console.log(`Peserta React: ${getPesertaByClass(uniquePeserta, "React Basics").length}`);
console.log(displayPeserta("Milea", 78, "lulus"));
console.log(createPesertaSummary(uniquePeserta[0]));
console.log(createDetailedReport(uniquePeserta[0]));
console.log(`Batas lulus: ${PesertaValidator.PASSING_SCORE}`);
console.log(`Valid passing: ${createPassingValidator().validateBatch(uniquePeserta).valid}`);
console.log(`Valid lenient: ${createLenientValidator().validateBatch(uniquePeserta).valid}`);
```

Jalankan dari root repository:

```bash
node latihan/proyek/main.js
```

<!-- expected: main.js -->
```text
Email unik: 4
Nilai terakhir Aditya: 88
1. Nama: Aditya Prayoga, Score: 88, Status: LULUS
2. Nama: Zaim Fauzan, Score: 94, Status: LULUS
3. Nama: Milea Kusuma, Score: 78, Status: TIDAK LULUS
4. Nama: Pratama Wijaya, Score: 95, Status: LULUS
Rata-rata: 88.75
Peserta React: 2
Nama: Milea, Score: 78, Status: TIDAK LULUS
📚 Aditya Prayoga - Class: JavaScript Fundamentals - Score: 88

╔═══════════════════════════════════════╗
  ID       : 103
  Nama     : Aditya Prayoga
  Email    : aditya@brainmatics.com
  Kelas    : JavaScript Fundamentals
  Score    : 88
  Status   : ✅ LULUS
╚═══════════════════════════════════════╝
Batas lulus: 80
Valid passing: 3
Valid lenient: 4
```

## Penjelasan dan kesalahan umum

`export` menyediakan fungsi ke file lain dan `import` memakainya. Jalur `./utils/...` relatif terhadap file pemanggil, bukan terminal. Formatter mengimpor validator agar aturan kelulusan terpusat. `peserta ?? {}` memilih object kosong hanya untuk null/undefined; nilai 0 tetap dipertahankan. Ini pengenalan singkat nullish coalescing; penggunaan data hilang dipraktikkan lagi di tahap 09.

Sertakan ekstensi `.js` pada import Node.js. Jangan menyisakan definisi fungsi lama bersama import dengan nama sama. Semua fungsi formatter disediakan, termasuk laporan rinci yang diawali baris kosong.

## Tantangan mandiri

Panggil formatter dengan status huruf kecil, nilai 0, object null, dan array kosong untuk memeriksa fallback.

Buat file terpisah `latihan/proyek/tantangan-08.js`. Coba sendiri sebelum membuka penyelesaian. File ini tidak mengubah `main.js` atau data untuk tahap berikutnya.

<details>
<summary>Lihat penyelesaian tantangan</summary>


<!-- challenge: tantangan-08.js -->
```javascript
import { displayPeserta, createPesertaSummary, createDetailedReport, formatPesertaList } from "./utils/pesertaFormatter.js";
console.log(displayPeserta("Rina", 0, "lulus"));
console.log(createPesertaSummary(null));
console.log(formatPesertaList());
console.log(createDetailedReport(null));
```

Jalankan dari root repository:

```bash
node latihan/proyek/tantangan-08.js
```

<!-- challenge-output: tantangan-08.js -->
```text
Nama: Rina, Score: 0, Status: TIDAK LULUS
📚 Unknown - Class: N/A - Score: 0
Tidak ada peserta.

╔═══════════════════════════════════════╗
  ID       : 0
  Nama     : Unknown
  Email    : N/A
  Kelas    : N/A
  Score    : 0
  Status   : ❌ TIDAK LULUS
╚═══════════════════════════════════════╝
```

Label lulus tidak termasuk daftar status sah sehingga formatter menghitung ulang TIDAK LULUS untuk nilai 0. Null menghasilkan properti default, sedangkan daftar kosong menghasilkan pesan Tidak ada peserta.

</details>

## Kode lengkap akhir tahap

Versi lengkap processor ada pada langkah 1, validator pada langkah 2, formatter pada langkah 4, dan main pada langkah 5. `module.js` terakhir ada pada langkah 4 dan tidak menjadi dependency aplikasi. `package.json` tetap memakai versi tahap 00.

## Checkpoint

- [ ] Program berjalan tanpa error dan cocok dengan output di atas.
- [ ] Tantangan sudah dijalankan di file terpisah.
- [ ] Aplikasi berjalan melalui module sendiri dengan seluruh fungsi processor, validator, dan formatter tersedia.
- [ ] Bisa menjelaskan setidaknya satu baris kode tanpa membaca panduan.

[← Tahap 07](../07-class-validator/README.md) · [Tahap 09 →](../09-async-loader/README.md) · [Panduan instruktur](../../instructor.md)
