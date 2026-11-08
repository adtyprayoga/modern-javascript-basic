// Core business logic for participant processing
// Demonstrates ES6 features: Set, Map, for...of, destructuring, spread operator, arrow functions
// plus ES2018 object spread

/**
 * Get unique emails from participant list using Set
 * @param {Array} pesertaList - List of participants
 * @returns {Array} Array of unique email addresses
 */
export const getUniqueEmails = (pesertaList = []) => {
  // Use Set to automatically remove duplicates, then spread back to array
  const emailSet = new Set(pesertaList.map(p => p.email));
  return [...emailSet];
};

/**
 * Create a Map with email as key and latest participant data as value
 * Handles duplicate emails by keeping the last occurrence
 * @param {Array} pesertaList - List of participants
 * @returns {Map} Map of email -> participant object
 */
export const createPesertaMap = (pesertaList = []) => {
  const pesertaMap = new Map();
  
  // Use for...of loop to process each participant
  for (const peserta of pesertaList) {
    // Map.set() overwrites previous values, keeping the latest entry (nilai tes terakhir).
    // ES2018 object spread { ...peserta } copies every field, including extra ones,
    // so the Map never shares an object with the raw data.
    pesertaMap.set(peserta.email, { ...peserta });
  }
  
  return pesertaMap;
};

/**
 * Filter participants by class name using for...of and destructuring
 * @param {Array} pesertaList - List of participants
 * @param {string} className - Class name to filter by
 * @returns {Array} Filtered participants in the specified class
 */
export const getPesertaByClass = (pesertaList = [], className = "") => {
  const result = [];
  
  // Use for...of loop with destructuring - rename class to avoid keyword conflict
  for (const { id, name, email, class: pesertaClass, score } of pesertaList) {
    if (pesertaClass === className) {
      result.push({ id, name, email, class: pesertaClass, score });
    }
  }
  
  return result;
};

/**
 * Calculate average score from participant list using reduce
 * @param {Array} pesertaList - List of participants
 * @returns {number} Average score (rounded to 2 decimals)
 */
export const calculateAverageScore = (pesertaList = []) => {
  // Handle edge case: empty array
  if (pesertaList.length === 0) return 0;
  
  // Use reduce with spread operator to sum all scores
  const totalScore = pesertaList.reduce((sum, { score }) => sum + score, 0);
  
  // Return average rounded to 2 decimal places
  return Math.round((totalScore / pesertaList.length) * 100) / 100;
};

/**
 * Get unique participants (no duplicate emails) - keeps latest entry
 * @param {Array} pesertaList - List of participants
 * @returns {Array} Array of unique participants
 */
export const getUniquePeserta = (pesertaList = []) => {
  const pesertaMap = createPesertaMap(pesertaList);
  // Convert Map values back to array using spread operator
  return [...pesertaMap.values()];
};
