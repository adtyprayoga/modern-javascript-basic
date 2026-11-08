# 02. Fungsi dan output

## Hasil dan prasyarat

Menentukan kelulusan dan menghasilkan kalimat dengan template literal.

Selesaikan tahap 01. Pertahankan data enam entri pada kode pengganti.

Kerjakan semua file di `latihan/proyek/`. Jalankan semua perintah terminal dari **root repository**, tempat README utama berada. Ketik kode sendiri, prediksi hasil, lalu jalankan. Ganti seluruh isi file sesuai nama yang disebut sebelum blok kode.

Pada blok `diff`, baris `-` menunjukkan kode sebelum perubahan dan baris `+` menunjukkan kode sesudah perubahan. Gunakan blok kode lengkap setelahnya untuk mengganti isi file.

## 1. Siapkan perubahan

Ganti seluruh `main.js` dengan versi berikut; fungsi menerima input melalui parameter.

## 2. Tulis program

Jalankan dan bandingkan nilai 79, 80, serta 82.

Perubahan pada `main.js`:

```diff
--- sebelum/main.js
+++ sesudah/main.js
@@ -44,7 +44,16 @@
 ];

-let jumlahEntri = 0;
-jumlahEntri = rawPeserta.length;
-console.log(`Jumlah entri tes: ${jumlahEntri}`);
-console.log(`Entri pertama: ${rawPeserta[0].name}, nilai ${rawPeserta[0].score}`);
-console.log(`Tes berikutnya orang yang sama: ${rawPeserta[2].name}, nilai ${rawPeserta[2].score}`);
+const getStatus = (score = 0) => {
+  if (score >= 80) return "LULUS";
+  return "TIDAK LULUS";
+};
+
+const displayPeserta = (name = "Unknown", score = 0, status = getStatus(score)) => {
+  return `Nama: ${name}, Score: ${score}, Status: ${status}`;
+};
+
+console.log(displayPeserta(rawPeserta[0].name, rawPeserta[0].score));
+for (const score of [79, 80, 82]) {
+  console.log(`Nilai ${score}: ${getStatus(score)}`);
+}
+console.log(displayPeserta());
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

console.log(displayPeserta(rawPeserta[0].name, rawPeserta[0].score));
for (const score of [79, 80, 82]) {
  console.log(`Nilai ${score}: ${getStatus(score)}`);
}
console.log(displayPeserta());
```

## 3. Jalankan dan periksa

Sebelum menjalankan, sebutkan hasil yang kamu perkirakan.

```bash
node latihan/proyek/main.js
```

<!-- expected: main.js -->
```text
Nama: Aditya Prayoga, Score: 85, Status: LULUS
Nilai 79: TIDAK LULUS
Nilai 80: LULUS
Nilai 82: LULUS
Nama: Unknown, Score: 0, Status: TIDAK LULUS
```

## Penjelasan dan kesalahan umum

Arrow function menyimpan proses yang dapat dipanggil ulang. `return` menyerahkan hasil; `console.log` menampilkannya. Default parameter berlaku saat argumen tidak diberikan atau `undefined`. Backtick memungkinkan `${...}`. Loop kecil menguji tiga input; pembahasan loop lengkap ada di tahap 04.

Tanpa `return`, hasil pemanggilan fungsi adalah `undefined`. Gunakan `>=`, sehingga nilai tepat 80 termasuk lulus.

## Tantangan mandiri

Tampilkan hasil Rina untuk 79 dan 80, lalu panggil formatter tanpa argumen.

Buat file terpisah `latihan/proyek/tantangan-02.js`. Coba sendiri sebelum membuka penyelesaian. File ini tidak mengubah `main.js` atau data untuk tahap berikutnya.

<details>
<summary>Lihat penyelesaian tantangan</summary>


<!-- challenge: tantangan-02.js -->
```javascript
const getStatus = (score = 0) => {
  if (score >= 80) return "LULUS";
  return "TIDAK LULUS";
};

const displayPeserta = (name = "Unknown", score = 0, status = getStatus(score)) => {
  return `Nama: ${name}, Score: ${score}, Status: ${status}`;
};

console.log(displayPeserta("Rina", 79));
console.log(displayPeserta("Rina", 80));
console.log(displayPeserta());
```

Jalankan dari root repository:

```bash
node latihan/proyek/tantangan-02.js
```

<!-- challenge-output: tantangan-02.js -->
```text
Nama: Rina, Score: 79, Status: TIDAK LULUS
Nama: Rina, Score: 80, Status: LULUS
Nama: Unknown, Score: 0, Status: TIDAK LULUS
```

Nilai 79 belum mencapai batas, sedangkan 80 tepat pada batas lulus. Tanpa argumen, nama menjadi Unknown dan nilai 0 menghasilkan TIDAK LULUS.

</details>

## Kode lengkap akhir tahap

Seluruh isi file yang berubah sudah ditampilkan pada bagian 1–2 di atas. `package.json` tetap memakai versi tahap 00. `main.js` pada bagian 2 adalah kondisi lengkap program saat ini.

## Checkpoint

- [ ] Program berjalan tanpa error dan cocok dengan output di atas.
- [ ] Tantangan sudah dijalankan di file terpisah.
- [ ] Peserta bisa menjelaskan hasil pada batas 80 dan default nilai 0.
- [ ] Bisa menjelaskan setidaknya satu baris kode tanpa membaca panduan.

[← Tahap 01](../01-data-const-let/README.md) · [Tahap 03 →](../03-destructuring-rest-spread/README.md) · [Panduan instruktur](../../instructor.md)
