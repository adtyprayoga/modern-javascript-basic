// Validator class for participant score validation
// Demonstrates ES6 features: class syntax, constructor, arrow methods

/**
 * PesertaValidator - Validates participant scores against min/max thresholds
 * Uses ES6 class syntax with arrow function methods
 */
export class PesertaValidator {
  /**
   * Constructor with default parameters
   * @param {number} minScore - Minimum acceptable score (default: 60)
   * @param {number} maxScore - Maximum acceptable score (default: 100)
   */
  constructor(minScore = 60, maxScore = 100) {
    this.minScore = minScore;
    this.maxScore = maxScore;
  }

  /**
   * Check if a score is valid (within min-max range)
   * Arrow function ensures 'this' binding
   * @param {number} score - Score to validate
   * @returns {boolean} True if score is valid
   */
  isValidScore = (score) => {
    return score >= this.minScore && score <= this.maxScore;
  };

  /**
   * Format validation result as a readable string
   * @param {string} name - Participant name
   * @param {number} score - Participant score
   * @returns {string} Formatted validation result
   */
  formatResult = (name, score) => {
    const status = this.isValidScore(score) ? "SESUAI STANDAR" : "TIDAK SESUAI";
    return `${name} mendapat score ${score} - ${status}`;
  };

  /**
   * Get validation details for reporting
   * @param {number} score - Score to validate
   * @returns {Object} Detailed validation information
   */
  getValidationDetails = (score) => {
    return {
      score,
      isValid: this.isValidScore(score),
      minScore: this.minScore,
      maxScore: this.maxScore,
      message: this.isValidScore(score) 
        ? `Score dalam rentang ${this.minScore}-${this.maxScore}` 
        : `Score di luar rentang ${this.minScore}-${this.maxScore}`
    };
  };

  /**
   * Validate a list of participants and return summary
   * @param {Array} pesertaList - List of participants to validate
   * @returns {Object} Validation summary
   */
  validateBatch = (pesertaList = []) => {
    const validCount = pesertaList.filter(({ score }) => this.isValidScore(score)).length;
    const invalidCount = pesertaList.length - validCount;
    
    return {
      total: pesertaList.length,
      valid: validCount,
      invalid: invalidCount,
      validPercentage: pesertaList.length > 0 
        ? Math.round((validCount / pesertaList.length) * 100) 
        : 0
    };
  };
}

/**
 * Factory function to create a standard Brainmatics validator
 * Passing score threshold: 80
 * @returns {PesertaValidator} Validator with passing threshold of 80
 */
export const createPassingValidator = () => {
  return new PesertaValidator(80, 100);
};

/**
 * Factory function to create a lenient validator
 * Lower threshold: 60
 * @returns {PesertaValidator} Validator with lower threshold
 */
export const createLenientValidator = () => {
  return new PesertaValidator(60, 100);
};
