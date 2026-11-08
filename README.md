# Modern JavaScript (ES6–ES2020) Training Management System

> **Sistem Manajemen Peserta Training** - A comprehensive ES6+ study case project demonstrating modern JavaScript features through a practical training participant management system for Brainmatics.

## 📚 Project Overview

This project implements a complete training management solution showcasing **ES6+ features** including:
- ✅ ES6 Modules (import/export)
- ✅ Arrow Functions
- ✅ Default Parameters
- ✅ Template Literals
- ✅ Destructuring (with renaming)
- ✅ Spread Operator
- ✅ Set for Uniqueness
- ✅ Map for Key-Value Storage
- ✅ for...of Loops
- ✅ Class Syntax with Arrow Methods
- ✅ Array Methods (map, filter, reduce)
- ✅ `includes()` for status validation (ES2016)
- ✅ async/await + try/catch for loading data (ES2017)
- ✅ Object Rest/Spread (ES2018)
- ✅ Optional Chaining `?.` and Nullish Coalescing `??` (ES2020)
- ✅ Static class fields and top-level `await` (ES2022)

> The original ES6-only version is kept in git as the tag `es6-baseline` (`git checkout es6-baseline`).

## 📋 Studi Kasus

> Kelola peserta dan tentukan Lulus atau Tidak Lulus dari nilai tes terakhir.
> Gunakan const/let dan function dengan default parameter.
> Terapkan destructuring dan object rest/spread (ES2018).
> Gunakan Set untuk deduplikasi dan Map untuk index peserta.
> Buat class validator dan pisahkan dengan export/import.
> Validasi status peserta dengan includes() (ES2016).
> Muat data dengan async/await + try/catch; gunakan ?. dan ??.

| # | Requirement | Where in the code |
|---|---|---|
| 1 | Lulus / Tidak Lulus from the last test score | `createPesertaMap` keeps the latest entry per email; `PesertaValidator.getStatus(score)` decides `LULUS` (≥ 80) or `TIDAK LULUS` |
| 2 | const/let, default parameters | Every function has defaults (`pesertaList = []`); `main.js` uses `let` for data assigned inside `try` |
| 3 | Destructuring, object rest/spread | `loadPeserta` normalizes with `({ score, ...rest }) => ({ ...rest, score })`; `createPesertaMap` copies with `{ ...peserta }`; `class: className` renaming everywhere |
| 4 | Set for dedup, Map for index | `getUniqueEmails` (Set), `createPesertaMap` (Map keyed by email) |
| 5 | Validator class with export/import | `utils/pesertaValidator.js`, imported by `utils/pesertaFormatter.js` and `main.js` |
| 6 | Status validation with `includes()` | `PesertaValidator.isValidStatus(status)`; `displayPeserta` never prints an unknown status |
| 7 | async/await + try/catch, `?.` and `??` | `utils/pesertaLoader.js` reads `data/peserta.json`; `json?.peserta ?? []`, `score ?? 0`; formatters accept `null` via `peserta ?? {}` |

## 🏗️ Architecture

```
es6-training-management/
├── data/
│   └── peserta.json            # Raw participant data (loaded asynchronously)
├── utils/
│   ├── pesertaLoader.js        # async/await loader (try/catch, ?., ??)
│   ├── pesertaProcessor.js     # Core business logic
│   ├── pesertaFormatter.js     # Display formatting
│   └── pesertaValidator.js     # Validation class + pass/fail rules
├── test/
│   ├── fixtures/               # Broken/empty JSON files for loader tests
│   └── test-all.js             # Comprehensive unit tests
├── main.js                     # Application entry point
├── package.json                # Project configuration
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js v22+

### Installation & Running

```bash
# No installation needed - uses native ES6 modules

# Run the main application
npm start

# Run all tests
npm test
```

## 📖 Feature Demonstrations

### 1. Module System
All files use ES6 `import`/`export` syntax:

```javascript
// Export
export const getUniqueEmails = (pesertaList = []) => { ... };

// Import
import { getUniqueEmails } from './utils/pesertaProcessor.js';
```

### 2. Default Parameters & Arrow Functions
```javascript
export const displayPeserta = (
  name = "Unknown", 
  score = 0, 
  status = PesertaValidator.getStatus(score)
) => {
  const finalStatus = PesertaValidator.isValidStatus(status) ? status : PesertaValidator.getStatus(score);
  return `Nama: ${name}, Score: ${score}, Status: ${finalStatus}`;
};
```

### 3. Destructuring with Renaming
```javascript
// Avoid 'class' keyword conflict
for (const { id, name, email, class: className, score } of pesertaList) {
  // Process with renamed 'className'
}
```

### 4. Set for Uniqueness
```javascript
export const getUniqueEmails = (pesertaList = []) => {
  const emailSet = new Set(pesertaList.map(p => p.email));
  return [...emailSet]; // Spread back to array
};
```

### 5. Map for O(1) Lookups
```javascript
export const createPesertaMap = (pesertaList = []) => {
  const pesertaMap = new Map();
  for (const peserta of pesertaList) {
    pesertaMap.set(peserta.email, { ...peserta }); // latest entry wins; ES2018 spread copy
  }
  return pesertaMap;
};
```

### 6. Class with Arrow Methods
```javascript
export class PesertaValidator {
  static PASSING_SCORE = 80;
  static STATUS = ["LULUS", "TIDAK LULUS"];
  static getStatus = (score = 0) =>
    score >= PesertaValidator.PASSING_SCORE ? "LULUS" : "TIDAK LULUS";
  static isValidStatus = (status) => PesertaValidator.STATUS.includes(status); // ES2016

  constructor(minScore = 60, maxScore = 100) {
    this.minScore = minScore;
    this.maxScore = maxScore;
  }
  
  isValidScore = (score) => score >= this.minScore && score <= this.maxScore;
  
  formatResult = (name, score) => {
    const status = this.isValidScore(score) ? "SESUAI STANDAR" : "TIDAK SESUAI";
    return `${name} mendapat score ${score} - ${status}`;
  };
}
```

### 7. Async Loading with try/catch, `?.` and `??`
```javascript
export const loadPeserta = async (fileUrl = new URL('../data/peserta.json', import.meta.url)) => {
  try {
    const json = JSON.parse(await readFile(fileUrl, 'utf8'));
    return (json?.peserta ?? []).map(({ score, ...rest }) => ({ ...rest, score: score ?? 0 }));
  } catch (error) {
    throw new Error(`Gagal memuat data peserta dari ${fileUrl}: ${error.message}`);
  }
};

// main.js (top-level await)
let rawPeserta;
try {
  rawPeserta = await loadPeserta();
} catch (error) {
  console.error(`❌ ${error.message}`);
  process.exit(1);
}
```

## 🧪 Testing

The project includes comprehensive unit tests covering:

- ✅ Data validation
- ✅ Unique email extraction
- ✅ Participant Map creation
- ✅ Class filtering
- ✅ Score calculations
- ✅ Display formatting
- ✅ Validator class functionality
- ✅ Edge cases (empty arrays, undefined parameters)

Run tests with:
```bash
npm test
```

Expected output:
```
🧪 RUNNING UNIT TESTS FOR ES6 TRAINING SYSTEM
✅ Tests Passed: 79
❌ Tests Failed: 0
📈 Pass Rate: 100%
🎉 ALL TESTS PASSED!
```

## 📊 Data Structure

### Participant Object
```javascript
{
  id: 101,
  name: "Aditya Prayoga",
  email: "aditya@brainmatics.com",
  class: "JavaScript Fundamentals",
  score: 85
}
```

### Business Rules
- **Email Uniqueness**: Duplicates removed, latest entry kept
- **Score Validation**: 
  - Valid range: 60-100
  - Passing threshold: 80
  - `>= 80` = "LULUS" (Pass)
  - `< 80` = "TIDAK LULUS" (Not Pass)
- **Last Test Score**: when an email appears more than once, the last entry is the latest test

## 🔑 Key Functions

### Loading (`utils/pesertaLoader.js`)
- `loadPeserta(fileUrl)` - async; reads `data/peserta.json`, returns `[]` for an empty file, throws an Indonesian error for a missing or broken file

### Data Processing (`utils/pesertaProcessor.js`)
- `getUniqueEmails(pesertaList)` - Extract unique emails using Set
- `createPesertaMap(pesertaList)` - Create email-indexed Map
- `getPesertaByClass(pesertaList, className)` - Filter by class
- `calculateAverageScore(pesertaList)` - Calculate average score
- `getUniquePeserta(pesertaList)` - Remove duplicate participants

### Formatting (`utils/pesertaFormatter.js`)
- `displayPeserta(name, score, status)` - Format participant info
- `createPesertaSummary(peserta)` - Create emoji summary
- `formatPesertaList(pesertaList)` - Format numbered list
- `createDetailedReport(peserta)` - Generate detailed report

### Validation (`utils/pesertaValidator.js`)
- `PesertaValidator` class - Score validation with configurable thresholds
- `PesertaValidator.getStatus(score)` - `LULUS` or `TIDAK LULUS` (threshold `PesertaValidator.PASSING_SCORE` = 80)
- `PesertaValidator.isValidStatus(status)` - `includes()` check against `PesertaValidator.STATUS`
- `createPassingValidator()` - Factory for 80-100 threshold
- `createLenientValidator()` - Factory for 60-100 threshold

## 💡 Learning Objectives

This project teaches:

1. **Modular Code Organization** - Separation of concerns across files
2. **ES6 Syntax Mastery** - Practical use of modern JavaScript features
3. **Functional Programming** - Pure functions, immutability principles
4. **Data Structures** - Efficient use of Set and Map
5. **Class-based OOP** - Modern class syntax with arrow methods
6. **Error Handling** - Default parameters and edge case management
7. **Testing** - Unit test patterns for ES6 code

## 🎯 Use Cases

The system demonstrates handling of:
- ✅ Duplicate data management
- ✅ Data filtering and aggregation
- ✅ Score validation and reporting
- ✅ Multi-class participant tracking
- ✅ Statistical calculations
- ✅ Formatted output generation

## 📝 Output Examples

### Participant Display
```
Nama: Aditya Prayoga, Score: 88, Status: LULUS
```

### Summary Format
```
📚 Aditya Prayoga - Class: JavaScript Fundamentals - Score: 88
```

### Validation Result
```
Aditya Prayoga mendapat score 88 - SESUAI STANDAR
```

## 🤝 Contributing

This is an educational project. Feel free to:
- Add new ES6 features demonstrations
- Improve test coverage
- Enhance documentation
- Create additional utility functions

## 📄 License

MIT License - Feel free to use this for learning purposes.

## 👨‍🏫 Author

**Brainmatics Training**  
ES6 Study Case - Training Management System

---

**Happy Learning! 🚀**
