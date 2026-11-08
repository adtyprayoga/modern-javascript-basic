# Latihan tambahan dan solusi referensi

Folder ini mempertahankan tujuh latihan studi kasus lama. Kode mengimpor utils aplikasi referensi di root. Untuk membangun aplikasi sendiri, ikuti [tahap 00–11](../README.md).

| Latihan | Solusi | Target output |
|---|---|---|
| 01-nilai-terakhir | [Kode](01-nilai-terakhir.js) | [Output](01-nilai-terakhir.expected.txt) |
| 02-const-let | [Kode](02-const-let.js) | [Output](02-const-let.expected.txt) |
| 03-rest-spread | [Kode](03-rest-spread.js) | [Output](03-rest-spread.expected.txt) |
| 04-set-map | [Kode](04-set-map.js) | [Output](04-set-map.expected.txt) |
| 05-validator-module | [Kode](05-validator-module.js) | [Output](05-validator-module.expected.txt) |
| 06-includes | [Kode](06-includes.js) | [Output](06-includes.expected.txt) |
| 07-async-try-catch | [Kode](07-async-try-catch.js) | [Output](07-async-try-catch.expected.txt) |

Jalankan `npm run cek-latihan` dari root repository. Pemeriksa menjalankan solusi dari direktori sementara, lalu membandingkan output dengan berkas expected. Salinan `peserta-retake.json` di folder ini adalah data referensi untuk pemeriksa; data latihan proyek peserta berada di proyeknya sendiri.

Latihan 05 memakai helper [kelasValidator.js](kelasValidator.js). Ketujuh solusi diperiksa juga oleh `npm test` pada root repository.
