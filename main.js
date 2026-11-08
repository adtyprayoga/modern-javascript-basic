// Main application entry point
// Demonstrates complete ES6 module system with imports and orchestration

// Import data
import { rawPeserta } from './data/peserta.js';

// Import processing functions
import { 
  getUniqueEmails, 
  createPesertaMap, 
  getPesertaByClass, 
  calculateAverageScore,
  getUniquePeserta 
} from './utils/pesertaProcessor.js';

// Import formatting functions
import { 
  displayPeserta, 
  createPesertaSummary, 
  formatPesertaList,
  createDetailedReport 
} from './utils/pesertaFormatter.js';

// Import validator class
import { 
  PesertaValidator, 
  createPassingValidator,
  createLenientValidator 
} from './utils/pesertaValidator.js';

console.log("=".repeat(60));
console.log("🎓 SISTEM MANAJEMEN PESERTA TRAINING BRAINMATICS");
console.log("=".repeat(60));
console.log();

// ============================================================================
// TASK 1: Display Raw Data Overview
// ============================================================================
console.log("📊 TASK 1: Raw Data Overview");
console.log("-".repeat(60));
console.log(`Total raw entries: ${rawPeserta.length}`);
console.log(`Unique emails: ${getUniqueEmails(rawPeserta).length}`);
console.log();

// ============================================================================
// TASK 2: Test displayPeserta with Default Parameters
// ============================================================================
console.log("📊 TASK 2: Testing displayPeserta Function");
console.log("-".repeat(60));
console.log(displayPeserta("Aditya", 85));      // With LULUS status
console.log(displayPeserta("Milea", 78));       // With BELUM LULUS status
console.log(displayPeserta());                  // With all defaults
console.log();

// ============================================================================
// TASK 3: Test Object Destructuring with Renaming
// ============================================================================
console.log("📊 TASK 3: Testing Destructuring with Renaming");
console.log("-".repeat(60));
const pesertaSample = { 
  id: 101, 
  name: "Aditya", 
  email: "aditya@brainmatics.com", 
  score: 85 
};
const { name: pesertaNama, email: pesertaEmail, score: nilaiAkhir } = pesertaSample;
console.log(`Nama: ${pesertaNama}`);
console.log(`Email: ${pesertaEmail}`);
console.log(`Nilai Akhir: ${nilaiAkhir}`);
console.log();

// ============================================================================
// TASK 4: Test Set for Unique Emails
// ============================================================================
console.log("📊 TASK 4: Unique Emails Using Set");
console.log("-".repeat(60));
const uniqueEmails = getUniqueEmails(rawPeserta);
console.log(`Found ${uniqueEmails.length} unique emails:`);
uniqueEmails.forEach((email, index) => {
  console.log(`  ${index + 1}. ${email}`);
});
console.log();

// ============================================================================
// TASK 5: Test Map for Participant Indexing
// ============================================================================
console.log("📊 TASK 5: Participant Map (Email-based Indexing)");
console.log("-".repeat(60));
const pesertaMap = createPesertaMap(rawPeserta);
console.log(`Map size: ${pesertaMap.size}`);
console.log("\nLatest entry for aditya@brainmatics.com:");
const adityaData = pesertaMap.get("aditya@brainmatics.com");
console.log(createDetailedReport(adityaData));
console.log();

// ============================================================================
// TASK 6: Test PesertaValidator Class
// ============================================================================
console.log("📊 TASK 6: Testing PesertaValidator Class");
console.log("-".repeat(60));

// Test with standard passing threshold (80-100)
const passingValidator = createPassingValidator();
console.log("Standard Validator (80-100):");
console.log(`  ${passingValidator.formatResult("Aditya", 85)}`);
console.log(`  ${passingValidator.formatResult("Milea", 75)}`);

// Test with lenient threshold (60-100)
const lenientValidator = createLenientValidator();
console.log("\nLenient Validator (60-100):");
console.log(`  ${lenientValidator.formatResult("Aditya", 85)}`);
console.log(`  ${lenientValidator.formatResult("Milea", 75)}`);
console.log();

// ============================================================================
// TASK 7: Filter by Class and Calculate Statistics
// ============================================================================
console.log("📊 TASK 7: Filter by Class & Calculate Statistics");
console.log("-".repeat(60));

// Get unique participants (no duplicates)
const uniquePeserta = getUniquePeserta(rawPeserta);
console.log(`Total unique participants: ${uniquePeserta.length}\n`);

// Filter JavaScript Fundamentals class
const jsFundamentals = getPesertaByClass(uniquePeserta, "JavaScript Fundamentals");
console.log(`📚 JavaScript Fundamentals Class (${jsFundamentals.length} students):`);
jsFundamentals.forEach(peserta => {
  console.log(`  ${createPesertaSummary(peserta)}`);
});
const jsAverage = calculateAverageScore(jsFundamentals);
console.log(`  ⭐ Average Score: ${jsAverage}`);
console.log();

// Filter React Basics class
const reactBasics = getPesertaByClass(uniquePeserta, "React Basics");
console.log(`📚 React Basics Class (${reactBasics.length} students):`);
reactBasics.forEach(peserta => {
  console.log(`  ${createPesertaSummary(peserta)}`);
});
const reactAverage = calculateAverageScore(reactBasics);
console.log(`  ⭐ Average Score: ${reactAverage}`);
console.log();

// ============================================================================
// TASK 8: Batch Validation Report
// ============================================================================
console.log("📊 TASK 8: Batch Validation Report");
console.log("-".repeat(60));

const validator = new PesertaValidator(80, 100);
const validationSummary = validator.validateBatch(uniquePeserta);

console.log("Validation Summary (Threshold: 80-100):");
console.log(`  Total Participants: ${validationSummary.total}`);
console.log(`  Valid (LULUS): ${validationSummary.valid}`);
console.log(`  Invalid (BELUM LULUS): ${validationSummary.invalid}`);
console.log(`  Pass Rate: ${validationSummary.validPercentage}%`);
console.log();

// Show individual validation results
console.log("Individual Validation Results:");
uniquePeserta.forEach(({ name, score }) => {
  console.log(`  ${validator.formatResult(name, score)}`);
});
console.log();

// ============================================================================
// TASK 9: Complete Participant List
// ============================================================================
console.log("📊 TASK 9: Complete Unique Participant List");
console.log("-".repeat(60));
console.log(formatPesertaList(uniquePeserta));
console.log();
