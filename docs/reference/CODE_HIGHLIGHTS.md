# ES6 Code Highlights - Annotated Implementation

> Run commands from the repository root, the directory containing `package.json` and `main.js`. Code paths in this reference are relative to that root. Follow the [practice index](../../latihan/README.md) for guided coding.

> The current main.js opens the CRUD terminal menu. The standalone examples below explain individual JavaScript features. Follow [stages 10–13](../../latihan/10-crud-peserta/README.md) for the cumulative application code.

> **Study Guide:** This document highlights the ES6 features in each implementation with annotations explaining what each feature does and why it's used.

---

## 🎯 Task 1.1: Default Parameters Function

### File: `utils/pesertaFormatter.js`

```javascript
// ✨ ES6 FEATURES: Arrow Function, Default Parameters, Template Literals
// ✨ ES2016: includes() via PesertaValidator.isValidStatus
export const displayPeserta = (
  name = "Unknown",           // 📌 DEFAULT PARAMETER: Prevents undefined errors
  score = 0,                  // 📌 DEFAULT PARAMETER: Safe fallback value
  status = PesertaValidator.getStatus(score)  // 📌 CALCULATED DEFAULT: Dynamic based on score
) => {
  // 📌 VALIDATION: an unknown status ("lulus", "CUSTOM") is replaced by the computed one
  const finalStatus = PesertaValidator.isValidStatus(status) ? status : PesertaValidator.getStatus(score);

  // 📌 TEMPLATE LITERAL: Clean string interpolation with backticks
  return `Nama: ${name}, Score: ${score}, Status: ${finalStatus}`;
  //      ^^^^^^ Variable insertion using ${}
};
```

**Why These Features?**
- **Arrow Function (`=>`)**: Concise syntax, no need for `function` keyword
- **Default Parameters**: Prevents `undefined` errors when arguments are missing
- **Template Literals** (backticks): Much cleaner than string concatenation (`"text" + variable`)
- **Calculated Default**: The `status` parameter calculates automatically based on `score`

**Test Examples:**
```javascript
displayPeserta("Aditya", 85);    // Uses name & score, calculates status
displayPeserta("Milea", 78);     // All params provided
displayPeserta();                // Uses ALL defaults: "Unknown", 0, "TIDAK LULUS"
displayPeserta("Test", 90, "lulus"); // Invalid status → "LULUS" (computed from 90)
```

---

## 🎯 Task 1.2: Destructuring with Renaming

### Standalone destructuring example

```javascript
// ✨ ES6 FEATURE: Object Destructuring with Renaming
const pesertaSample = { 
  id: 101, 
  name: "Aditya", 
  email: "aditya@brainmatics.com", 
  score: 85 
};

// 📌 DESTRUCTURING WITH RENAMING: Extract and rename in one step
const { 
  name: pesertaNama,      // Extract 'name', store as 'pesertaNama'
  email: pesertaEmail,    // Extract 'email', store as 'pesertaEmail'
  score: nilaiAkhir       // Extract 'score', store as 'nilaiAkhir'
} = pesertaSample;
//    ^^^^^^^^^^^^^^ Syntax: { oldName: newName } = object

console.log(pesertaNama);   // "Aditya"
console.log(pesertaEmail);  // "aditya@brainmatics.com"
console.log(nilaiAkhir);    // 85
```

### Practical Use: Avoiding Reserved Keywords

```javascript
// ❌ PROBLEM: 'class' is a reserved JavaScript keyword
const { class } = participant;  // Syntax Error!

// ✅ SOLUTION: Rename during destructuring
const { class: className } = participant;  // Works perfectly!
//      ^^^^^^ Reserved word  ^^^^^^^^^ Safe variable name

// Used throughout the codebase:
for (const { id, name, email, class: className, score } of pesertaList) {
  // Now 'className' is available as a normal variable
  console.log(className);  // "JavaScript Fundamentals"
}
```

**Why This Feature?**
- **Shorter code**: No need for `const pesertaNama = peserta.name;` three times
- **Avoid reserved words**: Can't use `class`, `return`, `function`, etc. as variable names
- **Clearer intent**: Shows exactly which fields you're using

---

## 🎯 Task 1.3: Set for Duplicate Removal

### File: `utils/pesertaProcessor.js`

```javascript
// ✨ ES6 FEATURES: Set, Spread Operator, Arrow Function, Array.map()
export const getUniqueEmails = (pesertaList = []) => {
  //                            ^^^^^^^^^^^^^^^^^^^^ Default parameter (safety)
  
  // 📌 METHOD 1: Step-by-step (easier to understand)
  const allEmails = pesertaList.map(p => p.email);  // Extract all emails
  //                                ^^^ Arrow function
  const emailSet = new Set(allEmails);  // 📌 SET: Automatically removes duplicates
  return [...emailSet];  // 📌 SPREAD OPERATOR: Convert Set back to Array
  //     ^^^ Three dots spread the Set into an array
  
  // 📌 METHOD 2: One-liner (advanced)
  return [...new Set(pesertaList.map(p => p.email))];
  //     ^^^ Spread    ^^^ Set      ^^^ Map to extract emails
};
```

**How Set Works:**
```javascript
// Arrays can have duplicates:
const emails = ["a@test.com", "b@test.com", "a@test.com"];  // 3 items

// Set automatically removes duplicates:
const uniqueSet = new Set(emails);  
console.log(uniqueSet);  // Set { "a@test.com", "b@test.com" }  // 2 items!

// But Set is not an array - need to convert:
console.log(uniqueSet[0]);  // ❌ undefined (can't use array indexing)
console.log([...uniqueSet][0]);  // ✅ "a@test.com" (converted to array)
```

**Visual Flow:**
```
rawPeserta (6 items)
    ↓ .map(p => p.email)
All Emails Array (6 emails, with duplicates)
    ↓ new Set()
Email Set (4 unique emails)
    ↓ [...set]
Unique Emails Array (4 emails)
```

**Real Result:**
```javascript
// Input: 6 participants (Aditya appears twice, Zaim appears twice)
// Output: ["aditya@brainmatics.com", "zaim@brainmatics.com", 
//          "milea@brainmatics.com", "pratama@brainmatics.com"]
// ✅ 4 unique emails!
```

---

## 🎯 Task 1.4: Map for Participant Indexing

### File: `utils/pesertaProcessor.js`

```javascript
// ✨ ES6 FEATURES: Map, for...of Loop  ✨ ES2018: Object Spread
export const createPesertaMap = (pesertaList = []) => {
  
  // 📌 MAP: Key-value storage with O(1) lookup (super fast!)
  const pesertaMap = new Map();
  //                 ^^^ Like an object, but better for dynamic keys
  
  // 📌 for...of LOOP: Clean iteration over arrays
  for (const peserta of pesertaList) {
    
    // 📌 Map.set(): If email exists, OVERWRITES old value (keeps the last test)
    // 📌 OBJECT SPREAD { ...peserta }: copies every field into a new object
    pesertaMap.set(peserta.email, { ...peserta });
    //             ^^^ Key        ^^^ Value (copy of the participant object)
  }
  
  return pesertaMap;
};
```

**How Map Handles Duplicates:**
```javascript
const map = new Map();

// First entry for aditya@brainmatics.com:
map.set("aditya@brainmatics.com", { id: 101, score: 85 });
console.log(map.get("aditya@brainmatics.com"));  
// { id: 101, score: 85 }

// Second entry OVERWRITES the first:
map.set("aditya@brainmatics.com", { id: 103, score: 88 });
console.log(map.get("aditya@brainmatics.com"));  
// { id: 103, score: 88 } ✅ Latest kept!
```

**Map vs Object:**
```javascript
// ❌ Object (limited):
const obj = {};
obj["key"] = "value";
obj["key"];  // Access

// ✅ Map (powerful):
const map = new Map();
map.set("key", "value");  // Better API
map.get("key");           // Clear intent
map.has("key");           // Check existence
map.size;                 // Count items
```

**Visual Process:**
```
Entry 1: aditya@..., id:101, score:85 → Map["aditya@..."] = {id:101, score:85}
Entry 2: zaim@..., id:102, score:92   → Map["zaim@..."] = {id:102, score:92}
Entry 3: aditya@..., id:103, score:88 → Map["aditya@..."] = {id:103, score:88} ⚠️ OVERWRITES Entry 1!
Entry 4: milea@..., id:104, score:78  → Map["milea@..."] = {id:104, score:78}
Entry 5: pratama@..., id:105, score:95 → Map["pratama@..."] = {id:105, score:95}
Entry 6: zaim@..., id:106, score:94   → Map["zaim@..."] = {id:106, score:94} ⚠️ OVERWRITES Entry 2!

Final Map Size: 4 (duplicates merged)
```

---

## 🎯 Task 1.5: ES6 Class with Arrow Methods

### File: `utils/pesertaValidator.js`

```javascript
// ✨ ES6 FEATURES: Class, Constructor, Arrow Methods, Default Parameters
// ✨ ES2022: Static Fields  ✨ ES2016: includes()
export class PesertaValidator {
  //     ^^^^^ ES6 class keyword

  // 📌 STATIC FIELDS: belong to the class, not to an instance.
  // Other modules read PesertaValidator.PASSING_SCORE without `new`.
  static PASSING_SCORE = 80;
  static STATUS = ["LULUS", "TIDAK LULUS"];

  // 📌 ONE PLACE for the pass/fail rule (the formatter imports it)
  static getStatus = (score = 0) =>
    score >= PesertaValidator.PASSING_SCORE ? "LULUS" : "TIDAK LULUS";

  // 📌 includes(): true if the list contains the value (strict, case-sensitive)
  static isValidStatus = (status) => PesertaValidator.STATUS.includes(status);
  //                                                  ^^^^^^^^ replaces indexOf(status) !== -1
  
  // 📌 CONSTRUCTOR: Runs when creating new instance
  constructor(minScore = 60, maxScore = 100) {
  //          ^^^^^^^^^^^^^ Default parameters in constructor
    this.minScore = minScore;  // Store as instance property
    this.maxScore = maxScore;
  }

  // 📌 ARROW METHOD: Maintains 'this' binding (safe for callbacks)
  isValidScore = (score) => {
  //           ^^^ Arrow function as class method
    return score >= this.minScore && score <= this.maxScore;
    //               ^^^^ Can access instance properties
  };

  // 📌 ANOTHER ARROW METHOD: With template literal
  formatResult = (name, score) => {
    const status = this.isValidScore(score) ? "SESUAI STANDAR" : "TIDAK SESUAI";
    //             ^^^^ Calling another method of the class
    
    // 📌 TEMPLATE LITERAL: Clean string building
    return `${name} mendapat score ${score} - ${status}`;
  };
}
```

**Using the Class:**
```javascript
// 📌 CREATE INSTANCE: Use 'new' keyword
const validator = new PesertaValidator(80, 100);
//                ^^^ Must use 'new' with classes

// 📌 CALL METHODS:
console.log(validator.isValidScore(85));  // true (85 is between 80-100)
console.log(validator.isValidScore(75));  // false (75 is below 80)

console.log(validator.formatResult("Aditya", 85));
// "Aditya mendapat score 85 - SESUAI STANDAR"

console.log(validator.formatResult("Milea", 75));
// "Milea mendapat score 75 - TIDAK SESUAI"
```

**Why Arrow Methods?**
```javascript
class Example {
  // ❌ Regular method loses 'this' when used as callback:
  regularMethod(score) {
    return score >= this.minScore;  // 'this' might be undefined!
  }
  
  // ✅ Arrow method keeps 'this' binding:
  arrowMethod = (score) => {
    return score >= this.minScore;  // 'this' always works!
  };
}

const ex = new Example();
[85, 90].filter(ex.arrowMethod);  // ✅ Works!
[85, 90].filter(ex.regularMethod);  // ❌ Error: 'this' is undefined
```

---

## 🎯 Task 1.6a: Filter & Calculate with ES6 Methods

### File: `utils/pesertaProcessor.js`

```javascript
// ✨ ES6 FEATURES: for...of, Destructuring, Array Push
export const getPesertaByClass = (pesertaList = [], className = "") => {
  const result = [];
  
  // 📌 for...of LOOP: Modern iteration (no index needed)
  for (const { id, name, email, class: pesertaClass, score } of pesertaList) {
  //          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Destructure in loop
    
    if (pesertaClass === className) {
      result.push({ id, name, email, class: pesertaClass, score });
      //          ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Object shorthand
    }
  }
  
  return result;
};

// ✨ ES6 FEATURES: Arrow Function, Default Parameter, reduce, Destructuring
export const calculateAverageScore = (pesertaList = []) => {
  
  // 📌 EDGE CASE HANDLING: Prevent division by zero
  if (pesertaList.length === 0) return 0;
  
  // 📌 REDUCE: Combine array into single value
  const totalScore = pesertaList.reduce((sum, { score }) => sum + score, 0);
  //                                     ^^^ Accumulator  ^^^ Destructure score  ^^^ Start at 0
  
  // 📌 CALCULATE & ROUND:
  return Math.round((totalScore / pesertaList.length) * 100) / 100;
  //     ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Round to 2 decimals
};
```

**How reduce() Works:**
```javascript
const participants = [
  { score: 85 },
  { score: 92 },
  { score: 78 }
];

// Step-by-step reduce:
// Step 1: sum=0, score=85  → return 0 + 85 = 85
// Step 2: sum=85, score=92 → return 85 + 92 = 177
// Step 3: sum=177, score=78 → return 177 + 78 = 255
// Final result: 255

const total = participants.reduce((sum, { score }) => sum + score, 0);
console.log(total);  // 255
console.log(total / participants.length);  // 85 (average)
```

**for...of vs Traditional for:**
```javascript
// ❌ Old way (verbose):
for (let i = 0; i < pesertaList.length; i++) {
  const peserta = pesertaList[i];
  const id = peserta.id;
  const name = peserta.name;
  // ... more lines
}

// ✅ Modern way (clean):
for (const { id, name, email, class: className, score } of pesertaList) {
  // All variables ready to use!
}
```

---

## 🎯 Task 1.6b: Display Formatting

### File: `utils/pesertaFormatter.js`

```javascript
// ✨ ES6 FEATURES: Arrow Function, Destructuring with Defaults, Template Literal
export const createPesertaSummary = (peserta = {}) => {
  //                                ^^^^^^^^^^^^^ Default to empty object
  
  // 📌 DESTRUCTURING WITH DEFAULTS: Safe even if properties are missing
  const { 
    name = "Unknown",           // Fallback if name is undefined
    score = 0,                  // Fallback if score is undefined
    class: className = "N/A"    // Rename AND provide fallback
  } = peserta;
  
  // 📌 TEMPLATE LITERAL WITH EMOJI: Modern, expressive strings
  return `📚 ${name} - Class: ${className} - Score: ${score}`;
  //      ^^ Emoji support!  ^^^ Variable interpolation
};
```

**Destructuring Safety Demo:**
```javascript
// ❌ Without defaults - risky:
const { name, score, class: className } = {};
console.log(name);  // undefined
console.log(`Score: ${score}`);  // "Score: undefined" 😱

// ✅ With defaults - safe:
const { name = "Unknown", score = 0, class: className = "N/A" } = {};
console.log(name);  // "Unknown"
console.log(`Score: ${score}`);  // "Score: 0" ✅
```

---

## 🎯 Task 1.6c: Module System Integration

### Standalone integration example

```javascript
// ✨ ES6 FEATURE: Named Imports
// 📌 IMPORT SPECIFIC FUNCTIONS: Only take what you need
import { 
  getUniqueEmails,           // From processor module
  createPesertaMap, 
  getPesertaByClass, 
  calculateAverageScore,
  getUniquePeserta 
} from './utils/pesertaProcessor.js';
//                                 ^^^ Must include .js extension!

import { 
  displayPeserta,            // From formatter module
  createPesertaSummary, 
  formatPesertaList,
  createDetailedReport 
} from './utils/pesertaFormatter.js';

import { 
  PesertaValidator,          // From validator module (class)
  createPassingValidator,
  createLenientValidator 
} from './utils/pesertaValidator.js';

import { loadPeserta } from './utils/pesertaLoader.js';  // Async data loader

// 📌 let + try/catch + top-level await (see "ES2016+ Highlights" below)
let rawPeserta;
try {
  rawPeserta = await loadPeserta();
} catch (error) {
  console.error(`❌ ${error.message}`);
  process.exit(1);
}

// 📌 USE IMPORTED FUNCTIONS:
console.log("🎓 Demo ES6 Features");

// Get unique participants (removes duplicates)
const uniquePeserta = getUniquePeserta(rawPeserta);

// Filter by class
const jsFundamentals = getPesertaByClass(uniquePeserta, "JavaScript Fundamentals");

// Calculate statistics
const jsAverage = calculateAverageScore(jsFundamentals);

// Display formatted output
jsFundamentals.forEach(peserta => {
  console.log(createPesertaSummary(peserta));
});

console.log(`⭐ Average Score: ${jsAverage}`);

// Use validator class
const validator = new PesertaValidator(80, 100);
uniquePeserta.forEach(({ name, score }) => {
  console.log(validator.formatResult(name, score));
});
```

**Module Export Pattern:**
```javascript
// In utils/pesertaProcessor.js:
export const func1 = () => { ... };  // 📌 Named export
export const func2 = () => { ... };  // 📌 Named export

// In main.js:
import { func1, func2 } from './utils/pesertaProcessor.js';  // 📌 Named import
//     ^^^^^^^^^^^ Import specific functions by name
```

---

## 🚀 ES2016+ Highlights

### Object Rest & Spread (ES2018) — `utils/pesertaLoader.js`

```javascript
// ✨ ES2018: Object Rest + Spread
pesertaList.map(({ score, ...rest }) => ({ ...rest, score: score ?? 0 }));
//                        ^^^^^^^ REST: collect every field except score
//                                         ^^^^^^^ SPREAD: copy them into a new object
```

```javascript
// Destructuring concept example (practice stage 03)
const { name, ...sisanya } = { id: 101, name: "Aditya", email: "aditya@brainmatics.com", score: 85 };
// sisanya → { id: 101, email: "aditya@brainmatics.com", score: 85 }
```

### `includes()` (ES2016) — `PesertaValidator.isValidStatus`

```javascript
PesertaValidator.isValidStatus("LULUS");       // true
PesertaValidator.isValidStatus("TIDAK LULUS"); // true
PesertaValidator.isValidStatus("lulus");       // false: includes() is case-sensitive
PesertaValidator.isValidStatus("PENDING");     // false: not in the list
```

### async/await + try/catch (ES2017) — `utils/pesertaLoader.js`

```javascript
// ✨ ES2017: async function, await  ✨ try/catch for errors
export const loadPeserta = async (fileUrl = new URL('../data/peserta.json', import.meta.url)) => {
  try {
    const text = await readFile(fileUrl, 'utf8');  // 📌 await: pause until the file is read
    const json = JSON.parse(text);                 // 📌 throws on broken JSON
    return (json?.peserta ?? []).map(({ score, ...rest }) => ({ ...rest, score: score ?? 0 }));
  } catch (error) {
    // 📌 Missing file AND broken JSON both end up here
    throw new Error(`Gagal memuat data peserta dari ${fileUrl}: ${error.message}`);
  }
};
```

**An async function always returns a Promise.** These two calls are equivalent:

```javascript
// With await (inside an async function, or at the top level of a module)
const peserta = await loadPeserta();

// With .then()/.catch()
loadPeserta()
  .then((peserta) => console.log(peserta.length))
  .catch((error) => console.error(error.message));
```

### Optional Chaining `?.` and Nullish Coalescing `??` (ES2020)

```javascript
json?.peserta ?? []        // JSON.parse("null") is null → ?. gives undefined → ?? gives []
score ?? 0                 // undefined/null → 0, but a real 0 stays 0 (|| would also replace 0)
peserta ?? {}              // formatters accept null; a default parameter only catches undefined
pesertaMap.get("tidak-ada@brainmatics.com")?.score ?? "tidak ditemukan"  // Missing-value concept example (practice stage 09)
```

| Expression | `||` result | `??` result |
|---|---|---|
| `0 ?? 80` | `80` | `0` |
| `"" ?? "N/A"` | `"N/A"` | `""` |
| `null ?? "N/A"` | `"N/A"` | `"N/A"` |

---

## 🎓 Summary: ES6 Features Used

### Core Syntax
- ✅ **Arrow Functions** (`=>`) - Concise function syntax
- ✅ **Template Literals** (backticks) - Clean string interpolation
- ✅ **Default Parameters** - Safe fallback values
- ✅ **Destructuring** - Extract multiple values at once
- ✅ **Destructuring with Renaming** - Extract and rename simultaneously

### Data Structures
- ✅ **Set** - Automatic duplicate removal
- ✅ **Map** - Fast key-value lookups
- ✅ **Spread Operator** (`...`) - Convert Set/Map to array

### Control Flow
- ✅ **for...of Loop** - Modern iteration without index
- ✅ **Ternary Operator** - Concise conditional expressions

### Arrays
- ✅ **Array.map()** - Transform each element
- ✅ **Array.filter()** - Keep matching elements
- ✅ **Array.reduce()** - Combine into single value

### Objects & Classes
- ✅ **ES6 Classes** - Modern OOP syntax
- ✅ **Constructor** - Initialize instances
- ✅ **Arrow Methods** - Preserve `this` binding
- ✅ **Object Shorthand** - `{ name }` instead of `{ name: name }`

### ES2016+
- ✅ **includes()** (ES2016) - Validate a status against a list
- ✅ **async/await + try/catch** (ES2017) - Load data from a file
- ✅ **Object Rest/Spread** (ES2018) - Copy and split objects
- ✅ **?. and ??** (ES2020) - Safe access and fallbacks for null/undefined
- ✅ **Static Fields, top-level await** (ES2022) - Class-level rules; await without a wrapper function

### Modules
- ✅ **Named Exports** - `export const func = ...`
- ✅ **Named Imports** - `import { func } from './module.js'`
- ✅ **Module System** - Organize code across files

---

## 📊 Quick Reference Card

| Feature | Old Way | ES6 Way |
|---------|---------|---------|
| **Function** | `function add(a, b) { return a + b; }` | `const add = (a, b) => a + b;` |
| **String** | `"Hello " + name + "!"` | `` `Hello ${name}!` `` |
| **Default** | `function greet(name) { name = name \|\| "Guest"; }` | `const greet = (name = "Guest") => ...` |
| **Extract** | `const name = person.name; const age = person.age;` | `const { name, age } = person;` |
| **Loop** | `for (let i = 0; i < arr.length; i++) { ... }` | `for (const item of arr) { ... }` |
| **Unique** | Manual array filtering | `[...new Set(array)]` |
| **Class** | `function MyClass() { this.x = 1; }` | `class MyClass { constructor() { this.x = 1; } }` |

---

**🎯 Pro Tip:** Run `npm start` and watch how all these ES6 features work together in a real application!

---

*Study this document alongside the actual code files to see ES6 features in action!*


## Application reference

The input file `data/peserta.json` contains a `peserta` array. Each participant has `id`, `name`, `email`, `class`, and `score`. Six test records become four unique participants after deduplication.

The last occurrence of an email supplies its participant data, even when the last score is lower. A Map retains the order of each email's first insertion. The pass threshold is 80, while an instance of `PesertaValidator` checks a separate configurable range, defaulting to 60–100.

| Module | Exports and behavior |
|---|---|
| `utils/pesertaLoader.js` | `loadPeserta(fileUrl)` reads JSON asynchronously. It returns `[]` for JSON `null` or a missing `peserta` key, defaults missing scores to zero, and throws an Indonesian error naming a missing or malformed file. |
| `utils/pesertaProcessor.js` | `getUniqueEmails(list)` returns unique email values. `createPesertaMap(list)` keeps the last record per email. `getUniquePeserta(list)` returns its values as an array. `getPesertaByClass(list, className)` filters a class. `calculateAverageScore(list)` rounds the average to two decimals and returns zero for an empty list. |
| `utils/pesertaFormatter.js` | `displayPeserta(name, score, status)` formats a participant and replaces an unknown status with the computed one. `createPesertaSummary(peserta)` creates a one-line summary. `formatPesertaList(list)` numbers the list. `createDetailedReport(peserta)` creates the detailed report. |
| `utils/pesertaValidator.js` | `PesertaValidator` checks score ranges. Its static `getStatus(score)` determines pass/fail and `isValidStatus(status)` checks the allowed labels. `createPassingValidator()` uses 80–100; `createLenientValidator()` uses 60–100. |

Output formats include:

```text
Nama: Aditya Prayoga, Score: 88, Status: LULUS
📚 Aditya Prayoga - Class: JavaScript Fundamentals - Score: 88
Aditya Prayoga mendapat score 88 - SESUAI STANDAR
```

## Current CRUD and storage flow

`utils/pesertaCrud.js` exports tambahPeserta, ubahPeserta, hapusPeserta, tambahNilai, and getRiwayatTes. These functions return new arrays and objects. Normalized email identifies a participant; ID identifies one test. Retests append in order, including lower scores. Biodata updates preserve IDs and scores across all tests.

`utils/pesertaStore.js` validates structure, IDs, identity, and finite scores before loading or saving. It initializes a working file from the seed only on ENOENT. Saving writes a temporary file in the target directory, then renames it. main.js awaits save before replacing in-memory history or printing success.

The menu uses one readline async iterator. List, filter, and statistics use unique participants with the last score. Detail shows every test. EOF cancels an incomplete form; deleting requires confirmation. The 60–100 validator range remains separate from the passing threshold of 80.
