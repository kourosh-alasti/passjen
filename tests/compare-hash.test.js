import { compareHashedPassword, compareHashedPasswordSync } from "../main";
import { describe, expect, test } from "@jest/globals";

describe("Compare Hashed Password Suite", () => {
  test("Compare hashed password synchronously and matches", () => {
    const pwd = "1?R2M+z[t)$bTY1";
    const hash = "$2b$10$55ZPMGhYysoCA60s0fAZXu0IwLUrHh/wWdzgK4ezK.TCv1CoLxuO2";

    const { password, hashedPassword, isMatch } = compareHashedPasswordSync({
      password: pwd,
      hashedPassword: hash,
    });

    expect(password).toBe(pwd);
    expect(hashedPassword).toBe(hash);
    expect(isMatch).toBe(true);
  });

  test("Compare hashed password synchronously and does not match", () => {
    const pwd = "1?R2M+z[t)$bTsdjfl;";
    const hash = "$2b$10$55ZPMGhYysoCA60s0fAZXu0IwLUrHh/wWdzgK4ezK.TCv1CoLxuO2";

    const { password, hashedPassword, isMatch } = compareHashedPasswordSync({
      password: pwd,
      hashedPassword: hash,
    });

    expect(password).toBe(pwd);
    expect(hashedPassword).toBe(hash);
    expect(isMatch).toBe(false);
  });

  test("Compare hashed password with non default saltRounds (14 instead of 10) synchronously and matches", () => {
    const pwd = "yyG}^ScYzT)8,a<";
    const hash = "$2b$14$0W1uEwiWhC/fyQ6lcKUwyesv4uQ5yEUJRqn3JPsbYzu5g9xR1DYza";

    const { password, hashedPassword, isMatch } = compareHashedPasswordSync({
      password: pwd,
      hashedPassword: hash,
    });

    expect(password).toBe(pwd);
    expect(hashedPassword).toBe(hash);
    expect(isMatch).toBe(true);
  });

  test("Compare hashed password with non default saltRounds (14 instead of 10) synchronously and does not match", () => {
    const pwd = "yyG}^ScYzT)8,a<sdfsdf";
    const hash = "$2b$14$0W1uEwiWhC/fyQ6lcKUwyesv4uQ5yEUJRqn3JPsbYzu5g9xR1DYza";

    const { password, hashedPassword, isMatch } = compareHashedPasswordSync({
      password: pwd,
      hashedPassword: hash,
    });

    expect(password).toBe(pwd);
    expect(hashedPassword).toBe(hash);
    expect(isMatch).toBe(false);
  });

  test("Compare hashed password asynchronously and matches", async () => {
    const pwd = "1?R2M+z[t)$bTY1";
    const hash = "$2b$10$55ZPMGhYysoCA60s0fAZXu0IwLUrHh/wWdzgK4ezK.TCv1CoLxuO2";

    const { password, hashedPassword, isMatch } = await compareHashedPassword({
      password: pwd,
      hashedPassword: hash,
    });

    expect(password).toBe(pwd);
    expect(hashedPassword).toBe(hash);
    expect(isMatch).toBe(true);
  });

  test("Compare hashed password synchronously and does not match", async () => {
    const pwd = "1?R2M+z[t)$bTsdjfl;";
    const hash = "$2b$10$55ZPMGhYysoCA60s0fAZXu0IwLUrHh/wWdzgK4ezK.TCv1CoLxuO2";

    const { password, hashedPassword, isMatch } = await compareHashedPassword({
      password: pwd,
      hashedPassword: hash,
    });

    expect(password).toBe(pwd);
    expect(hashedPassword).toBe(hash);
    expect(isMatch).toBe(false);
  });

  test("Compare hashed password with non default saltRounds (14 instead of 10) synchronously and matches", async () => {
    const pwd = "yyG}^ScYzT)8,a<";
    const hash = "$2b$14$0W1uEwiWhC/fyQ6lcKUwyesv4uQ5yEUJRqn3JPsbYzu5g9xR1DYza";

    const { password, hashedPassword, isMatch } = await compareHashedPassword({
      password: pwd,
      hashedPassword: hash,
    });

    expect(password).toBe(pwd);
    expect(hashedPassword).toBe(hash);
    expect(isMatch).toBe(true);
  });

  test("Compare hashed password with non default saltRounds (14 instead of 10) synchronously and does not match", async () => {
    const pwd = "yyG}^ScYzT)8,a<sdfsdf";
    const hash = "$2b$14$0W1uEwiWhC/fyQ6lcKUwyesv4uQ5yEUJRqn3JPsbYzu5g9xR1DYza";

    const { password, hashedPassword, isMatch } = await compareHashedPassword({
      password: pwd,
      hashedPassword: hash,
    });

    expect(password).toBe(pwd);
    expect(hashedPassword).toBe(hash);
    expect(isMatch).toBe(false);
  });
});
