# 04. Perulangan peserta

## Hasil dan prasyarat

Menampilkan setiap entri tes memakai satu fungsi dan satu loop.

Selesaikan tahap 03. Demonstrasi rest/spread sementara diganti dengan tampilan semua data.

Kerjakan semua file di `latihan/proyek/`. Jalankan semua perintah terminal dari **root repository**, tempat README utama berada. Ketik kode sendiri, prediksi hasil, lalu jalankan. Ganti seluruh isi file sesuai nama yang disebut sebelum blok kode.

## 1. Siapkan perubahan

Ganti seluruh `main.js` dengan perulangan berikut.

## 2. Tulis program

Jalankan dan hitung enam baris hasilnya.

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

for (const { name, score } of rawPeserta) {
  console.log(displayPeserta(name, score));
}
```

## 3. Jalankan dan periksa

Sebelum menjalankan, sebutkan hasil yang kamu perkirakan.

```bash
node latihan/proyek/main.js
```

<!-- expected: main.js -->
```text
Nama: Aditya Prayoga, Score: 85, Status: LULUS
Nama: Zaim Fauzan, Score: 92, Status: LULUS
Nama: Aditya Prayoga, Score: 88, Status: LULUS
Nama: Milea Kusuma, Score: 78, Status: TIDAK LULUS
Nama: Pratama Wijaya, Score: 95, Status: LULUS
Nama: Zaim Fauzan, Score: 94, Status: LULUS
```

## Penjelasan dan kesalahan umum

`for...of` memberikan elemen array satu per satu. Destructuring pada kepala loop mengambil `name` dan `score` dari setiap object. Formatter menjaga format semua baris sama. Dua baris untuk satu orang masih wajar karena ini riwayat tes.

`for...in` menghasilkan indeks atau nama properti, bukan object peserta. Duplikasi nama belum dibuang pada tahap ini.

## Tantangan mandiri

Buat array Rina 79 dan Budi 80, lalu tampilkan keduanya dengan loop dan formatter.

Buat file terpisah `latihan/proyek/tantangan-04.js`. Coba sendiri sebelum membuka penyelesaian. File ini tidak mengubah `main.js` atau data untuk tahap berikutnya.

<details>
<summary>Lihat penyelesaian tantangan</summary>


<!-- challenge: tantangan-04.js -->
```javascript
const getStatus = (score = 0) => {
  if (score >= 80) return "LULUS";
  return "TIDAK LULUS";
};

const displayPeserta = (name = "Unknown", score = 0, status = getStatus(score)) => {
  return `Nama: ${name}, Score: ${score}, Status: ${status}`;
};

const daftar = [{ name: "Rina", score: 79 }, { name: "Budi", score: 80 }];
for (const { name, score } of daftar) {
  console.log(displayPeserta(name, score));
}
```

Jalankan dari root repository:

```bash
node latihan/proyek/tantangan-04.js
```

<!-- challenge-output: tantangan-04.js -->
```text
Nama: Rina, Score: 79, Status: TIDAK LULUS
Nama: Budi, Score: 80, Status: LULUS
```

Setiap iterasi mengambil satu object dan meneruskannya ke formatter. Hasil Rina dan Budi berbeda karena input berada di dua sisi batas 80.

</details>

## Kode lengkap akhir tahap

Seluruh isi file yang berubah sudah ditampilkan pada bagian 1–2 di atas. `package.json` tetap memakai versi tahap 00. `main.js` pada bagian 2 adalah kondisi lengkap program saat ini.

## Checkpoint

- [ ] Program berjalan tanpa error dan cocok dengan output di atas.
- [ ] Tantangan sudah dijalankan di file terpisah.
- [ ] Loop memproses semua enam entri sesuai urutan data.
- [ ] Bisa menjelaskan setidaknya satu baris kode tanpa membaca panduan.

[← Tahap 03](../03-destructuring-rest-spread/README.md) · [Tahap 05 →](../05-set-map-nilai-terakhir/README.md) · [Panduan instruktur](../../instructor.md)
