import { describe } from "@jest/globals";
import { Generator } from "../src";
import { expect } from "@jest/globals";

describe("Generate Multiple Passwords Suite", () => {
  test("generates 10 passwords", () => {
    const passwords = Generator.generateMultiple({
      count: 10,
      characterLength: 10,
      useNumbers: true,
      useSymbols: true,
      useLowercaseLetters: true,
      useUppercaseLetters: true,
      excludeSimilarCharacters: true,
      excludeTheseCharacters: "",
      strictCharacters: true,
    });

    expect(passwords.length).toBe(10);
  });
});
