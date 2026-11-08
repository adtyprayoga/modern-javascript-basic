# Instructor Guide: Teaching the Studi Kasus

> For the trainer. Learners follow `BEGINNER_GUIDE.md` and `EXERCISES.md`. This guide is your lesson script: for each of the 18 topics, what to say, what to type live (with its exact output), what to ask, and which mistake to show on purpose.

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

| Session | Segment | Topics (= guide phases) | Case points | Minutes |
|---|---|---|---|---|
| 1 | Opening: the case | — | all | 10 |
| 1 | The data; const & let | 1–2 | 1, 2 | 25 |
| 1 | Arrow functions, defaults, template literals | 3–5 | 2 | 35 |
| 1 | *Break* | | | 10 |
| 1 | Destructuring | 6 | 3 | 15 |
| 1 | Set, Map and the last test, for...of | 7–9 | 1, 4 | 55 |
| 1 | *Break* | | | 10 |
| 1 | map/filter/reduce, classes, modules | 10–12 | 3, 5 | 65 |
| 1 | Exit ticket | | | 15 |
| 2 | Recap quiz | | | 10 |
| 2 | `includes()` and the pass/fail rule | 13 | 1, 5, 6 | 20 |
| 2 | Object rest & spread | 14 | 3 | 20 |
| 2 | `?.` and `??` | 15 | 7 | 20 |
| 2 | *Break* | | | 10 |
| 2 | async/await + try/catch | 16 | 7 | 30 |
| 2 | Running & testing | 17 | — | 15 |
| 2 | The whole case, from data to status | 18 | all | 20 |
| 2 | *Break* | | | 10 |
| 2 | Lab: Exercises 01–07 | — | all | 60 |
| 2 | Solution review and exit ticket | | | 25 |

**Other formats:**
- **One-day intensive:** run both sessions with lunch between them. Shorten Topics 10–12 to 50 minutes and the lab to 45 minutes.
- **Self-paced with office hours:** learners do 6 phases per week for 3 weeks, then the exercises. Use the exit tickets as weekly check-ins.

---

## 🧑‍💻 Live-Coding Setup

Teach from one scratch file: **`latihan/demo.js`**.
- Clear it at the start of each topic and type the code shown.
- Run it with `node latihan/demo.js`.
- Imports start with `../utils/` because the file sits in `latihan/`.
- `npm test` never reads it: the checker reads only `latihan/solusi/`.
- Delete it after class with `rm latihan/demo.js`.

Every code block marked **Type and run** prints exactly the **Output** shown, on Node 22 or higher. If live typing goes wrong, paste the block.

Each topic follows the same steps:
1. **Hook:** the problem, in one or two sentences.
2. **Live code:** type it, run it, and read the output aloud.
3. **Explain:** the two or three points to make.
4. **In the project:** where the feature lives in the real code.
5. **Check:** questions, with answers.
6. **Show the mistake:** make the usual error on purpose, then fix it.
7. **Transition:** one line that leads into the next topic.

---

## 📘 Session 1: ES6 Foundations (Topics 1–12)

### Opening (10 min)

1. Open `README.md` at **Studi Kasus** and read the seven lines aloud.
2. Run `npm start` and scroll through TASK 1 to TASK 9.
3. Say: *"By the end of tomorrow you can write every line of this program yourself, and explain why it is written this way."*
4. Ask: *"Which participants appear twice?"* **Answer:** Aditya and Zaim. TASK 1 shows 6 entries but 4 unique emails.

---

### Topic 1: The Data (10 min) · Guide Phase 1 · Case point 1

**Goal:** learners can read one participant record, and they notice the duplicate emails.

**Step 1 — Hook.** *"Before writing code, we need to know what the data looks like. What can go wrong with this list?"*

**Step 2 — Live code.** Open `data/peserta.json` on screen first. Then type and run:

<!-- demo -->
```javascript
import { loadPeserta } from '../utils/pesertaLoader.js';
const rawPeserta = await loadPeserta();
console.log("Jumlah data:", rawPeserta.length);
console.log(rawPeserta[0]);
console.log(rawPeserta.map((p) => p.email));
```
**Output:**
```
Jumlah data: 6
{
  id: 101,
  name: 'Aditya Prayoga',
  email: 'aditya@brainmatics.com',
  class: 'JavaScript Fundamentals',
  score: 85
}
[
  'aditya@brainmatics.com',
  'zaim@brainmatics.com',
  'aditya@brainmatics.com',
  'milea@brainmatics.com',
  'pratama@brainmatics.com',
  'zaim@brainmatics.com'
]
```

**Step 3 — Explain.**
- One object is one participant: `id`, `name`, `email`, `class`, `score`.
- Aditya and Zaim appear **twice**, because they took the test again. The later entry is the **last test** (*nilai tes terakhir*), which is case point 1.
- Say: *"Treat the first two lines as 'load the data' for now. Topic 16 explains `await`."*

**Step 4 — In the project.** `data/peserta.json`, wrapped in `{ "peserta": [ ... ] }`.

**Step 5 — Check.** *"How many different people are in the list?"* **Answer:** 4.

**Step 6 — Show the mistake.** None yet. Instead, keep the two Aditya entries (85, then 88) on screen and say *"Remember these numbers."* Topic 8 comes back to them.

**Transition:** *"Before we process this data, one rule about variables: `const` or `let`?"*

---

### Topic 2: const & let (15 min) · Guide Phase 2 · Case point 2

**Goal:** learners choose `const` by default, use `let` only when the value changes, and never use `var`.

**Step 1 — Hook.** *"JavaScript has three ways to make a variable. We use two of them, and here is why."*

**Step 2 — Live code: const.** Type and run:

<!-- demo -->
```javascript
const passingScore = 80;
passingScore = 70;
```
**Output:**
```
TypeError: Assignment to constant variable.
```

**Step 3 — Live code: let for a counter.** Type and run:

<!-- demo -->
```javascript
const scores = [88, 94, 78, 95];
let jumlahLulus = 0;
for (const score of scores) {
  if (score >= 80) jumlahLulus++;
}
console.log(jumlahLulus);
```
**Output:**
```
3
```

**Step 4 — Live code: a const object can still change.** Type and run:

<!-- demo -->
```javascript
const peserta = { name: "Milea", score: 78 };
peserta.score = 86;
console.log(peserta);
```
**Output:**
```
{ name: 'Milea', score: 86 }
```

**Step 5 — Live code: why not var.** Type and run:

<!-- demo -->
```javascript
if (true) {
  var a = 1;
  let b = 2;
}
console.log(a);
console.log(b);
```
**Output:**
```
1
ReferenceError: b is not defined
```

**Step 6 — Explain.**
- `const` means *this name always points to the same value*. Start with it every time.
- `let` is for values that must change: counters, and values assigned later inside `try`.
- `var` leaks out of `{ }` blocks. That causes bugs, so never use it.

**Step 7 — In the project.** `test/test-all.js` has `let testsPassed = 0;` and `let testsFailed = 0;`. `main.js` has `let rawPeserta;`, assigned inside `try`. Everything else uses `const`.

**Step 8 — Check.**
- *"Counter in a loop: const or let?"* **Answer:** `let`.
- *"Can you change `peserta.score` if `peserta` is a const?"* **Answer:** Yes. You can't do `peserta = {}`.

**Transition:** *"Now that we can store values, let's write functions, the short way."*

---

### Topic 3: Arrow Functions (15 min) · Guide Phase 3 · Case point 2

**Goal:** learners write arrow functions with and without braces, and know when `return` is needed.

**Step 1 — Hook.** *"Every function in this project is written as an arrow. Let's see why."*

**Step 2 — Live code.** Type and run:

<!-- demo -->
```javascript
function tambahBonusLama(score) {
  return score + 5;
}
const tambahBonus = (score) => score + 5;
console.log(tambahBonusLama(75), tambahBonus(75));
```
**Output:**
```
80 80
```

**Step 3 — Explain.**
- Both functions do the same thing. The arrow drops the words `function` and `return`.
- When there are no braces, the expression after `=>` **is** the return value.
- Arrow functions are stored in a `const` (Topic 2).

**Step 4 — In the project.** `utils/pesertaProcessor.js`: every export is `export const name = (...) => { ... }`.

**Step 5 — Check.** *"Rewrite `function kali2(x) { return x * 2; }` as an arrow."* **Answer:** `const kali2 = (x) => x * 2;`

**Step 6 — Show the mistake: braces without return.** Type and run:

<!-- demo -->
```javascript
const tambahSalah = (score) => { score + 5; };
const tambahBenar = (score) => { return score + 5; };
console.log(tambahSalah(75), tambahBenar(75));
```
**Output:**
```
undefined 80
```
Say: *"Once you add braces, you must write `return`."* See `COMMON_ERRORS.md` → Arrow Function Errors.

**Transition:** *"What happens when someone calls our function with no arguments?"*

---

### Topic 4: Default Parameters (10 min) · Guide Phase 4 · Case point 2

**Goal:** learners give every parameter a sensible default, and know defaults only catch `undefined`.

**Step 1 — Hook.** *"If someone forgets an argument, we want a sensible value, not a crash."*

**Step 2 — Live code.** Type and run:

<!-- demo -->
```javascript
const sapa = (nama = "Peserta") => "Halo, " + nama;
console.log(sapa("Aditya"));
console.log(sapa());
console.log(sapa(undefined));
console.log(sapa(null));
```
**Output:**
```
Halo, Aditya
Halo, Peserta
Halo, Peserta
Halo, null
```

**Step 3 — Explain.**
- The default is used when the argument is **missing or `undefined`**.
- `null` is a real value, so the default does **not** apply. Say: *"Remember this. Topic 15 fixes it with `??`."*

**Step 4 — In the project.** Type and run:

<!-- demo -->
```javascript
import { displayPeserta } from '../utils/pesertaFormatter.js';
console.log(displayPeserta());
console.log(displayPeserta("Milea", 78));
```
**Output:**
```
Nama: Unknown, Score: 0, Status: TIDAK LULUS
Nama: Milea, Score: 78, Status: TIDAK LULUS
```
Open `utils/pesertaFormatter.js` and point at `status = PesertaValidator.getStatus(score)`. A default can be **computed** from an earlier parameter.

**Step 5 — Check.** *"Why does `displayPeserta()` say TIDAK LULUS?"* **Answer:** `score` defaults to 0, and the status is computed from that 0.

**Transition:** *"We've been building strings with `+`. There's a cleaner way."*

---

### Topic 5: Template Literals (10 min) · Guide Phase 5 · Case point 2

**Goal:** learners build strings with backticks and `${}`, including expressions.

**Step 1 — Hook.** *"Look at all the `+` and quotes in this line. Easy to get wrong."*

**Step 2 — Live code.** Type and run:

<!-- demo -->
```javascript
const name = "Milea";
const score = 78;
console.log("Nama: " + name + ", Score: " + score);
console.log(`Nama: ${name}, Score: ${score}`);
console.log(`Status: ${score >= 80 ? "LULUS" : "TIDAK LULUS"}`);
console.log("Nama: ${name}");
```
**Output:**
```
Nama: Milea, Score: 78
Nama: Milea, Score: 78
Status: TIDAK LULUS
Nama: ${name}
```

**Step 3 — Explain.**
- Backticks `` ` `` allow `${...}`. Anything inside the braces is evaluated, even a ternary.
- The last line used **double quotes**, so `${name}` was printed literally.

**Step 4 — In the project.** `displayPeserta` returns `` `Nama: ${name}, Score: ${score}, Status: ${finalStatus}` ``.

**Step 5 — Check.** *"Why did the last line print `${name}`?"* **Answer:** it used `"` instead of backticks.

**Step 6 — Show the mistake.** That was the last line of the demo. See `COMMON_ERRORS.md` → Template Literal Errors.

**Transition:** *"Our records are objects. Let's pull values out of them quickly."*

---

### Topic 6: Destructuring (15 min) · Guide Phase 6 · Case point 3

**Goal:** learners extract properties, rename while extracting, and handle the reserved word `class`.

**Step 1 — Hook.** *"Writing `peserta.name`, `peserta.score` and `peserta.class` again and again is noisy."*

**Step 2 — Live code.** Type and run:

<!-- demo -->
```javascript
const peserta = { id: 104, name: "Milea Kusuma", class: "JavaScript Fundamentals", score: 78 };
const { name, score } = peserta;
console.log(name, score);
const { name: pesertaNama, class: className } = peserta;
console.log(pesertaNama, className);
```
**Output:**
```
Milea Kusuma 78
Milea Kusuma JavaScript Fundamentals
```

**Step 3 — Explain.**
- `{ name, score } = peserta` creates two variables at once.
- `{ name: pesertaNama }` means *take `name` and call it `pesertaNama`*.
- `class` is a reserved word, so it **must** be renamed: `class: className`.

**Step 4 — In the project.** `utils/pesertaFormatter.js`, `createPesertaSummary`: `const { name = "Unknown", score = 0, class: className = "N/A" } = ...`. That line combines destructuring, renaming and defaults.

**Step 5 — Check.** *"After `const { name: pesertaNama } = peserta;`, does a variable `name` exist?"* **Answer:** No, only `pesertaNama`.

**Step 6 — Show the mistake.** Type and run:

<!-- demo -->
```javascript
const peserta = { class: "React Basics" };
const { class } = peserta;
```
**Output:**
```
SyntaxError: Unexpected token 'class'
```
Fix: `const { class: className } = peserta;`. See `COMMON_ERRORS.md` → Destructuring Errors.

**Transition:** *"Back to Topic 1: duplicate emails. How do we remove them?"*

---

### Topic 7: Set (20 min) · Guide Phase 7 · Case point 4

**Goal:** learners remove duplicates with a Set, and convert it back to an array.

**Step 1 — Hook.** *"We have 6 entries but only 4 people. We need each email once."*

**Step 2 — Live code.** Type and run:

<!-- demo -->
```javascript
const emails = ["aditya@brainmatics.com", "zaim@brainmatics.com", "aditya@brainmatics.com"];
const unik = new Set(emails);
console.log(unik.size);
console.log(unik[0]);
console.log([...unik]);
```
**Output:**
```
2
undefined
[ 'aditya@brainmatics.com', 'zaim@brainmatics.com' ]
```

**Step 3 — Explain.**
- A Set keeps **one copy** of each value. Duplicates are dropped automatically.
- A Set is **not an array**, so `unik[0]` is `undefined`. Spread it with `[...unik]` to get an array.

**Step 4 — In the project.** Type and run:

<!-- demo -->
```javascript
import { loadPeserta } from '../utils/pesertaLoader.js';
import { getUniqueEmails } from '../utils/pesertaProcessor.js';
const rawPeserta = await loadPeserta();
console.log(rawPeserta.length, getUniqueEmails(rawPeserta).length);
```
**Output:**
```
6 4
```
Open `getUniqueEmails` in `utils/pesertaProcessor.js`. It is one line: `[...new Set(pesertaList.map(p => p.email))]`.

**Step 5 — Check.** *"What is `new Set(["a", "b", "a"]).size`?"* **Answer:** `2`.

**Step 6 — Show the mistake.** That was `unik[0]` in the demo. See `COMMON_ERRORS.md` → Set & Map Errors.

**Transition:** *"A Set tells us WHICH emails exist. But we need each person's data, and only their last test."*

---

### Topic 8: Map, and the Last Test Score (25 min) · Guide Phase 8 · Case point 1, 4

**Goal:** learners use a Map as an index by email, and explain why it keeps the **last** test.

**Step 1 — Hook.** *"Aditya scored 85, then 88. Which score decides LULUS or TIDAK LULUS? The last one."*

**Step 2 — Live code.** Type and run:

<!-- demo -->
```javascript
const nilai = new Map();
nilai.set("aditya@brainmatics.com", 85);
nilai.set("aditya@brainmatics.com", 88);
console.log(nilai.get("aditya@brainmatics.com"));
console.log(nilai.size);
console.log(nilai.get("tidak-ada@brainmatics.com"));
```
**Output:**
```
88
1
undefined
```

**Step 3 — Explain.**
- `set` with an **existing key replaces** the value. Writing the entries in file order therefore leaves the **last test**. This is the heart of case point 1.
- `get` finds a value by key directly, with no searching through the array.
- A missing key returns `undefined`. Keep that in mind for Topic 15.

**Step 4 — In the project.** Type and run:

<!-- demo -->
```javascript
import { loadPeserta } from '../utils/pesertaLoader.js';
import { createPesertaMap } from '../utils/pesertaProcessor.js';
const pesertaMap = createPesertaMap(await loadPeserta());
console.log(pesertaMap.size);
console.log(pesertaMap.get("aditya@brainmatics.com").score);
```
**Output:**
```
4
88
```
Open `createPesertaMap`: `pesertaMap.set(peserta.email, { ...peserta })`. The `{ ...peserta }` part is Topic 14.

**Step 5 — Check.**
- *"Aditya has 85, then 88. Which does the Map keep?"* **Answer:** 88, because `set` replaces the earlier value.
- *"What if the file had 88 first, then 85?"* **Answer:** 85. The *last entry* counts, not the highest score.

**Transition:** *"We keep writing loops. Let's make them cleaner."*

---

### Topic 9: for...of (10 min) · Guide Phase 9 · Case point 2

**Goal:** learners loop with `for...of`, including destructuring inside the loop.

**Step 1 — Hook.** *"`i`, `length` and `scores[i]` are three chances to make an off-by-one mistake."*

**Step 2 — Live code.** Type and run:

<!-- demo -->
```javascript
const scores = [85, 92, 88];
for (let i = 0; i < scores.length; i++) {
  console.log(i, scores[i]);
}
for (const score of scores) {
  console.log(score);
}
const pesertaList = [{ name: "Aditya", score: 88 }, { name: "Milea", score: 78 }];
for (const { name, score } of pesertaList) {
  console.log(`${name}: ${score}`);
}
```
**Output:**
```
0 85
1 92
2 88
85
92
88
Aditya: 88
Milea: 78
```

**Step 3 — Explain.**
- `for...of` gives you each **value**, with no index to manage.
- Combined with destructuring (Topic 6), each item unpacks right in the loop header.
- `const` works in `for...of` because each round gets a fresh variable.

**Step 4 — In the project.** `getPesertaByClass` in `utils/pesertaProcessor.js` uses `for (const { ..., class: pesertaClass, ... } of pesertaList)`.

**Step 5 — Show the mistake.** Type and run:

<!-- demo -->
```javascript
const peserta = { name: "Aditya", score: 88 };
for (const x of peserta) {
  console.log(x);
}
```
**Output:**
```
TypeError: peserta is not iterable
```
Say: *"`for...of` works on arrays, Sets and Maps, not on plain objects."* See `COMMON_ERRORS.md` → for...of Errors.

**Transition:** *"For common jobs like transforming, filtering and summing, arrays have built-in methods."*

---

### Topic 10: map, filter, reduce (25 min) · Guide Phase 10 · Case point 3

**Goal:** learners transform a list with `map`, select with `filter`, and combine with `reduce`.

**Step 1 — Hook.** *"Three questions: what are the names, who passed, and what is the average?"*

**Step 2 — Live code.** Type and run:

<!-- demo -->
```javascript
const pesertaList = [
  { name: "Aditya", score: 88 },
  { name: "Zaim", score: 94 },
  { name: "Milea", score: 78 },
];
const nama = pesertaList.map(({ name }) => name);
const lulus = pesertaList.filter(({ score }) => score >= 80);
const total = pesertaList.reduce((sum, { score }) => sum + score, 0);
console.log(nama);
console.log(lulus.length);
console.log(total, total / pesertaList.length);
```
**Output:**
```
[ 'Aditya', 'Zaim', 'Milea' ]
2
260 86.66666666666667
```

**Step 3 — Explain.**
- `map` returns a new array of the **same length**, with each item transformed.
- `filter` returns the items where the function returns `true`.
- `reduce` folds the whole list into **one value**. The `0` is the starting value.

**Step 4 — In the project.** Type and run:

<!-- demo -->
```javascript
import { calculateAverageScore } from '../utils/pesertaProcessor.js';
console.log(calculateAverageScore([{ score: 88 }, { score: 94 }, { score: 78 }]));
console.log(calculateAverageScore([]));
```
**Output:**
```
86.67
0
```
The project's version rounds to 2 decimals and handles an empty list.

**Step 5 — Check.** *"Which method answers 'how many passed?'"* **Answer:** `filter`, then `.length`.

**Step 6 — Show the mistake: reduce with no start value.** Type and run:

<!-- demo -->
```javascript
const kosong = [];
console.log(kosong.reduce((sum, score) => sum + score));
```
**Output:**
```
TypeError: Reduce of empty array with no initial value
```
Fix: always pass the start value, `reduce(fn, 0)`. See `COMMON_ERRORS.md` → Array Method Errors.

**Transition:** *"Rules like 'a valid score is between 60 and 100' belong together, in a class."*

---

### Topic 11: Classes (25 min) · Guide Phase 11 · Case point 5

**Goal:** learners write a class with a constructor and arrow methods, and use `new`.

**Step 1 — Hook.** *"We need validators with different rules: strict (80–100) and lenient (60–100). One blueprint, many instances."*

**Step 2 — Live code.** Type and run:

<!-- demo -->
```javascript
class Validator {
  constructor(minScore = 60, maxScore = 100) {
    this.minScore = minScore;
    this.maxScore = maxScore;
  }
  isValidScore = (score) => score >= this.minScore && score <= this.maxScore;
}
const ketat = new Validator(80, 100);
console.log(ketat.isValidScore(85), ketat.isValidScore(75));
const cek = ketat.isValidScore;
console.log(cek(90));
```
**Output:**
```
true false
true
```

**Step 3 — Explain.**
- The `constructor` runs on `new`. It stores the rules on `this`.
- `isValidScore = (score) => ...` is an **arrow method**. `this` stays bound, so it still works when copied into `cek`.

**Step 4 — Contrast with a normal method.** Type and run:

<!-- demo -->
```javascript
class ValidatorLama {
  constructor(minScore) {
    this.minScore = minScore;
  }
  isValid(score) {
    return score >= this.minScore;
  }
}
const cek = new ValidatorLama(80).isValid;
console.log(cek(90));
```
**Output:**
```
TypeError: Cannot read properties of undefined (reading 'minScore')
```
Say: *"A normal method loses `this` when you pass it around. That's why the project uses arrow methods."*

**Step 5 — In the project.** `utils/pesertaValidator.js`: the `PesertaValidator` constructor, `isValidScore`, and `formatResult`.

**Step 6 — Show the mistake: forgetting `new`.** Type and run:

<!-- demo -->
```javascript
class Validator {}
const v = Validator();
```
**Output:**
```
TypeError: Class constructor Validator cannot be invoked without 'new'
```
See `COMMON_ERRORS.md` → Class Errors.

**Transition:** *"The validator lives in its own file. How do other files use it?"*

---

### Topic 12: Modules (15 min) · Guide Phase 12 · Case point 5

**Goal:** learners export from one file, import into another, and always write the `.js` extension.

**Step 1 — Hook.** *"One giant file is hard to read. One job per file, and files share with `export` and `import`."*

**Step 2 — Live code.** Open `utils/pesertaValidator.js` and point at `export class` and `export const createPassingValidator`. Then type and run:

<!-- demo -->
```javascript
import { createPassingValidator, createLenientValidator } from '../utils/pesertaValidator.js';
console.log(createPassingValidator().formatResult("Milea", 78));
console.log(createLenientValidator().formatResult("Milea", 78));
```
**Output:**
```
Milea mendapat score 78 - TIDAK SESUAI
Milea mendapat score 78 - SESUAI STANDAR
```

**Step 3 — Explain.**
- `export` makes a name available to other files. `import { name } from './file.js'` brings it in.
- Same score, different validator, different result: each instance keeps its own rules.
- `package.json` has `"type": "module"`. That is what enables `import` in Node.

**Step 4 — In the project.** `utils/pesertaFormatter.js` imports `PesertaValidator`, and `main.js` imports from all four utils files.

**Step 5 — Show the mistake: no `.js`.** Type and run:

<!-- demo prefix -->
```javascript
import { PesertaValidator } from '../utils/pesertaValidator';
```
**Output:**
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module
```
The full message continues with the absolute path. Fix: `'../utils/pesertaValidator.js'`. See `COMMON_ERRORS.md` → Module & Import Errors.

### Exit ticket, Session 1 (15 min)

Learners answer on paper or in chat:

1. When do you use `let` instead of `const`? *(When the variable must get a new value, for example a counter.)*
2. Aditya's scores are 85 and then 88. Which score does `createPesertaMap` keep, and why? *(88, because `Map.set` replaces the earlier entry for the same email.)*
3. What does `displayPeserta("Milea", 78)` print? *(`Nama: Milea, Score: 78, Status: TIDAK LULUS`)*

---

## 📗 Session 2: The ES2016+ Case Features (Topics 13–18)

### Recap quiz (10 min)

Ask the Session 1 exit-ticket questions out loud. Spend more time on any question that more than a third of the class missed.

---

### Topic 13: includes() and the Pass/Fail Rule (20 min) · Guide Phase 13 · Case point 1, 5, 6

**Goal:** learners validate a status with `includes()`, and know where the LULUS / TIDAK LULUS rule lives.

**Step 1 — Hook.** *"Someone passes the status `"lulus"` in lowercase. Should we print it? We need a list of allowed statuses."*

**Step 2 — Live code.** Type and run:

<!-- demo -->
```javascript
const STATUS = ["LULUS", "TIDAK LULUS"];
console.log(STATUS.indexOf("LULUS") !== -1, STATUS.includes("LULUS"));
console.log(STATUS.includes("lulus"));
console.log([NaN].indexOf(NaN), [NaN].includes(NaN));
```
**Output:**
```
true true
false
-1 true
```

**Step 3 — Explain.**
- `includes()` (ES2016) answers yes or no, and reads better than `indexOf(...) !== -1`.
- It is **case-sensitive**: `"lulus"` is not `"LULUS"`.
- Bonus: it finds `NaN`, which `indexOf` can't.

**Step 4 — In the project.** Type and run:

<!-- demo -->
```javascript
import { PesertaValidator } from '../utils/pesertaValidator.js';
import { displayPeserta } from '../utils/pesertaFormatter.js';
console.log(PesertaValidator.STATUS);
console.log(PesertaValidator.getStatus(80), PesertaValidator.getStatus(79));
console.log(PesertaValidator.isValidStatus("TIDAK LULUS"), PesertaValidator.isValidStatus("BELUM LULUS"));
console.log(displayPeserta("Test", 90, "lulus"));
```
**Output:**
```
[ 'LULUS', 'TIDAK LULUS' ]
LULUS TIDAK LULUS
true false
Nama: Test, Score: 90, Status: LULUS
```
Point out `static` in `utils/pesertaValidator.js`: these belong to the class itself, so no `new` is needed. Then show the before and after:

```bash
git diff es6-baseline HEAD -- utils/pesertaFormatter.js
```

The old code repeated `score >= 80 ? "LULUS" : "BELUM LULUS"` in three places. Now it calls `PesertaValidator.getStatus(score)` from one place.

**Step 5 — Check.**
- *"Is a score of exactly 80 LULUS?"* **Answer:** Yes, because the rule is `>= 80`.
- *"What does `displayPeserta` do with `"lulus"`?"* **Answer:** it replaces it with the status computed from the score.

**Transition:** *"Next, copying and splitting objects, which we've already seen in `createPesertaMap`."*

---

### Topic 14: Object Rest & Spread (20 min) · Guide Phase 14 · Case point 3

**Goal:** learners copy and update an object with spread, split one with rest, and know that `=` is not a copy.

**Step 1 — Hook.** *"Aditya retakes the test. We want a new record with the new score, without changing the old one."*

**Step 2 — Live code.** Type and run:

<!-- demo -->
```javascript
const peserta = { id: 101, name: "Aditya", email: "aditya@brainmatics.com", score: 85 };
const retake = { ...peserta, score: 88 };
console.log(retake.score, peserta.score);
const { email, ...tanpaEmail } = peserta;
console.log(tanpaEmail);
```
**Output:**
```
88 85
{ id: 101, name: 'Aditya', score: 85 }
```

**Step 3 — Explain.**
- **Spread** `{ ...peserta, score: 88 }` copies every field, then overrides `score`. The original is unchanged.
- **Rest** `{ email, ...tanpaEmail }` takes `email` out and collects everything else.
- Rule of thumb: `...` on the **left** of `=` collects (rest); on the **right** it copies out (spread).

**Step 4 — Show the mistake: `=` is not a copy.** Type and run:

<!-- demo -->
```javascript
const peserta = { name: "Aditya", score: 85 };
const bukanSalinan = peserta;
bukanSalinan.score = 0;
console.log(peserta.score);
const salinan = { ...peserta, score: 99 };
console.log(peserta.score, salinan.score);
```
**Output:**
```
0
0 99
```
Say: *"`=` gives the same object a second name. Changing it through either name changes the original."*

**Step 5 — In the project.**
- `createPesertaMap` stores `{ ...peserta }`.
- `loadPeserta` uses both at once: `({ score, ...rest }) => ({ ...rest, score: score ?? 0 })`.
- `main.js` TASK 3 prints `Sisa properti (rest): ...`.

**Step 6 — Check.** *"In `const { name, ...sisanya } = peserta`, is `name` inside `sisanya`?"* **Answer:** No. Rest collects only the fields you didn't name.

**Transition:** *"In Topic 8, a missing email gave `undefined`. What happens when we read `.score` from that?"*

---

### Topic 15: ?. and ?? (20 min) · Guide Phase 15 · Case point 7

**Goal:** learners read values that may be missing with `?.`, give fallbacks with `??`, and know why `||` is wrong for scores.

**Step 1 — Hook.** Type and run:

<!-- demo -->
```javascript
const pesertaMap = new Map();
console.log(pesertaMap.get("tidak-ada@brainmatics.com").score);
```
**Output:**
```
TypeError: Cannot read properties of undefined (reading 'score')
```
*"One missing email crashes the whole program."*

**Step 2 — Live code.** Type and run:

<!-- demo -->
```javascript
const pesertaMap = new Map([["aditya@brainmatics.com", { score: 88 }]]);
console.log(pesertaMap.get("tidak-ada@brainmatics.com")?.score);
console.log(pesertaMap.get("tidak-ada@brainmatics.com")?.score ?? "tidak ditemukan");
console.log(0 || 80, 0 ?? 80);
console.log(null ?? "N/A", undefined ?? "N/A");
```
**Output:**
```
undefined
tidak ditemukan
80 0
N/A N/A
```

**Step 3 — Explain.**
- `?.` stops and gives `undefined` when the left side is `null` or `undefined`, so there is no crash.
- `??` gives a fallback **only** for `null` or `undefined`.
- `||` also replaces `0` and `""`. A score of 0 is a real score, so `0 || 80` silently loses it. **This is the most important point of the topic.**
- Callback to Topic 4: a default parameter doesn't catch `null`, but `??` does.

**Step 4 — In the project.** Type and run:

<!-- demo -->
```javascript
import { createPesertaSummary } from '../utils/pesertaFormatter.js';
console.log(createPesertaSummary(null));
console.log(createPesertaSummary({ name: "Nol", class: "React Basics", score: 0 }));
```
**Output:**
```
📚 Unknown - Class: N/A - Score: 0
📚 Nol - Class: React Basics - Score: 0
```
Point at `peserta ?? {}` in `createPesertaSummary`, and at `json?.peserta ?? []` and `score ?? 0` in `utils/pesertaLoader.js`.

**Step 5 — Check.** *"What are `0 || 80` and `0 ?? 80`?"* **Answer:** `80` and `0`.

**Transition:** *"Every demo so far loaded data with `await`. Time to understand it."*

---

### Topic 16: async/await + try/catch (30 min) · Guide Phase 16 · Case point 7

**Goal:** learners know an async function returns a Promise, use `await` and `.then()`, and handle failure with `try`/`catch`.

**Step 1 — Hook.** *"Reading a file takes time. JavaScript doesn't stop and wait. It gives us a **Promise**: a value that arrives later."*

**Step 2 — Live code: await and try/catch.** Type and run:

<!-- demo -->
```javascript
import { loadPeserta } from '../utils/pesertaLoader.js';
const janji = loadPeserta();
console.log(janji instanceof Promise);
const peserta = await janji;
console.log(peserta.length);
try {
  await loadPeserta(new URL('./tidak-ada.json', import.meta.url));
} catch (error) {
  console.log(error.message.startsWith("Gagal memuat data peserta"));
}
```
**Output:**
```
true
6
true
```

**Step 3 — Live code: the order of .then().** Type and run, and ask learners to **predict the order first**:

<!-- demo -->
```javascript
import { loadPeserta } from '../utils/pesertaLoader.js';
loadPeserta()
  .then((peserta) => console.log("then:", peserta.length))
  .catch((error) => console.log(error.message));
console.log("baris ini jalan duluan");
```
**Output:**
```
baris ini jalan duluan
then: 6
```

**Step 4 — Explain.**
- `async` makes a function return a Promise. `await` pauses *this code* until the Promise resolves.
- `.then()` does the same job without `await`. The line after it runs **first**, because the file isn't read yet.
- `try { ... } catch (error) { ... }`: a missing file or broken JSON lands in `catch`, and the program doesn't crash.
- `await` works at the top level here because this file is a module (ES2022).

**Step 5 — In the project.** Open `utils/pesertaLoader.js` and read it top to bottom. Then open the top of `main.js` (`let rawPeserta; try { ... } catch ...`). Ask: *"Why `let` here?"* **Answer:** it is assigned inside `try`. Then run `node latihan/solusi/07-async-try-catch.js` to show the `catch` branch without touching real data.

**Step 6 — Show the mistake: forgetting await.** Type and run:

<!-- demo -->
```javascript
import { loadPeserta } from '../utils/pesertaLoader.js';
const peserta = loadPeserta();
console.log(peserta.length);
```
**Output:**
```
undefined
```
Say: *"`peserta` is the Promise, not the list. Add `await`."*

**Watch for:** learners renaming `data/peserta.json` to see an error. If someone does, run the reset command from **Before Class**.

**Transition:** *"How do we know the whole system still works? Tests."*

---

### Topic 17: Running & Testing (15 min) · Guide Phase 17

**Goal:** learners run `npm start` and `npm test`, and read a failing test.

**Step 1 — Live: green.** Run `npm test`. It shows the unit tests (`✅ Tests Passed: 79`), then `📝 CEK LATIHAN` and `Latihan: 7/7 cocok`.

**Step 2 — Live: break a rule on purpose.** In `utils/pesertaValidator.js`, change `static PASSING_SCORE = 80;` to `85` and run `npm test`. Among the output:

```
❌ FAIL: Passing score is 80
❌ FAIL: 80 is LULUS (boundary)
✅ Tests Passed: 77
❌ Tests Failed: 2
```

The command exits with code 1, and the exercise check doesn't run, because the unit tests failed first.

**Step 3 — Restore.**
```bash
git restore utils/pesertaValidator.js
```

**Step 4 — Explain.** *"A test names the behaviour it protects. 'Passing score is 80' failing tells you exactly what changed."*

**Step 5 — Check.** *"Which two tests failed, and why only those two?"* **Answer:** the two that check the value 80 itself. Every real score in the data is still on the same side of the new threshold.

**Transition:** *"Now let's put all seven points together."*

---

### Topic 18: The Whole Case, from Data to Status (20 min) · Guide Phase 18 · Case point 1, all

**Goal:** learners trace one participant through the whole system, and can name where each case point lives.

**Step 1 — Live code: trace Aditya.** Type and run:

<!-- demo -->
```javascript
import { loadPeserta } from '../utils/pesertaLoader.js';
import { createPesertaMap } from '../utils/pesertaProcessor.js';
import { displayPeserta } from '../utils/pesertaFormatter.js';
const rawPeserta = await loadPeserta();
const pesertaMap = createPesertaMap(rawPeserta);
const { name, score } = pesertaMap.get("aditya@brainmatics.com");
console.log(displayPeserta(name, score));
```
**Output:**
```
Nama: Aditya Prayoga, Score: 88, Status: LULUS
```
Point at each line and name its topic: load (16), Map with the last test (8), destructuring (6), status (13).

**Step 2 — Live: change the last test.**
1. Run `node latihan/coba-retake.js`. It prints Rina's three tests (70, 76, 82) and `Status: LULUS`.
2. Change her last score in `latihan/peserta-retake.json` to 79, run it again, and the status becomes `TIDAK LULUS`.
3. Change it back to 82.

Say: *"`npm test` doesn't read this file, so experimenting here is safe."*

**Step 3 — Map the seven points.** Show the table in `BEGINNER_GUIDE.md` Step 18.2, and ask the class to fill in the **Phase** column from memory before you reveal it.

**Transition:** *"Your turn. Seven exercises, one per point."*

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

### Solution review and exit ticket (25 min)

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
