# Instructor Guide: Teaching the Studi Kasus

> For the trainer. Learners follow `BEGINNER_GUIDE.md` and `EXERCISES.md`. This guide tells you how to run the class around them: what to show, what to ask, and what usually goes wrong.

## 🎯 Outcome

By the end, each learner can explain and write code for the seven points of the case (README, **Studi Kasus**):

| # | Point | Learners prove it with |
|---|---|---|
| 1 | Lulus / Tidak Lulus from the last test score | Exercise 01 |
| 2 | const/let, default parameters | Exercise 02 |
| 3 | Destructuring, object rest/spread (ES2018) | Exercise 03 |
| 4 | Set for dedup, Map for the index | Exercise 04 |
| 5 | Validator class with export/import | Exercise 05 |
| 6 | Status validation with `includes()` (ES2016) | Exercise 06 |
| 7 | async/await + try/catch, `?.` and `??` | Exercise 07 |

**Audience:** learners who know basic JavaScript (variables, `if`, functions, arrays) and have used a terminal.

---

## ✅ Before Class

**On your machine (the day before):**
- [ ] `node -v` shows v22 or higher
- [ ] `npm test` ends with `Latihan: 7/7 cocok`
- [ ] `npm start` runs and prints TASK 1 to TASK 9
- [ ] `git tag` lists `es6-baseline`, which the before/after demo in Session 2 needs. If learners clone from GitHub, push the tag first with `git push origin es6-baseline`. Otherwise run that demo on your machine only.
- [ ] Terminal font is large enough for the back row

**Send to learners in advance:**
- Install Node.js 22 or higher
- Clone the repo and run `npm test`. They should see `Latihan: 7/7 cocok`.

**Decide one rule before class:** solutions are in `latihan/solusi/`. Ask learners not to open that folder until the lab review, or allow it after 10 minutes of being stuck.

**Reset command.** If a learner edits files they shouldn't, this restores the data files:

```bash
git restore data/peserta.json latihan/peserta-retake.json
```

---

## 🗓️ Course Map

The guide's phases add up to about **6.5 hours** of self-study. The `4-5 hours` in the header of `BEGINNER_GUIDE.md` is too low. Taught live, the material fits into **two sessions of 4 hours**:

| Session | Block | Guide phases | Case points | Minutes |
|---|---|---|---|---|
| 1 | Setup and the case | — | all | 15 |
| 1 | A: Data, const & let | 1–2 | 2 | 25 |
| 1 | B: Functions, defaults, template literals | 3–5 | 2 | 35 |
| 1 | *Break* | | | 10 |
| 1 | C: Destructuring | 6 | 3 | 20 |
| 1 | D: Set, Map, for...of | 7–9 | 1, 4 | 55 |
| 1 | *Break* | | | 10 |
| 1 | E: Array methods, classes, modules | 10–12 | 5 | 60 |
| 1 | Exit ticket | | | 10 |
| 2 | Recap quiz | | | 10 |
| 2 | F: `includes()` and static rules | 13 | 1, 5, 6 | 20 |
| 2 | G: Object rest & spread | 14 | 3 | 20 |
| 2 | H: `?.` and `??` | 15 | 7 | 20 |
| 2 | *Break* | | | 10 |
| 2 | I: async/await + try/catch | 16 | 7 | 30 |
| 2 | J: Run & test, then the capstone | 17–18 | 1 | 40 |
| 2 | *Break* | | | 10 |
| 2 | Lab: Exercises 01–07 | — | all | 60 |
| 2 | Solution review and exit ticket | | | 20 |

**Other formats:**
- **One-day intensive:** run both sessions with lunch between them. Shorten Block E to 45 minutes and the lab to 45 minutes.
- **Self-paced with office hours:** learners do 6 phases per week for 3 weeks, then the exercises. Use the exit tickets as weekly check-ins.

Each block below has: **Show** (live demo), **Say** (the one message to land), **Ask** (a check with its answer), and **Watch for** (the usual mistake).

---

## 📘 Session 1: ES6 Foundations

### Setup and the case (15 min)

**Show:** Open `README.md` at **Studi Kasus** and read the seven lines aloud. Then run:

```bash
npm start
```

**Say:** "By the end of tomorrow you can write every line of this program yourself, and explain why it is written this way."

**Ask:** "In the output, which participants appear twice in the data?" **Answer:** Aditya and Zaim. TASK 1 shows 6 raw entries but 4 unique emails.

### Block A: Data, const & let (Phases 1–2, 25 min)

**Show:** Open `data/peserta.json`. Point at the two Aditya entries (85, then 88) and keep them on screen; Block D comes back to them.

**Say:** "Start with `const`. Use `let` only when the value must change. Never use `var`."

**Ask:** "Can you change `peserta.score` if `peserta` is a `const`?" **Answer:** Yes. `const` stops you from replacing the variable, not from changing the object inside it (Step 2.3).

**Watch for:** learners who think `const` makes an object read-only. Show `peserta = {}`, which throws `TypeError: Assignment to constant variable.`

### Block B: Functions, defaults, template literals (Phases 3–5, 35 min)

**Show:** TASK 2 in the `npm start` output:

```
Nama: Aditya, Score: 85, Status: LULUS
Nama: Milea, Score: 78, Status: TIDAK LULUS
Nama: Unknown, Score: 0, Status: TIDAK LULUS
```

**Say:** "The third line called `displayPeserta()` with no arguments. Default parameters filled in every value."

**Ask:** "Why is the third status TIDAK LULUS?" **Answer:** `score` defaults to 0, and the status default is computed from that score. 0 is below 80.

**Watch for:** single or double quotes used instead of backticks, so `${name}` prints literally (`COMMON_ERRORS.md` → Template Literal Errors).

### Block C: Destructuring (Phase 6, 20 min)

**Show:** `const { class: className } = peserta;`, then try `const { class } = peserta;` and let it fail.

**Say:** "`class` is a reserved word. Rename it while you destructure."

**Ask:** "What does `{ name: pesertaNama } = peserta` create?" **Answer:** a variable `pesertaNama`. There is no variable called `name`.

**Watch for:** `COMMON_ERRORS.md` → Destructuring Errors ("Unexpected token 'class'").

### Block D: Set, Map, for...of (Phases 7–9, 55 min)

**Show:** TASK 4 (Set, 4 unique emails) and TASK 5 (Map). Go back to the Aditya entries from Block A: the Map holds **88**.

**Say:** "`Map.set()` with an email that already exists *replaces* the old value. That is how we get the *last* test score, which is case point 1."

**Ask:** "`new Set(["a", "b", "a"]).size`?" **Answer:** `2`.

**Watch for:** `mySet[0]`, which gives `undefined`. A Set is not an array; spread it first with `[...mySet]` (`COMMON_ERRORS.md` → Set & Map Errors).

### Block E: Array methods, classes, modules (Phases 10–12, 60 min)

**Show:** `utils/pesertaValidator.js`. Point out the `export` on the class, then the `import` at the top of `utils/pesertaFormatter.js`.

**Say:** "One file, one job. The validator decides LULUS or TIDAK LULUS. Every other file imports that decision instead of repeating it."

**Ask:** "What breaks if you write `import ... from './utils/pesertaValidator'` without `.js`?" **Answer:** Node can't find the module. Native ES modules need the extension.

**Watch for:** missing `.js` in imports, and calling a class without `new` (`COMMON_ERRORS.md` → Module & Import Errors, Class Errors).

### Exit ticket, Session 1 (10 min)

Learners answer on paper or in chat:

1. When do you use `let` instead of `const`? *(When the variable must get a new value, for example a counter.)*
2. Aditya's scores are 85 and then 88. Which score does `createPesertaMap` keep, and why? *(88, because `Map.set` replaces the earlier entry for the same email.)*
3. What does `displayPeserta("Milea", 78)` print? *(`Nama: Milea, Score: 78, Status: TIDAK LULUS`)*

---

## 📗 Session 2: The ES2016+ Case Features

### Recap quiz (10 min)

Ask the Session 1 exit-ticket questions out loud. Spend more time on any question that more than a third of the class missed.

### Block F: `includes()` and static rules (Phase 13, 20 min)

**Show:** the before/after of the pass/fail rule:

```bash
git diff es6-baseline HEAD -- utils/pesertaFormatter.js
```

The old version repeats `score >= 80 ? "LULUS" : "BELUM LULUS"` in three places. The new one calls `PesertaValidator.getStatus(score)`.

**Say:** "The rule lives in one place now. `includes()` checks whether a status is allowed."

**Ask:** `["LULUS"].includes("lulus")`? **Answer:** `false`, because `includes()` is case-sensitive.

**Watch for:** learners expecting a lowercase `"lulus"` to be accepted. Show `displayPeserta("Test", 90, "lulus")`: the invalid status is replaced, and the output says `Status: LULUS`.

### Block G: Object rest & spread (Phase 14, 20 min)

**Show:** TASK 3 in the `npm start` output:

```
Sisa properti (rest): {"id":101,"email":"aditya@brainmatics.com","score":85}
```

**Say:** "`...` on the left of `=` collects (rest). `...` on the right copies out (spread)."

**Ask:** "In `const { name, ...sisanya } = peserta`, is `name` inside `sisanya`?" **Answer:** No. Rest collects only the fields you did not name.

**Watch for:** confusing object spread with the array spread `[...set]` from Block D. They use the same `...` syntax but build different things.

### Block H: `?.` and `??` (Phase 15, 20 min)

**Show:** TASK 5:

```
Score tidak-ada@brainmatics.com: tidak ditemukan
```

Then remove the `?.` in a scratch file and show the `TypeError`.

**Say:** "`?.` stops instead of crashing. `??` gives a fallback only for `null` or `undefined`."

**Ask:** "What are `0 || 80` and `0 ?? 80`?" **Answer:** `80` and `0`. A score of 0 is real, so `||` loses it.

**Watch for:** learners replacing `??` with `||` "because it's the same". It isn't, and this is the most important point in the block.

### Block I: async/await + try/catch (Phase 16, 30 min)

**Show:** `utils/pesertaLoader.js`, then the top of `main.js` (`let rawPeserta; try { ... }`). Then run:

```bash
node latihan/solusi/07-async-try-catch.js
```

This shows the `catch` branch without touching the real data file.

**Say:** "An `async` function always returns a Promise. `await` waits for it. `try`/`catch` catches anything that goes wrong while you wait."

**Ask:** "Why is `rawPeserta` declared with `let` in `main.js`?" **Answer:** It is declared before `try` and assigned inside it, so it gets a new value later.

**Watch for:** learners renaming `data/peserta.json` to see an error and forgetting to rename it back. Use exercise 07 for the demo instead. If it happens anyway, run the reset command from **Before Class**.

### Block J: Run & test, then the capstone (Phases 17–18, 40 min)

**Show:** `npm test`. The unit tests come first, then `📝 CEK LATIHAN` and `Latihan: 7/7 cocok`. Then do Step 18.3 live:

```bash
node latihan/coba-retake.js
```

Change Rina's last score in `latihan/peserta-retake.json` from 82 to 79, run it again, and the status becomes `TIDAK LULUS`. Change it back.

**Say:** "Seven points, one flow: load the file → keep the last test per email → decide the status."

**Ask:** "Did editing `latihan/peserta-retake.json` break `npm test`?" **Answer:** No. The checker reads its own copy in `latihan/solusi/`, so the `latihan/` files are safe to edit.

### Lab: Exercises 01–07 (60 min)

Learners create their own files in `latihan/` (for example `latihan/01-nilai-terakhir.js`), following `EXERCISES.md`.

**Check a learner's answer** (bash, macOS or Linux):

```bash
diff <(node latihan/01-nilai-terakhir.js) latihan/solusi/01-nilai-terakhir.expected.txt && echo cocok
```

No output except `cocok` means a match. On Windows, compare by eye with the **Expected output** block in `EXERCISES.md`.

**Pacing:** expect 01, 02, 04 and 06 to take about 5 minutes each, and 03, 05 and 07 about 10 minutes each. Exercise 05 needs two files (`kelasValidator.js` plus the main file).

**Where learners get stuck:**

| Exercise | Usual problem | Nudge |
|---|---|---|
| 01 | Prints all three of Rina's tests | "Which function keeps one entry per email?" |
| 02 | Second line missing | "Call `hitungLulus()` with no argument. What does the default give you?" |
| 03 | Expects id `101` | "Which record does the Map store for Aditya: the first or the last?" |
| 05 | `Cannot find module` | Check the `./kelasValidator.js` path and the `.js` extension |
| 07 | Crash instead of the fallback line | "Is `await loadPeserta(...)` inside the `try`?" |

**Fast finishers:** see **Stretch Tasks** below.

### Solution review and exit ticket (20 min)

Open each file in `latihan/solusi/` on screen and ask one learner to explain one line. Then:

1. What does an `async` function return? *(A Promise.)*
2. Why `score ?? 0` and not `score || 0`? *(`??` keeps a real 0. `||` would also replace it.)*
3. Which line decides LULUS or TIDAK LULUS, and in which file? *(`PesertaValidator.getStatus` in `utils/pesertaValidator.js`.)*

---

## 🧮 Assessment

For each case point, a learner **meets** it when their exercise output matches **and** they can answer the matching question:

| # | Exercise output matches | And can answer |
|---|---|---|
| 1 | 01 | Why the Map keeps the last test |
| 2 | 02 | When to use `let`; what the default parameter did |
| 3 | 03 | Which `...` is rest and which is spread |
| 4 | 04 | Why a Set gives unique values |
| 5 | 05 | What `export` and `import` each do |
| 6 | 06 | Why `"lulus"` is not valid |
| 7 | 07 | What runs in `catch`, and what `?.` and `??` each prevent |

---

## 🚀 Stretch Tasks (fast finishers)

Do these in a separate branch (`git checkout -b latihan-lanjutan`), because they change real code. `npm test` must still pass afterwards.

1. **Explain id 103.** Exercise 03 expects Aditya's id 103, yet he is still *first* in the list. Why? *(A Map keeps the position where a key was first inserted, but `set` replaces the value with the latest record.)*
2. **Freeze the status list.** `PesertaValidator.STATUS.push("HACK")` currently makes `"HACK"` a valid status. Use `Object.freeze`. A push then throws `TypeError: Cannot add property 2, object is not extensible`.
3. **Keep extra fields.** `getPesertaByClass` drops extra fields: a record with `catatan` comes back without it. Rewrite it with object spread, as `createPesertaMap` does.
4. **Add a timeout to the checker.** In `latihan/cek.js`, pass `{ timeout: 10_000 }` to `execFile`, so a solution that hangs can't stall `npm test`.

---

## 📖 Glossary (Indonesian → English)

| Indonesian | English |
|---|---|
| peserta | participant |
| nilai tes terakhir | last test score |
| LULUS / TIDAK LULUS | passed / did not pass |
| kelas | class (training course) |
| latihan / solusi | exercise / solution |
| cek / cocok | check / matches |
| sisanya | the rest |
| tidak ditemukan | not found |
| Gagal memuat data peserta | Failed to load participant data |
