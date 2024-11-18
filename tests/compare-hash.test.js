import { describe, expect, test } from "@jest/globals";
import { Hasher } from "../src";

describe("Compare Hashed Password Suite", () => {
  test("Compare hashed password synchronously and matches", () => {
    const pwd = "1?R2M+z[t)$bTY1";
    const hash =
      "e14eb219a49cffab80586eb7ed224f894eddbca5414a43dc215b4d73da0aea6df4bcc9a3e2d804fed6604105d39c81f74b507175ef6a6e3e35fa779ac5e6bc95";
    const salt = "27a617e3e0116b82ca8f6079ec982278";

    const isMatch = Hasher.compareSync({
      password: pwd,
      hashedPassword: hash,
      salt,
      saltRounds: 10,
    });

    expect(isMatch).toBe(true);
  });

  test("Compare hashed password synchronously and does not match", () => {
    const pwd = "1?R2M+z[t)$bTsdjfl;";
    const inCorrectHash =
      "2068cbdc38cee45b8b856e0771f93589fa3e5cdb87269154b227d640eabf1e536c429be2b99f5aaa63f52e5143a96e67106e3f488efa03149089e98499cbf45";
    // const correctHash =
    //   "2068cbdc38cee45b8b856e0771f93589fa3e5cdb87269154b227d640eabf1e536c429be2b99f5aaa63f52e5143a96e67106e3f488efa03149089e98499cbf451";
    const salt = "b0b29d3f6a697a72363de7296eccab10";

    const isMatch = Hasher.compareSync({
      password: pwd,
      hashedPassword: inCorrectHash,
      salt,
      saltRounds: 10,
    });

    expect(isMatch).toBe(false);
  });

  test("Compare hashed password with non default saltRounds (14 instead of 10) synchronously and matches", () => {
    const pwd = "yyG}^ScYzT)8,a<";
    const hash =
      "06a4dcc8fac0672b407b649525d012de57631eb41fe4affe4ebbc860bc1abb8cc3f69cb6275f2cb8f506302879ac24e419752f7ffff0fdd4abb156ed6498ac3a";
    const salt = "062ebb2c5358c17744f126e0ab6d1d59";
    const saltRounds = 14;

    const isMatch = Hasher.compareSync({
      password: pwd,
      hashedPassword: hash,
      salt,
      saltRounds,
    });

    expect(isMatch).toBe(true);
  });

  test("Compare hashed password with non default saltRounds (14 instead of 10) synchronously and does not match", () => {
    const pwd = "yyG}^ScYzT)8,a<sdfsdf";
    const inCorrectHash =
      "1460e0f60a5f5d6d9aef75c4084cf8b49118646783fbf571b3645d379717ea8a1e4891a0eb4cd2bd3bd4435a8bcdbf194e5638155dc9cdea585a556a7178b9d";
    // const correctHash =
    //   "1460e0f60a5f5d6d9aef75c4084cf8b49118646783fbf571b3645d379717ea8a1e4891a0eb4cd2bd3bd4435a8bcdbf194e5638155dc9cdea585a556a71718b9d";
    const saltRounds = 14;
    const salt = "10c5f9e7ad4ecc6cad91d73552b20df3";

    const isMatch = Hasher.compareSync({
      password: pwd,
      hashedPassword: inCorrectHash,
      salt,
      saltRounds,
    });

    expect(isMatch).toBe(false);
  });

  test("Compare hashed password asynchronously and matches", async () => {
    const pwd = "1?R2M+z[t)$bTY1";
    const hash =
      "b8f114e80baa8e1b92870cc14bb1c9dc3a22dacd03595acb133f9b8a6e10b25bd53ad338ac3a62c082ceb85b03ba67eedf87ff9d1514d4cb73d7322c9645f16d";
    const salt = "8516a4a09bf67d444b7c38dd4307734a";

    const isMatch = await Hasher.compare({
      password: pwd,
      hashedPassword: hash,
      salt,
    });

    expect(isMatch).toBe(true);
  });

  test("Compare hashed password synchronously and does not match", async () => {
    const pwd = "1?R2M+z[t)$bTsdjfl;";
    // const correctHash =
    //   "4fde9dda1afa9f1ef95c2173f6c949c43bb22630f23e2622abe26c39b47f59ef8fee22bee792722f441f8791ed6e49188707cfee442e593aa44c65813c6654a7";
    const inCorrectHash =
      "4fde9dda1afa9f1ef95c2173f6c949c43bb22630f23e2622abe26c39b47f59ef8fee22bee792722f441f8791ed6e49188707cfee442e593aa44c65813c6654a";
    const salt = "38de417b1643c4437a7e10778f6959ae";

    const isMatch = await Hasher.compare({
      password: pwd,
      hashedPassword: inCorrectHash,
      salt,
    });

    expect(isMatch).toBe(false);
  });

  test("Compare hashed password with non default saltRounds (14 instead of 10) synchronously and matches", async () => {
    const pwd = "yyG}^ScYzT)8,a<";
    const hash =
      "ab10a0907d894f040de4525f3a4ad582ad25b7fc07048583fde69d84ee325217874a9e96068dd30e3f852fc287dfcf65bbe504d09fe1e063a4405f8ac47e1819";
    const salt = "9d0416c3b2773334863de2ff592d3e24";
    const saltRounds = 14;

    const isMatch = await Hasher.compare({
      password: pwd,
      hashedPassword: hash,
      salt,
      saltRounds,
    });

    expect(isMatch).toBe(true);
  });

  test("Compare hashed password with non default saltRounds (14 instead of 10) synchronously and does not match", async () => {
    const pwd = "yyG}^ScYzT)8,a<sdfsdf";
    // const correctHash =
    //   "61b678cb6430b4f1cab3db46dfc1b1d2aef8e42eeb3f457bdbd27c24eb8f995d8d63b848b28720e40134a4eacdd751ac69e5c96d655a701228e34403201c5a56";
    const inCorrectHash =
      "61b678cb6430b4f1cab3db46dfc1b1d2aef8e42eeb3f457bdbd27c24eb8f995d8d63b848b28720e40134a4eacdd751ac69e5c96d655a701228e344032015a56";
    const saltRounds = 14;
    const salt = "28feda6d29480680e9c9dc8d1562f7da";

    const isMatch = await Hasher.compare({
      password: pwd,
      hashedPassword: inCorrectHash,
      salt,
      saltRounds,
    });

    expect(isMatch).toBe(false);
  });
});
