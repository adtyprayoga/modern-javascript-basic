# 07. Class validator

## Hasil dan prasyarat

Menyatukan aturan kelulusan dan pemeriksaan rentang nilai dalam class.

Selesaikan tahap 06. Fungsi status sementara diganti aturan terpusat pada class.

Kerjakan semua file di `latihan/proyek/`. Jalankan semua perintah terminal dari **root repository**, tempat README utama berada. Ketik kode sendiri, prediksi hasil, lalu jalankan. Ganti seluruh isi file sesuai nama yang disebut sebelum blok kode.


Buat file percobaan `latihan/proyek/validator.js`. File ini berdiri sendiri dan belum diimpor oleh `main.js`. Kita mengembangkan class dalam empat langkah kecil, kemudian menempatkan class lengkap ke `main.js`. Di setiap langkah, **ganti seluruh isi** file percobaan; program utama tahap 06 tetap tersedia sampai integrasi akhir.

Pada blok `diff`, baris `-` menunjukkan kode sebelum perubahan dan baris `+` menunjukkan kode sesudah perubahan. Gunakan blok kode lengkap setelahnya untuk mengganti isi file.

## 1. Buat instance dan periksa rentang

`class` mendefinisikan bentuk validator. `new` membuat instance dan menjalankan constructor. Parameter default 60 dan 100 dipakai ketika argumen tidak diberikan. `this.minScore` menyimpan batas pada instance yang sedang dipakai. Method `isValidScore(score)` menerima satu nilai dan mengembalikan boolean; operator `&&` meminta kedua batas terpenuhi. Dua instance dapat menyimpan batas berbeda.

Ganti seluruh `validator.js`:

File baru: `validator.js`. Berikut isi lengkapnya.

<!-- write: validator.js -->
```javascript
class PesertaValidator {
  constructor(minScore = 60, maxScore = 100) {
    this.minScore = minScore;
    this.maxScore = maxScore;
  }

  isValidScore = (score) => {
    return score >= this.minScore && score <= this.maxScore;
  };
}

const standar = new PesertaValidator();
const ketat = new PesertaValidator(80, 100);
console.log(`Default: ${standar.minScore}-${standar.maxScore}`);
console.log(`Nilai 78, default: ${standar.isValidScore(78)}`);
console.log(`Nilai 78, ketat: ${ketat.isValidScore(78)}`);
```

Jalankan dari root repository:

```bash
node latihan/proyek/validator.js
```

<!-- expected: validator.js -->
```text
Default: 60-100
Nilai 78, default: true
Nilai 78, ketat: false
```

## 2. Tambahkan aturan milik class

Tambahkan static field dan static method ke class. `PesertaValidator.getStatus(78)` memanggil aturan bersama tanpa `new`; method instance tetap dipanggil melalui object `standar`. Default `score = 0` menangani pemanggilan tanpa argumen. `includes` membandingkan label secara persis sehingga huruf besar berpengaruh. Nilai 78 dapat berada dalam rentang instance default tetapi tetap tidak lulus.

Ganti seluruh `validator.js`:

Perubahan pada `validator.js`:

```diff
--- sebelum/validator.js
+++ sesudah/validator.js
@@ -1,3 +1,9 @@
 class PesertaValidator {
+  static PASSING_SCORE = 80;
+  static STATUS = ["LULUS", "TIDAK LULUS"];
+  static getStatus = (score = 0) =>
+    score >= PesertaValidator.PASSING_SCORE ? "LULUS" : "TIDAK LULUS";
+  static isValidStatus = (status) => PesertaValidator.STATUS.includes(status);
+
   constructor(minScore = 60, maxScore = 100) {
     this.minScore = minScore;
@@ -11,6 +17,9 @@

 const standar = new PesertaValidator();
-const ketat = new PesertaValidator(80, 100);
-console.log(`Default: ${standar.minScore}-${standar.maxScore}`);
-console.log(`Nilai 78, default: ${standar.isValidScore(78)}`);
-console.log(`Nilai 78, ketat: ${ketat.isValidScore(78)}`);
+console.log(`Batas lulus: ${PesertaValidator.PASSING_SCORE}`);
+console.log(`Rentang default menerima 78: ${standar.isValidScore(78)}`);
+console.log(`Status 78: ${PesertaValidator.getStatus(78)}`);
+console.log(`Status 80: ${PesertaValidator.getStatus(80)}`);
+console.log(`Tanpa nilai: ${PesertaValidator.getStatus()}`);
+console.log(`Label LULUS: ${PesertaValidator.isValidStatus("LULUS")}`);
+console.log(`Label lulus: ${PesertaValidator.isValidStatus("lulus")}`);
```

Kode lengkap `validator.js` setelah perubahan:

<!-- write: validator.js -->
```javascript
class PesertaValidator {
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
}

const standar = new PesertaValidator();
console.log(`Batas lulus: ${PesertaValidator.PASSING_SCORE}`);
console.log(`Rentang default menerima 78: ${standar.isValidScore(78)}`);
console.log(`Status 78: ${PesertaValidator.getStatus(78)}`);
console.log(`Status 80: ${PesertaValidator.getStatus(80)}`);
console.log(`Tanpa nilai: ${PesertaValidator.getStatus()}`);
console.log(`Label LULUS: ${PesertaValidator.isValidStatus("LULUS")}`);
console.log(`Label lulus: ${PesertaValidator.isValidStatus("lulus")}`);
```

Jalankan dari root repository:

```bash
node latihan/proyek/validator.js
```

<!-- expected: validator.js -->
```text
Batas lulus: 80
Rentang default menerima 78: true
Status 78: TIDAK LULUS
Status 80: LULUS
Tanpa nilai: TIDAK LULUS
Label LULUS: true
Label lulus: false
```

## 3. Buat kalimat dan rincian validasi

Method `formatResult(name, score)` menerima dua argumen dan mengembalikan string. Method `getValidationDetails(score)` mengembalikan object, sehingga pemanggil dapat memilih `message` atau `isValid`. Keduanya memakai `this.isValidScore` agar mengikuti rentang instance. Operator ternary memilih hasil saat kondisi benar dan salah. Nama arrow method merupakan properti instance; pemakaian `this` tetap menunjuk instance tersebut.

Ganti seluruh `validator.js`:

Perubahan pada `validator.js`:

```diff
--- sebelum/validator.js
+++ sesudah/validator.js
@@ -14,12 +14,27 @@
     return score >= this.minScore && score <= this.maxScore;
   };
+
+  formatResult = (name, score) => {
+    const status = this.isValidScore(score) ? "SESUAI STANDAR" : "TIDAK SESUAI";
+    return `${name} mendapat score ${score} - ${status}`;
+  };
+
+  getValidationDetails = (score) => {
+    return {
+      score,
+      isValid: this.isValidScore(score),
+      minScore: this.minScore,
+      maxScore: this.maxScore,
+      message: this.isValidScore(score)
+        ? `Score dalam rentang ${this.minScore}-${this.maxScore}`
+        : `Score di luar rentang ${this.minScore}-${this.maxScore}`
+    };
+  };
 }

-const standar = new PesertaValidator();
-console.log(`Batas lulus: ${PesertaValidator.PASSING_SCORE}`);
-console.log(`Rentang default menerima 78: ${standar.isValidScore(78)}`);
-console.log(`Status 78: ${PesertaValidator.getStatus(78)}`);
-console.log(`Status 80: ${PesertaValidator.getStatus(80)}`);
-console.log(`Tanpa nilai: ${PesertaValidator.getStatus()}`);
-console.log(`Label LULUS: ${PesertaValidator.isValidStatus("LULUS")}`);
-console.log(`Label lulus: ${PesertaValidator.isValidStatus("lulus")}`);
+const validator = new PesertaValidator(80, 100);
+console.log(validator.formatResult("Milea", 78));
+console.log(validator.formatResult("Aditya", 88));
+const details = validator.getValidationDetails(78);
+console.log(details.message);
+console.log(`Diterima: ${details.isValid}`);
```

Kode lengkap `validator.js` setelah perubahan:

<!-- write: validator.js -->
```javascript
class PesertaValidator {
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
}

const validator = new PesertaValidator(80, 100);
console.log(validator.formatResult("Milea", 78));
console.log(validator.formatResult("Aditya", 88));
const details = validator.getValidationDetails(78);
console.log(details.message);
console.log(`Diterima: ${details.isValid}`);
```

Jalankan dari root repository:

```bash
node latihan/proyek/validator.js
```

<!-- expected: validator.js -->
```text
Milea mendapat score 78 - TIDAK SESUAI
Aditya mendapat score 88 - SESUAI STANDAR
Score di luar rentang 80-100
Diterima: false
```

## 4. Validasi batch dan buat factory

`validateBatch` memakai array default kosong, menyaring nilai dalam rentang, lalu menghitung jumlah dan persentase. Pemeriksaan panjang array mencegah pembagian nol. Factory adalah fungsi biasa yang memanggil `new` dengan konfigurasi tertentu; pemanggil cukup memilih validator passing atau lenient. Pada tahap ini rentang passing 80–100 dan lenient 60–100.

Ganti seluruh `validator.js`:

Perubahan pada `validator.js`:

```diff
--- sebelum/validator.js
+++ sesudah/validator.js
@@ -31,10 +31,28 @@
     };
   };
+
+  validateBatch = (pesertaList = []) => {
+    const validCount = pesertaList.filter(({ score }) => this.isValidScore(score)).length;
+    const invalidCount = pesertaList.length - validCount;
+    return {
+      total: pesertaList.length,
+      valid: validCount,
+      invalid: invalidCount,
+      validPercentage: pesertaList.length > 0
+        ? Math.round((validCount / pesertaList.length) * 100)
+        : 0
+    };
+  };
 }

-const validator = new PesertaValidator(80, 100);
-console.log(validator.formatResult("Milea", 78));
-console.log(validator.formatResult("Aditya", 88));
-const details = validator.getValidationDetails(78);
-console.log(details.message);
-console.log(`Diterima: ${details.isValid}`);
+const createPassingValidator = () => {
+  return new PesertaValidator(PesertaValidator.PASSING_SCORE, 100);
+};
+const createLenientValidator = () => {
+  return new PesertaValidator(60, 100);
+};
+
+const daftar = [{ score: 78 }, { score: 88 }];
+console.log(JSON.stringify(createPassingValidator().validateBatch(daftar)));
+console.log(JSON.stringify(createLenientValidator().validateBatch(daftar)));
+console.log(JSON.stringify(createPassingValidator().validateBatch()));
```

Kode lengkap `validator.js` setelah perubahan:

<!-- write: validator.js -->
```javascript
class PesertaValidator {
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

const createPassingValidator = () => {
  return new PesertaValidator(PesertaValidator.PASSING_SCORE, 100);
};
const createLenientValidator = () => {
  return new PesertaValidator(60, 100);
};

const daftar = [{ score: 78 }, { score: 88 }];
console.log(JSON.stringify(createPassingValidator().validateBatch(daftar)));
console.log(JSON.stringify(createLenientValidator().validateBatch(daftar)));
console.log(JSON.stringify(createPassingValidator().validateBatch()));
```

Jalankan dari root repository:

```bash
node latihan/proyek/validator.js
```

<!-- expected: validator.js -->
```text
{"total":2,"valid":1,"invalid":1,"validPercentage":50}
{"total":2,"valid":2,"invalid":0,"validPercentage":100}
{"total":0,"valid":0,"invalid":0,"validPercentage":0}
```

## 5. Gabungkan dengan data peserta

Sekarang ganti seluruh `main.js` dengan versi lengkap berikut. Penggantian ini menghapus fungsi status sementara, mempertahankan processor tahap 06, dan menambahkan class beserta factory. Kode class dari file percobaan disertakan langsung; **tidak perlu mengimpor file validator.js**. Bandingkan class lengkap ini dengan hasil langkah 4.

Perubahan pada `main.js`:

<details>
<summary>Lihat perubahan sebelum dan sesudah pada main.js</summary>

```diff
--- sebelum/main.js
+++ sesudah/main.js
@@ -44,13 +44,4 @@
 ];

-const getStatus = (score = 0) => {
-  if (score >= 80) return "LULUS";
-  return "TIDAK LULUS";
-};
-
-const displayPeserta = (name = "Unknown", score = 0, status = getStatus(score)) => {
-  return `Nama: ${name}, Score: ${score}, Status: ${status}`;
-};
-
 const getUniqueEmails = (pesertaList = []) => {
   const emailSet = new Set(pesertaList.map(p => p.email));
@@ -89,9 +80,74 @@
 };

+class PesertaValidator {
+  static PASSING_SCORE = 80;
+
+  static STATUS = ["LULUS", "TIDAK LULUS"];
+
+  static getStatus = (score = 0) =>
+    score >= PesertaValidator.PASSING_SCORE ? "LULUS" : "TIDAK LULUS";
+
+  static isValidStatus = (status) => PesertaValidator.STATUS.includes(status);
+
+  constructor(minScore = 60, maxScore = 100) {
+    this.minScore = minScore;
+    this.maxScore = maxScore;
+  }
+
+  isValidScore = (score) => {
+    return score >= this.minScore && score <= this.maxScore;
+  };
+
+  formatResult = (name, score) => {
+    const status = this.isValidScore(score) ? "SESUAI STANDAR" : "TIDAK SESUAI";
+    return `${name} mendapat score ${score} - ${status}`;
+  };
+
+  getValidationDetails = (score) => {
+    return {
+      score,
+      isValid: this.isValidScore(score),
+      minScore: this.minScore,
+      maxScore: this.maxScore,
+      message: this.isValidScore(score)
+        ? `Score dalam rentang ${this.minScore}-${this.maxScore}`
+        : `Score di luar rentang ${this.minScore}-${this.maxScore}`
+    };
+  };
+
+  validateBatch = (pesertaList = []) => {
+    const validCount = pesertaList.filter(({ score }) => this.isValidScore(score)).length;
+    const invalidCount = pesertaList.length - validCount;
+
+    return {
+      total: pesertaList.length,
+      valid: validCount,
+      invalid: invalidCount,
+      validPercentage: pesertaList.length > 0
+        ? Math.round((validCount / pesertaList.length) * 100)
+        : 0
+    };
+  };
+}
+
+const createPassingValidator = () => {
+  return new PesertaValidator(PesertaValidator.PASSING_SCORE, 100);
+};
+
+const createLenientValidator = () => {
+  return new PesertaValidator(60, 100);
+};
+
 const uniquePeserta = getUniquePeserta(rawPeserta);
-const jsPeserta = getPesertaByClass(uniquePeserta, "JavaScript Fundamentals");
-console.log(`Peserta JavaScript: ${jsPeserta.map(({ name }) => name).join(", ")}`);
-console.log(`Jumlah lulus: ${uniquePeserta.filter(({ score }) => score >= 80).length}`);
-console.log(`Rata-rata semua peserta unik: ${calculateAverageScore(uniquePeserta)}`);
-console.log(`Rata-rata JavaScript: ${calculateAverageScore(jsPeserta)}`);
-console.log(`Rata-rata daftar kosong: ${calculateAverageScore()}`);
+const defaultValidator = new PesertaValidator();
+const passingValidator = createPassingValidator();
+const lenientValidator = createLenientValidator();
+console.log(`Nilai 78 dalam rentang default: ${defaultValidator.isValidScore(78)}`);
+console.log(`Status kelulusan nilai 78: ${PesertaValidator.getStatus(78)}`);
+console.log(`Nilai 78 dalam rentang passing: ${passingValidator.isValidScore(78)}`);
+console.log(`Nilai 78 dalam rentang lenient: ${lenientValidator.isValidScore(78)}`);
+console.log(`Status LULUS sah: ${PesertaValidator.isValidStatus("LULUS")}`);
+console.log(`Status lulus sah: ${PesertaValidator.isValidStatus("lulus")}`);
+console.log(passingValidator.formatResult("Milea Kusuma", 78));
+console.log(passingValidator.getValidationDetails(78).message);
+console.log(JSON.stringify(passingValidator.validateBatch(uniquePeserta)));
```

</details>

Kode lengkap `main.js` setelah perubahan:

<!-- write: main.js -->
```javascript
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

const getUniqueEmails = (pesertaList = []) => {
  const emailSet = new Set(pesertaList.map(p => p.email));
  return [...emailSet];
};

const createPesertaMap = (pesertaList = []) => {
  const pesertaMap = new Map();
  for (const peserta of pesertaList) {
    pesertaMap.set(peserta.email, { ...peserta });
  }

  return pesertaMap;
};

const getPesertaByClass = (pesertaList = [], className = "") => {
  const result = [];
  for (const { id, name, email, class: pesertaClass, score } of pesertaList) {
    if (pesertaClass === className) {
      result.push({ id, name, email, class: pesertaClass, score });
    }
  }

  return result;
};

const calculateAverageScore = (pesertaList = []) => {
  if (pesertaList.length === 0) return 0;
  const totalScore = pesertaList.reduce((sum, { score }) => sum + score, 0);
  return Math.round((totalScore / pesertaList.length) * 100) / 100;
};

const getUniquePeserta = (pesertaList = []) => {
  const pesertaMap = createPesertaMap(pesertaList);
  return [...pesertaMap.values()];
};

class PesertaValidator {
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

const createPassingValidator = () => {
  return new PesertaValidator(PesertaValidator.PASSING_SCORE, 100);
};

const createLenientValidator = () => {
  return new PesertaValidator(60, 100);
};

const uniquePeserta = getUniquePeserta(rawPeserta);
const defaultValidator = new PesertaValidator();
const passingValidator = createPassingValidator();
const lenientValidator = createLenientValidator();
console.log(`Nilai 78 dalam rentang default: ${defaultValidator.isValidScore(78)}`);
console.log(`Status kelulusan nilai 78: ${PesertaValidator.getStatus(78)}`);
console.log(`Nilai 78 dalam rentang passing: ${passingValidator.isValidScore(78)}`);
console.log(`Nilai 78 dalam rentang lenient: ${lenientValidator.isValidScore(78)}`);
console.log(`Status LULUS sah: ${PesertaValidator.isValidStatus("LULUS")}`);
console.log(`Status lulus sah: ${PesertaValidator.isValidStatus("lulus")}`);
console.log(passingValidator.formatResult("Milea Kusuma", 78));
console.log(passingValidator.getValidationDetails(78).message);
console.log(JSON.stringify(passingValidator.validateBatch(uniquePeserta)));
```

Jalankan dari root repository:

```bash
node latihan/proyek/main.js
```

<!-- expected: main.js -->
```text
Nilai 78 dalam rentang default: true
Status kelulusan nilai 78: TIDAK LULUS
Nilai 78 dalam rentang passing: false
Nilai 78 dalam rentang lenient: true
Status LULUS sah: true
Status lulus sah: false
Milea Kusuma mendapat score 78 - TIDAK SESUAI
Score di luar rentang 80-100
{"total":4,"valid":3,"invalid":1,"validPercentage":75}
```

## Penjelasan dan kesalahan umum

Constructor memberi setiap instance batas minimum dan maksimum. Method instance memakai `this`; static field dan method dipanggil melalui class. Factory mengembalikan instance siap pakai. `includes` memeriksa label secara persis. Rentang default 60–100 memeriksa standar konfigurasi instance, sedangkan kelulusan statis selalu memakai batas 80. `getStatus(101)` tetap LULUS; nilai itu berada di luar rentang validator. Keduanya aturan berbeda.

Jangan menyamakan `new PesertaValidator().isValidScore(78)` dengan kelulusan. Status `lulus` berbeda dari `LULUS`. Class ini mempertahankan perilaku referensi, bukan validasi tipe input lengkap.

## Tantangan mandiri

Uji batas 59, 60, 79, 80, 100, 101 pada validator passing. Bandingkan dengan status dan periksa batch kosong.

Buat file terpisah `latihan/proyek/tantangan-07.js`. Coba sendiri sebelum membuka penyelesaian. File ini tidak mengubah `main.js` atau data untuk tahap berikutnya.

<details>
<summary>Lihat penyelesaian tantangan</summary>


<!-- challenge: tantangan-07.js -->
```javascript
class PesertaValidator {
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

const createPassingValidator = () => {
  return new PesertaValidator(PesertaValidator.PASSING_SCORE, 100);
};

const createLenientValidator = () => {
  return new PesertaValidator(60, 100);
};

const validator = createPassingValidator();
for (const score of [59, 60, 79, 80, 100, 101]) {
  console.log(`${score}: rentang passing=${validator.isValidScore(score)}, status=${PesertaValidator.getStatus(score)}`);
}
console.log(JSON.stringify(validator.validateBatch()));
```

Jalankan dari root repository:

```bash
node latihan/proyek/tantangan-07.js
```

<!-- challenge-output: tantangan-07.js -->
```text
59: rentang passing=false, status=TIDAK LULUS
60: rentang passing=false, status=TIDAK LULUS
79: rentang passing=false, status=TIDAK LULUS
80: rentang passing=true, status=LULUS
100: rentang passing=true, status=LULUS
101: rentang passing=false, status=LULUS
{"total":0,"valid":0,"invalid":0,"validPercentage":0}
```

Validator passing menerima 80 sampai 100. Status kelulusan statis hanya membandingkan dengan 80 sehingga 101 berstatus LULUS, tetapi gagal pemeriksaan rentang. Batch kosong menghasilkan seluruh hitungan dan persentase 0.

</details>

## Kode lengkap akhir tahap

`validator.js` terakhir ada pada langkah 4. `main.js` lengkap ada pada langkah 5; inilah program yang dilanjutkan pada tahap 08. `package.json` tetap memakai versi tahap 00.

## Checkpoint

- [ ] Program berjalan tanpa error dan cocok dengan output di atas.
- [ ] Tantangan sudah dijalankan di file terpisah.
- [ ] Dapat menjelaskan 78 valid di rentang default tetapi tidak lulus.
- [ ] Bisa menjelaskan setidaknya satu baris kode tanpa membaca panduan.

[← Tahap 06](../06-filter-dan-statistik/README.md) · [Tahap 08 →](../08-module-dan-formatter/README.md) · [Panduan instruktur](../../instructor.md)
