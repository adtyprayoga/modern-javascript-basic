# 03. Destructuring, rest, dan spread

## Hasil dan prasyarat

Mengambil properti dan membuat data tes ulang tanpa mengganti nilai pada object awal.

Selesaikan tahap 02. Kode percobaan tahap sebelumnya diganti oleh versi berikut.

Kerjakan semua file di `latihan/proyek/`. Jalankan semua perintah terminal dari **root repository**, tempat README utama berada. Ketik kode sendiri, prediksi hasil, lalu jalankan. Ganti seluruh isi file sesuai nama yang disebut sebelum blok kode.

Pada blok `diff`, baris `-` menunjukkan kode sebelum perubahan dan baris `+` menunjukkan kode sesudah perubahan. Gunakan blok kode lengkap setelahnya untuk mengganti isi file.

## 1. Siapkan perubahan

Ganti seluruh `main.js`. Perhatikan rename `class: className` dan posisi `score` setelah spread.

## 2. Tulis program

Jalankan lalu pastikan nilai awal tetap 85.

Perubahan pada `main.js`:

```diff
--- sebelum/main.js
+++ sesudah/main.js
@@ -53,7 +53,9 @@
 };

-console.log(displayPeserta(rawPeserta[0].name, rawPeserta[0].score));
-for (const score of [79, 80, 82]) {
-  console.log(`Nilai ${score}: ${getStatus(score)}`);
-}
-console.log(displayPeserta());
+const { name, score, class: className } = rawPeserta[0];
+console.log(`${name} mengikuti ${className}, nilai ${score}`);
+const { id, ...tanpaId } = rawPeserta[0];
+const tesUlang = { ...tanpaId, id: 107, score: 79 };
+console.log(`ID awal: ${id}`);
+console.log(displayPeserta(tesUlang.name, tesUlang.score));
+console.log(`Nilai object awal tetap ${rawPeserta[0].score}`);
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

const { name, score, class: className } = rawPeserta[0];
console.log(`${name} mengikuti ${className}, nilai ${score}`);
const { id, ...tanpaId } = rawPeserta[0];
const tesUlang = { ...tanpaId, id: 107, score: 79 };
console.log(`ID awal: ${id}`);
console.log(displayPeserta(tesUlang.name, tesUlang.score));
console.log(`Nilai object awal tetap ${rawPeserta[0].score}`);
```

## 3. Jalankan dan periksa

Sebelum menjalankan, sebutkan hasil yang kamu perkirakan.

```bash
node latihan/proyek/main.js
```

<!-- expected: main.js -->
```text
Aditya Prayoga mengikuti JavaScript Fundamentals, nilai 85
ID awal: 101
Nama: Aditya Prayoga, Score: 79, Status: TIDAK LULUS
Nilai object awal tetap 85
```

## Penjelasan dan kesalahan umum

Destructuring mengambil properti object. Rename memberi nama variabel yang sah untuk properti `class`. Rest mengumpulkan properti tersisa; spread menyalinnya ke object baru. Properti yang ditulis paling akhir menimpa nilai sebelumnya. Salinan ini dangkal, cukup untuk data berisi string dan angka.

`const { class } = object` salah karena `class` adalah kata kunci. `{ score: 79, ...awal }` mengembalikan nilai awal; urutkan spread dahulu.

## Tantangan mandiri

Salin tes Rina dari 90 menjadi 79. Keluarkan ID dari rest, lalu isi ID baru; cetak kedua nilai dan kelas.

Buat file terpisah `latihan/proyek/tantangan-03.js`. Coba sendiri sebelum membuka penyelesaian. File ini tidak mengubah `main.js` atau data untuk tahap berikutnya.

<details>
<summary>Lihat penyelesaian tantangan</summary>


<!-- challenge: tantangan-03.js -->
```javascript
const awal = { id: 1, name: "Rina", class: "JavaScript", score: 90 };
const { id, class: className, ...sisanya } = awal;
const ulang = { ...sisanya, id: 2, class: className, score: 79 };
console.log(`${ulang.name}: awal ${awal.score}, terakhir ${ulang.score}, kelas ${className}`);
```

Jalankan dari root repository:

```bash
node latihan/proyek/tantangan-03.js
```

<!-- challenge-output: tantangan-03.js -->
```text
Rina: awal 90, terakhir 79, kelas JavaScript
```

Rest menyisakan nama dan nilai setelah ID serta kelas diambil. Spread menyalinnya; nilai 79 yang ditulis terakhir menimpa 90 hanya pada salinan.

</details>

## Kode lengkap akhir tahap

Seluruh isi file yang berubah sudah ditampilkan pada bagian 1–2 di atas. `package.json` tetap memakai versi tahap 00. `main.js` pada bagian 2 adalah kondisi lengkap program saat ini.

## Checkpoint

- [ ] Program berjalan tanpa error dan cocok dengan output di atas.
- [ ] Tantangan sudah dijalankan di file terpisah.
- [ ] Membuat tes ulang tidak memutasi object sumber.
- [ ] Bisa menjelaskan setidaknya satu baris kode tanpa membaca panduan.

[← Tahap 02](../02-function-dan-output/README.md) · [Tahap 04 →](../04-perulangan-peserta/README.md) · [Panduan instruktur](../../instructor.md)
