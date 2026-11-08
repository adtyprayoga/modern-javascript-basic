# Kontrak marker panduan untuk Task 4 dan 5

Marker tetap berbentuk HTML diikuti fenced code block. Tambahkan `<!-- input: main.js -->` dengan fence text berisi baris jawaban, sebelum expected/challenge-output untuk program yang butuh input. Checker menambahkan newline akhir, memakai input tersebut hanya untuk eksekusi berikutnya dari file bersangkutan. Setiap program interaktif diberi input eksplisit, termasuk 0 untuk keluar.

File kerja checker berada di luar proyek sementara: env PESERTA_DATA_FILE menunjuk file temp terisolasi. Stage 11 dapat memakai env yang sama untuk demo store. Stage 12 expected memulai dari seed yang dipakai stage 11 jika demo mengubah data; lebih sederhana demo stage11 save seed tanpa mengubah peserta contoh dan menulis perubahan hanya pada file tantangan terpisah.

Final comparison memakai dua file kerja baru, input identik untuk referensi dan learner: transaksi tambah, detail, ubah bio, retest turun, filter, statistik, batal hapus, hapus, keluar. Bandingkan stdout dan JSON setelah run pertama, lalu restart kedua dengan input detail/list/keluar. npm start diberi 0. Jangan menyalin root main/utils ke learner di checker; semua kode aplikasi learner berasal marker write panduan. Copy hanya suite test/fixture.

Task4 harus dapat diverifikasi dengan checker sementara yang mendukung input dan 14 tahap sebelum review; koordinasikan Task5 ke scope Task4 jika perlu, tetapi jangan klaim verifikasi yang belum dijalankan.

Diff verification: /tmp/check-guide-diffs.py independently reconstructs each unified diff against previous marked write and asserts exact match with next full code block. Existing stages00–09 pass this; old replaced stage10 has mismatch. Task5 should encode same check in Node checker (including hunk counts). Empty unprefixed lines in legacy diffs count as empty context. Validate local Markdown links outside fences across active docs, excluding archived historical docs/plan and fake external paths in prose examples.
