# Mulai praktik

Siapkan Node.js 22 atau lebih baru. Proyek memakai ES modules bawaan Node.js dan tidak memerlukan dependency tambahan.

## Siapkan terminal

1. Buka repository di editor.
2. Buka terminal di root repository, yaitu direktori yang berisi `package.json` dan `main.js`.
3. Periksa versi Node.js:

```bash
node --version
```

Versi harus 22 atau lebih baru. Semua perintah di panduan dijalankan dari root repository, termasuk saat membaca dokumen dalam `docs/` atau `latihan/`.

## Jalankan starter peserta

```bash
npm --prefix latihan/proyek start
```

Output awal:

```text
Mulai membangun Sistem Manajemen Peserta Training
```

Buka [tahap 00: persiapan proyek](../latihan/00-persiapan/README.md), lalu ikuti [urutan tahap 00–13](../latihan/README.md). Ketik kode di satu folder `latihan/proyek/` dan cocokkan output sebelum melanjutkan.

Script pengujian proyek peserta baru ditambahkan pada tahap 13. Setelah tahap itu, jalankan:

```bash
npm --prefix latihan/proyek test
```

## Jalankan aplikasi referensi

Untuk melihat hasil akhir yang menjadi acuan:

```bash
npm start
```

Aplikasi membuka menu 0–8. Pilih 1 untuk melihat daftar, 2 untuk detail dan riwayat, 3 untuk tambah, 4 untuk ubah biodata, 5 untuk tes ulang, 6 untuk hapus, 7 untuk filter kelas, 8 untuk statistik, dan 0 untuk keluar.

Pada file kerja baru, daftar berisi Aditya 88, Zaim 94, Milea 78, dan Pratama 95. Tiga peserta LULUS. Perubahan disimpan pada data/peserta.local.json dan tersedia setelah restart. File contoh data/peserta.json tetap utuh. JSON rusak dilaporkan sebagai error dan tidak ditimpa.

Untuk menguji aplikasi referensi dan tujuh solusi latihan tambahan:

```bash
npm test
```

Hasil pengujian mempertahankan 79 tes lama, menambahkan suite CRUD, store, dan menu, serta menunjukkan `Latihan: 7/7 cocok`. Semua suite harus lulus. Perintah ini menguji referensi, bukan kode peserta.

Untuk memeriksa kode serta output seluruh panduan dalam proyek sementara:

```bash
npm run cek-panduan
```

Pemeriksa tidak menimpa proyek peserta. Lihat [kesalahan umum](reference/COMMON_ERRORS.md) jika ada masalah, atau [panduan instruktur](../instructor.md) untuk menyiapkan kelas.
