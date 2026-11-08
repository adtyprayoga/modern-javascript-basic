# Task 1

Peserta membutuhkan fungsi CRUD murni untuk mengelola biodata dan riwayat tes sebelum menu serta penyimpanan dihubungkan.

## Perubahan

- `utils/pesertaCrud.js` menyediakan kelima API yang direncanakan. Identitas menggunakan email trim/lowercase, nama dan kelas wajib, nilai berupa number finite 0–100, dan ID mengikuti maksimum saat ini ditambah satu.
- Tes ulang menambahkan hasil di akhir. Ubah biodata berlaku pada seluruh riwayat dan hanya mengubah nama/email/kelas. Hapus membuang seluruh riwayat peserta. Seluruh keluaran menyalin object agar perubahan pada hasil juga tidak merusak sumber.
- `test/test-crud.js` menambahkan 13 pengujian perilaku memakai `node:test` dan `node:assert/strict` tanpa dependency.
- `package.json` menjalankan pengujian baru di antara 79 tes lama dan tujuh solusi referensi.

## Verifikasi

- Sebelum implementasi, `node test/test-crud.js` gagal karena module CRUD belum tersedia.
- Setelah implementasi, `node test/test-crud.js` lolos 13/13.
- `npm test` dengan akses proses normal lolos 79 tes lama, 13 tes CRUD, dan 7/7 solusi referensi. Percobaan sandbox sebelumnya lolos tes langsung tetapi gagal menjalankan child process solusi referensi, sesuai keterbatasan lingkungan yang sudah diketahui koordinator.
- Kasus mencakup 90 → 79 → 80 beserta status, nilai nol, invalid input, ID maksimum, email bentrok, perubahan seluruh riwayat, penghapusan, email ternormalisasi, dan sumber frozen.

## Keputusan dan batas

Prinsip Model the Domain mempertahankan array sebagai riwayat hasil tes sehingga tes ulang tidak menimpa nilai lama. Object biodata hanya berisi tiga field identitas sehingga edit biodata tidak dapat mengubah ID atau nilai.

Validasi file/list keseluruhan menjadi tanggung jawab store di Task 2. CRUD memvalidasi input operasi. Angka string ditolak oleh API, sehingga menu perlu memeriksa input kosong lalu mengubah input nilai ke number. `getRiwayatTes` melempar pesan `Peserta tidak ditemukan.` jika email valid belum terdaftar. API `tambahNilai` mempertahankan default `score = 0` sesuai rencana; menu harus memvalidasi input kosong sebelum memanggilnya.

Tidak ada commit atau push. Dokumentasi lain dan API lama tidak diubah.
