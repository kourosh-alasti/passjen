import generator from "generate-password-browser";
import bcrypt from "bcrypt";
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

const generate = ({
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

const generateMultiple = ({
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

const generateHashedPasswordSync = ({
  options,
  saltRounds = 10,
}: {
  options: GenerateParams;
  saltRounds: number;
}) => {
  const password: GeneratedPassword = generate({ ...options });

  const hashed: string = bcrypt.hashSync(password.password, saltRounds);

  return {
    ...password,
    hashedPassword: hashed,
    salt: saltRounds,
  };
};

const compareHashedPasswordSync = ({
  password,
  hashedPassword,
}: {
  password: string;
  hashedPassword: string;
}) => {
  const isMatch: boolean = bcrypt.compareSync(password, hashedPassword);

  return {
    password,
    hashedPassword,
    isMatch,
  };
};

const generateHashedPassword = async ({
  options,
  saltRounds = 10,
}: {
  options: GenerateParams;
  saltRounds: number;
}) => {
  const password: GeneratedPassword = generate({ ...options });

  const hashed: string = await bcrypt.hash(password.password, saltRounds);

  return {
    ...password,
    hashedPassword: hashed,
    salt: saltRounds,
  };
};

const compareHashedPassword = async ({
  password,
  hashedPassword,
}: {
  password: string;
  hashedPassword: string;
}) => {
  const isMatch: boolean = await bcrypt.compare(password, hashedPassword);

  return {
    password,
    hashedPassword,
    isMatch,
  };
};

const hash = async (password: string, saltRounds = 10) => {
  const hashedPwd = await bcrypt.hash(password, saltRounds);

  return {
    hashedPassword: hashedPwd,
    password: password,
    saltRounds: saltRounds,
  };
};

const hashSync = (password: string, saltRounds = 10) => {
  const hashedPwd = bcrypt.hashSync(password, saltRounds);

  return {
    hashedPassword: hashedPwd,
    password: password,
    saltRounds: saltRounds,
  };
};

export {
  generate,
  generateMultiple,
  generateHashedPasswordSync,
  compareHashedPasswordSync,
  generateHashedPassword,
  compareHashedPassword,
  hash,
  hashSync,
};
