export interface GenerateParams {
  /**
   * Parameters for generating a password.
   *
   * @property {number} characterLength - The desired length of the password.
   * @property {boolean} useNumbers - Whether to include numbers in the password.
   * @property {boolean} useSymbols - Whether to include symbols in the password.
   * @property {boolean} useLowercaseLetters - Whether to include lowercase letters in the password.
   * @property {boolean} useUppercaseLetters - Whether to include uppercase letters in the password.
   * @property {boolean} excludeSimilarCharacters - Whether to exclude visually similar characters.
   * @property {string} excludeTheseCharacters - Characters to exclude from the password.
   * @property {boolean} strictCharacters - Whether to strictly follow the specified character types.
   */
  characterLength: number;
  useNumbers: boolean;
  useSymbols: boolean;
  useLowercaseLetters: boolean;
  useUppercaseLetters: boolean;
  excludeSimilarCharacters: boolean;
  excludeTheseCharacters: string;
  strictCharacters: boolean;
}

export interface GeneratedPassword {
  /**
   * Represents the generated password and its associated properties.
   *
   * @property {string} password - The generated password.
   * @property {string} passwordStrength - The strength of the generated password.
   * @property {number} passwordLength - The length of the generated password.
   */
  password: string;
  passwordStrength: string;
  passwordLength: number;
}

/**
 * Generates a single password based on the provided parameters.
 *
 * @param {GenerateParams} params - The parameters for generating the password.
 * @returns {GeneratedPassword} - The generated password and its associated properties.
 *
 * @example
 * ```typescript
 * const params: GenerateParams = {
 *   characterLength: 12,
 *   useNumbers: true,
 *   useSymbols: true,
 *   useLowercaseLetters: true,
 *   useUppercaseLetters: true,
 *   excludeSimilarCharacters: true,
 *   excludeTheseCharacters: "!@#$%^&*()",
 *   strictCharacters: false,
 * };
 *
 * const generatedPassword = generate(params);
 * console.log(generatedPassword);
 * ```
 */
export function generate({
  characterLength,
  useNumbers,
  useSymbols,
  useLowercaseLetters,
  useUppercaseLetters,
  excludeSimilarCharacters,
  excludeTheseCharacters,
  strictCharacters,
}: GenerateParams): GeneratedPassword;

/**
 * Generates multiple passwords based on the provided parameters.
 *
 * @param {object} params - The parameters for generating multiple passwords.
 * @param {number} params.count - The number of passwords to generate.
 * @param {GenerateParams} params.options - The parameters for generating each password.
 * @returns {GeneratedPassword[]} - An array of generated passwords and their associated properties.
 *
 * @example
 * ```typescript
 * const params: GenerateParams = {
 *   characterLength: 12,
 *   useNumbers: true,
 *   useSymbols: true,
 *   useLowercaseLetters: true,
 *   useUppercaseLetters: true,
 *   excludeSimilarCharacters: true,
 *   excludeTheseCharacters: "!@#$%^&*()",
 *   strictCharacters: false,
 * };
 *
 * const generatedPasswords = generateMultiple({ count: 5, options: params });
 * console.log(generatedPasswords);
 * ```
 */
export function generateMultiple({
  count,
  options,
}: {
  count: number;
  options: GenerateParams;
}): GeneratedPassword[];
