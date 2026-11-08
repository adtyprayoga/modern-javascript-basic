# AI Coding Agent Instructions - ES6 Training Management System

## Project Overview
This is an **ES6 study case project** for building a Training Management System (Sistem Manajemen Peserta Training) for Brainmatics training company. The focus is on demonstrating modern JavaScript ES6+ features through practical implementation.

## Architecture & File Structure
Follow this modular structure when implementing solutions:
```
/data/
  peserta.json        # Raw participant data, loaded with loadPeserta()
/utils/
  pesertaLoader.js    # async/await loader (try/catch, ?., ??)
  pesertaProcessor.js # Core business logic (filtering, calculations)
  pesertaFormatter.js # Display formatting utilities
main.js               # Main application entry point
```

## Core ES6 Patterns & Requirements

The completed root application is a reference. Learners build one cumulative application in `latihan/proyek/` by following [stages 00–11](../latihan/README.md). Use the current [study case](../README.md) and [instructor guide](../instructor.md). Commands are run from the repository root.

### 1. Module System
- **Always use ES6 modules**: `export`/`import` syntax
- **Named exports preferred**: `export const functionName = () => {}`
- **Import specific functions**: `import { getPesertaByClass } from './utils/pesertaProcessor.js'`

### 2. Function Definitions
- **Arrow functions for utilities**: `const calculateAverage = (list = []) => {}`
- **Default parameters mandatory**: Every function should have sensible defaults
- **Template literals for output**: Use backticks for string formatting

### 3. Data Processing Patterns
- **Set for uniqueness**: `new Set(array.map(item => item.property))` to remove duplicates
- **Map for key-value lookups**: Email-based indexing for participant management
- **Destructuring with renaming**: `const { name: pesertaNama, email: pesertaEmail } = participant`
- **Spread operator**: For array conversion and data manipulation

### 4. Class Implementation
```javascript
class PesertaValidator {
  constructor(minScore = 60, maxScore = 100) {
    this.minScore = minScore;
    this.maxScore = maxScore;
  }
  
  isValidScore = (score) => score >= this.minScore && score <= this.maxScore;
  formatResult = (name, score) => `${name} mendapat score ${score} - ${this.isValidScore(score) ? 'SESUAI STANDAR' : 'TIDAK SESUAI'}`;
}
```

### 5. Data Validation Rules
- **Email uniqueness**: Use Set for unique email values and Map keyed by email to keep the latest participant entry
- **Score validation**: 60-100 range; pass/fail comes only from `PesertaValidator.getStatus(score)`: >= 80 = "LULUS", < 80 = "TIDAK LULUS"
- **Status validation**: check a status with `PesertaValidator.isValidStatus(status)` (ES2016 `includes()` against `PesertaValidator.STATUS`)
- **Required destructuring**: Extract `{ id, name, email, class: className, score }` consistently

### 6. ES2016+ Patterns
- **`??`, not `||`, for fallbacks** where `0` or `""` is a valid value (`score ?? 0`)
- **`?.` for values that may be missing** (`json?.peserta`, `pesertaMap.get(email)?.score`)
- **Object rest/spread** to copy or split objects (`{ ...peserta }`, `({ score, ...rest }) =>`)
- **`includes()`** for membership checks instead of `indexOf() !== -1`
- **async/await + try/catch** for file I/O; rethrow with an Indonesian message that names the file

## Key Business Logic

### Sample Data Structure
```javascript
// data/peserta.json, loaded with: const rawPeserta = await loadPeserta();
{ "peserta": [
  { "id": 101, "name": "Aditya Prayoga", "email": "aditya@brainmatics.com", "class": "JavaScript Fundamentals", "score": 85 }
  // ... duplicates by email should be handled (last entry = last test)
] }
```

### Core Functions to Implement
1. **getUniqueEmails()**: Use Set + spread operator
2. **createPesertaMap()**: Map with email keys, latest data as values
3. **getPesertaByClass()**: Filter using for...of with destructuring
4. **calculateAverageScore()**: Use reduce with spread operator defaults
5. **displayPeserta()**: Template literals with default parameters

### Output Formats
- **Participant display**: `"Nama: [name], Score: [score], Status: [status]"`
- **Summary format**: `"📚 [name] - Class: [className] - Score: [score]"`
- **Validation result**: `"[name] mendapat score [score] - [STATUS]"`

## Implementation Guidelines

### Error Handling
- Validate arrays with default empty array parameters: `(pesertaList = []) =>`
- Check for undefined/null values before destructuring
- Use optional chaining when accessing nested properties

### Performance Patterns
- Use Map for O(1) email lookups instead of array.find()
- Prefer Set for uniqueness over manual duplicate checking
- Cache calculated results when processing large datasets

### Testing Approach
- Test each function individually with console.log()
- Verify duplicate removal with email uniqueness
- Confirm score calculations match expected averages
- Validate output formatting matches exact requirements

## Development Workflow
1. Start with `data/peserta.json` - the raw data, loaded only through `loadPeserta()`
2. Implement utility functions in separate modules
3. Build validator class with constructor and arrow methods
4. Create main.js to orchestrate the complete workflow
5. Test incrementally - one function at a time

## Common Pitfalls to Avoid
- Don't use `var` or `function` declarations - stick to ES6+ syntax
- Avoid manual loops where ES6 methods (map, filter, reduce) are more appropriate
- Don't forget to handle edge cases (empty arrays, undefined values)
- Always use template literals instead of string concatenation
- Remember to export/import correctly - this is a modular system