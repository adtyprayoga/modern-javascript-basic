# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Teaching material: an ES6+ study case ("Sistem Manajemen Peserta Training" for Brainmatics). The code exists to *demonstrate* ES6 features to beginners, so idiomatic-ES6 style and teaching comments matter as much as correctness. The problem statement is `ES6-Study-Cases.md` (Indonesian). Domain terms and user-facing strings are Indonesian (`peserta` = participant, `LULUS` = pass, `BELUM LULUS` = not yet passed).

## Commands

No dependencies, build step, or linter. Native ES modules (`"type": "module"`), Node 14+.

```bash
npm start   # node main.js: runs the 9 demo "tasks" and prints to console
npm test    # node test/test-all.js: custom assert harness, exits 1 on any failure
```

There is no test framework, so you cannot select a single test. `test/test-all.js` is top-level sequential code split into numbered `TEST SUITE` blocks. To check one function quickly, import it directly:

```bash
node --input-type=module -e "import { getUniquePeserta } from './utils/pesertaProcessor.js'; import { rawPeserta } from './data/peserta.js'; console.log(getUniquePeserta(rawPeserta))"
```

## Architecture

`data/peserta.js` (raw array with duplicate emails) → `utils/pesertaProcessor.js` (dedupe/filter/average) → `utils/pesertaFormatter.js` (strings) and `utils/pesertaValidator.js` (class) → `main.js` (orchestration and console output). The utils modules are pure and do not import each other, except that the formatter reuses its own `displayPeserta`.

Non-obvious behavior:
- **Dedup keeps the last occurrence.** `createPesertaMap` keys by email and relies on `Map.set` overwriting. `getUniquePeserta` is `[...createPesertaMap(list).values()]`, so insertion order is the *first* occurrence of each email, but the values come from the *last* occurrence.
- **Two different score concepts.** `PesertaValidator(min, max)` checks whether a score is in range (`SESUAI STANDAR` / `TIDAK SESUAI`). The pass threshold `score >= 80` (`LULUS`) is hard-coded separately in three formatter functions (`displayPeserta`, `formatPesertaList`, `createDetailedReport`). `main.js` uses an 80–100 validator as a stand-in for pass/fail. If you change the threshold, update all of these places.
- **Tests depend on the exact data.** They assert specific values from `data/peserta.js` (6 entries, 4 unique emails, the latest scores for Aditya and Zaim, and class averages). If you edit the data, update the tests too.
- **Output formats are exact and tested:** `Nama: X, Score: N, Status: S`, `📚 X - Class: C - Score: N`, `X mendapat score N - STATUS`.

## Code conventions (from `.github/copilot-instructions.md` and `.github/prompts/case-study-1.prompt.md`)

- Use ES6+ only: no `var` and no `function` declarations. Use arrow functions, named exports (`export const fn = (...) => {}`), and template literals instead of concatenation.
- Every function takes sensible default parameters, for example `(pesertaList = []) =>`. Handle empty arrays explicitly (`calculateAverageScore([])` returns `0`).
- Always include the `.js` extension in relative imports, because native ESM requires it.
- `class` is a reserved word. Destructure participants as `{ id, name, email, class: className, score }`.
- Use `Set` for uniqueness and `Map` for email lookups instead of `array.find`. Use `for...of` with destructuring, as the existing processor code does.
- `PesertaValidator` methods are arrow-function class fields so `this` stays bound when you pass a method around as a callback.
- Comments should teach the *why* of the ES6 feature in use (beginner audience). Every exported function has JSDoc.

## Docs

The root markdown files (`README.md`, `BEGINNER_GUIDE.md`, `CODE_HIGHLIGHTS.md`, `COMMON_ERRORS.md`, `QUICK_START.md`, `IMPLEMENTATION_SUMMARY.md`) are learner-facing and quote code snippets and expected output. If you change a function signature, output string, or test count, grep these files and update them. The README already claims 55 tests, but the suite currently runs 52.
