# Rencana aplikasi CRUD peserta di Node.js

## Tujuan dan aturan global
Implementasikan aplikasi terminal `node main.js`, Node.js >=22, native ESM, modul bawaan tanpa dependency. Materi Indonesia membangun satu proyek bertahap dengan penjelasan, diff sebelum/sesudah, kode lengkap, contoh input/output, tantangan dan solusi. Pertahankan fondasi 00–09 dan perubahan dokumentasi pengguna yang belum di-commit. Jangan commit atau push.

Data `{ "peserta": [...] }`: satu entri = satu hasil tes dengan id, name, email, class, score. Email trim/lowercase mengidentifikasi peserta; id mengidentifikasi tes. Tambah menolak email duplikat. Tes ulang append termasuk nilai turun. Nilai terakhir mengikuti urutan; kelulusan >=80. Ubah biodata seluruh riwayat, pertahankan id/score/urutan, tolak email bentrok. Hapus seluruh riwayat setelah konfirmasi. Nama/kelas wajib, email valid, score angka finite 0–100; kosong bukan nol. Filter/statistik memakai peserta unik nilai terakhir. Data contoh tidak diubah; data kerja data/peserta.local.json diabaikan Git. Seed hanya ENOENT; JSON rusak tetap utuh. Satu proses lokal, tanpa HTTP/database/demo otomatis.

## Task 1: CRUD dan riwayat
Buat utils/pesertaCrud.js: tambahPeserta(list = [], data = {}), ubahPeserta(list = [], email = "", perubahan = {}), hapusPeserta(list = [], email = ""), tambahNilai(list = [], email = "", score = 0), getRiwayatTes(list = [], email = ""). Semua fungsi murni, tidak mutasi array/object sumber. ID max saat ini +1. Error Indonesia input invalid/duplikat/tidak ditemukan. Pertahankan API processor/formatter/loader/validator. Tulis pengujian perilaku termasuk nilai turun, nol, invalid, bentrok, immutability, penghapusan riwayat.

## Task 2: Penyimpanan JSON
Buat utils/pesertaStore.js: loadStore(fileUrl, seedUrl) Promise array, saveStore(list, fileUrl) Promise. Validasi struktur, identitas, id unik dan score. Seed hanya file kerja tidak ditemukan. Atomic write file sementara direktori sama lalu rename; cleanup saat gagal. PESERTA_DATA_FILE untuk isolasi tes. Memori baru diganti setelah save berhasil. Uji persist/restart, JSON rusak utuh, invalid store, cleanup save failure.

## Task 3: Menu terminal
Menu: 1 Daftar peserta; 2 Detail peserta dan riwayat tes; 3 Tambah peserta; 4 Ubah biodata peserta; 5 Catat tes ulang; 6 Hapus peserta; 7 Filter berdasarkan kelas; 8 Statistik dan validasi; 0 Keluar. Satu readline async iterator untuk interaktif/piped input. Invalid pilihan/operasi kembali ke menu. Biodata kosong mempertahankan sebelumnya. EOF formulir batal tanpa partial save. Tunggu save sebelum sukses. Tutup reader keluar; initial load failure exit 1.
Daftar menggunakan getUniqueEmails/getUniquePeserta/formatPesertaList. Detail createPesertaMap/displayPeserta/createPesertaSummary/createDetailedReport. Filter getPesertaByClass. Statistik calculateAverageScore/validateBatch. Peragakan getStatus/isValidStatus/isValidScore/formatResult/getValidationDetails/kedua factory validator. Pisahkan label lulus >=80 dari rentang 60–100. Uji proses Node nyata semua menu, cancel/EOF, save failure tanpa sukses; 90→79 TIDAK LULUS→80 LULUS dan restart menyimpan semua riwayat.

## Task 4: Panduan tahap akhir dan dokumentasi
Ganti akhir: 10 CRUD peserta (array), 11 Penyimpanan JSON, 12 Menu terminal, 13 Pengujian akhir. Tiap tahap langkah kecil runnable, diff cocok tahap sebelumnya/kode lengkap, penjelasan, input/output dan tantangan+solusi dengan marker. Pertahankan nama validator.js dan module.js. Update indeks, tautan antar tahap, instructor.md, dokumentasi aktif/durasi, pemetaan requirement→fungsi→menu→pengujian. Fondasi 00–09 dipertahankan.

## Task 5: Pemeriksa panduan
Periksa 14 tahap dan marker write/expected/challenge/challenge-output/copy; tambah input marker urutan jawaban. Jalankan aplikasi referensi dan hasil panduan dengan input identik dan file kerja sementara terpisah. Bandingkan output dan data termasuk restart. npm start diberi input keluar, timeout. Tidak menimpa starter/hasil peserta. Pertahankan 79 tes lama dan tujuh solusi referensi. Verifikasi npm test, cek-panduan, diff, tautan lokal, git diff --check.
