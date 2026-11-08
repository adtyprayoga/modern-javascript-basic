# Studi Kasus Latihan ES6 

## Studi Kasus: Sistem Manajemen Peserta Training (Brainmatics Level)

### Deskripsi Masalah
Anda adalah trainer di Brainmatics yang perlu mengelola peserta training. Sistem harus:
1. Menyimpan data peserta (nama, email, kelas, score)
2. Mencari peserta unik (tidak ada duplikat berdasarkan email)
3. Filter peserta berdasarkan kelas
4. Menampilkan daftar peserta dengan format tertentu
5. Menghitung rata-rata score per kelas

### File Input Data
```javascript
// data/peserta.js
export const rawPeserta = [
  { id: 101, name: "Aditya Prayoga", email: "aditya@brainmatics.com", class: "JavaScript Fundamentals", score: 85 },
  { id: 102, name: "Zaim Fauzan", email: "zaim@brainmatics.com", class: "React Basics", score: 92 },
  { id: 103, name: "Aditya Prayoga", email: "aditya@brainmatics.com", class: "JavaScript Fundamentals", score: 88 }, // duplikat email
  { id: 104, name: "Milea Kusuma", email: "milea@brainmatics.com", class: "JavaScript Fundamentals", score: 78 },
  { id: 105, name: "Pratama Wijaya", email: "pratama@brainmatics.com", class: "React Basics", score: 95 },
  { id: 106, name: "Zaim Fauzan", email: "zaim@brainmatics.com", class: "React Basics", score: 94 }, // duplikat email
];
```

### Challenge Tasks

#### Task 1.1: Buat Function dengan Default Parameter
```javascript
// Gunakan default parameter untuk status peserta
// Jika score >= 80, status = "LULUS", jika < 80 = "BELUM LULUS"
// Fungsi harus menggunakan arrow function dan template literal

function displayPeserta(name = "Unknown", score = 0, status = score >= 80 ? "LULUS" : "BELUM LULUS") {
  // WRITE YOUR CODE HERE
  // Output format: "Nama: [name], Score: [score], Status: [status]"
}

// Test
displayPeserta("Aditya", 85);      // Ekspektasi: "Nama: Aditya, Score: 85, Status: LULUS"
displayPeserta("Milea", 78);       // Ekspektasi: "Nama: Milea, Score: 78, Status: BELUM LULUS"
displayPeserta();                  // Ekspektasi: "Nama: Unknown, Score: 0, Status: BELUM LULUS"
```

#### Task 1.2: Gunakan Destructuring untuk Extract Data
```javascript
// Ambil data peserta dan split menjadi variabel terpisah
// Gunakan object destructuring dengan renaming

// WRITE YOUR CODE HERE
// Destructure dengan renaming:
// - name → pesertaNama
// - email → pesertaEmail
// - score → nilaiAkhir

const peserta = { id: 101, name: "Aditya", email: "aditya@brainmatics.com", score: 85 };

// Test
console.log(pesertaNama);     // "Aditya"
console.log(pesertaEmail);    // "aditya@brainmatics.com"
console.log(nilaiAkhir);      // 85
```

#### Task 1.3: Gunakan Set untuk Menghapus Duplikat
```javascript
// Gunakan Set untuk mendapatkan email unik dari rawPeserta
// Konversi kembali ke array menggunakan spread operator

export function getUniqueEmails(pesertaList) {
  // WRITE YOUR CODE HERE
  // Return array dari unique emails
  // Gunakan: new Set(), spread operator, for...of loop
}

// Test
console.log(getUniqueEmails(rawPeserta));
// Ekspektasi: ["aditya@brainmatics.com", "zaim@brainmatics.com", "milea@brainmatics.com", "pratama@brainmatics.com"]
// (hanya 4 email, bukan 6 karena duplikat dihilangkan)
```

#### Task 1.4: Gunakan Map untuk Index Peserta
```javascript
// Buat Map dengan key = email, value = data peserta
// Ambil data unik berdasarkan email (gunakan Map, spread operator, destructuring)

export function createPesertaMap(pesertaList) {
  const uniqueEmails = new Set(pesertaList.map(p => p.email));
  
  // WRITE YOUR CODE HERE
  // Buat Map: key = email, value = data peserta terakhir dengan email tersebut
  // Gunakan: for...of loop, destructuring
  
  // Return Map
}

// Test
const pesertaMap = createPesertaMap(rawPeserta);
console.log(pesertaMap.get("aditya@brainmatics.com"));
// Ekspektasi: { id: 103, name: "Aditya Prayoga", email: "aditya@brainmatics.com", score: 88 }
```

#### Task 1.5: Gunakan Class untuk Validator
```javascript
// Buat class PesertaValidator dengan method untuk validasi
// Gunakan constructor, method, dan arrow function

class PesertaValidator {
  constructor(minScore = 60, maxScore = 100) {
    // WRITE YOUR CODE HERE
    // Inisialisasi minScore dan maxScore
  }

  // WRITE YOUR CODE HERE
  // Method untuk cek apakah score valid
  // Nama method: isValidScore(score) → boolean
  
  // Method untuk format output
  // Nama method: formatResult(name, score) → string
  // Format: "[name] mendapat score [score] - [STATUS]"
  // STATUS: "SESUAI STANDAR" jika score antara min-max, "TIDAK SESUAI" jika di luar
}

// Test
const validator = new PesertaValidator(80, 100);
console.log(validator.isValidScore(85));        // true
console.log(validator.isValidScore(75));        // false
console.log(validator.formatResult("Aditya", 85));  // "Aditya mendapat score 85 - SESUAI STANDAR"
```

#### Task 1.6: Kombinasi Semua - Module Export/Import
```javascript
// Buat 3 file terpisah:

// file: utils/pesertaProcessor.js
export const getPesertaByClass = (pesertaList, className) => {
  // WRITE YOUR CODE HERE
  // Gunakan for...of loop dan destructuring untuk filter
  // Return array peserta di kelas tertentu
};

export const calculateAverageScore = (pesertaList = []) => {
  // WRITE YOUR CODE HERE
  // Gunakan spread operator dan reduce untuk hitung rata-rata score
  // Return number (rata-rata)
};

// file: utils/pesertaFormatter.js
export const createPesertaSummary = (peserta) => {
  const { name, score, class: className } = peserta;
  // WRITE YOUR CODE HERE
  // Return template literal dengan format:
  // "📚 [name] - Class: [className] - Score: [score]"
};

// file: main.js
import { getPesertaByClass, calculateAverageScore } from './utils/pesertaProcessor.js';
import { createPesertaSummary } from './utils/pesertaFormatter.js';

// WRITE YOUR CODE HERE
// 1. Filter peserta dari class "JavaScript Fundamentals"
// 2. Hitung rata-rata score kelas tersebut
// 3. Tampilkan summary setiap peserta
// 4. Tampilkan rata-rata score
```

## Tips Mengerjakan

1. **Baca requirements dengan teliti** - pahami apa yang diminta sebelum coding
2. **Gunakan console.log() untuk debug** - pastikan output sesuai ekspektasi
3. **Test satu function at a time** - jangan buat semuanya sekaligus
4. **Perhatikan ES6 features** yang diminta dalam setiap task
5. **Refactor kode** - cek apakah bisa lebih singkat dengan spread operator, destructuring, dll
6. **Jangan lupa error handling** - cek validation di class/function

---

Happy Coding! 🚀