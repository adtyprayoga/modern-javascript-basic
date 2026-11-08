# Task 2 report

Peserta memerlukan riwayat tes JSON yang tetap tersedia setelah aplikasi dibuka kembali. `utils/pesertaStore.js` menyediakan batas penyimpanan tersebut tanpa mengubah loader materi lama.

## Hasil

- `loadStore(fileUrl, seedUrl)` memuat dan memvalidasi `{ peserta: [...] }`. Hanya ENOENT pada file kerja memicu inisialisasi dari seed tervalidasi.
- `saveStore(list, fileUrl)` memvalidasi sebelum menulis, membuat direktori bila perlu, menulis file sementara unik pada direktori tujuan, lalu melakukan rename. File sementara dibersihkan jika penyimpanan gagal.
- Default file kerja adalah `data/peserta.local.json`; default seed adalah `data/peserta.json`. Argumen eksplisit menerima URL atau path string. Tanpa argumen file kerja, `PESERTA_DATA_FILE` menerima path absolut atau relatif cwd.
- Setiap ID harus safe integer positif dan unik. Nama dan kelas wajib terisi. Email dinormalisasi trim/lowercase. Nilai harus number finite 0–100. Biodata harus konsisten pada seluruh riwayat email yang sama. Array hasil mempertahankan urutan tes.
- `.gitignore` mengecualikan file kerja root dan starter peserta. `npm test` menjalankan suite store tambahan.

## Verifikasi

- `node test/test-store.js` lulus 11 tes. Mencakup seed, restart, nilai turun, nol, ubah biodata, hapus permanen, JSON rusak tetap utuh, struktur invalid, email ternormalisasi, nilai nonfinite, penolakan sebelum overwrite, cleanup rename gagal, seed invalid, dan override lokasi data.
- `npm test` lulus 79 tes lama, 13 tes CRUD, 11 tes store, dan tujuh solusi referensi. Perintah dijalankan dengan sandbox escalation untuk child process pemeriksa referensi.
- Setelah penambahan pesan Indonesia untuk kegagalan inisialisasi dan mkdir, `node test/test-store.js` tetap lulus 11 tes dan `git diff --check` lulus.

## Pilihan dan batas

Boundary Discipline memusatkan validasi JSON pada modul store. Model the Domain memakai Set untuk ID unik dan Map untuk konsistensi identitas peserta.

Kontrak satu proses lokal memakai rename sebagai batas perubahan file. Tidak ada locking antarpemroses atau fsync untuk jaminan mati listrik. Penggantian array dalam memori setelah save berhasil menjadi tanggung jawab pemanggil menu Task 3. Tidak ada commit atau push.
