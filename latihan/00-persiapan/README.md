# 00. Persiapan proyek

## Hasil dan prasyarat

Membuat program pembuka yang bisa dijalankan dengan Node.js.

Siapkan Node.js 22 atau lebih baru dan buka repository ini di editor. Jalankan `node --version` dari root repository. Tidak perlu memasang dependency.

Kerjakan semua file di `latihan/proyek/`. Jalankan semua perintah terminal dari **root repository**, tempat README utama berada. Ketik kode sendiri, prediksi hasil, lalu jalankan. Ganti seluruh isi file sesuai nama yang disebut sebelum blok kode.

## 1. Siapkan perubahan

Buat folder `latihan/proyek/` melalui editor. Buat `package.json` di dalamnya.

File baru: `package.json`. Berikut isi lengkapnya.

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
    "start": "node main.js"
  }
}
```

## 2. Tulis program

Buat `main.js` di dalam proyek.

File baru: `main.js`. Berikut isi lengkapnya.

<!-- write: main.js -->
```javascript
console.log("Mulai membangun Sistem Manajemen Peserta Training");
```

## 3. Jalankan dan periksa

Sebelum menjalankan, sebutkan hasil yang kamu perkirakan.

```bash
node latihan/proyek/main.js
```

<!-- expected: main.js -->
```text
Mulai membangun Sistem Manajemen Peserta Training
```

## Penjelasan dan kesalahan umum

`type: "module"` memungkinkan penggunaan `import` pada tahap 08. `console.log` menulis hasil ke terminal. Script `start` menunjuk file pembuka.

Jika muncul `MODULE_NOT_FOUND`, periksa direktori terminal dan nama file. Semua perintah di materi ini dijalankan dari root repository.

## Tantangan mandiri

Ubah pesan pembuka agar menyebut nama proyek dan pembuatnya, dalam dua baris.

Buat file terpisah `latihan/proyek/tantangan-00.js`. Coba sendiri sebelum membuka penyelesaian. File ini tidak mengubah `main.js` atau data untuk tahap berikutnya.

<details>
<summary>Lihat penyelesaian tantangan</summary>


<!-- challenge: tantangan-00.js -->
```javascript
console.log("Nama proyek: Sistem Manajemen Peserta Training");
console.log("Dibuat oleh: peserta");
```

Jalankan dari root repository:

```bash
node latihan/proyek/tantangan-00.js
```

<!-- challenge-output: tantangan-00.js -->
```text
Nama proyek: Sistem Manajemen Peserta Training
Dibuat oleh: peserta
```

Dua pemanggilan `console.log` menghasilkan dua baris. Ganti kata `peserta` dengan namamu setelah membandingkan output awal.

</details>

## Kode lengkap akhir tahap

Seluruh isi file yang berubah sudah ditampilkan pada bagian 1–2 di atas. `package.json` tetap memakai versi tahap 00. `main.js` pada bagian 2 adalah kondisi lengkap program saat ini.

## Checkpoint

- [ ] Program berjalan tanpa error dan cocok dengan output di atas.
- [ ] Tantangan sudah dijalankan di file terpisah.
- [ ] Proyek siap sebelum data dan aturan bisnis ditambahkan.
- [ ] Bisa menjelaskan setidaknya satu baris kode tanpa membaca panduan.

[Indeks latihan](../README.md) · [Tahap 01 →](../01-data-const-let/README.md) · [Panduan instruktur](../../instructor.md)
