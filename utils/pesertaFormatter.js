// Display formatting utilities for participants
// Demonstrates ES6 features: template literals, default parameters, arrow functions, destructuring
// plus ES2020 nullish coalescing (??) and importing rules from another module

// The pass/fail rule lives in the validator module; import it instead of repeating the threshold here
import { PesertaValidator } from './pesertaValidator.js';

/**
 * Display participant information with formatted status
 * Uses default parameters and template literals
 * @param {string} name - Participant name
 * @param {number} score - Participant score
 * @param {string} status - Status override (auto-calculated if not provided).
 *   An unknown status (e.g. "lulus" or "CUSTOM STATUS") is replaced by the computed one.
 * @returns {string} Formatted participant display string
 */
export const displayPeserta = (name = "Unknown", score = 0, status = PesertaValidator.getStatus(score)) => {
  // Validate with includes() (ES2016): never print a status outside the allowed list
  const finalStatus = PesertaValidator.isValidStatus(status) ? status : PesertaValidator.getStatus(score);

  // Use template literal for clean string formatting
  return `Nama: ${name}, Score: ${score}, Status: ${finalStatus}`;
};

/**
 * Create a summary string for a participant with emoji
 * @param {Object|null} peserta - Participant object (null and undefined are allowed)
 * @returns {string} Formatted summary with emoji icon
 */
export const createPesertaSummary = (peserta) => {
  // ES2020 ??: a default parameter (peserta = {}) only catches undefined.
  // ?? also catches null, so destructuring never throws on a missing participant.
  // Destructure with renaming to avoid 'class' keyword conflict
  const { name = "Unknown", score = 0, class: className = "N/A" } = peserta ?? {};
  
  // Use template literal with emoji for visual appeal
  return `📚 ${name} - Class: ${className} - Score: ${score}`;
};

/**
 * Format participant list as numbered display
 * @param {Array} pesertaList - List of participants
 * @returns {string} Multi-line formatted list
 */
export const formatPesertaList = (pesertaList = []) => {
  if (pesertaList.length === 0) return "Tidak ada peserta.";
  
  // Use map with template literals for each line
  return pesertaList
    .map(({ name, score }, index) => {
      return `${index + 1}. ${displayPeserta(name, score, PesertaValidator.getStatus(score))}`;
    })
    .join("\n");
};

/**
 * Create a detailed report for a participant
 * @param {Object|null} peserta - Participant object (null and undefined are allowed)
 * @returns {string} Multi-line detailed report
 */
export const createDetailedReport = (peserta) => {
  const { 
    id = 0, 
    name = "Unknown", 
    email = "N/A", 
    class: className = "N/A", 
    score = 0 
  } = peserta ?? {}; // ES2020 ??: also handles null (e.g. a failed lookup)
  
  const status = PesertaValidator.getStatus(score) === "LULUS" ? "✅ LULUS" : "❌ TIDAK LULUS";
  
  // Multi-line template literal for structured report
  return `
╔═══════════════════════════════════════╗
  ID       : ${id}
  Nama     : ${name}
  Email    : ${email}
  Kelas    : ${className}
  Score    : ${score}
  Status   : ${status}
╚═══════════════════════════════════════╝`;
};
