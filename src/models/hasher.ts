import crypto from "crypto";
import Generator, { GeneratedResults, GenerateOptions } from "./generator";

export interface HashedResults {
  hashedPassword: string;
  password: string;
  salt: string;
  saltRounds: number;
}

class Hasher {
  static async hash(
    password: string,
    saltRounds = 10,
    encryption = "sha256"
  ): Promise<HashedResults> {
    const salt = crypto.randomBytes(16).toString("hex");

    const hashedPassword = await new Promise<string>((resolve, reject) => {
      crypto.pbkdf2(password, salt, saltRounds, 64, encryption, (err, key) => {
        if (err) return reject(err);
        resolve(key.toString("hex"));
      });
    });

    return {
      hashedPassword,
      password,
      salt,
      saltRounds,
    };
  }

  static hashSync(
    password: string,
    saltRounds = 10,
    encryption = "sha256"
  ): HashedResults {
    const salt = crypto.randomBytes(16).toString("hex");

    const hashedPassword = crypto
      .pbkdf2Sync(password, salt, saltRounds, 64, encryption)
      .toString("hex");

    return {
      hashedPassword,
      password,
      salt,
      saltRounds,
    };
  }

  static async compareHashedPassword({
    password,
    hashedPassword,
    salt,
    saltRounds = 10,
    encryption = "sha256",
  }: {
    password: string;
    hashedPassword: string;
    salt: string;
    saltRounds: number;
    encryption?: string;
  }): Promise<boolean> {
    const derivedHash = await new Promise<string>((resolve, reject) =>
      crypto.pbkdf2(password, salt, saltRounds, 64, encryption, (err, key) => {
        if (err) return reject(err);
        resolve(key.toString("hex"));
      })
    );

    return derivedHash === hashedPassword;
  }

  static compareHashedPasswordSync({
    password,
    hashedPassword,
    salt,
    saltRounds = 10,
    encryption = "sha256",
  }: {
    password: string;
    hashedPassword: string;
    salt: string;
    saltRounds: number;
    encryption?: string;
  }): boolean {
    const derivedHash = crypto
      .pbkdf2Sync(password, salt, saltRounds, 64, encryption)
      .toString("hex");

    return derivedHash === hashedPassword;
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

    const { hashedPassword, salt } = await this.hash(
      password.password,
      saltRounds
    );

    return {
      ...password,
      hashedPassword,
      salt,
      saltRounds,
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

    const { hashedPassword, salt } = this.hashSync(
      password.password,
      saltRounds
    );

    return {
      ...password,
      hashedPassword,
      salt,
      saltRounds,
    };
  }
}

export default Hasher;
