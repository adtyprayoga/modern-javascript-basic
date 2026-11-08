# Latihan Studi Kasus

> One exercise for each point of the study case in `README.md`. Do them after `BEGINNER_GUIDE.md`.

**How it works:**
1. Create your own file in `latihan/` with the name given, for example `latihan/01-nilai-terakhir.js`.
2. Run it with `node latihan/01-nilai-terakhir.js`.
3. Compare your output with **Expected output**. It must match exactly.
4. Stuck? Open the solution in `latihan/solusi/`.

**⚠️ Never edit `data/peserta.json`.** The tests depend on it. Practice data lives in `latihan/`.

Your files sit next to `latihan/solusi/`, so imports start with `../`, for example `import { loadPeserta } from '../utils/pesertaLoader.js';`.

---

## Latihan 01: Nilai Tes Terakhir

> Kelola peserta dan tentukan Lulus atau Tidak Lulus dari nilai tes terakhir.

**Task:** `latihan/peserta-retake.json` holds three tests by Rina Sari (70, 76, 82). Load it with `loadPeserta(new URL('./peserta-retake.json', import.meta.url))`, keep only her last test, and print her status with `displayPeserta`.

**Hint:** Phase 8 (Map keeps the latest entry) and Phase 13 (`getStatus`).

**File:** `latihan/01-nilai-terakhir.js`

**Expected output:**
```
Nama: Rina Sari, Score: 82, Status: LULUS
```

**Solution:** [`latihan/solusi/01-nilai-terakhir.js`](latihan/solusi/01-nilai-terakhir.js)

---

## Latihan 02: const dan let

> Gunakan const/let dan function dengan default parameter.

**Task:** Load the default data and remove duplicates with `getUniquePeserta`. Then count how many participants are LULUS, using a `let` counter in a `for...of` loop. Everything else is `const`.

**Hint:** Phase 2 (const & let) and Phase 9 (for...of).

**File:** `latihan/02-const-let.js`

**Expected output:**
```
Jumlah LULUS: 3
```

**Solution:** [`latihan/solusi/02-const-let.js`](latihan/solusi/02-const-let.js)

---

## Latihan 03: Destructuring dan Object Rest

> Terapkan destructuring dan object rest/spread (ES2018).

**Task:** Take the first unique participant and print it as JSON **without** the `email` field. Use object rest, not `delete`.

**Hint:** Phase 6 (destructuring) and Phase 14 (rest/spread).

**File:** `latihan/03-rest-spread.js`

**Expected output:**
```
{"id":103,"name":"Aditya Prayoga","class":"JavaScript Fundamentals","score":88}
```

**Solution:** [`latihan/solusi/03-rest-spread.js`](latihan/solusi/03-rest-spread.js)

---

## Latihan 04: Set dan Map

> Gunakan Set untuk deduplikasi dan Map untuk index peserta.

**Task:** Use a `Set` to count how many different classes appear in the raw data. Then use `createPesertaMap` to look up Zaim's latest score by email.

**Hint:** Phase 7 (Set) and Phase 8 (Map).

**File:** `latihan/04-set-map.js`

**Expected output:**
```
Jumlah kelas: 2
zaim@brainmatics.com: 94
```

**Solution:** [`latihan/solusi/04-set-map.js`](latihan/solusi/04-set-map.js)

---

## Latihan 05: Class Validator dengan export/import

> Buat class validator dan pisahkan dengan export/import.

**Task:**
1. In `latihan/kelasValidator.js`, export a class `KelasValidator` with `static KELAS = ["JavaScript Fundamentals", "React Basics"]` and `static isValidKelas = (kelas) => ...`.
2. In a second file, import it and check two class names.

**Hint:** Phase 11 (classes), Phase 12 (modules), and Phase 13 (static members).

**File:** `latihan/05-validator-module.js` (plus `latihan/kelasValidator.js`)

**Expected output:**
```
JavaScript Fundamentals: true
Python Advanced: false
```

**Solution:** [`latihan/solusi/05-validator-module.js`](latihan/solusi/05-validator-module.js) and [`latihan/solusi/kelasValidator.js`](latihan/solusi/kelasValidator.js)

---

## Latihan 06: Validasi Status dengan includes()

> Validasi status peserta dengan includes() (ES2016).

**Task:** From `["LULUS", "lulus", "TIDAK LULUS", "PENDING"]`, keep only the valid statuses using `PesertaValidator.isValidStatus`. Print the result with `JSON.stringify`.

**Hint:** Phase 13 (`includes()` is case-sensitive).

**File:** `latihan/06-includes.js`

**Expected output:**
```
["LULUS","TIDAK LULUS"]
```

**Solution:** [`latihan/solusi/06-includes.js`](latihan/solusi/06-includes.js)

---

## Latihan 07: async/await, try/catch, ?. dan ??

> Muat data dengan async/await + try/catch; gunakan ?. dan ??.

**Task:**
1. Start with `let peserta = [];`.
2. Inside `try`, load `new URL('./tidak-ada.json', import.meta.url)`, a file that does not exist.
3. In `catch`, print the fallback message.
4. Then print the first participant's name with `?.` and `??`.

**Hint:** Phase 15 (`?.` and `??`) and Phase 16 (async/await + try/catch).

**File:** `latihan/07-async-try-catch.js`

**Expected output:**
```
Data tidak bisa dimuat, memakai daftar kosong
Peserta pertama: tidak ada
```

**Solution:** [`latihan/solusi/07-async-try-catch.js`](latihan/solusi/07-async-try-catch.js)

---

## Cek Semua Solusi

```bash
npm run cek-latihan
```

This runs every file in `latihan/solusi/` and compares its output with the matching `.expected.txt` file. `npm test` runs the same check after the unit tests, so a change that breaks an exercise also fails `npm test`.

```
✅ 01-nilai-terakhir
...
Latihan: 7/7 cocok
```
