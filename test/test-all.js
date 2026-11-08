// Unit tests for all ES6 Training Management System components
// Demonstrates testing patterns with ES6 features

import { rawPeserta } from '../data/peserta.js';
import { 
  getUniqueEmails, 
  createPesertaMap, 
  getPesertaByClass, 
  calculateAverageScore,
  getUniquePeserta 
} from '../utils/pesertaProcessor.js';
import { 
  displayPeserta, 
  createPesertaSummary 
} from '../utils/pesertaFormatter.js';
import { PesertaValidator } from '../utils/pesertaValidator.js';

// Test utilities
let testsPassed = 0;
let testsFailed = 0;

const assert = (condition, testName) => {
  if (condition) {
    console.log(`✅ PASS: ${testName}`);
    testsPassed++;
  } else {
    console.log(`❌ FAIL: ${testName}`);
    testsFailed++;
  }
};

const assertEqual = (actual, expected, testName) => {
  const passed = JSON.stringify(actual) === JSON.stringify(expected);
  assert(passed, testName);
  if (!passed) {
    console.log(`   Expected: ${JSON.stringify(expected)}`);
    console.log(`   Actual: ${JSON.stringify(actual)}`);
  }
};

console.log("=".repeat(60));
console.log("🧪 RUNNING UNIT TESTS FOR ES6 TRAINING SYSTEM");
console.log("=".repeat(60));
console.log();

// ============================================================================
// TEST SUITE 1: Data Validation
// ============================================================================
console.log("📦 TEST SUITE 1: Data Validation");
console.log("-".repeat(60));

assert(Array.isArray(rawPeserta), "rawPeserta is an array");
assertEqual(rawPeserta.length, 6, "rawPeserta has 6 entries");
assert(rawPeserta[0].hasOwnProperty('id'), "Participant has 'id' property");
assert(rawPeserta[0].hasOwnProperty('name'), "Participant has 'name' property");
assert(rawPeserta[0].hasOwnProperty('email'), "Participant has 'email' property");
assert(rawPeserta[0].hasOwnProperty('class'), "Participant has 'class' property");
assert(rawPeserta[0].hasOwnProperty('score'), "Participant has 'score' property");
console.log();

// ============================================================================
// TEST SUITE 2: getUniqueEmails Function
// ============================================================================
console.log("📦 TEST SUITE 2: getUniqueEmails Function");
console.log("-".repeat(60));

const uniqueEmails = getUniqueEmails(rawPeserta);
assertEqual(uniqueEmails.length, 4, "Returns 4 unique emails");
assert(uniqueEmails.includes("aditya@brainmatics.com"), "Contains aditya email");
assert(uniqueEmails.includes("zaim@brainmatics.com"), "Contains zaim email");
assert(uniqueEmails.includes("milea@brainmatics.com"), "Contains milea email");
assert(uniqueEmails.includes("pratama@brainmatics.com"), "Contains pratama email");

// Test edge case: empty array
assertEqual(getUniqueEmails([]).length, 0, "Returns empty array for empty input");

// Test edge case: undefined parameter
assertEqual(getUniqueEmails().length, 0, "Handles undefined parameter with default");
console.log();

// ============================================================================
// TEST SUITE 3: createPesertaMap Function
// ============================================================================
console.log("📦 TEST SUITE 3: createPesertaMap Function");
console.log("-".repeat(60));

const pesertaMap = createPesertaMap(rawPeserta);
assertEqual(pesertaMap.size, 4, "Map has 4 unique entries");

const adityaEntry = pesertaMap.get("aditya@brainmatics.com");
assertEqual(adityaEntry.id, 103, "Aditya entry uses latest ID (103)");
assertEqual(adityaEntry.score, 88, "Aditya entry uses latest score (88)");

const zaimEntry = pesertaMap.get("zaim@brainmatics.com");
assertEqual(zaimEntry.id, 106, "Zaim entry uses latest ID (106)");
assertEqual(zaimEntry.score, 94, "Zaim entry uses latest score (94)");

// Test edge case: empty array
const emptyMap = createPesertaMap([]);
assertEqual(emptyMap.size, 0, "Returns empty Map for empty input");
console.log();

// ============================================================================
// TEST SUITE 4: getPesertaByClass Function
// ============================================================================
console.log("📦 TEST SUITE 4: getPesertaByClass Function");
console.log("-".repeat(60));

const jsFundamentals = getPesertaByClass(rawPeserta, "JavaScript Fundamentals");
assertEqual(jsFundamentals.length, 3, "JavaScript Fundamentals has 3 participants");

const reactBasics = getPesertaByClass(rawPeserta, "React Basics");
assertEqual(reactBasics.length, 3, "React Basics has 3 participants");

// Test edge case: non-existent class
const nonExistent = getPesertaByClass(rawPeserta, "Python Advanced");
assertEqual(nonExistent.length, 0, "Returns empty array for non-existent class");

// Test edge case: empty array
assertEqual(getPesertaByClass([]).length, 0, "Handles empty array input");
console.log();

// ============================================================================
// TEST SUITE 5: calculateAverageScore Function
// ============================================================================
console.log("📦 TEST SUITE 5: calculateAverageScore Function");
console.log("-".repeat(60));

const testScores = [
  { score: 80 },
  { score: 90 },
  { score: 100 }
];
assertEqual(calculateAverageScore(testScores), 90, "Calculates correct average");

// Test with unique participants
const uniquePeserta = getUniquePeserta(rawPeserta);
const jsAvg = calculateAverageScore(getPesertaByClass(uniquePeserta, "JavaScript Fundamentals"));
assert(jsAvg > 0, "JavaScript Fundamentals has positive average");

// Test edge case: empty array
assertEqual(calculateAverageScore([]), 0, "Returns 0 for empty array");

// Test edge case: single entry
assertEqual(calculateAverageScore([{ score: 85 }]), 85, "Handles single entry correctly");
console.log();

// ============================================================================
// TEST SUITE 6: getUniquePeserta Function
// ============================================================================
console.log("📦 TEST SUITE 6: getUniquePeserta Function");
console.log("-".repeat(60));

const unique = getUniquePeserta(rawPeserta);
assertEqual(unique.length, 4, "Returns 4 unique participants");

const uniqueEmails2 = unique.map(p => p.email);
assertEqual(new Set(uniqueEmails2).size, 4, "All emails are unique");

// Verify latest entries are kept
const adityaUnique = unique.find(p => p.email === "aditya@brainmatics.com");
assertEqual(adityaUnique.score, 88, "Keeps latest Aditya score (88)");
console.log();

// ============================================================================
// TEST SUITE 7: displayPeserta Function
// ============================================================================
console.log("📦 TEST SUITE 7: displayPeserta Function");
console.log("-".repeat(60));

assertEqual(
  displayPeserta("Aditya", 85),
  "Nama: Aditya, Score: 85, Status: LULUS",
  "Formats passing score correctly"
);

assertEqual(
  displayPeserta("Milea", 78),
  "Nama: Milea, Score: 78, Status: BELUM LULUS",
  "Formats failing score correctly"
);

assertEqual(
  displayPeserta(),
  "Nama: Unknown, Score: 0, Status: BELUM LULUS",
  "Uses default parameters correctly"
);

// Test explicit status override
assertEqual(
  displayPeserta("Test", 90, "CUSTOM STATUS"),
  "Nama: Test, Score: 90, Status: CUSTOM STATUS",
  "Accepts custom status parameter"
);
console.log();

// ============================================================================
// TEST SUITE 8: createPesertaSummary Function
// ============================================================================
console.log("📦 TEST SUITE 8: createPesertaSummary Function");
console.log("-".repeat(60));

const samplePeserta = {
  name: "Aditya",
  class: "JavaScript Fundamentals",
  score: 85
};

assertEqual(
  createPesertaSummary(samplePeserta),
  "📚 Aditya - Class: JavaScript Fundamentals - Score: 85",
  "Formats summary correctly"
);

// Test with empty object (default values)
const emptySummary = createPesertaSummary({});
assert(emptySummary.includes("Unknown"), "Handles empty object with defaults");
console.log();

// ============================================================================
// TEST SUITE 9: PesertaValidator Class
// ============================================================================
console.log("📦 TEST SUITE 9: PesertaValidator Class");
console.log("-".repeat(60));

const validator = new PesertaValidator(80, 100);

// Test constructor
assertEqual(validator.minScore, 80, "Constructor sets minScore correctly");
assertEqual(validator.maxScore, 100, "Constructor sets maxScore correctly");

// Test isValidScore method
assert(validator.isValidScore(85), "Recognizes valid score (85)");
assert(validator.isValidScore(80), "Recognizes boundary valid score (80)");
assert(validator.isValidScore(100), "Recognizes boundary valid score (100)");
assert(!validator.isValidScore(79), "Recognizes invalid score (79)");
assert(!validator.isValidScore(101), "Recognizes invalid score (101)");

// Test formatResult method
assertEqual(
  validator.formatResult("Aditya", 85),
  "Aditya mendapat score 85 - SESUAI STANDAR",
  "Formats valid result correctly"
);

assertEqual(
  validator.formatResult("Milea", 75),
  "Milea mendapat score 75 - TIDAK SESUAI",
  "Formats invalid result correctly"
);

// Test validateBatch method
const batchResult = validator.validateBatch(uniquePeserta);
assert(batchResult.total === uniquePeserta.length, "Batch validation counts total correctly");
assert(batchResult.valid >= 0, "Batch validation has non-negative valid count");
assert(batchResult.invalid >= 0, "Batch validation has non-negative invalid count");
assertEqual(
  batchResult.valid + batchResult.invalid,
  batchResult.total,
  "Batch validation valid + invalid = total"
);

// Test default constructor parameters
const defaultValidator = new PesertaValidator();
assertEqual(defaultValidator.minScore, 60, "Default minScore is 60");
assertEqual(defaultValidator.maxScore, 100, "Default maxScore is 100");

// Static rules: the validator class is the single source of the pass/fail rule
assertEqual(PesertaValidator.PASSING_SCORE, 80, "Passing score is 80");
assertEqual(PesertaValidator.STATUS, ["LULUS", "TIDAK LULUS"], "Status list");
assertEqual(PesertaValidator.getStatus(80), "LULUS", "80 is LULUS (boundary)");
assertEqual(PesertaValidator.getStatus(79), "TIDAK LULUS", "79 is TIDAK LULUS (boundary)");
assertEqual(PesertaValidator.getStatus(), "TIDAK LULUS", "Default score 0 is TIDAK LULUS");
assert(PesertaValidator.isValidStatus("LULUS"), "includes() accepts LULUS");
assert(PesertaValidator.isValidStatus("TIDAK LULUS"), "includes() accepts TIDAK LULUS");
assert(!PesertaValidator.isValidStatus("lulus"), "includes() is case-sensitive");
assert(!PesertaValidator.isValidStatus("BELUM LULUS"), "Old label is no longer valid");
assert(!PesertaValidator.isValidStatus(undefined), "undefined is not a status");
console.log();

// ============================================================================
// TEST SUMMARY
// ============================================================================
console.log("=".repeat(60));
console.log("📊 TEST SUMMARY");
console.log("=".repeat(60));
console.log(`✅ Tests Passed: ${testsPassed}`);
console.log(`❌ Tests Failed: ${testsFailed}`);
console.log(`📈 Pass Rate: ${testsPassed + testsFailed > 0 ? Math.round((testsPassed / (testsPassed + testsFailed)) * 100) : 0}%`);
console.log("=".repeat(60));

if (testsFailed === 0) {
  console.log("🎉 ALL TESTS PASSED! System is working correctly.");
} else {
  console.log("⚠️  SOME TESTS FAILED. Please review the failures above.");
  process.exit(1);
}
