# 06. Filter dan statistik

## Hasil dan prasyarat

Menyaring peserta berdasarkan kelas dan menghitung rata-rata dari peserta unik.

Selesaikan tahap 05. Statistik menggunakan peserta unik, bukan enam entri riwayat.

Kerjakan semua file di `latihan/proyek/`. Jalankan semua perintah terminal dari **root repository**, tempat README utama berada. Ketik kode sendiri, prediksi hasil, lalu jalankan. Ganti seluruh isi file sesuai nama yang disebut sebelum blok kode.

Pada blok `diff`, baris `-` menunjukkan kode sebelum perubahan dan baris `+` menunjukkan kode sesudah perubahan. Gunakan blok kode lengkap setelahnya untuk mengganti isi file.

## 1. Siapkan perubahan

Ganti seluruh `main.js`; tambahkan pemilihan kelas dan perhitungan rata-rata.

## 2. Tulis program

Jalankan lalu bandingkan rata-rata seluruh peserta dengan kelas JavaScript.

Perubahan pada `main.js`:

```diff
--- sebelum/main.js
+++ sesudah/main.js
@@ -63,17 +63,35 @@
     pesertaMap.set(peserta.email, { ...peserta });
   }
+
   return pesertaMap;
 };

-const getUniquePeserta = (pesertaList = []) => {
-  return [...createPesertaMap(pesertaList).values()];
+const getPesertaByClass = (pesertaList = [], className = "") => {
+  const result = [];
+  for (const { id, name, email, class: pesertaClass, score } of pesertaList) {
+    if (pesertaClass === className) {
+      result.push({ id, name, email, class: pesertaClass, score });
+    }
+  }
+
+  return result;
 };

-console.log(`Jumlah entri: ${rawPeserta.length}`);
-console.log(`Email unik: ${getUniqueEmails(rawPeserta).length}`);
-const pesertaMap = createPesertaMap(rawPeserta);
-console.log(`Nilai terakhir Aditya: ${pesertaMap.get("aditya@brainmatics.com").score}`);
-console.log(`Nilai terakhir Zaim: ${pesertaMap.get("zaim@brainmatics.com").score}`);
-for (const { name, score } of getUniquePeserta(rawPeserta)) {
-  console.log(displayPeserta(name, score));
-}
+const calculateAverageScore = (pesertaList = []) => {
+  if (pesertaList.length === 0) return 0;
+  const totalScore = pesertaList.reduce((sum, { score }) => sum + score, 0);
+  return Math.round((totalScore / pesertaList.length) * 100) / 100;
+};
+
+const getUniquePeserta = (pesertaList = []) => {
+  const pesertaMap = createPesertaMap(pesertaList);
+  return [...pesertaMap.values()];
+};
+
+const uniquePeserta = getUniquePeserta(rawPeserta);
+const jsPeserta = getPesertaByClass(uniquePeserta, "JavaScript Fundamentals");
+console.log(`Peserta JavaScript: ${jsPeserta.map(({ name }) => name).join(", ")}`);
+console.log(`Jumlah lulus: ${uniquePeserta.filter(({ score }) => score >= 80).length}`);
+console.log(`Rata-rata semua peserta unik: ${calculateAverageScore(uniquePeserta)}`);
+console.log(`Rata-rata JavaScript: ${calculateAverageScore(jsPeserta)}`);
+console.log(`Rata-rata daftar kosong: ${calculateAverageScore()}`);
```

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

const getStatus = (score = 0) => {
  if (score >= 80) return "LULUS";
  return "TIDAK LULUS";
};

const displayPeserta = (name = "Unknown", score = 0, status = getStatus(score)) => {
  return `Nama: ${name}, Score: ${score}, Status: ${status}`;
};

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

const uniquePeserta = getUniquePeserta(rawPeserta);
const jsPeserta = getPesertaByClass(uniquePeserta, "JavaScript Fundamentals");
console.log(`Peserta JavaScript: ${jsPeserta.map(({ name }) => name).join(", ")}`);
console.log(`Jumlah lulus: ${uniquePeserta.filter(({ score }) => score >= 80).length}`);
console.log(`Rata-rata semua peserta unik: ${calculateAverageScore(uniquePeserta)}`);
console.log(`Rata-rata JavaScript: ${calculateAverageScore(jsPeserta)}`);
console.log(`Rata-rata daftar kosong: ${calculateAverageScore()}`);
```

## 3. Jalankan dan periksa

Sebelum menjalankan, sebutkan hasil yang kamu perkirakan.

```bash
node latihan/proyek/main.js
```

<!-- expected: main.js -->
```text
Peserta JavaScript: Aditya Prayoga, Milea Kusuma
Jumlah lulus: 3
Rata-rata semua peserta unik: 88.75
Rata-rata JavaScript: 83
Rata-rata daftar kosong: 0
```

## Penjelasan dan kesalahan umum

`map` mengubah bentuk setiap elemen, `filter` memilih elemen, dan `reduce` mengakumulasi nilai. Fungsi pemilih kelas menggunakan loop dan destructuring agar kontraknya sama dengan aplikasi akhir. Penjumlahan dimulai dari 0. Array kosong menghasilkan 0 sebelum pembagian. Pembulatan dilakukan sampai dua desimal.

Jangan membagi dengan panjang array kosong atau menghitung rata-rata riwayat tes ketika yang diminta adalah peserta unik. Kelas dicocokkan persis, termasuk huruf besar.

## Tantangan mandiri

Hitung rata-rata nilai 0 dan 80, cari kelas Python yang tidak ada, dan hitung rata-rata daftar kosong.

Buat file terpisah `latihan/proyek/tantangan-06.js`. Coba sendiri sebelum membuka penyelesaian. File ini tidak mengubah `main.js` atau data untuk tahap berikutnya.

<details>
<summary>Lihat penyelesaian tantangan</summary>


<!-- challenge: tantangan-06.js -->
```javascript
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

const daftar = [{ id: 1, name: "Rina", email: "r@example.com", class: "JavaScript", score: 0 }, { id: 2, name: "Budi", email: "b@example.com", class: "JavaScript", score: 80 }];
console.log(`Rata-rata: ${calculateAverageScore(daftar)}`);
console.log(`Kelas tidak ditemukan: ${getPesertaByClass(daftar, "Python").length}`);
console.log(`Daftar kosong: ${calculateAverageScore([])}`);
```

Jalankan dari root repository:

```bash
node latihan/proyek/tantangan-06.js
```

<!-- challenge-output: tantangan-06.js -->
```text
Rata-rata: 40
Kelas tidak ditemukan: 0
Daftar kosong: 0
```

Penjumlahan 0 dan 80 menghasilkan 80; pembagian dengan dua menghasilkan 40. Nilai 0 tetap dihitung. Kelas tak ditemukan menghasilkan array kosong.

</details>

## Kode lengkap akhir tahap

Seluruh isi file yang berubah sudah ditampilkan pada bagian 1–2 di atas. `package.json` tetap memakai versi tahap 00. `main.js` pada bagian 2 adalah kondisi lengkap program saat ini.

## Checkpoint

- [ ] Program berjalan tanpa error dan cocok dengan output di atas.
- [ ] Tantangan sudah dijalankan di file terpisah.
- [ ] Rata-rata peserta unik 88.75 dan kelas JavaScript 83.
- [ ] Bisa menjelaskan setidaknya satu baris kode tanpa membaca panduan.

[← Tahap 05](../05-set-map-nilai-terakhir/README.md) · [Tahap 07 →](../07-class-validator/README.md) · [Panduan instruktur](../../instructor.md)
