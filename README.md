# Modern JavaScript: Sistem Manajemen Peserta Training

Materi praktik JavaScript ES6–ES2022 untuk training Brainmatics. Peserta membangun satu aplikasi di `latihan/proyek/`, dari program pembuka sampai menu CRUD peserta, penyimpanan JSON, dan pengujian. Setiap tahap menyediakan kode lengkap, penjelasan, output, dan tantangan beserta penyelesaiannya.

## Mulai di sini

| Kebutuhan | Panduan |
|---|---|
| Menyiapkan Node.js dan menjalankan starter | [Quick start](docs/QUICK_START.md) |
| Membangun aplikasi sendiri | [Praktik tahap 00–13](latihan/README.md) |
| Mengajar dan membahas praktik | [Panduan instruktur](instructor.md) |
| Memahami konsep JavaScript | [Beginner guide](docs/reference/BEGINNER_GUIDE.md) |
| Menelusuri implementasi referensi | [Code highlights](docs/reference/CODE_HIGHLIGHTS.md) |
| Mengatasi kesalahan umum | [Common errors](docs/reference/COMMON_ERRORS.md) |

## Studi Kasus

Kelola peserta training dan tentukan status dari nilai tes terakhir. Aplikasi terminal mencatat peserta dan tes ulang, mengubah biodata, menghapus seluruh riwayat, serta menampilkan laporan. Data contoh berisi enam tes dan empat peserta unik berdasarkan email.

| Ketentuan | Praktik |
|---|---|
| Tentukan LULUS atau TIDAK LULUS dari nilai terakhir, bukan nilai tertinggi | [Set, Map, dan nilai terakhir](latihan/05-set-map-nilai-terakhir/README.md) |
| Gunakan const/let dan function dengan default parameter | [Data](latihan/01-data-const-let/README.md), [function dan output](latihan/02-function-dan-output/README.md) |
| Terapkan destructuring serta object rest/spread | [Destructuring, rest, dan spread](latihan/03-destructuring-rest-spread/README.md) |
| Gunakan Set untuk nilai unik dan Map untuk indeks peserta | [Set dan Map](latihan/05-set-map-nilai-terakhir/README.md) |
| Buat class validator dan pisahkan module dengan export/import | [Class validator](latihan/07-class-validator/README.md), [module dan formatter](latihan/08-module-dan-formatter/README.md) |
| Validasi status dengan includes() | [Class validator](latihan/07-class-validator/README.md) |
| Muat JSON dengan async/await dan try/catch; gunakan ?. dan ?? | [Async loader](latihan/09-async-loader/README.md) |

Nilai minimal kelulusan adalah 80. Pemeriksaan rentang nilai oleh validator adalah aturan terpisah, dengan rentang bawaan 60–100. Pada data contoh, empat peserta menghasilkan tiga peserta LULUS. Nilai terakhir mengikuti urutan tes, termasuk ketika nilainya turun.

Data kerja tersimpan di `data/peserta.local.json` dan diabaikan Git. File kerja baru diinisialisasi dari `data/peserta.json` hanya jika belum ada. JSON rusak tidak ditimpa. `PESERTA_DATA_FILE` dapat mengisolasi lokasi data untuk pengujian. Aplikasi digunakan oleh satu proses lokal.

Tahap akhir membangun [CRUD](latihan/10-crud-peserta/README.md), [penyimpanan JSON](latihan/11-penyimpanan-json/README.md), [menu terminal](latihan/12-menu-terminal/README.md), dan [pengujian](latihan/13-pengujian-akhir/README.md). Perkiraan kelas tiga sesi masing-masing empat jam, termasuk praktik dan jeda.

## Jalankan proyek

Gunakan Node.js 22 atau lebih baru. Tidak perlu memasang dependency. Jalankan semua perintah dari root repository, yaitu direktori yang berisi `package.json` dan `main.js`.

Untuk proyek peserta:

```bash
npm --prefix latihan/proyek start
```

Starter menampilkan pesan pembuka. Lanjutkan [tahap 00](latihan/00-persiapan/README.md) untuk mulai menulis aplikasi. Setelah tahap 13, jalankan `npm --prefix latihan/proyek test` untuk menguji kode peserta.

Untuk aplikasi referensi dan pemeriksaan materi:

| Perintah | Hasil |
|---|---|
| `npm start` | Membuka menu interaktif 0–8; pilih 0 untuk keluar. |
| `npm test` | Menjalankan 79 pengujian lama, suite CRUD/file/menu, dan tujuh solusi tambahan. |
| `npm run cek-latihan` | Memeriksa tujuh solusi tambahan di `latihan/referensi/`. |
| `npm run cek-panduan` | Memeriksa kode dan output panduan dalam proyek sementara, lalu menguji aplikasi hasil praktik. |

Pengujian root dan pemeriksaan panduan tidak menilai progres kode peserta. Pemeriksa panduan tidak menimpa proyek peserta.

## Struktur repository

```text
modern-javascript-basic/
├── README.md                 # Titik masuk materi
├── instructor.md             # Kegiatan mengajar dan pembahasan
├── CLAUDE.md                 # Panduan pemeliharaan untuk agen
├── docs/
│   ├── QUICK_START.md        # Persiapan dan perintah awal
│   ├── reference/            # Konsep, implementasi, dan kesalahan umum
│   └── archive/              # Studi kasus awal, ringkasan, dan rencana lama
├── latihan/
│   ├── README.md             # Indeks utama tahap 00–13
│   ├── 00-persiapan/         # Awal praktik; folder bernomor berlanjut sampai 13
│   ├── proyek/               # Satu proyek yang dikerjakan peserta
│   ├── referensi/            # Tujuh solusi latihan tambahan
│   ├── cek.js                # Pemeriksa solusi tambahan
│   └── verifikasi-panduan.js # Pemeriksa panduan bertahap
├── data/                     # Data aplikasi referensi
├── utils/                    # CRUD, store, loader, processor, formatter, validator
├── test/                     # Pengujian dan fixture referensi
├── main.js                   # Aplikasi referensi
└── package.json
```

Alur aplikasi referensi adalah file kerja JSON → store → CRUD dan processor → formatter serta validator → menu di `main.js`. Saat memperbarui materi, pertahankan marker blok kode pada panduan dan jalankan `npm run cek-panduan`.

## Arsip

[Studi kasus ES6 awal](docs/archive/ES6-Study-Cases.md), [ringkasan implementasi](docs/archive/IMPLEMENTATION_SUMMARY.md), dan [rencana kerja lama](docs/archive/plans/) disimpan sebagai catatan historis. Versi kode ES6 awal tersedia pada tag Git `es6-baseline`.

## Author dan lisensi

Brainmatics Training. Materi ini menggunakan lisensi MIT.
