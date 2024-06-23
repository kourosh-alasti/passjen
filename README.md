# Password Generator and Hasher

This package provides a collection of functions for generating and hashing passwords, along with password strength evaluation. It utilizes the `generate-password-browser`, `bcrypt`, and `check-password-strength` libraries.

## Installation

To install the package, you can use npm or yarn:

```bash
npm install @alastisolutions/pwd-gen
```

or

```bash
pnpm add @alastisolutions/pwd-gen
```

or

```bash
yarn add @alastisolutions/pwd-gen
```

## Usage

The package exports the following functions:

### `generate`

Generates a password based on the provided options.

```typescript
import { generate } from "@alastisolutions/pwd-gen";

const generatedPassword = generate({
  characterLength: 12,
  useNumbers: true,
  useSymbols: true,
  useLowercaseLetters: true,
  useUppercaseLetters: true,
  excludeSimilarCharacters: true,
  excludeTheseCharacters: "!@#$%^&*()",
  strictCharacters: true,
});

console.log(generatedPassword);
/*
{
  password: 'P@ssw0rd123!',
  passwordStrength: 'Strong',
  passwordLength: 12
}
*/
```

### `generateMultiple`

Generates multiple passwords based on the provided options.

```typescript
import { generateMultiple } from "@alastisolutions/pwd-gen";

const generatedPasswords = generateMultiple({
  count: 5,
  options: {
    characterLength: 10,
    useNumbers: true,
    useSymbols: true,
    useLowercaseLetters: true,
    useUppercaseLetters: true,
    excludeSimilarCharacters: true,
    excludeTheseCharacters: "!@#$%^&*()",
    strictCharacters: true,
  },
});

console.log(generatedPasswords);
/*
[
  {
    password: 'P@ssw0rd1!',
    passwordStrength: 'Strong',
    passwordLength: 10
  },
  // ... (4 more passwords)
]
*/
```

### `generateHashedPasswordSync`

Generates a hashed password using bcrypt in a synchronous manner.

```typescript
import { generateHashedPasswordSync } from "@alastisolutions/pwd-gen";

const hashedPassword = generateHashedPasswordSync({
  options: {
    characterLength: 8,
    useNumbers: true,
    useSymbols: false,
    useLowercaseLetters: true,
    useUppercaseLetters: true,
    excludeSimilarCharacters: false,
    excludeTheseCharacters: "",
    strictCharacters: false,
  },
  saltRounds: 12,
});

console.log(hashedPassword);
/*
{
  password: 'Passw0rd',
  passwordStrength: 'Strong',
  passwordLength: 8,
  hashedPassword: '$2b$12$... (hashed password)',
  salt: 12
}
*/
```

### `compareHashedPasswordSync`

Compares a password with its hashed version using bcrypt in a synchronous manner.

```typescript
import { compareHashedPasswordSync } from "@alastisolutions/pwd-gen";

const isMatch = compareHashedPasswordSync({
  password: "Passw0rd",
  hashedPassword: "$2b$12$... (hashed password)",
});

console.log(isMatch);
/*
{
  password: 'Passw0rd',
  hashedPassword: '$2b$12$... (hashed password)',
  isMatch: true
}
*/
```

### `generateHashedPassword`

Generates a hashed password using bcrypt in an asynchronous manner.

```typescript
import { generateHashedPassword } from "@alastisolutions/pwd-gen";

(async () => {
  const hashedPassword = await generateHashedPassword({
    options: {
      characterLength: 8,
      useNumbers: true,
      useSymbols: false,
      useLowercaseLetters: true,
      useUppercaseLetters: true,
      excludeSimilarCharacters: false,
      excludeTheseCharacters: "",
      strictCharacters: false,
    },
    saltRounds: 12,
  });

  console.log(hashedPassword);
  /*
  {
    password: 'Passw0rd',
    passwordStrength: 'Strong',
    passwordLength: 8,
    hashedPassword: '$2b$12$... (hashed password)',
    salt: 12
  }
  */
})();
```

### `compareHashedPassword`

Compares a password with its hashed version using bcrypt in an asynchronous manner.

```typescript
import { compareHashedPassword } from "@alastisolutions/pwd-gen";

(async () => {
  const isMatch = await compareHashedPassword({
    password: "Passw0rd",
    hashedPassword: "$2b$12$... (hashed password)",
  });

  console.log(isMatch);
  /*
  {
    password: 'Passw0rd',
    hashedPassword: '$2b$12$... (hashed password)',
    isMatch: true
  }
  */
})();
```

## Contributing

Contributions are welcome! If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

## License

This package is licensed under the MIT License.

## Author

This package was developed by Kourosh Alasti <coding@kouroshalasti.com>
