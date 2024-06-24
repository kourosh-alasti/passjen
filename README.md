Certainly! Here's an updated README file that includes all the new functions from the package:

# Password Generator and Hasher

A package that provides functions for generating and hashing passwords, along with password strength evaluation. It uses the `generate-password-browser`, `bcrypt`, and `check-password-strength` libraries.

## Installation

To install the package, you can use npm or yarn:

```bash
npm install @kourosh-alasti/pwd-gen
```

or

```bash
pnpm add @kourosh-alasti/pwd-gen
```

or

```bash
yarn add @kourosh-alasti/pwd-gen
```

## Usage

The package exports the following functions:

### `generate`

Generates a password based on the provided options.

```javascript
import { generate } from "@kourosh-alasti/pwd-gen";

const options = {
  characterLength: 12,
  useNumbers: true,
  useSymbols: true,
  useLowercaseLetters: true,
  useUppercaseLetters: true,
  excludeSimilarCharacters: true,
  excludeTheseCharacters: "",
  strictCharacters: true,
};

const password = generate(options);
console.log(password);
```

### `generateMultiple`

Generates multiple passwords based on the provided options.

```javascript
import { generateMultiple } from "@kourosh-alasti/pwd-gen";

const options = {
  characterLength: 12,
  useNumbers: true,
  useSymbols: true,
  useLowercaseLetters: true,
  useUppercaseLetters: true,
  excludeSimilarCharacters: true,
  excludeTheseCharacters: "",
  strictCharacters: true,
};

const passwords = generateMultiple(5, options);
console.log(passwords);
```

### `generateHashedPasswordSync`

Generates a hashed password using bcrypt in a synchronous manner.

```javascript
import { generateHashedPasswordSync } from "@kourosh-alasti/pwd-gen";

const options = {
  characterLength: 12,
  useNumbers: true,
  useSymbols: true,
  useLowercaseLetters: true,
  useUppercaseLetters: true,
  excludeSimilarCharacters: true,
  excludeTheseCharacters: "",
  strictCharacters: true,
};

const {
  hashedPassword,
  passwordStrength,
  passwordLength,
  hashedPassword,
  salt,
} = generateHashedPasswordSync({ options, saltRounds: 10 });

console.log(hashedPassword);
```

### `compareHashedPasswordSync`

Compares a password with its hashed version using bcrypt in a synchronous manner.

```javascript
import { compareHashedPasswordSync } from "@kourosh-alasti/pwd-gen";

const hashedPassword = "$2b$10$..."; // Replace with the actual hashed password
const password = "userPassword";

const { password, hashedPassword, isMatch } = compareHashedPasswordSync(
  password,
  hashedPassword
);
console.log(isMatch);
```

### `generateHashedPassword`

Generates a hashed password using bcrypt in an asynchronous manner.

```javascript
import { generateHashedPassword } from "@kourosh-alasti/pwd-gen";

const options = {
  characterLength: 12,
  useNumbers: true,
  useSymbols: true,
  useLowercaseLetters: true,
  useUppercaseLetters: true,
  excludeSimilarCharacters: true,
  excludeTheseCharacters: "",
  strictCharacters: true,
};

const {
  hashedPassword,
  passwordStrength,
  passwordLength,
  hashedPassword,
  salt,
} = await generateHashedPassword({ options, saltRounds: 10 });

console.log(hashedPassword);
```

### `compareHashedPassword`

Compares a password with its hashed version using bcrypt in an asynchronous manner.

```javascript
import { compareHashedPassword } from "@kourosh-alasti/pwd-gen";

const hashedPassword = "$2b$10$..."; // Replace with the actual hashed password
const password = "userPassword";

const { password, hashedPassword, isMatch } = await compareHashedPassword(
  password,
  hashedPassword
);
console.log(isMatch);
```

### `hash`

Hashes a password using bcrypt in an asynchronous manner.

```javascript
import { hash } from "@kourosh-alasti/pwd-gen";

const pass = "userPassword";
const saltRounds = 10;

const { password, hashedPassword } = await hash(pass, saltRounds);
console.log(hashedPassword);
```

### `hashSync`

Hashes a password using bcrypt in a synchronous manner.

```javascript
import { hashSync } from "@kourosh-alasti/pwd-gen";

const password = "userPassword";
const saltRounds = 10;

const { password, hashedPassword } = hashSync(password, saltRounds);
console.log(hashedPassword);
```

## Contributing

Contributions are welcome. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This package is licensed under the MIT License.

## Author

This package was developed by Kourosh Alasti <coding@kouroshalasti.com>.

## Project Structure

The project is organized into a root directory containing several essential files and two main directories: 'src' and 'tests'. The root directory also includes several Markdown files (CODE_OF_CONDUCT.md, CONTRIBUTING.md, LICENSE, README.md, and SECURITY.md) that provide important information about the project.

Key Directories and Files:

1. **'src' Directory:** This directory contains the main source code files for the project. It includes two JavaScript files: 'index.d.ts' (a TypeScript declaration file) and 'index.ts' (the main TypeScript file).
2. **'tests' Directory:** This directory contains several test files for the project, organized by functionality. The 'tests' directory includes several JavaScript test files: 'compare-hash.test.js', 'generate-hash.test.js', 'generate.test.js', 'hash.test.js', 'multiple.test.js', and 'utility.js'.
3. **'package.json' and 'pnpm-lock.yaml':** These files are essential for managing dependencies and package lock information for the project.
4. **'babel.config.cjs' and 'tsconfig.json':** These are configuration files for Babel and TypeScript, respectively, which help in transpiling and type-checking the code.
5. **'example.js' and 'main.js':** These are two additional JavaScript files in the root directory, which might be entry points for the application or contain additional code snippets.
