import generator from "generate-password-browser";
import bcrypt from "bcrypt";
import { Result, passwordStrength } from "check-password-strength";

export interface GenerateParams {
  characterLength: number;
  useNumbers: boolean;
  useSymbols: boolean;
  useLowercase: boolean;
  useUppercase: boolean;
  excludeSimilarCharacters: boolean;
  useStrict: boolean;
  excludeTheseCharacters: string;
}

export interface GeneratedPassword {
  password: string;
  passwordStrength: string;
  passwordLength: number;
}

export const generate = ({
  options: {
    characterLength = 6,
    useNumbers = false,
    useSymbols = false,
    useLowercase = false,
    useUppercase = false,
    excludeSimilarCharacters = false,
    excludeTheseCharacters = "",
    useStrict = false,
  },
}: {
  options: GenerateParams;
}): GeneratedPassword => {
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

  const generatedPasswordStrength: Result<string> = passwordStrength(password);

  return {
    password,
    passwordStrength: generatedPasswordStrength.value,
    passwordLength: generatedPasswordStrength.length,
  };
};

export const generateMultiple = ({
  count = 1,
  options: {
    characterLength = 6,
    useNumbers = false,
    useSymbols = false,
    useLowercase = false,
    useUppercase = false,
    excludeSimilarCharacters = false,
    excludeTheseCharacters = "",
    useStrict = false,
  },
}: {
  count: number;
  options: GenerateParams;
}): GeneratedPassword[] => {
  let passwords: GeneratedPassword[] = [];

  for (let i = 0; i < count; i++) {
    passwords[i] = generate({
      options: {
        characterLength,
        useNumbers,
        useSymbols,
        useLowercase,
        useUppercase,
        excludeSimilarCharacters,
        excludeTheseCharacters,
        useStrict,
      },
    });
  }

  return passwords;
};

export const hash = async (password: string, saltRounds = 10) => {
  const hashedPwd = await bcrypt.hash(password, saltRounds);

  return {
    hashedPassword: hashedPwd,
    password: password,
    saltRounds: saltRounds,
  };
};

export const hashSync = (password: string, saltRounds = 10) => {
  const hashedPwd = bcrypt.hashSync(password, saltRounds);

  return {
    hashedPassword: hashedPwd,
    password: password,
    saltRounds: saltRounds,
  };
};

export const generateHashedPassword = async ({
  options,
  saltRounds = 10,
}: {
  options: GenerateParams;
  saltRounds: number;
}) => {
  const password: GeneratedPassword = generate({ options: { ...options } });

  const { hashedPassword } = await hash(password.password, saltRounds);

  return {
    ...password,
    hashedPassword,
    salt: saltRounds,
  };
};

export const generateHashedPasswordSync = ({
  options,
  saltRounds = 10,
}: {
  options: GenerateParams;
  saltRounds: number;
}) => {
  const password: GeneratedPassword = generate({ options: { ...options } });

  const { hashedPassword } = hashSync(password.password, saltRounds);

  return {
    ...password,
    hashedPassword,
    salt: saltRounds,
  };
};

export const compareHashedPassword = async ({
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

export const compareHashedPasswordSync = ({
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
