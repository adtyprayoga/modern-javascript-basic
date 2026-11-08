# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Teaching material: an ES6+ study case ("Sistem Manajemen Peserta Training" for Brainmatics). The code exists to *demonstrate* JavaScript features to beginners, so idiomatic style and teaching comments matter as much as correctness. The current **Studi Kasus** in `README.md` builds a terminal CRUD application with JSON persistence and covers ES2016+ features: `includes()`, async/await, object rest/spread, `?.` and `??`. `docs/archive/ES6-Study-Cases.md` is the historical ES6 exercise, and the git tag `es6-baseline` holds that version of the code. Domain terms and user-facing strings are Indonesian (`peserta` = participant, `LULUS` = pass, `TIDAK LULUS` = not passed).

## Commands

No dependencies, build step, or linter. Native ES modules (`"type": "module"`), Node 22+ (`engines` in `package.json`).

```bash
npm start   # node main.js: opens the interactive CRUD menu 0–8; enter 0 to exit
npm test    # runs test-all, test-crud, test-store, test-menu, then latihan/cek.js
npm run cek-latihan   # only the original exercise solutions
npm run cek-panduan   # replay guide code and check the completed learner application
```

The main learner path is `latihan/00-persiapan/` through `latihan/13-pengujian-akhir/`. Learners build one cumulative application in `latihan/proyek/`; the committed starter deliberately contains only package.json and the welcome main.js. Every stage README has full code, exact expected output, explanation, and complete challenge solutions. `instructor.md` links the stages and teaching activities.

`npm run cek-panduan` replays the guide's HTML-marked file blocks in a temporary project, checks outputs and challenge solutions, copies the supplied test suite at stage 13, runs learner scripts, and compares final output with root main.js. It leaves the learner starter untouched. Maintain the `write`, `expected`, `challenge`, `challenge-output`, `input`, and `copy` markers when editing examples.

`latihan/cek.js` runs the seven original solutions in `latihan/referensi/` from the OS temp directory and compares stdout with the paired `.expected.txt` files. Helpers and fixed JSON live beside those solutions. Reference solution edits can affect root npm test. Use `npm --prefix latihan/proyek test` after stage 13 to test learner code instead.

The legacy suite uses a sequential runner; CRUD/store suites use node:test, and the menu suite drives real Node processes. `test/test-all.js` is top-level sequential code split into numbered `TEST SUITE` blocks. To check one function quickly, import it directly:

```bash
node --input-type=module -e "import { getUniquePeserta } from './utils/pesertaProcessor.js'; import { loadPeserta } from './utils/pesertaLoader.js'; console.log(getUniquePeserta(await loadPeserta()))"
```

## Architecture

`data/peserta.json` seeds `data/peserta.local.json` only when the working file is absent. `utils/pesertaStore.js` validates history and saves through a same-directory temporary file plus rename. `PESERTA_DATA_FILE` isolates test data. `utils/pesertaCrud.js` transforms arrays without mutation. The processor deduplicates, filters, and averages; formatter/validator produce reports consumed by the readline menu in `main.js`. Replace memory only after save succeeds. Preserve the existing loader API for lessons and legacy tests.

Non-obvious behavior:
- **One entry is one test.** Normalized email identifies a participant; positive unique ID identifies a test. Retest appends even when the score falls. Update all biodata for an email without changing IDs/scores/order; delete all history after menu confirmation. Empty score input is invalid, while zero is accepted. Broken working JSON must never be silently replaced.
- **Input is sequential.** One readline async iterator handles interactive and piped input. EOF cancels an unfinished form. Close the reader on exit. Guide input markers supply answers to the next execution of that file.

- **Dedup keeps the last occurrence.** `createPesertaMap` keys by email and relies on `Map.set` overwriting. `getUniquePeserta` is `[...createPesertaMap(list).values()]`, so insertion order is the *first* occurrence of each email, but the values come from the *last* occurrence.
- **Two different score concepts.** An instance of `PesertaValidator(min, max)` checks whether a score is in range (`SESUAI STANDAR` / `TIDAK SESUAI`). Pass/fail is a separate rule, defined once in the class's static members: `PASSING_SCORE = 80`, `STATUS`, `getStatus(score)`, and `isValidStatus(status)` (which uses `includes()`). The formatter imports these, so change the threshold or labels only there. `displayPeserta` replaces any status outside `STATUS` with the computed one.
- **The loader normalizes data.** `loadPeserta` returns `[]` when the JSON is `null` or has no `peserta` key, and turns a missing `score` into `0`. A missing file or broken JSON becomes one Indonesian `Error` that names the file. Menu startup uses the stricter store and exits with code 1 on load failure.
- **Tests depend on the exact data.** They assert specific values from `data/peserta.json` (6 entries, 4 unique emails, the latest scores for Aditya and Zaim, and class averages), and the loader tests use the files in `test/fixtures/`. If you edit the data, update the tests too.
- **Output formats are exact and tested:** `Nama: X, Score: N, Status: S`, `📚 X - Class: C - Score: N`, `X mendapat score N - STATUS`.

## Code conventions (from `.github/copilot-instructions.md` and `.github/prompts/case-study-1.prompt.md`)

- Use ES6+ only: no `var` and no `function` declarations. Use `??`, not `||`, where `0` is a valid value, and `?.` for values that may be missing. Use arrow functions, named exports (`export const fn = (...) => {}`), and template literals instead of concatenation.
- Every function takes sensible default parameters, for example `(pesertaList = []) =>`. Handle empty arrays explicitly (`calculateAverageScore([])` returns `0`).
- Always include the `.js` extension in relative imports, because native ESM requires it.
- `class` is a reserved word. Destructure participants as `{ id, name, email, class: className, score }`.
- Use `Set` for uniqueness and `Map` for email lookups instead of `array.find`. Use `for...of` with destructuring, as the existing processor code does.
- `PesertaValidator` methods are arrow-function class fields so `this` stays bound when you pass a method around as a callback.
- Comments should teach the *why* of the feature in use and name its ES version, e.g. `// ES2020 ??: ...` (beginner audience). Every exported function has JSDoc.

## Docs

`README.md` is the entry point, `instructor.md` is the teaching guide, and `latihan/README.md` is the only practice index. Setup instructions live in `docs/QUICK_START.md`. Concept explanations, annotated code, and troubleshooting live in `docs/reference/BEGINNER_GUIDE.md`, `docs/reference/CODE_HIGHLIGHTS.md`, and `docs/reference/COMMON_ERRORS.md`.

If you change a function signature, output string, or test count, search the active documentation and update affected examples. Commands and code paths in the reference guides are relative to the repository root, not the document directory. `docs/archive/` contains historical requirements, implementation notes, and plans with an archive notice. Preserve their original commands and paths as historical content; they are not current learner instructions.
