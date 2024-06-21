import generator from "generate-password-browser";
import { Result, passwordStrength } from "check-password-strength";

interface GenerateParams {
  characterLength: number;
  useNumbers: boolean;
  useSymbols: boolean;
  useLowercaseLetters: boolean;
  useUppercaseLetters: boolean;
  excludeSimilarCharacters: boolean;
  excludeTheseCharacters: string;
  strictCharacters: boolean;
}

interface GeneratedPassword {
  password: string;
  passwordStrength: string;
  passwordLength: number;
}

export const generate = ({
  characterLength = 6,
  useNumbers = false,
  useSymbols = false,
  useLowercaseLetters = false,
  useUppercaseLetters = false,
  excludeSimilarCharacters = false,
  excludeTheseCharacters = "",
  strictCharacters = false,
}: GenerateParams): GeneratedPassword => {
  try {
    const password: string = generator.generate({
      length: characterLength,
      numbers: useNumbers,
      symbols: useSymbols,
      lowercase: useLowercaseLetters,
      uppercase: useUppercaseLetters,
      excludeSimilarCharacters: excludeSimilarCharacters,
      exclude: excludeTheseCharacters,
      strict: strictCharacters,
    });

    const generatedPasswordStrength: Result<string> =
      passwordStrength(password);

    return {
      password: password,
      passwordStrength: generatedPasswordStrength.value,
      passwordLength: generatedPasswordStrength.length,
    };
  } catch (error: any) {
    throw new Error(
      error.message || "An Error Occurred while generating password"
    );
  }
};

export const generateMultiple = ({
  count = 1,
  options: {
    characterLength = 6,
    useNumbers = false,
    useSymbols = false,
    useLowercaseLetters = false,
    useUppercaseLetters = false,
    excludeSimilarCharacters = false,
    excludeTheseCharacters = "",
    strictCharacters = false,
  },
}: {
  count: number;
  options: GenerateParams;
}): GeneratedPassword[] => {
  let passwords: GeneratedPassword[] = [];

  // Add Error Handling
  for (let i = 0; i < count; i++) {
    passwords[i] = generate({
      characterLength,
      useNumbers,
      useSymbols,
      useLowercaseLetters,
      useUppercaseLetters,
      excludeSimilarCharacters,
      excludeTheseCharacters,
      strictCharacters,
    });
  }

  return passwords;
};
