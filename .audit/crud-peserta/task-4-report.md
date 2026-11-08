# Task 4: Panduan aplikasi CRUD

## Hasil

Mengganti tahap akhir lama dengan 10 CRUD peserta, 11 penyimpanan JSON, 12 menu terminal, dan 13 pengujian akhir. Tahap 10 memiliki tiga checkpoint runnable; tahap 11 dua; tahap 12 empat. Setiap perubahan existing file memiliki unified diff dan kode lengkap; semua tahap memiliki challenge/solution. Semua kode aplikasi learner berasal marker write, bukan salinan root oleh checker. Hanya test beserta fixture disalin pada tahap 13. Script learner menjalankan empat suite dan tidak mengimpor latihan/cek.js.

Memperbarui README, indeks latihan, instructor, QUICK_START, referensi aktif, indeks solusi tambahan, serta CLAUDE. Menambahkan pemetaan requirement → fungsi → menu → pengujian pada instructor. Estimasi: 14 tahap, 540 menit praktik inti, tiga sesi 240 menit termasuk jeda/pendampingan. Instructor memiliki semua baris tahap 00–13 dan total menit diperiksa programatis.

Tahap 00–08 tidak disentuh. Tahap 09 hanya mengubah next link. Starter proyek, file arsip, aplikasi root, dan pemeriksa formal tidak diubah oleh Task 4. Nama validator.js/module.js dipertahankan.

## Verifikasi

- `node /tmp/replay-crud-guides.mjs` melalui izin eskalasi: PASS 14 tahap, 44 output checkpoint/challenge cocok. Script sementara mengadaptasi pemeriksa lama dengan marker input dan direktori data di luar proyek sementara.
- Script tersebut menjalankan transaksi referensi dan learner dengan dua file data baru terpisah, input sama, membandingkan stdout dan JSON, lalu restart dengan detail/list. Transaksi menguji tambah, detail, ubah, tes turun, filter, statistik, batal hapus, hapus, serta 90 → 79 → 80 yang dipertahankan setelah restart. Semua cocok.
- Learner `npm start` diberi input `0` dan selesai. Learner `npm test` menjalankan test-all, test-crud, test-store, test-menu; lulus semua. Proyek replay dan working files dibersihkan akhirnya.
- `python3 /tmp/check-guide-diffs.py`: 28 diff blocks valid dan sama persis dengan full code berikutnya, termasuk tahap awal yang dipertahankan.
- `python3 /tmp/check-active-links.py`: 132 local links checked; setelah indeks solusi tambahan dibetulkan tautannya tetap identik.
- `git diff --check`: bersih.
- `git diff --no-index --check /dev/null latihan/<folder-baru>/README.md` pada keempat folder baru: tidak ada laporan whitespace. Exit 1 pada --no-index berarti ada isi baru, bukan error whitespace.
- Seluruh checkpoint yang dihasilkan awalnya juga dieksekusi melalui generator `/tmp/build-crud-guides.py`. Jangan jalankan ulang generator tersebut karena bergantung pada folder lama yang sudah diganti.

## Kontrak untuk Task 5

Output terminal input terprogram tidak menggema jawaban, sehingga beberapa prompt tercetak bersebelahan. README menjelaskan perbedaannya dengan terminal interaktif. Trailing whitespace Markdown sudah dibuang, termasuk prompt di akhir baris. Normalisasi checker perlu trimEnd setiap baris output, bukan hanya akhir seluruh output. `/tmp/replay-crud-guides.mjs` sudah melakukannya. Input marker hanya berlaku untuk eksekusi berikutnya file yang sama dan ditambah newline akhir.

Pemeriksa formal tetap menunggu Task 5. Tidak mengklaim npm run cek-panduan formal lulus sebelum pembaruannya. Pada sandbox biasa, child process execFile mengembalikan stdout kosong; menjalankan pemeriksa melalui eskalasi yang disetujui menyelesaikan seluruh replay.
