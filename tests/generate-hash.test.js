import { generateHashedPassword, generateHashedPasswordSync } from "../src";
import { describe, expect, test } from "@jest/globals";

describe("Generate Hashed Password Suite", () => {
  test("generates a hashed password of length 15 synchronously", () => {
    const { password, passwordLength, passwordStrength, hashedPassword, salt } =
      generateHashedPasswordSync({
        options: {
          characterLength: 15,
          useNumbers: true,
          useSymbols: true,
          useLowercase: true,
          useUppercase: true,
          excludeSimilarCharacters: true,
          excludeTheseCharacters: "",
          useStrict: true,
        },
      });

    expect(passwordLength).toBe(15);
    expect(passwordStrength).toBe("Strong");
    expect(hashedPassword).toBeDefined();
    expect(salt).toBe(10);

    // console.log(`The generated password is ${password}`);
    // console.log(`The generated hashed password is ${hashedPassword}`);
  });

  test("generates a hashed password of length 15 asynchronously", async () => {
    const { password, passwordLength, passwordStrength, hashedPassword, salt } =
      await generateHashedPassword({
        options: {
          characterLength: 15,
          useNumbers: true,
          useSymbols: true,
          useLowercase: true,
          useUppercase: true,
          excludeSimilarCharacters: true,
          excludeTheseCharacters: "",
          useStrict: true,
        },
        saltRounds: 14,
      });

    expect(passwordLength).toBe(15);
    expect(passwordStrength).toBe("Strong");
    expect(hashedPassword).toBeDefined();
    expect(salt).toBe(14);

    // console.log(`The generated password is ${password}`);
    // console.log(`The generated hashed password is ${hashedPassword}`);
  });
});
