# Studi Kasus ES2016+ Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Reshape the training system so each of the seven points in the study case below is implemented and visible in the code.

**Architecture:**
- `PesertaValidator` becomes the single owner of pass/fail rules: the threshold, the status list, `getStatus`, and `isValidStatus` using `includes()`. The formatter imports these rules instead of hard-coding `>= 80` three times.
- Participant data moves from `data/peserta.js` to `data/peserta.json`. A new `utils/pesertaLoader.js` reads it with async/await and try/catch, then normalizes each record with rest/spread, `?.`, and `??`.
- `main.js` and the tests load data through the loader using top-level `await`.

**Tech Stack:** Node.js ≥ 22, native ES modules, `node:fs/promises`, no dependencies. Tests use the custom assert harness in `test/test-all.js`.

**Spec:** the study case below, as given by the user.

> Kelola peserta dan tentukan Lulus atau Tidak Lulus dari nilai tes terakhir.
> Gunakan const/let dan function dengan default parameter.
> Terapkan destructuring dan object rest/spread (ES2018).
> Gunakan Set untuk deduplikasi dan Map untuk index peserta.
> Buat class validator dan pisahkan dengan export/import.
> Validasi status peserta dengan includes() (ES2016).
> Muat data dengan async/await + try/catch; gunakan ?. dan ??.

## Requirement map

| # | Requirement | Where | State today → change |
|---|---|---|---|
| 1 | Lulus / Tidak Lulus from the **last** test score | `createPesertaMap` (latest entry per email wins), `PesertaValidator.getStatus` | Dedup already keeps the latest entry. The label changes from `BELUM LULUS` to **`TIDAK LULUS`**, and the threshold gets one home (Task 1, 2) |
| 2 | const/let, default parameters | everywhere; `let` + try/catch in `main.js` | Already done. `main.js` gains a real `let` use (Task 4) |
| 3 | destructuring + object **rest**/spread | `loadPeserta` normalizer, `createPesertaMap`, `main.js` TASK 3 | Only destructuring exists today. Rest and spread are added (Task 3, 4) |
| 4 | Set dedup, Map index | `getUniqueEmails`, `createPesertaMap` | Already done. No change beyond spread |
| 5 | validator class + export/import | `utils/pesertaValidator.js`, imported by the formatter and `main.js` | The class exists. The formatter now imports it (Task 2) |
| 6 | status validation with `includes()` | `PesertaValidator.isValidStatus`, used by `displayPeserta` | Missing → added (Task 1, 2) |
| 7 | async/await + try/catch; `?.` and `??` | `utils/pesertaLoader.js`, `main.js`, formatters | Missing → added (Task 2, 3, 4) |

Out of scope:
- **Extra ES2016+ features the case doesn't ask for.** This covers `**`, `padEnd`, `Object.groupBy`, `toSorted`, private fields, and promise combinators. The earlier version of this plan had them, and they were cut.
- **ES6 tutorial docs.** `BEGINNER_GUIDE.md`, `COMMON_ERRORS.md`, and `ES6-Study-Cases.md` teach ES6 from scratch. They get label and Node version fixes only, plus a pointer to the new case in the README.

## Global Constraints

- Node floor: `"engines": { "node": ">=22" }` in `package.json`, because 22 is the oldest LTS still supported. Top-level await alone would need 14.8+.
- Status labels, exactly: `"LULUS"` and `"TIDAK LULUS"`. The detailed report shows `"✅ LULUS"` / `"❌ TIDAK LULUS"`. The passing score is `80`, meaning `score >= 80` is LULUS.
- Output strings, other than the label change, stay byte-identical: `Nama: X, Score: N, Status: S`, `📚 X - Class: C - Score: N`, `X mendapat score N - SESUAI STANDAR|TIDAK SESUAI`, and the detailed-report box.
- Keep the existing style. Use named `export const` arrow functions with default parameters, `.js` extensions in imports, `class: className` renaming, and JSDoc on every export.
- New or changed code gets a teaching comment that names the feature and its ES version and says why it's used, for example `// ES2020 ?? : ...`. Error messages are in Indonesian.
- File paths resolve with `new URL("…", import.meta.url)`, so commands work from any working directory.

## Review Focus

1. **Data file missing or malformed.** `npm start` prints one Indonesian error line naming the file and exits with code 1. It must not print a raw stack trace. Pinned in Tasks 3 and 4.
2. **JSON is `null` or has no `peserta` key.** The loader returns `[]` instead of crashing. Pinned in Task 3.
3. **Record without `score`.** The score becomes `0`, so the status is TIDAK LULUS and the average is not `NaN`. Pinned in Task 3.
4. **Boundary scores.** `80` is LULUS and `79` is TIDAK LULUS. Pinned in Task 1.
5. **Invalid status passed to `displayPeserta`.** Examples are `"CUSTOM STATUS"`, lowercase `"lulus"`, and the old `"BELUM LULUS"`. `includes()` is case-sensitive, so these fall back to the status computed from the score. They are never printed. Pinned in Task 2.

---

### Task 1: Validator owns the pass/fail rules (`includes()`)

**Files:**
- Modify: `package.json` (add `engines`)
- Modify: `utils/pesertaValidator.js`
- Test: `test/test-all.js` (Suite 9)

**Interfaces:**
- Produces: `PesertaValidator.PASSING_SCORE = 80` and `PesertaValidator.STATUS = ["LULUS", "TIDAK LULUS"]`. These are ES2022 static fields.
- Produces: `PesertaValidator.getStatus(score = 0) => "LULUS" | "TIDAK LULUS"`, a static method.
- Produces: `PesertaValidator.isValidStatus(status) => boolean`, a static method that returns `PesertaValidator.STATUS.includes(status)`.
- Changes: `createPassingValidator()` uses `PesertaValidator.PASSING_SCORE` instead of the literal `80`. The instance API is unchanged.

- [ ] **Step 1: Tag the baseline and capture the current output**

```bash
git tag es6-baseline
node main.js > /tmp/main-before.txt
```

- [ ] **Step 2: Write the failing tests**

Append to Suite 9:
```javascript
assertEqual(PesertaValidator.PASSING_SCORE, 80, "Passing score is 80");
assertEqual(PesertaValidator.STATUS, ["LULUS", "TIDAK LULUS"], "Status list");
assertEqual(PesertaValidator.getStatus(80), "LULUS", "80 is LULUS (boundary)");
assertEqual(PesertaValidator.getStatus(79), "TIDAK LULUS", "79 is TIDAK LULUS (boundary)");
assertEqual(PesertaValidator.getStatus(), "TIDAK LULUS", "Default score 0 is TIDAK LULUS");
assert(PesertaValidator.isValidStatus("LULUS"), "includes() accepts LULUS");
assert(PesertaValidator.isValidStatus("TIDAK LULUS"), "includes() accepts TIDAK LULUS");
assert(!PesertaValidator.isValidStatus("lulus"), "includes() is case-sensitive");
assert(!PesertaValidator.isValidStatus("BELUM LULUS"), "Old label is no longer valid");
assert(!PesertaValidator.isValidStatus(undefined), "undefined is not a status");
```

- [ ] **Step 3: Run the tests and confirm they fail**

Run: `npm test`
Expected: `❌ FAIL: Passing score is 80`, then a crash with `TypeError: PesertaValidator.getStatus is not a function`.

- [ ] **Step 4: Implement the statics in `utils/pesertaValidator.js` and add `"engines": { "node": ">=22" }` to `package.json`**

The comment on `isValidStatus` explains that `includes()` (ES2016) replaces `indexOf(x) !== -1` and compares with strict equality.

- [ ] **Step 5: Run the tests and confirm they pass**

Run: `npm test`
Expected: `❌ Tests Failed: 0`.

- [ ] **Step 6: Commit**

```bash
git add package.json utils/pesertaValidator.js test/test-all.js
git commit -m "feat: validator owns pass/fail rules, validates status with includes()"
```

### Task 2: Formatter imports the validator; TIDAK LULUS; `??` null-safety

**Files:**
- Modify: `utils/pesertaFormatter.js` (`displayPeserta`, `createPesertaSummary`, `formatPesertaList`, `createDetailedReport`)
- Test: `test/test-all.js` (Suites 7 and 8, new Suite 10 `createDetailedReport`)

**Interfaces:**
- Consumes: `PesertaValidator.getStatus` and `PesertaValidator.isValidStatus` from Task 1.
- Changes: `displayPeserta(name = "Unknown", score = 0, status = PesertaValidator.getStatus(score))`. It prints `status` only when `isValidStatus(status)` is true. Otherwise it prints `getStatus(score)`.
- Changes: `createPesertaSummary(peserta)` and `createDetailedReport(peserta)` destructure from `peserta ?? {}`, so they accept `null`.

- [ ] **Step 1: Write the failing tests**

In Suite 7, change the expected `BELUM LULUS` in the two existing assertions to `TIDAK LULUS`. Then replace the "Accepts custom status parameter" assertion with:
```javascript
assertEqual(displayPeserta("Test", 90, "TIDAK LULUS"), "Nama: Test, Score: 90, Status: TIDAK LULUS", "Valid status override is kept");
assertEqual(displayPeserta("Test", 90, "CUSTOM STATUS"), "Nama: Test, Score: 90, Status: LULUS", "Invalid status falls back to computed");
assertEqual(displayPeserta("Test", 70, "lulus"), "Nama: Test, Score: 70, Status: TIDAK LULUS", "Lowercase status is invalid");
```

Append to Suite 8:
```javascript
assertEqual(createPesertaSummary(null), "📚 Unknown - Class: N/A - Score: 0", "Handles null with ??");
assertEqual(createPesertaSummary({ name: "Nol", class: "C", score: 0 }), "📚 Nol - Class: C - Score: 0", "Score 0 is kept");
```

New Suite 10. Add `createDetailedReport` to the formatter import:
```javascript
const report = createDetailedReport({ id: 104, name: "Milea Kusuma", email: "milea@brainmatics.com", class: "JavaScript Fundamentals", score: 78 });
assert(report.includes("  Status   : ❌ TIDAK LULUS"), "Detailed report uses TIDAK LULUS");
assert(createDetailedReport(null).includes("  Nama     : Unknown"), "Detailed report handles null");
```

- [ ] **Step 2: Run the tests and confirm they fail**

Run: `npm test`
Expected: `❌ FAIL: Formats failing score correctly`, showing `Actual: "...BELUM LULUS"`. The run then crashes with `TypeError: Cannot destructure property 'name' of 'peserta' as it is null`.

- [ ] **Step 3: Implement the changes in `utils/pesertaFormatter.js`**

Import `PesertaValidator` from `./pesertaValidator.js`. Replace all three `score >= 80 ? …` expressions with `PesertaValidator.getStatus(score)`. In both report functions, drop the `= {}` parameter default and use `peserta ?? {}`. The comment explains that default parameters only catch `undefined`, while `??` also catches `null`.

- [ ] **Step 4: Run the tests and confirm they pass**

Run: `npm test`
Expected: `❌ Tests Failed: 0`. Also run `grep -n ">= 80\|BELUM" utils/` and expect no output.

- [ ] **Step 5: Commit**

```bash
git add utils/pesertaFormatter.js test/test-all.js
git commit -m "feat: formatter uses validator rules, TIDAK LULUS label, null-safe with ??"
```

### Task 3: Async loader with rest/spread, `?.`, and `??`; data moves to JSON

**Files:**
- Create: `data/peserta.json`. It has the same 6 records as `data/peserta.js`, in the same order, wrapped as `{ "peserta": [ … ] }`.
- Create: `utils/pesertaLoader.js`
- Modify: `utils/pesertaProcessor.js` (`createPesertaMap` only)
- Create: `test/fixtures/rusak.json` with content `{ "peserta": [`, `test/fixtures/null.json` with content `null`, and `test/fixtures/kosong.json` with content `{}`
- Create: `test/fixtures/tanpa-score.json` with content `{ "peserta": [{ "id": 1, "name": "Tanpa Nilai", "email": "x@brainmatics.com", "class": "React Basics", "catatan": "susulan" }] }`
- Test: `test/test-all.js` (replace the `rawPeserta` import, add an `assertRejects` helper, new Suite 11 `loadPeserta`)

**Interfaces:**
- Produces: `loadPeserta(fileUrl = new URL("../data/peserta.json", import.meta.url)) => Promise<Peserta[]>`. It is an `async` function.
  - In a `try` block: `await readFile(fileUrl, "utf8")`, then `JSON.parse`.
  - It returns `(json?.peserta ?? []).map(({ score, ...rest }) => ({ ...rest, score: score ?? 0 }))`.
  - `catch (error)` rethrows `new Error(`Gagal memuat data peserta dari ${fileUrl}: ${error.message}`)`.
- Changes: `createPesertaMap` stores `{ ...peserta }` (ES2018 spread copy) instead of re-listing five fields, so extra fields such as `catatan` are kept.
- Produces (test helper): `assertRejects(fn, messagePart, testName) => Promise<void>`. It passes when `await fn()` rejects with an error whose `message` contains `messagePart`.

- [ ] **Step 1: Create the data and fixture files listed above**

Keep `data/peserta.js` for now. `main.js` still imports it until Task 4, so `npm start` keeps working at every commit.

- [ ] **Step 2: Update the tests**

Replace `import { rawPeserta } from '../data/peserta.js'` with an import of `loadPeserta` from `../utils/pesertaLoader.js`, followed by `const rawPeserta = await loadPeserta();` (ES2022 top-level await). Define `const fixture = (name) => new URL(`./fixtures/${name}`, import.meta.url);`.

Add Suite 11 before `TEST SUMMARY`:
```javascript
assertEqual(rawPeserta.length, 6, "async loadPeserta reads 6 records");
assertEqual(rawPeserta[2].score, 88, "Records keep their order and scores");
await assertRejects(() => loadPeserta(fixture("tidak-ada.json")), "Gagal memuat data peserta", "Missing file rejects with Indonesian message");
await assertRejects(() => loadPeserta(fixture("tidak-ada.json")), "tidak-ada.json", "Error names the file");
await assertRejects(() => loadPeserta(fixture("rusak.json")), "rusak.json", "Malformed JSON caught by try/catch");
assertEqual(await loadPeserta(fixture("null.json")), [], "JSON null gives [] via ?. and ??");
assertEqual(await loadPeserta(fixture("kosong.json")), [], "Missing peserta key gives []");
const tanpaScore = await loadPeserta(fixture("tanpa-score.json"));
assertEqual(tanpaScore[0].score, 0, "Missing score becomes 0 via ??");
assertEqual(tanpaScore[0].catatan, "susulan", "Rest/spread keeps extra fields");
assertEqual(calculateAverageScore(tanpaScore), 0, "Average is 0, not NaN");
assertEqual(createPesertaMap(tanpaScore).get("x@brainmatics.com").catatan, "susulan", "createPesertaMap spread keeps extra fields");
```

- [ ] **Step 3: Run the tests and confirm they fail**

Run: `npm test`
Expected: crashes with `Cannot find module '…/utils/pesertaLoader.js'`.

- [ ] **Step 4: Implement `utils/pesertaLoader.js` and change `createPesertaMap` as described in the Interfaces block**

The loader's comments explain three things:
- Why `?.` and `??` are needed: `JSON.parse("null")` returns `null`.
- What rest/spread does in the normalizer: it pulls `score` out and copies everything else.
- That `await` pauses only this function and doesn't block the process.

- [ ] **Step 5: Run the tests and confirm they pass**

Run: `npm test`
Expected: `❌ Tests Failed: 0`.

- [ ] **Step 6: Commit**

```bash
git add -A data utils/pesertaLoader.js utils/pesertaProcessor.js test
git commit -m "feat: load peserta from JSON with async/await, try/catch, rest/spread, ?. and ??"
```

### Task 4: `main.js` loads asynchronously and demonstrates rest, `?.`, and `??`

**Files:**
- Modify: `main.js`
- Delete: `data/peserta.js` (nothing imports it after this task)

**Interfaces:**
- Consumes: `loadPeserta` from Task 3, and `PesertaValidator.isValidStatus` from Task 1.

- [ ] **Step 1: Implement**

- Replace the `rawPeserta` import with the following. `let` is required here because the value is assigned inside `try`:
  ```javascript
  let rawPeserta;
  try {
    rawPeserta = await loadPeserta();
  } catch (error) {
    console.error(`❌ ${error.message}`);
    process.exit(1);
  }
  ```
- TASK 3: after the existing renaming demo, print ``Sisa properti (rest): ${JSON.stringify(sisanya)}``, where `sisanya` comes from `const { name, ...sisanya } = pesertaSample;`.
- TASK 5: after the Aditya report, print ``Score tidak-ada@brainmatics.com: ${pesertaMap.get("tidak-ada@brainmatics.com")?.score ?? "tidak ditemukan"}``.
- TASK 8: rename the label `Invalid (BELUM LULUS)` to `Invalid (TIDAK LULUS)`. Then, after the individual results, print `Validasi status (includes): "LULUS" → true, "lulus" → false`, computed with `PesertaValidator.isValidStatus`.
- Update the line-51 comment from `BELUM LULUS` to `TIDAK LULUS`.

- [ ] **Step 2: Verify the output diff**

Run: `node main.js > /tmp/main-after.txt; diff <(sed 's/BELUM LULUS/TIDAK LULUS/g' /tmp/main-before.txt) /tmp/main-after.txt`
Expected: only `>` additions. These are the rest line in TASK 3, the `tidak ditemukan` line in TASK 5, and the includes line in TASK 8.

- [ ] **Step 3: Verify the error path**

Run: `mv data/peserta.json /tmp/peserta.json; node main.js; echo "exit=$?"; mv /tmp/peserta.json data/peserta.json`
Expected: exactly one line, `❌ Gagal memuat data peserta dari file:///…/data/peserta.json: ENOENT…`, then `exit=1`. No stack trace.

- [ ] **Step 4: Run the tests**

Run: `npm test`
Expected: `❌ Tests Failed: 0`.

- [ ] **Step 5: Commit**

```bash
git add -A main.js data
git commit -m "feat: main loads data with await/try-catch, demos rest, ?., ??, includes"
```

### Task 5: Docs explain the case

**Files:**
- Modify: `README.md`, `CODE_HIGHLIGHTS.md`, `IMPLEMENTATION_SUMMARY.md`, `CLAUDE.md`, `.github/copilot-instructions.md`
- Modify (labels, Node version, and the `peserta.js` path only): `QUICK_START.md`, `BEGINNER_GUIDE.md`, `ES6-Study-Cases.md`

- [ ] **Step 1: Update the docs**

- `README.md`:
  - Add a "Studi Kasus" section with the seven case lines verbatim, followed by the Requirement map table from this plan.
  - Change the prerequisite to `Node.js v22+`.
  - Update the architecture tree: `data/peserta.json` and `utils/pesertaLoader.js`.
  - Change the business rules to LULUS / TIDAK LULUS.
  - Set the test count to what `npm test` now prints.
  - Mention the `es6-baseline` tag.
- `CODE_HIGHLIGHTS.md`:
  - Update the snippets that changed: `displayPeserta`, `createPesertaMap`, and `PesertaValidator`.
  - Add one annotated section for each case point that is new: rest/spread, `includes()`, async/await + try/catch, and `?.` / `??`. Use the existing `✨` / `📌` annotation style. The async section notes that an `async` function always returns a Promise and shows the equivalent `loadPeserta().then(...).catch(...)`.
- `IMPLEMENTATION_SUMMARY.md`: list the seven points with their files, and fix the test count.
- `CLAUDE.md`:
  - Change Node to 22+.
  - The data now lives in `data/peserta.json` and is loaded via `loadPeserta` (async). The tests use top-level await.
  - `PesertaValidator` statics are the single source of the threshold and labels. Replace the "threshold hard-coded in three places" note with this.
  - Drop the stale "README claims 55" note.
- `.github/copilot-instructions.md`:
  - Change the status rule to LULUS / TIDAK LULUS via `PesertaValidator.getStatus`.
  - Add these rules: use `??`, not `||`, where `0` is valid; validate statuses with `includes()`; load data only through `loadPeserta`.
- `QUICK_START.md`, `BEGINNER_GUIDE.md`, `ES6-Study-Cases.md`: change `BELUM LULUS` to `TIDAK LULUS` and Node `14+` to `22+`. Add one line at the top of `ES6-Study-Cases.md` that says the current case is in the README.

- [ ] **Step 2: Verify that no stale references remain**

Run: `grep -rn "BELUM LULUS\|14+\|v14\|Passed: 55\|data/peserta\.js" --include=*.md --exclude-dir=docs . ; grep -rn "BELUM LULUS\|peserta\.js'" main.js utils`
Expected: no output. The test file is excluded on purpose, because it asserts that `"BELUM LULUS"` is no longer a valid status.

- [ ] **Step 3: Commit**

```bash
git add -A '*.md' .github
git commit -m "docs: explain the study case and its ES2016+ requirements"
```
