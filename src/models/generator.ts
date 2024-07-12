import { Result, passwordStrength } from "check-password-strength";
import generator from "generate-password-browser";

export interface GenerateOptions {
  characterLength: number;
  useNumbers: boolean;
  useSymbols: boolean;
  useLowercase: boolean;
  useUppercase: boolean;
  excludeSimilarCharacters: boolean;
  useStrict: boolean;
  excludeTheseCharacters: string;
}

export interface GeneratedResults {
  password: string;
  passwordStrength: string;
  passwordLength: number;
}

class Generator {
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
    const password: string = generator.generate({
      length: characterLength,
      numbers: useNumbers,
      symbols: useSymbols,
      uppercase: useUppercase,
      lowercase: useLowercase,
      excludeSimilarCharacters: excludeSimilarCharacters,
      exclude: excludeTheseCharacters,
      strict: useStrict,
    });

    const generatedPasswordStrength: Result<string> =
      passwordStrength(password);

    return {
      password,
      passwordStrength: generatedPasswordStrength.value,
      passwordLength: generatedPasswordStrength.length,
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
