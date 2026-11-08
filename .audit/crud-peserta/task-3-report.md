# Task 3 — Menu terminal

Implementasi `main.js` mengganti demonstrasi dengan menu 0–8. Satu pembaca readline dan satu async iterator membaca formulir interaktif maupun input terprogram. Email lookup dinormalisasi. Nilai kosong ditolak sebelum konversi Number; validasi CRUD menolak NaN, Infinity dan nilai di luar 0–100. EOF membatalkan formulir. Perubahan biodata kosong mempertahankan nilai lama. Hapus memerlukan `ya` dan menghapus seluruh riwayat. Memori diganti sesudah `await saveStore` berhasil. Kesalahan operasi kembali ke menu; kesalahan muat awal keluar dengan kode 1.

Fitur membaca memakai semua fungsi processor, formatter, validator dan factory yang diwajibkan. Statistik/filter memakai peserta unik dengan nilai terakhir. Keluaran membedakan kelulusan >=80 dan pemeriksaan rentang 60–100.

## Verifikasi

- `node --check main.js` lulus.
- `node --check test/test-menu.js` lulus.
- `node test/test-menu.js` lulus 13 kelompok pengujian proses Node nyata.
- `npm test` lulus 79 pengujian lama, 13 CRUD, 11 store, 13 menu, dan 7 solusi referensi.

Pengujian menu mencakup semua pilihan, lookup email uppercase/whitespace, tambah nilai nol, duplikat, bentrok, peserta tidak ditemukan, nilai invalid pada kedua jalur input, biodata wajib, urutan 90→79→80 lintas restart, seluruh riwayat tetap ada, perubahan biodata semua riwayat, biodata kosong, hapus/cancel, EOF setiap langkah seluruh formulir, JSON rusak tidak ditimpa, dan simpan gagal tanpa pesan sukses atau perubahan memori. Kegagalan save diuji dengan memindahkan direktori kerja setelah prompt dan menggantinya dengan file biasa. Data asli tetap utuh di direktori yang dipindahkan.

Semua data pengujian terisolasi di direktori sementara dan dihapus setelah selesai. Fixture asli tidak diubah. Proses memiliki timeout 10 detik. Eksekusi child process membutuhkan tool exec elevated pada lingkungan sandbox ini.

## Batas lingkup

Tidak mengubah API processor/formatter/loader/validator. Tidak commit atau push. Pembaruan panduan dan pemeriksa berada pada tugas induk berikutnya.
