# ES6 Training Management System

> **Sistem Manajemen Peserta Training** - A comprehensive ES6 study case project demonstrating modern JavaScript features through a practical training participant management system for Brainmatics.

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

## 🏗️ Architecture

```
es6-training-management/
├── data/
│   └── peserta.js              # Raw participant data
├── utils/
│   ├── pesertaProcessor.js     # Core business logic
│   ├── pesertaFormatter.js     # Display formatting
│   └── pesertaValidator.js     # Validation class
├── test/
│   └── test-all.js             # Comprehensive unit tests
├── main.js                     # Application entry point
├── package.json                # Project configuration
└── README.md                   # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js v14+ (ES6 modules support)

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
  status = score >= 80 ? "LULUS" : "BELUM LULUS"
) => {
  return `Nama: ${name}, Score: ${score}, Status: ${status}`;
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
  for (const { id, name, email, class: className, score } of pesertaList) {
    pesertaMap.set(email, { id, name, email, class: className, score });
  }
  return pesertaMap;
};
```

### 6. Class with Arrow Methods
```javascript
export class PesertaValidator {
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
✅ Tests Passed: 55
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
  - `< 80` = "BELUM LULUS" (Not Pass)

## 🔑 Key Functions

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
