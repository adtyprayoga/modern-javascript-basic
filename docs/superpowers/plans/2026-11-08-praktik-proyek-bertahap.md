# Praktik proyek bertahap Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans untuk menjalankan rencana per tugas. Gunakan checkbox untuk mencatat penyelesaian.

**Goal:** Peserta menulis kode dari awal sampai memiliki aplikasi manajemen peserta training lengkap yang dapat diuji.

**Architecture:** Folder bernomor berisi panduan lengkap. Peserta membangun satu proyek berkelanjutan di `latihan/proyek/`. Kode root adalah referensi hasil akhir, bukan module yang diimpor jawaban peserta.

**Tech Stack:** Node.js >=22, native ES modules, Markdown, tanpa dependency tambahan.

**Spec:** Persetujuan pengguna pada percakapan 2026-11-08: satu proyek berlanjut; semua kode dituntun; kode lengkap termasuk penyelesaian tantangan; panduan instruktur menautkan setiap tahap.

## Global constraints

- Gunakan bahasa Indonesia untuk petunjuk baru.
- Tampilkan kode lengkap setiap perubahan file, perintah, output, penjelasan, kesalahan umum, checkpoint, dan navigasi.
- Semua tantangan punya penyelesaian lengkap dalam details dan berjalan di file terpisah dari main.js.
- Pertahankan API, data, dan output proyek root. Nilai terakhir adalah entri terakhir, bukan nilai tertinggi; batas lulus >=80.
- Jangan mengubah root data/peserta.json untuk praktik.
- Proyek peserta dimulai dengan package.json dan main.js pembuka; data, module, dan test ditambahkan melalui tahap praktik.
- Jangan commit atau push.

## Urutan materi

| Tahap | Folder | Hasil |
|---|---|---|
| 00 | 00-persiapan | package.json ES modules dan program pembuka |
| 01 | 01-data-const-let | Array enam tes, object, const, let |
| 02 | 02-function-dan-output | Fungsi kelulusan, defaults, template literal |
| 03 | 03-destructuring-rest-spread | Destructuring, rename class, salinan dan rest |
| 04 | 04-perulangan-peserta | for...of dan destructuring dalam loop |
| 05 | 05-set-map-nilai-terakhir | getUniqueEmails, createPesertaMap, getUniquePeserta |
| 06 | 06-filter-dan-statistik | getPesertaByClass, calculateAverageScore, map/filter/reduce |
| 07 | 07-class-validator | PesertaValidator, static, includes, instance methods, factories |
| 08 | 08-module-dan-formatter | Processor, validator, formatter sebagai module milik peserta |
| 09 | 09-async-loader | JSON loader, async/await, try/catch, ?. dan ?? |
| 10 | 10-integrasi-aplikasi | Main terintegrasi, TASK 1–9 setara root |
| 11 | 11-pengujian-akhir | Suite menguji module milik peserta |

## Task 1: Rapikan perubahan parsial dan jalur praktik

- [x] Audit perubahan; root berada pada feat/studi-kasus-es2016. Lanjutkan di checkout yang sama untuk mempertahankan perubahan parsial yang sudah pengguna lihat. Tidak memindahkan checkout atau mengubah branch.
- [x] Pindahkan tujuh solusi lama beserta fixture dan output ke latihan/referensi/; sesuaikan import dan checker.
- [x] Sediakan starter latihan/proyek/package.json dan main.js.
- [x] Hapus kerangka latihan terpisah dari percobaan parsial dan script cek-jawaban yang tidak cocok dengan proyek kumulatif.
- [x] Jalankan npm test: 79 test dan 7 solusi lulus di luar sandbox. Node child_process dalam sandbox mengembalikan stdout kosong; jangan ubah expected untuk menyamarkannya.

## Task 2: Praktik fondasi 00–04

- [x] Tulis panduan lengkap dengan kode kumulatif, tanpa loader sebelum diperkenalkan.
- [x] Sertakan batas 79/80, defaults, const object, rename class, rest/spread, dan loop.
- [x] Jalankan setiap perubahan dan penyelesaian tantangan; cocokkan output aktual.

## Task 3: Pengolahan dan module 05–08

- [x] Tulis processor sesuai signature referensi dan tes ulang bernilai lebih rendah.
- [x] Tulis statistik, array kosong, validator lengkap, dan seluruh formatter.
- [x] Tuntun pemindahan definisi ke module dengan semua import dan penghapusan definisi lama melalui full replacement.
- [x] Pastikan main hanya memakai module peserta.

## Task 4: Loader, integrasi, pengujian 09–11

- [x] Tulis JSON dan loader lengkap, jalur sukses, file hilang, JSON rusak, null/kosong, missing score, dan real score 0.
- [x] Tampilkan main lengkap yang menghasilkan TASK 1–9 setara root.
- [x] Sediakan instruksi menyalin suite dan fixtures yang tersedia ke proyek peserta; suite kemudian mengimpor module peserta.
- [x] Tambahkan scripts start dan test saat dibutuhkan; jalankan keduanya pada proyek hasil praktik.

## Task 5: Panduan instruktur dan indeks

- [x] Susun instructor.md berbahasa Indonesia dengan tautan semua tahap, narasi, kegiatan peserta, checkpoint, dan pembahasan tantangan.
- [x] Estimasi dua sesi masing-masing empat jam termasuk praktik/jeda, ditandai sebagai estimasi.
- [x] Perbarui indeks latihan, EXERCISES, README, quick start, beginner guide, dan CLAUDE sesuai struktur baru.
- [x] Simpan rencana ini dan catat hasil verifikasi.

## Verifikasi akhir

- [x] Replay seluruh blok panduan dari starter di direktori sementara, bukan menyalin aplikasi jadi.
- [x] Jalankan semua checkpoint dan solusi tantangan; cocokkan output.
- [x] Jalankan suite pada proyek hasil praktik; bandingkan seluruh stdout aplikasi dengan root.
- [x] Jalankan npm test pada root secara terpisah.
- [x] Periksa link Markdown, import, folder lama, diff whitespace, dan isolasi starter.
- [x] Review spesifikasi dan kualitas materi, perbaiki hasil review, lalu ulangi pemeriksaan yang terdampak.

## Catatan keputusan

- Pemeriksaan panduan dapat memakai marker HTML pada blok kode agar kode yang dibaca peserta juga menjadi sumber verifikasi. Marker tidak mengubah tampilan Markdown.
- Root npm test tetap menguji aplikasi referensi dan tujuh solusi tambahan. Starter peserta yang belum selesai bukan kegagalan proyek.
- Penyalinan test disediakan sebagai bahan ujian setelah peserta membangun seluruh aplikasi; peserta tidak diminta mengetik ulang test runner panjang.

## Hasil eksekusi 2026-11-08

- Dua belas tahap 00–11 tersedia dengan kode kumulatif, penjelasan, output, tantangan, dan penyelesaian lengkap.
- Review menemukan tahap 07/08/10 terlalu padat; dipecah menjadi masing-masing 5/5/4 checkpoint utama yang runnable.
- `npm run cek-panduan`: 12 tahap, 37 output cocok; aplikasi hasil replay setara root; npm start dan npm test pada hasil praktik lulus.
- Suite hasil praktik lulus 79/79. `npm test` root lulus 79/79 dan 7/7 solusi tambahan.
- Pemeriksaan negatif pada salinan sementara membuktikan output dokumentasi yang salah ditolak dengan exit nonzero.
- 137 tautan lokal diperiksa; tidak ada yang putus. git diff --check bersih.
- Root main.js, utils/, data/, dan test/ tidak berubah. Starter peserta tetap hanya package.json dan main.js pembuka.
- Semua koreksi review pada instructor dan quick start diselesaikan; perubahan dibiarkan lokal, tanpa commit atau push.
- Verifikasi child_process dijalankan di luar sandbox karena pembatasan Node anak dalam sandbox. Expected output tidak diubah untuk menghindari pembatasan lingkungan.
