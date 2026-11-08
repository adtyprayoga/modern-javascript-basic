# 05. Set, Map, dan nilai terakhir

## Hasil dan prasyarat

Menghasilkan empat peserta unik sambil mempertahankan tes terakhir per email.

Selesaikan tahap 04. Kita mulai mengolah riwayat tes menjadi daftar peserta.

Kerjakan semua file di `latihan/proyek/`. Jalankan semua perintah terminal dari **root repository**, tempat README utama berada. Ketik kode sendiri, prediksi hasil, lalu jalankan. Ganti seluruh isi file sesuai nama yang disebut sebelum blok kode.

Pada blok `diff`, baris `-` menunjukkan kode sebelum perubahan dan baris `+` menunjukkan kode sesudah perubahan. Gunakan blok kode lengkap setelahnya untuk mengganti isi file.

## 1. Siapkan perubahan

Ganti seluruh `main.js` dengan fungsi pengolahan berikut.

## 2. Tulis program

Jalankan lalu bandingkan nilai terakhir Aditya dan Zaim dengan data mentah.

Perubahan pada `main.js`:

```diff
--- sebelum/main.js
+++ sesudah/main.js
@@ -53,5 +53,27 @@
 };

-for (const { name, score } of rawPeserta) {
+const getUniqueEmails = (pesertaList = []) => {
+  const emailSet = new Set(pesertaList.map(p => p.email));
+  return [...emailSet];
+};
+
+const createPesertaMap = (pesertaList = []) => {
+  const pesertaMap = new Map();
+  for (const peserta of pesertaList) {
+    pesertaMap.set(peserta.email, { ...peserta });
+  }
+  return pesertaMap;
+};
+
+const getUniquePeserta = (pesertaList = []) => {
+  return [...createPesertaMap(pesertaList).values()];
+};
+
+console.log(`Jumlah entri: ${rawPeserta.length}`);
+console.log(`Email unik: ${getUniqueEmails(rawPeserta).length}`);
+const pesertaMap = createPesertaMap(rawPeserta);
+console.log(`Nilai terakhir Aditya: ${pesertaMap.get("aditya@brainmatics.com").score}`);
+console.log(`Nilai terakhir Zaim: ${pesertaMap.get("zaim@brainmatics.com").score}`);
+for (const { name, score } of getUniquePeserta(rawPeserta)) {
   console.log(displayPeserta(name, score));
 }
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

const getUniquePeserta = (pesertaList = []) => {
  return [...createPesertaMap(pesertaList).values()];
};

console.log(`Jumlah entri: ${rawPeserta.length}`);
console.log(`Email unik: ${getUniqueEmails(rawPeserta).length}`);
const pesertaMap = createPesertaMap(rawPeserta);
console.log(`Nilai terakhir Aditya: ${pesertaMap.get("aditya@brainmatics.com").score}`);
console.log(`Nilai terakhir Zaim: ${pesertaMap.get("zaim@brainmatics.com").score}`);
for (const { name, score } of getUniquePeserta(rawPeserta)) {
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
Jumlah entri: 6
Email unik: 4
Nilai terakhir Aditya: 88
Nilai terakhir Zaim: 94
Nama: Aditya Prayoga, Score: 88, Status: LULUS
Nama: Zaim Fauzan, Score: 94, Status: LULUS
Nama: Milea Kusuma, Score: 78, Status: TIDAK LULUS
Nama: Pratama Wijaya, Score: 95, Status: LULUS
```

## Penjelasan dan kesalahan umum

`map` membentuk array email. `Set` menyimpan nilai unik. `Map` menghubungkan email dengan object peserta; `set` mengganti value untuk email yang sudah ada. Spread menyalin object sehingga hasil tidak berbagi object dengan array sumber. `values()` diubah kembali menjadi array. Urutan key mengikuti kemunculan pertama, sedangkan value diperbarui oleh entri terakhir.

Nilai terakhir mengikuti urutan data, bukan nilai terbesar. Mengurutkan berdasarkan nilai sebelum membuat Map akan mengubah makna tes terakhir.

## Tantangan mandiri

Gunakan dua tes email Rina yang sama, nilai 90 lalu 79. Buktikan hasil akhirnya 79; periksa juga pemanggilan tanpa data.

Buat file terpisah `latihan/proyek/tantangan-05.js`. Coba sendiri sebelum membuka penyelesaian. File ini tidak mengubah `main.js` atau data untuk tahap berikutnya.

<details>
<summary>Lihat penyelesaian tantangan</summary>


<!-- challenge: tantangan-05.js -->
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

const getUniquePeserta = (pesertaList = []) => {
  return [...createPesertaMap(pesertaList).values()];
};

const daftar = [{ email: "rina@example.com", score: 90 }, { email: "rina@example.com", score: 79 }];
console.log(`Email unik: ${getUniqueEmails(daftar).length}`);
console.log(`Nilai terakhir: ${getUniquePeserta(daftar)[0].score}`);
console.log(`Tanpa data: ${getUniquePeserta().length}`);
```

Jalankan dari root repository:

```bash
node latihan/proyek/tantangan-05.js
```

<!-- challenge-output: tantangan-05.js -->
```text
Email unik: 1
Nilai terakhir: 79
Tanpa data: 0
```

Email sama menyebabkan Map mengganti data tes pertama dengan tes kedua. Hasilnya 79 walaupun tes pertama 90. Default array kosong menghasilkan nol peserta.

</details>

## Kode lengkap akhir tahap

Seluruh isi file yang berubah sudah ditampilkan pada bagian 1–2 di atas. `package.json` tetap memakai versi tahap 00. `main.js` pada bagian 2 adalah kondisi lengkap program saat ini.

## Checkpoint

- [ ] Program berjalan tanpa error dan cocok dengan output di atas.
- [ ] Tantangan sudah dijalankan di file terpisah.
- [ ] Enam entri menjadi empat peserta; Aditya 88 dan Zaim 94.
- [ ] Bisa menjelaskan setidaknya satu baris kode tanpa membaca panduan.

[← Tahap 04](../04-perulangan-peserta/README.md) · [Tahap 06 →](../06-filter-dan-statistik/README.md) · [Panduan instruktur](../../instructor.md)
