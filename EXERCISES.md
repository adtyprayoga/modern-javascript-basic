# Praktik membangun Sistem Manajemen Peserta Training

Bangun satu aplikasi dari program pembuka sampai laporan lengkap dan pengujian. Kerjakan kode di [proyek/](latihan/proyek/), lalu teruskan folder proyek yang sama pada setiap tahap. Setiap folder bernomor berisi petunjuk, kode lengkap, penjelasan, output, dan tantangan beserta penyelesaiannya.

## Mulai praktik

1. Siapkan Node.js 22 atau lebih baru. Tidak perlu memasang dependency.
2. Buka repository ini di editor dan terminal pada root repository.
3. Mulai dari tahap 00 dan ketik kode sesuai urutan.
4. Cocokkan output sebelum melanjutkan tahap berikutnya.

| Tahap | Petunjuk | Hasil |
|---|---|---|
| 00 | [Persiapan proyek](latihan/00-persiapan/README.md) | Program pembuka berjalan; peserta tahu direktori terminal. |
| 01 | [Data, const, dan let](latihan/01-data-const-let/README.md) | Enam riwayat tes terbaca sebagai array object. |
| 02 | [Function dan output](latihan/02-function-dan-output/README.md) | Nilai 79, 80, 82, dan tanpa argumen menghasilkan status benar. |
| 03 | [Destructuring, rest, dan spread](latihan/03-destructuring-rest-spread/README.md) | Peserta menyalin data tanpa mengubah object sumber. |
| 04 | [Perulangan peserta](latihan/04-perulangan-peserta/README.md) | Seluruh riwayat tes tampil melalui for...of. |
| 05 | [Set, Map, dan nilai terakhir](latihan/05-set-map-nilai-terakhir/README.md) | Enam tes menjadi empat peserta; nilai terakhir tetap dipakai saat menurun. |
| 06 | [Filter dan statistik](latihan/06-filter-dan-statistik/README.md) | Filter kelas dan rata-rata dari peserta unik benar. |
| 07 | [Class validator](latihan/07-class-validator/README.md) | Aturan kelulusan dibedakan dari pemeriksaan rentang. |
| 08 | [Module dan formatter](latihan/08-module-dan-formatter/README.md) | Processor, validator, dan formatter berjalan dari module peserta. |
| 09 | [Async loader](latihan/09-async-loader/README.md) | JSON dimuat dan kegagalan ditangani tanpa merusak data dasar. |
| 10 | [Integrasi aplikasi](latihan/10-integrasi-aplikasi/README.md) | Aplikasi peserta menampilkan TASK 1–9. |
| 11 | [Pengujian akhir](latihan/11-pengujian-akhir/README.md) | Suite pada module peserta lulus 79/79. |

## Jalankan proyekmu

Dari root repository:

```bash
npm --prefix latihan/proyek start
```

Starter hanya menampilkan pesan pembuka. Tambahkan data dan module mengikuti petunjuk. Setelah tahap 11, jalankan pengujian proyek peserta:

```bash
npm --prefix latihan/proyek test
```

Script test baru ditambahkan pada tahap 11. Sebelum tahap itu, belum tersedia pengujian proyek peserta.

## Gunakan bahan referensi

Buka [panduan instruktur](instructor.md) untuk kegiatan mengajar dan pembahasan. [Beginner guide](BEGINNER_GUIDE.md) menjelaskan konsep lebih lanjut.

Folder [referensi/](latihan/referensi/README.md) menyimpan tujuh latihan tambahan dari studi kasus lama. `npm run cek-latihan` memeriksa solusi tambahan tersebut, bukan progres proyekmu. `npm test` di root menguji aplikasi referensi dan tujuh solusi tambahan.

Untuk memeriksa kode dan output dalam seluruh panduan, jalankan `npm run cek-panduan`. Pemeriksa membangun proyek sementara dari blok panduan sehingga tidak menimpa hasil praktikmu.

Gunakan data di proyekmu untuk praktik. Pertahankan `data/peserta.json` di root repository karena pengujian aplikasi referensi bergantung pada isinya.
