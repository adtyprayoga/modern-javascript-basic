// Display formatting utilities for participants
// Demonstrates ES6 features: template literals, default parameters, arrow functions, destructuring

/**
 * Display participant information with formatted status
 * Uses default parameters and template literals
 * @param {string} name - Participant name
 * @param {number} score - Participant score
 * @param {string} status - Pass/fail status (auto-calculated if not provided)
 * @returns {string} Formatted participant display string
 */
export const displayPeserta = (name = "Unknown", score = 0, status = score >= 80 ? "LULUS" : "BELUM LULUS") => {
  // Use template literal for clean string formatting
  return `Nama: ${name}, Score: ${score}, Status: ${status}`;
};

/**
 * Create a summary string for a participant with emoji
 * @param {Object} peserta - Participant object
 * @returns {string} Formatted summary with emoji icon
 */
export const createPesertaSummary = (peserta = {}) => {
  // Destructure with renaming to avoid 'class' keyword conflict
  const { name = "Unknown", score = 0, class: className = "N/A" } = peserta;
  
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
      const status = score >= 80 ? "LULUS" : "BELUM LULUS";
      return `${index + 1}. ${displayPeserta(name, score, status)}`;
    })
    .join("\n");
};

/**
 * Create a detailed report for a participant
 * @param {Object} peserta - Participant object
 * @returns {string} Multi-line detailed report
 */
export const createDetailedReport = (peserta = {}) => {
  const { 
    id = 0, 
    name = "Unknown", 
    email = "N/A", 
    class: className = "N/A", 
    score = 0 
  } = peserta;
  
  const status = score >= 80 ? "✅ LULUS" : "❌ BELUM LULUS";
  
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
