# Quick Start Guide - ES6 Training Management System

## 🚀 Getting Started in 30 Seconds

### Prerequisites
- Node.js v22 or higher
- No external dependencies needed!

### Installation
No installation required - this project uses native ES6 modules.

Buka terminal di root repository `modern-javascript-basic`, yaitu folder yang berisi README ini.

Untuk praktik mengetik aplikasi sendiri, mulai dari [tahap 00](latihan/00-persiapan/README.md). Jalankan starter:

```bash
npm --prefix latihan/proyek start
```

Lanjutkan satu proyek yang sama melalui [tahap 00–11](latihan/README.md). Script test proyek peserta ditambahkan pada tahap 11. Perintah npm start dan npm test tanpa --prefix di bawah menjalankan aplikasi referensi.

## 🎯 Running the Project

### Option 1: Run the Full Demonstration
See all ES6 features in action with complete output:

```bash
npm start
```

**Expected Output:**
- 9 task demonstrations
- Unique email extraction
- Map-based duplicate handling
- Class filtering and statistics
- Validation reports
- Complete ES6 feature showcase

### Option 2: Run All Tests
Validate the implementation with 79 comprehensive unit tests:

```bash
npm test
```

**Expected Result:**
```
✅ Tests Passed: 79
❌ Tests Failed: 0
📈 Pass Rate: 100%
🎉 ALL TESTS PASSED!
```

### Option 3: Run with Direct Node Command
```bash
# Run main application
node main.js

# Run tests
node test/test-all.js
```

## 📁 Project Structure

```
es6-training-management/
├── data/
│   └── peserta.json            # 6 participants (2 duplicates)
├── utils/
│   ├── pesertaLoader.js        # async/await loader (try/catch, ?., ??)
│   ├── pesertaProcessor.js     # Core logic (Set, Map, filters)
│   ├── pesertaFormatter.js     # Display formatting
│   └── pesertaValidator.js     # Validation class + pass/fail rules
├── test/
│   ├── fixtures/               # Broken/empty JSON for loader tests
│   └── test-all.js             # 79 unit tests
├── latihan/                    # Stages 00–11, learner starter, and reference exercises
├── main.js                     # Run this!
└── package.json                # ES6 module config
```

## 🎓 What You'll Learn

Running `npm start` demonstrates:

1. **ES6 Modules** - import/export syntax
2. **Arrow Functions** - concise function syntax
3. **Default Parameters** - function parameter defaults
4. **Template Literals** - string interpolation with backticks
5. **Destructuring** - extract values from objects/arrays
6. **Spread Operator** - array/object expansion
7. **Set** - unique value collections
8. **Map** - key-value data structures
9. **for...of** - modern loop syntax
10. **Classes** - ES6 class syntax with arrow methods
11. **Array Methods** - map, filter, reduce

## 📊 Sample Output Highlights

### Unique Email Extraction (Set)
```
Found 4 unique emails:
  1. aditya@brainmatics.com
  2. zaim@brainmatics.com
  3. milea@brainmatics.com
  4. pratama@brainmatics.com
```

### Duplicate Handling (Map)
```
Latest entry for aditya@brainmatics.com:
  ID       : 103  (kept the latest, not 101)
  Score    : 88   (updated from 85)
  Status   : ✅ LULUS
```

### Class Statistics
```
📚 JavaScript Fundamentals Class (2 students):
  ⭐ Average Score: 83

📚 React Basics Class (2 students):
  ⭐ Average Score: 94.5
```

### Validation Results
```
Validation Summary (Threshold: 80-100):
  Total Participants: 4
  Valid (LULUS): 3
  Invalid (TIDAK LULUS): 1
  Pass Rate: 75%
```

## 🔧 Troubleshooting

### Error: "Cannot use import statement outside a module"
**Solution:** Ensure `package.json` has `"type": "module"`

### Error: Module not found
**Solution:** Check file paths use `.js` extension in imports
```javascript
import { func } from './utils/module.js';  // ✅ Correct
import { func } from './utils/module';     // ❌ Wrong
```

### Tests failing?
Run individual test suites by opening `test/test-all.js` and checking specific assertions.

## 📖 Reading the Code

### Start Here (in this order):
1. **`data/peserta.json`** - Understand the data structure (loaded by `utils/pesertaLoader.js`)
2. **`utils/pesertaProcessor.js`** - Core ES6 patterns
3. **`utils/pesertaFormatter.js`** - Template literals and defaults
4. **`utils/pesertaValidator.js`** - ES6 class syntax
5. **`main.js`** - See everything come together

### Key Functions to Study:
- `getUniqueEmails()` - Set usage
- `createPesertaMap()` - Map usage with for...of
- `getPesertaByClass()` - Destructuring with renaming
- `calculateAverageScore()` - Reduce with spread operator
- `PesertaValidator` - Class with arrow methods

## 🎯 Challenge Yourself

After running the code, try:

1. Add a new class (e.g., "Python Advanced")
2. Implement a function to find the highest scoring participant
3. Create a function to group participants by score range
4. Add validation for email format
5. Implement sorting functions using ES6 features

## 📚 Additional Resources

- **README.md** - Full project documentation
- **IMPLEMENTATION_SUMMARY.md** - Detailed implementation notes
- **.github/copilot-instructions.md** - AI coding guidelines
- **ES6-Study-Cases.md** - Original requirements

## ✅ Verification Checklist

Run through this checklist to ensure everything works:

- [ ] `npm start` runs without errors
- [ ] Output shows 9 task demonstrations
- [ ] `npm test` shows 79 passed tests
- [ ] No failed tests (0 failures)
- [ ] `npm test` ends with `Latihan: 7/7 cocok`
- [ ] Console output is well-formatted
- [ ] All ES6 features are demonstrated

## 🤝 Need Help?

This is a self-contained educational project. All code is well-commented and documented. If you encounter issues:

1. Check the console output for specific error messages
2. Verify Node.js version: `node --version` (should be 22+)
3. Review the code comments in each file
4. Consult the comprehensive README.md
5. Run tests to identify which component has issues

## Periksa hasil akhir

Output `npm start` berakhir pada daftar empat peserta dalam TASK 9. Aditya memakai nilai 88, Zaim 94, Milea 78, dan Pratama 95. Tiga peserta berstatus LULUS.

Untuk menghasilkan aplikasi tersebut sendiri, lanjutkan [praktik tahap 00–11](latihan/README.md). Pada akhir praktik, jalankan aplikasi dan pengujian dengan `--prefix latihan/proyek` agar yang diperiksa adalah kode peserta.
