import { hash, hashSync } from "../main";
import { describe, expect, test } from "@jest/globals";

describe("Hashing Suite", () => {
  test("hashes a password with default salt synchronously", () => {
    const { hashedPassword, password, saltRounds } = hashSync("testPassword");

    expect(password).toBe("testPassword");
    expect(hashedPassword).not.toBe("testPassword");
    expect(hashedPassword).toBeDefined();
    expect(saltRounds).toBe(10);
  });

  test("hashes a password with not default salt synchronously", () => {
    const { hashedPassword, password, saltRounds } = hashSync(
      "anotherTestPassword",
      20
    );

    expect(password).toBe("anotherTestPassword");
    expect(hashedPassword).not.toBe("anotherTestPassword");
    expect(hashedPassword).toBeDefined();
    expect(saltRounds).toBe(20);
  });

  test("hashes a password with default salt asynchronously", async () => {
    const { hashedPassword, password, saltRounds } = await hash("testPassword");

    expect(password).toBe("testPassword");
    expect(hashedPassword).not.toBe("testPassword");
    expect(hashedPassword).toBeDefined();
    expect(saltRounds).toBe(10);
  });

  test("hashes a password with not default salt asynchronously", async () => {
    const { hashedPassword, password, saltRounds } = await hash(
      "anotherTestPassword",
      13
    );

    expect(password).toBe("anotherTestPassword");
    expect(hashedPassword).not.toBe("anotherTestPassword");
    expect(hashedPassword).toBeDefined();
    expect(saltRounds).toBe(13);
  });
});
