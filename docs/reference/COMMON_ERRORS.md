# Common Errors & Solutions - ES6 Training System

> Run commands from the repository root, the directory containing `package.json` and `main.js`. Code paths in this reference are relative to that root. Follow the [practice index](../../latihan/README.md) for guided coding.

> **Everyone makes these mistakes!** This guide helps you quickly identify and fix common ES6 errors. Keep this open while coding.

---

## 🔴 Module & Import Errors

### Error: "Cannot use import statement outside a module"

**You'll See:**
```
SyntaxError: Cannot use import statement outside a module
```

**Why It Happens:**
Node.js doesn't know this is an ES6 module project.

**✅ Solution:**
Check `package.json` has this line:
```json
{
  "type": "module"
}
```

---

### Error: "Cannot find module"

**You'll See:**
```
Error [ERR_MODULE_NOT_FOUND]: Cannot find module
'/path/to/utils/processor' imported from /path/to/main.js
```

**Why It Happens:**
Missing `.js` extension in import statement.

**❌ Wrong:**
```javascript
import { func } from './utils/processor';
```

**✅ Right:**
```javascript
import { func } from './utils/processor.js';
```

**🎓 Remember:** ES6 modules REQUIRE the `.js` extension!

---

### Error: "Relative references must start with"

**You'll See:**
```
Error: Relative references must start with either "/", "./", or "../"
```

**Why It Happens:**
Missing `./` or `../` in import path.

**❌ Wrong:**
```javascript
import { func } from 'utils/processor.js';
```

**✅ Right:**
```javascript
import { func } from './utils/processor.js';  // Same directory
import { func } from '../utils/processor.js'; // Parent directory
```

---

## 🔴 Destructuring Errors

### Error: "Unexpected token 'class'"

**You'll See:**
```
SyntaxError: Unexpected token 'class'
```

**Why It Happens:**
`class` is a reserved JavaScript keyword - can't use it as a variable name.

**❌ Wrong:**
```javascript
const { class } = participant;
```

**✅ Right:**
```javascript
const { class: className } = participant;  // Rename during destructuring
```

**📝 Other Reserved Words to Watch:**
- `return`, `function`, `var`, `let`, `const`
- `if`, `else`, `for`, `while`
- `try`, `catch`, `finally`
- `import`, `export`, `default`

---

### Error: "Cannot read property of undefined"

**You'll See:**
```
TypeError: Cannot read property 'name' of undefined
```

**Why It Happens:**
Trying to destructure from undefined/null object.

**❌ Wrong:**
```javascript
const { name, email } = participant;  // What if participant is undefined?
```

**✅ Right - Use Default Parameter:**
```javascript
const myFunction = (participant = {}) => {  // Default to empty object
  const { name = "Unknown", email = "N/A" } = participant;
  // Now safe even if participant is undefined
};
```

---

### Error: "Cannot destructure property 'score' of undefined"

**Why It Happens:**
Array element doesn't exist or is undefined.

**❌ Wrong:**
```javascript
for (const { score } of pesertaList) {
  console.log(score);
}
// Fails if pesertaList has undefined elements
```

**✅ Right - Add Safety Check:**
```javascript
const processScores = (pesertaList = []) => {  // Default to empty array
  for (const peserta of pesertaList) {
    if (peserta) {  // Check if element exists
      const { score } = peserta;
      console.log(score);
    }
  }
};
```

---

## 🔴 Set & Map Errors

### Error: "unique[0] is undefined"

**You'll See:**
```
undefined
```

**Why It Happens:**
Set is NOT an array - you can't use index access.

**❌ Wrong:**
```javascript
const unique = new Set(emails);
console.log(unique[0]);  // undefined!
```

**✅ Right - Convert to Array:**
```javascript
const unique = [...new Set(emails)];  // Spread into array
console.log(unique[0]);  // Now works!
```

**🎓 Remember:**
- `Set` → Use `.has()`, `.size`, `.values()`
- Array → Use `[0]`, `.length`, `[i]`

---

### Error: "Cannot read property 'get' of undefined"

**Why It Happens:**
Map not initialized or wrong variable used.

**❌ Wrong:**
```javascript
const pesertaMap = createPesertaMap(rawPeserta);
console.log(pesertaMap.get("test@example.com"));  // Might return undefined
```

**✅ Right - Check Before Using:**
```javascript
const pesertaMap = createPesertaMap(rawPeserta);

if (pesertaMap.has("test@example.com")) {
  console.log(pesertaMap.get("test@example.com"));
} else {
  console.log("Email not found");
}
```

---

### Error: "Map.set is not a function"

**Why It Happens:**
Variable is not actually a Map.

**❌ Wrong:**
```javascript
const pesertaMap = {};  // This is an object, not a Map!
pesertaMap.set("key", "value");  // Error!
```

**✅ Right:**
```javascript
const pesertaMap = new Map();  // Create a Map properly
pesertaMap.set("key", "value");  // Works!
```

---

## 🔴 Arrow Function Errors

### Error: "Unexpected token '=>'"

**Why It Happens:**
Mixing arrow function with regular function syntax.

**❌ Wrong:**
```javascript
const myFunc = function() => {  // Can't mix!
  return "Hello";
};
```

**✅ Right - Choose One Style:**
```javascript
// Arrow function
const myFunc = () => {
  return "Hello";
};

// OR traditional function
function myFunc() {
  return "Hello";
}
```

---

### Error: "Missing return value"

**Why It Happens:**
Forgot to return in arrow function with curly braces.

**❌ Wrong:**
```javascript
const double = (x) => {
  x * 2;  // No return!
};

console.log(double(5));  // undefined
```

**✅ Right - Add Return:**
```javascript
const double = (x) => {
  return x * 2;
};

// OR use implicit return (no braces)
const double = (x) => x * 2;
```

**🎓 Rule:**
- With `{}` → Need `return`
- Without `{}` → Automatic return

---

### Error: "Unexpected token, expected ,"

**Why It Happens:**
Incorrect arrow function syntax with object return.

**❌ Wrong:**
```javascript
const makePerson = (name) => { name: name };  // Thinks { is function body!
```

**✅ Right - Wrap Object in Parentheses:**
```javascript
const makePerson = (name) => ({ name: name });  // Parentheses tell it's an object

// Even cleaner with ES6 shorthand:
const makePerson = (name) => ({ name });
```

---

## 🔴 Template Literal Errors

### Error: "String not displaying variables"

**You'll See:**
```
Nama: ${name}, Score: ${score}  // Variables not replaced!
```

**Why It Happens:**
Used regular quotes instead of backticks.

**❌ Wrong:**
```javascript
const message = "Nama: ${name}, Score: ${score}";  // Regular quotes
```

**✅ Right:**
```javascript
const message = `Nama: ${name}, Score: ${score}`;  // Backticks!
```

**🎓 Remember:**
- Single/double quotes `' "` → Plain strings
- Backticks `` ` `` → Template literals with variables

---

### Error: "Unexpected token `"

**Why It Happens:**
Nested backticks confusing the parser.

**❌ Wrong:**
```javascript
const html = `<div class="`${className}`">Content</div>`;
```

**✅ Right - Use Regular Quotes Inside:**
```javascript
const html = `<div class="${className}">Content</div>`;
```

---

## 🔴 Array Method Errors

### Error: "reduce() returns undefined"

**Why It Happens:**
Forgot to return in reduce callback.

**❌ Wrong:**
```javascript
const total = numbers.reduce((sum, n) => {
  sum + n;  // No return!
}, 0);
```

**✅ Right:**
```javascript
const total = numbers.reduce((sum, n) => {
  return sum + n;
}, 0);

// OR implicit return:
const total = numbers.reduce((sum, n) => sum + n, 0);
```

---

### Error: "map() returns array of undefined"

**Why It Happens:**
Forgot to return in map callback.

**❌ Wrong:**
```javascript
const doubled = numbers.map((n) => {
  n * 2;  // No return!
});
// [undefined, undefined, undefined]
```

**✅ Right:**
```javascript
const doubled = numbers.map((n) => {
  return n * 2;
});

// OR implicit return:
const doubled = numbers.map(n => n * 2);
```

---

### Error: "TypeError: list.map is not a function"

**Why It Happens:**
Variable is not an array.

**❌ Wrong:**
```javascript
const myFunc = (list) => {
  return list.map(item => item.score);  // What if list is undefined?
};
```

**✅ Right - Use Default Parameter:**
```javascript
const myFunc = (list = []) => {  // Default to empty array
  return list.map(item => item.score);
};
```

---

## 🔴 Class Errors

### Error: "Class constructor must be invoked with 'new'"

**Why It Happens:**
Forgot `new` keyword when creating instance.

**❌ Wrong:**
```javascript
const validator = PesertaValidator(80, 100);  // Missing 'new'
```

**✅ Right:**
```javascript
const validator = new PesertaValidator(80, 100);
```

---

### Error: "'this' is undefined"

**Why It Happens:**
Regular method loses `this` context when passed as callback.

**❌ Problematic:**
```javascript
class Validator {
  constructor(min) {
    this.min = min;
  }
  
  isValid(score) {  // Regular method
    return score >= this.min;  // 'this' might be lost!
  }
}

const validator = new Validator(80);
[85, 90].filter(validator.isValid);  // Error: 'this' is undefined
```

**✅ Right - Use Arrow Method:**
```javascript
class Validator {
  constructor(min) {
    this.min = min;
  }
  
  isValid = (score) => {  // Arrow method keeps 'this'
    return score >= this.min;
  };
}

const validator = new Validator(80);
[85, 90].filter(validator.isValid);  // Works!
```

---

## 🔴 for...of Errors

### Error: "for...of is not iterable"

**You'll See:**
```
TypeError: obj is not iterable
```

**Why It Happens:**
Trying to use for...of on plain object.

**❌ Wrong:**
```javascript
const obj = { a: 1, b: 2 };
for (const item of obj) {  // Objects are not iterable!
  console.log(item);
}
```

**✅ Right - Use Object Methods:**
```javascript
const obj = { a: 1, b: 2 };

// Get keys:
for (const key of Object.keys(obj)) {
  console.log(key);  // 'a', 'b'
}

// Get values:
for (const value of Object.values(obj)) {
  console.log(value);  // 1, 2
}

// Get entries (key-value pairs):
for (const [key, value] of Object.entries(obj)) {
  console.log(key, value);  // 'a' 1, 'b' 2
}
```

**🎓 for...of works with:**
- ✅ Arrays
- ✅ Sets
- ✅ Maps
- ✅ Strings
- ❌ Plain objects (use Object.keys/values/entries)

---

## 🔴 Default Parameter Errors

### Error: "Default parameter not working"

**Why It Happens:**
Passing `null` or other falsy values explicitly.

**❌ Doesn't Use Default:**
```javascript
const greet = (name = "Guest") => `Hello ${name}`;

console.log(greet(null));      // "Hello null" - Not default!
console.log(greet(""));        // "Hello " - Not default!
console.log(greet(undefined)); // "Hello Guest" - Uses default
```

**✅ Solution - Check for Falsy:**
```javascript
const greet = (name) => {
  const finalName = name || "Guest";  // Use default if falsy
  return `Hello ${finalName}`;
};
```

---

## 🧩 Quick Debugging Checklist

When your code doesn't work:

### 1. Check Syntax (90% of errors!)
- [ ] All `{` have matching `}`
- [ ] All `(` have matching `)`
- [ ] All strings have closing quotes
- [ ] Backticks for template literals
- [ ] `.js` extension in imports
- [ ] `./` or `../` in relative imports

### 2. Check Types
- [ ] Is it an Array? (can use `[i]`, `.map()`, `.filter()`)
- [ ] Is it a Set? (need `[...set]` to convert)
- [ ] Is it a Map? (use `.get()`, not `[key]`)
- [ ] Is it undefined? (use default parameters)

### 3. Check Logic
- [ ] Are you returning values?
- [ ] Are callbacks returning values?
- [ ] Are you using the right variable names?
- [ ] Are you calling functions correctly?

### 4. Use console.log() Liberally
```javascript
console.log("Before:", value);
const result = processData(value);
console.log("After:", result);
console.log("Type:", typeof result);
console.log("Is Array?", Array.isArray(result));
```

---

## 🔧 Debugging Techniques

### Technique 1: Binary Search
Comment out half your code until it works, then narrow down:

```javascript
// const result1 = func1();  // Commented
// const result2 = func2();  // Commented
const result3 = func3();     // Test this first
// const final = combine(result1, result2, result3);  // Commented
```

### Technique 2: Simplify
Replace complex code with simple test:

```javascript
// Complex (failing):
const emails = [...new Set(pesertaList.map(p => p.email))];

// Simplified (test each part):
console.log("pesertaList:", pesertaList);
const allEmails = pesertaList.map(p => p.email);
console.log("allEmails:", allEmails);
const emailSet = new Set(allEmails);
console.log("emailSet:", emailSet);
const emails = [...emailSet];
console.log("emails:", emails);
```

### Technique 3: Use typeof
```javascript
console.log(typeof emails);        // "object"
console.log(Array.isArray(emails)); // true/false
console.log(emails instanceof Set); // true/false
console.log(emails instanceof Map); // true/false
```

---

## 📞 When to Ask for Help

Before asking:
1. ✅ Read the error message completely
2. ✅ Check this guide for similar errors
3. ✅ Try console.log() debugging
4. ✅ Search the error message online
5. ✅ Review the relevant section in the [beginner guide](BEGINNER_GUIDE.md)

When asking for help, provide:
1. 📝 The exact error message
2. 💻 Your code (the specific function causing the error)
3. 🎯 What you expected to happen
4. ❌ What actually happened
5. 🔍 What you've already tried

---

## 🎯 Prevention Tips

### Always:
- ✅ Use default parameters for safety
- ✅ Check if variables exist before using
- ✅ Convert Set/Map to Array when needed
- ✅ Return values from functions
- ✅ Use backticks for template literals
- ✅ Include `.js` in imports

### Never:
- ❌ Use reserved words as variable names
- ❌ Forget `new` with classes
- ❌ Mix arrow and regular function syntax
- ❌ Try to iterate plain objects with for...of
- ❌ Use array methods on Set/Map without converting

---

## 🎓 Remember

**"Every expert programmer was once a beginner who refused to give up!"**

Errors are learning opportunities. Each one you solve makes you a better programmer. Keep this guide handy, and happy debugging! 🐛🔧

---

*Last Updated: November 10, 2025*
## Terminal menu and working JSON

If npm start waits at `Pilihan:`, enter a choice from 0 to 8. Enter 0 to exit. Automated runs must provide input and a timeout.

If adding a participant reports `Email sudah terdaftar.`, inspect the current list. Email is trimmed and lowercased before comparison. Use menu 5 to record a retest for an existing participant. Menu 4 changes biodata, not scores.

Empty score input is invalid. A literal 0 is valid. Scores must be finite numbers between 0 and 100. When changing biodata, an empty field keeps the existing value.

If startup reports invalid working JSON, inspect data/peserta.local.json or the file selected by PESERTA_DATA_FILE. Keep the damaged file for diagnosis; the application does not overwrite it with seed data. Fix the data or choose a separate working file. The seed data/peserta.json remains the test reference.

If saving fails, the application reports an error and retains its previous in-memory history. Check write access and the destination directory before retrying. If input ends during a form, the operation is cancelled and no partial data is saved.

For a saved score that seems wrong, check test order. Scores 90 then 79 mean TIDAK LULUS because 79 is last. A subsequent 80 means LULUS. Detail displays all three tests after restart.
