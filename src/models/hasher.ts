import bcrypt from "bcrypt";
import Generator, { GeneratedResults, GenerateOptions } from "./generator";

export interface HashedResults {
  hashedPassword: string;
  password: string;
  saltRounds: number;
}

class Hasher {
  static async hash(password: string, saltRounds = 10): Promise<HashedResults> {
    const hashedPwd = await bcrypt.hash(password, saltRounds);

    return {
      hashedPassword: hashedPwd,
      password: password,
      saltRounds: saltRounds,
    };
  }

  static hashSync(password: string, saltRounds = 10): HashedResults {
    const hashedPwd = bcrypt.hashSync(password, saltRounds);

    return {
      hashedPassword: hashedPwd,
      password: password,
      saltRounds: saltRounds,
    };
  }

  static async generateHashedPassword({
    characterLength = 6,
    useNumbers = false,
    useSymbols = false,
    useLowercase = false,
    useUppercase = false,
    excludeSimilarCharacters = false,
    excludeTheseCharacters = "",
    useStrict = false,
    saltRounds = 10,
  }: GenerateOptions & { saltRounds: number }) {
    const password: GeneratedResults = Generator.generate({
      characterLength,
      useNumbers,
      useSymbols,
      useLowercase,
      useUppercase,
      excludeSimilarCharacters,
      excludeTheseCharacters,
      useStrict,
    });

    const { hashedPassword } = await this.hash(password.password, saltRounds);

    return {
      ...password,
      hashedPassword,
      salt: saltRounds,
    };
  }

  static generateHashedPasswordSync({
    characterLength = 6,
    useNumbers = false,
    useSymbols = false,
    useLowercase = false,
    useUppercase = false,
    excludeSimilarCharacters = false,
    excludeTheseCharacters = "",
    useStrict = false,
    saltRounds = 10,
  }: GenerateOptions & { saltRounds: number }) {
    const password: GeneratedResults = Generator.generate({
      characterLength,
      useNumbers,
      useSymbols,
      useLowercase,
      useUppercase,
      excludeSimilarCharacters,
      excludeTheseCharacters,
      useStrict,
    });

    const { hashedPassword } = this.hashSync(password.password, saltRounds);

    return {
      ...password,
      hashedPassword,
      salt: saltRounds,
    };
  }

  static async compareHashedPassword({
    password,
    hashedPassword,
  }: {
    password: string;
    hashedPassword: string;
  }) {
    const isMatch: boolean = await bcrypt.compare(password, hashedPassword);

    return {
      password,
      hashedPassword,
      isMatch,
    };
  }

  static compareHashedPasswordSync({
    password,
    hashedPassword,
  }: {
    password: string;
    hashedPassword: string;
  }) {
    const isMatch: boolean = bcrypt.compareSync(password, hashedPassword);

    return {
      password,
      hashedPassword,
      isMatch,
    };
  }
}

export default Hasher;
