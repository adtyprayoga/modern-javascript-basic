# 01. Data peserta, const, dan let

## Hasil dan prasyarat

Menyimpan enam entri tes dan menemukan dua entri milik peserta yang sama.

Selesaikan tahap 00. `package.json` tetap digunakan sepanjang praktik.

Kerjakan semua file di `latihan/proyek/`. Jalankan semua perintah terminal dari **root repository**, tempat README utama berada. Ketik kode sendiri, prediksi hasil, lalu jalankan. Ganti seluruh isi file sesuai nama yang disebut sebelum blok kode.

Pada blok `diff`, baris `-` menunjukkan kode sebelum perubahan dan baris `+` menunjukkan kode sesudah perubahan. Gunakan blok kode lengkap setelahnya untuk mengganti isi file.

## 1. Siapkan perubahan

Ganti seluruh `main.js` dengan data enam entri dan penghitung berikut.

## 2. Tulis program

Jalankan program dan cari dua nilai milik Aditya.

Perubahan pada `main.js`:

```diff
--- sebelum/main.js
+++ sesudah/main.js
@@ -1 +1,50 @@
-console.log("Mulai membangun Sistem Manajemen Peserta Training");
+const rawPeserta = [
+  {
+    "id": 101,
+    "name": "Aditya Prayoga",
+    "email": "aditya@brainmatics.com",
+    "class": "JavaScript Fundamentals",
+    "score": 85
+  },
+  {
+    "id": 102,
+    "name": "Zaim Fauzan",
+    "email": "zaim@brainmatics.com",
+    "class": "React Basics",
+    "score": 92
+  },
+  {
+    "id": 103,
+    "name": "Aditya Prayoga",
+    "email": "aditya@brainmatics.com",
+    "class": "JavaScript Fundamentals",
+    "score": 88
+  },
+  {
+    "id": 104,
+    "name": "Milea Kusuma",
+    "email": "milea@brainmatics.com",
+    "class": "JavaScript Fundamentals",
+    "score": 78
+  },
+  {
+    "id": 105,
+    "name": "Pratama Wijaya",
+    "email": "pratama@brainmatics.com",
+    "class": "React Basics",
+    "score": 95
+  },
+  {
+    "id": 106,
+    "name": "Zaim Fauzan",
+    "email": "zaim@brainmatics.com",
+    "class": "React Basics",
+    "score": 94
+  }
+];
+
+let jumlahEntri = 0;
+jumlahEntri = rawPeserta.length;
+console.log(`Jumlah entri tes: ${jumlahEntri}`);
+console.log(`Entri pertama: ${rawPeserta[0].name}, nilai ${rawPeserta[0].score}`);
+console.log(`Tes berikutnya orang yang sama: ${rawPeserta[2].name}, nilai ${rawPeserta[2].score}`);
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

let jumlahEntri = 0;
jumlahEntri = rawPeserta.length;
console.log(`Jumlah entri tes: ${jumlahEntri}`);
console.log(`Entri pertama: ${rawPeserta[0].name}, nilai ${rawPeserta[0].score}`);
console.log(`Tes berikutnya orang yang sama: ${rawPeserta[2].name}, nilai ${rawPeserta[2].score}`);
```

## 3. Jalankan dan periksa

Sebelum menjalankan, sebutkan hasil yang kamu perkirakan.

```bash
node latihan/proyek/main.js
```

<!-- expected: main.js -->
```text
Jumlah entri tes: 6
Entri pertama: Aditya Prayoga, nilai 85
Tes berikutnya orang yang sama: Aditya Prayoga, nilai 88
```

## Penjelasan dan kesalahan umum

Array menampung urutan entri; object menyimpan satu entri. `const` mencegah penggantian referensi array, tetapi isi array tetap dapat diubah. `let` dipakai ketika nilai penghitung diganti. Nama properti `class` sah pada object.

Jangan menambahkan tanda kutip pada nilai angka. Nama properti dan email harus sama dengan contoh karena dipakai pada tahap berikutnya.

## Tantangan mandiri

Buat object Rina bernilai 79 dan penghitung tes dari 1 menjadi 2. Tampilkan satu baris ringkasan.

Buat file terpisah `latihan/proyek/tantangan-01.js`. Coba sendiri sebelum membuka penyelesaian. File ini tidak mengubah `main.js` atau data untuk tahap berikutnya.

<details>
<summary>Lihat penyelesaian tantangan</summary>


<!-- challenge: tantangan-01.js -->
```javascript
const peserta = { name: "Rina Sari", score: 79 };
let jumlahTes = 1;
jumlahTes += 1;
console.log(`${peserta.name}: ${jumlahTes} tes, nilai ${peserta.score}`);
```

Jalankan dari root repository:

```bash
node latihan/proyek/tantangan-01.js
```

<!-- challenge-output: tantangan-01.js -->
```text
Rina Sari: 2 tes, nilai 79
```

`+= 1` menambah penghitung dari 1 menjadi 2. Object tetap menyimpan nama Rina dan nilai 79; template literal menggabungkan nilainya.

</details>

## Kode lengkap akhir tahap

Seluruh isi file yang berubah sudah ditampilkan pada bagian 1–2 di atas. `package.json` tetap memakai versi tahap 00. `main.js` pada bagian 2 adalah kondisi lengkap program saat ini.

## Checkpoint

- [ ] Program berjalan tanpa error dan cocok dengan output di atas.
- [ ] Tantangan sudah dijalankan di file terpisah.
- [ ] Bedakan enam entri tes dengan jumlah orang; jangan menghapus duplikasi sekarang.
- [ ] Bisa menjelaskan setidaknya satu baris kode tanpa membaca panduan.

[← Tahap 00](../00-persiapan/README.md) · [Tahap 02 →](../02-function-dan-output/README.md) · [Panduan instruktur](../../instructor.md)
