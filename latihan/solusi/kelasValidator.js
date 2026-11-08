// Helper module for exercise 05: a small validator class in its own file
// Demonstrates: class with static fields (ES2022), includes() (ES2016), named export

/**
 * Validates class names against the classes Brainmatics offers.
 */
export class KelasValidator {
  /** Kelas yang tersedia. */
  static KELAS = ["JavaScript Fundamentals", "React Basics"];

  /**
   * Check whether a class name is offered.
   * @param {string} kelas - Class name to check
   * @returns {boolean} True if kelas is in KelasValidator.KELAS
   */
  static isValidKelas = (kelas) => KelasValidator.KELAS.includes(kelas);
}
