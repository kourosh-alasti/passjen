import { Generator } from "../src";
import {
  isANumber,
  isOnlySpecialCharacters,
  isLowercase,
  isUppercase,
  isAlphabet,
} from "./utility";
import { describe, expect, test } from "@jest/globals";

describe("Generate Password Suite", () => {
  test("generates a strong password of length 15", () => {
    const { password, passwordLength, passwordStrength } = Generator.generate({
      characterLength: 15,
      useNumbers: true,
      useSymbols: true,
      useLowercase: true,
      useUppercase: true,
      excludeSimilarCharacters: true,
      excludeTheseCharacters: "",
      useStrict: true,
    });

    expect(passwordLength).toBe(15);
    expect(passwordStrength).toBe("Strong");
    // console.log(`The generated password is ${password}`);
  });

  test("generates a weak password of length 6", () => {
    const { password, passwordLength, passwordStrength } = Generator.generate({
      characterLength: 6,
      useNumbers: false,
      useSymbols: false,
      useLowercase: true,
      useUppercase: false,
      excludeSimilarCharacters: false,
      excludeTheseCharacters: "bcdefghijklmnopqrstuvwxyz",
      useStrict: false,
    });

    expect(passwordLength).toBe(6);
    expect(passwordStrength).toBe("Too weak");
    // console.log(`The generated password is ${password}`);
  });

  test("generates a password with only numbers of length 10", () => {
    const { password, passwordLength, passwordStrength } = Generator.generate({
      characterLength: 10,
      useNumbers: true,
      useSymbols: false,
      useLowercase: false,
      useUppercase: false,
      excludeSimilarCharacters: false,
      excludeTheseCharacters: "",
      useStrict: false,
    });

    expect(passwordLength).toBe(10);
    expect(passwordStrength).toBe("Too weak");
    expect(isANumber(password)).toBe(true);
    // console.log(`The generated password is ${password}`);
  });

  test("generate a password with only symbols of length 10", () => {
    const { password, passwordLength, passwordStrength } = Generator.generate({
      characterLength: 10,
      useNumbers: false,
      useSymbols: true,
      useLowercase: false,
      useUppercase: false,
      excludeSimilarCharacters: false,
      excludeTheseCharacters: "",
      useStrict: false,
    });

    expect(passwordLength).toBe(10);
    expect(passwordStrength).toBe("Too weak");
    expect(isOnlySpecialCharacters(password)).toBe(true);
    // console.log(`The generated password is ${password}`);
  });

  test("generate a password with only lowercase letters of length 10", () => {
    const { password, passwordLength, passwordStrength } = Generator.generate({
      characterLength: 10,
      useNumbers: false,
      useSymbols: false,
      useLowercase: true,
      useUppercase: false,
      excludeSimilarCharacters: false,
      excludeTheseCharacters: "",
      useStrict: false,
    });

    expect(passwordLength).toBe(10);
    expect(passwordStrength).toBe("Too weak");
    expect(isLowercase(password)).toBe(true);
    expect(isAlphabet(password)).toBe(true);
    // console.log(`The generated password is ${password}`);
  });

  test("generate a password with only uppercase letters of length 10", () => {
    const { password, passwordLength, passwordStrength } = Generator.generate({
      characterLength: 10,
      useNumbers: false,
      useSymbols: false,
      useLowercase: false,
      useUppercase: true,
      excludeSimilarCharacters: false,
      excludeTheseCharacters: "",
      useStrict: false,
    });

    expect(passwordLength).toBe(10);
    expect(passwordStrength).toBe("Too weak");
    expect(isUppercase(password)).toBe(true);
    expect(isAlphabet(password)).toBe(true);
    // console.log(`The generated password is ${password}`);
  });

  test("generate a password without similar characters of length 10", () => {
    const { password, passwordLength, passwordStrength } = Generator.generate({
      characterLength: 14,
      useNumbers: true,
      useSymbols: true,
      useLowercase: true,
      useUppercase: true,
      excludeSimilarCharacters: true,
      excludeTheseCharacters: "",
      useStrict: false,
    });

    expect(passwordLength).toBe(14);
    expect(password.includes("I") && password.includes("l")).toBe(false);
    // expect(passwordStrength).toBe("Too weak");
    // expect(isLowercase(password)).toBe(false);
    // expect(isUppercase(password)).toBe(false);
    // expect(isAlphabet(password)).toBe(false);
    // console.log(`The generated password is ${password}`);
  });
});
