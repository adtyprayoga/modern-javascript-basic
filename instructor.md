# Panduan instruktur: praktik sampai proyek selesai

Peserta membangun satu aplikasi di `latihan/proyek/`, dimulai dari program pembuka sampai laporan TASK 1–9 dan pengujian. Gunakan [indeks latihan](latihan/README.md) sebagai jalur utama. Setiap tahap berisi kode lengkap yang diketik peserta dan penyelesaian tantangan dalam bagian yang dapat dibuka.

## Siapkan kelas

Peserta sudah mengenal variabel, if, function, array, serta terminal dasar. Siapkan Node.js 22 atau lebih baru dan repository ini. Tidak ada instalasi dependency.

Sebelum kelas, jalankan dari root repository:

```bash
npm test
npm run cek-panduan
npm --prefix latihan/proyek start
```

Root test memeriksa 79 perilaku aplikasi referensi dan tujuh solusi tambahan. Pemeriksa panduan membangun proyek sementara dari kode yang ditampilkan pada README. Starter peserta hanya mencetak pesan pembuka dan sengaja belum berisi aplikasi selesai.

Perbesar font editor dan terminal. Pastikan peserta bisa menemukan root repository dan folder proyeknya. Periksa kembali direktori terminal sebelum mendiagnosis kesalahan import.

## Gunakan pola mengajar yang sama

1. Ceritakan masalah yang akan dipecahkan tahap ini.
2. Minta peserta memprediksi hasil pada satu contoh.
3. Ketik satu bagian kecil bersama peserta; gunakan penjelasan pada README sebagai panduan.
4. Beri waktu peserta menjalankan dan memperbaiki kode di komputernya.
5. Cocokkan checkpoint sebelum melanjutkan. Kode lengkap akhir tahap membantu pemulihan saat peserta tertinggal.
6. Berikan tantangan sebelum membuka penyelesaiannya, lalu bahas kode dan alasan hasilnya.

Peserta tetap mengetik dan menjalankan semua kode. Membuka kode lengkap tidak menggantikan pemeriksaan pemahaman. Minta peserta menunjukkan nilai yang berubah, fungsi yang dipanggil, dan alasan memilih struktur data.

## Urutan tahap

Estimasi awal dua sesi masing-masing empat jam, termasuk praktik dan jeda. Sesuaikan dengan kecepatan peserta; jangan melompati checkpoint agar mengejar jadwal.

| Tahap | Folder dan petunjuk | Menit | Checkpoint |
|---|---|---|---|
| 00 | [Persiapan proyek](latihan/00-persiapan/README.md) | 10 | Program pembuka berjalan; peserta tahu direktori terminal. |
| 01 | [Data, const, dan let](latihan/01-data-const-let/README.md) | 20 | Enam riwayat tes terbaca sebagai array object. |
| 02 | [Function dan output](latihan/02-function-dan-output/README.md) | 25 | Nilai 79, 80, 82, dan tanpa argumen menghasilkan status benar. |
| 03 | [Destructuring, rest, dan spread](latihan/03-destructuring-rest-spread/README.md) | 20 | Peserta menyalin data tanpa mengubah object sumber. |
| 04 | [Perulangan peserta](latihan/04-perulangan-peserta/README.md) | 15 | Seluruh riwayat tes tampil melalui for...of. |
| 05 | [Set, Map, dan nilai terakhir](latihan/05-set-map-nilai-terakhir/README.md) | 30 | Enam tes menjadi empat peserta; nilai terakhir tetap dipakai saat menurun. |
| 06 | [Filter dan statistik](latihan/06-filter-dan-statistik/README.md) | 30 | Filter kelas dan rata-rata dari peserta unik benar. |
| 07 | [Class validator](latihan/07-class-validator/README.md) | 45 | Aturan kelulusan dibedakan dari pemeriksaan rentang. |
| 08 | [Module dan formatter](latihan/08-module-dan-formatter/README.md) | 45 | Processor, validator, dan formatter berjalan dari module peserta. |
| 09 | [Async loader](latihan/09-async-loader/README.md) | 50 | JSON dimuat dan kegagalan ditangani tanpa merusak data dasar. |
| 10 | [Integrasi aplikasi](latihan/10-integrasi-aplikasi/README.md) | 30 | Aplikasi peserta menampilkan TASK 1–9. |
| 11 | [Pengujian akhir](latihan/11-pengujian-akhir/README.md) | 35 | Suite pada module peserta lulus 79/79. |

Sesi 1: pembukaan 10 menit, tahap 00–07 selama 195 menit, jeda 20 menit, dan refleksi 15 menit. Sesi 2: ulasan 10 menit, tahap 08–11 selama 160 menit, jeda 20 menit, pembahasan akhir 30 menit, dan pendampingan 20 menit. Setiap sesi berjumlah 240 menit.

## Bawakan setiap tahap

### 00. Persiapan proyek

Buka [petunjuk tahap 00](latihan/00-persiapan/README.md).

Sampaikan: "Hari ini kita membangun satu aplikasi. Folder proyek yang sama akan kita lanjutkan sampai selesai."

Tunjukkan root repository dan folder proyek. Ketik package.json lalu main.js bersama peserta.

Minta peserta menjalankan program dari terminalnya sendiri dan mengganti pesan pada file tantangan.

Saat memeriksa: Pastikan type module tersedia, nama file benar, dan terminal berada di root. Jika module tidak ditemukan, baca path pada error.

Pembahasan tantangan: Dua pemanggilan console.log menghasilkan dua baris. Peserta boleh mengganti nama pembuat setelah mencocokkan output awal.

### 01. Data, const, dan let

Buka [petunjuk tahap 01](latihan/01-data-const-let/README.md).

Sampaikan: "Satu baris data adalah satu kejadian tes. Orang yang tes ulang muncul lagi dengan email yang sama."

Tunjukkan struktur object lalu array enam tes. Jelaskan const untuk binding yang tidak diganti dan let untuk penghitung.

Peserta mengetik array, memakai let untuk mencatat jumlah tes, lalu mencari email yang muncul dua kali.

Saat memeriksa: Tanyakan apakah enam entri berarti enam orang. Periksa jumlah entri tanpa mengubah data root.

Pembahasan tantangan: Array latihan tambahan boleh berisi peserta baru. const tidak membekukan isi object atau array.

### 02. Function dan output

Buka [petunjuk tahap 02](latihan/02-function-dan-output/README.md).

Sampaikan: "Kita ingin aturan kelulusan yang bisa dipanggil berulang untuk nilai berbeda."

Ketik fungsi getStatus, default parameter, dan displayPeserta dengan template literal. Jelaskan return sebelum menyingkat sintaks.

Peserta menguji 79, 80, 82, dan tanpa argumen; prediksi hasil sebelum Enter.

Saat memeriksa: Nilai 80 termasuk lulus. Bedakan return dengan console.log. Kesalahan tanpa return menghasilkan undefined.

Pembahasan tantangan: Gunakan penyelesaian tantangan untuk melihat kombinasi default nama, nilai, dan status, lalu jelaskan setiap hasil.

### 03. Destructuring, rest, dan spread

Buka [petunjuk tahap 03](latihan/03-destructuring-rest-spread/README.md).

Sampaikan: "Kita perlu mengambil beberapa properti dan membuat data tes ulang tanpa merusak data awal."

Jelaskan destructuring, rename class menjadi className, rest untuk properti tersisa, dan spread untuk salinan.

Peserta membuat salinan bernilai baru dan mencetak object awal untuk membuktikan nilainya tidak berubah.

Saat memeriksa: class adalah reserved word untuk binding. Spread menghasilkan salinan dangkal; jangan menyebutnya deep copy.

Pembahasan tantangan: Pada pembahasan, tunjuk posisi rest dan spread dalam kode lengkap; keduanya memakai tanda yang sama tetapi tugas berbeda.

### 04. Perulangan peserta

Buka [petunjuk tahap 04](latihan/04-perulangan-peserta/README.md).

Sampaikan: "Bagaimana menampilkan semua tes tanpa mengulang console.log secara manual?"

Hubungkan for...of dengan satu object pada setiap iterasi; tambahkan destructuring pada binding loop.

Peserta mengetik loop dan menambahkan satu tampilan yang memakai name serta score.

Saat memeriksa: Pastikan semua entri tampil, termasuk tes ulang. Deduplikasi belum dilakukan pada tahap ini.

Pembahasan tantangan: Minta peserta menjelaskan object yang diterima variabel loop dan properti yang dicetak pada tantangan.

### 05. Set, Map, dan nilai terakhir

Buka [petunjuk tahap 05](latihan/05-set-map-nilai-terakhir/README.md).

Sampaikan: "Sekarang laporan akhir harus memuat satu peserta per email dan memakai tes terakhirnya."

Bangun getUniqueEmails, createPesertaMap, dan getUniquePeserta. Baca Map.set saat email lama muncul kembali.

Peserta membandingkan enam entri dengan empat email unik, lalu memeriksa Aditya 88 dan Zaim 94.

Saat memeriksa: Tanyakan hasil bila tes turun dari 90 ke 79. Jawabannya 79, karena aturan mengikuti urutan data. Urutan key Map mengikuti penyisipan pertama.

Pembahasan tantangan: Jalankan tantangan 90 lalu 79 dan pemanggilan tanpa data. Gunakan penurunan nilai untuk membedakan terakhir dari tertinggi.

### 06. Filter dan statistik

Buka [petunjuk tahap 06](latihan/06-filter-dan-statistik/README.md).

Sampaikan: "Kita sudah punya peserta unik. Bagaimana membuat laporan per kelas dan rata-ratanya?"

Bangun getPesertaByClass dan calculateAverageScore; hubungkan map, filter, serta reduce dengan perubahan bentuk data.

Peserta menyaring per kelas, menjumlahkan nilai, membagi jumlah peserta, dan mencoba array kosong.

Saat memeriksa: Jangan menghitung statistik akhir dari rawPeserta. Daftar kosong harus menghasilkan 0, bukan NaN.

Pembahasan tantangan: Bahas nilai awal accumulator reduce dan alasan pembulatan dua desimal.

### 07. Class validator

Buka [petunjuk tahap 07](latihan/07-class-validator/README.md).

Sampaikan: "Kelulusan, label status yang sah, dan rentang nilai adalah pemeriksaan yang berbeda."

Bangun class, constructor, method instance, static field, includes, dan dua factory. Jelaskan pemanggilan dengan dan tanpa new.

Peserta memanggil validator default dan validator 80–100, lalu menguji status LULUS dan lulus.

Saat memeriksa: Nilai 70 valid dalam rentang default 60–100, tetapi TIDAK LULUS. Jangan menyamakan isValidScore dengan getStatus.

Pembahasan tantangan: Baca kode lengkap tantangan dan minta peserta membedakan pemeriksaan rentang, label sah, dan kelulusan.

### 08. Module dan formatter

Buka [petunjuk tahap 08](latihan/08-module-dan-formatter/README.md).

Sampaikan: "Setelah semua fungsi bekerja, kita pisahkan tanggung jawab agar main hanya menghubungkan proses."

Buat tiga file module. Pindahkan processor dan validator, kemudian bangun formatter lengkap. Ganti main agar memakai import.

Peserta menulis module sendiri dan menghapus definisi inline melalui penggantian seluruh isi main.

Saat memeriksa: Semua import menunjuk utils di proyek peserta dan memakai ekstensi .js. Named export harus cocok. Kenalkan ?? di formatter; rincian di tahap 09.

Pembahasan tantangan: Tantangan memakai module peserta, bukan import utils root. Minta peserta menunjukkan file pemilik aturan batas lulus.

### 09. Async loader

Buka [petunjuk tahap 09](latihan/09-async-loader/README.md).

Sampaikan: "Data aplikasi biasanya berasal dari luar kode. Pembacaan file bisa selesai belakangan atau gagal."

Ikuti Promise langsung, JSON.parse, module async loader, lalu try/catch pada pemanggil. Jelaskan ?. dan ?? dengan nilai 0.

Peserta memindahkan data ke JSON proyek sendiri dan menjalankan cek-loader untuk file yang sengaja tidak ada.

Saat memeriksa: Default parameter berbeda dari fallback nullish. Kegagalan main menghentikan aplikasi; demo fallback memakai daftar kosong secara sengaja.

Pembahasan tantangan: Uji null, key peserta hilang, score hilang, score 0, dan JSON rusak. Bandingkan daftar kosong dengan error parsing.

### 10. Integrasi aplikasi

Buka [petunjuk tahap 10](latihan/10-integrasi-aplikasi/README.md).

Sampaikan: "Kita sudah membuat seluruh bagian. Sekarang susun aplikasi yang memakai semuanya."

Telusuri import dan alur load, proses, validasi, format. Bangun main melalui empat checkpoint: TASK 1–3, TASK 4–5, TASK 6, lalu TASK 7–9. Main lengkap berada di langkah 4.

Peserta memeriksa angka ringkasan dan menelusuri satu peserta dari JSON ke output akhir.

Saat memeriksa: Periksa empat peserta unik, tiga lulus, dan statistik per kelas. Jangan biarkan definisi lama tertinggal di main.

Pembahasan tantangan: Tantangan mencetak dua ringkasan kelas dari peserta unik. Tanyakan alasan deduplikasi dilakukan sebelum statistik.

### 11. Pengujian akhir

Buka [petunjuk tahap 11](latihan/11-pengujian-akhir/README.md).

Sampaikan: "Program yang terlihat berjalan tetap perlu diperiksa pada batas dan kondisi gagal."

Salin suite beserta fixtures ke proyek peserta dan tambahkan script test. Tunjukkan import test yang mengarah ke module peserta.

Peserta menjalankan test pada proyek sendiri dan membaca nama, expected, serta actual jika ada kegagalan.

Saat memeriksa: Root npm test tidak menguji progres peserta. Gunakan npm --prefix latihan/proyek test, dengan target79/79.

Pembahasan tantangan: Jalankan assert tambahan untuk tes yang turun, 79/80, array kosong, nilai 0, dan rentang 70 yang belum lulus.

## Nilai hasil praktik

Peserta memenuhi tahap jika output cocok dan bisa menjelaskan kode yang menghasilkan output tersebut. Pada akhir kelas, periksa proyek peserta melalui:

```bash
npm --prefix latihan/proyek start
npm --prefix latihan/proyek test
```

Target akhir aplikasi adalah TASK 1–9, dengan enam tes, empat peserta unik, dan tiga peserta lulus. Target test adalah 79/79. Gunakan tantangan 11 untuk mengecek tes ulang bernilai lebih rendah dan perbedaan rentang dengan kelulusan.

| Poin studi kasus | Tahap pembuktian |
|---|---|
| Kelulusan dari tes terakhir | 02, 05, 10, 11 |
| const, let, dan default parameter | 01, 02, 04 |
| Destructuring dan object rest/spread | 03, 04, 05, 09 |
| Set dan Map | 05 |
| Class serta export/import | 07, 08 |
| Validasi status melalui includes | 07, 08 |
| async/await, try/catch, ?. dan ?? | 09, 11 |

## Bantu peserta yang tertinggal

Buka bagian kode lengkap pada tahap yang sedang dikerjakan. Pastikan file prerequisite juga sudah dibuat. Ganti hanya file yang disebut pada tahap itu; jangan menimpa seluruh proyek dengan aplikasi root.

Untuk error sintaks, periksa kurung, tanda kutip, dan posisi return. Untuk error module, periksa path relatif, ekstensi .js, serta nama export. Untuk hasil angka yang salah, periksa apakah input masih berupa riwayat tes atau sudah berupa peserta unik.

Data yang boleh diubah untuk eksperimen adalah data di proyek peserta. Root `data/peserta.json` tetap menjadi bahan aplikasi referensi. Jangan memakai git restore tanpa memastikan file mana yang akan menimpa jawaban peserta.

## Referensi setelah kelas

- [Seluruh tahap praktik](latihan/README.md)
- [Penjelasan konsep di beginner guide](BEGINNER_GUIDE.md)
- [Solusi latihan tambahan lama](latihan/referensi/README.md)
- [Kesalahan JavaScript yang umum](COMMON_ERRORS.md)

`npm run cek-latihan` hanya memeriksa tujuh solusi tambahan. `npm run cek-panduan` memeriksa kode materi pada proyek sementara. Keduanya tidak menilai jawaban di folder proyek peserta. Gunakan perintah dengan --prefix untuk memeriksa hasil peserta.
