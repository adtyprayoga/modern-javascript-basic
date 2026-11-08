# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Teaching material: an ES6+ study case ("Sistem Manajemen Peserta Training" for Brainmatics). The code exists to *demonstrate* JavaScript features to beginners, so idiomatic style and teaching comments matter as much as correctness. The current problem statement is the 7-point **Studi Kasus** in `README.md`, which covers ES2016+ features: `includes()`, async/await, object rest/spread, `?.` and `??`. `ES6-Study-Cases.md` is the original ES6 exercise, and the git tag `es6-baseline` holds that version of the code. Domain terms and user-facing strings are Indonesian (`peserta` = participant, `LULUS` = pass, `TIDAK LULUS` = not passed).

## Commands

No dependencies, build step, or linter. Native ES modules (`"type": "module"`), Node 22+ (`engines` in `package.json`).

```bash
npm start   # node main.js: runs the 9 demo "tasks" and prints to console
npm test    # node test/test-all.js, then node latihan/cek.js; exits 1 on any failure
npm run cek-latihan   # only the exercise check
```

`latihan/cek.js` runs each `latihan/solusi/NN-*.js` from the OS temp directory and compares its stdout with `NN-*.expected.txt`. These are the reference solutions for `EXERCISES.md`. If you change the data or the utils, update the expected files too. A solusi file without an `.expected.txt`, such as `kelasValidator.js`, is a helper module and is not run.

There is no test framework, so you cannot select a single test. `test/test-all.js` is top-level sequential code split into numbered `TEST SUITE` blocks. To check one function quickly, import it directly:

```bash
node --input-type=module -e "import { getUniquePeserta } from './utils/pesertaProcessor.js'; import { loadPeserta } from './utils/pesertaLoader.js'; console.log(getUniquePeserta(await loadPeserta()))"
```

## Architecture

`data/peserta.json` (`{ "peserta": [...] }`, with duplicate emails) → `utils/pesertaLoader.js` (async `loadPeserta`) → `utils/pesertaProcessor.js` (dedupe/filter/average) → `utils/pesertaFormatter.js` (strings) and `utils/pesertaValidator.js` (class) → `main.js` (orchestration and console output). `main.js` and the tests both load data with top-level `await loadPeserta()`. The only cross-module import inside `utils/` is the formatter importing `PesertaValidator`.

Non-obvious behavior:
- **Dedup keeps the last occurrence.** `createPesertaMap` keys by email and relies on `Map.set` overwriting. `getUniquePeserta` is `[...createPesertaMap(list).values()]`, so insertion order is the *first* occurrence of each email, but the values come from the *last* occurrence.
- **Two different score concepts.** An instance of `PesertaValidator(min, max)` checks whether a score is in range (`SESUAI STANDAR` / `TIDAK SESUAI`). Pass/fail is a separate rule, defined once in the class's static members: `PASSING_SCORE = 80`, `STATUS`, `getStatus(score)`, and `isValidStatus(status)` (which uses `includes()`). The formatter imports these, so change the threshold or labels only there. `displayPeserta` replaces any status outside `STATUS` with the computed one.
- **The loader normalizes data.** `loadPeserta` returns `[]` when the JSON is `null` or has no `peserta` key, and turns a missing `score` into `0`. A missing file or broken JSON becomes one Indonesian `Error` that names the file, and `main.js` prints it and exits with code 1.
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

The root markdown files (`README.md`, `BEGINNER_GUIDE.md`, `CODE_HIGHLIGHTS.md`, `COMMON_ERRORS.md`, `QUICK_START.md`, `IMPLEMENTATION_SUMMARY.md`) are learner-facing and quote code snippets and expected output. If you change a function signature, output string, or test count, grep these files and update them.
