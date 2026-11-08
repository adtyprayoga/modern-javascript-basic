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

Buka [tahap 00: persiapan proyek](../latihan/00-persiapan/README.md), lalu ikuti [urutan tahap 00–11](../latihan/README.md). Ketik kode di satu folder `latihan/proyek/` dan cocokkan output sebelum melanjutkan.

Script pengujian proyek peserta baru ditambahkan pada tahap 11. Setelah tahap itu, jalankan:

```bash
npm --prefix latihan/proyek test
```

## Jalankan aplikasi referensi

Untuk melihat hasil akhir yang menjadi acuan:

```bash
npm start
```

Aplikasi menampilkan TASK 1–9. Laporan akhirnya berisi empat peserta dengan nilai Aditya 88, Zaim 94, Milea 78, dan Pratama 95. Tiga peserta LULUS.

Untuk menguji aplikasi referensi dan tujuh solusi latihan tambahan:

```bash
npm test
```

Hasil pengujian menunjukkan 79 pengujian lulus, nol gagal, dan `Latihan: 7/7 cocok`. Perintah ini menguji referensi, bukan kode peserta.

Untuk memeriksa kode serta output seluruh panduan dalam proyek sementara:

```bash
npm run cek-panduan
```

Pemeriksa tidak menimpa proyek peserta. Lihat [kesalahan umum](reference/COMMON_ERRORS.md) jika ada masalah, atau [panduan instruktur](../instructor.md) untuk menyiapkan kelas.
