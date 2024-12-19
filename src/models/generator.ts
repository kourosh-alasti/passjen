export interface GenerateOptions {
  characterLength?: number;
  useNumbers?: boolean;
  useSymbols?: boolean;
  useLowercase?: boolean;
  useUppercase?: boolean;
  excludeSimilarCharacters?: boolean;
  useStrict?: boolean;
  excludeTheseCharacters?: string;
}

export interface GeneratedResults {
  password: string;
  passwordStrength: PasswordStrength;
  passwordLength: number;
}

export type PasswordStrength = 'Too weak' | 'Weak' | 'Medium' | 'Strong';

class Generator {
  private static readonly NUMBERS = "0123456789";
  private static readonly SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?";
  private static readonly LOWERCASE = "abcdefghijklmnopqrstuvwxyz";
  private static readonly UPPERCASE = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private static readonly SIMILAR_CHARACTERS = "ilLI|`oO0";

  private static checkPasswordStrength(password: string): PasswordStrength {
    let score = 0;
    
    // Length check
    if (password.length >= 12) score += 2;
    else if (password.length >= 8) score += 1;
    
    // Character variety checks
    if (/[0-9]/.test(password)) score += 1;
    if (/[a-z]/.test(password)) score += 1;
    if (/[A-Z]/.test(password)) score += 1;
    if (/[^a-zA-Z0-9]/.test(password)) score += 1;
    
    // Complexity checks
    if (password.length >= 8 && /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).*$/.test(password)) {
      score += 2;
    }
    
    // Return strength based on score
    if (score >= 7) return 'Strong';
    if (score >= 5) return 'Medium';
    if (score >= 3) return 'Weak';
    return 'Too weak';
  }

  private static generateCharset({
    useNumbers,
    useSymbols,
    useLowercase,
    useUppercase,
    excludeSimilarCharacters,
    excludeTheseCharacters,
  }: GenerateOptions): string {
    let charset = "";
    
    // Build character set based on options
    if (useNumbers) charset += this.NUMBERS;
    if (useSymbols) charset += this.SYMBOLS;
    if (useLowercase) charset += this.LOWERCASE;
    if (useUppercase) charset += this.UPPERCASE;

    // Remove excluded characters
    if (excludeSimilarCharacters) {
      charset = charset
        .split("")
        .filter(char => !this.SIMILAR_CHARACTERS.includes(char))
        .join("");
    }
    
    if (excludeTheseCharacters) {
      charset = charset
        .split("")
        .filter(char => !excludeTheseCharacters.includes(char))
        .join("");
    }

    // Ensure at least one character set is selected
    if (charset === "") {
      charset = this.LOWERCASE; // Default to lowercase if no options selected
    }

    return charset;
  }

  static generate({
    characterLength = 6,
    useNumbers = false,
    useSymbols = false,
    useLowercase = false,
    useUppercase = false,
    excludeSimilarCharacters = false,
    excludeTheseCharacters = "",
    useStrict = false,
  }: GenerateOptions): GeneratedResults {
    let password = "";
    const charset = this.generateCharset({
      useNumbers,
      useSymbols,
      useLowercase,
      useUppercase,
      excludeSimilarCharacters,
      excludeTheseCharacters,
      useStrict,
    });

    if (useStrict) {
      if (useNumbers) {
        password += this.NUMBERS[Math.floor(Math.random() * this.NUMBERS.length)];
      }
      if (useSymbols) {
        password += this.SYMBOLS[Math.floor(Math.random() * this.SYMBOLS.length)];
      }
      if (useLowercase) {
        password += this.LOWERCASE[Math.floor(Math.random() * this.LOWERCASE.length)];
      }
      if (useUppercase) {
        password += this.UPPERCASE[Math.floor(Math.random() * this.UPPERCASE.length)];
      }
    }

    while (password.length < characterLength) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }

    if (useStrict && password.length > 1) {
      password = password
        .split("")
        .sort(() => Math.random() - 0.5)
        .join("");
    }

    return {
      password,
      passwordStrength: this.checkPasswordStrength(password),
      passwordLength: password.length,
    };
  }

  static generateMultiple({
    count = 1,
    characterLength = 6,
    useNumbers = false,
    useSymbols = false,
    useLowercase = false,
    useUppercase = false,
    excludeSimilarCharacters = false,
    excludeTheseCharacters = "",
    useStrict = false,
  }: GenerateOptions & { count: number }): GeneratedResults[] {
    let passwords: GeneratedResults[] = [];

    for (let i = 0; i < count; i++) {
      passwords[i] = this.generate({
        characterLength,
        useNumbers,
        useSymbols,
        useLowercase,
        useUppercase,
        excludeSimilarCharacters,
        excludeTheseCharacters,
        useStrict,
      });
    }

    return passwords;
  }
}

export default Generator;
