# Beginner Guide: Study-Case Phases Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make `BEGINNER_GUIDE.md` teach all seven points of the study case, and give students a hands-on exercise for each point whose answer is checked automatically.

**Architecture:**
- Add a new Phase 2, "const & let". Every later phase moves up by one.
- Add a closing capstone phase that follows one participant from the JSON file to a final status.
- Add `EXERCISES.md`, which links to the missing exercises page. It has one exercise per case point. The reference solutions live in `latihan/solusi/`, and `latihan/cek.js` checks their output. `npm test` runs that check, so when code or data changes break an exercise, the test run fails.

**Tech Stack:** Markdown, Node.js ≥ 22 ES modules, `node:child_process` and `node:fs/promises`. No dependencies.

**Spec:** the 7-point study case quoted in the Spec section of `docs/superpowers/plans/2026-11-08-es2016-plus-upgrade.md`.

## Coverage today

| # | Case point | Taught in the guide now | Gap |
|---|---|---|---|
| 1 | Lulus / Tidak Lulus from the last test score | Phase 7, as a code comment only. Phase 12 covers `getStatus` | **Nothing connects the last entry to the final status** → capstone (Task 3) |
| 2 | const/let, default parameters | Phase 3 covers defaults. `let` appears only inside "old way" loops and in Step 15.3 | **No phase** → new Phase 2 (Task 1) |
| 3 | destructuring + rest/spread | Phases 5 and 13 | Exercise only |
| 4 | Set dedup, Map index | Phases 6 and 7 | Exercise only |
| 5 | validator class + export/import | Phases 10, 11 and 12 | Exercise only: students write and import their own class |
| 6 | `includes()` | Phase 12 | Exercise only |
| 7 | async/await + try/catch, `?.` and `??` | Phases 14 and 15 | Exercise only |

The phase numbers in this table are the current ones. After Task 1 each one moves up by one.

## Global Constraints

- Keep the guide's existing style:
  - Headings: `## 🚀 Phase N: Title (M minutes)` and `### Step N.M: Title`.
  - Callouts: `**🎓 ...**`, `**⚠️ ...**`, and `**🎓 Try This:**`.
  - Phases are separated by `---`.
- Every code snippet and quoted output in the new material must match what Node 22+ prints when the snippet runs against this repo.
- Students never edit `data/peserta.json`, because `npm test` depends on it. Practice data lives in `latihan/`.
- Indonesian user-facing strings, labels `LULUS` / `TIDAK LULUS`, and English explanatory prose, all matching the current guide.
- Solution files follow the repo's code style:
  - Named `export const` arrow functions and `.js` import extensions.
  - Paths built with `new URL("…", import.meta.url)`.
  - A teaching comment that names the feature and its ES version.

## Review Focus

1. **A cross-reference points to the wrong phase after renumbering.** Examples are "(Phase 15)" and "(Step 7.4)". Every `Phase N` and `Step N.M` reference must name a heading that exists and is on the right topic. Pinned in Task 1, Step 3.
2. **An exercise's expected output drifts** when `data/peserta.json` or the utils change. `npm test` must fail on this. Pinned in Task 2, because `cek.js` is chained into `npm test`.
3. **A solution only works from the repo root.** `cek.js` runs each solution with the working directory set to `os.tmpdir()`. Pinned in Task 2.
4. **A student edits `data/peserta.json` to practise, and the test run breaks.** The exercises and the capstone use `latihan/*.json`, and the guide says not to touch the real data file. Pinned in Tasks 2 and 3.
5. **Quoted error messages don't match Node.** Phase 2 quotes `TypeError: Assignment to constant variable.` and `ReferenceError: b is not defined`. Pinned in Task 1, Step 1, which runs probes.

---

### Task 1: New Phase 2 "const & let" and renumbering

**Files:**
- Modify: `BEGINNER_GUIDE.md`

**Interfaces:**
- Produces: phase numbering 1–17. The old Phases 2–16 become 3–17, and every `Step N.M` moves with its phase. Task 3 adds Phase 18 on top of this.

- [ ] **Step 1: Write and run the probe for the new phase's claims (RED: the guide doesn't contain them yet)**

Run:
```bash
node --input-type=module -e '
try { const passingScore = 80; passingScore = 70; } catch (e) { console.log(`${e.name}: ${e.message}`); }
const peserta = { score: 78 }; peserta.score = 86; console.log(peserta.score);
try { if (true) { var a = 1; let b = 2; } console.log(a); console.log(b); } catch (e) { console.log(`${e.name}: ${e.message}`); }
import { loadPeserta } from "./utils/pesertaLoader.js"; import { getUniquePeserta } from "./utils/pesertaProcessor.js";
let jumlahLulus = 0; for (const { score } of getUniquePeserta(await loadPeserta())) { if (score >= 80) jumlahLulus++; } console.log(jumlahLulus);'
grep -c "Phase 2: const & let" BEGINNER_GUIDE.md
```
Expected: `TypeError: Assignment to constant variable.`, `86`, `1`, `ReferenceError: b is not defined`, `3`, and then `0`. The `0` is the RED: the phase doesn't exist yet.

- [ ] **Step 2: Renumber, then insert the phase**

1. Use one script to increase every phase number of 2 or more by one. This covers `Phase N` and `Phase N–M` in both headings and prose (for example, "Phases 13–15" becomes "Phases 14–16"). It also covers `Step N.M` for N of 2 or more, and the checkpoint lines `**Phase N:**`.
2. Insert `## 🚀 Phase 2: const & let (15 minutes)` before the old Phase 2. Give it these steps, using the probe's values:
   - **2.1 `const` by default.** Show `passingScore = 70` throwing `TypeError: Assignment to constant variable.`
   - **2.2 `let` when the value changes.** Show the `jumlahLulus` counter, which gives `3`. Add a pointer to `let rawPeserta` in Step 16.3.
   - **2.3 A `const` object can still change inside.** `peserta.score = 86` works, but `peserta = {}` does not.
   - **2.4 Why not `var`.** In the block example, `a` gives `1` and `b` gives `ReferenceError: b is not defined`.
   - **2.5 Find it in action.** `let testsPassed = 0` in `test/test-all.js`, and `let rawPeserta` in `main.js`.
3. Add the checkpoint line `- [x] **Phase 2:** Choose const or let, and know why var is avoided`. Add 15 minutes to the time estimate, making it `3.5-4.5 hours`.

- [ ] **Step 3: Verify the numbering and every cross-reference**

Run:
```bash
grep -oP "^## 🚀 Phase \K[0-9]+" BEGINNER_GUIDE.md | tr '\n' ' '; echo
grep -oP "^### Step \K[0-9]+(?=\.)" BEGINNER_GUIDE.md | uniq | tr '\n' ' '; echo
grep -noP "\b(Phase|Step) [0-9]+(\.[0-9]+)?\b" BEGINNER_GUIDE.md | grep -v ":## \|:### \|\*\*Phase"
grep -c "^- \[x\] \*\*Phase" BEGINNER_GUIDE.md
```
Expected:
- Line 1 is `1 2 3 … 17`.
- Line 2 is `1 2 3 … 17`.
- The third command lists the prose references. Ignore the `// Step 1:`–`// Step 3:` comments inside the `getUniqueEmails` snippet (now Step 7.4), because they are not references. Check each remaining reference by hand against its heading:
  - "Phase 16 explains" points to async/await.
  - "Step 8.4" points to the Map implementation.
  - "Phase 14" points to rest/spread.
  - "Phase 15" points to `?.`/`??`.
  - "Phase 7" points to Set.
  - "Phase 11" points to classes.
  - "Step 7.1" points to the manual `includes()`.
  - "Phases 14–16" appears in the run step.
- The last command prints `17`.

- [ ] **Step 4: Commit**

```bash
git add BEGINNER_GUIDE.md
git commit -m "docs: guide teaches const & let as Phase 2"
```

### Task 2: Exercises with automatically checked solutions

**Files:**
- Create: `latihan/cek.js`
- Create: `latihan/peserta-retake.json`, containing `{ "peserta": [` followed by three Rina Sari records (ids 401, 402 and 403, `rina@brainmatics.com`, "React Basics", scores 70, 76 and 82) and `] }`
- Create: `latihan/solusi/kelasValidator.js`, a helper module. It has no `.expected.txt` file, so the runner skips it
- Create: `latihan/solusi/NN-<name>.js` and `latihan/solusi/NN-<name>.expected.txt` for the seven exercises below
- Create: `EXERCISES.md`
- Modify: `package.json` (`"test": "node test/test-all.js && node latihan/cek.js"` and `"cek-latihan": "node latihan/cek.js"`)

**Interfaces:**
- Produces: `latihan/cek.js`. For each `latihan/solusi/*.expected.txt` in name order:
  - It runs `node <same-name>.js` with `cwd: os.tmpdir()`, using an `execFile` wrapped in a promise and awaited.
  - It compares stdout with the expected file. Both have `\r\n` turned into `\n` and trailing whitespace removed (`trimEnd()`) first.
  - It prints `✅ <name>`, or `❌ <name>` followed by `   Expected:` and `   Actual:` lines. Stderr counts as part of Actual.
  - It ends with `Latihan: X/7 cocok`, and `process.exitCode = 1` if any exercise fails.
- Produces: `KelasValidator` in `latihan/solusi/kelasValidator.js`, with `static KELAS = ["JavaScript Fundamentals", "React Basics"]` and `static isValidKelas = (kelas) => KelasValidator.KELAS.includes(kelas)`.
- Produces: the exercise ids `01`–`07`, which Task 3 links to.

| File stem | Case point | What the solution does | Expected output (exact) |
|---|---|---|---|
| `01-nilai-terakhir` | 1 | Loads `../peserta-retake.json`, then runs `getUniquePeserta` and `displayPeserta` | `Nama: Rina Sari, Score: 82, Status: LULUS` |
| `02-const-let` | 2 | Loads the default data and counts LULUS with a `let` counter in `for...of` | `Jumlah LULUS: 3` |
| `03-rest-spread` | 3 | Removes `email` from the first unique participant using rest | `{"id":103,"name":"Aditya Prayoga","class":"JavaScript Fundamentals","score":88}` |
| `04-set-map` | 4 | Counts unique classes with a Set and looks up Zaim in the Map | `Jumlah kelas: 2` then `zaim@brainmatics.com: 94` |
| `05-validator-module` | 5 | Imports `KelasValidator` from `./kelasValidator.js` | `JavaScript Fundamentals: true` then `Python Advanced: false` |
| `06-includes` | 6 | Filters `["LULUS", "lulus", "TIDAK LULUS", "PENDING"]` with `isValidStatus` | `["LULUS","TIDAK LULUS"]` |
| `07-async-try-catch` | 7 | Sets `let peserta = []` and, inside `try`, awaits a load of `../tidak-ada.json`. In `catch` it prints the fallback line. Then it uses `peserta[0]?.name ?? "tidak ada"` | `Data tidak bisa dimuat, memakai daftar kosong` then `Peserta pertama: tidak ada` |

- [ ] **Step 1: Write `latihan/cek.js`, the seven `.expected.txt` files, and `latihan/peserta-retake.json`**

- [ ] **Step 2: Run it and confirm it fails**

Run: `node latihan/cek.js; echo "exit=$?"`
Expected: seven `❌` lines whose Actual output contains `Cannot find module`, then `Latihan: 0/7 cocok` and `exit=1`.

- [ ] **Step 3: Write `latihan/solusi/kelasValidator.js` and the seven solutions, following the table**

- [ ] **Step 4: Confirm it passes, from another directory, and through `npm test`**

Run: `(repo="$PWD"; cd /tmp && node "$repo/latihan/cek.js"); npm test 2>&1 | tail -3`
Expected: `Latihan: 7/7 cocok` twice, and exit 0.
Then corrupt one expected file temporarily, for example by changing `82` to `81` in `01-nilai-terakhir.expected.txt`. Run `npm test; echo "exit=$?"`, expect `❌ 01-nilai-terakhir` and `exit=1`, then restore the file.

- [ ] **Step 5: Write `EXERCISES.md`**

- Title: "Latihan Studi Kasus".
- Give one section per exercise, in table order. Each section has:
  - the case point, quoted verbatim;
  - the task, in 2–3 sentences;
  - a hint naming the guide phase that taught it, using the numbering from Task 1;
  - the file to create, `latihan/NN-<name>.js`;
  - the expected output in a code block;
  - a link to `latihan/solusi/NN-<name>.js`.
- Students create their own file next to the solutions and compare its output with the expected block.
- End with a section titled "Cek semua solusi". It explains `npm run cek-latihan`, and says not to edit `data/peserta.json`.

- [ ] **Step 6: Commit**

```bash
git add latihan EXERCISES.md package.json
git commit -m "feat: hands-on exercises per case point, checked by npm test"
```

### Task 3: Capstone phase — from the data file to the final status

**Files:**
- Modify: `BEGINNER_GUIDE.md`

**Interfaces:**
- Consumes: Phase 1–17 numbering from Task 1. Also consumes `latihan/solusi/01-nilai-terakhir.js` and `EXERCISES.md` from Task 2.

- [ ] **Step 1: Write the probe for the capstone's claims (RED)**

Run:
```bash
node --input-type=module -e '
import { loadPeserta } from "./utils/pesertaLoader.js"; import { createPesertaMap } from "./utils/pesertaProcessor.js"; import { displayPeserta } from "./utils/pesertaFormatter.js";
const raw = await loadPeserta(); console.log(raw.filter(p => p.email === "aditya@brainmatics.com").map(p => p.score).join(","));
const { name, score } = createPesertaMap(raw).get("aditya@brainmatics.com"); console.log(displayPeserta(name, score));'
grep -c "Phase 18: Studi Kasus" BEGINNER_GUIDE.md
```
Expected: `85,88`, then `Nama: Aditya Prayoga, Score: 88, Status: LULUS`, then `0`.

- [ ] **Step 2: Insert `## 🚀 Phase 18: Studi Kasus — dari Data ke Status (30 minutes)` after Phase 17 and before "Learning Checkpoints"**

- **18.1 Follow one participant.** Aditya appears twice, with scores 85 and 88. Show the four-line chain `loadPeserta` → `createPesertaMap` → `.get(email)` → `displayPeserta`, using the probe's output. The **🎓** callout says that the last entry is the last test.
- **18.2 The seven points, and where you learned them.** A table: case point → phase number (after Task 1) → file in the repo.
- **18.3 Try This.** Run `node latihan/solusi/01-nilai-terakhir.js` and predict the output before you run it (`Score: 82`). Then open `latihan/peserta-retake.json`, change the last score to 79, run it again (TIDAK LULUS), and change it back. The **⚠️** callout says to practise in `latihan/`, never in `data/peserta.json`.
- **18.4 Next.** Do the exercises in `EXERCISES.md`.

Add the checkpoint line `- [x] **Phase 18:** Trace a participant from the JSON file to LULUS / TIDAK LULUS`. In the closing "Next Steps", the `EXERCISES.md` line stays and now resolves. Add 30 minutes to the time estimate, making it `4-5 hours`.

- [ ] **Step 3: Verify**

Run the Step 1 probe again, then:
```bash
ls EXERCISES.md latihan/solusi/01-nilai-terakhir.js latihan/peserta-retake.json
grep -c "^- \[x\] \*\*Phase" BEGINNER_GUIDE.md
grep -oP "^## 🚀 Phase \K[0-9]+" BEGINNER_GUIDE.md | tail -1
npm test 2>&1 | tail -2
```
Expected:
- The same `85,88` and `Nama: Aditya Prayoga, …` lines, then `1`.
- All three paths are listed.
- `18`, then `18`.
- `Latihan: 7/7 cocok` and exit 0.

- [ ] **Step 4: Commit**

```bash
git add BEGINNER_GUIDE.md
git commit -m "docs: capstone phase traces the study case from data to status"
```

### Task 4: Point the other docs at the exercises

**Files:**
- Modify: `README.md`, `QUICK_START.md`, `CLAUDE.md`

- [ ] **Step 1: Update**

- `README.md`: add `latihan/` and `EXERCISES.md` to the architecture tree. In the Testing section, say that `npm test` also checks the exercise solutions, and show `Latihan: 7/7 cocok` in the expected output.
- `QUICK_START.md`: add `latihan/` to the project tree, and add the checklist item `` `npm test` ends with `Latihan: 7/7 cocok` ``.
- `CLAUDE.md`, Commands section:
  - `npm test` runs `test/test-all.js` and then `latihan/cek.js`.
  - Exercise solutions are checked by comparing stdout with `latihan/solusi/*.expected.txt`. If you change the data or the utils, update those files.

- [ ] **Step 2: Verify**

Run: `grep -c "latihan" README.md QUICK_START.md CLAUDE.md && npm test 2>&1 | tail -1`
Expected: every count is ≥ 1, and the last line is `Latihan: 7/7 cocok`.

- [ ] **Step 3: Commit**

```bash
git add README.md QUICK_START.md CLAUDE.md
git commit -m "docs: point README, quick start and CLAUDE.md at the exercises"
```
